# Bài 10: BFS & DFS - Duyệt Đồ Thị!

> **Tác giả:** Hà Trí Kiên
> **Nội dung tham khảo từ:** VNOI Wiki - BFS, Cây DFS và ứng dụng

## 1. Đồ thị là gì?

### Ẩn dụ: Bản đồ đường phố

Thành phố có N ngã tư (đỉnh), M con đường (cạnh) nối các ngã tư. Muốn đi từ A đến B → cần thuật toán tìm đường!

**Đồ thị** = tập đỉnh + tập cạnh nối giữa các đỉnh.

### Biểu diễn đồ thị

```cpp
// Danh sách kề (phổ biến nhất)
vector<int> adj[MAXN];
adj[1].push_back(2);  // đỉnh 1 nối với đỉnh 2
adj[2].push_back(1);  // đồ thị vô hướng → thêm cả chiều ngược
```

### Code Python

```python
from collections import defaultdict

# Danh sách kề (phổ biến nhất)
adj = defaultdict(list)
adj[1].append(2)  # đỉnh 1 nối với đỉnh 2
adj[2].append(1)  # đồ thị vô hướng → thêm cả chiều ngược
```

---

## 2. BFS - Duyệt theo chiều rộng

### Ẩn dụ: Sóng nước lan rộng

Thả hòn đá xuống hồ → sóng lan đồng đều. BFS cũng vậy: duyệt đỉnh cách 1 bước trước, rồi 2 bước, 3 bước...

### Code C++

```cpp
vector<int> adj[MAXN];
bool visited[MAXN];
int dist[MAXN];
int parent[MAXN];  // Truy vết đường đi

void bfs(int start) {
    queue<int> q;
    q.push(start);
    visited[start] = true;
    dist[start] = 0;
    parent[start] = -1;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                dist[v] = dist[u] + 1;
                parent[v] = u;  // Lưu vết
                q.push(v);
            }
        }
    }
}

// Truy vết đường đi từ start → target
vector<int> getPath(int target) {
    vector<int> path;
    for (int v = target; v != -1; v = parent[v])
        path.push_back(v);
    reverse(path.begin(), path.end());
    return path;
}
```

### Code Python: BFS

```python
from collections import deque

def bfs(adj, start):
    n = len(adj)
    visited = [False] * n
    dist = [-1] * n
    parent = [-1] * n

    q = deque([start])
    visited[start] = True
    dist[start] = 0

    while q:
        u = q.popleft()
        for v in adj[u]:
            if not visited[v]:
                visited[v] = True
                dist[v] = dist[u] + 1
                parent[v] = u
                q.append(v)
    return dist, parent

def get_path(parent, target):
    path = []
    v = target
    while v != -1:
        path.append(v)
        v = parent[v]
    path.reverse()
    return path
```

### Ứng dụng: Tìm đường ngắn nhất trong lưới

```cpp
int dx[] = {-1, 1, 0, 0};
int dy[] = {0, 0, -1, 1};

int bfsGrid(vector<vector<int>>& grid, int sx, int sy, int ex, int ey) {
    int n = grid.size(), m = grid[0].size();
    queue<pair<int,int>> q;
    vector<vector<int>> dist(n, vector<int>(m, -1));
    
    q.push({sx, sy});
    dist[sx][sy] = 0;
    
    while (!q.empty()) {
        auto [x, y] = q.front();
        q.pop();
        
        if (x == ex && y == ey) return dist[x][y];
        
        for (int d = 0; d < 4; d++) {
            int nx = x + dx[d], ny = y + dy[d];
            if (nx >= 0 && nx < n && ny >= 0 && ny < m 
                && grid[nx][ny] != 1 && dist[nx][ny] == -1) {
                dist[nx][ny] = dist[x][y] + 1;
                q.push({nx, ny});
            }
        }
    }
    return -1;
}
```

### Code Python: BFS trên lưới

```python
from collections import deque

def bfs_grid(grid, sx, sy, ex, ey):
    n, m = len(grid), len(grid[0])
    dx = [-1, 1, 0, 0]
    dy = [0, 0, -1, 1]
    dist = [[-1] * m for _ in range(n)]
    q = deque([(sx, sy)])
    dist[sx][sy] = 0

    while q:
        x, y = q.popleft()
        if x == ex and y == ey:
            return dist[x][y]
        for d in range(4):
            nx, ny = x + dx[d], y + dy[d]
            if 0 <= nx < n and 0 <= ny < m and grid[nx][ny] != 1 and dist[nx][ny] == -1:
                dist[nx][ny] = dist[x][y] + 1
                q.append((nx, ny))
    return -1
```

---

## 3. DFS - Duyệt theo chiều sâu

### Ẩn dụ: Khám phá hang động

Tại mỗi ngã rẽ, chọn 1 đường đi sâu hết mức. Đến đường cụt → quay lui → thử đường khác.

### Code C++

```cpp
vector<int> adj[MAXN];
bool visited[MAXN];

// Cách 1: Đệ quy (đơn giản)
void dfs(int u) {
    visited[u] = true;
    for (int v : adj[u])
        if (!visited[v])
            dfs(v);
}

// Cách 2: Stack (không đệ quy)
void dfsIterative(int start) {
    stack<int> st;
    st.push(start);
    while (!st.empty()) {
        int u = st.top();
        st.pop();
        if (visited[u]) continue;
        visited[u] = true;
        for (int v : adj[u])
            if (!visited[v])
                st.push(v);
    }
}
```

### Code Python: DFS

```python
# Cách 1: Đệ quy (đơn giản)
def dfs(adj, u, visited):
    visited[u] = True
    for v in adj[u]:
        if not visited[v]:
            dfs(adj, v, visited)

# Cách 2: Stack (không đệ quy)
def dfs_iterative(adj, start):
    n = len(adj)
    visited = [False] * n
    stack = [start]
    while stack:
        u = stack.pop()
        if visited[u]:
            continue
        visited[u] = True
        for v in adj[u]:
            if not visited[v]:
                stack.append(v)
```

### Ứng dụng: Đếm thành phần liên thông

```cpp
int countComponents(int n) {
    int count = 0;
    for (int i = 1; i <= n; i++) {
        if (!visited[i]) {
            dfs(i);
            count++;
        }
    }
    return count;
}
```

### Code Python: Đếm thành phần liên thông

```python
def count_components(n, adj):
    visited = [False] * n
    count = 0
    for i in range(n):
        if not visited[i]:
            dfs(adj, i, visited)
            count += 1
    return count
```

### Code Python

```python
from collections import deque

# ===== BFS =====
def bfs(adj, start):
    n = len(adj)
    visited = [False] * n
    dist = [-1] * n
    parent = [-1] * n
    
    q = deque([start])
    visited[start] = True
    dist[start] = 0
    
    while q:
        u = q.popleft()
        for v in adj[u]:
            if not visited[v]:
                visited[v] = True
                dist[v] = dist[u] + 1
                parent[v] = u
                q.append(v)
    return dist, parent

# ===== DFS (đệ quy) =====
def dfs(adj, u, visited):
    visited[u] = True
    for v in adj[u]:
        if not visited[v]:
            dfs(adj, v, visited)

# ===== DFS (stack - không đệ quy) =====
def dfs_iterative(adj, start):
    n = len(adj)
    visited = [False] * n
    stack = [start]
    while stack:
        u = stack.pop()
        if visited[u]: continue
        visited[u] = True
        for v in adj[u]:
            if not visited[v]:
                stack.append(v)

# ===== Đếm thành phần liên thông =====
def count_components(n, adj):
    visited = [False] * n
    count = 0
    for i in range(n):
        if not visited[i]:
            dfs(adj, i, visited)
            count += 1
    return count

# ===== BFS trên lưới (tìm đường ngắn nhất) =====
def bfs_grid(grid, sx, sy, ex, ey):
    n, m = len(grid), len(grid[0])
    dx = [-1, 1, 0, 0]
    dy = [0, 0, -1, 1]
    dist = [[-1] * m for _ in range(n)]
    q = deque([(sx, sy)])
    dist[sx][sy] = 0
    
    while q:
        x, y = q.popleft()
        if x == ex and y == ey:
            return dist[x][y]
        for d in range(4):
            nx, ny = x + dx[d], y + dy[d]
            if 0 <= nx < n and 0 <= ny < m and grid[nx][ny] != 1 and dist[nx][ny] == -1:
                dist[nx][ny] = dist[x][y] + 1
                q.append((nx, ny))
    return -1  # Không tìm thấy đường
```

---

## 4. So sánh BFS vs DFS

| | BFS | DFS |
|--|-----|-----|
| Cấu trúc | **Queue** | **Stack** / Đệ quy |
| Thứ tự | Lan rộng theo "tầng" | Đi sâu rồi quay lui |
| Đường ngắn nhất | **Có** (không trọng số) | Không đảm bảo |
| Bộ nhớ | O(V) (hàng đợi) | O(V) (đệ quy stack) |
| Ứng dụng | Đường ngắn nhất, kiểm tra 2 phía | Thành phần liên thông, chu trình |

---

## 5. Bài tập luyện tập

| Bài | Nền tảng | Độ khó |
|-----|----------|--------|
| [CSES - Building Roads](https://cses.fi/problemset/task/1666) | CSES | ⭐ |
| [CSES - Message Route](https://cses.fi/problemset/task/1667) | CSES | ⭐⭐ |
| [CSES - Labyrinth](https://cses.fi/problemset/task/1193) | CSES | ⭐⭐ |
| [CF - Shortest Path with Obstacles](https://codeforces.com/) | CF | ⭐⭐⭐ |
| [VNOJ - NKCELL](https://oj.vnoi.info/problem/nkcell) | VNOJ | ⭐⭐ |
| [VNOJ - VBGRASS](https://oj.vnoi.info/problem/vbgrass) | VNOJ | ⭐⭐ |
| [VNOJ - NKNUMFIND](https://oj.vnoi.info/problem/nknumfind) | VNOJ | ⭐⭐ |

## Tài liệu tham khảo

- [CP-Algorithms - BFS](https://cp-algorithms.com/graph/breadth-first-search.html)
- [CP-Algorithms - DFS](https://cp-algorithms.com/graph/depth-first-search.html)
- [VNOI Wiki - BFS](https://wiki.vnoi.info/algo/graph-theory/breadth-first-search)
- [VNOI Wiki - Cây DFS và ứng dụng](https://wiki.vnoi.info/algo/graph-theory/Depth-First-Search-Tree)
- [USACO Guide - Graph Traversal](https://usaco.guide/silver/graph-traversal)
- [GeeksforGeeks - BFS & DFS](https://www.geeksforgeeks.org/dsa/breadth-first-search-or-bfs-for-a-graph/)
