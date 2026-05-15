# Bài 23: Floyd-Warshall & Bellman-Ford

> **Tác giả:** Hà Trí Kiên<br>
> **Nội dung tham khảo từ:** VNOI Wiki - Các thuật toán về tìm đường đi ngắn nhất

## 1. Bellman-Ford - Đường đi ngắn nhất có trọng số ÂM

### Ẩn dụ: Con đường có "ổ gà"

Dijkstra không xử lý được khi có cạnh trọng số âm. Bellman-Ford thì được! Và nó còn **phát hiện chu trình âm**.

### Ý tưởng

Lặp N-1 lần. Mỗi lần, duyệt **tất cả** cạnh, cập nhật khoảng cách nếu tìm được đường tốt hơn.

<p align="center"><img src="/uploads/img/bellman-ford.svg" alt="Bellman-Ford" style="max-width: 700px;" /><br><em>Minh họa thuật toán Bellman-Ford</em></p>

=== "C++"

    ```cpp
    // Bellman-Ford - O(VE)
    // Trả về true nếu có chu trình âm
    bool bellmanFord(int n, int start, vector<tuple<int,int,int>>& edges, 
                     vector<long long>& dist) {
        dist.assign(n + 1, LLONG_MAX);
        dist[start] = 0;
        
        // Lặp N-1 lần
        for (int i = 1; i < n; i++) {
            for (auto [u, v, w] : edges) {
                if (dist[u] != LLONG_MAX && dist[u] + w < dist[v])
                    dist[v] = dist[u] + w;
            }
        }
        
        // Kiểm tra chu trình âm
        for (auto [u, v, w] : edges) {
            if (dist[u] != LLONG_MAX && dist[u] + w < dist[v])
                return true;  // Có chu trình âm!
        }
        return false;
    }
    ```

=== "Python"

    ```python
    def bellman_ford(n, start, edges):
        dist = [float('inf')] * (n + 1)
        dist[start] = 0
        for _ in range(n - 1):
            for u, v, w in edges:
                if dist[u] != float('inf') and dist[u] + w < dist[v]:
                    dist[v] = dist[u] + w
        for u, v, w in edges:
            if dist[u] != float('inf') and dist[u] + w < dist[v]:
                return True, dist
        return False, dist
    ```

### Tại sao lặp N-1 lần? Tại sao kiểm tra thêm 1 lần nữa?

**N-1 lần:** Đường đi ngắn nhất trong đồ thị có N đỉnh đi qua tối đa N-1 cạnh. Mỗi lần lặp, "lan truyền" khoảng cách qua 1 cạnh → sau N-1 lần, mọi đường đi ngắn nhất đã được tìm thấy.

**Kiểm tra lần thứ N:** Nếu sau N-1 lần mà vẫn còn cạnh (u, v) thỏa `dist[u] + w < dist[v]` → đường đi có thể ngắn mãi mãi → **tồn tại chu trình âm**!

### Ví dụ minh họa: Phát hiện chu trình âm

```
Đồ thị: 1→2 (w=1), 2→3 (w=-1), 3→2 (w=-1)
         1   2   3
Khởi tạo: [0, INF, INF]

Lặp 1: dist[2] = 0+1 = 1, dist[3] = 1+(-1) = 0
Lặp 2: dist[2] = 0+(-1) = -1 (cập nhật!), dist[3] = -1+(-1) = -2
Lặp 3: dist[2] = -2+(-1) = -3 (vẫn cập nhật!)

Kiểm tra: 2→3 vẫn giảm → CÓ chu trình âm {2, 3}!
```

---

## 2. Floyd-Warshall - Đường đi ngắn nhất MỌI CẶP

### Ẩn dụ: Bảng khoảng cách thành phố

Bạn có N thành phố. Muốn biết khoảng cách ngắn nhất giữa **mọi cặp** thành phố.

### Ý tưởng

Dùng đỉnh trung gian k. Với mỗi cặp (i, j), thử xem đi qua k có ngắn hơn không.

<p align="center"><img src="/uploads/img/floyd-warshall.svg" alt="Floyd-Warshall" style="max-width: 700px;" /><br><em>Minh họa thuật toán Floyd-Warshall</em></p>

```
dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
```
=== "C++"

    ```cpp
    // Floyd-Warshall - O(V³)
    void floydWarshall(int n, vector<vector<long long>>& dist) {
        // dist[i][j] = khoảng cách ngắn nhất từ i đến j
        // Khởi tạo: dist[i][j] = trọng số cạnh (i,j), hoặc INF nếu không có cạnh
        // dist[i][i] = 0
        
        for (int k = 1; k <= n; k++) {          // Đỉnh trung gian
            for (int i = 1; i <= n; i++) {      // Đỉnh nguồn
                for (int j = 1; j <= n; j++) {  // Đỉnh đích
                    if (dist[i][k] != LLONG_MAX && dist[k][j] != LLONG_MAX)
                        dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }
    }
    ```

=== "Python"

    ```python
    def floyd_warshall(n, dist):
        for k in range(1, n + 1):
            for i in range(1, n + 1):
                for j in range(1, n + 1):
                    if dist[i][k] != float('inf') and dist[k][j] != float('inf'):
                        dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
    ```

### Floyd-Warshall: Truy vết đường đi

Muốn biết đường đi ngắn nhất từ i đến j đi qua những đỉnh nào? Dùng mảng `next[i][j]`:

=== "C++"

    ```cpp
    // Khởi tạo next[i][j] = j nếu có cạnh (i,j), -1 nếu không
    int next[MAXN][MAXN];
    
    void floydWithPath(int n, vector<vector<long long>>& dist) {
        // Khởi tạo next
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++)
                next[i][j] = (i != j && dist[i][j] < LLONG_MAX) ? j : -1;
    
        for (int k = 1; k <= n; k++) {
            for (int i = 1; i <= n; i++) {
                for (int j = 1; j <= n; j++) {
                    if (dist[i][k] != LLONG_MAX && dist[k][j] != LLONG_MAX &&
                        dist[i][k] + dist[k][j] < dist[i][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                        next[i][j] = next[i][k];  // Đi từ i, rẽ tại k
                    }
                }
            }
        }
    }
    
    // Truy vết đường đi từ u đến v
    vector<int> getPath(int u, int v) {
        if (next[u][v] == -1) return {};  // Không có đường đi
        vector<int> path = {u};
        while (u != v) {
            u = next[u][v];
            path.push_back(u);
        }
        return path;
    }
    ```

=== "Python"

    ```python
    def floyd_with_path(n, dist):
        nxt = [[-1] * (n + 1) for _ in range(n + 1)]
        for i in range(1, n + 1):
            for j in range(1, n + 1):
                if i != j and dist[i][j] < float('inf'):
                    nxt[i][j] = j
    
        for k in range(1, n + 1):
            for i in range(1, n + 1):
                for j in range(1, n + 1):
                    if dist[i][k] + dist[k][j] < dist[i][j]:
                        dist[i][j] = dist[i][k] + dist[k][j]
                        nxt[i][j] = nxt[i][k]
    return nxt

    def get_path(u, v, nxt):
        if nxt[u][v] == -1:
            return []
        path = [u]
        while u != v:
            u = nxt[u][v]
            path.append(u)
        return path
    ```

!!! tip "Thử tương tác"
    - [Bellman-Ford](https://algorithm-visualizer.org/dynamic-programming/bellman-fords-shortest-path)
    - [Floyd-Warshall](https://algorithm-visualizer.org/dynamic-programming/floyd-warshalls-shortest-path)

---

## 3. So sánh 4 thuật toán đường đi ngắn nhất

| Thuật toán | Loại | Trọng số âm? | Chu trình âm? | Độ phức tạp |
|-----------|------|-------------|---------------|-------------|
| **BFS** | 1 nguồn, không trọng số | Không | Không | O(V + E) |
| **Dijkstra** | 1 nguồn | Không | Không | O(E log V) |
| **Bellman-Ford** | 1 nguồn | **Có** | **Phát hiện** | O(VE) |
| **Floyd-Warshall** | Mọi cặp | **Có** | **Phát hiện** | O(V³) |

### Khi nào dùng cái nào?

| Tình huống | Dùng |
|-----------|------|
| Đồ thị không trọng số | **BFS** |
| Trọng số ≥ 0, 1 nguồn | **Dijkstra** |
| Có trọng số âm | **Bellman-Ford** |
| Cần đường đi ngắn nhất mọi cặp, N ≤ 500 | **Floyd-Warshall** |
| Cần phát hiện chu trình âm | **Bellman-Ford** hoặc **Floyd-Warshall** |

---

## 4. Lưu ý

- **Dijkstra SAI** khi có trọng số âm → dùng Bellman-Ford!
- **Floyd-Warshall:** Khởi tạo `dist[i][i] = 0`, `dist[i][j] = INF` nếu không có cạnh
- **Tràn số:** Dùng `long long`, kiểm tra `!= LLONG_MAX` trước khi cộng
- **Truy vết đường đi:** Lưu mảng `next[i][j]` để truy vết
- **Thứ tự vòng lặp Floyd:** PHẢI là `k` ngoài cùng! Nếu `k` trong cùng sẽ sai hoàn toàn
- **Bellman-Ford chỉ áp dụng cho đồ thị có hướng** với chu trình âm. Đồ thị vô hướng + cạnh âm → mỗi cạnh vô hướng coi như 2 cạnh có hướng
- **Floyd-Warshall phát hiện chu trình âm:** Nếu sau khi chạy, `dist[i][i] < 0` → đỉnh i nằm trong chu trình âm
- **Thư giãn (Relaxation):** Bellman-Ford hoạt động bằng cách "thư giãn" cạnh — nếu đường đi qua cạnh tốt hơn thì cập nhật. Thuật toán dừng khi không còn thư giãn được nữa

## 5. Ứng dụng

### 5.1. Bao đóng bắc giác (Transitive Closure)

Dùng Floyd-Warshall với toán tử OR thay vì min, AND thay vì cộng:

```cpp
// Kiểm tra có đường đi từ i đến j không
bool reach[MAXN][MAXN];
for (int k = 1; k <= n; k++)
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            reach[i][j] = reach[i][j] || (reach[i][k] && reach[k][j]);
```

### 5.2. Tìm chu trình âm và in ra

```cpp
// Bellman-Ford + truy vết chu trình âm
bool bellmanFordWithPath(int n, int start, vector<tuple<int,int,int>>& edges,
                         vector<long long>& dist, vector<int>& parent) {
    dist.assign(n + 1, LLONG_MAX);
    parent.assign(n + 1, -1);
    dist[start] = 0;

    int lastUpdated = -1;
    for (int i = 1; i < n; i++) {
        for (auto [u, v, w] : edges) {
            if (dist[u] != LLONG_MAX && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                parent[v] = u;
            }
        }
    }

    // Kiểm tra chu trình âm
    for (auto [u, v, w] : edges) {
        if (dist[u] != LLONG_MAX && dist[u] + w < dist[v]) {
            parent[v] = u;
            lastUpdated = v;
            break;
        }
    }

    if (lastUpdated == -1) return false;

    // Truy vết chu trình
    vector<int> cycle;
    int x = lastUpdated;
    for (int i = 0; i < n; i++) x = parent[x];  // Vào trong chu trình
    int cur = x;
    do {
        cycle.push_back(cur);
        cur = parent[cur];
    } while (cur != x);
    cycle.push_back(x);
    reverse(cycle.begin(), cycle.end());

    cout << "Chu trình âm: ";
    for (int v : cycle) cout << v << " ";
    return true;
}
```

### 5.3. Thuật toán Johnson (All-Pairs Shortest Path cho đồ thị thưa)

Khi đồ thị thưa (E << V²), dùng Johnson thay vì Floyd-Warshall:

- Thêm đỉnh ảo, nối đến mọi đỉnh với trọng số 0
- Chạy Bellman-Ford từ đỉnh ảo → lấy potential h[v]
- Cập nhật trọng số: w'(u,v) = w(u,v) + h[u] - h[v] → mọi trọng số ≥ 0
- Chạy Dijkstra từ mỗi đỉnh → O(VE + V·E log V)

---

## Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Shortest Routes II](https://cses.fi/problemset/task/1672) | CSES | ⭐⭐ | Floyd-Warshall |
| [CSES - Cycle Finding](https://cses.fi/problemset/task/1678) | CSES | ⭐⭐⭐ | Bellman-Ford + chu trình âm |
| [CSES - Flight Discount](https://cses.fi/problemset/task/1195) | CSES | ⭐⭐⭐ | Dijkstra nâng cao |
| [SPOJ - NEGGRAPH](https://www.spoj.com/problems/NEGGRAPH/) | SPOJ | ⭐⭐⭐ | Bellman-Ford |
| [VNOJ - NKPATH](https://oj.vnoi.info/problem/nkpath) | VNOJ | ⭐⭐⭐ | Floyd + DP |
| [VNOJ - QBMST](https://oj.vnoi.info/problem/qbmst) | VNOJ | ⭐⭐ | MST cơ bản |
| [VNOJ - DIJKSTRA](https://oj.vnoi.info/problem/dijkstra) | VNOJ | ⭐⭐ | Dijkstra trực tiếp |
| [VNOJ - TOPOSORT](https://oj.vnoi.info/problem/toposort) | VNOJ | ⭐⭐ | Topo sort |

## Bài viết liên quan

- [Bài 10: BFS & DFS](10-bfs-dfs-do-thi.md)
- [Bài 13: MST, Dijkstra, Topo Sort](13-mst-dijkstra-topo-sort.md)

## Tài liệu tham khảo

- [VNOI Wiki - Các thuật toán tìm đường đi ngắn nhất](https://wiki.vnoi.info/algo/graph-theory/shortest-path)
- [CP-Algorithms - Dijkstra](https://cp-algorithms.com/graph/dijkstra.html)
- [CP-Algorithms - Bellman-Ford](https://cp-algorithms.com/graph/bellman_ford.html)
- [CP-Algorithms - Floyd-Warshall](https://cp-algorithms.com/graph/all-pair-shortest-path-floyd-warshall.html)
- [GeeksforGeeks - Bellman-Ford](https://www.geeksforgeeks.org/dsa/bellman-ford-algorithm-dp-23/)
- [GeeksforGeeks - Floyd-Warshall](https://www.geeksforgeeks.org/dsa/floyd-warshall-algorithm-dp-16/)
- [USACO Guide - Shortest Paths](https://usaco.guide/gold/shortest-paths)

**Chúc mừng! Bạn đã hoàn thành toàn bộ 23 bài học CP!**