# Định Lý Wilson & Định Lý Lucas

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** CP-Algorithms

---

## Bản chất vấn đề

### Định lý Wilson

Cho số nguyên tố $p$. Tính $(p-1)! \mod p$ mà không cần tính giai thừa trực tiếp (vì $p$ có thể rất lớn).

**Ứng dụng:** Kiểm tra số nguyên tố, tính toán modulo liên quan đến giai thừa.

### Định lý Lucas

Cho $n, k$ rất lớn ($10^{18}$) và $p$ nguyên tố nhỏ. Tính $\binom{n}{k} \mod p$ mà không cần tính $\binom{n}{k}$ trực tiếp (vì tràn số).

**Ứng dụng:** Tính tổ hợp modulo khi $n, k$ rất lớn nhưng $p$ nhỏ.

---

## 1. Định lý Wilson

### Phát biểu

Với $p$ là số nguyên tố:

$$(p - 1)! \equiv -1 \pmod{p}$$

Hay tương đương: $(p-1)! + 1 \equiv 0 \pmod{p}$.

### Ứng dụng

- Kiểm tra số nguyên tố: $n$ là nguyên tố $\iff (n-1)! \equiv -1 \pmod{n}$. (Nhưng $O(N)$ — chậm.)
- Tính $(p-1)! \mod p$ nhanh.

### Ví dụ

| $p$ | $(p-1)!$ | $(p-1)! \mod p$ |
|-----|----------|-----------------|
| 2 | $1! = 1$ | $1 \equiv -1 \pmod{2}$ ✓ |
| 3 | $2! = 2$ | $2 \equiv -1 \pmod{3}$ ✓ |
| 5 | $4! = 24$ | $24 \mod 5 = 4 \equiv -1 \pmod{5}$ ✓ |
| 7 | $6! = 720$ | $720 \mod 7 = 6 \equiv -1 \pmod{7}$ ✓ |

### Ý tưởng chứng minh

Với $p$ nguyên tố, mỗi $a \in \{1, 2, \ldots, p-1\}$ có nghịch đảo modulo $p$ duy nhất. Các phần tử khác 1 và $p-1$ ghép cặp với nghịch đảo của chúng. Do đó $(p-1)! = 1 \cdot (p-1) \cdot \prod (a \cdot a^{-1}) = p-1 \equiv -1$.

---

## 2. Định lý Lucas

### Phát biểu

Cho $n, k$ và $p$ nguyên tố. Viết $n$ và $k$ trong cơ số $p$:

$$n = n_0 + n_1 p + n_2 p^2 + \ldots$$
$$k = k_0 + k_1 p + k_2 p^2 + \ldots$$

Thì:

$$\binom{n}{k} \equiv \prod_{i} \binom{n_i}{k_i} \pmod{p}$$

(với quy ước $\binom{n_i}{k_i} = 0$ nếu $k_i > n_i$).

### Ứng dụng

Tính $\binom{n}{k} \mod p$ với $n, k$ rất lớn ($10^{18}$) và $p$ nhỏ (nguyên tố).

### Trace chi tiết

Tính $\binom{22}{7} \mod 5$:

**Bước 1:** Viết 22 và 7 trong cơ số 5:

$22 = 4 \cdot 5 + 2 \Rightarrow (4, 2)_5$

$7 = 1 \cdot 5 + 2 \Rightarrow (1, 2)_5$

**Bước 2:** Áp dụng Lucas:

$$\binom{22}{7} \equiv \binom{4}{1} \cdot \binom{2}{2} \pmod{5}$$

$$= 4 \cdot 1 = 4$$

**Kiểm tra:** $\binom{22}{7} = 170544$, $170544 \mod 5 = 4$ ✓

---

## 3. Phân tích tính đúng đắn

### Wilson

Với $p$ nguyên tố, mỗi $a \in \{2, 3, \ldots, p-2\}$ có nghịch đảo modulo $p$ duy nhất $a^{-1} \neq a$ (vì $a^2 \equiv 1 \pmod{p} \Rightarrow a = 1$ hoặc $a = p-1$). Do đó, các phần tử từ $2$ đến $p-2$ ghép cặp thành $(a, a^{-1})$ với $a \cdot a^{-1} \equiv 1$. Kết quả:

$$(p-1)! = 1 \cdot (p-1) \cdot \prod_{\text{cặp}} (a \cdot a^{-1}) = 1 \cdot (p-1) \cdot 1 = p-1 \equiv -1 \pmod{p}$$

### Lucas

Viết $n$ và $k$ trong cơ số $p$: $n = (n_m \ldots n_1 n_0)_p$, $k = (k_m \ldots k_1 k_0)_p$.

Theo hệ thức Vandermonde modulo $p$:

$$\binom{n}{k} \equiv \prod_{i=0}^{m} \binom{n_i}{k_i} \pmod{p}$$

Đúng vì $(1+x)^n = \prod_{i} (1+x)^{n_i \cdot p^i} \equiv \prod_{i} (1+x^{p^i})^{n_i} \pmod{p}$ (theo Fermat nhỏ), và hệ số $x^k$ trong tích này chính là $\prod \binom{n_i}{k_i}$.

---

## 4. Đánh giá độ phức tạp

| Thuật toán | Thời gian |
|------------|-----------|
| Lucas với $p$ nguyên tố | $O(\log_p n \cdot p)$ |

---

## Code minh họa

### Định lý Wilson

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    long long factorial_mod(long long n, long long p) {
        long long res = 1;
        for (long long i = 2; i <= n; i++)
            res = res * i % p;
        return res;
    }

    int main() {
        long long p;
        cin >> p;
        // (p-1)! ≡ -1 (mod p)
        long long fact = factorial_mod(p - 1, p);
        cout << "(p-1)! mod p = " << fact << " (nen bang " << p - 1 << ")" << endl;
        return 0;
    }
    ```

=== "Python"

    ```python
    def factorial_mod(n, p):
        res = 1
        for i in range(2, n + 1):
            res = res * i % p
        return res

    p = int(input())
    fact = factorial_mod(p - 1, p)
    print(f"(p-1)! mod p = {fact} (nen bang {p - 1})")
    ```

### Định lý Lucas

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    long long power(long long a, long long b, long long p) {
        long long res = 1;
        a %= p;
        while (b > 0) {
            if (b & 1) res = res * a % p;
            a = a * a % p;
            b >>= 1;
        }
        return res;
    }

    long long modInverse(long long a, long long p) {
        return power(a, p - 2, p);
    }

    long long nCr_mod_p(long long n, long long r, long long p) {
        if (r > n) return 0;
        if (r == 0) return 1;
        long long num = 1, den = 1;
        for (long long i = 0; i < r; i++) {
            num = num * ((n - i) % p) % p;
            den = den * ((i + 1) % p) % p;
        }
        return num * modInverse(den, p) % p;
    }

    long long lucas(long long n, long long r, long long p) {
        if (r == 0) return 1;
        long long ni = n % p, ri = r % p;
        return lucas(n / p, r / p, p) * nCr_mod_p(ni, ri, p) % p;
    }

    int main() {
        long long n, k, p;
        cin >> n >> k >> p;
        cout << lucas(n, k, p) << "\n";
        return 0;
    }
    ```

=== "Python"

    ```python
    def power(a, b, p):
        res = 1
        a %= p
        while b > 0:
            if b & 1:
                res = res * a % p
            a = a * a % p
            b >>= 1
        return res

    def nCr_mod_p(n, r, p):
        if r > n:
            return 0
        if r == 0:
            return 1
        num = den = 1
        for i in range(r):
            num = num * ((n - i) % p) % p
            den = den * ((i + 1) % p) % p
        return num * power(den, p - 2, p) % p

    def lucas(n, r, p):
        if r == 0:
            return 1
        ni, ri = n % p, r % p
        return lucas(n // p, r // p, p) * nCr_mod_p(ni, ri, p) % p

    n, k, p = map(int, input().split())
    print(lucas(n, k, p))
    ```
