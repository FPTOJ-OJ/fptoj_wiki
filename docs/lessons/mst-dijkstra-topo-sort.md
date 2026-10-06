# Bài 13: MST, Dijkstra, Topo Sort - Đồ Thị Nâng Cao

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** VNOI Wiki - Cây khung nhỏ nhất, Đường đi ngắn nhất, Sắp xếp Tô-pô

---

## 1. MST - Cây Khung Nhỏ Nhất

### Bản chất vấn đề

Cho đồ thị vô hướng liên thông $G = (V, E)$ với $|V| = n$ đỉnh, $|E| = m$ cạnh, mỗi cạnh có trọng số $w(u,v)$. Tìm cây con $T \subseteq E$ sao cho:

- $T$ bao trùm tất cả $n$ đỉnh (liên thông).
- Tổng trọng số $\sum_{(u,v) \in T} w(u,v)$ là nhỏ nhất.
- $T$ có đúng $n - 1$ cạnh (không chu trình).

Đây là bài toán **Cây khung nhỏ nhất** (Minimum Spanning Tree - MST).

### Tư duy cốt lõi

Có hai thuật toán kinh điển: **Kruskal** (cạnh-centric) và **Prim** (đỉnh-centric).

**Kruskal** - Tham lam trên cạnh:

Sắp xếp tất cả $m$ cạnh theo trọng số tăng dần. Duyệt từng cạnh, nếu thêm cạnh đó không tạo chu trình thì chấp nhận. Dùng DSU (Disjoint Set Union) để kiểm tra chu trình trong $O(\alpha(n))$.

```mermaid
graph LR
    subgraph "Kruskal: Thêm cạnh theo trọng số"
        A["Sắp xếp m cạnh tăng dần"] --> B["Duyệt cạnh e = (u,v,w)"]
        B --> C{"find(u) ≠ find(v)?"}
        C -->|"Có"| D["unite(u,v), thêm e vào MST"]
        C -->|"Không"| E["Bỏ qua (tạo chu trình)"]
        D --> F{"Đã có n-1 cạnh?"}
        E --> B
        F -->|"Chưa"| B
        F -->|"Rồi"| G["Hoàn thành MST"]
    end
```

**Prim** - Tham lam trên đỉnh:

Bắt đầu từ đỉnh tùy ý. Mỗi bước, chọn cạnh có trọng số nhỏ nhất nối một đỉnh đã thăm với một đỉnh chưa thăm. Dùng min-heap để trích xuất cạnh nhỏ nhất nhanh.

```mermaid
graph LR
    subgraph "Prim: Mở rộng từ đỉnh đã thăm"
        A["Chọn đỉnh nguồn s"] --> B["Đưa các cạnh kề s vào min-heap"]
        B --> C["Pop cạnh nhỏ nhất (w, v)"]
        C --> D{"v đã thăm?"}
        D -->|"Rồi"| C
        D -->|"Chưa"| E["Thêm v vào MST, cập nhật tổng trọng số"]
        E --> F["Đưa các cạnh kề v vào heap"]
        F --> C
    end
```

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    struct Edge {
        int u, v, w;
        bool operator<(const Edge& other) const {
            return w < other.w;
        }
    };

    struct DSU {                                    // Disjoint Set Union hỗ trợ Kruskal
        vector<int> parent, sz;
        DSU(int n) {
            parent.resize(n + 1);
            sz.resize(n + 1, 1);
            for (int i = 1; i <= n; i++) parent[i] = i;
        }
        int find(int v) {                           // tìm gốc với nén đường dẫn
            if (v == parent[v]) return v;
            return parent[v] = find(parent[v]);
        }
        bool unite(int a, int b) {                  // hợp nhất hai tập, true nếu hợp nhất được
            a = find(a); b = find(b);
            if (a == b) return false;
            if (sz[a] < sz[b]) swap(a, b);
            parent[b] = a;
            sz[a] += sz[b];
            return true;
        }
    };

    long long kruskal(int n, vector<Edge>& edges) {  // Kruskal: sắp xếp cạnh, thêm nếu không chu trình
        sort(edges.begin(), edges.end());            // sắp xếp cạnh theo trọng số
        DSU dsu(n);
        long long mst_weight = 0;
        int edges_used = 0;

        for (auto& e : edges) {
            if (dsu.unite(e.u, e.v)) {              // nếu thêm cạnh không tạo chu trình
                mst_weight += e.w;
                edges_used++;
                if (edges_used == n - 1) break;     // đã đủ n-1 cạnh
            }
        }
        return (edges_used == n - 1) ? mst_weight : -1;  // -1 nếu đồ thị không liên thông
    }

    long long prim(int n, vector<vector<pair<int,int>>>& adj) {  // Prim: mở rộng từ đỉnh đã thăm
        vector<bool> visited(n + 1, false);
        priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
        pq.push({0, 1});                             // bắt đầu từ đỉnh 1
        long long mst_weight = 0;
        int count = 0;

        while (!pq.empty() && count < n) {
            auto [w, u] = pq.top();
            pq.pop();
            if (visited[u]) continue;                // bỏ qua nếu đã xử lý
            visited[u] = true;
            mst_weight += w;
            count++;

            for (auto [v, weight] : adj[u]) {        // đưa các cạnh kề vào heap
                if (!visited[v])
                    pq.push({weight, v});
            }
        }
        return (count == n) ? mst_weight : -1;       // -1 nếu đồ thị không liên thông
    }
    ```

=== "Python"

    ```python
    import heapq

    class DSU:                                    # Disjoint Set Union hỗ trợ Kruskal
        def __init__(self, n):
            self.parent = list(range(n + 1))
            self.sz = [1] * (n + 1)

        def find(self, v):                       # tìm gốc với nén đường dẫn
            if v == self.parent[v]:
                return v
            self.parent[v] = self.find(self.parent[v])
            return self.parent[v]

        def unite(self, a, b):                   # hợp nhất hai tập
            a, b = self.find(a), self.find(b)
            if a == b:
                return False
            if self.sz[a] < self.sz[b]:
                a, b = b, a
            self.parent[b] = a
            self.sz[a] += self.sz[b]
            return True

    def kruskal(n, edges):                        # Kruskal: sắp xếp cạnh, thêm nếu không chu trình
        edges.sort(key=lambda e: e[2])            # sắp xếp theo trọng số
        dsu = DSU(n)
        mst_weight = 0
        edges_used = 0

        for u, v, w in edges:
            if dsu.unite(u, v):                  # thêm cạnh nếu không tạo chu trình
                mst_weight += w
                edges_used += 1
                if edges_used == n - 1:          # đã đủ n-1 cạnh
                    break

        return mst_weight if edges_used == n - 1 else -1

    def prim(n, adj):                             # Prim: mở rộng từ đỉnh đã thăm
        visited = [False] * (n + 1)
        pq = [(0, 1)]                             # bắt đầu từ đỉnh 1
        mst_weight = 0
        count = 0

        while pq and count < n:
            w, u = heapq.heappop(pq)
            if visited[u]:                        # bỏ qua nếu đã xử lý
                continue
            visited[u] = True
            mst_weight += w
            count += 1

            for v, weight in adj[u]:              # đưa các cạnh kề vào heap
                if not visited[v]:
                    heapq.heappush(pq, (weight, v))

        return mst_weight if count == n else -1
    ```

### Phân tích tính đúng đắn

**Cut Property (Tính chất cắt):** Với mọi tập $S \subset V$ ($S \neq \emptyset, S \neq V$), cạnh có trọng số nhỏ nhất giữa $S$ và $V \setminus S$ nhất định thuộc MST.

**Kruskal đúng** vì: Khi xét cạnh $(u,v)$ nhỏ nhất chưa xét, nếu $u$ và $v$ thuộc hai thành phần liên thông khác nhau (tạo một "cắt"), thì $(u,v)$ là cạnh nhỏ nhất qua cắt đó → thuộc MST theo Cut Property.

**Prim đúng** vì: Tại mỗi bước, tập đỉnh đã thăm tạo một cắt. Cạnh nhỏ nhất nối đỉnh đã thăm với đỉnh chưa thăm chính là cạnh nhỏ nhất qua cắt đó → thuộc MST.

### Đánh giá độ phức tạp

| Thuật toán | Độ phức tạp | Ghi chú |
|-----------|-------------|---------|
| Kruskal | $O(m \log m)$ | Chi phối bởi bước sắp xếp cạnh |
| Prim (heap) | $O((n + m) \log n)$ | Mỗi cạnh push/pop heap tối đa 1 lần |
| Prim (ma trận) | $O(n^2)$ | Tốt hơn khi $m$ lớn (đồ thị dày) |

Kruskal phù hợp khi đồ thị thưa ($m \approx n$). Prim với heap phù hợp khi đồ thị trung bình. Prim với ma trận kề phù hợp khi đồ thị rất dày ($m \approx n^2$).

### Trace chạy tay MST (Kruskal và Prim)

Xét đồ thị 4 đỉnh với 5 cạnh:

- $(1,2,w=1)$, $(1,3,w=4)$, $(2,3,w=2)$, $(2,4,w=5)$, $(3,4,w=1)$

MST kỳ vọng: $(1,2,1) + (3,4,1) + (2,3,2) = 4$.

**Trace Kruskal** (sắp xếp cạnh tăng dần: $(1,2,1), (3,4,1), (2,3,2), (1,3,4), (2,4,5)$):

| Bước | Xét cạnh | `find(u)` vs `find(v)` | Quyết định | Tổng MST |
|------|----------|------------------------|------------|----------|
| 1 | $(1,2,1)$ | $1 \ne 2$ | Nhận, `unite(1,2)` | 1 |
| 2 | $(3,4,1)$ | $3 \ne 4$ | Nhận, `unite(3,4)` | 2 |
| 3 | $(2,3,2)$ | $\{1,2\} \ne \{3,4\}$ | Nhận, `unite(2,3)` | 4 |
| 4 | — | — | Đã đủ $n-1 = 3$ cạnh → dừng | 4 |

Cạnh $(1,3,4)$: lúc này $1$ và $3$ đã cùng tập $\{1,2,3,4\}$ → bỏ qua (tạo chu trình $1-2-3-1$).

**Trace Prim** (bắt đầu từ đỉnh $1$):

| Bước | Pop $(w,u)$ | $u$ đã thăm? | Hành động | Heap sau bước |
|------|-------------|--------------|-----------|---------------|
| Khởi tạo | — | — | Push $(0,1)$ | $[(0,1)]$ |
| 1 | $(0,1)$ | Chưa → thăm $1$, tổng $= 0$ | Push $(1,2), (4,3)$ | $[(1,2), (4,3)]$ |
| 2 | $(1,2)$ | Chưa → thăm $2$, tổng $= 1$ | Push $(2,3), (5,4)$ | $[(2,3), (4,3), (5,4)]$ |
| 3 | $(2,3)$ | Chưa → thăm $3$, tổng $= 3$ | Push $(1,4)$ | $[(1,4), (4,3), (5,4)]$ |
| 4 | $(1,4)$ | Chưa → thăm $4$, tổng $= 4$ | Đủ $4$ đỉnh → dừng | — |

Kết quả cả hai: $4$. Cùng một MST (trong ví dụ này là duy nhất).

```matplotlib
import math

n_vals = [100, 500, 1000, 5000, 10000]
labels = ['100', '500', '1K', '5K', '10K']

m_sparse = n_vals
m_dense = [n**2 for n in n_vals]

def kruskal_cost(n, m): return m * math.log2(m) if m > 1 else 1
def prim_heap_cost(n, m): return (n + m) * math.log2(n) if n > 1 else 1
def prim_matrix_cost(n, m): return n**2

fig, axes = plt.subplots(1, 2, figsize=(12, 4.5))

axes[0].plot(labels, [kruskal_cost(n, m) for n, m in zip(n_vals, m_sparse)], 'o-', label='Kruskal O(m log m)', linewidth=2, markersize=6)
axes[0].plot(labels, [prim_heap_cost(n, m) for n, m in zip(n_vals, m_sparse)], 's-', label='Prim + heap O((n+m) log n)', linewidth=2, markersize=6)
axes[0].plot(labels, [prim_matrix_cost(n, m) for n, m in zip(n_vals, m_sparse)], '^-', label='Prim + ma trận O(n²)', linewidth=2, markersize=6)
axes[0].set_title('Đồ thị thưa (m ≈ n)', fontweight='bold')
axes[0].set_xlabel('Số đỉnh n')
axes[0].set_ylabel('Chi phí (log scale)')
axes[0].set_yscale('log')
axes[0].legend(fontsize=8)
axes[0].grid(True, alpha=0.3)

axes[1].plot(labels, [kruskal_cost(n, m) for n, m in zip(n_vals, m_dense)], 'o-', label='Kruskal O(m log m)', linewidth=2, markersize=6)
axes[1].plot(labels, [prim_heap_cost(n, m) for n, m in zip(n_vals, m_dense)], 's-', label='Prim + heap O((n+m) log n)', linewidth=2, markersize=6)
axes[1].plot(labels, [prim_matrix_cost(n, m) for n, m in zip(n_vals, m_dense)], '^-', label='Prim + ma trận O(n²)', linewidth=2, markersize=6)
axes[1].set_title('Đồ thị dày (m ≈ n²)', fontweight='bold')
axes[1].set_xlabel('Số đỉnh n')
axes[1].set_ylabel('Chi phí (log scale)')
axes[1].set_yscale('log')
axes[1].legend(fontsize=8)
axes[1].grid(True, alpha=0.3)

plt.suptitle('So sánh độ phức tạp MST: Kruskal vs Prim theo mật độ đồ thị', fontsize=11, fontweight='bold')
plt.tight_layout()
```

!!! tip "Thử tương tác"
    - [Kruskal's MST](https://algorithm-visualizer.org/greedy/kruskals-minimum-spanning-tree)
    - [Prim's MST](https://algorithm-visualizer.org/greedy/prims-minimum-spanning-tree)


---

## 2. Dijkstra - Đường Đi Ngắn Nhất

### Bản chất vấn đề

Cho đồ thị có hướng (hoặc vô hướng) $G = (V, E)$ với trọng số không âm $w(u,v) \geq 0$, đỉnh nguồn $s$. Tìm đường đi từ $s$ đến mọi đỉnh $v$ sao cho tổng trọng số $d(s,v) = \sum w$ là nhỏ nhất.

Đây là bài toán **Đường đi ngắn nhất nguồn đơn** (Single-Source Shortest Path - SSSP).

### Tư duy cốt lõi

Dijkstra là thuật toán tham lam: luôn mở rộng từ đỉnh có khoảng cách tạm thời nhỏ nhất.

**Bất biến quan trọng:** Khi một đỉnh $u$ được lấy ra từ priority queue, $dist[u]$ đã là giá trị cuối cùng — không thể cải thiện thêm.

**Điều kiện:** Trọng số phải không âm. Nếu có cạnh trọng số âm, dùng Bellman-Ford thay thế.

```mermaid
graph LR
    subgraph "Dijkstra: Mở rộng đỉnh gần nhất"
        A["dist[s] = 0, push (0,s) vào PQ"] --> B["Pop đỉnh u có dist[u] nhỏ nhất"]
        B --> C{"d > dist[u]?"}
        C -->|"Có"| D["Bỏ qua (đã xử lý rồi)"]
        C -->|"Không"| E["Duyệt kề v của u"]
        E --> F{"dist[u] + w < dist[v]?"}
        F -->|"Có"| G["Cập nhật dist[v], push vào PQ"]
        F -->|"Không"| E
        G --> E
        D --> B
    end
```

### Minh họa chạy chi tiết

Xét đồ thị sau với đỉnh nguồn $s = 1$:

```mermaid
graph LR
    1 --"w=1"--> 2
    1 --"w=4"--> 3
    2 --"w=2"--> 4
    3 --"w=1"--> 4
```

Bảng trace từng bước (PQ = priority queue, lưu `(dist, đỉnh)`):

| Bước | Pop | Duyệt cạnh | Cập nhật $dist$ | PQ sau bước |
|------|-----|------------|-----------------|-------------|
| Khởi tạo | - | - | $dist = [\infty, 0, \infty, \infty]$ | $[(0,1)]$ |
| 1 | $(0, 1)$ | $(1,2): dist[1]+1=1$, $(1,3): dist[1]+4=4$ | $dist[2]=1, dist[3]=4$ | $[(1,2), (4,3)]$ |
| 2 | $(1, 2)$ | $(2,4): dist[2]+2=3$ | $dist[4]=3$ | $[(3,4), (4,3)]$ |
| 3 | $(3, 4)$ | Không có kề | - | $[(4,3)]$ |
| 4 | $(4, 3)$ | $(3,4): dist[3]+1=5 > dist[4]=3$ | Không cập nhật | $[]$ |

Kết quả: $dist = [\infty, 0, 1, 4, 3]$. Đường ngắn nhất $1 \to 4$: $1 \to 2 \to 4$, độ dài $= 3$.

**Lưu ý:** Tại bước 4, đỉnh 3 cố gắng cập nhật $dist[4]$ nhưng bị bỏ qua vì $5 > 3$. Đây là lý do Dijkstra chỉ hoạt động đúng với trọng số không âm.

=== "C++"

    ```cpp
    vector<long long> dijkstra(int start, int n, vector<vector<pair<int,int>>>& adj) {
        vector<long long> dist(n + 1, LLONG_MAX);         // khởi tạo khoảng cách vô cùng
        priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<>> pq;

        dist[start] = 0;                                   // khoảng cách từ start đến chính nó = 0
        pq.push({0, start});

        while (!pq.empty()) {
            auto [d, u] = pq.top();
            pq.pop();

            if (d > dist[u]) continue;                     // bỏ qua bản ghi cũ trong heap

            for (auto [v, w] : adj[u]) {
                if (dist[u] + w < dist[v]) {               // tìm được đường đi ngắn hơn
                    dist[v] = dist[u] + w;
                    pq.push({dist[v], v});                 // đẩy vào heap để xử lý tiếp
                }
            }
        }
        return dist;
    }
    ```

=== "Python"

    ```python
    import heapq

    def dijkstra(start, n, adj):
        dist = [float('inf')] * (n + 1)          # khởi tạo khoảng cách vô cùng
        dist[start] = 0                          # khoảng cách từ start đến chính nó = 0
        pq = [(0, start)]

        while pq:
            d, u = heapq.heappop(pq)
            if d > dist[u]:                      # bỏ qua bản ghi cũ
                continue
            for v, w in adj[u]:
                if dist[u] + w < dist[v]:        # tìm được đường đi ngắn hơn
                    dist[v] = dist[u] + w
                    heapq.heappush(pq, (dist[v], v))
        return dist
    ```

### Phân tích tính đúng đắn

**Lemma:** Khi đỉnh $u$ được pop ra khỏi PQ với $d = dist[u]$, thì $dist[u]$ đã là khoảng cách ngắn nhất từ $s$ đến $u$.

**Chứng minh (phản chứng):** Giả sử $dist[u]$ chưa tối ưu, tức tồn tại đường đi ngắn hơn qua đỉnh $x$ chưa xử lý. Khi đó $dist[x] < dist[u]$ (vì đường đi qua $x$ ngắn hơn). Nhưng $x$ chưa xử lý nghĩa là $x$ vẫn trong PQ với ưu tiên $\leq dist[x] < dist[u]$, nên $x$ phải được pop trước $u$. Mâu thuẫn.

Suy ra thuật toán luôn pop đỉnh có khoảng cách ngắn nhất trước → đảm bảo tính đúng đắn.

### Đánh giá độ phức tạp

| Thành phần | Độ phức tạp |
|-----------|-------------|
| Mỗi đỉnh | Pop từ heap: $O(\log n)$ |
| Mỗi cạnh | Push vào heap tối đa 1 lần: $O(\log n)$ |
| **Tổng** | $O((n + m) \log n)$ |

Với Fibonacci heap, độ phức tạp cải thiện còn $O(n \log n + m)$, nhưng ít dùng trong thi đấu.

!!! warning "Dijkstra chỉ cho trọng số không âm"
    Nếu đồ thị có cạnh trọng số âm, dùng **Bellman-Ford** ($O(nm)$) hoặc **SPFA** thay thế. Xem [Bài 23: Floyd-Warshall & Bellman-Ford](floyd-warshall-bellman-ford.md).

---

## 3. Sắp Xếp Tô-pô (Topological Sort)

### Bản chất vấn đề

Cho đồ thị có hướng không chu trình (DAG) $G = (V, E)$ với $|V| = n$ đỉnh, $|E| = m$ cạnh. Tìm một hoán vị $\sigma$ của các đỉnh sao cho với mọi cạnh $(u, v) \in E$, ta có $\sigma(u) < \sigma(v)$ — tức mọi cạnh đều hướng từ trái sang phải.

Đây là bài toán **Sắp xếp tô-pô** (Topological Sort). Nếu đồ thị có chu trình, không tồn tại thứ tự tô-pô.

### Tư duy cốt lõi

Phổ biến nhất là thuật toán Kahn dựa trên bậc vào (in-degree):

1. Tính bậc vào $in[v]$ cho mỗi đỉnh $v$.
2. Đỉnh nào có $in[v] = 0$ (không bị phụ thuộc) được đưa vào hàng đợi.
3. Lấy đỉnh $u$ ra, "loại bỏ" $u$ bằng cách giảm $in[v]$ cho mọi đỉnh $v$ kề $u$.
4. Nếu $in[v]$ giảm về $0$, đưa $v$ vào hàng đợi.
5. Lặp cho đến khi hàng đợi rỗng.

```mermaid
graph TD
    subgraph "Kahn: Xử lý đỉnh bậc vào = 0"
        A["Tính in-degree cho mọi đỉnh"] --> B["Đưa đỉnh có in=0 vào queue"]
        B --> C["Pop đỉnh u, thêm vào kết quả"]
        C --> D["Giảm in[v] cho mỗi kề v của u"]
        D --> E{"in[v] == 0?"}
        E -->|"Có"| F["Đưa v vào queue"]
        E -->|"Không"| D
        F --> C
    end
```

### Minh họa chạy chi tiết

Xét DAG sau:

```mermaid
graph LR
    1 --> 2
    1 --> 3
    2 --> 4
    3 --> 4
    4 --> 5
```

| Bước | Queue | Pop | Kết quả | Cập nhật $in$ |
|------|-------|-----|---------|---------------|
| Khởi tạo | $[1]$ | - | $[]$ | $in = [0, 1, 1, 2, 1]$ |
| 1 | $[2, 3]$ | $1$ | $[1]$ | $in[2] \to 0, in[3] \to 0$ |
| 2 | $[3]$ | $2$ | $[1, 2]$ | $in[4] \to 1$ |
| 3 | $[4]$ | $3$ | $[1, 2, 3]$ | $in[4] \to 0$ |
| 4 | $[5]$ | $4$ | $[1, 2, 3, 4]$ | $in[5] \to 0$ |
| 5 | $[]$ | $5$ | $[1, 2, 3, 4, 5]$ | - |

Kết quả: $[1, 2, 3, 4, 5]$ — mọi cạnh đều hướng từ trái sang phải.

=== "C++"

    ```cpp
    vector<int> topoSort(int n, vector<vector<int>>& adj) {  // Kahn's Algorithm
        vector<int> inDegree(n + 1, 0);
        for (int u = 1; u <= n; u++)                        // tính bậc vào cho mỗi đỉnh
            for (int v : adj[u])
                inDegree[v]++;

        queue<int> q;
        for (int i = 1; i <= n; i++)                        // đưa đỉnh có bậc vào 0 vào queue
            if (inDegree[i] == 0) q.push(i);

        vector<int> result;
        while (!q.empty()) {
            int u = q.front();
            q.pop();
            result.push_back(u);                            // thêm đỉnh u vào kết quả

            for (int v : adj[u]) {                          // giảm bậc vào của các đỉnh kề
                inDegree[v]--;
                if (inDegree[v] == 0)                       // nếu bậc vào về 0, cho vào queue
                    q.push(v);
            }
        }

        if (result.size() != n) return {};                  // đồ thị có chu trình
        return result;
    }
    ```

=== "Python"

    ```python
    from collections import deque

    def topo_sort(n, adj):                                  # Kahn's Algorithm
        in_degree = [0] * (n + 1)
        for u in range(1, n + 1):                           # tính bậc vào
            for v in adj[u]:
                in_degree[v] += 1

        q = deque([i for i in range(1, n + 1) if in_degree[i] == 0])  # đỉnh bậc vào 0
        result = []

        while q:
            u = q.popleft()
            result.append(u)                                # thêm vào kết quả
            for v in adj[u]:
                in_degree[v] -= 1                           # giảm bậc vào
                if in_degree[v] == 0:
                    q.append(v)                             # bậc vào về 0 → vào queue

        return result if len(result) == n else []            # [] nếu có chu trình
    ```

### Phân tích tính đúng đắn

**Tính đúng đắn của Kahn:**

- Mỗi đỉnh được đưa vào queue đúng một lần khi $in[v] = 0$, tức tất cả đỉnh "tiên quyết" của $v$ đã được xử lý.
- Nếu kết quả chứa đủ $n$ đỉnh: mọi đỉnh đều được xử lý, và mọi cạnh $(u,v)$ đều hướng từ trái sang phải vì $u$ luôn được xử lý trước $v$ (do $in[v]$ chỉ giảm về $0$ sau khi $u$ đã pop).
- Nếu kết quả có $< n$ đỉnh: tồn tại chu trình. Khi đó, các đỉnh trong chu trình có $in > 0$ vĩnh viễn vì chúng phụ thuộc lẫn nhau.

### Đánh giá độ phức tạp

| Thành phần | Độ phức tạp |
|-----------|-------------|
| Tính $in$-degree | $O(n + m)$ |
| Duyệt queue | $O(n + m)$ (mỗi đỉnh/enqueue đúng 1 lần) |
| **Tổng** | $O(n + m)$ |

Sắp xếp tô-pô có độ phức tạp tuyến tính — rất hiệu quả.

---

## 4. Tổng hợp & Bẫy hay gặp

### Bảng so sánh

| Thuật toán | Khi nào dùng | Độ phức tạp |
|-----------|---------------|-------------|
| Kruskal | MST, cạnh ít (đồ thị thưa) | $O(m \log m)$ |
| Prim | MST, cạnh nhiều (đồ thị dày) | $O((n+m) \log n)$ |
| Dijkstra | Đường đi ngắn nhất, trọng số $\geq 0$ | $O((n+m) \log n)$ |
| Topo Sort | Sắp xếp thứ tự ưu tiên trên DAG | $O(n + m)$ |

### Bẫy hay gặp

**Bẫy 1: Dijkstra với trọng số âm**

Dijkstra **không** hoạt động đúng khi có trọng số âm. Khi đỉnh $u$ được pop, $dist[u]$ được coi là tối ưu — nhưng trọng số âm có thể tạo đường đi ngắn hơn qua đỉnh chưa xử lý. Dùng Bellman-Ford thay thế.

**Bẫy 2: Topo Sort trên đồ thị có chu trình**

Nếu kết quả có $< n$ đỉnh, đồ thị có chu trình. Quên kiểm tra điều kiện này sẽ dẫn đến kết quả sai mà không biết.

**Bẫy 3: MST trên đồ thị không liên thông**

Nếu số cạnh được chọn $< n - 1$, đồ thị không liên thông và không tồn tại MST. Luôn kiểm tra `edges_used == n - 1` (Kruskal) hoặc `count == n` (Prim).

**Bẫy 4: Quên `visited` trong Prim**

Nếu không kiểm tra `visited[u]` trước khi xử lý, đỉnh sẽ bị xử lý nhiều lần do cùng một đỉnh có thể nằm nhiều lần trong heap với trọng số khác nhau.

**Bẫy 5: Dijkstra — quên bỏ qua đỉnh cũ trong heap**

Điều kiện `if (d > dist[u]) continue` là bắt buộc. Heap có thể chứa nhiều bản ghi cho cùng một đỉnh; chỉ bản ghi có $dist$ nhỏ nhất là hợp lệ.

---

## Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Road Reparation](https://cses.fi/problemset/task/1675) | CSES | ⭐⭐ | MST |
| [CSES - Road Construction](https://cses.fi/problemset/task/1676) | CSES | ⭐⭐ | DSU + MST |
| [CSES - Shortest Routes I](https://cses.fi/problemset/task/1671) | CSES | ⭐⭐ | Dijkstra |
| [CSES - Shortest Routes II](https://cses.fi/problemset/task/1672) | CSES | ⭐⭐ | Floyd-Warshall |
| [CSES - Course Schedule](https://cses.fi/problemset/task/1679) | CSES | ⭐⭐ | Topo Sort |
| [CSES - Longest Flight Route](https://cses.fi/problemset/task/1680) | CSES | ⭐⭐⭐ | Topo + DP |
| [VNOJ - QBMST](https://oj.vnoi.info/problem/qbmst) | VNOJ | ⭐⭐ | MST cơ bản |
| [VNOJ - DIJKSTRA](https://oj.vnoi.info/problem/dijkstra) | VNOJ | ⭐⭐ | Dijkstra |
| [VNOJ - TOPOSORT](https://oj.vnoi.info/problem/toposort) | VNOJ | ⭐⭐ | Topo sort |

### Bài tập thực hành trên FPTOJ

Dưới đây là danh sách 30 bài tập thực hành được đồng bộ trên hệ thống [FPTOJ](https://fptoj.com):

| Mã bài | Tên bài tập | Độ khó | Chuyên đề | Bản chất bài tập | Lời giải chi tiết |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `mst-road` | [Tuyến đường liên tỉnh](https://fptoj.com/problem/mst-road) | ⭐⭐ | MST | Kruskal/Prim cơ bản | [Xem hướng dẫn](https://fptoj.com/problem/mst-road/solution) |
| `mst-cable` | [Lắp đặt cáp mạng](https://fptoj.com/problem/mst-cable) | ⭐⭐ | MST | Prim trên lưới ~2D~ tọa độ thực | [Xem hướng dẫn](https://fptoj.com/problem/mst-cable/solution) |
| `mst-cliques` | [Xây dựng cầu cảng](https://fptoj.com/problem/mst-cliques) | ⭐⭐ | MST | Khởi tạo cạnh trọng số ~0~ | [Xem hướng dẫn](https://fptoj.com/problem/mst-cliques/solution) |
| `mst-reduce` | [Tối ưu hóa mạng lưới](https://fptoj.com/problem/mst-reduce) | ⭐⭐ | MST | Xóa cạnh thừa tối ưu | [Xem hướng dẫn](https://fptoj.com/problem/mst-reduce/solution) |
| `mst-connect` | [Kết nối nguồn điện](https://fptoj.com/problem/mst-connect) | ⭐⭐⭐ | MST | MST với nhiều nguồn phát sẵn | [Xem hướng dẫn](https://fptoj.com/problem/mst-connect/solution) |
| `mst-forest` | [Phân cụm động vật](https://fptoj.com/problem/mst-forest) | ⭐⭐⭐ | MST | Chia thành ~K~ thành phần liên thông | [Xem hướng dẫn](https://fptoj.com/problem/mst-forest/solution) |
| `mst-maxedge` | [Hành trình an toàn](https://fptoj.com/problem/mst-maxedge) | ⭐⭐⭐ | MST | Minimax edge trên đường đi | [Xem hướng dẫn](https://fptoj.com/problem/mst-maxedge/solution) |
| `mst-k-comp` | [Kết nối các khu vực](https://fptoj.com/problem/mst-k-comp) | ⭐⭐⭐ | MST | Gom cạnh có sẵn và chọn thêm cạnh | [Xem hướng dẫn](https://fptoj.com/problem/mst-k-comp/solution) |
| `topo-schedule` | [Lập lịch công việc](https://fptoj.com/problem/topo-schedule) | ⭐⭐ | Topo Sort | Kahn in-degree cơ bản | [Xem hướng dẫn](https://fptoj.com/problem/topo-schedule/solution) |
| `topo-build` | [Xây dựng căn nhà](https://fptoj.com/problem/topo-build) | ⭐⭐ | Topo Sort | Sắp xếp topo phát hiện chu trình | [Xem hướng dẫn](https://fptoj.com/problem/topo-build/solution) |
| `topo-course` | [Chọn môn đăng ký học](https://fptoj.com/problem/topo-course) | ⭐⭐ | Topo Sort | Sắp xếp thứ tự môn học tiên quyết | [Xem hướng dẫn](https://fptoj.com/problem/topo-course/solution) |
| `topo-recipe` | [Pha chế độc dược](https://fptoj.com/problem/topo-recipe) | ⭐⭐ | Topo Sort | Chuỗi chuẩn bị nguyên liệu | [Xem hướng dẫn](https://fptoj.com/problem/topo-recipe/solution) |
| `topo-cycle` | [Phát hiện điểm nghẽn](https://fptoj.com/problem/topo-cycle) | ⭐⭐ | Topo Sort | Kiểm tra tính khả thi của DAG | [Xem hướng dẫn](https://fptoj.com/problem/topo-cycle/solution) |
| `topo-lex` | [Lập lịch ưu tiên từ điển](https://fptoj.com/problem/topo-lex) | ⭐⭐⭐ | Topo Sort | Kahn dùng min-heap tìm thứ tự từ điển | [Xem hướng dẫn](https://fptoj.com/problem/topo-lex/solution) |
| `topo-critical` | [Đường găng dự án](https://fptoj.com/problem/topo-critical) | ⭐⭐⭐ | Topo Sort | DP đường đi dài nhất trên DAG | [Xem hướng dẫn](https://fptoj.com/problem/topo-critical/solution) |
| `topo-alien` | [Mật thư cổ đại](https://fptoj.com/problem/topo-alien) | ⭐⭐⭐⭐ | Topo Sort | Giải mã thứ tự chữ cái trong từ điển | [Xem hướng dẫn](https://fptoj.com/problem/topo-alien/solution) |
| `dij-shortest` | [Đường đi ngắn nhất](https://fptoj.com/problem/dij-shortest) | ⭐⭐ | Dijkstra | Dijkstra cơ bản với priority queue | [Xem hướng dẫn](https://fptoj.com/problem/dij-shortest/solution) |
| `dij-multi` | [Giao hàng từ nhiều kho](https://fptoj.com/problem/dij-multi) | ⭐⭐ | Dijkstra | Multi-source Dijkstra | [Xem hướng dẫn](https://fptoj.com/problem/dij-multi/solution) |
| `dij-grid` | [Mê cung trọng số](https://fptoj.com/problem/dij-grid) | ⭐⭐ | Dijkstra | Dijkstra trên lưới ~2D~ | [Xem hướng dẫn](https://fptoj.com/problem/dij-grid/solution) |
| `dij-edges` | [Đường đi ưu tiên ít cạnh](https://fptoj.com/problem/dij-edges) | ⭐⭐ | Dijkstra | So sánh tối ưu kép {dist, edges} | [Xem hướng dẫn](https://fptoj.com/problem/dij-edges/solution) |
| `dij-hwy` | [Xa lộ và quốc lộ](https://fptoj.com/problem/dij-hwy) | ⭐⭐ | Dijkstra | Trọng số thời gian thực ~L / V~ | [Xem hướng dẫn](https://fptoj.com/problem/dij-hwy/solution) |
| `dij-minimax` | [Độ dốc tối thiểu](https://fptoj.com/problem/dij-minimax) | ⭐⭐⭐ | Dijkstra | Tìm minimax path | [Xem hướng dẫn](https://fptoj.com/problem/dij-minimax/solution) |
| `dij-weight` | [Giới hạn tải trọng](https://fptoj.com/problem/dij-weight) | ⭐⭐⭐ | Dijkstra | Lọc cạnh theo điều kiện tải trọng xe | [Xem hướng dẫn](https://fptoj.com/problem/dij-weight/solution) |
| `dij-matrix` | [Tìm đường đồ thị đầy](https://fptoj.com/problem/dij-matrix) | ⭐⭐⭐ | Dijkstra | Dijkstra quét mảng ~O(N^2)~ cho đồ thị dày | [Xem hướng dẫn](https://fptoj.com/problem/dij-matrix/solution) |
| `dij-flight` | [Đặt vé máy bay](https://fptoj.com/problem/dij-flight) | ⭐⭐⭐ | Dijkstra | Đồ thị trạng thái nhân đôi tầng | [Xem hướng dẫn](https://fptoj.com/problem/dij-flight/solution) |
| `dij-repair` | [Sửa chữa đường bộ](https://fptoj.com/problem/dij-repair) | ⭐⭐⭐ | Dijkstra | Trạng thái ~dist[u][repairs]~ giới hạn hỏng | [Xem hướng dẫn](https://fptoj.com/problem/dij-repair/solution) |
| `dij-rev` | [Đi ngược chiều tối thiểu](https://fptoj.com/problem/dij-rev) | ⭐⭐⭐ | Dijkstra | Đi ngược chiều tối đa ~K~ cạnh | [Xem hướng dẫn](https://fptoj.com/problem/dij-rev/solution) |
| `dij-k-path` | [Hành trình ngắn thứ K](https://fptoj.com/problem/dij-k-path) | ⭐⭐⭐⭐ | Dijkstra | Dijkstra pop-count tìm k-th path | [Xem hướng dẫn](https://fptoj.com/problem/dij-k-path/solution) |
| `dij-charge` | [Trạm sạc xe điện](https://fptoj.com/problem/dij-charge) | ⭐⭐⭐⭐ | Dijkstra | Dijkstra 2D trạng thái pin giới hạn ~C~ | [Xem hướng dẫn](https://fptoj.com/problem/dij-charge/solution) |
| `dij-fuel` | [Bình xăng giới hạn](https://fptoj.com/problem/dij-fuel) | ⭐⭐⭐⭐ | Dijkstra | Trạng thái bình xăng ~dist[u][fuel]~ | [Xem hướng dẫn](https://fptoj.com/problem/dij-fuel/solution) |

## Bài viết liên quan

- [Bài 8b: DSU](dsu.md)
- [Bài 10: BFS & DFS](bfs-dfs-do-thi.md)
- [Bài 23: Floyd-Warshall & Bellman-Ford](floyd-warshall-bellman-ford.md)

## Tài liệu tham khảo

- [VNOI Wiki - Cây khung nhỏ nhất](https://wiki.vnoi.info/algo/graph-theory/minimum-spanning-tree)
- [VNOI Wiki - Đường đi ngắn nhất](https://wiki.vnoi.info/algo/graph-theory/shortest-path)
- [VNOI Wiki - Sắp xếp Tô-pô](https://wiki.vnoi.info/algo/graph-theory/topological-sort)
- [CP-Algorithms - Prim's Algorithm](https://cp-algorithms.com/graph/mst_prim.html)
- [CP-Algorithms - Kruskal's Algorithm](https://cp-algorithms.com/graph/mst_kruskal.html)
- [CP-Algorithms - Topological Sort](https://cp-algorithms.com/graph/topological-sort.html)

**Bài tiếp theo:** [Hash xâu & Z-algorithm →](hash-xau-z-algorithm.md)
