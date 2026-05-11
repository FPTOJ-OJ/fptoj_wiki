# Bài 7: Mảng, Danh Sách Liên Kết và Stack

> **Tác giả:** Hà Trí Kiên
> **Nội dung tham khảo từ:** VNOI Wiki - Mảng và danh sách liên kết, Stack, Mảng cộng dồn và mảng hiệu

## 1. Mảng vs Danh sách liên kết

### Ẩn dụ: Dãy ghế trong rạp chiếu phim vs Xích đu nối đuôi

**Mảng (Array)** = Dãy ghế trong rạp: mỗi ghế có số thứ tự cố định. Muốn ngồi ghế số 5 → đi thẳng đến ghế 5. Nhưng muốn thêm 1 ghế vào giữa → phải dời cả dãy!

**Danh sách liên kết (Linked List)** = Xích đu nối đuôi nhau: mỗi xích đu biết "xích đu tiếp theo là ai". Muốn thêm 1 xích đu → chỉ cần nối lại. Nhưng muốn tìm xích đu số 5 → phải đu từ đầu!

| Thao tác | Mảng | Danh sách liên kết |
|----------|------|---------------------|
| Truy cập phần tử thứ i | **O(1)** | O(N) |
| Thêm/xóa ở đầu | O(N) | **O(1)** |
| Thêm/xóa ở cuối | O(1) | O(1) (nếu biết con trỏ cuối) |
| Thêm/xóa ở giữa | O(N) | O(1) (nếu biết vị trí) |

### Code C++: Danh sách liên kết đơn giản

```cpp
struct Node {
    int data;        // Dữ liệu
    Node* next;      // Con trỏ trỏ đến node tiếp theo
};

// Thêm node mới vào đầu danh sách - O(1)
Node* addFirst(Node* head, int value) {
    Node* newNode = new Node();
    newNode->data = value;
    newNode->next = head;    // Trỏ đến node cũ
    return newNode;          // Node mới là head
}

// Duyệt toàn bộ danh sách - O(N)
void printList(Node* head) {
    Node* cur = head;
    while (cur != NULL) {
        cout << cur->data << " ";
        cur = cur->next;
    }
}
```

### Code Python

```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

# Thêm node vào đầu - O(1)
def add_first(head, value):
    new_node = Node(value)
    new_node.next = head
    return new_node
```

---

## 2. Stack (Ngăn xếp)

### Ẩn dụ: Chồng dĩa trong nhà hàng

Bạn đang rửa dĩa và xếp chồng lên nhau. Khi cần lấy dĩa → chỉ lấy được **dĩa trên cùng**! (= dĩa được xếp vào sau cùng)

**LIFO** = Last In, First Out (Vào sau, ra trước)

### Các thao tác cơ bản

| Thao tác | Ý nghĩa | Độ phức tạp |
|----------|----------|-------------|
| `push(x)` | Thêm x vào đỉnh stack | O(1) |
| `pop()` | Loại bỏ phần tử ở đỉnh | O(1) |
| `top()` | Xem phần tử ở đỉnh | O(1) |
| `empty()` | Kiểm tra stack rỗng | O(1) |

### Ứng dụng 1: Kiểm tra dãy ngoặc đúng

```cpp
bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(') {
            st.push(c);              // Thêm dấu mở ngoặc
        } else {
            if (st.empty()) return false;  // Không có dấu mở!
            st.pop();                // Ghép cặp
        }
    }
    return st.empty();  // Còn dấu mở → sai
}
```

### Ứng dụng 2: Stack đơn điệu - Tìm phần tử lớn hơn bên trái

```cpp
// Với mỗi phần tử, tìm phần tử lớn hơn gần nhất bên trái
vector<int> findGreater(vector<int>& a) {
    stack<int> st;
    vector<int> result(a.size(), -1);
    
    for (int i = 0; i < a.size(); i++) {
        // Loại bỏ các phần tử nhỏ hơn hoặc bằng
        while (!st.empty() && st.top() <= a[i])
            st.pop();
        
        if (!st.empty())
            result[i] = st.top();   // Phần tử lớn hơn gần nhất
        
        st.push(a[i]);              // Thêm phần tử hiện tại
    }
    return result;
}
// Độ phức tạp: O(N) - mỗi phần tử push/pop tối đa 1 lần!
```

### Code Python

```python
# Kiểm tra dãy ngoặc đúng
def is_valid(s):
    st = []
    for c in s:
        if c == '(':
            st.append(c)
        else:
            if not st: return False
            st.pop()
    return len(st) == 0
```

---

## 3. Mảng cộng dồn (Prefix Sum)

### Ẩn dụ: Tổng quãng đường

Bạn đi xe từ điểm A → B → C → D. Thay vì tính lại quãng đường mỗi lần, bạn **ghi nhớ tổng quãng đường từ đầu đến mỗi điểm**:
- Đến A: 5km
- Đến B: 5+3 = 8km  
- Đến C: 8+7 = 15km

Muốn biết quãng đường từ B đến C? → 15 - 8 = 7km!

### Công thức

```
prefix[0] = 0
prefix[i] = prefix[i-1] + a[i-1]

Tổng đoạn [l, r] = prefix[r+1] - prefix[l]
```

### Code C++

```cpp
// Dựng mảng cộng dồn
vector<int> buildPrefixSum(vector<int>& a) {
    int n = a.size();
    vector<int> prefix(n + 1, 0);
    for (int i = 0; i < n; i++)
        prefix[i + 1] = prefix[i] + a[i];
    return prefix;
}

// Tính tổng đoạn [l, r] - O(1)
int rangeSum(vector<int>& prefix, int l, int r) {
    return prefix[r + 1] - prefix[l];
}
```

### Ứng dụng: Tìm đoạn con có tổng lớn nhất (Kadane's Algorithm)

```cpp
long long maxSubarraySum(vector<int>& a) {
    long long maxSum = a[0], curSum = a[0];
    for (int i = 1; i < a.size(); i++) {
        curSum = max((long long)a[i], curSum + a[i]);
        maxSum = max(maxSum, curSum);
    }
    return maxSum;
}
```

---

## 4. Mảng hiệu (Difference Array)

### Ẩn dụ: Cập nhật nhiệt độ

Bạn có nhiệt độ 7 ngày: [20, 22, 25, 23, 21, 24, 26]. Giả sử từ ngày 2 đến ngày 5, nhiệt độ tăng thêm 3 độ.

Thay vì cập nhật từng ngày, bạn chỉ cần ghi nhận: "Tại ngày 2: +3, Tại ngày 6: -3". Sau đó tính mảng cộng dồn lại!

### Code C++

```cpp
// Cập nhật đoạn [l, r] thêm k - O(1)
void update(vector<int>& diff, int l, int r, int k) {
    diff[l] += k;
    if (r + 1 < diff.size())
        diff[r + 1] -= k;
}

// Khôi phục mảng gốc từ mảng hiệu - O(N)
vector<int> restoreArray(vector<int>& diff) {
    vector<int> a(diff.size());
    a[0] = diff[0];
    for (int i = 1; i < diff.size(); i++)
        a[i] = a[i - 1] + diff[i];
    return a;
}
```

### Bài tập minh họa: Karen and Coffee (Codeforces 816B)

Có n truy vấn "tăng nhiệt độ đoạn [l,r] thêm 1". Sau đó hỏi: có bao nhiêu vị trí có giá trị ≥ k?

```cpp
int main() {
    int n, k, q;
    cin >> n >> k >> q;
    
    vector<int> diff(200002, 0);
    
    // Xử lý n truy vấn cập nhật - O(1) mỗi truy vấn
    for (int i = 0; i < n; i++) {
        int l, r; cin >> l >> r;
        diff[l]++;
        diff[r + 1]--;
    }
    
    // Khôi phục mảng và tính mảng cộng dồn
    vector<int> a(200002, 0), prefix(200002, 0);
    for (int i = 1; i <= 200000; i++) {
        a[i] = a[i - 1] + diff[i];
        prefix[i] = prefix[i - 1] + (a[i] >= k);
    }
    
    // Trả lời q câu hỏi - O(1) mỗi câu
    for (int i = 0; i < q; i++) {
        int l, r; cin >> l >> r;
        cout << prefix[r] - prefix[l - 1] << endl;
    }
}
```

---

---

## Tài liệu tham khảo

- [VNOI Wiki - Mảng và danh sách liên kết](https://wiki.vnoi.info/algo/data-structures/array-vs-linked-lists)
- [VNOI Wiki - Stack](https://wiki.vnoi.info/algo/data-structures/Stack)
- [VNOI Wiki - Mảng cộng dồn và mảng hiệu](https://wiki.vnoi.info/algo/data-structures/prefix-sum-and-difference-array)
- [GeeksforGeeks - Prefix Sum Array](https://www.geeksforgeeks.org/dsa/prefix-sum-array-implementation-applications-competitive-programming/)
- [YouTube - Prefix Sum (takeuforward)](https://www.youtube.com/watch?v=7pYJ6mYCEQs)

**Bài tiếp theo:** [Heap, DSU, Segment Tree, BIT →](08-heap-dsu-segment-tree-bit.md)
