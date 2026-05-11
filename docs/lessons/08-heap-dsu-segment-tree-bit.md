# Bài 8: Heap, DSU, Segment Tree, Fenwick Tree - CTDL "xịn"

> **Tác giả:** Hà Trí Kiên<br>
> **Nội dung tham khảo từ:** VNOI Wiki - Binary Heap, Disjoint Set Union, Segment Tree, Fenwick Tree

!!! warning "Lưu ý"
    Bài này giới thiệu tổng quan 4 cấu trúc dữ liệu quan trọng. Nếu bạn muốn tìm hiểu sâu hơn, hãy đọc các bài viết chuyên biệt trong phần Thuật Toán → Cấu trúc dữ liệu.

---

## 1. Heap (Đống) - Hàng đợi ưu tiên

### 1.1. Bài toán

Bạn có N bệnh nhân, mỗi người có mức độ nặng khác nhau. Ai nặng nhất → khám trước! Không phải FIFO (vào trước ra trước) mà là **ai ưu tiên nhất ra trước!**

Đây là mô hình **hàng đợi ưu tiên (Priority Queue)** — khác với hàng đợi thường (queue).

### 1.2. So sánh: Queue vs Priority Queue

| | Queue (hàng đợi thường) | Priority Queue (hàng đợi ưu tiên) |
|--|------------------------|-----------------------------------|
| Nguyên tắc | FIFO: Vào trước, ra trước | Ưu tiên nhất ra trước |
| Thao tác thêm | O(1) | O(log N) |
| Thao tác lấy | O(1) | O(log N) |
| Lấy min/max | O(N) | **O(1)** |
| Ví dụ | Hàng người xếp vé | Bệnh viện cấp cứu |

### 1.3. Binary Heap là gì?

Binary Heap là cách cài đặt Priority Queue bằng **cây nhị phân đầy đủ** lưu trong mảng.

**Hai tính chất quan trọng:**

1. **Cây nhị phân đầy đủ:** Mỗi nút có tối đa 2 con. Các tầng được lấp đầy từ trái sang phải.
2. **Tính chất đống:** Nút cha luôn lớn hơn (max-heap) hoặc nhỏ hơn (min-heap) cả 2 con.

### 1.4. Tại sao lưu trong mảng?

Thay vì dùng con trỏ (như cây nhị phân thường), Binary Heap lưu trực tiếp trong mảng:

```
Cây:        90
           /  \
         80    70
        / \   /
      50  60 65

Mảng: [90, 80, 70, 50, 60, 65]
Chỉ số: 0   1   2   3   4   5

Quy tắc: Với nút tại chỉ số i:
  - Con trái:  2*i + 1
  - Con phải:  2*i + 2
  - Cha:       (i - 1) / 2
```

**Tại sao hay?** Không cần con trỏ! Truy cập con/cha chỉ bằng phép tính chỉ số → O(1), tiết kiệm bộ nhớ.

### 1.5. Hai thao tác cốt lõi

#### Thao tác "đẩy lên" (sift-up / bubble-up) — khi thêm phần tử

**Bước 1:** Thêm phần tử vào cuối mảng (vị trí lá cuối cùng)

**Bước 2:** So sánh với cha. Nếu vi phạm tính chất đống → đổi chỗ với cha

**Lặp lại** bước 2 cho đến khi đúng vị trí

```
Thêm 85 vào max-heap [90, 80, 70, 50, 60, 65]:

Bước 1: Thêm vào cuối → [90, 80, 70, 50, 60, 65, 85]
                                      Cây:    90
                                            /    \
                                          80      70
                                         / \    / \
                                        50  60 65  85  ← mới thêm

Bước 2: 85 > cha(70)? → Đúng! Đổi chỗ
         [90, 80, 85, 50, 60, 65, 70]
                        Cây:    90
                              /    \
                            80      85  ← đã lên
                           / \    / \
                          50  60 65  70

Bước 3: 85 > cha(90)? → Sai! Dừng.

Kết quả: [90, 80, 85, 50, 60, 65, 70] ✅
```

**Độ phức tạp:** O(log N) — cao nhất bằng chiều cao cây = log₂(N)

#### Thao tác "đẩy xuống" (sift-down / heapify) — khi lấy phần tử lớn nhất

**Bước 1:** Lấy phần tử gốc (lớn nhất) ra

**Bước 2:** Đưa phần tử cuối cùng lên gốc

**Bước 3:** So sánh với 2 con. Đổi chỗ với con lớn hơn. Lặp lại cho đến khi đúng

```
Lấy max từ heap [90, 80, 85, 50, 60, 65, 70]:

Bước 1: Lấy 90 ra. Đưa 70 lên gốc → [70, 80, 85, 50, 60, 65]

Bước 2: 70 < con lớn nhất(85)? → Đúng! Đổi chỗ với 85
         [85, 80, 70, 50, 60, 65]
                Cây:    85
                      /    \
                    80      70
                   / \    /
                  50  60 65

Bước 3: 70 < con lớn nhất(65)? → Sai! Dừng.

Kết quả: Heap = [85, 80, 70, 50, 60, 65], trả về 90 ✅
```

### 1.6. Code C++: Cài đặt thủ công

```cpp
struct MaxHeap {
    vector<int> a;  // Mảng lưu heap
    
    // Lấy chỉ số con trái, con phải, cha
    int left(int i)  { return 2 * i + 1; }
    int right(int i) { return 2 * i + 2; }
    int parent(int i) { return (i - 1) / 2; }
    
    // Thêm phần tử - O(log N)
    void push(int val) {
        a.push_back(val);
        // Đẩy lên cho đến khi đúng vị trí
        int i = a.size() - 1;
        while (i > 0 && a[parent(i)] < a[i]) {
            swap(a[parent(i)], a[i]);
            i = parent(i);
        }
    }
    
    // Lấy phần tử lớn nhất - O(log N)
    int pop() {
        int maxVal = a[0];
        a[0] = a.back();   // Đưa phần tử cuối lên đầu
        a.pop_back();
        
        // Đẩy xuống cho đến khi đúng vị trí
        heapify(0);
        return maxVal;
    }
    
    // Đẩy xuống từ chỉ số i
    void heapify(int i) {
        int largest = i;
        int l = left(i), r = right(i);
        
        if (l < a.size() && a[l] > a[largest])
            largest = l;
        if (r < a.size() && a[r] > a[largest])
            largest = r;
        
        if (largest != i) {
            swap(a[i], a[largest]);
            heapify(largest);  // Tiếp tục đẩy xuống
        }
    }
    
    int top() { return a[0]; }        // Xem phần tử lớn nhất - O(1)
    int size() { return a.size(); }
    bool empty() { return a.empty(); }
};
```

### 1.7. Code C++: Dùng thư viện

```cpp
#include <queue>
using namespace std;

int main() {
    // Max-Heap (mặc định trong C++)
    priority_queue<int> maxHeap;
    maxHeap.push(5);    // Thêm - O(log N)
    maxHeap.push(10);
    maxHeap.push(3);
    cout << maxHeap.top();  // 10 (phần tử lớn nhất) - O(1)
    maxHeap.pop();          // Xóa phần tử lớn nhất - O(log N)
    
    // Min-Heap (dùng greater<>)
    priority_queue<int, vector<int>, greater<int>> minHeap;
    minHeap.push(5);
    minHeap.push(10);
    minHeap.push(3);
    cout << minHeap.top();  // 3 (phần tử nhỏ nhất)
}
```

### 1.8. Code Python

```python
import heapq

# Python CHỈ có min-heap. Muốn max-heap → đảo dấu!

# Min-Heap
minHeap = []
heapq.heappush(minHeap, 5)    # Thêm - O(log N)
heapq.heappush(minHeap, 10)
heapq.heappush(minHeap, 3)
print(minHeap[0])              # 3 (phần tử nhỏ nhất) - O(1)
heapq.heappop(minHeap)         # Xóa phần tử nhỏ nhất - O(log N)

# Max-Heap (đảo dấu)
maxHeap = []
heapq.heappush(maxHeap, -5)    # Push -x
heapq.heappush(maxHeap, -10)
heapq.heappush(maxHeap, -3)
print(-maxHeap[0])              # 10 (phần tử lớn nhất) — nhớ đảo dấu lại!
```

### 1.9. Ứng dụng: Tìm K phần tử lớn nhất

**Bài toán:** Cho mảng N phần tử, tìm K phần tử lớn nhất.

**Ý tưởng:** Dùng min-heap kích thước K. Khi thêm phần tử mới, nếu heap lớn hơn K → loại phần tử nhỏ nhất (vì nó "yếu nhất" trong K+1 phần tử).

```cpp
// O(N log K) — nhanh hơn sort O(N log N) khi K << N
vector<int> findTopK(vector<int>& a, int k) {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    for (int x : a) {
        minHeap.push(x);
        if ((int)minHeap.size() > k)
            minHeap.pop();  // Loại phần tử nhỏ nhất
    }
    vector<int> result;
    while (!minHeap.empty()) {
        result.push_back(minHeap.top());
        minHeap.pop();
    }
    return result;
}
```

```python
import heapq

def find_top_k(a, k):
    minHeap = []
    for x in a:
        heapq.heappush(minHeap, x)
        if len(minHeap) > k:
            heapq.heappop(minHeap)  # Loại phần tử nhỏ nhất
    return sorted(minHeap, reverse=True)
```

### 1.10. Khi nào dùng Heap?

| Tình huống | Dùng Heap? |
|-----------|-----------|
| Cần lấy min/max liên tục | ✅ O(1) cho xem, O(log N) cho xóa |
| Tìm K phần tử lớn/nhỏ nhất | ✅ O(N log K) |
| Hàng đợi ưu tiên (mô phỏng sự kiện) | ✅ |
| Cần tìm phần tử bất kỳ trong heap | ❌ Không hỗ trợ — phải dùng `set` |

---

## 2. DSU (Disjoint Set Union) - Gộp tập hợp

### 2.1. Bài toán thực tế

Bạn có N người. Các sự kiện xảy ra:

- "A kết bạn với B" → A và B cùng nhóm
- "C kết bạn với D" → C và D cùng nhóm  
- "A kết bạn với C" → {A, B} và {C, D} gộp thành {A, B, C, D}
- "Hỏi: A và D có cùng nhóm không?" → **Có!**

DSU giải quyết bài toán này với 2 thao tác gần như **O(1)**!

### 2.2. Ý tưởng: "Trưởng nhóm"

Mỗi tập hợp có 1 "trưởng nhóm" (đại diện). Muốn kiểm tra 2 phần tử cùng tập hợp → so sánh trưởng nhóm.

```
Ban đầu:  mỗi người là 1 nhóm riêng
          parent = [1, 2, 3, 4, 5]

union(1, 2):  parent[2] = 1  → {1, 2}
              parent = [1, 1, 3, 4, 5]

union(3, 4):  parent[4] = 3  → {3, 4}
              parent = [1, 1, 3, 3, 5]

union(1, 3):  parent[3] = 1  → {1, 2, 3, 4}
              parent = [1, 1, 1, 3, 5]
              Nhưng wait! parent[4] = 3, mà parent[3] = 1
              → find(4) đi: 4 → 3 → 1  (= trưởng nhóm)

same_group(2, 4)?
  find(2): 2 → 1
  find(4): 4 → 3 → 1
  Cả hai đều có trưởng nhóm = 1 → CÓ! ✅
```

### 2.3. Tối ưu 1: Nén đường đi (Path Compression)

**Vấn đề:** Nếu cây dài (1→2→3→4→5), mỗi lần `find(5)` phải đi 4 bước!

**Giải pháp:** Khi tìm trưởng nhóm, gán **trực tiếp** cho tất cả nút trên đường đi trỏ đến trưởng nhóm.

```cpp
// KHÔNG nén: O(N) trong trường hợp xấu
int find_set(int v) {
    if (v == parent[v]) return v;
    return find_set(parent[v]);  // Không lưu lại!
}

// CÓ nén: O(α(N)) ≈ O(1) trung bình
int find_set(int v) {
    if (v == parent[v]) return v;
    return parent[v] = find_set(parent[v]);  // Gán lại! ← Đây là nén đường đi
}
```

```
Trước nén:  find(5): 5 → 4 → 3 → 2 → 1 (4 bước)

Sau nén:    parent[5] = 1, parent[4] = 1, parent[3] = 1, parent[2] = 1
            find(5): 5 → 1 (1 bước!)
```

**α(N) là gì?** Là hàm nghịch đảo Ackermann. Với N = 10^600, α(N) ≤ 5. Tức là thực tế **hằng số**!

### 2.4. Tối ưu 2: Gộp theo kích thước (Union by Size)

**Vấn đề:** Nếu always gộp `parent[a] = b`, cây có thể cao O(N).

**Giải pháp:** Luôn gộp cây nhỏ vào cây lớn → chiều cao tối đa O(log N).

```
Gộp bừa (không tối ưu):  Cây có thể dài: 1 → 2 → 3 → 4 → 5 → ... → N

Gộp theo kích thước:      Cây luôn ngắn:
  size[1]=1, size[2]=1 → gộp: cây cao 1
  size[3]=1, size[4]=1 → gộp: cây cao 1
  Gộp {1,2} với {3,4}: cả hai cao 1 → cây mới cao 2
  Không bao giờ cao quá log₂(N)!
```

### 2.5. Code C++: DSU hoàn chỉnh

```cpp
struct DSU {
    vector<int> parent, sz;
    
    DSU(int n) {
        parent.resize(n + 1);
        sz.resize(n + 1, 1);
        for (int i = 1; i <= n; i++)
            parent[i] = i;  // Mỗi phần tử là 1 nhóm riêng
    }
    
    // Tìm trưởng nhóm — O(α(N)) ≈ O(1)
    int find_set(int v) {
        if (v == parent[v]) return v;
        return parent[v] = find_set(parent[v]);  // Nén đường đi
    }
    
    // Gộp 2 nhóm — O(α(N)) ≈ O(1)
    void union_sets(int a, int b) {
        a = find_set(a);
        b = find_set(b);
        if (a != b) {
            if (sz[a] < sz[b]) swap(a, b);  // Gộp cây nhỏ vào cây lớn
            parent[b] = a;
            sz[a] += sz[b];
        }
    }
    
    // Kiểm tra cùng nhóm — O(1)
    bool same_group(int a, int b) {
        return find_set(a) == find_set(b);
    }
    
    // Lấy kích thước nhóm — O(1)
    int get_size(int v) {
        return sz[find_set(v)];
    }
};
```

### 2.6. Code Python

```python
class DSU:
    def __init__(self, n):
        self.parent = list(range(n + 1))
        self.size = [1] * (n + 1)
    
    def find(self, v):
        if v == self.parent[v]:
            return v
        self.parent[v] = self.find(self.parent[v])  # Nén đường đi
        return self.parent[v]
    
    def union(self, a, b):
        a, b = self.find(a), self.find(b)
        if a != b:
            if self.size[a] < self.size[b]:
                a, b = b, a  # Gộp nhỏ vào lớn
            self.parent[b] = a
            self.size[a] += self.size[b]
    
    def same_group(self, a, b):
        return self.find(a) == self.find(b)
```

### 2.7. Minh họa chạy chi tiết

```
Cho 7 phần tử, thực hiện:
  union(1, 2), union(3, 4), union(5, 6), union(1, 3), union(5, 7), union(1, 5)

Ban đầu: parent = [_, 1, 2, 3, 4, 5, 6, 7], size = [_, 1, 1, 1, 1, 1, 1, 1]

union(1, 2):  find(1)=1, find(2)=2
              size[1] >= size[2] → parent[2] = 1, size[1] = 2
              parent = [_, 1, 1, 3, 4, 5, 6, 7], size = [_, 2, 1, 1, 1, 1, 1, 1]
              Cây: {1, 2}

union(3, 4):  find(3)=3, find(4)=4
              parent[4] = 3, size[3] = 2
              parent = [_, 1, 1, 3, 3, 5, 6, 7], size = [_, 2, 1, 2, 1, 1, 1, 1]
              Cây: {1, 2}, {3, 4}

union(5, 6):  parent[6] = 5, size[5] = 2
              Cây: {1, 2}, {3, 4}, {5, 6}

union(1, 3):  find(1)=1, find(3)=3
              size[1] >= size[3] → parent[3] = 1, size[1] = 4
              parent = [_, 1, 1, 1, 3, 5, 6, 7], size = [_, 4, 1, 2, 1, 2, 1, 1]
              Cây: {1, 2, 3, 4}, {5, 6}
              Lưu ý: parent[4] = 3, nhưng find(4) → 4→3→1 (nén: parent[4]=1)

union(5, 7):  parent[7] = 5, size[5] = 3
              Cây: {1, 2, 3, 4}, {5, 6, 7}

union(1, 5):  find(1)=1, find(5)=5
              size[1]=4 >= size[5]=3 → parent[5] = 1, size[1] = 7
              Cây: {1, 2, 3, 4, 5, 6, 7} (tất cả cùng nhóm)

same_group(4, 7)?
  find(4): 4→1 (đã nén)
  find(7): 7→5→1 (nén: parent[7]=1)
  Cả hai = 1 → CÓ! ✅
```

### 2.8. Khi nào dùng DSU?

| Tình huống | Dùng DSU? |
|-----------|----------|
| Kiểm tra 2 đỉnh có cùng thành phần liên thông | ✅ |
| Bài toán Kruskal (tìm MST) | ✅ |
| Phát hiện chu trình trong đồ thị vô hướng | ✅ |
| Gộp tập hợp, đếm số tập hợp | ✅ |
| Cần tách tập hợp (split) | ❌ DSU không hỗ trợ tách |

---

## 3. Segment Tree (Cây Phân Đoạn)

### 3.1. Bài toán

Bạn là lớp trưởng. Cả lớp có N học sinh, mỗi người có điểm số. Giáo viên hỏi:

- "Tổng điểm học sinh từ số 5 đến số 12 là bao nhiêu?"
- "Cập nhật điểm học sinh số 7 thành 10!"

Với mảng thường:

- Mỗi câu hỏi tổng đoạn: O(N) — phải duyệt từ 5 đến 12
- N câu hỏi: O(N²) — **quá chậm** khi N = 10⁵!

Segment Tree giải quyết: mỗi thao tác chỉ **O(log N)**!

### 3.2. Ý tưởng cốt lõi: "Chia để trị với cây"

Mấu chốt: **tính trước** kết quả cho các đoạn con, rồi **ghép lại** khi cần truy vấn.

```
Mảng: [2, 5, 3, 7, 1, 4, 6, 3]

Thay vì lưu từng phần tử, ta chia mảng thành các đoạn:
  - Đoạn [0,7]: tổng = 31
    - Đoạn [0,3]: tổng = 17
      - Đoạn [0,1]: tổng = 7
        - Đoạn [0,0]: tổng = 2  (lá)
        - Đoạn [1,1]: tổng = 5  (lá)
      - Đoạn [2,3]: tổng = 10
        - Đoạn [2,2]: tổng = 3  (lá)
        - Đoạn [3,3]: tổng = 7  (lá)
    - Đoạn [4,7]: tổng = 14
      - Đoạn [4,5]: tổng = 5
        - ...
      - Đoạn [6,7]: tổng = 9
        - ...
```

### 3.3. Cấu trúc cây

Segment Tree là **cây nhị phân đầy đủ**:

- **Nút lá:** Lưu giá trị của 1 phần tử (mảng gốc)
- **Nút trong:** Lưu kết quả gộp (tổng, min, max...) của 2 con
- **Nút gốc:** Lưu kết quả cho toàn mảng

```
Cây Segment Tree cho mảng [2, 5, 3, 7, 1, 4, 6, 3]:

                    31 [0,7]
                  /          \
            17 [0,3]        14 [4,7]
           /        \       /        \
        7 [0,1]  10 [2,3] 5 [4,5]  9 [6,7]
        /    \    /    \    /    \    /    \
      2[0] 5[1] 3[2] 7[3] 1[4] 4[5] 6[6] 3[7]

Mảng lưu cây (1-indexed): tree[1] = 31, tree[2] = 17, tree[3] = 14, ...
  - tree[i] → con trái: tree[2*i], con phải: tree[2*i+1]
```

### 3.4. Truy vấn tổng đoạn [l, r] — Thế nào là "gộp"?

Khi hỏi "tổng đoạn [2, 5]", ta duyệt cây từ trên xuống:

```
Tại gốc [0, 7]: không nằm hoàn toàn trong [2, 5] → chia đôi
  Tại [0, 3]: giao với [2, 5] → tiếp tục chia
    Tại [0, 1]: KHÔNG giao với [2, 5] → trả về 0 (bỏ qua!)
    Tại [2, 3]: NẰM HOÀN TOÀN trong [2, 5] → trả về 10 (không cần chia thêm!)
  Tại [4, 7]: giao với [2, 5] → tiếp tục chia
    Tại [4, 5]: NẰM HOÀN TOÀN trong [2, 5] → trả về 5
    Tại [6, 7]: KHÔNG giao với [2, 5] → trả về 0

Kết quả: 10 + 5 = 15 = 3 + 7 + 1 + 4 ✅
```

**3 trường hợp tại mỗi nút:**

1. **Nằm ngoài hoàn toàn** → trả về giá trị "rỗng" (0 cho tổng, +∞ cho min)
2. **Nằm trong hoàn toàn** → trả về giá trị tại nút (không cần duyệt thêm!)
3. **Giao một phần** → chia đôi, gọi đệ quy 2 con, gộp kết quả

### 3.5. Cập nhật a[pos] = val

Thay đổi 1 phần tử → cần cập nhật tất cả nút "bao chứa" vị trí đó.

```
Cập nhật a[3] = 10 (từ 7 thành 10):

Từ lá tree[11] (a[3]): gán = 10
  → Cha tree[5] = tree[10] + tree[11] = 3 + 10 = 13
    → Cha tree[2] = tree[4] + tree[5] = 7 + 13 = 20
      → Gốc tree[1] = tree[2] + tree[3] = 20 + 14 = 34

Chỉ cập nhật log₂(N) = 3 nút! (thay vì toàn bộ mảng)
```

### 3.6. Code C++ — Segment Tree cho tổng đoạn

```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 200005;
long long tree[4 * MAXN];  // Kích thước 4*N là đủ

// Xây dựng cây từ mảng a[] - O(N)
// node: chỉ số nút hiện tại trong mảng tree
// [start, end]: đoạn mà nút này quản lý
void build(int node, int start, int end, int a[]) {
    if (start == end) {
        // Nút lá: lưu giá trị 1 phần tử
        tree[node] = a[start];
        return;
    }
    int mid = (start + end) / 2;
    build(2 * node, start, mid, a);        // Xây con trái
    build(2 * node + 1, mid + 1, end, a);  // Xây con phải
    tree[node] = tree[2 * node] + tree[2 * node + 1];  // Gộp: tổng 2 con
}

// Truy vấn tổng đoạn [l, r] - O(log N)
long long query(int node, int start, int end, int l, int r) {
    // Trường hợp 1: Nằm ngoài hoàn toàn → trả về 0
    if (r < start || end < l) return 0;
    
    // Trường hợp 2: Nằm trong hoàn toàn → trả về giá trị nút
    if (l <= start && end <= r) return tree[node];
    
    // Trường hợp 3: Giao một phần → chia đôi
    int mid = (start + end) / 2;
    long long leftSum = query(2 * node, start, mid, l, r);
    long long rightSum = query(2 * node + 1, mid + 1, end, l, r);
    return leftSum + rightSum;  // Gộp kết quả
}

// Cập nhật a[pos] = val - O(log N)
void update(int node, int start, int end, int pos, long long val) {
    if (start == end) {
        // Đến lá → cập nhật
        tree[node] = val;
        return;
    }
    int mid = (start + end) / 2;
    if (pos <= mid)
        update(2 * node, start, mid, pos, val);        // Sửa con trái
    else
        update(2 * node + 1, mid + 1, end, pos, val);  // Sửa con phải
    tree[node] = tree[2 * node] + tree[2 * node + 1];  // Cập nhật nút cha
}

int main() {
    int n, q;
    cin >> n >> q;
    int a[n];
    for (int i = 0; i < n; i++) cin >> a[i];
    
    build(1, 0, n - 1, a);  // Xây cây từ nút gốc (chỉ số 1)
    
    while (q--) {
        int type, l, r;
        cin >> type >> l >> r;
        if (type == 1)          // Cập nhật: a[l] = r
            update(1, 0, n - 1, l - 1, r);
        else                    // Truy vấn: tổng [l, r]
            cout << query(1, 0, n - 1, l - 1, r - 1) << "\n";
    }
}
```

### 3.7. Code Python — Segment Tree

```python
import sys
input = sys.stdin.readline

class SegmentTree:
    def __init__(self, a):
        self.n = len(a)
        self.tree = [0] * (4 * self.n)
        self._build(1, 0, self.n - 1, a)

    def _build(self, node, start, end, a):
        if start == end:
            self.tree[node] = a[start]
            return
        mid = (start + end) // 2
        self._build(2 * node, start, mid, a)
        self._build(2 * node + 1, mid + 1, end, a)
        self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]

    def query(self, node, start, end, l, r):
        if r < start or end < l:
            return 0
        if l <= start and end <= r:
            return self.tree[node]
        mid = (start + end) // 2
        return (self.query(2 * node, start, mid, l, r) +
                self.query(2 * node + 1, mid + 1, end, l, r))

    def update(self, node, start, end, pos, val):
        if start == end:
            self.tree[node] = val
            return
        mid = (start + end) // 2
        if pos <= mid:
            self.update(2 * node, start, mid, pos, val)
        else:
            self.update(2 * node + 1, mid + 1, end, pos, val)
        self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]
```

### 3.8. Biến thể: Segment Tree cho min/max

Chỉ cần thay phép gộp `+` thành `min()` hoặc `max()`:

```cpp
// Gộp: min 2 con (thay vì tổng)
tree[node] = min(tree[2 * node], tree[2 * node + 1]);

// Giá trị "rỗng" khi query ngoài đoạn: INT_MAX (thay vì 0)
if (r < start || end < l) return INT_MAX;
```

### 3.9. Tóm tắt độ phức tạp

| Thao tác | Độ phức tạp | Giải thích |
|----------|-------------|-----------|
| Xây dựng | O(N) | Duyệt qua N lá + N-1 nút trong |
| Truy vấn | O(log N) | Mỗi bước chia đôi → đi tối đa log₂(N) nút |
| Cập nhật | O(log N) | Đi từ lá lên gốc → log₂(N) nút |
| Bộ nhớ | O(4N) | Cây nhị phân đầy đủ cần ≤ 4N nút |

---

## 4. Fenwick Tree (BIT - Binary Indexed Tree)

### 4.1. Bài toán

Tương tự Segment Tree: cần truy vấn tổng đoạn + cập nhật điểm. Nhưng muốn code **ngắn hơn**, dễ nhớ hơn.

### 4.2. So sánh với Prefix Sum và Segment Tree

| | Prefix Sum | BIT | Segment Tree |
|--|-----------|-----|-------------|
| Tính tổng [1..p] | **O(1)** | O(log N) | O(log N) |
| Cập nhật a[i] | O(N) | **O(log N)** | O(log N) |
| Cập nhật đoạn | O(1) (diff array) | O(N log N) | O(log N) với lazy |
| Code ngắn? | ✅ | ✅ | ❌ Dài hơn |
| Linh hoạt? | ❌ Chỉ tổng | Trung bình | ✅ Rất linh hoạt |

### 4.3. Ý tưởng: "Đóng gói" bằng bit

BIT chia mảng thành các "block" có **độ dài là lũy thừa của 2**, dựa trên **bit thấp nhất** của chỉ số.

**Bit thấp nhất (lowest set bit):** 
Trong máy tính, số âm được lưu dưới dạng **số bù 2** (đảo bit và cộng 1). Khi bạn thực hiện phép AND giữa `i` và `-i`, kết quả chỉ giữ lại duy nhất 1 bit ở vị trí thấp nhất đang được bật.

```
i & (-i)  →  bit thấp nhất của i

Ví dụ:
  i = 12 (1100₂)
 -i = -12 (bù 2: 0011₂ + 1 = 0100₂)
  i & (-i) = 1100₂ & 0100₂ = 0100₂ (là 4) → block dài 4
```

### 4.4. BIT hoạt động như thế nào?

Mỗi vị trí `i` trong BIT lưu tổng của một đoạn con:

```
bit[i] = tổng a[i - (i&(-i)) + 1] đến a[i]

Ví dụ với N = 8:
  bit[1] = a[1]                    (block dài 1)
  bit[2] = a[1] + a[2]            (block dài 2)
  bit[3] = a[3]                    (block dài 1)
  bit[4] = a[1] + a[2] + a[3] + a[4]  (block dài 4)
  bit[5] = a[5]                    (block dài 1)
  bit[6] = a[5] + a[6]            (block dài 2)
  bit[7] = a[7]                    (block dài 1)
  bit[8] = a[1] + a[2] + ... + a[8]  (block dài 8)
```

### 4.5. Truy vấn: Tổng từ 1 đến i

Để tính tổng a[1..i], ta **cộng các bit** theo hướng **giảm dần**:

```
Tính prefix_sum(13) = a[1] + ... + a[13]:

i = 13 = 1101₂:
  bit[13] += bit[13]   → i = 13 - 1 = 12    (13 & (-13) = 1)
  bit[12] += bit[12]   → i = 12 - 4 = 8     (12 & (-12) = 4)
  bit[8]  += bit[8]    → i = 8 - 8 = 0      (8 & (-8) = 8)
  Dừng!

Kết quả = bit[13] + bit[12] + bit[8]
        = a[13] + (a[12]+a[11]+a[10]+a[9]) + (a[1]+...+a[8])
        = a[1] + ... + a[13] ✅
```

### 4.6. Cập nhật: Cộng thêm delta vào vị trí i

Khi cập nhật a[i], cần cập nhật **tất cả bit "bao chứa" i** — đi theo hướng **tăng dần**:

```
Cập nhật a[5] += 3:

i = 5 = 101₂:
  bit[5] += 3     → i = 5 + 1 = 6     (5 & (-5) = 1)
  bit[6] += 3     → i = 6 + 2 = 8     (6 & (-6) = 2)
  bit[8] += 3     → i = 8 + 8 = 16    (8 & (-8) = 8)
  Dừng (16 > N)!

Cập nhật 3 bit: bit[5], bit[6], bit[8]
→ Mỗi cập nhật O(log N) bước
```

### 4.7. Code C++

```cpp
int bit[MAXN];  // Fenwick Tree (1-indexed!)

// Cập nhật: cộng thêm delta vào vị trí i - O(log N)
void update(int i, int delta) {
    for (; i <= n; i += i & (-i))  // Tăng dần
        bit[i] += delta;
}

// Truy vấn: tổng từ 1 đến i - O(log N)
int query(int i) {
    int sum = 0;
    for (; i > 0; i -= i & (-i))  // Giảm dần
        sum += bit[i];
    return sum;
}

// Tổng đoạn [l, r]
int rangeSum(int l, int r) {
    return query(r) - query(l - 1);
}
```

### 4.8. Code Python

```python
class FenwickTree:
    def __init__(self, n):
        self.n = n
        self.bit = [0] * (n + 1)  # 1-indexed

    def update(self, i, delta):
        while i <= self.n:
            self.bit[i] += delta
            i += i & (-i)  # Tăng dần

    def query(self, i):
        s = 0
        while i > 0:
            s += self.bit[i]
            i -= i & (-i)  # Giảm dần
        return s

    def range_sum(self, l, r):
        return self.query(r) - self.query(l - 1)
```

### 4.9. Minh họa xây dựng BIT

```
Mảng a: [_, 3, 1, 4, 1, 5, 9, 2] (1-indexed, a[0] bỏ qua)

Xây BIT:
  update(1, 3): bit[1]+=3, bit[2]+=3, bit[4]+=3, bit[8]+=3
  update(2, 1): bit[2]+=1, bit[4]+=1, bit[8]+=1
  update(3, 4): bit[3]+=4, bit[4]+=4, bit[8]+=4
  update(4, 1): bit[4]+=1, bit[8]+=1
  update(5, 5): bit[5]+=5, bit[6]+=5, bit[8]+=5
  update(6, 9): bit[6]+=9, bit[8]+=9
  update(7, 2): bit[7]+=2, bit[8]+=2

Kết quả: bit = [_, 3, 4, 4, 9, 5, 14, 2, 27]

Kiểm tra query(5) = bit[5] + bit[4] = 5 + 9 = 14 = 3+1+4+1+5 ✅
Kiểm tra query(7) = bit[7] + bit[6] + bit[4] = 2 + 14 + 9 = 25 = 3+1+4+1+5+9+2 ✅
```

### 4.10. Khi nào dùng BIT vs Segment Tree?

| Tình huống | Nên dùng |
|-----------|----------|
| Chỉ cần tổng đoạn + cập nhật điểm | **BIT** (code ngắn, nhanh) |
| Cần min/max + cập nhật điểm | **Segment Tree** |
| Cần cập nhật đoạn (lazy propagation) | **Segment Tree** |
| Cần persistent (lịch sử phiên bản) | **Segment Tree** |
| Code ngắn, dễ nhớ | **BIT** (chỉ 2 hàm!) |

---

## 5. Lưu ý / Cạm bẫy

### 5.1. DSU: Quên Path Compression

```cpp
// SAI: Không nén đường đi → O(N) mỗi find
int find_set(int v) {
    if (v == parent[v]) return v;
    return find_set(parent[v]);  // Không gán lại!
}

// ĐÚNG: Nén đường đi → O(α(N)) ≈ O(1)
int find_set(int v) {
    if (v == parent[v]) return v;
    return parent[v] = find_set(parent[v]);  // Gán lại!
}
```

**Hậu quả:** Không nén → DSU chạy O(N) mỗi find → TLE với N = 10⁶!

### 5.2. DSU: Quên Union by Size

```cpp
// SAI: Gộp bừa → cây có thể cao O(N)
parent[a] = b;

// ĐÚNG: Gộp cây nhỏ vào cây lớn
if (sz[a] < sz[b]) swap(a, b);
parent[b] = a;
sz[a] += sz[b];
```

### 5.3. Segment Tree: Quên kiểm tra ngoài đoạn

```cpp
// SAI: Không kiểm tra ngoài đoạn → kết quả sai
int query(...) {
    // Nếu [l,r] không giao với [start,end] → trả về giá trị rác!
}

// ĐÚNG: Luôn kiểm tra
if (r < start || end < l) return 0;  // Ngoài đoạn
```

### 5.4. BIT (Fenwick Tree): Luôn 1-indexed

```cpp
// SAI: Dùng BIT với index 0 → vòng lặp vô hạn!
update(0, delta);  // i += i & (-i) = 0 + 0 = 0 → lặp mãi!

// ĐÚNG: BIT luôn bắt đầu từ index 1
// Nếu mảng 0-indexed: cập nhật BIT tại index i+1
update(i + 1, delta);
```

### 5.5. BIT: Quên cập nhật khi thay đổi giá trị

```cpp
// SAI: Gán giá trị mới mà không trừ giá trị cũ
bit_update(pos, newVal);  // Chỉ cộng thêm newVal

// ĐÚNG: Phải trừ giá trị cũ
int oldVal = a[pos];
a[pos] = newVal;
bit_update(pos, newVal - oldVal);  // Cộng thêm hiệu
```

### 5.6. Segment Tree: Mảng 4*N

```cpp
// SAI: Cấp phát đúng N → không đủ chỗ cho cây!
int tree[MAXN];      // Chỉ N phần tử

// ĐÚNG: Cấp phát 4*N (hoặc 4*N + 5 để an toàn)
int tree[4 * MAXN];  // Đủ chỗ cho cây nhị phân đầy đủ
```

**Tại sao 4*N?** Cây nhị phân đầy đủ có ≤ 2*N nút. Nhưng dùng 1-indexed và có thể lệch → 4*N là an toàn.

### 5.7. Segment Tree: Quên cập nhật nút cha sau update

```cpp
// SAI: Chỉ cập nhật lá, không cập nhật nút cha
void update(int node, int start, int end, int pos, int val) {
    if (start == end) {
        tree[node] = val;
        return;  // Quên cập nhật cha!
    }
    // ...
}

// ĐÚNG: Luôn cập nhật cha sau khi sửa con
tree[node] = tree[2 * node] + tree[2 * node + 1];  // ← THÊM DÒNG NÀY
```

### 5.8. Heap trong Python: Luôn min-heap

```python
# Python heapq LUÔN là min-heap
# Muốn max-heap → đảo dấu:
heapq.heappush(heap, -x)       # Push -x
max_val = -heapq.heappop(heap)  # Pop và đảo dấu lại
```

### 5.9. DSU: find_set trong Python cần đệ quy có giới hạn

```python
# Python có giới hạn đệ quy mặc định ~1000
# Với N lớn, cần tăng giới hạn hoặc viết find_set không đệ quy:

def find(self, v):
    root = v
    while root != self.parent[root]:
        root = self.parent[root]
    # Nén đường đi
    while v != root:
        nxt = self.parent[v]
        self.parent[v] = root
        v = nxt
    return root
```

---

## 6. Tổng hợp: Khi nào dùng cái nào?

| Bài toán | Dùng gì |
|----------|---------|
| Chỉ tính tổng đoạn, không cập nhật | Prefix Sum |
| Cập nhật điểm + tính tổng đoạn | **BIT** hoặc Segment Tree |
| Cập nhật đoạn + truy vấn min/max | **Segment Tree** (lazy propagation) |
| Gộp tập hợp, kiểm tra liên thông | **DSU** |
| Hàng đợi ưu tiên (min/max liên tục) | **Heap** (priority_queue) |
| Tìm K phần tử lớn/nhỏ nhất | **Heap** (min-heap size K) |
| Code ngắn, dễ cài | **BIT** (2 hàm), **DSU** (3 hàm) |

---

## 7. Bài tập luyện tập

### Heap (Hàng đợi ưu tiên)

| Bài | Nền tảng | Độ khó | Ghi chú |
|-----|----------|--------|---------|
| [CSES - Concert Tickets](https://cses.fi/problemset/task/1091) | CSES | ⭐⭐ | Multiset / Heap |
| [CSES - Sliding Median](https://cses.fi/problemset/task/1076) | CSES | ⭐⭐⭐ | 2 Heap |
| [LeetCode - Kth Largest Element](https://leetcode.com/problems/kth-largest-element-in-an-array/) | LeetCode | ⭐⭐ | Min-Heap size K |

### DSU (Disjoint Set Union)

| Bài | Nền tảng | Độ khó | Ghi chú |
|-----|----------|--------|---------|
| [CSES - Road Construction](https://cses.fi/problemset/task/1676) | CSES | ⭐⭐ | DSU cơ bản |
| [CSES - Road Reparation](https://cses.fi/problemset/task/1675) | CSES | ⭐⭐ | Kruskal + DSU |
| [CSES - Cycle Finding](https://cses.fi/problemset/task/1678) | CSES | ⭐⭐⭐ | DSU phát hiện chu trình |
| [LeetCode - Number of Provinces](https://leetcode.com/problems/number-of-provinces/) | LeetCode | ⭐⭐ | Đếm thành phần liên thông |

### Segment Tree

| Bài | Nền tảng | Độ khó | Ghi chú |
|-----|----------|--------|---------|
| [CSES - Dynamic Range Sum Queries](https://cses.fi/problemset/task/1648) | CSES | ⭐⭐ | Segment Tree cơ bản |
| [CSES - Dynamic Range Min Queries](https://cses.fi/problemset/task/1649) | CSES | ⭐⭐ | Segment Tree Min |
| [CSES - Range Update Queries](https://cses.fi/problemset/task/1651) | CSES | ⭐⭐⭐ | Lazy Propagation |
| [CSES - Distinct Values Queries](https://cses.fi/problemset/task/1734) | CSES | ⭐⭐⭐ | Segment Tree + Offline |

### BIT (Fenwick Tree)

| Bài | Nền tảng | Độ khó | Ghi chú |
|-----|----------|--------|---------|
| [CSES - Dynamic Range Sum Queries](https://cses.fi/problemset/task/1648) | CSES | ⭐⭐ | BIT cơ bản |
| [CSES - Salary Queries](https://cses.fi/problemset/task/1144) | CSES | ⭐⭐⭐ | BIT + Coordinate Compression |
| [CSES - Prefix Sum Queries](https://cses.fi/problemset/task/2166) | CSES | ⭐⭐⭐ | BIT nâng cao |
| [LeetCode - Count of Smaller Numbers After Self](https://leetcode.com/problems/count-of-smaller-numbers-after-self/) | LeetCode | ⭐⭐⭐ | BIT / Segment Tree |

---

## Tài liệu tham khảo

- [CP-Algorithms - Segment Tree](https://cp-algorithms.com/data_structures/segment_tree.html)
- [CP-Algorithms - Fenwick Tree](https://cp-algorithms.com/data_structures/fenwick.html)
- [CP-Algorithms - DSU](https://cp-algorithms.com/data_structures/disjoint-set-union.html)
- [Codeforces - Efficient Segment Trees](https://codeforces.com/blog/entry/18051)
- [Topcoder - Binary Indexed Trees](https://www.topcoder.com/community/competitive-programming/tutorials/binary-indexed-trees/)
- [VNOI Wiki - Disjoint Set Union](https://wiki.vnoi.info/algo/data-structures/disjoint-set-union)
- [VNOI Wiki - Cây Phân Đoạn](https://wiki.vnoi.info/algo/data-structures/segment-tree-basic)
- [VNOI Wiki - Fenwick Tree](https://wiki.vnoi.info/algo/data-structures/fenwick)
- [YouTube - Segment Tree Playlist (takeuforward)](https://www.youtube.com/playlist?list=PLtfqa971vD5GTQjH9U0H6kiq9cQlFFa5k)

**Bài tiếp theo:** [BFS/DFS trên đồ thị →](10-bfs-dfs-do-thi.md)
