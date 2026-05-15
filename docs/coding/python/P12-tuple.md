# P12: Tuple

> **Tác giả:** Hà Trí Kiên<br>
> **Chủ đề:** Tuple, namedtuple, immutable

---

## 1. Tổng quan

Tuple giống như list nhưng **immutable** (không thể thay đổi sau khi tạo). Tuple thường dùng để lưu dữ liệu không cần thay đổi.

```python
t = (1, 2, 3, 4, 5)
```

!!! info "Tuple vs List"
    | | Tuple | List |
    |---|-------|------|
    | Mutable | ❌ Không | ✅ Có |
    | Syntax | `(1, 2, 3)` | `[1, 2, 3]` |
    | Tốc độ | Nhanh hơn | Chậm hơn |
    | Dùng làm key | ✅ Được | ❌ Không |

---

## 2. Tạo Tuple

```python
# Cách 1: Dùng ()
t = (1, 2, 3, 4, 5)

# Cách 2: Không ngoặc
t = 1, 2, 3, 4, 5

# Cách 3: Dùng tuple()
t = tuple([1, 2, 3, 4, 5])

# Tuple 1 phần tử (PHẢI có dấu phẩy)
t = (1,)     # Tuple 1 phần tử
# t = (1)    # Đây là số nguyên 1, không phải tuple!

# Tuple rỗng
t = ()
t = tuple()
```

---

## 3. Truy cập phần tử

```python
t = (10, 20, 30, 40, 50)

# Index
print(t[0])     # 10
print(t[-1])    # 50

# Slicing
print(t[1:3])   # (20, 30)
print(t[:3])    # (10, 20, 30)
print(t[::2])   # (10, 30, 50)
```

---

## 4. Tuple là Immutable

```python
t = (1, 2, 3)

# SAI: Không thể thay đổi
# t[0] = 10  # TypeError!

# Nhưng có thể tạo tuple mới
t = (10,) + t[1:]  # (10, 2, 3)
```

---

## 5. Các phép toán trên Tuple

```python
t1 = (1, 2, 3)
t2 = (4, 5, 6)

# Nối
t3 = t1 + t2     # (1, 2, 3, 4, 5, 6)

# Lặp lại
t4 = t1 * 3      # (1, 2, 3, 1, 2, 3, 1, 2, 3)

# Kiểm tra tồn tại
print(2 in t1)   # True
print(4 in t1)   # False

# Độ dài
print(len(t1))   # 3

# Đếm
print(t1.count(2))  # 1

# Tìm vị trí
print(t1.index(2))  # 1
```

---

## 6. Unpacking Tuple

```python
# Unpacking cơ bản
t = (1, 2, 3)
a, b, c = t     # a=1, b=2, c=3

# Swap
a, b = 10, 20
a, b = b, a     # a=20, b=10

# Unpacking với *
t = (1, 2, 3, 4, 5)
a, *b = t       # a=1, b=[2, 3, 4, 5]
*a, b = t       # a=[1, 2, 3, 4], b=5
a, *b, c = t    # a=1, b=[2, 3, 4], c=5

# Unpacking trong vòng lặp
pairs = [(1, "a"), (2, "b"), (3, "c")]
for num, letter in pairs:
    print(f"{num}: {letter}")
```

---

## 7. Tuple làm key trong Dict

```python
# Tuple có thể làm key (vì immutable)
d = {}
d[(1, 2)] = "point A"
d[(3, 4)] = "point B"
print(d[(1, 2)])  # "point A"

# List không thể làm key
# d[[1, 2]] = "point A"  # TypeError!
```

### Ứng dụng: Đếm cặp

```python
from collections import Counter

points = [(1, 2), (3, 4), (1, 2), (5, 6), (3, 4), (1, 2)]
cnt = Counter(points)
print(cnt)  # Counter({(1, 2): 3, (3, 4): 2, (5, 6): 1})
```

---

## 8. namedtuple — Tuple có tên

```python
from collections import namedtuple

# Tạo namedtuple
Point = namedtuple("Point", ["x", "y"])
p = Point(1, 2)

print(p.x)     # 1
print(p.y)     # 2
print(p[0])    # 1 (vẫn truy cập như tuple)
print(p[1])    # 2

# namedtuple với nhiều trường
Student = namedtuple("Student", ["name", "age", "score"])
s = Student("Alice", 15, 9.5)
print(s.name)  # "Alice"
print(s.age)   # 15
print(s.score) # 9.5
```

### Ứng dụng: Lưu tọa độ

```python
from collections import namedtuple

Point = namedtuple("Point", ["x", "y"])

# Tọa độ các điểm
points = [Point(1, 2), Point(3, 4), Point(5, 6)]

# Tính khoảng cách
import math
def distance(p1, p2):
    return math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2)

print(distance(points[0], points[1]))
```

---

## 9. Pattern thường gặp trong thi đấu

### 9.1. Lưu tọa độ

```python
# Cách 1: Tuple
point = (x, y)

# Cách 2: namedtuple
from collections import namedtuple
Point = namedtuple("Point", ["x", "y"])
point = Point(x, y)
```

### 9.2. Return nhiều giá trị từ hàm

```python
def min_max(arr):
    return min(arr), max(arr)  # Trả về tuple

lo, hi = min_max([3, 1, 4, 1, 5, 9])
```

### 9.3. Sắp xếp theo nhiều tiêu chí

```python
students = [("Alice", 90), ("Bob", 85), ("Charlie", 90)]

# Sắp xếp theo điểm giảm dần, tên tăng dần
students.sort(key=lambda x: (-x[1], x[0]))
```

### 9.4. Đếm cặp

```python
from collections import Counter

edges = [(1, 2), (3, 4), (1, 2), (5, 6)]
cnt = Counter(edges)
```

---

## 10. So sánh với C++

=== "Python"

    ```python
    # Tuple
    t = (1, 2, 3)
    a, b, c = t
    
    # namedtuple
    from collections import namedtuple
    Point = namedtuple("Point", ["x", "y"])
    p = Point(1, 2)
    print(p.x)
    ```

=== "C++"

    ```cpp
    // Tuple
    tuple<int, int, int> t = {1, 2, 3};
    auto [a, b, c] = t; // C++17
    
    // Struct
    struct Point {
        int x, y;
    };
    Point p = {1, 2};
    cout << p.x;
    ```

---

## 11. Lưu ý / Cạm bẫy hay gặp

### Bẫy 1: Tuple 1 phần tử phải có dấu phẩy

```python
# SAI
t = (1)    # Đây là số nguyên 1!

# ĐÚNG
t = (1,)   # Tuple 1 phần tử
```

### Bẫy 2: Tuple immutable nhưng chứa mutable

```python
# Tuple chứa list — list vẫn thay đổi được!
t = (1, [2, 3], 4)
t[1].append(5)
print(t)  # (1, [2, 3, 5], 4)

# Không thể gán lại
# t[1] = [10, 20]  # TypeError!
```

### Bẫy 3: Không thể sort tuple

```python
t = (3, 1, 4, 1, 5)
# t.sort()  # AttributeError!

# Phải convert sang list
sorted_t = tuple(sorted(t))
```

---

## 12. Bài tập thực hành

### Bài 1: Lưu tọa độ
Đọc n cặp tọa độ. Tìm cặp tọa độ gần gốc tọa độ nhất.

```python
import math
n = int(input())
points = [tuple(map(int, input().split())) for _ in range(n)]
# Code của bạn ở đây
```

??? tip "Lời giải"
    ```python
    import math
    nearest = min(points, key=lambda p: math.sqrt(p[0]**2 + p[1]**2))
    print(nearest)
    ```

### Bài 2: Đếm cặp
Đọc n cặp (a, b). Đếm số lần xuất hiện của mỗi cặp.

```python
from collections import Counter
n = int(input())
pairs = [tuple(map(int, input().split())) for _ in range(n)]
# Code của bạn ở đây
```

??? tip "Lời giải"
    ```python
    from collections import Counter
    cnt = Counter(pairs)
    for pair, count in cnt.items():
        print(f"{pair}: {count}")
    ```

### Bài 3: Sắp xếp học sinh
Đọc n học sinh (tên, điểm). Sắp xếp theo điểm giảm dần, tên tăng dần.

```python
n = int(input())
students = []
for _ in range(n):
    name, score = input().split()
    students.append((name, int(score)))
# Code của bạn ở đây
```

??? tip "Lời giải"
    ```python
    students.sort(key=lambda x: (-x[1], x[0]))
    for name, score in students:
        print(f"{name} {score}")
    ```

---

## 13. Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Distinct Numbers](https://cses.fi/problemset/task/1621) | CSES | ⭐ | Tuple, set |
| [CSES - Sum of Two Values](https://cses.fi/problemset/task/1640) | CSES | ⭐⭐ | Tuple, dict |

---

## Bài viết liên quan

- [← P11: Dict & Set](P11-dict-set.md)
- [P13: Hàm →](P13-ham.md)

---

**Bài trước:** [P11: Dict & Set](P11-dict-set.md)<br>
**Bài tiếp theo:** [P13: Hàm →](P13-ham.md)
