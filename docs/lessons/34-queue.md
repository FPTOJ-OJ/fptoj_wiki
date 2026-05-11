# Bài 34: Queue - Hàng Đợi

> **Tác giả:** Hà Trí Kiên
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

### Các thao tác cơ bản

| Thao tác | Ý nghĩa | Độ phức tạp |
|----------|----------|-------------|
| `push(x)` | Thêm x vào cuối hàng | O(1) |
| `pop()` | Loại bỏ phần tử đầu hàng | O(1) |
| `front()` | Xem phần tử đầu hàng | O(1) |
| `empty()` | Kiểm tra hàng rỗng | O(1) |

---

## 2. Code C++ — Dùng thư viện

```cpp
#include <queue>
using namespace std;

int main() {
    queue<int> q;
    
    q.push(1);    // [1]
    q.push(2);    // [1, 2]
    q.push(3);    // [1, 2, 3]
    
    cout << q.front();  // 1 (phần tử đầu)
    cout << q.back();   // 3 (phần tử cuối)
    
    q.pop();      // [2, 3] — loại 1
    cout << q.front();  // 2
    
    cout << q.size();   // 2
    cout << q.empty();  // 0 (false)
}
```

### Code Python

```python
from collections import deque

q = deque()
q.append(1)     # [1]
q.append(2)     # [1, 2]
q.append(3)     # [1, 2, 3]

print(q[0])     # 1 (phần tử đầu)
print(q[-1])    # 3 (phần tử cuối)

q.popleft()     # [2, 3] — loại 1
print(q[0])     # 2

print(len(q))   # 2
```

!!! tip "Lưu ý Python"
    Dùng `collections.deque` thay vì `list` cho queue! `list.pop(0)` là O(N), còn `deque.popleft()` là O(1).

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
struct Queue {
    int arr[MAXN];
    int front_idx = 0, rear_idx = -1, cnt = 0;
    
    void push(int val) {
        if (cnt >= MAXN) { cerr << "Queue full!\n"; return; }
        rear_idx = (rear_idx + 1) % MAXN;
        arr[rear_idx] = val;
        cnt++;
    }
    
    int pop() {
        int val = arr[front_idx];
        front_idx = (front_idx + 1) % MAXN;
        cnt--;
        return val;
    }
    
    int front() { return arr[front_idx]; }
    int size() { return cnt; }
    bool empty() { return cnt == 0; }
};
```

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

### Code C++ — BFS

```cpp
vector<int> adj[MAXN];
bool visited[MAXN];

void bfs(int start) {
    queue<int> q;
    q.push(start);
    visited[start] = true;
    
    while (!q.empty()) {
        int v = q.front(); q.pop();
        cout << v << " ";  // Xử lý đỉnh v
        
        for (int u : adj[v]) {
            if (!visited[u]) {
                visited[u] = true;
                q.push(u);
            }
        }
    }
}
```

### Code Python — BFS

```python
from collections import deque

def bfs(start, adj):
    visited = {start}
    q = deque([start])
    
    while q:
        v = q.popleft()
        print(v, end=" ")  # Xử lý đỉnh v
        
        for u in adj[v]:
            if u not in visited:
                visited.add(u)
                q.append(u)
```

---

## 5. Các biến thể của Queue

### 5.1. Deque (Double-Ended Queue)

Thêm/xóa được ở **cả đầu lẫn cuối** — đã học ở [Bài 15: Deque & Sliding Window](15-deque-sliding-window.md).

### 5.2. Priority Queue (Hàng đợi ưu tiên)

Phần tử ưu tiên nhất ra trước — đã học ở [Bài 8: Heap, DSU, Segment Tree, BIT](08-heap-dsu-segment-tree-bit.md).

### 5.3. Monotonic Queue (Hàng đợi đơn điệu)

Queue luôn giữ thứ tự tăng/giảm dần — đã học ở Bài 15.

---

## 6. Ứng dụng thực tế của Queue

| Ứng dụng | Mô tả |
|----------|-------|
| BFS | Duyệt đồ thị theo tầng |
| Hàng đợi CPU | Các tiến trình chờ CPU |
| Buffer (đệm) | Dữ liệu chờ xử lý |
| Level-order traversal | Duyệt cây theo tầng |
| Sliding Window | Dùng deque |
| Mô phỏng | Mô phỏng hàng đợi thực tế |

---

## 7. Lưu ý & Cạm bẫy

### 7.1. Quên kiểm tra rỗng

```cpp
// SAI: front() khi queue rỗng → crash!
cout << q.front();

// ĐÚNG: Kiểm tra trước
if (!q.empty()) cout << q.front();
```

### 7.2. Dùng list.pop(0) trong Python

```python
# SAI: list.pop(0) là O(N) — phải dời toàn bộ!
q = []
q.append(1)
q.pop(0)  # O(N)!

# ĐÚNG: Dùng deque.popleft() — O(1)
from collections import deque
q = deque()
q.append(1)
q.popleft()  # O(1)
```

### 7.3. BFS quên visited

```cpp
// SAI: Không đánh dấu visited → duyệt lại nhiều lần → TLE hoặc sai!
// ĐÚNG: Luôn đánh visited khi push vào queue
visited[start] = true;
q.push(start);  // Đánh dấu TRƯỚC khi push!
```

---

## 8. Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Message Route](https://cses.fi/problemset/task/1667) | CSES | ⭐⭐ | BFS tìm đường |
| [CSES - Labyrinth](https://cses.fi/problemset/task/1193) | CSES | ⭐⭐ | BFS trên lưới |
| [LeetCode - Implement Queue using Stacks](https://leetcode.com/problems/implement-queue-using-stacks/) | LC | ⭐⭐ | Queue + Stack |
| [LeetCode - Number of Islands](https://leetcode.com/problems/number-of-islands/) | LC | ⭐⭐ | BFS/DFS trên lưới |
| [LeetCode - Rotting Oranges](https://leetcode.com/problems/rotting-oranges/) | LC | ⭐⭐ | Multi-source BFS |

---

## Tài liệu tham khảo

- [GeeksforGeeks - Queue](https://www.geeksforgeeks.org/dsa/queue-data-structure/)
- [VNOI Wiki - BFS](https://wiki.vnoi.info/algo/graph-theory/breadth-first-search)
- [YouTube - BFS (takeuforward)](https://www.youtube.com/watch?v=0dCM6BKJS8E)

**Bài trước:** [Linked List ←](33-linked-list.md) | **Bài tiếp theo:** [Về trang tổng hợp →](index.md)
