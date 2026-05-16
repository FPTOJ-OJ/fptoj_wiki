# C10: Vector nâng cao

> **Tác giả:** FPTOJ Wiki<br>
> **Chủ đề:** Iterator, resize/reserve, 2D vector, adjacency list

---

## Bạn sẽ học được gì?

Sau bài này, bạn có thể:

- Sử dụng iterator để duyệt vector
- Hiểu `resize` vs `reserve`
- Tạo và sử dụng vector 2D
- Xây dựng adjacency list cho đồ thị

---

## 1. Iterator — Con trỏ STL

```cpp
vector<int> a = {10, 20, 30, 40, 50};

// begin() → iterator trỏ đến phần tử đầu
// end() → iterator trỏ đến vị trí SAU phần tử cuối

for (auto it = a.begin(); it != a.end(); ++it) {
    cout << *it << " ";
}
// Output: 10 20 30 40 50
```

### Reverse Iterator

```cpp
vector<int> a = {10, 20, 30, 40, 50};

for (auto it = a.rbegin(); it != a.rend(); ++it) {
    cout << *it << " ";
}
// Output: 50 40 30 20 10
```

### advance, next, prev, distance

```cpp
vector<int> a = {10, 20, 30, 40, 50};

// next: iterator cách k vị trí (không thay đổi gốc)
auto it = next(a.begin(), 2);
cout << *it << endl;  // 30

// prev: iterator lùi k vị trí
auto it2 = prev(a.end(), 1);
cout << *it2 << endl;  // 50

// advance: di chuyển iterator (thay đổi gốc)
auto it3 = a.begin();
advance(it3, 3);
cout << *it3 << endl;  // 40

// distance: khoảng cách giữa 2 iterator
int d = distance(a.begin(), a.end());
cout << d << endl;  // 5
```

---

## 2. resize vs reserve

### resize — Thay đổi kích thước

```cpp
vector<int> a;
a.resize(5);        // a = {0, 0, 0, 0, 0} — 5 phần tử
a.resize(3);        // a = {0, 0, 0} — cắt bớt
a.resize(7, 100);   // a = {0, 0, 0, 100, 100, 100, 100}
```

### reserve — Chỉ cấp phát bộ nhớ

```cpp
vector<int> a;
a.reserve(1000);    // cấp phát bộ nhớ cho 1000 phần tử
// a.size() vẫn = 0, chỉ capacity = 1000

// push_back sẽ không phải cấp phát lại bộ nhớ
for (int i = 0; i < 1000; i++) {
    a.push_back(i);  // Nhanh hơn vì không phải cấp phát lại
}
```

!!! tip "Khi nào dùng reserve?"
    Dùng `reserve` khi biết trước số phần tử sẽ thêm → tránh cấp phát lại nhiều lần → **nhanh hơn**.

---

## 3. Vector 2D

```cpp
// Tạo ma trận n x m, giá trị 0
int n = 3, m = 4;
vector<vector<int>> a(n, vector<int>(m, 0));

// Truy cập
a[1][2] = 5;

// Duyệt
for (int i = 0; i < n; i++) {
    for (int j = 0; j < m; j++) {
        cout << a[i][j] << " ";
    }
    cout << endl;
}
```

---

## 4. Biểu diễn đồ thị (Graph Representation)

### 4.1. Ma trận kề (Adjacency Matrix)

```cpp
// Phù hợp: Đồ thị nhỏ (n <= 1000)
int n, m;
cin >> n >> m;

vector<vector<int>> adj(n + 1, vector<int>(n + 1, 0));

for (int i = 0; i < m; i++) {
    int u, v;
    cin >> u >> v;
    adj[u][v] = 1;  // Đồ thị có hướng
    // adj[v][u] = 1;  // Đồ thị vô hướng
}

// Kiểm tra cạnh u-v tồn tại: O(1)
if (adj[u][v]) { ... }

// Duyệt đỉnh kề của u: O(n)
for (int v = 1; v <= n; v++) {
    if (adj[u][v]) { ... }
}
```

### 4.2. Danh sách kề (Adjacency List) — Phổ biến nhất

```cpp
// Phù hợp: Đồ thị lớn (n <= 10^5, m <= 2*10^5)
int n, m;
cin >> n >> m;

vector<vector<int>> adj(n + 1);  // 1-indexed

for (int i = 0; i < m; i++) {
    int u, v;
    cin >> u >> v;
    adj[u].push_back(v);
    adj[v].push_back(u);  // Bỏ dòng này nếu đồ thị có hướng
}

// Duyệt đỉnh kề của u: O(degree(u))
for (int v : adj[u]) {
    cout << v << " ";
}
```

### 4.3. Danh sách kề có trọng số

```cpp
int n, m;
cin >> n >> m;

vector<vector<pair<int,int>>> adj(n + 1);  // {đỉnh, trọng số}

for (int i = 0; i < m; i++) {
    int u, v, w;
    cin >> u >> v >> w;
    adj[u].push_back({v, w});
    adj[v].push_back({u, w});  // Bỏ nếu có hướng
}

// Duyệt
for (auto [v, w] : adj[u]) {
    cout << "Dinh " << v << ", trong so " << w << endl;
}
```

### 4.4. Mảng cạnh (Edge List)

```cpp
// Phù hợp: Kruskal, Bellman-Ford
int n, m;
cin >> n >> m;

struct Edge {
    int u, v, w;
};

vector<Edge> edges;

for (int i = 0; i < m; i++) {
    int u, v, w;
    cin >> u >> v >> w;
    edges.push_back({u, v, w});
}

// Sắp xếp theo trọng số (dùng cho Kruskal)
sort(edges.begin(), edges.end(), [](const Edge &a, const Edge &b) {
    return a.w < b.w;
});
```

### 4.5. So sánh các cách biểu diễn

| | Ma trận kề | Danh sách kề | Mảng cạnh |
|---|-----------|---------------|-----------|
| **Kích thước** | $O(n^2)$ | $O(n + m)$ | $O(m)$ |
| **Kiểm tra cạnh** | $O(1)$ | $O(\text{degree})$ | $O(m)$ |
| **Duyệt kề** | $O(n)$ | $O(\text{degree})$ | $O(m)$ |
| **Thêm cạnh** | $O(1)$ | $O(1)$ | $O(1)$ |
| **Dùng khi** | $n \leq 1000$ | $n \leq 10^5$ | Kruskal, Bellman |

!!! tip "Chọn cách nào?"
    - **Không biết chọn gì** → dùng **Danh sách kề** (`vector<vector<int>>`)
    - Đồ thị **nhỏ** ($n \leq 1000$) → Ma trận kề
    - Cần **sắp xếp cạnh** → Mảng cạnh

### 4.6. Template đọc đồ thị

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n, m;
    cin >> n >> m;
    
    // Danh sách kề
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    
    // BFS từ đỉnh 1
    vector<int> dist(n + 1, -1);
    queue<int> q;
    dist[1] = 0;
    q.push(1);
    
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    
    for (int i = 1; i <= n; i++) {
        cout << dist[i] << " ";
    }
    cout << endl;
    
    return 0;
}
```

---

## 5. Các thao tác khác

```cpp
vector<int> a = {1, 2, 3, 4, 5};

// assign — Gán lại toàn bộ
a.assign(3, 10);  // a = {10, 10, 10}

// swap — Hoán đổi 2 vector
vector<int> b = {6, 7, 8};
swap(a, b);  // a = {6, 7, 8}, b = {10, 10, 10}

// shrink_to_fit — Giải phóng bộ nhớ thừa
vector<int> c;
c.reserve(1000);
c.push_back(1);
c.shrink_to_fit();  // capacity = 1
```

---

## Bài viết liên quan

- [C09: pair & tuple →](C09-pair-tuple.md)
- [C11: sort & algorithm →](C11-sort-algorithm.md)

---

**Bài tiếp theo:** [C11: sort & algorithm →](C11-sort-algorithm.md)
