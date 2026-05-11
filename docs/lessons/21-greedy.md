# Bài 21: Greedy (Tham Lam) - Chọn Tốt Nhất Mỗi Bước!

> **Tác giả:** Hà Trí Kiên
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

→ Greedy không phải lúc nào cũng tối ưu!

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

### 3.3. Job Sequencing (Xếp lịch công việc)

Mỗi công việc có deadline và lợi nhuận. Hoàn thành tối đa công việc trong deadline.

**Greedy:** Sắp xếp theo lợi nhuận giảm dần, chọn thời điểm trễ nhất trước deadline.

---

## 4. Code Python

```python
# Activity Selection
def max_activities(activities):
    activities.sort(key=lambda x: x[1])  # Sắp xếp theo thời gian kết thúc
    count, last_end = 0, -1
    for start, end in activities:
        if start >= last_end:
            count += 1
            last_end = end
    return count
```

---

## 5. So sánh Greedy vs DP vs Quay lui

| | Greedy | DP | Quay lui |
|--|--------|-----|----------|
| Lựa chọn | Tốt nhất cục bộ | Xét tất cả | Thử tất cả |
| Độ phức tạp | Thường O(N log N) | O(N²) hoặc O(NK) | O(2^N) hoặc O(N!) |
| Khi nào đúng? | Khi có tính tham lam | Luôn đúng | Luôn đúng |
| Ví dụ | Activity Selection | Knapsack 0/1 | N-Queens |

---

## 6. Lưu ý

- **Greedy không phải lúc nào cũng đúng!** Phải chứng minh tính đúng đắn
- Nếu không chắc Greedy đúng → dùng DP
- Greedy thường kết hợp với **sắp xếp** trước khi chọn

---

---

## Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Coin Piles](https://cses.fi/problemset/task/1754) | CSES | ⭐ | Greedy cơ bản |
| [CSES - Tasks and Deadlines](https://cses.fi/problemset/task/1630) | CSES | ⭐⭐ | Activity selection |
| [CSES - Stick Lengths](https://cses.fi/problemset/task/1619) | CSES | ⭐⭐ | Median |
| [LeetCode - Jump Game](https://leetcode.com/problems/jump-game/) | LC | ⭐⭐ | Greedy |
| [LeetCode - Interval Scheduling](https://leetcode.com/problems/non-overlapping-intervals/) | LC | ⭐⭐ | Activity selection |

## Bài viết liên quan

- [Bài 2: Thuật toán sắp xếp](02-thuat-toan-sap-xep.md)
- [Bài 12: Quy hoạch động](12-quy-hoach-dong.md)

## Tài liệu tham khảo

- [Topcoder - Greedy is Good](https://www.topcoder.com/thrive/articles/Greedy%20is%20Good)
- [VNOI Wiki - Thuật toán Tham lam](https://vnoi.info/translate/topcoder/Greedy-is-Good)
- [GeeksforGeeks - Greedy Algorithms](https://www.geeksforgeeks.org/dsa/greedy-algorithms/)
- [USACO Guide - Greedy Algorithms](https://usaco.guide/bronze/intro-greedy)

**Bài tiếp theo:** [Hình học cơ bản →](22-hinh-hoc-co-ban.md)
