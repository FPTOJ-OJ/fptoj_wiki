# Bài 5: Phép Toán Bit - Ma Thuật Với 0 và 1!

> **Tác giả:** Hà Trí Kiên<br>
> **Nội dung tham khảo từ:** VNOI Wiki - Phép toán bit

## Bản chất vấn đề

### Bài toán: Quản lý nhóm bạn

Bạn có 5 người bạn: An, Bình, Chi, Dũng, Em. Mỗi người có thể **đi** hoặc **không đi** picnic.

Thay vì lưu `{true, false, true, false, true}`, ta dùng 1 con số: `10101` (đọc từ phải: Em=1, Dũng=0, Chi=1, Bình=0, An=1).

Chỉ cần **1 số nguyên** là lưu được cả tập hợp! Đó là sức mạnh của **Bitmask** (mặt nạ bit).

### Bài toán nền tảng: XOR tìm số duy nhất

**Đề bài:** Mảng $N$ số, tất cả số xuất hiện **đúng 2 lần**, riêng 1 số xuất hiện **1 lần duy nhất**. Tìm số đó.

**Ví dụ:** Mảng $[2, 3, 5, 3, 2]$ → số duy nhất là $5$.

---

## Tư duy cốt lõi

### Hệ nhị phân (Binary)

Thay vì đếm theo 10 (thập phân), ta đếm theo 2 (nhị phân):

| Thập phân | Nhị phân | Giải thích |
|-----------|----------|------------|
| 0 | 000 | |
| 1 | 001 | $2^0 = 1$ |
| 2 | 010 | $2^1 = 2$ |
| 3 | 011 | $2^1 + 2^0 = 3$ |
| 4 | 100 | $2^2 = 4$ |
| 5 | 101 | $2^2 + 2^0 = 5$ |
| 6 | 110 | $2^2 + 2^1 = 6$ |
| 7 | 111 | $2^2 + 2^1 + 2^0 = 7$ |
| 8 | 1000 | $2^3 = 8$ |

Bit thứ $i$ (đếm từ 0) tương ứng với giá trị $2^i$.

### Bitmask là gì?

**Bitmask** = 1 số nguyên mà mỗi bit biểu diễn 1 "cờ hiệu" (bật/tắt).

Quản lý 5 người bạn = bitmask 5 bit:

| Bit | 4 | 3 | 2 | 1 | 0 |
|-----|---|---|---|---|---|
| Người | An | Bình | Chi | Dũng | Em |
| Giá trị | 1 | 0 | 1 | 0 | 1 |

$10101_2 = 21_{10}$ → Tập hợp $\{Em, Chi, An\}$ được lưu bằng số 21!

### 3 phép toán logic cơ bản

**AND ($\&$):** Cả 2 đều bật → bật. (Như "VÀ")

| Toán hạng 1 | 1 | 1 | 1 | 0 | 0 | 1 | 0 | 1 |
|--------------|---|---|---|---|---|---|---|---|
| Toán hạng 2 | 1 | 0 | 1 | 0 | 1 | 1 | 1 | 0 |
| **Kết quả** | **1** | **0** | **1** | **0** | **0** | **1** | **0** | **0** |

**OR ($|$):** Ít nhất 1 bật → bật. (Như "HOẶC")

| Toán hạng 1 | 1 | 1 | 1 | 0 | 0 | 1 | 0 | 1 |
|--------------|---|---|---|---|---|---|---|---|
| Toán hạng 2 | 1 | 0 | 1 | 0 | 1 | 1 | 1 | 0 |
| **Kết quả** | **1** | **1** | **1** | **0** | **1** | **1** | **1** | **1** |

**XOR ($\wedge$):** Khác nhau → bật. (Như "HOẶC KHÔNG ĐỒNG THỜI")

| Toán hạng 1 | 1 | 1 | 1 | 0 | 0 | 1 | 0 | 1 |
|--------------|---|---|---|---|---|---|---|---|
| Toán hạng 2 | 1 | 0 | 1 | 0 | 1 | 1 | 1 | 0 |
| **Kết quả** | **0** | **1** | **0** | **0** | **1** | **0** | **1** | **1** |

**NOT ($\sim$):** Đảo tất cả $0 \leftrightarrow 1$.

### Phép dịch bit (Bitshift)

**Dịch trái `<<`:** Nhân với $2^n$. Ví dụ: `5 << 2` = `101 << 2` = `10100` = $20 = 5 \times 4$

**Dịch phải `>>`:** Chia cho $2^n$. Ví dụ: `20 >> 2` = `10100 >> 2` = `101` = $5 = 20 \div 4$

### Các thao tác trên tập hợp

| Thao tác | Code | Giải thích |
|----------|------|------------|
| Thêm phần tử $i$ | `mask \| (1 << i)` | Bật bit thứ $i$ |
| Xóa phần tử $i$ | `mask & ~(1 << i)` | Tắt bit thứ $i$ |
| Kiểm tra phần tử $i$ | `mask & (1 << i)` | Bit thứ $i$ có bật không? |
| Lật phần tử $i$ | `mask ^ (1 << i)` | Bật↔tắt bit thứ $i$ |
| Đếm phần tử | `__builtin_popcount(mask)` | Đếm số bit 1 |
| Giao 2 tập | `A & B` | Phần tử chung |
| Hợp 2 tập | `A \| B` | Tất cả phần tử |

### Các trick bit kinh điển trong thi đấu

| Trick | Code | Giải thích |
|-------|------|------------|
| Kiểm tra số lẻ | `n & 1` | Trả về 1 nếu $n$ lẻ, 0 nếu chẵn |
| Kiểm tra lũy thừa 2 | `n > 0 && (n & (n-1)) == 0` | Số lũy thừa 2 chỉ có đúng 1 bit |
| Xóa bit thấp nhất | `n & (n-1)` | Ứng dụng: đếm bit 1 |
| Lấy bit thấp nhất | `n & (-n)` | Dùng trong Fenwick Tree |
| Đổi dấu | `-n = ~n + 1` | Định nghĩa số bù 2 |

**Giải thích `n & (n-1)` xóa bit thấp nhất:**

| Biến | Nhị phân | Thập phân |
|------|----------|-----------|
| $n$ | 1100 | 12 |
| $n-1$ | 1011 | 11 |
| $n \& (n-1)$ | 1000 | 8 |

Kết quả: bit thấp nhất đã bị xóa! Ứng dụng: đếm số bit 1 bằng cách liên tục xóa bit thấp nhất đến khi $n = 0$.

---

## Phân tích tính đúng đắn

### XOR tìm số duy nhất

Cho mảng $[a_0, a_1, \ldots, a_{N-1}]$, trong đó mọi số xuất hiện 2 lần trừ 1 số $x$ xuất hiện 1 lần.

Tính $R = a_0 \oplus a_1 \oplus \cdots \oplus a_{N-1}$.

**Tính chất của XOR:**

- $a \oplus a = 0$ (số XOR chính nó = 0)
- $a \oplus 0 = a$ (số XOR 0 = chính nó)
- Giao hoán: $a \oplus b = b \oplus a$
- Kết hợp: $(a \oplus b) \oplus c = a \oplus (b \oplus c)$

**Chứng minh:**

Sắp xếp lại thứ tự (giao hoán + kết hợp), nhóm các cặp giống nhau:

$$R = (a_i \oplus a_i) \oplus (a_j \oplus a_j) \oplus \cdots \oplus x$$

$$R = 0 \oplus 0 \oplus \cdots \oplus x = x$$

Vậy $R$ chính là số xuất hiện 1 lần duy nhất. Đúng!

### Duyệt tất cả tập con

Mỗi số nguyên từ $0$ đến $2^n - 1$ có biểu diễn nhị phân $n$ bit. Bit thứ $i$ bật/tắt tương ứng với phần tử $i$ có/không trong tập con.

Tổng số tập con của $n$ phần tử = $2^n$ (mỗi phần tử có 2 lựa chọn: chọn hoặc không).

Tất cả $2^n$ giá trị từ $0$ đến $2^n - 1$ là **khác nhau** → mỗi tập con được biểu diễn **duy nhất**.

### Bitmask DP

Với bài toán phân công $N$ người $N$ việc, `dp[mask]` lưu chi phí nhỏ nhất khi đã giao xong các việc tương ứng với các bit 1 trong `mask`.

**Bất biến:** Sau khi duyệt xong `mask`, `dp[mask]` đã là giá trị tối ưu.

**Khởi tạo:** $dp[0] = 0$ (chưa làm việc nào, chi phí = 0).

**Chuyển trạng thái:** Với mỗi `mask`, số người đã được giao việc = $\text{popcount}(mask)$. Người tiếp theo (chỉ số $\text{popcount}(mask)$) sẽ thử nhận mỗi việc $j$ chưa làm.

Khi tất cả $N$ bit đều bật → `mask = (1 << N) - 1` → `dp[mask]` là kết quả.

---

## Đánh giá độ phức tạp

### Phép toán bit cơ bản

| Phép toán | Độ phức tạp | Ghi chú |
|-----------|-------------|---------|
| AND, OR, XOR, NOT | $O(1)$ | Hardware hỗ trợ trực tiếp |
| Dịch trái, dịch phải | $O(1)$ | Hardware hỗ trợ trực tiếp |
| `__builtin_popcount` | $O(1)$ | GCC intrinsic, dùng lệnh CPU |
| `n & (n-1)` xóa bit | $O(1)$ | 1 phép toán duy nhất |

### Duyệt tất cả tập con

| Thuật toán | Độ phức tạp thời gian | Độ phức tạp bộ nhớ |
|------------|----------------------|-------------------|
| Duyệt $2^n$ tập con | $O(2^n \cdot n)$ | $O(1)$ |
| Bitmask DP (phân công) | $O(2^n \cdot n)$ | $O(2^n)$ |

**Điều kiện:** $n \leq 20$ vì $2^{20} \approx 10^6$.

### XOR tìm số duy nhất

| Thuật toán | Độ phức tạp thời gian | Độ phức tạp bộ nhớ |
|------------|----------------------|-------------------|
| XOR toàn mảng | $O(N)$ | $O(1)$ |
| HashMap | $O(N)$ | $O(N)$ |
| Sắp xếp + duyệt | $O(N \log N)$ | $O(1)$ hoặc $O(N)$ |

Phương pháp XOR tối ưu nhất: $O(N)$ thời gian, $O(1)$ bộ nhớ.

---

## Code minh họa

### Duyệt tất cả tập con

Với $n$ phần tử, duyệt qua tất cả $2^n$ tập con bằng cách lặp từ $0$ đến $2^n - 1$:

=== "C++"

    ```cpp
    for (int mask = 0; mask < (1 << n); mask++) {
        // mask = 0 → tập rỗng {}
        // mask = 1 → {0}, mask = 2 → {1}, mask = 3 → {0, 1}, ...
    }
    ```

=== "Python"

    ```python
    for mask in range(1 << n):
        # mask là mỗi tập con của {0, 1, ..., n-1}
        pass
    ```

### Ứng dụng 1: Thao tác tập hợp bằng bitmask

Quản lý $N = 5$ người và kiểm tra ai được mời:

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    int main() {
        int mask = 0b10101;
        
        mask |= (1 << 1);
        
        mask &= ~(1 << 2);
        
        if (mask & (1 << 1))
            cout << "Nguoi 1 duoc moi\n";
        
        cout << "So nguoi: " << __builtin_popcount(mask) << endl;
        
        return 0;
    }
    ```

=== "Python"

    ```python
    mask = 0b10101

    mask |= (1 << 1)

    mask &= ~(1 << 2)

    if mask & (1 << 1):
        print("Nguoi 1 duoc moi")

    print("So nguoi:", bin(mask).count('1'))
    ```

**Giải thích từng dòng:**

- `mask = 0b10101` → người 0, 2, 4 được mời
- `mask |= (1 << 1)` → bật bit 1 → người 0, 1, 2, 4 được mời
- `mask &= ~(1 << 2)` → tắt bit 2 → người 0, 1, 4 được mời
- `mask & (1 << 1)` → kiểm tra bit 1 có bật không → có
- `__builtin_popcount(mask)` → đếm số bit 1 = 3

### Ứng dụng 2: XOR tìm số duy nhất

Mảng $N$ số, tất cả xuất hiện 2 lần trừ 1 số xuất hiện 1 lần:

=== "C++"

    ```cpp
    int findSingle(vector<int>& a) {
        int result = 0;
        for (int x : a)
            result ^= x;
        return result;
    }
    ```

=== "Python"

    ```python
    def find_single(a):
        result = 0
        for x in a:
            result ^= x
        return result
    ```

**Ví dụ:** $[2, 3, 5, 3, 2] \rightarrow 2 \oplus 3 \oplus 5 \oplus 3 \oplus 2 = 5$

Các cặp $2 \oplus 2 = 0$, $3 \oplus 3 = 0$, còn lại $5$.

### Ứng dụng 3: Đếm số bit 1

=== "C++"

    ```cpp
    int count1 = __builtin_popcount(n);
    int count2 = __builtin_popcountll(n);
    ```

=== "Python"

    ```python
    count = bin(n).count('1')

    count = n.bit_count()
    ```

Cách thủ công: sử dụng `n & (n-1)` để xóa bit thấp nhất lặp đi lặp lại:

=== "C++"

    ```cpp
    int countBits(int n) {
        int count = 0;
        while (n) {
            n &= (n - 1);
            count++;
        }
        return count;
    }
    ```

=== "Python"

    ```python
    def count_bits(n):
        count = 0
        while n:
            n &= (n - 1)
            count += 1
        return count
    ```

### Ứng dụng 4: Duyệt tất cả tập con

In tất cả tập con của tập $\{0, 1, 2\}$:

=== "C++"

    ```cpp
    int n = 3;
    for (int mask = 0; mask < (1 << n); mask++) {
        cout << "{ ";
        for (int i = 0; i < n; i++) {
            if (mask & (1 << i))
                cout << i << " ";
        }
        cout << "}\n";
    }
    ```

=== "Python"

    ```python
    n = 3
    for mask in range(1 << n):
        subset = [i for i in range(n) if mask & (1 << i)]
        print(subset)
    ```

**Kết quả:**

| Mask | Nhị phân | Tập con |
|------|----------|---------|
| 0 | 000 | $\{\}$ |
| 1 | 001 | $\{0\}$ |
| 2 | 010 | $\{1\}$ |
| 3 | 011 | $\{0, 1\}$ |
| 4 | 100 | $\{2\}$ |
| 5 | 101 | $\{0, 2\}$ |
| 6 | 110 | $\{1, 2\}$ |
| 7 | 111 | $\{0, 1, 2\}$ |

### Ứng dụng 5: Bitmask DP — phân công tối ưu

**Bài toán:** $N$ người, $N$ việc. Chi phí $\text{cost}[i][j]$ = chi phí để người $i$ làm việc j. Mỗi người làm đúng 1 việc. Tìm cách phân công có chi phí nhỏ nhất.

**Ý tưởng:** $\text{dp}[\text{mask}]$ = chi phí nhỏ nhất để hoàn thành các công việc tương ứng với các bit 1 trong `mask`.

=== "C++"

    ```cpp
    vector<int> dp(1 << n, INT_MAX);
    dp[0] = 0;

    for (int mask = 0; mask < (1 << n); mask++) {
        if (dp[mask] == INT_MAX) continue;
        
        int person = __builtin_popcount(mask);
        if (person >= n) continue;
        
        for (int job = 0; job < n; job++) {
            if (!(mask & (1 << job))) {
                int newMask = mask | (1 << job);
                dp[newMask] = min(dp[newMask], dp[mask] + cost[person][job]);
            }
        }
    }
    ```

=== "Python"

    ```python
    dp = [float('inf')] * (1 << n)
    dp[0] = 0

    for mask in range(1 << n):
        if dp[mask] == float('inf'):
            continue
        
        person = bin(mask).count('1')
        if person >= n:
            continue
        
        for job in range(n):
            if not (mask & (1 << job)):
                new_mask = mask | (1 << job)
                dp[new_mask] = min(dp[new_mask], dp[mask] + cost[person][job])
    ```

Kết quả: $\text{dp}[(1 \ll N) - 1]$ = chi phí nhỏ nhất khi tất cả việc đã xong.

---

## Lưu ý / Cạm bẫy hay gặp

### Bẫy 1: Tràn số khi dịch bit

=== "C++"

    ```cpp
    long long x = 1 << 40;
    long long x = 1LL << 40;
    ```

=== "Python"

    ```python
    x = 1 << 40
    ```

Dòng đầu **SAI** vì `1` là kiểu `int`, $1 \ll 40$ bị tràn. Dòng hai **ĐÚNG** vì dùng `1LL` (kiểu `long long`).

Python tự động xử lý số lớn, không cần lo tràn.

### Bẫy 2: Thứ tự ưu tiên toán tử

=== "C++"

    ```cpp
    if (mask & (1 << i) == 0) ...
    if ((mask & (1 << i)) == 0) ...
    ```

=== "Python"

    ```python
    if mask & (1 << i) == 0: ...
    if (mask & (1 << i)) == 0: ...
    ```

Dòng đầu **SAI** vì `==` có ưu tiên cao hơn `&`, được hiểu là `mask & ((1 << i) == 0)`. Dòng hai **ĐÚNG** vì dùng ngoặc rõ ràng.

### Bẫy 3: NOT (~) trên int

=== "C++"

    ```cpp
    int mask = 0b101;
    int not_mask = mask ^ ((1 << n) - 1);
    ```

=== "Python"

    ```python
    mask = 0b101
    not_mask = mask ^ ((1 << n) - 1)
    ```

Trong C++, `~mask` đảo **TẤT CẢ** bit, kể cả bit dấu (32 hoặc 64 bit). Trong Python, `~mask = -(mask+1)` do bù 2.

**ĐÚNG:** Chỉ đảo $n$ bit đầu bằng cách XOR với $(2^n - 1)$.

### Mẹo thi cử

- $N \leq 20$ → dùng bitmask + duyệt tập con ($2^{20} \approx 10^6$)
- $N \leq 64$ → dùng `long long` làm bitmask
- `__builtin_popcount(x)` đếm số bit 1 → $O(1)$ trên GCC

---

## Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Bit Strings](https://cses.fi/problemset/task/1715) | CSES | ⭐ | Lũy thừa 2 |
| [LeetCode - Single Number](https://leetcode.com/problems/single-number/) | LC | ⭐ | XOR |
| [LeetCode - Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/) | LC | ⭐ | Đếm bit |
| [CF - XOR and OR](https://codeforces.com/) | CF | ⭐⭐ | Bitmask |
| [LeetCode - Subsets](https://leetcode.com/problems/subsets/) | LC | ⭐⭐ | Duyệt bitmask |
| [VNOJ - Tổng XOR](https://oj.vnoi.info/problem/tht21_skc_xor) | VNOJ | ⭐⭐ | Phép XOR |

## Bài viết liên quan

- [Bài 6: Đệ quy và quay lui](de-quy-va-quay-lui.md)
- [Bài 27: Lý thuyết trò chơi](ly-thuyet-tro-choi.md)

## Tài liệu tham khảo

- [VNOI Wiki - Phép toán bit](https://wiki.vnoi.info/algo/basic/bitwise-operators)
- [Topcoder - Bit Manipulation](https://www.topcoder.com/thrive/articles/A%20bit%20of%20fun%20:%20fun%20with%20bits)
- [GeeksforGeeks - Bitwise Operators in C++](https://www.geeksforgeeks.org/cpp/bitwise-operators-in-cpp/)
- [CP-Algorithms - Bit Manipulation](https://cp-algorithms.com/algebra/bit-manipulation.html)

**Bài tiếp theo:** [Đệ quy và quay lui →](de-quy-va-quay-lui.md)
