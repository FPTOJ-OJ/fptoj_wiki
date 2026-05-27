# Lộ trình học Lập trình thi đấu

Lộ trình từ **zero đến hero** — từ người mới bắt đầu đến giải cao ICPC/VOI. Mỗi bài học đều có link trực tiếp, mô tả ngắn và yêu cầu tiên quyết.

!!! tip "Cách sử dụng lộ trình"
    - **Học theo thứ tự nhóm** từ ⭐ đến ⭐⭐⭐⭐
    - Trong mỗi nhóm, học từ trên xuống dưới
    - Các nhóm có ký hiệu "nhánh rẽ" có thể học song song sau khi xong Nhóm 3
    - Nhóm 9 (Kỹ năng thi đấu) nên **xen kẽ từ sớm**, không cần chờ

---

## Sơ đồ tổng quan

<style>
  .markmap { position: relative; }
  .markmap > svg { width: 100%; min-height: 600px; }
  [data-md-color-scheme="slate"] .markmap > svg,
  [data-md-color-scheme="dark"] .markmap > svg { background: #1e1e1e; }
  [data-md-color-scheme="slate"] .markmap a,
  [data-md-color-scheme="dark"] .markmap a { fill: #89b4fa; }
  .markmap foreignObject a { color: #1a73e8; text-decoration: underline; }
  [data-md-color-scheme="slate"] .markmap foreignObject a { color: #89b4fa; }
  [data-md-color-scheme="slate"] .markmap foreignObject div,
  [data-md-color-scheme="slate"] .markmap foreignObject div div,
  [data-md-color-scheme="dark"] .markmap foreignObject div,
  [data-md-color-scheme="dark"] .markmap foreignObject div div {
    color: #cdd6f4 !important;
  }
  [data-md-color-scheme="slate"] .markmap line,
  [data-md-color-scheme="dark"] .markmap line {
    stroke-opacity: 0.6;
  }
</style>

<div class="markmap">
  <script type="text/template">
# FPTOJ Roadmap (71 bài)

## 🐍 Lập trình cơ bản
- [Python — 20 bài](/coding/python/)
- [C++ — 17 bài](/coding/cpp/)

## ⭐ Nhóm 1 — Nhập môn (6 bài)
- [Setup môi trường](/lessons/setup-moi-truong/)
- [Độ phức tạp](/lessons/do-phuc-tap-thoi-gian/)
- [Sắp xếp](/lessons/thuat-toan-sap-xep/)
- [Tìm kiếm nhị phân](/lessons/tim-kiem-nhi-phan/)
- [Phép toán bit](/lessons/phep-toan-bit/)
- [Đệ quy & Quay lui](/lessons/de-quy-va-quay-lui/)

## ⭐⭐ Nhóm 2 — Kỹ thuật cơ bản (3 bài)
- [Hai con trỏ](/lessons/ky-thuat-hai-con-tro/)
- [Mảng, Stack, Prefix Sum](/lessons/mang-stack-prefix-sum/)
- [Lũy thừa nhị phân & Sàng nguyên tố](/lessons/luy-thua-nhi-phan-sang-nguyen-to/)

## ⭐⭐ Nhóm 3 — Cấu trúc dữ liệu cơ bản (9 bài)
- [Linked List](/lessons/linked-list/)
- [Queue](/lessons/queue/)
- [Hash Table](/lessons/hash-table/)
- [Deque & Sliding Window](/lessons/deque-sliding-window/)
- [Trie](/lessons/trie/)
- [Heap](/lessons/heap/)
- [DSU](/lessons/dsu/)
- [Segment Tree](/lessons/segment-tree/)
- [Fenwick Tree](/lessons/fenwick-tree/)

## 🔄 Từ đây mở nhiều nhánh song song

## ⭐⭐⭐ Nhóm 4 — Đồ thị (4 bài)
- [BFS/DFS](/lessons/bfs-dfs-do-thi/)
- [MST, Dijkstra, Topo Sort](/lessons/mst-dijkstra-topo-sort/)
- [Floyd-Warshall & Bellman-Ford](/lessons/floyd-warshall-bellman-ford/)
- [LCA & Binary Lifting](/lessons/lca-binary-lifting/)

## ⭐⭐⭐ Nhóm 5 — QHĐ & Tham lam (3 bài)
- [Greedy](/lessons/greedy/)
- [Quy hoạch động](/lessons/quy-hoach-dong/)
- [Binary Search on Answer](/lessons/binary-search-on-answer/)

## ⭐⭐⭐ Nhóm 6 — Xử lý xâu (4 bài)
- [KMP](/lessons/kmp-tim-xau/)
- [Hash xâu & Z-algorithm](/lessons/hash-xau-z-algorithm/)
- [Manacher](/lessons/manacher/)
- [Suffix Array](/lessons/suffix-array/)

## ⭐⭐⭐ Nhóm 7 — Toán & Số học (12 bài)
- [Euclid & Modular Inverse](/lessons/euclid-modular-inverse/)
- [Tổ hợp & Xác suất](/lessons/to-hop-xac-suat/)
- [Số học nâng cao](/lessons/so-hoc-nang-cao/)
- [Lý thuyết trò chơi](/lessons/ly-thuyet-tro-choi/)
- [Sàng nâng cao & Hàm ước](/lessons/sang-nang-cao-ham-uoc/)
- [Nguyên lý bao hàm - loại trừ](/lessons/nguyen-ly-bao-ham-loai-tru/)
- [Đếm đường đi trên lưới](/lessons/dem-duong-di-luoi/)
- [Nhân ma trận](/lessons/nhan-ma-tran/)
- [Logarithm rời rạc](/lessons/logarithm-roi-rac/)
- [Căn nguyên thủy](/lessons/can-nguyen-thuy/)
- [NTT & Nhân đa thức](/lessons/ntt-nhan-da-thuc/)
- [Khử Gauss](/lessons/khu-gauss/)

## ⭐⭐⭐ Nhóm 8 — Hình học (10 bài)
- [Hình học cơ bản](/lessons/hinh-hoc-co-ban/)
- [Phương trình đường thẳng](/lessons/phuong-trinh-duong-thang/)
- [Hình học đường tròn](/lessons/hinh-hoc-duong-tron/)
- [Định lý Pick](/lessons/dinh-ly-pick/)
- [Góc & Phép quay](/lessons/goc-phep-quay/)
- [Sắp xếp cực & Quét góc](/lessons/sap-xep-cuc/)
- [Bao lồi](/lessons/bao-loi/)
- [Stack nâng cao](/lessons/stack-nang-cao/)
- [BST](/lessons/bst/)
- [Sparse Table](/lessons/sparse-table/)

## 🏆 Nhóm 9 — Kỹ năng thi đấu (4 bài)
- [Kỹ năng thi đấu](/lessons/ky-nang-thi-dau/)
- [Sinh testcase](/lessons/sinh-testcase/)
- [Debug & Mẹo](/lessons/debug-meo/)
- [Tổ chức code](/lessons/to-chuc-code/)

## ⭐⭐⭐⭐ Nhóm 10 — Đồ thị nâng cao (4 bài)
- [SCC & Cầu & Khớp](/lessons/scc-bridges/)
- [Network Flow](/lessons/network-flow/)
- [Bipartite Matching](/lessons/bipartite-matching/)
- [2-SAT](/lessons/2sat/)

## ⭐⭐⭐⭐ Nhóm 11 — Cây nâng cao (3 bài)
- [Euler Tour](/lessons/euler-tour-tree/)
- [Centroid Decomposition](/lessons/centroid-decomposition/)
- [HLD](/lessons/hld/)

## ⭐⭐⭐⭐ Nhóm 12 — QHĐ nâng cao (4 bài)
- [DP trên cây](/lessons/dp-on-trees/)
- [Digit DP](/lessons/digit-dp/)
- [Interval DP](/lessons/interval-dp/)
- [Tối ưu DP](/lessons/dp-optimization/)

## ⭐⭐⭐⭐ Nhóm 13 — Xâu nâng cao (2 bài)
- [Aho-Corasick](/lessons/aho-corasick/)
- [Suffix Automaton](/lessons/suffix-automaton/)

## ⭐⭐⭐⭐ Nhóm 14 — Kỹ thuật nâng cao (3 bài)
- [Chia căn & Mo's](/lessons/sqrt-mo/)
- [Convex Hull Trick](/lessons/convex-hull-trick/)
- [Ternary Search](/lessons/ternary-search/)
  </script>
</div>

<script>
  window.markmap = {
    autoLoader: {
      toolbar: true,
    },
  };
</script>
<script src="https://cdn.jsdelivr.net/npm/markmap-autoloader@latest"></script>

---

## Chi tiết lộ trình theo nhóm

### ⭐ Nhóm 1 — Nhập môn (6 bài)

> Dành cho người **hoàn toàn mới**. Học xong nhóm này, bạn có thể giải các bài cơ bản.

| Bài học | Nội dung chính | Tiên quyết |
|---------|---------------|-------------|
| [Setup môi trường](setup-moi-truong.md) | Cài đặt IDE, compiler, template C++/Python | Không |
| [Độ phức tạp thời gian](do-phuc-tap-thoi-gian.md) | Big-O, Big-Omega, ước lượng thời gian chạy | Không |
| [Thuật toán sắp xếp](thuat-toan-sap-xep.md) | Merge Sort, Quick Sort, Counting Sort | Độ phức tạp |
| [Tìm kiếm nhị phân](tim-kiem-nhi-phan.md) | Binary Search, lower/upper bound | Sắp xếp |
| [Phép toán bit](phep-toan-bit.md) | AND, OR, XOR, bitmask, subset enumeration | Không |
| [Đệ quy và quay lui](de-quy-va-quay-lui.md) | Recursion, backtracking, N-Queens, Sudoku | Không |

---

### ⭐⭐ Nhóm 2 — Kỹ thuật cơ bản (3 bài)

> Các kỹ thuật dùng **rất thường xuyên** trong thi đấu. Học xong có thể giải 60-70% bài cơ bản.

| Bài học | Nội dung chính | Tiên quyết |
|---------|---------------|-------------|
| [Hai con trỏ](ky-thuat-hai-con-tro.md) | Two pointers, sliding window, Two Sum | Sắp xếp, Tìm kiếm nhị phân |
| [Mảng, Stack, Prefix Sum](mang-stack-prefix-sum.md) | Prefix Sum, Difference Array, Monotone Stack | Không |
| [Lũy thừa nhị phân & Sàng nguyên tố](luy-thua-nhi-phan-sang-nguyen-to.md) | Fast modular exponentiation, Sieve of Eratosthenes | Không |

---

### ⭐⭐ Nhóm 3 — Cấu trúc dữ liệu cơ bản (9 bài)

> Các cấu trúc dữ liệu **bắt buộc phải biết**. Không có chúng, bạn không thể giải nhiều bài.

| Bài học | Nội dung chính | Tiên quyết |
|---------|---------------|-------------|
| [Linked List](linked-list.md) | Danh sách liên kết đơn/đôi, cài đặt Stack/Queue | Không |
| [Queue](queue.md) | Hàng đợi FIFO, mảng vòng, BFS cơ bản | Không |
| [Hash Table](hash-table.md) | Bảng băm, hash function, chaining, open addressing | Không |
| [Deque & Sliding Window](deque-sliding-window.md) | Deque, hàng đợi đơn điệu, min/max trên đoạn | Queue |
| [Trie](trie.md) | Cây tiền tố, bitwise trie, autocomplete | Hash Table |
| [Heap](heap.md) | Priority Queue, Binary Heap, Heap Sort | Sắp xếp |
| [DSU](dsu.md) | Disjoint Set Union, Path Compression, Union by Rank | Hash Table |
| [Segment Tree](segment-tree.md) | Cây phân đoạn, Lazy Propagation, Range Query | Mảng, Prefix Sum |
| [Fenwick Tree](fenwick-tree.md) | Cây chỉ số nhị phân, Prefix Sum Query | Mảng, Prefix Sum |

---

### ⭐⭐⭐ Nhóm 4 — Đồ thị (4 bài)

> Đồ thị là **lĩnh vực lớn nhất** trong competitive programming. Học xong nhóm này, bạn có thể giải phần lớn bài đồ thị.

| Bài học | Nội dung chính | Tiên quyết |
|---------|---------------|-------------|
| [BFS/DFS trên đồ thị](bfs-dfs-do-thi.md) | Duyệt đồ thị, thành phần liên thông, topo sort | Queue |
| [MST, Dijkstra, Topo Sort](mst-dijkstra-topo-sort.md) | Cây khung nhỏ nhất, đường đi ngắn nhất | BFS/DFS, Heap |
| [Floyd-Warshall & Bellman-Ford](floyd-warshall-bellman-ford.md) | Đường đi ngắn nhất tất cả cặp, cạnh âm | BFS/DFS |
| [LCA & Binary Lifting](lca-binary-lifting.md) | Tổ tiên chung gần nhất, nhảy bậc $2^k$ | BFS/DFS |

---

### ⭐⭐⭐ Nhóm 5 — Quy hoạch động & Tham lam (3 bài)

> **Quy hoạch động** là kỹ năng quan trọng nhất trong competitive programming. Cần nhiều thời gian luyện tập.

| Bài học | Nội dung chính | Tiên quyết |
|---------|---------------|-------------|
| [Greedy](greedy.md) | Thuật toán tham lam, chứng minh tính đúng | Sắp xếp |
| [Quy hoạch động](quy-hoach-dong.md) | 4 bước xây dựng DP, Knapsack, LIS, LCS | Không |
| [Binary Search on Answer](binary-search-on-answer.md) | Tìm kiếm nhị phân trên đáp án, parametric search | Tìm kiếm nhị phân |

---

### ⭐⭐⭐ Nhóm 6 — Xử lý xâu (4 bài)

> Xử lý xâu là mảng riêng biệt, cần học các thuật toán chuyên biệt.

| Bài học | Nội dung chính | Tiên quyết |
|---------|---------------|-------------|
| [KMP](kmp-tim-xau.md) | Thuật toán Knuth-Morris-Pratt, prefix function | Không |
| [Hash xâu & Z-algorithm](hash-xau-z-algorithm.md) | Rolling hash, Z-function, Rabin-Karp | Không |
| [Manacher](manacher.md) | Tìm palindrome dài nhất trong $O(N)$ | Không |
| [Suffix Array](suffix-array.md) | Mảng hậu tố, LCP array, Doubling algorithm | Không |

---

### ⭐⭐⭐ Nhóm 7 — Toán & Số học (12 bài)

> Toán học xuất hiện ở rất nhiều bài. Học các kỹ thuật số học giúp giải nhiều bài "khó hiểu".

| Bài học | Nội dung chính | Tiên quyết |
|---------|---------------|-------------|
| [Euclid & Modular Inverse](euclid-modular-inverse.md) | GCD, Extended Euclid, nghịch đảo modulo | Lũy thừa nhị phân |
| [Tổ hợp & Xác suất](to-hop-xac-suat.md) | $C(n,k)$, giai thừa modulo, xác suất cơ bản | Modular Inverse |
| [Số học nâng cao](so-hoc-nang-cao.md) | Euler's totient, Lucas Theorem, CRT, Möbius | Modular Inverse |
| [Lý thuyết trò chơi](ly-thuyet-tro-choi.md) | Sprague-Grundy, Nim, Grundy number | Không |
| [Sàng nâng cao & Hàm ước](sang-nang-cao-ham-uoc.md) | Linear sieve, SPF, đếm ước, phân tích thừa số | Sàng nguyên tố |
| [Nguyên lý bao hàm - loại trừ](nguyen-ly-bao-ham-loai-tru.md) | Inclusion-Exclusion, derangement | Tổ hợp |
| [Đếm đường đi trên lưới](dem-duong-di-luoi.md) | $\binom{n+m}{n}$, Catalan, đếm trên lưới có vật cản | Tổ hợp |
| [Nhân ma trận](nhan-ma-tran.md) | Ma trận, lũy thừa ma trận, đếm đường đi | Lũy thừa nhị phân |
| [Logarithm rời rạc](logarithm-roi-rac.md) | BSGS (Baby-Step Giant-Step), discrete log | Modular Inverse |
| [Căn nguyên thủy](can-nguyen-thuy.md) | Primitive root, Tonelli-Shanks, dấu hiệu bình phương | Euler's totient |
| [NTT & Nhân đa thức](ntt-nhan-da-thuc.md) | Number Theoretic Transform, FFT modulo | Căn nguyên thủy |
| [Khử Gauss](khu-gauss.md) | Elimination, hạng ma trận, hệ phương trình tuyến tính | Không |

---

### ⭐⭐⭐ Nhóm 8 — Hình học (10 bài)

> Hình học tính toán — từ cơ bản đến nâng cao. Cần nắm vững tích vô hướng/có hướng.

| Bài học | Nội dung chính | Tiên quyết |
|---------|---------------|-------------|
| [Hình học cơ bản](hinh-hoc-co-ban.md) | Tích vô hướng, tích có hướng, diện tích, vị trí tương đối | Không |
| [Phương trình đường thẳng](phuong-trinh-duong-thang.md) | Giao điểm, khoảng cách, diện tích đa giác | Hình học cơ bản |
| [Hình học đường tròn](hinh-hoc-duong-tron.md) | Tiếp tuyến, giao đường tròn, diện tích giao | Hình học cơ bản |
| [Định lý Pick](dinh-ly-pick.md) | Đếm điểm nguyên trong đa giác, Pick's theorem | Hình học cơ bản |
| [Góc & Phép quay](goc-phep-quay.md) | atan2, quay điểm, quay không gian | Hình học cơ bản |
| [Sắp xếp cực & Quét góc](sap-xep-cuc.md) | Sắp xếp theo góc, sweep line, rotating calipers | Hình học cơ bản |
| [Bao lồi](bao-loi.md) | Convex Hull, Graham Scan, Andrew's Monotone Chain | Hình học cơ bản |
| [Stack nâng cao](stack-nang-cao.md) | Monotone stack, biểu thức, hình chữ nhật lớn nhất | Stack |
| [BST](bst.md) | Cây tìm kiếm nhị phân, chèn/xóa/tìm, duyệt cây | Sắp xếp |
| [Sparse Table](sparse-table.md) | Truy vấn min/max $O(1)$ trên mảng tĩnh | Mảng |

---

### 🏆 Nhóm 9 — Kỹ năng thi đấu (4 bài)

> Không phải thuật toán, nhưng **cực kỳ quan trọng** để đạt điểm cao. Nên học xen kẽ từ sớm.

| Bài học | Nội dung chính | Tiên quyết |
|---------|---------------|-------------|
| [Kỹ năng thi đấu](ky-nang-thi-dau.md) | Chiến thuật đọc đề, quản lý thời gian, phân bổ thời gian | Không |
| [Sinh testcase & Stress test](sinh-testcase.md) | Tạo testcase ngẫu nhiên, stress test tìm bug | Không |
| [Debug & Mẹo thi đấu](debug-meo.md) | Debug hiệu quả, fix WA/TLE/RE, mẹo code nhanh | Không |
| [Tổ chức code & Nộp bài](to-chuc-code.md) | Quản lý thư mục, script test tự động, template | Không |

---

### ⭐⭐⭐⭐ Nhóm 10 — Đồ thị nâng cao (4 bài)

> Các thuật toán đồ thị **nâng cao**, cần thiết cho ICPC/VOI.

| Bài học | Nội dung chính | Tiên quyết |
|---------|---------------|-------------|
| [SCC & Cầu & Khớp](scc-bridges.md) | Tarjan, Kosaraju, bridges, articulation points | BFS/DFS |
| [Network Flow](network-flow.md) | Edmonds-Karp, Dinic, Min-Cost Max-Flow | BFS/DFS |
| [Bipartite Matching](bipartite-matching.md) | Kuhn's, Hopcroft-Karp, Hungarian | BFS/DFS |
| [2-SAT](2sat.md) | Bài toán thỏa mãn logic, implication graph, SCC | SCC |

---

### ⭐⭐⭐⭐ Nhóm 11 — Cây nâng cao (3 bài)

> Các kỹ thuật **xử lý cây** nâng cao, xuất hiện rất thường xuyên trong bài khó.

| Bài học | Nội dung chính | Tiên quyết |
|---------|---------------|-------------|
| [Euler Tour](euler-tour-tree.md) | Flatten cây thành mảng, subtree query, LCA | BFS/DFS |
| [Centroid Decomposition](centroid-decomposition.md) | Phân tách trọng tâm, đếm đường đi trên cây | BFS/DFS |
| [HLD](hld.md) | Phân rã cây, truy vấn đường đi $O(\log^2 N)$ | LCA, Segment Tree |

---

### ⭐⭐⭐⭐ Nhóm 12 — Quy hoạch động nâng cao (4 bài)

> Các dạng **DP nâng cao**, thường xuất hiện trong bài khó.

| Bài học | Nội dung chính | Tiên quyết |
|---------|---------------|-------------|
| [DP trên cây](dp-on-trees.md) | Subtree DP, rerooting, tree knapsack | Quy hoạch động, BFS/DFS |
| [Digit DP](digit-dp.md) | Đếm số theo chữ số, memoization trên digit | Quy hoạch động |
| [Interval DP](interval-dp.md) | Matrix chain, merge stones, boolean parenthesization | Quy hoạch động |
| [Tối ưu DP](dp-optimization.md) | Knuth's, Divide & Conquer DP, CHT, Alien's trick | Quy hoạch động |

---

### ⭐⭐⭐⭐ Nhóm 13 — Xâu nâng cao (2 bài)

> Các thuật toán **xử lý xâu** nâng cao.

| Bài học | Nội dung chính | Tiên quyết |
|---------|---------------|-------------|
| [Aho-Corasick](aho-corasick.md) | Tìm nhiều mẫu trong xâu, failure links | KMP, Trie |
| [Suffix Automaton](suffix-automaton.md) | Máy trạng thái hậu tố, $O(N)$ construction | Suffix Array |

---

### ⭐⭐⭐⭐ Nhóm 14 — Kỹ thuật nâng cao (3 bài)

> Các **kỹ thuật** và **cấu trúc dữ liệu** nâng cao.

| Bài học | Nội dung chính | Tiên quyết |
|---------|---------------|-------------|
| [Chia căn & Mo's Algorithm](sqrt-mo.md) | Sqrt decomposition, offline queries, Hilbert curve | Mảng |
| [Convex Hull Trick](convex-hull-trick.md) | Tối ưu DP với đường thẳng, Li Chao Tree | Quy hoạch động |
| [Ternary Search](ternary-search.md) | Tìm kiếm tam phân, hàm unimodal | Tìm kiếm nhị phân |

---

## Gợi ý lộ trình theo thời gian

| Giai đoạn | Thời gian | Nội dung | Số bài |
|-----------|-----------|----------|--------|
| **Nền tảng** | Tuần 1–4 | Lập trình cơ bản → Nhóm 1 | 6 |
| **Kỹ thuật** | Tuần 5–10 | Nhóm 2 → Nhóm 3 | 12 |
| **Mở nhánh** | Tuần 11–16 | Nhóm 4 (chính) + Nhóm 5 hoặc 6 hoặc 7 | 7–12 |
| **Nâng cao** | Tuần 17–22 | Nhóm 10/11 (tiếp 4) + Nhóm 8 hoặc 9 | 7–14 |
| **Chuyên sâu** | Tuần 23–34 | Nhóm 12, 13, 14 | 9 |

> **Tổng: 71 bài giảng** — từ cơ bản đến chuyên sâu.

---

## Chú thích

| Ký hiệu | Độ khó | Đối tượng |
|----------|--------|-----------|
| ⭐ | Cơ bản | Người mới bắt đầu |
| ⭐⭐ | Trung bình | Nền tảng thi đấu |
| ⭐⭐⭐ | Nâng cao | Thi HSG, ICPC |
| ⭐⭐⭐⭐ | Rất khó | Thi cao cấp |

---

## Tài liệu tham khảo

- [VNOI Wiki](https://wiki.vnoi.info/) — Wiki thuật toán tiếng Việt
- [VNOI Roadmap](https://roadmap.sh/r/vnoi-roadmap) — Lộ trình VNOI
- [CP-Algorithms](https://cp-algorithms.com/) — Kho thuật toán CP
- [USACO Guide](https://usaco.guide/) — Lộ trình miễn phí
- [CSES Problem Set](https://cses.fi/problemset/) — Bài tập luyện tập
