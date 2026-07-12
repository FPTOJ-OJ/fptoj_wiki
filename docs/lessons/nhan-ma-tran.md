# Bài 57: Nhân Ma Trận & Lũy Thừa Ma Trận

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** CP-Algorithms, VNOI Wiki

## 1. Ma Trận Trong Thi Đấu

### 1.1 Tại sao cần nhân ma trận?

Nhiều bài toán có dạng **truy hồi tuyến tính**:

$$f(n) = a_1 \cdot f(n-1) + a_2 \cdot f(n-2) + \cdots + a_k \cdot f(n-k)$$

Ví dụ: Fibonacci: $F(n) = F(n-1) + F(n-2)$, cần tính $F(10^{18})$.

Đệ quy → quá chậm. Quy hoạch động → không đủ bộ nhớ. **Lũy thừa ma trận** giải quyết trong $O(k^3 \log n)$.

```matplotlib
n = np.arange(0, 30)
fib = [0, 1]
for i in range(2, 30):
    fib.append(fib[-1] + fib[-2])
fib = np.array(fib)

naive_steps = n
matrix_steps = np.log2(np.maximum(n, 1)) * 8

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

ax1.plot(n, fib, 'o-', color='#9b59b6', linewidth=2, markersize=4)
ax1.set_xlabel('n')
ax1.set_ylabel('F(n)')
ax1.set_title('Dãy Fibonacci tăng exponentially')
ax1.grid(True, alpha=0.3)
ax1.set_yscale('log')

ax2.plot(n[1:], naive_steps[1:], label='DP $O(n)$', color='#e74c3c', linewidth=2)
ax2.plot(n[1:], matrix_steps[1:], label='Ma trận lũy thừa $O(\\log n)$', color='#2ecc71', linewidth=2)
ax2.set_xlabel('n')
ax2.set_ylabel('Số phép tính')
ax2.set_title('So sánh số phép tính: DP vs Ma trận lũy thừa')
ax2.legend(fontsize=10)
ax2.grid(True, alpha=0.3)

plt.tight_layout()
```

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

| Mã bài | Tên bài tập | Độ khó | Kiểu bài tập (Bản chất) | Bài học lý thuyết |
| :--- | :--- | :---: | :--- | :--- |
| `mm-fibo` | [Fibonacci ma trận](https://fptoj.com/problem/mm-fibo) | ⭐⭐ | Ma trận $2\times2$ | [Nhân Ma Trận & Lũy Thừa Ma Trận](nhan-ma-tran.md) |
| `mm-stairs` | [Leo cầu thang ma trận](https://fptoj.com/problem/mm-stairs) | ⭐⭐ | Fibonacci ứng dụng | [Nhân Ma Trận & Lũy Thừa Ma Trận](nhan-ma-tran.md) |
| `mm-tribo` | [Tribonacci ma trận](https://fptoj.com/problem/mm-tribo) | ⭐⭐⭐ | Ma trận $3\times3$ | [Nhân Ma Trận & Lũy Thừa Ma Trận](nhan-ma-tran.md) |
| `mm-linear` | [Truy hồi tuyến tính](https://fptoj.com/problem/mm-linear) | ⭐⭐⭐ | $f(n) = af(n-1)+bf(n-2)$ | [Nhân Ma Trận & Lũy Thừa Ma Trận](nhan-ma-tran.md) |
| `mm-fibosum` | [Tổng Fibonacci](https://fptoj.com/problem/mm-fibosum) | ⭐⭐⭐ | $S(n) = F(n+2)-1$ | [Nhân Ma Trận & Lũy Thừa Ma Trận](nhan-ma-tran.md) |
| `mm-fibonacci-n` | [Fibonacci tổng quát](https://fptoj.com/problem/mm-fibonacci-n) | ⭐⭐⭐ | $F(n)=xF(n-1)+yF(n-2)+z$ | [Nhân Ma Trận & Lũy Thừa Ma Trận](nhan-ma-tran.md) |
| `mm-large-grid` | [Lưới $2\times N$](https://fptoj.com/problem/mm-large-grid) | ⭐⭐⭐ | Lưới + ma trận | [Nhân Ma Trận & Lũy Thừa Ma Trận](nhan-ma-tran.md) |
| `mm-2x2-recur` | [Truy hồi hai biến](https://fptoj.com/problem/mm-2x2-recur) | ⭐⭐⭐⭐ | $[f(n),g(n)]^T$ | [Nhân Ma Trận & Lũy Thừa Ma Trận](nhan-ma-tran.md) |
| `mm-graph-path` | [Số đường đi đồ thị ma trận](https://fptoj.com/problem/mm-graph-path) | ⭐⭐⭐⭐ | $A^K$ | [Nhân Ma Trận & Lũy Thừa Ma Trận](nhan-ma-tran.md) |
| `mm-walks` | [Walk trên đồ thị](https://fptoj.com/problem/mm-walks) | ⭐⭐⭐⭐ | $A^K$ vô hướng | [Nhân Ma Trận & Lũy Thừa Ma Trận](nhan-ma-tran.md) |
| `mm-hopping` | [Hopping ma trận](https://fptoj.com/problem/mm-hopping) | ⭐⭐⭐⭐ | Truy hồi nhiều bước | [Nhân Ma Trận & Lũy Thừa Ma Trận](nhan-ma-tran.md) |