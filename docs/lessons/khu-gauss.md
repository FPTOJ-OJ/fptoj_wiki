# Bài 68: Khử Gauss & Đại Số Tuyến Tính

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** CP-Algorithms, VNOI Wiki

## 0. Mở đầu: giải tay hệ 2 ẩn

$$\begin{cases} 2x + 3y = 8 \\ x - y = 1 \end{cases}$$

Cách bạn làm ở phổ thông: từ phương trình 2, $x = y + 1$, thế vào phương trình 1: $2(y+1) + 3y = 8 \Rightarrow 5y = 6 \Rightarrow y = 1.2$, $x = 2.2$. Khử Gauss là **phiên bản máy móc** của thao tác "thế" này cho hệ $n$ ẩn: dùng hàng này triệt tiêu 1 ẩn ở các hàng khác, lặp lại đến khi ma trận thành dạng bậc thang thì đọc nghiệm. Mọi định thức, nghịch đảo, rank (§2–§4) đều chỉ là "sản phẩm phụ" của cùng một quá trình khử.

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
    const long long MOD = 1e9 + 7;

    // Lũy thừa modulo (MOD nguyên tố)
    long long modPow(long long a, long long e) {
        long long r = 1;
        while (e) {
            if (e & 1) r = r * a % MOD;
            a = a * a % MOD;
            e >>= 1;
        }
        return r;
    }

    // Giải hệ phương trình tuyến tính modulo MOD
    // Trả về nghiệm hoặc rỗng nếu vô nghiệm/vô số nghiệm
    vector<long long> gaussianElimination(vector<vector<long long>> a, vector<long long> b) {
        int n = a.size();
        int m = a[0].size();

        // Tạo ma trận augmented (giữ bản sao a0, b0 để kiểm tra nghiệm sau này)
        vector<vector<long long>> a0 = a;
        vector<long long> b0 = b;
        vector<vector<long long>> aug(n, vector<long long>(m + 1));
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++)
                aug[i][j] = a[i][j];
            aug[i][m] = b[i];
        }

        vector<int> where(m, -1);

        for (int col = 0, row = 0; col < m && row < n; col++) {
            // Tìm pivot: hàng đầu tiên có phần tử khác 0 (mod MOD) ở cột col
            // (Với số học modulo, so sánh abs/1e-9 là vô nghĩa — chỉ cần != 0)
            int sel = -1;
            for (int i = row; i < n; i++) {
                if ((aug[i][col] % MOD + MOD) % MOD != 0) { sel = i; break; }
            }
            if (sel == -1) continue; // cột toàn 0 → bỏ qua

            // Hoán đổi hàng
            swap(aug[sel], aug[row]);
            where[col] = row;

            // Khử cột
            long long inv = modPow(aug[row][col], MOD - 2);
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
                x[i] = aug[where[i]][m] * modPow(aug[where[i]][i], MOD - 2) % MOD;
            }
        }

        // Kiểm tra vô nghiệm trên ma trận GỐC (aug đã bị biến đổi)
        for (int i = 0; i < n; i++) {
            long long sum = 0;
            for (int j = 0; j < m; j++)
                sum = (sum + x[j] * a0[i][j]) % MOD;
            if ((sum - b0[i] % MOD + MOD) % MOD != 0)
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
        a0 = [row[:] for row in a]  # giữ bản gốc để kiểm tra nghiệm
        b0 = b[:]
        aug = [a[i][:] + [b[i]] for i in range(n)]
        where = [-1] * m

        col, row = 0, 0
        while col < m and row < n:
            # Tìm pivot: hàng đầu tiên có phần tử != 0 (mod MOD)
            sel = -1
            for i in range(row, n):
                if aug[i][col] % MOD != 0:
                    sel = i
                    break
            if sel == -1:
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

        # Kiểm tra vô nghiệm trên ma trận GỐC
        for i in range(n):
            s = sum(x[j] * a0[i][j] for j in range(m)) % MOD
            if (s - b0[i] + MOD) % MOD != 0:
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
    long long modPow(long long a, long long e) {
        const long long MOD = 1e9 + 7;
        long long r = 1;
        while (e) {
            if (e & 1) r = r * a % MOD;
            a = a * a % MOD;
            e >>= 1;
        }
        return r;
    }

    long long determinant(vector<vector<long long>> a) {
        int n = a.size();
        const long long MOD = 1e9 + 7;
        long long det = 1;

        for (int col = 0; col < n; col++) {
            // Tìm pivot != 0 (mod MOD)
            int sel = -1;
            for (int row = col; row < n; row++) {
                if ((a[row][col] % MOD + MOD) % MOD != 0) { sel = row; break; }
            }
            if (sel == -1) return 0; // cột toàn 0 → định thức = 0

            if (sel != col) {
                swap(a[sel], a[col]);
                det = (MOD - det) % MOD; // đổi hàng → nhân -1
            }

            det = det * a[col][col] % MOD; // nhân chéo chính vào định thức
            long long inv = modPow(a[col][col], MOD - 2, MOD);
            // Khử các hàng dưới (không cần chuẩn hóa hàng pivot vì det đã nhân)
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
    long long modPow(long long a, long long e) {
        const long long MOD = 1e9 + 7;
        long long r = 1;
        while (e) {
            if (e & 1) r = r * a % MOD;
            a = a * a % MOD;
            e >>= 1;
        }
        return r;
    }

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
            // Tìm pivot != 0 (mod MOD)
            int sel = -1;
            for (int row = col; row < n; row++) {
                if ((aug[row][col] % MOD + MOD) % MOD != 0) { sel = row; break; }
            }
            if (sel == -1) return {}; // Không khả nghịch

            swap(aug[sel], aug[col]);

            long long inv = modPow(aug[col][col], MOD - 2, MOD);
            // Chuẩn hóa hàng pivot thành 1 ở cột col (để vế trái dần thành I)
            for (int j = 0; j < 2 * n; j++)
                aug[col][j] = aug[col][j] * inv % MOD;

            // Khử cột col ở mọi hàng khác (đưa về 0)
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
            // Tìm pivot != 0 (mod MOD)
            int sel = -1;
            for (int i = row; i < n; i++) {
                if ((a[i][col] % MOD + MOD) % MOD != 0) { sel = i; break; }
            }
            if (sel == -1) continue; // cột toàn 0 → không tăng rank

            swap(a[sel], a[row]); // đưa pivot lên hàng hiện tại
            long long inv = modPow(a[row][col], MOD - 2, MOD);
            // Khử các hàng DƯỚI (trên không cần vì rank chỉ đếm pivot)
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

| Mã bài | Tên bài tập | Độ khó | Kiểu bài tập (Bản chất) | Bài học lý thuyết |
| :--- | :--- | :---: | :--- | :--- |
| `ge-2x2` | [Định thức 2x2](https://fptoj.com/problem/ge-2x2) | ⭐ | Định thức đơn giản | [Khử Gauss](khu-gauss.md) |
| `ge-rank` | [Hạng ma trận](https://fptoj.com/problem/ge-rank) | ⭐⭐ | Gaussian rank | [Khử Gauss](khu-gauss.md) |
| `ge-xor` | [XOR basis](https://fptoj.com/problem/ge-xor) | ⭐⭐ | GF(2) basis | [Khử Gauss](khu-gauss.md) |
| `ge-system` | [Giải hệ phương trình](https://fptoj.com/problem/ge-system) | ⭐⭐⭐ | Gaussian system | [Khử Gauss](khu-gauss.md) |
| `ge-det` | [Định thức ma trận](https://fptoj.com/problem/ge-det) | ⭐⭐⭐ | Determinant | [Khử Gauss](khu-gauss.md) |
| `ge-inverse` | [Ma trận nghịch đảo](https://fptoj.com/problem/ge-inverse) | ⭐⭐⭐ | Matrix inverse | [Khử Gauss](khu-gauss.md) |
| `ge-tridiag` | [Ma trận 3 đường chéo](https://fptoj.com/problem/ge-tridiag) | ⭐⭐⭐ | Thomas algorithm | [Khử Gauss](khu-gauss.md) |
| `ge-lights` | [Lights Out](https://fptoj.com/problem/ge-lights) | ⭐⭐⭐⭐ | Gauss GF(2) | [Khử Gauss](khu-gauss.md) |
