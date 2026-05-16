# C13: queue, stack, deque

> **Tác giả:** FPTOJ Wiki<br>
> **Chủ đề:** queue, priority_queue, stack, deque

---

## Bạn sẽ học được gì?

Sau bài này, bạn có thể:

- Sử dụng `queue` cho BFS
- Sử dụng `priority_queue` cho Dijkstra, Top-K
- Sử dụng `stack` cho DFS, duyệt mảng
- Sử dụng `deque` cho sliding window

---

## 1. queue — Hàng đợi (FIFO)

```cpp
queue<int> q;

q.push(1);   // Thêm vào cuối
q.push(2);
q.push(3);

cout << q.front() << endl;  // 1 (phần tử đầu)
cout << q.back() << endl;   // 3 (phần tử cuối)
cout << q.size() << endl;   // 3

q.pop();  // Xóa phần tử đầu
// q = {2, 3}

if (q.empty()) cout << "Rong" << endl;
```

### Ứng dụng: BFS

```cpp
queue<int> q;
vector<bool> visited(n, false);

q.push(0);
visited[0] = true;

while (!q.empty()) {
    int u = q.front(); q.pop();
    
    for (int v : adj[u]) {
        if (!visited[v]) {
            visited[v] = true;
            q.push(v);
        }
    }
}
```

---

## 2. priority_queue — Hàng đợi ưu tiên (Max-heap)

```cpp
priority_queue<int> pq;  // Max-heap (phần tử lớn nhất ở đỉnh)

pq.push(3);
pq.push(1);
pq.push(4);
pq.push(1);
pq.push(5);

cout << pq.top() << endl;  // 5 (phần tử lớn nhất)
pq.pop();
cout << pq.top() << endl;  // 4
```

### Min-heap

```cpp
// Cách 1: greater<>
priority_queue<int, vector<int>, greater<int>> pq;

// Cách 2: đổi dấu
priority_queue<int> pq;  // push(-x), top() = -pq.top()
```

### priority_queue với pair

```cpp
// Max-heap theo first, nếu bằng thì theo second
priority_queue<pair<int,int>> pq;
pq.push({3, 100});
pq.push({1, 200});
pq.push({3, 300});

auto [val, id] = pq.top();  // {3, 300}
```

### Ứng dụng: Dijkstra

```cpp
// Min-heap: {khoảng cách, đỉnh}
priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
pq.push({0, 0});  // {dist, node}

while (!pq.empty()) {
    auto [d, u] = pq.top(); pq.pop();
    
    if (d > dist[u]) continue;  // Đã tìm đường ngắn hơn
    
    for (auto [v, w] : adj[u]) {
        if (dist[u] + w < dist[v]) {
            dist[v] = dist[u] + w;
            pq.push({dist[v], v});
        }
    }
}
```

---

## 3. stack — Ngăn xếp (LIFO)

```cpp
stack<int> st;

st.push(1);   // Thêm vào đỉnh
st.push(2);
st.push(3);

cout << st.top() << endl;  // 3 (phần tử đỉnh)
cout << st.size() << endl; // 3

st.pop();  // Xóa phần tử đỉnh
// st = {1, 2}
```

### Ứng dụng: Duyệt mảng — Next Greater Element

```cpp
vector<int> a = {4, 5, 2, 25};
vector<int> nge(a.size(), -1);
stack<int> st;

for (int i = 0; i < (int)a.size(); i++) {
    while (!st.empty() && a[st.top()] < a[i]) {
        nge[st.top()] = a[i];
        st.pop();
    }
    st.push(i);
}
// nge = {5, 25, 25, -1}
```

---

## 4. deque — Hàng đợi hai đầu

```cpp
deque<int> dq;

dq.push_back(1);   // Thêm vào cuối
dq.push_back(2);
dq.push_front(0);  // Thêm vào đầu
// dq = {0, 1, 2}

cout << dq.front() << endl;  // 0
cout << dq.back() << endl;   // 2

dq.pop_front();  // Xóa đầu
dq.pop_back();   // Xóa cuối
```

### Ứng dụng: Sliding Window Maximum

```cpp
vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq;  // Lưu chỉ số
    vector<int> result;
    
    for (int i = 0; i < (int)nums.size(); i++) {
        // Xóa phần tử ra khỏi cửa sổ
        while (!dq.empty() && dq.front() <= i - k) {
            dq.pop_front();
        }
        
        // Xóa phần tử nhỏ hơn nums[i] từ cuối
        while (!dq.empty() && nums[dq.back()] < nums[i]) {
            dq.pop_back();
        }
        
        dq.push_back(i);
        
        if (i >= k - 1) {
            result.push_back(nums[dq.front()]);
        }
    }
    
    return result;
}
```

---

## 5. Bảng so sánh

| Cấu trúc | Thêm | Xóa | Lấy phần tử | Ứng dụng |
|----------|------|-----|-------------|----------|
| `queue` | Cuối | Đầu | `front()` | BFS |
| `stack` | Đỉnh | Đỉnh | `top()` | DFS, parenthesis |
| `priority_queue` | Tùy | Đỉnh max/min | `top()` | Dijkstra, Top-K |
| `deque` | Đầu/Cuối | Đầu/Cuối | `front()`/`back()` | Sliding window |

---

## Bài viết liên quan

- [C12: set & map →](C12-set-map.md)
- [C14: algorithm nâng cao →](C14-algorithm-nang-cao.md)

---

**Bài tiếp theo:** [C14: algorithm nâng cao →](C14-algorithm-nang-cao.md)
