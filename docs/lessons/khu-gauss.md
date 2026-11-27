# Bài 66: Khử Gauss & Đại Số Tuyến Tính

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
    // Trả về 1 nghiệm (gán các ẩn tự do = 0), hoặc rỗng nếu hệ VÔ NGHIỆM
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
            long long inv = modPow(a[col][col], MOD - 2);
            // Khử các hàng dưới (không cần chuẩn hóa hàng pivot vì det đã nhân)
            for (int row = col + 1; row < n; row++) {
                long long factor = a[row][col] * inv % MOD;
                for (int j = col; j < n; j++) {
                    a[row][j] = (a[row][j] - factor * a[col][j] % MOD + MOD) % MOD;
                }
            }
        }
        return (det % MOD + MOD) % MOD;
    }
    ```

=== "Python"

    ```python
    MOD = 10**9 + 7

    def determinant(a):
        n = len(a)
        a = [[x % MOD for x in row] for row in a]
        det = 1
        for col in range(n):
            sel = -1
            for row in range(col, n):
                if a[row][col] != 0:
                    sel = row
                    break
            if sel == -1:
                return 0
            if sel != col:
                a[sel], a[col] = a[col], a[sel]
                det = (MOD - det) % MOD
            det = det * a[col][col] % MOD
            inv = pow(a[col][col], MOD - 2, MOD)
            for row in range(col + 1, n):
                factor = a[row][col] * inv % MOD
                for j in range(col, n):
                    a[row][j] = (a[row][j] - factor * a[col][j]) % MOD
        return det
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

            long long inv = modPow(aug[col][col], MOD - 2);
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

=== "Python"

    ```python
    MOD = 10**9 + 7

    def inverse_matrix(a):
        n = len(a)
        aug = [[a[i][j] % MOD for j in range(n)] + [1 if i == j else 0 for j in range(n)] for i in range(n)]
        for col in range(n):
            sel = -1
            for row in range(col, n):
                if aug[row][col] != 0:
                    sel = row
                    break
            if sel == -1:
                return None  # Không khả nghịch
            aug[sel], aug[col] = aug[col], aug[sel]
            inv = pow(aug[col][col], MOD - 2, MOD)
            for j in range(2 * n):
                aug[col][j] = aug[col][j] * inv % MOD
            for row in range(n):
                if row != col and aug[row][col] != 0:
                    factor = aug[row][col]
                    for j in range(2 * n):
                        aug[row][j] = (aug[row][j] - factor * aug[col][j]) % MOD
        return [row[n:] for row in aug]
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
            long long inv = modPow(a[row][col], MOD - 2);
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

=== "Python"

    ```python
    MOD = 10**9 + 7

    def matrix_rank(a):
        n, m = len(a), len(a[0])
        a = [[x % MOD for x in row] for row in a]
        rank = row = 0
        for col in range(m):
            if row >= n:
                break
            sel = -1
            for i in range(row, n):
                if a[i][col] != 0:
                    sel = i
                    break
            if sel == -1:
                continue
            a[sel], a[row] = a[row], a[sel]
            inv = pow(a[row][col], MOD - 2, MOD)
            for i in range(row + 1, n):
                factor = a[i][col] * inv % MOD
                for j in range(col, m):
                    a[i][j] = (a[i][j] - factor * a[row][j]) % MOD
            rank += 1
            row += 1
        return rank
    ```

---

## 5. Ứng dụng trong thi đấu

### 5.1 Số cây khung (Định lý Kirchhoff)

Với đồ thị vô hướng $n$ đỉnh, dựng ma trận Laplacian $L = D - A$ (trong đó $L_{ii} = \deg(i)$, còn $L_{ij} = -(\text{số cạnh nối } i, j)$ với $i \neq j$). Xóa 1 hàng và 1 cột cùng chỉ số bất kỳ (thường bỏ hàng cuối, cột cuối) thu được ma trận $L'$ cỡ $(n-1) \times (n-1)$:

$$\text{Số cây khung} = \det(L')$$

### 5.2 XOR Basis (Khử Gauss trên $\mathbb{F}_2$)

Khi bài toán yêu cầu tìm tổng XOR lớn nhất từ một tập con của dãy $a$, hoặc đếm số giá trị XOR tạo được, mỗi số nguyên là một vector nhị phân trong $\mathbb{F}_2$. Ta duy trì mảng `basis[b]` lưu vector đại diện có bit cao nhất ở vị trí `b`:

=== "C++"

    ```cpp
    struct XorBasis {
        int B = 60;
        vector<long long> basis;
        int sz = 0;
        XorBasis(int bits = 60) : B(bits), basis(bits, 0) {}

        void insert(long long x) {
            for (int b = B - 1; b >= 0; b--) {
                if (!(x >> b & 1)) continue;
                if (!basis[b]) { basis[b] = x; sz++; return; }
                x ^= basis[b];
            }
        }

        long long maxXor() {
            long long res = 0;
            for (int b = B - 1; b >= 0; b--)
                res = max(res, res ^ basis[b]);
            return res;
        }
    };
    ```

=== "Python"

    ```python
    class XorBasis:
        def __init__(self, bits=60):
            self.bits = bits
            self.basis = [0] * bits
            self.sz = 0

        def insert(self, x):
            for b in range(self.bits - 1, -1, -1):
                if not (x >> b & 1):
                    continue
                if self.basis[b] == 0:
                    self.basis[b] = x
                    self.sz += 1
                    return
                x ^= self.basis[b]

        def max_xor(self):
            res = 0
            for b in range(self.bits - 1, -1, -1):
                res = max(res, res ^ self.basis[b])
            return res
    ```

### 5.3 Bài toán Lights Out (Hệ phương trình modulo 2)

Mỗi ô trên bảng là 1 biến $x_i \in \{0, 1\}$ (bấm hay không bấm công tắc). Mỗi phương trình biểu diễn tổng bấm mod 2 của ô đó và các ô kề phải bằng trạng thái cần lật $\Rightarrow$ giải bằng khử Gauss trên $\mathbb{F}_2$ (có thể dùng `bitset<N>` trong C++ để tăng tốc $64$ lần, độ phức tạp $O(N^3 / 64)$).

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

---

**Bài trước:** [← Bài 65: NTT & Nhân Đa Thức](ntt-nhan-da-thuc.md) | **Bài tiếp theo:** [Bài 67: Hình Học Cơ Bản →](hinh-hoc-co-ban.md)
