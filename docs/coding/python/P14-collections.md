# P14: collections

> **Tác giả:** Hà Trí Kiên<br>
> **Chủ đề:** deque, Counter, defaultdict, OrderedDict, namedtuple

---

## 1. Tổng quan

`collections` là module **cực kỳ quan trọng** trong thi đấu Python. Cung cấp các cấu trúc dữ liệu nâng cao.

```python
from collections import deque, Counter, defaultdict, OrderedDict, namedtuple
```

---

## 2. deque — Hàng đợi hai đầu

deque (double-ended queue) cho phép thêm/xóa ở **cả 2 đầu** với độ phức tạp **O(1)**.

```python
from collections import deque

# Tạo deque
dq = deque()           # Rỗng
dq = deque([1, 2, 3])  # Từ list
```

### Các thao tác

```python
dq = deque([1, 2, 3])

# Thêm
dq.append(4)        # Thêm cuối: [1, 2, 3, 4]
dq.appendleft(0)    # Thêm đầu: [0, 1, 2, 3, 4]

# Xóa
dq.pop()            # Xóa cuối: [0, 1, 2, 3]
dq.popleft()        # Xóa đầu: [1, 2, 3]

# Truy cập
print(dq[0])        # Phần tử đầu: 1
print(dq[-1])       # Phần tử cuối: 3

# Các phương thức khác
dq.extend([4, 5])      # Thêm nhiều cuối
dq.extendleft([0, -1]) # Thêm nhiều đầu (thêm ngược thứ tự!)
dq.rotate(2)           # Quay phải 2 vị trí
dq.rotate(-2)          # Quay trái 2 vị trí
dq.reverse()           # Đảo ngược
dq.clear()             # Xóa tất cả
```

### Ứng dụng: BFS

```python
from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    
    while queue:
        node = queue.popleft()  # O(1)
        print(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
```

### Ứng dụng: Sliding Window Maximum

```python
from collections import deque

def max_sliding_window(arr, k):
    dq = deque()
    result = []
    
    for i in range(len(arr)):
        # Loại bỏ phần tử ngoài cửa sổ
        while dq and dq[0] < i - k + 1:
            dq.popleft()
        
        # Loại bỏ phần tử nhỏ hơn arr[i]
        while dq and arr[dq[-1]] < arr[i]:
            dq.pop()
        
        dq.append(i)
        
        if i >= k - 1:
            result.append(arr[dq[0]])
    
    return result
```

---

## 3. Counter — Đếm tần suất

```python
from collections import Counter

# Tạo Counter
cnt = Counter([1, 2, 2, 3, 3, 3])  # Counter({3:3, 2:2, 1:1})
cnt = Counter("abracadabra")        # Counter({'a':5, 'b':2, 'r':2, 'c':1, 'd':1})

# Truy cập
print(cnt["a"])     # 5
print(cnt["x"])     # 0 (không lỗi)

# most_common
print(cnt.most_common(2))     # [('a', 5), ('b', 2)]
print(cnt.most_common(1)[0])  # ('a', 5)

# Cập nhật
cnt["a"] += 1
cnt.update([1, 2, 3])

# elements
print(list(cnt.elements()))

# Phép toán
cnt1 = Counter(a=3, b=1)
cnt2 = Counter(a=1, b=2)
print(cnt1 + cnt2)   # Counter({'a': 4, 'b': 3})
print(cnt1 - cnt2)   # Counter({'a': 2})
print(cnt1 & cnt2)   # Counter({'a': 1, 'b': 1}) — min
print(cnt1 | cnt2)   # Counter({'a': 3, 'b': 2}) — max
```

---

## 4. defaultdict — Dict với giá trị mặc định

```python
from collections import defaultdict

# defaultdict(int): mặc định 0
dd = defaultdict(int)
dd["a"] += 1      # {"a": 1}
dd["b"] += 1      # {"a": 1, "b": 1}

# defaultdict(list): mặc định []
dd = defaultdict(list)
dd["a"].append(1)  # {"a": [1]}
dd["a"].append(2)  # {"a": [1, 2]}

# defaultdict(set): mặc định set()
dd = defaultdict(set)
dd["a"].add(1)     # {"a": {1}}

# defaultdict(dict): mặc định {}
dd = defaultdict(dict)
dd["a"]["x"] = 1   # {"a": {"x": 1}}
```

### Ứng dụng: Nhóm phần tử

```python
from collections import defaultdict

words = ["apple", "banana", "avocado", "blueberry", "cherry"]

# Nhóm theo chữ cái đầu
groups = defaultdict(list)
for word in words:
    groups[word[0]].append(word)
# {"a": ["apple", "avocado"], "b": ["banana", "blueberry"], "c": ["cherry"]}
```

---

## 5. OrderedDict — Dict giữ thứ tự

```python
from collections import OrderedDict

# Python 3.7+: dict thường cũng giữ thứ tự
d = {"b": 2, "a": 1, "c": 3}
print(list(d.keys()))  # ['b', 'a', 'c']

# OrderedDict có thêm phương thức
od = OrderedDict()
od["b"] = 2
od["a"] = 1
od["c"] = 3

# move_to_end
od.move_to_end("b")        # Đưa "b" xuống cuối
od.move_to_end("c", last=False)  # Đưa "c" lên đầu
```

!!! tip "Trong thi đấu"
    Từ Python 3.7+, `dict` thường đã giữ thứ tự. Ít khi cần `OrderedDict`.

---

## 6. namedtuple — Tuple có tên

```python
from collections import namedtuple

# Tạo namedtuple
Point = namedtuple("Point", ["x", "y"])
p = Point(1, 2)
print(p.x, p.y)  # 1 2

# Nhiều trường
Student = namedtuple("Student", ["name", "age", "score"])
s = Student("Alice", 15, 9.5)

# Tạo từ dict
d = {"name": "Alice", "age": 15}
s = Student(**d, score=9.5)
```

---

## 7. Pattern thường gặp trong thi đấu

### 7.1. Đếm tần suất

```python
from collections import Counter

arr = list(map(int, input().split()))
cnt = Counter(arr)
```

### 7.2. Nhóm phần tử

```python
from collections import defaultdict

arr = list(map(int, input().split()))
groups = defaultdict(list)
for x in arr:
    groups[x % 2].append(x)
```

### 7.3. BFS

```python
from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    while queue:
        node = queue.popleft()
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
```

### 7.4. Sliding Window

```python
from collections import deque

def max_window(arr, k):
    dq = deque()
    result = []
    for i in range(len(arr)):
        while dq and dq[0] < i - k + 1:
            dq.popleft()
        while dq and arr[dq[-1]] < arr[i]:
            dq.pop()
        dq.append(i)
        if i >= k - 1:
            result.append(arr[dq[0]])
    return result
```

---

## 8. So sánh với C++

| Python | C++ | Ghi chú |
|--------|-----|---------|
| `deque` | `deque` | Cùng tên, cùng chức năng |
| `Counter` | Không có | Phải dùng `map` đếm thủ công |
| `defaultdict` | Không có | Phải kiểm tra key trước |
| `OrderedDict` | Không cần | `map` trong C++ đã giữ thứ tự |
| `namedtuple` | `struct` | Tương đương |

---

## 9. Lưu ý / Cạm bẫy hay gặp

### Bẫy 1: deque.rotate()

```python
dq = deque([1, 2, 3, 4, 5])
dq.rotate(2)    # [4, 5, 1, 2, 3] — quay phải
dq.rotate(-2)   # [1, 2, 3, 4, 5] — quay trái
```

### Bẫy 2: defaultdict tự tạo key

```python
dd = defaultdict(int)
dd["a"] += 1  # Tự tạo key "a" với giá trị 0
```

### Bẫy 3: Counter.most_common() trả về list tuple

```python
cnt = Counter([1, 2, 2, 3, 3, 3])
most = cnt.most_common(1)[0]  # (3, 3) — tuple!
```

---

## 10. Bài tập thực hành

### Bài 1: Đếm tần suất
Cho xâu s. Tìm ký tự xuất hiện nhiều nhất.

```python
from collections import Counter
s = input()
# Code của bạn ở đây
```

??? tip "Lời giải"
    ```python
    from collections import Counter
    cnt = Counter(s)
    print(cnt.most_common(1)[0])
    ```

### Bài 2: BFS
Cho đồ thị. Duyệt BFS từ đỉnh start.

```python
from collections import deque

n, m = map(int, input().split())
graph = [[] for _ in range(n)]
for _ in range(m):
    u, v = map(int, input().split())
    graph[u].append(v)
    graph[v].append(u)

start = int(input())
# Code của bạn ở đây
```

??? tip "Lời giải"
    ```python
    from collections import deque
    
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
    
    print(*result)
    ```

### Bài 3: Nhóm từ
Cho list từ. Nhóm các từ có cùng ký tự khi sắp xếp.

```python
from collections import defaultdict

words = input().split()
# Code của bạn ở đây
```

??? tip "Lời giải"
    ```python
    from collections import defaultdict
    
    groups = defaultdict(list)
    for word in words:
        key = ''.join(sorted(word))
        groups[key].append(word)
    
    for group in groups.values():
        print(group)
    ```

---

## 11. Bài tập luyện tập

### Bài 4: Tìm từ xuất hiện nhiều nhất
Cho xâu s gồm nhiều từ cách nhau bởi khoảng trắng. Tìm từ xuất hiện nhiều nhất.

```
Input: apple banana apple cherry banana apple

Output: apple 3
```

```
Input: hello world hello

Output: hello 2
```

```python
from collections import Counter
s = input()
# Code của bạn ở đây
```

??? tip "Lời giải"
    ```python
    from collections import Counter
    
    words = s.split()
    cnt = Counter(words)
    most = cnt.most_common(1)[0]
    print(most[0], most[1])
    ```

### Bài 5: Kiểm tra hai xâu là hoán vị
Cho 2 xâu s1, s2. Kiểm tra s2 có phải hoán vị của s1 không.

```
Input:
abc
cba

Output:
La hoan vi
```

```
Input:
abc
abd

Output:
Khong phai hoan vi
```

```python
from collections import Counter
s1 = input()
s2 = input()
# Code của bạn ở đây
```

??? tip "Lời giải"
    ```python
    from collections import Counter
    
    if Counter(s1) == Counter(s2):
        print("La hoan vi")
    else:
        print("Khong phai hoan vi")
    ```

### Bài 6: Nhóm học sinh theo lớp
Cho n học sinh, mỗi học sinh có tên và lớp. Nhóm các học sinh theo lớp.

```
Input:
4
Alice 10A1
Bob 10A2
Charlie 10A1
David 10A2

Output:
10A1: ['Alice', 'Charlie']
10A2: ['Bob', 'David']
```

```python
from collections import defaultdict
n = int(input())
# Code của bạn ở đây
```

??? tip "Lời giải"
    ```python
    from collections import defaultdict
    
    n = int(input())
    groups = defaultdict(list)
    for _ in range(n):
        name, cls = input().split()
        groups[cls].append(name)
    
    for cls in sorted(groups):
        print(f"{cls}: {groups[cls]}")
    ```

### Bài 7: Tìm ký tự xuất hiện nhiều nhất
Cho xâu s. Tìm ký tự xuất hiện nhiều nhất (không tính khoảng trắng).

```
Input: abracadabra

Output: a 5
```

```
Input: hello world

Output: l 3
```

```python
from collections import Counter
s = input()
# Code của bạn ở đây
```

??? tip "Lời giải"
    ```python
    from collections import Counter
    
    s = s.replace(" ", "")
    cnt = Counter(s)
    most = cnt.most_common(1)[0]
    print(most[0], most[1])
    ```

---

## Bài viết liên quan

- [← P13: Hàm](P13-ham.md)
- [P15: heapq →](P15-heapq.md)

---

**Bài trước:** [P13: Hàm](P13-ham.md)<br>
**Bài tiếp theo:** [P15: heapq →](P15-heapq.md)
