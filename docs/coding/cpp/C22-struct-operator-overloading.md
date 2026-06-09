# C22: Struct & Operator Overloading cho Thi đấu

> **Tác giả:** FPTOJ Wiki<br>
> **Chủ đề:** Struct, operator overloading, custom comparators, pair/tuple nâng cao

---

## Bạn sẽ học được gì?

- Định nghĩa struct trong C++
- Operator overloading (`<`, `==`, `<<`, `+`, ...)
- Custom comparator cho `set`/`map`/`priority_queue`
- So sánh `pair`/`tuple` tự động
- Khi nào nên dùng struct vs pair

---

## 1. Struct cơ bản

Struct nhóm nhiều biến lại thành một kiểu dữ liệu mới.

```cpp
struct Point {
    int x, y;
    
    // Constructor
    Point() : x(0), y(0) {}
    Point(int x, int y) : x(x), y(y) {}
    
    // Member function
    int manhattan(const Point &other) const {
        return abs(x - other.x) + abs(y - other.y);
    }
};

Point p(3, 5);
Point q(1, 2);
cout << p.manhattan(q) << endl;  // 5
```

```cpp
// Khởi tạo nhanh (C++11)
Point r = {10, 20};

// Vector of structs
vector<Point> pts = {{1, 2}, {3, 4}, {5, 6}};
```

---

## 2. Operator Overloading

### operator< — Để sắp xếp, dùng trong set/map

```cpp
struct Student {
    string name;
    int score;
    
    // Sắp xếp theo điểm giảm dần, nếu bằng thì theo tên
    bool operator<(const Student &other) const {
        if (score != other.score) return score > other.score;
        return name < other.name;
    }
};

vector<Student> students = {{"An", 90}, {"Binh", 85}, {"Chi", 90}};
sort(students.begin(), students.end());
// Chi 90, An 90, Binh 85
```

### operator== — Để so sánh

```cpp
struct Point {
    int x, y;
    
    bool operator==(const Point &other) const {
        return x == other.x && y == other.y;
    }
};

Point a = {1, 2}, b = {1, 2};
if (a == b) cout << "Bang nhau" << endl;  // Bang nhau
```

### operator<< — Để in ra

```cpp
struct Point {
    int x, y;
    
    friend ostream& operator<<(ostream &os, const Point &p) {
        return os << "(" << p.x << ", " << p.y << ")";
    }
};

Point p = {3, 5};
cout << p << endl;  // (3, 5)
```

### operator+ — Để cộng

```cpp
struct Point {
    int x, y;
    
    Point operator+(const Point &other) const {
        return {x + other.x, y + other.y};
    }
};

Point a = {1, 2}, b = {3, 4};
Point c = a + b;  // {6, 6}
```

??? tip "Tóm tắt các operator thường dùng"
    | Operator | Mục đích | Khi nào cần |
    |----------|----------|--------------|
    | `operator<` | So sánh nhỏ hơn | `sort`, `set`, `map`, `priority_queue` |
    | `operator==` | So sánh bằng | `find`, `unique`, `unordered_set` |
    | `operator<<` | Xuất ra stream | `cout`, debug |
    | `operator+` | Phép cộng | Tính toán |
    | `operator()` | Gọi như hàm | Functor, comparator |

---

## 3. Custom Comparator cho STL Containers

### sort với lambda

```cpp
struct Point {
    int x, y;
};

vector<Point> pts = {{3, 1}, {1, 3}, {2, 2}};

// Sắp xếp theo x tăng dần
sort(pts.begin(), pts.end(), [](const Point &a, const Point &b) {
    return a.x < b.x;
});

// Sắp xếp theo khoảng cách từ gốc tọa độ
sort(pts.begin(), pts.end(), [](const Point &a, const Point &b) {
    return a.x * a.x + a.y * a.y < b.x * b.x + b.y * b.y;
});
```

### set với custom comparator (functor)

```cpp
struct Point {
    int x, y;
};

struct ComparePoint {
    bool operator()(const Point &a, const Point &b) const {
        if (a.x != b.x) return a.x < b.x;
        return a.y < b.y;
    }
};

set<Point, ComparePoint> s;
s.insert({1, 2});
s.insert({3, 4});
s.insert({1, 5});
// Sắp xếp: (1,2), (1,5), (3,4)
```

### set với lambda (C++20)

```cpp
// C++20: dùng lambda trực tiếp
auto cmp = [](const Point &a, const Point &b) {
    return a.x < b.x || (a.x == b.x && a.y < b.y);
};
set<Point, decltype(cmp)> s(cmp);
```

### priority_queue với custom comparator

```cpp
struct Task {
    int priority;
    string name;
};

// Max-heap theo priority (mặc định)
struct CompareTask {
    bool operator()(const Task &a, const Task &b) const {
        return a.priority < b.priority;  // max-heap
    }
};

priority_queue<Task, vector<Task>, CompareTask> pq;

// Min-heap với lambda
auto cmp = [](const Task &a, const Task &b) {
    return a.priority > b.priority;  // min-heap
};
priority_queue<Task, vector<Task>, decltype(cmp)> minPQ(cmp);
```

??? warning "Lưu ý với priority_queue và lambda"
    Phải truyền lambda vào constructor:
    ```cpp
    auto cmp = [](int a, int b) { return a > b; };
    priority_queue<int, vector<int>, decltype(cmp)> pq(cmp);
    ```

### map với custom comparator

```cpp
struct Student {
    string name;
    int id;
};

struct CompareStudent {
    bool operator()(const Student &a, const Student &b) const {
        return a.id < b.id;
    }
};

map<Student, int, CompareStudent> mp;
mp[{"An", 100}] = 90;
mp[{"Binh", 50}] = 85;
// Sắp xếp theo id: 50 -> 100
```

---

## 4. struct vs pair vs tuple

| Tiêu chí | `struct` | `pair` | `tuple` |
|-----------|----------|--------|---------|
| Đọc code | Rõ ràng tên trường | `.first`, `.second` | `get<0>` khó đọc |
| Số trường | Bất kỳ | Đúng 2 | Bất kỳ |
| Operator< | Tự viết | Tự động | Tự động |
| Khởi tạo | `{a, b}` hoặc constructor | `{a, b}` hoặc `make_pair` | `make_tuple` |
| Performance | Tương đương | Tương đương | Tương đương |

??? tip "Khi nào dùng gì?"
    - **2 trường đơn giản** (index, value): `pair` hoặc `tuple`
    - **2-3 trường cần tên rõ ràng**: `struct`
    - **3+ trường**: luôn dùng `struct`
    - **Thi đấu**: `pair` cho nhanh, `struct` khi cần readability

```cpp
// pair — nhanh, tiện cho 2 trường
pair<int, int> p = {1, 2};
cout << p.first << " " << p.second << endl;

// tuple — 3+ trường nhưng không tên
tuple<int, int, string> t = {1, 2, "hello"};
cout << get<0>(t) << " " << get<2>(t) << endl;

// struct — rõ ràng nhất
struct Edge {
    int u, v, weight;
};
Edge e = {1, 2, 5};
cout << e.u << " " << e.v << " " << e.weight << endl;
```

??? tip "C++17: Structured Binding"
    ```cpp
    auto [x, y] = make_pair(1, 2);
    auto [a, b, c] = make_tuple(1, 2, 3);
    
    // Structured binding với aggregate struct (không có constructor)
    struct Pt { int x, y; };
    Pt p = {3, 5};
    auto [px, py] = p;  // Hoạt động với aggregate type
    ```

---

## 5. Ví dụ thực tế trong thi đấu

### Point struct với Cross Product, Dot Product

```cpp
struct Point {
    long long x, y;
    
    Point operator-(const Point &other) const {
        return {x - other.x, y - other.y};
    }
    
    long long cross(const Point &other) const {
        return x * other.y - y * other.x;
    }
    
    long long dot(const Point &other) const {
        return x * other.x + y * other.y;
    }
    
    // Hướng quay: > 0 là trái, < 0 là phải, = 0 là thẳng hàng
    static int orientation(const Point &a, const Point & b, const Point &c) {
        long long val = (b - a).cross(c - a);
        if (val > 0) return 1;   // Trái
        if (val < 0) return -1;  // Phải
        return 0;                // Thẳng hàng
    }
    
    friend ostream& operator<<(ostream &os, const Point &p) {
        return os << "(" << p.x << ", " << p.y << ")";
    }
};
```

### Edge struct cho Graph

```cpp
struct Edge {
    int u, v, weight;
    
    bool operator<(const Edge &other) const {
        return weight < other.weight;
    }
};

// Kruskal: sắp xếp cạnh theo trọng số
vector<Edge> edges = {{1, 2, 3}, {2, 3, 1}, {1, 3, 2}};
sort(edges.begin(), edges.end());
// edges: (2,3,1), (1,3,2), (1,2,3)

// Dùng trong set
set<Edge> edgeSet;
edgeSet.insert({1, 2, 5});
```

### Event struct cho Sweep Line

```cpp
struct Event {
    int x, type;  // type: +1 (mở), -1 (đóng)
    
    bool operator<(const Event &other) const {
        if (x != other.x) return x < other.x;
        return type < other.type;  // đóng trước mở
    }
};

vector<Event> events;
events.push_back({5, 1});   // Mở tại x=5
events.push_back({10, -1}); // Đóng tại x=10
events.push_back({3, 1});   // Mở tại x=3
sort(events.begin(), events.end());
```

### Interval struct

```cpp
struct Interval {
    int l, r;
    
    int length() const { return r - l; }
    
    bool contains(int x) const {
        return l <= x && x <= r;
    }
    
    bool overlaps(const Interval &other) const {
        return l <= other.r && other.l <= r;
    }
    
    // Sắp xếp theo điểm bắt đầu
    bool operator<(const Interval &other) const {
        return l < other.l;
    }
    
    friend ostream& operator<<(ostream &os, const Interval &iv) {
        return os << "[" << iv.l << ", " << iv.r << "]";
    }
};
```

---

## 6. Bài tập thực hành

### Bài 1: Sắp xếp sinh viên
Đọc $n$ sinh viên (tên, điểm). Sắp xếp theo điểm giảm dần, nếu bằng điểm thì theo tên tăng dần.

<div class="cp-pg" data-language="cpp" data-starter="#include &lt;bits/stdc++.h&gt;\nusing namespace std;\n\nstruct Student {\n    string name;\n    int score;\n};\n\nint main() {\n    // Viết code ở đây\n    return 0;\n}" data-input="3
Nam 8
An 10
Binh 8" data-expected="An 10
Binh 8
Nam 8" data-hint="Dùng sort với lambda: so sánh score trước, nếu bằng so sánh name"></div>

??? tip "Lời giải"
    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    
    struct Student {
        string name;
        int score;
    };
    
    int main() {
        int n;
        cin >> n;
        
        vector<Student> a(n);
        for (int i = 0; i < n; i++) cin >> a[i].name >> a[i].score;
        
        sort(a.begin(), a.end(), [](const Student &x, const Student &y) {
            if (x.score != y.score) return x.score > y.score;
            return x.name < y.name;
        });
        
        for (auto &s : a) cout << s.name << " " << s.score << endl;
        return 0;
    }
    ```

### Bài 2: Bài tập trên CSES

| Bài | Độ khó | Gợi ý |
|-----|--------|-------|
| [Convex Hull](https://cses.fi/problemset/task/2195) | Khó | Point struct + cross product |
| [Road Reparation](https://cses.fi/problemset/task/1675) | Trung bình | Edge struct + Kruskal |
| [Room Allocation](https://cses.fi/problemset/task/1164) | Trung bình | Event struct + sweep line |
| [Tasks and Deadlines](https://cses.fi/problemset/task/1630) | Dễ | Task struct + sort |
| [Stick Lengths](https://cses.fi/problemset/task/1074) | Dễ | `nth_element` cho median |

---

## Bài viết liên quan

- [C04: Mảng & Vector →](C04-mang-vector.md)
- [C14: Algorithm nâng cao →](C14-algorithm-nang-cao.md)
