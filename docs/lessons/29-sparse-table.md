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

### Chứng minh tính đúng đắn

Với `k = floor(log2(len))`, ta có: `2^k ≤ len < 2^(k+1)`

**Đoạn 1:** `[l, l + 2^k - 1]` có độ dài 2^k → chứa các phần tử từ l đến l + 2^k - 1

**Đoạn 2:** `[r - 2^k + 1, r]` có độ dài 2^k → chứa các phần tử từ r - 2^k + 1 đến r

**Kiểm tra giao nhau:** Hai đoạn giao nhau khi `l + 2^k - 1 ≥ r - 2^k + 1`

⇔ `2 × 2^k ≥ r - l + 2 = len + 1`

⇔ `2^(k+1) ≥ len + 1`

⇔ `2^(k+1) > len` (vì len ≥ 1)

Điều này luôn đúng vì `k = floor(log2(len))` → `2^k ≤ len < 2^(k+1)` → `2^(k+1) > len` ✅

**Vậy hai đoạn luôn giao nhau hoặc kề nhau, bao phủ toàn bộ [l, r]!**

### Minh họa chi tiết: Vì sao chọn 2 đoạn này?

```
Mảng: [3, 1, 4, 1, 5, 9, 2, 6]
Chỉ số:  0  1  2  3  4  5  6  7

Truy vấn min[2, 7]:
  len = 6, k = floor(log₂(6)) = 2, 2^k = 4

  Đoạn 1: [2, 2+4-1] = [2, 5] → min(4, 1, 5, 9) = 1
  Đoạn 2: [7-4+1, 7] = [4, 7] → min(5, 9, 2, 6) = 2

  min[2, 7] = min(1, 2) = 1 ✅

  Kiểm tra bằng cách duyệt: min(4, 1, 5, 9, 2, 6) = 1 ✅
```

**Tại sao không dùng 1 đoạn duy nhất?** Vì 6 không phải lũy thừa 2! Không có đoạn nào dài đúng 6 đã được tính trước. Nhưng 6 = 4 + 2, nên ta ghép 2 đoạn dài 4 (có thể chồng lên nhau).

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

### Bảng tổng quan

```
k=0 (dài 1): [3] [1] [4] [1] [5] [9] [2] [6]
k=1 (dài 2): [1] [1] [1] [1] [5] [2] [2]
k=2 (dài 4): [1] [1] [1] [1] [2]
k=3 (dài 8): [1]
```

### Cài đặt

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    
    const int MAXN = 200005;
    const int LOG = 20;  // log₂(MAXN) ≈ 18, lấy 20 cho an toàn
    
    int st[MAXN][LOG];   // st[i][k] = min đoạn [i, i + 2^k - 1]
    int a[MAXN];
    int n;
    
    // Bước 1: Tiền xử lý - O(N log N)
    void build() {
        // Khởi tạo: đoạn dài 1 (2^0)
        for (int i = 0; i < n; i++)
            st[i][0] = a[i];
        
        // Xây dựng cho các đoạn dài 2^k (k = 1, 2, ..., LOG-1)
        for (int k = 1; (1 << k) <= n; k++) {
            for (int i = 0; i + (1 << k) - 1 < n; i++) {
                // Gộp 2 đoạn con dài 2^(k-1)
                st[i][k] = min(st[i][k - 1],                    // nửa trái
                               st[i + (1 << (k - 1))][k - 1]); // nửa phải
            }
        }
    }
    
    // Bước 2: Truy vấn min [l, r] - O(1)
    int query(int l, int r) {
        int len = r - l + 1;
        int k = __lg(len);  // floor(log₂(len))
        
        // Ghép 2 đoạn lũy thừa 2 bao phủ [l, r]
        return min(st[l][k],                    // đoạn [l, l + 2^k - 1]
                   st[r - (1 << k) + 1][k]);    // đoạn [r - 2^k + 1, r]
    }
    ```

=== "Python"

    ```python
    import sys
    input = sys.stdin.readline
    
    class SparseTable:
        """
        Sparse Table cho truy vấn min/max đoạn tĩnh.
        
        Thời gian:
            - build(): O(N log N)
            - query(): O(1)
        
        Bộ nhớ: O(N log N)
        """
        def __init__(self, a, func=min):
            """
            Khởi tạo Sparse Table.
            
            Args:
                a: mảng đầu vào
                func: hàm gộp (min, max, gcd, ...)
            """
            self.n = len(a)
            self.func = func
            self.LOG = self.n.bit_length()  # Số bit cần thiết để biểu diễn n
            
            # st[i][k] = func(a[i..i+2^k-1])
            self.st = [[0] * self.LOG for _ in range(self.n)]
            
            # Khởi tạo: đoạn dài 1 (k=0)
            for i in range(self.n):
                self.st[i][0] = a[i]
            
            # Xây dựng cho các đoạn dài 2^k (k = 1, 2, ...)
            for k in range(1, self.LOG):
                for i in range(self.n - (1 << k) + 1):
                    # Gộp 2 đoạn con dài 2^(k-1)
                    self.st[i][k] = self.func(
                        self.st[i][k - 1],                    # nửa trái
                        self.st[i + (1 << (k - 1))][k - 1]   # nửa phải
                    )
        
        def query(self, l, r):
            """
            Truy vấn func(a[l..r]) trong O(1).
            
            Args:
                l: chỉ số trái (0-indexed)
                r: chỉ số phải (0-indexed)
            Returns:
                Giá trị min/max/gcd... của đoạn [l, r]
            """
            length = r - l + 1
            k = length.bit_length() - 1  # floor(log₂(length))
            
            # Ghép 2 đoạn lũy thừa 2 bao phủ [l, r]
            return self.func(
                self.st[l][k],                    # đoạn [l, l + 2^k - 1]
                self.st[r - (1 << k) + 1][k]      # đoạn [r - 2^k + 1, r]
            )
    
    # Sử dụng:
    # n, q = map(int, input().split())
    # a = list(map(int, input().split()))
    # st = SparseTable(a, func=min)
    # for _ in range(q):
    #     l, r = map(int, input().split())
    #     print(st.query(l - 1, r - 1))  # chuyển về 0-indexed
    ```

### Ví dụ truy vấn chi tiết

```
Mảng a: [3, 1, 4, 1, 5, 9, 2, 6] (0-indexed)

Truy vấn query(2, 7):
  len = 7 - 2 + 1 = 6
  k = floor(log₂(6)) = 2  (vì 2² = 4 ≤ 6 < 8 = 2³)
  2^k = 4

  Đoạn 1: st[2][2] = min(a[2..5]) = min(4, 1, 5, 9) = 1
  Đoạn 2: st[4][2] = min(a[4..7]) = min(5, 9, 2, 6) = 2

  Kết quả: min(1, 2) = 1 ✅

Truy vấn query(0, 3):
  len = 3 - 0 + 1 = 4
  k = floor(log₂(4)) = 2  (vì 2² = 4)
  2^k = 4

  Đoạn 1: st[0][2] = min(a[0..3]) = min(3, 1, 4, 1) = 1
  Đoạn 2: st[0][2] = min(a[0..3]) = min(3, 1, 4, 1) = 1
  (Hai đoạn trùng nhau vì len đúng bằng lũy thừa 2!)

  Kết quả: min(1, 1) = 1 ✅

Truy vấn query(3, 5):
  len = 5 - 3 + 1 = 3
  k = floor(log₂(3)) = 1  (vì 2¹ = 2 ≤ 3 < 4 = 2²)
  2^k = 2

  Đoạn 1: st[3][1] = min(a[3..4]) = min(1, 5) = 1
  Đoạn 2: st[4][1] = min(a[4..5]) = min(5, 9) = 5

  Kết quả: min(1, 5) = 1 ✅
```

---

## 3. Truy vấn GCD với Sparse Table

Sparse Table không chỉ dùng cho min/max — còn dùng được cho **bất kỳ phép toán idempotent nào** (f(a, a) = a)!

**GCD là idempotent:** gcd(x, x) = x → có thể dùng Sparse Table!

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    
    const int MAXN = 200005;
    const int LOG = 20;
    
    int st[MAXN][LOG];
    int a[MAXN];
    int n;
    
    void build() {
        // Khởi tạo: đoạn dài 1
        for (int i = 0; i < n; i++)
            st[i][0] = a[i];
        
        // Xây dựng cho các đoạn dài 2^k
        for (int k = 1; (1 << k) <= n; k++)
            for (int i = 0; i + (1 << k) - 1 < n; i++)
                // Gộp GCD của 2 đoạn con
                st[i][k] = __gcd(st[i][k - 1],
                                  st[i + (1 << (k - 1))][k - 1]);
    }
    
    int query(int l, int r) {
        int k = __lg(r - l + 1);
        // GCD của 2 đoạn bao phủ [l, r]
        return __gcd(st[l][k], st[r - (1 << k) + 1][k]);
    }
    ```

=== "Python"

    ```python
    from math import gcd
    
    class SparseTableGCD:
        def __init__(self, a):
            self.n = len(a)
            self.LOG = self.n.bit_length()
            self.st = [[0] * self.LOG for _ in range(self.n)]
            
            for i in range(self.n):
                self.st[i][0] = a[i]
            
            for k in range(1, self.LOG):
                for i in range(self.n - (1 << k) + 1):
                    self.st[i][k] = gcd(
                        self.st[i][k - 1],
                        self.st[i + (1 << (k - 1))][k - 1]
                    )
        
        def query(self, l, r):
            length = r - l + 1
            k = length.bit_length() - 1
            return gcd(self.st[l][k], self.st[r - (1 << k) + 1][k])
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

**Giải thích:** Sparse Table ghép 2 đoạn có thể **chồng lặp** (overlap). Nếu phép toán không idempotent, kết quả sẽ sai vì các phần tử bị tính nhiều lần.

### 4.3. __lg() trong C++

```cpp
__lg(x)  // Trả về floor(log₂(x)), với x > 0
// __lg(1) = 0, __lg(7) = 2, __lg(8) = 3
```

Trong Python: `x.bit_length() - 1`

**Lưu ý:** `__lg(0)` là không xác định! Đảm bảo `len > 0` khi gọi hàm.

### 4.4. Bộ nhớ O(N log N)

Với N = 10⁶, log₂(N) ≈ 20 → bộ nhớ ≈ 10⁶ × 20 × 4 bytes ≈ 80 MB. Đôi khi vượt quá giới hạn → cân nhắc dùng Segment Tree nếu thiếu bộ nhớ.

### 4.5. Common Mistakes / Những lỗi thường gặp

#### Lỗi 1: Quên kiểm tra điều kiện biên

```cpp
// SAI: có thể truy cập ngoài mảng
int query(int l, int r) {
    int k = __lg(r - l + 1);
    return min(st[l][k], st[r - (1 << k) + 1][k]);
}

// ĐÚNG: đảm bảo l ≤ r và 0 ≤ l, r < n
int query(int l, int r) {
    assert(l <= r && l >= 0 && r < n);
    int k = __lg(r - l + 1);
    return min(st[l][k], st[r - (1 << k) + 1][k]);
}
```

#### Lỗi 2: Sai giá trị LOG

```cpp
// SAI: LOG quá nhỏ
const int LOG = 10;  // Không đủ cho N = 10⁶!

// ĐÚNG: LOG = ceil(log₂(MAXN)) + 1
const int LOG = 20;  // 2^20 ≈ 10⁶, đủ cho MAXN = 10⁶
```

#### Lỗi 3: Sai chỉ số trong công thức truy vấn

```cpp
// SAI: dùng l + (1 << k) thay vì r - (1 << k) + 1
return min(st[l][k], st[l + (1 << k)][k]);  // ❌

// ĐÚNG:
return min(st[l][k], st[r - (1 << k) + 1][k]);  // ✅
```

#### Lỗi 4: Dùng Sparse Table cho phép toán không idempotent

```cpp
// SAI: Sum không idempotent!
// sum([1,1]) = 2, nhưng sum(1,1) ≠ 1
// Nếu 2 đoạn chồng lặp, các phần tử chung bị tính 2 lần

// ĐÚNG: Dùng Prefix Sum cho truy vấn tổng
```

#### Lỗi 5: 0-indexed vs 1-indexed

```cpp
// Nếu input là 1-indexed (như CSES), cần chuyển về 0-indexed
cin >> l >> r;
l--; r--;
cout << query(l, r) << endl;
```

#### Lỗi 6: Python - Sử dụng math.log2() thay vì bit_length()

```python
# CHẬM: math.log2() có độ chính xác floating-point
k = int(math.log2(length))  # Có thể sai với số lớn!

# NHANH VÀ CHÍNH XÁC:
k = length.bit_length() - 1  # ✅
```

---

## 5. Bài tập luyện tập

### Bài tập cơ bản (Làm quen với Sparse Table)

| # | Bài | Nền tảng | Độ khó | Chủ đề |
|---|-----|----------|--------|--------|
| 1 | [CSES - Static Range Minimum Queries](https://cses.fi/problemset/task/1647) | CSES | ⭐⭐ | Sparse Table cơ bản |
| 2 | [SPOJ - RMQSQ](https://www.spoj.com/problems/RMQSQ/) | SPOJ | ⭐⭐ | RMQ cơ bản |
| 3 | [CSES - Static Range Sum Queries](https://cses.fi/problemset/task/1646) | CSES | ⭐ | Prefix Sum (so sánh) |

### Bài tập ứng dụng (Áp dụng Sparse Table)

| # | Bài | Nền tảng | Độ khó | Chủ đề |
|---|-----|----------|--------|--------|
| 4 | [Codeforces - Maximum of Maximums of Minimums](https://codeforces.com/problemset/problem/872/B) | CF | ⭐⭐ | Sparse Table ứng dụng |
| 5 | [Codeforces - Minimum Extraction](https://codeforces.com/problemset/problem/1607/D) | CF | ⭐⭐ | Kết hợp Sparse Table |
| 6 | [VNOJ - Query Min](https://oj.vnoi.info/problem/qmin) | VNOJ | ⭐⭐ | RMQ cơ bản |
| 7 | [VNOJ - NKLINEUP](https://oj.vnoi.info/problem/nklineup) | VNOJ | ⭐⭐ | Truy vấn max-min |

### Bài tập nâng cao (Kết hợp nhiều kỹ thuật)

| # | Bài | Nền tảng | Độ khó | Chủ đề |
|---|-----|----------|--------|--------|
| 8 | [Codeforces - Pair of Numbers](https://codeforces.com/problemset/problem/359/D) | CF | ⭐⭐⭐ | Sparse Table + GCD |
| 9 | [CSES - Range Queries and Copies](https://cses.fi/problemset/task/2072) | CSES | ⭐⭐⭐ | Không dùng Sparse Table (có update) |
| 10 | [Codeforces - Yet Another Minimization Problem](https://codeforces.com/problemset/problem/1809/E) | CF | ⭐⭐⭐ | Sparse Table tối ưu |

### Bài tập tham khảo (Không dùng Sparse Table nhưng liên quan)

| # | Bài | Nền tảng | Độ khó | Ghi chú |
|---|-----|----------|--------|---------|
| 11 | [CSES - Dynamic Range Minimum Queries](https://cses.fi/problemset/task/1649) | CSES | ⭐⭐ | Dùng Segment Tree (có update) |
| 12 | [CSES - Range Update Queries](https://cses.fi/problemset/task/1651) | CSES | ⭐⭐ | Dùng Lazy Propagation |

---

## 6. Tổng kết

| Đặc điểm | Giá trị |
|-----------|---------|
| Thời gian xây dựng | O(N log N) |
| Thời gian truy vấn | O(1) |
| Bộ nhớ | O(N log N) |
| Hỗ trợ cập nhật | ❌ Không |
| Yêu cầu phép toán | Idempotent (min, max, GCD, AND, OR) |

**Khi nào dùng Sparse Table?**
- Mảng tĩnh (không cập nhật)
- Cần truy vấn min/max/GCD nhanh O(1)
- Có đủ bộ nhớ (O(N log N))

**Khi nào KHÔNG dùng?**
- Cần cập nhật → dùng Segment Tree
- Phép toán không idempotent (sum, XOR) → dùng Prefix Sum/BIT
- Thiếu bộ nhớ → dùng Segment Tree (O(4N))

---

## Tài liệu tham khảo

- [CP-Algorithms - Sparse Table](https://cp-algorithms.com/data_structures/sparse-table.html)
- [GeeksforGeeks - Sparse Table](https://www.geeksforgeeks.org/dsa/sparse-table/)
- [YouTube - Sparse Table (takeuforward)](https://www.youtube.com/watch?v=0jWeUdxJmK4)
- [VNOI Wiki - Range Minimum Query](https://wiki.vnoi.info/algo/data-structures/rmq)

**Bài trước:** [Cây khoảng →](08c-segment-tree.md) | **Bài tiếp theo:** [Bao lồi →](28-bao-loi.md)
