# Bài 31: LCA & Binary Lifting - Tổ tiên chung gần nhất

> **Tác giả:** Hà Trí Kiên<br>
> **Nội dung tham khảo từ:** CP-Algorithms - LCA, VNOI Wiki

## 1. Chuyện gì đang xảy ra?

### Bài toán

Cho cây N đỉnh. Có Q câu hỏi: "Tổ tiên chung gần nhất (LCA) của đỉnh u và v là đỉnh nào?"

**LCA (Lowest Common Ancestor)** = nút là tổ tiên chung của cả u và v, và **xa gốc nhất**.

```
        1
       / \
      2   3
     / \   \
    4   5   6
       /
      7

LCA(4, 7) = 2   (cả 4 và 7 đều có tổ tiên là 2, nhưng 2 gần hơn 1)
LCA(4, 5) = 2
LCA(7, 6) = 1   (tổ tiên chung duy nhất là gốc)
LCA(4, 4) = 4   (chính nó)
```

### Tại sao LCA quan trọng?

LCA xuất hiện ở **rất nhiều** bài toán cây:

- Khoảng cách giữa 2 đỉnh: `dist(u, v) = depth[u] + depth[v] - 2 * depth[LCA(u, v)]`
- Đường đi giữa 2 đỉnh trên cây
- Bài toán cộng trên đường đi trong cây

### Phương pháp thô: O(N) mỗi truy vấn

```
LCA(u, v):
1. Đưa u và v lên cùng độ sâu
2. Nhảy đồng thời u và v lên cho đến khi gặp nhau
→ Mỗi bước O(1), tối đa O(N) bước
```

Với Q = 10⁵ truy vấn → O(NQ) = 10¹⁰ → **TLE**!

---

## 2. Binary Lifting — Ý tưởng

### Nhảy "bật nhảy" thay vì từng bước

Thay vì nhảy từng bước lên cha, ta nhảy **2^k bước** một lúc!

**Tiền xử lý:** Tính trước `up[v][k]` = đỉnh cách v đúng 2^k bước lên trên.

```
up[v][0] = cha(v)           (nhảy 1 = 2⁰ bước)
up[v][1] = cha(cha(v))      (nhảy 2 = 2¹ bước)
up[v][2] = cha(cha(cha(cha(v))))  (nhảy 4 = 2² bước)
...
up[v][k] = nhảy 2^k bước từ v lên trên
```

**Để tính up[v][k]**: Nhảy 2^k = nhảy 2^(k-1) hai lần!

```
up[v][k] = up[ up[v][k-1] ][k-1]
                ↑                 ↑
          nhảy 2^(k-1) lần   nhảy thêm 2^(k-1) lần nữa
```

### Minh họa

```
Cây:        1  (depth=0)
           / \
          2   3  (depth=1)
         / \
        4   5  (depth=2)
       /
      7  (depth=3)

Bảng up:
          up[v][0]  up[v][1]  up[v][2]
v=7:      4         2         1
v=4:      2         1         0 (null)
v=2:      1         0         0
v=5:      2         1         0
v=3:      1         0         0
v=1:      0         0         0

Ví dụ: up[7][2] = up[up[7][1]][1] = up[2][1] = 1
→ Từ đỉnh 7, nhảy 4 bước lên trên = đỉnh 1 ✅
```

---

## 3. Thuật toán LCA với Binary Lifting

### Bước 1: Tiền xử lý depth[] và up[][]

Dùng BFS/DFS tính độ sâu và bảng up.

```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 200005;
const int LOG = 20;

vector<int> adj[MAXN];
int depth[MAXN];
int up[MAXN][LOG];

// DFS tính depth và up
void dfs(int v, int parent) {
    depth[v] = depth[parent] + 1;
    up[v][0] = parent;
    
    // Tính up[v][k] cho k = 1, 2, ...
    for (int k = 1; k < LOG; k++)
        up[v][k] = up[up[v][k-1]][k-1];
    
    for (int u : adj[v]) {
        if (u != parent)
            dfs(u, v);
    }
}
```

### Bước 2: Đưa 2 đỉnh lên cùng độ sâu

```cpp
// Đưa v lên cùng depth với u (u đang ở dưới)
int lift(int v, int d) {
    for (int k = 0; k < LOG; k++) {
        if (d & (1 << k))  // Nếu bit k của d = 1
            v = up[v][k];  // Nhảy 2^k bước
    }
    return v;
}

int bringToSameLevel(int u, int v) {
    if (depth[u] < depth[v]) swap(u, v);
    return lift(u, depth[u] - depth[v]);  // Đưa u xuống bằng v
}
```

### Bước 3: Tìm LCA

```cpp
int lca(int u, int v) {
    // Bước 1: Đưa lên cùng độ sâu
    if (depth[u] < depth[v]) swap(u, v);
    u = lift(u, depth[u] - depth[v]);
    
    if (u == v) return u;  // Cùng đỉnh!
    
    // Bước 2: Nhảy từ cao xuống thấp
    for (int k = LOG - 1; k >= 0; k--) {
        if (up[u][k] != up[v][k]) {  // Nếu nhảy 2^k bước mà khác
            u = up[u][k];             // → Nhảy!
            v = up[v][k];
        }
    }
    
    // Bây giờ u và v là con trực tiếp của LCA
    return up[u][0];
}
```

### Giải thích chi tiết Bước 2

Tại sao nhảy từ **cao xuống thấp**?

```
Giả sử LCA(u, v) ở depth = 5, u và v đang ở depth = 10.

LOG = 4, k chạy từ 3 xuống 0:

k=3 (nhảy 8): up[u][3] ≠ up[v][3]? Có (vì 8 > 5) → KHÔNG nhảy
k=2 (nhảy 4): up[u][2] ≠ up[v][2]? Có (vì 4 > 0) → NHẢY!
  → u, v lên depth = 6
k=1 (nhảy 2): up[u][1] ≠ up[v][1]? Có (vì 2 > 1) → KHÔNG nhảy
k=0 (nhảy 1): up[u][0] ≠ up[v][0]? Có (vì 1 = 1) → NHẢY!
  → u, v lên depth = 5 = depth của LCA? Không!

Sau vòng lặp: u, v ở depth = 5+1 = 6 (con trực tiếp của LCA)
→ up[u][0] = LCA!
```

---

## 4. Code hoàn chỉnh

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    
    const int MAXN = 200005;
    const int LOG = 20;
    
    vector<int> adj[MAXN];
    int depth[MAXN], up[MAXN][LOG];
    
    void dfs(int v, int p) {
        depth[v] = depth[p] + 1;
        up[v][0] = p;
        for (int k = 1; k < LOG; k++)
            up[v][k] = up[up[v][k-1]][k-1];
        for (int u : adj[v])
            if (u != p) dfs(u, v);
    }
    
    int lca(int u, int v) {
        if (depth[u] < depth[v]) swap(u, v);
        
        // Đưa u lên cùng depth với v
        int diff = depth[u] - depth[v];
        for (int k = 0; k < LOG; k++)
            if (diff & (1 << k))
                u = up[u][k];
        
        if (u == v) return u;
        
        // Tìm LCA
        for (int k = LOG - 1; k >= 0; k--)
            if (up[u][k] != up[v][k]) {
                u = up[u][k];
                v = up[v][k];
            }
        return up[u][0];
    }
    
    int main() {
        ios::sync_with_stdio(false); cin.tie(0);
        int n, q;
        cin >> n >> q;
        
        for (int i = 2; i <= n; i++) {
            int p; cin >> p;
            adj[p].push_back(i);
            adj[i].push_back(p);
        }
        
        depth[0] = -1;  // Để depth[root] = 0
        dfs(1, 0);
        
        while (q--) {
            int u, v; cin >> u >> v;
            cout << lca(u, v) << "\n";
        }
    }
    ```

=== "Python"

    ```python
    import sys
    sys.setrecursionlimit(300000)
    input = sys.stdin.readline
    
    class LCA:
        def __init__(self, n, root, adj):
            self.LOG = n.bit_length()
            self.adj = adj
            self.depth = [0] * (n + 1)
            self.up = [[0] * self.LOG for _ in range(n + 1)]
            self._dfs(root, 0)
        
        def _dfs(self, v, p):
            self.depth[v] = self.depth[p] + 1
            self.up[v][0] = p
            for k in range(1, self.LOG):
                self.up[v][k] = self.up[self.up[v][k-1]][k-1]
            for u in self.adj[v]:
                if u != p:
                    self._dfs(u, v)
        
        def get_lca(self, u, v):
            if self.depth[u] < self.depth[v]:
                u, v = v, u
            
            diff = self.depth[u] - self.depth[v]
            for k in range(self.LOG):
                if diff & (1 << k):
                    u = self.up[u][k]
            
            if u == v: return u
            
            for k in range(self.LOG - 1, -1, -1):
                if self.up[u][k] != self.up[v][k]:
                    u = self.up[u][k]
                    v = self.up[v][k]
            return self.up[u][0]
        
        def distance(self, u, v):
            l = self.get_lca(u, v)
            return self.depth[u] + self.depth[v] - 2 * self.depth[l]
    ```

---

## 5. Ứng dụng: Khoảng cách trên cây

```cpp
int dist(int u, int v) {
    int w = lca(u, v);
    return depth[u] + depth[v] - 2 * depth[w];
}

// Ví dụ: dist(4, 6) trong cây:
//        1
//       / \
//      2   3
//     / \   \
//    4   5   6
//
// LCA(4, 6) = 1, depth[4]=2, depth[6]=2, depth[1]=0
// dist = 2 + 2 - 2*0 = 4 ✅ (đường: 4→2→1→3→6)
```

---

## 6. Lưu ý & Cạm bẫy

### 6.1. LOG phải đủ lớn

```cpp
// SAI: LOG quá nhỏ → không nhảy đủ
const int LOG = 10;  // Chỉ nhảy tối đa 2^10 = 1024 bước

// ĐÚNG: LOG >= log₂(MAXN)
const int LOG = 20;  // Nhảy tối đa 2^20 ≈ 10^6 bước
```

### 6.2. up[root][k] phải = 0

Gốc có `up[root][0] = 0` (không có cha). Đảm bảo đỉnh 0 không có trong cây để tránh lỗi.

### 6.3. Khởi tạo depth[0] = -1

Để `depth[root] = depth[0] + 1 = 0`.

### 6.4. Độ phức tạp

- Tiền xử lý: O(N log N) — DFS + tính bảng up
- Mỗi truy vấn LCA: O(log N)

---

## 7. Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Company Queries I](https://cses.fi/problemset/task/1687) | CSES | ⭐⭐ | Binary Lifting |
| [CSES - Company Queries II](https://cses.fi/problemset/task/1688) | CSES | ⭐⭐ | LCA |
| [CSES - Distance Queries](https://cses.fi/problemset/task/1135) | CSES | ⭐⭐ | Khoảng cách cây |
| [CSES - Path Queries](https://cses.fi/problemset/task/1138) | CSES | ⭐⭐⭐ | Cộng trên đường đi |
| [SPOJ - LCA](https://www.spoj.com/problems/LCA/) | SPOJ | ⭐⭐ | LCA cơ bản |

---

## Tài liệu tham khảo

- [CP-Algorithms - LCA with Binary Lifting](https://cp-algorithms.com/graph/lca_binary_lifting.html)
- [CP-Algorithms - LCA](https://cp-algorithms.com/graph/lca.html)
- [VNOI Wiki - LCA Binary Lifting](https://wiki.vnoi.info/algo/data-structures/lca-binlift)
- [YouTube - LCA (takeuforward)](https://www.youtube.com/watch?v=qPxS_rY0OJw)

**Bài tiếp theo:** [Greedy →](21-greedy.md)