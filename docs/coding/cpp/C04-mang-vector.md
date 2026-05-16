# C04: Mảng & Vector

> **Tác giả:** FPTOJ Wiki<br>
> **Chủ đề:** Mảng tĩnh, vector, sắp xếp, tìm kiếm, prefix sum, two pointers

---

## Bạn sẽ học được gì?

Sau bài này, bạn có thể:

- Khai báo và sử dụng mảng tĩnh (`int a[N]`)
- Sử dụng `vector` — cấu trúc dữ liệu linh hoạt nhất
- Sắp xếp mảng với `sort`
- Tìm kiếm nhị phân với `lower_bound`/`upper_bound`
- Áp dụng prefix sum và two pointers

---

## 1. Mảng tĩnh (Array)

### Khai báo mảng

```cpp
// Khai báo mảng 1000 phần tử (giá trị không xác định)
int a[1000];

// Khai báo và khởi tạo
int b[5] = {10, 20, 30, 40, 50};

// Khai báo toàn bộ giá trị 0
int c[1000] = {0};

// Khai báo toàn bộ giá trị -1 (trick)
int d[1000];
memset(d, -1, sizeof(d));
```

!!! warning "Kích thước mảng tĩnh"
    - Mảng tĩnh phải khai báo kích thước **cố định** tại compile time
    - Không thể thay đổi kích thước sau khi khai báo
    - Nếu cần mảng động → dùng `vector`
    - Khai báo **ngoài hàm main** để có kích thước lớn hơn (~10^7)

### Truy cập phần tử

```cpp
int a[5] = {10, 20, 30, 40, 50};

cout << a[0] << endl;  // 10 (phần tử đầu tiên, chỉ số từ 0)
cout << a[4] << endl;  // 50 (phần tử cuối cùng)

a[2] = 100;  // Gán giá trị mới
```

!!! danger "Truy cập ngoài phạm vi — Undefined Behavior"
    ```cpp
    int a[5] = {10, 20, 30, 40, 50};
    cout << a[5] << endl;  // LỖI! Chỉ số hợp lệ: 0 đến 4
    ```

### Duyệt mảng

```cpp
int a[5] = {10, 20, 30, 40, 50};

// Cách 1: Dùng chỉ số
for (int i = 0; i < 5; i++) {
    cout << a[i] << " ";
}

// Cách 2: Dùng range-based for (C++11)
for (int x : a) {
    cout << x << " ";
}

// Cách 3: Dùng sizeof để lấy kích thước
int n = sizeof(a) / sizeof(a[0]);
for (int i = 0; i < n; i++) {
    cout << a[i] << " ";
}
```

### Mảng 2 chiều

```cpp
int a[100][100];  // Mảng 100x100

// Khởi tạo
int b[3][4] = {
    {1, 2, 3, 4},
    {5, 6, 7, 8},
    {9, 10, 11, 12}
};

// Duyệt
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 4; j++) {
        cout << b[i][j] << " ";
    }
    cout << endl;
}
```

### Mảng tĩnh vs Vector

| Mảng tĩnh | Vector |
|-----------|--------|
| Kích thước cố định | **Kích thước linh hoạt** |
| Không thể xóa phần tử | **Có thể xóa phần tử** |
| Nhanh hơn một chút | Hơi chậm hơn (không đáng kể) |
| Phải biết kích thước trước | **Tự động mở rộng** |

!!! tip "Khi nào dùng mảng tĩnh?"
    - Kích thước **cố định** và **biết trước** → mảng tĩnh
    - Cần **thêm/xóa** phần tử → vector
    - Không chắc → **dùng vector** (an toàn hơn)

---

## 2. Vector — Mảng động

### Khai báo vector

```cpp
#include <vector>

vector<int> a;              // Vector rỗng
vector<int> b(10);          // 10 phần tử, giá trị 0
vector<int> c(10, 5);       // 10 phần tử, giá trị 5
vector<int> d = {1, 2, 3};  // Khởi tạo với giá trị

// Vector 2 chiều
vector<vector<int>> matrix(3, vector<int>(4, 0));  // 3x4, giá trị 0
```

### Các thao tác cơ bản

```cpp
vector<int> a;

// Thêm phần tử vào cuối
a.push_back(10);
a.push_back(20);
a.push_back(30);
// a = {10, 20, 30}

// Lấy kích thước
cout << a.size() << endl;  // 3

// Truy cập phần tử
cout << a[0] << endl;      // 10
cout << a.at(1) << endl;   // 20 (an toàn hơn, có kiểm tra biên)
cout << a.front() << endl; // 10 (phần tử đầu)
cout << a.back() << endl;  // 30 (phần tử cuối)

// Xóa phần tử cuối
a.pop_back();
// a = {10, 20}

// Kiểm tra rỗng
if (a.empty()) {
    cout << "Vector rong" << endl;
}

// Xóa toàn bộ
a.clear();
```

### Thêm/xóa tại vị trí bất kỳ

```cpp
vector<int> a = {1, 2, 3, 4, 5};

// Thêm tại vị trí 2
a.insert(a.begin() + 2, 10);
// a = {1, 2, 10, 3, 4, 5}

// Xóa tại vị trí 1
a.erase(a.begin() + 1);
// a = {1, 10, 3, 4, 5}

// Xóa từ vị trí 1 đến 3
a.erase(a.begin() + 1, a.begin() + 3);
// a = {1, 4, 5}
```

### Duyệt vector

```cpp
vector<int> a = {10, 20, 30, 40, 50};

// Cách 1: Dùng chỉ số (phổ biến nhất trong thi đấu)
for (int i = 0; i < (int)a.size(); i++) {
    cout << a[i] << " ";
}

// Cách 2: Range-based for
for (int x : a) {
    cout << x << " ";
}

// Cách 3: Range-based for với const reference (nhanh nhất)
for (const auto &x : a) {
    cout << x << " ";
}

// Cách 4: Iterator
for (auto it = a.begin(); it != a.end(); ++it) {
    cout << *it << " ";
}
```

!!! tip "Dùng `(int)a.size()` để tránh cảnh báo"
    `a.size()` trả về `size_t` (unsigned), so sánh với `int` có thể gây cảnh báo.

---

## 3. Sắp xếp với sort

### Sắp xếp tăng/giảm dần

```cpp
vector<int> a = {5, 2, 8, 1, 9, 3};

sort(a.begin(), a.end());              // Tăng: {1, 2, 3, 5, 8, 9}
sort(a.begin(), a.end(), greater<>()); // Giảm: {9, 8, 5, 3, 2, 1}
```

### Sắp xếp mảng tĩnh

```cpp
int a[6] = {5, 2, 8, 1, 9, 3};
sort(a, a + 6);  // a + 6 là vị trí sau phần tử cuối
```

### Sắp xếp một phần mảng

```cpp
vector<int> a = {5, 2, 8, 1, 9, 3};

// Sắp xếp từ chỉ số 1 đến 4 (không bao gồm 4)
sort(a.begin() + 1, a.begin() + 4);
// a = {5, 1, 2, 8, 9, 3}
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

### stable_sort — Giữ thứ tự tương đối

```cpp
vector<pair<int,int>> v = {{1, 'a'}, {2, 'b'}, {1, 'c'}};
stable_sort(v.begin(), v.end(), [](const auto &x, const auto &y) {
    return x.first < y.first;
});
// Thứ tự của (1,'a') và (1,'c') được giữ nguyên
```

---

## 4. Tìm kiếm nhị phân với STL

### lower_bound — Tìm vị trí đầu tiên >= x

```cpp
vector<int> a = {1, 3, 5, 7, 9};

auto it = lower_bound(a.begin(), a.end(), 5);
cout << *it << endl;           // 5
cout << it - a.begin() << endl; // 2 (chỉ số)

// Tìm phần tử không tồn tại
auto it2 = lower_bound(a.begin(), a.end(), 4);
cout << *it2 << endl;          // 5 (phần tử đầu tiên >= 4)
```

### upper_bound — Tìm vị trí đầu tiên > x

```cpp
vector<int> a = {1, 3, 5, 5, 7, 9};

auto it = upper_bound(a.begin(), a.end(), 5);
cout << *it << endl;           // 7
cout << it - a.begin() << endl; // 4 (chỉ số)
```

### Đếm số phần tử trong đoạn [l, r]

```cpp
vector<int> a = {1, 3, 5, 5, 7, 9};

int l = 3, r = 7;
int cnt = upper_bound(a.begin(), a.end(), r) 
        - lower_bound(a.begin(), a.end(), l);
cout << cnt << endl;  // 4 (phần tử 3, 5, 5, 7)
```

!!! warning "Yêu cầu mảng đã sắp xếp"
    `lower_bound`/`upper_bound` chỉ hoạt động đúng trên mảng **đã sắp xếp tăng dần**.

### binary_search — Kiểm tra tồn tại

```cpp
vector<int> a = {1, 3, 5, 7, 9};

if (binary_search(a.begin(), a.end(), 5)) {
    cout << "Tim thay" << endl;
}
```

---

## 5. Các hàm tiện ích

```cpp
vector<int> a = {5, 2, 8, 1, 9, 3};

// Tìm max, min
cout << *max_element(a.begin(), a.end()) << endl;  // 9
cout << *min_element(a.begin(), a.end()) << endl;  // 1

// Tổng các phần tử
int sum = accumulate(a.begin(), a.end(), 0);
cout << sum << endl;  // 28

// Đếm số phần tử thỏa mãn điều kiện
int cnt = count_if(a.begin(), a.end(), [](int x) { return x > 5; });
cout << cnt << endl;  // 2

// Tìm phần tử đầu tiên thỏa mãn điều kiện
auto it = find_if(a.begin(), a.end(), [](int x) { return x % 2 == 0; });
if (it != a.end()) cout << *it << endl;  // 2

// Kiểm tra đã sắp xếp
cout << is_sorted(a.begin(), a.end()) << endl;  // 0

// Đảo ngược
reverse(a.begin(), a.end());

// Xóa phần tử trùng (phải sort trước)
sort(a.begin(), a.end());
a.erase(unique(a.begin(), a.end()), a.end());
```

---

## 6. Prefix Sum — Tổng tiền tố

### Prefix sum 1D

```cpp
vector<int> a = {1, 2, 3, 4, 5};

// Xây dựng prefix sum
vector<int> pref(a.size() + 1, 0);
for (int i = 0; i < (int)a.size(); i++) {
    pref[i + 1] = pref[i] + a[i];
}
// pref = {0, 1, 3, 6, 10, 15}

// Tính tổng đoạn [l, r] (0-indexed)
int l = 1, r = 3;
int sumLR = pref[r + 1] - pref[l];
cout << sumLR << endl;  // 2 + 3 + 4 = 9
```

### Ứng dụng: Đếm số phần tử trong đoạn

```cpp
// Cho mảng a và nhiều truy vấn [l, r], tính tổng đoạn [l, r]
// Dùng prefix sum để trả lời mỗi truy vấn O(1)
```

---

## 7. Two Pointers — Hai con trỏ

### Bài toán: Tìm cặp có tổng = X

```cpp
vector<int> a = {1, 2, 3, 4, 5, 6};
int target = 7;

// Mảng phải đã sắp xếp
sort(a.begin(), a.end());

int l = 0, r = a.size() - 1;
while (l < r) {
    int sum = a[l] + a[r];
    if (sum == target) {
        cout << "Tim thay: " << a[l] << " + " << a[r] << endl;
        l++; r--;
    } else if (sum < target) {
        l++;
    } else {
        r--;
    }
}
```

### Bài toán: Mảng con có tổng = X

```cpp
vector<int> a = {1, 2, 3, 7, 5};
int target = 12;

int l = 0, sum = 0;
for (int r = 0; r < (int)a.size(); r++) {
    sum += a[r];
    while (sum > target) {
        sum -= a[l];
        l++;
    }
    if (sum == target) {
        cout << "Tim thay tu vi tri " << l << " den " << r << endl;
    }
}
```

---

## 8. Bài tập thực hành

### Bài 1: Tìm số lớn nhất
Đọc $n$ số nguyên. In ra số lớn nhất.

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
        vector<int> a(n);
        for (int i = 0; i < n; i++) cin >> a[i];
        cout << *max_element(a.begin(), a.end()) << endl;
        return 0;
    }
    ```

### Bài 2: Sắp xếp và in
Đọc $n$ số nguyên. In ra mảng đã sắp xếp tăng dần.

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
        vector<int> a(n);
        for (int i = 0; i < n; i++) cin >> a[i];
        sort(a.begin(), a.end());
        for (int i = 0; i < n; i++) {
            if (i > 0) cout << " ";
            cout << a[i];
        }
        cout << endl;
        return 0;
    }
    ```

### Bài 3: Đếm tần suất
Đọc $n$ số nguyên (mỗi số từ 1 đến 100). In ra số xuất hiện nhiều nhất.

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
        map<int, int> freq;
        for (int i = 0; i < n; i++) {
            int x;
            cin >> x;
            freq[x]++;
        }
        int best = -1, bestCnt = 0;
        for (auto [val, cnt] : freq) {
            if (cnt > bestCnt) {
                bestCnt = cnt;
                best = val;
            }
        }
        cout << best << endl;
        return 0;
    }
    ```

### Bài 4: Prefix sum
Đọc $n$ số nguyên và $q$ truy vấn. Mỗi truy vấn cho $l$, $r$. In ra tổng đoạn $[l, r]$.

```cpp
// Code của bạn ở đây
```

??? tip "Lời giải"
    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    
    int main() {
        ios_base::sync_with_stdio(false);
        cin.tie(NULL);
        
        int n;
        cin >> n;
        vector<int> a(n);
        for (int i = 0; i < n; i++) cin >> a[i];
        
        vector<long long> pref(n + 1, 0);
        for (int i = 0; i < n; i++) pref[i + 1] = pref[i] + a[i];
        
        int q;
        cin >> q;
        while (q--) {
            int l, r;
            cin >> l >> r;
            cout << pref[r + 1] - pref[l] << endl;
        }
        return 0;
    }
    ```

---

## Bài viết liên quan

- [C03: Điều kiện & Vòng lặp →](C03-dieu-kien-vong-lap.md)
- [C05: String →](C05-string.md)

---

**Bài tiếp theo:** [C05: String →](C05-string.md)
