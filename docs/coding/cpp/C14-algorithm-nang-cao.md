# C14: algorithm nâng cao

> **Tác giả:** FPTOJ Wiki<br>
> **Chủ đề:** lower_bound, upper_bound, nth_element, gcd, rotate, LIS

---

## Bạn sẽ học được gì?

Sau bài này, bạn có thể:

- Tìm kiếm nhị phân với `lower_bound`/`upper_bound`
- Tìm median với `nth_element`
- Tính GCD/LCM với `__gcd`
- Giải bài LIS (Dãy con tăng dài nhất)

---

## 1. lower_bound / upper_bound

```cpp
vector<int> a = {1, 3, 5, 5, 7, 9};

// lower_bound: phần tử đầu tiên >= x
auto lb = lower_bound(a.begin(), a.end(), 5);
cout << lb - a.begin() << endl;  // 2 (chỉ số)

// upper_bound: phần tử đầu tiên > x
auto ub = upper_bound(a.begin(), a.end(), 5);
cout << ub - a.begin() << endl;  // 4 (chỉ số)

// Đếm số phần tử = x
int cnt = ub - lb;  // 2

// Đếm số phần tử trong [l, r]
int l = 3, r = 7;
int cnt2 = upper_bound(a.begin(), a.end(), r) 
         - lower_bound(a.begin(), a.end(), l);
```

!!! warning "Mảng phải đã sắp xếp"
    `lower_bound`/`upper_bound` chỉ hoạt động trên mảng **đã sắp xếp tăng dần**.

---

## 2. nth_element — Tìm phần tử thứ k

```cpp
vector<int> a = {5, 2, 8, 1, 9, 3};

// Tìm phần tử nhỏ thứ 3 (chỉ số 2)
nth_element(a.begin(), a.begin() + 2, a.end());
cout << a[2] << endl;  // 3

// Tìm median
nth_element(a.begin(), a.begin() + a.size() / 2, a.end());
cout << a[a.size() / 2] << endl;  // median
```

---

## 3. GCD / LCM

```cpp
// __gcd hoạt động trên mọi trình biên dịch
cout << __gcd(12, 18) << endl;  // 6

// C++17: std::gcd, std::lcm
cout << gcd(12, 18) << endl;    // 6
cout << lcm(4, 6) << endl;      // 12

// GCD nhiều số
vector<int> a = {12, 18, 24};
int g = 0;
for (int x : a) g = __gcd(g, x);
```

---

## 4. rotate — Xoay mảng

```cpp
vector<int> a = {1, 2, 3, 4, 5};

// Xoay trái 2 vị trí
rotate(a.begin(), a.begin() + 2, a.end());
// a = {3, 4, 5, 1, 2}
```

---

## 5. LIS — Dãy con tăng dài nhất

```cpp
#include <bits/stdc++.h>
using namespace std;

int lis(const vector<int> &a) {
    vector<int> tail;
    
    for (int x : a) {
        auto it = lower_bound(tail.begin(), tail.end(), x);
        if (it == tail.end()) {
            tail.push_back(x);
        } else {
            *it = x;
        }
    }
    
    return tail.size();
}

int main() {
    vector<int> a = {10, 9, 2, 5, 3, 7, 101, 18};
    cout << lis(a) << endl;  // 4 (dãy: 2, 3, 7, 101)
    return 0;
}
```

---

## 6. Các hàm khác

```cpp
vector<int> a = {1, 2, 3, 4, 5};

// is_sorted — Kiểm tra đã sắp xếp
cout << is_sorted(a.begin(), a.end()) << endl;  // 1

// is_sorted_until — Tìm vị trí đầu tiên chưa sắp xếp
auto it = is_sorted_until(a.begin(), a.end());

// minmax — Tìm min và max cùng lúc
auto [mn, mx] = minmax({3, 1, 4, 1, 5, 9});
cout << mn << " " << mx << endl;  // 1 9

// clamp (C++17) — Giới hạn giá trị
int x = clamp(15, 0, 10);  // x = 10
```

---

## Bài viết liên quan

- [C13: queue, stack, deque →](C13-queue-stack-deque.md)
- [C15: Mẹo thi đấu C++ →](C15-meo-thi-dau-cpp.md)

---

**Bài tiếp theo:** [C15: Mẹo thi đấu C++ →](C15-meo-thi-dau-cpp.md)
