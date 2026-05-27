# P07: Vòng lặp — Nâng cao

> **Tác giả:** Hà Trí Kiên<br>
> **Chủ đề:** enumerate, zip, list comprehension, generator, lồng vòng lặp

---

## 1. Tổng quan

Bài này học các kỹ thuật **nâng cao** với vòng lặp, giúp viết code **ngắn hơn, nhanh hơn, Pythonic hơn**.

---

## 2. enumerate() — Duyệt với index

```python
arr = [10, 20, 30, 40, 50]

# Cách 1: Dùng range(len()) — dài dòng
for i in range(len(arr)):
    print(f"arr[{i}] = {arr[i]}")

# Cách 2: enumerate — ngắn gọn, rõ ràng
for i, x in enumerate(arr):
    print(f"arr[{i}] = {x}")

# enumerate với start khác
for i, x in enumerate(arr, start=1):
    print(f"Phan tu thu {i}: {x}")
```

### Ứng dụng: Tìm vị trí phần tử

```python
arr = [3, 7, 2, 9, 5]
target = 9

for i, x in enumerate(arr):
    if x == target:
        print(f"Tim thay tai vi tri {i}")
        break
else:
    print("Khong tim thay")
```

### Ứng dụng: Tạo index mapping

```python
arr = [10, 20, 30, 40, 50]
index_map = {x: i for i, x in enumerate(arr)}
# {10: 0, 20: 1, 30: 2, 40: 3, 50: 4}
```

---

## 3. zip() — Duyệt nhiều list cùng lúc

```python
names = ["Alice", "Bob", "Charlie"]
scores = [90, 85, 95]

# Duyệt 2 list cùng lúc
for name, score in zip(names, scores):
    print(f"{name}: {score}")
# Alice: 90
# Bob: 85
# Charlie: 95
```

### zip() với nhiều list

```python
a = [1, 2, 3]
b = [4, 5, 6]
c = [7, 8, 9]

for x, y, z in zip(a, b, c):
    print(x, y, z)
# 1 4 7
# 2 5 8
# 3 6 9
```

### Tạo list từ zip

```python
names = ["Alice", "Bob", "Charlie"]
scores = [90, 85, 95]

# Tạo list tuple
pairs = list(zip(names, scores))
# [("Alice", 90), ("Bob", 85), ("Charlie", 95)]

# Unzip
names_unzipped, scores_unzipped = zip(*pairs)
```

### zip_longest — Khi list không cùng độ dài

```python
from itertools import zip_longest

a = [1, 2, 3]
b = [4, 5]

# zip: dừng ở list ngắn nhất
print(list(zip(a, b)))        # [(1, 4), (2, 5)]

# zip_longest: điền fillvalue cho phần thiếu
print(list(zip_longest(a, b, fillvalue=0)))  # [(1, 4), (2, 5), (3, 0)]
```

---

## 4. List Comprehension — Tạo list nhanh

### 4.1. Cơ bản

```python
# Cách 1: Vòng lặp thường
arr = []
for i in range(10):
    arr.append(i * 2)

# Cách 2: List comprehension (ngắn hơn)
arr = [i * 2 for i in range(10)]
# [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
```

### 4.2. Với điều kiện

```python
# Lọc số chẵn
arr = [i for i in range(20) if i % 2 == 0]
# [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# Lọc và biến đổi
arr = [x ** 2 for x in range(10) if x % 2 == 1]
# [1, 9, 25, 49, 81] — bình phương số lẻ

# if-else (điều kiện ở TRƯỚC for)
arr = ["Chan" if x % 2 == 0 else "Le" for x in range(5)]
# ["Chan", "Le", "Chan", "Le", "Chan"]
```

!!! tip "Vị trí if-else trong comprehension"
    ```python
    # if ở SAU for: LỌC phần tử
    [x for x in arr if x > 0]
    
    # if-else ở TRƯỚC for: BIẾN ĐỔI phần tử
    [x if x > 0 else 0 for x in arr]
    ```

### 4.3. Comprehension lồng nhau

```python
# Flatten 2D → 1D
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [x for row in matrix for x in row]
# [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Tạo 2D array
matrix = [[i * j for j in range(1, 10)] for i in range(1, 10)]

# Transpose matrix
transposed = [[row[i] for row in matrix] for i in range(len(matrix[0]))]
```

### 4.4. Dictionary comprehension

```python
# Tạo dict từ list
arr = [1, 2, 3, 4, 5]
d = {x: x**2 for x in arr}
# {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# Đếm tần suất
s = "abracadabra"
freq = {c: s.count(c) for c in set(s)}
# {'a': 5, 'b': 2, 'r': 2, 'c': 1, 'd': 1}
```

### 4.5. Set comprehension

```python
arr = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
unique = {x for x in arr}
# {1, 2, 3, 4}

# Chữ số cuối
last_digits = {x % 10 for x in [12, 23, 34, 45, 56]}
# {2, 3, 4, 5, 6}
```

---

## 5. Generator Expression — Tiết kiệm bộ nhớ

```python
# List comprehension: tạo toàn bộ list trong bộ nhớ
arr = [i ** 2 for i in range(10**6)]  # Tốn bộ nhớ!

# Generator expression: tạo từng phần tử khi cần
gen = (i ** 2 for i in range(10**6))  # Tiết kiệm bộ nhớ!

# Dùng generator với hàm tích hợp
total = sum(i ** 2 for i in range(10**6))  # Không tạo list trung gian
max_val = max(i ** 2 for i in range(10**6))
```

!!! tip "Khi nào dùng generator?"
    - Dùng generator khi chỉ cần **duyệt qua 1 lần** (sum, max, min, any, all)
    - Dùng list comprehension khi cần **truy cập nhiều lần** hoặc **lưu trữ**

---

## 6. map(), filter(), reduce()

### 6.1. map() — Áp dụng hàm cho mỗi phần tử

```python
arr = [1, 2, 3, 4, 5]

# Cách 1: List comprehension
squares = [x ** 2 for x in arr]

# Cách 2: map + lambda
squares = list(map(lambda x: x ** 2, arr))

# map với nhiều list
a = [1, 2, 3]
b = [4, 5, 6]
sums = list(map(lambda x, y: x + y, a, b))
# [5, 7, 9]

# map với hàm sẵn có
arr = list(map(int, input().split()))  # Đọc mảng số nguyên
```

### 6.2. filter() — Lọc phần tử

```python
arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Cách 1: List comprehension
evens = [x for x in arr if x % 2 == 0]

# Cách 2: filter + lambda
evens = list(filter(lambda x: x % 2 == 0, arr))
# [2, 4, 6, 8, 10]
```

### 6.3. reduce() — Gộp phần tử

```python
from functools import reduce

arr = [1, 2, 3, 4, 5]

# Tổng
total = reduce(lambda a, b: a + b, arr)  # 15

# Tích
product = reduce(lambda a, b: a * b, arr)  # 120

# Tìm max
max_val = reduce(lambda a, b: a if a > b else b, arr)  # 5
```

---

## 7. Vòng lặp lồng nhau — Tư duy

### 7.1. Duyệt matrix

```python
n, m = 3, 4

# Duyệt từng hàng
for i in range(n):
    for j in range(m):
        print(f"({i},{j})", end=" ")
    print()
```

### 7.2. Duyệt tất cả cặp

```python
n = 5

# Tất cả cặp (i, j) với i < j
for i in range(n):
    for j in range(i + 1, n):
        print(f"({i}, {j})", end=" ")

# Tất cả cặp (i, j) với i != j
for i in range(n):
    for j in range(n):
        if i != j:
            print(f"({i}, {j})", end=" ")
```

### 7.3. Duyệt 4 hướng

```python
dx = [0, 0, 1, -1]
dy = [1, -1, 0, 0]

x, y = 1, 2
for k in range(4):
    nx, ny = x + dx[k], y + dy[k]
    print(f"({nx}, {ny})")
```

### 7.4. Duyệt 8 hướng

```python
dx = [-1, -1, -1, 0, 0, 1, 1, 1]
dy = [-1, 0, 1, -1, 1, -1, 0, 1]

x, y = 1, 2
for k in range(8):
    nx, ny = x + dx[k], y + dy[k]
    print(f"({nx}, {ny})")
```

### 7.5. Sinh tổ hợp

```python
# Sinh tất cả tổ hợp chập k của n phần tử
def combinations(arr, k, start=0, current=[]):
    if len(current) == k:
        print(current)
        return
    for i in range(start, len(arr)):
        combinations(arr, k, i + 1, current + [arr[i]])

combinations([1, 2, 3, 4], 2)
# [1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]
```

---

## 8. any() và all()

```python
arr = [1, 2, 3, 4, 5]

# any: có ít nhất 1 True
print(any(x > 3 for x in arr))   # True
print(any(x > 10 for x in arr))  # False

# all: tất cả đều True
print(all(x > 0 for x in arr))   # True
print(all(x > 3 for x in arr))   # False

# Ứng dụng
if any(x < 0 for x in arr):
    print("Co so am")

if all(x % 2 == 0 for x in arr):
    print("Tat ca deu chan")
```

---

## 9. sorted() với key

```python
arr = [3, 1, 4, 1, 5, 9, 2, 6]

# Sắp xếp tăng dần
sorted_arr = sorted(arr)

# Sắp xếp giảm dần
sorted_arr = sorted(arr, reverse=True)

# Sắp xếp theo key
words = ["banana", "apple", "cherry", "date"]
sorted_words = sorted(words, key=len)  # Theo độ dài
# ["date", "apple", "banana", "cherry"]

# Sắp xếp theo nhiều tiêu chí
students = [("Alice", 90), ("Bob", 85), ("Charlie", 90)]
sorted_students = sorted(students, key=lambda x: (-x[1], x[0]))
# [("Charlie", 90), ("Alice", 90), ("Bob", 85)]
```

---

## 10. Pattern thường gặp trong thi đấu

### 10.1. Prefix sum (Tổng tiền tố)

```python
arr = [1, 2, 3, 4, 5]

# Tạo prefix sum
prefix = [0] * (len(arr) + 1)
for i in range(len(arr)):
    prefix[i + 1] = prefix[i] + arr[i]

# Tổng đoạn [l, r] = prefix[r+1] - prefix[l]
def range_sum(l, r):
    return prefix[r + 1] - prefix[l]

print(range_sum(1, 3))  # 2 + 3 + 4 = 9
```

### 10.2. Đếm tần suất

```python
arr = [1, 2, 2, 3, 3, 3]

# Cách 1: Dict
freq = {}
for x in arr:
    freq[x] = freq.get(x, 0) + 1

# Cách 2: Counter
from collections import Counter
freq = Counter(arr)
```

### 10.3. Tìm max/min với index

```python
arr = [3, 1, 4, 1, 5, 9, 2, 6]

# Tìm max và index
max_val = max(arr)
max_idx = arr.index(max_val)

# Hoặc dùng enumerate
max_idx, max_val = max(enumerate(arr), key=lambda x: x[1])
```

### 10.4. Duyệt ngược

```python
arr = [1, 2, 3, 4, 5]

# Cách 1: reversed()
for x in reversed(arr):
    print(x, end=" ")  # 5 4 3 2 1

# Cách 2: range ngược
for i in range(len(arr) - 1, -1, -1):
    print(arr[i], end=" ")  # 5 4 3 2 1

# Cách 3: Slice
for x in arr[::-1]:
    print(x, end=" ")  # 5 4 3 2 1
```

---

## 11. Lưu ý / Cạm bẫy hay gặp

### Bẫy 1: Comprehension quá phức tạp

```python
# Khó đọc — nên tránh
result = [x if x > 0 else -x if x < 0 else 0 for x in arr if x != 5]

# Nên tách ra
result = []
for x in arr:
    if x == 5:
        continue
    if x > 0:
        result.append(x)
    elif x < 0:
        result.append(-x)
    else:
        result.append(0)
```

### Bẫy 2: Generator chỉ dùng 1 lần

```python
gen = (x for x in range(5))
print(list(gen))  # [0, 1, 2, 3, 4]
print(list(gen))  # [] — đã hết!
```

### Bẫy 3: zip dừng ở list ngắn nhất

```python
a = [1, 2, 3, 4, 5]
b = [10, 20, 30]

print(list(zip(a, b)))  # [(1, 10), (2, 20), (3, 30)]
# Phần tử 4, 5 của a bị bỏ!
```

### Bẫy 4: Comprehension tạo 2D array sai

```python
# SAI: Tất cả các hàng cùng tham chiếu
matrix = [[0] * 3] * 3
matrix[0][0] = 1
print(matrix)  # [[1, 0, 0], [1, 0, 0], [1, 0, 0]] — SAI!

# ĐÚNG
matrix = [[0] * 3 for _ in range(3)]
matrix[0][0] = 1
print(matrix)  # [[1, 0, 0], [0, 0, 0], [0, 0, 0]]
```

---

## 12. Bài tập thực hành

### Bài 1: Tạo list bình phương
Tạo list chứa bình phương của các số từ 1 đến n.

<div class="cp-pg" data-language="python" data-starter="# Viết code ở đây" data-input="5" data-expected="[1, 4, 9, 16, 25]" data-hint="Dùng list comprehension: [i ** 2 for i in range(1, n + 1)]"></div>

??? tip "Lời giải"
    ```python
    n = int(input())
    arr = [i ** 2 for i in range(1, n + 1)]
    print(arr)
    ```

### Bài 2: Lọc số chẵn
Cho list arr. Lọc ra các số chẵn.

<div class="cp-pg" data-language="python" data-starter="# Viết code ở đây" data-input="1 2 3 4 5" data-expected="[2, 4]" data-hint="Dùng list comprehension với điều kiện if x % 2 == 0"></div>

??? tip "Lời giải"
    ```python
    arr = list(map(int, input().split()))
    evens = [x for x in arr if x % 2 == 0]
    print(evens)
    ```

### Bài 3: Tổng 2 vector
Cho 2 vector a, b. Tạo vector c = a + b.

<div class="cp-pg" data-language="python" data-starter="# Viết code ở đây" data-input="1 2 3
4 5 6" data-expected="[5, 7, 9]" data-hint="Dùng zip() hoặc list comprehension: [x + y for x, y in zip(a, b)]"></div>

??? tip "Lời giải"
    ```python
    a = list(map(int, input().split()))
    b = list(map(int, input().split()))
    c = [x + y for x, y in zip(a, b)]
    print(c)
    ```

### Bài 4: Đếm số dương
Cho mảng arr. Đếm số phần tử dương.

<div class="cp-pg" data-language="python" data-starter="# Viết code ở đây" data-input="-1 2 -3 4 -5" data-expected="2" data-hint="Dùng sum(1 for x in arr if x &gt; 0) hoặc len([x for x in arr if x &gt; 0])"></div>

??? tip "Lời giải"
    ```python
    arr = list(map(int, input().split()))
    print(sum(1 for x in arr if x > 0))
    # Hoặc: print(len([x for x in arr if x > 0]))
    ```

### Bài 5: Tạo ma trận đơn vị
Tạo ma trận đơn vị kích thước n × n.

<div class="cp-pg" data-language="python" data-starter="# Viết code ở đây" data-input="3" data-expected="1 0 0
0 1 0
0 0 1" data-hint="Dùng list comprehension lồng: [[1 if i == j else 0 for j in range(n)] for i in range(n)]"></div>

??? tip "Lời giải"
    ```python
    n = int(input())
    matrix = [[1 if i == j else 0 for j in range(n)] for i in range(n)]
    for row in matrix:
        print(*row)
    ```

---

## 13. Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Missing Number](https://cses.fi/problemset/task/1083) | CSES | ⭐ | enumerate, tìm kiếm |
| [CSES - Distinct Numbers](https://cses.fi/problemset/task/1621) | CSES | ⭐ | Set comprehension |
| [CSES - Apartments](https://cses.fi/problemset/task/1084) | CSES | ⭐⭐ | sorted, two pointers |

---

## Bài viết liên quan

- [← P06: Vòng lặp — Cơ bản](P06-vong-lap-co-ban.md)
- [P08: String →](P08-string.md)

---

**Bài trước:** [P06: Vòng lặp — Cơ bản](P06-vong-lap-co-ban.md)<br>
**Bài tiếp theo:** [P08: String →](P08-string.md)
