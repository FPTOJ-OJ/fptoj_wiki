# P19: Kỹ thuật thi đấu Python

> **Tác giả:** Hà Trí Kiên<br>
> **Chủ đề:** Template, pattern, trick, tối ưu code cho thi đấu

---

## 1. Tổng quan

Bài này tổng hợp các **kỹ thuật, pattern, trick** thường dùng trong thi đấu Python.

---

## 2. Template thi đấu

```python
import sys
from collections import *
from functools import *
from heapq import *
from bisect import *
from itertools import *
from math import *

input = sys.stdin.readline
sys.setrecursionlimit(10**6)

# ===== HÀM PHỤ =====
def solve():
    pass

# ===== MAIN =====
def main():
    t = int(input())
    for _ in range(t):
        solve()

if __name__ == "__main__":
    main()
```

!!! tip "Tại sao cần template?"
    - Tiết kiệm thời gian gõ khi thi đấu
    - Không quên import
    - Có sẵn các hàm phụ trợ

---

## 3. Đọc input nhanh

```python
import sys
input = sys.stdin.readline

# Đọc 1 số
n = int(input())

# Đọc nhiều số trên 1 dòng
a, b, c = map(int, input().split())

# Đọc mảng
arr = list(map(int, input().split()))

# Đọc matrix
matrix = [list(map(int, input().split())) for _ in range(n)]

# Đọc đến hết input (EOF)
for line in sys.stdin:
    a, b = map(int, line.split())
    print(a + b)
```

---

## 4. In output nhanh

```python
# Cách 1: print thông thường
print(result)

# Cách 2: In nhiều giá trị trên 1 dòng
print(*arr)

# Cách 3: In mảng trên 1 dòng, cách nhau bởi space
print(" ".join(map(str, arr)))

# Cách 4: In từng phần tử trên 1 dòng
print("\n".join(map(str, arr)))

# Cách 5: Ghi đè print (nhanh nhất)
import sys
print = sys.stdout.write
# Nhưng phải in string, không tự xuống dòng
```

---

## 5. Các pattern thường gặp

### 5.1. Đọc n testcase

```python
t = int(input())
for _ in range(t):
    n = int(input())
    arr = list(map(int, input().split()))
    # Xử lý...
    print(result)
```

### 5.2. Prefix sum

```python
n = int(input())
arr = list(map(int, input().split()))

prefix = [0] * (n + 1)
for i in range(n):
    prefix[i + 1] = prefix[i] + arr[i]

# Tổng đoạn [l, r]
def range_sum(l, r):
    return prefix[r + 1] - prefix[l]
```

### 5.3. Prefix sum 2D

```python
n, m = map(int, input().split())
matrix = [list(map(int, input().split())) for _ in range(n)]

prefix = [[0] * (m + 1) for _ in range(n + 1)]
for i in range(n):
    for j in range(m):
        prefix[i + 1][j + 1] = matrix[i][j] + prefix[i][j + 1] + prefix[i + 1][j] - prefix[i][j]

def rect_sum(r1, c1, r2, c2):
    return prefix[r2 + 1][c2 + 1] - prefix[r1][c2 + 1] - prefix[r2 + 1][c1] + prefix[r1][c1]
```

### 5.4. Two Pointers

```python
arr = sorted(list(map(int, input().split())))
target = int(input())

left, right = 0, len(arr) - 1
while left < right:
    s = arr[left] + arr[right]
    if s == target:
        print("Found")
        break
    elif s < target:
        left += 1
    else:
        right -= 1
```

### 5.5. Sliding Window

```python
arr = list(map(int, input().split()))
k = int(input())

window_sum = sum(arr[:k])
max_sum = window_sum

for i in range(k, len(arr)):
    window_sum += arr[i] - arr[i - k]
    max_sum = max(max_sum, window_sum)

print(max_sum)
```

### 5.6. BFS

```python
from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    result = []
    
    while queue:
        node = queue.popleft()
        result.append(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return result
```

### 5.7. DFS

```python
def dfs(graph, node, visited):
    visited.add(node)
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
```

---

## 6. Trick thi đấu

### 6.1. Đọc input nhanh nhất

```python
import sys
data = sys.stdin.buffer.read().split()
idx = 0

def next_int():
    global idx
    val = int(data[idx])
    idx += 1
    return val

n = next_int()
arr = [next_int() for _ in range(n)]
```

### 6.2. In output nhanh nhất

```python
import sys
output = []

for _ in range(n):
    output.append(str(result))

sys.stdout.write("\n".join(output) + "\n")
```

### 6.3. Tạo alphabet

```python
import string
print(string.ascii_lowercase)  # "abcdefghijklmnopqrstuvwxyz"
print(string.ascii_uppercase)  # "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
print(string.digits)           # "0123456789"
```

### 6.4. Đếm tần suất nhanh

```python
from collections import Counter
cnt = Counter(arr)
```

### 6.5. Nhóm phần tử nhanh

```python
from collections import defaultdict
groups = defaultdict(list)
for x in arr:
    groups[key(x)].append(x)
```

### 6.6. Tìm kiếm nhị phân

```python
from bisect import bisect_left, bisect_right

# Tìm vị trí đầu tiên >= x
pos = bisect_left(arr, x)

# Tìm vị trí đầu tiên > x
pos = bisect_right(arr, x)
```

### 6.7. Heap

```python
import heapq

# Min-heap
heap = []
heapq.heappush(heap, x)
min_val = heapq.heappop(heap)

# Top-K
top_k = heapq.nlargest(k, arr)
```

### 6.8. Tổ hợp, hoán vị

```python
from itertools import permutations, combinations, product

# Hoán vị
for perm in permutations(arr):
    pass

# Tổ hợp
for comb in combinations(arr, k):
    pass

# Tích Descartes
for bits in product([0, 1], repeat=n):
    pass
```

### 6.9. GCD, LCM

```python
from math import gcd
from functools import reduce

# GCD nhiều số
g = reduce(gcd, arr)

# LCM
def lcm(a, b):
    return a * b // gcd(a, b)

l = reduce(lcm, arr)
```

### 6.10. Lũy thừa modulo

```python
print(pow(base, exp, mod))
```

---

## 7. Mẹo tối ưu

### 7.1. Dùng set thay vì list khi kiểm tra tồn tại

```python
# Chậm: O(n)
if x in arr:
    pass

# Nhanh: O(1)
if x in set(arr):
    pass
```

### 7.2. Dùng defaultdict thay vì dict + get

```python
# Dài
freq = {}
for x in arr:
    freq[x] = freq.get(x, 0) + 1

# Ngắn
from collections import defaultdict
freq = defaultdict(int)
for x in arr:
    freq[x] += 1
```

### 7.3. Dùng Counter thay vì đếm thủ công

```python
# Dài
freq = {}
for x in arr:
    freq[x] = freq.get(x, 0) + 1

# Ngắn
from collections import Counter
freq = Counter(arr)
```

### 7.4. Dùng list comprehension thay vì vòng lặp

```python
# Dài
result = []
for x in arr:
    if x > 0:
        result.append(x ** 2)

# Ngắn
result = [x ** 2 for x in arr if x > 0]
```

### 7.5. Dùng generator khi chỉ cần duyệt 1 lần

```python
# Tốn bộ nhớ
total = sum([x ** 2 for x in range(10**6)])

# Tiết kiệm bộ nhớ
total = sum(x ** 2 for x in range(10**6))
```

---

## 8. Cheat sheet

```python
# ===== IMPORT =====
import sys
from collections import *
from functools import *
from heapq import *
from bisect import *
from itertools import *
from math import *

# ===== INPUT =====
input = sys.stdin.readline
n = int(input())
arr = list(map(int, input().split()))
a, b, c = map(int, input().split())

# ===== OUTPUT =====
print(result)
print(*arr)

# ===== THƯ VIỆN =====
# Counter: Đếm tần suất
cnt = Counter(arr)

# defaultdict: Dict mặc định
dd = defaultdict(int)

# deque: Hàng đợi 2 đầu
dq = deque()

# heapq: Heap
heapq.heappush(heap, x)
heapq.heappop(heap)

# bisect: Tìm kiếm nhị phân
bisect_left(arr, x)
bisect_right(arr, x)

# itertools: Tổ hợp, hoán vị
permutations(arr)
combinations(arr, k)
product([0, 1], repeat=n)

# math: Toán học
gcd(a, b)
isqrt(n)
factorial(n)
comb(n, k)
```

---

## 9. Bài tập thực hành

### Bài 1: Template
Viết template thi đấu Python đầy đủ.

<div class="cp-pg" data-language="python" data-starter="# Viết code ở đây" data-input="1
3
1 2 3" data-expected="6" data-hint="Import sys, collections, functools, heapq, bisect, itertools, math"></div>

???? tip "Lời giải"
    ```python
    import sys
    from collections import *
    from functools import *
    from heapq import *
    from bisect import *
    from itertools import *
    from math import *
    
    input = sys.stdin.readline
    sys.setrecursionlimit(10**6)
    
    def solve():
        n = int(input())
        arr = list(map(int, input().split()))
        print(sum(arr))
    
    t = int(input())
    for _ in range(t):
        solve()
    ```

### Bài 2: Đếm tần suất
Cho mảng arr. Tìm phần tử xuất hiện nhiều nhất.

<div class="cp-pg" data-language="python" data-starter="from collections import Counter
arr = list(map(int, input().split()))" data-input="1 2 2 3 3 3" data-expected="3" data-hint="Dùng Counter(arr).most_common(1)[0][0]"></div>

???? tip "Lời giải"
    ```python
    from collections import Counter
    arr = list(map(int, input().split()))
    cnt = Counter(arr)
    print(cnt.most_common(1)[0][0])
    ```

### Bài 3: Prefix sum
Cho mảng arr. Tính tổng đoạn [l, r].

<div class="cp-pg" data-language="python" data-starter="arr = list(map(int, input().split()))
l, r = map(int, input().split())" data-input="1 2 3 4 5
1 3" data-expected="9" data-hint="Tính prefix sum, kết quả = prefix[r+1] - prefix[l]"></div>

???? tip "Lời giải"
    ```python
    arr = list(map(int, input().split()))
    l, r = map(int, input().split())
    
    prefix = [0]
    for x in arr:
        prefix.append(prefix[-1] + x)
    
    print(prefix[r + 1] - prefix[l])
    ```

---

## 10. Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Weird Algorithm](https://cses.fi/problemset/task/1068) | CSES | ⭐ | Template cơ bản |
| [CSES - Distinct Numbers](https://cses.fi/problemset/task/1621) | CSES | ⭐ | Set, Counter |

---

## Bài viết liên quan

- [← P18: math & Built-in](P18-math-builtins.md)
- [P20: Bài tập tổng hợp →](P20-bai-tap-tong-hop.md)

---

**Bài trước:** [P18: math & Built-in](P18-math-builtins.md)<br>
**Bài tiếp theo:** [P20: Bài tập tổng hợp →](P20-bai-tap-tong-hop.md)
