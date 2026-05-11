# Bài 13: MST, Dijkstra, Topo Sort - Đồ Thị Nâng Cao

> **Tác giả:** Hà Trí Kiên
> **Nội dung tham khảo từ:** VNOI Wiki - Cây khung nhỏ nhất, Đường đi ngắn nhất, Sắp xếp Tô-pô

## 1. MST - Cây Khung Nhỏ Nhất

### Ẩn dụ: Lắp mạng internet

Có N nhà, M đường dây nối giữa các nhà. Muốn nối tất cả nhà với chi phí thấp nhất → tìm **cây khung nhỏ nhất** (MST)!

### Thuật toán Kruskal

**Ý tưởng:** Sắp xếp tất cả cạnh theo trọng số tăng dần. Duyệt, nếu cạnh không tạo chu trình → thêm vào MST.

```cpp
#include <algorithm>
using namespace std;

struct Edge {
    int u, v, w;
    bool operator<(const Edge& other) const {
        return w < other.w;
    }
};

// DSU (Disjoint Set Union) - xem lại Bài 8
struct DSU {
    vector<int> parent, sz;
    DSU(int n) {
        parent.resize(n + 1);
        sz.resize(n + 1, 1);
        for (int i = 1; i <= n; i++) parent[i] = i;
    }
    int find(int v) {
        if (v == parent[v]) return v;
        return parent[v] = find(parent[v]);
    }
    bool unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return false;
        if (sz[a] < sz[b]) swap(a, b);
        parent[b] = a;
        sz[a] += sz[b];
        return true;
    }
};

long long kruskal(int n, vector<Edge>& edges) {
    sort(edges.begin(), edges.end());
    DSU dsu(n);
    long long mst_weight = 0;
    int edges_used = 0;
    
    for (auto& e : edges) {
        if (dsu.unite(e.u, e.v)) {
            mst_weight += e.w;
            edges_used++;
            if (edges_used == n - 1) break;
        }
    }
    return (edges_used == n - 1) ? mst_weight : -1;
}
```

### Thuật toán Prim

**Ý tưởng:** Bắt đầu từ đỉnh任意. Mỗi bước, chọn cạnh nhỏ nhất nối đỉnh đã thăm với đỉnh chưa thăm.

```cpp
long long prim(int n, vector<vector<pair<int,int>>>& adj) {
    vector<bool> visited(n + 1, false);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    pq.push({0, 1});  // {trọng số, đỉnh}
    long long mst_weight = 0;
    int count = 0;
    
    while (!pq.empty() && count < n) {
        auto [w, u] = pq.top();
        pq.pop();
        if (visited[u]) continue;
        visited[u] = true;
        mst_weight += w;
        count++;
        
        for (auto [v, weight] : adj[u]) {
            if (!visited[v])
                pq.push({weight, v});
        }
    }
    return (count == n) ? mst_weight : -1;
}
```

---

## 2. Dijkstra - Đường Đi Ngắn Nhất

### Ẩn dụ: Google Maps

Bạn muốn đi từ A đến B. Có nhiều con đường, mỗi con đường có độ dài khác nhau. Tìm đường ngắn nhất!

### Ý tưởng

Bắt đầu từ đỉnh nguồn. Mỗi bước, chọn đỉnh **chưa thăm** có khoảng cách nhỏ nhất, cập nhật khoảng cách các đỉnh kề.

```cpp
vector<long long> dijkstra(int start, int n, vector<vector<pair<int,int>>>& adj) {
    vector<long long> dist(n + 1, LLONG_MAX);
    priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<>> pq;
    
    dist[start] = 0;
    pq.push({0, start});
    
    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        
        if (d > dist[u]) continue;  // Đã có đường ngắn hơn
        
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}
```

**Độ phức tạp:** O((V + E) log V) với priority_queue.

---

## 3. Sắp Xếp Tô-pô (Topological Sort)

### Ẩn dụ: Môn học tiên quyết

Muốn học "Lập trình" phải học "Tin học cơ bản" trước. Muốn học "Cấu trúc dữ liệu" phải học "Lập trình" trước. Sắp xếp thứ tự học hợp lý!

### Ý tưởng

Sắp xếp các đỉnh của DAG (đồ thị có hướng không chu trình) sao cho mọi cạnh đều đi từ trái sang phải.

```cpp
vector<int> topoSort(int n, vector<vector<int>>& adj) {
    vector<int> inDegree(n + 1, 0);
    for (int u = 1; u <= n; u++)
        for (int v : adj[u])
            inDegree[v]++;
    
    queue<int> q;
    for (int i = 1; i <= n; i++)
        if (inDegree[i] == 0) q.push(i);
    
    vector<int> result;
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        result.push_back(u);
        
        for (int v : adj[u]) {
            inDegree[v]--;
            if (inDegree[v] == 0)
                q.push(v);
        }
    }
    
    if (result.size() != n) return {};  // Có chu trình!
    return result;
}
```

---

## 4. Code Python

```python
import heapq

# ===== Dijkstra =====
def dijkstra(start, n, adj):
    dist = [float('inf')] * (n + 1)
    dist[start] = 0
    pq = [(0, start)]
    
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]: continue
        for v, w in adj[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(pq, (dist[v], v))
    return dist

# ===== Topo Sort =====
from collections import deque
def topo_sort(n, adj):
    in_degree = [0] * (n + 1)
    for u in range(1, n + 1):
        for v in adj[u]:
            in_degree[v] += 1
    
    q = deque([i for i in range(1, n + 1) if in_degree[i] == 0])
    result = []
    
    while q:
        u = q.popleft()
        result.append(u)
        for v in adj[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                q.append(v)
    
    return result if len(result) == n else []
```

---

## 5. Lưu ý

| Thuật toán | Khi nào dùng | Độ phức tạp |
|-----------|---------------|-------------|
| Kruskal | MST, cạnh ít | O(E log E) |
| Prim | MST, cạnh nhiều | O(E log V) |
| Dijkstra | Đường đi ngắn nhất (trọng số ≥ 0) | O(E log V) |
| Bellman-Ford | Đường đi ngắn nhất (có trọng số âm) | O(VE) |
| Floyd-Warshall | Đường đi ngắn nhất mọi cặp | O(V³) |
| Topo Sort | Sắp xếp thứ tự ưu tiên trên DAG | O(V + E) |

### Bẫy hay gặp

- **Dijkstra không dùng được** khi có trọng số âm → dùng Bellman-Ford!
- **Topo Sort** chỉ áp dụng cho DAG (không có chu trình)
- **MST** chỉ áp dụng cho đồ thị **liên thông**

---

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

## Bài viết liên quan

- [Bài 8: DSU](08-heap-dsu-segment-tree-bit.md)
- [Bài 10: BFS & DFS](10-bfs-dfs-do-thi.md)
- [Bài 23: Floyd-Warshall & Bellman-Ford](23-floyd-warshall-bellman-ford.md)

## Tài liệu tham khảo

- [VNOI Wiki - Cây khung nhỏ nhất](https://wiki.vnoi.info/algo/graph-theory/minimum-spanning-tree)
- [VNOI Wiki - Đường đi ngắn nhất](https://wiki.vnoi.info/algo/graph-theory/shortest-path)
- [VNOI Wiki - Sắp xếp Tô-pô](https://wiki.vnoi.info/algo/graph-theory/topological-sort)
- [CP-Algorithms - Prim's Algorithm](https://cp-algorithms.com/graph/mst_prim.html)
- [CP-Algorithms - Kruskal's Algorithm](https://cp-algorithms.com/graph/mst_kruskal.html)
- [CP-Algorithms - Topological Sort](https://cp-algorithms.com/graph/topological-sort.html)
- [GeeksforGeeks - Kruskal's MST](https://www.geeksforgeeks.org/dsa/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/)
- [YouTube - Dijkstra's Algorithm (takeuforward)](https://www.youtube.com/watch?v=V6H1qAeB-l4)

**Bài tiếp theo:** [Hash xâu & Z-algorithm →](14-hash-xau-z-algorithm.md)
