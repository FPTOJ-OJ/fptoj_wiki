# Bài 11: Lũy Thừa Nhị Phân & Sàng Nguyên Tố

> **Tác giả:** Hà Trí Kiên<br>
> **Nội dung tham khảo từ:** VNOI Wiki - Lũy thừa nhị phân, Sàng nguyên tố

## 1. Lũy Thừa Nhị Phân (Binary Exponentiation)

### Ẩn dụ: Nhân đôi tiền tiết kiệm

Muốn tính 3¹⁰. Thay vì nhân 3 mười lần, ta "nhân đôi":

- 3¹ = 3
- 3² = 3 × 3 = 9
- 3⁴ = 9 × 9 = 81
- 3⁸ = 81 × 81 = 6561

10 = 8 + 2 → 3¹⁰ = 3⁸ × 3² = 6561 × 9 = 59049

Chỉ cần **4 phép nhân** thay vì 10!

### Tại sao lại là O(log b)?

Mỗi bước ta **nhân đôi** số mũ (a → a², a² → a⁴, ...), nên số mũ tăng theo cấp số nhân: 1, 2, 4, 8, 16, ... Số bước cần thiết để đạt được b là **O(log₂ b)**. Ví dụ:

| b | Số bước |
|---|---------|
| 10 | 4 |
| 100 | 7 |
| 10⁶ | 20 |
| 10⁹ | 30 |
| 10¹⁸ | 60 |

> Đây là lý do binary exponentiation rất quan trọng trong competitive programming: b có thể lên đến 10¹⁸ mà chỉ cần ~60 phép nhân!

### Công thức

$$
a^b = \begin{cases} (a^{b/2})^2 & \text{nếu } b \text{ chẵn} \\ (a^{\lfloor b/2 \rfloor})^2 \times a & \text{nếu } b \text{ lẻ} \end{cases}
$$

> Công thức trên cho phép tính $a^b$ chỉ trong $O(\log b)$ phép nhân thay vì $O(b)$ phép nhân thông thường.

### Kết nối với biểu diễn nhị phân

Số mũ b được biểu diễn dưới dạng nhị phân. Mỗi bit = 1 tương ứng với một lần nhân vào kết quả:

```
b = 13 = 1101₂

a¹³ = a⁸ × a⁴ × a¹    (các bit 1 ở vị trí 0, 2, 3)

→ Duyệt từng bit từ phải sang trái:
   bit 0 = 1 → result ×= a¹
   bit 1 = 0 → bỏ qua
   bit 2 = 1 → result ×= a⁴
   bit 3 = 1 → result ×= a⁸
```

### Minh họa từng bước: Tính 3¹⁰

| Bước | a (gần nhân đôi) | b (số mũ còn lại) | result | Hành động |
|------|-----------------|-----------------|--------|----------|
| Khởi đầu | 3 | 10 | 1 | - |
| i=1 | 3²=9 | 10/2=5 | 1 | b chẵn → chỉ nhân đôi a |
| i=2 | 9²=81 | 5/2=2 | 1×9=9 | b lẻ → result×a, rồi nhân đôi a |
| i=3 | 81²=6561 | 2/2=1 | 9 | b chẵn → chỉ nhân đôi a |
| i=4 | - | 1/2=0 | 9×6561=59049 | b lẻ → result×a. b=0, dừng! |

3¹⁰ = 59049 ✅

**Thập phân của 10 = 1010₂. Mỗi bit 1 tương ứng 1 lần nhân!**

### Các trường hợp biên (Edge Cases)

```
a^0 = 1       (bất kỳ số nào mũ 0 đều bằng 1, kể cả 0^0 thường quy ước là 1)
a^1 = a       (chỉ 1 bước, trả về luôn)
0^b = 0       (với b > 0)
1^b = 1       (bất kỳ b nào)
a^b % 1 = 0   (modulo 1 luôn bằng 0)
```

=== "C++"

    ```cpp
    // Tính a^b - O(log b)
    // Ý tưởng: Duyệt từng bit của b, nếu bit = 1 thì nhân result vào
    long long power(long long a, long long b) {
        long long result = 1;
        while (b > 0) {
            if (b % 2 == 1)        // Nếu bit hiện tại = 1 → nhân result × a
                result *= a;
            a *= a;                 // Nhân đôi a (chuẩn bị cho bit tiếp theo)
            b /= 2;                // Dịch phải b (chuyển sang bit tiếp theo)
        }
        return result;
    }
    
    // Tính a^b % MOD - O(log b) - DÙNG NHIỀU NHẤT trong thi đấu!
    // Luôn dùng phiên bản có modulo để tránh tràn số
    long long powerMod(long long a, long long b, long long MOD) {
        long long result = 1;
        a %= MOD;                  // Bước đầu: rút gọn a theo MOD
        while (b > 0) {
            if (b % 2 == 1)        // Bit này = 1 → nhân result × a
                result = (result * a) % MOD;
            a = (a * a) % MOD;     // Nhân đôi a (rồi rút gọn ngay)
            b /= 2;
        }
        return result;
    }
    
    // Dùng bit shift thay vì chia/lẻ - viết gọn hơn
    long long powerMod_v2(long long a, long long b, long long MOD) {
        long long result = 1;
        a %= MOD;
        while (b > 0) {
            if (b & 1)                     // Kiểm tra bit cuối bằng phép AND
                result = (__int128)result * a % MOD;  // Dùng __int128 chống tràn
            a = (__int128)a * a % MOD;
            b >>= 1;                       // Dịch phải 1 bit
        }
        return result;
    }
    ```

=== "Python"

    ```python
    # Python có sẵn hàm pow(a, b, mod) - rất nhanh vì viết bằng C!
    # Đây là cách NÊN dùng trong thi đấu với Python
    result = pow(2, 100, 10**9 + 7)  # 2^100 mod (10^9+7)

    # Tự cài đặt (để hiểu thuật toán)
    def power_mod(a, b, mod):
        """Tính a^b % mod trong O(log b)"""
        result = 1
        a %= mod                        # Rút gọn a trước
        while b > 0:
            if b % 2 == 1:              # Bit hiện tại = 1
                result = (result * a) % mod
            a = (a * a) % mod           # Nhân đôi a
            b //= 2                     # Dịch phải b
        return result

    # Hoặc viết gọn hơn với bit operations
    def power_mod_v2(a, b, mod):
        result = 1
        a %= mod
        while b:
            if b & 1:                   # Kiểm tra bit cuối
                result = result * a % mod
            a = a * a % mod
            b >>= 1                     # Dịch phải 1 bit
        return result
    ```

### Ứng dụng: Tính nCk mod p (quan trọng trong thi đấu!)

Để tính $\binom{n}{k} = \frac{n!}{k!(n-k)!} \pmod{p}$, ta cần **nghịch đảo modulo** của giai thừa. Vì $p$ thường là 10⁹+7 (số nguyên tố), dùng định lý Fermat nhỏ: $a^{-1} \equiv a^{p-2} \pmod{p}$.

**Tại sao cần nCk mod p?** Rất nhiều bài toán đếm trong thi đấu yêu cầu "đếm số cách ... và in ra kết quả modulo 10⁹+7". Ví dụ: đếm số đường đi, đếm số cách chia nhóm, v.v.

=== "C++"

    ```cpp
    const int MOD = 1e9 + 7;
    const int MAXN = 200001;
    long long fact[MAXN], inv_fact[MAXN];
    
    // Precompute giai thừa và nghịch đảo giai thừa
    // Gọi hàm này 1 lần duy nhất trước khi trả lời các truy vấn
    void precompute() {
        fact[0] = 1;
        for (int i = 1; i < MAXN; i++)
            fact[i] = fact[i-1] * i % MOD;  // Tính i! mod MOD
        
        // Nghịch đảo của fact[MAXN-1] bằng Fermat: fact^(MOD-2)
        inv_fact[MAXN-1] = powerMod(fact[MAXN-1], MOD - 2, MOD);
        
        // Tính ngược lại: inv_fact[i] = inv_fact[i+1] * (i+1)
        // Công thức: (i!)^(-1) = ((i+1)!)^(-1) × (i+1)
        for (int i = MAXN - 2; i >= 0; i--)
            inv_fact[i] = inv_fact[i+1] * (i+1) % MOD;
    }
    
    // nCk mod MOD - O(1) sau khi precompute
    long long nCk(int n, int k) {
        if (k < 0 || k > n) return 0;
        return fact[n] % MOD * inv_fact[k] % MOD * inv_fact[n-k] % MOD;
    }
    ```

=== "Python"

    ```python
    MOD = 10**9 + 7
    MAXN = 200001
    fact = [1] * MAXN
    for i in range(1, MAXN):
        fact[i] = fact[i-1] * i % MOD

    inv_fact = [1] * MAXN
    inv_fact[MAXN-1] = pow(fact[MAXN-1], MOD - 2, MOD)  # Fermat
    for i in range(MAXN - 2, -1, -1):
        inv_fact[i] = inv_fact[i+1] * (i+1) % MOD

    def nCk(n, k):
        """Tính C(n,k) mod MOD - O(1) sau precompute"""
        if k < 0 or k > n: return 0
        return fact[n] * inv_fact[k] % MOD * inv_fact[n-k] % MOD
    ```

### Ứng dụng: Ma trận lũy thừa (Matrix Exponentiation)

Nhiều bài toán dãy số có dạng truy hồi $f(n) = a \cdot f(n-1) + b \cdot f(n-2)$, cần tính $f(n)$ với $n$ rất lớn (10¹⁸). Dùng ma trận lũy thừa:

$$
\begin{pmatrix} f(n) \\ f(n-1) \end{pmatrix} = \begin{pmatrix} a & b \\ 1 & 0 \end{pmatrix}^{n-1} \times \begin{pmatrix} f(1) \\ f(0) \end{pmatrix}
$$

Tính ma trận mũ trong $O(k^3 \log n)$ với $k$ là kích thước ma trận.

=== "C++"

    ```cpp
    // Matrix Exponentiation - Tính Fibonacci thứ n trong O(log n)
    const int MOD = 1e9 + 7;
    
    struct Matrix {
        long long a[2][2];
        Matrix() { a[0][0] = a[1][1] = 0; a[0][1] = a[1][0] = 0; }
    };
    
    Matrix multiply(Matrix A, Matrix B) {
        Matrix C;
        for (int i = 0; i < 2; i++)
            for (int j = 0; j < 2; j++)
                for (int k = 0; k < 2; k++)
                    C.a[i][j] = (C.a[i][j] + A.a[i][k] * B.a[k][j]) % MOD;
        return C;
    }
    
    Matrix matrixPow(Matrix base, long long exp) {
        Matrix result;
        result.a[0][0] = result.a[1][1] = 1;  // Ma trận đơn vị
        while (exp > 0) {
            if (exp & 1) result = multiply(result, base);
            base = multiply(base, base);
            exp >>= 1;
        }
        return result;
    }
    
    // Fibonacci: F(0)=0, F(1)=1, F(n) = F(n-1) + F(n-2)
    long long fibonacci(long long n) {
        if (n <= 1) return n;
        Matrix base;
        base.a[0][0] = 1; base.a[0][1] = 1;
        base.a[1][0] = 1; base.a[1][1] = 0;
        Matrix result = matrixPow(base, n - 1);
        return result.a[0][0];  // F(n)
    }
    ```

=== "Python"

    ```python
    MOD = 10**9 + 7

    def mat_mult(A, B):
        """Nhân hai ma trận 2x2"""
        return [
            [(A[0][0]*B[0][0] + A[0][1]*B[1][0]) % MOD,
             (A[0][0]*B[0][1] + A[0][1]*B[1][1]) % MOD],
            [(A[1][0]*B[0][0] + A[1][1]*B[1][0]) % MOD,
             (A[1][0]*B[0][1] + A[1][1]*B[1][1]) % MOD]
        ]

    def mat_pow(base, exp):
        """Lũy thừa ma trận 2x2 trong O(log exp)"""
        # Ma trận đơn vị
        result = [[1, 0], [0, 1]]
        while exp > 0:
            if exp & 1:
                result = mat_mult(result, base)
            base = mat_mult(base, base)
            exp >>= 1
        return result

    def fibonacci(n):
        """Tính F(n) trong O(log n)"""
        if n <= 1: return n
        base = [[1, 1], [1, 0]]
        return mat_pow(base, n - 1)[0][0]
    ```

---

## 2. Sàng nguyên tố Eratosthenes

<p align="center"><img src="/uploads/img/sieve_eratosthenes.png" alt="Sieve of Eratosthenes" style="max-width: 700px;" /><br><em>Minh họa thuật toán Sàng Eratosthenes</em></p>

### Ẩn dụ: Loại người gian lận

Bạn có 100 người xếp hàng. Bắt đầu từ người số 2: đánh dấu tất cả bội số của 2 (4, 6, 8, ...). Tiếp theo người số 3 chưa bị đánh dấu → đánh dấu bội số của 3 (6, 9, 12, ...). Tiếp tục... Ai không bị đánh dấu → là số nguyên tố!

### Tại sao chỉ cần duyệt đến √N?

Nếu N có ước nguyên tố p > √N, thì N/p < √N, nghĩa là N đã bị đánh dấu bởi ước nhỏ hơn. Vì vậy, chỉ cần duyệt i từ 2 đến √N là đủ.

### Tại sao bắt đầu đánh dấu từ i²?

Với số nguyên tố i, các bội 2i, 3i, ..., (i-1)×i đã bị đánh dấu bởi các số nguyên tố nhỏ hơn i. Bội đầu tiên chưa bị đánh dấu là i×i = i².

### Độ phức tạp

Sàng Eratosthenes có độ phức tạp $O(N \log \log N)$ — gần tuyến tính! Chi tiết:

- Với mỗi số nguyên tố p, ta đánh dấu ~N/p bội số
- Tổng: N/2 + N/3 + N/5 + N/7 + ... ≈ N × log(log N)

=== "C++"

    ```cpp
    // Sàng Eratosthenes cơ bản - O(N log log N)
    // Trả về vector<bool> đánh dấu số nguyên tố từ 0 đến n
    vector<bool> sieve(int n) {
        vector<bool> isPrime(n + 1, true);
        isPrime[0] = isPrime[1] = false;       // 0 và 1 không phải số nguyên tố
        
        for (int i = 2; i * i <= n; i++) {     // Chỉ cần duyệt đến √N
            if (isPrime[i]) {                   // Nếu i là số nguyên tố
                for (int j = i * i; j <= n; j += i)
                    isPrime[j] = false;         // Đánh dấu bội số (bắt đầu từ i²!)
            }
        }
        return isPrime;
    }
    
    // Kiểm tra 1 số có phải nguyên tố không - O(√N)
    // Dùng khi chỉ cần kiểm tra 1 số, không cần sàng
    bool isPrime(int n) {
        if (n < 2) return false;               // 0, 1 không phải nguyên tố
        if (n == 2) return true;                // 2 là nguyên tố chẵn duy nhất
        if (n % 2 == 0) return false;           // Loại bỏ tất cả số chẵn
        for (int i = 3; i * i <= n; i += 2)    // Chỉ kiểm tra số lẻ
            if (n % i == 0) return false;
        return true;
    }
    
    // Liệt kê tất cả số nguyên tố từ sàng
    vector<int> getPrimes(const vector<bool>& isPrime) {
        vector<int> primes;
        for (int i = 2; i < (int)isPrime.size(); i++)
            if (isPrime[i]) primes.push_back(i);
        return primes;
    }
    ```

=== "Python"

    ```python
    # Sàng Eratosthenes cơ bản - O(N log log N)
    def sieve(n):
        """Trả về danh sách đánh dấu số nguyên tố từ 0 đến n"""
        is_prime = [True] * (n + 1)
        is_prime[0] = is_prime[1] = False       # 0, 1 không phải nguyên tố
        for i in range(2, int(n**0.5) + 1):     # Chỉ duyệt đến √N
            if is_prime[i]:
                for j in range(i*i, n+1, i):    # Đánh dấu từ i²
                    is_prime[j] = False
        return is_prime

    # Kiểm tra 1 số có phải nguyên tố không - O(√N)
    def is_prime(n):
        if n < 2: return False
        if n == 2: return True
        if n % 2 == 0: return False
        for i in range(3, int(n**0.5) + 1, 2):  # Chỉ kiểm tra số lẻ
            if n % i == 0: return False
        return True

    # Liệt kê tất cả số nguyên tố từ sàng
    def get_primes(is_prime):
        return [i for i, p in enumerate(is_prime) if p]
    ```

### Sàng SPF (Smallest Prime Factor)

SPF là kỹ năng quan trọng nhất trong số học thi đấu! SPF[i] lưu **thừa số nguyên tố nhỏ nhất** của i. Sau khi sàng, ta có thể phân tích thừa số của **bất kỳ số N nào** trong $O(\log N)$.

**Tại sao SPF quan trọng?** Khi bạn cần phân tích thừa số nguyên tố của nhiều số khác nhau (trong cùng 1 bài), precompute SPF 1 lần rồi tra cứu O(log N) mỗi lần — nhanh hơn nhiều so với thử chia O(√N) mỗi lần.

=== "C++"

    ```cpp
    // Sàng SPF - O(N log log N) precompute, O(log N) mỗi truy vấn
    vector<int> spf(MAXN);
    void sieve_spf() {
        // Khởi đầu: mỗi số có SPF là chính nó
        for (int i = 1; i < MAXN; i++) spf[i] = i;
        
        // Với mỗi số nguyên tố i, đánh dấu SPF cho bội số của nó
        for (int i = 2; i * i < MAXN; i++) {
            if (spf[i] == i) {  // i là nguyên tố (SPF chưa bị thay đổi)
                for (int j = i * i; j < MAXN; j += i)
                    if (spf[j] == j) spf[j] = i;  // Chỉ ghi đè nếu chưa có SPF nhỏ hơn
            }
        }
    }
    
    // Phân tích thừa số nguyên tố - O(log n)
    vector<int> get_factors(int n) {
        vector<int> res;
        while (n > 1) {
            res.push_back(spf[n]);  // Lấy thừa số nguyên tố nhỏ nhất
            n /= spf[n];            // Chia đi
        }
        return res;
        // Ví dụ: get_factors(12) = {2, 2, 3}
    }
    
    // Liệt kê các ước số nguyên tố DISTINCT của n - O(log n)
    vector<int> get_prime_factors(int n) {
        vector<int> res;
        while (n > 1) {
            int p = spf[n];
            res.push_back(p);
            while (n % p == 0) n /= p;  // Bỏ qua tất cả thừa số của p
        }
        return res;
        // Ví dụ: get_prime_factors(12) = {2, 3}
    }
    ```

=== "Python"

    ```python
    # Sàng SPF
    MAXN = 10**7 + 1
    spf = list(range(MAXN))

    def sieve_spf():
        """Precompute smallest prime factor cho mọi số đến MAXN"""
        for i in range(2, int(MAXN**0.5) + 1):
            if spf[i] == i:  # i là nguyên tố
                for j in range(i*i, MAXN, i):
                    if spf[j] == j:
                        spf[j] = i

    def get_factors(n):
        """Phân tích thừa số nguyên tố - O(log n)"""
        res = []
        while n > 1:
            res.append(spf[n])
            n //= spf[n]
        return res
        # Ví dụ: get_factors(12) = [2, 2, 3]

    def get_prime_factors(n):
        """Liệt kê các ước nguyên tố DISTINCT - O(log n)"""
        res = []
        while n > 1:
            p = spf[n]
            res.append(p)
            while n % p == 0:
                n //= p
        return res
        # Ví dụ: get_prime_factors(12) = [2, 3]
    ```

### Sàng đếm ước (Sàng số ước)

Ngoài sàng nguyên tố, ta có thể dùng kỹ thuật tương tự để đếm số ước của mọi số từ 1 đến N:

=== "C++"

    ```cpp
    // Đếm số ước cho tất cả số từ 1 đến N - O(N log N)
    vector<int> countDivisors(int n) {
        vector<int> d(n + 1, 0);
        for (int i = 1; i <= n; i++)
            for (int j = i; j <= n; j += i)
                d[j]++;              // i là ước của j
        return d;
        // d[12] = 6 vì 12 có 6 ước: 1,2,3,4,6,12
    }
    ```

=== "Python"

    ```python
    # Đếm số ước cho tất cả số từ 1 đến N - O(N log N)
    def count_divisors(n):
        d = [0] * (n + 1)
        for i in range(1, n + 1):
            for j in range(i, n + 1, i):
                d[j] += 1           # i là ước của j
        return d
        # d[12] = 6 vì 12 có 6 ước: 1,2,3,4,6,12
    ```

---

## 3. Lưu ý & Bẫy thường gặp

### Bẫy 1: Tràn số khi tính lũy thừa

Đây là lỗi **phổ biến nhất** trong thi đấu! Khi MOD ≈ 10⁹, phép nhân `a * a` có thể vượt quá `long long` (max ~9.2 × 10¹⁸).

=== "C++"

    ```cpp
    // SAI: a*a có thể tràn long long nếu a gần 10^9
    result = result * a % MOD;     // (result * a) có thể > 2^63!
    
    // ĐÚNG cách 1: Ép kiểu __int128 (GCC/Clang)
    result = (__int128)result * a % MOD;
    
    // ĐÚNG cách 2: Dùng phép nhân modular an toàn
    long long safeMul(long long a, long long b, long long MOD) {
        long long result = 0;
        a %= MOD;
        while (b > 0) {
            if (b & 1) result = (result + a) % MOD;
            a = (a + a) % MOD;
            b >>= 1;
        }
        return result;
    }
    ```

=== "Python"

    ```python
    # Python không bị tràn số nguyên (bigint tự động)
    # Nhưng vẫn cần modulo để giữ số nhỏ và tăng tốc
    result = result * a % MOD  # An toàn trong Python!
    
    # Tuy nhiên, Python có thể CHẬM nếu số quá lớn mà không modulo
    # Luôn lấy modulo sau mỗi phép nhân
    ```

### Bẫy 2: Quên modulo ở mỗi bước

```
// SAI: Chỉ modulo ở kết quả cuối
result = result * a * a * a;   // Tràn số ngay!
result %= MOD;

// ĐÚNG: Modulo sau MỖI phép nhân
result = result * a % MOD;
result = result * a % MOD;
result = result * a % MOD;
```

### Bẫy 3: Sàng nguyên tố với N lớn

| N | Bộ nhớ (bool) | Thời gian | Ghi chú |
|---|---------------|-----------|---------|
| 10⁶ | ~1 MB | < 0.01s | Rất OK |
| 10⁷ | ~10 MB | ~0.05s | OK |
| 10⁸ | ~100 MB | ~0.5s | Có thể thiếu bộ nhớ! |
| 10⁹ | ~1 GB | ~5s | Phải dùng sàng phân đoạn |

**Giải pháp cho N lớn:**
- **Segmented Sieve** (sàng phân đoạn): Chia khoảng [L, R] thành các đoạn nhỏ, sàng từng đoạn. Bộ nhớ O(√R + đoạn).
- **Sàng bitset**: Dùng `bitset<100000001>` thay vì `vector<bool>`, tiết kiệm bộ nhớ 8 lần.

=== "C++"

    ```cpp
    // Sàng phân đoạn (Segmented Sieve) - Dùng khi cần sàng [L, R] với R rất lớn
    vector<bool> segmentedSieve(long long L, long long R) {
        // Bước 1: Sàng nhỏ để tìm tất cả nguyên tố <= √R
        long long lim = sqrt(R);
        vector<bool> small(lim + 1, true);
        vector<long long> primes;
        for (long long i = 2; i <= lim; i++) {
            if (small[i]) {
                primes.push_back(i);
                for (long long j = i * i; j <= lim; j += i)
                    small[j] = false;
            }
        }
        
        // Bước 2: Sàng trên đoạn [L, R]
        vector<bool> isPrime(R - L + 1, true);
        for (long long p : primes) {
            // Tìm bội đầu tiên của p trong khoảng [L, R]
            long long start = max(p * p, ((L + p - 1) / p) * p);
            for (long long j = start; j <= R; j += p)
                isPrime[j - L] = false;
        }
        
        // Xử lý trường hợp đặc biệt
        if (L == 1) isPrime[0] = false;
        return isPrime;
    }
    ```

=== "Python"

    ```python
    import math

    def segmented_sieve(L, R):
        """Sàng phân đoạn - sàng nguyên tố trong khoảng [L, R]"""
        # Bước 1: Sàng nhỏ để tìm nguyên tố <= √R
        lim = int(math.isqrt(R))
        small = [True] * (lim + 1)
        primes = []
        for i in range(2, lim + 1):
            if small[i]:
                primes.append(i)
                for j in range(i*i, lim + 1, i):
                    small[j] = False

        # Bước 2: Sàng trên đoạn [L, R]
        is_prime = [True] * (R - L + 1)
        for p in primes:
            start = max(p * p, ((L + p - 1) // p) * p)
            for j in range(start, R + 1, p):
                is_prime[j - L] = False

        if L == 1:
            is_prime[0] = False
        return is_prime
    ```

### Bẫy 4: Sàng SPF quên khởi đầu đúng

```cpp
// SAI: Không khởi đầu spf[i] = i
vector<int> spf(MAXN, 0);  // spf[i] = 0 → sai logic!

// ĐÚNG: Phải khởi đầu mỗi số có SPF là chính nó
for (int i = 1; i < MAXN; i++) spf[i] = i;
```

### Bẫy 5: Nhầm `i * i` có thể tràn int

```cpp
// SAI: i * i tràn int nếu i > 46340
for (int i = 2; i * i <= n; i++)

// ĐÚNG: Ép kiểu long long
for (long long i = 2; i * i <= n; i++)
// Hoặc dùng sqrt:
for (int i = 2; i <= (int)sqrt(n); i++)
```

### Mẹo thi cử

| Bài toán | Dùng gì | Độ phức tạp |
|----------|---------|-------------|
| Tính a^b % MOD | `powerMod(a, b, MOD)` | O(log b) |
| Tính Fibonacci F(n) với n = 10¹⁸ | Matrix Exponentiation | O(8 log n) |
| Kiểm tra nguyên tố N ≤ 10⁷ | Sàng Eratosthenes precompute | O(1) mỗi truy vấn |
| Kiểm tra nguyên tố N ≤ 10¹² | Miller-Rabin (nâng cao) | O(k log²N) |
| Phân tích thừa số nhiều lần | Sàng SPF precompute | O(log N) mỗi truy vấn |
| Đếm ước của N | Phân tích thừa số → nhân (ai+1) | O(log N) với SPF |
| Tính nCk mod p | Precompute fact + inv_fact | O(1) mỗi truy vấn |

---

---

## Bài tập luyện tập

### Cơ bản - Lũy thừa nhị phân

| Bài | Nền tảng | Độ khó | Chủ đề | Ghi chú |
|-----|----------|--------|--------|---------|
| [CSES - Exponentiation](https://cses.fi/problemset/task/1095) | CSES | ⭐⭐ | a^b mod p | Bài khởi đầu, luyện code |
| [CSES - Exponentiation II](https://cses.fi/problemset/task/1712) | CSES | ⭐⭐⭐ | a^(b^c) mod p | Fermat nhỏ: a^(b^c mod (p-1)) |
| [CSES - Counting Necklaces](https://cses.fi/problemset/task/2209) | CSES | ⭐⭐⭐ | Lũy thừa mod | Ứng dụng power mod |
| [VNOJ - VPOWER](https://oj.vnoi.info/problem/vpower) | VNOJ | ⭐⭐ | Power mod | Lũy thừa nhị phân cơ bản |
| [Codeforces - Football](https://codeforces.com/problemset/problem/96/A) | Codeforces | ⭐ | Kiểm tra chuỗi | Không liên quan trực tiếp, tư duy |

### Cơ bản - Sàng nguyên tố

| Bài | Nền tảng | Độ khó | Chủ đề | Ghi chú |
|-----|----------|--------|--------|---------|
| [CSES - Primes](https://cses.fi/problemset/task/2162) | CSES | ⭐⭐ | Liệt kê nguyên tố | Sàng Eratosthenes |
| [CSES - Counting Divisors](https://cses.fi/problemset/task/1713) | CSES | ⭐⭐ | Đếm ước | Sàng đếm ước hoặc SPF |
| [CSES - Binomial Coefficients](https://cses.fi/problemset/task/1079) | CSES | ⭐⭐ | nCk mod p | Precompute fact + inv_fact |
| [SPOJ - Prime Generator](https://www.spoj.com/problems/PRIME1/) | SPOJ | ⭐⭐ | Sàng phân đoạn | In nguyên tố trong [m, n] |
| [VNOJ - NTBONUS](https://oj.vnoi.info/problem/ntbonus) | VNOJ | ⭐⭐ | Sàng + đếm | Ứng dụng sàng |

### Trung bình - Kết hợp

| Bài | Nền tảng | Độ khó | Chủ đề | Ghi chú |
|-----|----------|--------|--------|---------|
| [Codeforces - Almost Prime](https://codeforces.com/problemset/problem/26/A) | Codeforces | ⭐⭐ | Đếm thừa số | Sàng + đếm số ước nguyên tố |
| [Codeforces - T-primes](https://codeforces.com/problemset/problem/230/B) | Codeforces | ⭐⭐ | Kiểm tra T-prime | T-prime = bình phương nguyên tố |
| [Codeforces - Noldbach Problem](https://codeforces.com/problemset/problem/17/A) | Codeforces | ⭐⭐ | Nguyên tố liên tiếp | Sàng + kiểm tra |
| [CSES - Common Divisors](https://cses.fi/problemset/task/1081) | CSES | ⭐⭐⭐ | GCD lớn nhất | Sàng ước hoặc sieve-style |
| [CSES - Binomial Coefficients](https://cses.fi/problemset/task/1079) | CSES | ⭐⭐ | Modular inverse | Fermat nhỏ |
| [VNOJ - VOMARBLE](https://oj.vnoi.info/problem/vomarble) | VNOJ | ⭐⭐⭐ | Combinatorics | nCk mod p |

### Nâng cao

| Bài | Nền tảng | Độ khó | Chủ đề | Ghi chú |
|-----|----------|--------|--------|---------|
| [Codeforces - Christmas Trees](https://codeforces.com/problemset/problem/1401/D) | Codeforces | ⭐⭐⭐⭐ | Sắp xếp + chia ước | Sàng thừa số + greedy |
| [Codeforces - Drazil and His Happy Friends](https://codeforces.com/problemset/problem/515/B) | Codeforces | ⭐⭐⭐ | GCD + mô phỏng | Euclid + sàng |
| [CSES - Prime Multiples](https://cses.fi/problemset/task/2185) | CSES | ⭐⭐⭐⭐ | Nguyên lý bao hàm | Sàng nguyên tố + bitmask |
| [SPOJ - DIVSUM](https://www.spoj.com/problems/DIVSUM/) | SPOJ | ⭐⭐ | Tổng ước | Sàng tổng ước |
| [Codeforces - Smash the Rocks](https://codeforces.com/problemset/problem/1606/D) | Codeforces | ⭐⭐⭐⭐ | Matrix exponentiation | Ma trận lũy thừa |

---

## Bài viết liên quan

- [Bài 18: Euclid & Modular Inverse](18-euclid-modular-inverse.md)
- [Bài 26: Số học nâng cao](26-so-hoc-nang-cao.md)
- [Bài 19: Tổ hợp & Xác suất](19-to-hop-xac-suat.md)

## Tài liệu tham khảo

- [VNOI Wiki - Lũy thừa nhị phân](https://wiki.vnoi.info/algo/algebra/binary_exponentation)
- [VNOI Wiki - Sàng nguyên tố](https://wiki.vnoi.info/algo/algebra/prime_sieve)
- [CP-Algorithms - Binary Exponentiation](https://cp-algorithms.com/algebra/binary-exp.html)
- [CP-Algorithms - Sieve of Eratosthenes](https://cp-algorithms.com/algebra/sieve-of-eratosthenes.html)
- [HackerEarth - Number Theory](https://www.hackerearth.com/practice/math/number-theory/basic-number-theory-1/tutorial/)
- [GeeksforGeeks - Binary Exponentiation](https://www.geeksforgeeks.org/dsa/modular-exponentiation-power-in-modular-arithmetic/)

**Bài tiếp theo:** [Quy hoạch động →](12-quy-hoach-dong.md)
