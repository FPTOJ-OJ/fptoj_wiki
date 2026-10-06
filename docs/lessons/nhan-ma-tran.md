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
        int n, m; // n: số hàng, m: số cột
        Matrix(int n, int m) : n(n), m(m), a(n, vector<long long>(m, 0)) {}
    };

    // Nhân A (n×m) với B (m×p) được C (n×p)
    Matrix multiply(const Matrix& A, const Matrix& B) {
        Matrix C(A.n, B.m); // khởi tạo toàn 0
        for (int i = 0; i < A.n; i++) {
            for (int k = 0; k < A.m; k++) {
                if (A.a[i][k] == 0) continue; // bỏ qua số 0 cho nhanh
                for (int j = 0; j < B.m; j++) {
                    // Cộng dồn tích hàng i của A với cột j của B, mod từng bước
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
        # A: n×m, B: m×p -> C: n×p
        n, m, p = len(A), len(B), len(B[0])
        C = [[0]*p for _ in range(n)]  # khởi tạo toàn 0
        for i in range(n):
            for k in range(m):
                if A[i][k] == 0: continue  # bỏ qua số 0 cho nhanh
                for j in range(p):
                    # Cộng dồn tích hàng i của A với cột j của B, mod từng bước
                    C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % MOD
        return C
    ```

**Trace tay từng $C[i][j]$** với $A = \begin{pmatrix}1&2&3\\4&5&6\end{pmatrix}$, $B = \begin{pmatrix}7&8\\9&10\\11&12\end{pmatrix}$:

| Ô | Công thức | Tính từng bước | Kết quả |
|:---:|:---|:---|:---:|
| $C[0][0]$ | $1{\times}7 + 2{\times}9 + 3{\times}11$ | $7 + 18 + 33$ | **58** |
| $C[0][1]$ | $1{\times}8 + 2{\times}10 + 3{\times}12$ | $8 + 20 + 36$ | **64** |
| $C[1][0]$ | $4{\times}7 + 5{\times}9 + 6{\times}11$ | $28 + 45 + 66$ | **139** |
| $C[1][1]$ | $4{\times}8 + 5{\times}10 + 6{\times}12$ | $32 + 50 + 72$ | **154** |

**Độ phức tạp:** $O(n \times m \times p)$ cho ma trận $n \times m$ nhân $m \times p$.

---

## 3. Lũy Thừa Ma Trận

### 3.1 Ý tưởng

Tương tự binary exponentiation cho số, ta tính $A^b$ bằng cách "nhân đôi":

$$A^b = \begin{cases} (A^{b/2})^2 & \text{nếu } b \text{ chẵn} \\ (A^{\lfloor b/2 \rfloor})^2 \times A & \text{nếu } b \text{ lẻ} \end{cases}$$

### 3.2 Cài đặt

=== "C++"

    ```cpp
    // Ma trận đơn vị: I[i][i] = 1, còn lại 0 (đóng vai trò số 1 khi nhân)
    Matrix identityMatrix(int n) {
        Matrix I(n, n);
        for (int i = 0; i < n; i++) I.a[i][i] = 1; // đường chéo chính = 1
        return I;
    }

    // Lũy thừa nhị phân: tính A^b trong O(log b) phép nhân ma trận
    Matrix powerMatrix(Matrix A, long long b) {
        Matrix result = identityMatrix(A.n); // khởi đầu = I (phần tử trung hòa)
        while (b > 0) {
            if (b & 1) result = multiply(result, A); // bit 1 -> góp A hiện tại vào đáp án
            A = multiply(A, A); // bình phương: A -> A^2 -> A^4 -> ...
            b >>= 1; // dịch sang bit tiếp theo
        }
        return result;
    }
    ```

=== "Python"

    ```python
    def identity_matrix(n):
        # Ma trận đơn vị: đường chéo = 1 (đóng vai trò số 1 khi nhân)
        I = [[0]*n for _ in range(n)]
        for i in range(n):
            I[i][i] = 1
        return I

    def power_matrix(A, b):
        # Lũy thừa nhị phân: tính A^b trong O(log b) phép nhân
        result = identity_matrix(len(A))  # khởi đầu = I
        while b > 0:
            if b & 1:
                result = multiply(result, A)  # bit 1 -> góp A hiện tại vào đáp án
            A = multiply(A, A)  # bình phương: A -> A^2 -> A^4 -> ...
            b >>= 1  # dịch sang bit tiếp theo
        return result
    ```

**Trace tay: tính $M^5$ cho Fibonacci** với $M = \begin{pmatrix}1&1\\1&0\end{pmatrix}$, $5 = 101_2$:

| Vòng | $b$ (nhị phân) | Bit cuối | $result$ | $A$ |
|:---:|:---:|:---:|:---|:---|
| đầu | $101$ | — | $I$ | $M^1$ |
| 1 | $101$ | 1 → $result = I \times M = M$ | $M^1$ | $A \leftarrow M^2 = \begin{pmatrix}2&1\\1&1\end{pmatrix}$; $b = 10$ |
| 2 | $10$ | 0 → bỏ qua | $M^1$ | $A \leftarrow M^4 = \begin{pmatrix}5&3\\3&2\end{pmatrix}$; $b = 1$ |
| 3 | $1$ | 1 → $result = M \times M^4 = M^5 = \begin{pmatrix}8&5\\5&3\end{pmatrix}$ | $M^5$ | dừng |

Kiểm tra: $result[0][0] = 8 = F(6)$? Với công thức $M^{n-1}[0][0] = F(n)$: $M^5[0][0] = 8 = F(6)$ ✓ (dãy $0,1,1,2,3,5,8$).

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
    // Tính F(n): F(0)=0, F(1)=1
    long long fibonacci(long long n) {
        if (n == 0) return 0; // trường hợp biên
        Matrix A(2, 2);
        A.a = {{1, 1}, {1, 0}}; // ma trận chuyển Fibonacci
        Matrix result = powerMatrix(A, n - 1); // nâng lên n-1
        return result.a[0][0]; // ô [0][0] chính là F(n)
    }
    ```

=== "Python"

    ```python
    def fibonacci(n):
        # Tính F(n): F(0)=0, F(1)=1
        if n == 0: return 0  # trường hợp biên
        A = [[1, 1], [1, 0]]  # ma trận chuyển Fibonacci
        result = power_matrix(A, n - 1)  # nâng lên n-1
        return result[0][0]  # ô [0][0] chính là F(n)
    ```

---

## 4.3 Lỗi thường gặp (nhân & lũy thừa ma trận)

**SAI — Nhân xong mới mod (tràn số):**
```cpp
// SAI: A.a[i][k] * B.a[k][j] có thể tới (MOD-1)^2 ~ 1e18 -> vừa đủ long long,
// nhưng nếu cộng dồn nhiều lần trước khi mod sẽ tràn!
C.a[i][j] += A.a[i][k] * B.a[k][j]; // rồi mod ở cuối -> SAI khi ma trận lớn
```
**ĐÚNG:** mod ngay trong vòng lặp như code trên: `C.a[i][j] = (C.a[i][j] + A.a[i][k] * B.a[k][j]) % MOD;`

**SAI — Đổi thứ tự nhân:** Ma trận **không giao hoán**! `multiply(result, A)` khác `multiply(A, result)`. Trong `powerMatrix`, khi bit $=1$ phải viết `result = multiply(result, A)` (nhân bên phải), không được đảo thành `multiply(A, result)` — với Fibonacci $2\times2$ đối xứng thì trùng cờ, nhưng ma trận chuyển tổng quát sẽ cho đáp án sai.

**SAI — Quên ma trận đơn vị:** Khởi tạo `result` bằng ma trận 0 thay vì $I$ → mọi phép nhân sau đều ra 0. Luôn bắt đầu `result = identityMatrix(n)` (tương tự `res = 1` trong lũy thừa số).

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