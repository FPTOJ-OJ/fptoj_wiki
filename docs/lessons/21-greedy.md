# Bài 21: Greedy (Tham Lam) - Chọn Tốt Nhất Mỗi Bước!

> **Tác giả:** Hà Trí Kiên<br>
> **Nội dung tham khảo từ:** VNOI Wiki - Thuật toán Tham lam

## 1. Chuyện gì đang xảy ra?

### Bài toán: Đổi tiền

Bạn cần đổi 110 đồng bằng ít tờ tiền nhất. Các mệnh giá: 1, 5, 10, 50, 100.

**Greedy:** Mỗi bước chọn mệnh giá **lớn nhất** có thể!

- 110 → lấy 1 tờ 100 → còn 10
- 10 → lấy 1 tờ 10 → còn 0
- Tổng: 2 tờ! ✅

---

## 2. Greedy là gì?

**Greedy (Tham lam)** = Mỗi bước chọn lựa chọn **tốt nhất tại thời điểm đó**, không quan tâm tương lai.

### Khi nào Greedy đúng?

Greedy **không phải lúc nào cũng đúng!** Chỉ đúng khi bài toán có:

1. **Tính tham lam (Greedy Choice Property):** Lựa chọn tốt nhất cục bộ → tốt nhất toàn cục
2. **Tính tối ưu con (Optimal Substructure):** Bài toán lớn = bài toán con + lựa chọn

### Ví dụ Greedy SAI

Đổi tiền với mệnh giá {1, 3, 4}, cần đổi 6:

- Greedy: 4 + 1 + 1 = 3 tờ ← SAI!
- Đúng: 3 + 3 = 2 tờ

→ Greedy không phải lúc nào cũng tối ưu! (Nhưng với hệ tiền tệ chuẩn {1, 5, 10, 50, 100} thì Greedy luôn đúng.)

---

## 3. Các bài toán Greedy kinh điển

### 3.1. Activity Selection (Chọn hoạt động)

Có N hoạt động, mỗi hoạt động có thời gian bắt đầu và kết thúc. Chọn nhiều hoạt động nhất sao cho không trùng thời gian.

**Greedy:** Sắp xếp theo thời gian kết thúc, chọn hoạt động kết thúc sớm nhất mà không trùng.

```cpp
int maxActivities(vector<pair<int,int>>& activities) {
    sort(activities.begin(), activities.end(), 
         [](auto& a, auto& b) { return a.second < b.second; });
    
    int count = 0, lastEnd = -1;
    for (auto& [start, end] : activities) {
        if (start >= lastEnd) {
            count++;
            lastEnd = end;
        }
    }
    return count;
}
```

### 3.2. Fractional Knapsack (Cái túi phân số)

Có N đồ vật, mỗi vật có trọng lượng w[i] và giá trị v[i]. Túi chứa được W. Được phép chia nhỏ đồ vật. Tìm giá trị lớn nhất.

**Greedy:** Sắp xếp theo tỷ lệ giá trị/trọng lượng giảm dần, lấy hết vật nào được trước.

```cpp
double fractionalKnapsack(vector<pair<double,double>>& items, double W) {
    sort(items.begin(), items.end(), [](auto& a, auto& b) {
        return a.first / a.second > b.first / b.second;  // Tỷ lệ giảm dần
    });
    
    double totalValue = 0;
    for (auto& [value, weight] : items) {
        if (W >= weight) {
            totalValue += value;
            W -= weight;
        } else {
            totalValue += value * (W / weight);
            break;
        }
    }
    return totalValue;
}
```
```python
def fractional_knapsack(items, W):
    # items = [(value, weight), ...]
    items.sort(key=lambda x: x[0] / x[1], reverse=True)
    total_value = 0
    for value, weight in items:
        if W >= weight:
            total_value += value
            W -= weight
        else:
            total_value += value * (W / weight)
            break
    return total_value
```

### 3.3. Job Sequencing (Xếp lịch công việc)

Mỗi công việc có deadline và lợi nhuận. Hoàn thành tối đa công việc trong deadline.

**Greedy:** Sắp xếp theo lợi nhuận giảm dần, chọn thời điểm trễ nhất trước deadline.

```cpp
int jobSequencing(vector<pair<int,int>>& jobs) {
    // jobs[i] = {deadline, profit}
    sort(jobs.begin(), jobs.end(), [](auto& a, auto& b) {
        return a.second > b.second;  // Profit giảm dần
    });
    
    int maxDeadline = 0;
    for (auto& [d, p] : jobs)
        maxDeadline = max(maxDeadline, d);
    
    vector<int> slot(maxDeadline + 1, -1);  // slot[t] = job được xếp tại thời điểm t
    int totalProfit = 0;
    
    for (auto& [deadline, profit] : jobs) {
        // Tìm slot trống gần deadline nhất
        for (int t = deadline; t >= 1; t--) {
            if (slot[t] == -1) {
                slot[t] = profit;
                totalProfit += profit;
                break;
            }
        }
    }
    return totalProfit;
}
```

### Code Python

```python
def job_sequencing(jobs):
    jobs.sort(key=lambda x: x[1], reverse=True)
    max_deadline = max(d for d, p in jobs)
    slot = [-1] * (max_deadline + 1)
    total_profit = 0
    for deadline, profit in jobs:
        for t in range(deadline, 0, -1):
            if slot[t] == -1:
                slot[t] = profit
                total_profit += profit
                break
    return total_profit
```

### 3.4. Minimum Number of Platforms (Sân ga)

Cho giờ đến và giờ đi của N chuyến tàu. Tìm số sân ga tối thiểu.

**Greedy:** Sắp xếp cả giờ đến và giờ đi. Duyệt, tăng số sân ga khi tàu đến, giảm khi tàu đi.

```cpp
int minPlatforms(vector<int>& arrival, vector<int>& departure) {
    sort(arrival.begin(), arrival.end());
    sort(departure.begin(), departure.end());
    
    int platforms = 0, maxPlatforms = 0;
    int i = 0, j = 0, n = arrival.size();
    
    while (i < n && j < n) {
        if (arrival[i] <= departure[j]) {
            platforms++;  // Tàu đến → cần thêm sân ga
            maxPlatforms = max(maxPlatforms, platforms);
            i++;
        } else {
            platforms--;  // Tàu đi → giải phóng sân ga
            j++;
        }
    }
    return maxPlatforms;
}
```

### Code Python

```python
def min_platforms(arrival, departure):
    arrival.sort()
    departure.sort()
    platforms = max_platforms = 0
    i = j = 0
    n = len(arrival)
    while i < n and j < n:
        if arrival[i] <= departure[j]:
            platforms += 1
            max_platforms = max(max_platforms, platforms)
            i += 1
        else:
            platforms -= 1
            j += 1
    return max_platforms
```

---

## 4. Proof of Greedy - Chứng minh tính đúng đắn

Để chứng minh Greedy đúng, ta thường dùng 2 phương pháp:

### Phương pháp 1: Exchange Argument (Hoán đổi)

1. Giả sử có nghiệm tối ưu O khác với nghiệm Greedy G
2. Chỉ ra rằng ta có thể **hoán đổi** O để biến nó thành G mà **không giảm chất lượng**
3. Kết luận: G cũng tối ưu

**Ví dụ: Activity Selection**

- Giả sử O chọn hoạt động kết thúc lúc t₁, nhưng G chọn hoạt động kết thúc sớm hơn lúc t₀ < t₁
- Hoán đổi: thay hoạt động t₁ bằng t₀ trong O
- Kết quả: O mới có cùng số hoạt động, nhưng hoạt động cuối kết thúc sớm hơn → có thể chọn thêm nhiều hơn
- → G không tệ hơn O

### Phương pháp 2: Greedy Stays Ahead (Greedy luôn dẫn trước)

1. Chứng minh rằng sau mỗi bước, nghiệm Greedy **không tệ hơn** nghiệm tối ưu
2. Dùng quy nạp: bước đầu tiên Greedy chọn tốt nhất → các bước sau cũng vậy

**Ví dụ: Đổi tiền {1, 5, 10, 50, 100}**

- Chứng minh: nếu Greedy chọn tờ 100, thì mọi nghiệm tối ưu cũng phải dùng tờ 100
- Vì nếu không dùng tờ 100, cần ít nhất 10 tờ 10 → nhiều hơn 1 tờ 100
- → Greedy đúng

---

## 5. So sánh Greedy vs DP vs Quay lui

| | Greedy | DP | Quay lui |
|--|--------|-----|----------|
| Lựa chọn | Tốt nhất cục bộ | Xét tất cả | Thử tất cả |
| Độ phức tạp | Thường O(N log N) | O(N²) hoặc O(NK) | O(2^N) hoặc O(N!) |
| Khi nào đúng? | Khi có tính tham lam | Luôn đúng | Luôn đúng |
| Ví dụ | Activity Selection | Knapsack 0/1 | N-Queens |
| Code | Ngắn, đơn giản | Trung bình | Dài hơn |

### Khi nào dùng Greedy?

- Bài toán có tính tham lam (chứng minh được)
- Cần độ phức tạp tốt (O(N log N))
- Không cần xét tất cả khả năng

### Khi nào KHÔNG dùng Greedy?

- Không chứng minh được tính tham lam
- Cần nghiệm chính xác tối ưu → dùng DP
- Bài toán có nhiều ràng buộc phức tạp → dùng DP hoặc Quay lui

---

## 6. Bài toán Greedy nâng cao

### 6.1. Huffman Coding (Nén dữ liệu)

Mỗi ký tự có tần suất xuất hiện. Mã hóa sao cho tổng độ dài mã là nhỏ nhất.

**Greedy:** Luôn gộp 2 node có tần suất nhỏ nhất.

```cpp
int huffmanCoding(vector<int>& freq) {
    priority_queue<int, vector<int>, greater<int>> pq(freq.begin(), freq.end());
    
    int totalCost = 0;
    while (pq.size() > 1) {
        int a = pq.top(); pq.pop();
        int b = pq.top(); pq.pop();
        totalCost += a + b;
        pq.push(a + b);
    }
    return totalCost;
}
```

### Code Python

```python
import heapq

def huffman_coding(freq):
    heapq.heapify(freq)
    total_cost = 0
    while len(freq) > 1:
        a = heapq.heappop(freq)
        b = heapq.heappop(freq)
        total_cost += a + b
        heapq.heappush(freq, a + b)
    return total_cost
```

### 6.2. Interval Partitioning (Phân đoạn)

Cho N hoạt động, mỗi hoạt động có bắt đầu và kết thúc. Tìm số phòng tối thiểu.

**Greedy:** Sắp xếp theo bắt đầu, gán phòng trống đầu tiên.

---

## 7. Lưu ý

- **Greedy không phải lúc nào cũng đúng!** Phải chứng minh tính đúng đắn
- Nếu không chắc Greedy đúng → dùng DP
- Greedy thường kết hợp với **sắp xếp** trước khi chọn
- **Proof of Greedy** là kỹ năng quan trọng trong thi đấu

---

## 8. Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Coin Piles](https://cses.fi/problemset/task/1754) | CSES | ⭐ | Greedy cơ bản |
| [CSES - Tasks and Deadlines](https://cses.fi/problemset/task/1630) | CSES | ⭐⭐ | Activity selection |
| [CSES - Stick Lengths](https://cses.fi/problemset/task/1619) | CSES | ⭐⭐ | Median |
| [LeetCode - Jump Game](https://leetcode.com/problems/jump-game/) | LC | ⭐⭐ | Greedy |
| [LeetCode - Interval Scheduling](https://leetcode.com/problems/non-overlapping-intervals/) | LC | ⭐⭐ | Activity selection |
| [VNOJ - Atcoder DP Contest L - Deque](https://oj.vnoi.info/problem/atcoder_dp_l) | VNOJ | ⭐⭐⭐ | Game/Greedy |
| [VNOJ - NKSGAME](https://oj.vnoi.info/problem/nksgame) | VNOJ | ⭐⭐ | Two pointers |
| [CSES - Room Allocation](https://cses.fi/problemset/task/1164) | CSES | ⭐⭐ | Interval scheduling |

## Bài viết liên quan

- [Bài 2: Thuật toán sắp xếp](02-thuat-toan-sap-xep.md)
- [Bài 12: Quy hoạch động](12-quy-hoach-dong.md)

## Tài liệu tham khảo

- [Topcoder - Greedy is Good](https://www.topcoder.com/thrive/articles/Greedy%20is%20Good)
- [VNOI Wiki - Thuật toán Tham lam](https://vnoi.info/translate/topcoder/Greedy-is-Good)
- [GeeksforGeeks - Greedy Algorithms](https://www.geeksforgeeks.org/dsa/greedy-algorithms/)
- [USACO Guide - Greedy Algorithms](https://usaco.guide/bronze/intro-greedy)

**Bài tiếp theo:** [Hình học cơ bản →](22-hinh-hoc-co-ban.md)
