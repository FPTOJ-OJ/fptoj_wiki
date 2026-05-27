# Bài 15: Deque & Sliding Window

> **Tác giả:** Hà Trí Kiên<br>
> **Nội dung tham khảo từ:** VNOI Wiki - Deque, Hàng đợi hai đầu

## 1. Chuyện gì đang xảy ra?

### Bài toán: Tìm max trong đoạn "trượt"

Bạn có dãy N số và cửa sổ kích thước K trượt từ trái sang phải. Với mỗi vị trí, tìm **giá trị lớn nhất** trong cửa sổ.

```
Dãy: [1, 3, -1, -3, 5, 3, 6, 7], K=3
Cửa sổ [1,3,-1] → max = 3
Cửa sổ [3,-1,-3] → max = 3
Cửa sổ [-1,-3,5] → max = 5
Cửa sổ [-3,5,3] → max = 5
Cửa sổ [5,3,6] → max = 6
Cửa sổ [3,6,7] → max = 7
```

**Cách "ngốc":** Với mỗi vị trí, duyệt K phần tử → O(NK). Quá chậm!

**Deque (Hàng đợi hai đầu):** O(N)! Mỗi phần tử chỉ push/pop tối đa 1 lần.

---

## 2. Deque là gì?

**Deque** = Double-Ended Queue = Hàng đợi hai đầu. Thêm/xóa được ở **cả đầu lẫn cuối**.

| Thao tác | Ý nghĩa | Độ phức tạp |
|----------|----------|-------------|
| `push_front(x)` | Thêm đầu | O(1) |
| `push_back(x)` | Thêm cuối | O(1) |
| `pop_front()` | Xóa đầu | O(1) |
| `pop_back()` | Xóa cuối | O(1) |
| `front()` | Xem đầu | O(1) |
| `back()` | Xem cuối | O(1) |

---

## 3. Tại sao Deque hoạt động được? - Hàng đợi đơn điệu (Monotonic Queue)

### Ý tưởng cốt lõi

Bài toán sliding window yêu cầu tìm max/min trong mỗi cửa sổ. Nếu chỉ dùng mảng thường, mỗi lần phải duyệt toàn bộ cửa sổ → O(NK).

**Hàng đợi đơn điệu** (Monotonic Queue) là kỹ thuật giữ deque luôn **sắp xếp theo một thứ tự** (tăng dần hoặc giảm dần). Khi thêm phần tử mới, ta loại bỏ tất cả phần tử "vô dụng" ở cuối.

### Tại sao phần tử bị loại bỏ là "vô dụng"?

Giả sử deque đang lưu các chỉ số có giá trị giảm dần: `[i1, i2, i3]` với `a[i1] > a[i2] > a[i3]`.

Khi thêm phần tử mới `a[i]`:

- Nếu `a[i3] <= a[i]`: thì `a[i3]` **không bao giờ là max** nữa vì:
  - `a[i]` lớn hơn `a[i3]`
  - `a[i]` vào cửa sổ **sau** `a[i3]` nên sẽ tồn tại **lâu hơn** `a[i3]`
  - → `a[i3]` vô dụng, loại bỏ!

Đây chính là lý do deque luôn giảm dần: mọi phần tử trong deque đều có "cơ hội" trở thành max trong tương lai.

### Ẩn dụ: Hàng người chờ tuyển chọn

Tưởng tượng bạn là tuyển thủ, đứng trong hàng theo thứ tự đến. Nếu có người phía sau **mạnh hơn bạn**, bạn sẽ **không bao giờ được chọn** (vì người đó đến sau, tồn tại lâu hơn). → Bạn bị loại khỏi hàng!

---

## 4. Sliding Window Maximum - Code chi tiết

<p align="center"><img src="/uploads/img/sliding-window.svg" alt="Sliding Window" style="max-width: 700px;" /><br><em>Minh họa kỹ thuật Sliding Window</em></p>

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    
    vector<int> slidingWindowMax(vector<int>& a, int k) {
        deque<int> dq;  // Lưu CHỈ SỐ, không lưu giá trị
        vector<int> result;
        
        for (int i = 0; i < a.size(); i++) {
            // Bước 1: Loại bỏ phần tử "thoát" khỏi cửa sổ (ở đầu deque)
            while (!dq.empty() && dq.front() <= i - k)
                dq.pop_front();
            
            // Bước 2: Loại bỏ phần tử cuối <= a[i] (giữ deque giảm dần)
            // → Phần tử a[i] lớn hơn sẽ "che" chúng, khiến chúng vô dụng
            while (!dq.empty() && a[dq.back()] <= a[i])
                dq.pop_back();
            
            // Bước 3: Thêm chỉ số i vào cuối deque
            dq.push_back(i);
            
            // Bước 4: Ghi nhận kết quả khi cửa sổ đã đầy (từ vị trí K-1 trở đi)
            if (i >= k - 1)
                result.push_back(a[dq.front()]);
        }
        return result;
    }
    
    int main() {
        vector<int> a = {1, 3, -1, -3, 5, 3, 6, 7};
        auto res = slidingWindowMax(a, 3);
        for (int x : res) cout << x << " ";  // 3 3 5 5 6 7
    }
    ```

=== "Python"

    ```python
    from collections import deque
    
    def sliding_window_max(a, k):
        dq = deque()  # Lưu chỉ số
        result = []
        
        for i in range(len(a)):
            # Loại bỏ phần tử "thoát" cửa sổ
            while dq and dq[0] <= i - k:
                dq.popleft()
            
            # Loại bỏ phần tử cuối <= a[i]
            while dq and a[dq[-1]] <= a[i]:
                dq.pop()
            
            dq.append(i)
            
            if i >= k - 1:
                result.append(a[dq[0]])
        
        return result
    ```

### Bước chạy chi tiết

```
Dãy: [1, 3, -1, -3, 5, 3, 6, 7], K=3

i=0: a[0]=1, dq=[0]                    → cửa sổ chưa đầy
i=1: a[1]=3, loại a[0]=1 ≤ 3 → dq=[1]  → cửa sổ chưa đầy
i=2: a[2]=-1, dq=[1,2]                  → max=a[1]=3 ✅
i=3: front=1, 1>3-3=0 → không loại front
     a[2]=-1 > a[3]=-3 → không loại → dq=[1,2,3] → max=a[1]=3 ✅
i=4: front=1, 1≤4-3=1 → loại front → dq=[2,3]
     a[3]=-3 ≤ a[4]=5 → loại 3 → dq=[2]
     a[2]=-1 ≤ a[4]=5 → loại 2 → dq=[4] → max=a[4]=5 ✅
i=5: a[5]=3, dq=[4,5] → max=a[4]=5 ✅
i=6: a[5]=3 ≤ 6 → loại 5; a[4]=5 ≤ 6 → loại 4; dq=[6] → max=a[6]=6 ✅
i=7: a[6]=6 ≤ 7 → loại 6; dq=[7] → max=a[7]=7 ✅

Result: 3 3 5 5 6 7 ✅
```

---

## 5. Sliding Window Minimum - Tương tự nhưng đảo dấu

Tìm **giá trị nhỏ nhất** trong mỗi cửa sổ → giữ deque **tăng dần** (thay vì giảm dần).
=== "C++"

    ```cpp
    vector<int> slidingWindowMin(vector<int>& a, int k) {
        deque<int> dq;
        vector<int> result;
        
        for (int i = 0; i < a.size(); i++) {
            // Loại bỏ phần tử "thoát" cửa sổ
            while (!dq.empty() && dq.front() <= i - k)
                dq.pop_front();
            
            // Loại bỏ phần tử cuối >= a[i] (giữ deque TĂNG DẦN)
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

Nhiều bài toán cần tìm **cả min và max** trong mỗi cửa sổ (ví dụ: chênh lệch max-min ≤ K). Dùng **hai deque** cùng lúc!

=== "C++"

    ```cpp
    // Kiểm tra có đoạn con độ dài K nào mà max - min <= threshold không
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

---

## 6. Ứng dụng khác: Next Greater Element (Phần tử lớn hơn bên phải)

### Bài toán

Cho mảng A, với mỗi phần tử A[i], tìm chỉ số **j > i** sao cho A[j] > A[i] đầu tiên. Nếu không tồn tại → -1.

### Ý tưởng: Dùng deque/stack đơn điệu giảm

Duyệt từ **phải sang trái**, giữ deque có giá trị **giảm dần**. Với mỗi A[i]:

- Loại bỏ các phần tử đầu deque có giá trị <= A[i] (vì chúng nhỏ hơn, không phải "next greater")
- Phần tử đầu deque (nếu có) là next greater element của A[i]
- Thêm A[i] vào đầu deque
=== "C++"

    ```cpp
    vector<int> nextGreaterElement(vector<int>& a) {
        int n = a.size();
        vector<int> nge(n, -1);
        deque<int> dq;  // Lưu chỉ số, giá trị giảm dần
        
        // Duyệt từ phải sang trái
        for (int i = n - 1; i >= 0; i--) {
            // Loại bỏ phần tử <= a[i] (chúng không phải next greater)
            while (!dq.empty() && a[dq.back()] <= a[i])
                dq.pop_back();
            
            // Phần tử đầu deque là next greater (nếu có)
            if (!dq.empty())
                nge[i] = dq.back();
            
            dq.push_back(i);
        }
        return nge;
    }
    
    // Ví dụ:
    // A = [4, 5, 2, 25]
    // NGE = [1, 3, 3, -1]  (chỉ số)
    // Giải thích: 
    //   A[0]=4 → next greater = A[1]=5
    //   A[1]=5 → next greater = A[3]=25
    //   A[2]=2 → next greater = A[3]=25
    //   A[3]=25 → không có → -1
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

### Biến thể: Next Smaller Element

Tương tự, chỉ cần đảo dấu so sánh:

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

---

## 7. Ứng dụng: Largest Rectangle in Histogram

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

## 8. Lưu ý

- **Độ phức tạp:** O(N) cho sliding window - mỗi phần tử push/pop tối đa 1 lần!
- **Deque lưu chỉ số**, không lưu giá trị (để kiểm tra cửa sổ)
- **Monotonic Queue** là kỹ thuật cốt lõi: deque luôn giảm dần (max) hoặc tăng dần (min)
- **Next Greater/Smaller Element** là ứng dụng quan trọng khác của deque/stack đơn điệu
- **Ứng dụng thực tế:** Tìm min/max đoạn tịnh tiến, Histogram, Stock span

---

## 9. Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [LeetCode - Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/) | LC | ⭐⭐⭐ | Deque cơ bản |
| [LeetCode - Next Greater Element](https://leetcode.com/problems/next-greater-element-ii/) | LC | ⭐⭐ | Stack/Deque |
| [LeetCode - Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/) | LC | ⭐⭐⭐ | Stack đơn điệu |
| [VNOJ - NKSGAME](https://oj.vnoi.info/problem/nksgame) | VNOJ | ⭐⭐ | Two pointers |
| [VNOJ - VMQUABEO](https://oj.vnoi.info/problem/vmquabeo) | VNOJ | ⭐⭐⭐ | Sliding window |
| [CSES - Sliding Window Median](https://cses.fi/problemset/task/1076) | CSES | ⭐⭐⭐ | Sliding window nâng cao |
| [CSES - Sliding Window Cost](https://cses.fi/problemset/task/1077) | CSES | ⭐⭐⭐ | Sliding window cost |

## Bài viết liên quan

- [Bài 7: Mảng, Stack, Prefix Sum](07-mang-stack-prefix-sum.md)
- [Bài 16: Hash Table](16-hash-table.md)

## Tài liệu tham khảo

- [GeeksforGeeks - Sliding Window Maximum](https://www.geeksforgeeks.org/dsa/sliding-window-maximum-maximum-of-all-subarrays-of-size-k/)
- [USACO Guide - Sliding Window](https://usaco.guide/gold/sliding-window)
- [takeuforward - Sliding Window Maximum](https://takeuforward.org/data-structure/sliding-window-maximum)
- [YouTube - Deque Sliding Window](https://www.youtube.com/watch?v=5VjQD62gOYA)
- [VNOI Wiki - Deque](https://wiki.vnoi.info/algo/data-structures/deque-min-max)

**Bài tiếp theo:** [Trie →](17-trie.md)