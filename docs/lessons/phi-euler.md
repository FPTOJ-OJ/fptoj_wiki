# Hàm Phi Euler ($\varphi$) - Đếm Số Nguyên Tố Cùng Nhau

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** VNOI Wiki, CP-Algorithms - Euler's Totient

---

## 1. Bản chất vấn đề

### Định nghĩa

Hàm Euler $\varphi(n)$ đếm số nguyên dương $k$ sao cho $1 \le k \le n$ và $\gcd(k, n) = 1$ (nguyên tố cùng nhau với $n$).

**Ví dụ:** $\varphi(12)$: Các số nguyên tố cùng nhau với 12 trong $[1, 12]$: $\{1, 5, 7, 11\}$ $\Rightarrow$ $\varphi(12) = 4$.

### Ứng dụng

| Bài toán | Sử dụng $\varphi$ |
|----------|-------------------|
| Định lý Euler: $a^{\varphi(n)} \equiv 1 \pmod{n}$ | Tính lũy thừa modulo |
| Nghịch đảo modulo | $a^{-1} \equiv a^{\varphi(n)-1} \pmod{n}$ |
| Đếm phân số tối giản | Số phân số $\frac{k}{n}$ với $\gcd(k,n)=1$ |

---

## 2. Tư duy cốt lõi

### Công thức tính $\varphi(n)$

Nếu $n = p_1^{a_1} \cdot p_2^{a_2} \cdots p_k^{a_k}$ (phân tích thừa số nguyên tố):

$$\varphi(n) = n \cdot \prod_{i=1}^{k} \left(1 - \frac{1}{p_i}\right)$$

**Ví dụ:** $\varphi(12) = 12 \cdot (1 - \frac{1}{2}) \cdot (1 - \frac{1}{3}) = 12 \cdot \frac{1}{2} \cdot \frac{2}{3} = 4$

### Tính $\varphi(n)$ bằng sàng

Dùng biến thể Eratosthenes: ban đầu $\varphi[i] = i$. Với mỗi số nguyên tố $p$, nhân $\varphi[j]$ với $(1 - 1/p)$ cho tất cả bội của $p$.

### Trace chi tiết: Tính $\varphi$ từ 1 đến 12

| $n$ | Phân tích | $\varphi(n)$ |
|-----|-----------|-------------|
| 1 | — | 1 |
| 2 | $2$ | $2 \cdot (1 - 1/2) = 1$ |
| 3 | $3$ | $3 \cdot (1 - 1/3) = 2$ |
| 4 | $2^2$ | $4 \cdot (1 - 1/2) = 2$ |
| 5 | $5$ | $5 \cdot (1 - 1/5) = 4$ |
| 6 | $2 \cdot 3$ | $6 \cdot (1 - 1/2)(1 - 1/3) = 2$ |
| 7 | $7$ | $7 \cdot (1 - 1/7) = 6$ |
| 8 | $2^3$ | $8 \cdot (1 - 1/2) = 4$ |
| 9 | $3^2$ | $9 \cdot (1 - 1/3) = 6$ |
| 10 | $2 \cdot 5$ | $10 \cdot (1 - 1/2)(1 - 1/5) = 4$ |
| 11 | $11$ | $11 \cdot (1 - 1/11) = 10$ |
| 12 | $2^2 \cdot 3$ | $12 \cdot (1 - 1/2)(1 - 1/3) = 4$ |

---

## 3. Phân tích tính đúng đắn

### Nguyên lý loại trừ

Số nguyên tố cùng nhau với $n$ = $n$ - (số chia hết cho ít nhất 1 thừa số nguyên tố của $n$).

Dùng inclusion-exclusion với các thừa số nguyên tố $p_1, p_2, \ldots, p_k$:

$$\varphi(n) = n - \sum_{i}\frac{n}{p_i} + \sum_{i<j}\frac{n}{p_i p_j} - \ldots = n \cdot \prod_{i}\left(1 - \frac{1}{p_i}\right)$$

### Tính chất nhân tính

Nếu $\gcd(a, b) = 1$ thì $\varphi(ab) = \varphi(a) \cdot \varphi(b)$.

Đây là tính chất **hàm nhân tính** (multiplicative function).

---

## 4. Đánh giá độ phức tạp

| Phương pháp | Thời gian | Không gian |
|-------------|-----------|------------|
| Tính $\varphi(n)$ trực tiếp | $O(\sqrt{n})$ | $O(1)$ |
| Sàng $\varphi$ từ 1 đến $N$ | $O(N \log \log N)$ | $O(N)$ |

---

## Code minh họa

### Tính $\varphi(n)$ trực tiếp

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    long long phi(long long n) {
        long long result = n;
        for (long long p = 2; p * p <= n; p++) {
            if (n % p == 0) {
                while (n % p == 0) n /= p;
                result -= result / p;
            }
        }
        if (n > 1) result -= result / n;
        return result;
    }

    int main() {
        long long n;
        cin >> n;
        cout << phi(n) << "\n";
        return 0;
    }
    ```

=== "Python"

    ```python
    def phi(n):
        result = n
        p = 2
        while p * p <= n:
            if n % p == 0:
                while n % p == 0:
                    n //= p
                result -= result // p
            p += 1
        if n > 1:
            result -= result // n
        return result

    n = int(input())
    print(phi(n))
    ```

### Sàng $\varphi$ từ 1 đến $N$

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    int main() {
        int n;
        cin >> n;

        vector<int> phi(n + 1);
        iota(phi.begin(), phi.end(), 0);

        for (int i = 2; i <= n; i++) {
            if (phi[i] == i) { // i là nguyên tố
                for (int j = i; j <= n; j += i) {
                    phi[j] -= phi[j] / i;
                }
            }
        }

        for (int i = 1; i <= n; i++) {
            cout << "phi(" << i << ") = " << phi[i] << "\n";
        }
        return 0;
    }
    ```

=== "Python"

    ```python
    n = int(input())
    phi = list(range(n + 1))

    for i in range(2, n + 1):
        if phi[i] == i:  # i là nguyên tố
            for j in range(i, n + 1, i):
                phi[j] -= phi[j] // i

    for i in range(1, n + 1):
        print(f"phi({i}) = {phi[i]}")
    ```
