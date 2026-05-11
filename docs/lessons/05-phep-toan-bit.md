# Bài 5: Phép Toán Bit - Ma Thuật Với 0 và 1!

> **Tác giả:** Hà Trí Kiên<br>
> **Nội dung tham khảo từ:** VNOI Wiki - Phép toán bit

## 1. Chuyện gì đang xảy ra?

### Bài toán: Quản lý nhóm bạn

Bạn có 5 người bạn: An, Bình, Chi, Dũng, Em. Mỗi người có thể **đi** hoặc **không đi** picnic.

Thay vì lưu `{true, false, true, false, true}`, ta dùng 1 con số: `10101` (đọc từ phải: Em=1, Dũng=0, Chi=1, Bình=0, An=1).

→ Chỉ cần **1 số nguyên** là lưu được cả tập hợp! Đó là sức mạnh của **Bitmask** (mặt nạ bit)!

---

## 2. Toán học bổ trợ: Giải ngố cấp tốc

### Hệ nhị phân (Binary) là gì?

Thay vì đếm theo 10 (thập phân), ta đếm theo 2 (nhị phân):

| Thập phân | Nhị phân | Giải thích |
|-----------|----------|------------|
| 0 | 000 | |
| 1 | 001 | 2⁰ = 1 |
| 2 | 010 | 2¹ = 2 |
| 3 | 011 | 2¹ + 2⁰ = 3 |
| 4 | 100 | 2² = 4 |
| 5 | 101 | 2² + 2⁰ = 5 |
| 6 | 110 | 2² + 2¹ = 6 |
| 7 | 111 | 2² + 2¹ + 2⁰ = 7 |
| 8 | 1000 | 2³ = 8 |

**Mẹo:** Bit thứ `i` (đếm từ 0) tương ứng với giá trị 2^i.

### Bitmask là gì?

**Bitmask** = 1 số nguyên mà mỗi bit biểu diễn 1 "cờ hiệu" (bật/tắt).

Ví dụ: Quản lý 5 người bạn = bitmask 5 bit:
```
Bit:    4   3   2   1   0
Người:  An  Bình Chi Dũng Em
Giá trị: 1   0   1   0   1
```
→ `10101₂` = 21₁₀ → Tập hợp {Em, Chi, An} được lưu bằng số 21!

---

## 3. Thuật toán này hoạt động như thế nào?

### 3.1. 3 phép toán logic cơ bản

**AND (&):** Cả 2 đều bật → bật. (Như "VÀ")

```
  1 1 1 0 0 1 0 1
& 1 0 1 0 1 1 1 0
= 1 0 1 0 0 1 0 0
```

**OR (|):** Ít nhất 1 bật → bật. (Như "HOẶC")

```
  1 1 1 0 0 1 0 1
| 1 0 1 0 1 1 1 0
= 1 1 1 0 1 1 1 1
```

**XOR (^):** Khác nhau → bật. (Như "HOẶC KHÔNG ĐỒNG THỜI")

```
  1 1 1 0 0 1 0 1
^ 1 0 1 0 1 1 1 0
= 0 1 0 0 1 0 1 1
```

**NOT (~):** Đảo tất cả 0↔1.

### 3.2. Phép dịch bit (Bitshift)

**Dịch trái `<<`:** Nhân với 2^n. Ví dụ: `5 << 2` = `101 << 2` = `10100` = 20 = 5 × 4

**Dịch phải `>>`:** Chia cho 2^n. Ví dụ: `20 >> 2` = `10100 >> 2` = `101` = 5 = 20 ÷ 4

### 3.3. Các thao tác trên tập hợp

| Thao tác | Code | Giải thích |
|----------|------|------------|
| Thêm phần tử i | `mask \| (1 << i)` | Bật bit thứ i |
| Xóa phần tử i | `mask & ~(1 << i)` | Tắt bit thứ i |
| Kiểm tra phần tử i | `mask & (1 << i)` | Bit thứ i có bật không? |
| Lật phần tử i | `mask ^ (1 << i)` | Bật↔tắt bit thứ i |
| Đếm phần tử | `__builtin_popcount(mask)` | Đếm số bit 1 |
| Giao 2 tập | `A & B` | Phần tử chung |
| Hợp 2 tập | `A \| B` | Tất cả phần tử |

### 3.4. Duyệt tất cả tập con

Vì mỗi số nguyên từ `0` đến `2^n - 1` biểu diễn một tập con (mỗi bit bật/tắt tương ứng với có/không chọn phần tử đó), ta chỉ cần lặp qua tất cả giá trị đó:

```cpp
for (int mask = 0; mask < (1 << n); mask++) {
    // mask là mỗi tập con của {0, 1, ..., n-1}
    // mask = 0 → tập rỗng {}
    // mask = 1 → {0}, mask = 2 → {1}, mask = 3 → {0, 1}, ...
}
```
```python
for mask in range(1 << n):
    # mask là mỗi tập con của {0, 1, ..., n-1}
    pass
```

Với n phần tử → có 2^n tập con. Ứng dụng: khi N ≤ 20, duyệt tất cả tập con trong O(2^N) là chấp nhận được.

### 3.5. Các trick bit kinh điển trong thi đấu

| Trick | Code | Giải thích |
|-------|------|------------|
| Kiểm tra số lẻ | `n & 1` | Trả về 1 nếu n lẻ, 0 nếu chẵn |
| Kiểm tra lũy thừa 2 | `n > 0 && (n & (n-1)) == 0` | Số lũy thừa 2 chỉ có đúng 1 bit |
| Xóa bit thấp nhất | `n & (n-1)` | Ứng dụng: đếm bit 1 |
| Lấy bit thấp nhất | `n & (-n)` | Dùng trong Fenwick Tree |
| Làm tròn lên lũy thừa 2 | `1 << (int)ceil(log2(n))` | - |
| Đổi dấu | `-n = ~n + 1` | Định nghĩa số bù 2 |

**Giải thích `n & (n-1)` xóa bit thấp nhất:**
```
n     = 1100₂  (12)
n-1   = 1011₂  (11)
n&n-1 = 1000₂  (8) → xóa bit thấp nhất!
```
Ứng dụng: đếm số bit 1 bằng cách liên tục xóa bit thấp nhất đến khi n = 0.

---

## 4. Bắt tay vào Code nào!

### Ứng dụng 1: Thao tác tập hợp bằng bitmask

Giả sử ta có N = 5 người và muốn quản lý xem ai được mời:

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    // mask = 10101₂ = người 0, 2, 4 được mời
    int mask = 0b10101;
    
    // Thêm người 1 vào danh sách → bật bit 1
    mask |= (1 << 1);    // mask = 10111₂ → người 0,1,2,4 được mời
    
    // Mời nhầm người 2, xóa đi → tắt bit 2
    mask &= ~(1 << 2);   // mask = 10011₂ → người 0,1,4 được mời
    
    // Kiểm tra người 1 có trong danh sách không?
    if (mask & (1 << 1))
        cout << "Nguoi 1 duoc moi\n";   // In ra: Nguoi 1 duoc moi
    
    // Đếm số người được mời
    cout << "So nguoi: " << __builtin_popcount(mask) << endl;  // 3
    
    return 0;
}
```

### Ứng dụng 2: XOR tìm số duy nhất — trick hay nhất của bitmask!

**Bài toán:** Mảng N số, trong đó tất cả số xuất hiện **đúng 2 lần**, riêng 1 số xuất hiện **1 lần duy nhất**. Tìm số đó.

**Trick:** XOR toàn bộ mảng! Vì `a XOR a = 0` và `a XOR 0 = a`, nên các cặp số triệt tiêu nhau, chỉ còn lại số lẻ.

```cpp
// XOR toàn bộ → kết quả là số xuất hiện 1 lần
int findSingle(vector<int>& a) {
    int result = 0;
    for (int x : a)
        result ^= x;     // Cặp số giống nhau XOR nhau = 0, số lẻ còn lại
    return result;
}
// Ví dụ: [2, 3, 5, 3, 2] → 2^3^5^3^2 = 5 ✅
// Độ phức tạp: O(N) thời gian, O(1) bộ nhớ — không cần HashMap!
```
```python
def find_single(a):
    result = 0
    for x in a:
        result ^= x     # XOR lần lượt từng phần tử
    return result
# Ví dụ: find_single([2, 3, 5, 3, 2]) → 5 ✅
```

### Ứng dụng 3: Đếm số bit 1 — trick tối ưu

```cpp
// Cách 1: Thư viện GCC — O(1)
int count1 = __builtin_popcount(n);     // n là int
int count2 = __builtin_popcountll(n);   // n là long long

// Cách 2: Xóa bit thấp nhất lặp đi lặp lại — O(số bit 1)
int countBits(int n) {
    int count = 0;
    while (n) {
        n &= (n - 1);   // Xóa bit 1 thấp nhất: 1100 → 1000 → 0000
        count++;
    }
    return count;
}
```
```python
# Python có sẵn hàm bin() để đếm
count = bin(n).count('1')

# Hoặc dùng int.bit_count() từ Python 3.10+
count = n.bit_count()
```

### Ứng dụng 4: Duyệt tất cả tập con — nền tảng của bitmask DP

In tất cả tập con của tập {0, 1, 2}:

```cpp
int n = 3;
for (int mask = 0; mask < (1 << n); mask++) {
    // Với mỗi mask, in ra phần tử nào được chọn (bit nào được bật)
    cout << "{ ";
    for (int i = 0; i < n; i++) {
        if (mask & (1 << i))       // Bit thứ i có bật không?
            cout << i << " ";
    }
    cout << "}\n";
}
// Output:
// {  }        → mask=000: tập rỗng
// { 0 }       → mask=001: chọn phần tử 0
// { 1 }       → mask=010: chọn phần tử 1
// { 0 1 }     → mask=011: chọn 0 và 1
// { 2 }       → mask=100: chọn phần tử 2
// { 0 2 }     → mask=101: chọn 0 và 2
// { 1 2 }     → mask=110: chọn 1 và 2
// { 0 1 2 }   → mask=111: chọn tất cả
```
```python
n = 3
for mask in range(1 << n):
    # Lấy ra danh sách các phần tử được chọn
    subset = [i for i in range(n) if mask & (1 << i)]
    print(subset)
```

### Ứng dụng 5: Bitmask DP — giải bài toán phân công tối ưu

**Bài toán:** N người, N việc. Chi phí `cost[i][j]` = chi phí để người i làm việc j. Mỗi người làm đúng 1 việc. Tìm cách phân công có chi phí nhỏ nhất.

**Ý tưởng:** `dp[mask]` = chi phí nhỏ nhất để hoàn thành các công việc tương ứng với các bit 1 trong `mask`.

```cpp
// N người, N việc, n ≤ 20
vector<int> dp(1 << n, INT_MAX);
dp[0] = 0;  // Chưa làm việc nào, chi phí = 0

for (int mask = 0; mask < (1 << n); mask++) {
    if (dp[mask] == INT_MAX) continue;
    
    // Người tiếp theo cần làm việc (= số bit 1 trong mask)
    int person = __builtin_popcount(mask);
    if (person >= n) continue;
    
    // Thử giao việc j cho person
    for (int job = 0; job < n; job++) {
        if (!(mask & (1 << job))) {            // Việc job chưa làm
            int newMask = mask | (1 << job);   // Đánh dấu việc job đã làm
            dp[newMask] = min(dp[newMask], dp[mask] + cost[person][job]);
        }
    }
}
// Kết quả: dp[(1<<n)-1] = chi phí nhỏ nhất (tất cả việc đã xong)
```

---

## 5. Lưu ý / Cạm bẫy hay gặp

### Bẫy 1: Tràn số khi dịch bit

```cpp
// SAI: 1 là kiểu int, 1 << 40 bị tràn!
long long x = 1 << 40;

// ĐÚNG: dùng 1LL
long long x = 1LL << 40;
```
```python
# Python tự động xử lý số lớn, không cần lo tràn
x = 1 << 40
```

### Bẫy 2: Thứ tự ưu tiên toán tử

```cpp
// SAI: & có ưu tiên thấp hơn ==
if (mask & (1 << i) == 0) ...  // Được hiểu là: mask & ((1 << i) == 0)

// ĐÚNG: dùng ngoặc
if ((mask & (1 << i)) == 0) ...
```
```python
# SAI: & có ưu tiên thấp hơn ==
if mask & (1 << i) == 0: ...    # Được hiểu là: mask & ((1 << i) == 0)

# ĐÚNG: dùng ngoặc
if (mask & (1 << i)) == 0: ...
```

### Bẫy 3: NOT (~) trên int

```cpp
int mask = 0b101;
~mask = ...11111111111111111111111111111010  // Đảo TẤT CẢ bit, kể cả bit dấu!

// ĐÚNG: chỉ đảo n bit đầu
int not_mask = mask ^ ((1 << n) - 1);
```
```python
mask = 0b101
# Python: ~mask = -(mask+1) do bù 2, KHÔNG dùng được như C++!
# Ví dụ: ~0b101 = -6, không phải 0b...010

# ĐÚNG: chỉ đảo n bit đầu
not_mask = mask ^ ((1 << n) - 1)
```

### Mẹo thi cử

- N ≤ 20 → dùng bitmask + duyệt tập con (2²⁰ ≈ 10⁶)
- N ≤ 64 → dùng `long long` làm bitmask
- `__builtin_popcount(x)` đếm số bit 1 → O(1) trên GCC

---

## Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Bit Strings](https://cses.fi/problemset/task/1715) | CSES | ⭐ | Lũy thừa 2 |
| [LeetCode - Single Number](https://leetcode.com/problems/single-number/) | LC | ⭐ | XOR |
| [LeetCode - Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/) | LC | ⭐ | Đếm bit |
| [CF - XOR and OR](https://codeforces.com/) | CF | ⭐⭐ | Bitmask |
| [LeetCode - Subsets](https://leetcode.com/problems/subsets/) | LC | ⭐⭐ | Duyệt bitmask |

## Bài viết liên quan

- [Bài 6: Đệ quy và quay lui](06-de-quy-va-quay-lui.md)
- [Bài 27: Lý thuyết trò chơi](27-ly-thuyet-tro-choi.md)

## Tài liệu tham khảo

- [VNOI Wiki - Phép toán bit](https://wiki.vnoi.info/algo/basic/bitwise-operators)
- [Topcoder - Bit Manipulation](https://www.topcoder.com/thrive/articles/A%20bit%20of%20fun%20:%20fun%20with%20bits)
- [GeeksforGeeks - Bitwise Operators in C++](https://www.geeksforgeeks.org/cpp/bitwise-operators-in-cpp/)
- [CP-Algorithms - Bit Manipulation](https://cp-algorithms.com/algebra/bit-manipulation.html)

**Bài tiếp theo:** [Đệ quy và quay lui →](06-de-quy-va-quay-lui.md)
