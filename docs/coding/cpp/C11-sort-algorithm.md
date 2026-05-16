# C11: sort & algorithm

> **Tác giả:** FPTOJ Wiki<br>
> **Chủ đề:** sort, reverse, unique, next_permutation, min/max, find, fill

---

## Bạn sẽ học được gì?

Sau bài này, bạn có thể:

- Sắp xếp mảng với `sort` và comparator tùy chỉnh
- Sử dụng các hàm algorithm thường dùng
- Duyệt hoán vị với `next_permutation`

---

## 1. sort — Sắp xếp

### Sắp xếp tăng/giảm dần

```cpp
vector<int> a = {5, 2, 8, 1, 9, 3};

sort(a.begin(), a.end());              // Tăng: {1, 2, 3, 5, 8, 9}
sort(a.begin(), a.end(), greater<>()); // Giảm: {9, 8, 5, 3, 2, 1}
```

### Sắp xếp mảng tĩnh

```cpp
int a[6] = {5, 2, 8, 1, 9, 3};
sort(a, a + 6);
```

### Custom Comparator

```cpp
// Sắp xếp pair theo second giảm dần
vector<pair<int,int>> v = {{1, 3}, {2, 1}, {3, 2}};
sort(v.begin(), v.end(), [](const auto &x, const auto &y) {
    return x.second > y.second;
});
// v = {{2, 1}, {3, 2}, {1, 3}}
```

### Sắp xếp struct

```cpp
struct Student {
    string name;
    int score;
};

vector<Student> students = {{"Nam", 9}, {"An", 7}, {"Binh", 9}};

// Sắp xếp theo điểm giảm dần, nếu bằng thì theo tên tăng dần
sort(students.begin(), students.end(), [](const Student &a, const Student &b) {
    if (a.score != b.score) return a.score > b.score;
    return a.name < b.name;
});
```

---

## 2. reverse — Đảo ngược

```cpp
vector<int> a = {1, 2, 3, 4, 5};
reverse(a.begin(), a.end());
// a = {5, 4, 3, 2, 1}

string s = "Hello";
reverse(s.begin(), s.end());
// s = "olleH"
```

---

## 3. unique — Xóa phần tử trùng lặp

```cpp
vector<int> a = {1, 1, 2, 2, 2, 3, 3, 4};

// unique chỉ hoạt động trên mảng đã sắp xếp
a.erase(unique(a.begin(), a.end()), a.end());
// a = {1, 2, 3, 4}
```

!!! warning "Phải sắp xếp trước"
    `unique` chỉ xóa các phần tử **liên tiếp** trùng nhau. Phải `sort` trước khi `unique`.

---

## 4. next_permutation — Hoán vị kế tiếp

```cpp
vector<int> a = {1, 2, 3};

// In tất cả hoán vị
do {
    for (int x : a) cout << x << " ";
    cout << endl;
} while (next_permutation(a.begin(), a.end()));
// Output:
// 1 2 3
// 1 3 2
// 2 1 3
// 2 3 1
// 3 1 2
// 3 2 1
```

!!! warning "Phải sắp xếp trước"
    `next_permutation` chỉ tạo hoán vị **lớn hơn**. Nếu mảng chưa sắp xếp, sẽ bỏ lỡ một số hoán vị.

---

## 5. min_element / max_element

```cpp
vector<int> a = {5, 2, 8, 1, 9, 3};

cout << *min_element(a.begin(), a.end()) << endl;  // 1
cout << *max_element(a.begin(), a.end()) << endl;  // 9

// Lấy chỉ số
int minIdx = min_element(a.begin(), a.end()) - a.begin();
int maxIdx = max_element(a.begin(), a.end()) - a.begin();
```

---

## 6. find / count / fill

```cpp
vector<int> a = {1, 2, 3, 4, 5};

// find — Tìm phần tử
auto it = find(a.begin(), a.end(), 3);
if (it != a.end()) cout << "Tim thay tai " << it - a.begin() << endl;

// count — Đếm số lần xuất hiện
int cnt = count(a.begin(), a.end(), 3);
cout << cnt << endl;  // 1

// fill — Gán giá trị
fill(a.begin(), a.end(), 0);
// a = {0, 0, 0, 0, 0}
```

---

## 7. accumulate — Tổng

```cpp
vector<int> a = {1, 2, 3, 4, 5};

int sum = accumulate(a.begin(), a.end(), 0);
cout << sum << endl;  // 15

// Tích
int product = accumulate(a.begin(), a.end(), 1, multiplies<int>());
cout << product << endl;  // 120
```

!!! warning "Tránh tràn số"
    ```cpp
    long long sum = accumulate(a.begin(), a.end(), 0LL);
    //                                     khởi tạo ^^ 0LL
    ```

---

## 8. Bảng tổng hợp

| Hàm | Mô tả | Độ phức tạp |
|-----|-------|-------------|
| `sort` | Sắp xếp | $O(n \log n)$ |
| `reverse` | Đảo ngược | $O(n)$ |
| `unique` | Xóa trùng | $O(n)$ |
| `next_permutation` | Hoán vị kế tiếp | $O(n)$ |
| `min_element` | Tìm min | $O(n)$ |
| `max_element` | Tìm max | $O(n)$ |
| `find` | Tìm phần tử | $O(n)$ |
| `count` | Đếm | $O(n)$ |
| `fill` | Gán giá trị | $O(n)$ |
| `accumulate` | Tổng | $O(n)$ |

---

## Bài viết liên quan

- [C10: Vector nâng cao →](C10-vector-nang-cao.md)
- [C12: set & map →](C12-set-map.md)

---

**Bài tiếp theo:** [C12: set & map →](C12-set-map.md)
