# C12: set & map

> **Tác giả:** FPTOJ Wiki<br>
> **Chủ đề:** set, multiset, map, unordered_set, unordered_map

---

## Bạn sẽ học được gì?

Sau bài này, bạn có thể:

- Sử dụng `set` và `multiset` để lưu tập hợp
- Sử dụng `map` để lưu bảng ánh xạ
- Hiểu `unordered_*` (hash) vs `ordered_*` (BST)

---

## 1. set — Tập hợp (không trùng lặp)

### Thao tác cơ bản

```cpp
set<int> s;

// Thêm phần tử
s.insert(3);
s.insert(1);
s.insert(4);
s.insert(1);  // Không thêm được vì đã có 1
// s = {1, 3, 4}

// Kiểm tra tồn tại
cout << s.count(3) << endl;   // 1 (tồn tại)
cout << s.count(5) << endl;   // 0 (không tồn tại)

// Xóa phần tử
s.erase(3);
// s = {1, 4}

// Kích thước
cout << s.size() << endl;     // 2

// Kiểm tra rỗng
if (s.empty()) cout << "Rong" << endl;
```

### Duyệt set

```cpp
set<int> s = {3, 1, 4, 1, 5, 9};

// Duyệt tăng dần (tự động sắp xếp)
for (int x : s) cout << x << " ";
// Output: 1 3 4 5 9
```

### Tìm kiếm nhị phân

```cpp
set<int> s = {1, 3, 5, 7, 9};

auto it = s.find(5);  // Tìm phần tử 5
if (it != s.end()) cout << "Tim thay" << endl;

// lower_bound: phần tử đầu tiên >= x
auto lb = s.lower_bound(4);
cout << *lb << endl;  // 5

// upper_bound: phần tử đầu tiên > x
auto ub = s.upper_bound(5);
cout << *ub << endl;  // 7
```

---

## 2. multiset — Tập hợp (có trùng lặp)

```cpp
multiset<int> ms;

ms.insert(3);
ms.insert(1);
ms.insert(4);
ms.insert(1);  // Thêm được vì cho phép trùng
// ms = {1, 1, 3, 4}

// Đếm số lần xuất hiện
cout << ms.count(1) << endl;  // 2

// Xóa TẤT CẢ phần tử có giá trị 1
ms.erase(1);
// ms = {3, 4}

// Xóa 1 phần tử có giá trị 1
ms.erase(ms.find(1));
```

### multiset trong thi đấu

```cpp
// Tìm K phần tử nhỏ nhất
multiset<int> ms = {5, 2, 8, 1, 9, 3};
int k = 3;
auto it = ms.begin();
for (int i = 0; i < k; i++) {
    cout << *it << " ";
    ++it;
}
// Output: 1 2 3
```

---

## 3. map — Bảng ánh xạ (key → value)

### Thao tác cơ bản

```cpp
map<string, int> mp;

// Thêm/sửa
mp["Nam"] = 15;
mp["An"] = 12;
mp["Binh"] = 18;

// Truy cập
cout << mp["Nam"] << endl;    // 15
cout << mp.at("An") << endl;  // 12

// Kiểm tra tồn tại
if (mp.count("Nam")) cout << "Ton tai" << endl;
if (mp.find("Nam") != mp.end()) cout << "Ton tai" << endl;

// Xóa
mp.erase("An");

// Kích thước
cout << mp.size() << endl;
```

### Duyệt map

```cpp
map<string, int> mp = {{"Nam", 15}, {"An", 12}, {"Binh", 18}};

// Duyệt theo key tăng dần
for (auto [key, value] : mp) {
    cout << key << " -> " << value << endl;
}

// Duyệt bằng iterator
for (auto it = mp.begin(); it != mp.end(); ++it) {
    cout << it->first << " -> " << it->second << endl;
}
```

!!! warning "mp[key] tự tạo phần tử mới"
    ```cpp
    map<string, int> mp;
    // mp["XYZ"] sẽ tạo phần tử {"XYZ", 0} nếu chưa tồn tại!
    // Dùng mp.count("XYZ") hoặc mp.find("XYZ") để kiểm tra trước
    ```

---

## 4. unordered_set / unordered_map — Hash

| | `set`/`map` | `unordered_set`/`unordered_map` |
|---|-------------|--------------------------------|
| **Cấu trúc** | BST (cây đỏ-đen) | Hash table |
| **Sắp xếp** | **Có** (tăng dần) | **Không** |
| **Trung bình** | $O(\log n)$ | $O(1)$ |
| **Worst case** | $O(\log n)$ | $O(n)$ |
| **Dùng khi** | Cần duyệt theo thứ tự | Cần tốc độ nhanh |

```cpp
unordered_set<int> us;
us.insert(3);
us.insert(1);
us.insert(4);

unordered_map<string, int> ump;
ump["Nam"] = 15;
ump["An"] = 12;
```

!!! tip "Chọn loại nào?"
    - Cần **sắp xếp** → dùng `set`/`map`
    - Cần **tốc độ** → dùng `unordered_set`/`unordered_map`
    - Không chắc → dùng `set`/`map` (an toàn hơn)

---

## 5. Ứng dụng trong thi đấu

### Đếm tần suất

```cpp
vector<int> a = {1, 3, 2, 3, 3, 2, 1};
map<int, int> freq;

for (int x : a) freq[x]++;

for (auto [val, cnt] : freq) {
    cout << val << ": " << cnt << endl;
}
```

### Tìm phần tử xuất hiện nhiều nhất

```cpp
map<int, int> freq;
for (int x : a) freq[x]++;

int bestVal = -1, bestCnt = 0;
for (auto [val, cnt] : freq) {
    if (cnt > bestCnt) {
        bestCnt = cnt;
        bestVal = val;
    }
}
```

### Nhóm phần tử theo tính chất

```cpp
// Nhóm từ theo ký tự đầu
map<char, vector<string>> groups;
words = {"apple", "banana", "avocado", "blueberry", "cherry"};

for (const string &w : words) {
    groups[w[0]].push_back(w);
}

for (auto [ch, ws] : groups) {
    cout << ch << ": ";
    for (const string &w : ws) cout << w << " ";
    cout << endl;
}
```

---

## Bài viết liên quan

- [C11: sort & algorithm →](C11-sort-algorithm.md)
- [C13: queue, stack, deque →](C13-queue-stack-deque.md)

---

**Bài tiếp theo:** [C13: queue, stack, deque →](C13-queue-stack-deque.md)
