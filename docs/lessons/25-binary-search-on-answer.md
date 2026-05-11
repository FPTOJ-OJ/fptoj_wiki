# Bài 25: Binary Search on Answer - Tìm Kiếm Trên Đáp Án!

> **Tác giả:** Hà Trí Kiên
> **Nội dung tham khảo từ:** VNOI Wiki - Tìm kiếm nhị phân

## 1. Đây là gì?

###Ẩn dụ: Đoán số

Bạn nghĩ 1 con số từ 1 đến 100. Bạn hỏi: "Số đó ≥ 50 không?" → "Có" → "≥ 75 không?" → "Không" → ... Chỉ cần ~7 câu hỏi!

**Binary Search on Answer** = áp dụng binary search để tìm **giá trị min/max** thỏa mãn điều kiện nào đó.

---

## 2. Nhận biết bài Binary Search on Answer

### Dấu hiệu:
- Đề hỏi tìm **giá trị min/max** thỏa mãn điều kiện
- Có thể viết hàm `check(x)` trả về true/false
- Hàm `check(x)` có tính **đơn điệu**: nếu `check(x) = true` thì `check(x+1) = true` (hoặc ngược lại)

### Ví dụ kinh điển:

> Có N gói hàng, cần chuyển trong D ngày. Mỗi ngày chỉ chở được MAX kg. Tìm MAX nhỏ nhất!

```
check(MAX): Với sức chở MAX, chuyển được trong D ngày không?
- MAX tăng → số ngày giảm → đơn điệu!
- Binary search trên MAX từ max(weights) đến sum(weights)
```

---

## 3. Template

```cpp
int binarySearchOnAnswer(int lo, int hi) {
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (check(mid))
            hi = mid;       // mid thỏa mãn → thử nhỏ hơn
        else
            lo = mid + 1;   // mid không thỏa → cần lớn hơn
    }
    return lo;
}
```

```python
def binary_search_on_answer(lo, hi, check):
    while lo < hi:
        mid = lo + (hi - lo) // 2
        if check(mid):
            hi = mid       # mid thỏa mãn → thử nhỏ hơn
        else:
            lo = mid + 1   # mid không thỏa → cần lớn hơn
    return lo
```

---

## 4. Các bài toán kinh điển

### 4.1. Capacity To Ship Packages (Leetcode 1011)

```cpp
bool check(vector<int>& weights, int capacity, int days) {
    int cur = 0, daysUsed = 1;
    for (int w : weights) {
        if (cur + w <= capacity) cur += w;
        else { daysUsed++; cur = w; }
    }
    return daysUsed <= days;
}

int shipWithinDays(vector<int>& weights, int days) {
    int lo = *max_element(weights.begin(), weights.end());
    int hi = accumulate(weights.begin(), weights.end(), 0);
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (check(weights, mid, days)) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}
```

```python
def ship_within_days(weights, days):
    def check(capacity):
        cur, used = 0, 1
        for w in weights:
            if cur + w <= capacity:
                cur += w
            else:
                used += 1
                cur = w
        return used <= days

    lo, hi = max(weights), sum(weights)
    while lo < hi:
        mid = lo + (hi - lo) // 2
        if check(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo
```

### 4.2. Koko Eating Bananas (Leetcode 875)

```cpp
bool check(vector<int>& piles, int speed, int h) {
    long long hours = 0;
    for (int p : piles)
        hours += (p + speed - 1) / speed;  // Làm tròn lên
    return hours <= h;
}

int minEatingSpeed(vector<int>& piles, int h) {
    int lo = 1, hi = *max_element(piles.begin(), piles.end());
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (check(piles, mid, h)) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}
```

```python
import math

def min_eating_speed(piles, h):
    def check(speed):
        hours = sum(math.ceil(p / speed) for p in piles)
        return hours <= h

    lo, hi = 1, max(piles)
    while lo < hi:
        mid = lo + (hi - lo) // 2
        if check(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo
```

### 4.3. Aggressive Cows (SPOJ)

```cpp
bool check(vector<int>& stalls, int cows, int minDist) {
    int count = 1, last = stalls[0];
    for (int i = 1; i < stalls.size(); i++) {
        if (stalls[i] - last >= minDist) {
            count++;
            last = stalls[i];
        }
    }
    return count >= cows;
}

int maxMinDistance(vector<int>& stalls, int cows) {
    sort(stalls.begin(), stalls.end());
    int lo = 1, hi = stalls.back() - stalls[0];
    while (lo < hi) {
        int mid = lo + (hi - lo + 1) / 2;  // +1 để tránh lặp vô hạn
        if (check(stalls, cows, mid)) lo = mid;
        else hi = mid - 1;
    }
    return lo;
}
```

### Code Python

```python
def binary_search_on_answer(lo, hi, check):
    while lo < hi:
        mid = lo + (hi - lo) // 2
        if check(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo

# Ví dụ: Capacity To Ship Packages
def ship_within_days(weights, days):
    def check(capacity):
        cur, used = 0, 1
        for w in weights:
            if cur + w <= capacity:
                cur += w
            else:
                used += 1
                cur = w
        return used <= days
    lo = max(weights)
    hi = sum(weights)
    return binary_search_on_answer(lo, hi, check)
```

---

## 5. Lưu ý / Cạm bẫy hay gặp

### Bẫy 1: Lặp vô hạn khi lo + 1 = hi

```cpp
// SAI: Có thể lặp vô hạn khi tìm max mà check(mid) = true
while (lo < hi) {
    int mid = lo + (hi - lo) / 2;  // mid luôn = lo khi hi = lo + 1
    if (check(mid)) lo = mid;       // lo không đổi → lặp vô hạn!
    else hi = mid - 1;
}

// ĐÚNG: Dùng mid = lo + (hi - lo + 1) / 2 khi tìm max
while (lo < hi) {
    int mid = lo + (hi - lo + 1) / 2;  // Làm tròn lên
    if (check(mid)) lo = mid;
    else hi = mid - 1;
}
```

**Quy tắc:** Tìm min → `hi = mid`, Tìm max → `lo = mid` → cần `+1` để tránh lặp vô hạn.

### Bẫy 2: Chọn sai cận trên và cận dưới

```cpp
// SAI: Cận dưới quá nhỏ hoặc cận trên quá lớn → TLE hoặc sai
int lo = 0, hi = 1e18;  // Quá rộng → nhiều bước hơn

// ĐÚNG: Chọn cận chặt
// Cận dưới: giá trị nhỏ nhất có thể là kết quả
// Cận trên: giá trị lớn nhất có thể là kết quả

// Ví dụ: Capacity To Ship
int lo = *max_element(weights.begin(), weights.end());  // Gói nặng nhất
int hi = accumulate(weights.begin(), weights.end(), 0); // Tổng tất cả
```

### Bẫy 3: Integer vs Float

```cpp
// SAI: Dùng int khi kết quả có thể là số thực
int mid = lo + (hi - lo) / 2;  // Mất phần thập phân!

// ĐÚNG: Dùng double khi cần chính xác
double mid = lo + (hi - lo) / 2.0;

// Hoặc nhân lên để dùng int (tránh số thực)
// Ví dụ: Cần chính xác 1e-6 → nhân 1e6, dùng int, chia kết quả cuối
```

### Bẫy 4: Hàm check không đơn điệu

```cpp
// SAI: check không có tính đơn điệu → binary search không áp dụng được
bool check(int x) {
    return x * x - 5 * x + 6 <= 0;  // Parabol → không đơn điệu!
}

// ĐÚNG: Chỉ dùng binary search khi check có tính chất:
// Nếu check(x) = true thì mọi y > x cũng = true (hoặc ngược lại)
```

### Bẫy 5: Quên kiểm tra kết quả cuối cùng

```cpp
// SAI: Trả về lo mà không kiểm tra
return lo;  // Có thể lo không thỏa mãn nếu không có nghiệm!

// ĐÚNG: Kiểm tra sau khi binary search
if (check(lo)) return lo;
return -1;  // Không có nghiệm
```

### Các mẫu bài toán phổ biến

| Mẫu | Mô tả | Ví dụ |
|-----|-------|-------|
| Minimize the maximum | Tìm giá trị max nhỏ nhất | Capacity To Ship, Split Array |
| Maximize the minimum | Tìm giá trị min lớn nhất | Aggressive Cows, Magnetic Balls |
| Find threshold | Tìm giá trị ngưỡng | Koko Eating Bananas, Minimum Speed |
| Min days/time | Tìm thời gian ngắn nhất | Factory Machines, Minimum Time |
| Max distance | Tìm khoảng cách lớn nhất | Magnetic Balls, Minimum Limit |

### Template nhanh: Minimize Maximum

```cpp
int minimizeMaximum(int lo, int hi) {
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (check(mid)) hi = mid;    // mid thỏa mãn → thử nhỏ hơn
        else lo = mid + 1;           // mid không thỏa → cần lớn hơn
    }
    return lo;
}
```

### Template nhanh: Maximize Minimum

```cpp
int maximizeMinimum(int lo, int hi) {
    while (lo < hi) {
        int mid = lo + (hi - lo + 1) / 2;  // +1 tránh lặp vô hạn
        if (check(mid)) lo = mid;           // mid thỏa mãn → thử lớn hơn
        else hi = mid - 1;                  // mid không thỏa → cần nhỏ hơn
    }
    return lo;
}
```

---

## 6. Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [Leetcode 1011 - Capacity To Ship](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/) | LC | ⭐⭐ | Binary search on answer |
| [Leetcode 875 - Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/) | LC | ⭐⭐ | Binary search on answer |
| [SPOJ - Aggressive Cows](https://www.spoj.com/problems/AGGRCOW/) | SPOJ | ⭐⭐ | Khoảng cách min |
| [CSES - Factory Machines](https://cses.fi/problemset/task/1620) | CSES | ⭐⭐ | Thời gian min |
| [CSES - Array Division](https://cses.fi/problemset/task/1085) | CSES | ⭐⭐⭐ | Tổng max min |
| [CF 1486B - Eastern Exhibition](https://codeforces.com/problemset/problem/1486/B) | CF | ⭐⭐⭐ | Binary search + geometry |

## Bài viết liên quan

- [Bài 3: Tìm kiếm nhị phân](03-tim-kiem-nhi-phan.md)
- [Bài 4: Kĩ thuật hai con trỏ](04-ky-thuat-hai-con-tro.md)
- [Bài 12: Quy hoạch động](12-quy-hoach-dong.md)

## Tài liệu tham khảo

- [VNOI Wiki - Tìm kiếm nhị phân](https://wiki.vnoi.info/algo/basic/binary-search)
- [Topcoder - Binary Search](https://www.topcoder.com/thrive/articles/Binary%20Search)
- [USACO Guide - Binary Search on Answer](https://usaco.guide/silver/binary-search)
- [YouTube - Binary Search on Answer (takeuforward)](https://www.youtube.com/watch?v=MHf6awe89xw)
