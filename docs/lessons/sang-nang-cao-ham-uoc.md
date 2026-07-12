# Bài 56: Sàng Nâng Cao & Hàm Ước

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** CP-Algorithms, VNOI Wiki

## 1. Sàng Smallest Prime Factor (SPF)

### 1.1 Tại sao cần sàng SPF?

Bài 11 đã giới thiệu sàng Eratosthenes để kiểm tra nguyên tố. Nhưng trong thi đấu, ta thường cần **phân tích thừa số nguyên tố** của nhiều số khác nhau. Phân tích trial division mất $O(\sqrt{n})$ cho mỗi số → quá chậm nếu cần phân tích $10^6$ số.

**Sàng SPF** cho phép phân tích bất kỳ số $n \leq N$ thành các thừa số nguyên tố trong $O(\log n)$.

### 1.2 Ý tưởng

Với mỗi số $n$, lưu **ước nguyên tố nhỏ nhất** của nó. Khi cần phân tích $n$, ta chỉ cần chia liên tục cho SPF:

```
n = 60 → SPF(60) = 2
60 / 2 = 30 → SPF(30) = 2
30 / 2 = 15 → SPF(15) = 3
15 / 3 = 5  → SPF(5) = 5 (nguyên tố)
5  / 5 = 1  → Dừng!

→ 60 = 2² × 3 × 5
```

### 1.3 Cài đặt

=== "C++"

    ```cpp
    const int MAXN = 1e7 + 5;
    int spf[MAXN]; // spf[i] = ước nguyên tố nhỏ nhất của i

    void buildSPF(int n) {
        for (int i = 0; i <= n; i++) spf[i] = i;
        for (int i = 2; i * i <= n; i++) {
            if (spf[i] == i) { // i là nguyên tố
                for (int j = i * i; j <= n; j += i) {
                    if (spf[j] == j) spf[j] = i;
                }
            }
        }
    }

    // Phân tích n thành các thừa số nguyên tố - O(log n)
    vector<pair<long long,int>> factorize(long long n) {
        vector<pair<long long,int>> res;
        while (n > 1) {
            long long p = spf[n];
            int cnt = 0;
            while (n % p == 0) {
                n /= p;
                cnt++;
            }
            res.push_back({p, cnt});
        }
        return res;
    }
    ```

=== "Python"

    ```python
    MAXN = 10**7 + 5
    spf = list(range(MAXN))

    def build_spf(n):
        for i in range(2, int(n**0.5) + 1):
            if spf[i] == i:  # i là nguyên tố
                for j in range(i * i, n + 1, i):
                    if spf[j] == j:
                        spf[j] = i

    def factorize(n):
        res = []
        while n > 1:
            p = spf[n]
            cnt = 0
            while n % p == 0:
                n //= p
                cnt += 1
            res.append((p, cnt))
        return res
    ```

**Độ phức tạp:** Xây dựng sàng $O(N \log \log N)$, mỗi phân tích $O(\log n)$.

---

## 2. Sàng Tuyến Tính (Linear Sieve / Euler Sieve)

### 2.1 Vấn đề với sàng Eratosthenes

Sàng Eratosthenes đánh dấu bội của mỗi nguyên tố → một số hợp bị đánh dấu **nhiều lần** (ví dụ 12 bị đánh dấu bởi 2, 3). Độ phức tạp thực tế là $O(N \log \log N)$, không phải $O(N)$.

### 2.2 Ý tưởng sàng tuyến tính

Duyệt mỗi số $i$ từ 2 đến $N$. Với mỗi $i$, duyệt các nguyên tố $p$ trong danh sách và đánh dấu $i \times p$. **Dừng ngay** khi $p \mid i$.

**Tại sao dừng?** Đảm bảo mỗi số hợp chỉ bị đánh dấu **đúng một lần** bởi ước nguyên tố nhỏ nhất của nó.

### 2.3 Cài đặt

=== "C++"

    ```cpp
    const int MAXN = 1e7 + 5;
    bool isPrime[MAXN];
    vector<int> primes;

    void linearSieve(int n) {
        fill(isPrime, isPrime + n + 1, true);
        isPrime[0] = isPrime[1] = false;
        for (int i = 2; i <= n; i++) {
            if (isPrime[i]) primes.push_back(i);
            for (int p : primes) {
                if (i * p > n) break;
                isPrime[i * p] = false;
                if (i % p == 0) break; // QUAN TRỌNG: dừng tại đây
            }
        }
    }
    ```

=== "Python"

    ```python
    def linear_sieve(n):
        is_prime = [True] * (n + 1)
        is_prime[0] = is_prime[1] = False
        primes = []
        for i in range(2, n + 1):
            if is_prime[i]:
                primes.append(i)
            for p in primes:
                if i * p > n:
                    break
                is_prime[i * p] = False
                if i % p == 0:
                    break  # QUAN TRỌNG
        return is_prime, primes
    ```

**Độ phức tạp:** $O(N)$ - mỗi số hợp chỉ bị đánh dấu đúng một lần.

### 2.4 Sàng tuyến tính tính hàm nhân tính

Ưu điểm lớn nhất: có thể tính đồng thời nhiều hàm nhân tính (Euler φ, d(n), σ(n), ...) trong $O(N)$.

---

## 3. Hàm Đếm Ước d(n)

### 3.1 Định nghĩa

$d(n)$ = số ước dương của $n$.

```
d(12) = 6   → {1, 2, 3, 4, 6, 12}
d(7)  = 2   → {1, 7}
d(1)  = 1   → {1}
d(36) = 9   → {1, 2, 3, 4, 6, 9, 12, 18, 36}
```

### 3.2 Công thức

Cho $n = p_1^{a_1} \times p_2^{a_2} \times \cdots \times p_k^{a_k}$, thì:

$$
d(n) = (a_1 + 1) \times (a_2 + 1) \times \cdots \times (a_k + 1)
$$

**Ví dụ:** $36 = 2^2 \times 3^2$ → $d(36) = (2+1)(2+1) = 9$ ✓

### 3.3 Tính chất nhân tính

$d(m \times n) = d(m) \times d(n)$ nếu $\gcd(m, n) = 1$.

Đây là **hàm nhân tính**, nên có thể tính bằng sàng:

=== "C++"

    ```cpp
    // Sàng tính d(n) cho tất cả số từ 1 đến N - O(N log N)
    vector<int> buildDivisorCount(int n) {
        vector<int> d(n + 1, 0);
        for (int i = 1; i <= n; i++) {
            for (int j = i; j <= n; j += i) {
                d[j]++;
            }
        }
        return d;
    }
    ```

=== "Python"

    ```python
    def build_divisor_count(n):
        d = [0] * (n + 1)
        for i in range(1, n + 1):
            for j in range(i, n + 1, i):
                d[j] += 1
        return d
    ```

### 3.4 Đếm ước bằng phân tích thừa số - O(√n)

Khi chỉ cần tính $d(n)$ cho một số đơn lẻ:

=== "C++"

    ```cpp
    int countDivisors(long long n) {
        int cnt = 0;
        for (long long i = 1; i * i <= n; i++) {
            if (n % i == 0) {
                cnt++;           // đếm ước i
                if (i != n / i) cnt++; // đếm ước đối
            }
        }
        return cnt;
    }
    ```

=== "Python"

    ```python
    def count_divisors(n):
        cnt = 0
        i = 1
        while i * i <= n:
            if n % i == 0:
                cnt += 1
                if i != n // i:
                    cnt += 1
            i += 1
        return cnt
    ```

---

## 4. Tổng Ước σ(n)

### 4.1 Định nghĩa

$\sigma(n)$ = tổng tất cả ước dương của $n$.

```
σ(12) = 1 + 2 + 3 + 4 + 6 + 12 = 28
σ(7)  = 1 + 7 = 8
σ(1)  = 1
```

### 4.2 Công thức

Cho $n = p_1^{a_1} \times p_2^{a_2} \times \cdots \times p_k^{a_k}$ (với $p_i$ là các thừa số nguyên tố phân biệt, $a_i$ là số mũ), thì:

$$
\sigma(n) = \prod_{i=1}^{k} \frac{p_i^{a_i+1} - 1}{p_i - 1}
$$

(Trong đó $\prod$ là ký hiệu tích — nhân tất cả các vế từ $i=1$ đến $k$.)

**Ví dụ:** $12 = 2^2 \times 3^1$ → $\sigma(12) = \frac{2^3 - 1}{2 - 1} \times \frac{3^2 - 1}{3 - 1} = 7 \times 4 = 28$ ✓

### 4.3 Tính bằng sàng - O(N log N)

=== "C++"

    ```cpp
    vector<long long> buildDivisorSum(int n) {
        vector<long long> sigma(n + 1, 0);
        for (int i = 1; i <= n; i++) {
            for (int j = i; j <= n; j += i) {
                sigma[j] += i;
            }
        }
        return sigma;
    }
    ```

=== "Python"

    ```python
    def build_divisor_sum(n):
        sigma = [0] * (n + 1)
        for i in range(1, n + 1):
            for j in range(i, n + 1, i):
                sigma[j] += i
        return sigma
    ```

### 4.4 Tổng ước bằng phân tích thừa số

=== "C++"

    ```cpp
    long long sumDivisors(long long n) {
        long long sum = 1;
        for (long long i = 2; i * i <= n; i++) {
            if (n % i == 0) {
                long long p = 1, term = 1;
                while (n % i == 0) {
                    n /= i;
                    p *= i;
                    term += p;
                }
                sum *= term;
            }
        }
        if (n > 1) sum *= (1 + n); // thừa số nguyên tố còn lại
        return sum;
    }
    ```

=== "Python"

    ```python
    def sum_divisors(n):
        total = 1
        i = 2
        while i * i <= n:
            if n % i == 0:
                p = 1
                term = 1
                while n % i == 0:
                    n //= i
                    p *= i
                    term += p
                total *= term
            i += 1
        if n > 1:
            total *= (1 + n)
        return total
    ```

---

## 5. Sàng tính nhiều hàm cùng lúc

### 5.1 Dùng sàng tuyến tính

Với sàng tuyến tính, ta có thể tính đồng thời SPF, Euler φ, d(n), σ(n) chỉ trong $O(N)$:

=== "C++"

    ```cpp
    const int MAXN = 1e7 + 5;
    int spf[MAXN], phi[MAXN], d[MAXN];
    long long sigma[MAXN];
    vector<int> primes;

    void buildAll(int n) {
        phi[1] = 1; d[1] = 1; sigma[1] = 1;
        for (int i = 2; i <= n; i++) {
            if (spf[i] == 0) { // i là nguyên tố
                spf[i] = i;
                primes.push_back(i);
                phi[i] = i - 1;
                d[i] = 2;
                sigma[i] = i + 1;
            }
            for (int p : primes) {
                if (i * p > n || p > spf[i]) break;
                spf[i * p] = p;
                if (i % p == 0) {
                    // p | i → i*p có cùng nguyên tố với i
                    int m = i, cnt = 0;
                    while (m % p == 0) { m /= p; cnt++; }
                    phi[i * p] = phi[i] * p;
                    d[i * p] = d[i] / (cnt + 1) * (cnt + 2);
                    sigma[i * p] = sigma[i] * p + sigma[m];
                    break;
                } else {
                    // gcd(i, p) = 1 → hàm nhân tính
                    phi[i * p] = phi[i] * (p - 1);
                    d[i * p] = d[i] * 2;
                    sigma[i * p] = sigma[i] * (p + 1);
                }
            }
        }
    }
    ```

---

## 6. Ứng dụng trong thi đấu

### 6.1 Đếm số ước của N! (N giai thừa)

Ý tưởng: Với mỗi nguyên tố $p \leq N$, số mũ của $p$ trong $N!$ là $\sum_{k=1}^{\infty} \lfloor N/p^k \rfloor$.

(Với $\lfloor x \rfloor$ là phần nguyên — làm tròn xuống. Công thức này hoạt động vì: mỗi bội của $p$ đóng góp 1 nhân tử $p$, mỗi bội của $p^2$ đóng góp thêm 1, mỗi bội của $p^3$ đóng góp thêm 1, ...)

### 6.2 Tổng ước từ 1 đến N

Tính $\sum_{i=1}^{N} d(i)$ trong $O(\sqrt{N})$ bằng Dirichlet hyperbola:

$$\sum_{i=1}^{N} d(i) = \sum_{i=1}^{N} \lfloor N/i \rfloor = 2\sum_{i=1}^{\lfloor\sqrt{N}\rfloor} \lfloor N/i \rfloor - \lfloor\sqrt{N}\rfloor^2$$

!!! info "Ý tưởng Dirichlet hyperbola"
    Mỗi cặp $(i,j)$ với $i \cdot j \leq N$ tương ứng với một ước. Khi $i \leq \sqrt{N}$, ta đếm số $j$ thỏa mãn; khi $j \leq \sqrt{N}$, ta đếm số $i$; rồi trừ phần đếm trùng (khi cả $i, j \leq \sqrt{N}$).

=== "C++"

    ```cpp
    long long sumDivCount(long long n) {
        long long res = 0;
        long long sq = sqrt(n);
        for (long long i = 1; i <= sq; i++) {
            res += n / i;
        }
        return 2 * res - sq * sq;
    }
    ```

=== "Python"

    ```python
    def sum_div_count(n):
        sq = int(n**0.5)
        res = 0
        for i in range(1, sq + 1):
            res += n // i
        return 2 * res - sq * sq
    ```

---

## 7. Bài tập luyện tập

| Mã bài | Tên bài tập | Độ khó | Kiểu bài tập (Bản chất) | Bài học lý thuyết |
| :--- | :--- | :---: | :--- | :--- |
| `snhh-spf` | [SPF cơ bản](https://fptoj.com/problem/snhh-spf) | ⭐⭐ | Sàng ước nguyên tố nhỏ nhất | [Sàng Nâng Cao & Hàm Ước](sang-nang-cao-ham-uoc.md) |
| `snhh-divcnt` | [Đếm ước nhiều truy vấn](https://fptoj.com/problem/snhh-divcnt) | ⭐⭐ | Đếm ước dùng SPF | [Sàng Nâng Cao & Hàm Ước](sang-nang-cao-ham-uoc.md) |
| `snhh-fact-multi` | [Phân tích thừa số nhiều truy vấn](https://fptoj.com/problem/snhh-fact-multi) | ⭐⭐ | Factor dùng SPF | [Sàng Nâng Cao & Hàm Ước](sang-nang-cao-ham-uoc.md) |
| `snhh-divsum` | [Tổng ước modulo](https://fptoj.com/problem/snhh-divsum) | ⭐⭐⭐ | Tổng ước dùng SPF | [Sàng Nâng Cao & Hàm Ước](sang-nang-cao-ham-uoc.md) |
| `snhh-sumdiv1n` | [Tổng đếm ước 1..N](https://fptoj.com/problem/snhh-sumdiv1n) | ⭐⭐ | Dirichlet hyperbola | [Sàng Nâng Cao & Hàm Ước](sang-nang-cao-ham-uoc.md) |
| `snhh-divcnt-range` | [Đếm số có K ước](https://fptoj.com/problem/snhh-divcnt-range) | ⭐⭐ | Sàng số ước | [Sàng Nâng Cao & Hàm Ước](sang-nang-cao-ham-uoc.md) |
| `snhh-squarefree` | [Đếm số square-free](https://fptoj.com/problem/snhh-squarefree) | ⭐⭐⭐ | Möbius lọc | [Sàng Nâng Cao & Hàm Ước](sang-nang-cao-ham-uoc.md) |
| `snhh-lcm-range` | [LCM trên đoạn](https://fptoj.com/problem/snhh-lcm-range) | ⭐⭐⭐⭐ | LCM $[l,r]$ | [Sàng Nâng Cao & Hàm Ước](sang-nang-cao-ham-uoc.md) |