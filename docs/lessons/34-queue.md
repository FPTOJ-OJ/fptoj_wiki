# Bài 34: Queue - Hàng Đợi

> **Tác giả:** Hà Trí Kiên<br>
> **Nội dung tham khảo từ:** GeeksforGeeks - Queue, VNOI Wiki

## 1. Chuyện gì đang xảy ra?

### Bài toán: Hàng người xếp hàng

Bạn đến quầy bán vé. Ai đến trước → phục vụ trước! Không được chen ngang!

**Queue** = Hàng đợi: **FIFO** — First In, First Out (Vào trước, ra trước).

### So sánh: Stack vs Queue

| | Stack (Ngăn xếp) | Queue (Hàng đợi) |
|--|------------------|-----------------|
| Nguyên tắc | LIFO: Vào sau, ra trước | FIFO: Vào trước, ra trước |
| Thêm | push vào đỉnh | push vào cuối |
| Lấy | pop từ đỉnh | pop từ đầu |
| Ví dụ | Chồng dĩa | Hàng người xếp hàng |
| Duyệt một đầu | Cả hai đầu đều dùng | Mỗi đầu một việc |

### Các thao tác cơ bản

| Thao tác | Ý nghĩa | Độ phức tạp |
|----------|----------|-------------|
| `push(x)` | Thêm x vào cuối hàng | O(1) |
| `pop()` | Loại bỏ phần tử đầu hàng | O(1) |
| `front()` | Xem phần tử đầu hàng | O(1) |
| `back()` | Xem phần tử cuối hàng | O(1) |
| `empty()` | Kiểm tra hàng rỗng | O(1) |
| `size()` | Số phần tử trong hàng | O(1) |

!!! info "Tại sao tất cả đều O(1)?"
    Queue thường được cài bằng **linked list** hoặc **mảng vòng** (circular array). Cả hai cách đều chỉ cần cập nhật con trỏ đầu/cuối → O(1). Không cần dời phần tử như mảng thường.

---

## 2. Code C++ — Dùng thư viện

=== "C++"

    ```cpp
    #include <iostream>
    #include <queue>
    using namespace std;
    
    int main() {
        // Tạo queue rỗng
        queue<int> q;
        
        // Thêm phần tử vào cuối hàng
        q.push(1);    // [1]
        q.push(2);    // [1, 2]
        q.push(3);    // [1, 2, 3]
        
        // Xem phần tử đầu và cuối
        cout << q.front();  // 1 (phần tử đầu — người đến trước)
        cout << q.back();   // 3 (phần tử cuối — người đến sau)
        
        // Loại bỏ phần tử đầu
        q.pop();      // [2, 3] — loại 1
        cout << q.front();  // 2
        
        // Kiểm tra kích thước và trạng thái
        cout << q.size();   // 2
        cout << q.empty();  // 0 (false — queue vẫn còn phần tử)
    }
    ```

=== "Python"

    ```python
    from collections import deque
    
    # Tạo queue rỗng (dùng deque, KHÔNG dùng list)
    q = deque()
    
    # Thêm phần tử vào cuối hàng
    q.append(1)     # [1]
    q.append(2)     # [1, 2]
    q.append(3)     # [1, 2, 3]
    
    # Xem phần tử đầu và cuối
    print(q[0])     # 1 (phần tử đầu)
    print(q[-1])    # 3 (phần tử cuối)
    
    # Loại bỏ phần tử đầu
    q.popleft()     # [2, 3] — loại 1
    print(q[0])     # 2
    
    # Kiểm tra kích thước
    print(len(q))   # 2
    
    # Kiểm tra rỗng
    if not q:
        print("Queue rỗng!")
    ```

!!! tip "Lưu ý Python"
    Dùng `collections.deque` thay vì `list` cho queue! `list.pop(0)` là O(N) vì phải dời toàn bộ mảng, còn `deque.popleft()` là O(1).

### Các hàm tiện ích khác (C++)

```cpp
// Hoán đổi 2 queue
queue<int> q1, q2;
q1.swap(q2);  // O(1)

// Duyệt queue (ít dùng, chủ yếu để debug)
while (!q.empty()) {
    cout << q.front() << " ";
    q.pop();
}
```

---

## 3. Cài đặt Queue thủ công

### 3.1. Dùng mảng vòng (Circular Array)

**Vấn đề:** Dùng mảng thường, mỗi lần pop phải dời toàn bộ → O(N).

**Giải pháp:** Dùng mảng **vòng** (circular) với 2 con trỏ `front` và `rear`.

```
Mảng vòng kích thước 5:

push(1): front=0, rear=0  → [1, _, _, _, _]
push(2): front=0, rear=1  → [1, 2, _, _, _]
push(3): front=0, rear=2  → [1, 2, 3, _, _]
pop():   front=1, rear=2  → [_, 2, 3, _, _]   → trả về 1
push(4): front=1, rear=3  → [_, 2, 3, 4, _]
push(5): front=1, rear=4  → [_, 2, 3, 4, 5]
push(6): front=1, rear=0  → [6, 2, 3, 4, 5]   ← quay vòng!
```

### Code C++ — Circular Array Queue

```cpp
const int MAXN = 100005;

struct Queue {
    int arr[MAXN];          // Mảng lưu dữ liệu
    int front_idx = 0;      // Chỉ số phần tử đầu
    int rear_idx = -1;      // Chỉ số phần tử cuối
    int cnt = 0;            // Số phần tử hiện tại
    
    // Thêm phần tử vào cuối — O(1)
    void push(int val) {
        if (cnt >= MAXN) {
            cerr << "Queue full!\n";
            return;
        }
        // rear quay vòng: (rear + 1) % MAXN
        rear_idx = (rear_idx + 1) % MAXN;
        arr[rear_idx] = val;
        cnt++;
    }
    
    // Loại bỏ phần tử đầu — O(1)
    int pop() {
        if (cnt == 0) {
            cerr << "Queue empty!\n";
            return -1;
        }
        int val = arr[front_idx];
        // front quay vòng: (front + 1) % MAXN
        front_idx = (front_idx + 1) % MAXN;
        cnt--;
        return val;
    }
    
    // Xem phần tử đầu — O(1)
    int front() {
        if (cnt == 0) { cerr << "Queue empty!\n"; return -1; }
        return arr[front_idx];
    }
    
    int size() { return cnt; }
    bool empty() { return cnt == 0; }
};
```

### 3.2. Dùng Linked List

```cpp
struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

struct QueueLL {
    Node* head = nullptr;  // Đầu hàng (phần tử ra trước)
    Node* tail = nullptr;  // Cuối hàng (phần tử vào sau)
    int cnt = 0;
    
    // Thêm vào cuối — O(1)
    void push(int val) {
        Node* newNode = new Node(val);
        if (!tail) {
            head = tail = newNode;
        } else {
            tail->next = newNode;
            tail = newNode;
        }
        cnt++;
    }
    
    // Loại bỏ đầu — O(1)
    int pop() {
        if (!head) { cerr << "Queue empty!\n"; return -1; }
        int val = head->data;
        Node* temp = head;
        head = head->next;
        if (!head) tail = nullptr;  // Queue rỗng
        delete temp;
        cnt--;
        return val;
    }
    
    int front() { return head ? head->data : -1; }
    int size() { return cnt; }
    bool empty() { return cnt == 0; }
};
```

!!! info "So sánh 2 cách cài đặt"
    | | Circular Array | Linked List |
    |--|----------------|-------------|
    | Bộ nhớ | Cấp phát tĩnh, nhanh | Cấp phát động, linh hoạt |
    | Cache | Tốt (bộ nhớ liền kề) | Kém (nhảy lung tung) |
    | Cài đặt | Phải biết kích thước trước | Không cần |
    | Trong thi đấu | Dùng `std::queue` hoặc `deque` | Dùng `std::queue` |

---

## 4. BFS — Ứng dụng quan trọng nhất của Queue

### BFS (Breadth-First Search) — Duyệt theo tầng

BFS duyệt đồ thị **theo tầng**, dùng queue để quản lý các đỉnh đang chờ duyệt.

```
Đồ thị:    1 — 2 — 5
           |   |
           3 — 4

BFS từ đỉnh 1:
  Queue: [1]           → thăm 1, thêm 2, 3
  Queue: [2, 3]        → thăm 2, thêm 4, 5
  Queue: [3, 4, 5]     → thăm 3 (4 đã thêm)
  Queue: [4, 5]        → thăm 4
  Queue: [5]           → thăm 5
  Queue: []            → xong!

Thứ tự: 1 → 2 → 3 → 4 → 5
```

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    
    const int MAXN = 100005;
    vector<int> adj[MAXN];  // Danh sách kề
    bool visited[MAXN];      // Đánh dấu đỉnh đã thăm
    int dist[MAXN];          // Khoảng cách từ đỉnh bắt đầu
    
    void bfs(int start) {
        queue<int> q;
        q.push(start);
        visited[start] = true;
        dist[start] = 0;
        
        while (!q.empty()) {
            int v = q.front(); q.pop();
            cout << v << " ";  // Xử lý đỉnh v
            
            // Duyệt tất cả đỉnh kề của v
            for (int u : adj[v]) {
                if (!visited[u]) {
                    visited[u] = true;  // Đánh dấu TRƯỚC khi push
                    dist[u] = dist[v] + 1;
                    q.push(u);
                }
            }
        }
    }
    ```

=== "Python"

    ```python
    from collections import deque
    
    def bfs(start, adj, n):
        visited = [False] * (n + 1)
        dist = [0] * (n + 1)
        
        visited[start] = True
        dist[start] = 0
        q = deque([start])
        
        while q:
            v = q.popleft()
            print(v, end=" ")  # Xử lý đỉnh v
            
            # Duyệt tất cả đỉnh kề của v
            for u in adj[v]:
                if not visited[u]:
                    visited[u] = True   # Đánh dấu TRƯỚC khi push
                    dist[u] = dist[v] + 1
                    q.append(u)
        
        return dist  # Trả về mảng khoảng cách
    ```

### Tại sao BFS tìm được đường đi ngắn nhất?

Trong đồ thị **không trọng số**, BFS luôn thăm đỉnh theo thứ tự khoảng cách tăng dần. Khi một đỉnh được thăm lần đầu, đó chính là đường đi ngắn nhất đến đỉnh đó.

```
Đồ thị:    A — B — D
           |       |
           C ———— E

BFS từ A:
  Tầng 0: [A]          dist=0
  Tầng 1: [B, C]        dist=1
  Tầng 2: [D, E]        dist=2

→ dist[D] = 2 = đường đi ngắn nhất A→B→D hoặc A→C→E→D
```

---

## 5. Các ứng dụng khác của Queue

### 5.1. Level-order Traversal — Duyệt cây theo tầng

Dùng BFS trên cây: thăm từng tầng từ trái sang phải.

```
Cây:        1
           / \
          2   3
         / \   \
        4   5   6

Level-order: 1 → 2 → 3 → 4 → 5 → 6
```

=== "C++"

    ```cpp
    struct TreeNode {
        int val;
        TreeNode *left, *right;
        TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    };
    
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> result;
        if (!root) return result;
        
        queue<TreeNode*> q;
        q.push(root);
        
        while (!q.empty()) {
            int levelSize = q.size();  // Số node ở tầng hiện tại
            vector<int> currentLevel;
            
            // Xử lý tất cả node ở tầng hiện tại
            for (int i = 0; i < levelSize; i++) {
                TreeNode* node = q.front(); q.pop();
                currentLevel.push_back(node->val);
                
                // Thêm con trái và con phải vào queue
                if (node->left)  q.push(node->left);
                if (node->right) q.push(node->right);
            }
            
            result.push_back(currentLevel);
        }
        return result;
    }
    ```

=== "Python"

    ```python
    from collections import deque
    
    def level_order(root):
        """Duyệt cây theo tầng, trả về list các tầng."""
        if not root:
            return []
        
        result = []
        q = deque([root])
        
        while q:
            level_size = len(q)  # Số node ở tầng hiện tại
            current_level = []
            
            # Xử lý tất cả node ở tầng hiện tại
            for _ in range(level_size):
                node = q.popleft()
                current_level.append(node.val)
                
                # Thêm con trái và con phải vào queue
                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)
            
            result.append(current_level)
        
        return result
    ```

### 5.2. Multi-source BFS — BFS từ nhiều nguồn

Bắt đầu BFS từ **nhiều đỉnh cùng lúc**. Hữu ích khi cần tìm khoảng cách gần nhất đến bất kỳ đỉnh nguồn nào.

**Ví dụ:** Tìm ô trống gần nhất trên lưới.

```
Lưới (S = tường, . = trống, 0 = nguồn):
  . . S . .
  . 0 . . .
  . . . 0 .
  S . . . .
  . . S . .

BFS từ cả hai ô 0 cùng lúc → tìm ô nào gần 0 nhất.
```

=== "C++"

    ```cpp
    // Multi-source BFS: tất cả đỉnh nguồn vào queue cùng lúc
    void multiSourceBFS(vector<int>& sources) {
        queue<int> q;
        
        // Đưa tất cả đỉnh nguồn vào queue
        for (int s : sources) {
            visited[s] = true;
            dist[s] = 0;
            q.push(s);
        }
        
        while (!q.empty()) {
            int v = q.front(); q.pop();
            for (int u : adj[v]) {
                if (!visited[u]) {
                    visited[u] = true;
                    dist[u] = dist[v] + 1;
                    q.push(u);
                }
            }
        }
    }
    ```

=== "Python"

    ```python
    def multi_source_bfs(sources, adj, n):
        """BFS từ nhiều đỉnh nguồn cùng lúc."""
        visited = [False] * (n + 1)
        dist = [0] * (n + 1)
        q = deque()
        
        # Đưa tất cả đỉnh nguồn vào queue
        for s in sources:
            visited[s] = True
            dist[s] = 0
            q.append(s)
        
        while q:
            v = q.popleft()
            for u in adj[v]:
                if not visited[u]:
                    visited[u] = True
                    dist[u] = dist[v] + 1
                    q.append(u)
        
        return dist
    ```

### 5.3. Task Scheduling — Mô phỏng tiến trình

Mô phỏng Round-Robin scheduling: mỗi tiến trình được chạy một quantum thời gian, hết quantum thì đưa về cuối hàng đợi.

```python
from collections import deque

def round_robin(tasks, quantum):
    """
    tasks: list of (name, remaining_time)
    quantum: thời gian tối đa mỗi lần chạy
    """
    q = deque(tasks)
    time = 0
    
    while q:
        name, remaining = q.popleft()
        
        if remaining <= quantum:
            # Tiến trình hoàn thành
            time += remaining
            print(f"{name} hoàn thành tại t={time}")
        else:
            # Hết quantum, đưa về cuối hàng
            time += quantum
            remaining -= quantum
            q.append((name, remaining))
            print(f"{name} chạy {quantum} đơn vị, còn {remaining}")

# Ví dụ
tasks = [("P1", 10), ("P2", 4), ("P3", 7)]
round_robin(tasks, quantum=3)
# P1 chạy 3 đơn vị, còn 7
# P2 chạy 3 đơn vị, còn 1
# P3 chạy 3 đơn vị, còn 4
# P1 chạy 3 đơn vị, còn 4
# P2 hoàn thành tại t=10
# ...
```

### 5.4. Sliding Window Maximum/Minimum (dùng Deque)

Tìm max/min trong cửa sổ kích thước K trượt qua mảng. Xem chi tiết tại [Bài 15: Deque & Sliding Window](15-deque-sliding-window.md).

```python
from collections import deque

def sliding_window_max(arr, k):
    """Tìm max trong mỗi cửa sổ kích thước k."""
    dq = deque()  # Lưu CHỈ SỐ, giữ thứ tự giảm dần
    result = []
    
    for i in range(len(arr)):
        # Loại phần tử nhỏ hơn arr[i] khỏi cuối
        while dq and arr[dq[-1]] <= arr[i]:
            dq.pop()
        dq.append(i)
        
        # Loại phần tử ra khỏi cửa sổ
        if dq[0] <= i - k:
            dq.popleft()
        
        # Ghi kết quả khi cửa sổ đủ lớn
        if i >= k - 1:
            result.append(arr[dq[0]])
    
    return result

# Ví dụ
arr = [1, 3, -1, -3, 5, 3, 6, 7]
print(sliding_window_max(arr, 3))  # [3, 3, 5, 5, 6, 7]
```

---

## 6. Các biến thể của Queue

### 6.1. Deque (Double-Ended Queue)

Thêm/xóa được ở **cả đầu lẫn cuối** — đã học ở [Bài 15: Deque & Sliding Window](15-deque-sliding-window.md).

### 6.2. Priority Queue (Hàng đợi ưu tiên)

Phần tử ưu tiên nhất ra trước — đã học ở [Bài 8a: Heap](08a-heap.md).

### 6.3. Monotonic Queue (Hàng đợi đơn điệu)

Queue luôn giữ thứ tự tăng/giảm dần — đã học ở Bài 15.

### 6.4. 0-1 BFS

Biến thể của BFS cho đồ thị có trọng số **chỉ 0 hoặc 1**. Dùng deque thay vì queue:
- Cạnh trọng số 0: thêm vào **đầu** deque
- Cạnh trọng số 1: thêm vào **cuối** deque

```cpp
// 0-1 BFS: O(V + E) thay vì O(E log V) như Dijkstra
deque<int> dq;
dist[start] = 0;
dq.push_front(start);

while (!dq.empty()) {
    int v = dq.front(); dq.pop_front();
    for (auto [u, w] : adj[v]) {  // w = 0 hoặc 1
        if (dist[v] + w < dist[u]) {
            dist[u] = dist[v] + w;
            if (w == 0) dq.push_front(u);
            else        dq.push_back(u);
        }
    }
}
```

---

## 7. Ứng dụng thực tế của Queue

| Ứng dụng | Mô tả | Ví dụ thi đấu |
|----------|-------|---------------|
| BFS | Duyệt đồ thị theo tầng, tìm đường ngắn nhất | CSES Message Route, Labyrinth |
| Multi-source BFS | BFS từ nhiều nguồn, tìm khoảng cách gần nhất | CSES Rotting Oranges, CF Monsters |
| Level-order traversal | Duyệt cây theo tầng | LeetCode Binary Tree Level Order |
| Task scheduling | Mô phỏng Round-Robin | OS scheduling, simulation problems |
| Sliding Window | Tìm max/min trong cửa sổ trượt | CSES Sliding Window Maximum |
| Topological Sort (Kahn) | Sắp xếp topo bằng BFS | CSES Course Schedule |
| Flood Fill | Tô màu, đếm vùng liên thông | LeetCode Number of Islands |

---

## 8. Lưu ý & Cạm bẫy

### 8.1. Truy cập khi queue rỗng

=== "C++"

    ```cpp
    // SAI: front() khi queue rỗng → undefined behavior / crash!
    cout << q.front();
    
    // ĐÚNG: Luôn kiểm tra trước
    if (!q.empty()) cout << q.front();
    ```

=== "Python"

    ```python
    # SAI: popleft() khi deque rỗng → IndexError!
    q.popleft()
    
    # ĐÚNG: Kiểm tra trước
    if q:
        val = q.popleft()
    ```

### 8.2. Dùng list thay vì deque (Python)

```python
# SAI: list.pop(0) là O(N) — phải dời toàn bộ mảng!
q = []
q.append(1)
q.pop(0)  # O(N)!

# ĐÚNG: Dùng deque.popleft() — O(1)
from collections import deque
q = deque()
q.append(1)
q.popleft()  # O(1)
```

### 8.3. BFS quên visited

```cpp
// SAI: Không đánh dấu visited → duyệt lại nhiều lần → TLE hoặc sai kết quả!
q.push(start);

// ĐÚNG: Luôn đánh visited TRƯỚC KHI push vào queue
visited[start] = true;
q.push(start);
```

!!! warning "Lưu ý quan trọng"
    Phải đánh dấu `visited` khi **push** (thêm vào queue), KHÔNG phải khi **pop** (lấy ra). Nếu đánh dấu khi pop, cùng một đỉnh có thể được thêm vào queue nhiều lần → TLE.

### 8.4. Queue không hỗ trợ duyệt ngược

```cpp
// SAI: Không có cách duyệt trực tiếp trên queue
for (auto x : q) {}  // Không compile được!

// Nếu cần duyệt: dùng deque hoặc copy ra
deque<int> dq;  // deque hỗ trợ duyệt
```

### 8.5. Integer overflow trong BFS khoảng cách

```cpp
// SAI: dist có thể overflow nếu không khởi tạo đúng
int dist[MAXN];  // Giá trị rác!

// ĐÚNG: Khởi tạo bằng -1 hoặc INF
int dist[MAXN];
memset(dist, -1, sizeof(dist));
// Hoặc
fill(dist, dist + MAXN, INT_MAX);
```

---

## 9. Bài tập luyện tập

### Cơ bản (Làm quen với Queue)

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Message Route](https://cses.fi/problemset/task/1667) | CSES | ⭐⭐ | BFS tìm đường ngắn nhất |
| [CSES - Labyrinth](https://cses.fi/problemset/task/1193) | CSES | ⭐⭐ | BFS trên lưới 2D |
| [VNOJ - Gặm cỏ (VMUNCH)](https://oj.vnoi.info/problem/vmunch) | VNOJ | ⭐⭐ | BFS trên lưới cơ bản |
| [CF - Queue at the School](https://codeforces.com/problemset/problem/266/B) | CF | ⭐ | Mô phỏng queue đơn giản |

### Trung bình (BFS + Ứng dụng)

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Building Roads](https://cses.fi/problemset/task/1666) | CSES | ⭐⭐ | BFS tìm thành phần liên thông |
| [CSES - Monsters](https://cses.fi/problemset/task/1194) | CSES | ⭐⭐⭐ | Multi-source BFS |
| [CF - Valid BFS?](https://codeforces.com/problemset/problem/1037/D) | CF | ⭐⭐⭐ | Kiểm tra thứ tự BFS hợp lệ |
| [CF - Shortest Path (0-1 BFS)](https://codeforces.com/problemset/problem/59/E) | CF | ⭐⭐⭐ | 0-1 BFS nâng cao |

### Nâng cao (Kết hợp nhiều kỹ thuật)

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Course Schedule](https://cses.fi/problemset/task/1679) | CSES | ⭐⭐⭐ | Topological Sort (Kahn's BFS) |
| [CSES - Game Routes](https://cses.fi/problemset/task/1681) | CSES | ⭐⭐⭐ | BFS + DP trên DAG |
| [VNOJ - Quân tượng (QBBISHOP)](https://oj.vnoi.info/problem/qbbishop) | VNOJ | ⭐⭐⭐⭐ | BFS trên bàn cờ |

---

## 10. Tóm tắt

```
Queue = Hàng đợi FIFO: vào trước, ra trước.

Thao tác cơ bản: push, pop, front, back, empty, size → tất cả O(1)

Cài đặt:
  - Circular Array: mảng + 2 con trỏ quay vòng
  - Linked List: node đầu + node cuối
  - Thư viện: std::queue (C++), deque (Python)

Ứng dụng chính:
  ┌─────────────────────────────────────────────────┐
  │ BFS — Duyệt đồ thị theo tầng                   │
  │ Multi-source BFS — BFS từ nhiều đỉnh nguồn     │
  │ Level-order — Duyệt cây theo tầng               │
  │ Topological Sort (Kahn) — Sắp xếp topo bằng BFS│
  │ Sliding Window — Deque + Monotonic              │
  │ Task Scheduling — Round-Robin                    │
  └─────────────────────────────────────────────────┘

Cạm bẫy:
  - Luôn kiểm tra empty() trước khi pop/front
  - Python: dùng deque, KHÔNG dùng list
  - Đánh visited khi PUSH, không phải khi POP
  - Khởi tạo mảng dist trước khi BFS
```

---

## Tài liệu tham khảo

- [GeeksforGeeks - Queue](https://www.geeksforgeeks.org/dsa/queue-data-structure/)
- [VNOI Wiki - BFS](https://wiki.vnoi.info/algo/graph-theory/breadth-first-search)
- [YouTube - BFS (takeuforward)](https://www.youtube.com/watch?v=0dCM6BKJS8E)
- [CP-Algorithms - 0-1 BFS](https://cp-algorithms.com/graph/01_bfs.html)

**Bài trước:** [Linked List ←](33-linked-list.md) | **Bài tiếp theo:** [Hash Table →](16-hash-table.md)
