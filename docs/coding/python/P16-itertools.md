# P16: itertools

> **Tác giả:** Hà Trí Kiên<br>
> **Chủ đề:** permutations, combinations, product, accumulate, chain

---

## 1. Tổng quan

`itertools` là module cung cấp các công cụ **lặp hiệu quả**. Rất hữu ích cho thi đấu.

```python
import itertools
```

---

## 2. permutations — Hoán vị

```python
import itertools

# Tất cả hoán vị
arr = [1, 2, 3]
perms = list(itertools.permutations(arr))
# [(1,2,3), (1,3,2), (2,1,3), (2,3,1), (3,1,2), (3,2,1)]

# Hoán vị chập k
perms = list(itertools.permutations(arr, 2))
# [(1,2), (1,3), (2,1), (2,3), (3,1), (3,2)]

# Duyệt hoán vị
for perm in itertools.permutations(arr):
    print(perm)
```

!!! tip "Số hoán vị"
    - n phần tử: n! hoán vị
    - n phần tử, chập k: n!/(n-k)! hoán vị
    - Cẩn thận khi n lớn (10! = 3,628,800)

---

## 3. combinations — Tổ hợp

```python
import itertools

# Tổ hợp chập k
arr = [1, 2, 3, 4]
combs = list(itertools.combinations(arr, 2))
# [(1,2), (1,3), (1,4), (2,3), (2,4), (3,4)]

# Tổ hợp có lặp (combinations_with_replacement)
combs = list(itertools.combinations_with_replacement(arr, 2))
# [(1,1), (1,2), (1,3), (1,4), (2,2), (2,3), (2,4), (3,3), (3,4), (4,4)]
```

### So sánh

| Hàm | Mô tả | Ví dụ (arr=[1,2,3], k=2) |
|-----|--------|--------------------------|
| `combinations` | Tổ hợp, không lặp, không xét thứ tự | (1,2), (1,3), (2,3) |
| `combinations_with_replacement` | Tổ hợp, có lặp | (1,1), (1,2), (1,3), (2,2), (2,3), (3,3) |
| `permutations` | Hoán vị, không lặp, xét thứ tự | (1,2), (2,1), (1,3), (3,1), (2,3), (3,2) |

---

## 4. product — Tích Descartes

```python
import itertools

# Tích Descartes
a = [1, 2]
b = [3, 4]
c = [5, 6]

# 2 list
print(list(itertools.product(a, b)))
# [(1,3), (1,4), (2,3), (2,4)]

# 3 list
print(list(itertools.product(a, b, c)))
# [(1,3,5), (1,3,6), (1,4,5), (1,4,6), (2,3,5), (2,3,6), (2,4,5), (2,4,6)]

# Lặp lại (repeat)
print(list(itertools.product([0, 1], repeat=3)))
# [(0,0,0), (0,0,1), (0,1,0), (0,1,1), (1,0,0), (1,0,1), (1,1,0), (1,1,1)]
```

### Ứng dụng: Sinh tất cả bitmask

```python
import itertools

n = 3
for bits in itertools.product([0, 1], repeat=n):
    print(bits)
# (0,0,0), (0,0,1), (0,1,0), (0,1,1), (1,0,0), (1,0,1), (1,1,0), (1,1,1)
```

---

## 5. accumulate — Tích lũy

```python
import itertools

arr = [1, 2, 3, 4, 5]

# Tổng tích lũy
print(list(itertools.accumulate(arr)))
# [1, 3, 6, 10, 15]

# Tích tích lũy
import operator
print(list(itertools.accumulate(arr, operator.mul)))
# [1, 2, 6, 24, 120]

# Max tích lũy
print(list(itertools.accumulate(arr, max)))
# [1, 2, 3, 4, 5]

# Prefix sum (tương đương)
prefix = [0]
for x in arr:
    prefix.append(prefix[-1] + x)
```

---

## 6. chain — Nối iterators

```python
import itertools

a = [1, 2, 3]
b = [4, 5, 6]
c = [7, 8, 9]

# Nối 2 list
print(list(itertools.chain(a, b)))
# [1, 2, 3, 4, 5, 6]

# Nối nhiều list
print(list(itertools.chain(a, b, c)))
# [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Nối list of lists
lists = [a, b, c]
print(list(itertools.chain.from_iterable(lists)))
# [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

---

## 7. cycle — Lặp vô hạn

```python
import itertools

# Lặp vô hạn
colors = itertools.cycle(["red", "green", "blue"])
for _ in range(6):
    print(next(colors), end=" ")
# red green blue red green blue
```

---

## 8. repeat — Lặp giá trị

```python
import itertools

# Lặp 5 lần số 0
print(list(itertools.repeat(0, 5)))
# [0, 0, 0, 0, 0]
```

---

## 9. groupby — Nhóm phần tử liên tiếp

```python
import itertools

# Nhóm phần tử liên tiếp giống nhau
arr = [1, 1, 2, 2, 2, 3, 1, 1]
for key, group in itertools.groupby(arr):
    print(f"{key}: {list(group)}")
# 1: [1, 1]
# 2: [2, 2, 2]
# 3: [3]
# 1: [1, 1]

# Nhóm theo key
data = [("Alice", 90), ("Bob", 85), ("Charlie", 90)]
data.sort(key=lambda x: x[1])  # Phải sắp xếp trước!
for score, group in itertools.groupby(data, key=lambda x: x[1]):
    print(f"{score}: {[name for name, _ in group]}")
```

!!! warning "groupby yêu cầu dữ liệu đã sắp xếp"
    `groupby` chỉ nhóm các phần tử **liên tiếp** giống nhau. Phải sắp xếp trước nếu muốn nhóm tất cả.

---

## 10. islice — Slicing iterator

```python
import itertools

# Lấy 3 phần tử đầu
arr = range(100)
print(list(itertools.islice(arr, 3)))
# [0, 1, 2]

# Lấy từ index 2 đến 5
print(list(itertools.islice(arr, 2, 5)))
# [2, 3, 4]

# Lấy mỗi 2 phần tử
print(list(itertools.islice(arr, 0, 10, 2)))
# [0, 2, 4, 6, 8]
```

---

## 11. Ứng dụng trong thi đấu

### 11.1. Sinh tất cả hoán vị

```python
import itertools

n = int(input())
arr = list(range(1, n + 1))
for perm in itertools.permutations(arr):
    print(*perm)
```

### 11.2. Sinh tất cả tổ hợp

```python
import itertools

n, k = map(int, input().split())
arr = list(range(1, n + 1))
for comb in itertools.combinations(arr, k):
    print(*comb)
```

### 11.3. Sinh tất cả bitmask

```python
import itertools

n = int(input())
for bits in itertools.product([0, 1], repeat=n):
    print(*bits, sep="")
```

### 11.4. Prefix sum

```python
import itertools

arr = list(map(int, input().split()))
prefix = list(itertools.accumulate(arr))
# prefix[i] = tổng arr[0] + arr[1] + ... + arr[i]
```

---

## 12. So sánh với C++

| Python | C++ | Ghi chú |
|--------|-----|---------|
| `permutations` | `next_permutation` | C++ chỉ sinh từng cái |
| `combinations` | Không có | Phải tự cài |
| `product` | Không có | Phải tự cài |
| `accumulate` | `partial_sum` | Cùng chức năng |
| `chain` | Không có | Phải tự cài |

---

## 13. Lưu ý / Cạm bẫy hay gặp

### Bẫy 1: permutations tăng rất nhanh

```python
# 10! = 3,628,800 — OK
# 12! = 479,001,600 — Quá nhiều!
# 15! — Không bao giờ xong!
```

### Bẫy 2: groupby chỉ nhóm liên tiếp

```python
arr = [1, 2, 1, 2]
groups = list(itertools.groupby(arr))
# [(1, [1]), (2, [2]), (1, [1]), (2, [2])]
# Không phải [(1, [1, 1]), (2, [2, 2])]!
```

### Bẫy 3: Iterator chỉ dùng 1 lần

```python
perms = itertools.permutations([1, 2, 3])
print(list(perms))  # [(1,2,3), (1,3,2), ...]
print(list(perms))  # [] — đã hết!
```

---

## 14. Bài tập thực hành

### Bài 1: Sinh hoán vị
Cho n. Sinh tất cả hoán vị của 1, 2, ..., n.

```python
import itertools

n = int(input())
```

???? tip "Lời giải"
    ```python
    import itertools
    
    n = int(input())
    for perm in itertools.permutations(range(1, n + 1)):
        print(*perm)
    ```

### Bài 2: Sinh tổ hợp
Cho n, k. Sinh tất cả tổ hợp chập k của 1, 2, ..., n.

```python
import itertools

n, k = map(int, input().split())
```

???? tip "Lời giải"
    ```python
    import itertools
    
    n, k = map(int, input().split())
    for comb in itertools.combinations(range(1, n + 1), k):
        print(*comb)
    ```

### Bài 3: Prefix sum
Cho mảng arr. Tính prefix sum.

```python
import itertools

arr = list(map(int, input().split()))
```

???? tip "Lời giải"
    ```python
    import itertools
    
    arr = list(map(int, input().split()))
    prefix = list(itertools.accumulate(arr))
    print(prefix)
    ```

---

## 15. Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Creating Strings](https://cses.fi/problemset/task/1622) | CSES | ⭐⭐ | permutations |
| [CSES - Apple Division](https://cses.fi/problemset/task/1623) | CSES | ⭐⭐ | product, bitmask |

---

## Bài viết liên quan

- [← P15: heapq](P15-heapq.md)
- [P17: bisect →](P17-bisect.md)

---

**Bài trước:** [P15: heapq](P15-heapq.md)<br>
**Bài tiếp theo:** [P17: bisect →](P17-bisect.md)
