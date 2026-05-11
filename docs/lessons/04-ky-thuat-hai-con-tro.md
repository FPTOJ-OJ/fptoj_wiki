# Bài 4: Kĩ Thuật Hai Con Trỏ - Biến O(N²) Thành O(N)!

> **Tác giả:** Hà Trí Kiên<br>
> **Nội dung tham khảo từ:** VNOI Wiki - Kĩ thuật hai con trỏ

## 1. Chuyện gì đang xảy ra?

### Bài toán: Tìm 2 lon nước ngọt

Bạn có N lon nước ngọt đã được xếp theo dung tích tăng dần. Cần tìm 2 lon có **tổng dung tích đúng bằng X** ml.

**Cách "ngốc":** Thử mọi cặp → O(N²) phép so sánh. Với N = 10⁶ → 10¹² phép tính → **quá chậm!**

**Cách thông minh (Hai con trỏ):**

- Đặt 1 ngón tay trái ở lon đầu tiên, 1 ngón tay phải ở lon cuối cùng
- Nếu tổng < X → tay trái sang phải (cần lon lớn hơn)
- Nếu tổng > X → tay phải sang trái (cần lon nhỏ hơn)
- Nếu tổng = X → **Tìm thấy!**

Chỉ cần **O(N)** phép so sánh! 🚀

---

## 2. Toán học bổ trợ: Giải ngố cấp tốc

### Tại sao hai con trỏ lại hoạt động?

Bí quyết nằm ở tính chất **đơn điệu** (đã sắp xếp):

- Nếu `a[left] + a[right] > X`, thì `a[left] + a[right-1]`, `a[left] + a[right-2]`, ... đều > X → bỏ luôn right, giảm right!
- Nếu `a[left] + a[right] < X`, thì `a[left+1] + a[right]`, `a[left+2] + a[right]`, ... đều < X → bỏ luôn left, tăng left!

Mỗi bước, ta **loại bỏ ít nhất 1 phần tử** → tối đa N bước → **O(N)**!

---

## 3. Thuật toán này hoạt động như thế nào?

### 3.1. Bài toán trộn 2 mảng đã sắp xếp (Merge)

**Giả sử:** Bạn có 2 bộ bài đã xếp theo số. Trộn chúng thành 1 bộ hoàn chỉnh.

**Cách làm:**

- Dùng 2 con trỏ `i`, `j` trỏ vào đầu mỗi bộ
- So sánh `a[i]` và `b[j]`, lấy phần tử nhỏ hơn cho vào mảng kết quả
- Tăng con trỏ của bộ vừa lấy
- Lặp lại cho đến khi hết 1 bộ

**Minh họa:**
```
a = [1, 3, 6, 8]    b = [2, 6, 7, 12]
i=↑                  j=↑

Bước 1: a[0]=1 < b[0]=2 → lấy 1, i++
a = [1, 3, 6, 8]    b = [2, 6, 7, 12]
   i=↑               j=↑
c = [1]

Bước 2: a[1]=3 > b[0]=2 → lấy 2, j++
c = [1, 2]

Bước 3: a[1]=3 < b[1]=6 → lấy 3, i++
c = [1, 2, 3]

... tiếp tục cho đến khi hết
```

### 3.2. Bài toán tìm 2 phần tử có tổng = X

**Minh họa:** `a = [2, 5, 6, 8, 10, 12, 15]`, X = 16

```
Bước 1: i=0, j=6 → 2+15=17 > 16 → giảm j
a = [2, 5, 6, 8, 10, 12, 15]
i=↑                        j=↑

Bước 2: i=0, j=5 → 2+12=14 < 16 → tăng i
a = [2, 5, 6, 8, 10, 12, 15]
i=↑                   j=↑

Bước 3: i=1, j=5 → 5+12=17 > 16 → giảm j
a = [2, 5, 6, 8, 10, 12, 15]
   i=↑              j=↑

Bước 4: i=1, j=4 → 5+10=15 < 16 → tăng i
a = [2, 5, 6, 8, 10, 12, 15]
      i=↑         j=↑

Bước 5: i=2, j=4 → 6+10=16 = 16 → TÌM THẤY! ✅
```

### 3.3. Bài toán đoạn con có tổng ≤ S dài nhất

**Bài toán:** Tìm đoạn con dài nhất sao cho tổng các phần tử ≤ S.

**Ý tưởng:**

- Dùng 2 con trỏ `l` và `r` (đầu và cuối đoạn)
- Di chuyển `r` sang phải → cộng thêm `a[r]` vào tổng
- Nếu tổng > S → tăng `l` (thu nhỏ đoạn) cho đến khi tổng ≤ S
- Ghi nhận độ dài tốt nhất

**Minh họa:** `a = [2, 6, 5, 3, 6, 8, 9]`, S = 20

```
r=0: [2]                    sum=2  ≤ 20 → độ dài = 1
r=1: [2,6]                  sum=8  ≤ 20 → độ dài = 2
r=2: [2,6,5]                sum=13 ≤ 20 → độ dài = 3
r=3: [2,6,5,3]              sum=16 ≤ 20 → độ dài = 4
r=4: [2,6,5,3,6]            sum=22 > 20 → tăng l
     → [6,5,3,6]            sum=20 ≤ 20 → độ dài = 4
r=5: [6,5,3,6,8]            sum=28 > 20 → tăng l
     → [5,3,6,8]            sum=22 > 20 → tăng l
     → [3,6,8]              sum=17 ≤ 20 → độ dài = 3
r=6: [3,6,8,9]              sum=26 > 20 → tăng l
     → [6,8,9]              sum=23 > 20 → tăng l
     → [8,9]                sum=17 ≤ 20 → độ dài = 2

Kết quả: độ dài dài nhất = 4 (đoạn [2,6,5,3])
```

---

## 4. Bắt tay vào Code nào!

### Code C++

```cpp
#include <bits/stdc++.h>
using namespace std;

// ===== Bài toán 1: Trộn 2 mảng đã sắp xếp =====
vector<int> mergeArrays(vector<int>& a, vector<int>& b) {
    vector<int> c;
    int i = 0, j = 0;  // 2 con trỏ
    
    while (i < a.size() && j < b.size()) {
        if (a[i] <= b[j]) {
            c.push_back(a[i++]);  // Lấy a[i], tăng i
        } else {
            c.push_back(b[j++]);  // Lấy b[j], tăng j
        }
    }
    // Copy phần còn lại
    while (i < a.size()) c.push_back(a[i++]);
    while (j < b.size()) c.push_back(b[j++]);
    
    return c;
}

// ===== Bài toán 2: Tìm 2 phần tử có tổng = X =====
// Mảng đã được sắp xếp tăng dần
pair<int,int> findPairWithSum(vector<int>& a, int x) {
    int i = 0, j = a.size() - 1;
    
    while (i < j) {
        int sum = a[i] + a[j];
        if (sum == x)
            return {i, j};          // Tìm thấy!
        else if (sum < x)
            i++;                    // Cần tổng lớn hơn
        else
            j--;                    // Cần tổng nhỏ hơn
    }
    return {-1, -1};  // Không tìm thấy
}

// ===== Bài toán 3: Đoạn con dài nhất có tổng ≤ S =====
int longestSubarrayWithSum(vector<int>& a, long long s) {
    int ans = 0;
    long long sum = 0;
    int l = 0;
    
    for (int r = 0; r < a.size(); r++) {
        sum += a[r];                // Mở rộng đoạn sang phải
        
        while (sum > s) {           // Thu nhỏ đoạn từ trái
            sum -= a[l];
            l++;
        }
        
        ans = max(ans, r - l + 1);  // Cập nhật kết quả
    }
    return ans;
}

int main() {
    // Test bài toán 2
    vector<int> a = {2, 5, 6, 8, 10, 12, 15};
    auto [i, j] = findPairWithSum(a, 16);
    cout << "Vi tri: " << i << " " << j << endl;  // Output: 2 4
    
    // Test bài toán 3
    vector<int> b = {2, 6, 5, 3, 6, 8, 9};
    cout << "Doan dai nhat: " << longestSubarrayWithSum(b, 20) << endl;  // Output: 4
    
    return 0;
}
```

### Code Python

```python
# ===== Bài toán 1: Trộn 2 mảng =====
def merge_arrays(a, b):
    c = []
    i = j = 0
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            c.append(a[i]); i += 1
        else:
            c.append(b[j]); j += 1
    c.extend(a[i:])
    c.extend(b[j:])
    return c

# ===== Bài toán 2: Tìm 2 phần tử có tổng = X =====
def find_pair_with_sum(a, x):
    i, j = 0, len(a) - 1
    while i < j:
        s = a[i] + a[j]
        if s == x:
            return (i, j)       # Tìm thấy!
        elif s < x:
            i += 1              # Cần tổng lớn hơn
        else:
            j -= 1              # Cần tổng nhỏ hơn
    return (-1, -1)             # Không tìm thấy

# ===== Bài toán 3: Đoạn con dài nhất có tổng ≤ S =====
def longest_subarray(a, s):
    ans = 0
    total = 0
    l = 0
    for r in range(len(a)):
        total += a[r]           # Mở rộng đoạn
        while total > s:        # Thu nhỏ từ trái
            total -= a[l]
            l += 1
        ans = max(ans, r - l + 1)
    return ans

# Test
a = [2, 5, 6, 8, 10, 12, 15]
print(find_pair_with_sum(a, 16))  # (2, 4)

b = [2, 6, 5, 3, 6, 8, 9]
print(longest_subarray(b, 20))    # 4
```

---

## 5. Lưu ý / Cạm bẫy hay gặp

### Bẫy 1: Quên mảng phải được sắp xếp

Hai con trỏ **chỉ hoạt động** khi mảng có tính đơn điệu (sắp xếp hoặc không có giá trị âm tùy bài).

**Lưu ý quan trọng:** Kỹ thuật sliding window (đoạn con dài nhất có tổng ≤ S) chỉ hoạt động đúng khi mảng **không có phần tử âm**. Nếu mảng có số âm, tổng không đơn điệu khi thu hẹp đoạn → phải dùng prefix sum + map thay vì hai con trỏ.

### Bẫy 2: Lặp vô hạn

Khi cài đặt, hãy đảm bảo ở mọi trường hợp của `if-else`, các con trỏ đều được di chuyển.

```cpp
// SAI: có thể lặp vô hạn nếu sum > x
while (i < j) {
    if (a[i] + a[j] == x) return {i, j};
    if (a[i] + a[j] < x) i++;
    // Quên trường hợp sum > x → j không bao giờ giảm!
}

// ĐÚNG:
while (i < j) {
    int sum = a[i] + a[j];
    if (sum == x) return {i, j};
    else if (sum < x) i++;
    else j--;
}
```
```python
# ĐÚNG:
while i < j:
    s = a[i] + a[j]
    if s == x:
        return (i, j)
    elif s < x:
        i += 1
    else:
        j -= 1
```

### Bẫy 3: Tràn số khi tính tổng

```cpp
// SAI: a[i] + a[j] có thể vượt quá int
int sum = a[i] + a[j];

// ĐÚNG: dùng long long
long long sum = (long long)a[i] + a[j];
```
```python
# Python tự động xử lý số lớn, không cần lo tràn số
s = a[i] + a[j]
```

### Bẫy 4: Đoạn con dài nhất - dùng long long cho tổng

Nếu `a[i]` có thể lên đến 10⁹ và N lên đến 10⁶, tổng có thể đạt 10¹5 → phải dùng `long long`!

### Mẹo thi cử: Khi nào dùng Hai con trỏ?

1. Mảng đã sắp xếp + cần tìm cặp/tổng → **Two pointers**
2. Cần tìm đoạn con thỏa điều kiện gì đó → **Sliding window** (biến thể hai con trỏ)
3. Trộn 2 mảng đã sắp xếp → **Merge** (hai con trỏ)

**Template nhanh - Đoạn con dài nhất:**
```
l = 0
for r = 0 to n-1:
    thêm a[r] vào tổng
    while tổng > giới hạn:
        trừ a[l] khỏi tổng
        l++
    cập nhật kết quả
```

---

## Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Sum of Two Values](https://cses.fi/problemset/task/1640) | CSES | ⭐⭐ | Two Sum |
| [CSES - Subarray Sums I](https://cses.fi/problemset/task/1660) | CSES | ⭐⭐ | Sliding window |
| [CSES - Subarray Sums II](https://cses.fi/problemset/task/1661) | CSES | ⭐⭐⭐ | Prefix sum + map |
| [LeetCode - 3Sum](https://leetcode.com/problems/3sum/) | LC | ⭐⭐⭐ | 3 con trỏ |
| [VNOJ - NKSGAME](https://oj.vnoi.info/problem/nksgame) | VNOJ | ⭐⭐ | Two pointers |

## Bài viết liên quan

- [Bài 3: Tìm kiếm nhị phân](03-tim-kiem-nhi-phan.md)
- [Bài 7: Prefix Sum](07-mang-stack-prefix-sum.md)
- [Bài 15: Deque & Sliding Window](15-deque-sliding-window.md)

## Tài liệu tham khảo

- [VNOI Wiki - Kĩ thuật hai con trỏ](https://wiki.vnoi.info/algo/basic/two-pointers)
- [CP-Algorithms - Two Pointers](https://cp-algorithms.com/algebra/two-pointer-method.html)
- [USACO Guide - Two Pointers](https://usaco.guide/silver/two-pointers)
- [GeeksforGeeks - Two Pointer Technique](https://www.geeksforgeeks.org/dsa/two-pointers-technique/)
- [YouTube - Two Pointers (takeuforward)](https://www.youtube.com/watch?v=On03HWe2tZM)

**Bài tiếp theo:** [Phép toán bit →](05-phep-toan-bit.md)
