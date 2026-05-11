# Bài 6: Đệ Quy Và Quay Lui - Thử Mọi Con Đường!

> **Tác giả:** Hà Trí Kiên<br>
> **Nội dung tham khảo từ:** VNOI Wiki - Đệ quy và thuật toán quay lui

## 1. Chuyện gì đang xảy ra?

### Câu chuyện: Con búp bê Matryoshka

Bạn có một con búp bê Nga to. Mở ra → bên trong có con nhỏ hơn. Mở tiếp → con nhỏ hơn nữa. Đến con bé nhất → **dừng lại!**

**Đệ quy** trong lập trình cũng vậy: **một hàm tự gọi chính nó** cho đến khi gặp "trường hợp dừng" (base case).

### Câu chuyện: Mê cung

Bạn đang lạc trong mê cung. Cách duy nhất: **thử từng ngã rẽ**. Đi đến đường cụt → **quay lui** (backtrack) → thử ngã khác.

**Quay lui** = Thử → Sai → Quay lại → Thử hướng khác.

---

## 2. Toán học bổ trợ: Giải ngố cấp tốc

### Giai thừa (!) - Ví dụ đệ quy kinh điển

5! = 5 × 4 × 3 × 2 × 1 = 120

Cách đệ quy: `5! = 5 × 4!` → `4! = 4 × 3!` → ... → `1! = 1` (dừng!)

### Số Fibonacci - Dãy số huyền thoại

0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...

Mỗi số = tổng 2 số trước: `F(n) = F(n-1) + F(n-2)`

---

## 3. Thuật toán này hoạt động như thế nào?

### 3.1. Đệ quy (Recursion)

**Nguyên tắc vàng:**

1. **Phải có trường hợp dừng** (base case) → nếu không → đệ quy vô hạn → crash!
2. **Phần đệ quy phải gọi bài toán nhỏ hơn** → tiến dần về base case

**Ví dụ: Tính giai thừa**

```
factorial(5) → 5 × factorial(4)
                  → 4 × factorial(3)
                        → 3 × factorial(2)
                              → 2 × factorial(1)
                                    → 1  ← BASE CASE! Dừng!
                              ← 2 × 1 = 2
                        ← 3 × 2 = 6
                  ← 4 × 6 = 24
            ← 5 × 24 = 120
```

### 3.2. Quay lui (Backtracking)

**Công thức chung:**

```
void backtrack(vị_trí hiện_tại) {
    if (đã_xong) {
        lưu/in kết quả;
        return;
    }
    for (mỗi khả năng tại vị_trí) {
        thêm khả năng vào lời giải;
        backtrack(vị_trí + 1);    // Đệ quy
        loại bỏ khả năng;          // QUAY LUI!
    }
}
```

**Bước "loại bỏ khả năng"** chính là **quay lui** - khôi phục trạng thái cũ để thử khả năng khác!

### 3.3. Ví dụ: Sinh tất cả hoán vị

Với {1, 2, 3}, các hoán vị là:
123, 132, 213, 231, 312, 321 → Tổng: 3! = 6 hoán vị

**Cây quay lui:**
```
                    []
            /       |       \
        [1]        [2]      [3]
       /   \      /   \    /   \
     [1,2] [1,3] [2,1] [2,3] [3,1] [3,2]
       |     |     |     |     |     |
   [1,2,3] ...   ...   ...   ... [3,2,1]
```

### 3.4. Ví dụ: Bài toán 8 quân hậu

Xếp 8 quân hậu lên bàn cờ 8×8 sao cho không quân nào ăn được nhau.

**Ý tưởng quay lui:**

- Xếp hậu theo từng hàng
- Hàng i: thử tất cả các cột
- Nếu cột j hợp lệ (không cùng cột, không cùng đường chéo) → xếp hậu, gọi đệ quy hàng tiếp
- Nếu không hợp lệ → thử cột khác

---

## 4. Bắt tay vào Code nào!

### Ứng dụng 1: Tính giải thừa đơn giản

Đây là ví dụ đệ quy đơn giản nhất. Bài toán `n!` được chia thành `n × (n-1)!`. Khi n = 0, trả về 1 (base case). Không có base case → tràn stack!

### Ứng dụng 2: Số Fibonacci và vấn đề hiệu năng

Fibonacci là ví dụ điển hình cho thấy đệ quy đơn thuần **có thể rất chậm**: `fib(5)` gọi `fib(4)` và `fib(3)`, nhưng `fib(4)` lại gọi `fib(3)` lần nữa → tính lại kết quả đã biết! Đó là lý do cần **memoization** (bài 6.4).

### Ứng dụng 3: Sinh tất cả hoán vị

Đây là template **quay lui** cơ bản nhất. Các bước:
1. Chọn 1 số cho vị trí hiện tại (chưa được dùng)
2. Đánh dấu đã dùng, đệ quy sang vị trí tiếp
3. **Quay lui**: bỏ đánh dấu để thử lựa chọn khác

Nếu bỏ bước 3 (bỏ `used[num] = false`), các lựa chọn khác sẽ không thể dùng lại `num` → kết quả sai!

### Ứng dụng 4: Bài toán 8 quân hậu (N queens)

Mỗi hàng chỉ có đúng 1 hậu. Ta xếp từng hàng từ trên xuống:
- Với mỗi cột của hàng hiện tại: kiểm tra xem có an toàn không (không trùng cột, không trùng đường chéo)
- Nếu an toàn: đặt hậu, đệ quy xuống hàng tiếp
- Quáy lui: bỏ hậu, thử cột khác

`diag1[row+col]` đại diện đường chéo chính (row+col cố định), `diag2[row-col+n]` đại diện đường chéo phụ (row-col cố định).

### Ứng dụng 5: Tìm tất cả cách chọn số có tổng = Target

Khác với hoán vị, bài này cho phép chọn một cần tử lặp lại. Ta dùng `startIdx` để tránh chọn ngược lại (tìm tổ hợp, không phải hoán vị).


### Code C++: Tất cả các ứng dụng trên

```cpp
#include <bits/stdc++.h>
using namespace std;

// ===== 1. Tính giai thừa - Đệ quy đơn giản =====
long long factorial(int n) {
    if (n == 0) return 1;              // Base case
    return factorial(n - 1) * n;        // Đệ quy
}

// ===== 2. Số Fibonacci =====
long long fibo(int n) {
    if (n == 0) return 0;              // Base case 1
    if (n == 1) return 1;              // Base case 2
    return fibo(n - 1) + fibo(n - 2);  // Đệ quy
}

// ===== 3. Sinh tất cả hoán vị =====
int n;
int permutation[20];    // Hoán vị hiện tại
bool used[20];           // Đánh dấu số đã dùng

void generatePermutation(int pos) {
    if (pos > n) {
        // In hoán vị
        for (int i = 1; i <= n; i++)
            cout << permutation[i] << " ";
        cout << "\n";
        return;                         // Dừng đệ quy
    }
    
    for (int num = 1; num <= n; num++) {
        if (!used[num]) {               // Nếu num chưa dùng
            permutation[pos] = num;     // Thêm vào
            used[num] = true;           // Đánh dấu đã dùng
            
            generatePermutation(pos + 1);  // Đệ quy
            
            used[num] = false;          // QUAY LUI: bỏ đánh dấu
        }
    }
}

// ===== 4. Bài toán 8 quân hậu =====
int queenCount;
bool colUsed[20], diag1[40], diag2[40];
int queenPos[20];  // queenPos[i] = cột của hậu ở hàng i

void solveQueens(int row) {
    if (row > queenCount) {
        // In kết quả
        for (int i = 1; i <= queenCount; i++)
            cout << queenPos[i] << " ";
        cout << "\n";
        return;
    }
    
    for (int col = 1; col <= queenCount; col++) {
        int d1 = row + col;             // Đường chéo chính
        int d2 = row - col + 20;        // Đường chéo phụ (+20 để tránh âm)
        
        if (colUsed[col] || diag1[d1] || diag2[d2])
            continue;                    // Không hợp lệ → thử cột khác
        
        // Đặt hậu
        queenPos[row] = col;
        colUsed[col] = diag1[d1] = diag2[d2] = true;
        
        solveQueens(row + 1);           // Đệ quy hàng tiếp
        
        // QUAY LUI
        colUsed[col] = diag1[d1] = diag2[d2] = false;
    }
}

// ===== 5. Bài toán phân tích số =====
int coins[15], coinCount;
long long target;
vector<int> currentSet;

void findWays(int startIdx, long long currentSum) {
    if (currentSum == target) {
        // In cách chọn
        for (int x : currentSet) cout << x << " ";
        cout << "\n";
        return;
    }
    
    for (int i = startIdx; i < coinCount; i++) {
        if (currentSum + coins[i] <= target) {
            currentSet.push_back(coins[i]);        // Thêm
            findWays(i, currentSum + coins[i]);     // Đệ quy
            currentSet.pop_back();                  // QUAY LUI
        }
    }
}

int main() {
    // Test giai thừa
    cout << "5! = " << factorial(5) << endl;  // 120
    
    // Test sinh hoán vị
    n = 3;
    memset(used, false, sizeof(used));
    generatePermutation(1);
    
    return 0;
}
```

### Code Python

```python
# ===== 1. Giai thừa =====
def factorial(n):
    if n == 0: return 1              # Base case
    return factorial(n - 1) * n      # Đệ quy

# ===== 2. Fibonacci =====
def fibo(n):
    if n == 0: return 0
    if n == 1: return 1
    return fibo(n - 1) + fibo(n - 2)

# ===== 3. Sinh hoán vị =====
def generate_permutation(n):
    used = [False] * (n + 1)
    permutation = []
    
    def backtrack():
        if len(permutation) == n:
            print(*permutation)
            return
        
        for num in range(1, n + 1):
            if not used[num]:
                permutation.append(num)    # Thêm
                used[num] = True
                backtrack()                # Đệ quy
                permutation.pop()          # QUAY LUI
                used[num] = False
    
    backtrack()

# ===== 4. Bài toán N quân hậu =====
def solve_n_queens(n):
    col_used = [False] * n
    diag1 = [False] * (2 * n)
    diag2 = [False] * (2 * n)
    queens = []
    
    def backtrack(row):
        if row == n:
            print(queens)
            return
        
        for col in range(n):
            d1 = row + col
            d2 = row - col + n
            
            if col_used[col] or diag1[d1] or diag2[d2]:
                continue
            
            queens.append(col)
            col_used[col] = diag1[d1] = diag2[d2] = True
            
            backtrack(row + 1)
            
            queens.pop()
            col_used[col] = diag1[d1] = diag2[d2] = False
    
    backtrack()

# Test
print("5! =", factorial(5))    # 120
generate_permutation(3)         # 6 hoán vị
```

## 5. Lưu ý / Cạm bẫy hay gặp

### Bẫy 1: Quên base case → Stack Overflow!

```cpp
// SAI: không có base case → đệ quy vô hạn!
int factorial(int n) {
    return factorial(n - 1) * n;
}

// ĐÚNG: phải có base case
int factorial(int n) {
    if (n == 0) return 1;  // ← Base case!
    return factorial(n - 1) * n;
}
```
```python
# SAI: không có base case → đệ quy vô hạn!
def factorial(n):
    return factorial(n - 1) * n

# ĐÚNG: phải có base case
def factorial(n):
    if n == 0: return 1    # ← Base case!
    return factorial(n - 1) * n
```

### Bẫy 2: Quên "quay lui" → Sai kết quả!

```cpp
// SAI: quên khôi phục trạng thái
used[num] = true;
backtrack(pos + 1);
// Quên used[num] = false! → Lần sau không dùng được num nữa!

// ĐÚNG:
used[num] = true;
backtrack(pos + 1);
used[num] = false;  // ← QUAY LUI!
```
```python
# SAI: quên khôi phục trạng thái
used[num] = True
backtrack(pos + 1)
# Quên used[num] = False! → Lần sau không dùng được num nữa!

# ĐÚNG:
used[num] = True
backtrack(pos + 1)
used[num] = False   # ← QUAY LUI!
```

### Bẫy 3: Đệ quy quá sâu → Stack Overflow

Nếu N lớn (ví dụ N = 100.000), đệ quy có thể tràn stack → chương trình crash.

**Khắc phục:** Dùng đệ quy có nhớ (memoization) hoặc viết lại thành vòng lặp.

### Bẫy 4: Đệ quy Fibonacci không nhớ → Cực chậm!

```cpp
// SAI: O(2^N) - rất chậm!
int fibo(int n) {
    if (n <= 1) return n;
    return fibo(n-1) + fibo(n-2);  // Tính lại cùng 1 giá trị nhiều lần!
}

// ĐÚNG: dùng memoization - O(N)
int memo[100];
// Nhớ khởi tạo: memset(memo, -1, sizeof(memo)) trước khi dùng!
int fibo(int n) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];  // Đã tính rồi → lấy ra
    return memo[n] = fibo(n-1) + fibo(n-2);  // Tính và lưu
}
```
```python
# SAI: O(2^N) - rất chậm!
def fibo(n):
    if n <= 1: return n
    return fibo(n-1) + fibo(n-2)   # Tính lại cùng 1 giá trị nhiều lần!

# ĐÚNG: dùng memoization - O(N)
from functools import lru_cache

@lru_cache(maxsize=None)
def fibo(n):
    if n <= 1: return n
    return fibo(n-1) + fibo(n-2)

# Hoặc tự cài memo:
memo = {}
def fibo(n):
    if n <= 1: return n
    if n in memo: return memo[n]
    memo[n] = fibo(n-1) + fibo(n-2)
    return memo[n]
```

### Mẹo thi cử: Khi nào dùng Quay lui?

| Tình huống | Nên dùng |
|-----------|----------|
| Liệt kê tất cả hoán vị/tổ hợp/tập con | Quay lui |
| N ≤ 10-15 | Duyệt bitmask hoặc quay lui |
| Bài toán mê cung, tìm đường | Quay lui |
| Tìm cách xếp tốt nhất (8 quân hậu, TSP) | Quay lui + nhánh cận |

---

---

## Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Creating Strings](https://cses.fi/problemset/task/1622) | CSES | ⭐⭐ | Sinh hoán vị |
| [CSES - Apple Division](https://cses.fi/problemset/task/1623) | CSES | ⭐⭐ | Quay lui chia tập |
| [LeetCode - Permutations](https://leetcode.com/problems/permutations/) | LC | ⭐⭐ | Sinh hoán vị |
| [LeetCode - N-Queens](https://leetcode.com/problems/n-queens/) | LC | ⭐⭐⭐ | Xếp hậu |
| [LeetCode - Sudoku Solver](https://leetcode.com/problems/sudoku-solver/) | LC | ⭐⭐⭐ | Quay lui giải Sudoku |

## Bài viết liên quan

- [Bài 5: Phép toán bit](05-phep-toan-bit.md)
- [Bài 12: Quy hoạch động](12-quy-hoach-dong.md)

## Tài liệu tham khảo

- [VNOI Wiki - Đệ quy và thuật toán quay lui](https://wiki.vnoi.info/algo/basic/backtracking)
- [GeeksforGeeks - Backtracking Algorithms](https://www.geeksforgeeks.org/dsa/backtracking-algorithms/)
- [USACO Guide - Backtracking](https://usaco.guide/bronze/intro-complete)
- [YouTube - Backtracking (NeetCode)](https://www.youtube.com/watch?v=A80Yzfk-bcU)

**Bài tiếp theo:** [Kĩ thuật hai con trỏ →](04-ky-thuat-hai-con-tro.md)
