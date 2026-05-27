# Bài 68: Khử Gauss & Đại Số Tuyến Tính

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** CP-Algorithms, VNOI Wiki

## 1. Khử Gauss (Gaussian Elimination)

### 1.1 Bài toán

Giải hệ phương trình tuyến tính $n$ ẩn, $n$ phương trình:

$$\begin{cases} a_{11}x_1 + a_{12}x_2 + \cdots + a_{1n}x_n = b_1 \\ a_{21}x_1 + a_{22}x_2 + \cdots + a_{2n}x_n = b_2 \\ \vdots \\ a_{n1}x_1 + a_{n2}x_2 + \cdots + a_{nn}x_n = b_n \end{cases}$$

### 1.2 Ý tưởng

Biến đổi ma trận augmented $[A | b]$ thành dạng bậc thang (row echelon form) bằng các phép biến đổi hàng:
- Hoán đổi 2 hàng
- Nhân hàng với hằng số khác 0
- Cộng bội của hàng này vào hàng khác

### 1.3 Cài đặt (modulo prime)

=== "C++"

    ```cpp
    // Giải hệ phương trình tuyến tính modulo MOD
    // Trả về nghiệm hoặc rỗng nếu vô nghiệm/vô số nghiệm
    vector<long long> gaussianElimination(vector<vector<long long>> a, vector<long long> b) {
        int n = a.size();
        int m = a[0].size();
        const long long MOD = 1e9 + 7;

        // Tạo ma trận augmented
        vector<vector<long long>> aug(n, vector<long long>(m + 1));
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++)
                aug[i][j] = a[i][j];
            aug[i][m] = b[i];
        }

        vector<int> where(m, -1);

        for (int col = 0, row = 0; col < m && row < n; col++) {
            // Tìm pivot
            int sel = row;
            for (int i = row; i < n; i++) {
                if (abs(aug[i][col]) > abs(aug[sel][col]))
                    sel = i;
            }
            if (abs(aug[sel][col]) < 1e-9) continue;

            // Hoán đổi hàng
            swap(aug[sel], aug[row]);
            where[col] = row;

            // Khử cột
            long long inv = powerMod(aug[row][col], MOD - 2, MOD);
            for (int i = 0; i < n; i++) {
                if (i != row) {
                    long long factor = aug[i][col] * inv % MOD;
                    for (int j = col; j <= m; j++) {
                        aug[i][j] = (aug[i][j] - factor * aug[row][j] % MOD + MOD) % MOD;
                    }
                }
            }
            row++;
        }

        // Lấy nghiệm
        vector<long long> x(m, 0);
        for (int i = 0; i < m; i++) {
            if (where[i] != -1) {
                x[i] = aug[where[i]][m] * powerMod(aug[where[i]][i], MOD - 2, MOD) % MOD;
            }
        }

        // Kiểm tra vô nghiệm
        for (int i = 0; i < n; i++) {
            long long sum = 0;
            for (int j = 0; j < m; j++)
                sum = (sum + x[j] * aug[i][j]) % MOD;
            if ((sum - aug[i][m] + MOD) % MOD != 0)
                return {}; // Vô nghiệm
        }
        return x;
    }
    ```

=== "Python"

    ```python
    MOD = 10**9 + 7

    def gaussian_elimination(a, b):
        n = len(a)
        m = len(a[0])
        aug = [a[i][:] + [b[i]] for i in range(n)]
        where = [-1] * m

        col, row = 0, 0
        while col < m and row < n:
            sel = row
            for i in range(row, n):
                if abs(aug[i][col]) > abs(aug[sel][col]):
                    sel = i
            if abs(aug[sel][col]) < 1e-9:
                col += 1
                continue

            aug[sel], aug[row] = aug[row], aug[sel]
            where[col] = row

            inv = pow(aug[row][col], MOD - 2, MOD)
            for i in range(n):
                if i != row:
                    factor = aug[i][col] * inv % MOD
                    for j in range(col, m + 1):
                        aug[i][j] = (aug[i][j] - factor * aug[row][j] % MOD + MOD) % MOD
            row += 1
            col += 1

        x = [0] * m
        for i in range(m):
            if where[i] != -1:
                x[i] = aug[where[i]][m] * pow(aug[where[i]][i], MOD - 2, MOD) % MOD

        # Kiểm tra vô nghiệm
        for i in range(n):
            s = sum(x[j] * aug[i][j] for j in range(m)) % MOD
            if (s - aug[i][m] + MOD) % MOD != 0:
                return None
        return x
    ```

---

## 2. Định thức (Determinant)

### 2.1 Định nghĩa

Định thức của ma trận vuông $A$ (ký hiệu $\det(A)$) là một số biểu thị "hệ số tỷ lệ thể tích" của phép biến đổi tuyến tính.

### 2.2 Tính bằng khử Gauss

Khử ma trận về dạng bậc thang, định thức = tích các phần tử trên đường chéo (nhân thêm $(-1)$ nếu hoán đổi hàng).

=== "C++"

    ```cpp
    long long determinant(vector<vector<long long>> a) {
        int n = a.size();
        const long long MOD = 1e9 + 7;
        long long det = 1;

        for (int col = 0; col < n; col++) {
            int sel = col;
            for (int row = col; row < n; row++) {
                if (abs(a[row][col]) > abs(a[sel][col]))
                    sel = row;
            }
            if (abs(a[sel][col]) < 1e-9) return 0;

            if (sel != col) {
                swap(a[sel], a[col]);
                det = (MOD - det) % MOD; // nhân -1
            }

            det = det * a[col][col] % MOD;
            long long inv = powerMod(a[col][col], MOD - 2, MOD);
            for (int row = col + 1; row < n; row++) {
                long long factor = a[row][col] * inv % MOD;
                for (int j = col; j < n; j++) {
                    a[row][j] = (a[row][j] - factor * a[col][j] % MOD + MOD) % MOD;
                }
            }
        }
        return det;
    }
    ```

---

## 3. Ma Trận Nghịch Đảo

### 3.1 Tính bằng khử Gauss augmented

Tạo ma trận $[A | I]$ (với $I$ là ma trận đơn vị), khử về $[I | A^{-1}]$.

=== "C++"

    ```cpp
    // Trả về ma trận nghịch đảo hoặc ma trận rỗng nếu không khả nghịch
    vector<vector<long long>> inverseMatrix(vector<vector<long long>> a) {
        int n = a.size();
        const long long MOD = 1e9 + 7;

        // Tạo augmented [A | I]
        vector<vector<long long>> aug(n, vector<long long>(2 * n, 0));
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++)
                aug[i][j] = a[i][j];
            aug[i][n + i] = 1;
        }

        // Khử Gauss
        for (int col = 0; col < n; col++) {
            int sel = col;
            for (int row = col; row < n; row++) {
                if (abs(aug[row][col]) > abs(aug[sel][col]))
                    sel = row;
            }
            if (abs(aug[sel][col]) < 1e-9) return {}; // Không khả nghịch

            swap(aug[sel], aug[col]);

            long long inv = powerMod(aug[col][col], MOD - 2, MOD);
            for (int j = 0; j < 2 * n; j++)
                aug[col][j] = aug[col][j] * inv % MOD;

            for (int row = 0; row < n; row++) {
                if (row != col) {
                    long long factor = aug[row][col];
                    for (int j = 0; j < 2 * n; j++) {
                        aug[row][j] = (aug[row][j] - factor * aug[col][j] % MOD + MOD) % MOD;
                    }
                }
            }
        }

        // Lấy phần nghịch đảo
        vector<vector<long long>> inv(n, vector<long long>(n));
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                inv[i][j] = aug[i][n + j];
        return inv;
    }
    ```

---

## 4. Xếp Hạng Ma Trận (Rank)

### 4.1 Định nghĩa

Rank của ma trận = số hàng độc lập tuyến tính sau khi khử Gauss.

=== "C++"

    ```cpp
    int matrixRank(vector<vector<long long>> a) {
        int n = a.size(), m = a[0].size();
        const long long MOD = 1e9 + 7;
        int rank = 0;

        for (int col = 0, row = 0; col < m && row < n; col++) {
            int sel = row;
            for (int i = row; i < n; i++) {
                if (abs(a[i][col]) > abs(a[sel][col]))
                    sel = i;
            }
            if (abs(a[sel][col]) < 1e-9) continue;

            swap(a[sel], a[row]);
            long long inv = powerMod(a[row][col], MOD - 2, MOD);
            for (int i = row + 1; i < n; i++) {
                long long factor = a[i][col] * inv % MOD;
                for (int j = col; j < m; j++) {
                    a[i][j] = (a[i][j] - factor * a[row][j] % MOD + MOD) % MOD;
                }
            }
            rank++;
            row++;
        }
        return rank;
    }
    ```

---

## 5. Ứng dụng trong thi đấu

### 5.1 Số cây khung (Kirchhoff's theorem)

Số cây khung của đồ thị = bất kỳ cofactor nào của ma trận Laplacian.

### 5.2 Bài toán Lights Out

Ma trận nhị phân, mỗi hàng biểu diễn một công tắc → khử Gauss modulo 2.

### 5.3 DP trên bitmask với ma trận

Một số bài toán DP trên bitmask có thể tối ưu bằng nhân ma trận.

---

## 6. Bài tập luyện tập

### Bài 1: Giải hệ phương trình tuyến tính

**Đề bài:** Cho hệ $n$ phương trình tuyến tính $n$ ẩn modulo $10^9+7$. Tìm nghiệm hoặc xác định vô nghiệm.

**Input:**
- Dòng 1: số nguyên $n$ $(1 \leq n \leq 100)$
- $n$ dòng: $n+1$ số nguyên $a_{i1}, a_{i2}, \ldots, a_{in}, b_i$ (hệ số và vế phải)

**Output:** Nếu có nghiệm duy nhất: in $n$ số $x_1, x_2, \ldots, x_n$. Nếu vô nghiệm hoặc vô số nghiệm: `NO SOLUTION`.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `2`<br>`1 1 3`<br>`1 -1 1` | `2 1` |

**Giải thích:** $x_1 + x_2 = 3$, $x_1 - x_2 = 1$. Giải: $x_1 = 2, x_2 = 1$.

??? tip "Lời giải"
    Khử Gauss trên ma trận augmented.
    
    === "C++"
    
        ```cpp
        #include <bits/stdc++.h>
        using namespace std;
        const long long MOD = 1e9 + 7;
    
        long long powerMod(long long a, long long b, long long mod) {
            long long res = 1; a %= mod;
            while (b > 0) {
                if (b & 1) res = res * a % mod;
                a = a * a % mod; b >>= 1;
            }
            return res;
        }
    
        int main() {
            int n; cin >> n;
            vector<vector<long long>> a(n, vector<long long>(n + 1));
            for (int i = 0; i < n; i++)
                for (int j = 0; j <= n; j++)
                    cin >> a[i][j];
    
            vector<int> where(n, -1);
            for (int col = 0, row = 0; col < n && row < n; col++) {
                int sel = row;
                for (int i = row; i < n; i++)
                    if (abs(a[i][col]) > abs(a[sel][col])) sel = i;
                if (abs(a[sel][col]) < 1e-9) continue;
                swap(a[sel], a[row]);
                where[col] = row;
                long long inv = powerMod(a[row][col], MOD - 2, MOD);
                for (int i = 0; i < n; i++) {
                    if (i != row) {
                        long long factor = a[i][col] * inv % MOD;
                        for (int j = col; j <= n; j++)
                            a[i][j] = (a[i][j] - factor * a[row][j] % MOD + MOD) % MOD;
                    }
                }
                row++;
            }
    
            vector<long long> x(n, 0);
            for (int i = 0; i < n; i++)
                if (where[i] != -1)
                    x[i] = a[where[i]][n] * powerMod(a[where[i]][i], MOD - 2, MOD) % MOD;
    
            for (int i = 0; i < n; i++) {
                long long sum = 0;
                for (int j = 0; j < n; j++)
                    sum = (sum + x[j] * a[i][j]) % MOD;
                if ((sum - a[i][n] + MOD) % MOD != 0) {
                    cout << "NO SOLUTION\n"; return 0;
                }
            }
            for (int i = 0; i < n; i++) cout << x[i] << " \n"[i == n - 1];
        }
        ```
---

### Bài 2: Định thức ma trận

**Đề bài:** Cho ma trận vuông $n \times n$. Tính định thức modulo $10^9+7$.

**Input:**
- Dòng 1: số nguyên $n$ $(1 \leq n \leq 100)$
- $n$ dòng: $n$ số nguyên $a_{ij}$

**Output:** Định thức modulo $10^9+7$.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `2`<br>`1 2`<br>`3 4` | `999999994` |

**Giải thích:** $\det = 1 \cdot 4 - 2 \cdot 3 = -2 \equiv 10^9+5 \pmod{10^9+7}$.

??? tip "Lời giải"
    Khử Gauss, tích đường chéo (nhân $-1$ nếu hoán đổi hàng).
    
    === "C++"
    
        ```cpp
        #include <bits/stdc++.h>
        using namespace std;
        const long long MOD = 1e9 + 7;
    
        long long powerMod(long long a, long long b, long long mod) {
            long long res = 1; a %= mod;
            while (b > 0) {
                if (b & 1) res = res * a % mod;
                a = a * a % mod; b >>= 1;
            }
            return res;
        }
    
        int main() {
            int n; cin >> n;
            vector<vector<long long>> a(n, vector<long long>(n));
            for (int i = 0; i < n; i++)
                for (int j = 0; j < n; j++)
                    cin >> a[i][j];
    
            long long det = 1;
            for (int col = 0; col < n; col++) {
                int sel = col;
                for (int row = col; row < n; row++)
                    if (abs(a[row][col]) > abs(a[sel][col])) sel = row;
                if (abs(a[sel][col]) < 1e-9) { cout << 0 << "\n"; return 0; }
                if (sel != col) { swap(a[sel], a[col]); det = (MOD - det) % MOD; }
                det = det * a[col][col] % MOD;
                long long inv = powerMod(a[col][col], MOD - 2, MOD);
                for (int row = col + 1; row < n; row++) {
                    long long factor = a[row][col] * inv % MOD;
                    for (int j = col; j < n; j++)
                        a[row][j] = (a[row][j] - factor * a[col][j] % MOD + MOD) % MOD;
                }
            }
            cout << det << "\n";
        }
        ```
---

### Bài 3: Ma trận nghịch đảo

**Đề bài:** Cho ma trận vuông $n \times n$ modulo $10^9+7$. Tìm ma trận nghịch đảo hoặc xác định không khả nghịch.

**Input:**
- Dòng 1: số nguyên $n$ $(1 \leq n \leq 100)$
- $n$ dòng: $n$ số nguyên $a_{ij}$

**Output:** Nếu khả nghịch: in ma trận nghịch đảo $n \times n$. Nếu không: `NOT INVERTIBLE`.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `2`<br>`1 2`<br>`3 4` | `999999993 499999997`<br>`499999998 999999994` |

??? tip "Lời giải"
    Khử Gauss augmented $[A | I]$ về $[I | A^{-1}]$.
---

### Bài 4: Xếp hạng ma trận

**Đề bài:** Cho ma trận $n \times m$. Tính hạng (rank) của ma trận modulo $10^9+7$.

**Input:**
- Dòng 1: 2 số nguyên $n, m$ $(1 \leq n, m \leq 100)$
- $n$ dòng: $m$ số nguyên $a_{ij}$

**Output:** Hạng của ma trận.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `3 3`<br>`1 2 3`<br>`4 5 6`<br>`7 8 9` | `2` |

??? tip "Lời giải"
    Khử Gauss, đếm số hàng có pivot.