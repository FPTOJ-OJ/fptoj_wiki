# Tổng hợp bài học Lập trình thi đấu

Bộ bài học **Lập trình thi đấu** được biên soạn dành cho người mới bắt đầu, từ các kiến thức nền tảng đến nâng cao. Mỗi bài học đều có giải thích trực quan, ví dụ minh hoạ và code mẫu.

!!! warning "Học code trước khi học thuật toán!"
    Nếu bạn **chưa biết lập trình**, hãy học [**Chương 1: Python cho Thi Đấu**](../coding/python/index.md) hoặc [**Chương 2: C++ cho Thi Đấu**](../coding/cpp/index.md) **TRƯỚC** khi bắt đầu học thuật toán. Việc nắm vững cú pháp và cách sử dụng ngôn ngữ lập trình sẽ giúp bạn hiểu thuật toán nhanh hơn rất nhiều!

!!! tip "Học theo thứ tự"
    Hãy học từ **Nhóm 1** trước, rồi dần dần lên nhóm cao hơn. Mỗi nhóm có độ khó tăng dần.

---

## Nhóm 1: Nhập môn — Bắt đầu từ đâu (Bài 1 - 6)

> Dành cho người **hoàn toàn mới**. Học xong nhóm này, bạn có thể giải được các bài cơ bản.

| # | Bài học | Mô tả | Độ khó |
|---|---------|-------|--------|
| 35 | [Setup môi trường thi đấu](35-setup-moi-truong.md) | Template C++/Python, fast I/O, cài đặt editor | ⭐ |
| 01 | [Độ phức tạp thời gian](01-do-phuc-tap-thoi-gian.md) | Big-O, phân tích thuật toán, ước lượng thời gian chạy | ⭐ |
| 02 | [Thuật toán sắp xếp](02-thuat-toan-sap-xep.md) | Merge Sort, Quick Sort, đếm inversion, so sánh các thuật toán | ⭐⭐ |
| 03 | [Tìm kiếm nhị phân](03-tim-kiem-nhi-phan.md) | Binary Search trên mảng, lower/upper bound, cài đặt | ⭐⭐ |
| 05 | [Phép toán bit](05-phep-toan-bit.md) | AND, OR, XOR, bitmask, ứng dụng trong thi đấu | ⭐⭐ |
| 06 | [Đệ quy và quay lui](06-de-quy-va-quay-lui.md) | Recursion, backtracking, sinh tổ hợp, cắt nhánh | ⭐⭐ |

---

## Nhóm 2: Kỹ thuật cơ bản (Bài 4, 7, 11)

> Các kỹ thuật dùng **rất thường xuyên** trong thi đấu. Học xong nhóm này, bạn có thể giải 60-70% bài cơ bản.

| # | Bài học | Mô tả | Độ khó |
|---|---------|-------|--------|
| 04 | [Kĩ thuật hai con trỏ](04-ky-thuat-hai-con-tro.md) | Two pointers, sliding window, các dạng bài thường gặp | ⭐⭐ |
| 07 | [Mảng, Stack, Prefix Sum](07-mang-stack-prefix-sum.md) | Mảng, danh sách liên kết, Stack, Prefix Sum, Difference Array | ⭐⭐ |
| 11 | [Lũy thừa nhị phân & Sàng nguyên tố](11-luy-thua-nhi-phan-sang-nguyen-to.md) | Tính mũ nhanh O(log N), sàng Eratosthenes, phân tích thừa số | ⭐⭐ |

---

## Nhóm 3: Cấu trúc dữ liệu cơ bản (Bài 8, 15 - 17, 33 - 34)

> Các cấu trúc dữ liệu **bắt buộc phải biết**. Thiếu chúng, bạn không thể giải nhiều bài.

| # | Bài học | Mô tả | Độ khó |
|---|---------|-------|--------|
| 33 | [Linked List chi tiết](33-linked-list.md) | Danh sách liên kết đơn/đôi, cài đặt Stack/Queue bằng LL | ⭐⭐ |
| 34 | [Queue cơ bản](34-queue.md) | Hàng đợi FIFO, mảng vòng, BFS, các biến thể | ⭐⭐ |
| 16 | [Hash Table](16-hash-table.md) | Bảng băm, hash function, chaining, open addressing | ⭐⭐ |
| 15 | [Deque & Sliding Window](15-deque-sliding-window.md) | Deque, hàng đợi đơn điệu, tìm min/max trên đoạn tịnh tiến | ⭐⭐⭐ |
| 17 | [Trie](17-trie.md) | Cây tiền tố, bitwise trie, autocomplete | ⭐⭐⭐ |
| 08a | [Heap (Hàng đợi ưu tiên)](08a-heap.md) | Priority Queue, Binary Heap, Heap Sort | ⭐⭐ |
| 08b | [DSU (Gộp tập hợp)](08b-dsu.md) | Disjoint Set Union, Path Compression | ⭐⭐ |
| 08c | [Segment Tree](08c-segment-tree.md) | Cây phân đoạn, Lazy Propagation | ⭐⭐⭐ |
| 08d | [Fenwick Tree (BIT)](08d-fenwick-tree.md) | Cây chỉ số nhị phân | ⭐⭐⭐ |

---

## Nhóm 4: Thuật toán đồ thị (Bài 10, 13, 23, 31)

> Đồ thị là **lĩnh vực lớn nhất** trong competitive programming. Học xong nhóm này, bạn có thể giải phần lớn bài đồ thị.

| # | Bài học | Mô tả | Độ khó |
|---|---------|-------|--------|
| 10 | [BFS/DFS trên đồ thị](10-bfs-dfs-do-thi.md) | Duyệt đồ thị, thành phần liên thông, ứng dụng | ⭐⭐ |
| 13 | [MST, Dijkstra, Topo Sort](13-mst-dijkstra-topo-sort.md) | Cây khung nhỏ nhất, đường đi ngắn nhất, sắp xếp topo | ⭐⭐⭐ |
| 23 | [Floyd-Warshall & Bellman-Ford](23-floyd-warshall-bellman-ford.md) | Đường đi ngắn nhất tất cả cặp, đồ thị có cạnh âm | ⭐⭐⭐ |
| 31 | [LCA & Binary Lifting](31-lca-binary-lifting.md) | Tổ tiên chung gần nhất, nhảy bậc 2^k trên cây | ⭐⭐⭐ |

---

## Nhóm 5: Quy hoạch động & Tham lam (Bài 12, 21, 25)

> **Quy hoạch động** là kỹ năng quan trọng nhất trong competitive programming. Cần nhiều thời gian luyện tập.

| # | Bài học | Mô tả | Độ khó |
|---|---------|-------|--------|
| 21 | [Greedy](21-greedy.md) | Thuật toán tham lam, chứng minh tính đúng, ví dụ điển hình | ⭐⭐⭐ |
| 12 | [Quy hoạch động](12-quy-hoach-dong.md) | 4 bước xây dựng DP, các dạng DP cơ bản và nâng cao | ⭐⭐⭐⭐ |
| 25 | [Binary Search on Answer](25-binary-search-on-answer.md) | Tìm kiếm nhị phân trên đáp án, tối ưu hoá bài toán | ⭐⭐⭐ |

---

## Nhóm 6: Xử lý xâu (Bài 9, 14, 20, 32)

> Xử lý xâu là mảng riêng biệt, cần học các thuật toán chuyên biệt.

| # | Bài học | Mô tả | Độ khó |
|---|---------|-------|--------|
| 09 | [KMP - Tìm xâu](09-kmp-tim-xau.md) | Thuật toán Knuth-Morris-Pratt, tìm mẫu trong xâu | ⭐⭐⭐ |
| 14 | [Hash xâu & Z-algorithm](14-hash-xau-z-algorithm.md) | Hash xâu so sánh, Z-function, Rabin-Karp | ⭐⭐⭐ |
| 20 | [Manacher](20-manacher.md) | Tìm palindrome dài nhất trong O(N) | ⭐⭐⭐⭐ |
| 32 | [Suffix Array](32-suffix-array.md) | Mảng hậu tố, LCP array, Doubling algorithm | ⭐⭐⭐⭐ |

---

## Nhóm 7: Toán & Số học (Bài 18 - 19, 26 - 27)

> Toán học xuất hiện ở rất nhiều bài. Học các kỹ thuật số học giúp giải nhiều bài "khó hiểu".

| # | Bài học | Mô tả | Độ khó |
|---|---------|-------|--------|
| 18 | [Euclid & Modular Inverse](18-euclid-modular-inverse.md) | GCD, extended Euclid, nghịch đảo modulo | ⭐⭐⭐ |
| 19 | [Tổ hợp & Xác suất](19-to-hop-xac-suat.md) | C(n,k), giai thừa modulo, xác suất cơ bản | ⭐⭐⭐ |
| 26 | [Số học nâng cao](26-so-hoc-nang-cao.md) | Phi hàm Euler, Lucas Theorem, CRT, Möbius | ⭐⭐⭐⭐ |
| 27 | [Lý thuyết trò chơi](27-ly-thuyet-tro-choi.md) | Sprague-Grundy, Nim, Grundy number, ứng dụng | ⭐⭐⭐⭐ |

---

## Nhóm 8: Hình học & Nâng cao (Bài 22, 24, 28, 29 - 30)

> Các chủ đề nâng cao, xuất hiện trong bài khó.

| # | Bài học | Mô tả | Độ khó |
|---|---------|-------|--------|
| 22 | [Hình học cơ bản](22-hinh-hoc-co-ban.md) | Tích vô hướng, tích có hướng, diện tích, vị trí tương đối | ⭐⭐⭐ |
| 24 | [Stack nâng cao](24-stack-nang-cao.md) | Monotone stack, biểu thức, hình chữ nhật lớn nhất | ⭐⭐⭐ |
| 30 | [Binary Search Tree (BST)](30-bst.md) | Cây tìm kiếm nhị phân, chèn/xóa/tìm, duyệt cây | ⭐⭐⭐ |
| 29 | [Sparse Table (RMQ)](29-sparse-table.md) | Truy vấn min/max O(1) trên mảng tĩnh | ⭐⭐⭐ |
| 28 | [Bao lồi](28-bao-loi.md) | Convex Hull, Andrew's Monotone Chain, Rotating Calipers | ⭐⭐⭐⭐ |

---

## Nhóm 9: Kỹ năng thi đấu (Bài 36 - 39)

> Không phải thuật toán, nhưng **cực kỳ quan trọng** để đạt điểm cao.

| # | Bài học | Mô tả | Độ khó |
|---|---------|-------|--------|
| 36 | [Kỹ năng thi đấu](36-ky-nang-thi-dau.md) | Chiến thuật đọc đề, quản lý thời gian, phân bổ thời gian | ⭐ |
| 37 | [Sinh testcase & Stress test](37-sinh-testcase.md) | Tạo testcase ngẫu nhiên, stress test tìm bug | ⭐⭐ |
| 38 | [Debug & Mẹo thi đấu](38-debug-meo.md) | Debug hiệu quả, fix WA/TLE/RE, mẹo code nhanh | ⭐⭐ |
| 39 | [Tổ chức code & Nộp bài](39-to-chuc-code.md) | Quản lý thư mục, script test tự động, chuẩn bị nộp USB | ⭐⭐ |

---

## Nhóm 10: Đồ thị nâng cao (Bài 40 - 43)

> Các thuật toán đồ thị **nâng cao**, cần thiết cho ICPC/VOI.

| # | Bài học | Mô tả | Độ khó |
|---|---------|-------|--------|
| 40 | [SCC & Cầu & Khớp](40-scc-bridges.md) | Tarjan, Kosaraju, bridges, articulation points | ⭐⭐⭐⭐ |
| 41 | [Network Flow](41-network-flow.md) | Edmonds-Karp, Dinic, Min-Cost Max-Flow | ⭐⭐⭐⭐ |
| 42 | [Bipartite Matching & Hungarian](42-bipartite-matching.md) | Kuhn's, Hopcroft-Karp, ghép cặp | ⭐⭐⭐⭐ |
| 43 | [2-SAT](43-2sat.md) | Bài toán thỏa mãn logic, implication graph, SCC | ⭐⭐⭐⭐ |

---

## Nhóm 11: Cây nâng cao (Bài 44 - 46)

> Các kỹ thuật **xử lý cây** nâng cao, xuất hiện rất thường xuyên.

| # | Bài học | Mô tả | Độ khó |
|---|---------|-------|--------|
| 44 | [Euler Tour trên cây](44-euler-tour-tree.md) | Flatten cây thành mảng, subtree/path query, LCA | ⭐⭐⭐⭐ |
| 45 | [Centroid Decomposition](45-centroid-decomposition.md) | Phân tách trọng tâm, đếm đường đi trên cây | ⭐⭐⭐⭐ |
| 46 | [Heavy-Light Decomposition](46-hld.md) | Phân rã cây, truy vấn đường đi O(log²N) | ⭐⭐⭐⭐ |

---

## Nhóm 12: Quy hoạch động nâng cao (Bài 47 - 50)

> Các dạng **DP nâng cao**, thường xuất hiện trong bài khó.

| # | Bài học | Mô tả | Độ khó |
|---|---------|-------|--------|
| 47 | [DP trên cây](47-dp-on-trees.md) | Subtree DP, rerooting, tree knapsack | ⭐⭐⭐⭐ |
| 48 | [Digit DP](48-digit-dp.md) | Đếm số theo chữ số, memoization trên digit | ⭐⭐⭐⭐ |
| 49 | [Interval DP](49-interval-dp.md) | Matrix chain, merge stones, boolean parenthesization | ⭐⭐⭐⭐ |
| 50 | [Tối ưu DP](50-dp-optimization.md) | Knuth's, Divide & Conquer DP, CHT, Alien's trick | ⭐⭐⭐⭐⭐ |

---

## Nhóm 13: Xâu nâng cao (Bài 51 - 52)

> Các thuật toán **xử lý xâu** nâng cao.

| # | Bài học | Mô tả | Độ khó |
|---|---------|-------|--------|
| 51 | [Aho-Corasick](51-aho-corasick.md) | Tìm nhiều mẫu trong xâu, failure links | ⭐⭐⭐⭐ |
| 52 | [Suffix Automaton](52-suffix-automaton.md) | Máy trạng thái hậu tố, O(N) construction | ⭐⭐⭐⭐⭐ |

---

## Nhóm 14: Kỹ thuật nâng cao (Bài 53 - 55)

> Các **kỹ thuật** và **cấu trúc dữ liệu** nâng cao.

| # | Bài học | Mô tả | Độ khó |
|---|---------|-------|--------|
| 53 | [Chia căn & Mo's Algorithm](53-sqrt-mo.md) | Sqrt decomposition, offline queries, Hilbert curve | ⭐⭐⭐⭐ |
| 54 | [Convex Hull Trick & Li Chao Tree](54-convex-hull-trick.md) | Tối ưu DP với đường thẳng, CHT động | ⭐⭐⭐⭐ |
| 55 | [Ternary Search](55-ternary-search.md) | Tìm kiếm tam phân, hàm unimodal | ⭐⭐⭐ |

---

## Lộ trình học đề xuất

### Người mới bắt đầu (0-3 tháng)

```
Nhóm 1 → Nhóm 2 → Nhóm 3 (chỉ Hash Table, Queue)
```

### Trung cấp (3-6 tháng)

```
Nhóm 3 (tiếp) → Nhóm 4 → Nhóm 5 → Nhóm 9
```

### Nâng cao (6-12 tháng)

```
Nhóm 6 → Nhóm 7 → Nhóm 8 → Nhóm 10 → Nhóm 12 (Bài 47-49)
```

### Chuyên sâu (12+ tháng)

```
Nhóm 11 → Nhóm 12 (Bài 50) → Nhóm 13 → Nhóm 14
```

---

## Bài tập luyện tập

Sau khi học xong mỗi bài, hãy luyện tập với các bài tập từ các nguồn sau:

- **[CSES Problem Set](https://cses.fi/problemset/)** - Bộ bài tập cơ bản đến trung bình, rất phù hợp cho người mới
- **[LeetCode](https://leetcode.com/)** - Luyện coding interview và thuật toán cơ bản
- **[VNOJ](https://oj.vnoi.info/)** - OJ Việt Nam, có nhiều bài thi VOI, HSG
- **[Codeforces](https://codeforces.com/)** - Các contest online, phân loại bài theo độ khó
- **[AtCoder](https://atcoder.jp/)** - Contest chất lượng cao, bài toán hay

---

## Tài liệu tham khảo

- **[VNOI Wiki](https://wiki.vnoi.info/)** - Wiki thuật toán tiếng Việt lớn nhất
- **[CP-Algorithms](https://cp-algorithms.com/)** - Kho thuật toán competitive programming (tiếng Anh)
- **[USACO Guide](https://usaco.guide/)** - Lộ trình học competitive programming miễn phí
- **[Topcoder Tutorials](https://www.topcoder.com/thrive/articles)** - Các bài tutorial kinh điển
- **[HackerEarth Tutorials](https://www.hackerearth.com/practice/)** - Tutorial số học, DP, đồ thị
