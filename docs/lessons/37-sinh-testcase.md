# Bài 37: Sinh Testcase & Stress Test

> **Tác giả:** Hà Trí Kiên<br>
> **Nội dung tham khảo từ:** Codeforces blogs, USACO Guide

## 1. Tại sao phải sinh testcase?

Bạn code xong, submit → WA (Wrong Answer). Nhưng sample test chạy đúng! Vậy lỗi ở test nào?

**Sinh testcase** = tạo input ngẫu nhiên, so sánh output của code bạn với code brute force → tìm test mà code bạn SAI!

```
Code bạn (O(N log N))  ← có thể có bug
Code brute force (O(N²)) ← chắc chắn đúng (đơn giản)

Sinh testcase ngẫu nhiên → chạy cả 2 → so output
→ Nếu khác nhau → TÌM RA BUG!
```

---

## 2. Sinh testcase cơ bản trong C++

### 2.1. Sinh số ngẫu nhiên

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    mt19937 rng(chrono::steady_clock::now().time_since_epoch().count());
    int randInt(int l, int r) {
        return uniform_int_distribution<int>(l, r)(rng);
    }
    
    // Sinh số ngẫu nhiên trong [a, b]
    int a = 1, b = 100;
    int random_num = randInt(a, b);
    cout << random_num << endl;
    
    // Sinh mảng ngẫu nhiên
    int n = 10;
    vector<int> arr(n);
    for (int i = 0; i < n; i++)
        arr[i] = randInt(1, 100);
    
    // In testcase
    cout << n << endl;
    for (int x : arr) cout << x << " ";
    cout << endl;
}
```

### 2.2. Sinh testcase cho bài tìm kiếm nhị phân

```cpp
// Sinh testcase cho Binary Search
void genBinarySearch() {
    int n = randInt(1, 100);  // 1 ≤ n ≤ 100
    int target = randInt(1, 1000);
    
    vector<int> arr(n);
    for (int i = 0; i < n; i++)
        arr[i] = randInt(1, 1000);
    sort(arr.begin(), arr.end());  // Đảm bảo mảng tăng dần
    
    // In testcase
    cout << n << " " << target << endl;
    for (int x : arr) cout << x << " ";
    cout << endl;
}
```

### 2.3. Sinh testcase cho bài đồ thị

```cpp
// Sinh cây ngẫu nhiên (N đỉnh, N-1 cạnh)
void genTree() {
    int n = randInt(2, 11);  // 2 ≤ n ≤ 11
    
    cout << n << endl;
    for (int i = 2; i <= n; i++) {
        int parent = randInt(1, i - 1);  // Cha ngẫu nhiên từ 1..i-1
        cout << parent << " " << i << " " << randInt(1, 100) << endl;
    }
}

// Sinh đồ thị ngẫu nhiên (có thể có chu trình)
void genGraph() {
    int n = randInt(2, 10);
    int m = randInt(n - 1, n * (n-1) / 2);
    
    cout << n << " " << m << endl;
    for (int i = 0; i < m; i++) {
        int u = randInt(1, n);
        int v = randInt(1, n);
        int w = randInt(1, 100);
        cout << u << " " << v << " " << w << endl;
    }
}
```

---

## 3. Sinh testcase trong Python

```python
import random

def gen_array(n_min=1, n_max=10, val_min=1, val_max=100):
    """Sinh mảng ngẫu nhiên"""
    n = random.randint(n_min, n_max)
    arr = [random.randint(val_min, val_max) for _ in range(n)]
    return n, arr

def gen_tree(n):
    """Sinh cây ngẫu nhiên (Prüfer sequence)"""
    edges = []
    for i in range(2, n + 1):
        parent = random.randint(1, i - 1)
        edges.append((parent, i))
    return edges

def gen_string(length_min=1, length_max=10, charset='abc'):
    """Sinh xâu ngẫu nhiên"""
    length = random.randint(length_min, length_max)
    return ''.join(random.choices(charset, k=length))

# Ví dụ: Sinh testcase cho bài đếm
n, arr = gen_array(1, 5, 1, 10)
print(n)
print(*arr)
```

---

## 4. Stress Test — Kỹ thuật tìm bug hiệu quả nhất

### 4.1. Stress Test là gì?

```
Lặp lại N lần:
  1. Sinh testcase ngẫu nhiên
  2. Chạy code "đúng" (brute force) → expected
  3. Chạy code "cần test" → actual
  4. Nếu expected ≠ actual → IN RA TESTCASE ĐÓ → DEBUG!
```

### 4.2. Template Stress Test C++

```cpp
#include <bits/stdc++.h>
using namespace std;

// ===== Code brute force (chắc chắn đúng) =====
long long bruteForce(vector<int>& a) {
    // Ví dụ: tìm max subarray sum - O(N²)
    long long maxSum = LLONG_MIN;
    for (int i = 0; i < a.size(); i++) {
        long long sum = 0;
        for (int j = i; j < a.size(); j++) {
            sum += a[j];
            maxSum = max(maxSum, sum);
        }
    }
    return maxSum;
}

// ===== Code cần test (có thể có bug) =====
long long mySolution(vector<int>& a) {
    // Kadane's algorithm - O(N)
    long long maxSum = a[0], curSum = a[0];
    for (int i = 1; i < a.size(); i++) {
        curSum = max((long long)a[i], curSum + a[i]);
        maxSum = max(maxSum, curSum);
    }
    return maxSum;
}

mt19937 rng(chrono::steady_clock::now().time_since_epoch().count());
int randInt(int l, int r) {
    return uniform_int_distribution<int>(l, r)(rng);
}

int main() {
    for (int test = 1; test <= 10000; test++) {
        // Bước 1: Sinh testcase ngẫu nhiên
        int n = randInt(1, 20);
        vector<int> a(n);
        for (int i = 0; i < n; i++)
            a[i] = randInt(-100, 100);  // [-100, 100]
        
        // Bước 2: Chạy cả 2
        long long expected = bruteForce(a);
        long long actual = mySolution(a);
        
        // Bước 3: So sánh
        if (expected != actual) {
            cout << "BUG FOUND at test " << test << "!\n";
            cout << "Input: n=" << n << endl;
            for (int x : a) cout << x << " ";
            cout << endl;
            cout << "Expected: " << expected << endl;
            cout << "Actual: " << actual << endl;
            return 0;
        }
    }
    
    cout << "All 10000 tests passed!\n";
    return 0;
}
```

### 4.3. Template Stress Test Python

```python
import random
import sys

def brute_force(a):
    """Brute force - O(N²) - chắc chắn đúng"""
    max_sum = float('-inf')
    for i in range(len(a)):
        s = 0
        for j in range(i, len(a)):
            s += a[j]
            max_sum = max(max_sum, s)
    return max_sum

def my_solution(a):
    """Kadane's - O(N) - cần test"""
    max_sum = cur_sum = a[0]
    for i in range(1, len(a)):
        cur_sum = max(a[i], cur_sum + a[i])
        max_sum = max(max_sum, cur_sum)
    return max_sum

# Stress test
for test in range(1, 10001):
    n = random.randint(1, 20)
    a = [random.randint(-100, 100) for _ in range(n)]
    
    expected = brute_force(a)
    actual = my_solution(a)
    
    if expected != actual:
        print(f"BUG at test {test}!")
        print(f"Input: {n}")
        print(f"Array: {a}")
        print(f"Expected: {expected}")
        print(f"Actual: {actual}")
        sys.exit(0)

print("All 10000 tests passed!")
```

---

## 5. Các dạng testcase cần kiểm tra

### 5.1. Edge cases (trường hợp đặc biệt)

```
- N = 0 (mảng rỗng)
- N = 1 (mảng 1 phần tử)
- Tất cả phần tử giống nhau
- Mảng tăng dần / giảm dần
- Phần tử âm / dương / 0
- Số rất lớn (10^9) / rất nhỏ (-10^9)
```

### 5.2. Test "lén" (corner cases)

```
- Tổng bằng 0
- Kết quả = 0
- Không có lời giải
- Có nhiều lời giải
- Đồ thị 1 đỉnh, 0 cạnh
- Cây là đường thẳng (linked list)
```

### 5.3. Random test (test ngẫu nhiên)

```
- Sinh nhiều test với N nhỏ (≤ 20)
- Chạy brute force để verify
- Nếu sai → debug với test đó
```

---

## 6. Workflow khi gặp WA

```
1. Đọc lại đề → hiểu đúng bài toán?
2. Chạy sample test → đúng?
3. Viết brute force
4. Sinh testcase nhỏ → so sánh
5. Nếu tìm ra test sai:
   a. In ra input/output expected/actual
   b. Debug code với test đó
   c. Fix bug
   d. Chạy lại stress test
6. Nếu không tìm ra test sai:
   a. Tăng số lượng test
   b. Tăng kích thước test
   c. Thử edge cases thủ công
```

---

## 7. Lưu ý

### 7.1. Brute force phải CHẮC CHẮN đúng

```
Sai lầm: Dùng code chính để verify code chính → vô nghĩa!

Đúng: Brute force phải đơn giản, dễ hiểu, dễ đúng
     (thường O(N²) hoặc O(2^N))
```

### 7.2. Sinh testcase đủ đa dạng

```
Sai lầm: Chỉ sinh testcase nhỏ → không phát hiện bug với N lớn

Đúng: Kết hợp cả testcase nhỏ (debug) và lớn (stress test)
```

### 7.3. Kiểm tra cả output format

```
Sai lầm: Chỉ so sánh giá trị → có thể sai format

Đúng: So sánh chính xác output (khoảng trắng, xuống dòng)
```

---

## 8. Bài tập luyện tập

Hãy thử stress test với các bài sau:

| Bài | Nền tảng | Mục đích |
|-----|----------|----------|
| [CSES - Maximum Subarray Sum](https://cses.fi/problemset/task/1643) | CSES | Luyện stress test Kadane's |
| [CSES - Missing Number](https://cses.fi/problemset/task/1083) | CSES | Luyện sinh testcase |
| [CSES - Distinct Numbers](https://cses.fi/problemset/task/1621) | CSES | Luyện brute force |

---

## Tài liệu tham khảo

- [Codeforces - Stress Test Tutorial](https://codeforces.com/blog/entry/62393)
- [USACO Guide - Debugging](https://usaco.guide/general/debugging)
- [Errichto - Stress Test Video](https://www.youtube.com/watch?v=f8J4Ji6OjgQ)

**Bài trước:** [Kỹ năng thi đấu ←](36-ky-nang-thi-dau.md) | **Bài tiếp theo:** [Debug & Mẹo →](38-debug-meo.md)
