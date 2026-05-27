# AGENTS.md — FPTOJ Wiki

## What This Is

MkDocs + Material theme wiki for competitive programming education (Vietnamese). Content lives in `docs/`, config in `mkdocs.yml`. Deployed to Cloudflare Pages via GitHub Actions on push to `master`/`main`.

- **Site**: https://wiki.fptoj.com
- **Repo**: https://github.com/FPTOJ-OJ/fptoj_wiki
- **Author**: KienPC / FPTOJ Team

---

## Local Dev

```bash
# Install dependencies (once)
pip install -r requirements.txt

# Start dev server
python -m mkdocs serve
```

Platform-specific helpers:
- **Windows**: `serve.bat` — sets UTF-8 codepage, logs to `log.txt`
- **Linux/macOS**: `serve.sh [port]` — auto-installs deps if missing, logs to `log.txt`

Visit `http://localhost:8000`. Pages auto-reload on file changes.

### Dependencies

```
mkdocs<2.0.0
mkdocs-material
pymdown-extensions
pygments
pyyaml
mkdocs-mermaid2-plugin
```

Python 3.8+ required.

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
├── hooks.py                    # Mermaid → <div> conversion hook
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

???? tip "Lời giải"
    ```python
    solution code
    ```
```

**Rules**:
- No standalone code blocks between `cp-pg` and solution block
- Input goes in `data-input`, not in a separate code block
- Variable assignments go in `data-starter`
- Solution code is indented 4 spaces (inside the tip block)
- Both `??? tip` and `???? tip` are valid — match existing file style

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
| `overrides/hooks.py` | Mermaid conversion hook — breaking it breaks all diagrams |
| `.github/workflows/deploy.yml` | Deployment config (Cloudflare Pages) |
| `overrides/__pycache__/` | Python cache, gitignored |

---

## Deployment

Push to `master` or `main` triggers the `deploy` workflow:

1. `actions/checkout@v4`
2. `actions/setup-python@v5` (Python 3.x)
3. `pip install -r requirements.txt`
4. `mkdocs build`
5. Deploy `site/` to Cloudflare Pages (`fptoj-wiki` project)

Requires secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`.

---

## Common Tasks

### Run a quick build check (no server)

```bash
python -m mkdocs build --strict
```

`--strict` treats warnings as errors — useful for CI and catching broken links.

### Find broken internal links

```bash
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
# Example: replace all ??? tip with ???? tip in Python exercises
find docs/coding/python -name "*.md" -exec sed -i 's/??? tip/???? tip/g' {} +
```

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for full guidelines. Summary:

- Content in Vietnamese, meta-communication in English
- One topic per issue/PR
- Test locally before submitting PR
- Follow exercise format for coding lessons
- No raw AI-generated content without review
