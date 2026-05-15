# Lập Trình Cơ Bản — Từ Zero đến Thi Đấu

> **Dành cho:** Người chưa biết gì về lập trình, học sinh cấp 2–3
> **Mục tiêu:** Nắm vững Python & C++ để thi đấu competitive programming

---

## Bạn sẽ học được gì?

Bộ bài học này được thiết kế để đưa bạn **từ con số 0** đến mức có thể **thi đấu lập trình** một cách tự tin. Không lý thuyết suông, không "dâu ria" — chỉ những gì **cần thiết để giải bài**.

```mermaid
flowchart LR
    A["🐍 Chương 1<br>Python"] --> B["⚡ Chương 2<br>C++"]
    B --> C["🏆 Thi đấu<br>Competitive Programming"]
```

---

## Chương 1: Python cho Thi Đấu (20 bài)

> **Phù hợp cho:** Người chưa biết gì về lập trình
> **Sau khi học xong:** Viết được code Python, giải bài thi đấu cơ bản

```mermaid
flowchart TD
    subgraph A["Phần A — Cơ bản"]
        P01["P01: Cài đặt"]
        P02["P02: Biến"]
        P03["P03: Nhập/Xuất"]
        P04["P04: Toán tử"]
        P05["P05: Điều kiện"]
        P06["P06: Vòng lặp cơ bản"]
        P07["P07: Vòng lặp nâng cao"]
        P08["P08: String"]
    end
    subgraph B["Phần B — Cấu trúc dữ liệu"]
        P09["P09: List & Array 1D"]
        P10["P10: Array 2D"]
        P11["P11: Dict & Set"]
        P12["P12: Tuple"]
        P13["P13: Hàm"]
    end
    subgraph C["Phần C — Thư viện thi đấu"]
        P14["P14: collections"]
        P15["P15: heapq"]
        P16["P16: itertools"]
        P17["P17: bisect"]
        P18["P18: math & built-in"]
    end
    subgraph D["Phần D — Tổng hợp"]
        P19["P19: Kỹ thuật thi đấu"]
        P20["P20: Bài tập tổng hợp"]
    end
    A --> B --> C --> D
```

| Phần | Số bài | Nội dung |
|------|--------|----------|
| A — Cơ bản | 8 bài | Cài đặt, biến, nhập/xuất, toán tử, điều kiện, vòng lặp, string |
| B — Cấu trúc dữ liệu | 5 bài | List, array 2D, dict, set, tuple, hàm |
| C — Thư viện thi đấu | 5 bài | collections, heapq, itertools, bisect, math |
| D — Tổng hợp | 2 bài | Kỹ thuật thi đấu, bài tập tổng hợp |

---

## Chương 2: C++ cho Thi Đấu (15 bài)

> **Phù hợp cho:** Người đã vững Python
> **Sau khi học xong:** Viết được code C++, sử dụng STL, thi đấu hiệu quả

```mermaid
flowchart TD
    subgraph A2["Phần A — Cơ bản"]
        C01["C01: Tại sao C++?"]
        C02["C02: Cú pháp"]
        C03["C03: Điều kiện & Vòng lặp"]
        C04["C04: Mảng & Vector"]
        C05["C05: String"]
    end
    subgraph B2["Phần B — Kỹ thuật"]
        C06["C06: Hàm"]
        C07["C07: Template & Fast I/O"]
        C08["C08: Reference & Pointer"]
    end
    subgraph C2["Phần C — STL Cơ bản"]
        C09["C09: pair & tuple"]
        C10["C10: Vector nâng cao"]
        C11["C11: sort & algorithm"]
    end
    subgraph D2["Phần D — STL Nâng cao"]
        C12["C12: set & map"]
        C13["C13: queue, stack, deque"]
        C14["C14: algorithm nâng cao"]
        C15["C15: Mẹo thi đấu"]
    end
    A2 --> B2 --> C2 --> D2
```

| Phần | Số bài | Nội dung |
|------|--------|----------|
| A — Cơ bản | 5 bài | Cú pháp, điều kiện, vòng lặp, mảng, string |
| B — Kỹ thuật | 3 bài | Hàm, template, fast I/O, reference, pointer |
| C — STL Cơ bản | 3 bài | pair, tuple, vector, sort, algorithm |
| D — STL Nâng cao | 4 bài | set, map, queue, stack, deque, algorithm nâng cao |

---

## Lộ trình học đề xuất

### Tuần 1–3: Python cơ bản
```
P01 → P08
```

### Tuần 4–6: Cấu trúc dữ liệu Python
```
P09 → P13
```

### Tuần 7–9: Thư viện thi đấu Python
```
P14 → P18
```

### Tuần 10: Tổng hợp & Luyện tập
```
P19 → P20
```

### Tuần 11–15: Chuyển sang C++
```
C01 → C15
```

---

## Bài tập luyện tập

- **[CSES Problem Set](https://cses.fi/problemset/)** — Bộ bài tập cơ bản, phù hợp cho người mới
- **[VNOJ](https://oj.vnoi.info/)** — OJ Việt Nam, nhiều bài thi HSG, VOI
- **[Codeforces](https://codeforces.com/)** — Contest online, phân loại theo độ khó
- **[AtCoder](https://atcoder.jp/)** — Contest chất lượng cao

---

## Bài viết liên quan

- [Bài học Lập trình Thi đấu](../lessons/index.md) — Bộ bài học thuật toán & cấu trúc dữ liệu
- [VNOI Wiki](https://wiki.vnoi.info/) — Wiki thuật toán tiếng Việt
