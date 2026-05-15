# C14: \<algorithm\> nâng cao

> **Tác giả:** Hà Trí Kiên<br>
> **Chủ đề:** lower_bound, upper_bound, binary_search, nth_element, __gcd

---

## 1. Tổng quan

Các hàm nâng cao trong `<algorithm>` rất quan trọng cho thi đấu.

---

## 2. lower_bound & upper_bound

### 2.1. lower_bound — Tìm phần tử đầu tiên >= x

```cpp
vector<int> v = {1, 2, 3, 3, 3, 4, 5};

auto it = lower_bound(v.begin(), v.end(), 3);
cout << *it << endl;           // 3
cout << it - v.begin() << endl; // 2 (index)
```

### 2.2. upper_bound — Tìm phần tử đầu tiên > x

```cpp
vector<int> v = {1, 2, 3, 3, 3, 4, 5};

auto it = upper_bound(v.begin(), v.end(), 3);
cout << *it << endl;           // 4
cout << it - v.begin() << endl; // 5 (index)
```

### 2.3. Đếm số phần tử trong khoảng [l, r]

```cpp
vector<int> v = {1, 2, 3, 3, 3, 4, 5};
int l = 3, r = 4;

int count = upper_bound(v.begin(), v.end(), r) - lower_bound(v.begin(), v.end(), l);
cout << count << endl;  // 4 (3, 3, 3, 4)
```

### 2.4. Trong set/map

```cpp
set<int> s = {1, 3, 5, 7, 9};

auto it = s.lower_bound(4);  // Trỏ đến 5
auto it = s.upper_bound(5);  // Trỏ đến 7
```

!!! warning "Phải sắp xếp trước"
    lower_bound/upper_bound chỉ hoạt động đúng trên **mảng đã sắp xếp**.

---

## 3. binary_search — Kiểm tra tồn tại

```cpp
vector<int> v = {1, 2, 3, 4, 5};

if (binary_search(v.begin(), v.end(), 3)) {
    cout << "Tim thay" << endl;
} else {
    cout << "Khong tim thay" << endl;
}
```

!!! warning "Phải sắp xếp trước"
    binary_search chỉ hoạt động đúng trên **mảng đã sắp xếp**.

---

## 4. nth_element — Phần tử thứ n

```cpp
vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6};

// Sắp xếp sao cho phần tử thứ n đúng vị trí
nth_element(v.begin(), v.begin() + 3, v.end());
// v[3] là phần tử nhỏ thứ 4
// Các phần tử bên trái < v[3], bên phải > v[3]
```

### Ứng dụng: Tìm median

```cpp
vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6};
int n = v.size();

nth_element(v.begin(), v.begin() + n / 2, v.end());
int median = v[n / 2];
```

---

## 5. __gcd — Ước chung lớn nhất

```cpp
#include <algorithm>

cout << __gcd(12, 8) << endl;  // 4
cout << __gcd(0, 5) << endl;   // 5
```

!!! tip "__gcd vs gcd"
    - `__gcd` là extension của GCC, không phải chuẩn C++
    - Từ C++17, dùng `std::gcd` trong `<numeric>`

```cpp
#include <numeric>

cout << gcd(12, 8) << endl;  // 4
cout << lcm(4, 6) << endl;   // 12 (C++17)
```

---

## 6. Các hàm khác

### 6.1. minmax_element

```cpp
vector<int> v = {3, 1, 4, 1, 5, 9};

auto [minIt, maxIt] = minmax_element(v.begin(), v.end());
cout << *minIt << " " << *maxIt << endl;  // 1 9
```

### 6.2. is_sorted

```cpp
vector<int> v1 = {1, 2, 3, 4, 5};
vector<int> v2 = {1, 3, 2, 4, 5};

cout << is_sorted(v1.begin(), v1.end()) << endl;  // 1 (true)
cout << is_sorted(v2.begin(), v2.end()) << endl;  // 0 (false)
```

### 6.3. rotate

```cpp
vector<int> v = {1, 2, 3, 4, 5};

// Xoay trái 2 vị trí
rotate(v.begin(), v.begin() + 2, v.end());
// v = {3, 4, 5, 1, 2}
```

### 6.4. shuffle

```cpp
#include <random>

vector<int> v = {1, 2, 3, 4, 5};

random_device rd;
mt19937 g(rd());
shuffle(v.begin(), v.end(), g);
```

---

## 7. So sánh với Python

| Python | C++ | Ghi chú |
|--------|-----|---------|
| `bisect_left(arr, x)` | `lower_bound(v.begin(), v.end(), x)` | |
| `bisect_right(arr, x)` | `upper_bound(v.begin(), v.end(), x)` | |
| `x in arr` | `binary_search(v.begin(), v.end(), x)` | |
| `math.gcd(a, b)` | `__gcd(a, b)` hoặc `gcd(a, b)` | |
| `sorted(arr)` | `sort(v.begin(), v.end())` | C++ sắp xếp tại chỗ |
| `arr[::-1]` | `reverse(v.begin(), v.end())` | |

---

## 8. Pattern thường gặp trong thi đấu

### 8.1. Tìm kiếm nhị phân

```cpp
vector<int> v = {1, 2, 3, 4, 5};
int target = 3;

auto it = lower_bound(v.begin(), v.end(), target);
if (it != v.end() && *it == target) {
    cout << "Tim thay tai vi tri " << it - v.begin() << endl;
}
```

### 8.2. Đếm phần tử trong khoảng

```cpp
vector<int> v = {1, 2, 3, 3, 3, 4, 5};
int l = 3, r = 4;

int count = upper_bound(v.begin(), v.end(), r) - lower_bound(v.begin(), v.end(), l);
```

### 8.3. LIS (Longest Increasing Subsequence)

```cpp
vector<int> arr = {10, 9, 2, 5, 3, 7, 101, 18};
vector<int> tails;

for (int x : arr) {
    auto it = lower_bound(tails.begin(), tails.end(), x);
    if (it == tails.end()) {
        tails.push_back(x);
    } else {
        *it = x;
    }
}

cout << tails.size() << endl;  // 4
```

---

## 9. Lưu ý / Cạm bẫy hay gặp

### Bẫy 1: Phải sắp xếp trước

```cpp
vector<int> v = {3, 1, 4, 1, 5};
// lower_bound sẽ không đúng!
// Phải sort trước
sort(v.begin(), v.end());
```

### Bẫy 2: lower_bound trả về iterator

```cpp
vector<int> v = {1, 2, 3, 4, 5};
auto it = lower_bound(v.begin(), v.end(), 3);

// it là iterator, không phải index!
int index = it - v.begin();  // Chuyển sang index
```

### Bẫy 3: Kiểm tra iterator hợp lệ

```cpp
vector<int> v = {1, 2, 3, 4, 5};
auto it = lower_bound(v.begin(), v.end(), 10);

if (it != v.end()) {
    cout << *it << endl;  // Không chạy vì it = v.end()
}
```

---

## 10. Bài tập thực hành

### Bài 1: Tìm kiếm nhị phân
Cho mảng đã sắp xếp và target. Kiểm tra target có trong mảng không.

```cpp
// Code của bạn ở đây
```

??? tip "Lời giải"
    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    
    int main() {
        int n, target;
        cin >> n >> target;
        vector<int> v(n);
        for (int i = 0; i < n; i++) cin >> v[i];
        
        if (binary_search(v.begin(), v.end(), target)) {
            cout << "Tim thay" << endl;
        } else {
            cout << "Khong tim thay" << endl;
        }
        return 0;
    }
    ```

---

## 11. Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Concert Tickets](https://cses.fi/problemset/task/1091) | CSES | ⭐⭐ | lower_bound |

---

## Bài viết liên quan

- [← C13: queue, stack, deque](C13-queue-stack-deque.md)
- [C15: Mẹo thi đấu C++ →](C15-meo-thi-dau-cpp.md)

---

**Bài trước:** [C13: queue, stack, deque](C13-queue-stack-deque.md)<br>
**Bài tiếp theo:** [C15: Mẹo thi đấu C++ →](C15-meo-thi-dau-cpp.md)
