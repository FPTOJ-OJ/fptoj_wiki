# Contribution Guidelines

**_Last modified on 27th May 2026_**

Thank you for wanting to contribute to FPTOJ Wiki! Whether it's a bug fix, new article, or improvement — every contribution helps the community grow.

Please read these guidelines carefully before opening an issue or pull request. **Issues and PRs that don't follow these guidelines may be closed without review.**

---

## Topics

- [General Rules](#general-rules)
- [Content Contributions](#content-contributions)
- [Pull Requests](#pull-requests)
- [Issue Reporting](#issue-reporting)
- [Code & Style Conventions](#code--style-conventions)
- [File Structure Rules](#file-structure-rules)

---

## General Rules

1. **Use English** for all issues, PRs, commit messages, and technical discussions. Content articles are written in Vietnamese, but all meta-communication should be in English to allow broader participation.
2. **One topic per issue/PR.** Don't bundle unrelated changes together.
3. **Search before you create.** Check existing [issues](https://github.com/FPTOJ-OJ/fptoj_wiki/issues) and [pull requests](https://github.com/FPTOJ-OJ/fptoj_wiki/pulls) to avoid duplicates.
4. **Be respectful.** We're all here to learn and help each other.
5. **No AI-generated content without review.** If you use AI tools to draft content, you must thoroughly review, fact-check, and edit it before submitting. Raw AI output with hallucinations or incorrect explanations will be rejected.

---

## Content Contributions

### Adding a New Article

1. Create the `.md` file in the correct `docs/` subdirectory:
   - Algorithm lessons → `docs/lessons/`
   - Basic programming → `docs/coding/python/` or `docs/coding/cpp/`
   - Translated articles → `docs/translate/`
   - Legacy algorithms → `docs/algo/`
2. Add the entry to `nav:` in `mkdocs.yml` — **if it's not in the nav, it doesn't exist on the site.**
3. Update `README.md` if it's a new group or major topic.

### Content Quality Standards

- **All content must be in Vietnamese.** UI strings in `mkdocs.yml` are also Vietnamese.
- **Explain concepts, don't just dump code.** Every code block should have surrounding explanation.
- **Include complexity analysis** where relevant (time and space).
- **Use working, tested code examples.** Broken code in tutorials is worse than no code.
- **Provide practice exercises** for programming lessons. Each exercise should have:
  - A clear problem statement
  - A `<div class="cp-pg">` interactive widget with `data-input`, `data-expected`, and `data-hint`
  - A collapsible solution block (`??? tip "Lời giải"`)
  - **No standalone code blocks** between the exercise description and the solution — input code goes into `data-starter` or `data-input`
- **Cite your sources.** If you translate or adapt content, link to the original.
- **Use relative links** for internal references: `[link text](../other-page.md)`, not absolute URLs.

### Updating Existing Articles

- Fix typos and broken links — these are always welcome.
- If you restructure a page significantly, explain why in the PR description.
- Don't remove content without discussing it in an issue first.

---

## Pull Requests

### Branch Naming

Use descriptive branch names:

```
feat/add-dijkstra-lesson
fix/broken-latex-rendering
update/python-p14-exercises
translate/codeforces-1234a
```

### PR Rules

1. **ALWAYS** create your PR against the `master` branch. PRs against other branches will be asked to switch.
2. **Keep your branch clean.** Rebase on master if needed. Don't include unrelated commits from other branches.
3. **Test your changes locally** before submitting:
   ```bash
   python -m mkdocs serve
   ```
   Verify that:
   - Pages render correctly
   - Navigation works
   - Math formulas display properly
   - Interactive playgrounds (`cp-pg`) work
   - Dark mode looks acceptable
   - No broken links
4. **Include screenshots** if your change affects visual layout or rendering.
5. **Use the PR template** if one is provided.
6. **Reference related issues** in your PR description: `Closes #123` or `Fixes #456`.
7. **Wait for review.** We may not merge immediately. Complex PRs may require multiple rounds of review.
8. **For large changes**, open an issue first to discuss the approach before investing time in implementation.

### Commit Messages

Follow conventional commit style:

```
type: short description in English

Optional longer explanation of what changed and why.
```

Types: `feat`, `fix`, `update`, `docs`, `style`, `refactor`, `chore`

Examples:
```
feat: add prefix sum lesson for Python
fix: correct LaTeX rendering in segment tree article
update: refresh P14 exercises with cp-pg widgets
docs: rewrite README in English
```

---

## Issue Reporting

### Bug Reports

Use the bug report template and include:

1. **Page URL** or file path where the bug occurs
2. **Expected behavior** vs **actual behavior**
3. **Browser and OS** (for rendering issues)
4. **Screenshots** if applicable
5. **Steps to reproduce** if the bug is not obvious

### Feature Requests

Use the feature request template and include:

1. **What** you want to add/change
2. **Why** it would be valuable
3. **Suggested implementation** if you have one

### Issue Rules

1. **ONLY** use the issue tracker for bugs and feature requests — not for general questions. For questions, use [GitHub Discussions](https://github.com/FPTOJ-OJ/fptoj_wiki/discussions).
2. **ALWAYS** use English so the broader community can participate.
3. **Check for duplicates** before creating a new issue.
4. **Anonymize sensitive information** — don't include real student names, school names, or personal data in examples.
5. **Be specific.** "The wiki is broken" is not helpful. Tell us which page, what you expected, and what happened instead.
6. **Creation does not guarantee a fix or implementation.** We prioritize based on impact and available time.

---

## Code & Style Conventions

### Markdown

- Use ATX-style headers: `## Title`, not `Title\n===`
- Use fenced code blocks with language identifiers:
  ````
  ```python
  code here
  ```
  ````
- Use `!!! note`, `??? question` for admonitions (supported by Material for MkDocs)
- Use `$...$` for inline math, `$$...$$` for display math (KaTeX)
- Use standard ` ```mermaid ` blocks for diagrams — the hook in `overrides/hooks.py` converts them automatically

### Code Examples

- **Python**: Follow PEP 8. Use descriptive variable names in examples.
- **C++**: Use standard competitive programming style. Include `#include` headers.
- **No trailing whitespace** in code blocks.
- **No unused imports** in example code.
- **Keep examples short and focused.** One concept per code block.

### Images

- Store images in `docs/uploads/`
- Use descriptive filenames: `segment-tree-example.png`, not `img1.png`
- Add alt text: `![Description](../uploads/image.png)`
- Optimize images before committing — no 5MB screenshots

---

## File Structure Rules

### What to Touch

| Path | Content |
|------|---------|
| `docs/lessons/` | Algorithm lesson articles |
| `docs/coding/` | Basic programming curriculum |
| `docs/algo/` | Legacy algorithm articles |
| `docs/translate/` | Translated articles |
| `docs/uploads/` | Images and static assets |
| `mkdocs.yml` | Site config and navigation |
| `overrides/` | Theme overrides and hooks |

### What NOT to Touch

| Path | Reason |
|------|--------|
| `site/` | Build output, gitignored |
| `overrides/hooks.py` | Mermaid conversion hook — breaking it breaks all diagrams |
| `.github/workflows/deploy.yml` | Deployment config — changes here affect production |
| `docs/coding/python/P*.md` exercise sections | Follow the cp-pg + tip pattern exactly (see below) |

### Exercise Format (Coding Lessons)

Every exercise in `docs/coding/` must follow this exact pattern:

```markdown
### Bài N: Title
Description of the problem.

<div class="cp-pg" data-language="python" data-starter="# Viết code ở đây" data-input="input data" data-expected="expected output" data-hint="Hint text"></div>

???? tip "Lời giải"
    ```python
    solution code here
    ```
```

**Rules:**
- No standalone code blocks between the `cp-pg` div and the solution block
- Input data goes in `data-input`, not in a separate code block
- Starter code (variable assignments) goes in `data-starter`
- Both `??? tip` and `???? tip` are valid — match the existing style in the file
- Solution code is indented 4 spaces (inside the tip block)

---

## Lesson Structure & Quality Standards

Mỗi bài giảng thuật toán cần tuân theo cấu trúc 13 phần dưới đây. Đây là "chuẩn vàng" (gold standard) cho mọi bài viết trên FPTOJ Wiki.

### Cấu trúc chuẩn một Lesson (13 phần)

| # | Phần | Mô tả |
|---|------|-------|
| 1 | **Tiêu đề + Meta** | Số bài, độ khó (Dễ/Trung bình/Khó), kiến thức nền cần có, thời lượng ước tính |
| 2 | **Dẫn nhập / Motivation** | Bài toán thực tế hoặc ví dụ trực quan để tạo động lực. Trả lời "học cái này để làm gì?" |
| 3 | **Phát biểu bài toán** | Một bài toán cụ thể, input/output, ràng buộc, ví dụ có giải thích |
| 4 | **Cách tiếp cận ngây thơ (Brute Force)** | Giải pháp dễ nghĩ nhất nhưng không tối ưu → phân tích độ phức tạp → chỉ ra lý do cần thuật toán mới |
| 5 | **Ý tưởng cốt lõi** | Insight chính, trực quan hóa bằng sơ đồ hoặc ví dụ chạy tay từng bước |
| 6 | **Chi tiết thuật toán** | Mô tả từng bước + pseudocode + walkthrough một ví dụ cụ thể + edge cases |
| 7 | **Cài đặt** | Code sạch (C++/Python), giải thích chi tiết implementation, lỗi thường gặp |
| 8 | **Phân tích độ phức tạp** | Dẫn xuất time + space complexity, best/worst/average case |
| 9 | **Chứng minh tính đúng đắn** | (cho bài khó) Invariant, quy nạp, greedy choice property |
| 10 | **Biến thể & Mở rộng** | Các biến thể phổ biến, bài toán liên quan, kết nối với thuật toán khác |
| 11 | **Bài tập thực hành** | 3-5 bài từ dễ đến khó, link OJ (VNOJ, Codeforces, AtCoder...), gợi ý |
| 12 | **Tổng kết** | Key takeaways, khi nào dùng thuật toán này, lỗi sai phổ biến |
| 13 | **Tài liệu tham khảo** | Đọc thêm, nguồn gốc |

### Độ dài theo độ khó

| Độ khó | Số từ | Thời lượng học |
|--------|-------|----------------|
| Dễ | 1.500–3.000 | 30–60 phút |
| Trung bình | 3.000–5.000 | 60–90 phút |
| Khó | 4.000–8.000 | 90–180 phút |

### Cách giảng theo độ khó

#### Dễ (prefix sum, two pointers, sort cơ bản)
- **Trực quan 70% — Code 30%**
- Nhiều sơ đồ + chạy tay từng bước
- Bắt đầu từ bài toán siêu đơn giản, gần gũi (vd: "mảng cộng dồn như tính tiền tích lũy")
- Luôn so sánh brute force → optimized để thấy sự khác biệt
- Dùng cp-pg widget cho bài tập tương tác
- Bài tập thực hành là áp dụng trực tiếp, không biến tấu

#### Trung bình (binary search trên đáp số, DP cơ bản, BFS/DFS)
- **Pattern 50% — Kỹ thuật 30% — Code 20%**
- Dạy "khuôn mẫu" (template) áp dụng được cho nhiều bài
- Show 2-3 dạng bài khác nhau dùng chung 1 kỹ thuật
- Nhấn mạnh: làm sao để nhận ra khi nào dùng kỹ thuật này
- Phân tích độ phức tạp kỹ hơn
- Bài tập có biến tấu nhẹ, không chỉ áp dụng trực tiếp

#### Khó (segment tree lazy, flow, DP nâng cao)
- **Lý thuyết 40% — Kỹ thuật 35% — Code 25%**
- Bắt đầu từ nền tảng lý thuyết
- Chứng minh đúng đắn (bán hình thức hoặc đầy đủ)
- Chi tiết cơ chế nội tại của cấu trúc dữ liệu
- Nhiều hướng cài đặt + tối ưu hóa
- Kết nối với các chủ đề nâng cao khác
- Bài tập là sự kết hợp nhiều kỹ thuật

### Thang điểm đánh giá chất lượng (Rubric 10 điểm)

| Tiêu chí | Trọng số | 1 điểm (Kém) | 3 điểm (Đạt) | 5 điểm (Xuất sắc) |
|----------|----------|-------------|-------------|-------------------|
| **Motivation** | 15% | Không có bối cảnh | Có bài toán nhưng chưa rõ động lực | Ví dụ thực tế lôi cuốn, rõ "tại sao" |
| **Độ rõ ràng** | 25% | Lộn xộn, nhảy cóc | Dễ hiểu nhưng chưa mượt | Trong vắt, xây dựng trực quan từng lớp |
| **Ví dụ minh họa** | 15% | Không có hoặc 1 ví dụ tầm thường | 1-2 ví dụ ổn | Nhiều ví dụ chi tiết, có edge case |
| **Trực quan hóa** | 10% | Chỉ có text | ASCII art hoặc sơ đồ đơn giản | Sơ đồ phong phú, có Mermaid/matplotlib động |
| **Chất lượng code** | 15% | Code lỗi hoặc khó đọc | Chạy được nhưng chưa sạch | Sạch, có cấu trúc, xử lý biên đầy đủ |
| **Phân tích độ phức tạp** | 10% | Không có | Chỉ có time | Cả time + space, dẫn xuất, đủ best/worst/average |
| **Bài tập thực hành** | 5% | Không có | 1-2 bài | 3+ bài tăng dần độ khó + gợi ý |
| **Mạch sư phạm** | 5% | Thiếu tổ chức | Logic nhưng chuyển đoạn gượng | Mượt mà, mỗi phần kế thừa phần trước |

**Phân loại**:
- **9.0–10**: Xuất sắc — publish ngay
- **7.0–8.5**: Tốt — cần chỉnh sửa nhẹ
- **5.0–6.5**: Đạt — cần sửa 1-2 phần
- **3.0–4.5**: Yếu — cần viết lại đáng kể
- **1.0–2.5**: Không đạt — viết lại từ đầu

### Lưu ý đặc thù tiếng Việt

- Mọi thuật ngữ kỹ thuật cần có **cả tiếng Anh + tiếng Việt** (vd: "prefix sum (mảng cộng dồn)")
- Analogies gần gũi văn hóa Việt Nam (nông nghiệp, trường lớp, gia đình)
- Code comment bằng tiếng Việt
- Ưu tiên link bài tập trên các OJ Việt Nam (VNOJ, LQDOJ...)

---

## When creating an issue, feature request, or pull request, you will be asked to confirm that you have read and followed these guidelines.
