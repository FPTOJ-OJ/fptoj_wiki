"""Chuan bi noi dung cho Zensical (builder chinh, thay MkDocs).

Zensical doc `mkdocs.yml` nhung chua ho tro `hooks:`, nen 2 loai block phu
thuoc hook se bi render thanh code block neu build truc tiep:
  - ```mermaid     -> <pre class="mermaid"> (giong hook cu)
  - ```matplotlib  -> render 2 anh WebP (light/dark) roi thay bang <img>

Script nay:
  1. Mirror `docs/` -> `build/docs/` (file .md thi copy that de sua;
     file con lai thi hardlink nen gan nhu tuc thi, ke ca 40 MB runtime WASM).
  2. Chuyen doi 2 loai block tren trong ban sao, dung lai sandbox + style +
     cache cua `overrides/hooks.py` (anh giong het ban MkDocs).
  3. Sinh `build/zensical.yml` tu `mkdocs.yml` (bo `hooks:`, them
     `theme.variant: classic`, tro `docs_dir`/`site_dir` ve layout project).

Cache anh nam o `docs/uploads/matplotlib/` (persistent) nen lan chay sau
chi render block moi. Mermaid khong can cache.

Cach dung:
    python scripts/prepare_zensical.py           # truoc moi lan build/serve
    python scripts/prepare_zensical.py --clean   # xoa cache anh roi render lai
    python scripts/prepare_zensical.py --watch   # tu sync khi sua docs/ (serve)
    zensical build -f build/zensical.yml
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
CACHE = DOCS / "uploads" / "matplotlib"  # persistent, gitignored
CONFIG_SRC = ROOT / "mkdocs.yml"
CONFIG_OUT = ROOT / "zensical.generated.yml"  # gitignored; giu o root vi site_dir phai nam trong project root

MERMAID_RE = re.compile(r"```mermaid\n(.*?)```", re.DOTALL)
MPL_RE = re.compile(r"```matplotlib\n(.*?)```", re.DOTALL)

logging.basicConfig(level=logging.INFO, format="%(message)s")
log = logging.getLogger("prepare-zensical")


def _stage_copy(src: str, dst: str) -> str:
    """File .md thi copy that (se bi ghi de); con lai hardlink cho nhanh."""
    if src.endswith(".md"):
        return shutil.copy2(src, dst)
    try:
        os.link(src, dst)
        return dst
    except OSError:
        return shutil.copy2(src, dst)


def _onerror(func, path, _exc):
    try:
        os.chmod(path, 0o700)
        func(path)
    except OSError:
        pass


def mirror_docs() -> None:
    # Windows hay khoa file nen rm -rf thuong that bai am tham; chmod + thu lai
    for _ in range(3):
        shutil.rmtree(STAGE, onerror=_onerror)
        if not STAGE.exists():
            break
        time.sleep(0.5)
    BUILD.mkdir(parents=True, exist_ok=True)
    shutil.copytree(
        DOCS, STAGE,
        copy_function=_stage_copy,
        ignore=shutil.ignore_patterns("__pycache__", "*.pyc"),
    )


def load_hooks():
    """Dung lai sandbox + renderer cua overrides/hooks.py."""
    sys.path.insert(0, str(ROOT / "overrides"))
    import hooks  # noqa: E402

    hooks._mpl_image_dir = str(CACHE)
    CACHE.mkdir(parents=True, exist_ok=True)
    return hooks


def convert_markdown(hooks, path: Path) -> tuple[int, int]:
    text = path.read_text(encoding="utf-8")
    n_mermaid = len(MERMAID_RE.findall(text))
    n_mpl = len(MPL_RE.findall(text))
    if not n_mermaid and not n_mpl:
        return 0, 0

    def _mermaid(m: re.Match) -> str:
        code = m.group(1).rstrip("\n")
        return f'<pre class="mermaid"><code>{html.escape(code)}</code></pre>'

    def _mpl(m: re.Match) -> str:
        code = m.group(1).strip()
        digest = hashlib.md5(code.encode()).hexdigest()[:12]
        light_file, dark_file = f"{digest}_light.webp", f"{digest}_dark.webp"
        if not (CACHE / light_file).exists() or not (CACHE / dark_file).exists():
            ok, err = hooks._check_ast(code)
            if not ok:
                log.warning("Blocked %s: %s", path.name, err)
                return m.group(0)
            try:
                light_file, _ = hooks._render_and_save(code, hooks._LIGHT_STYLE, digest + "_light")
                dark_file, _ = hooks._render_and_save(code, hooks._DARK_STYLE, digest + "_dark")
            except Exception as exc:  # noqa: BLE001 - giu nguyen block khi loi
                log.warning("Render %s: %s", path.name, exc)
                return m.group(0)
        # Copy anh can dung vao ban staged (cache o lai docs/)
        dest = STAGE / "uploads" / "matplotlib"
        dest.mkdir(parents=True, exist_ok=True)
        for f in (light_file, dark_file):
            if not (dest / f).exists():
                shutil.copy2(CACHE / f, dest / f)
        light_url, dark_url = f"/uploads/matplotlib/{light_file}", f"/uploads/matplotlib/{dark_file}"
        return f'<img class="mpl-plot" src="{light_url}" data-light="{light_url}" data-dark="{dark_url}" loading="lazy">'

    path.write_text(MERMAID_RE.sub(_mermaid, MPL_RE.sub(_mpl, text)), encoding="utf-8")
    return n_mermaid, n_mpl


def convert_all(hooks) -> tuple[int, int, int]:
    n_mermaid = n_mpl = pages = 0
    for path in STAGE.rglob("*.md"):
        m, p = convert_markdown(hooks, path)
        if m or p:
            pages += 1
            n_mermaid += m
            n_mpl += p
    return n_mermaid, n_mpl, pages


def write_config() -> None:
    out: list[str] = []
    skipping = False  # bo khoi hooks:
    for line in CONFIG_SRC.read_text(encoding="utf-8").splitlines():
        if re.match(r"^hooks:\s*$", line):
            skipping = True
            continue
        if skipping:
            if line.startswith(("  ", "\t")) or not line.strip():
                continue
            skipping = False
        if re.match(r"^(docs_dir|site_dir|use_directory_urls)\s*:", line):
            continue
        out.append(line)
        if line.strip() == "name: material":
            out.append("  variant: classic")  # giu giao dien Material hien tai
    # Config nam o root nen duong dan tinh tu root
    out.extend(["", "docs_dir: build/docs", "site_dir: site", ""])
    CONFIG_OUT.write_text("\n".join(out), encoding="utf-8")


def watch(hooks, interval: float = 1.5) -> None:
    """Sync file .md vua sua sang ban staged (Zensical tu rebuild)."""
    log.info("Watching docs/*.md - Ctrl+C de dung")
    seen = {p: p.stat().st_mtime for p in DOCS.rglob("*.md")}
    try:
        while True:
            time.sleep(interval)
            for path in DOCS.rglob("*.md"):
                if path.stat().st_mtime != seen.get(path):
                    seen[path] = path.stat().st_mtime
                    staged = STAGE / path.relative_to(DOCS)
                    staged.parent.mkdir(parents=True, exist_ok=True)
                    shutil.copy2(path, staged)
                    convert_markdown(hooks, staged)
                    log.info("Updated %s", path.relative_to(DOCS))
    except KeyboardInterrupt:
        log.info("Watcher stopped")


def main() -> int:
    started = time.time()
    if "--clean" in sys.argv[1:]:
        removed = sum(len(list(CACHE.glob(p))) for p in ("*.webp", "*.svg"))
        for p in ("*.webp", "*.svg"):
            for f in CACHE.glob(p):
                f.unlink()
        log.info("Clean cache: removed %d image(s)", removed)
    mirror_docs()
    hooks = load_hooks()
    m, p, pages = convert_all(hooks)
    write_config()
    log.info("Done in %.1fs - %d mermaid, %d matplotlib in %d file(s)", time.time() - started, m, p, pages)
    if "--watch" in sys.argv[1:]:
        watch(hooks)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
