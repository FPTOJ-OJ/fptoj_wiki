"""MkDocs hook: mermaid div conversion + syntax validation + matplotlib pre-compilation.

Rendering pipeline:
  - Mermaid blocks → validate syntax via Node.js + mermaid.parse(), then convert to <div>
  - Matplotlib blocks → WebP lossless (compact, no unicode issues, no font embedding bugs)

Security:
  - exec() sandbox: __builtins__ cleared, only whitelisted builtins
  - AST pre-check: blocks import/from-import of non-allowed modules
  - AST pre-check: blocks dunder attribute access (__class__, __bases__, etc.)
  - Only plt, np, sns, math, scipy available inside matplotlib blocks
"""
import re
import os
import ast
import hashlib
import logging
import subprocess
import json as _json
import tempfile

log = logging.getLogger("mkdocs.hooks")

# ---------------------------------------------------------------------------
# Paths & constants
# ---------------------------------------------------------------------------
_mpl_image_dir = os.path.normpath(
    os.path.join(os.path.dirname(__file__), '..', 'docs', 'uploads', 'matplotlib')
)
_used_images = set()
_mpl_ctx = None

FIG_DPI = 150
MAX_FIG_W, MAX_FIG_H = 16.0, 10.0  # inches

_ALLOWED_IMPORTS = frozenset({
    'math', 'matplotlib', 'matplotlib.pyplot', 'seaborn',
    'numpy', 'np', 'plt', 'sns', 'scipy', 'scipy.special',
})

# ---------------------------------------------------------------------------
# Sandbox: safe builtins + math/numpy helpers
# ---------------------------------------------------------------------------
def _safe_import(name, *args, **kwargs):
    """Restricted __import__: only whitelisted root modules."""
    root = name.split('.')[0]
    if root not in _ALLOWED_IMPORTS:
        raise ImportError(f'Import blocked by sandbox: {name}')
    return __import__(name, *args, **kwargs)

_SAFE_BUILTINS = {
    # core types & conversions
    'range': range, 'len': len, 'min': min, 'max': max,
    'sum': sum, 'abs': abs, 'round': round,
    'int': int, 'float': float, 'str': str,
    'list': list, 'dict': dict, 'tuple': tuple, 'set': set, 'bool': bool,
    # iteration & functional
    'enumerate': enumerate, 'zip': zip, 'map': map, 'filter': filter,
    'sorted': sorted, 'reversed': reversed, 'any': any, 'all': all,
    # misc safe
    'print': print, 'isinstance': isinstance, 'issubclass': issubclass,
    'hasattr': hasattr, 'getattr': getattr, 'hash': hash, 'id': id,
    'chr': chr, 'ord': ord, 'hex': hex, 'oct': oct, 'bin': bin,
    'divmod': divmod, 'pow': pow, 'format': format,
    # constants
    'True': True, 'False': False, 'None': None,
    '__name__': '__main__',
    # sandbox
    '__import__': _safe_import,
}

import math as _math
for _fn in ('log', 'log2', 'log10', 'sqrt', 'ceil', 'floor', 'pow',
            'sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'atan2',
            'pi', 'e', 'tau', 'inf', 'nan', 'isnan', 'isinf',
            'factorial', 'gcd', 'exp', 'fmod', 'frexp', 'ldexp',
            'radians', 'degrees', 'hypot', 'erf', 'erfc', 'gamma',
            'lgamma', 'copysign', 'fabs', 'fsum', 'prod',
            'isfinite', 'isclose', 'remainder', 'trunc', 'modf'):
    if hasattr(_math, _fn):
        _SAFE_BUILTINS[_fn] = getattr(_math, _fn)
del _fn


# ---------------------------------------------------------------------------
# AST security check
# ---------------------------------------------------------------------------
# Dangerous dunder attributes that can bypass sandbox
_BLOCKED_DUNDERS = frozenset({
    '__class__', '__bases__', '__base__', '__subclasses__', '__mro__',
    '__globals__', '__locals__', '__builtins__', '__import__',
    '__loader__', '__spec__', '__file__', '__path__', '__name__',
    '__qualname__', '__module__', '__init__', '__new__', '__del__',
    '__repr__', '__str__', '__bytes__', '__format__',
    '__hash__', '__bool__', '__sizeof__',
    '__getattribute__', '__getattr__', '__setattr__', '__delattr__',
    '__dir__', '__doc__',
    '__call__', '__getitem__', '__setitem__', '__delitem__',
    '__iter__', '__next__', '__contains__',
    '__enter__', '__exit__',
    '__await__', '__aiter__', '__anext__',
    '__aenter__', '__aexit__',
    '__reduce__', '__reduce_ex__', '__getstate__', '__setstate__',
    '__copy__', '__deepcopy__',
    '__annotations__', '__dict__', '__weakref__', '__slots__',
    '__abstractmethods__', '__frozen__',
})

# Safe dunder attributes that matplotlib/numpy legitimately use
_SAFE_DUNDERS = frozenset({
    '__name__',       # module name
    '__version__',    # version strings
    '__all__',        # public API list
    '__file__',       # sometimes needed
})


def _check_ast(code):
    """Return (ok, error_msg). Blocks non-allowed imports and dunder access."""
    try:
        tree = ast.parse(code)
    except SyntaxError as e:
        return False, f'Syntax error: {e}'

    for node in ast.walk(tree):
        # Block non-allowed imports
        if isinstance(node, ast.Import):
            for alias in node.names:
                if alias.name.split('.')[0] not in _ALLOWED_IMPORTS:
                    return False, f'Blocked import: {alias.name}'
        elif isinstance(node, ast.ImportFrom):
            if node.module and node.module.split('.')[0] not in _ALLOWED_IMPORTS:
                return False, f'Blocked from-import: {node.module}'

        # Block dangerous dunder attribute access
        elif isinstance(node, ast.Attribute):
            attr = node.attr
            if attr.startswith('__') and attr.endswith('__'):
                if attr not in _SAFE_DUNDERS:
                    return False, f'Blocked dunder attribute: {attr}'

        # Block dunder strings in subscript (e.g., d["__class__"])
        elif isinstance(node, ast.Subscript):
            if isinstance(node.slice, ast.Constant) and isinstance(node.slice.value, str):
                val = node.slice.value
                if val.startswith('__') and val.endswith('__') and val not in _SAFE_DUNDERS:
                    return False, f'Blocked dunder string: {val}'

        # Block eval/exec/compile/globals/locals calls
        elif isinstance(node, ast.Call):
            if isinstance(node.func, ast.Name):
                if node.func.id in ('eval', 'exec', 'compile', 'globals',
                                     'locals', 'vars', 'dir', 'breakpoint',
                                     'exit', 'quit', 'help', 'license',
                                     'credits', 'copyright', 'input',
                                     'open', 'memoryview', 'bytearray',
                                     'bytes'):
                    return False, f'Blocked call: {node.func.id}()'
            # Block getattr(obj, "__class__") style bypass
            if isinstance(node.func, ast.Name) and node.func.id == 'getattr':
                for arg in node.args[1:]:
                    if isinstance(arg, ast.Constant) and isinstance(arg.value, str):
                        if arg.value.startswith('__') and arg.value not in _SAFE_DUNDERS:
                            return False, f'Blocked getattr with dunder: {arg.value}'

    return True, ''


# ---------------------------------------------------------------------------
# Matplotlib styles — optimized for WebP rendering
# ---------------------------------------------------------------------------
_LIGHT_STYLE = {
    # Font
    'font.family': 'sans-serif',
    'font.sans-serif': ['DejaVu Sans', 'Arial', 'Helvetica', 'sans-serif'],
    'font.size': 11,
    'mathtext.fontset': 'dejavusans',
    # Figure
    'figure.facecolor': '#ffffff',
    'figure.edgecolor': 'none',
    'figure.titlesize': 15,
    'figure.titleweight': 'bold',
    # Axes
    'axes.facecolor': '#f8f9fa',
    'axes.edgecolor': '#cccccc',
    'axes.linewidth': 1,
    'axes.labelcolor': '#222222',
    'axes.labelsize': 12,
    'axes.labelweight': 'normal',
    'axes.titlesize': 14,
    'axes.titleweight': 'bold',
    'axes.titlecolor': '#111111',
    'axes.grid': True,
    'axes.grid.axis': 'both',
    'axes.spines.top': False,
    'axes.spines.right': False,
    # Grid
    'grid.color': '#e0e0e0',
    'grid.linewidth': 0.8,
    'grid.alpha': 0.8,
    'grid.linestyle': '-',
    # Ticks
    'xtick.color': '#444444',
    'ytick.color': '#444444',
    'xtick.labelsize': 10,
    'ytick.labelsize': 10,
    'xtick.direction': 'out',
    'ytick.direction': 'out',
    # Lines & markers
    'lines.linewidth': 2.2,
    'lines.markersize': 7,
    'lines.antialiased': True,
    # Legend
    'legend.fontsize': 10,
    'legend.framealpha': 0.95,
    'legend.edgecolor': '#cccccc',
    'legend.facecolor': '#ffffff',
    'legend.borderpad': 0.8,
    'legend.labelspacing': 0.5,
    # Text
    'text.color': '#222222',
}

_DARK_STYLE = {
    # Font
    'font.family': 'sans-serif',
    'font.sans-serif': ['DejaVu Sans', 'Arial', 'Helvetica', 'sans-serif'],
    'font.size': 11,
    'mathtext.fontset': 'dejavusans',
    # Figure
    'figure.facecolor': '#16161e',
    'figure.edgecolor': 'none',
    'figure.titlesize': 15,
    'figure.titleweight': 'bold',
    # Axes
    'axes.facecolor': '#1e1e2e',
    'axes.edgecolor': '#444466',
    'axes.linewidth': 1,
    'axes.labelcolor': '#d0d0e0',
    'axes.labelsize': 12,
    'axes.labelweight': 'normal',
    'axes.titlesize': 14,
    'axes.titleweight': 'bold',
    'axes.titlecolor': '#eeeeff',
    'axes.grid': True,
    'axes.grid.axis': 'both',
    'axes.spines.top': False,
    'axes.spines.right': False,
    # Grid
    'grid.color': '#2a2a40',
    'grid.linewidth': 0.8,
    'grid.alpha': 0.9,
    'grid.linestyle': '-',
    # Ticks
    'xtick.color': '#9999bb',
    'ytick.color': '#9999bb',
    'xtick.labelsize': 10,
    'ytick.labelsize': 10,
    'xtick.direction': 'out',
    'ytick.direction': 'out',
    # Lines & markers
    'lines.linewidth': 2.2,
    'lines.markersize': 7,
    'lines.antialiased': True,
    # Legend
    'legend.fontsize': 10,
    'legend.framealpha': 0.9,
    'legend.edgecolor': '#444466',
    'legend.facecolor': '#222236',
    'legend.labelcolor': '#d0d0e0',
    'legend.borderpad': 0.8,
    'legend.labelspacing': 0.5,
    # Text
    'text.color': '#d0d0e0',
}


def _init_mpl():
    global _mpl_ctx
    if _mpl_ctx is not None:
        return _mpl_ctx
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    import seaborn as sns
    sns.set_theme(style='whitegrid')
    _mpl_ctx = {'plt': plt, 'sns': sns, 'np': __import__('numpy')}
    os.makedirs(_mpl_image_dir, exist_ok=True)
    return _mpl_ctx


# ---------------------------------------------------------------------------
# Render → save WebP lossless file, return (filename, 'webp')
# ---------------------------------------------------------------------------
def _render_and_save(code, style_dict, out_name_base):
    """Render matplotlib code → WebP lossless file.

    Returns (filename, 'webp').
    """
    ctx = _init_mpl()
    plt = ctx['plt']
    import math
    ns = {'plt': plt, 'np': ctx['np'], 'sns': ctx['sns'], 'math': math}
    ns['__builtins__'] = dict(_SAFE_BUILTINS)

    with plt.rc_context(style_dict):
        exec(code, ns)
        fig = plt.gcf()
        w, h = fig.get_size_inches()
        if w > MAX_FIG_W:
            fig.set_size_inches(MAX_FIG_W, h)
        if h > MAX_FIG_H:
            fig.set_size_inches(fig.get_size_inches()[0], MAX_FIG_H)

        webp_path = os.path.join(_mpl_image_dir, f'{out_name_base}.webp')
        fig.savefig(webp_path, format='webp', bbox_inches='tight',
                    facecolor=fig.get_facecolor(), edgecolor='none',
                    pil_kwargs={'lossless': True})
        plt.close(fig)
        return f'{out_name_base}.webp', 'webp'


# ---------------------------------------------------------------------------
# MkDocs hooks
# ---------------------------------------------------------------------------
def on_page_markdown(markdown, page, config, files):
    src = page.file.src_path if page and page.file else '?'

    # --- Mermaid: validate syntax + convert to <div> ---
    def _replace_mermaid(match):
        code = match.group(1).rstrip('\n')
        ok, err = _validate_mermaid(code)
        if not ok:
            log.warning('Mermaid syntax error in %s: %s', src, err.split('\n')[0])
        return f'<div class="mermaid">\n{code}\n</div>'

    markdown = re.sub(
        r'```mermaid\n(.*?)```',
        _replace_mermaid,
        markdown, flags=re.DOTALL,
    )

    # --- Matplotlib: compile to WebP ---
    pattern = r'```matplotlib\n(.*?)```'

    def _replace_mpl(match):
        code = match.group(1).strip()
        code_hash = hashlib.md5(code.encode()).hexdigest()[:12]
        light_base = f'{code_hash}_light'
        dark_base = f'{code_hash}_dark'

        light_file = _find_cached(light_base)
        dark_file = _find_cached(dark_base)

        if light_file and dark_file:
            log.info('Cached: %s (%s)', light_file, src)
        else:
            ok, err = _check_ast(code)
            if not ok:
                log.warning('Security blocked in %s: %s', src, err)
                return match.group(0)
            try:
                light_file, l_fmt = _render_and_save(code, _LIGHT_STYLE, light_base)
                dark_file, d_fmt = _render_and_save(code, _DARK_STYLE, dark_base)
                log.info('Compiled: %s & %s [%s/%s] (%s)',
                         light_file, dark_file, l_fmt, d_fmt, src)
            except Exception as e:
                log.warning('Render error in %s: %s', src, e)
                return match.group(0)

        _used_images.add(light_file)
        _used_images.add(dark_file)
        light_url = f'/uploads/matplotlib/{light_file}'
        dark_url = f'/uploads/matplotlib/{dark_file}'
        return (
            f'<img class="mpl-plot" src="{light_url}" '
            f'data-light="{light_url}" data-dark="{dark_url}" '
            f'loading="lazy">'
        )

    markdown = re.sub(pattern, _replace_mpl, markdown, flags=re.DOTALL)
    return markdown


def _find_cached(base):
    """Return filename if {base}.webp exists, else None."""
    name = f'{base}.webp'
    if os.path.exists(os.path.join(_mpl_image_dir, name)):
        return name
    return None


# ---------------------------------------------------------------------------
# Mermaid syntax validation via Node.js
# ---------------------------------------------------------------------------
_MERMAID_VALIDATOR = os.path.normpath(
    os.path.join(os.path.dirname(__file__), '..', 'scripts', 'validate-mermaid.js')
)
_mermaid_node_available = None  # cached: True/False


def _is_node_available():
    """Check once if node + validator script exist."""
    global _mermaid_node_available
    if _mermaid_node_available is None:
        try:
            r = subprocess.run(['node', '--version'], capture_output=True, timeout=5)
            _mermaid_node_available = (r.returncode == 0 and os.path.isfile(_MERMAID_VALIDATOR))
        except Exception:
            _mermaid_node_available = False
    return _mermaid_node_available


def _validate_mermaid(code):
    """Validate a mermaid block via Node.js. Returns (ok, error_msg)."""
    if not _is_node_available():
        return True, ''  # skip validation if node unavailable

    tmp = None
    try:
        fd, tmp = tempfile.mkstemp(suffix='.mmd', text=True)
        os.close(fd)
        with open(tmp, 'w', encoding='utf-8') as f:
            f.write(code)
        r = subprocess.run(
            ['node', _MERMAID_VALIDATOR, tmp],
            capture_output=True, text=True, timeout=15,
        )
        result = _json.loads(r.stdout.strip()) if r.stdout.strip() else {}
        if result.get('ok'):
            return True, ''
        else:
            return False, result.get('error', 'Unknown mermaid error')
    except subprocess.TimeoutExpired:
        return True, ''  # don't block build on timeout
    except Exception:
        return True, ''  # don't block build on validator failure
    finally:
        if tmp and os.path.exists(tmp):
            os.unlink(tmp)


def on_pre_build(config):
    _used_images.clear()
    # MKDOCS_CLEAN_MPL=1 → xóa toàn bộ cache trước khi build
    if os.environ.get('MKDOCS_CLEAN_MPL') == '1' and os.path.isdir(_mpl_image_dir):
        for fname in os.listdir(_mpl_image_dir):
            if fname == '.gitkeep':
                continue
            os.remove(os.path.join(_mpl_image_dir, fname))
        log.info('Clean cache: all images removed')


def on_post_build(config):
    pass  # cleanup thủ công khi cần: xóa docs/uploads/matplotlib/*.webp
