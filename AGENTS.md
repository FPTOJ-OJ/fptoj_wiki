# AGENTS.md — FPTOJ Wiki

## What This Is

Zensical + Material theme wiki for competitive programming education (Vietnamese). Content lives in `docs/`, config in `mkdocs.yml`. Deployed to Cloudflare Pages via GitHub Actions on push to `master`/`main`.

- **Site**: https://wiki.fptoj.com
- **Repo**: https://github.com/FPTOJ-OJ/fptoj_wiki
- **Author**: Ha Tri Kien / FPTOJ Team

---

## Local Dev

**Python**: Hệ thống sử dụng Conda. Luôn dùng `conda run` hoặc kích hoạt môi trường conda trước khi chạy Python/pip.

```bash
# Install dependencies (once)
conda run pip install -r requirements.txt

# Dev server (Windows: serve.bat, Linux/macOS: ./serve.sh [port])
conda run python scripts/prepare_zensical.py
conda run zensical serve -f zensical.generated.yml
```

Visit `http://localhost:8000`.

> Zensical đọc bản sao trong `build/docs/`, không đọc `docs/` trực tiếp.
> `serve.bat`/`serve.sh` tự chạy watcher (`prepare_zensical.py --watch`) để sync.
> Chạy tay thì chạy lại `prepare_zensical.py` sau mỗi lần sửa Markdown.

**Pipeline**: Zensical đọc `mkdocs.yml` nhưng chưa hỗ trợ `hooks:`, nên
`scripts/prepare_zensical.py` làm phần việc của hook trước:
mirror `docs/` → `build/docs/` (`.md` copy, còn lại hardlink),
```matplotlib ``` → WebP light/dark (dùng lại `overrides/hooks.py`),
```mermaid ``` → `<pre class="mermaid">`, rồi sinh `zensical.generated.yml`
(bỏ `hooks:`, thêm `theme.variant: classic`). MkDocs (`mkdocs build`) vẫn chạy
được — giữ làm fallback, rollback bằng cách đổi 2 step build trong `deploy.yml`.

`build/` và `zensical.generated.yml` là file sinh ra, đã gitignore.

### Dependencies

```
mkdocs<2.0.0
mkdocs-material
pymdown-extensions
pygments
pyyaml
zensical
matplotlib
seaborn
numpy
scipy
Pillow
```

Python 3.8+ required (CI dùng 3.x).

---

## Content Structure

```
docs/
├── index.md                    # Homepage
├── about.md                    # About page
├── lessons/                    # Algorithm lessons (primary content)
│   ├── index.md                # Lesson index
│   ├── 01-do-phuc-tap-*.md     # Lesson articles (39+ total)
│   └── ...
├── coding/                     # Basic programming curriculum
│   ├── index.md                # Overview
│   ├── python/                 # Python track (20 lessons: P01–P20)
│   │   ├── index.md
│   │   ├── P01-cai-dat.md
│   │   └── ...
│   └── cpp/                    # C++ track (17 lessons: C01–C22)
│       ├── index.md
│       ├── C01-tai-sao-cpp.md
│       └── ...
├── algo/                       # Legacy algorithm articles (VNOI fork)
│   ├── basic/
│   ├── data-structures/
│   ├── dp/
│   ├── graph-theory/
│   ├── string/
│   └── ...
├── translate/                  # Translated articles (CF, E-Maxx, Topcoder)
├── languages/                  # Language references (C++ specifics)
├── uploads/                    # Images, icons, static assets
└── others/                     # Misc articles

overrides/
├── hooks.py                    # Mermaid & Plotly conversion hook
├── partials/
│   └── comments.html           # Cusdis comment widget
└── main.html                   # Custom head/footer overrides

mkdocs.yml                      # Site config + nav (source of truth)
serve.bat                       # Windows dev server
serve.sh                        # Linux/macOS dev server
requirements.txt                # Python dependencies
```

---

## Key Conventions

### Language
- **All content is Vietnamese.** Write new content in Vietnamese.
- UI labels in `mkdocs.yml` are also Vietnamese.
- Commit messages, PRs, issues, and technical discussions are in English.

### Navigation
- **`mkdocs.yml` `nav:` is the source of truth.** Every new page MUST be added there or it won't appear on the site.
- Structure mirrors the directory layout under `docs/`.

### Markdown Features

| Feature | Syntax | Notes |
|---------|--------|-------|
| Math (inline) | `$x^2$` | KaTeX via `pymdownx.arithmatex` |
| Math (display) | `$$\sum_{i=1}^n i$$` | Same |
| Mermaid diagrams | ` ```mermaid ` block | Hook converts to `<div class="mermaid">` |
| Matplotlib diagrams | ` ```matplotlib ` block | Custom hook dual-renders theme-specific PNGs |
| Admonitions | `!!! note`, `??? question` | `admonition` + `pymdownx.details` |
| Tabs | `=== "Tab title"` | `pymdownx.tabbed` with `alternate_style: true` |
| Code highlighting | ` ```python ` | Pygments, supports all major languages |
| Collapsible | `??? tip "Title"` | Used for exercise solutions |

### Interactive Code Playground

Coding exercises use the `cp-pg` custom widget:

```html
<div class="cp-pg"
  data-language="python"
  data-starter="# Viết code ở đây"
  data-input="5
1 2 3 4 5"
  data-expected="15"
  data-hint="Dùng sum(arr)">
</div>
```

| Attribute | Purpose |
|-----------|---------|
| `data-language` | `python` or `cpp` |
| `data-starter` | Pre-filled code in editor (or `# Viết code ở đây`) |
| `data-input` | Stdin input for the program |
| `data-expected` | Expected output to validate against |
| `data-hint` | Hint shown to student |

**Exercise format (coding lessons)**:

```markdown
### Bài N: Title
Problem description.

<div class="cp-pg" data-language="python" data-starter="..." data-input="..." data-expected="..." data-hint="..."></div>

??? tip "Lời giải"
    ```python
    solution code
    ```
```

**Rules**:
- No standalone code blocks between `cp-pg` and solution block
- Input goes in `data-input`, not in a separate code block
- Variable assignments go in `data-starter`
- Solution code is indented 4 spaces (inside the tip block)
- Both `??? tip` and `??? tip` are valid — match existing file style

#### Runtime: WASM, chạy hoàn toàn trong trình duyệt (v4)

Since v4 there is **no compile server**: code runs locally via WebAssembly, nothing is uploaded.

| File | Role |
|------|------|
| `docs/js/cp-compiler.js` | Public facade (`window.CPCompiler`), queueing, timeouts, timing |
| `docs/js/cp-runner-worker.js` | Web Worker that owns both runtimes (lazy-loaded) |
| `docs/js/clang-wasm.global.js` | Clang/LLVM runtime bundle (vendored, 296 KB) |
| `docs/clang/` | Clang/lld/memfs/sysroot assets, self-hosted (~29 MB) |
| `docs/pyodide/` | Pyodide core: loader, `pyodide.asm.mjs`, `pyodide.asm.wasm`, `python_stdlib.zip`, `pyodide-lock.json` (~13.6 MB) |

| Language | Engine | First load |
|----------|--------|-----------|
| C++ | Clang 22 → WASM (`@live-codes/clang-wasm`), ships `<bits/stdc++.h>`, `<bits/extc++.h>`, pb_ds, `ext/rope` | ~29 MB, same origin |
| Python 3 | CPython 3.14 → WASM (Pyodide 314.0.8) | ~13.6 MB, same origin |

- Both runtimes are **self-hosted** (no CDN needed): the worker resolves `clang/`, `pyodide/` relative to itself, so nothing breaks if jsDelivr/unpkg is unreachable. The CDN URLs in the config are only a fallback for a missing/incomplete deploy.
- Both are fetched lazily on the first **▶ Chạy**, inside a Worker so the page never freezes, then kept warm for later runs (warm C++ compile ≈1–2 s, Python run ≈5 ms).
- `CPCompiler.preload('cpp' | 'python')` warms a runtime ahead of time; `onStatus` / `CPCompiler.on('status')` reports load/compile/run phases.
- Timeouts kill the worker (`timeout`, default 45 s, covers compile+run; `loadTimeout` covers the first download). The next run recreates it.
- Behaviour to keep in mind: no C++ exceptions (`try/catch`/`throw` do not link), and it is Clang pretending to be GNU (`gnu++17`, `__GNUC__` defined), so `#include <bits/stdc++.h>` works but `bits/stdc++.h` content is a curated subset, not GCC's exact header.

When bumping a runtime version, update the files under `docs/clang/` + `docs/js/clang-wasm.global.js` (from `@live-codes/clang-wasm`) or `docs/pyodide/` (from the `pyodide` npm package) **and** `CLANG_WASM_VERSION` / `PYODIDE_VERSION` in `cp-compiler.js` — those constants only drive the fallback URLs.


### Matplotlib Visualizations

Advanced lessons use custom ` ```matplotlib ` blocks to render graphs, plots, and geometric diagrams.

#### How It Works
1. **Compilation Hook (`overrides/hooks.py`)**: During the MkDocs build process, the hook extracts matplotlib code blocks, MD5-hashes the block contents, and compiles the code twice:
   - Once using a **light theme** to generate `<hash>_light.svg`.
   - Once using a **dark theme** to generate `<hash>_dark.svg`.
   - If SVG output exceeds **500 KB**, it falls back to **WebP** via Pillow.
   - These images are saved inside `docs/uploads/matplotlib/`. Unused images are cleaned up automatically after build.
2. **Real-time Theme Swapping (`docs/js/matplotlib-theme.js`)**: The hook replaces the raw code block with an `<img>` tag having `data-light` and `data-dark` data URIs. A JavaScript `MutationObserver` listens for theme toggles on `<body>` (e.g. `data-md-color-scheme="slate"` for Dark mode) and swaps the image source dynamically.
3. **Logging**: The hook logs to `stderr` (visible in terminal/CI):
   - `INFO  Compiled: <hash>_light.svg & <hash>_dark.svg [svg/svg] (page)` — when new images are generated.
   - `INFO  Cached: <hash>_light.svg (page)` — when existing cached images are reused.
   - `INFO  Cleanup: removed N unused image(s)` — after build, when stale images are deleted.
4. **Error Handling**: Compilation errors are logged as `WARNING` to `stderr` and the original code block is preserved in the output.

#### Writing Matplotlib Blocks
When writing a ` ```matplotlib ` block:
- **Pre-imported Modules**: The hook automatically provides `plt`, `np`, `sns`, and `math`. You do **not** need to include these imports, though doing so does not cause issues.
- **Auto-save & Auto-close**: Do **not** call `plt.savefig()` or `plt.close()`. The hook automatically appends these steps.
- **Size Limits**: Figures are capped at **14 inches wide** and **8 inches tall**. Larger figures are auto-shrunk.
- **Image Display**: Output is capped at **720 px width** CSS via `max-width` on the `<img>` tag. Height auto-scales to maintain aspect ratio.
- **Aesthetic Guidelines**:
  - Always use `plt.tight_layout()` to prevent labels and margins from clipping.
  - Set a reasonable figure size, e.g., `plt.figure(figsize=(8, 5))` or `plt.subplots(..., figsize=(12, 5))`.
  - Avoid hardcoding absolute background/text colors (like black or white) so the plots fit nicely on both light and dark themes.

**Rendering Limits — READ BEFORE WRITING CHARTS**:
- **Max SVG size**: 500 KB per chart. Charts exceeding this are auto-converted to WebP.
- **Max figure size**: 14×8 inches. Larger figures are auto-shrunk, which may clip labels.
- **Data points**: SVG size scales with data complexity. Keep data arrays under ~500 points. For large datasets, downsample or use `np.linspace` with fewer points.
- **Subplots**: Each subplot adds ~30-50 KB to SVG. Avoid more than 4 subplots per chart.
- **Text/labels**: Long labels may overlap in tight layouts. Use `rotation=45` or shorter labels.
- **Colors**: Use high-contrast colors that work on both light (#f9f9f9) and dark (#2b2b3d) backgrounds. Avoid pure black/white.
- **Legends**: Keep legend text short. Use `fontsize=8-9` for multi-line legends.
- **Log scale**: Use `set_yscale('log')` when values span multiple orders of magnitude. Without it, small values become invisible.

**Example**:
```python
n = np.linspace(1, 100, 100)
plt.plot(n, n, label='O(N)')
plt.plot(n, n**2, label='O(N^2)')
plt.xlabel('N')
plt.ylabel('Operations')
plt.legend()
plt.grid(True, alpha=0.3)
```

#### Security: Sandboxed Execution

Matplotlib blocks are executed via `exec()` with strict security measures:

1. **AST Pre-check**: Before execution, the code is parsed with Python's `ast` module. Any `import` or `from ... import` of non-whitelisted modules is **blocked immediately** with a warning.
2. **Dunder Attribute Blocking**: Access to dangerous dunder attributes (`__class__`, `__bases__`, `__subclasses__`, `__globals__`, `__builtins__`, `__mro__`, etc.) is blocked via AST analysis. This prevents sandbox bypass via Python's introspection chain.
3. **Blocked Function Calls**: `eval()`, `exec()`, `compile()`, `globals()`, `locals()`, `vars()`, `dir()`, `open()`, `breakpoint()`, `exit()`, `quit()`, `input()` are blocked.
4. **Restricted Builtins**: `__builtins__` is replaced with a whitelist of safe functions (`range`, `len`, `min`, `max`, `sum`, `abs`, `round`, `int`, `float`, `str`, `list`, `dict`, `tuple`, `set`, `bool`, `enumerate`, `zip`, `map`, `filter`, `sorted`, `reversed`, `print`, `any`, `all`, `isinstance`, `issubclass`, `hasattr`, `getattr`, `hash`, `id`, `chr`, `ord`, `hex`, `oct`, `bin`, `divmod`, `pow`, `format`, `__import__`).
5. **Restricted `__import__`**: A custom `__import__` function only allows whitelisted root modules.
6. **Math helpers**: `math.log`, `math.log2`, `math.log10`, `math.sqrt`, `math.ceil`, `math.floor`, `math.sin`, `math.cos`, `math.tan`, `math.pi`, `math.e`, `math.inf`, `math.isnan`, `math.isinf`, `math.factorial`, `math.gcd`, `math.exp`, `math.gamma`, `math.erf`, `math.radians`, `math.degrees`, `math.hypot`, `math.fsum`, `math.prod`, `math.copysign`, `math.fabs`, `math.isfinite`, `math.isclose`, `math.remainder`, `math.trunc`, and more are available directly (no `math.` prefix needed).

**Allowed modules**: `math`, `matplotlib`, `matplotlib.pyplot`, `seaborn`, `numpy`, `scipy`, `scipy.special`

**BLOCKED**: `os`, `sys`, `subprocess`, `shutil`, `pathlib`, `io`, `open`, `socket`, `http`, `urllib`, `requests`, `ctypes`, `importlib`, `pickle`, `shelve`, `sqlite3`, `csv`, `json`, `yaml`, `xml`, `html`, `re`, `ast`, `inspect`, `traceback`, `warnings`, `logging`, `tempfile`, `glob`, `fnmatch`, `fileinput`, `linecache`, `tokenize`, `compile`, `eval`, `exec` (recursive), `__import__` (non-whitelisted), `globals`, `locals`, `vars`, `dir`, `getattr` with dunder, `setattr`, `delattr`, `callable`, `type`, `object`, `super`, `property`, `classmethod`, `staticmethod`, `__subclasses__`, `__bases__`, `__mro__`, `__globals__`, `__builtins__`, `__class__`, `__call__`, `__getitem__`, `__setitem__`, `__delitem__`, `__iter__`, `__next__`, `__contains__`, `__enter__`, `__exit__`.

**WARNING**: Do NOT attempt to import non-whitelisted modules or access dunder attributes in matplotlib blocks. The AST check will reject the entire block before execution.

### Comments

Uses [Cusdis](https://cusdis.com), configured in `mkdocs.yml` under `extra.cusdis`. Widget at `overrides/partials/comments.html` with dark mode support.

---

## Files to Update Together

When adding a new lesson/article:

1. Create the `.md` file in the correct `docs/` subdirectory
2. Add the entry to `nav:` in `mkdocs.yml`
3. Update `README.md` lesson list if it's a new group/topic
4. For coding exercises: ensure `cp-pg` widget is present and working

When adding a new lesson group:

1. Create directory under `docs/lessons/` or `docs/coding/`
2. Add all pages to `nav:` in `mkdocs.yml`
3. Update `README.md` with the new group
4. Update `docs/index.md` or `docs/coding/index.md` with links

---

## What NOT to Touch

| Path | Reason |
|------|--------|
| `site/` | Build output, gitignored |
| `overrides/hooks.py` | Mermaid & Plotly conversion hook — breaking it breaks all diagrams |
| `.github/workflows/deploy.yml` | Deployment config (Cloudflare Pages) |
| `overrides/__pycache__/` | Python cache, gitignored |

---

## Deployment

Push to `master` or `main` triggers the `deploy` workflow:

1. `actions/checkout@v7`
2. `actions/setup-python@v7` (Python 3.x) + `actions/setup-node@v7`
3. `pip install -r requirements.txt`
4. `python scripts/prepare_zensical.py` (matplotlib + mermaid + generated config)
5. `zensical build -f zensical.generated.yml`
6. Deploy `site/` to Cloudflare Pages (`fptoj-wiki` project)

Requires secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`.

To roll back to MkDocs, change steps 4–5 to `mkdocs build` (the workflow comments this).

---

## Common Tasks

### Run a quick build check (no server)

```bash
python scripts/prepare_zensical.py
zensical build -f zensical.generated.yml
```

There is no `--strict` equivalent in Zensical yet; unresolved link references are
reported as warnings. To run the old strict check (MkDocs fallback):

```bash
python -m mkdocs build --strict
```

### Clean matplotlib cache and rebuild

```bash
# Renders all charts again (Zensical pipeline)
python scripts/prepare_zensical.py --clean
zensical build -f zensical.generated.yml
```

This deletes all cached matplotlib images in `docs/uploads/matplotlib/` and recompiles them from scratch. Useful after changing chart styles or fixing rendering issues.

### Find broken internal links

```bash
# MkDocs reports them with file:line context
python -m mkdocs build --strict 2>&1 | grep -i "warning"
```

### Search content

```bash
# Find all exercises missing cp-pg widgets
grep -rn "^### Bài" docs/coding/ | while read line; do
  file=$(echo "$line" | cut -d: -f1)
  num=$(echo "$line" | cut -d: -f2)
  next=$((num + 1))
  if ! sed -n "${next}p" "$file" | grep -q 'cp-pg'; then
    echo "$file:$num"
  fi
done
```

### Batch find/replace across all markdown files

```bash
# Example: replace all ??? tip with ??? tip in Python exercises
find docs/coding/python -name "*.md" -exec sed -i 's/??? tip/??? tip/g' {} +
```

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for full guidelines. Summary:

- Content in Vietnamese, meta-communication in English
- One topic per issue/PR
- Test locally before submitting PR
- Follow exercise format for coding lessons
- No raw AI-generated content without review
