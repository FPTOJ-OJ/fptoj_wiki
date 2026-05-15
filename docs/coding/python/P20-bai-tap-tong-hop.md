# P20: Bài tập tổng hợp

> **Tác giả:** Hà Trí Kiên<br>
> **Chủ đề:** Luyện tập tất cả kiến thức Python cho thi đấu

---

## 1. Tổng quan

Bài này tổng hợp các bài tập **từ dễ đến khó** để luyện tập tất cả kiến thức đã học.

---

## 2. Bài tập cơ bản ⭐

### Bài 1: Tổng dãy số
Cho n số nguyên. Tính tổng.

```
Input:
5
1 2 3 4 5

Output:
15
```

```python
# Code của bạn ở đây
```

??? tip "Lời giải"
    ```python
    n = int(input())
    arr = list(map(int, input().split()))
    print(sum(arr))
    ```

### Bài 2: Tìm số lớn nhất
Cho n số nguyên. Tìm số lớn nhất.

```
Input:
5
3 1 4 1 5

Output:
5
```

```python
# Code của bạn ở đây
```

??? tip "Lời giải"
    ```python
    n = int(input())
    arr = list(map(int, input().split()))
    print(max(arr))
    ```

### Bài 3: Đếm chẵn lẻ
Cho n số nguyên. Đếm số chẵn và số lẻ.

```
Input:
5
1 2 3 4 5

Output:
2 3
```

```python
# Code của bạn ở đây
```

??? tip "Lời giải"
    ```python
    n = int(input())
    arr = list(map(int, input().split()))
    even = sum(1 for x in arr if x % 2 == 0)
    odd = n - even
    print(even, odd)
    ```

### Bài 4: Đảo ngược mảng
Cho n số nguyên. In ra mảng đảo ngược.

```
Input:
5
1 2 3 4 5

Output:
5 4 3 2 1
```

```python
# Code của bạn ở đây
```

??? tip "Lời giải"
    ```python
    n = int(input())
    arr = list(map(int, input().split()))
    print(*arr[::-1])
    ```

### Bài 5: Tìm kiếm
Cho n số nguyên và target. Tìm vị trí đầu tiên của target.

```
Input:
5
1 2 3 4 5
3

Output:
2
```

```python
# Code của bạn ở đây
```

??? tip "Lời giải"
    ```python
    n = int(input())
    arr = list(map(int, input().split()))
    target = int(input())
    
    for i, x in enumerate(arr):
        if x == target:
            print(i)
            break
    else:
        print(-1)
    ```

---

## 3. Bài tập trung bình ⭐⭐

### Bài 6: Two Sum
Cho n số nguyên và target. Tìm 2 số có tổng bằng target.

```
Input:
5
2 7 11 15 1
9

Output:
0 1
```

```python
# Code của bạn ở đây
```

??? tip "Lời giải"
    ```python
    n = int(input())
    arr = list(map(int, input().split()))
    target = int(input())
    
    seen = {}
    for i, x in enumerate(arr):
        complement = target - x
        if complement in seen:
            print(seen[complement], i)
            break
        seen[x] = i
    ```

### Bài 7: Đếm tần suất
Cho xâu s. Tìm ký tự xuất hiện nhiều nhất.

```
Input:
abracadabra

Output:
a 5
```

```python
# Code của bạn ở đây
```

??? tip "Lời giải"
    ```python
    from collections import Counter
    s = input()
    cnt = Counter(s)
    most = cnt.most_common(1)[0]
    print(most[0], most[1])
    ```

### Bài 8: Sắp xếp theo tổng chữ số
Cho n số nguyên. Sắp xếp theo tổng chữ số tăng dần.

```
Input:
5
123 45 6 789 10

Output:
10 6 45 123 789
```

```python
# Code của bạn ở đây
```

??? tip "Lời giải"
    ```python
    n = int(input())
    arr = list(map(int, input().split()))
    
    def digit_sum(n):
        return sum(int(d) for d in str(abs(n)))
    
    arr.sort(key=lambda x: (digit_sum(x), x))
    print(*arr)
    ```

### Bài 9: Longest Increasing Subsequence
Cho mảng arr. Tìm độ dài dãy con tăng dài nhất.

```
Input:
8
10 9 2 5 3 7 101 18

Output:
4
```

```python
# Code của bạn ở đây
```

??? tip "Lời giải"
    ```python
    import bisect
    
    n = int(input())
    arr = list(map(int, input().split()))
    
    tails = []
    for x in arr:
        pos = bisect.bisect_left(tails, x)
        if pos == len(tails):
            tails.append(x)
        else:
            tails[pos] = x
    
    print(len(tails))
    ```

### Bài 10: BFS trên grid
Cho grid n × m. Tìm đường đi ngắn nhất từ (0,0) đến (n-1,m-1).

```
Input:
3 3
...
.#.
...

Output:
4
```

```python
# Code của bạn ở đây
```

??? tip "Lời giải"
    ```python
    from collections import deque
    
    n, m = map(int, input().split())
    grid = [input() for _ in range(n)]
    
    dx = [0, 0, 1, -1]
    dy = [1, -1, 0, 0]
    
    dist = [[-1] * m for _ in range(n)]
    dist[0][0] = 0
    queue = deque([(0, 0)])
    
    while queue:
        x, y = queue.popleft()
        for k in range(4):
            nx, ny = x + dx[k], y + dy[k]
            if 0 <= nx < n and 0 <= ny < m and grid[nx][ny] == '.' and dist[nx][ny] == -1:
                dist[nx][ny] = dist[x][y] + 1
                queue.append((nx, ny))
    
    print(dist[n-1][m-1])
    ```

---

## 4. Bài tập nâng cao ⭐⭐⭐

### Bài 11: Dijkstra
Cho đồ thị có trọng số. Tìm đường đi ngắn nhất từ đỉnh start.

```
Input:
4 5
0 1 1
0 2 5
1 2 2
1 3 6
2 3 2
0

Output:
0 1 3 5
```

```python
# Code của bạn ở đây
```

??? tip "Lời giải"
    ```python
    import heapq
    
    n, m = map(int, input().split())
    graph = [[] for _ in range(n)]
    for _ in range(m):
        u, v, w = map(int, input().split())
        graph[u].append((v, w))
        graph[v].append((u, w))
    
    start = int(input())
    
    dist = [float('inf')] * n
    dist[start] = 0
    pq = [(0, start)]
    
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue
        for v, w in graph[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(pq, (dist[v], v))
    
    print(*dist)
    ```

### Bài 12: Prefix sum 2D
Cho matrix n × m. Tính tổng hình chữ nhật (r1,c1) → (r2,c2).

```
Input:
3 3
1 2 3
4 5 6
7 8 9
1 1 2 2

Output:
28
```

```python
# Code của bạn ở đây
```

??? tip "Lời giải"
    ```python
    n, m = map(int, input().split())
    matrix = [list(map(int, input().split())) for _ in range(n)]
    
    prefix = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(n):
        for j in range(m):
            prefix[i + 1][j + 1] = matrix[i][j] + prefix[i][j + 1] + prefix[i + 1][j] - prefix[i][j]
    
    r1, c1, r2, c2 = map(int, input().split())
    result = prefix[r2 + 1][c2 + 1] - prefix[r1][c2 + 1] - prefix[r2 + 1][c1] + prefix[r1][c1]
    print(result)
    ```

### Bài 13: Tổ hợp modulo
Tính C(n, k) % (10^9 + 7).

```
Input:
10 3

Output:
120
```

```python
# Code của bạn ở đây
```

??? tip "Lời giải"
    ```python
    MOD = 10**9 + 7
    
    def power_mod(base, exp, mod):
        result = 1
        base %= mod
        while exp > 0:
            if exp % 2 == 1:
                result = result * base % mod
            exp //= 2
            base = base * base % mod
        return result
    
    def mod_inverse(a, mod):
        return power_mod(a, mod - 2, mod)
    
    def comb_mod(n, k, mod):
        if k > n or k < 0:
            return 0
        if k == 0 or k == n:
            return 1
        
        num = 1
        den = 1
        for i in range(k):
            num = num * (n - i) % mod
            den = den * (i + 1) % mod
        
        return num * mod_inverse(den, mod) % mod
    
    n, k = map(int, input().split())
    print(comb_mod(n, k, MOD))
    ```

---

## 5. Bài tập luyện tập trên CSES

| # | Bài | Độ khó | Chủ đề |
|---|-----|--------|--------|
| 1 | [Weird Algorithm](https://cses.fi/problemset/task/1068) | ⭐ | Vòng lặp |
| 2 | [Missing Number](https://cses.fi/problemset/task/1083) | ⭐ | Mảng |
| 3 | [Repetitions](https://cses.fi/problemset/task/1069) | ⭐ | String |
| 4 | [Increasing Array](https://cses.fi/problemset/task/1094) | ⭐ | Mảng |
| 5 | [Permutations](https://cses.fi/problemset/task/1070) | ⭐ | Logic |
| 6 | [Number Spiral](https://cses.fi/problemset/task/1071) | ⭐⭐ | Toán học |
| 7 | [Two Sets](https://cses.fi/problemset/task/1092) | ⭐⭐ | Logic |
| 8 | [Bit Strings](https://cses.fi/problemset/task/1617) | ⭐⭐ | Lũy thừa modulo |
| 9 | [Trailing Zeros](https://cses.fi/problemset/task/1618) | ⭐⭐ | Toán học |
| 10 | [Coin Piles](https://cses.fi/problemset/task/1754) | ⭐⭐ | Logic |
| 11 | [Palindrome Reorder](https://cses.fi/problemset/task/1755) | ⭐⭐ | String, Counter |
| 12 | [Creating Strings](https://cses.fi/problemset/task/1622) | ⭐⭐ | permutations |
| 13 | [Apple Division](https://cses.fi/problemset/task/1623) | ⭐⭐ | Bitmask |
| 14 | [Chessboard and Queens](https://cses.fi/problemset/task/1624) | ⭐⭐ | Backtracking |
| 15 | [Raab Game I](https://cses.fi/problemset/task/1685) | ⭐⭐ | Logic |
| 16 | [Distinct Numbers](https://cses.fi/problemset/task/1621) | ⭐ | Set |
| 17 | [Apartments](https://cses.fi/problemset/task/1084) | ⭐⭐ | Sort, Two Pointers |
| 18 | [Ferris Wheel](https://cses.fi/problemset/task/1090) | ⭐⭐ | Sort, Greedy |
| 19 | [Concert Tickets](https://cses.fi/problemset/task/1091) | ⭐⭐ | Multiset |
| 20 | [Sum of Two Values](https://cses.fi/problemset/task/1640) | ⭐⭐ | Dict, Two Sum |

---

## 6. Lộ trình học đề xuất

### Tuần 1-2: Cơ bản
```
Bài 1-5 (CSES)
```

### Tuần 3-4: Trung bình
```
Bài 6-10 (CSES)
```

### Tuần 5-6: Nâng cao
```
Bài 11-15 (CSES)
```

### Tuần 7-8: Thi đấu
```
Bài 16-20 (CSES)
```

---

## Bài viết liên quan

- [← P19: Kỹ thuật thi đấu Python](P19-ky-thuat-thi-dau.md)
- [Chương 2: C++ cho Thi Đấu →](../cpp/index.md)

---

**Bài trước:** [P19: Kỹ thuật thi đấu Python](P19-ky-thuat-thi-dau.md)<br>
**Bài tiếp theo:** [Chương 2: C++ cho Thi Đấu →](../cpp/index.md)
