# Bài 66: Căn Nguyên Thủy & Dấu Hiệu Bình Phương

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** CP-Algorithms, VNOI Wiki

## 1. Căn Nguyên Thủy (Primitive Root)

### 1.1 Định nghĩa

Cho $n$ nguyên tố. Số $g$ là **căn nguyên thủy** modulo $n$ nếu $\text{ord}(g) = \phi(n) = n - 1$.

Nghĩa là: $g^0, g^1, g^2, \ldots, g^{n-2}$ cho tất cả giá trị từ $1$ đến $n-1$ (modulo $n$).

### 1.2 Ví dụ

$n = 7$, $g = 3$:
- $3^0 = 1$
- $3^1 = 3$
- $3^2 = 9 \equiv 2$
- $3^3 = 27 \equiv 6$
- $3^4 = 81 \equiv 4$
- $3^5 = 243 \equiv 5$

→ $\{1, 2, 3, 4, 5, 6\}$ = tất cả số từ 1 đến 6. Vậy 3 là căn nguyên thủy modulo 7.

### 1.3 Điều kiện tồn tại

Căn nguyên thủy modulo $n$ tồn tại khi và chỉ khi $n$ thuộc một trong các dạng:
- $n = 1, 2, 4$
- $n = p^k$ với $p$ nguyên tố lẻ
- $n = 2p^k$ với $p$ nguyên tố lẻ

Trong thi đấu, thường $n$ là **số nguyên tố** → luôn có căn nguyên thủy.

### 1.4 Tính chất

- Số căn nguyên thủy modulo $p$ là $\phi(p-1)$
- Nếu $g$ là căn nguyên thủy, thì $g^k$ cũng là căn nguyên thủy khi $\gcd(k, p-1) = 1$

---

## 2. Tìm căn nguyên thủy

### 2.1 Thuật toán

Với $p$ nguyên tố:
1. Phân tích $p - 1$ thành thừa số nguyên tố: $p - 1 = q_1^{e_1} \cdot q_2^{e_2} \cdots q_k^{e_k}$
2. Duyệt $g = 2, 3, 4, \ldots$
3. Kiểm tra: với mọi $q_i$, $g^{(p-1)/q_i} \not\equiv 1 \pmod{p}$
4. Nếu thỏa mãn → $g$ là căn nguyên thủy

### 2.2 Cài đặt

=== "C++"

    ```cpp
    long long findPrimitiveRoot(long long p) {
        if (p == 2) return 1;

        // Phân tích p-1
        long long phi = p - 1;
        vector<long long> factors;
        long long n = phi;
        for (long long i = 2; i * i <= n; i++) {
            if (n % i == 0) {
                factors.push_back(i);
                while (n % i == 0) n /= i;
            }
        }
        if (n > 1) factors.push_back(n);

        // Duyệt g
        for (long long g = 2; g <= p; g++) {
            bool ok = true;
            for (long long q : factors) {
                if (powerMod(g, phi / q, p) == 1) {
                    ok = false;
                    break;
                }
            }
            if (ok) return g;
        }
        return -1;
    }
    ```

=== "Python"

    ```python
    def find_primitive_root(p):
        if p == 2:
            return 1

        phi = p - 1
        factors = []
        n = phi
        i = 2
        while i * i <= n:
            if n % i == 0:
                factors.append(i)
                while n % i == 0:
                    n //= i
            i += 1
        if n > 1:
            factors.append(n)

        for g in range(2, p + 1):
            ok = True
            for q in factors:
                if pow(g, phi // q, p) == 1:
                    ok = False
                    break
            if ok:
                return g
        return -1
    ```

**Độ phức tạp:** $O(g \cdot k \cdot \log p)$ với $g$ là căn nguyên thủy đầu tiên (thường rất nhỏ, ~O(log²p)).

---

## 3. Dấu Hiệu Bình Phương (Quadratic Residue)

### 3.1 Định nghĩa

Số $a$ là **dấu hiệu bình phương** modulo $p$ (ký hiệu $a$ là QR) nếu tồn tại $x$ sao cho:

$$x^2 \equiv a \pmod{p}$$

Nếu không tồn tại $x$, $a$ là **phi-dấu hiệu bình phương** (NQR).

### 3.2 Ví dụ

Modulo 7:
- $1^2 = 1$ → 1 là QR
- $2^2 = 4$ → 4 là QR
- $3^2 = 9 \equiv 2$ → 2 là QR
- $4^2 = 16 \equiv 2$ → trùng
- $5^2 = 25 \equiv 4$ → trùng
- $6^2 = 36 \equiv 1$ → trùng

QR modulo 7: $\{1, 2, 4\}$ → đúng $(p-1)/2 = 3$ số.

---

## 4. Ký hiệu Legendre

### 4.1 Định nghĩa

$$\left(\frac{a}{p}\right) = \begin{cases} 0 & \text{nếu } p \mid a \\ 1 & \text{nếu } a \text{ là QR mod } p \\ -1 & \text{nếu } a \text{ là NQR mod } p \end{cases}$$

### 4.2 Định lý Euler

$$\left(\frac{a}{p}\right) \equiv a^{(p-1)/2} \pmod{p}$$

=== "C++"

    ```cpp
    int legendre(long long a, long long p) {
        long long result = powerMod(a, (p - 1) / 2, p);
        if (result == p - 1) return -1;
        return (int)result;
    }
    ```

### 4.3 Tính chất

- $\left(\frac{ab}{p}\right) = \left(\frac{a}{p}\right) \left(\frac{b}{p}\right)$
- $\left(\frac{a^2}{p}\right) = 1$ nếu $p \nmid a$

---

## 5. Tonelli-Shanks: Căn bậc hai modulo

### 5.1 Bài toán

Cho $a$ là QR modulo $p$ (nguyên tố lẻ). Tìm $x$ sao cho $x^2 \equiv a \pmod{p}$.

### 5.2 Trường hợp đặc biệt

**Nếu $p \equiv 3 \pmod{4}$:**

$$x \equiv a^{(p+1)/4} \pmod{p}$$

Vì $x^2 = a^{(p+1)/2} = a \cdot a^{(p-1)/2} = a \cdot 1 = a$ (do $a$ là QR).

### 5.3 Thuật toán Tonelli-Shanks tổng quát

=== "C++"

    ```cpp
    // Tìm x sao cho x^2 ≡ n (mod p), p nguyên tố lẻ
    // Trả về -1 nếu không tồn tại
    long long tonelliShanks(long long n, long long p) {
        if (n == 0) return 0;
        if (powerMod(n, (p - 1) / 2, p) != 1) return -1; // n không phải QR

        // Trường hợp đặc biệt p ≡ 3 (mod 4)
        if (p % 4 == 3) return powerMod(n, (p + 1) / 4, p);

        // Tìm Q, S sao cho p - 1 = Q * 2^S, Q lẻ
        long long Q = p - 1;
        int S = 0;
        while (Q % 2 == 0) { Q /= 2; S++; }

        // Tìm z là NQR
        long long z = 2;
        while (powerMod(z, (p - 1) / 2, p) != p - 1) z++;

        long long M = S;
        long long c = powerMod(z, Q, p);
        long long t = powerMod(n, Q, p);
        long long R = powerMod(n, (Q + 1) / 2, p);

        while (true) {
            if (t == 1) return R;
            // Tìm i nhỏ nhất sao cho t^(2^i) ≡ 1
            long long tmp = t;
            int i = 0;
            while (tmp != 1) {
                tmp = tmp * tmp % p;
                i++;
            }
            long long b = powerMod(c, 1LL << (M - i - 1), p);
            M = i;
            c = b * b % p;
            t = t * c % p;
            R = R * b % p;
        }
    }
    ```

=== "Python"

    ```python
    def tonelli_shanks(n, p):
        if n == 0:
            return 0
        if pow(n, (p - 1) // 2, p) != 1:
            return -1

        if p % 4 == 3:
            return pow(n, (p + 1) // 4, p)

        Q = p - 1
        S = 0
        while Q % 2 == 0:
            Q //= 2
            S += 1

        z = 2
        while pow(z, (p - 1) // 2, p) != p - 1:
            z += 1

        M = S
        c = pow(z, Q, p)
        t = pow(n, Q, p)
        R = pow(n, (Q + 1) // 2, p)

        while True:
            if t == 1:
                return R
            tmp = t
            i = 0
            while tmp != 1:
                tmp = tmp * tmp % p
                i += 1
            b = pow(c, 1 << (M - i - 1), p)
            M = i
            c = b * b % p
            t = t * c % p
            R = R * b % p
    ```

---

## 6. Ứng dụng

### 6.1 NTT (Number Theoretic Transform)

Căn nguyên thủy là thành phần thiết yếu của NTT (xem Bài 67).

### 6.2 Giải phương trình bậc hai

$x^2 \equiv a \pmod{p}$ → dùng Tonelli-Shanks.

### 6.3 Kiểm tra QR nhanh

Dùng Euler's criterion: $a^{(p-1)/2} \equiv 1 \pmod{p}$ → QR.

---

## 7. Bài tập luyện tập

### Bài 1: Tìm căn nguyên thủy

**Đề bài:** Cho số nguyên tố $p$. Tìm căn nguyên thủy nhỏ nhất modulo $p$.

**Input:** Số nguyên tố $p$ $(2 \leq p \leq 10^9)$

**Output:** Căn nguyên thủy nhỏ nhất.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `7` | `3` |
| `13` | `2` |

**Giải thích (test 1):** $3^1=3, 3^2=2, 3^3=6, 3^4=4, 3^5=5, 3^6=1 \pmod{7}$. Bậc = 6 = $p-1$.

??? tip "Lời giải"
    Phân tích $p-1$, duyệt $g$ từ 2, kiểm tra $g^{(p-1)/q} \not\equiv 1$ với mọi ước nguyên tố $q$ của $p-1$.
    
    === "C++"
    
        ```cpp
        #include <bits/stdc++.h>
        using namespace std;
    
        long long powerMod(long long a, long long b, long long p) {
            long long res = 1; a %= p;
            while (b > 0) {
                if (b & 1) res = res * a % p;
                a = a * a % p; b >>= 1;
            }
            return res;
        }
    
        int main() {
            long long p; cin >> p;
            long long phi = p - 1;
            vector<long long> factors;
            long long n = phi;
            for (long long i = 2; i * i <= n; i++) {
                if (n % i == 0) {
                    factors.push_back(i);
                    while (n % i == 0) n /= i;
                }
            }
            if (n > 1) factors.push_back(n);
    
            for (long long g = 2; g <= p; g++) {
                bool ok = true;
                for (long long q : factors) {
                    if (powerMod(g, phi / q, p) == 1) { ok = false; break; }
                }
                if (ok) { cout << g << "\n"; return 0; }
            }
        }
        ```
---

### Bài 2: Kiểm tra dấu hiệu bình phương

**Đề bài:** Cho $q$ truy vấn. Mỗi truy vấn cho $a$ và số nguyên tố lẻ $p$. Kiểm tra $a$ có phải dấu hiệu bình phương modulo $p$ không.

**Input:**
- Dòng 1: số nguyên $q$ $(1 \leq q \leq 10^5)$
- $q$ dòng: 2 số nguyên $a, p$ $(0 \leq a < p$, $p$ nguyên tố lẻ$, p \leq 10^9)$

**Output:** Với mỗi truy vấn, in `YES` nếu $a$ là QR, `NO` nếu không.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `3`<br>`2 7`<br>`3 7`<br>`4 7` | `YES`<br>`NO`<br>`YES` |

??? tip "Lời giải"
    Dùng Euler's criterion: $a^{(p-1)/2} \equiv 1 \pmod{p}$ → QR.
    
    === "C++"
    
        ```cpp
        #include <bits/stdc++.h>
        using namespace std;
    
        long long powerMod(long long a, long long b, long long p) {
            long long res = 1; a %= p;
            while (b > 0) {
                if (b & 1) res = res * a % p;
                a = a * a % p; b >>= 1;
            }
            return res;
        }
    
        int main() {
            int q; cin >> q;
            while (q--) {
                long long a, p; cin >> a >> p;
                if (a == 0) { cout << "YES\n"; continue; }
                cout << (powerMod(a, (p - 1) / 2, p) == 1 ? "YES" : "NO") << "\n";
            }
        }
        ```
---

### Bài 3: Căn bậc hai modulo

**Đề bài:** Cho $a$ và số nguyên tố lẻ $p$. Tìm $x$ sao cho $x^2 \equiv a \pmod{p}$. Nếu có nhiều nghiệm, in nghiệm nhỏ nhất.

**Input:** 2 số nguyên $a, p$ $(0 \leq a < p$, $p$ nguyên tố lẻ$, p \leq 10^9)$

**Output:** Nghiệm $x$ hoặc `-1` nếu không tồn tại.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `2 7` | `3` |
| `3 7` | `-1` |

**Giải thích (test 1):** $3^2 = 9 \equiv 2 \pmod{7}$.

??? tip "Lời giải"
    Nếu $p \equiv 3 \pmod{4}$: $x = a^{(p+1)/4} \pmod{p}$. Nếu không → Tonelli-Shanks.
    
    === "C++"
    
        ```cpp
        #include <bits/stdc++.h>
        using namespace std;
    
        long long powerMod(long long a, long long b, long long p) {
            long long res = 1; a %= p;
            while (b > 0) {
                if (b & 1) res = res * a % p;
                a = a * a % p; b >>= 1;
            }
            return res;
        }
    
        int main() {
            long long a, p; cin >> a >> p;
            if (a == 0) { cout << 0 << "\n"; return 0; }
            if (powerMod(a, (p - 1) / 2, p) != 1) { cout << -1 << "\n"; return 0; }
            if (p % 4 == 3) {
                cout << powerMod(a, (p + 1) / 4, p) << "\n";
                return 0;
            }
            // Tonelli-Shanks
            long long Q = p - 1; int S = 0;
            while (Q % 2 == 0) { Q /= 2; S++; }
            long long z = 2;
            while (powerMod(z, (p - 1) / 2, p) != p - 1) z++;
            long long M = S, c = powerMod(z, Q, p);
            long long t = powerMod(a, Q, p), R = powerMod(a, (Q + 1) / 2, p);
            while (t != 1) {
                long long tmp = t; int i = 0;
                while (tmp != 1) { tmp = tmp * tmp % p; i++; }
                long long b = powerMod(c, 1LL << (M - i - 1), p);
                M = i; c = b * b % p; t = t * c % p; R = R * b % p;
            }
            cout << min(R, p - R) << "\n";
        }
        ```