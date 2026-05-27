# Bài 33: Linked List — Danh Sách Liên Kết

> **Tác giả:** Hà Trí Kiên<br>
> **Nội dung tham khảo từ:** GeeksforGeeks, CP-Algorithms

---

## Bản chất vấn đề

### Bài toán: Quản lý danh sách thay đổi kích thước

Bạn có một playlist nhạc. Người dùng có thể thêm bài vào giữa, xóa bài ở bất kỳ vị trí nào, hoặc di chuyển bài hát.

**Với mảng (array):** Thêm hoặc xóa ở giữa buộc phải dời toàn bộ phần tử phía sau — mất $O(N)$ mỗi lần.

**Với linked list:** Thêm hoặc xóa tại một vị trí (khi đã có con trỏ trỏ đến node) chỉ mất $O(1)$ vì chỉ cần đổi vài con trỏ.

### So sánh mảng và linked list

| Thao tác | Mảng | Linked List |
|---|---|---|
| Truy cập phần tử thứ $i$ | $O(1)$ — tính địa chỉ | $O(N)$ — phải duyệt từ đầu |
| Thêm/xóa ở đầu | $O(N)$ — dời toàn bộ | $O(1)$ — đổi con trỏ |
| Thêm/xóa ở cuối | $O(1)$ amortized | $O(1)$ nếu biết tail |
| Thêm/xóa ở giữa (khi có con trỏ) | $O(N)$ | $O(1)$ |
| Bộ nhớ | Liền mạch, cache-friendly | Phân tán, cache-unfriendly |

**Kết luận:** Linked list tối ưu khi thao tác chèn/xóa diễn ra thường xuyên, không cần truy cập ngẫu nhiên.

---

## Tư duy cốt lõi

### Cấu trúc của singly linked list

Mỗi node chứa hai phần: giá trị `data` và con trỏ `next` trỏ đến node kế tiếp. Node cuối cùng có `next` là `nullptr`.

```mermaid
graph LR
    H["head"] --> A["1"] --> B["3"] --> C["5"] --> D["7"] --> N["nullptr"]
```

### Thao tác 1: Thêm node vào đầu — $O(1)$

Tạo node mới, cho `next` của nó trỏ vào `head` cũ, rồi cập nhật `head` trỏ sang node mới.

```mermaid
graph LR
    A["0"] --> B["1"] --> C["3"] --> D["5"] --> E["7"] --> N["nullptr"]
```

### Thao tác 2: Thêm node vào giữa — $O(1)$ (khi có con trỏ)

Khi đã có con trỏ trỏ đến node đứng trước vị trí cần chèn, chỉ cần 2 bước: cho `next` của node mới trỏ vào node sau, rồi cho `next` của node trước trỏ vào node mới.

```mermaid
graph LR
    A["0"] --> B["1"] --> C["2"] --> D["3"] --> E["5"] --> F["7"] --> N["nullptr"]
```

### Thao tác 3: Xóa node — $O(1)$ (khi có con trỏ node trước)

Cho `next` của node trước nhảy qua node cần xóa, trỏ thẳng đến node sau. Node bị xóa trở thành "mồ côi", cần giải phóng bộ nhớ.

```mermaid
graph LR
    A["0"] --> B["1"] --> C["2"] --> D["5"] --> E["7"] --> N["nullptr"]
```

### Cài đặt singly linked list

=== "C++"

    ```cpp
    #include <iostream>
    using namespace std;

    struct Node {
        int data;
        Node* next;
        Node(int val) : data(val), next(nullptr) {}
    };

    struct LinkedList {
        Node* head = nullptr;

        void pushFront(int val) {
            Node* newNode = new Node(val);
            newNode->next = head;
            head = newNode;
        }

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

        void insertAfter(int key, int val) {
            Node* cur = head;
            while (cur != nullptr && cur->data != key)
                cur = cur->next;
            if (cur == nullptr) return;

            Node* newNode = new Node(val);
            newNode->next = cur->next;
            cur->next = newNode;
        }

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

        void print() {
            Node* cur = head;
            while (cur != nullptr) {
                cout << cur->data;
                if (cur->next) cout << " -> ";
                cur = cur->next;
            }
            cout << "\n";
        }
    };

    int main() {
        LinkedList ll;
        ll.pushBack(1);
        ll.pushBack(3);
        ll.pushBack(5);
        ll.pushFront(0);
        ll.insertAfter(1, 2);
        ll.remove(3);
        ll.print();
        return 0;
    }
    ```

=== "Python"

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

        def insert_after(self, key, val):
            cur = self.head
            while cur and cur.data != key:
                cur = cur.next
            if not cur:
                return
            new_node = Node(val)
            new_node.next = cur.next
            cur.next = new_node

        def remove(self, key):
            if not self.head:
                return
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
            print(" -> ".join(parts))

    ll = LinkedList()
    ll.push_back(1)
    ll.push_back(3)
    ll.push_back(5)
    ll.push_front(0)
    ll.insert_after(1, 2)
    ll.remove(3)
    ll.print_list()
    ```

### Doubly Linked List

Mỗi node có hai con trỏ: `prev` (trước) và `next` (sau). Cho phép duyệt ngược và xóa node trong $O(1)$ mà không cần biết node trước.

```mermaid
graph LR
    N1["nullptr"] --- A["1"]
    A <--> B["3"]
    B <--> C["5"]
    C --- N2["nullptr"]
```

=== "C++"

    ```cpp
    #include <iostream>
    using namespace std;

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

        void removeNode(DNode* node) {
            if (node->prev) node->prev->next = node->next;
            else head = node->next;

            if (node->next) node->next->prev = node->prev;
            else tail = node->prev;

            delete node;
        }

        void print() {
            DNode* cur = head;
            while (cur) {
                cout << cur->data;
                if (cur->next) cout << " <-> ";
                cur = cur->next;
            }
            cout << "\n";
        }
    };
    ```

=== "Python"

    ```python
    class DNode:
        def __init__(self, data):
            self.data = data
            self.prev = None
            self.next = None

    class DoublyLinkedList:
        def __init__(self):
            self.head = None
            self.tail = None

        def push_front(self, val):
            new_node = DNode(val)
            if not self.head:
                self.head = self.tail = new_node
                return
            new_node.next = self.head
            self.head.prev = new_node
            self.head = new_node

        def push_back(self, val):
            new_node = DNode(val)
            if not self.tail:
                self.head = self.tail = new_node
                return
            self.tail.next = new_node
            new_node.prev = self.tail
            self.tail = new_node

        def remove_node(self, node):
            if node.prev:
                node.prev.next = node.next
            else:
                self.head = node.next

            if node.next:
                node.next.prev = node.prev
            else:
                self.tail = node.prev

        def print_list(self):
            cur = self.head
            parts = []
            while cur:
                parts.append(str(cur.data))
                cur = cur.next
            print(" <-> ".join(parts))
    ```

### Ứng dụng: Stack và Queue bằng linked list

=== "C++"

    ```cpp
    struct Stack {
        Node* top_node = nullptr;

        void push(int val) {
            Node* newNode = new Node(val);
            newNode->next = top_node;
            top_node = newNode;
        }

        int pop() {
            if (!top_node) return -1;
            int val = top_node->data;
            Node* temp = top_node;
            top_node = top_node->next;
            delete temp;
            return val;
        }
    };

    struct Queue {
        Node *front_node = nullptr, *back_node = nullptr;

        void push(int val) {
            Node* newNode = new Node(val);
            if (back_node) back_node->next = newNode;
            else front_node = newNode;
            back_node = newNode;
        }

        int pop() {
            if (!front_node) return -1;
            int val = front_node->data;
            Node* temp = front_node;
            front_node = front_node->next;
            if (!front_node) back_node = nullptr;
            delete temp;
            return val;
        }
    };
    ```

=== "Python"

    ```python
    class Stack:
        def __init__(self):
            self.top_node = None

        def push(self, val):
            new_node = Node(val)
            new_node.next = self.top_node
            self.top_node = new_node

        def pop(self):
            if not self.top_node:
                return None
            val = self.top_node.data
            self.top_node = self.top_node.next
            return val

    class Queue:
        def __init__(self):
            self.front_node = None
            self.back_node = None

        def push(self, val):
            new_node = Node(val)
            if self.back_node:
                self.back_node.next = new_node
            else:
                self.front_node = new_node
            self.back_node = new_node

        def pop(self):
            if not self.front_node:
                return None
            val = self.front_node.data
            self.front_node = self.front_node.next
            if not self.front_node:
                self.back_node = None
            return val
    ```

### LRU Cache

LRU Cache (Least Recently Used) kết hợp Doubly Linked List với Hash Map:

- Duyệt và xóa bất kỳ node: $O(1)$
- Đưa node lên đầu danh sách: $O(1)$
- Tra cứu key: $O(1)$ qua hash map

Đây là cấu trúc nền tảng cho nhiều hệ thống thực tế như bộ nhớ đệm trình duyệt, quản lý trang trong OS.

---

## Phân tích tính đúng đắn

### Tại sao thêm/xóa là $O(1)$ khi có con trỏ?

Giả sử có con trỏ `p` trỏ đến node cần thao tác. Thao tác thêm node mới `q` sau `p` chỉ gồm:

1. `q->next = p->next` — gán 1 con trỏ
2. `p->next = q` — gán 1 con trỏ

Không có vòng lặp, không phụ thuộc vào kích thước danh sách. Do đó độ phức tạp là $O(1)$.

### Tại sao tìm kiếm là $O(N)$?

Linked list không hỗ trợ truy cập ngẫu nhiên. Muốn tìm phần tử có giá trị `key`, phải duyệt từ `head` lần lượt theo con trỏ `next` cho đến khi tìm thấy hoặc đến cuối danh sách. Trường hợp xấu nhất duyệt qua toàn bộ $N$ node.

### Mất con trỏ — lỗi phổ biến nhất

Khi xóa một node, nếu quên lưu con trỏ đến node đó trước khi đổi liên kết, bộ nhớ bị rò rỉ (memory leak):

1. Phải lưu node cần xóa vào biến tạm (`temp`)
2. Nối node trước với node sau
3. Giải phóng biến tạm

Thứ tự này rất quan trọng. Nếu giải phóng trước khi nối, toàn bộ danh sách phía sau bị mất.

---

## Đánh giá độ phức tạp

### Độ phức tạp thời gian

| Thao tác | Singly Linked List | Doubly Linked List |
|---|---|---|
| Tìm kiếm | $O(N)$ | $O(N)$ |
| Thêm vào đầu | $O(1)$ | $O(1)$ |
| Thêm vào cuối (có tail) | $O(1)$ | $O(1)$ |
| Thêm vào cuối (không tail) | $O(N)$ | $O(N)$ |
| Xóa node khi có con trỏ | $O(1)$ | $O(1)$ |
| Xóa node khi chỉ biết giá trị | $O(N)$ | $O(N)$ |
| Duyệt xuôi | $O(N)$ | $O(N)$ |
| Duyệt ngược | Không hỗ trợ | $O(N)$ |

### Độ phức tạp bộ nhớ

- **Singly Linked List:** Mỗi node lưu 1 giá trị + 1 con trỏ → $O(N)$ bộ nhớ, hằng số nhân lớn hơn mảng.
- **Doubly Linked List:** Mỗi node lưu 1 giá trị + 2 con trỏ → $O(N)$ bộ nhớ, gấp rưỡi singly.
- **Mảng:** Chỉ lưu giá trị, overhead tối thiểu.

### Khi nào nên dùng linked list?

- Cần chèn/xóa thường xuyên ở đầu hoặc giữa danh sách
- Không biết trước kích thước dữ liệu
- Cần triển khai stack, queue, hoặc các cấu trúc dữ liệu khác
- Cần duyệt ngược (doubly linked list)

### Khi nào không nên dùng linked list?

- Cần truy cập ngẫu nhiên phần tử thứ $i$
- Dữ liệu nhỏ và cố định (mảng hiệu quả hơn)
- Yêu cầu cache performance cao

---

## Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|---|---|---|---|
| [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/) | LeetCode | Dễ | Đảo ngược linked list |
| [Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/) | LeetCode | Trung bình | Gộp 2 linked list |
| [Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/) | LeetCode | Trung bình | Phát hiện chu trình (Floyd) |
| [Remove Nth Node From End](https://leetcode.com/problems/remove-nth-node-from-end-of-list/) | LeetCode | Trung bình | Two pointers |
| [LRU Cache](https://leetcode.com/problems/lru-cache/) | LeetCode | Khó | Doubly LL + Hash Map |
| [Josephus Problem I](https://cses.fi/problemset/task/2162) | CSES | Trung bình | Vòng tròn xóa người |
| [Josephus Problem II](https://cses.fi/problemset/task/2163) | CSES | Khó | Josephus với skip |

---

## Tài liệu tham khảo

- [GeeksforGeeks — Linked List](https://www.geeksforgeeks.org/dsa/linked-list-data-structure/)
- [CP-Algorithms — Linked List](https://cp-algorithms.com/)
- [YouTube — Linked List (takeuforward)](https://www.youtube.com/watch?v=Nq7ok6w23SA)

**Bài tiếp theo:** [Bài 34: Queue cơ bản](queue.md)
