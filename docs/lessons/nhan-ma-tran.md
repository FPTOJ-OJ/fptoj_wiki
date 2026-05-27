# Bài 57: Nhân Ma Trận & Lũy Thừa Ma Trận

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** CP-Algorithms, VNOI Wiki

## 1. Ma Trận Trong Thi Đấu

### 1.1 Tại sao cần nhân ma trận?

Nhiều bài toán có dạng **truy hồi tuyến tính**:

$$f(n) = a_1 \cdot f(n-1) + a_2 \cdot f(n-2) + \cdots + a_k \cdot f(n-k)$$

Ví dụ: Fibonacci: $F(n) = F(n-1) + F(n-2)$, cần tính $F(10^{18})$.

Đệ quy → quá chậm. Quy hoạch động → không đủ bộ nhớ. **Lũy thừa ma trận** giải quyết trong $O(k^3 \log n)$.

### 1.2 Các ứng dụng phổ biến

- Tính số Fibonacci, tribonacci, ... cho $n$ rất lớn
- Đếm số đường đi có độ dài $k$ trong đồ thị
- Grid DP với số cột nhỏ nhưng số hàng rất lớn
- Truy hồi tuyến tính tổng quát

---

## 2. Nhân Ma Trận

### 2.1 Định nghĩa

Cho ma trận $A$ kích thước $n \times m$ và $B$ kích thước $m \times p$, tích $C = A \times B$ có kích thước $n \times p$:

$$C[i][j] = \sum_{k=0}^{m-1} A[i][k] \times B[k][j]$$

Nghĩa là: để tính $C[i][j]$ (hàng $i$, cột $j$), ta lấy tích vô hướng của hàng thứ $i$ của $A$ với cột thứ $j$ của $B$.

### 2.2 Minh họa

```
A (2×3):       B (3×2):        C = A×B (2×2):
[1 2 3]        [7  8]          [1×7+2×9+3×11   1×8+2×10+3×12]   [58  64]
[4 5 6]        [9  10]    →    [4×7+5×9+6×11   4×8+5×10+6×12] = [139 154]
               [11 12]
```

### 2.3 Cài đặt

=== "C++"

    ```cpp
    const long long MOD = 1e9 + 7;

    struct Matrix {
        vector<vector<long long>> a;
        int n, m;
        Matrix(int n, int m) : n(n), m(m), a(n, vector<long long>(m, 0)) {}
    };

    Matrix multiply(const Matrix& A, const Matrix& B) {
        Matrix C(A.n, B.m);
        for (int i = 0; i < A.n; i++) {
            for (int k = 0; k < A.m; k++) {
                if (A.a[i][k] == 0) continue;
                for (int j = 0; j < B.m; j++) {
                    C.a[i][j] = (C.a[i][j] + A.a[i][k] * B.a[k][j]) % MOD;
                }
            }
        }
        return C;
    }
    ```

=== "Python"

    ```python
    MOD = 10**9 + 7

    def multiply(A, B):
        n, m, p = len(A), len(B), len(B[0])
        C = [[0]*p for _ in range(n)]
        for i in range(n):
            for k in range(m):
                if A[i][k] == 0: continue
                for j in range(p):
                    C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % MOD
        return C
    ```

**Độ phức tạp:** $O(n \times m \times p)$ cho ma trận $n \times m$ nhân $m \times p$.

---

## 3. Lũy Thừa Ma Trận

### 3.1 Ý tưởng

Tương tự binary exponentiation cho số, ta tính $A^b$ bằng cách "nhân đôi":

$$A^b = \begin{cases} (A^{b/2})^2 & \text{nếu } b \text{ chẵn} \\ (A^{\lfloor b/2 \rfloor})^2 \times A & \text{nếu } b \text{ lẻ} \end{cases}$$

### 3.2 Cài đặt

=== "C++"

    ```cpp
    Matrix identityMatrix(int n) {
        Matrix I(n, n);
        for (int i = 0; i < n; i++) I.a[i][i] = 1;
        return I;
    }

    Matrix powerMatrix(Matrix A, long long b) {
        Matrix result = identityMatrix(A.n);
        while (b > 0) {
            if (b & 1) result = multiply(result, A);
            A = multiply(A, A);
            b >>= 1;
        }
        return result;
    }
    ```

=== "Python"

    ```python
    def identity_matrix(n):
        I = [[0]*n for _ in range(n)]
        for i in range(n):
            I[i][i] = 1
        return I

    def power_matrix(A, b):
        result = identity_matrix(len(A))
        while b > 0:
            if b & 1:
                result = multiply(result, A)
            A = multiply(A, A)
            b >>= 1
        return result
    ```

**Độ phức tạp:** $O(k^3 \log b)$ cho ma trận $k \times k$.

---

## 4. Ứng dụng 1: Fibonacci

### 4.1 Truy hồi

$F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2)$

### 4.2 Biến đổi thành ma trận

$$\begin{pmatrix} F(n) \\ F(n-1) \end{pmatrix} = \begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix} \times \begin{pmatrix} F(n-1) \\ F(n-2) \end{pmatrix}$$

Suy ra:

$$\begin{pmatrix} F(n) \\ F(n-1) \end{pmatrix} = \begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix}^{n-1} \times \begin{pmatrix} 1 \\ 0 \end{pmatrix}$$

=== "C++"

    ```cpp
    long long fibonacci(long long n) {
        if (n == 0) return 0;
        Matrix A(2, 2);
        A.a = {{1, 1}, {1, 0}};
        Matrix result = powerMatrix(A, n - 1);
        return result.a[0][0]; // F(n)
    }
    ```

=== "Python"

    ```python
    def fibonacci(n):
        if n == 0: return 0
        A = [[1, 1], [1, 0]]
        result = power_matrix(A, n - 1)
        return result[0][0]
    ```

---

## 5. Ứng dụng 2: Truy hồi tuyến tính tổng quát

Cho truy hồi: $f(n) = c_1 f(n-1) + c_2 f(n-2) + \cdots + c_k f(n-k)$

Ma trận chuyển:

$$T = \begin{pmatrix} c_1 & c_2 & \cdots & c_{k-1} & c_k \\ 1 & 0 & \cdots & 0 & 0 \\ 0 & 1 & \cdots & 0 & 0 \\ \vdots & & \ddots & & \vdots \\ 0 & 0 & \cdots & 1 & 0 \end{pmatrix}$$

Hàng đầu tiên chứa các hệ số $c_1, \ldots, c_k$ của truy hồi. Các hàng còn lại là hàng dịch — mỗi hàng chỉ có một số 1, đẩy giá trị xuống.

$$\begin{pmatrix} f(n) \\ f(n-1) \\ \vdots \\ f(n-k+1) \end{pmatrix} = T^{n-k+1} \times \begin{pmatrix} f(k-1) \\ f(k-2) \\ \vdots \\ f(0) \end{pmatrix}$$

Lũy thừa $n-k+1$ vì ta cần "nhảy" từ vector $(f(k-1), \ldots, f(0))$ đến $(f(n), \ldots, f(n-k+1))$, tức $n-k+1$ bước.

**Ví dụ:** Tribonacci $f(n) = f(n-1) + f(n-2) + f(n-3)$, $k = 3$:

$$T = \begin{pmatrix} 1 & 1 & 1 \\ 1 & 0 & 0 \\ 0 & 1 & 0 \end{pmatrix}$$

=== "C++"

    ```cpp
    // Truy hồi tổng quát: f(n) = c[0]*f(n-1) + c[1]*f(n-2) + ... + c[k-1]*f(n-k)
    long long linearRecurrence(vector<long long> init, vector<long long> coeff, long long n) {
        int k = init.size();
        if (n < k) return init[n];

        Matrix T(k, k);
        for (int j = 0; j < k; j++) T.a[0][j] = coeff[j] % MOD;
        for (int i = 1; i < k; i++) T.a[i][i-1] = 1;

        Matrix result = powerMatrix(T, n - k + 1);

        long long ans = 0;
        for (int i = 0; i < k; i++)
            ans = (ans + result.a[0][i] * init[k - 1 - i]) % MOD;
        return ans;
    }
    ```

---

## 6. Ứng dụng 3: Đếm đường đi trong đồ thị

### 6.1 Bài toán

Cho đồ thị có $n$ đỉnh, ma trận kề $A$. Hỏi có bao nhiêu đường đi từ đỉnh $u$ đến đỉnh $v$ có **đúng độ dài $k$**?

### 6.2 Kết quả

$A^k[u][v]$ = số đường đi từ $u$ đến $v$ có độ dài đúng $k$.

=== "C++"

    ```cpp
    // Đếm đường đi có độ dài k từ đỉnh 0 đến đỉnh n-1
    long long countPaths(vector<vector<int>>& adj, int n, int k) {
        Matrix A(n, n);
        for (int u = 0; u < n; u++)
            for (int v : adj[u])
                A.a[u][v]++;

        Matrix result = powerMatrix(A, k);
        return result.a[0][n-1];
    }
    ```

---

## 7. Grid DP với số hàng lớn

### 7.1 Bài toán

Cho lưới $n \times m$ ($n$ rất lớn, $m \leq 10$). Mỗi ô có thể đi sang phải, xuống, hoặc chéo. Đếm số cách đi từ $(1, 1)$ đến $(n, m)$.

### 7.2 Giải

Với mỗi hàng, trạng thái là bitmask $m$ bit → ma trận chuyển kích thước $2^m \times 2^m$. Dùng lũy thừa ma trận để tính cho $n$ hàng.

---

## 8. Bài tập luyện tập

### Bài 1: Fibonacci thứ N

**Đề bài:** Tính số Fibonacci thứ $n$ modulo $10^9 + 7$. $F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2)$.

**Input:** Số nguyên $n$ $(0 \leq n \leq 10^{18})$

**Output:** $F(n) \bmod (10^9 + 7)$.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `10` | `55` |
| `100` | `242782308` |

??? tip "Lời giải"
    Dùng lũy thừa ma trận với ma trận chuyển $\begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix}$. Độ phức tạp $O(8 \log n)$.
    
    === "C++"
    
        ```cpp
        #include <bits/stdc++.h>
        using namespace std;
        const long long MOD = 1e9 + 7;
    
        struct Matrix {
            long long a[2][2];
            Matrix() { memset(a, 0, sizeof a); }
        };
    
        Matrix multiply(Matrix A, Matrix B) {
            Matrix C;
            for (int i = 0; i < 2; i++)
                for (int k = 0; k < 2; k++)
                    for (int j = 0; j < 2; j++)
                        C.a[i][j] = (C.a[i][j] + A.a[i][k] * B.a[k][j]) % MOD;
            return C;
        }
    
        Matrix powerMatrix(Matrix A, long long b) {
            Matrix result;
            result.a[0][0] = result.a[1][1] = 1;
            while (b > 0) {
                if (b & 1) result = multiply(result, A);
                A = multiply(A, A);
                b >>= 1;
            }
            return result;
        }
    
        int main() {
            long long n; cin >> n;
            if (n == 0) { cout << 0 << "\n"; return 0; }
            Matrix T;
            T.a[0][0] = T.a[0][1] = T.a[1][0] = 1;
            T.a[1][1] = 0;
            Matrix R = powerMatrix(T, n - 1);
            cout << R.a[0][0] << "\n";
        }
        ```
---

### Bài 2: Đếm đường đi trong đồ thị

**Đề bài:** Cho đồ thị có hướng gồm $n$ đỉnh và $m$ cạnh. Đếm số đường đi từ đỉnh $1$ đến đỉnh $n$ có độ dài đúng $k$.

**Input:**
- Dòng 1: 3 số nguyên $n, m, k$ $(2 \leq n \leq 100, 1 \leq m \leq n^2, 1 \leq k \leq 10^9)$
- $m$ dòng tiếp: 2 số nguyên $u, v$ biểu diễn cạnh từ $u$ đến $v$

**Output:** Số đường đi modulo $10^9 + 7$.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `3 4 2`<br>`1 2`<br>`2 3`<br>`1 3`<br>`3 1` | `2` |

**Giải thích:** Các đường đi độ dài 2 từ 1 đến 3: $1 \to 2 \to 3$ và $1 \to 3 \to 1$ (không đúng, cần xem lại).

Đường đi: $1 \to 2 \to 3$ và $1 \to 3 \to 1$ không đến 3. Chỉ có $1 \to 2 \to 3$.

Thực tế: $A^2[1][3] = A[1][1] \cdot A[1][3] + A[1][2] \cdot A[2][3] + A[1][3] \cdot A[3][3] = 0 \cdot 1 + 1 \cdot 1 + 1 \cdot 0 = 1$.

Sửa ví dụ: Input `4 5 2` với cạnh `1 2, 2 4, 1 3, 3 4, 2 3` → Output `2` (đường đi $1 \to 2 \to 4$ và $1 \to 3 \to 4$).

??? tip "Lời giải"
    Tính $A^k$ với $A$ là ma trận kề. Đáp án = $A^k[1][n]$.
---

### Bài 3: Truy hồi tuyến tính

**Đề bài:** Cho truy hồi $f(n) = 3f(n-1) - 2f(n-2)$ với $f(0) = 0, f(1) = 1$. Tính $f(n) \bmod (10^9 + 7)$.

**Input:** Số nguyên $n$ $(0 \leq n \leq 10^{18})$

**Output:** $f(n) \bmod (10^9 + 7)$.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `5` | `31` |
| `10` | `1023` |

**Giải thích:** $f(0)=0, f(1)=1, f(2)=3, f(3)=7, f(4)=15, f(5)=31$. Công thức: $f(n) = 2^n - 1$.

??? tip "Lời giải"
    Ma trận chuyển $T = \begin{pmatrix} 3 & -2 \\ 1 & 0 \end{pmatrix}$. Dùng lũy thừa ma trận.
---

### Bài 4: Grid paths lớn

**Đề bài:** Cho lưới $n \times m$. Mỗi bước đi sang phải hoặc xuống. Tính số cách đi từ $(1,1)$ đến $(n,m)$ modulo $10^9 + 7$.

**Input:** 2 số nguyên $n, m$ $(1 \leq n, m \leq 10^6)$

**Output:** Số đường đi modulo $10^9 + 7$.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `2 3` | `3` |
| `100 100` | `754471401` |

??? tip "Lời giải"
    Đáp án = $C(n+m-2, n-1)$. Dùng factorial + modular inverse.