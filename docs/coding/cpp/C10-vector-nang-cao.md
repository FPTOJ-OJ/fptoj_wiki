# C10: Vector nâng cao — Iterator, Resize, 2D Vector

> **Bạn sẽ học được:** Iterator, resize/reserve, 2D vector, erase/insert<br>
> **Yêu cầu:** Đã học C04 (Mảng & Vector)<br>
> **Thời gian:** 45 phút

---

## Iterator — Con trỏ vào vector

### Analogies: Iterator = Ngón tay chỉ vào sách

```mermaid
flowchart LR
    A["begin()"] -->|"Ngón tay đầu"| B["end()"]
    B -->|"Ngón tay cuối + 1"| C["Kết thúc"]
```

### Sử dụng Iterator

```cpp
vector<int> a = {10, 20, 30, 40, 50};

// Iterator trỏ vào phần tử đầu
auto it = a.begin();
cout << *it << endl;  // 10

// Di chuyển iterator
it++;
cout << *it << endl;  // 20

it += 2;
cout << *it << endl;  // 40

// Iterator trỏ vào phần tử cuối + 1
auto itEnd = a.end();
```

### Duyệt vector bằng iterator

```cpp
vector<int> a = {10, 20, 30, 40, 50};

// Cách 1: Dùng iterator
for (auto it = a.begin(); it != a.end(); it++) {
    cout << *it << " ";
}

// Cách 2: Dùng range-based for (khuyến nghị)
for (int x : a) {
    cout << x << " ";
}
```

---

## Resize & Reserve

### Resize — Thay đổi kích thước

```cpp
vector<int> a;

// Resize thành 5 phần tử (khởi tạo 0)
a.resize(5);
// a = {0, 0, 0, 0, 0}

// Resize thành 3 phần tử (cắt bớt)
a.resize(3);
// a = {0, 0, 0}

// Resize thành 7 phần tử, thêm giá trị 9
a.resize(7, 9);
// a = {0, 0, 0, 9, 9, 9, 9}
```

### Reserve — Dự phòng bộ nhớ

```cpp
vector<int> a;

// Dự phòng bộ nhớ cho 1000 phần tử
a.reserve(1000);

// Thêm 1000 phần tử (không phải cấp phát lại bộ nhớ)
for (int i = 0; i < 1000; i++) {
    a.push_back(i);
}
```

!!! tip "Khi nào dùng reserve?"
    - Khi biết **chắc chắn** số phần tử sẽ thêm
    - Tránh cấp phát lại bộ nhớ nhiều lần
    - Tăng tốc độ thêm phần tử

---

## 2D Vector — Ma trận động

### Khai báo 2D vector

```cpp
// Ma trận 3x4, khởi tạo 0
vector<vector<int>> a(3, vector<int>(4, 0));

// Ma trận 3x4, chưa khởi tạo
vector<vector<int>> b(3, vector<int>(4));
```

### Truy cập và sửa

```cpp
vector<vector<int>> a(3, vector<int>(4, 0));

// Truy cập
cout << a[0][0] << endl;  // 0
cout << a[1][2] << endl;  // 0

// Sửa
a[0][0] = 10;
a[1][2] = 20;
```

### Duyệt 2D vector

```cpp
vector<vector<int>> a = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

// Duyệt theo chỉ số
for (int i = 0; i < a.size(); i++) {
    for (int j = 0; j < a[i].size(); j++) {
        cout << a[i][j] << " ";
    }
    cout << endl;
}

// Duyệt bằng range-based for
for (auto &row : a) {
    for (int x : row) {
        cout << x << " ";
    }
    cout << endl;
}
```

### Vector không đều (Jagged Array)

```cpp
// Mỗi hàng có số cột khác nhau
vector<vector<int>> a;
a.push_back({1, 2, 3});
a.push_back({4, 5});
a.push_back({6, 7, 8, 9});

for (auto &row : a) {
    for (int x : row) cout << x << " ";
    cout << endl;
}
```

---

## Erase & Insert

### Xóa phần tử

```cpp
vector<int> a = {1, 2, 3, 4, 5};

// Xóa phần tử tại vị trí 2 (index 2)
a.erase(a.begin() + 2);
// a = {1, 2, 4, 5}

// Xóa từ vị trí 1 đến 3
a.erase(a.begin() + 1, a.begin() + 3);
// a = {1, 5}
```

### Chèn phần tử

```cpp
vector<int> a = {1, 2, 3, 4, 5};

// Chèn giá trị 10 vào vị trí 2
a.insert(a.begin() + 2, 10);
// a = {1, 2, 10, 3, 4, 5}

// Chèn 3 giá trị 7 vào vị trí 0
a.insert(a.begin(), 3, 7);
// a = {7, 7, 7, 1, 2, 10, 3, 4, 5}
```

---

## Common Mistakes — Lỗi thường gặp

### Lỗi 1: Iterator invalidated

```cpp
vector<int> a = {1, 2, 3, 4, 5};

// ❌ SAI: Iterator invalidated sau khi erase
for (auto it = a.begin(); it != a.end(); it++) {
    if (*it % 2 == 0) a.erase(it);  // Lỗi!
}

// ✅ ĐÚNG
for (auto it = a.begin(); it != a.end(); ) {
    if (*it % 2 == 0) it = a.erase(it);
    else it++;
}
```

### Lỗi 2: Truy cập ngoài 2D vector

```cpp
vector<vector<int>> a(3, vector<int>(4, 0));

// ❌ SAI: Truy cập a[3][4]
cout << a[3][4] << endl;  // Lỗi!

// ✅ ĐÚNG: Chỉ truy cập a[0..2][0..3]
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 4; j++) {
        cout << a[i][j] << " ";
    }
}
```

---

## Bài tập thực hành

### Bài 1: Chuyển vị ma trận
Đọc ma trận m×n. In ra ma trận chuyển vị.

**Input:**
```
2 3
1 2 3
4 5 6
```
**Output:**
```
1 4
2 5
3 6
```

<div class="cp-pg" data-language="cpp" data-starter="#include &lt;bits/stdc++.h&gt;\nusing namespace std;\n\nint main() {\n    // Viết code ở đây\n    return 0;\n}" data-input="2 3
1 2 3
4 5 6" data-expected="1 4
2 5
3 6" data-hint="Đổi thứ tự duyệt: vòng ngoài là cột, vòng trong là hàng"></div>

??? tip "Lời giải"
    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    
    int main() {
        int m, n;
        cin >> m >> n;
        vector<vector<int>> a(m, vector<int>(n));
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                cin >> a[i][j];
            }
        }
        
        // In ma trận chuyển vị
        for (int j = 0; j < n; j++) {
            for (int i = 0; i < m; i++) {
                cout << a[i][j] << " ";
            }
            cout << endl;
        }
        return 0;
    }
    ```

---

## Tóm tắt bài học

| Nội dung | Chi tiết |
|----------|----------|
| **Iterator** | `auto it = a.begin();` — con trỏ vào vector |
| **Resize** | `a.resize(n)` — thay đổi kích thước |
| **Reserve** | `a.reserve(n)` — dự phòng bộ nhớ |
| **2D Vector** | `vector<vector<int>> a(m, vector<int>(n))` |
| **Erase** | `a.erase(a.begin() + i)` — xóa phần tử |
| **Insert** | `a.insert(a.begin() + i, x)` — chèn phần tử |

---

## Bài viết liên quan

- [C04: Mảng & Vector ←](C04-mang-vector.md)
- [C12: Set & Map →](C12-set-map.md)

---

**Bài tiếp theo:** [C12: Set & Map →](C12-set-map.md)
