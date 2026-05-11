# Bài 29: Sparse Table - Truy vấn Min/Max O(1)

> **Tác giả:** Hà Trí Kiên<br>
> **Nội dung tham khảo từ:** CP-Algorithms - Sparse Table, VNOI Wiki

## 1. Chuyện gì đang xảy ra?

### Bài toán: Truy vấn min/max đoạn tĩnh (không cập nhật)

Cho mảng A gồm N phần tử. Có Q câu hỏi: "Giá trị nhỏ nhất trong đoạn [l, r] là bao nhiêu?"

Nếu mảng **không thay đổi** (không có update), Sparse Table trả lời mỗi câu hỏi trong **O(1)** — nhanh hơn Segment Tree (O(log N))!

### So sánh với các cấu trúc khác

| Cấu trúc | Truy vấn | Cập nhật | Bộ nhớ |
|----------|---------|---------|--------|
| Duyệt thường | O(N) | O(1) | O(N) |
| Segment Tree | O(log N) | O(log N) | O(4N) |
| **Sparse Table** | **O(1)** | **Không hỗ trợ** | O(N log N) |
| SQRT Decomposition | O(√N) | O(1) | O(N) |

→ Sparse Table **tối ưu** cho bài toán truy vấn min/max trên mảng tĩnh!

### Tại sao nhanh O(1)?

**Ý tưởng:** Tính trước kết quả cho **tất cả các đoạn có độ dài là lũy thừa của 2**. Khi truy vấn, chỉ cần **ghép 2 đoạn lũy thừa 2** là đủ!

```
Truy vấn min [2, 7] (độ dài 6):

Đoạn [2, 7] = giao của 2 đoạn:
  [2, 5] (độ dài 4 = 2²) ← đã tính trước!
  [4, 7] (độ dài 4 = 2²) ← đã tính trước!

min[2, 7] = min(min[2, 5], min[4, 7]) = min(đoạn 4, đoạn 4)
→ Chỉ cần 2 lần tra bảng → O(1)!
```

### Tại sao 2 đoạn lũy thừa 2 luôn bao phủ [l, r]?

Với đoạn [l, r] có độ dài `len = r - l + 1`, ta tìm `k = floor(log2(len))`.

Hai đoạn:

- `[l, l + 2^k - 1]` — bắt đầu từ l, dài 2^k
- `[r - 2^k + 1, r]` — kết thúc tại r, dài 2^k

**Luôn giao nhau hoặc kề nhau** → bao phủ toàn bộ [l, r]!

```
Ví dụ: [2, 7], len = 6, k = floor(log₂(6)) = 2

Đoạn 1: [2, 2 + 4 - 1] = [2, 5]  (dài 4)
Đoạn 2: [7 - 4 + 1, 7] = [4, 7]  (dài 4)
Giao: [4, 5] → bao phủ [2, 7] ✅
```

---

## 2. Xây dựng Sparse Table

### Ý tưởng

Tạo bảng `st[i][k]` = giá trị min/max của đoạn bắt đầu từ i, độ dài 2^k.

```
st[i][0] = a[i]                          (đoạn dài 1 = 2⁰)
st[i][1] = min(a[i], a[i+1])             (đoạn dài 2 = 2¹)
st[i][2] = min(a[i..i+3])                (đoạn dài 4 = 2²)
st[i][k] = min(st[i][k-1], st[i + 2^(k-1)][k-1])
```

**Công thức gộp:** Đoạn dài 2^k = gộp 2 đoạn dài 2^(k-1)!

```
st[i][k] = min(st[i][k-1], st[i + 2^(k-1)][k-1])
                ↑                            ↑
         nửa trái [i, i+2^(k-1)-1]    nửa phải [i+2^(k-1), i+2^k-1]
```

### Minh họa xây dựng

```
Mảng a: [3, 1, 4, 1, 5, 9, 2, 6], N = 8

st[i][0] = a[i]:
  i:     0  1  2  3  4  5  6  7
  st:   [3, 1, 4, 1, 5, 9, 2, 6]

st[i][1] = min(a[i], a[i+1]):
  i:     0  1  2  3  4  5  6
  st:   [1, 1, 1, 1, 5, 2, 2]

st[i][2] = min(a[i..i+3]):
  i:     0  1  2  3  4
  st:   [1, 1, 1, 1, 2]

st[i][3] = min(a[i..i+7]):
  i:     0
  st:   [1]
```

### Code C++

```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 200005;
const int LOG = 20;  // log₂(MAXN) ≈ 18

int st[MAXN][LOG];   // st[i][k] = min đoạn [i, i + 2^k - 1]
int a[MAXN];
int n;

// Bước 1: Tiền xử lý - O(N log N)
void build() {
    // Đoạn dài 1 (2^0)
    for (int i = 0; i < n; i++)
        st[i][0] = a[i];
    
    // Đoạn dài 2^k, k = 1, 2, ...
    for (int k = 1; (1 << k) <= n; k++) {
        for (int i = 0; i + (1 << k) - 1 < n; i++) {
            st[i][k] = min(st[i][k - 1],
                           st[i + (1 << (k - 1))][k - 1]);
        }
    }
}

// Bước 2: Truy vấn min [l, r] - O(1)
int query(int l, int r) {
    int len = r - l + 1;
    int k = __lg(len);  // floor(log₂(len))
    
    return min(st[l][k],
               st[r - (1 << k) + 1][k]);
}
```

### Code Python

```python
import sys
import math
input = sys.stdin.readline

class SparseTable:
    def __init__(self, a):
        self.n = len(a)
        self.LOG = self.n.bit_length()  # Số bit cần thiết
        self.st = [[0] * self.LOG for _ in range(self.n)]
        
        # Đoạn dài 1
        for i in range(self.n):
            self.st[i][0] = a[i]
        
        # Đoạn dài 2^k
        for k in range(1, self.LOG):
            for i in range(self.n - (1 << k) + 1):
                self.st[i][k] = min(self.st[i][k - 1],
                                     self.st[i + (1 << (k - 1))][k - 1])
    
    def query(self, l, r):
        length = r - l + 1
        k = length.bit_length() - 1  # floor(log₂(length))
        return min(self.st[l][k],
                   self.st[r - (1 << k) + 1][k])
```

### Code Python — Standalone (không dùng class)

```python
import math

def build_sparse_table(a):
    n = len(a)
    k = int(math.log2(n)) + 1
    st = [[0] * n for _ in range(k)]
    st[0] = a[:]
    for j in range(1, k):
        for i in range(n - (1 << j) + 1):
            st[j][i] = min(st[j-1][i], st[j-1][i + (1 << (j-1))])
    return st

def query(st, l, r):
    j = int(math.log2(r - l + 1))
    return min(st[j][l], st[j][r - (1 << j) + 1])
```

### Giải thích chi tiết hàm query

```cpp
int query(int l, int r) {
    int len = r - l + 1;            // Độ dài đoạn
    int k = __lg(len);              // k = floor(log₂(len))
    
    // Hai đoạn lũy thừa 2 bao phủ [l, r]:
    // Đoạn 1: [l, l + 2^k - 1]        → st[l][k]
    // Đoạn 2: [r - 2^k + 1, r]        → st[r - 2^k + 1][k]
    
    return min(st[l][k],
               st[r - (1 << k) + 1][k]);
}

// Ví dụ: query(2, 7) với a = [3, 1, 4, 1, 5, 9, 2, 6]
// len = 6, k = __lg(6) = 2
// Đoạn 1: st[2][2] = min(a[2..5]) = min(4, 1, 5, 9) = 1
// Đoạn 2: st[4][2] = min(a[4..7]) = min(5, 9, 2, 6) = 2
// Kết quả: min(1, 2) = 1 ✅
```

---

## 3. Truy vấn GCD với Sparse Table

Sparse Table không chỉ dùng cho min/max — còn dùng được cho **bất kỳ phép toán idempotent nào** (f(a, a) = a)!

**GCD là idempotent:** gcd(x, x) = x → có thể dùng Sparse Table!

```cpp
int st[MAXN][LOG];

void build(int a[], int n) {
    for (int i = 0; i < n; i++)
        st[i][0] = a[i];
    for (int k = 1; (1 << k) <= n; k++)
        for (int i = 0; i + (1 << k) - 1 < n; i++)
            st[i][k] = __gcd(st[i][k - 1],
                              st[i + (1 << (k - 1))][k - 1]);
}

int query(int l, int r) {
    int k = __lg(r - l + 1);
    return __gcd(st[l][k], st[r - (1 << k) + 1][k]);
}
```

**Lưu ý:** Tổng (sum) **KHÔNG** là idempotent → không thể dùng Sparse Table cho tổng đoạn! (Phải dùng Prefix Sum hoặc BIT)

---

## 4. Lưu ý & Cạm bẫy

### 4.1. Chỉ dùng cho mảng tĩnh (không cập nhật)

Sparse Table **không hỗ trợ cập nhật**. Nếu cần cập nhật → dùng Segment Tree.

### 4.2. Phải là phép toán idempotent

| Phép toán | Idempotent? | Dùng Sparse Table? |
|-----------|-------------|-------------------|
| min, max | ✅ min(x,x)=x | ✅ |
| GCD | ✅ gcd(x,x)=x | ✅ |
| AND, OR | ✅ | ✅ |
| Tổng (sum) | ❌ sum(x,x)=2x | ❌ |
| XOR | ❌ x^x=0 | ❌ |

### 4.3. __lg() trong C++

```cpp
__lg(x)  // Trả về floor(log₂(x)), với x > 0
// __lg(1) = 0, __lg(7) = 2, __lg(8) = 3
```

Trong Python: `x.bit_length() - 1`

### 4.4. Bộ nhớ O(N log N)

Với N = 10⁶, log₂(N) ≈ 20 → bộ nhớ ≈ 10⁶ × 20 × 4 bytes ≈ 80 MB. Đôi khi vượt quá giới hạn → cân nhắc dùng Segment Tree nếu thiếu bộ nhớ.

---

## 5. Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Static Range Minimum Queries](https://cses.fi/problemset/task/1647) | CSES | ⭐⭐ | Sparse Table cơ bản |
| [CSES - Static Range Sum Queries](https://cses.fi/problemset/task/1646) | CSES | ⭐ | Prefix Sum (không phải Sparse Table) |
| [SPOJ - RMQSQ](https://www.spoj.com/problems/RMQSQ/) | SPOJ | ⭐⭐ | RMQ cơ bản |
| [Codeforces - Maximum of Maximums of Minimums](https://codeforces.com/problemset/problem/872/B) | CF | ⭐⭐ | Sparse Table ứng dụng |
| [CSES - Range Queries and Copies](https://cses.fi/problemset/task/2072) | CSES | ⭐⭐⭐ | Không dùng Sparse Table (có update) |

---

## Tài liệu tham khảo

- [CP-Algorithms - Sparse Table](https://cp-algorithms.com/data_structures/sparse-table.html)
- [GeeksforGeeks - Sparse Table](https://www.geeksforgeeks.org/dsa/sparse-table/)
- [YouTube - Sparse Table (takeuforward)](https://www.youtube.com/watch?v=0jWeUdxJmK4)
- [VNOI Wiki - Range Minimum Query](https://wiki.vnoi.info/algo/data-structures/rmq)

**Bài tiếp theo:** [Bao lồi →](28-bao-loi.md)
