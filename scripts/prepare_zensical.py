"""Chuẩn bị nội dung cho Zensical.

Zensical chưa hỗ trợ `hooks:` trong mkdocs.yml, nên hai loại block phụ thuộc hook
(`` ```matplotlib `` và `` ```mermaid ``) sẽ bị render thành code block. Script này:

1. Sao chép ``docs/`` → ``build/docs/`` (hardlink khi có thể, nên gần như tức thì).
2. Với mỗi file .md trong bản sao:
   - `` ```mermaid `` → ``<pre class="mermaid"><code>…</code></pre>`` (giống hook).
   - `` ```matplotlib `` → render 2 ảnh WebP (light/dark) rồi thay bằng ``<img class="mpl-plot">``.
3. Sinh ``zensical.generated.yml`` từ ``mkdocs.yml``: bỏ ``hooks:``, thêm
   ``variant: classic`` (giữ giao diện Material), trỏ ``docs_dir`` vào bản sao
   và ``site_dir`` ra ``site``.

Dùng lại toàn bộ sandbox + style + cache của ``overrides/hooks.py`` nên hình ảnh
giống hệt bản MkDocs.

Cách dùng:
    python scripts/prepare_zensical.py           # một lần
    python scripts/prepare_zensical.py --clean   # xoá cache ảnh rồi render lại
    python scripts/prepare_zensical.py --watch   # theo dõi docs/ khi đang serve
    zensical build -f zensical.generated.yml
"""
from __future__ import annotations

import hashlib
import html
import logging
import os
import re
import shutil
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"
BUILD = ROOT / "build"
STAGE = BUILD / "docs"
CONFIG_SRC = ROOT / "mkdocs.yml"
CONFIG_OUT = ROOT / "zensical.generated.yml"  # Zensical resolves docs_dir/site_dir relative to config file

MERMAID_RE = re.compile(r"```mermaid\n(.*?)```", re.DOTALL)
MPL_RE = re.compile(r"```matplotlib\n(.*?)```", re.DOTALL)
HOOKS_LINE = re.compile(r"^hooks:\s*$")
CONFIG_OVERRIDE = re.compile(r"^(docs_dir|site_dir|use_directory_urls)\s*:")

logging.basicConfig(level=logging.INFO, format="%(message)s")
log = logging.getLogger("prepare-zensical")


def _link_or_copy(src: str, dst: str) -> str:
    """Luôn copy thật.

    Từng dùng hardlink cho nhanh, nhưng script ghi đè nội dung trong bản sao nên
    hardlink sẽ ghi ngược vào ``docs/`` gốc. Copy 40 MB tốn ~1s, đổi lại an toàn.
    """
    return shutil.copy2(src, dst)


def _rmtree(path: Path) -> None:
    """Xoá cây thư mục, chịu được file read-only / lock tạm thời trên Windows."""
    for _ in range(3):
        if not path.exists():
            return
        try:
            shutil.rmtree(path)
            return
        except (PermissionError, OSError):
            for root, dirs, files in os.walk(path):
                for name in files:
                    try:
                        os.chmod(os.path.join(root, name), 0o600)
                    except OSError:
                        pass
                for name in dirs:
                    try:
                        os.chmod(os.path.join(root, name), 0o700)
                    except OSError:
                        pass
            time.sleep(0.3)
    shutil.rmtree(path, ignore_errors=True)


def mirror_docs() -> None:
    _rmtree(STAGE)
    BUILD.mkdir(parents=True, exist_ok=True)
    shutil.copytree(
        DOCS, STAGE,
        copy_function=_link_or_copy,
        ignore=shutil.ignore_patterns("__pycache__", "*.pyc"),
    )
    log.info("Mirrored docs/ → build/docs/")


def load_hooks():
    """Import overrides/hooks.py để dùng lại sandbox + renderer."""
    sys.path.insert(0, str(ROOT / "overrides"))
    import hooks  # noqa: E402

    hooks._mpl_image_dir = str(STAGE / "uploads" / "matplotlib")
    os.makedirs(hooks._mpl_image_dir, exist_ok=True)
    return hooks


def convert_markdown(hooks, path: Path) -> tuple[int, int]:
    text = path.read_text(encoding="utf-8")
    mermaid_count = len(MERMAID_RE.findall(text))
    mpl_count = len(MPL_RE.findall(text))

    if not mermaid_count and not mpl_count:
        return 0, 0

    def _mermaid(match: re.Match) -> str:
        code = match.group(1).rstrip("\n")
        return f'<pre class="mermaid"><code>{html.escape(code)}</code></pre>'

    def _mpl(match: re.Match) -> str:
        code = match.group(1).strip()
        digest = hashlib.md5(code.encode()).hexdigest()[:12]
        light_base, dark_base = f"{digest}_light", f"{digest}_dark"

        light_file = hooks._find_cached(light_base)
        dark_file = hooks._find_cached(dark_base)
        if not (light_file and dark_file):
            ok, err = hooks._check_ast(code)
            if not ok:
                log.warning("Security blocked in %s: %s", path.name, err)
                return match.group(0)
            try:
                light_file, _ = hooks._render_and_save(code, hooks._LIGHT_STYLE, light_base)
                dark_file, _ = hooks._render_and_save(code, hooks._DARK_STYLE, dark_base)
            except Exception as exc:  # noqa: BLE001 - giữ nguyên block khi lỗi
                log.warning("Render error in %s: %s", path.name, exc)
                return match.group(0)

        light_url = f"/uploads/matplotlib/{light_file}"
        dark_url = f"/uploads/matplotlib/{dark_file}"
        return (
            f'<img class="mpl-plot" src="{light_url}" '
            f'data-light="{light_url}" data-dark="{dark_url}" loading="lazy">'
        )

    text = MERMAID_RE.sub(_mermaid, text)
    try:
        text = MPL_RE.sub(_mpl, text)
    except Exception as exc:  # noqa: BLE001 - matplotlib hiếm khi chết cả file
        log.warning("Matplotlib pass failed for %s: %s", path.name, exc)

    path.write_text(text, encoding="utf-8")
    return mermaid_count, mpl_count


def write_config() -> None:
    lines = CONFIG_SRC.read_text(encoding="utf-8").splitlines()
    out: list[str] = []
    skipping = False
    for line in lines:
        if HOOKS_LINE.match(line):
            skipping = True
            continue
        if skipping:
            if line.startswith(("  ", "\t")) or not line.strip():
                continue
            skipping = False
        if CONFIG_OVERRIDE.match(line):
            continue
        out.append(line)
        # Giữ giao diện Material hiện tại: Zensical mặc định là variant "modern".
        if line.strip() == "name: material":
            out.append("  variant: classic")

    out.extend(["", "docs_dir: build/docs", "site_dir: site", ""])
    CONFIG_OUT.write_text("\n".join(out), encoding="utf-8")
    log.info("Wrote %s (hooks removed, docs_dir → build/docs)", CONFIG_OUT.relative_to(ROOT))


def write_robots() -> None:
    robots = STAGE / "robots.txt"
    if robots.exists():
        return
    robots.write_text(
        "User-agent: *\nAllow: /\n\nSitemap: https://wiki.fptoj.com/sitemap.xml\n",
        encoding="utf-8",
    )


def watch(hooks, interval: float = 1.5) -> None:
    """Theo dõi docs/ và chỉ xử lý file thay đổi (giữ vòng lặp build của Zensical)."""
    log.info("Watching docs/ — Ctrl+C để dừng")
    seen: dict[Path, float] = {}
    for path in DOCS.rglob("*"):
        if path.is_file():
            seen[path] = path.stat().st_mtime
    try:
        while True:
            time.sleep(interval)
            dirty = []
            for path in DOCS.rglob("*"):
                if not path.is_file():
                    continue
                mtime = path.stat().st_mtime
                if seen.get(path) != mtime:
                    seen[path] = mtime
                    dirty.append(path)
            for path in dirty:
                rel = path.relative_to(DOCS)
                staged = STAGE / rel
                if path.suffix == ".md":
                    staged.parent.mkdir(parents=True, exist_ok=True)
                    shutil.copy2(path, staged)
                    convert_markdown(hooks, staged)
                else:
                    staged.parent.mkdir(parents=True, exist_ok=True)
                    shutil.copy2(path, staged)
                log.info("Updated %s", rel)
    except KeyboardInterrupt:
        log.info("Watcher stopped")


def clean_cache() -> None:
    cache = DOCS / "uploads" / "matplotlib"
    if not cache.is_dir():
        return
    removed = 0
    for pattern in ("*.webp", "*.svg"):
        for path in cache.glob(pattern):
            path.unlink()
            removed += 1
    log.info("Clean cache: removed %d image(s)", removed)


def main() -> int:
    started = time.time()
    if "--clean" in sys.argv[1:]:
        clean_cache()
    mirror_docs()
    hooks = load_hooks()

    mermaid_total = mpl_total = pages = 0
    for path in STAGE.rglob("*.md"):
        m, p = convert_markdown(hooks, path)
        if m or p:
            pages += 1
            mermaid_total += m
            mpl_total += p

    write_config()
    write_robots()
    log.info(
        "Done in %.1fs — %d mermaid, %d matplotlib block(s) in %d file(s)",
        time.time() - started, mermaid_total, mpl_total, pages,
    )

    if "--watch" in sys.argv[1:]:
        watch(hooks)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())



