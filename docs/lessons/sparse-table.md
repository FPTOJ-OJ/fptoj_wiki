# Bài 29: Sparse Table - Truy vấn Min/Max O(1)

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** CP-Algorithms - Sparse Table, VNOI Wiki

---

## Bản chất vấn đề

### Bài toán: Truy vấn min/max đoạn tĩnh (không cập nhật)

Cho mảng $A$ gồm $N$ phần tử. Có $Q$ câu hỏi: "Giá trị nhỏ nhất trong đoạn $[l, r]$ là bao nhiêu?"

Nếu mảng **không thay đổi** (không có update), Sparse Table trả lời mỗi câu hỏi trong $O(1)$ - nhanh hơn Segment Tree $O(\log N)$!

### So sánh với các cấu trúc khác

| Cấu trúc | Truy vấn | Cập nhật | Bộ nhớ |
|----------|---------|---------|--------|
| Duyệt thường | $O(N)$ | $O(1)$ | $O(N)$ |
| Segment Tree | $O(\log N)$ | $O(\log N)$ | $O(4N)$ |
| **Sparse Table** | $O(1)$ | Không hỗ trợ | $O(N \log N)$ |
| SQRT Decomposition | $O(\sqrt{N})$ | $O(1)$ | $O(N)$ |

Sparse Table tối ưu cho bài toán truy vấn min/max trên mảng tĩnh!

### Tại sao nhanh O(1)?

**Ý tưởng:** Tính trước kết quả cho **tất cả các đoạn có độ dài là lũy thừa của 2**. Khi truy vấn, chỉ cần **ghép 2 đoạn lũy thừa 2** là đủ!

Ví dụ: Truy vấn min $[2, 7]$ (độ dài 6)

- Đoạn $[2, 5]$ (độ dài $4 = 2^2$) đã tính trước!
- Đoạn $[4, 7]$ (độ dài $4 = 2^2$) đã tính trước!
- $\min[2, 7] = \min(\min[2, 5], \min[4, 7])$ - chỉ cần 2 lần tra bảng!

### Tại sao 2 đoạn lũy thừa 2 luôn bao phủ [l, r]?

Với đoạn $[l, r]$ có độ dài $\text{len} = r - l + 1$, ta tìm $k = \lfloor \log_2(\text{len}) \rfloor$.

Hai đoạn:
- $[l, l + 2^k - 1]$ bắt đầu từ $l$, dài $2^k$
- $[r - 2^k + 1, r]$ kết thúc tại $r$, dài $2^k$

**Luôn giao nhau hoặc kề nhau** nên bao phủ toàn bộ $[l, r]$!

Ví dụ: $[2, 7]$, $\text{len} = 6$, $k = \lfloor \log_2(6) \rfloor = 2$

- Đoạn 1: $[2, 2 + 4 - 1] = [2, 5]$ (dài 4)
- Đoạn 2: $[7 - 4 + 1, 7] = [4, 7]$ (dài 4)
- Giao: $[4, 5]$ bao phủ $[2, 7]$

```matplotlib
plt.figure(figsize=(11, 5))

arr = [3, 1, 4, 1, 5, 9, 2, 6]
n = len(arr)

# Draw array cells
cell_w = 1.0
cell_h = 0.8
y_base = 2.5

for i, val in enumerate(arr):
    rect = plt.Rectangle((i * cell_w, y_base), cell_w, cell_h,
                          facecolor='#ecf0f1', edgecolor='#2c3e50', linewidth=2)
    plt.gca().add_patch(rect)
    plt.text(i * cell_w + cell_w / 2, y_base + cell_h / 2, str(val),
             ha='center', va='center', fontsize=14, fontweight='bold')

# Index labels
for i in range(n):
    plt.text(i * cell_w + cell_w / 2, y_base - 0.3, f'[{i}]',
             ha='center', va='center', fontsize=11, color='#7f8c8d')

# Query interval [2, 7]
l, r = 2, 7
query_rect = plt.Rectangle((l * cell_w - 0.05, y_base - 0.1), (r - l + 1) * cell_w + 0.1, cell_h + 0.2,
                             facecolor='none', edgecolor='#2c3e50', linewidth=2.5, linestyle='-')
plt.gca().add_patch(query_rect)
plt.text((l + r) / 2 * cell_w + cell_w / 2, y_base + cell_h + 0.35,
         f'Truy vấn [{l}, {r}]', ha='center', fontsize=12, fontweight='bold', color='#2c3e50')

# Interval 1: [2, 5] (length 4)
i1_l, i1_r = 2, 5
y1 = 1.2
rect1 = plt.Rectangle((i1_l * cell_w, y1), (i1_r - i1_l + 1) * cell_w, 0.6,
                        facecolor='#3498db', edgecolor='#2980b9', linewidth=2, alpha=0.7)
plt.gca().add_patch(rect1)
plt.text((i1_l + i1_r) / 2 * cell_w + cell_w / 2, y1 + 0.3,
         f'Đoạn 1: [{i1_l}, {i1_r}] (2² = 4)', ha='center', va='center',
         fontsize=11, fontweight='bold', color='white')

# Interval 2: [4, 7] (length 4)
i2_l, i2_r = 4, 7
y2 = 0.2
rect2 = plt.Rectangle((i2_l * cell_w, y2), (i2_r - i2_l + 1) * cell_w, 0.6,
                        facecolor='#e74c3c', edgecolor='#c0392b', linewidth=2, alpha=0.7)
plt.gca().add_patch(rect2)
plt.text((i2_l + i2_r) / 2 * cell_w + cell_w / 2, y2 + 0.3,
         f'Đoạn 2: [{i2_r - 3}, {i2_r}] (2² = 4)', ha='center', va='center',
         fontsize=11, fontweight='bold', color='white')

# Overlap highlight
overlap_l, overlap_r = 4, 5
overlap_rect = plt.Rectangle((overlap_l * cell_w - 0.03, y1 - 0.03),
                               (overlap_r - overlap_l + 1) * cell_w + 0.06, 0.66,
                               facecolor='#f39c12', edgecolor='#e67e22', linewidth=2.5, alpha=0.4)
plt.gca().add_patch(overlap_rect)

# Annotations
plt.annotate('', xy=(overlap_l * cell_w + cell_w / 2, y1 - 0.15),
             xytext=(overlap_r * cell_w + cell_w / 2, y1 - 0.15),
             arrowprops=dict(arrowstyle='<->', color='#e67e22', lw=2))
plt.text((overlap_l + overlap_r) / 2 * cell_w + cell_w / 2, y1 - 0.4,
         'Giao nhau', ha='center', fontsize=10, color='#e67e22', fontweight='bold')

plt.xlim(-0.5, 9)
plt.ylim(-0.8, 4.2)
plt.title('Sparse Table: Truy vấn min[2, 7] = min(Đoạn 1, Đoạn 2)', fontsize=13)
plt.axis('off')
plt.tight_layout()
```

---

## Tư duy cốt lõi

### Xây dựng Sparse Table

Tạo bảng $st[i][k]$ = giá trị min/max của đoạn bắt đầu từ $i$, độ dài $2^k$.

Công thức:
- $st[i][0] = a[i]$ (đoạn dài $1 = 2^0$)
- $st[i][1] = \min(a[i], a[i+1])$ (đoạn dài $2 = 2^1$)
- $st[i][2] = \min(a[i..i+3])$ (đoạn dài $4 = 2^2$)
- $st[i][k] = \min(st[i][k-1], st[i + 2^{k-1}][k-1])$

**Công thức gộp:** Đoạn dài $2^k$ = gộp 2 đoạn dài $2^{k-1}$!

### Minh họa xây dựng

Mảng $a = [3, 1, 4, 1, 5, 9, 2, 6]$, $N = 8$

| $k$ | Độ dài | Giá trị $st[i][k]$ |
|-----|--------|---------------------|
| 0 | 1 | $[3, 1, 4, 1, 5, 9, 2, 6]$ |
| 1 | 2 | $[1, 1, 1, 1, 5, 2, 2]$ |
| 2 | 4 | $[1, 1, 1, 1, 2]$ |
| 3 | 8 | $[1]$ |

### Truy vấn

Với truy vấn $\min[l, r]$:
1. Tính $\text{len} = r - l + 1$
2. Tính $k = \lfloor \log_2(\text{len}) \rfloor$
3. Kết quả $= \min(st[l][k], st[r - 2^k + 1][k])$

### Cài đặt

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
        for (int i = 0; i < n; i++)
            st[i][0] = a[i];
        
        for (int k = 1; (1 << k) <= n; k++) {
            for (int i = 0; i + (1 << k) - 1 < n; i++) {
                st[i][k] = min(st[i][k - 1],
                               st[i + (1 << (k - 1))][k - 1]);
            }
        }
    }
    
    int query(int l, int r) {
        int len = r - l + 1;
        int k = __lg(len);
        return min(st[l][k],
                   st[r - (1 << k) + 1][k]);
    }
    ```

=== "Python"

    ```python
    import sys
    input = sys.stdin.readline
    
    class SparseTable:
        def __init__(self, a, func=min):
            self.n = len(a)
            self.func = func
            self.LOG = self.n.bit_length()
            self.st = [[0] * self.LOG for _ in range(self.n)]
            
            for i in range(self.n):
                self.st[i][0] = a[i]
            
            for k in range(1, self.LOG):
                for i in range(self.n - (1 << k) + 1):
                    self.st[i][k] = self.func(
                        self.st[i][k - 1],
                        self.st[i + (1 << (k - 1))][k - 1]
                    )
        
        def query(self, l, r):
            length = r - l + 1
            k = length.bit_length() - 1
            return self.func(
                self.st[l][k],
                self.st[r - (1 << k) + 1][k]
            )
    
    # Sử dụng:
    # n, q = map(int, input().split())
    # a = list(map(int, input().split()))
    # st = SparseTable(a, func=min)
    # for _ in range(q):
    #     l, r = map(int, input().split())
    #     print(st.query(l - 1, r - 1))
    ```

### Ví dụ truy vấn chi tiết

Mảng $a = [3, 1, 4, 1, 5, 9, 2, 6]$ (0-indexed)

**Truy vấn query(2, 7):**

| Bước | Tính toán | Kết quả |
|------|-----------|---------|
| Độ dài | $7 - 2 + 1 = 6$ | $6$ |
| $k$ | $\lfloor \log_2(6) \rfloor = 2$ | $2$ |
| Đoạn 1 | $st[2][2] = \min(a[2..5]) = \min(4, 1, 5, 9)$ | $1$ |
| Đoạn 2 | $st[4][2] = \min(a[4..7]) = \min(5, 9, 2, 6)$ | $2$ |
| Kết quả | $\min(1, 2)$ | $1$ |

**Truy vấn query(0, 3):**

| Bước | Tính toán | Kết quả |
|------|-----------|---------|
| Độ dài | $3 - 0 + 1 = 4$ | $4$ |
| $k$ | $\lfloor \log_2(4) \rfloor = 2$ | $2$ |
| Đoạn 1 | $st[0][2] = \min(a[0..3]) = \min(3, 1, 4, 1)$ | $1$ |
| Đoạn 2 | $st[0][2] = \min(a[0..3]) = \min(3, 1, 4, 1)$ | $1$ |
| Kết quả | $\min(1, 1)$ | $1$ |

Hai đoạn trùng nhau vì độ dài đúng bằng lũy thừa 2!

**Truy vấn query(3, 5):**

| Bước | Tính toán | Kết quả |
|------|-----------|---------|
| Độ dài | $5 - 3 + 1 = 3$ | $3$ |
| $k$ | $\lfloor \log_2(3) \rfloor = 1$ | $1$ |
| Đoạn 1 | $st[3][1] = \min(a[3..4]) = \min(1, 5)$ | $1$ |
| Đoạn 2 | $st[4][1] = \min(a[4..5]) = \min(5, 9)$ | $5$ |
| Kết quả | $\min(1, 5)$ | $1$ |

### Truy vấn GCD với Sparse Table

Sparse Table không chỉ dùng cho min/max - còn dùng được cho **bất kỳ phép toán idempotent nào** (tức $f(a, a) = a$)!

GCD là idempotent: $\gcd(x, x) = x$ nên có thể dùng Sparse Table!

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

**Lưu ý:** Tổng (sum) **KHÔNG** là idempotent nên không thể dùng Sparse Table cho tổng đoạn! Phải dùng Prefix Sum hoặc BIT.

---

## Phân tích tính đúng đắn

### Chứng minh 2 đoạn luôn bao phủ [l, r]

Với $k = \lfloor \log_2(\text{len}) \rfloor$, ta có: $2^k \le \text{len} < 2^{k+1}$

**Đoạn 1:** $[l, l + 2^k - 1]$ có độ dài $2^k$, chứa các phần tử từ $l$ đến $l + 2^k - 1$

**Đoạn 2:** $[r - 2^k + 1, r]$ có độ dài $2^k$, chứa các phần tử từ $r - 2^k + 1$ đến $r$

**Kiểm tra giao nhau:** Hai đoạn giao nhau khi $l + 2^k - 1 \ge r - 2^k + 1$

$\Leftrightarrow 2 \times 2^k \ge r - l + 2 = \text{len} + 1$

$\Leftrightarrow 2^{k+1} \ge \text{len} + 1$

$\Leftrightarrow 2^{k+1} > \text{len}$ (vì $\text{len} \ge 1$)

Điều này luôn đúng vì $k = \lfloor \log_2(\text{len}) \rfloor$ nên $2^k \le \text{len} < 2^{k+1}$, suy ra $2^{k+1} > \text{len}$.

**Vậy hai đoạn luôn giao nhau hoặc kề nhau, bao phủ toàn bộ $[l, r]$!**

### Tại sao phép toán phải idempotent?

Sparse Table ghép 2 đoạn có thể **chồng lặp** (overlap). Nếu phép toán không idempotent, kết quả sẽ sai vì các phần tử bị tính nhiều lần.

Ví dụ với mảng $[1, 2, 3, 4]$:

- $\text{sum}[0, 3] = 1 + 2 + 3 + 4 = 10$
- Nếu ghép $\text{sum}[0, 2] + \text{sum}[1, 3] = 6 + 9 = 15$ (sai! vì phần tử $1, 2$ bị tính 2 lần)

Với min/max: $\min(1, 2, 3) = 1$ và $\min(2, 3, 4) = 2$, nên $\min(1, 2) = 1$ (đúng! vì trùng lặp không ảnh hưởng)

### Bảng tính chất idempotent

| Phép toán | Idempotent? | Dùng Sparse Table? |
|-----------|-------------|-------------------|
| min, max | Có ($\min(x,x)=x$) | Có |
| GCD | Có ($\gcd(x,x)=x$) | Có |
| AND, OR | Có | Có |
| Tổng (sum) | Không ($\text{sum}(x,x)=2x$) | Không |
| XOR | Không ($x \oplus x=0$) | Không |

---

## Đánh giá độ phức tạp

### Thời gian

| Thao tác | Độ phức tạp | Giải thích |
|----------|-------------|------------|
| Xây dựng | $O(N \log N)$ | Duyệt $N$ phần tử, mỗi phần tử duyệt $\log N$ tầng |
| Truy vấn | $O(1)$ | Chỉ cần 2 lần tra bảng và 1 phép min/max |

### Bộ nhớ

$O(N \log N)$ - cần lưu bảng $st[N][\log N]$

Với $N = 10^6$, $\log_2(N) \approx 20$ nên bộ nhớ khoảng $10^6 \times 20 \times 4$ bytes $\approx 80$ MB. Đôi khi vượt quá giới hạn, cần cân nhắc dùng Segment Tree nếu thiếu bộ nhớ.

### So sánh tổng thể

| Tiêu chí | Sparse Table | Segment Tree |
|----------|--------------|--------------|
| Thời gian xây dựng | $O(N \log N)$ | $O(N)$ |
| Thời gian truy vấn | $O(1)$ | $O(\log N)$ |
| Bộ nhớ | $O(N \log N)$ | $O(4N)$ |
| Hỗ trợ cập nhật | Không | Có |
| Yêu cầu phép toán | Idempotent | Bất kỳ |

---

## Lưu ý và cạm bẫy

### Chỉ dùng cho mảng tĩnh (không cập nhật)

Sparse Table **không hỗ trợ cập nhật**. Nếu cần cập nhật, dùng Segment Tree.

### __lg() trong C++

`__lg(x)` trả về $\lfloor \log_2(x) \rfloor$ với $x > 0$.

Ví dụ: `__lg(1) = 0`, `__lg(7) = 2`, `__lg(8) = 3`

Trong Python dùng `x.bit_length() - 1`.

**Lưu ý:** `__lg(0)` là không xác định! Đảm bảo $\text{len} > 0$ khi gọi hàm.

### Những lỗi thường gặp

**Lỗi 1: Quên kiểm tra điều kiện biên**

```cpp
// SAI: có thể truy cập ngoài mảng
int query(int l, int r) {
    int k = __lg(r - l + 1);
    return min(st[l][k], st[r - (1 << k) + 1][k]);
}

// ĐÚNG: đảm bảo l <= r và 0 <= l, r < n
int query(int l, int r) {
    assert(l <= r && l >= 0 && r < n);
    int k = __lg(r - l + 1);
    return min(st[l][k], st[r - (1 << k) + 1][k]);
}
```

**Lỗi 2: Sai giá trị LOG**

```cpp
// SAI: LOG quá nhỏ
const int LOG = 10;  // Không đủ cho N = 10^6!

// ĐÚNG: LOG = ceil(log2(MAXN)) + 1
const int LOG = 20;  // 2^20 xấp xỉ 10^6
```

**Lỗi 3: Sai chỉ số trong công thức truy vấn**

```cpp
// SAI: dùng l + (1 << k) thay vì r - (1 << k) + 1
return min(st[l][k], st[l + (1 << k)][k]);

// ĐÚNG:
return min(st[l][k], st[r - (1 << k) + 1][k]);
```

**Lỗi 4: Dùng Sparse Table cho phép toán không idempotent**

```cpp
// SAI: Sum không idempotent!
// sum([1,1]) = 2, nhưng sum(1,1) != 1
// Nếu 2 đoạn chồng lặp, các phần tử chung bị tính 2 lần

// ĐÚNG: Dùng Prefix Sum cho truy vấn tổng
```

**Lỗi 5: 0-indexed vs 1-indexed**

```cpp
// Nếu input là 1-indexed (như CSES), cần chuyển về 0-indexed
cin >> l >> r;
l--; r--;
cout << query(l, r) << endl;
```

**Lỗi 6: Python - Sử dụng math.log2() thay vì bit_length()**

```python
# CHẬM: math.log2() có độ chính xác floating-point
import math
k = int(math.log2(length))  # Có thể sai với số lớn!

# NHANH VÀ CHÍNH XÁC:
k = length.bit_length() - 1
```

---

## Bài tập luyện tập

### Bài tập cơ bản (Làm quen với Sparse Table)

| # | Bài | Nền tảng | Độ khó | Chủ đề |
|---|-----|----------|--------|--------|
| 1 | [CSES - Static Range Minimum Queries](https://cses.fi/problemset/task/1647) | CSES | 2 sao | Sparse Table cơ bản |
| 2 | [SPOJ - RMQSQ](https://www.spoj.com/problems/RMQSQ/) | SPOJ | 2 sao | RMQ cơ bản |
| 3 | [CSES - Static Range Sum Queries](https://cses.fi/problemset/task/1646) | CSES | 1 sao | Prefix Sum (so sánh) |

### Bài tập ứng dụng (Áp dụng Sparse Table)

| # | Bài | Nền tảng | Độ khó | Chủ đề |
|---|-----|----------|--------|--------|
| 4 | [Codeforces - Maximum of Maximums of Minimums](https://codeforces.com/problemset/problem/872/B) | CF | 2 sao | Sparse Table ứng dụng |
| 5 | [Codeforces - Minimum Extraction](https://codeforces.com/problemset/problem/1607/D) | CF | 2 sao | Kết hợp Sparse Table |
| 6 | [VNOJ - Query Min](https://oj.vnoi.info/problem/qmin) | VNOJ | 2 sao | RMQ cơ bản |
| 7 | [VNOJ - NKLINEUP](https://oj.vnoi.info/problem/nklineup) | VNOJ | 2 sao | Truy vấn max-min |

### Bài tập nâng cao (Kết hợp nhiều kỹ thuật)

| # | Bài | Nền tảng | Độ khó | Chủ đề |
|---|-----|----------|--------|--------|
| 8 | [Codeforces - Pair of Numbers](https://codeforces.com/problemset/problem/359/D) | CF | 3 sao | Sparse Table + GCD |
| 9 | [CSES - Range Queries and Copies](https://cses.fi/problemset/task/2072) | CSES | 3 sao | Không dùng Sparse Table (có update) |
| 10 | [Codeforces - Yet Another Minimization Problem](https://codeforces.com/problemset/problem/1809/E) | CF | 3 sao | Sparse Table tối ưu |

### Bài tập tham khảo (Không dùng Sparse Table nhưng liên quan)

| # | Bài | Nền tảng | Độ khó | Ghi chú |
|---|-----|----------|--------|---------|
| 11 | [CSES - Dynamic Range Minimum Queries](https://cses.fi/problemset/task/1649) | CSES | 2 sao | Dùng Segment Tree (có update) |
| 12 | [CSES - Range Update Queries](https://cses.fi/problemset/task/1651) | CSES | 2 sao | Dùng Lazy Propagation |

---

## Tổng kết

| Đặc điểm | Giá trị |
|-----------|---------|
| Thời gian xây dựng | $O(N \log N)$ |
| Thời gian truy vấn | $O(1)$ |
| Bộ nhớ | $O(N \log N)$ |
| Hỗ trợ cập nhật | Không |
| Yêu cầu phép toán | Idempotent (min, max, GCD, AND, OR) |

**Khi nào dùng Sparse Table?**
- Mảng tĩnh (không cập nhật)
- Cần truy vấn min/max/GCD nhanh $O(1)$
- Có đủ bộ nhớ ($O(N \log N)$)

**Khi nào KHÔNG dùng?**
- Cần cập nhật: dùng Segment Tree
- Phép toán không idempotent (sum, XOR): dùng Prefix Sum/BIT
- Thiếu bộ nhớ: dùng Segment Tree ($O(4N)$)

---

## Tài liệu tham khảo

- [CP-Algorithms - Sparse Table](https://cp-algorithms.com/data_structures/sparse-table.html)
- [GeeksforGeeks - Sparse Table](https://www.geeksforgeeks.org/dsa/sparse-table/)
- [YouTube - Sparse Table (takeuforward)](https://www.youtube.com/watch?v=0jWeUdxJmK4)
- [VNOI Wiki - Range Minimum Query](https://wiki.vnoi.info/algo/data-structures/rmq)

**Bài trước:** [Cây khoảng](segment-tree.md) | **Bài tiếp theo:** [BST](bst.md)
