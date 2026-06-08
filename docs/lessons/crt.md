# Định Lý Thặng Dư Trung Hoa (CRT) - Ghép Phương Trình Modular

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** CP-Algorithms - CRT

---

## 1. Bản chất vấn đề

### Bài toán: Giải hệ phương trình đồng dư

Giải hệ:

$$\begin{cases} x \equiv a_1 \pmod{m_1} \\ x \equiv a_2 \pmod{m_2} \\ \vdots \\ x \equiv a_k \pmod{m_k} \end{cases}$$

Trong đó $m_1, m_2, \ldots, m_k$ **nguyên tố cùng nhau** đôi một ($\gcd(m_i, m_j) = 1$ với $i \neq j$).

### Định lý CRT

Nếu $\gcd(m_i, m_j) = 1$ với mọi $i \neq j$, hệ phương trình có **nghiệm duy nhất** modulo $M = m_1 \cdot m_2 \cdots m_k$.

### Ví dụ

$$\begin{cases} x \equiv 2 \pmod{3} \\ x \equiv 3 \pmod{5} \\ x \equiv 2 \pmod{7} \end{cases}$$

Nghiệm: $x = 23$ (vì $23 \mod 3 = 2$, $23 \mod 5 = 3$, $23 \mod 7 = 2$). Mọi nghiệm có dạng $x = 23 + 105k$ với $k \in \mathbb{Z}$.

---

## 2. Tư duy cốt lõi

### Công thức CRT

$$x = \sum_{i=1}^{k} a_i \cdot M_i \cdot M_i^{-1} \pmod{M}$$

Trong đó:

- $M = m_1 \cdot m_2 \cdots m_k$
- $M_i = M / m_i$
- $M_i^{-1}$ là nghịch đảo modular của $M_i$ modulo $m_i$

### Trace chi tiết

Hệ: $x \equiv 2 \pmod{3}$, $x \equiv 3 \pmod{5}$, $x \equiv 2 \pmod{7}$

**Bước 1:** Tính $M = 3 \times 5 \times 7 = 105$

**Bước 2:** Tính $M_i$:

| $i$ | $m_i$ | $M_i = M / m_i$ | $M_i \mod m_i$ | $M_i^{-1} \pmod{m_i}$ |
|-----|-------|-----------------|----------------|----------------------|
| 1 | 3 | $105/3 = 35$ | $35 \mod 3 = 2$ | $2^{-1} \pmod{3} = 2$ (vì $2 \times 2 = 4 \equiv 1$) |
| 2 | 5 | $105/5 = 21$ | $21 \mod 5 = 1$ | $1^{-1} \pmod{5} = 1$ |
| 3 | 7 | $105/7 = 15$ | $15 \mod 7 = 1$ | $1^{-1} \pmod{7} = 1$ |

**Bước 3:** Tính $x$:

$$x = 2 \times 35 \times 2 + 3 \times 21 \times 1 + 2 \times 15 \times 1 = 140 + 63 + 30 = 233$$

$$x = 233 \mod 105 = 23$$

**Kiểm tra:** $23 \mod 3 = 2$ ✓, $23 \mod 5 = 3$ ✓, $23 \mod 7 = 2$ ✓

---

## 3. Phân tích tính đúng đắn

### Tại sao $M_i \cdot M_i^{-1} \equiv 1 \pmod{m_i}$?

$M_i = M / m_i$ không chia hết cho $m_i$ (vì $\gcd(m_i, m_j) = 1$). Do đó $\gcd(M_i, m_i) = 1$ $\Rightarrow$ $M_i$ có nghịch đảo modulo $m_i$.

### Tại sao $M_i \cdot M_i^{-1} \equiv 0 \pmod{m_j}$ với $j \neq i$?

$M_i$ chia hết cho $m_j$ (vì $M_i = M / m_i$ chứa $m_j$). Do đó $M_i \cdot M_i^{-1} \equiv 0 \pmod{m_j}$.

---

## 4. Đánh giá độ phức tạp

| Thao tác | Thời gian |
|----------|-----------|
| CRT cho $k$ phương trình | $O(k \cdot \log(\max m_i))$ |
| Tính nghịch đảo modular (Euclid) | $O(\log m)$ |

---

## Code minh họa

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    long long extgcd(long long a, long long b, long long& x, long long& y) {
        if (b == 0) { x = 1; y = 0; return a; }
        long long x1, y1;
        long long g = extgcd(b, a % b, x1, y1);
        x = y1;
        y = x1 - (a / b) * y1;
        return g;
    }

    long long modInverse(long long a, long long m) {
        long long x, y;
        extgcd(a, m, x, y);
        return (x % m + m) % m;
    }

    long long crt(vector<long long>& a, vector<long long>& m) {
        long long M = 1;
        for (long long mi : m) M *= mi;

        long long x = 0;
        for (int i = 0; i < (int)a.size(); i++) {
            long long Mi = M / m[i];
            long long inv = modInverse(Mi % m[i], m[i]);
            // Dùng __int128 để tránh tràn số khi nhân 3 số lớn
            long long term = (__int128)a[i] * Mi % M * inv % M;
            x = (x + term) % M;
        }
        return (x + M) % M;
    }

    int main() {
        int k;
        cin >> k;
        vector<long long> a(k), m(k);
        for (int i = 0; i < k; i++) cin >> a[i] >> m[i];
        cout << crt(a, m) << "\n";
        return 0;
    }
    ```

=== "Python"

    ```python
    def extgcd(a, b):
        if b == 0:
            return a, 1, 0
        g, x1, y1 = extgcd(b, a % b)
        return g, y1, x1 - (a // b) * y1

    def mod_inverse(a, m):
        g, x, _ = extgcd(a, m)
        return x % m

    def crt(a, m):
        M = 1
        for mi in m:
            M *= mi
        x = 0
        for ai, mi in zip(a, m):
            Mi = M // mi
            inv = mod_inverse(Mi % mi, mi)
            x = (x + ai * Mi * inv) % M
        return x

    k = int(input())
    a, m = [], []
    for _ in range(k):
        ai, mi = map(int, input().split())
        a.append(ai)
        m.append(mi)
    print(crt(a, m))
    ```
