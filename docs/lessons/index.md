# Tổng hợp bài học Lập trình thi đấu

Bộ bài học **Lập trình thi đấu** được biên soạn dành cho người mới bắt đầu, từ các kiến thức nền tảng đến nâng cao. Mỗi bài học đều có giải thích trực quan, ví dụ minh hoạ và code mẫu.

!!! warning "Học code trước khi học thuật toán!"
    Nếu bạn **chưa biết lập trình**, hãy học [**Chương 1: Python cho Thi Đấu**](../coding/python/index.md) hoặc [**Chương 2: C++ cho Thi Đấu**](../coding/cpp/index.md) **TRƯỚC** khi bắt đầu học thuật toán. Việc nắm vững cú pháp và cách sử dụng ngôn ngữ lập trình sẽ giúp bạn hiểu thuật toán nhanh hơn rất nhiều!

!!! tip "Học theo thứ tự"
    Hãy học từ **Nhóm 1** trước, rồi dần dần lên nhóm cao hơn. Mỗi nhóm có độ khó tăng dần. Xem **[Lộ trình tương tác](roadmap.md)** để hình dung con đường học tập.

---

## Nhóm 1: Nhập môn — Bắt đầu từ đâu (Bài 1 - 6)

> Dành cho người **hoàn toàn mới**. Học xong nhóm này, bạn có thể giải được các bài cơ bản.

| # | Bài học | Mô tả | Độ khó |
|---|---------|-------|--------|
| 01 | [Setup môi trường thi đấu](setup-moi-truong.md) | Template C++/Python, fast I/O, cài đặt editor | ⭐ |
| 02 | [Độ phức tạp thời gian](do-phuc-tap-thoi-gian.md) | Big-O, phân tích thuật toán, ước lượng thời gian chạy | ⭐ |
| 03 | [Thuật toán sắp xếp](thuat-toan-sap-xep.md) | Merge Sort, Quick Sort, đếm inversion, so sánh các thuật toán | ⭐⭐ |
| 04 | [Tìm kiếm nhị phân](tim-kiem-nhi-phan.md) | Binary Search trên mảng, lower/upper bound, cài đặt | ⭐⭐ |
| 05 | [Phép toán bit](phep-toan-bit.md) | AND, OR, XOR, bitmask, ứng dụng trong thi đấu | ⭐⭐ |
| 06 | [Đệ quy và quay lui](de-quy-va-quay-lui.md) | Recursion, backtracking, sinh tổ hợp, cắt nhánh | ⭐⭐ |

---

## Nhóm 2: Kỹ thuật cơ bản (Bài 7 - 9)

> Các kỹ thuật dùng **rất thường xuyên** trong thi đấu. Học xong nhóm này, bạn có thể giải 60-70% bài cơ bản.

| # | Bài học | Mô tả | Độ khó |
|---|---------|-------|--------|
| 07 | [Kĩ thuật hai con trỏ](ky-thuat-hai-con-tro.md) | Two pointers, sliding window, các dạng bài thường gặp | ⭐⭐ |
| 08 | [Mảng, Stack, Prefix Sum](mang-stack-prefix-sum.md) | Mảng, danh sách liên kết, Stack, Prefix Sum, Difference Array | ⭐⭐ |
| 09 | [Lũy thừa nhị phân & Sàng nguyên tố](luy-thua-nhi-phan-sang-nguyen-to.md) | Tính mũ nhanh O(log N), sàng Eratosthenes, phân tích thừa số | ⭐⭐ |

---

## Nhóm 3: Cấu trúc dữ liệu cơ bản (Bài 10 - 18)

> Các cấu trúc dữ liệu **bắt buộc phải biết**. Thiếu chúng, bạn không thể giải nhiều bài.

| # | Bài học | Mô tả | Độ khó |
|---|---------|-------|--------|
| 10 | [Linked List chi tiết](linked-list.md) | Danh sách liên kết đơn/đôi, cài đặt Stack/Queue bằng LL | ⭐⭐ |
| 11 | [Queue cơ bản](queue.md) | Hàng đợi FIFO, mảng vòng, BFS, các biến thể | ⭐⭐ |
| 12 | [Hash Table](hash-table.md) | Bảng băm, hash function, chaining, open addressing | ⭐⭐ |
| 13 | [Heap (Hàng đợi ưu tiên)](heap.md) | Priority Queue, Binary Heap, Heap Sort | ⭐⭐ |
| 14 | [DSU (Gộp tập hợp)](dsu.md) | Disjoint Set Union, Path Compression | ⭐⭐ |
| 15 | [Deque & Sliding Window](deque-sliding-window.md) | Deque, hàng đợi đơn điệu, tìm min/max trên đoạn tịnh tiến | ⭐⭐⭐ |
| 16 | [Trie](trie.md) | Cây tiền tố, bitwise trie, autocomplete | ⭐⭐⭐ |
| 17 | [Segment Tree](segment-tree.md) | Cây phân đoạn, Lazy Propagation | ⭐⭐⭐ |
| 18 | [Fenwick Tree (BIT)](fenwick-tree.md) | Cây chỉ số nhị phân | ⭐⭐⭐ |

---

## Nhóm 4: Thuật toán đồ thị (Bài 19 - 22)

> Đồ thị là **lĩnh vực lớn nhất** trong competitive programming. Học xong nhóm này, bạn có thể giải phần lớn bài đồ thị.

| # | Bài học | Mô tả | Độ khó |
|---|---------|-------|--------|
| 19 | [BFS/DFS trên đồ thị](bfs-dfs-do-thi.md) | Duyệt đồ thị, thành phần liên thông, ứng dụng | ⭐⭐ |
| 20 | [MST, Dijkstra, Topo Sort](mst-dijkstra-topo-sort.md) | Cây khung nhỏ nhất, đường đi ngắn nhất, sắp xếp topo | ⭐⭐⭐ |
| 21 | [Floyd-Warshall & Bellman-Ford](floyd-warshall-bellman-ford.md) | Đường đi ngắn nhất tất cả cặp, đồ thị có cạnh âm | ⭐⭐⭐ |
| 22 | [LCA & Binary Lifting](lca-binary-lifting.md) | Tổ tiên chung gần nhất, nhảy bậc 2^k trên cây | ⭐⭐⭐ |

---

## Nhóm 5: Quy hoạch động & Tham lam (Bài 23 - 25)

> **Quy hoạch động** là kỹ năng quan trọng nhất trong competitive programming. Cần nhiều thời gian luyện tập.

| # | Bài học | Mô tả | Độ khó |
|---|---------|-------|--------|
| 23 | [Greedy](greedy.md) | Thuật toán tham lam, chứng minh tính đúng, ví dụ điển hình | ⭐⭐⭐ |
| 24 | [Quy hoạch động](quy-hoach-dong.md) | 4 bước xây dựng DP, các dạng DP cơ bản và nâng cao | ⭐⭐⭐⭐ |
| 25 | [Binary Search on Answer](binary-search-on-answer.md) | Tìm kiếm nhị phân trên đáp án, tối ưu hoá bài toán | ⭐⭐⭐ |

---

## Nhóm 6: Xử lý xâu (Bài 26 - 29)

> Xử lý xâu là mảng riêng biệt, cần học các thuật toán chuyên biệt.

| # | Bài học | Mô tả | Độ khó |
|---|---------|-------|--------|
| 26 | [KMP - Tìm xâu](kmp-tim-xau.md) | Thuật toán Knuth-Morris-Pratt, tìm mẫu trong xâu | ⭐⭐⭐ |
| 27 | [Hash xâu & Z-algorithm](hash-xau-z-algorithm.md) | Hash xâu so sánh, Z-function, Rabin-Karp | ⭐⭐⭐ |
| 28 | [Manacher](manacher.md) | Tìm palindrome dài nhất trong O(N) | ⭐⭐⭐⭐ |
| 29 | [Suffix Array](suffix-array.md) | Mảng hậu tố, LCP array, Doubling algorithm | ⭐⭐⭐⭐ |

---

## Nhóm 7: Toán & Số học (Bài 30 - 41)

> Toán học xuất hiện ở rất nhiều bài. Học các kỹ thuật số học giúp giải nhiều bài "khó hiểu".

| # | Bài học | Mô tả | Độ khó |
|---|---------|-------|--------|
| 30 | [Euclid & Modular Inverse](euclid-modular-inverse.md) | GCD, extended Euclid, nghịch đảo modulo | ⭐⭐⭐ |
| 31 | [Tổ hợp & Xác suất](to-hop-xac-suat.md) | C(n,k), giai thừa modulo, xác suất cơ bản | ⭐⭐⭐ |
| 32 | [Số học nâng cao](so-hoc-nang-cao.md) | Phi hàm Euler, Lucas Theorem, CRT, Möbius | ⭐⭐⭐⭐ |
| 33 | [Lý thuyết trò chơi](ly-thuyet-tro-choi.md) | Sprague-Grundy, Nim, Grundy number, ứng dụng | ⭐⭐⭐⭐ |
| 34 | [Sàng nâng cao & Hàm ước](sang-nang-cao-ham-uoc.md) | Linear sieve, SPF, đếm ước, phân tích thừa số | ⭐⭐⭐ |
| 35 | [Nguyên lý bao hàm - loại trừ](nguyen-ly-bao-ham-loai-tru.md) | Inclusion-Exclusion, derangement, đếm phức tạp | ⭐⭐⭐ |
| 36 | [Đếm đường đi trên lưới](dem-duong-di-luoi.md) | Tổ hợp trên lưới, Catalan, lưới có vật cản | ⭐⭐⭐ |
| 37 | [Nhân ma trận](nhan-ma-tran.md) | Lũy thừa ma trận, đếm đường đi, Fibonacci O(log N) | ⭐⭐⭐ |
| 38 | [Logarithm rời rạc](logarithm-roi-rac.md) | BSGS (Baby-Step Giant-Step), discrete log | ⭐⭐⭐⭐ |
| 39 | [Căn nguyên thủy](can-nguyen-thuy.md) | Primitive root, Tonelli-Shanks, dấu hiệu bình phương | ⭐⭐⭐⭐ |
| 40 | [NTT & Nhân đa thức](ntt-nhan-da-thuc.md) | Number Theoretic Transform, FFT modulo | ⭐⭐⭐⭐ |
| 41 | [Khử Gauss](khu-gauss.md) | Elimination, hạng ma trận, hệ phương trình tuyến tính | ⭐⭐⭐⭐ |

---

## Nhóm 8: Hình học (Bài 42 - 51)

> Hình học tính toán — từ cơ bản đến nâng cao. Cần nắm vững tích vô hướng/có hướng.

| # | Bài học | Mô tả | Độ khó |
|---|---------|-------|--------|
| 42 | [Hình học cơ bản](hinh-hoc-co-ban.md) | Tích vô hướng, tích có hướng, diện tích, vị trí tương đối | ⭐⭐⭐ |
| 43 | [Phương trình đường thẳng](phuong-trinh-duong-thang.md) | Giao điểm đoạn thẳng, khoảng cách điểm-đường, diện tích đa giác | ⭐⭐⭐ |
| 44 | [Hình học đường tròn](hinh-hoc-duong-tron.md) | Tiếp tuyến, giao đường tròn, diện tích giao | ⭐⭐⭐⭐ |
| 45 | [Định lý Pick](dinh-ly-pick.md) | Đếm điểm nguyên trong đa giác, Pick's theorem | ⭐⭐⭐ |
| 46 | [Góc & Phép quay](goc-phep-quay.md) | atan2, quay điểm, quay không gian | ⭐⭐⭐ |
| 47 | [Sắp xếp cực & Quét góc](sap-xep-cuc.md) | Sắp xếp theo góc, sweep line, rotating calipers | ⭐⭐⭐⭐ |
| 48 | [Bao lồi](bao-loi.md) | Convex Hull, Andrew's Monotone Chain, Rotating Calipers | ⭐⭐⭐⭐ |
| 49 | [Stack nâng cao](stack-nang-cao.md) | Monotone stack, biểu thức, hình chữ nhật lớn nhất | ⭐⭐⭐ |
| 50 | [Binary Search Tree (BST)](bst.md) | Cây tìm kiếm nhị phân, chèn/xóa/tìm, duyệt cây | ⭐⭐⭐ |
| 51 | [Sparse Table (RMQ)](sparse-table.md) | Truy vấn min/max O(1) trên mảng tĩnh | ⭐⭐⭐ |

---

## Kỹ năng thi đấu

> Không phải thuật toán, nhưng **cực kỳ quan trọng** để đạt điểm cao.

| Bài học | Mô tả | Độ khó |
|---------|-------|--------|
| [Kỹ năng thi đấu](ky-nang-thi-dau.md) | Chiến thuật đọc đề, quản lý thời gian, phân bổ thời gian | ⭐ |
| [Sinh testcase & Stress test](sinh-testcase.md) | Tạo testcase ngẫu nhiên, stress test tìm bug | ⭐⭐ |
| [Debug & Mẹo thi đấu](debug-meo.md) | Debug hiệu quả, fix WA/TLE/RE, mẹo code nhanh | ⭐⭐ |
| [Tổ chức code & Nộp bài](to-chuc-code.md) | Quản lý thư mục, script test tự động, chuẩn bị nộp USB | ⭐⭐ |

---

## Nhóm 10: Đồ thị nâng cao (Bài 52 - 55)

> Các thuật toán đồ thị **nâng cao**, cần thiết cho ICPC/VOI.

| # | Bài học | Mô tả | Độ khó |
|---|---------|-------|--------|
| 52 | [SCC & Cầu & Khớp](scc-bridges.md) | Tarjan, Kosaraju, bridges, articulation points | ⭐⭐⭐⭐ |
| 53 | [Network Flow](network-flow.md) | Edmonds-Karp, Dinic, Min-Cost Max-Flow | ⭐⭐⭐⭐ |
| 54 | [Bipartite Matching & Hungarian](bipartite-matching.md) | Kuhn's, Hopcroft-Karp, ghép cặp | ⭐⭐⭐⭐ |
| 55 | [2-SAT](2sat.md) | Bài toán thỏa mãn logic, implication graph, SCC | ⭐⭐⭐⭐ |

---

## Nhóm 11: Cây nâng cao (Bài 56 - 58)

> Các kỹ thuật **xử lý cây** nâng cao, xuất hiện rất thường xuyên.

| # | Bài học | Mô tả | Độ khó |
|---|---------|-------|--------|
| 56 | [Euler Tour trên cây](euler-tour-tree.md) | Flatten cây thành mảng, subtree/path query, LCA | ⭐⭐⭐⭐ |
| 57 | [Centroid Decomposition](centroid-decomposition.md) | Phân tách trọng tâm, đếm đường đi trên cây | ⭐⭐⭐⭐ |
| 58 | [Heavy-Light Decomposition](hld.md) | Phân rã cây, truy vấn đường đi O(log²N) | ⭐⭐⭐⭐ |

---

## Nhóm 12: Quy hoạch động nâng cao (Bài 59 - 62)

> Các dạng **DP nâng cao**, thường xuất hiện trong bài khó.

| # | Bài học | Mô tả | Độ khó |
|---|---------|-------|--------|
| 59 | [DP trên cây](dp-on-trees.md) | Subtree DP, rerooting, tree knapsack | ⭐⭐⭐⭐ |
| 60 | [Digit DP](digit-dp.md) | Đếm số theo chữ số, memoization trên digit | ⭐⭐⭐⭐ |
| 61 | [Interval DP](interval-dp.md) | Matrix chain, merge stones, boolean parenthesization | ⭐⭐⭐⭐ |
| 62 | [Tối ưu DP](dp-optimization.md) | Knuth's, Divide & Conquer DP, CHT, Alien's trick | ⭐⭐⭐⭐⭐ |

---

## Nhóm 13: Xâu nâng cao (Bài 63 - 64)

> Các thuật toán **xử lý xâu** nâng cao.

| # | Bài học | Mô tả | Độ khó |
|---|---------|-------|--------|
| 63 | [Aho-Corasick](aho-corasick.md) | Tìm nhiều mẫu trong xâu, failure links | ⭐⭐⭐⭐ |
| 64 | [Suffix Automaton](suffix-automaton.md) | Máy trạng thái hậu tố, O(N) construction | ⭐⭐⭐⭐⭐ |

---

## Nhóm 14: Kỹ thuật nâng cao (Bài 65 - 67)

> Các **kỹ thuật** và **cấu trúc dữ liệu** nâng cao.

| # | Bài học | Mô tả | Độ khó |
|---|---------|-------|--------|
| 65 | [Chia căn & Mo's Algorithm](sqrt-mo.md) | Sqrt decomposition, offline queries, Hilbert curve | ⭐⭐⭐⭐ |
| 66 | [Convex Hull Trick & Li Chao Tree](convex-hull-trick.md) | Tối ưu DP với đường thẳng, CHT động | ⭐⭐⭐⭐ |
| 67 | [Ternary Search](ternary-search.md) | Tìm kiếm tam phân, hàm unimodal | ⭐⭐⭐ |

---

## Lộ trình học đề xuất

### Người mới bắt đầu (0-3 tháng)

```
Nhóm 1 → Nhóm 2 → Nhóm 3 (chỉ Hash Table, Queue)
```

### Trung cấp (3-6 tháng)

```
Nhóm 3 (tiếp) → Nhóm 4 → Nhóm 5 → Kỹ năng thi đấu
```

### Nâng cao (6-12 tháng)

```
Nhóm 6 → Nhóm 7 → Nhóm 8 → Nhóm 10 → Nhóm 12 (Bài 59-61)
```

### Chuyên sâu (12+ tháng)

```
Nhóm 11 → Nhóm 12 (Bài 62) → Nhóm 13 → Nhóm 14
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
