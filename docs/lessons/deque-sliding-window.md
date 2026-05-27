# Bài 15: Deque & Sliding Window

> **Tác giả:** Hà Trí Kiên<br>
> **Nội dung tham khảo từ:** VNOI Wiki - Deque, Hàng đợi hai đầu

---

## Bản chất vấn đề

### Bài toán: Tìm max trong đoạn "trượt"

Cho dãy $N$ số nguyên và cửa sổ kích thước $K$ trượt từ trái sang phải. Với mỗi vị trí, tìm **giá trị lớn nhất** trong cửa sổ.

Ví dụ với dãy $a = [1, 3, -1, -3, 5, 3, 6, 7]$ và $K = 3$:

| Vị trí cửa sổ | Các phần tử | Giá trị max |
|:---:|:---:|:---:|
| $0 \dots 2$ | $[1, 3, -1]$ | $3$ |
| $1 \dots 3$ | $[3, -1, -3]$ | $3$ |
| $2 \dots 4$ | $[-1, -3, 5]$ | $5$ |
| $3 \dots 5$ | $[-3, 5, 3]$ | $5$ |
| $4 \dots 6$ | $[5, 3, 6]$ | $6$ |
| $5 \dots 7$ | $[3, 6, 7]$ | $7$ |

**Cách "ngốc":** Với mỗi vị trí, duyệt $K$ phần tử $\Rightarrow O(NK)$. Quá chậm!

**Dùng Deque:** $O(N)$! Mỗi phần tử chỉ push/pop tối đa 1 lần.

### Deque là gì?

**Deque** = Double-Ended Queue = Hàng đợi hai đầu. Thêm/xóa được ở **cả đầu lẫn cuối**.

| Thao tác | Ý nghĩa | Độ phức tạp |
|----------|----------|:-----------:|
| `push_front(x)` | Thêm đầu | $O(1)$ |
| `push_back(x)` | Thêm cuối | $O(1)$ |
| `pop_front()` | Xóa đầu | $O(1)$ |
| `pop_back()` | Xóa cuối | $O(1)$ |
| `front()` | Xem đầu | $O(1)$ |
| `back()` | Xem cuối | $O(1)$ |

---

## Tư duy cốt lõi

### Hàng đợi đơn điệu (Monotonic Queue)

Bài toán sliding window yêu cầu tìm max/min trong mỗi cửa sổ. Nếu chỉ dùng mảng thường, mỗi lần phải duyệt toàn bộ cửa sổ $\Rightarrow O(NK)$.

**Hàng đợi đơn điệu** (Monotonic Queue) là kỹ thuật giữ deque luôn **sắp xếp theo một thứ tự** (tăng dần hoặc giảm dần). Khi thêm phần tử mới, ta loại bỏ tất cả phần tử "vô dụng" ở cuối.

### Tại sao phần tử bị loại bỏ là "vô dụng"?

Giả sử deque đang lưu các chỉ số có giá trị giảm dần: $[i_1, i_2, i_3]$ với $a[i_1] > a[i_2] > a[i_3]$.

Khi thêm phần tử mới $a[i]$: nếu $a[i_3] \le a[i]$ thì $a[i_3]$ **không bao giờ là max** nữa vì:

- $a[i]$ lớn hơn $a[i_3]$
- $a[i]$ vào cửa sổ **sau** $a[i_3]$ nên sẽ tồn tại **lâu hơn** $a[i_3]$

$\Rightarrow$ $a[i_3]$ vô dụng, loại bỏ!

Đây chính là lý do deque luôn giảm dần: mọi phần tử trong deque đều có "cơ hội" trở thành max trong tương lai.

### Ẩn dụ: Hàng người chờ tuyển chọn

Tưởng tượng bạn là tuyển thủ, đứng trong hàng theo thứ tự đến. Nếu có người phía sau **mạnh hơn bạn**, bạn sẽ **không bao giờ được chọn** (vì người đó đến sau, tồn tại lâu hơn). Bạn bị loại khỏi hàng!

---

## Phân tích tính đúng đắn

### Sliding Window Maximum

Ý tưởng: Duyệt mảng từ trái sang phải, giữ deque lưu **chỉ số** (không lưu giá trị) theo thứ tự giá trị **giảm dần**. Với mỗi phần tử $a[i]$, thực hiện 3 bước:

1. **Loại bỏ phần tử "thoát" khỏi cửa sổ** (ở đầu deque): nếu chỉ số đầu $\le i - K$, pop front.
2. **Loại bỏ phần tử cuối** $\le a[i]$ (giữ deque giảm dần): vì $a[i]$ lớn hơn sẽ "che" chúng.
3. **Thêm chỉ số** $i$ vào cuối deque. Nếu cửa sổ đã đầy ($i \ge K - 1$), ghi nhận $a[\text{front}]$ là max.

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    vector<int> slidingWindowMax(vector<int>& a, int k) {
        deque<int> dq;
        vector<int> result;

        for (int i = 0; i < a.size(); i++) {
            while (!dq.empty() && dq.front() <= i - k)
                dq.pop_front();

            while (!dq.empty() && a[dq.back()] <= a[i])
                dq.pop_back();

            dq.push_back(i);

            if (i >= k - 1)
                result.push_back(a[dq.front()]);
        }
        return result;
    }

    int main() {
        vector<int> a = {1, 3, -1, -3, 5, 3, 6, 7};
        auto res = slidingWindowMax(a, 3);
        for (int x : res) cout << x << " ";
    }
    ```

=== "Python"

    ```python
    from collections import deque

    def sliding_window_max(a, k):
        dq = deque()
        result = []

        for i in range(len(a)):
            while dq and dq[0] <= i - k:
                dq.popleft()

            while dq and a[dq[-1]] <= a[i]:
                dq.pop()

            dq.append(i)

            if i >= k - 1:
                result.append(a[dq[0]])

        return result
    ```

### Bước chạy chi tiết

Với $a = [1, 3, -1, -3, 5, 3, 6, 7]$, $K = 3$:

| $i$ | $a[i]$ | Thao tác | Deque (chỉ số) | Deque (giá trị) | Ghi nhận max |
|:---:|:---:|---|:---:|:---:|:---:|
| $0$ | $1$ | Thêm $0$ | $[0]$ | $[1]$ | Chưa đầy |
| $1$ | $3$ | Loại $0$ ($1 \le 3$), thêm $1$ | $[1]$ | $[3]$ | Chưa đầy |
| $2$ | $-1$ | Thêm $2$ | $[1, 2]$ | $[3, -1]$ | $a[1] = 3$ |
| $3$ | $-3$ | Front $1 > 0$, thêm $3$ | $[1, 2, 3]$ | $[3, -1, -3]$ | $a[1] = 3$ |
| $4$ | $5$ | Loại front $1 \le 1$, loại $3$ ($-3 \le 5$), loại $2$ ($-1 \le 5$), thêm $4$ | $[4]$ | $[5]$ | $a[4] = 5$ |
| $5$ | $3$ | Thêm $5$ | $[4, 5]$ | $[5, 3]$ | $a[4] = 5$ |
| $6$ | $6$ | Loại $5$ ($3 \le 6$), loại $4$ ($5 \le 6$), thêm $6$ | $[6]$ | $[6]$ | $a[6] = 6$ |
| $7$ | $7$ | Loại $6$ ($6 \le 7$), thêm $7$ | $[7]$ | $[7]$ | $a[7] = 7$ |

Kết quả: $[3, 3, 5, 5, 6, 7]$.

### Sliding Window Minimum

Tìm **giá trị nhỏ nhất** trong mỗi cửa sổ $\Rightarrow$ giữ deque **tăng dần** (thay vì giảm dần). Chỉ cần đảo dấu so sánh ở bước loại bỏ cuối.

=== "C++"

    ```cpp
    vector<int> slidingWindowMin(vector<int>& a, int k) {
        deque<int> dq;
        vector<int> result;

        for (int i = 0; i < a.size(); i++) {
            while (!dq.empty() && dq.front() <= i - k)
                dq.pop_front();

            while (!dq.empty() && a[dq.back()] >= a[i])
                dq.pop_back();

            dq.push_back(i);

            if (i >= k - 1)
                result.push_back(a[dq.front()]);
        }
        return result;
    }
    ```

=== "Python"

    ```python
    from collections import deque

    def sliding_window_min(a, k):
        dq = deque()
        result = []

        for i in range(len(a)):
            while dq and dq[0] <= i - k:
                dq.popleft()

            while dq and a[dq[-1]] >= a[i]:
                dq.pop()

            dq.append(i)

            if i >= k - 1:
                result.append(a[dq[0]])

        return result
    ```

### Kết hợp cả min và max

Nhiều bài toán cần tìm **cả min và max** trong mỗi cửa sổ (ví dụ: chênh lệch max-min $\le$ ngưỡng). Dùng **hai deque** cùng lúc!

=== "C++"

    ```cpp
    bool hasGoodSubarray(vector<int>& a, int k, int threshold) {
        deque<int> maxDq, minDq;

        for (int i = 0; i < a.size(); i++) {
            while (!maxDq.empty() && maxDq.front() <= i - k) maxDq.pop_front();
            while (!minDq.empty() && minDq.front() <= i - k) minDq.pop_front();

            while (!maxDq.empty() && a[maxDq.back()] <= a[i]) maxDq.pop_back();
            while (!minDq.empty() && a[minDq.back()] >= a[i]) minDq.pop_back();

            maxDq.push_back(i);
            minDq.push_back(i);

            if (i >= k - 1) {
                int windowMax = a[maxDq.front()];
                int windowMin = a[minDq.front()];
                if (windowMax - windowMin <= threshold)
                    return true;
            }
        }
        return false;
    }
    ```

=== "Python"

    ```python
    from collections import deque

    def has_good_subarray(a, k, threshold):
        max_dq = deque()
        min_dq = deque()

        for i in range(len(a)):
            while max_dq and max_dq[0] <= i - k:
                max_dq.popleft()
            while min_dq and min_dq[0] <= i - k:
                min_dq.popleft()

            while max_dq and a[max_dq[-1]] <= a[i]:
                max_dq.pop()
            while min_dq and a[min_dq[-1]] >= a[i]:
                min_dq.pop()

            max_dq.append(i)
            min_dq.append(i)

            if i >= k - 1:
                window_max = a[max_dq[0]]
                window_min = a[min_dq[0]]
                if window_max - window_min <= threshold:
                    return True
        return False
    ```

### Ứng dụng: Next Greater Element

Cho mảng $A$, với mỗi phần tử $A[i]$, tìm chỉ số $j > i$ sao cho $A[j] > A[i]$ đầu tiên. Nếu không tồn tại $\Rightarrow -1$.

**Tư duy:** Duyệt từ **phải sang trái**, giữ deque có giá trị **giảm dần**. Với mỗi $A[i]$: loại bỏ các phần tử đầu deque có giá trị $\le A[i]$, phần tử đầu deque (nếu có) là next greater element.

=== "C++"

    ```cpp
    vector<int> nextGreaterElement(vector<int>& a) {
        int n = a.size();
        vector<int> nge(n, -1);
        deque<int> dq;

        for (int i = n - 1; i >= 0; i--) {
            while (!dq.empty() && a[dq.back()] <= a[i])
                dq.pop_back();

            if (!dq.empty())
                nge[i] = dq.back();

            dq.push_back(i);
        }
        return nge;
    }
    ```

=== "Python"

    ```python
    def next_greater_element(a):
        n = len(a)
        nge = [-1] * n
        dq = []

        for i in range(n - 1, -1, -1):
            while dq and a[dq[-1]] <= a[i]:
                dq.pop()
            if dq:
                nge[i] = dq[-1]
            dq.append(i)

        return nge
    ```

Ví dụ: $A = [4, 5, 2, 25]$, kết quả trả về chỉ số: $[1, 3, 3, -1]$.

- $A[0] = 4$: next greater $= A[1] = 5$
- $A[1] = 5$: next greater $= A[3] = 25$
- $A[2] = 2$: next greater $= A[3] = 25$
- $A[3] = 25$: không có $\Rightarrow -1$

### Biến thể: Next Smaller Element

Tương tự, chỉ cần đảo dấu so sánh ($\ge$ thay vì $\le$).

=== "C++"

    ```cpp
    vector<int> nextSmallerElement(vector<int>& a) {
        int n = a.size();
        vector<int> nse(n, -1);
        deque<int> dq;

        for (int i = n - 1; i >= 0; i--) {
            while (!dq.empty() && a[dq.back()] >= a[i])
                dq.pop_back();
            if (!dq.empty())
                nse[i] = dq.back();
            dq.push_back(i);
        }
        return nse;
    }
    ```

=== "Python"

    ```python
    def next_smaller_element(a):
        n = len(a)
        nse = [-1] * n
        dq = []

        for i in range(n - 1, -1, -1):
            while dq and a[dq[-1]] >= a[i]:
                dq.pop()
            if dq:
                nse[i] = dq[-1]
            dq.append(i)

        return nse
    ```

### Ứng dụng: Largest Rectangle in Histogram

Đây là bài toán kinh điển kết hợp Next Smaller Element và Previous Smaller Element.

=== "C++"

    ```cpp
    int largestRectangleArea(vector<int>& heights) {
        int n = heights.size();
        stack<int> st;
        int maxArea = 0;

        for (int i = 0; i <= n; i++) {
            int h = (i == n) ? 0 : heights[i];
            while (!st.empty() && h < heights[st.top()]) {
                int height = heights[st.top()];
                st.pop();
                int width = st.empty() ? i : i - st.top() - 1;
                maxArea = max(maxArea, height * width);
            }
            st.push(i);
        }
        return maxArea;
    }
    ```

=== "Python"

    ```python
    def largest_rectangle_area(heights):
        n = len(heights)
        st = []
        max_area = 0

        for i in range(n + 1):
            h = 0 if i == n else heights[i]
            while st and h < heights[st[-1]]:
                height = heights[st.pop()]
                width = i if not st else i - st[-1] - 1
                max_area = max(max_area, height * width)
            st.append(i)

        return max_area
    ```

---

## Đánh giá độ phức tạp

### Độ phức tạp thời gian

- **Sliding Window Maximum/Minimum:** $O(N)$ với $N$ là độ dài mảng. Mỗi phần tử được push vào deque đúng 1 lần và pop ra tối đa 1 lần $\Rightarrow$ tổng thao tác là $O(2N) = O(N)$.
- **Next Greater/Smaller Element:** $O(N)$, lý do tương tự.
- **Largest Rectangle in Histogram:** $O(N)$, mỗi phần tử push/pop tối đa 1 lần.

### Độ phức tạp không gian

- **Sliding Window:** $O(K)$ cho deque (tối đa $K$ phần tử trong cửa sổ).
- **Next Greater/Smaller Element:** $O(N)$ cho deque trong trường hợp xấu nhất.
- **Largest Rectangle:** $O(N)$ cho stack.

### Lưu ý khi cài đặt

- **Deque lưu chỉ số**, không lưu giá trị (để kiểm tra cửa sổ có hợp lệ không).
- **Monotonic Queue** là kỹ thuật cốt lõi: deque luôn giảm dần (tìm max) hoặc tăng dần (tìm min).
- Với bài tìm min, chỉ cần đảo dấu so sánh ở bước loại bỏ phần tử cuối deque.

---

## Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|:------:|--------|
| [LeetCode - Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/) | LC | ⭐⭐⭐ | Deque cơ bản |
| [LeetCode - Next Greater Element II](https://leetcode.com/problems/next-greater-element-ii/) | LC | ⭐⭐ | Stack/Deque |
| [LeetCode - Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/) | LC | ⭐⭐⭐ | Stack đơn điệu |
| [VNOJ - NKSGAME](https://oj.vnoi.info/problem/nksgame) | VNOJ | ⭐⭐ | Two pointers |
| [VNOJ - VMQUABEO](https://oj.vnoi.info/problem/vmquabeo) | VNOJ | ⭐⭐⭐ | Sliding window |
| [CSES - Sliding Window Median](https://cses.fi/problemset/task/1076) | CSES | ⭐⭐⭐ | Sliding window nâng cao |
| [CSES - Sliding Window Cost](https://cses.fi/problemset/task/1077) | CSES | ⭐⭐⭐ | Sliding window cost |

## Bài viết liên quan

- [Bài 7: Mảng, Stack, Prefix Sum](mang-stack-prefix-sum.md)
- [Bài 16: Hash Table](hash-table.md)

## Tài liệu tham khảo

- [GeeksforGeeks - Sliding Window Maximum](https://www.geeksforgeeks.org/dsa/sliding-window-maximum-maximum-of-all-subarrays-of-size-k/)
- [USACO Guide - Sliding Window](https://usaco.guide/gold/sliding-window)
- [takeuforward - Sliding Window Maximum](https://takeuforward.org/data-structure/sliding-window-maximum)
- [YouTube - Deque Sliding Window](https://www.youtube.com/watch?v=5VjQD62gOYA)
- [VNOI Wiki - Deque](https://wiki.vnoi.info/algo/data-structures/deque-min-max)

**Bài tiếp theo:** [Trie](trie.md)
