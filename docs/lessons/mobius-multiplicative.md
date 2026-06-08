# Hàm Mobius & Hàm Nhân Tính

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** CP-Algorithms - Möbius Function, Multiplicative Functions

---

## Bản chất vấn đề

### Hàm Mobius

Cho số nguyên dương $n$. Hàm Mobius $\mu(n)$ được dùng trong nguyên lý bao hàm - loại trừ trên ước số, giúp đếm số phần tử thỏa mãn điều kiện liên quan đến chia hết.

**Ứng dụng chính:** $\sum_{d|n} \mu(d) = [n=1]$ — công thức nền tảng để loại bỏ đếm trùng.

### Hàm nhân tính

Hàm $f$ là nhân tính nếu $\gcd(a,b)=1 \Rightarrow f(ab)=f(a) \cdot f(b)$. Hiểu tính chất nhân tính giúp tính nhanh nhiều hàm số học (Euler $\varphi$, Mobius $\mu$, số ước $\sigma_0$, tổng ước $\sigma_1$).

---

## 1. Hàm Mobius

### Định nghĩa

Hàm Mobius $\mu(n)$:

$$\mu(n) = \begin{cases} 1 & \text{if } n = 1 \\ (-1)^k & \text{if } n = p_1 p_2 \cdots p_k \text{ (tích các số nguyên tố phân biệt)} \\ 0 & \text{if } n \text{ chia hết cho bình phương số nguyên tố} \end{cases}$$

### Bảng giá trị

| $n$ | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 12 |
|-----|---|---|---|---|---|---|---|---|---|----|----|
| $\mu(n)$ | 1 | -1 | -1 | 0 | -1 | 1 | -1 | 0 | 0 | 1 | 0 |

$\mu(4) = 0$ vì $4 = 2^2$ (chia hết cho bình phương).

$\mu(6) = 1$ vì $6 = 2 \cdot 3$ ($k=2$ cặp, $(-1)^2 = 1$).

**Biểu đồ giá trị của hàm Möbius $\mu(n)$:**
```matplotlib
n = 30
mu = [0] * (n + 1)
is_prime = [True] * (n + 1)
primes = []

mu[1] = 1
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
        else:
            mu[i * p] = -mu[i]

X = list(range(1, n + 1))
Y = mu[1:]

fig, ax = plt.subplots(figsize=(10, 4.5))

# Vẽ đường cơ sở y=0
ax.axhline(0, color='gray', linestyle='-', alpha=0.4)

# Vẽ biểu đồ dạng stem
markerline, stemlines, baseline = ax.stem(X, Y, linefmt='--', markerfmt='o', basefmt=' ')
plt.setp(markerline, color='#3399ff', markersize=6)
plt.setp(stemlines, color='#3399ff', alpha=0.5, lw=1.5)

# Đánh nhãn giá trị tại mỗi điểm
for x, y in zip(X, Y):
    va_dir = 'bottom' if y >= 0 else 'top'
    offset = 0.08 if y >= 0 else -0.08
    color = '#2ea44f' if y == 1 else ('#d73a49' if y == -1 else '#888888')
    ax.text(x, y + offset, str(y), ha='center', va=va_dir, fontsize=8, color=color, fontweight='bold')

ax.set_xticks(X)
ax.set_yticks([-1, 0, 1])
ax.set_ylim(-1.5, 1.5)
ax.set_xlabel('Số nguyên dương n')
ax.set_ylabel('Giá trị μ(n)')
ax.set_title('Biểu đồ giá trị Hàm Mobius μ(n) với n từ 1 đến 30')
ax.grid(True, alpha=0.2, linestyle=':')
plt.tight_layout()
```


### Ứng dụng: Nghịch đảo Dirichlet

$$\sum_{d | n} \mu(d) = \begin{cases} 1 & \text{if } n = 1 \\ 0 & \text{if } n > 1 \end{cases}$$

**Hệ quả (nguyên lý bao hàm - loại trừ):**

$$[n = 1] = \sum_{d | n} \mu(d)$$

### Tính $\mu(n)$ bằng sàng

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    int main() {
        int n;
        cin >> n;

        vector<int> mu(n + 1, 1);
        vector<bool> is_prime(n + 1, true);
        vector<int> primes;

        mu[1] = 1;
        for (int i = 2; i <= n; i++) {
            if (is_prime[i]) {
                primes.push_back(i);
                mu[i] = -1;
            }
            for (int p : primes) {
                if (i * p > n) break;
                is_prime[i * p] = false;
                if (i % p == 0) {
                    mu[i * p] = 0;
                    break;
                } else {
                    mu[i * p] = -mu[i];
                }
            }
        }

        for (int i = 1; i <= n; i++)
            cout << "mu(" << i << ") = " << mu[i] << "\n";
        return 0;
    }
    ```

=== "Python"

    ```python
    n = int(input())
    mu = [1] * (n + 1)
    is_prime = [True] * (n + 1)
    primes = []

    mu[1] = 1
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
            else:
                mu[i * p] = -mu[i]

    for i in range(1, n + 1):
        print(f"mu({i}) = {mu[i]}")
    ```

---

## 2. Hàm Nhân Tính (Multiplicative Function)

### Định nghĩa

Hàm $f$ là **nhân tính** nếu $\gcd(a, b) = 1 \Rightarrow f(ab) = f(a) \cdot f(b)$.

Hàm $f$ là **hoàn toàn nhân tính** nếu $f(ab) = f(a) \cdot f(b)$ với mọi $a, b$.

### Các hàm nhân tính quan trọng

| Hàm | Định nghĩa | Nhân tính? |
|-----|------------|-----------|
| $\varphi(n)$ (Euler) | Số nguyên tố cùng nhau | Có |
| $\mu(n)$ (Mobius) | Hàm Mobius | Có |
| $\sigma_0(n)$ | Số ước | Có |
| $\sigma_1(n)$ | Tổng ước | Có |
| $\text{id}(n) = n$ | Hàm đồng nhất | Hoàn toàn |
| $\text{id}_k(n) = n^k$ | Lũy thừa | Hoàn toàn |
| $\mathbf{1}(n) = 1$ | Hàm hằng | Hoàn toàn |

### Tính chất: Convolution Dirichlet

Nếu $f, g$ là nhân tính thì $f * g$ cũng là nhân tính, với:

$$(f * g)(n) = \sum_{d | n} f(d) \cdot g(n/d)$$

**Ví dụ:** $\varphi * \mathbf{1} = \text{id}$, tức $\sum_{d|n} \varphi(d) = n$.

---

## 3. Phân tích tính đúng đắn

### Tại sao $\sum_{d|n} \mu(d) = [n=1]$?

**Trường hợp $n = 1$:** $\sum_{d|1} \mu(d) = \mu(1) = 1$. Đúng.

**Trường hợp $n > 1$:** Viết $n = p_1^{a_1} \cdot p_2^{a_2} \cdots p_k^{a_k}$ với $k \ge 1$.

Các ước $d$ của $n$ mà $\mu(d) \neq 0$ là các tích phân biệt của $p_1, p_2, \ldots, p_k$ (mỗi ước chọn hoặc không chọn mỗi $p_i$).

$$\sum_{d|n} \mu(d) = \sum_{S \subseteq \{p_1, \ldots, p_k\}} (-1)^{|S|} = \sum_{j=0}^{k} \binom{k}{j} (-1)^j = (1 - 1)^k = 0$$

Đây chính là khai triển nhị thức Newton của $(1-1)^k = 0$ với $k \ge 1$.

### Tại sao Mobius là hàm nhân tính?

Nếu $\gcd(a, b) = 1$, thì $ab$ có bình phương nguyên tố $\iff$ $a$ hoặc $b$ có bình phương nguyên tố. Do đó $\mu(ab) = \mu(a) \cdot \mu(b)$.

---

## 4. Đánh giá độ phức tạp

| Thao tác | Thời gian |
|----------|-----------|
| Sàng tính $\mu$ hoặc $\varphi$ | $O(N \log \log N)$ |
| Linear sieve tính $\mu$, $\varphi$ | $O(N)$ |

---

## Code minh họa: Sàng tuyến tính tính nhiều hàm cùng lúc

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    int main() {
        int n;
        cin >> n;

        vector<int> mu(n + 1, 0), phi(n + 1, 0);
        vector<bool> is_prime(n + 1, true);
        vector<int> primes;

        mu[1] = 1;
        phi[1] = 1;

        for (int i = 2; i <= n; i++) {
            if (is_prime[i]) {
                primes.push_back(i);
                mu[i] = -1;
                phi[i] = i - 1;
            }
            for (int p : primes) {
                if (i * p > n) break;
                is_prime[i * p] = false;
                if (i % p == 0) {
                    mu[i * p] = 0;
                    phi[i * p] = phi[i] * p;
                    break;
                } else {
                    mu[i * p] = -mu[i];
                    phi[i * p] = phi[i] * (p - 1);
                }
            }
        }

        for (int i = 1; i <= n; i++)
            cout << i << ": mu=" << mu[i] << " phi=" << phi[i] << "\n";
        return 0;
    }
    ```

=== "Python"

    ```python
    n = int(input())
    mu = [0] * (n + 1)
    phi = [0] * (n + 1)
    is_prime = [True] * (n + 1)
    primes = []

    mu[1] = phi[1] = 1

    for i in range(2, n + 1):
        if is_prime[i]:
            primes.append(i)
            mu[i] = -1
            phi[i] = i - 1
        for p in primes:
            if i * p > n:
                break
            is_prime[i * p] = False
            if i % p == 0:
                mu[i * p] = 0
                phi[i * p] = phi[i] * p
                break
            else:
                mu[i * p] = -mu[i]
                phi[i * p] = phi[i] * (p - 1)

    for i in range(1, n + 1):
        print(f"{i}: mu={mu[i]} phi={phi[i]}")
    ```
