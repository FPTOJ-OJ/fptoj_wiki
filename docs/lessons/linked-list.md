# Bài 33: Linked List — Danh Sách Liên Kết

> **Tác giả:** FPTOJ Team<br>
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

Thứ tự 2 bước đổi `next` (làm ngược sẽ mất cả danh sách):

| Bước | Code | `next` thay đổi thế nào |
|------|------|--------------------------|
| 1 | `newNode->next = head` | Node mới `0` trỏ vào đầu cũ `1`: `0 -> 1 -> 3 -> 5 -> 7` |
| 2 | `head = newNode` | `head` rời khỏi `1`, trỏ sang `0` |

```mermaid
graph LR
    A["0"] --> B["1"] --> C["3"] --> D["5"] --> E["7"] --> N["nullptr"]
```

### Thao tác 2: Thêm node vào giữa — $O(1)$ (khi có con trỏ)

Khi đã có con trỏ trỏ đến node đứng trước vị trí cần chèn, chỉ cần 2 bước: cho `next` của node mới trỏ vào node sau, rồi cho `next` của node trước trỏ vào node mới.

Ví dụ chèn `2` sau node `1` trong `0 -> 1 -> 3 -> ...`:

| Bước | Code | `next` thay đổi thế nào |
|------|------|--------------------------|
| 1 | `newNode->next = cur->next` | Node mới `2` trỏ vào node sau `3`: `2 -> 3` (danh sách cũ chưa đổi) |
| 2 | `cur->next = newNode` | Node `1` rời khỏi `3`, trỏ sang `2`: `1 -> 2 -> 3` |

!!! warning "Thứ tự quan trọng"
    Phải làm bước 1 trước bước 2. Nếu làm `cur->next = newNode` trước, con trỏ tới node `3` bị mất, node mới không biết trỏ vào đâu.

```mermaid
graph LR
    A["0"] --> B["1"] --> C["2"] --> D["3"] --> E["5"] --> F["7"] --> N["nullptr"]
```

### Thao tác 3: Xóa node — $O(1)$ (khi có con trỏ node trước)

Cho `next` của node trước nhảy qua node cần xóa, trỏ thẳng đến node sau. Node bị xóa trở thành "mồ côi", cần giải phóng bộ nhớ.

Ví dụ xóa node `3` khỏi `0 -> 1 -> 2 -> 3 -> 5 -> 7`:

| Bước | Code | `next` thay đổi thế nào |
|------|------|--------------------------|
| 1 | `Node* temp = cur->next` | Lưu node `3` vào `temp` để sau này `delete` |
| 2 | `cur->next = cur->next->next` | Node `2` rời khỏi `3`, nhảy thẳng sang `5`: `2 -> 5` |
| 3 | `delete temp` | Giải phóng node `3` mồ côi |

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
            newNode->next = head;  // trỏ node mới vào head cũ
            head = newNode;         // cập nhật head
        }

        void pushBack(int val) {
            Node* newNode = new Node(val);
            if (head == nullptr) {  // danh sách rỗng
                head = newNode;
                return;
            }
            Node* cur = head;
            while (cur->next != nullptr)  // duyệt đến node cuối
                cur = cur->next;
            cur->next = newNode;          // nối node cuối vào node mới
        }

        void insertAfter(int key, int val) {
            Node* cur = head;
            while (cur != nullptr && cur->data != key)  // tìm node chứa key
                cur = cur->next;
            if (cur == nullptr) return;

            Node* newNode = new Node(val);
            newNode->next = cur->next;  // node mới trỏ đến node sau
            cur->next = newNode;        // node trước trỏ vào node mới
        }

        void remove(int key) {
            if (head == nullptr) return;

            if (head->data == key) {     // xóa node đầu
                Node* temp = head;
                head = head->next;
                delete temp;
                return;
            }

            Node* cur = head;
            while (cur->next != nullptr && cur->next->data != key)  // tìm node trước node cần xóa
                cur = cur->next;

            if (cur->next != nullptr) {
                Node* temp = cur->next;
                cur->next = cur->next->next;  // nhảy qua node cần xóa
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
        ll.print();  // Output kỳ vọng: 0 -> 1 -> 2 -> 5
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
            new_node.next = self.head  # trỏ node mới vào head cũ
            self.head = new_node       # cập nhật head

        def push_back(self, val):
            new_node = Node(val)
            if not self.head:          # danh sách rỗng
                self.head = new_node
                return
            cur = self.head
            while cur.next:             # duyệt đến node cuối
                cur = cur.next
            cur.next = new_node         # nối node cuối vào node mới

        def insert_after(self, key, val):
            cur = self.head
            while cur and cur.data != key:  # tìm node chứa key
                cur = cur.next
            if not cur:
                return
            new_node = Node(val)
            new_node.next = cur.next   # node mới trỏ đến node sau
            cur.next = new_node        # node trước trỏ vào node mới

        def remove(self, key):
            if not self.head:
                return
            if self.head.data == key:  # xóa node đầu
                self.head = self.head.next
                return
            cur = self.head
            while cur.next and cur.next.data != key:  # tìm node trước node cần xóa
                cur = cur.next
            if cur.next:
                cur.next = cur.next.next  # nhảy qua node cần xóa

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
    ll.print_list()  # Output kỳ vọng: 0 -> 1 -> 2 -> 5
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
            if (head == nullptr) {         // danh sách rỗng
                head = tail = newNode;
                return;
            }
            newNode->next = head;          // node mới trỏ đến head cũ
            head->prev = newNode;          // head cũ trỏ ngược về node mới
            head = newNode;                // cập nhật head
        }

        void pushBack(int val) {
            DNode* newNode = new DNode(val);
            if (tail == nullptr) {         // danh sách rỗng
                head = tail = newNode;
                return;
            }
            tail->next = newNode;          // tail cũ trỏ đến node mới
            newNode->prev = tail;          // node mới trỏ ngược về tail cũ
            tail = newNode;                // cập nhật tail
        }

        void removeNode(DNode* node) {
            if (node->prev) node->prev->next = node->next;  // nối node trước với node sau
            else head = node->next;                          // node là head

            if (node->next) node->next->prev = node->prev;  // nối node sau với node trước
            else tail = node->prev;                          // node là tail

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
            if not self.head:             # danh sách rỗng
                self.head = self.tail = new_node
                return
            new_node.next = self.head     # node mới trỏ đến head cũ
            self.head.prev = new_node     # head cũ trỏ ngược về node mới
            self.head = new_node          # cập nhật head

        def push_back(self, val):
            new_node = DNode(val)
            if not self.tail:             # danh sách rỗng
                self.head = self.tail = new_node
                return
            self.tail.next = new_node     # tail cũ trỏ đến node mới
            new_node.prev = self.tail     # node mới trỏ ngược về tail cũ
            self.tail = new_node          # cập nhật tail

        def remove_node(self, node):
            if node.prev:                  # nối node trước với node sau
                node.prev.next = node.next
            else:
                self.head = node.next      # node là head

            if node.next:                  # nối node sau với node trước
                node.next.prev = node.prev
            else:
                self.tail = node.prev      # node là tail

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
            newNode->next = top_node;  // node mới trỏ đến đỉnh hiện tại
            top_node = newNode;         // cập nhật đỉnh
        }

        int pop() {
            if (!top_node) return -1;  // stack rỗng
            int val = top_node->data;
            Node* temp = top_node;
            top_node = top_node->next;  // đỉnh trỏ xuống node kế
            delete temp;
            return val;
        }
    };

    struct Queue {
        Node *front_node = nullptr, *back_node = nullptr;

        void push(int val) {
            Node* newNode = new Node(val);
            if (back_node) back_node->next = newNode;  // nối vào cuối hàng đợi
            else front_node = newNode;                  // hàng đợi rỗng
            back_node = newNode;                        // cập nhật đuôi
        }

        int pop() {
            if (!front_node) return -1;   // queue rỗng
            int val = front_node->data;
            Node* temp = front_node;
            front_node = front_node->next;  // đầu trỏ xuống node kế
            if (!front_node) back_node = nullptr;  // queue trống
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
            new_node.next = self.top_node  # node mới trỏ đến đỉnh hiện tại
            self.top_node = new_node       # cập nhật đỉnh

        def pop(self):
            if not self.top_node:
                return None                # stack rỗng
            val = self.top_node.data
            self.top_node = self.top_node.next  # đỉnh trỏ xuống node kế
            return val

    class Queue:
        def __init__(self):
            self.front_node = None
            self.back_node = None

        def push(self, val):
            new_node = Node(val)
            if self.back_node:
                self.back_node.next = new_node  # nối vào cuối hàng đợi
            else:
                self.front_node = new_node      # hàng đợi rỗng
            self.back_node = new_node           # cập nhật đuôi

        def pop(self):
            if not self.front_node:
                return None                    # queue rỗng
            val = self.front_node.data
            self.front_node = self.front_node.next  # đầu trỏ xuống node kế
            if not self.front_node:
                self.back_node = None          # queue trống
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

### Lỗi thường gặp: SAI / ĐÚNG

**Lỗi 1: Quên gán `nullptr` cho node mới**

```cpp
// SAI: next rác → duyệt print() chạy lung tung / crash
Node* newNode = new Node(val);
// quên newNode->next = head;

// ĐÚNG: luôn khởi tạo next
Node* newNode = new Node(val);  // constructor đã gán next = nullptr
newNode->next = head;
```

**Lỗi 2: Quên cập nhật `tail` (doubly list / queue)**

```cpp
// SAI: xóa node cuối mà không sửa tail → tail trỏ vào vùng đã delete
if (node->next) node->next->prev = node->prev;
// quên dòng else tail = node->prev;

// ĐÚNG:
if (node->next) node->next->prev = node->prev;
else tail = node->prev;  // node là tail thì dời tail về trước
```

Tương tự với singly list có `tail`: `pushBack` vào danh sách rỗng phải gán cả `head` và `tail`; `remove` node cuối phải dời `tail`.

**Lỗi 3: Dùng con trỏ sau `delete` (use-after-free)**

```cpp
// SAI: dùng temp sau khi giải phóng
Node* temp = cur->next;
cur->next = cur->next->next;
delete temp;
cout << temp->data;  // SAI: temp đã bị thu hồi!

// ĐÚNG: sau delete thì không chạm vào temp nữa
Node* temp = cur->next;
cur->next = temp->next;
delete temp;
temp = nullptr;  // gán nullptr để lỡ dùng lại sẽ crash rõ ràng thay vì lỗi âm thầm
```

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

Luyện tập trực tiếp trên [FPTOJ](https://fptoj.com) — tất cả bài đều có testcase đầy đủ và chấm tự động.

| Mã bài | Tên bài tập | Độ khó | Chủ đề |
|---|---|---|---|
| [`ll-basic`](https://fptoj.com/problem/ll-basic) | Danh sách liên kết cơ bản | ⭐ | Thao tác cơ bản (push, insert, remove, print) |
| [`ll-search`](https://fptoj.com/problem/ll-search) | Tìm kiếm trong danh sách | ⭐ | Duyệt tuyến tính |
| [`ll-reverse`](https://fptoj.com/problem/ll-reverse) | Đảo ngược danh sách | ⭐⭐ | Đảo ngược con trỏ |
| [`ll-merge`](https://fptoj.com/problem/ll-merge) | Gộp hai danh sách | ⭐⭐ | Merge hai danh sách đã sắp xếp |
| [`ll-middle`](https://fptoj.com/problem/ll-middle) | Phần tử ở giữa | ⭐⭐ | Two pointers (slow/fast) |
| [`ll-remove-nth`](https://fptoj.com/problem/ll-remove-nth) | Xóa phần tử thứ N từ cuối | ⭐⭐ | Two pointers |
| [`ll-cycle`](https://fptoj.com/problem/ll-cycle) | Phát hiện chu trình | ⭐⭐⭐ | Floyd's cycle detection |
| [`ll-josephus`](https://fptoj.com/problem/ll-josephus) | Josephus Problem | ⭐⭐⭐ | Vòng tròn xóa người |

---

## Tài liệu tham khảo

- [GeeksforGeeks — Linked List](https://www.geeksforgeeks.org/dsa/linked-list-data-structure/)
- [CP-Algorithms — Linked List](https://cp-algorithms.com/)
- [YouTube — Linked List (takeuforward)](https://www.youtube.com/watch?v=Nq7ok6w23SA)

**Bài tiếp theo:** [Bài 11: Queue cơ bản](queue.md)
