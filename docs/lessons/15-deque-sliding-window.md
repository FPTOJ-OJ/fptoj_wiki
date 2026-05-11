# Bài 15: Deque & Sliding Window

> **Tác giả:** Hà Trí Kiên
> **Nội dung tham khảo từ:** VNOI Wiki - Deque, Hàng đợi hai đầu

## 1. Chuyện gì đang xảy ra?

### Bài toán: Tìm max trong đoạn "trượt"

Bạn có dãy N số và cửa sổ kích thước K trượt từ trái sang phải. Với mỗi vị trí, tìm **giá trị lớn nhất** trong cửa sổ.

```
Dãy: [1, 3, -1, -3, 5, 3, 6, 7], K=3
Cửa sổ [1,3,-1] → max = 3
Cửa sổ [3,-1,-3] → max = 3
Cửa sổ [-1,-3,5] → max = 5
...
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

## 3. Sliding Window Maximum - Bài toán kinh điển

### Ý tưởng: Deque đơn điệu giảm

Giữ deque sao cho các chỉ số trong deque có giá trị **giảm dần**. Phần tử đầu deque luôn là max!

```
Khi thêm phần tử a[i]:
- Loại bỏ các phần tử cuối deque có giá trị <= a[i]
  (vì chúng không bao giờ là max khi a[i còn tồn tại)
- Thêm i vào cuối deque

Khi cửa sổ trượt:
- Loại bỏ phần tử đầu deque nếu nó "thoát" khỏi cửa sổ
- Phần tử đầu deque = max hiện tại
```

### Code C++

```cpp
#include <bits/stdc++.h>
using namespace std;

vector<int> slidingWindowMax(vector<int>& a, int k) {
    deque<int> dq;  // Lưu CHỈ SỐ, không lưu giá trị
    vector<int> result;
    
    for (int i = 0; i < a.size(); i++) {
        // Loại bỏ phần tử "thoát" khỏi cửa sổ
        while (!dq.empty() && dq.front() <= i - k)
            dq.pop_front();
        
        // Loại bỏ phần tử cuối <= a[i] (giữ deque giảm dần)
        while (!dq.empty() && a[dq.back()] <= a[i])
            dq.pop_back();
        
        dq.push_back(i);
        
        // Ghi nhận kết quả khi cửa sổ đã đầy
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

### Code Python

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

---

## 4. Lưu ý

- **Độ phức tạp:** O(N) - mỗi phần tử push/pop tối đa 1 lần!
- **Deque lưu chỉ số**, không lưu giá trị (để kiểm tra cửa sổ)
- **Ứng dụng:** Tìm min/max đoạn tịnh tiến, bài toán Histogram

---

---

## Tài liệu tham khảo

- [GeeksforGeeks - Sliding Window Maximum](https://www.geeksforgeeks.org/dsa/sliding-window-maximum-maximum-of-all-subarrays-of-size-k/)
- [USACO Guide - Sliding Window](https://usaco.guide/gold/sliding-window)
- [takeuforward - Sliding Window Maximum](https://takeuforward.org/data-structure/sliding-window-maximum)
- [YouTube - Deque Sliding Window](https://www.youtube.com/watch?v=5VjQD62gOYA)
- [LeetCode - Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/)
- [VNOI Wiki - Deque](https://wiki.vnoi.info/algo/data-structures/deque-min-max)

**Bài tiếp theo:** [Hash Table →](16-hash-table.md)
