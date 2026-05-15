# C09: pair & tuple

> **Tác giả:** Hà Trí Kiên<br>
> **Chủ đề:** pair, tuple, make_pair, structured bindings

---

## 1. Tổng quan

`pair` và `tuple` dùng để nhóm nhiều giá trị thành 1 đơn vị.

```cpp
pair<int, int> p = {1, 2};
tuple<int, string, double> t = {1, "Alice", 3.14};
```

---

## 2. pair

### 2.1. Khai báo

```cpp
#include <utility>

// Cách 1
pair<int, int> p = {1, 2};

// Cách 2: make_pair
pair<int, int> p = make_pair(1, 2);

// Cách 3: Kiểu khác nhau
pair<string, int> p = {"Alice", 90};
```

### 2.2. Truy cập

```cpp
pair<int, int> p = {1, 2};

cout << p.first << endl;   // 1
cout << p.second << endl;  // 2
```

### 2.3. Sửa giá trị

```cpp
pair<int, int> p = {1, 2};
p.first = 10;
p.second = 20;
```

### 2.4. So sánh

```cpp
pair<int, int> a = {1, 2};
pair<int, int> b = {1, 3};
pair<int, int> c = {2, 1};

// So sánh theo first trước, sau đó second
cout << (a < b) << endl;  // 1 (true) — a.second < b.second
cout << (a < c) << endl;  // 1 (true) — a.first < c.first
```

### 2.5.Ứng dụng

```cpp
// Lưu tọa độ
pair<int, int> point = {x, y};

// Lưu (giá trị, index)
pair<int, int> p = {arr[i], i};

// Sắp xếp theo nhiều tiêu chí
vector<pair<int, int>> arr = {{3, 1}, {1, 3}, {2, 2}};
sort(arr.begin(), arr.end());
// Kết quả: {{1, 3}, {2, 2}, {3, 1}}
```

---

## 3. tuple

### 3.1. Khai báo

```cpp
#include <tuple>

// Cách 1
tuple<int, string, double> t = {1, "Alice", 3.14};

// Cách 2: make_tuple
tuple<int, string, double> t = make_tuple(1, "Alice", 3.14);
```

### 3.2. Truy cập

```cpp
tuple<int, string, double> t = {1, "Alice", 3.14};

// Cách 1: get<i>
cout << get<0>(t) << endl;  // 1
cout << get<1>(t) << endl;  // "Alice"
cout << get<2>(t) << endl;  // 3.14

// Cách 2: tie
int id;
string name;
double score;
tie(id, name, score) = t;
```

### 3.3. Structured Bindings (C++17)

```cpp
// C++17: Rất tiện lợi!
auto [id, name, score] = t;
cout << id << " " << name << " " << score << endl;
```

### 3.4. So sánh

```cpp
tuple<int, int, int> a = {1, 2, 3};
tuple<int, int, int> b = {1, 2, 4};

// So sánh theo thứ tự: first → second → third
cout << (a < b) << endl;  // 1 (true)
```

---

## 4. So sánh pair và tuple

| | pair | tuple |
|---|------|-------|
| Số phần tử | 2 | Bất kỳ |
| Truy cập | `.first`, `.second` | `get<i>()` |
| Cú pháp | Đơn giản | Phức tạp hơn |
|Ứng dụng | Cặp giá trị | Nhóm nhiều giá trị |

!!! tip "Trong thi đấu"
    - Dùng `pair` khi chỉ cần 2 giá trị
    - Dùng `tuple` khi cần 3+ giá trị
    - Dùng `struct` khi cần đặt tên rõ ràng

---

## 5. So sánh với Python

| Python | C++ | Ghi chú |
|--------|-----|---------|
| `(1, 2)` | `pair<int, int>{1, 2}` | |
| `t[0]` | `get<0>(t)` hoặc `.first` | |
| `a, b = t` | `auto [a, b] = t;` (C++17) | |
| `t = (1, "Alice", 3.14)` | `tuple<int, string, double> t = {1, "Alice", 3.14}` | |

---

## 6. Pattern thường gặp trong thi đấu

### 6.1. Lưu (giá trị, index)

```cpp
vector<pair<int, int>> arr;
for (int i = 0; i < n; i++) {
    arr.push_back({arr[i], i});
}
sort(arr.begin(), arr.end());
```

### 6.2. Sắp xếp theo nhiều tiêu chí

```cpp
vector<pair<int, int>> arr = {{3, 1}, {1, 3}, {2, 2}};

// Sắp xếp theo first tăng dần
sort(arr.begin(), arr.end());

// Sắp xếp theo first giảm dần
sort(arr.begin(), arr.end(), greater<pair<int, int>>());

// Sắp xếp theo second
sort(arr.begin(), arr.end(), [](const pair<int, int>& a, const pair<int, int>& b) {
    return a.second < b.second;
});
```

### 6.3. Trả về nhiều giá trị từ hàm

```cpp
pair<int, int> minMax(const vector<int>& arr) {
    return {*min_element(arr.begin(), arr.end()),
            *max_element(arr.begin(), arr.end())};
}

int main() {
    auto [minVal, maxVal] = minMax({3, 1, 4, 1, 5, 9});
    cout << minVal << " " << maxVal;  // 1 9
    return 0;
}
```

### 6.4. Priority Queue với pair

```cpp
// Max-heap theo first, nếu first bằng thì theo second
priority_queue<pair<int, int>> pq;
pq.push({1, 2});
pq.push({1, 3});
pq.push({2, 1});

// Top: {2, 1}
```

---

## 7. Lưu ý / Cạm bẫy hay gặp

### Bẫy 1: So sánh pair

```cpp
pair<int, int> a = {1, 2};
pair<int, int> b = {1, 3};

// So sánh theo first trước
// Nếu first bằng nhau → so sánh second
// a < b vì a.second < b.second
```

### Bẫy 2: get với index sai

```cpp
tuple<int, string> t = {1, "Alice"};
// get<2>(t);  // Lỗi compile! Chỉ có index 0, 1
```

### Bẫy 3: tie với số lượng biến không khớp

```cpp
tuple<int, int, int> t = {1, 2, 3};
// int a, b;
// tie(a, b) = t;  // Lỗi! Thiếu 1 biến
```

---

## 8. Bài tập thực hành

### Bài 1: Sắp xếp theo 2 tiêu chí
Cho n cặp (a, b). Sắp xếp theo a tăng dần, nếu a bằng thì theo b giảm dần.

```cpp
// Code của bạn ở đây
```

??? tip "Lời giải"
    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    
    int main() {
        int n;
        cin >> n;
        vector<pair<int, int>> arr(n);
        for (int i = 0; i < n; i++) {
            cin >> arr[i].first >> arr[i].second;
        }
        
        sort(arr.begin(), arr.end(), [](const pair<int, int>& a, const pair<int, int>& b) {
            if (a.first != b.first) return a.first < b.first;
            return a.second > b.second;
        });
        
        for (auto& p : arr) {
            cout << p.first << " " << p.second << "\n";
        }
        return 0;
    }
    ```

---

## 9. Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Apartments](https://cses.fi/problemset/task/1084) | CSES | ⭐⭐ | pair, sort |

---

## Bài viết liên quan

- [← C08: Reference & Pointer](C08-reference-pointer.md)
- [C10: Vector nâng cao →](C10-vector-nang-cao.md)

---

**Bài trước:** [C08: Reference & Pointer](C08-reference-pointer.md)<br>
**Bài tiếp theo:** [C10: Vector nâng cao →](C10-vector-nang-cao.md)
