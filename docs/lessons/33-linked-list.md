# Bài 33: Linked List - Danh Sách Liên Kết Chi Tiết

> **Tác giả:** Hà Trí Kiên<br>
> **Nội dung tham khảo từ:** GeeksforGeeks - Linked List, CP-Algorithms

## 1. Chuyện gì đang xảy ra?

### Bài toán: Quản lý danh sách thay đổi liên tục

Bạn có danh sách bài hát. Người dùng có thể:

- Thêm bài vào giữa danh sách
- Xóa bài ở bất kỳ vị trí nào
- Di chuyển bài từ vị trí này sang vị trí khác

**Mảng:** Thêm/xóa ở giữa → phải dời toàn bộ → O(N). Chậm!

**Linked List:** Thêm/xóa ở bất kỳ đâu → O(1) nếu biết vị trí!

### Mảng vs Linked List — Bảng so sánh chi tiết

| Thao tác | Mảng | Linked List |
|----------|------|-------------|
| Truy cập phần tử thứ i | **O(1)** — tính địa chỉ | O(N) — phải duyệt |
| Thêm/xóa ở đầu | O(N) — dời toàn bộ | **O(1)** — đổi con trỏ |
| Thêm/xóa ở cuối | O(1) amortized | O(1) nếu biết tail |
| Thêm/xóa ở giữa (biết vị trí) | O(N) | **O(1)** |
| Bộ nhớ | Liền mạch, cache-friendly | Phân tán, cache-unfriendly |
| Kích thước | Cố định (hoặc cấp phát lại) | Linh hoạt |

---

## 2. Danh sách liên kết đơn (Singly Linked List)

### Cấu trúc

Mỗi node gồm:

- `data`: giá trị lưu trữ
- `next`: con trỏ trỏ đến node tiếp theo

```
[1|→] → [3|→] → [5|→] → [7|NULL]
 head
```

### Thao tác 1: Thêm node vào đầu — O(1)

```
Thêm 0 vào đầu [1] → [3] → [5] → NULL:

Bước 1: Tạo node mới [0|→]
Bước 2: [0].next = head (= [1])
Bước 3: head = [0]

Kết quả: [0] → [1] → [3] → [5] → NULL
```

### Thao tác 2: Thêm node vào giữa — O(1)

```
Thêm 2 sau node [1] trong [0] → [1] → [3] → [5] → NULL:

Bước 1: Tạo node mới [2|→]
Bước 2: [2].next = [1].next (= [3])
Bước 3: [1].next = [2]

Kết quả: [0] → [1] → [2] → [3] → [5] → NULL
```

### Thao tác 3: Xóa node — O(1)

```
Xóa node [3] trong [0] → [1] → [2] → [3] → [5] → NULL:

Cần node trước [3] (= [2]):
Bước 1: [2].next = [3].next (= [5])

Kết quả: [0] → [1] → [2] → [5] → NULL
(node [3] bị "mất liên kết", bộ nhớ cần giải phóng)
```

### Code C++ — Singly Linked List

```cpp
struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

struct LinkedList {
    Node* head = nullptr;
    
    // Thêm vào đầu — O(1)
    void pushFront(int val) {
        Node* newNode = new Node(val);
        newNode->next = head;
        head = newNode;
    }
    
    // Thêm vào cuối — O(N) nếu không có tail
    void pushBack(int val) {
        Node* newNode = new Node(val);
        if (head == nullptr) {
            head = newNode;
            return;
        }
        Node* cur = head;
        while (cur->next != nullptr)
            cur = cur->next;
        cur->next = newNode;
    }
    
    // Thêm sau node có giá trị key — O(N)
    void insertAfter(int key, int val) {
        Node* cur = head;
        while (cur != nullptr && cur->data != key)
            cur = cur->next;
        if (cur == nullptr) return;  // Không tìm thấy
        
        Node* newNode = new Node(val);
        newNode->next = cur->next;
        cur->next = newNode;
    }
    
    // Xóa node có giá trị key — O(N)
    void remove(int key) {
        if (head == nullptr) return;
        
        if (head->data == key) {
            Node* temp = head;
            head = head->next;
            delete temp;
            return;
        }
        
        Node* cur = head;
        while (cur->next != nullptr && cur->next->data != key)
            cur = cur->next;
        
        if (cur->next != nullptr) {
            Node* temp = cur->next;
            cur->next = cur->next->next;
            delete temp;
        }
    }
    
    // Duyệt — O(N)
    void print() {
        Node* cur = head;
        while (cur != nullptr) {
            cout << cur->data << " → ";
            cur = cur->next;
        }
        cout << "NULL\n";
    }
};
```

### Code Python

```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
    
    def push_front(self, val):
        new_node = Node(val)
        new_node.next = self.head
        self.head = new_node
    
    def push_back(self, val):
        new_node = Node(val)
        if not self.head:
            self.head = new_node
            return
        cur = self.head
        while cur.next:
            cur = cur.next
        cur.next = new_node
    
    def remove(self, key):
        if not self.head: return
        if self.head.data == key:
            self.head = self.head.next
            return
        cur = self.head
        while cur.next and cur.next.data != key:
            cur = cur.next
        if cur.next:
            cur.next = cur.next.next
    
    def print_list(self):
        cur = self.head
        parts = []
        while cur:
            parts.append(str(cur.data))
            cur = cur.next
        print(" → ".join(parts) + " → NULL")
```

---

## 3. Danh sách liên kết đôi (Doubly Linked List)

### Cấu trúc

Mỗi node có **2 con trỏ**: `prev` (trước) và `next` (sau).

```
NULL ← [1|←|→] ⇄ [3|←|→] ⇄ [5|←|→] → NULL
                 head        tail
```

### Ưu điểm so với Singly Linked List

| | Singly | Doubly |
|--|--------|--------|
| Duyệt thuận | ✅ | ✅ |
| Duyệt ngược | ❌ | ✅ |
| Xóa node (biết node đó) | Cần node trước | **O(1)** |
| Bộ nhớ | Ít hơn (1 con trỏ/node) | Nhiều hơn (2 con trỏ/node) |

### Code C++ — Doubly Linked List

```cpp
struct DNode {
    int data;
    DNode *prev, *next;
    DNode(int val) : data(val), prev(nullptr), next(nullptr) {}
};

struct DoublyLinkedList {
    DNode *head = nullptr, *tail = nullptr;
    
    void pushFront(int val) {
        DNode* newNode = new DNode(val);
        if (head == nullptr) {
            head = tail = newNode;
            return;
        }
        newNode->next = head;
        head->prev = newNode;
        head = newNode;
    }
    
    void pushBack(int val) {
        DNode* newNode = new DNode(val);
        if (tail == nullptr) {
            head = tail = newNode;
            return;
        }
        tail->next = newNode;
        newNode->prev = tail;
        tail = newNode;
    }
    
    // Xóa node đã biết — O(1)!
    void removeNode(DNode* node) {
        if (node->prev) node->prev->next = node->next;
        else head = node->next;  // Xóa head
        
        if (node->next) node->next->prev = node->prev;
        else tail = node->prev;  // Xóa tail
        
        delete node;
    }
};
```

---

## 4. Ứng dụng quan trọng

### 4.1. Stack bằng Linked List

```cpp
struct Stack {
    Node* top_node = nullptr;
    
    void push(int val) {
        Node* newNode = new Node(val);
        newNode->next = top_node;
        top_node = newNode;
    }
    
    int pop() {
        if (top_node == nullptr) { cerr << "Stack empty!\n"; return -1; }
        int val = top_node->data;
        Node* temp = top_node;
        top_node = top_node->next;
        delete temp;
        return val;
    }
};
```

### 4.2. Queue bằng Linked List

```cpp
struct Queue {
    Node *front_node = nullptr, *back_node = nullptr;
    
    void push(int val) {
        Node* newNode = new Node(val);
        if (back_node) back_node->next = newNode;
        else front_node = newNode;
        back_node = newNode;
    }
    
    int pop() {
        if (front_node == nullptr) { cerr << "Queue empty!\n"; return -1; }
        int val = front_node->data;
        Node* temp = front_node;
        front_node = front_node->next;
        if (!front_node) back_node = nullptr;
        delete temp;
        return val;
    }
};
```

### 4.3. Linked List trong LRU Cache

LRU Cache (Least Recently Used) dùng Doubly Linked List + Hash Map:

- Duyệt và xóa bất kỳ node: O(1)
- Đưa node lên đầu: O(1)

---

## 5. Lưu ý & Cạm bẫy

### 5.1. Quên giải phóng bộ nhớ

```cpp
// SAI: Xóa node nhưng không free/delete → memory leak!
cur->next = cur->next->next;

// ĐÚNG: Lưu lại node cũ rồi xóa
Node* temp = cur->next;
cur->next = cur->next->next;
delete temp;
```

### 5.2. Quên kiểm tra NULL

```cpp
// SAI: head có thể là NULL
head->data = 5;

// ĐÚNG: Kiểm tra trước
if (head != nullptr) head->data = 5;
```

### 5.3. Mất liên kết khi xóa

```cpp
// SAI: Xóa node nhưng quên nối lại
delete cur;  // Node phía trước mất liên kết!

// ĐÚNG: Nối node trước với node sau, rồi mới xóa
prev->next = cur->next;
delete cur;
```

### 5.4. Linked List trong Python

Python không có con trỏ thủ công. Dùng class như ví dụ trên. Hoặc dùng `collections.deque` cho doubly linked list cơ bản.

---

## 6. Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [LeetCode - Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/) | LC | ⭐ | Đảo ngược LL |
| [LeetCode - Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/) | LC | ⭐⭐ | Gộp 2 LL |
| [LeetCode - Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/) | LC | ⭐⭐ | Phát hiện chu trình (Floyd) |
| [LeetCode - Remove Nth Node](https://leetcode.com/problems/remove-nth-node-from-end-of-list/) | LC | ⭐⭐ | Two pointers |
| [LeetCode - LRU Cache](https://leetcode.com/problems/lru-cache/) | LC | ⭐⭐⭐ | Doubly LL + HashMap |

---

## Tài liệu tham khảo

- [GeeksforGeeks - Linked List](https://www.geeksforgeeks.org/dsa/linked-list-data-structure/)
- [CP-Algorithms - Linked List](https://cp-algorithms.com/)
- [YouTube - Linked List (takeuforward)](https://www.youtube.com/watch?v=Nq7ok6w23SA)

**Bài tiếp theo:** [Bài 34: Queue cơ bản →](34-queue.md)
