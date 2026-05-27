# FPTOJ Wiki

[![Site](https://img.shields.io/badge/Site-wiki.fptoj.com-blue?style=for-the-badge&logo=google-chrome&logoColor=white)](https://wiki.fptoj.com)
[![GitHub](https://img.shields.io/badge/GitHub-FPTOJ--OJ/fptoj_wiki-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/FPTOJ-OJ/fptoj_wiki)

A competitive programming and algorithms wiki for students and enthusiasts. All content is in Vietnamese.

> **FPTOJ Wiki** is a fork of [VNOI Wiki](https://wiki.vnoi.info/), maintained and customized by the FPTOJ community.

---

## Content

### Basic Programming

For **absolute beginners**. Learn programming from scratch before diving into algorithms.

| Track | Lessons | Topics |
|-------|---------|--------|
| [Python for Competitive Programming](docs/coding/python/index.md) | 20 | Variables, loops, lists, dicts, sets, functions, collections, heapq, itertools |
| [C++ for Competitive Programming](docs/coding/cpp/index.md) | 17 | Syntax, arrays, strings, pointers, fast I/O, STL (vector, map, set, queue) |

> Study this section **first** if you have no programming experience.

### Algorithm Lessons

39+ lessons from basic to advanced, with detailed explanations, code samples, and diagrams.

🔗 **[View all lessons →](docs/lessons/index.md)** · **[Interactive roadmap →](docs/lessons/roadmap.md)**

| Group | Topics |
|-------|--------|
| Intro (⭐) | Complexity, Sorting, Binary Search, Recursion, Bitwise |
| Techniques (⭐⭐) | Two Pointers, Prefix Sum, Binary Exponentiation |
| Data Structures | Heap, DSU, Segment Tree, Fenwick Tree, Trie, Hash Table |
| Graphs | BFS/DFS, Dijkstra, MST, Floyd-Warshall, LCA |
| DP & Greedy | Dynamic Programming, Greedy, Binary Search on Answer |
| Strings | KMP, Z-algorithm, Manacher, Suffix Array |
| Math | Euclidean GCD, Modular Inverse, Combinatorics, Number Theory |

### Algorithm Archive (from VNOI)

In-depth articles from the VNOI library and other sources. See the [VNOI Roadmap](https://roadmap.sh/r/vnoi-roadmap) for a complete study guide.

🔗 **[Full table of contents →](docs/index.md)**

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [MkDocs](https://www.mkdocs.org/) | Static site generator |
| [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) | Responsive theme with dark mode |
| [KaTeX](https://katex.org/) | Math rendering |
| [Isso-comments](https://isso-comments.de/) | Self-hosted comment system |
| Cloudflare Pages | Hosting & auto-deploy |

---

## Configuration

### Change Isso Comments Domain

The comment system uses [Isso](https://isso-comments.de/). To change the Isso server URL, edit `mkdocs.yml`:

```yaml
extra:
  isso_host: https://your-isso-server.com/
```

The value must end with `/`. The JS embed script is loaded from `{isso_host}js/embed.min.js`.

Requires Python 3.8+

```bash
git clone https://github.com/FPTOJ-OJ/fptoj_wiki.git
cd fptoj_wiki
pip install -r requirements.txt
python -m mkdocs serve
```

Or run `serve.bat` on Windows. Visit `http://127.0.0.1:8000`.

---

## Contributing

Contributions are welcome:

- **Pull Request** — fix bugs or add content
- **Issue** — report problems or suggest new articles

---

## Credits

Built on top of content from the **VNOI** community. Special thanks to [VNOI Wiki](https://wiki.vnoi.info/) for their invaluable contributions to Vietnamese CS education.

---

Made with ❤️ by **Ha Tri Kien** and **FPTOJ Team**.
