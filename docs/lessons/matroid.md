# Matroid - Lý Thuyết Tổ Hợp Nâng Cao

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** CP-Algorithms - Matroid

---

## 1. Bản chất vấn đề

### Định nghĩa Matroid

Matroid $\mathcal{M} = (E, \mathcal{I})$ gồm:

- $E$: tập hợp các phần tử (ground set).
- $\mathcal{I} \subseteq 2^E$: tập các tập con **độc lập** (independent sets).

**Tính chất:**

1. $\emptyset \in \mathcal{I}$ (tập rỗng độc lập).
2. Nếu $A \in \mathcal{I}$ và $B \subseteq A$ thì $B \in \mathcal{I}$ (hereditary).
3. Nếu $A, B \in \mathcal{I}$ và $|A| < |B|$ thì $\exists x \in B \setminus A$ sao cho $A \cup \{x\} \in \mathcal{I}$ (exchange property).

### Các loại Matroid

| Loại | Ground set $E$ | Tập con độc lập |
|------|---------------|-----------------|
| **Uniform matroid** $U_{k,n}$ | $n$ phần tử | Tập con kích thước $\le k$ |
| **Linear matroid** | Các vector | Tập con tuyến tính độc lập |
| **Graphic matroid** | Các cạnh đồ thị | Tập con không tạo chu trình (rừng, cây khung) |
| **Partition matroid** | Phân hoạch $E$ | Chọn $\le k_i$ phần tử từ mỗi nhóm |

---

## 2. Tư duy cốt lõi

### Thuật toán tham lam trên Matroid

**Bài toán:** Tìm tập con độc lập lớn nhất có trọng số lớn nhất.

**Thuật toán:** Sắp xếp phần tử theo trọng số giảm dần. Thêm phần tử vào tập kết quả nếu tập kết quả vẫn độc lập.

**Kết quả:** Thuật toán tham lam cho nghiệm tối ưu trên **mọi** matroid!

### Trace chi tiết

**Graphic matroid (cây khung trọng số lớn nhất):** Đồ thị 4 đỉnh, 5 cạnh.

| Cạnh | Trọng số |
|------|----------|
| $(0,1)$ | 10 |
| $(1,2)$ | 8 |
| $(0,2)$ | 5 |
| $(2,3)$ | 7 |
| $(0,3)$ | 3 |

**Sắp xếp giảm dần:** $(0,1)=10$, $(1,2)=8$, $(2,3)=7$, $(0,2)=5$, $(0,3)=3$

| Bước | Cạnh | Thêm? | Lý do | Kết quả |
|------|------|-------|-------|---------|
| 1 | $(0,1)$ w=10 | Có | Không tạo chu trình | $\{(0,1)\}$ |
| 2 | $(1,2)$ w=8 | Có | Không tạo chu trình | $\{(0,1),(1,2)\}$ |
| 3 | $(2,3)$ w=7 | Có | Không tạo chu trình | $\{(0,1),(1,2),(2,3)\}$ |
| 4 | $(0,2)$ w=5 | Không | Tạo chu trình $0-1-2-0$ | |
| 5 | $(0,3)$ w=3 | Không | Tạo chu trình $0-1-2-3-0$ | |

**Kết quả:** Cây khung最大 = $\{(0,1),(1,2),(2,3)\}$, trọng số = $10+8+7 = 25$.

---

## 3. Phân tích tính đúng đắn

### Tại sao tham lam đúng trên Matroid?

**Định lý:** Thuật toán tham lam tìm được tập con độc lập có tổng trọng số lớn nhất trên mọi matroid.

**Chứng minh:** Giả sử thuật toán chọn $A = \{a_1, a_2, \ldots, a_k\}$ (theo thứ tự giảm dần). Nghiệm tối ưu là $B = \{b_1, b_2, \ldots, b_m\}$.

Bằng exchange property, có thể biến đổi $A$ thành $B$ mà không giảm tổng trọng số. Do đó $A$ là tối ưu.

---

## 4. Đánh giá độ phức tạp

| Thao tác | Thời gian |
|----------|-----------|
| Tham lam trên Matroid | $O(|E| \cdot \log |E| + |E| \cdot T)$ |

$T$ = thời gian kiểm tra tính độc lập.

---

## Code minh họa

### Ví dụ: Greedy trên Graphic Matroid (Kruskal)

=== "C++"

    ```cpp
    // Ví dụ: Greedy trên Graphic matroid — tìm cây khung trọng số lớn nhất
    // Dùng Kruskal — tham lam trên graphic matroid
    #include <bits/stdc++.h>
    using namespace std;

    struct DSU {
        vector<int> par;
        DSU(int n) : par(n + 1, -1) {}
        int find(int x) { return par[x] < 0 ? x : par[x] = find(par[x]); }
        bool unite(int a, int b) {
            a = find(a); b = find(b);
            if (a == b) return false;
            if (par[a] > par[b]) swap(a, b);
            par[a] += par[b];
            par[b] = a;
            return true;
        }
    };

    int main() {
        int n, m;
        cin >> n >> m;

        vector<tuple<int,int,int>> edges; // (weight, u, v)
        for (int i = 0; i < m; i++) {
            int u, v, w;
            cin >> u >> v >> w;
            edges.push_back({w, u, v});
        }

        sort(edges.rbegin(), edges.rend()); // giảm dần

        DSU dsu(n);
        long long total = 0;
        int cnt = 0;

        for (auto [w, u, v] : edges) {
            if (dsu.unite(u, v)) {
                total += w;
                cnt++;
                if (cnt == n - 1) break;
            }
        }

        cout << total << "\n";
        return 0;
    }
    ```

=== "Python"

    ```python
    class DSU:
        def __init__(self, n):
            self.par = [-1] * (n + 1)
        def find(self, x):
            if self.par[x] < 0:
                return x
            self.par[x] = self.find(self.par[x])
            return self.par[x]
        def unite(self, a, b):
            a, b = self.find(a), self.find(b)
            if a == b:
                return False
            if self.par[a] > self.par[b]:
                a, b = b, a
            self.par[a] += self.par[b]
            self.par[b] = a
            return True

    n, m = map(int, input().split())
    edges = []
    for _ in range(m):
        u, v, w = map(int, input().split())
        edges.append((w, u, v))

    edges.sort(reverse=True)
    dsu = DSU(n)
    total = cnt = 0

    for w, u, v in edges:
        if dsu.unite(u, v):
            total += w
            cnt += 1
            if cnt == n - 1:
                break

    print(total)
    ```
