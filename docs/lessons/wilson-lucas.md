# Bài 54: Định Lý Wilson & Định Lý Lucas

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** CP-Algorithms

---

## Bản chất vấn đề

### Định lý Wilson

**Bài toán mở đầu:** Tính $10! \mod 11$ mà không nhân tay 10 số? Vì $11$ nguyên tố, Wilson cho ngay đáp án $-1 \equiv 10 \pmod{11}$. Tổng quát: với $p$ nguyên tố, $(p-1)! \mod p$ luôn là $p-1$ — không cần tính giai thừa trực tiếp (bất khả khi $p$ lớn).

!!! warning "Wilson KHÔNG dùng để test nguyên tố trong thi đấu"
    Kiểm tra $(n-1)! \mod n$ tốn $O(n)$ phép nhân — với $n \approx 10^9$ sẽ TLE. Trong contest hãy dùng Miller-Rabin. Wilson chỉ hữu ích để **biến đổi công thức giai thừa modulo**, không phải để kiểm tra nguyên tố.

### Định lý Lucas

**Bài toán mở đầu:** Tính $\binom{10^{18}}{10^9} \mod 5$? Không thể tính tử số trực tiếp (khổng lồ), và $5$ quá nhỏ để dùng nghịch đảo modulo thông thường qua giai thừa (vì $5 \mid$ mẫu số). Lucas tách $n, k$ thành các chữ số cơ số $5$ rồi nhân các tổ hợp nhỏ lại — mỗi tổ hợp nhỏ tính được bằng tay.

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

### Wilson mở rộng cho $p^k$ (Định lý Gauss)

Với $m > 1$, tích các số $\le m$ nguyên tố cùng nhau với $m$:

$$\prod_{\substack{1 \le i \le m \\ \gcd(i, m) = 1}} i \equiv \begin{cases} -1 \pmod m & \text{nếu } m = 4,\ p^k,\ 2p^k \text{ (với } p \text{ nguyên tố lẻ)} \\ 1 \pmod m & \text{các trường hợp còn lại} \end{cases}$$

---

## 3. Phân tích tính đúng đắn

### Wilson

Với $p$ nguyên tố, mỗi $a \in \{2, 3, \ldots, p-2\}$ có nghịch đảo modulo $p$ duy nhất $a^{-1} \neq a$ (vì $a^2 \equiv 1 \pmod{p} \Rightarrow a = 1$ hoặc $a = p-1$). Do đó, các phần tử từ $2$ đến $p-2$ ghép cặp thành $(a, a^{-1})$ với $a \cdot a^{-1} \equiv 1$. Kết quả:

$$(p-1)! = 1 \cdot (p-1) \cdot \prod_{\text{cặp}} (a \cdot a^{-1}) = 1 \cdot (p-1) \cdot 1 = p-1 \equiv -1 \pmod{p}$$

### Lucas

Viết $n$ và $k$ trong cơ số $p$: $n = (n_m \ldots n_1 n_0)_p$, $k = (k_m \ldots k_1 k_0)_p$.

Theo tính chất lũy thừa trong đặc số $p$ (**Freshman's Dream**: $(1+x)^p \equiv 1 + x^p \pmod{p}$):

$$\binom{n}{k} \equiv \prod_{i=0}^{m} \binom{n_i}{k_i} \pmod{p}$$

Đúng vì $(1+x)^n = \prod_{i} (1+x)^{n_i \cdot p^i} \equiv \prod_{i} (1+x^{p^i})^{n_i} \pmod{p}$, và hệ số $x^k$ trong tích này chính là $\prod \binom{n_i}{k_i}$.

---

## 4. Đánh giá độ phức tạp

| Thuật toán | Thời gian |
|------------|-----------|
| Wilson trực tiếp cho $n! \bmod p$ ($n < p$, $p - n$ nhỏ) | $O(p - n + \log p)$ |
| Lucas (1 truy vấn, không tiền xử lý) | $O(\log_p n \cdot p)$ |
| Lucas (nhiều truy vấn, tiền xử lý `fact[0..p-1]`) | Tiền xử lý $O(p)$, mỗi truy vấn $O(\log_p n)$ |

---

## Code minh họa

### Định lý Wilson: Tính $n! \bmod p$ khi $n \ge p$ hoặc $n$ gần $p$

> Nếu $n \ge p$ thì $n! \equiv 0 \pmod p$. Nếu $n < p$ nhưng $p - n$ nhỏ (ví dụ $n = p - 2, p - 3$), ta tận dụng $(p-1)! \equiv p - 1 \pmod p$ để tính ngược về $n!$ trong $O(p - n + \log p)$ thay vì lặp từ $1$ đến $n$.

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

    // Tính n! mod p nhanh khi n >= p hoặc n gần p
    long long factorialModWilson(long long n, long long p) {
        if (n >= p) return 0; // chứa thừa số p
        if (n <= p - 1 - n) {
            long long res = 1;
            for (long long i = 2; i <= n; i++) res = res * i % p;
            return res;
        }
        // Dùng (p-1)! ≡ p - 1 (mod p) ⇒ n! ≡ (p-1)! * ((n+1)...(p-1))^(-1)
        long long prod = 1;
        for (long long i = n + 1; i < p; i++) prod = prod * i % p;
        return (p - 1) * power(prod, p - 2, p) % p;
    }

    int main() {
        long long n, p;
        cin >> n >> p;
        cout << factorialModWilson(n, p) << "\n";
        return 0;
    }
    ```

=== "Python"

    ```python
    def factorial_mod_wilson(n, p):
        if n >= p:
            return 0  # chứa thừa số p
        if n <= p - 1 - n:
            res = 1
            for i in range(2, n + 1):
                res = res * i % p
            return res
        # (p-1)! ≡ p - 1 (mod p)
        prod = 1
        for i in range(n + 1, p):
            prod = prod * i % p
        return (p - 1) * pow(prod, p - 2, p) % p

    n, p = map(int, input().split())
    print(factorial_mod_wilson(n, p))
    ```

### Định lý Lucas (tiền xử lý $O(p)$, trả lời mỗi truy vấn $O(\log_p n)$)

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

    struct Lucas {
        long long p;
        vector<long long> fact, invFact;

        Lucas(long long p) : p(p), fact(p), invFact(p) {
            fact[0] = 1;
            for (long long i = 1; i < p; i++) fact[i] = fact[i - 1] * i % p;
            invFact[p - 1] = power(fact[p - 1], p - 2, p);
            for (long long i = p - 2; i >= 0; i--)
                invFact[i] = invFact[i + 1] * (i + 1) % p;
        }

        long long nCrSmall(long long n, long long r) const {
            if (r > n) return 0;
            return fact[n] * invFact[r] % p * invFact[n - r] % p;
        }

        long long query(long long n, long long r) const {
            long long res = 1;
            while (r > 0) {
                res = res * nCrSmall(n % p, r % p) % p;
                n /= p;
                r /= p;
            }
            return res;
        }
    };

    int main() {
        ios_base::sync_with_stdio(false);
        cin.tie(NULL);
        int q;
        long long p;
        cin >> q >> p;
        Lucas solver(p);
        while (q--) {
            long long n, k;
            cin >> n >> k;
            cout << solver.query(n, k) << "\n";
        }
        return 0;
    }
    ```

=== "Python"

    ```python
    import sys
    input = sys.stdin.readline

    class Lucas:
        def __init__(self, p):
            self.p = p
            self.fact = [1] * p
            for i in range(1, p):
                self.fact[i] = self.fact[i - 1] * i % p
            self.inv_fact = [1] * p
            self.inv_fact[p - 1] = pow(self.fact[p - 1], p - 2, p)
            for i in range(p - 2, -1, -1):
                self.inv_fact[i] = self.inv_fact[i + 1] * (i + 1) % p

        def nCr_small(self, n, r):
            if r > n:
                return 0
            p = self.p
            return self.fact[n] * self.inv_fact[r] % p * self.inv_fact[n - r] % p

        def query(self, n, r):
            res = 1
            p = self.p
            while r > 0:
                res = res * self.nCr_small(n % p, r % p) % p
                n //= p
                r //= p
            return res

    q, p = map(int, input().split())
    solver = Lucas(p)
    for _ in range(q):
        n, k = map(int, input().split())
        print(solver.query(n, k))
    ```

---

## 5. Bài tập luyện tập

| Mã bài | Tên bài tập | Độ khó | Kiểu bài tập (Bản chất) | Bài học lý thuyết |
| :--- | :--- | :---: | :--- | :--- |
| `wl-wilson` | [Kiểm chứng định lý Wilson](https://fptoj.com/problem/wl-wilson) | ⭐ | Wilson cơ bản | [Định lý Wilson & Lucas](wilson-lucas.md) |
| `wl-fact-p` | [Giai thừa modulo số nguyên tố](https://fptoj.com/problem/wl-fact-p) | ⭐ | $n! \bmod p$ | [Định lý Wilson & Lucas](wilson-lucas.md) |
| `wl-permut` | [Hoán vị modulo](https://fptoj.com/problem/wl-permut) | ⭐ | $n! \bmod p$ | [Định lý Wilson & Lucas](wilson-lucas.md) |
| `wl-wilson-check` | [Kiểm tra nguyên tố bằng Wilson](https://fptoj.com/problem/wl-wilson-check) | ⭐⭐ | Wilson $\Rightarrow$ nguyên tố | [Định lý Wilson & Lucas](wilson-lucas.md) |
| `wl-fact-mod` | [Giai thừa modulo](https://fptoj.com/problem/wl-fact-mod) | ⭐⭐ | $n! \bmod p$ với $n < p$ | [Định lý Wilson & Lucas](wilson-lucas.md) |
| `wl-wilson-ext` | [Wilson mở rộng](https://fptoj.com/problem/wl-wilson-ext) | ⭐⭐ | Wilson cho $p^k$ | [Định lý Wilson & Lucas](wilson-lucas.md) |
| `wl-comb-mod` | [Tổng tổ hợp modulo](https://fptoj.com/problem/wl-comb-mod) | ⭐⭐ | $\sum C_n^k = 2^n \bmod p$ | [Định lý Wilson & Lucas](wilson-lucas.md) |
| `wl-lucas-basic` | [Định lý Lucas cơ bản](https://fptoj.com/problem/wl-lucas-basic) | ⭐⭐⭐ | $C_n^k \bmod p$ (Lucas) | [Định lý Wilson & Lucas](wilson-lucas.md) |
| `wl-lucas-multi` | [Lucas nhiều truy vấn](https://fptoj.com/problem/wl-lucas-multi) | ⭐⭐⭐⭐ | Lucas $Q$ truy vấn | [Định lý Wilson & Lucas](wilson-lucas.md) |
| `wl-lucas-sumstr` | [Tổng tổ hợp theo bội của p](https://fptoj.com/problem/wl-lucas-sumstr) | ⭐⭐⭐⭐ | $\sum_{p \mid k} C_n^k \bmod p$ | [Định lý Wilson & Lucas](wilson-lucas.md) |
| `wl-wilson-lucas` | [Kết hợp Wilson và Lucas](https://fptoj.com/problem/wl-wilson-lucas) | ⭐⭐⭐⭐ | $a! + C_b^c \bmod p$ | [Định lý Wilson & Lucas](wilson-lucas.md) |

### Tham khảo thêm

| Bài | Nền tảng | Độ khó | Mô tả |
|---|---|---|---|
| [CSES - Binomial Coefficients](https://cses.fi/problemset/task/1079) | CSES | ⭐⭐ | Tổ hợp modulo |
| [VNOJ - VOMARBLE](https://oj.vnoi.info/problem/vomarble) | VNOJ | ⭐⭐⭐ | Tổ hợp modulo |

---

**Bài trước:** [← Bài 53: Hàm Phi Euler ($\varphi$)](phi-euler.md) | **Bài tiếp theo:** [Bài 55: Định Lý Thặng Dư Trung Hoa (CRT) →](crt.md)
