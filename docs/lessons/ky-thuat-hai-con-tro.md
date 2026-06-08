# Bài 4: Kĩ Thuật Hai Con Trỏ - Biến $O(N^2)$ Thành $O(N)$

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** VNOI Wiki - Kĩ thuật hai con trỏ

---

## 1. Bản chất vấn đề

### Bài toán: Tìm 2 lon nước ngọt

Bạn có $N$ lon nước ngọt đã được xếp theo dung tích tăng dần. Cần tìm 2 lon có **tổng dung tích đúng bằng $X$** ml.

**Cách "ngốc":** Thử mọi cặp $(i, j)$ với $0 \le i < j < N$. Số phép so sánh là:

$$\frac{N(N-1)}{2} = O(N^2)$$

Với $N = 10^6$ $\Rightarrow$ khoảng $5 \times 10^{11}$ phép tính $\Rightarrow$ **quá chậm!**

**Cách thông minh (Hai con trỏ):** Chỉ cần $O(N)$ phép so sánh.

### Các bài toán kinh điển dùng hai con trỏ

| Bài toán | Mô tả | Độ phức tạp |
|----------|-------|-------------|
| Tìm cặp tổng bằng $X$ | Mảng đã sắp xếp, tìm $i, j$ sao cho $a[i] + a[j] = X$ | $O(N)$ |
| Trộn 2 mảng | Trộn 2 mảng đã sắp xếp thành 1 mảng | $O(N + M)$ |
| Đoạn con dài nhất có tổng $\le S$ | Tìm đoạn con liên tiếp dài nhất | $O(N)$ |

---

## 2. Tư duy cốt lõi

### 2.1. Bài toán trộn 2 mảng đã sắp xếp (Merge)

**Giả sử:** Bạn có 2 bộ bài đã xếp theo số. Trộn chúng thành 1 bộ hoàn chỉnh.

**Ý tưởng:** Dùng 2 con trỏ $i$, $j$ trỏ vào đầu mỗi bộ. So sánh $a[i]$ và $b[j]$, lấy phần tử nhỏ hơn cho vào mảng kết quả, rồi tăng con trỏ tương ứng.

**Minh họa:** $a = [1, 3, 6, 8]$, $b = [2, 6, 7, 12]$

| Bước | $i$ | $j$ | So sánh | Chọn | Mảng kết quả $c$ |
|------|-----|-----|---------|------|-------------------|
| 1 | 0 | 0 | $a[0]=1 < b[0]=2$ | $1$ | $[1]$ |
| 2 | 1 | 0 | $a[1]=3 > b[0]=2$ | $2$ | $[1, 2]$ |
| 3 | 1 | 1 | $a[1]=3 < b[1]=6$ | $3$ | $[1, 2, 3]$ |
| 4 | 2 | 1 | $a[2]=6 = b[1]=6$ | $6$ | $[1, 2, 3, 6]$ |
| 5 | 3 | 2 | $a[3]=8 > b[2]=7$ | $7$ | $[1, 2, 3, 6, 7]$ |
| 6 | 3 | 3 | $a[3]=8 < b[3]=12$ | $8$ | $[1, 2, 3, 6, 7, 8]$ |
| 7 | - | 3 | $a$ hết | $12$ | $[1, 2, 3, 6, 7, 8, 12]$ |

### 2.2. Bài toán tìm 2 phần tử có tổng bằng $X$

**Ý tưởng:** Đặt 1 con trỏ trái $L = 0$, 1 con trỏ phải $R = N - 1$.

- Nếu $a[L] + a[R] = X$ $\Rightarrow$ tìm thấy.
- Nếu $a[L] + a[R] < X$ $\Rightarrow$ cần tổng lớn hơn $\Rightarrow$ tăng $L$.
- Nếu $a[L] + a[R] > X$ $\Rightarrow$ cần tổng nhỏ hơn $\Rightarrow$ giảm $R$.

**Minh họa:** $a = [2, 5, 6, 8, 10, 12, 15]$, $X = 16$

| Bước | $L$ | $R$ | $a[L]$ | $a[R]$ | Tổng | So sánh | Hành động |
|------|-----|-----|--------|--------|------|---------|-----------|
| 1 | 0 | 6 | 2 | 15 | 17 | $17 > 16$ | Giảm $R$ |
| 2 | 0 | 5 | 2 | 12 | 14 | $14 < 16$ | Tăng $L$ |
| 3 | 1 | 5 | 5 | 12 | 17 | $17 > 16$ | Giảm $R$ |
| 4 | 1 | 4 | 5 | 10 | 15 | $15 < 16$ | Tăng $L$ |
| 5 | 2 | 4 | 6 | 10 | 16 | $16 = 16$ | Tìm thấy! |

```matplotlib
a = [2, 5, 6, 8, 10, 12, 15]
X = 16

fig, axs = plt.subplots(3, 1, figsize=(10, 8))

L, R = 0, 6
colors = ['gray'] * len(a)
colors[L] = 'blue'
colors[R] = 'orange'
axs[0].bar(range(len(a)), a, color=colors, alpha=0.7)
axs[0].set_title('Bước 1: L=0 (2), R=6 (15) | Tổng = 17 > 16 -> Giảm R')
axs[0].set_xticks(range(len(a)))
axs[0].set_xticklabels(a)

L, R = 1, 4
colors = ['gray'] * len(a)
colors[L] = 'blue'
colors[R] = 'orange'
axs[1].bar(range(len(a)), a, color=colors, alpha=0.7)
axs[1].set_title('Bước 2: L=1 (5), R=4 (10) | Tổng = 15 < 16 -> Tăng L')
axs[1].set_xticks(range(len(a)))
axs[1].set_xticklabels(a)

L, R = 2, 4
colors = ['gray'] * len(a)
colors[L] = 'green'
colors[R] = 'green'
axs[2].bar(range(len(a)), a, color=colors, alpha=0.7)
axs[2].set_title('Bước 3: L=2 (6), R=4 (10) | Tổng = 16 == 16 -> Tìm thấy!')
axs[2].set_xticks(range(len(a)))
axs[2].set_xticklabels(a)

plt.tight_layout()
```


### 2.3. Bài toán đoạn con có tổng $\le S$ dài nhất (Sliding Window)

**Bài toán:** Tìm đoạn con dài nhất sao cho tổng các phần tử $\le S$.

**Ý tưởng:** Dùng 2 con trỏ $L$ và $R$ (đầu và cuối đoạn).

- Di chuyển $R$ sang phải $\Rightarrow$ cộng thêm $a[R]$ vào tổng.
- Nếu tổng $> S$ $\Rightarrow$ tăng $L$ (thu nhỏ đoạn) cho đến khi tổng $\le S$.
- Ghi nhận độ dài tốt nhất.

**Minh họa:** $a = [2, 6, 5, 3, 6, 8, 9]$, $S = 20$

| Bước | $R$ | Đoạn | Tổng | $\le S$? | $L$ mới | Độ dài | Kết quả tốt nhất |
|------|-----|-------|------|----------|---------|--------|------------------|
| 1 | 0 | $[2]$ | 2 | Có | 0 | 1 | 1 |
| 2 | 1 | $[2,6]$ | 8 | Có | 0 | 2 | 2 |
| 3 | 2 | $[2,6,5]$ | 13 | Có | 0 | 3 | 3 |
| 4 | 3 | $[2,6,5,3]$ | 16 | Có | 0 | 4 | 4 |
| 5 | 4 | $[2,6,5,3,6]$ | 22 | Không | 1 | 4 | 4 |
| 5' | 4 | $[6,5,3,6]$ | 20 | Có | 1 | 4 | 4 |
| 6 | 5 | $[6,5,3,6,8]$ | 28 | Không | 3 | 3 | 4 |
| 6' | 5 | $[3,6,8]$ | 17 | Có | 3 | 3 | 4 |
| 7 | 6 | $[3,6,8,9]$ | 26 | Không | 5 | 2 | 4 |
| 7' | 6 | $[8,9]$ | 17 | Có | 5 | 2 | 4 |

Kết quả: độ dài dài nhất $= 4$ (đoạn $[2,6,5,3]$).

---

## 3. Phân tích tính đúng đắn

### 3.1. Tại sao tìm cặp tổng bằng $X$ đúng?

**Bổ đề:** Nếu mảng đã sắp xếp tăng dần và $a[L] + a[R] > X$, thì mọi cặp $(L, j)$ với $j < R$ đều có tổng $> X$.

**Chứng minh:** Vì mảng tăng dần, với mọi $j < R$:

$$a[j] \le a[R] \Rightarrow a[L] + a[j] \le a[L] + a[R] > X$$

Do đó ta có thể bỏ qua tất cả các cặp có $j < R$ mà không sợ bỏ sót lời giải. Tương tự cho trường hợp $a[L] + a[R] < X$.

**Hệ quả:** Mỗi bước, ta loại bỏ ít nhất 1 phần tử khỏi tập ứng viên. Với $N$ phần tử, thuật toán kết thúc sau tối đa $2N$ bước.

### 3.2. Tại sao Sliding Window đúng?

**Điều kiện tiên quyết:** Mảng không có phần tử âm ($a[i] \ge 0$).

**Bổ đề:** Nếu $a[i] \ge 0$ thì khi $R$ tăng, tổng đoạn $[L, R]$ không giảm.

**Chứng minh:** $\text{sum}[L, R+1] = \text{sum}[L, R] + a[R+1] \ge \text{sum}[L, R]$ vì $a[R+1] \ge 0$.

Do đó, khi tổng vượt quá $S$, ta chỉ cần tăng $L$ để thu nhỏ đoạn. Giá trị $L$ chỉ tăng, không bao giờ giảm $\Rightarrow$ mỗi phần tử được thêm vào và loại ra đúng 1 lần $\Rightarrow$ $O(N)$.

**Lưu ý:** Nếu mảng có số âm, tính chất đơn điệu bị phá vỡ $\Rightarrow$ không thể dùng sliding window, phải dùng prefix sum + map.

---

## 4. Đánh giá độ phức tạp

### 4.1. Tìm cặp tổng bằng $X$

- **Thời gian:** $O(N)$ — mỗi bước, $L$ tăng hoặc $R$ giảm. Tổng số bước tối đa $2N$.
- **Bộ nhớ:** $O(1)$ — chỉ dùng 2 biến con trỏ.

### 4.2. Trộn 2 mảng

- **Thời gian:** $O(N + M)$ — mỗi phần tử được xử lý đúng 1 lần.
- **Bộ nhớ:** $O(N + M)$ — mảng kết quả.

### 4.3. Đoạn con dài nhất có tổng $\le S$

- **Thời gian:** $O(N)$ — con trỏ $L$ và $R$ đều chỉ tăng, tối đa $2N$ bước.
- **Bộ nhớ:** $O(1)$ — chỉ dùng biến tổng và con trỏ.

### Bảng tổng hợp

| Bài toán | Thời gian | Bộ nhớ |
|----------|-----------|--------|
| Tìm cặp tổng $= X$ | $O(N)$ | $O(1)$ |
| Trộn 2 mảng | $O(N + M)$ | $O(N + M)$ |
| Đoạn con dài nhất | $O(N)$ | $O(1)$ |

---

## 5. Code

### 5.1. Trộn 2 mảng đã sắp xếp

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    vector<int> mergeArrays(vector<int>& a, vector<int>& b) {
        vector<int> c;
        int i = 0, j = 0;

        while (i < (int)a.size() && j < (int)b.size()) {
            if (a[i] <= b[j]) {
                c.push_back(a[i++]);
            } else {
                c.push_back(b[j++]);
            }
        }
        while (i < (int)a.size()) c.push_back(a[i++]);
        while (j < (int)b.size()) c.push_back(b[j++]);

        return c;
    }

    int main() {
        vector<int> a = {1, 3, 6, 8};
        vector<int> b = {2, 6, 7, 12};
        vector<int> c = mergeArrays(a, b);
        for (int x : c) cout << x << " ";
        // Output: 1 2 3 6 7 8 12
        return 0;
    }
    ```

=== "Python"

    ```python
    def merge_arrays(a, b):
        c = []
        i = j = 0
        while i < len(a) and j < len(b):
            if a[i] <= b[j]:
                c.append(a[i])
                i += 1
            else:
                c.append(b[j])
                j += 1
        c.extend(a[i:])
        c.extend(b[j:])
        return c

    a = [1, 3, 6, 8]
    b = [2, 6, 7, 12]
    print(merge_arrays(a, b))
    # Output: [1, 2, 3, 6, 7, 8, 12]
    ```

### 5.2. Tìm 2 phần tử có tổng bằng $X$

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    pair<int,int> findPairWithSum(vector<int>& a, long long x) {
        int i = 0, j = (int)a.size() - 1;

        while (i < j) {
            long long sum = (long long)a[i] + a[j];
            if (sum == x)
                return {i, j};
            else if (sum < x)
                i++;
            else
                j--;
        }
        return {-1, -1};
    }

    int main() {
        vector<int> a = {2, 5, 6, 8, 10, 12, 15};
        auto [i, j] = findPairWithSum(a, 16);
        cout << i << " " << j << endl;
        // Output: 2 4
        return 0;
    }
    ```

=== "Python"

    ```python
    def find_pair_with_sum(a, x):
        i, j = 0, len(a) - 1
        while i < j:
            s = a[i] + a[j]
            if s == x:
                return (i, j)
            elif s < x:
                i += 1
            else:
                j -= 1
        return (-1, -1)

    a = [2, 5, 6, 8, 10, 12, 15]
    print(find_pair_with_sum(a, 16))
    # Output: (2, 4)
    ```

### 5.3. Đoạn con dài nhất có tổng $\le S$

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    int longestSubarrayWithSum(vector<int>& a, long long s) {
        int ans = 0;
        long long sum = 0;
        int l = 0;

        for (int r = 0; r < (int)a.size(); r++) {
            sum += a[r];

            while (sum > s) {
                sum -= a[l];
                l++;
            }

            ans = max(ans, r - l + 1);
        }
        return ans;
    }

    int main() {
        vector<int> a = {2, 6, 5, 3, 6, 8, 9};
        cout << longestSubarrayWithSum(a, 20) << endl;
        // Output: 4
        return 0;
    }
    ```

=== "Python"

    ```python
    def longest_subarray(a, s):
        ans = 0
        total = 0
        l = 0
        for r in range(len(a)):
            total += a[r]
            while total > s:
                total -= a[l]
                l += 1
            ans = max(ans, r - l + 1)
        return ans

    a = [2, 6, 5, 3, 6, 8, 9]
    print(longest_subarray(a, 20))
    # Output: 4
    ```

---

## 6. Lưu ý / Cạm bẫy hay gặp

### Bẫy 1: Quên mảng phải được sắp xếp

Hai con trỏ cho bài toán tìm cặp tổng **chỉ hoạt động** khi mảng có tính đơn điệu (sắp xếp).

Sliding window chỉ hoạt động đúng khi mảng **không có phần tử âm**. Nếu mảng có số âm, tổng không đơn điệu khi thu hẹp đoạn $\Rightarrow$ phải dùng prefix sum + map thay vì hai con trỏ.

### Bẫy 2: Lặp vô hạn

Khi cài đặt, hãy đảm bảo ở mọi trường hợp của `if-else`, các con trỏ đều được di chuyển.

=== "C++"

    ```cpp
    // SAI: có thể lặp vô hạn nếu sum > x
    while (i < j) {
        if (a[i] + a[j] == x) return {i, j};
        if (a[i] + a[j] < x) i++;
        // Quên trường hợp sum > x -> j không bao giờ giảm!
    }

    // ĐÚNG:
    while (i < j) {
        long long sum = (long long)a[i] + a[j];
        if (sum == x) return {i, j};
        else if (sum < x) i++;
        else j--;
    }
    ```

=== "Python"

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

=== "C++"

    ```cpp
    // SAI: a[i] + a[j] có thể vượt quá int
    int sum = a[i] + a[j];

    // ĐÚNG: dùng long long
    long long sum = (long long)a[i] + a[j];
    ```

=== "Python"

    ```python
    # Python tự động xử lý số lớn, không cần lo tràn số
    s = a[i] + a[j]
    ```

### Bẫy 4: Đoạn con dài nhất — dùng `long long` cho tổng

Nếu $a[i]$ có thể lên đến $10^9$ và $N$ lên đến $10^6$, tổng có thể đạt $10^{15}$ $\Rightarrow$ phải dùng `long long`.

---

## 7. Khi nào dùng Hai con trỏ?

1. Mảng đã sắp xếp + cần tìm cặp/tổng $\Rightarrow$ **Two pointers**
2. Cần tìm đoạn con thỏa điều kiện gì đó $\Rightarrow$ **Sliding window** (biến thể hai con trỏ)
3. Trộn 2 mảng đã sắp xếp $\Rightarrow$ **Merge** (hai con trỏ)

**Template nhanh — Đoạn con dài nhất:**

Đặt $L = 0$. Duyệt $R$ từ $0$ đến $N-1$:

1. Thêm $a[R]$ vào tổng.
2. Trong khi tổng $>$ giới hạn: trừ $a[L]$ khỏi tổng, tăng $L$.
3. Cập nhật kết quả: $\text{ans} = \max(\text{ans}, R - L + 1)$.

---

## Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Sum of Two Values](https://cses.fi/problemset/task/1640) | CSES | 2 sao | Two Sum |
| [CSES - Subarray Sums I](https://cses.fi/problemset/task/1660) | CSES | 2 sao | Sliding window |
| [CSES - Subarray Sums II](https://cses.fi/problemset/task/1661) | CSES | 3 sao | Prefix sum + map |
| [LeetCode - 3Sum](https://leetcode.com/problems/3sum/) | LC | 3 sao | 3 con trỏ |
| [VNOJ - NKSGAME](https://oj.vnoi.info/problem/nksgame) | VNOJ | 2 sao | Two pointers |

## Bài viết liên quan

- [Bài 3: Tìm kiếm nhị phân](tim-kiem-nhi-phan.md)
- [Bài 7: Prefix Sum](mang-stack-prefix-sum.md)
- [Bài 15: Deque & Sliding Window](deque-sliding-window.md)

## Tài liệu tham khảo

- [VNOI Wiki - Kĩ thuật hai con trỏ](https://wiki.vnoi.info/algo/basic/two-pointers)
- [USACO Guide - Two Pointers](https://usaco.guide/silver/two-pointers)
- [GeeksforGeeks - Two Pointer Technique](https://www.geeksforgeeks.org/dsa/two-pointers-technique/)
- [YouTube - Two Pointers (takeuforward)](https://www.youtube.com/watch?v=On03HWe2tZM)

**Bài tiếp theo:** [Phép toán bit →](phep-toan-bit.md)
