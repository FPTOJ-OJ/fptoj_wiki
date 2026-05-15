# C10: Vector nâng cao

> **Tác giả:** Hà Trí Kiên<br>
> **Chủ đề:** Vector iterator, resize, reserve, 2D vector

---

## 1. Tổng quan

Bài này học các kỹ thuật **nâng cao** với vector trong C++.

---

## 2. Iterator

### 2.1. Khai báo iterator

```cpp
vector<int> v = {1, 2, 3, 4, 5};

// Iterator
vector<int>::iterator it = v.begin();

// Auto (tiện hơn)
auto it = v.begin();
```

### 2.2. Dùng iterator

```cpp
vector<int> v = {1, 2, 3, 4, 5};

// Duyệt bằng iterator
for (auto it = v.begin(); it != v.end(); it++) {
    cout << *it << " ";  // Dereference để lấy giá trị
}

// Duyệt ngược
for (auto it = v.rbegin(); it != v.rend(); it++) {
    cout << *it << " ";
}
```

### 2.3. Các hàm với iterator

```cpp
vector<int> v = {1, 2, 3, 4, 5};

auto it = v.begin();

// Di chuyển
advance(it, 2);  // it trỏ đến phần tử thứ 2 (index 2)
next(it);        // Iterator tiếp theo
prev(it);        // Iterator trước đó

// Khoảng cách
int d = distance(v.begin(), it);  // Khoảng cách từ begin đến it
```

---

## 3. Resize và Reserve

### 3.1. resize — Thay đổi kích thước

```cpp
vector<int> v;

v.resize(5);       // {0, 0, 0, 0, 0} — 5 phần tử, giá trị 0
v.resize(3);       // {0, 0, 0} — Cắt bớt
v.resize(7, 10);   // {0, 0, 0, 10, 10, 10, 10} — Thêm phần tử = 10
```

### 3.2. reserve — Dự trữ bộ nhớ

```cpp
vector<int> v;

v.reserve(1000);  // Dự trữ bộ nhớ cho 1000 phần tử
                   // Nhưng size() vẫn = 0

// Khi push_back, không phải cấp phát lại bộ nhớ → nhanh hơn
for (int i = 0; i < 1000; i++) {
    v.push_back(i);
}
```

!!! tip "Khi nào dùng reserve?"
    - Biết trước số phần tử sẽ thêm
    - Tránh cấp phát lại bộ nhớ nhiều lần
    - Tăng tốc độ khi thêm nhiều phần tử

### 3.3. shrink_to_fit — Giải phóng bộ nhớ thừa

```cpp
vector<int> v;
v.reserve(1000);
v.push_back(1);
v.push_back(2);
v.push_back(3);

// v.capacity() = 1000, nhưng chỉ dùng 3 phần tử
v.shrink_to_fit();  // v.capacity() = 3
```

---

## 4. 2D Vector

### 4.1. Khai báo

```cpp
// n hàng, m cột, giá trị 0
vector<vector<int>> matrix(n, vector<int>(m));

// n hàng, m cột, giá trị 5
vector<vector<int>> matrix(n, vector<int>(m, 5));

// Khởi tạo sẵn
vector<vector<int>> matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};
```

### 4.2. Truy cập

```cpp
vector<vector<int>> matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

cout << matrix[1][2] << endl;  // 6
cout << matrix.size() << endl;  // 3 — Số hàng
cout << matrix[0].size() << endl; // 3 — Số cột
```

### 4.3. Duyệt

```cpp
vector<vector<int>> matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

// Cách 1: Index
for (int i = 0; i < matrix.size(); i++) {
    for (int j = 0; j < matrix[i].size(); j++) {
        cout << matrix[i][j] << " ";
    }
    cout << endl;
}

// Cách 2: Range-based for
for (const auto& row : matrix) {
    for (int x : row) {
        cout << x << " ";
    }
    cout << endl;
}
```

### 4.4. Thêm hàng

```cpp
vector<vector<int>> matrix;

// Thêm hàng mới
matrix.push_back({1, 2, 3});
matrix.push_back({4, 5, 6});

// Thêm phần tử vào hàng cuối
matrix.back().push_back(7);
// matrix = {{1, 2, 3, 7}, {4, 5, 6}}
```

---

## 5. Các phương thức nâng cao

### 5.1. assign — Gán lại giá trị

```cpp
vector<int> v;

v.assign(5, 10);  // {10, 10, 10, 10, 10}
v.assign({1, 2, 3, 4, 5});  // {1, 2, 3, 4, 5}
```

### 5.2. insert — Chèn phần tử

```cpp
vector<int> v = {1, 2, 3, 4, 5};

v.insert(v.begin() + 2, 10);  // {1, 2, 10, 3, 4, 5}
v.insert(v.begin(), 3, 0);    // {0, 0, 0, 1, 2, 10, 3, 4, 5}
```

### 5.3. erase — Xóa phần tử

```cpp
vector<int> v = {1, 2, 3, 4, 5};

v.erase(v.begin() + 2);      // {1, 2, 4, 5} — Xóa tại vị trí 2
v.erase(v.begin(), v.begin() + 2);  // {4, 5} — Xóa từ vị trí 0 đến 1
```

### 5.4. swap — Hoán đổi 2 vector

```cpp
vector<int> a = {1, 2, 3};
vector<int> b = {4, 5, 6};

a.swap(b);  // a = {4, 5, 6}, b = {1, 2, 3}
```

---

## 6. So sánh với Python

| Python | C++ | Ghi chú |
|--------|-----|---------|
| `arr = []` | `vector<int> v;` | |
| `arr.append(x)` | `v.push_back(x);` | |
| `arr.pop()` | `v.pop_back();` | |
| `len(arr)` | `v.size()` | |
| `arr[i]` | `v[i]` | Giống nhau |
| `arr.insert(i, x)` | `v.insert(v.begin() + i, x);` | |
| `del arr[i]` | `v.erase(v.begin() + i);` | |
| `arr.clear()` | `v.clear()` | |
| `arr.reverse()` | `reverse(v.begin(), v.end());` | |
| `arr.sort()` | `sort(v.begin(), v.end());` | |

---

## 7. Pattern thường gặp trong thi đấu

### 7.1. Đọc matrix

```cpp
int n, m;
cin >> n >> m;
vector<vector<int>> matrix(n, vector<int>(m));
for (int i = 0; i < n; i++) {
    for (int j = 0; j < m; j++) {
        cin >> matrix[i][j];
    }
}
```

### 7.2. Vector adjacency list

```cpp
int n, m;
cin >> n >> m;
vector<vector<int>> graph(n);
for (int i = 0; i < m; i++) {
    int u, v;
    cin >> u >> v;
    graph[u].push_back(v);
    graph[v].push_back(u);  // Đồ thị vô hướng
}
```

### 7.3. Reserve trước khi thêm

```cpp
int n;
cin >> n;
vector<int> arr;
arr.reserve(n);  // Dự trữ bộ nhớ
for (int i = 0; i < n; i++) {
    int x;
    cin >> x;
    arr.push_back(x);
}
```

---

## 8. Lưu ý / Cạm bẫy hay gặp

### Bẫy 1: resize vs reserve

```cpp
vector<int> v;

v.resize(5);     // v.size() = 5, v.capacity() >= 5
v.reserve(5);    // v.size() = 0, v.capacity() >= 5
```

### Bẫy 2: Iterator invalidated

```cpp
vector<int> v = {1, 2, 3, 4, 5};
auto it = v.begin();

v.push_back(6);  // Iterator có thể bị invalidated!
// cout << *it;  // Undefined behavior!
```

### Bẫy 3: Truy cập ngoài phạm vi

```cpp
vector<int> v = {1, 2, 3};
// cout << v[10];  // Undefined behavior!
// cout << v.at(10);  // Throws exception!
```

---

## 9. Bài tập thực hành

### Bài 1: Đọc matrix và in transpose
Đọc matrix n × m. In ra matrix chuyển vị.

```cpp
// Code của bạn ở đây
```

??? tip "Lời giải"
    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    
    int main() {
        int n, m;
        cin >> n >> m;
        vector<vector<int>> matrix(n, vector<int>(m));
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                cin >> matrix[i][j];
            }
        }
        
        // Transpose
        vector<vector<int>> transposed(m, vector<int>(n));
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                transposed[j][i] = matrix[i][j];
            }
        }
        
        for (const auto& row : transposed) {
            for (int x : row) {
                cout << x << " ";
            }
            cout << endl;
        }
        return 0;
    }
    ```

---

## 10. Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Labyrinth](https://cses.fi/problemset/task/1193) | CSES | ⭐⭐ | 2D vector, BFS |

---

## Bài viết liên quan

- [← C09: pair & tuple](C09-pair-tuple.md)
- [C11: sort & algorithm →](C11-sort-algorithm.md)

---

**Bài trước:** [C09: pair & tuple](C09-pair-tuple.md)<br>
**Bài tiếp theo:** [C11: sort & algorithm →](C11-sort-algorithm.md)
