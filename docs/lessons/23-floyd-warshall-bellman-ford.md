# Bài 23: Floyd-Warshall & Bellman-Ford

> **Tác giả:** Hà Trí Kiên
> **Nội dung tham khảo từ:** VNOI Wiki - Các thuật toán về tìm đường đi ngắn nhất

## 1. Bellman-Ford - Đường đi ngắn nhất có trọng số ÂM

### Ẩn dụ: Con đường có "ổ gà"

Dijkstra không xử lý được khi có cạnh trọng số âm. Bellman-Ford thì được! Và nó còn **phát hiện chu trình âm**.

### Ý tưởng

Lặp N-1 lần. Mỗi lần, duyệt **tất cả** cạnh, cập nhật khoảng cách nếu tìm được đường tốt hơn.

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

---

## 2. Floyd-Warshall - Đường đi ngắn nhất MỌI CẶP

### Ẩn dụ: Bảng khoảng cách thành phố

Bạn có N thành phố. Muốn biết khoảng cách ngắn nhất giữa **mọi cặp** thành phố.

### Ý tưởng

Dùng đỉnh trung gian k. Với mỗi cặp (i, j), thử xem đi qua k có ngắn hơn không.

```
dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
```

### Code C++

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

### Code Python

```python
def floyd_warshall(n, dist):
    for k in range(1, n + 1):
        for i in range(1, n + 1):
            for j in range(1, n + 1):
                if dist[i][k] < float('inf') and dist[k][j] < float('inf'):
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
```

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

---

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
