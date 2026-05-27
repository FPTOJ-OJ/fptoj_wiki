# Bài 18: Euclid & Modular Inverse

> **Tác giả:** Hà Trí Kiên
> **Nội dung tham khảo từ:** VNOI Wiki - Thuật toán Euclid, Nghịch đảo modulo

---

## 1. GCD - Ước Chung Lớn Nhất

### Bản chất vấn đề

Cho hai số nguyên dương $a$ và $b$, tìm ước chung lớn nhất $\gcd(a, b)$.

**Ví dụ:** Bạn có 12 viên kẹo đỏ và 8 viên kẹo xanh. Muốn chia thành nhiều túi đều nhau, mỗi túi cùng số đỏ và xanh. Mỗi túi tối đa bao nhiêu viên? Đáp án là $\gcd(12, 8) = 4$.

### Tư duy cốt lõi

Thuật toán Euclid dựa trên tính chất:

$$
\gcd(a, b) = \gcd(b, a \bmod b) \quad \text{với } b > 0
$$

$$
\gcd(a, 0) = a
$$

**Giải thích:** Nếu $d$ là ước chung của $a$ và $b$, thì $d$ cũng là ước của $a \bmod b$. Bởi vì $a = q \times b + r$ nên $r = a - q \times b$, mà $d$ chia hết cả $a$ lẫn $b$, nên $d$ chia hết $r$.

### Minh họa thuật toán

Ví dụ tính $\gcd(48, 18)$:

| Bước | $a$ | $b$ | $a \bmod b$ | Ghi chú |
|------|-----|-----|-------------|---------|
| 1 | 48 | 18 | 12 | $48 = 2 \times 18 + 12$ |
| 2 | 18 | 12 | 6 | $18 = 1 \times 12 + 6$ |
| 3 | 12 | 6 | 0 | $12 = 2 \times 6 + 0$ |
| 4 | 6 | 0 | - | Kết thúc, $\gcd = 6$ |

Ví dụ tính $\gcd(100, 35)$:

| Bước | $a$ | $b$ | $a \bmod b$ | Ghi chú |
|------|-----|-----|-------------|---------|
| 1 | 100 | 35 | 30 | $100 = 2 \times 35 + 30$ |
| 2 | 35 | 30 | 5 | $35 = 1 \times 30 + 5$ |
| 3 | 30 | 5 | 0 | $30 = 6 \times 5 + 0$ |
| 4 | 5 | 0 | - | Kết thúc, $\gcd = 5$ |

### Cài đặt

=== "C++"

    ```cpp
    long long gcd(long long a, long long b) {
        while (b) {
            a %= b;
            swap(a, b);
        }
        return a;
    }

    long long lcm(long long a, long long b) {
        return a / gcd(a, b) * b;
    }
    ```

=== "Python"

    ```python
    import math

    def gcd(a, b):
        while b:
            a, b = b, a % b
        return a

    def lcm(a, b):
        return a // gcd(a, b) * b

    g = math.gcd(12, 8)
    l = math.lcm(12, 8)
    ```

### Phân tích tính đúng đắn

Mỗi lần thực hiện $a \bmod b$, giá trị của $a$ giảm đi ít nhất một nửa. Cụ thể, nếu $a \geq b$ thì $a \bmod b < b$. Nếu $a < b$ thì phép đổi chỗ sẽ khiến $a$ mới $< b$ cũ. Do đó cặp $(a, b)$ luôn giảm dần và tiến về $(d, 0)$.

### Đánh giá độ phức tạp

- **Thời gian:** $O(\log(\min(a, b)))$. Số bước tối đa tỷ lệ với số chữ số Fibonacci, xấp xỉ $1.44 \log_2(\min(a, b))$.
- **Bộ nhớ:** $O(1)$ cho phiên bản khử đệ quy.

---

## 2. Extended Euclid - Euclid Mở Rộng

### Bản chất vấn đề

Cho $a, b$, tìm hai số nguyên $x, y$ sao cho:

$$
a \cdot x + b \cdot y = \gcd(a, b)
$$

Nghiệm **luôn tồn tại** theo định lý Bézout.

### Tư duy cốt lõi

Gọi $\gcd(a, b) = \gcd(b, a \bmod b)$. Giả sử đã biết $x', y'$ sao cho:

$$
b \cdot x' + (a \bmod b) \cdot y' = \gcd(a, b)
$$

Vì $a \bmod b = a - \left\lfloor \frac{a}{b} \right\rfloor \cdot b$ (với $\lfloor x \rfloor$ là phần nguyên — làm tròn xuống — của $x$), thay vào:

$$
b \cdot x' + \left(a - \left\lfloor \frac{a}{b} \right\rfloor \cdot b\right) \cdot y' = \gcd(a, b)
$$

$$
a \cdot y' + b \cdot \left(x' - \left\lfloor \frac{a}{b} \right\rfloor \cdot y'\right) = \gcd(a, b)
$$

So sánh với $a \cdot x + b \cdot y = \gcd(a, b)$, ta được:

$$
x = y', \quad y = x' - \left\lfloor \frac{a}{b} \right\rfloor \cdot y'
$$

### Cài đặt

=== "C++"

    ```cpp
    long long extendedGcd(long long a, long long b, long long &x, long long &y) {
        if (b == 0) {
            x = 1;
            y = 0;
            return a;
        }
        long long x1, y1;
        long long g = extendedGcd(b, a % b, x1, y1);
        x = y1;
        y = x1 - (a / b) * y1;
        return g;
    }
    ```

=== "Python"

    ```python
    def extended_gcd(a, b):
        if b == 0:
            return a, 1, 0
        g, x1, y1 = extended_gcd(b, a % b)
        x = y1
        y = x1 - (a // b) * y1
        return g, x, y
    ```

### Minh họa

Tính $\gcd(35, 15)$ và tìm $x, y$:

| Bước | $a$ | $b$ | $a \bmod b$ | $x'$ | $y'$ | $x = y'$ | $y = x' - \lfloor a/b \rfloor \cdot y'$ |
|------|-----|-----|-------------|------|------|----------|------------------------------------------|
| 1 | 35 | 15 | 5 | (từ bước 2) | (từ bước 2) | | |
| 2 | 15 | 5 | 0 | (từ bước 3) | (từ bước 3) | | |
| 3 | 5 | 0 | - | 1 | 0 | | |

Dãy trả về: bước 3 cho $(x, y) = (1, 0)$ với $g = 5$. Bước 2: $x = 0$, $y = 1 - 3 \times 0 = 1$. Bước 1: $x = 1$, $y = 0 - 2 \times 1 = -2$.

Kết quả: $\gcd = 5$, $x = 1$, $y = -2$. Kiểm tra: $35 \times 1 + 15 \times (-2) = 35 - 30 = 5$.

### Phân tích tính đúng đắn

Quy hoạch động ngược đúng vì mỗi bước ta biểu diễn $\gcd(a, b)$ thành tổ hợp tuyến tính của $a$ và $b$ dựa trên biểu diễn của $\gcd(b, a \bmod b)$. Điều kiện dừng $b = 0$ cho $a \cdot 1 + 0 \cdot 0 = a = \gcd(a, 0)$.

### Đánh giá độ phức tạp

- **Thời gian:** $O(\log(\min(a, b)))$, tương tự Euclid thường.
- **Bộ nhớ:** $O(\log(\min(a, b)))$ cho ngăn xếp đệ quy. Có thể viết lại thành khử đệ quy để đạt $O(1)$ bộ nhớ.

---

## 3. Modular Inverse - Nghịch Đảo Modulo

### Bản chất vấn đề

Cho số nguyên $a$ và modulo $M$, tìm $x$ sao cho:

$$
a \cdot x \equiv 1 \pmod{M}
$$

Nghịch đảo modulo tồn tại khi và chỉ khi $\gcd(a, M) = 1$ (tức $a$ và $M$ nguyên tố cùng nhau).

**Ví dụ:** Trong modulo 7, vì $3 \times 5 = 15 \equiv 1 \pmod{7}$ nên 5 là nghịch đảo modulo của 3. Khi đó phép chia $a / 3 \pmod{7}$ được thay bằng $a \times 5 \pmod{7}$.

### Tư duy cốt lõi

Có hai phương pháp tính nghịch đảo modulo:

**Phương pháp 1: Định lý Fermat nhỏ (khi $M$ là số nguyên tố)**

Nếu $p$ là số nguyên tố và $\gcd(a, p) = 1$, theo định lý Fermat nhỏ:

$$
a^{p-1} \equiv 1 \pmod{p}
$$

Nhân hai vế với $a^{-1}$:

$$
a \cdot a^{p-2} \equiv 1 \pmod{p}
$$

$$
\Rightarrow a^{-1} \equiv a^{p-2} \pmod{p}
$$

Vậy nghịch đảo modulo của $a$ là $a^{M-2} \bmod M$ khi $M$ là số nguyên tố.

**Phương pháp 2: Extended Euclid (tổng quát)**

Từ phương trình $a \cdot x + M \cdot y = \gcd(a, M) = 1$, lấy hai vế modulo $M$:

$$
a \cdot x \equiv 1 \pmod{M}
$$

Vậy $x$ chính là nghịch đảo modulo của $a$. Ưu điểm: hoạt động với mọi $M$, không cần $M$ là số nguyên tố.

### Cài đặt

=== "C++"

    ```cpp
    const long long MOD = 1e9 + 7;

    long long powerMod(long long a, long long b, long long mod) {
        long long result = 1;
        a %= mod;
        while (b > 0) {
            if (b & 1) result = (__int128)result * a % mod;
            a = (__int128)a * a % mod;
            b >>= 1;
        }
        return result;
    }

    long long modInverse(long long a, long long mod) {
        return powerMod(a, mod - 2, mod);
    }

    long long modInverseGcd(long long a, long long mod) {
        long long x, y;
        long long g = extendedGcd(a, mod, x, y);
        if (g != 1) return -1;
        return (x % mod + mod) % mod;
    }

    long long modDivide(long long a, long long b, long long mod) {
        return (__int128)a * modInverse(b, mod) % mod;
    }
    ```

=== "Python"

    ```python
    MOD = 10**9 + 7

    def power_mod(a, b, mod):
        result = 1
        a %= mod
        while b > 0:
            if b & 1:
                result = result * a % mod
            a = a * a % mod
            b >>= 1
        return result

    def mod_inverse(a, mod):
        return power_mod(a, mod - 2, mod)

    def mod_inverse_gcd(a, mod):
        g, x, y = extended_gcd(a, mod)
        if g != 1:
            return -1
        return (x % mod + mod) % mod

    def mod_divide(a, b, mod):
        return a * mod_inverse(b, mod) % mod
    ```

### Minh họa

Tính $3^{-1} \pmod{7}$ bằng Fermat:

| Bước | Tính | Kết quả |
|------|------|---------|
| 1 | Tính $3^{7-2} = 3^5$ | $3^5 = 243$ |
| 2 | $243 \bmod 7$ | $243 - 34 \times 7 = 5$ |
| 3 | Kiểm tra: $3 \times 5 = 15 \equiv 1 \pmod{7}$ | Đúng |

Bảng nghịch đảo modulo 7:

| $a$ | 1 | 2 | 3 | 4 | 5 | 6 |
|-----|---|---|---|---|---|---|
| $a^{-1} \pmod{7}$ | 1 | 4 | 5 | 2 | 3 | 6 |

Kiểm tra: $2 \times 4 = 8 \equiv 1$, $3 \times 5 = 15 \equiv 1$, $6 \times 6 = 36 \equiv 1$ (nghịch đảo của 6 là chính nó).

### Phân tích tính đúng đắn

**Fermat:** Áp dụng được khi $M$ là số nguyên tố. Định lý Fermat nhỏ đảm bảo $a^{M-1} \equiv 1 \pmod{M}$ nên $a^{M-2}$ là nghịch đảo.

**Extended Euclid:** Tổng quát hơn. Nếu $\gcd(a, M) = 1$ thì tồn tại $x, y$ với $ax + My = 1$. Lấy modulo $M$ ta được $ax \equiv 1 \pmod{M}$. Nếu $\gcd(a, M) > 1$ thì nghịch đảo không tồn tại.

### Đánh giá độ phức tạp

- **Fermat:** $O(\log M)$ nhờ lũy thừa nhị phân.
- **Extended Euclid:** $O(\log(\min(a, M)))$.
- Cả hai phương pháp đều dùng $O(1)$ bộ nhớ (nếu Euclid viết khử đệ quy).

**Lưu ý khi cài đặt:**

- $(a / b) \% M \neq (a \% M) / (b \% M)$. Phải chuyển thành $a \times b^{-1} \bmod M$.
- Khi nhân hai số `long long` rồi lấy modulo, dùng `(__int128)` ở C++ để tránh tràn số.
- Các modulo thường dùng: $10^9 + 7$ (nguyên tố), $998244353$ (nguyên tố, dùng cho NTT).

---

## 4. Ứng Dụng: Tính $C_n^k \bmod p$

### Bản chất vấn đề

Tính tổ hợp $C_n^k = \frac{n!}{k! \cdot (n-k)!} \pmod{p}$ với $p$ là số nguyên tố.

### Tư duy cốt lõi

Biến đổi phép chia thành phép nhân với nghịch đảo modulo:

$$
C_n^k \equiv n! \times (k!)^{-1} \times ((n-k)!)^{-1} \pmod{p}
$$

Để trả lời nhiều truy vấn nhanh, ta precompute giai thừa và nghịch đảo giai thừa trước.

### Cài đặt

=== "C++"

    ```cpp
    long long fact[1000001], inv_fact[1000001];

    void buildFactorial(int n) {
        fact[0] = 1;
        for (int i = 1; i <= n; i++)
            fact[i] = fact[i-1] * i % MOD;

        inv_fact[n] = powerMod(fact[n], MOD - 2, MOD);

        for (int i = n - 1; i >= 0; i--)
            inv_fact[i] = inv_fact[i+1] * (i+1) % MOD;
    }

    long long nCk(int n, int k) {
        if (k < 0 || k > n) return 0;
        return fact[n] % MOD * inv_fact[k] % MOD * inv_fact[n-k] % MOD;
    }
    ```

=== "Python"

    ```python
    MOD = 10**9 + 7

    def build_factorial(n):
        fact = [1] * (n + 1)
        for i in range(1, n + 1):
            fact[i] = fact[i - 1] * i % MOD

        inv_fact = [1] * (n + 1)
        inv_fact[n] = pow(fact[n], MOD - 2, MOD)
        for i in range(n - 1, -1, -1):
            inv_fact[i] = inv_fact[i + 1] * (i + 1) % MOD

        return fact, inv_fact

    def nCk(n, k, fact, inv_fact):
        if k < 0 or k > n:
            return 0
        return fact[n] * inv_fact[k] % MOD * inv_fact[n - k] % MOD
    ```

### Phân tích tính đúng đắn

Tính $\text{inv\_fact}[i]$ từ $\text{inv\_fact}[i+1]$ dựa trên đẳng thức:

$$
(i!)^{-1} = ((i+1)!)^{-1} \times (i+1)
$$

Điều này đúng vì $(i+1)! = (i+1) \times i!$, nên lấy nghịch đảo hai vế ta được $(i!)^{-1} = ((i+1)!)^{-1} \times (i+1)$.

### Đánh giá độ phức tạp

- **Preprocess:** $O(n)$ thời gian, $O(n)$ bộ nhớ.
- **Mỗi truy vấn $C_n^k$:** $O(1)$.

---

## 5. Bài Tập Luyện Tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Exponentiation](https://cses.fi/problemset/task/1095) | CSES | ⭐⭐ | Power mod |
| [CSES - Exponentiation II](https://cses.fi/problemset/task/1096) | CSES | ⭐⭐ | Fermat |
| [SPOJ - GCD](https://www.spoj.com/problems/GCD/) | SPOJ | ⭐ | GCD cơ bản |
| [CSES - Binomial Coefficients](https://cses.fi/problemset/task/1079) | CSES | ⭐⭐ | Modular inverse |
| [VNOJ - VPOWER](https://oj.vnoi.info/problem/vpower) | VNOJ | ⭐⭐ | Power mod |
| [VNOJ - VOMARBLE](https://oj.vnoi.info/problem/vomarble) | VNOJ | ⭐⭐⭐ | Combinatorics |
| [SPOJ - DIVSUM](https://www.spoj.com/problems/DIVSUM/) | SPOJ | ⭐⭐ | Ước số |

## Bài Viết Liên Quan

- [Bài 11: Lũy thừa nhị phân](luy-thua-nhi-phan-sang-nguyen-to.md)
- [Bài 19: Tổ hợp & Xác suất](to-hop-xac-suat.md)
- [Bài 26: Số học nâng cao](so-hoc-nang-cao.md)

## Tài Liệu Tham Khảo

- [VNOI Wiki - Thuật toán Euclid](https://wiki.vnoi.info/algo/algebra/euclid)
- [VNOI Wiki - Nghịch đảo modulo](https://wiki.vnoi.info/algo/math/modular-inverse)
- [CP-Algorithms - Euclidean Algorithm](https://cp-algorithms.com/algebra/euclid-algorithm.html)
- [CP-Algorithms - Modular Inverse](https://cp-algorithms.com/algebra/module-inverse.html)

**Bài tiếp theo:** [Tổ hợp & Xác suất](to-hop-xac-suat.md)
