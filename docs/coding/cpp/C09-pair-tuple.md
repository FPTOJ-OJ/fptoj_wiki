# C09: pair & tuple

> **Tác giả:** FPTOJ Wiki<br>
> **Chủ đề:** pair, tuple, structured bindings

---

## Bạn sẽ học được gì?

Sau bài này, bạn có thể:

- Sử dụng `pair` để lưu 2 giá trị
- Sử dụng `tuple` để lưu nhiều giá trị
- Dùng structured bindings (C++17)

---

## 1. pair — Lưu 2 giá trị

### Khai báo

```cpp
pair<int, int> p1 = {1, 2};
pair<string, int> p2 = {"Nam", 15};
pair<int, string> p3 = make_pair(1, "Hello");
```

### Truy cập

```cpp
pair<string, int> p = {"Nam", 15};

cout << p.first << endl;   // "Nam"
cout << p.second << endl;  // 15
```

### So sánh pair

```cpp
pair<int, int> a = {1, 2};
pair<int, int> b = {1, 3};

// So sánh theo first trước, nếu bằng thì so sánh second
cout << (a < b) << endl;  // 1 (true) vì a.second < b.second
```

### pair trong thi đấu

```cpp
// Lưu tọa độ điểm
pair<int, int> point = {3, 5};

// Lưu {giá trị, chỉ số}
pair<int, int> valIdx = {100, 5};

// Sắp xếp vector pair
vector<pair<int, int>> v = {{3, 1}, {1, 3}, {2, 2}};
sort(v.begin(), v.end());
// v = {{1, 3}, {2, 2}, {3, 1}}
```

---

## 2. tuple — Lưu nhiều giá trị

### Khai báo

```cpp
tuple<int, string, double> t1 = {1, "Nam", 9.5};
auto t2 = make_tuple(2, "An", 8.0);
```

### Truy cập

```cpp
auto t = make_tuple(1, "Nam", 9.5);

cout << get<0>(t) << endl;  // 1
cout << get<1>(t) << endl;  // "Nam"
cout << get<2>(t) << endl;  // 9.5
```

### tie — Gán tuple vào biến

```cpp
auto t = make_tuple(1, "Nam", 9.5);

int id;
string name;
double score;
tie(id, name, score) = t;

cout << id << " " << name << " " << score << endl;
```

---

## 3. Structured Bindings (C++17)

```cpp
// Với pair
pair<int, int> p = {1, 2};
auto [x, y] = p;
cout << x << " " << y << endl;  // 1 2

// Với tuple
auto t = make_tuple(1, "Nam", 9.5);
auto [id, name, score] = t;
cout << id << " " << name << " " << score << endl;

// Với map
map<string, int> mp = {{"a", 1}, {"b", 2}};
for (auto [key, value] : mp) {
    cout << key << " -> " << value << endl;
}
```

!!! tip "Structured bindings rất tiện"
    Thay vì viết `p.first`, `p.second`, dùng `auto [x, y] = p;` cho ngắn gọn.

---

## 4. Ứng dụng trong thi đấu

### Lưu tọa độ

```cpp
pair<int, int> start = {0, 0};
pair<int, int> finish = {n-1, m-1};
```

### Sắp xếp đa tiêu chí

```cpp
// Sắp xếp sinh viên theo điểm giảm dần, nếu bằng thì theo tên tăng dần
vector<tuple<double, string, int>> students;
students.push_back({9.5, "Nam", 1});
students.push_back({8.0, "An", 2});
students.push_back({9.5, "Binh", 3});

sort(students.begin(), students.end(), greater<>());
```

### Priority queue với pair

```cpp
// Max-heap: phần tử có first lớn nhất ở đỉnh
priority_queue<pair<int, int>> pq;
pq.push({3, 100});
pq.push({1, 200});
pq.push({2, 300});

auto [val, id] = pq.top();  // {3, 100}
```

---

## Bài viết liên quan

- [C08: Reference & Pointer →](C08-reference-pointer.md)
- [C10: Vector nâng cao →](C10-vector-nang-cao.md)

---

**Bài tiếp theo:** [C10: Vector nâng cao →](C10-vector-nang-cao.md)
