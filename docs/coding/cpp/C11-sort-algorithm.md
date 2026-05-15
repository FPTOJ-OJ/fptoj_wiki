# C11: sort & \<algorithm\>

> **Tác giả:** Hà Trí Kiên<br>
> **Chủ đề:** sort, stable_sort, reverse, unique, next_permutation

---

## 1. Tổng quan

`<algorithm>` là thư viện **cực kỳ quan trọng** trong thi đấu C++. Cung cấp nhiều thuật toán sẵn có.

```cpp
#include <algorithm>
```

---

## 2. sort — Sắp xếp

### 2.1. Cơ bản

```cpp
vector<int> v = {3, 1, 4, 1, 5, 9};

// Sắp xếp tăng dần
sort(v.begin(), v.end());  // {1, 1, 3, 4, 5, 9}

// Sắp xếp giảm dần
sort(v.begin(), v.end(), greater<int>());  // {9, 5, 4, 3, 1, 1}
```

### 2.2. Sắp xếp với comparator

```cpp
vector<int> v = {3, 1, 4, 1, 5, 9};

// Lambda expression
sort(v.begin(), v.end(), [](int a, int b) {
    return a > b;  // Giảm dần
});

// Sắp xếp theo chữ số cuối
sort(v.begin(), v.end(), [](int a, int b) {
    return a % 10 < b % 10;
});
```

### 2.3. Sắp xếp pair

```cpp
vector<pair<int, int>> v = {{3, 1}, {1, 3}, {2, 2}};

// Sắp xếp theo first, sau đó second
sort(v.begin(), v.end());
// {{1, 3}, {2, 2}, {3, 1}}
```

### 2.4. Sắp xếp struct

```cpp
struct Student {
    string name;
    int score;
};

vector<Student> students = {{"Alice", 90}, {"Bob", 85}, {"Charlie", 90}};

// Sắp xếp theo score giảm dần, nếu score bằng thì theo name
sort(students.begin(), students.end(), [](const Student& a, const Student& b) {
    if (a.score != b.score) return a.score > b.score;
    return a.name < b.name;
});
```

---

## 3. stable_sort — Sắp xếp ổn định

```cpp
vector<pair<int, int>> v = {{1, "a"}, {2, "b"}, {1, "c"}};

// sort: Không đảm bảo thứ tự của phần tử bằng nhau
sort(v.begin(), v.end());

// stable_sort: Giữ nguyên thứ tự của phần tử bằng nhau
stable_sort(v.begin(), v.end());
```

---

## 4. reverse — Đảo ngược

```cpp
vector<int> v = {1, 2, 3, 4, 5};

// Đảo ngược tại chỗ
reverse(v.begin(), v.end());  // {5, 4, 3, 2, 1}

// Đảo ngược một phần
reverse(v.begin() + 1, v.begin() + 4);  // {5, 2, 3, 4, 1}
```

---

## 5. unique — Xóa trùng liền kề

```cpp
vector<int> v = {1, 1, 2, 2, 3, 3, 4, 4};

// unique: Xóa trùng liền kề, trả về iterator đến phần tử mới cuối
auto it = unique(v.begin(), v.end());
// v = {1, 2, 3, 4, 3, 3, 4, 4} — Chưa xóa hoàn toàn!

// Phải erase phần thừa
v.erase(it, v.end());
// v = {1, 2, 3, 4}

// Kết hợp với sort để xóa TẤT CẢ trùng
sort(v.begin(), v.end());
v.erase(unique(v.begin(), v.end()), v.end());
```

!!! tip "Trong thi đấu"
    ```cpp
    // Xóa trùng trong vector
    sort(v.begin(), v.end());
    v.erase(unique(v.begin(), v.end()), v.end());
    ```

---

## 6. next_permutation — Sinh hoán vị kế tiếp

```cpp
vector<int> v = {1, 2, 3};

// Sinh tất cả hoán vị
do {
    for (int x : v) cout << x << " ";
    cout << endl;
} while (next_permutation(v.begin(), v.end()));
// 1 2 3
// 1 3 2
// 2 1 3
// 2 3 1
// 3 1 2
// 3 2 1
```

!!! warning "Phải sắp xếp trước"
    ```cpp
    vector<int> v = {3, 1, 2};
    
    // Nếu không sắp xếp trước, sẽ bỏ lỡ hoán vị
    do {
        for (int x : v) cout << x << " ";
        cout << endl;
    } while (next_permutation(v.begin(), v.end()));
    // Chỉ sinh từ {3, 1, 2} trở đi!
    
    // ĐÚNG: Sắp xếp trước
    sort(v.begin(), v.end());
    do {
        for (int x : v) cout << x << " ";
        cout << endl;
    } while (next_permutation(v.begin(), v.end()));
    ```

### prev_permutation

```cpp
vector<int> v = {3, 2, 1};

// Sinh hoán vị trước đó
do {
    for (int x : v) cout << x << " ";
    cout << endl;
} while (prev_permutation(v.begin(), v.end()));
```

---

## 7. Các hàm khác trong \<algorithm\>

### 7.1. min, max

```cpp
cout << min(3, 5) << endl;  // 3
cout << max(3, 5) << endl;  // 5

// Nhiều giá trị
cout << min({3, 1, 4, 1, 5}) << endl;  // 1
cout << max({3, 1, 4, 1, 5}) << endl;  // 5
```

### 7.2. min_element, max_element

```cpp
vector<int> v = {3, 1, 4, 1, 5, 9};

auto minIt = min_element(v.begin(), v.end());
auto maxIt = max_element(v.begin(), v.end());

cout << *minIt << endl;  // 1
cout << *maxIt << endl;  // 9
cout << minIt - v.begin() << endl;  // 1 (index)
```

### 7.3. count

```cpp
vector<int> v = {1, 2, 3, 2, 1};

int cnt = count(v.begin(), v.end(), 2);  // 2
```

### 7.4. find

```cpp
vector<int> v = {1, 2, 3, 4, 5};

auto it = find(v.begin(), v.end(), 3);
if (it != v.end()) {
    cout << "Tim thay tai vi tri " << it - v.begin() << endl;  // 2
}
```

### 7.5. fill

```cpp
vector<int> v(5);

fill(v.begin(), v.end(), 10);  // {10, 10, 10, 10, 10}
fill(v.begin(), v.begin() + 3, 0);  // {0, 0, 0, 10, 10}
```

### 7.6. accumulate

```cpp
#include <numeric>

vector<int> v = {1, 2, 3, 4, 5};

int sum = accumulate(v.begin(), v.end(), 0);  // 15
long long sum = accumulate(v.begin(), v.end(), 0LL);  // Tránh tràn
```

---

## 8. So sánh với Python

| Python | C++ | Ghi chú |
|--------|-----|---------|
| `arr.sort()` | `sort(v.begin(), v.end());` | |
| `sorted(arr)` | Không có trực tiếp | Phải copy trước |
| `arr.reverse()` | `reverse(v.begin(), v.end());` | |
| `arr.count(x)` | `count(v.begin(), v.end(), x)` | |
| `arr.index(x)` | `find(v.begin(), v.end(), x)` | |
| `arr.pop()` | `v.pop_back()` | |
| Không có | `next_permutation` | Phải tự cài trong Python |

---

## 9. Bài tập thực hành

### Bài 1: Sắp xếp theo tổng chữ số
Cho n số nguyên. Sắp xếp theo tổng chữ số tăng dần.

```cpp
// Code của bạn ở đây
```

??? tip "Lời giải"
    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    
    int digitSum(int n) {
        int s = 0;
        n = abs(n);
        while (n > 0) {
            s += n % 10;
            n /= 10;
        }
        return s;
    }
    
    int main() {
        int n;
        cin >> n;
        vector<int> arr(n);
        for (int i = 0; i < n; i++) cin >> arr[i];
        
        sort(arr.begin(), arr.end(), [](int a, int b) {
            int sa = digitSum(a), sb = digitSum(b);
            if (sa != sb) return sa < sb;
            return a < b;
        });
        
        for (int x : arr) cout << x << " ";
        cout << endl;
        return 0;
    }
    ```

---

## 10. Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Apartments](https://cses.fi/problemset/task/1084) | CSES | ⭐⭐ | sort |
| [CSES - Ferris Wheel](https://cses.fi/problemset/task/1090) | CSES | ⭐⭐ | sort, two pointers |

---

## Bài viết liên quan

- [← C10: Vector nâng cao](C10-vector-nang-cao.md)
- [C12: set & map →](C12-set-map.md)

---

**Bài trước:** [C10: Vector nâng cao](C10-vector-nang-cao.md)<br>
**Bài tiếp theo:** [C12: set & map →](C12-set-map.md)
