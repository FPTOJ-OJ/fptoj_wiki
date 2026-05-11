# Bài 3: Tìm Kiếm Nhị Phân - Chia Để Trị Trong 20 Bước!

> **Tác giả:** Hà Trí Kiên
> **Nội dung tham khảo từ:** VNOI Wiki - Tìm kiếm nhị phân, Topcoder - Binary Search

## 1. Chuyện gì đang xảy ra?

### Bài toán: Tìm sách trong thư viện

Bạn vào thư viện có **1.000.000 cuốn sách** xếp theo thứ tự ABC. Bạn muốn tìm cuốn sách có tên bắt đầu bằng chữ "T".

**Cách 1 - Tìm tuyến tính (dùng tay):** Đọc từng cuốn từ đầu đến cuối → Cần tới **1.000.000 lần** kiểm tra. 😩

**Cách 2 - Tìm nhị phân (thông minh):**
- Mở ra giữa giá sách → thấy chữ "M" → "T" nằm sau "M" → bỏ nửa đầu!
- Mở ra giữa nửa sau → thấy chữ "S" → "T" nằm sau "S" → bỏ thêm nửa!
- Mở ra giữa phần còn lại → thấy chữ "T" → **Tìm thấy!**

Chỉ cần **~20 bước** thay vì 1 triệu bước! Đó là sức mạnh của **Tìm kiếm nhị phân** (Binary Search)!

---

## 2. Toán học bổ trợ: Giải ngố cấp tốc

### Hàm đơn điệu là gì?

**Đơn điệu tăng:** Nếu x tăng thì f(x) cũng tăng (hoặc giữ nguyên).

Ví dụ: Mảng đã sắp xếp tăng [1, 3, 5, 7, 9] → chỉ số tăng thì giá trị tăng. Đây chính là "hàm đơn điệu tăng"!

**Tại sao quan trọng?** Tìm kiếm nhị phân **chỉ áp dụng được** khi dữ liệu có tính đơn điệu (đã sắp xếp, hoặc hàm kiểm tra có dạng false-false-...-true-true-...).

### Làm tròn khi chia số nguyên

Khi tính `mid = (lo + hi) / 2` với số nguyên:
- (3 + 7) / 2 = 5 ✅
- (3 + 8) / 2 = 5 (làm tròn xuống) ✅

**Lưu ý quan trọng:** Dùng `mid = lo + (hi - lo) / 2` thay vì `(lo + hi) / 2` để **tránh tràn số** khi lo + hi quá lớn!

---

## 3. Thuật toán này hoạt động như thế nào?

### Tìm kiếm nhị phân cơ bản - Tìm phần tử trong mảng đã sắp xếp

**Ý tưởng cốt lõi:**
1. Giữ 2 biến `lo` (đầu) và `hi` (cuối) đánh dấu khoảng tìm kiếm
2. Xét phần tử ở giữa `mid`:
   - Nếu `a[mid] == target` → **Tìm thấy!**
   - Nếu `a[mid] < target` → Target nằm bên phải → `lo = mid + 1`
   - Nếu `a[mid] > target` → Target nằm bên trái → `hi = mid - 1`
3. Lặp lại cho đến khi `lo > hi` (không tìm thấy)

**Minh họa:** Tìm 55 trong mảng [0, 5, 13, 19, 21, 41, 55, 68, 72, 81, 98]

```
Bước 1: lo=0, hi=10, mid=5 → a[5]=41 < 55 → lo=6
         [0, 5, 13, 19, 21, 41, | 55, 68, 72, 81, 98]
                                  ↑ tìm bên phải

Bước 2: lo=6, hi=10, mid=8 → a[8]=72 > 55 → hi=7
         [55, 68, | 72, 81, 98]
          ↑ tìm bên trái

Bước 3: lo=6, hi=7, mid=6 → a[6]=55 == 55 → TÌM THẤY! ✅
```

### Tìm kiếm nhị phân tổng quát - "Ma thuật" thực sự!

Ngoài việc tìm phần tử trong mảng, Binary Search còn giải được **rất nhiều bài toán** khác! Bí quyết là:

> **Thiết kế hàm kiểm tra P(x) có tính chất:** Nếu P(x) = true thì mọi y > x cũng = true.

Khi đó dãy P(S) sẽ có dạng: `false, false, ..., false, true, true, ..., true`

→ Dùng Binary Search tìm **giá trị x nhỏ nhất** mà P(x) = true!

**Ví dụ thực tế - Bài toán vận chuyển:**

> Có N gói hàng, cần chuyển trong `days` ngày. Mỗi ngày chỉ chở được tối đa `MAX` kg. Tìm `MAX` nhỏ nhất!

**Hàm kiểm tra P(MAX):** "Với sức chở MAX, có thể chuyển hết hàng trong `days` ngày không?"

- P(MAX) = true → mọi MAX' > MAX cũng = true (chở được nhiều hơn → càng dễ xong)
- P(MAX) = false → mọi MAX' < MAX cũng = false (chở ít hơn → càng không xong)

→ Dùng Binary Search tìm MAX nhỏ nhất mà P(MAX) = true!

### Độ phức tạp

Mỗi bước giảm một nửa không gian tìm kiếm → **O(log N)**

| N | Số bước tối đa |
|---|----------------|
| 1.000 | 10 |
| 1.000.000 | 20 |
| 1.000.000.000 | 30 |

---

## 4. Bắt tay vào Code nào!

### Code C++: Binary Search cơ bản

```cpp
#include <bits/stdc++.h>
using namespace std;

// ===== Tìm kiếm nhị phân cơ bản =====
// Tìm xem 'target' có trong mảng đã sắp xếp không
int binarySearch(int a[], int n, int target) {
    int lo = 0, hi = n - 1;
    
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;  // Tránh tràn số!
        
        if (a[mid] == target)
            return mid;                 // Tìm thấy!
        else if (a[mid] < target)
            lo = mid + 1;              // Tìm bên phải
        else
            hi = mid - 1;              // Tìm bên trái
    }
    return -1;  // Không tìm thấy
}

int main() {
    int a[] = {0, 5, 13, 19, 21, 41, 55, 68, 72, 81, 98};
    int n = 11;
    
    cout << binarySearch(a, n, 55) << endl;  // Output: 6
    cout << binarySearch(a, n, 100) << endl; // Output: -1
    return 0;
}
```

### Code C++: Binary Search tổng quát (quan trọng nhất!)

```cpp
#include <bits/stdc++.h>
using namespace std;

// ===== Template Binary Search tổng quát =====
// Tìm giá trị x nhỏ nhất mà P(x) = true
// Điều kiện: dãy P(x) có dạng [false, false, ..., true, true, ...]

bool P(int x) {
    // Hàm kiểm tra: viết logic bài toán ở đây
    // Trả về true nếu x là "hợp lệ"
    return true;  // Thay bằng logic thực
}

int binarySearch(int lo, int hi) {
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (P(mid))
            hi = mid;       // mid có thể là kết quả → giữ lại
        else
            lo = mid + 1;   // mid không hợp lệ → bỏ cả mid
    }
    
    // Kiểm tra xem có nghiệm không
    if (!P(lo)) return -1;
    return lo;
}

// ===== Ví dụ: Tìm căn bậc 2 của số N =====
// Tìm x lớn nhất sao cho x*x <= N
bool isGood(long long x, long long N) {
    return x * x <= N;  // true nếu x^2 <= N
}

int sqrtBinarySearch(long long N) {
    long long lo = 0, hi = N;
    while (lo < hi) {
        long long mid = lo + (hi - lo + 1) / 2;  // +1 để tránh lặp vô hạn
        if (isGood(mid, N))
            lo = mid;       // mid hợp lệ → giữ lại
        else
            hi = mid - 1;   // mid quá lớn → bỏ
    }
    return lo;
}

// ===== Ví dụ: Bài toán vận chuyển (Leetcode 1011) =====
bool canShip(vector<int>& weights, int capacity, int days) {
    int currentWeight = 0;
    int daysUsed = 1;
    
    for (int w : weights) {
        if (currentWeight + w <= capacity) {
            currentWeight += w;     // Chuyển trong ngày hiện tại
        } else {
            daysUsed++;             // Cần thêm ngày mới
            currentWeight = w;
        }
    }
    return daysUsed <= days;  // true nếu chuyển xong trong 'days' ngày
}

int shipWithinDays(vector<int>& weights, int days) {
    int lo = 0, hi = 0;
    for (int w : weights) {
        lo = max(lo, w);    // Cận dưới: gói nặng nhất
        hi += w;             // Cận trên: tổng tất cả
    }
    
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (canShip(weights, mid, days))
            hi = mid;        // Chuyển được → thử capacity nhỏ hơn
        else
            lo = mid + 1;    // Chuyển không được → cần capacity lớn hơn
    }
    return lo;
}
```

### Code C++: Dùng thư viện STL

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> a = {1, 3, 5, 7, 9, 11, 13};
    
    // 1. binary_search: Kiểm tra xem phần tử có tồn tại không
    bool found = binary_search(a.begin(), a.end(), 7);  // true
    
    // 2. lower_bound: Tìm vị trí ĐẦU TIÊN mà giá trị >= x
    auto it1 = lower_bound(a.begin(), a.end(), 6);
    // it1 trỏ đến phần tử 7 (vị trí đầu tiên >= 6)
    
    // 3. upper_bound: Tìm vị trí ĐẦU TIÊN mà giá trị > x
    auto it2 = upper_bound(a.begin(), a.end(), 7);
    // it2 trỏ đến phần tử 9 (vị trí đầu tiên > 7)
    
    // Đếm số phần tử bằng x:
    // upper_bound - lower_bound
    
    return 0;
}
```

### Code Python

```python
# ===== Binary Search cơ bản =====
def binary_search(a, target):
    lo, hi = 0, len(a) - 1
    while lo <= hi:
        mid = lo + (hi - lo) // 2  # Tránh tràn số
        if a[mid] == target:
            return mid          # Tìm thấy!
        elif a[mid] < target:
            lo = mid + 1        # Tìm bên phải
        else:
            hi = mid - 1        # Tìm bên trái
    return -1                   # Không tìm thấy

# ===== Binary Search tổng quát =====
def binary_search_general(lo, hi, P):
    """Tìm x nhỏ nhất mà P(x) = true"""
    while lo < hi:
        mid = lo + (hi - lo) // 2
        if P(mid):
            hi = mid            # mid hợp lệ → giữ lại
        else:
            lo = mid + 1        # mid không hợp lệ → bỏ
    return lo if P(lo) else -1

# ===== Ví dụ: Tìm căn bậc 2 =====
def sqrt_binary(n):
    lo, hi = 0, n
    while lo < hi:
        mid = lo + (hi - lo + 1) // 2
        if mid * mid <= n:
            lo = mid
        else:
            hi = mid - 1
    return lo

# ===== Dùng thư viện Python =====
import bisect
a = [1, 3, 5, 7, 9, 11, 13]
pos = bisect.bisect_left(a, 7)   # Tìm vị trí đầu tiên >= 7
pos2 = bisect.bisect_right(a, 7) # Tìm vị trí đầu tiên > 7
```

---

## 5. Lưu ý / Cạm bẫy hay gặp

### Bẫy 1: Lặp vô hạn!

```cpp
// SAI: Có thể lặp vô hạn khi lo = hi - 1
while (lo < hi) {
    int mid = lo + (hi - lo) / 2;
    if (P(mid))
        hi = mid;
    else
        lo = mid;   // ← SAI! Phải là lo = mid + 1
}

// ĐÚNG:
while (lo < hi) {
    int mid = lo + (hi - lo) / 2;
    if (P(mid))
        hi = mid;
    else
        lo = mid + 1;  // ← Loại bỏ mid
}
```
```python
# SAI: Có thể lặp vô hạn khi lo = hi - 1
while lo < hi:
    mid = lo + (hi - lo) // 2
    if P(mid):
        hi = mid
    else:
        lo = mid        # ← SAI! Phải là lo = mid + 1

# ĐÚNG:
while lo < hi:
    mid = lo + (hi - lo) // 2
    if P(mid):
        hi = mid
    else:
        lo = mid + 1    # ← Loại bỏ mid
```

### Bẫy 2: Tràn số khi tính mid

```cpp
// SAI: (lo + hi) có thể tràn số nguyên
int mid = (lo + hi) / 2;

// ĐÚNG:
int mid = lo + (hi - lo) / 2;
```
```python
# Python không tràn số, nhưng nên dùng cách đúng để nhất quán
mid = lo + (hi - lo) // 2
```

### Bẫy 3: Sai cận khi tìm "false cuối cùng"

Khi tìm `x` lớn nhất mà `P(x) = false`:

```cpp
while (lo < hi) {
    int mid = lo + (hi - lo + 1) / 2;  // ← +1 để làm tròn lên!
    if (P(mid))
        hi = mid - 1;
    else
        lo = mid;
}
```
```python
while lo < hi:
    mid = lo + (hi - lo + 1) // 2       # ← +1 để làm tròn lên!
    if P(mid):
        hi = mid - 1
    else:
        lo = mid
```

**Lý do:** Nếu dùng `mid = lo + (hi - lo) / 2` và chỉ còn 2 phần tử [false, true], mid sẽ = lo, vòng lặp sẽ lặp vô hạn!

### Bẫy 4: Quên kiểm tra điều kiện mảng đã sắp xếp

Binary Search **chỉ hoạt động** trên dữ liệu đã sắp xếp! Nếu mảng chưa sắp xếp → kết quả sai hoàn toàn.

### Bẫy 5: Binary Search trên số thực

```cpp
// Dừng khi khoảng đủ nhỏ (epsilon = 1e-9)
while (hi - lo > 1e-9) {
    double mid = (lo + hi) / 2.0;
    if (P(mid))
        hi = mid;
    else
        lo = mid;
}
```
```python
# Dừng khi khoảng đủ nhỏ (epsilon = 1e-9)
while hi - lo > 1e-9:
    mid = (lo + hi) / 2.0
    if P(mid):
        hi = mid
    else:
        lo = mid

# Hoặc lặp đúng 100 lần (đủ chính xác cho hầu hết bài toán)
for _ in range(100):
    mid = (lo + hi) / 2.0
    if P(mid):
        hi = mid
    else:
        lo = mid
```

Hoặc lặp đúng 100 lần (đủ chính xác cho hầu hết bài toán).

### Mẹo thi cử: Nhận biết bài Binary Search

Bài toán có thể dùng Binary Search khi:
1. Cần tìm **giá trị min/max** thỏa mãn điều kiện nào đó
2. Hàm kiểm tra có tính chất **đơn điệu**: nếu x thỏa mãn thì mọi y > x (hoặc y < x) cũng thỏa mãn
3. Dễ dàng viết hàm kiểm tra P(x) với độ phức tạp hợp lý

**Template nhanh:**
```
lo = cận dưới, hi = cận trên
while (lo < hi):
    mid = (lo + hi) / 2
    if P(mid) hợp lệ:
        hi = mid
    else:
        lo = mid + 1
return lo
```

---

---

## Tài liệu tham khảo

- [VNOI Wiki - Tìm kiếm nhị phân](https://wiki.vnoi.info/algo/basic/binary-search)
- [Topcoder - Binary Search](https://www.topcoder.com/thrive/articles/Binary%20Search)
- [CP-Algorithms - Binary Search](https://cp-algorithms.com/num_methods/binary_search.html)
- [USACO Guide - Binary Search](https://usaco.guide/silver/binary-search)
- [YouTube - Binary Search (Errichto)](https://www.youtube.com/watch?v=GU7DpgHINWQ)
- [LeetCode - Binary Search Study Plan](https://leetcode.com/studyplan/binary-search/)

**Bài tiếp theo:** [Kĩ thuật hai con trỏ →](04-ky-thuat-hai-con-tro.md)
