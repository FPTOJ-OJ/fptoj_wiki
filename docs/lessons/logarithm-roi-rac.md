# Bài 65: Logarithm Rời Rạc (Baby-step Giant-step)

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** CP-Algorithms, VNOI Wiki

## 1. Bài Toán Logarithm Rời Rạc

### 1.1 Phát biểu

Cho $a, b, p$ (với $p$ nguyên tố). Tìm $x$ sao cho:

$$a^x \equiv b \pmod{p}$$

Đây là bài toán **logarithm rời rạc** (discrete logarithm).

### 1.2 Ví dụ

$2^x \equiv 8 \pmod{19}$ → $x = 3$ vì $2^3 = 8$.

$3^x \equiv 13 \pmod{17}$ → $x = 4$ vì $3^4 = 81 = 4 \times 17 + 13$.

---

## 2. Thuật toán Baby-step Giant-step

### 2.1 Ý tưởng

Viết $x = i \cdot m + j$ với $m = \lceil \sqrt{p} \rceil$, $0 \leq i, j < m$.

$$a^{im + j} \equiv b \pmod{p}$$

$$a^j \equiv b \cdot (a^{-m})^i \pmod{p}$$

**Bước 1 (Baby steps):** Tính và lưu $a^j \bmod p$ cho $j = 0, 1, \ldots, m-1$ vào hash map.

**Bước 2 (Giant steps):** Với mỗi $i = 0, 1, \ldots, m-1$, kiểm tra $b \cdot (a^{-m})^i \bmod p$ có trong hash map không. Nếu có, $x = im + j$.

### 2.2 Độ phức tạp

Thời gian: $O(\sqrt{p} \log \sqrt{p})$ (do hash map).

Bộ nhớ: $O(\sqrt{p})$.

### 2.3 Cài đặt

=== "C++"

    ```cpp
    // Tìm x sao cho a^x ≡ b (mod p), p nguyên tố
    // Trả về -1 nếu không tồn tại
    long long discreteLog(long long a, long long b, long long p) {
        a %= p; b %= p;
        if (b == 1) return 0;
        if (a == 0) return (b == 0) ? 1 : -1;

        long long m = (long long)ceil(sqrt(p));
        unordered_map<long long, long long> table;

        // Baby steps: tính a^j mod p cho j = 0..m-1
        long long val = 1;
        for (int j = 0; j < m; j++) {
            if (table.find(val) == table.end())
                table[val] = j;
            val = val * a % p;
        }

        // Tính a^(-m) mod p
        long long aInvM = powerMod(powerMod(a, m, p), p - 2, p); // Fermat

        // Giant steps
        long long gamma = b;
        for (int i = 0; i < m; i++) {
            if (table.find(gamma) != table.end()) {
                long long x = i * m + table[gamma];
                if (x > 0) return x;
            }
            gamma = gamma * aInvM % p;
        }
        return -1;
    }
    ```

=== "Python"

    ```python
    import math

    def discrete_log(a, b, p):
        a %= p
        b %= p
        if b == 1:
            return 0
        if a == 0:
            return 1 if b == 0 else -1

        m = int(math.ceil(math.sqrt(p)))
        table = {}

        # Baby steps
        val = 1
        for j in range(m):
            if val not in table:
                table[val] = j
            val = val * a % p

        # a^(-m) mod p
        a_inv_m = pow(pow(a, m, p), p - 2, p)

        # Giant steps
        gamma = b
        for i in range(m):
            if gamma in table:
                x = i * m + table[gamma]
                if x > 0:
                    return x
            gamma = gamma * a_inv_m % p
        return -1
    ```

---

## 3. Trường hợp đặc biệt

### 3.1 $b = 1$

$a^x \equiv 1 \pmod{p}$ → $x$ là bội của bậc của $a$ modulo $p$. Luôn có nghiệm $x = 0$ (hoặc $x = \text{ord}(a)$).

### 3.2 $a = 0$

$0^x \equiv b \pmod{p}$:
- $x = 0$: $0^0 = 1$
- $x > 0$: $0^x = 0$

### 3.3 $\gcd(a, p) > 1$

Nếu $p$ không nguyên tố, cần xử lý đặc biệt. Trong thi đấu, thường $p$ là nguyên tố.

---

## 4. Ứng dụng

### 4.1 Tìm bậc của phần tử

Bậc của $a$ modulo $p$ (ký hiệu $\text{ord}(a)$) là số nguyên dương nhỏ nhất $d$ sao cho $a^d \equiv 1 \pmod{p}$.

$\text{ord}(a)$ luôn là ước của $\phi(p) = p - 1$ (với $p$ nguyên tố).

Tìm bằng cách: phân tích $p - 1$ thành thừa số, kiểm tra từng ước.

=== "C++"

    ```cpp
    long long orderOfElement(long long a, long long p) {
        long long phiP = p - 1; // p nguyên tố
        vector<long long> divisors;
        for (long long d = 1; d * d <= phiP; d++) {
            if (phiP % d == 0) {
                divisors.push_back(d);
                if (d != phiP / d) divisors.push_back(phiP / d);
            }
        }
        sort(divisors.begin(), divisors.end());
        for (long long d : divisors) {
            if (powerMod(a, d, p) == 1) return d;
        }
        return phiP;
    }
    ```

### 4.2 Giải phương trình mũ

$a^x \equiv b \pmod{p}$ → dùng BSGS trực tiếp.

---

## 5. Mở rộng: $p$ không nguyên tố

Khi $p$ không nguyên tố, dùng Pollard's Rho để phân tích $p$, rồi áp dụng Pohlig-Hellman algorithm. Tuy nhiên, trong thi đấu CP, thường chỉ cần BSGS với $p$ nguyên tố.

---

## 6. Bài tập luyện tập

### Bài 1: Discrete Logarithm cơ bản

**Đề bài:** Cho $a, b, p$ (với $p$ nguyên tố). Tìm số nguyên không âm $x$ nhỏ nhất sao cho $a^x \equiv b \pmod{p}$. Nếu không tồn tại, in `-1`.

**Input:** 3 số nguyên $a, b, p$ $(2 \leq p \leq 10^9+7$, $p$ nguyên tố, $0 \leq a, b < p)$

**Output:** Giá trị $x$ hoặc `-1`.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `2 8 19` | `3` |
| `3 13 17` | `4` |
| `2 7 13` | `11` |

??? tip "Lời giải"
    Dùng Baby-step Giant-step. Viết $x = im + j$ với $m = \lceil\sqrt{p}\rceil$.
    
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
    
        long long discreteLog(long long a, long long b, long long p) {
            a %= p; b %= p;
            if (b == 1) return 0;
            if (a == 0) return (b == 0) ? 1 : -1;
            long long m = (long long)ceil(sqrt(p));
            unordered_map<long long, long long> table;
            long long val = 1;
            for (int j = 0; j < m; j++) {
                if (!table.count(val)) table[val] = j;
                val = val * a % p;
            }
            long long aInvM = powerMod(powerMod(a, m, p), p - 2, p);
            long long gamma = b;
            for (int i = 0; i < m; i++) {
                if (table.count(gamma)) {
                    long long x = i * m + table[gamma];
                    if (x > 0) return x;
                }
                gamma = gamma * aInvM % p;
            }
            return -1;
        }
    
        int main() {
            long long a, b, p;
            cin >> a >> b >> p;
            cout << discreteLog(a, b, p) << "\n";
        }
        ```
---

### Bài 2: Tìm bậc của phần tử

**Đề bài:** Cho số nguyên tố $p$ và số nguyên $a$. Tìm bậc (order) của $a$ modulo $p$, tức số nguyên dương nhỏ nhất $d$ sao cho $a^d \equiv 1 \pmod{p}$.

**Input:** 2 số nguyên $a, p$ $(2 \leq p \leq 10^9, 1 \leq a < p$, $p$ nguyên tố$)$

**Output:** Bậc của $a$ modulo $p$.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `3 7` | `6` |
| `2 7` | `3` |

**Giải thích (test 2):** $2^1=2, 2^2=4, 2^3=8\equiv 1 \pmod{7}$. Bậc = 3.

??? tip "Lời giải"
    Phân tích $p-1$, duyệt tất cả ước của $p-1$, tìm ước nhỏ nhất $d$ sao cho $a^d \equiv 1$.
    
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
            long long phi = p - 1;
            vector<long long> divs;
            for (long long d = 1; d * d <= phi; d++) {
                if (phi % d == 0) {
                    divs.push_back(d);
                    if (d != phi / d) divs.push_back(phi / d);
                }
            }
            sort(divs.begin(), divs.end());
            for (long long d : divs) {
                if (powerMod(a, d, p) == 1) {
                    cout << d << "\n";
                    return 0;
                }
            }
        }
        ```
---

### Bài 3: Giải phương trình mũ

**Đề bài:** Cho $a, b, p$ ($p$ nguyên tố). Tìm $x$ nhỏ nhất sao cho $a^x \equiv b \pmod{p}$.

**Input:** 3 số nguyên $a, b, p$ $(2 \leq p \leq 10^6$, $p$ nguyên tố$)$

**Output:** $x$ hoặc `-1`.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `2 1 7` | `3` |
| `5 3 7` | `3` |

**Giải thích (test 1):** $2^3 = 8 \equiv 1 \pmod{7}$.

??? tip "Lời giải"
    BSGS hoặc brute force nếu $p$ nhỏ.