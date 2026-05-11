# Bài 8: Heap, DSU, Segment Tree, Fenwick Tree - CTDL "xịn"

> **Tác giả:** Hà Trí Kiên
> **Nội dung tham khảo từ:** VNOI Wiki - Binary Heap, Disjoint Set Union, Segment Tree, Fenwick Tree

## 1. Heap (Đống) - Hàng đợi ưu tiên

### Ẩn dụ: Hàng đợi bệnh viện

Bệnh viện có bệnh nhân nặng, nhẹ. Ai nặng nhất → khám trước! Không phải FIFO (vào trước ra trước) mà là **ai ưu tiên nhất ra trước!**

### Binary Heap

Lưu cây nhị phân đầy đủ trong mảng. Nút cha luôn lớn hơn (max-heap) hoặc nhỏ hơn (min-heap) cả 2 con.

```
Max-Heap:        Lưu trong mảng:
    9            [9, 7, 8, 3, 5, 6, 2]
   / \
  7   8
 / \ / \
3  5 6  2
```

### Code C++: Dùng thư viện

```cpp
#include <queue>
#include <vector>
using namespace std;

int main() {
    // Max-Heap (mặc định)
    priority_queue<int> maxHeap;
    maxHeap.push(5);    // Thêm - O(log N)
    maxHeap.push(10);
    maxHeap.push(3);
    cout << maxHeap.top();  // 10 (phần tử lớn nhất) - O(1)
    maxHeap.pop();          // Xóa phần tử lớn nhất - O(log N)
    
    // Min-Heap
    priority_queue<int, vector<int>, greater<int>> minHeap;
    minHeap.push(5);
    minHeap.push(10);
    minHeap.push(3);
    cout << minHeap.top();  // 3 (phần tử nhỏ nhất)
}
```

### Code Python: Dùng thư viện

```python
import heapq

# Min-Heap (mặc định trong Python)
minHeap = []
heapq.heappush(minHeap, 5)    # Thêm - O(log N)
heapq.heappush(minHeap, 10)
heapq.heappush(minHeap, 3)
print(minHeap[0])              # 3 (phần tử nhỏ nhất) - O(1)
heapq.heappop(minHeap)         # Xóa phần tử nhỏ nhất - O(log N)

# Max-Heap (đảo dấu)
maxHeap = []
heapq.heappush(maxHeap, -5)
heapq.heappush(maxHeap, -10)
heapq.heappush(maxHeap, -3)
print(-maxHeap[0])             # 10 (phần tử lớn nhất)
```

### Ứng dụng: Tìm K phần tử lớn nhất

```cpp
// Tìm 3 phần tử lớn nhất trong mảng - O(N log K)
vector<int> findTopK(vector<int>& a, int k) {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    for (int x : a) {
        minHeap.push(x);
        if (minHeap.size() > k)
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

### Code Python: Tìm K phần tử lớn nhất

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

---

## 2. DSU (Disjoint Set Union) - Gộp tập hợp

### Ẩn dụ: Bạn bè trên Facebook

Bạn A kết bạn với B, B kết bạn với C → A, B, C cùng nhóm bạn. Muốn kiểm tra "A và C có cùng nhóm không?" → Dùng DSU!

### 3 thao tác cơ bản

| Thao tác | Ý nghĩa | Độ phức tạp |
|----------|----------|-------------|
| `make_set(v)` | Tạo tập hợp mới chỉ có v | O(1) |
| `find_set(v)` | Tìm "trưởng nhóm" của v | O(α(N)) ≈ O(1) |
| `union_sets(a, b)` | Gộp 2 nhóm lại | O(α(N)) ≈ O(1) |

### Code C++: DSU với tối ưu

```cpp
struct DSU {
    vector<int> parent, sz;
    
    DSU(int n) {
        parent.resize(n + 1);
        sz.resize(n + 1, 1);
        for (int i = 1; i <= n; i++)
            parent[i] = i;  // Mỗi phần tử là 1 nhóm
    }
    
    int find_set(int v) {
        if (v == parent[v]) return v;
        return parent[v] = find_set(parent[v]);  // Nén đường đi!
    }
    
    void union_sets(int a, int b) {
        a = find_set(a);
        b = find_set(b);
        if (a != b) {
            if (sz[a] < sz[b]) swap(a, b);  // Gộp theo kích cỡ
            parent[b] = a;
            sz[a] += sz[b];
        }
    }
    
    bool same_group(int a, int b) {
        return find_set(a) == find_set(b);
    }
};

// Sử dụng
int main() {
    DSU dsu(10);
    dsu.union_sets(1, 2);
    dsu.union_sets(3, 4);
    dsu.union_sets(1, 4);  // Gộp {1,2} và {3,4}
    
    cout << dsu.same_group(2, 3);  // 1 (true) - cùng nhóm!
    cout << dsu.same_group(2, 5);  // 0 (false) - khác nhóm
}
```

### Code Python

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
                a, b = b, a
            self.parent[b] = a
            self.size[a] += self.size[b]
```

---

## 3. Segment Tree (Cây Phân Đoạn)

### Ẩn dụ: Bảng điểm lớp học

Bạn là lớp trưởng. Cả lớp có N học sinh. Giáo viên hỏi: "Tổng điểm học sinh từ số 5 đến số 12 là bao nhiêu?" và thỉnh thoảng: "Cập nhật điểm học sinh số 7!"

Nếu dùng mảng thường: mỗi câu hỏi O(N), N câu hỏi → O(N²). Quá chậm!

Segment Tree giải quyết: mỗi câu hỏi **O(log N)**!

### Ý tưởng

Chia mảng thành các đoạn nhỏ, lưu kết quả truy vấn (tổng, min, max...) cho mỗi đoạn.

```
Mảng [9, 2, 6, 3, 1, 5, 7]

Cây phân đoạn (lưu MIN):
            [1]                    ← min(1..7) = 1
           /    \
       [2]      [1]               ← min(1..4)=2, min(5..7)=1
       / \      / \
     [9] [2]  [6] [3] [1] [5] [7] ← lá
```

### Code C++

```cpp
int tree[4 * MAXN];  // Cây phân đoạn

// Xây dựng cây - O(N)
void build(int node, int start, int end, int a[]) {
    if (start == end) {
        tree[node] = a[start];  // Nút lá
        return;
    }
    int mid = (start + end) / 2;
    build(2 * node, start, mid, a);        // Xây con trái
    build(2 * node + 1, mid + 1, end, a);  // Xây con phải
    tree[node] = min(tree[2 * node], tree[2 * node + 1]);  // Gộp
}

// Truy vấn min đoạn [l, r] - O(log N)
int query(int node, int start, int end, int l, int r) {
    if (r < start || end < l) return INT_MAX;  // Ngoài đoạn
    if (l <= start && end <= r) return tree[node];  // Trong đoạn hoàn toàn
    int mid = (start + end) / 2;
    return min(query(2 * node, start, mid, l, r),
               query(2 * node + 1, mid + 1, end, l, r));
}

// Cập nhật a[pos] = val - O(log N)
void update(int node, int start, int end, int pos, int val) {
    if (start == end) {
        tree[node] = val;
        return;
    }
    int mid = (start + end) / 2;
    if (pos <= mid)
        update(2 * node, start, mid, pos, val);
    else
        update(2 * node + 1, mid + 1, end, pos, val);
    tree[node] = min(tree[2 * node], tree[2 * node + 1]);
}
```

### Code Python

```python
import sys

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
        self.tree[node] = min(self.tree[2 * node], self.tree[2 * node + 1])

    def query(self, node, start, end, l, r):
        if r < start or end < l:
            return sys.maxsize  # Ngoài đoạn
        if l <= start and end <= r:
            return self.tree[node]  # Trong đoạn hoàn toàn
        mid = (start + end) // 2
        return min(self.query(2 * node, start, mid, l, r),
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
        self.tree[node] = min(self.tree[2 * node], self.tree[2 * node + 1])
```

---

## 4. Fenwick Tree (BIT - Binary Indexed Tree)

### Ẩn dụ: Tổng quãng đường thông minh

Thay vì lưu tổng từ đầu đến từng điểm (prefix sum), Fenwick Tree chia thành các "block" có độ dài là lũy thừa của 2. Khi cập nhật, chỉ cần sửa O(log N) block!

### So sánh: Prefix Sum vs BIT

| | Prefix Sum | BIT |
|--|-----------|-----|
| Tính tổng [1..p] | **O(1)** | O(log N) |
| Cập nhật a[i] | O(N) | **O(log N)** |
| Bộ nhớ | O(N) | O(N) |

→ BIT "cân bằng" giữa 2 loại truy vấn!

### Code C++

```cpp
int bit[MAXN];  // Fenwick Tree

// Cập nhật: cộng thêm delta vào vị trí i
void update(int i, int delta) {
    for (; i <= n; i += i & (-i))  // i & (-i) = bit thấp nhất
        bit[i] += delta;
}

// Truy vấn: tổng từ 1 đến i
int query(int i) {
    int sum = 0;
    for (; i > 0; i -= i & (-i))
        sum += bit[i];
    return sum;
}

// Tổng đoạn [l, r]
int rangeSum(int l, int r) {
    return query(r) - query(l - 1);
}
```

### Code Python

```python
class FenwickTree:
    def __init__(self, n):
        self.n = n
        self.bit = [0] * (n + 1)

    def update(self, i, delta):
        while i <= self.n:
            self.bit[i] += delta
            i += i & (-i)  # i & (-i) = bit thấp nhất

    def query(self, i):
        s = 0
        while i > 0:
            s += self.bit[i]
            i -= i & (-i)
        return s

    def range_sum(self, l, r):
        return self.query(r) - self.query(l - 1)
```

### Khi nào dùng cái nào?

| Tình huống | Nên dùng |
|-----------|----------|
| Chỉ tính tổng đoạn, không cập nhật | Prefix Sum |
| Cập nhật điểm + tính tổng đoạn | **BIT** hoặc Segment Tree |
| Cập nhật đoạn + truy vấn min/max | **Segment Tree** |
| Cần code ngắn, dễ cài | **BIT** |

---

---

## Tài liệu tham khảo

- [CP-Algorithms - Segment Tree](https://cp-algorithms.com/data_structures/segment_tree.html)
- [CP-Algorithms - Fenwick Tree](https://cp-algorithms.com/data_structures/fenwick.html)
- [CP-Algorithms - DSU](https://cp-algorithms.com/data_structures/disjoint-set-union.html)
- [Codeforces - Efficient Segment Trees](https://codeforces.com/blog/entry/18051)
- [Topcoder - Binary Indexed Trees](https://www.topcoder.com/community/competitive-programming/tutorials/binary-indexed-trees/)
- [GeeksforGeeks - Segment Trees for CP](https://www.geeksforgeeks.org/dsa/segment-trees-for-competitive-programming/)
- [GeeksforGeeks - Fenwick Tree](https://www.geeksforgeeks.org/dsa/binary-indexed-tree-or-fenwick-tree-2/)
- [VNOI Wiki - Disjoint Set Union](https://wiki.vnoi.info/algo/data-structures/disjoint-set-union)
- [VNOI Wiki - Cây Phân Đoạn](https://wiki.vnoi.info/algo/data-structures/segment-tree-basic)
- [VNOI Wiki - Fenwick Tree](https://wiki.vnoi.info/algo/data-structures/fenwick)
- [YouTube - Segment Tree Playlist (takeuforward)](https://www.youtube.com/playlist?list=PLtfqa971vD5GTQjH9U0H6kiq9cQlFFa5k)

**Bài tiếp theo:** [KMP - Tìm xâu siêu nhanh →](09-kmp-tim-xau.md)
