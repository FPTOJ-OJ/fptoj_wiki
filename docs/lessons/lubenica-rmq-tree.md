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

**Truy vấn 1:** Min/Max trên đường đi $4 \to 3$.

| Bước | $u$ | $v$ | LCA | Min $4 \to$ LCA | Max $4 \to$ LCA | Min $3 \to$ LCA | Max $3 \to$ LCA | Kết quả |
|------|-----|-----|-----|-----------------|-----------------|-----------------|-----------------|---------|
| 1 | 4 | 3 | 1 | $\min(2,3)=2$ | $\max(2,3)=3$ | $\min(5)=5$ | $\max(5)=5$ | $(2,5)$ |

Chi tiết từng bước nhảy (đúng logic code `query`):
1. $depth[4]=2$, $depth[3]=1$, $diff=1$ → nhảy $4$ lên $up[4][0]=2$, $min=2$, $max=2$. Giờ $u=2, v=3$ ngang nhau.
2. Xét $j=1$: $up[2][1]=0$ (vì $up[2][0]=1$, $up[1][0]=0$), $up[3][1]=0$ → **bằng nhau nên KHÔNG nhảy** (nếu nhảy cả hai sẽ rơi xuống đỉnh $0$ vô nghĩa — đây là bẫy hay gặp).
3. Xét $j=0$: $up[2][0]=1$, $up[3][0]=1$ → bằng nhau nên KHÔNG nhảy (cả hai đã là con trực tiếp của LCA $=1$).
4. Bước cuối: $u=2, v=3$ là con trực tiếp của LCA → lấy 1 cạnh mỗi bên: $\min(3,5)=3$? Cộng với đoạn trước đó ($4 \to 2$: $min=2$) → $\min(2,3,5)=2$, $\max(2,3,5)=5$. Kết quả $(2,5)$ khớp bảng trên.

**Truy vấn 2:** Max trên đường đi $4 \to 5$ (cùng nhánh).

| Bước | $u$ | $v$ | LCA | Max $4 \to$ LCA | Max $5 \to$ LCA | Kết quả |
|------|-----|-----|-----|-----------------|-----------------|---------|
| 1 | 4 | 5 | 2 | $\max(2)=2$ | $\max(7)=7$ | $\max(2,7)=7$ |

**Truy vấn 3:** Min/Max trên đường đi $4 \to 1$ ($1$ là gốc, $4$ là cháu).

| Bước | $u$ | $v$ | LCA | Min $4 \to$ LCA | Max $4 \to$ LCA |
|------|-----|-----|-----|-----------------|-----------------|
| 1 | 4 | 1 | 1 (v=$1$) | $\min(2,3)=2$ | $\max(2,3)=3$ |

$diff=2$ → nhảy: $j=1$ (bit 1): $4 \to up[4][1]=1$, minEdge$=2$, maxEdge$=3$. LCA = 1 → kết quả $(2,3)$.

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
        cin >> n;                              // Số đỉnh của cây

        int LOG = __lg(n) + 1;                 // Số bước nhảy tối đa: log2(N) + 1
        vector<vector<pair<int,int>>> adj(n + 1); // Danh sách kề duy nhất: (đỉnh kề, trọng số)

        for (int i = 0; i < n - 1; i++) {
            int u, v, w;
            cin >> u >> v >> w;                // Đọc cạnh: u, v, trọng số w
            adj[u].push_back({v, w});
            adj[v].push_back({u, w});
        }

        vector<int> depth(n + 1, 0);           // depth[v] = độ sâu của đỉnh v
        vector<vector<int>> up(n + 1, vector<int>(LOG, 0));  // up[v][j] = tổ tiên 2^j của v
        vector<vector<int>> minEdge(n + 1, vector<int>(LOG, INT_MAX)); // min trên đoạn 2^j
        vector<vector<int>> maxEdge(n + 1, vector<int>(LOG, INT_MIN)); // max trên đoạn 2^j

        // BFS từ đỉnh 1 (gốc) để tính depth và up[][0], minEdge[][0], maxEdge[][0]
        queue<int> q;
        q.push(1);
        depth[1] = 0;                          // Gốc có độ sâu 0

        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (auto [v, w] : adj[u]) {
                if (v == up[u][0]) continue;   // Bỏ qua cạnh ngược lên cha
                depth[v] = depth[u] + 1;        // Con sâu hơn cha 1 đơn vị
                up[v][0] = u;                   // Tổ tiên 2^0 của v là u (cha trực tiếp)
                minEdge[v][0] = w;              // Min trên đoạn 1 bước = trọng số cạnh
                maxEdge[v][0] = w;              // Max trên đoạn 1 bước = trọng số cạnh
                q.push(v);
            }
        }

        // Binary Lifting: xây bảng up, minEdge, maxEdge cho các bước nhảy 2^j
        for (int j = 1; j < LOG; j++) {
            for (int i = 1; i <= n; i++) {
                up[i][j] = up[up[i][j-1]][j-1];  // Tổ tiên 2^j = tổ tiên 2^(j-1) của tổ tiên 2^(j-1)
                // Min/Max trên đoạn 2^j = min/max của 2 đoạn 2^(j-1) ghép lại
                minEdge[i][j] = min(minEdge[i][j-1], minEdge[up[i][j-1]][j-1]);
                maxEdge[i][j] = max(maxEdge[i][j-1], maxEdge[up[i][j-1]][j-1]);
            }
        }

        // Hàm truy vấn: trả về (min, max) trên đường đi từ u đến v
        auto query = [&](int u, int v) -> pair<int,int> {
            if (depth[u] < depth[v]) swap(u, v); // Đưa u xuống sâu hơn (hoặc bằng) v
            int mn = INT_MAX, mx = INT_MIN;
            int diff = depth[u] - depth[v];       // Chênh lệch độ sâu
            // Bước 1: đưa u lên ngang độ sâu với v
            for (int j = 0; j < LOG; j++) {
                if (diff & (1 << j)) {             // Nếu bit j của diff = 1
                    mn = min(mn, minEdge[u][j]);   // Cập nhật min dọc đường
                    mx = max(mx, maxEdge[u][j]);   // Cập nhật max dọc đường
                    u = up[u][j];                  // Nhảy u lên 2^j bước
                }
            }
            if (u == v) return {mn, mx};           // u là tổ tiên của v → xong

            // Bước 2: nhảy cả u và v lên cùng lúc đến sát LCA
            for (int j = LOG - 1; j >= 0; j--) {
                if (up[u][j] != up[v][j]) {        // Nếu tổ tiên 2^j khác nhau
                    mn = min(mn, min(minEdge[u][j], minEdge[v][j])); // Cập nhật min
                    mx = max(mx, max(maxEdge[u][j], maxEdge[v][j])); // Cập nhật max
                    u = up[u][j];                  // Nhảy u lên 2^j
                    v = up[v][j];                  // Nhảy v lên 2^j
                }
            }
            // Bước 3: u và v là con trực tiếp của LCA → lấy 1 bước cuối
            mn = min(mn, min(minEdge[u][0], minEdge[v][0]));
            mx = max(mx, max(maxEdge[u][0], maxEdge[v][0]));
            return {mn, mx};
        };

        int q_count;
        cin >> q_count;                          // Số truy vấn
        while (q_count--) {
            int u, v;
            cin >> u >> v;                       // Đọc cặp đỉnh truy vấn
            auto [mn, mx] = query(u, v);
            cout << mn << " " << mx << "\n";      // In min và max trên đường đi
        }
        return 0;
    }
    ```

=== "Python"

    ```python
    from collections import deque
    import sys
    input = sys.stdin.readline

    n = int(input())                           # Số đỉnh
    LOG = n.bit_length()                       # log2(N) làm tròn lên
    adj = [[] for _ in range(n + 1)]           # Danh sách kề (đỉnh, trọng số)

    for _ in range(n - 1):
        u, v, w = map(int, input().split())    # Đọc cạnh u-v có trọng số w
        adj[u].append((v, w))
        adj[v].append((u, w))

    depth = [0] * (n + 1)                      # Độ sâu từ gốc
    up = [[0] * LOG for _ in range(n + 1)]     # up[v][j] = tổ tiên 2^j của v
    min_edge = [[float('inf')] * LOG for _ in range(n + 1)]  # min trên đoạn 2^j
    max_edge = [[float('-inf')] * LOG for _ in range(n + 1)] # max trên đoạn 2^j

    q = deque([1])                             # BFS từ đỉnh 1 (gốc)
    while q:
        u = q.popleft()
        for v, w in adj[u]:
            if v == up[u][0]:                  # Bỏ qua cạnh ngược lên cha
                continue
            depth[v] = depth[u] + 1            # Con sâu hơn cha 1
            up[v][0] = u                       # Cha trực tiếp của v là u
            min_edge[v][0] = w                 # Min đoạn 1 bước = w
            max_edge[v][0] = w                 # Max đoạn 1 bước = w
            q.append(v)

    # Binary Lifting: xây bảng cho bước nhảy 2^j
    for j in range(1, LOG):
        for i in range(1, n + 1):
            up[i][j] = up[up[i][j-1]][j-1]     # Nhảy 2 lần 2^(j-1)
            # Min/Max = ghép min/max 2 đoạn 2^(j-1)
            min_edge[i][j] = min(min_edge[i][j-1], min_edge[up[i][j-1]][j-1])
            max_edge[i][j] = max(max_edge[i][j-1], max_edge[up[i][j-1]][j-1])

    def query(u, v):
        # Trả về (min, max) trên đường đi từ u đến v
        if depth[u] < depth[v]:
            u, v = v, u                         # u là đỉnh sâu hơn
        mn, mx = float('inf'), float('-inf')
        diff = depth[u] - depth[v]              # Chênh lệch độ sâu
        # Đưa u lên ngang v
        for j in range(LOG):
            if diff & (1 << j):                  # Nếu bit j = 1
                mn = min(mn, min_edge[u][j])
                mx = max(mx, max_edge[u][j])
                u = up[u][j]                     # Nhảy u lên 2^j
        if u == v:                               # u trùng v → đã đến LCA
            return mn, mx
        # Nhảy cả u, v lên sát LCA
        for j in range(LOG - 1, -1, -1):
            if up[u][j] != up[v][j]:
                mn = min(mn, min_edge[u][j], min_edge[v][j])
                mx = max(mx, max_edge[u][j], max_edge[v][j])
                u = up[u][j]
                v = up[v][j]
        # Lấy 1 bước cuối cùng đến LCA
        mn = min(mn, min_edge[u][0], min_edge[v][0])
        mx = max(mx, max_edge[u][0], max_edge[v][0])
        return mn, mx

    q_count = int(input())                       # Số truy vấn
    for _ in range(q_count):
        u, v = map(int, input().split())         # Đọc truy vấn
        mn, mx = query(u, v)
        print(mn, mx)                            # In min và max
    ```

---

## 4. Lỗi thường gặp (SAI / ĐÚNG)

### SAI 1: Nhảy binary lifting mà không kiểm tra đỉnh $0$ → rơi xuống `v = 0` vô nghĩa

```cpp
// SAI (trace cũ trong bài từng mắc): u=2, v=3, thấy up[2][1] != up[3][1] là nhảy ngay
// → v nhảy từ 3 xuống 0, mọi min/max sau đó đều rác
if (up[u][j] != up[v][j]) { u = up[u][j]; v = up[v][j]; }
```

```cpp
// ĐÚNG: với ví dụ trên, up[2][1] == up[3][1] == 0 nên KHÔNG nhảy;
// chỉ nhảy khi hai tổ tiên khác nhau VÀ đều khác 0.
// Khi u, v đã là con trực tiếp của LCA, vòng lặp không nhảy gì cả
// mà rơi xuống "bước 3: lấy 1 cạnh cuối" trong code query.
```

> **Quy tắc nhớ:** đỉnh $0$ là "hư vô" (gốc của gốc). Mọi `up[*][*] = 0` nghĩa là "đã vượt quá gốc" — không được dùng `minEdge[0][*]` / `maxEdge[0][*]` để cập nhật đáp án.

### SAI 2: Khai báo 2 danh sách kề trùng nhau (`adj` + `edges`)

```cpp
// SAI: vừa lưu adj (không trọng số) vừa lưu edges (có trọng số) → tốn 2x bộ nhớ,
// dễ quên đồng bộ (thêm cạnh vào adj mà quên edges → BFS mất cạnh)
```

```cpp
// ĐÚNG (code đã gộp): chỉ giữ 1 danh sách kề có trọng số
vector<vector<pair<int,int>>> adj(n + 1); // (đỉnh kề, trọng số)
```

### SAI 3: Khởi tạo `minEdge` / `maxEdge` của gốc sai

```cpp
// SAI: để minEdge[1][*] = 0 → min trên đường đi luôn bị kéo về 0
// SAI: để maxEdge[1][*] = 0 với cạnh âm → max bị sai
```

```cpp
// ĐÚNG: gốc không có cạnh đi lên → min = +INF, max = -INF (trung hòa với min/max)
minEdge[1][0] = INT_MAX; maxEdge[1][0] = INT_MIN; // (code khởi tạo vector đã làm đúng)
```

---

## 5. Bài tập luyện tập

| Mã bài | Tên bài tập | Độ khó | Kiểu bài tập (Bản chất) | Bài học lý thuyết |
| :--- | :--- | :---: | :--- | :--- |
| `rmqt-min-basic` | [Min Cơ Bản](https://fptoj.com/problem/rmqt-min-basic) | ⭐ | RMQ - Min cơ bản | [Lubenica & RMQ trên cây](lubenica-rmq-tree.md) |
| `rmqt-min-path` | [Min Trên Đường Đi](https://fptoj.com/problem/rmqt-min-path) | ⭐⭐ | Giá trị nhỏ nhất trên đường đi | [Lubenica & RMQ trên cây](lubenica-rmq-tree.md) |
| `rmqt-max-path` | [Max Trên Đường Đi](https://fptoj.com/problem/rmqt-max-path) | ⭐⭐ | Giá trị lớn nhất trên đường đi | [Lubenica & RMQ trên cây](lubenica-rmq-tree.md) |
| `rmqt-minmax` | [Min/Max Trên Đường Đi](https://fptoj.com/problem/rmqt-minmax) | ⭐⭐ | Min và max trên đường đi | [Lubenica & RMQ trên cây](lubenica-rmq-tree.md) |
| `rmqt-up-edge` | [Cập Nhật Cạnh](https://fptoj.com/problem/rmqt-up-edge) | ⭐⭐⭐ | Cập nhật trọng số cạnh | [Lubenica & RMQ trên cây](lubenica-rmq-tree.md) |
| `rmqt-xor-path` | [XOR Trên Đường Đi](https://fptoj.com/problem/rmqt-xor-path) | ⭐⭐⭐ | XOR trên đường đi | [Lubenica & RMQ trên cây](lubenica-rmq-tree.md) |
| `rmqt-or-path` | [OR Trên Đường Đi](https://fptoj.com/problem/rmqt-or-path) | ⭐⭐⭐ | OR trên đường đi | [Lubenica & RMQ trên cây](lubenica-rmq-tree.md) |
| `rmqt-and-path` | [AND Trên Đường Đi](https://fptoj.com/problem/rmqt-and-path) | ⭐⭐⭐ | AND trên đường đi | [Lubenica & RMQ trên cây](lubenica-rmq-tree.md) |
| `rmqt-kth-edge` | [Cạnh Lớn Thứ K](https://fptoj.com/problem/rmqt-kth-edge) | ⭐⭐⭐⭐ | Cạnh lớn thứ $K$ trên đường đi | [Lubenica & RMQ trên cây](lubenica-rmq-tree.md) |
