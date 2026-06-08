# Bài Toán Lubenica - RMQ Trên Cây

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** VNOI Wiki

---

## 1. Bản chất vấn đề

### Bài toán: Truy vấn min/max trên đường đi trong cây

Cho cây $N$ đỉnh, mỗi cạnh có trọng số. Thực hiện $Q$ truy vấn: tìm trọng số nhỏ nhất / lớn nhất trên đường đi từ $u$ đến $v$.

### Các phương pháp

| Phương pháp | Preprocess | Truy vấn | Không gian |
|-------------|-----------|----------|------------|
| Binary Lifting | $O(N \log N)$ | $O(\log N)$ | $O(N \log N)$ |
| **Sparse Table trên Euler Tour** | $O(N \log N)$ | $O(1)$ | $O(N \log N)$ |
| HLD | $O(N)$ | $O(\log^2 N)$ | $O(N)$ |

---

## 2. Tư duy cốt lõi

### Binary Lifting cho RMQ trên cây

Tương tự LCA, nhưng mỗi nút `up[v][i]` không chỉ lưu tổ tiên thứ $2^i$ mà còn lưu **min/max** trên đoạn từ $v$ đến tổ tiên đó.

### Trace chi tiết

Cây 5 đỉnh: $(1,2,w=3)$, $(1,3,w=5)$, $(2,4,w=2)$, $(2,5,w=7)$

**Bảng `up[v][i]` và `minEdge[v][i]`:**

| $v$ | $up[v][0]$ | $minEdge[v][0]$ | $up[v][1]$ | $minEdge[v][1]$ |
|-----|------------|-----------------|------------|-----------------|
| 1 | — | — | — | — |
| 2 | 1 | 3 | — | — |
| 3 | 1 | 5 | — | — |
| 4 | 2 | 2 | 1 | $\min(2, 3) = 2$ |
| 5 | 2 | 7 | 1 | $\min(7, 3) = 3$ |

**Truy vấn:** Min trên đường đi $4 \to 3$.

| Bước | $u$ | $v$ | LCA | Min $4 \to$ LCA | Min $3 \to$ LCA | Kết quả |
|------|-----|-----|-----|-----------------|-----------------|---------|
| 1 | 4 | 3 | 1 | $\min(2, 3) = 2$ | $\min(5) = 5$ | $\min(2, 5) = 2$ |

---

## 3. Đánh giá độ phức tạp

| Thao tác | Thời gian | Không gian |
|----------|-----------|------------|
| Tiền xử lý | $O(N \log N)$ | $O(N \log N)$ |
| Truy vấn | $O(\log N)$ | $O(1)$ |

---

## Code minh họa

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    int main() {
        ios_base::sync_with_stdio(false);
        cin.tie(NULL);

        int n;
        cin >> n;

        int LOG = __lg(n) + 1;
        vector<vector<int>> adj(n + 1);
        vector<vector<pair<int,int>>> edges(n + 1);

        for (int i = 0; i < n - 1; i++) {
            int u, v, w;
            cin >> u >> v >> w;
            adj[u].push_back(v);
            adj[v].push_back(u);
            edges[u].push_back({v, w});
            edges[v].push_back({u, w});
        }

        vector<int> depth(n + 1, 0);
        vector<vector<int>> up(n + 1, vector<int>(LOG, 0));
        vector<vector<int>> minEdge(n + 1, vector<int>(LOG, INT_MAX));
        vector<vector<int>> maxEdge(n + 1, vector<int>(LOG, INT_MIN));

        // BFS từ đỉnh 1
        queue<int> q;
        q.push(1);
        depth[1] = 0;

        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (auto [v, w] : edges[u]) {
                if (v == up[u][0]) continue;
                depth[v] = depth[u] + 1;
                up[v][0] = u;
                minEdge[v][0] = w;
                maxEdge[v][0] = w;
                q.push(v);
            }
        }

        // Binary Lifting
        for (int j = 1; j < LOG; j++) {
            for (int i = 1; i <= n; i++) {
                up[i][j] = up[up[i][j-1]][j-1];
                minEdge[i][j] = min(minEdge[i][j-1], minEdge[up[i][j-1]][j-1]);
                maxEdge[i][j] = max(maxEdge[i][j-1], maxEdge[up[i][j-1]][j-1]);
            }
        }

        auto query = [&](int u, int v) -> pair<int,int> {
            if (depth[u] < depth[v]) swap(u, v);
            int mn = INT_MAX, mx = INT_MIN;
            int diff = depth[u] - depth[v];
            for (int j = 0; j < LOG; j++) {
                if (diff & (1 << j)) {
                    mn = min(mn, minEdge[u][j]);
                    mx = max(mx, maxEdge[u][j]);
                    u = up[u][j];
                }
            }
            if (u == v) return {mn, mx};
            for (int j = LOG - 1; j >= 0; j--) {
                if (up[u][j] != up[v][j]) {
                    mn = min(mn, min(minEdge[u][j], minEdge[v][j]));
                    mx = max(mx, max(maxEdge[u][j], maxEdge[v][j]));
                    u = up[u][j];
                    v = up[v][j];
                }
            }
            mn = min(mn, min(minEdge[u][0], minEdge[v][0]));
            mx = max(mx, max(maxEdge[u][0], maxEdge[v][0]));
            return {mn, mx};
        };

        int q_count;
        cin >> q_count;
        while (q_count--) {
            int u, v;
            cin >> u >> v;
            auto [mn, mx] = query(u, v);
            cout << mn << " " << mx << "\n";
        }
        return 0;
    }
    ```

=== "Python"

    ```python
    from collections import deque
    import sys
    input = sys.stdin.readline

    n = int(input())
    LOG = n.bit_length()
    adj = [[] for _ in range(n + 1)]

    for _ in range(n - 1):
        u, v, w = map(int, input().split())
        adj[u].append((v, w))
        adj[v].append((u, w))

    depth = [0] * (n + 1)
    up = [[0] * LOG for _ in range(n + 1)]
    min_edge = [[float('inf')] * LOG for _ in range(n + 1)]
    max_edge = [[float('-inf')] * LOG for _ in range(n + 1)]

    q = deque([1])
    while q:
        u = q.popleft()
        for v, w in adj[u]:
            if v == up[u][0]:
                continue
            depth[v] = depth[u] + 1
            up[v][0] = u
            min_edge[v][0] = w
            max_edge[v][0] = w
            q.append(v)

    for j in range(1, LOG):
        for i in range(1, n + 1):
            up[i][j] = up[up[i][j-1]][j-1]
            min_edge[i][j] = min(min_edge[i][j-1], min_edge[up[i][j-1]][j-1])
            max_edge[i][j] = max(max_edge[i][j-1], max_edge[up[i][j-1]][j-1])

    def query(u, v):
        if depth[u] < depth[v]:
            u, v = v, u
        mn, mx = float('inf'), float('-inf')
        diff = depth[u] - depth[v]
        for j in range(LOG):
            if diff & (1 << j):
                mn = min(mn, min_edge[u][j])
                mx = max(mx, max_edge[u][j])
                u = up[u][j]
        if u == v:
            return mn, mx
        for j in range(LOG - 1, -1, -1):
            if up[u][j] != up[v][j]:
                mn = min(mn, min_edge[u][j], min_edge[v][j])
                mx = max(mx, max_edge[u][j], max_edge[v][j])
                u = up[u][j]
                v = up[v][j]
        mn = min(mn, min_edge[u][0], min_edge[v][0])
        mx = max(mx, max_edge[u][0], max_edge[v][0])
        return mn, mx

    q_count = int(input())
    for _ in range(q_count):
        u, v = map(int, input().split())
        mn, mx = query(u, v)
        print(mn, mx)
    ```
