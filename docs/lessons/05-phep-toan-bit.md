# Bài 5: Phép Toán Bit - Ma Thuật Với 0 và 1!

> **Tác giả:** Hà Trí Kiên
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

```cpp
for (int mask = 0; mask < (1 << n); mask++) {
    // mask là mỗi tập con của {0, 1, ..., n-1}
}
```

Với n phần tử → có 2^n tập con.

---

## 4. Bắt tay vào Code nào!

### Code C++

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    // ===== Thao tác cơ bản =====
    int mask = 0b10101;  // Tập hợp {0, 2, 4}
    
    // Thêm phần tử 1
    mask |= (1 << 1);    // mask = 10111 = {0, 1, 2, 4}
    
    // Xóa phần tử 2
    mask &= ~(1 << 2);   // mask = 10101 = {0, 1, 4}
    
    // Kiểm tra phần tử 1
    if (mask & (1 << 1))
        cout << "Phan tu 1 co trong tap hop\n";
    
    // ===== Giao và hợp 2 tập =====
    int A = 0b1101;  // {0, 2, 3}
    int B = 0b1011;  // {0, 1, 3}
    
    int giao = A & B;    // 1001 = {0, 3}
    int hop  = A | B;    // 1111 = {0, 1, 2, 3}
    int hieu = (A ^ B) & A;  // 0100 = {2}
    
    // ===== Đếm số phần tử =====
    cout << "So phan tu: " << __builtin_popcount(A) << endl;  // 3
    
    // ===== Duyệt tất cả tập con của {0, 1, 2} =====
    int n = 3;
    for (int mask = 0; mask < (1 << n); mask++) {
        cout << "{ ";
        for (int i = 0; i < n; i++) {
            if (mask & (1 << i))
                cout << i << " ";
        }
        cout << "}\n";
    }
    
    // ===== Duyệt tập con của một bitmask =====
    int S = 0b1101;  // Tập S = {0, 2, 3}
    for (int sub = S; ; sub = (sub - 1) & S) {
        // sub là tập con của S
        cout << __builtin_popcount(sub) << " ";
        if (sub == 0) break;
    }
    
    return 0;
}
```

### Code Python

```python
# ===== Thao tác cơ bản =====
mask = 0b10101  # Tập hợp {0, 2, 4}

# Thêm phần tử 1
mask |= (1 << 1)    # mask = 0b10111

# Xóa phần tử 2
mask &= ~(1 << 2)   # mask = 0b10101

# Kiểm tra phần tử 1
if mask & (1 << 1):
    print("Phan tu 1 co trong tap hop")

# ===== Đếm số bit 1 =====
print(bin(mask).count('1'))  # 3

# ===== Duyệt tất cả tập con =====
n = 3
for mask in range(1 << n):
    subset = [i for i in range(n) if mask & (1 << i)]
    print(subset)
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

### Bẫy 2: Thứ tự ưu tiên toán tử

```cpp
// SAI: & có ưu tiên thấp hơn ==
if (mask & (1 << i) == 0) ...  // Được hiểu là: mask & ((1 << i) == 0)

// ĐÚNG: dùng ngoặc
if ((mask & (1 << i)) == 0) ...
```

### Bẫy 3: NOT (~) trên int

```cpp
int mask = 0b101;
~mask = ...11111111111111111111111111111010  // Đảo TẤT CẢ bit, kể cả bit dấu!

// ĐÚNG: chỉ đảo n bit đầu
int not_mask = mask ^ ((1 << n) - 1);
```

### Mẹo thi cử

- N ≤ 20 → dùng bitmask + duyệt tập con (2²⁰ ≈ 10⁶)
- N ≤ 64 → dùng `long long` làm bitmask
- `__builtin_popcount(x)` đếm số bit 1 → O(1) trên GCC

---

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
