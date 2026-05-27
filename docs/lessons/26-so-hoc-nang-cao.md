# Bài 26: Số Học Nâng Cao - Euler Totient, Modular Arithmetic & CRT

> **Tác giả:** Hà Trí Kiên<br>
> **Nội dung tham khảo từ:** VNOI Wiki - Số học, HackerEarth Number Theory Series, CP-Algorithms

## 1. Đếm số nguyên tố cùng nhau - Euler Totient

### 1.1 Khái niệm

**Euler's Totient φ(N)** đếm số nguyên dương từ 1 đến N mà **nguyên tố cùng nhau** với N (tức GCD = 1).

```
φ(12) = 4  →  {1, 5, 7, 11}    vì GCD(x, 12) = 1
φ(7)  = 6  →  {1, 2, 3, 4, 5, 6}  (7 là số nguyên tố → tất cả số < 7 đều nguyên tố cùng nhau)
φ(1)  = 1  →  {1}
φ(9)  = 6  →  {1, 2, 4, 5, 7, 8}
```

**Tại sao quan trọng?** Euler's Totient xuất hiện ở nhiều nơi:

- Tính modular inverse qua Euler's theorem
- Đếm số cặp nguyên tố cùng nhau
- RSA cryptography (mã hóa RSA dựa trên φ(n))
- Tổ hợp học đếm

### 1.2 Công thức tính

Cho `N = p1^a1 × p2^a2 × ... × pk^ak` (phân tích thừa số nguyên tố), thì:

```
φ(N) = N × (1 - 1/p1) × (1 - 1/p2) × ... × (1 - 1/pk)
     = N × Π(pi - 1) / Π(pi)
```

**Chứng minh trực giác:** Dùng nguyên lý bao hàm - loại trừ (inclusion-exclusion). Trong N số từ 1..N, loại bỏ bội của p1, p2, ..., rồi cộng lại phần bị trừ trùng.

**Tính chất quan trọng:**

- `φ(p) = p - 1` với p nguyên tố
- `φ(p^k) = p^k - p^(k-1) = p^(k-1) × (p - 1)`
- `φ(m × n) = φ(m) × φ(n)` nếu `GCD(m, n) = 1` (hàm nhân tính)
- `Σ φ(d) = N` với d là tất cả ước của N (tổng chia hết)
=== "C++"

    ```cpp
    // Tính φ(n) đơn lẻ - O(sqrt(n))
    long long eulerPhi(long long n) {
        long long result = n;
        for (long long i = 2; i * i <= n; i++) {
            if (n % i == 0) {
                while (n % i == 0) n /= i;  // loại bỏ hết thừa số i
                result -= result / i;         // nhân (1 - 1/i)
            }
        }
        if (n > 1) result -= result / n;  // thừa số nguyên tố lớn còn lại
        return result;
    }
    
    // Sàng Euler - tính φ cho tất cả số từ 1 đến N - O(N log log N)
    vector<int> eulerSieve(int n) {
        vector<int> phi(n + 1);
        for (int i = 0; i <= n; i++) phi[i] = i;
        for (int i = 2; i <= n; i++) {
            if (phi[i] == i) {  // i là nguyên tố (chưa bị sửa)
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
            if phi[i] == i:  # i là nguyên tố
                for j in range(i, n + 1, i):
                    phi[j] -= phi[j] // i
        return phi
    ```

---

## 2. Tính tổ hợp với modulo

### 2.1 Modular Arithmetic cơ bản

Khi tính toán với số rất lớn, ta lấy dư cho một số nguyên tố `p` (thường `10^9 + 7`).

**Các phép tính modulo:**

```
(a + b) mod p = ((a mod p) + (b mod p)) mod p
(a - b) mod p = ((a mod p) - (b mod p) + p) mod p   // +p để tránh âm
(a × b) mod p = ((a mod p) × (b mod p)) mod p
```

**Phép chia modulo (QUAN TRỌNG):**

```
(a / b) mod p ≠ ((a mod p) / (b mod p)) mod p   ← SAI!

(a / b) mod p = (a × b^(-1)) mod p = (a × b^(p-2)) mod p   ← ĐÚNG (khi p nguyên tố)
```

Phép chia modulo thực chất là **nhân với modular inverse**. Modular inverse của `b` modulo `p` là số `b^(-1)` sao cho `b × b^(-1) ≡ 1 (mod p)`.

### 2.2 Công thức tổ hợp

```
C(n, k) = n! / (k! × (n-k)!)
C(n, k) mod p = fact[n] × inv_fact[k] × inv_fact[n-k] mod p
```

Với `inv_fact[i]` là modular inverse của `i!`.
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
    
    // Modular inverse qua Fermat: a^(-1) = a^(p-2) mod p (p nguyên tố)
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

## 3. Lucas Theorem (khi n rất lớn)

### 3.1 Khi nào dùng?

Khi `n` rất lớn (ví dụ `10^18`) nhưng `p` nhỏ (ví dụ `10^6`), ta không thể tính `fact[n]` trực tiếp. **Lucas Theorem** giúp chia nhỏ bài toán.

### 3.2 Phát biểu

Cho `n` và `k` biểu diễn ở hệ cơ số `p`:

```
n = n0 + n1×p + n2×p² + ...   (chữ số ở hệ cơ số p)
k = k0 + k1×p + k2×p² + ...

C(n, k) mod p = Π C(ni, ki) mod p
              = C(n0, k0) × C(n1, k1) × C(n2, k2) × ... (mod p)
```

**Lưu ý:** Nếu bất kỳ `ki > ni` thì `C(ni, ki) = 0` → toàn bộ tích bằng 0.

### 3.3 Code C++

```cpp
long long lucasCnk(long long n, long long k, long long p) {
    if (k == 0) return 1;
    long long ni = n % p, ki = k % p;
    if (ki > ni) return 0;
    return lucasCnk(n / p, k / p, p) * nCk_small(ni, ki, p) % p;
}

// nCk_small tính trực tiếp cho n, k nhỏ (< p)
long long nCk_small(long long n, long long k, long long p) {
    if (k > n) return 0;
    long long res = 1;
    for (long long i = 0; i < k; i++) {
        res = res * (n - i) % p;
        res = res * powerMod(i + 1, p - 2, p) % p;
    }
    return res;
}
```

---

## 4. Chinese Remainder Theorem (CRT)

### 4.1 Khái niệm

**CRT** giải bài toán: Cho các cặp `(a1, m1), (a2, m2), ..., (ak, mk)` với `mi` đôi một nguyên tố cùng nhau, tìm `x` sao cho:

```
x ≡ a1 (mod m1)
x ≡ a2 (mod m2)
...
x ≡ ak (mod mk)
```

Nghiệm duy nhất modulo `M = m1 × m2 × ... × mk`.

### 4.2 Công thức (2 phương trình)

Cho:
```
x ≡ a1 (mod m1)
x ≡ a2 (mod m2)
```

Với `GCD(m1, m2) = 1`, nghiệm là:

```
M = m1 × m2
M1 = M / m1,  M2 = M / m2
y1 = M1^(-1) mod m1,  y2 = M2^(-1) mod m2

x = (a1 × M1 × y1 + a2 × M2 × y2) mod M
```
=== "C++"

    ```cpp
    // Extended GCD - tìm x, y sao cho a*x + b*y = gcd(a, b)
    long long extGcd(long long a, long long b, long long &x, long long &y) {
        if (b == 0) { x = 1; y = 0; return a; }
        long long x1, y1;
        long long g = extGcd(b, a % b, x1, y1);
        x = y1;
        y = x1 - (a / b) * y1;
        return g;
    }
    
    // Modular inverse qua Extended GCD (không cần p nguyên tố, chỉ cần GCD(a, p) = 1)
    long long modInverseGcd(long long a, long long m) {
        long long x, y;
        long long g = extGcd(a, m, x, y);
        if (g != 1) return -1;  // không tồn tại inverse
        return (x % m + m) % m;
    }
    
    // CRT cho 2 phương trình: x ≡ a1 (mod m1), x ≡ a2 (mod m2)
    // Yêu cầu: GCD(m1, m2) = 1
    // Trả về {x, M} với x là nghiệm, M = m1 * m2
    pair<long long, long long> crt2(long long a1, long long m1, long long a2, long long m2) {
        long long M = m1 * m2;
        long long M1 = M / m1, M2 = M / m2;
        long long y1 = modInverseGcd(M1, m1);
        long long y2 = modInverseGcd(M2, m2);
        long long x = (a1 * M1 % M * y1 % M + a2 * M2 % M * y2 % M) % M;
        return {(x + M) % M, M};
    }
    
    // CRT cho nhiều phương trình (dãy)
    // Input: vector {a1, m1}, {a2, m2}, ... với mi đôi một nguyên tố cùng nhau
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

**Ví dụ minh họa:**
```
x ≡ 2 (mod 3)
x ≡ 3 (mod 5)
x ≡ 2 (mod 7)

Giai: CRT → x = 23 (mod 105)
Kiểm tra: 23 % 3 = 2 ✓, 23 % 5 = 3 ✓, 23 % 7 = 2 ✓
```

---

## 5. Hàm Möbius

### 5.1 Định nghĩa

Hàm Möbius `μ(n)` được định nghĩa:

```
μ(1) = 1
μ(n) = 0            nếu n có thừa số nguyên tố bậc ≥ 2 (ví dụ 4, 8, 9, 12)
μ(n) = (-1)^k       nếu n là tích của k số nguyên tố đôi một phân biệt
```

**Ví dụ:**
```
μ(1)  = 1                    (0 thừa số → (-1)^0 = 1)
μ(2)  = -1                   (1 thừa số → (-1)^1 = -1)
μ(6)  = 1                    (2,3 → 2 thừa số → (-1)^2 = 1)
μ(30) = -1                   (2,3,5 → 3 thừa số → (-1)^3 = -1)
μ(12) = 0                    (12 = 2²×3, có 2² → 0)
```

### 5.2 Tính chất quan trọng

**Hàm Möbius là hàm nghịch đảo của hàm hằng số 1 theo phép convolution Dirichlet:**

```
Σ_{d|n} μ(d) = [n == 1]   (bằng 1 nếu n=1, bằng 0 nếu n>1)
```

Tính chất này cực kỳ quan trọng trong **Möbius inversion** (đảo ngược Möbius):
```
Nếu  f(n) = Σ_{d|n} g(d)   thì   g(n) = Σ_{d|n} μ(d) × f(n/d)
```
=== "C++"

    ```cpp
    // Sàng Möbius - O(N log log N)
    vector<int> mobiusSieve(int n) {
        vector<int> mu(n + 1, 1);
        vector<bool> isPrime(n + 1, true);
        vector<int> primes;
        mu[0] = 0;
        for (int i = 2; i <= n; i++) {
            if (isPrime[i]) {
                primes.push_back(i);
                mu[i] = -1;  // nguyên tố → 1 thừa số → (-1)^1
            }
            for (int p : primes) {
                if (i * p > n) break;
                isPrime[i * p] = false;
                if (i % p == 0) {
                    mu[i * p] = 0;  // p chia hết i → i*p có thừa số bậc ≥ 2
                    break;
                }
                mu[i * p] = -mu[i];  // thêm 1 thừa số nguyên tố mới → đổi dấu
            }
        }
        return mu;
    }
    
    // Tính μ(n) đơn lẻ - O(sqrt(n))
    int mobiusSingle(int n) {
        int cnt = 0;
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) {
                n /= i;
                cnt++;
                if (n % i == 0) return 0;  // có thừa số bậc ≥ 2
            }
        }
        if (n > 1) cnt++;  // thừa số nguyên tố lớn còn lại
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
    ```

---

## 6. Pollard's Rho - Phân tích thừa số lớn

<p align="center"><img src="/All_Images_Collected/pollard_rho.png" alt="Pollard Rho" style="max-width: 700px;" /><br><em>Minh họa thuật toán Pollard's Rho với Floyd's cycle detection</em></p>

### 6.1 Khi nào dùng?

Khi cần phân tích thừa số nguyên tố của số `n` rất lớn (lên `10^18`), trial division `O(sqrt(n))` quá chậm. **Pollard's Rho** chạy trung bình `O(n^(1/4))`.

### 6.2 Ý tưởng

Sử dụng hàm `f(x) = (x² + c) mod n` để tạo dãy số. Dùng **Floyd's cycle detection** (hare-tortoise) để tìm `GCD(|xi - xj|, n)` khác 1 → tìm được ước không tầm thường.

### 6.3 Code C++

```cpp
long long mulMod(long long a, long long b, long long mod) {
    return (__int128)a * b % mod;
}

// Miller-Rabin kiểm tra nguyên tố - O(k log^2 n)
bool millerRabin(long long n) {
    if (n < 2) return false;
    if (n == 2 || n == 3) return true;
    if (n % 2 == 0) return false;

    // Viết n-1 = 2^r * d
    long long d = n - 1;
    int r = 0;
    while (d % 2 == 0) { d /= 2; r++; }

    // Các cơ sở đủ cho n < 2^64
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
        if (d == n) return pollardRho(n);  // thử lại với c khác
    }
    return d;
}

// Phân tích n thành các thừa số nguyên tố
void factorize(long long n, map<long long,int> &factors) {
    if (n == 1) return;
    if (isPrime(n)) { factors[n]++; return; }  // cần hàm isPrime (Miller-Rabin)
    long long d = pollardRho(n);
    factorize(d, factors);
    factorize(n / d, factors);
}
```

---

## 7. Lưu ý & Cạm bẫy

### 7.1 Modular Arithmetic Pitfalls

**Phép chia ≠ nhân với inverse trong mọi trường hợp:**

```
// SAI: Khi modulus không phải số nguyên tố
// a / b mod m ≠ a * b^(m-2) mod m  (chỉ đúng khi m nguyên tố)

// ĐÚNG: Dùng Extended GCD để tìm inverse
// Yêu cầu: GCD(b, m) = 1, nếu không → không tồn tại inverse
```

**Tránh số âm khi trừ:**
```cpp
// SAI: result = (a - b) % MOD;  // có thể âm!
// ĐÚNG:
result = ((a - b) % MOD + MOD) % MOD;
```

**Overflow khi nhân:**
```cpp
// SAI với int hoặc long long khi a, b > 10^9:
result = a * b % MOD;  // overflow nếu a * b > 2^63

// ĐÚNG: Dùng __int128 hoặc modular multiplication
result = (__int128)a * b % MOD;
```

### 7.2 Lucas Theorem - Khi nào áp dụng?

- **Chỉ áp dụng khi `p` là số nguyên tố.** Nếu `p` không nguyên tố, Lucas theorem không đúng.
- Khi `p` nhỏ (≤ 10^6) và `n` rất lớn (10^18).
- Nếu `p` lớn (ví dụ `10^9 + 7`), Lucas theorem không hữu ích vì `n < p` trong hầu hết bài toán → dùng cách tính tổ hợp trực tiếp.

### 7.3 Xử lý giai thừa lớn

```
Khi nào fact[n] không tính được trực tiếp?
→ Khi n > MOD (10^9 + 7). Khi đó fact[n] ≡ 0 (mod MOD) vì MOD | n!

Cách xử lý:
1. Dùng Lucas Theorem (nếu MOD là số nguyên tố)
2. Dùng phân tích thừa số nguyên tố của MOD
3. Dùng cách tính C(n,k) mod p^e (Granville's generalization)
```

### 7.4 Euler's Theorem vs Fermat's Little Theorem

```
Fermat:   a^(p-1) ≡ 1 (mod p)         khi p nguyên tố, GCD(a,p) = 1
Euler:    a^φ(n) ≡ 1 (mod n)           khi GCD(a,n) = 1

Fermat là trường hợp đặc biệt của Euler (vì φ(p) = p - 1)
```

**Lưu ý quan trọng:**
```
// Khi tính a^b mod n:
// Nếu GCD(a, n) = 1 → dùng Euler: a^b ≡ a^(b mod φ(n)) (mod n)
// Nếu GCD(a, n) ≠ 1 → KHÔNG dùng được Euler trực tiếp!
//   → Dùng kỹ thuật tách thừa số: a^b = a^(b mod φ(n) + φ(n)) khi b ≥ φ(n)
```

### 7.5 Các bẫy thường gặp khác

| Bẫy | Giải pháp |
|-----|-----------|
| Quên `mod` ở mỗi bước tính | Luôn `% MOD` sau mỗi phép nhân/cộng |
| Dùng `MOD = 1e9+7` nhưng quên nó là số nguyên tố | Kiểm tra tính nguyên tố của modulus trước |
| Tính `inv_fact` sai thứ tự | Phải tính từ `n` xuống `0` |
| Lucas trả về 0 nhưng thực tế `C(n,k) ≠ 0` | Kiểm tra `ki > ni` ở mỗi chữ số |
| CRT cho modulus không nguyên tố cùng nhau | Dùng CRT tổng quát (với GCD chung) |

---

## 8. Ứng dụng thực tế

### 8.1 Đếm số cặp nguyên tố cùng nhau

**Bài toán:** Cho mảng A[1..N], đếm số cặp `(i, j)` với `i < j` sao cho `GCD(A[i], A[j]) = 1`.

**Cách làm:** Dùng hàm Möbius và nguyên lý bao hàm - loại trừ:

```cpp
// Đếm số cặp nguyên tố cùng nhau trong mảng
// a[i] ≤ MAX_VAL
const int MAX_VAL = 1000000;
int cnt[MAX_VAL + 1];  // cnt[d] = số phần tử chia hết cho d

long long countCoprimePairs(vector<int> &a) {
    int n = a.size();
    vector<int> mu = mobiusSieve(MAX_VAL);

    // Đếm số phần tử chia hết cho mỗi d
    for (int x : a) {
        for (int d = 1; d * d <= x; d++) {
            if (x % d == 0) {
                cnt[d]++;
                if (d * d != x) cnt[x / d]++;
            }
        }
    }

    // Áp dụng inclusion-exclusion với Möbius
    long long ans = 0;
    for (int d = 1; d <= MAX_VAL; d++) {
        if (mu[d] == 0) continue;
        long long c = cnt[d];
        ans += mu[d] * c * (c - 1) / 2;
    }
    return ans;
}
```

### 8.2 Euler's Theorem cho Modular Exponentiation

Khi tính `a^b mod n` với `b` rất lớn (ví dụ `b = 10^(10^18)`), ta có thể rút gọn:

```cpp
// Tính a^b mod n, b rất lớn (biểu diễn dưới dạng string)
// Yêu cầu: GCD(a, n) = 1
long long powerModLarge(long long a, string b, long long n) {
    long long phi_n = eulerPhi(n);

    // Tính b mod φ(n)
    long long b_mod_phi = 0;
    for (char c : b) {
        b_mod_phi = (b_mod_phi * 10 + (c - '0')) % phi_n;
    }

    // Euler: a^b ≡ a^(b mod φ(n)) (mod n) khi GCD(a, n) = 1
    return powerMod(a, b_mod_phi, n);
}

// Khi GCD(a, n) ≠ 1 và b ≥ φ(n):
// a^b ≡ a^(b mod φ(n) + φ(n)) (mod n)
long long powerModLargeGeneral(long long a, string b, long long n) {
    long long phi_n = eulerPhi(n);
    long long b_mod_phi = 0;
    bool b_ge_phi = false;
    // Tính b mod φ(n) và kiểm tra b ≥ φ(n)
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

### 8.3 Ứng dụng Möbius Inversion

**Bài toán mẫu:** Đếm số cặp `(i, j)` với `1 ≤ i ≤ N, 1 ≤ j ≤ M` sao cho `GCD(i, j) = 1`.

```cpp
// Đếm cặp (i,j) với 1≤i≤N, 1≤j≤M, GCD(i,j) = 1
// Công thức: Σ μ(d) × floor(N/d) × floor(M/d)
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

### 8.4 RSA Cryptography (tóm tắt)

RSA sử dụng Euler's Totient:

1. Chọn 2 số nguyên tố lớn `p`, `q`. Tính `n = p × q`, `φ(n) = (p-1)(q-1)`.
2. Chọn `e` sao cho `GCD(e, φ(n)) = 1`. Khóa công khai: `(e, n)`.
3. Tính `d = e^(-1) mod φ(n)`. Khóa bí mật: `(d, n)`.
4. Mã hóa: `c = m^e mod n`. Giải mã: `m = c^d mod n`.

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

- [Bài 11: Lũy thừa nhị phân & Sàng nguyên tố](11-luy-thua-nhi-phan-sang-nguyen-to.md)
- [Bài 18: Euclid & Modular Inverse](18-euclid-modular-inverse.md)
- [Bài 19: Tổ hợp & Xác suất](19-to-hop-xac-suat.md)

## Tài liệu tham khảo

- [HackerEarth - Number Theory 1-7](https://www.hackerearth.com/practice/math/number-theory/basic-number-theory-1/tutorial/)
- [VNOI Wiki - Số học](https://vnoi.info/translate/he/So-hoc-Phan-1-Modulo-gcd)
- [CP-Algorithms - Euler Function](https://cp-algorithms.com/algebra/phi-function.html)
- [CP-Algorithms - Modular Inverse](https://cp-algorithms.com/algebra/module-inverse.html)
- [CP-Algorithms - Chinese Remainder Theorem](https://cp-algorithms.com/algebra/chinese-remainder-theorem.html)
- [CP-Algorithms - Möbius Function](https://cp-algorithms.com/algebra/mobius-function.html)
- [CP-Algorithms - Pollard's Rho](https://cp-algorithms.com/algebra/factorization.html)
- [GeeksforGeeks - Euler's Totient Function](https://www.geeksforgeeks.org/dsa/eulers-totient-function/)