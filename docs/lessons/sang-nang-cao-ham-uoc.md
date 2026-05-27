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

### Bài 1: Đếm ước

**Đề bài:** Cho $n$ số nguyên dương $x_1, x_2, \ldots, x_n$. Với mỗi số, in ra số ước của nó.

**Input:**
- Dòng 1: số nguyên $n$ $(1 \leq n \leq 10^5)$
- Dòng 2: $n$ số nguyên $x_i$ $(1 \leq x_i \leq 10^7)$

**Output:** In ra $n$ dòng, dòng thứ $i$ là số ước của $x_i$.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `5`<br>`12 7 36 1 100` | `6`<br>`2`<br>`9`<br>`1`<br>`9` |

??? tip "Lời giải"
    Dùng sàng SPF để phân tích mỗi số thành $p_1^{a_1} \cdots p_k^{a_k}$, đáp án = $(a_1+1)(a_2+1)\cdots(a_k+1)$.
    
    === "C++"
    
        ```cpp
        #include <bits/stdc++.h>
        using namespace std;
        const int MAXN = 1e7 + 5;
        int spf[MAXN];
    
        void buildSPF(int n) {
            for (int i = 0; i <= n; i++) spf[i] = i;
            for (int i = 2; i * i <= n; i++)
                if (spf[i] == i)
                    for (int j = i * i; j <= n; j += i)
                        if (spf[j] == j) spf[j] = i;
        }
    
        int countDivisors(int x) {
            int res = 1;
            while (x > 1) {
                int p = spf[x], cnt = 0;
                while (x % p == 0) { x /= p; cnt++; }
                res *= (cnt + 1);
            }
            return res;
        }
    
        int main() {
            buildSPF(1e7);
            int n; cin >> n;
            while (n--) {
                int x; cin >> x;
                cout << countDivisors(x) << "\n";
            }
        }
        ```
---

### Bài 2: Tổng ước

**Đề bài:** Cho số nguyên dương $n$. Tính tổng tất cả ước dương của $n$, lấy modulo $10^9 + 7$.

**Input:** Số nguyên $n$ $(1 \leq n \leq 10^{12})$

**Output:** Tổng ước của $n$ modulo $10^9 + 7$.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `12` | `28` |
| `100` | `217` |

??? tip "Lời giải"
    Phân tích $n$ thành thừa số nguyên tố, dùng công thức $\sigma(n) = \prod \frac{p_i^{a_i+1} - 1}{p_i - 1}$.
    
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
    
        long long sumDivisors(long long n) {
            long long sum = 1;
            for (long long i = 2; i * i <= n; i++) {
                if (n % i == 0) {
                    long long p = 1, term = 1;
                    while (n % i == 0) { n /= i; p = p * i % MOD; term = (term + p) % MOD; }
                    sum = sum * term % MOD;
                }
            }
            if (n > 1) sum = sum * (1 + n % MOD) % MOD;
            return sum;
        }
    
        int main() {
            long long n; cin >> n;
            cout << sumDivisors(n) << "\n";
        }
        ```
---

### Bài 3: Phân tích thừa số

**Đề bài:** Cho $q$ truy vấn. Mỗi truy vấn cho số nguyên $n$, in ra phân tích thừa số nguyên tố của $n$ theo thứ tự tăng dần.

**Input:**
- Dòng 1: số nguyên $q$ $(1 \leq q \leq 10^5)$
- $q$ dòng tiếp: mỗi dòng là số nguyên $n$ $(2 \leq n \leq 10^7)$

**Output:** Với mỗi truy vấn, in ra các cặp $(p, a)$ với $p$ là nguyên tố, $a$ là số mũ.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `3`<br>`60`<br>`7`<br>`100` | `2 2 3 1 5 1`<br>`7 1`<br>`2 2 5 2` |

??? tip "Lời giải"
    Dùng sàng SPF, mỗi lần chia liên tục cho SPF để lấy thừa số.
---

### Bài 4: Số chia hết

**Đề bài:** Cho 3 số nguyên $a, b, k$. Đếm bao nhiêu số trong đoạn $[a, b]$ chia hết cho $k$.

**Input:** 3 số nguyên $a, b, k$ $(1 \leq a \leq b \leq 10^{18}, 1 \leq k \leq 10^{18})$

**Output:** Số lượng số chia hết cho $k$ trong $[a, b]$.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `1 10 3` | `3` |
| `7 20 5` | `3` |

??? tip "Lời giải"
    Đáp án = $\lfloor b/k \rfloor - \lfloor (a-1)/k \rfloor$.
    
    === "C++"
    
        ```cpp
        #include <bits/stdc++.h>
        using namespace std;
        int main() {
            long long a, b, k;
            cin >> a >> b >> k;
            cout << b / k - (a - 1) / k << "\n";
        }
        ```
---

### Bài 5: Tổng đếm ước từ 1 đến N

**Đề bài:** Cho số nguyên dương $n$. Tính $\sum_{i=1}^{n} d(i)$ với $d(i)$ là số ước của $i$.

**Input:** Số nguyên $n$ $(1 \leq n \leq 10^{12})$

**Output:** Kết quả modulo $10^9 + 7$.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `6` | `14` |
| `100` | `482` |

??? tip "Lời giải"
    Dùng Dirichlet hyperbola: $\sum_{i=1}^{n} d(i) = 2\sum_{i=1}^{\sqrt{n}} \lfloor n/i \rfloor - \lfloor\sqrt{n}\rfloor^2$.
    
    === "C++"
    
        ```cpp
        #include <bits/stdc++.h>
        using namespace std;
        const long long MOD = 1e9 + 7;
    
        int main() {
            long long n; cin >> n;
            long long sq = (long long)sqrt(n);
            long long res = 0;
            for (long long i = 1; i <= sq; i++)
                res = (res + n / i) % MOD;
            res = (2 * res % MOD - sq % MOD * (sq % MOD) % MOD + MOD) % MOD;
            cout << res << "\n";
        }
        ```