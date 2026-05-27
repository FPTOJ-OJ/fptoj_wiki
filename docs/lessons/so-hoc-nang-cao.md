# Bài 26: Số Học Nâng Cao - Euler Totient, Modular Arithmetic & CRT

> **Tác giả:** Hà Trí Kiên<br>
> **Nội dung tham khảo từ:** VNOI Wiki - Số học, HackerEarth Number Theory Series, CP-Algorithms

---

## 1. Euler Totient - Đếm số nguyên tố cùng nhau

### Bản chất vấn đề

Cho số nguyên dương $N$, cần đếm số nguyên dương $x \in [1, N]$ sao cho $\gcd(x, N) = 1$. Gọi kết quả là $\varphi(N)$ (Euler's Totient).

| $N$ | Các số nguyên tố cùng nhau với $N$ | $\varphi(N)$ |
|-----|--------------------------------------|---------------|
| 1   | $\{1\}$                              | 1             |
| 7   | $\{1, 2, 3, 4, 5, 6\}$              | 6             |
| 9   | $\{1, 2, 4, 5, 7, 8\}$              | 6             |
| 12  | $\{1, 5, 7, 11\}$                   | 4             |

### Tư duy cốt lõi

Cho $N = p_1^{a_1} \times p_2^{a_2} \times \cdots \times p_k^{a_k}$ (phân tích thừa số nguyên tố), trong đó $p_i$ là các thừa số nguyên tố phân biệt của $N$, $a_i$ là số mũ tương ứng. Công thức:

$$\varphi(N) = N \times \prod_{i=1}^{k} \left(1 - \frac{1}{p_i}\right) = N \times \frac{\prod (p_i - 1)}{\prod p_i}$$

($\prod$ là ký hiệu tích — nhân tất cả các phần tử)

**Chứng minh trực giác:** Dùng nguyên lý bao hàm - loại trừ (inclusion-exclusion). Trong $N$ số từ $1$ đến $N$, loại bỏ bội của $p_1, p_2, \ldots$, rồi cộng lại phần bị trừ trùng.

**Tính chất quan trọng:**

| Tính chất | Công thức | Ý nghĩa |
|-----------|-----------|----------|
| Số nguyên tố | $\varphi(p) = p - 1$ | Mọi số $< p$ đều nguyên tố cùng nhau với $p$ |
| Lũy thừa nguyên tố | $\varphi(p^k) = p^k - p^{k-1} = p^{k-1}(p - 1)$ | Chỉ loại bội của $p$ |
| Nhân tính | $\varphi(m \times n) = \varphi(m) \times \varphi(n)$ nếu $\gcd(m, n) = 1$ | Chia nhỏ bài toán |
| Tổng chia hết | $\sum_{d \mid N} \varphi(d) = N$ (với $d \mid N$ nghĩa là $d$ chia hết $N$) | Dùng trong nhiều bài đếm |

### Phân tích tính đúng đắn

Với $N = 12 = 2^2 \times 3$:

$$\varphi(12) = 12 \times \left(1 - \frac{1}{2}\right) \times \left(1 - \frac{1}{3}\right) = 12 \times \frac{1}{2} \times \frac{2}{3} = 4$$

Kiểm tra: $\{1, 5, 7, 11\}$ - đúng 4 số, thỏa $\gcd(x, 12) = 1$.

### Đánh giá độ phức tạp

| Thuật toán | Độ phức tạp | Ghi chú |
|-----------|-------------|---------|
| Tính $\varphi(n)$ đơn lẻ | $O(\sqrt{n})$ | Phân tích thử từ 2 đến $\sqrt{n}$ |
| Sàng Euler (tính $\varphi$ cho $1 \ldots N$) | $O(N \log \log N)$ | Tương tự sàng Eratosthenes |

=== "C++"

    ```cpp
    // Tính φ(n) đơn lẻ - O(sqrt(n))
    long long eulerPhi(long long n) {
        long long result = n;
        for (long long i = 2; i * i <= n; i++) {
            if (n % i == 0) {
                while (n % i == 0) n /= i;
                result -= result / i;
            }
        }
        if (n > 1) result -= result / n;
        return result;
    }

    // Sàng Euler - tính φ cho tất cả số từ 1 đến N - O(N log log N)
    vector<int> eulerSieve(int n) {
        vector<int> phi(n + 1);
        for (int i = 0; i <= n; i++) phi[i] = i;
        for (int i = 2; i <= n; i++) {
            if (phi[i] == i) {
                for (int j = i; j <= n; j += i)
                    phi[j] -= phi[j] / i;
            }
        }
        return phi;
    }
    ```

=== "Python"

    ```python
    # Tính φ(n) đơn lẻ - O(sqrt(n))
    def euler_phi(n):
        result = n
        i = 2
        while i * i <= n:
            if n % i == 0:
                while n % i == 0:
                    n //= i
                result -= result // i
            i += 1
        if n > 1:
            result -= result // n
        return result

    # Sàng Euler - tính φ cho tất cả số từ 1 đến N - O(N log log N)
    def euler_sieve(n):
        phi = list(range(n + 1))
        for i in range(2, n + 1):
            if phi[i] == i:
                for j in range(i, n + 1, i):
                    phi[j] -= phi[j] // i
        return phi
    ```

---

## 2. Modular Arithmetic & Tổ hợp modulo

### Bản chất vấn đề

Khi tính toán với số rất lớn, ta lấy dư cho một số nguyên tố $p$ (thường $p = 10^9 + 7$). Phép chia modulo không trực tiếp được mà phải dùng **modular inverse**.

### Tư duy cốt lõi

**Các phép tính modulo cơ bản:**

| Phép tính | Công thức | Lưu ý |
|-----------|-----------|-------|
| Cộng | $(a + b) \bmod p = ((a \bmod p) + (b \bmod p)) \bmod p$ | Trực tiếp |
| Trừ | $(a - b) \bmod p = ((a \bmod p) - (b \bmod p) + p) \bmod p$ | Cộng $p$ để tránh âm |
| Nhân | $(a \times b) \bmod p = ((a \bmod p) \times (b \bmod p)) \bmod p$ | Trực tiếp |
| Chia | $(a / b) \bmod p = (a \times b^{p-2}) \bmod p$ | Chỉ đúng khi $p$ nguyên tố |

**Phép chia modulo** thực chất là **nhân với modular inverse**. Modular inverse của $b$ modulo $p$ là số $b^{-1}$ sao cho $b \times b^{-1} \equiv 1 \pmod{p}$.

Khi $p$ nguyên tố, dùng **Fermat's Little Theorem**: $b^{-1} \equiv b^{p-2} \pmod{p}$.

**Công thức tổ hợp:**

$$C(n, k) = \frac{n!}{k! \times (n - k)!}$$

$$C(n, k) \bmod p = \text{fact}[n] \times \text{inv\_fact}[k] \times \text{inv\_fact}[n - k] \bmod p$$

Với $\text{inv\_fact}[i]$ là modular inverse của $i!$.

### Phân tích tính đúng đắn

Tính $C(5, 2) \bmod (10^9 + 7)$:

- $\text{fact}[5] = 120$, $\text{fact}[2] = 2$, $\text{fact}[3] = 6$
- $\text{inv\_fact}[2] = 2^{10^9+5} \bmod (10^9+7) = 500000004$
- $\text{inv\_fact}[3] = 6^{10^9+5} \bmod (10^9+7) = 166666668$
- $C(5,2) = 120 \times 500000004 \times 166666668 \bmod (10^9+7) = 10$

Kiểm tra: $C(5,2) = 10$ - đúng.

### Đánh giá độ phức tạp

| Thuật toán | Độ phức tạp | Ghi chú |
|-----------|-------------|---------|
| Lũy thừa modulo $a^b \bmod p$ | $O(\log b)$ | Binary exponentiation |
| Xây dựng factorial + inverse | $O(N)$ | Precompute một lần |
| Truy vấn $C(n,k)$ | $O(1)$ | Sau khi precompute |

=== "C++"

    ```cpp
    const long long MOD = 1e9 + 7;
    long long fact[1000001], inv_fact[1000001];

    long long powerMod(long long a, long long b, long long mod) {
        long long result = 1;
        a %= mod;
        while (b > 0) {
            if (b & 1) result = result * a % mod;
            a = a * a % mod;
            b >>= 1;
        }
        return result;
    }

    long long modInverse(long long a, long long mod) {
        return powerMod(a, mod - 2, mod);
    }

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

    long long nPk(int n, int k) {
        if (k < 0 || k > n) return 0;
        return fact[n] % MOD * inv_fact[n-k] % MOD;
    }
    ```

=== "Python"

    ```python
    MOD = 10**9 + 7

    def power_mod(a, b, mod=MOD):
        result = 1
        a %= mod
        while b > 0:
            if b & 1:
                result = result * a % mod
            a = a * a % mod
            b >>= 1
        return result

    def mod_inverse(a, mod=MOD):
        return power_mod(a, mod - 2, mod)

    def build_factorial(n):
        fact = [1] * (n + 1)
        for i in range(1, n + 1):
            fact[i] = fact[i-1] * i % MOD
        inv_fact = [1] * (n + 1)
        inv_fact[n] = power_mod(fact[n], MOD - 2)
        for i in range(n - 1, -1, -1):
            inv_fact[i] = inv_fact[i+1] * (i+1) % MOD
        return fact, inv_fact

    def nCk(n, k, fact, inv_fact):
        if k < 0 or k > n: return 0
        return fact[n] * inv_fact[k] % MOD * inv_fact[n-k] % MOD
    ```

---

## 3. Lucas Theorem

### Bản chất vấn đề

Khi $n$ rất lớn (ví dụ $10^{18}$) nhưng $p$ nhỏ (ví dụ $10^6$), ta không thể tính $\text{fact}[n]$ trực tiếp vì $n > p$ khiến $\text{fact}[n] \equiv 0 \pmod{p}$. Cần một phương pháp chia nhỏ bài toán.

### Tư duy cốt lõi

Biểu diễn $n$ và $k$ ở hệ cơ số $p$:

$$n = n_0 + n_1 \cdot p + n_2 \cdot p^2 + \cdots$$

$$k = k_0 + k_1 \cdot p + k_2 \cdot p^2 + \cdots$$

Thì:

$$C(n, k) \bmod p = \prod_{i} C(n_i, k_i) \bmod p = C(n_0, k_0) \times C(n_1, k_1) \times \cdots \bmod p$$

**Lưu ý:** Nếu bất kỳ $k_i > n_i$ thì $C(n_i, k_i) = 0$, toàn bộ tích bằng 0.

**Ví dụ:** Tính $C(10, 3) \bmod 3$.

| Chữ số hệ cơ số 3 | $n_i$ | $k_i$ | $C(n_i, k_i) \bmod 3$ |
|---------------------|-------|-------|------------------------|
| $i = 0$             | 1     | 0     | 1                      |
| $i = 1$             | 0     | 1     | 0                      |

$C(10, 3) \bmod 3 = 1 \times 0 = 0$.

### Phân tích tính đúng đắn

Lucas Theorem đúng vì $C(n, k)$ trong trường $\mathbb{Z}_p$ có thể phân tích theo từng chữ số hệ cơ số $p$, tương tự cách khai triển đa thức $(1 + x)^n \bmod p$.

**Điều kiện áp dụng:** $p$ phải là số nguyên tố.

### Đánh giá độ phức tạp

| Thuật toán | Độ phức tạp | Ghi chú |
|-----------|-------------|---------|
| Lucas Theorem | $O(\log_p n \cdot p)$ | $\log_p n$ chữ số, mỗi chữ số tính $C(n_i, k_i)$ |
| $C(n_i, k_i)$ trực tiếp | $O(k_i)$ | Vì $n_i, k_i < p$ |

=== "C++"

    ```cpp
    long long nCk_small(long long n, long long k, long long p) {
        if (k > n) return 0;
        long long res = 1;
        for (long long i = 0; i < k; i++) {
            res = res * (n - i) % p;
            res = res * powerMod(i + 1, p - 2, p) % p;
        }
        return res;
    }

    long long lucasCnk(long long n, long long k, long long p) {
        if (k == 0) return 1;
        long long ni = n % p, ki = k % p;
        if (ki > ni) return 0;
        return lucasCnk(n / p, k / p, p) * nCk_small(ni, ki, p) % p;
    }
    ```

=== "Python"

    ```python
    def nCk_small(n, k, p):
        if k > n: return 0
        res = 1
        for i in range(k):
            res = res * (n - i) % p
            res = res * power_mod(i + 1, p - 2, p) % p
        return res

    def lucas_cnk(n, k, p):
        if k == 0: return 1
        ni, ki = n % p, k % p
        if ki > ni: return 0
        return lucas_cnk(n // p, k // p, p) * nCk_small(ni, ki, p) % p
    ```

---

## 4. Chinese Remainder Theorem (CRT)

### Bản chất vấn đề

Cho các cặp $(a_1, m_1), (a_2, m_2), \ldots, (a_k, m_k)$ với $m_i$ đôi một nguyên tố cùng nhau, tìm $x$ sao cho:

$$x \equiv a_1 \pmod{m_1}$$

$$x \equiv a_2 \pmod{m_2}$$

$$\vdots$$

$$x \equiv a_k \pmod{m_k}$$

Nghiệm duy nhất modulo $M = m_1 \times m_2 \times \cdots \times m_k$.

### Tư duy cốt lõi

**Trường hợp 2 phương trình:**

Cho $x \equiv a_1 \pmod{m_1}$ và $x \equiv a_2 \pmod{m_2}$ với $\gcd(m_1, m_2) = 1$:

- $M = m_1 \times m_2$
- $M_1 = M / m_1$, $M_2 = M / m_2$
- $y_1 = M_1^{-1} \bmod m_1$, $y_2 = M_2^{-1} \bmod m_2$
- $x = (a_1 \times M_1 \times y_1 + a_2 \times M_2 \times y_2) \bmod M$

**Mở rộng cho nhiều phương trình:** Gộp từng cặp một cách tuần tự.

### Phân tích tính đúng đắn

**Ví dụ:**

| Phương trình | $a_i$ | $m_i$ |
|-------------|-------|-------|
| $x \equiv 2 \pmod{3}$ | 2 | 3 |
| $x \equiv 3 \pmod{5}$ | 3 | 5 |
| $x \equiv 2 \pmod{7}$ | 2 | 7 |

- $M = 3 \times 5 \times 7 = 105$
- Gộp $(2, 3)$ và $(3, 5)$: $x = 8 \pmod{15}$
- Gộp $(8, 15)$ và $(2, 7)$: $x = 23 \pmod{105}$

Kiểm tra: $23 \bmod 3 = 2$, $23 \bmod 5 = 3$, $23 \bmod 7 = 2$ - đúng.

### Đánh giá độ phức tạp

| Thuật toán | Độ phức tạp | Ghi chú |
|-----------|-------------|---------|
| CRT 2 phương trình | $O(\log m)$ | Extended GCD |
| CRT $k$ phương trình | $O(k \log m)$ | Gộp tuần tự |

=== "C++"

    ```cpp
    long long extGcd(long long a, long long b, long long &x, long long &y) {
        if (b == 0) { x = 1; y = 0; return a; }
        long long x1, y1;
        long long g = extGcd(b, a % b, x1, y1);
        x = y1;
        y = x1 - (a / b) * y1;
        return g;
    }

    long long modInverseGcd(long long a, long long m) {
        long long x, y;
        long long g = extGcd(a, m, x, y);
        if (g != 1) return -1;
        return (x % m + m) % m;
    }

    pair<long long, long long> crt2(long long a1, long long m1, long long a2, long long m2) {
        long long M = m1 * m2;
        long long M1 = M / m1, M2 = M / m2;
        long long y1 = modInverseGcd(M1, m1);
        long long y2 = modInverseGcd(M2, m2);
        long long x = (a1 * M1 % M * y1 % M + a2 * M2 % M * y2 % M) % M;
        return {(x + M) % M, M};
    }

    pair<long long, long long> crt(vector<pair<long long,long long>> eqs) {
        long long a1 = eqs[0].first, m1 = eqs[0].second;
        for (int i = 1; i < (int)eqs.size(); i++) {
            auto [a2, m2] = eqs[i];
            auto [x, M] = crt2(a1, m1, a2, m2);
            a1 = x; m1 = M;
        }
        return {a1, m1};
    }
    ```

=== "Python"

    ```python
    def ext_gcd(a, b):
        if b == 0:
            return a, 1, 0
        g, x1, y1 = ext_gcd(b, a % b)
        return g, y1, x1 - (a // b) * y1

    def mod_inverse_gcd(a, m):
        g, x, y = ext_gcd(a, m)
        if g != 1:
            return -1
        return (x % m + m) % m

    def crt2(a1, m1, a2, m2):
        M = m1 * m2
        M1, M2 = M // m1, M // m2
        y1 = mod_inverse_gcd(M1, m1)
        y2 = mod_inverse_gcd(M2, m2)
        x = (a1 * M1 * y1 + a2 * M2 * y2) % M
        return (x + M) % M, M

    def crt(equations):
        a1, m1 = equations[0]
        for a2, m2 in equations[1:]:
            a1, m1 = crt2(a1, m1, a2, m2)
        return a1, m1
    ```

---

## 5. Hàm Möbius

### Bản chất vấn đề

Hàm Möbius $\mu(n)$ là công cụ đếm mạnh mẽ, xuất hiện trong phép đảo ngược Möbius (Möbius inversion) và nhiều bài toán đếm cặp số nguyên tố cùng nhau.

### Tư duy cốt lõi

**Định nghĩa:**

| Điều kiện | $\mu(n)$ | Ví dụ |
|-----------|----------|-------|
| $n = 1$ | $1$ | $\mu(1) = 1$ |
| $n$ có thừa số nguyên tố bậc $\geq 2$ | $0$ | $\mu(4) = 0$, $\mu(12) = 0$ |
| $n = p_1 p_2 \cdots p_k$ (tích của $k$ nguyên tố phân biệt) | $(-1)^k$ | $\mu(6) = 1$, $\mu(30) = -1$ |

**Tính chất cốt lõi** (hàm nghịch đảo của hàm hằng số 1 theo convolution Dirichlet):

$$\sum_{d \mid n} \mu(d) = \begin{cases} 1 & \text{neu } n = 1 \\ 0 & \text{neu } n > 1 \end{cases}$$

**Möbius Inversion:** Nếu $f(n) = \sum_{d \mid n} g(d)$ thì $g(n) = \sum_{d \mid n} \mu(d) \cdot f(n/d)$.

### Phân tích tính đúng đắn

Kiểm tra $\sum_{d \mid 6} \mu(d)$:

| $d$ | $\mu(d)$ |
|-----|----------|
| 1   | 1        |
| 2   | -1       |
| 3   | -1       |
| 6   | 1        |

Tổng: $1 + (-1) + (-1) + 1 = 0 = [6 = 1]$ - đúng.

### Đánh giá độ phức tạp

| Thuật toán | Độ phức tạp | Ghi chú |
|-----------|-------------|---------|
| Tính $\mu(n)$ đơn lẻ | $O(\sqrt{n})$ | Phân tích thử |
| Sàng Möbius (tính $\mu$ cho $1 \ldots N$) | $O(N \log \log N)$ | Linear sieve |

=== "C++"

    ```cpp
    vector<int> mobiusSieve(int n) {
        vector<int> mu(n + 1, 1);
        vector<bool> isPrime(n + 1, true);
        vector<int> primes;
        mu[0] = 0;
        for (int i = 2; i <= n; i++) {
            if (isPrime[i]) {
                primes.push_back(i);
                mu[i] = -1;
            }
            for (int p : primes) {
                if (i * p > n) break;
                isPrime[i * p] = false;
                if (i % p == 0) {
                    mu[i * p] = 0;
                    break;
                }
                mu[i * p] = -mu[i];
            }
        }
        return mu;
    }

    int mobiusSingle(int n) {
        int cnt = 0;
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) {
                n /= i;
                cnt++;
                if (n % i == 0) return 0;
            }
        }
        if (n > 1) cnt++;
        return (cnt % 2 == 0) ? 1 : -1;
    }
    ```

=== "Python"

    ```python
    def mobius_sieve(n):
        mu = [1] * (n + 1)
        is_prime = [True] * (n + 1)
        primes = []
        mu[0] = 0
        for i in range(2, n + 1):
            if is_prime[i]:
                primes.append(i)
                mu[i] = -1
            for p in primes:
                if i * p > n:
                    break
                is_prime[i * p] = False
                if i % p == 0:
                    mu[i * p] = 0
                    break
                mu[i * p] = -mu[i]
        return mu

    def mobius_single(n):
        cnt = 0
        i = 2
        while i * i <= n:
            if n % i == 0:
                n //= i
                cnt += 1
                if n % i == 0:
                    return 0
            i += 1
        if n > 1:
            cnt += 1
        return 1 if cnt % 2 == 0 else -1
    ```

---

## 6. Pollard's Rho - Phân tích thừa số lớn

### Bản chất vấn đề

Phân tích thừa số nguyên tố của số $n$ rất lớn (lên $10^{18}$). Trial division $O(\sqrt{n})$ quá chậm. Cần thuật toán nhanh hơn.

### Tư duy cốt lõi

Sử dụng hàm $f(x) = (x^2 + c) \bmod n$ để tạo dãy số. Dùng **Floyd's cycle detection** (hare-tortoise) để tìm $\gcd(|x_i - x_j|, n) \neq 1$, tức là tìm được ước không tầm thường.

**Hai thành phần chính:**

| Thành phần | Vai trò |
|-----------|---------|
| Miller-Rabin | Kiểm tra nguyên tố - $O(k \log^2 n)$ |
| Pollard's Rho | Tìm ước không tầm thường - $O(n^{1/4})$ trung bình |

**Miller-Rabin:** Viết $n - 1 = 2^r \cdot d$, kiểm tra $a^d \bmod n$ với nhiều cơ sở $a$. Đủ 12 cơ bộ $\{2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37\}$ cho $n < 2^{64}$.

### Phân tích tính đúng đắn

Pollard's Rho dựa trên **Birthday Paradox**: dãy $\{f(f(\cdots f(x_0)\cdots))\} \bmod n$ sẽ chu kỳ sau $O(\sqrt{n})$ bước. Khi phát hiện chu kỳ, $\gcd(|x - y|, n)$ có xác suất cao là ước không tầm thường của $n$.

### Đánh giá độ phức tạp

| Thuật toán | Độ phức tạp | Ghi chú |
|-----------|-------------|---------|
| Miller-Rabin | $O(k \log^2 n)$ | $k$ là số cơ sở |
| Pollard's Rho | $O(n^{1/4})$ trung bình | Có thể chậm hơn trong worst case |
| Phân tích thừa số đầy đủ | $O(n^{1/4} \log n)$ | Gọi đệ quy Pollard's Rho |

=== "C++"

    ```cpp
    long long mulMod(long long a, long long b, long long mod) {
        return (__int128)a * b % mod;
    }

    bool millerRabin(long long n) {
        if (n < 2) return false;
        if (n == 2 || n == 3) return true;
        if (n % 2 == 0) return false;

        long long d = n - 1;
        int r = 0;
        while (d % 2 == 0) { d /= 2; r++; }

        vector<long long> bases = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37};
        for (long long a : bases) {
            if (a >= n) continue;
            long long x = powerMod(a, d, n);
            if (x == 1 || x == n - 1) continue;
            bool composite = true;
            for (int i = 0; i < r - 1; i++) {
                x = mulMod(x, x, n);
                if (x == n - 1) { composite = false; break; }
            }
            if (composite) return false;
        }
        return true;
    }

    bool isPrime(long long n) {
        return millerRabin(n);
    }

    long long pollardRho(long long n) {
        if (n % 2 == 0) return 2;
        long long x = rand() % (n - 2) + 2;
        long long y = x;
        long long c = rand() % (n - 1) + 1;
        long long d = 1;
        while (d == 1) {
            x = (mulMod(x, x, n) + c) % n;
            y = (mulMod(y, y, n) + c) % n;
            y = (mulMod(y, y, n) + c) % n;
            d = __gcd(abs(x - y), n);
            if (d == n) return pollardRho(n);
        }
        return d;
    }

    void factorize(long long n, map<long long,int> &factors) {
        if (n == 1) return;
        if (isPrime(n)) { factors[n]++; return; }
        long long d = pollardRho(n);
        factorize(d, factors);
        factorize(n / d, factors);
    }
    ```

=== "Python"

    ```python
    import random
    from math import gcd

    def miller_rabin(n):
        if n < 2: return False
        if n == 2 or n == 3: return True
        if n % 2 == 0: return False

        d = n - 1
        r = 0
        while d % 2 == 0:
            d //= 2
            r += 1

        bases = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]
        for a in bases:
            if a >= n: continue
            x = power_mod(a, d, n)
            if x == 1 or x == n - 1: continue
            composite = True
            for _ in range(r - 1):
                x = x * x % n
                if x == n - 1:
                    composite = False
                    break
            if composite: return False
        return True

    def pollard_rho(n):
        if n % 2 == 0: return 2
        x = random.randint(2, n - 1)
        y = x
        c = random.randint(1, n - 1)
        d = 1
        while d == 1:
            x = (x * x + c) % n
            y = (y * y + c) % n
            y = (y * y + c) % n
            d = gcd(abs(x - y), n)
            if d == n: return pollard_rho(n)
        return d

    def factorize(n, factors=None):
        if factors is None:
            factors = {}
        if n == 1: return factors
        if miller_rabin(n):
            factors[n] = factors.get(n, 0) + 1
            return factors
        d = pollard_rho(n)
        factorize(d, factors)
        factorize(n // d, factors)
        return factors
    ```

---

## 7. Ứng dụng thực tế

### 7.1 Đếm số cặp nguyên tố cùng nhau

**Bài toán:** Cho mảng $A[1..N]$, đếm số cặp $(i, j)$ với $i < j$ sao cho $\gcd(A[i], A[j]) = 1$.

**Cách làm:** Dùng hàm Möbius và nguyên lý bao hàm - loại trừ:

$$\text{ans} = \sum_{d=1}^{\text{MAX}} \mu(d) \times \binom{\text{cnt}[d]}{2}$$

Với $\text{cnt}[d]$ là số phần tử trong mảng chia hết cho $d$.

=== "C++"

    ```cpp
    const int MAX_VAL = 1000000;
    int cnt[MAX_VAL + 1];

    long long countCoprimePairs(vector<int> &a) {
        int n = a.size();
        vector<int> mu = mobiusSieve(MAX_VAL);

        for (int x : a) {
            for (int d = 1; d * d <= x; d++) {
                if (x % d == 0) {
                    cnt[d]++;
                    if (d * d != x) cnt[x / d]++;
                }
            }
        }

        long long ans = 0;
        for (int d = 1; d <= MAX_VAL; d++) {
            if (mu[d] == 0) continue;
            long long c = cnt[d];
            ans += mu[d] * c * (c - 1) / 2;
        }
        return ans;
    }
    ```

=== "Python"

    ```python
    MAX_VAL = 1000000

    def count_coprime_pairs(a):
        mu = mobius_sieve(MAX_VAL)
        cnt = [0] * (MAX_VAL + 1)

        for x in a:
            d = 1
            while d * d <= x:
                if x % d == 0:
                    cnt[d] += 1
                    if d * d != x:
                        cnt[x // d] += 1
                d += 1

        ans = 0
        for d in range(1, MAX_VAL + 1):
            if mu[d] == 0: continue
            c = cnt[d]
            ans += mu[d] * c * (c - 1) // 2
        return ans
    ```

### 7.2 Euler's Theorem cho Modular Exponentiation với số mũ lớn

Khi tính $a^b \bmod n$ với $b$ rất lớn (ví dụ $b = 10^{10^{18}}$), dùng Euler's Theorem để rút gọn:

$$a^b \equiv a^{b \bmod \varphi(n)} \pmod{n} \quad \text{khi } \gcd(a, n) = 1$$

Khi $\gcd(a, n) \neq 1$ và $b \geq \varphi(n)$:

$$a^b \equiv a^{b \bmod \varphi(n) + \varphi(n)} \pmod{n}$$

=== "C++"

    ```cpp
    long long powerModLarge(long long a, string b, long long n) {
        long long phi_n = eulerPhi(n);
        long long b_mod_phi = 0;
        for (char c : b) {
            b_mod_phi = (b_mod_phi * 10 + (c - '0')) % phi_n;
        }
        return powerMod(a, b_mod_phi, n);
    }

    long long powerModLargeGeneral(long long a, string b, long long n) {
        long long phi_n = eulerPhi(n);
        long long b_mod_phi = 0;
        bool b_ge_phi = false;
        for (char c : b) {
            b_mod_phi = b_mod_phi * 10 + (c - '0');
            if (b_mod_phi >= phi_n) {
                b_ge_phi = true;
                b_mod_phi %= phi_n;
            }
        }
        if (b_ge_phi) b_mod_phi += phi_n;
        return powerMod(a, b_mod_phi, n);
    }
    ```

=== "Python"

    ```python
    def power_mod_large(a, b_str, n):
        phi_n = euler_phi(n)
        b_mod_phi = 0
        for c in b_str:
            b_mod_phi = (b_mod_phi * 10 + int(c)) % phi_n
        return power_mod(a, b_mod_phi, n)

    def power_mod_large_general(a, b_str, n):
        phi_n = euler_phi(n)
        b_mod_phi = 0
        b_ge_phi = False
        for c in b_str:
            b_mod_phi = b_mod_phi * 10 + int(c)
            if b_mod_phi >= phi_n:
                b_ge_phi = True
                b_mod_phi %= phi_n
        if b_ge_phi:
            b_mod_phi += phi_n
        return power_mod(a, b_mod_phi, n)
    ```

### 7.3 Möbius Inversion - Đếm cặp GCD

**Bài toán:** Đếm số cặp $(i, j)$ với $1 \leq i \leq N$, $1 \leq j \leq M$ sao cho $\gcd(i, j) = 1$.

**Công thức:** $\sum_{d=1}^{\min(N,M)} \mu(d) \times \lfloor N/d \rfloor \times \lfloor M/d \rfloor$ (với $\lfloor x \rfloor$ là phần nguyên — làm tròn xuống — của $x$)

=== "C++"

    ```cpp
    long long countCoprimePairs(int n, int m) {
        vector<int> mu = mobiusSieve(max(n, m));
        long long ans = 0;
        for (int d = 1; d <= min(n, m); d++) {
            if (mu[d] == 0) continue;
            ans += (long long)mu[d] * (n / d) * (m / d);
        }
        return ans;
    }
    ```

=== "Python"

    ```python
    def count_coprime_pairs(n, m):
        mu = mobius_sieve(max(n, m))
        ans = 0
        for d in range(1, min(n, m) + 1):
            if mu[d] == 0: continue
            ans += mu[d] * (n // d) * (m // d)
        return ans
    ```

### 7.4 RSA Cryptography (tóm tắt)

RSA sử dụng Euler's Totient:

| Bước | Thao tác | Công thức |
|------|---------|-----------|
| 1 | Chọn 2 số nguyên tố lớn $p$, $q$ | $n = p \times q$, $\varphi(n) = (p-1)(q-1)$ |
| 2 | Chọn $e$ sao cho $\gcd(e, \varphi(n)) = 1$ | Khóa công khai: $(e, n)$ |
| 3 | Tính $d = e^{-1} \bmod \varphi(n)$ | Khóa bí mật: $(d, n)$ |
| 4 | Mã hóa | $c = m^e \bmod n$ |
| 5 | Giải mã | $m = c^d \bmod n$ |

---

## 8. Lưu ý & Cạm bẫy

### 8.1 Modular Arithmetic Pitfalls

| Bẫy | Sai | Đúng |
|-----|-----|------|
| Chia modulo khi modulus không nguyên tố | $a / b \bmod m = a \times b^{m-2} \bmod m$ | Dùng Extended GCD, yêu cầu $\gcd(b, m) = 1$ |
| Trừ ra số âm | `result = (a - b) % MOD` | `result = ((a - b) % MOD + MOD) % MOD` |
| Overflow khi nhân | `a * b % MOD` khi $a, b > 10^9$ | `(__int128)a * b % MOD` |

### 8.2 Lucas Theorem - Điều kiện áp dụng

- **Chỉ áp dụng khi $p$ là số nguyên tố.** Nếu $p$ không nguyên tố, Lucas theorem không đúng.
- Khi $p$ nhỏ ($\leq 10^6$) và $n$ rất lớn ($10^{18}$).
- Nếu $p$ lớn (ví dụ $10^9 + 7$), Lucas theorem không hữu ích vì $n < p$ trong hầu hết bài toán.

### 8.3 Xử lý giai thừa lớn

Khi nào $\text{fact}[n]$ không tính được trực tiếp? Khi $n > \text{MOD}$ ($10^9 + 7$). Khi đó $\text{fact}[n] \equiv 0 \pmod{\text{MOD}}$ vì $\text{MOD} \mid n!$.

**Cách xử lý:**

| Phương pháp | Khi nào dùng |
|-------------|---------------|
| Lucas Theorem | $\text{MOD}$ là số nguyên tố |
| Phân tích thừa số nguyên tố của $\text{MOD}$ | $\text{MOD}$ không nguyên tố |
| $C(n,k) \bmod p^e$ (Granville's generalization) | Trường hợp tổng quát |

### 8.4 Euler's Theorem vs Fermat's Little Theorem

| Định lý | Công thức | Điều kiện |
|---------|-----------|-----------|
| Fermat | $a^{p-1} \equiv 1 \pmod{p}$ | $p$ nguyên tố, $\gcd(a, p) = 1$ |
| Euler | $a^{\varphi(n)} \equiv 1 \pmod{n}$ | $\gcd(a, n) = 1$ |

Fermat là trường hợp đặc biệt của Euler vì $\varphi(p) = p - 1$.

**Khi tính $a^b \bmod n$:**

- Nếu $\gcd(a, n) = 1$: dùng Euler, $a^b \equiv a^{b \bmod \varphi(n)} \pmod{n}$
- Nếu $\gcd(a, n) \neq 1$: dùng kỹ thuật tách thừa số, $a^b \equiv a^{b \bmod \varphi(n) + \varphi(n)} \pmod{n}$ khi $b \geq \varphi(n)$

### 8.5 Các bẫy thường gặp khác

| Bẫy | Giải pháp |
|-----|-----------|
| Quên `mod` ở mỗi bước tính | Luôn `% MOD` sau mỗi phép nhân/cộng |
| Dùng `MOD = 1e9+7` nhưng quên nó là số nguyên tố | Kiểm tra tính nguyên tố của modulus trước |
| Tính `inv_fact` sai thứ tự | Phải tính từ $n$ xuống $0$ |
| Lucas trả về 0 nhưng thực tế $C(n,k) \neq 0$ | Kiểm tra $k_i > n_i$ ở mỗi chữ số |
| CRT cho modulus không nguyên tố cùng nhau | Dùng CRT tổng quát (với GCD chung) |

---

## 9. Bài tập luyện tập

### 9.1 Euler Totient & Modular Arithmetic

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [SPOJ - ETF](https://www.spoj.com/problems/ETF/) | SPOJ | ⭐⭐ | Euler Totient đơn lẻ |
| [SPOJ - GCDEX](https://www.spoj.com/problems/GCDEX/) | SPOJ | ⭐⭐⭐ | GCD + Euler Totient |
| [CSES - Exponentiation](https://cses.fi/problemset/task/1095) | CSES | ⭐⭐ | Lũy thừa modulo |
| [CSES - Exponentiation II](https://cses.fi/problemset/task/1096) | CSES | ⭐⭐⭐ | Euler's theorem |
| [CSES - Binomial Coefficients](https://cses.fi/problemset/task/1079) | CSES | ⭐⭐ | Tổ hợp modulo |
| [SPOJ - NCNK](https://www.spoj.com/problems/NCNK/) | SPOJ | ⭐⭐ | Tổ hợp lớn |

### 9.2 CRT & Lucas

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CF - Strange Housing](https://codeforces.com/problemset/problem/1470/A) | CF | ⭐⭐⭐ | CRT cơ bản |
| [SPOJ - Chinese Remainder Theorem](https://www.spoj.com/problems/CRTEASY/) | SPOJ | ⭐⭐ | CRT trực tiếp |
| [CF - Little Pony and Harmony Chest](https://codeforces.com/problemset/problem/453/B) | CF | ⭐⭐⭐⭐ | Tổ hợp + bitmask |

### 9.3 Möbius & Đếm cặp

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CF - GCD Table](https://codeforces.com/problemset/problem/582/A) | CF | ⭐⭐⭐ | GCD + tư duy |
| [SPOJ - VLATTICE](https://www.spoj.com/problems/VLATTICE/) | SPOJ | ⭐⭐⭐ | Möbius 3D |
| [CF - Neko and Aki's Prank](https://codeforces.com/problemset/problem/1152/C) | CF | ⭐⭐⭐ | Euler + tổ hợp |
| [CSES - Counting Coprime Pairs](https://cses.fi/problemset/task/2417) | CSES | ⭐⭐⭐ | Möbius đếm cặp |

### 9.4 Pollard's Rho & Factorization

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [SPOJ - FACT0](https://www.spoj.com/problems/FACT0/) | SPOJ | ⭐⭐ | Phân tích thừa số |
| [SPOJ - FACT1](https://www.spoj.com/problems/FACT1/) | SPOJ | ⭐⭐⭐ | Phân tích số lớn |
| [CF - Almost Everywhere Zero](https://codeforces.com/problemset/problem/1105/D) | CF | ⭐⭐⭐ | Phân tích + đếm |

### 9.5 Tổng hợp & Nâng cao

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CF - Yet Another Number Theory Problem](https://codeforces.com/problemset/problem/1436/D) | CF | ⭐⭐⭐ | Tổng hợp số học |
| [CSES - NIM Game I](https://cses.fi/problemset/task/1730) | CSES | ⭐⭐ | Game theory + GCD |
| [SPOJ - GCDEX2](https://www.spoj.com/problems/GCDEX2/) | SPOJ | ⭐⭐⭐⭐ | GCD nâng cao |
| [LeetCode - Count Primes](https://leetcode.com/problems/count-primes/) | LeetCode | ⭐⭐ | Đếm số nguyên tố |
| [LeetCode - Ugly Number II](https://leetcode.com/problems/ugly-number-ii/) | LeetCode | ⭐⭐ | Số nguyên tố + DP |
| [VNOJ - Euler Totient (etf)](https://oj.vnoi.info/problem/etf) | VNOJ | ⭐⭐ | Phi hàm Euler |
| [VNOJ - Tìm số (findnum)](https://oj.vnoi.info/problem/findnum) | VNOJ | ⭐⭐ | Số học |
| [VNOJ - Số phong phú (nkabd)](https://oj.vnoi.info/problem/nkabd) | VNOJ | ⭐⭐ | Ước số |

---

## Bài viết liên quan

- [Bài 11: Lũy thừa nhị phân & Sàng nguyên tố](luy-thua-nhi-phan-sang-nguyen-to.md)
- [Bài 18: Euclid & Modular Inverse](euclid-modular-inverse.md)
- [Bài 19: Tổ hợp & Xác suất](to-hop-xac-suat.md)

## Tài liệu tham khảo

- [HackerEarth - Number Theory 1-7](https://www.hackerearth.com/practice/math/number-theory/basic-number-theory-1/tutorial/)
- [VNOI Wiki - Số học](https://vnoi.info/translate/he/So-hoc-Phan-1-Modulo-gcd)
- [CP-Algorithms - Euler Function](https://cp-algorithms.com/algebra/phi-function.html)
- [CP-Algorithms - Modular Inverse](https://cp-algorithms.com/algebra/module-inverse.html)
- [CP-Algorithms - Chinese Remainder Theorem](https://cp-algorithms.com/algebra/chinese-remainder-theorem.html)
- [CP-Algorithms - Möbius Function](https://cp-algorithms.com/algebra/mobius-function.html)
- [CP-Algorithms - Pollard's Rho](https://cp-algorithms.com/algebra/factorization.html)
- [GeeksforGeeks - Euler's Totient Function](https://www.geeksforgeeks.org/dsa/eulers-totient-function/)
