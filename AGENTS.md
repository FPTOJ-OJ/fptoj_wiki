# AGENTS.md — FPTOJ Wiki

## What This Is

MkDocs + Material theme wiki for competitive programming education (Vietnamese). Content lives in `docs/`, config in `mkdocs.yml`. Deployed to Cloudflare Pages via GitHub Actions on push to `master`/`main`.

## Local Dev

```
pip install -r requirements.txt
python -m mkdocs serve
```

On Windows, `serve.bat` does the same with UTF-8 codepage and logs to `log.txt`.

## Content Structure

- `docs/lessons/` — Algorithm lesson groups (Nhóm 1–14), the primary content
- `docs/algo/` — Legacy algorithm articles (VNOI fork origin)
- `docs/coding/` — Basic programming curriculum (Python + C++)
- `docs/translate/` — Translated articles (Codeforces, E-Maxx, Topcoder, etc.)
- `docs/languages/` — Language-specific references
- `docs/uploads/` — Images, icons, static assets

## Key Conventions

- **All content is Vietnamese.** Write new content in Vietnamese. UI labels in `mkdocs.yml` are also Vietnamese.
- **`mkdocs.yml` nav is the source of truth for site structure.** Every new page must be added to the `nav:` section or it won't appear in navigation.
- **Mermaid diagrams**: Write standard ` ```mermaid ` blocks in markdown. The hook at `overrides/hooks.py` converts them to `<div class="mermaid">` before rendering.
- **Math**: Uses KaTeX via `pymdownx.arithmatex`. Inline: `$...$`, display: `$$...$$`.
- **Admonitions**: Supported via `admonition` + `pymdownx.details`. Use `!!! note`, `??? question`, etc.
- **Tabs**: `pymdownx.tabbed` with `alternate_style: true`.

## Files to Update Together

When adding a new lesson/article:
1. Create the `.md` file in the correct `docs/` subdirectory
2. Add the entry to `nav:` in `mkdocs.yml`
3. Update `README.md` lesson list if it's a new group/topic

## What NOT to Touch

- `site/` — build output, gitignored
- `overrides/hooks.py` — mermaid conversion hook, don't break it
- `.github/workflows/deploy.yml` — deployment config (Cloudflare Pages)

## Deployment

Push to `master` or `main` triggers the `deploy` workflow: installs deps, runs `mkdocs build`, deploys `site/` to Cloudflare Pages (`fptoj-wiki` project).
