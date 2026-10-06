# Bài 65: Logarithm Rời Rạc (Baby-step Giant-step)

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** CP-Algorithms, VNOI Wiki

## 1. Bài Toán Logarithm Rời Rạc

### 1.1 Phát biểu

Cho $a, b, p$ (với $p$ nguyên tố). Tìm $x$ sao cho:

$$a^x \equiv b \pmod{p}$$

Đây là bài toán **logarithm rời rạc** (discrete logarithm) — một trong những bài toán nền tảng của mật mã học. Độ khó của nó đến từ việc không thể "tính ngược" hàm mũ modulo một cách hiệu quả như logarit thông thường.

### 1.2 Ví dụ

$2^x \equiv 8 \pmod{19}$ → $x = 3$ vì $2^3 = 8$.

$3^x \equiv 13 \pmod{17}$ → $x = 4$ vì $3^4 = 81 = 4 \times 17 + 13$.

$2^x \equiv 8 \pmod{11}$ → $x = 3$ vì $2^3 = 8$. Nhưng cũng có $x = 3 + 10 = 13$, $x = 3 + 20 = 23$, … vì $2^{10} \equiv 1 \pmod{11}$ (theo định lý Fermat nhỏ). Nghiệm có tính chu kỳ!

> **Nhận xét:** Với $p$ nguyên tố, nếu nghiệm tồn tại thì luôn có **vô số nghiệm** (chu kỳ $\text{ord}(a)$). Trong thuật toán BSGS, ta chỉ cần tìm nghiệm **nhỏ nhất**.

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

### 2.3 Walkthrough: Minh họa từng bước

**Ví dụ:** $2^x \equiv 22 \pmod{101}$. Ta có $p = 101$, $m = \lceil\sqrt{101}\rceil = 11$.

**Baby steps:** Tính $2^j \bmod 101$ với $j = 0, 1, \ldots, 10$:

| $j$ | $2^j \bmod 101$ | Lưu `table[value] = j` |
|:---:|:---:|:---:|
| 0 | 1 | table[1] = 0 |
| 1 | 2 | table[2] = 1 |
| 2 | 4 | table[4] = 2 |
| 3 | 8 | table[8] = 3 |
| 4 | 16 | table[16] = 4 |
| 5 | 32 | table[32] = 5 |
| 6 | 64 | table[64] = 6 |
| 7 | 27 | table[27] = 7 |
| 8 | 54 | table[54] = 8 |
| 9 | 7 | table[7] = 9 |
| 10 | 14 | table[14] = 10 |

($2^7 = 128 \equiv 27$; $2^8 = 54$; $2^9 = 108 \equiv 7$; $2^{10} = 14 \pmod{101}$ — bạn đọc nên tự nhân tay kiểm tra!)

> **Lưu ý:** Nếu cùng một giá trị $a^j$ xuất hiện nhiều lần (xảy ra khi $j$ vượt quá bậc của $a$), ta giữ chỉ số $j$ nhỏ nhất để tìm được $x$ nhỏ nhất.

**Giant steps:** Tính $a^{-m} = 2^{-11} \pmod{101}$. Theo Fermat: $2^{-11} \equiv (2^{11})^{101-2} \pmod{101}$.

$2^{11} = 2048 \equiv 28 \pmod{101}$. $28^{-1} \equiv 28^{99} \pmod{101}$.

Hoặc tính bằng Euclid mở rộng (nhanh hơn), kết quả: $2^{-11} \equiv 83 \pmod{101}$.

Bắt đầu với $\gamma = b = 22$:

| $i$ | $\gamma_i$ | Có trong table? | Ghi chú |
|:---:|:---:|:---:|:---|
| 0 | 22 | Không | $\gamma_0 = 22$ |
| 1 | $22 \times 83 \equiv 8 \pmod{101}$ | **Có!** table[8] = 3 | $x = 1 \times 11 + 3 = 14$ |

**Kết quả:** $x = 14$. Kiểm tra: $2^{14} = 16384 = 162 \times 101 + 22 \equiv 22 \pmod{101}$ ✓

??? tip "Tại sao giữ $j$ nhỏ nhất?"
    Nếu giữ $j$ lớn nhất, ta có thể tìm được $x$ lớn hơn $p-1$. Với $p$ nguyên tố, luôn có nghiệm $x < p$ (theo định lý Fermat nhỏ), nên giữ $j$ nhỏ nhất đảm bảo tìm được nghiệm tối ưu.

### 2.4 Cài đặt

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    // Lũy thừa nhanh: tính (base^exp) % mod trong O(log exp)
    long long powerMod(long long base, long long exp, long long mod) {
        long long res = 1;
        base %= mod;
        while (exp > 0) {
            if (exp & 1)  // Nếu bit thấp nhất của exp là 1
                res = (res * base) % mod;  // Nhân base vào kết quả
            base = (base * base) % mod;    // Bình phương base
            exp >>= 1;                     // Dịch phải exp (chia 2)
        }
        return res;
    }

    // Tìm x sao cho a^x ≡ b (mod p), với p nguyên tố
    // Trả về -1 nếu không tồn tại nghiệm
    long long discreteLog(long long a, long long b, long long p) {
        a %= p;  // Đưa a về modulo p
        b %= p;  // Đưa b về modulo p

        // Trường hợp đặc biệt: b = 1 → x = 0
        if (b == 1) return 0;

        // Trường hợp đặc biệt: a = 0 → chỉ có 0^1 = 0 là có nghĩa
        if (a == 0) return (b == 0) ? 1 : -1;

        // m = ceil(sqrt(p)) — chia không gian tìm kiếm
        long long m = (long long)ceil(sqrt(p));
        unordered_map<long long, long long> table;  // table[value] = j nhỏ nhất

        // === BABY STEPS: tính và lưu a^j mod p ===
        long long val = 1;  // a^0 mod p
        for (int j = 0; j < m; j++) {
            // Chỉ lưu lần đầu tiên xuất hiện để có j nhỏ nhất
            if (table.find(val) == table.end())
                table[val] = j;
            // Tính a^{j+1} = a^j * a mod p
            val = val * a % p;
        }

        // === Tính a^(-m) = (a^m)^(-1) mod p ===
        // Dùng định lý Fermat nhỏ: a^{p-1} ≡ 1 (mod p)
        // → a^{-m} = a^{m(p-2)} = (a^m)^{p-2} mod p
        long long aInvM = powerMod(powerMod(a, m, p), p - 2, p);

        // === GIANT STEPS: tìm nghiệm ===
        long long gamma = b;  // gamma_0 = b * (a^{-m})^0 = b
        for (int i = 0; i < m; i++) {
            // Kiểm tra gamma_i = b * (a^{-m})^i có trong table không
            if (table.find(gamma) != table.end()) {
                // Nếu có: a^{i*m + j} = b → x = i * m + j
                long long x = i * m + table[gamma];
                if (x > 0) return x;  // Trả về nghiệm dương nhỏ nhất
            }
            // gamma_{i+1} = gamma_i * a^{-m} mod p
            gamma = gamma * aInvM % p;
        }

        return -1;  // Không tìm thấy nghiệm
    }
    ```

=== "Python"

    ```python
    import math

    # Lũy thừa nhanh: tính (base^exp) % mod trong O(log exp)
    def power_mod(base, exp, mod):
        res = 1
        base %= mod
        while exp > 0:
            if exp & 1:           # Nếu bit thấp nhất của exp là 1
                res = (res * base) % mod  # Nhân base vào kết quả
            base = (base * base) % mod    # Bình phương base
            exp >>= 1                     # Dịch phải exp (chia 2)
        return res

    def discrete_log(a, b, p):
        a %= p   # Đưa a về modulo p
        b %= p   # Đưa b về modulo p

        # Trường hợp đặc biệt: b = 1 → x = 0
        if b == 1:
            return 0

        # Trường hợp đặc biệt: a = 0 → chỉ có 0^1 = 0 là có nghĩa
        if a == 0:
            return 1 if b == 0 else -1

        # m = ceil(sqrt(p)) — chia không gian tìm kiếm
        m = int(math.ceil(math.sqrt(p)))
        table = {}  # table[value] = j nhỏ nhất

        # === BABY STEPS: tính và lưu a^j mod p ===
        val = 1  # a^0 mod p
        for j in range(m):
            # Chỉ lưu lần đầu tiên xuất hiện để có j nhỏ nhất
            if val not in table:
                table[val] = j
            # Tính a^{j+1} = a^j * a mod p
            val = val * a % p

        # === Tính a^(-m) = (a^m)^(-1) mod p ===
        # Dùng định lý Fermat nhỏ: a^{p-1} ≡ 1 (mod p)
        a_inv_m = power_mod(power_mod(a, m, p), p - 2, p)

        # === GIANT STEPS: tìm nghiệm ===
        gamma = b  # gamma_0 = b * (a^{-m})^0 = b
        for i in range(m):
            # Kiểm tra gamma_i = b * (a^{-m})^i có trong table không
            if gamma in table:
                # Nếu có: a^{i*m + j} = b → x = i * m + j
                x = i * m + table[gamma]
                if x > 0:
                    return x  # Trả về nghiệm dương nhỏ nhất
            # gamma_{i+1} = gamma_i * a^{-m} mod p
            gamma = gamma * a_inv_m % p

        return -1  # Không tìm thấy nghiệm
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

Tìm bằng cách: phân tích $p - 1$ thành ước, kiểm tra từng ước tăng dần.

=== "C++"

    ```cpp
    // Tìm bậc của a modulo p (p nguyên tố)
    // Bậc là ước của p - 1 → chỉ cần duyệt các ước của p - 1
    long long orderOfElement(long long a, long long p) {
        long long phiP = p - 1;  // Với p nguyên tố, phi(p) = p - 1
        vector<long long> divisors;

        // Liệt kê tất cả ước của p - 1 trong O(sqrt(p))
        for (long long d = 1; d * d <= phiP; d++) {
            if (phiP % d == 0) {
                divisors.push_back(d);                 // Ước nhỏ
                if (d != phiP / d)
                    divisors.push_back(phiP / d);      // Ước lớn tương ứng
            }
        }

        // Sắp xếp tăng dần để tìm ước nhỏ nhất thỏa mãn
        sort(divisors.begin(), divisors.end());

        // Duyệt từng ước — kiểm tra xem a^d ≡ 1 (mod p) không
        for (long long d : divisors) {
            if (powerMod(a, d, p) == 1)
                return d;  // Trả về bậc nhỏ nhất
        }

        return phiP;  // Mặc định: bậc = p - 1
    }
    ```

=== "Python"

    ```python
    # Tìm bậc của a modulo p (p nguyên tố)
    # Bậc là ước của p - 1 → chỉ cần duyệt các ước của p - 1
    def order_of_element(a, p):
        phi_p = p - 1  # Với p nguyên tố, phi(p) = p - 1

        # Liệt kê tất cả ước của p - 1 trong O(sqrt(p))
        divisors = set()
        d = 1
        while d * d <= phi_p:
            if phi_p % d == 0:
                divisors.add(d)              # Ước nhỏ
                divisors.add(phi_p // d)     # Ước lớn tương ứng
            d += 1

        # Duyệt từng ước theo thứ tự tăng dần
        for d in sorted(divisors):
            if pow(a, d, p) == 1:   # Kiểm tra a^d ≡ 1 (mod p)
                return d             # Trả về bậc nhỏ nhất

        return phi_p  # Mặc định: bậc = p - 1
    ```

### 4.2 Giải phương trình mũ

$a^x \equiv b \pmod{p}$ → dùng BSGS trực tiếp.

---

## 5. Mở rộng: $p$ không nguyên tố

Khi $p$ không nguyên tố, dùng Pollard's Rho để phân tích $p$, rồi áp dụng Pohlig-Hellman algorithm. Tuy nhiên, trong thi đấu CP, thường chỉ cần BSGS với $p$ nguyên tố.

---

## 6. Lưu ý và bẫy hay gặp

### Tràn số khi nhân 2 số lớn

Khi $p$ cỡ $10^9$, phép nhân $a \times a$ có thể tràn `long long` (giới hạn $\approx 2 \times 10^{18}$):

```cpp
// SAI: a * a có thể tràn nếu a ≈ 10^9
res = (res * base) % MOD;

// ĐÚNG: Dùng __int128 (C++) hoặc nhân Ấn Độ
res = (__int128)res * base % MOD;
```

### Quên modulo khi tính $a^{-m}$

```cpp
// SAI: Tính a^m rồi nghịch đảo sai cách
long long aInv = pow(a, MOD - 2);  // Nghịch đảo của a, không phải a^m!

// ĐÚNG: Nghịch đảo của a^m, không phải của a
long long aInvM = powerMod(powerMod(a, m, MOD), MOD - 2, MOD);
```

### Không xét TH $b = 1$ và $a = 0$

```cpp
// SAI: BSGS có thể trả về nghiệm x > 0 trong khi x = 0 mới là đúng
if (b == 1) return 0;  // Luôn kiểm tra trường hợp này trước khi vào BSGS
```

### Giữ chỉ số j lớn nhất thay vì nhỏ nhất

```cpp
// SAI: Ghi đè table[val] = j cho mọi j
table[val] = j;  // Có thể trả về nghiệm lớn hơn p (ngoài chu kỳ)

// ĐÚNG: Chỉ lưu lần đầu
if (table.find(val) == table.end())
    table[val] = j;  // Luôn trả về j nhỏ nhất → nghiệm nhỏ nhất
```

### Quên $+$ MOD khi trừ trong modulo

```cpp
// SAI: (gamma - ...) % p có thể âm trong C++
long long nxt = (cur - sub) % p;

// ĐÚNG: Luôn cộng p trước khi %
long long nxt = (cur - sub % p + p) % p;
```

---

## 7. Bài tập luyện tập

| Mã bài | Tên bài tập | Độ khó | Kiểu bài tập (Bản chất) | Bài học lý thuyết |
| :--- | :--- | :---: | :--- | :--- |
| `dl-exist` | [Kiểm tra DL tồn tại](https://fptoj.com/problem/dl-exist) | ⭐⭐ | BSGS cơ bản | [Logarithm Rời Rạc](logarithm-roi-rac.md) |
| `dl-order` | [Bậc của phần tử](https://fptoj.com/problem/dl-order) | ⭐⭐ | Tìm order | [Logarithm Rời Rạc](logarithm-roi-rac.md) |
| `dl-small-p` | [DL với p nhỏ](https://fptoj.com/problem/dl-small-p) | ⭐⭐ | Precompute | [Logarithm Rời Rạc](logarithm-roi-rac.md) |
| `dl-multi` | [DL nhiều truy vấn](https://fptoj.com/problem/dl-multi) | ⭐⭐⭐ | BSGS nhiều q | [Logarithm Rời Rạc](logarithm-roi-rac.md) |
| `dl-bsgs` | [Baby-step Giant-step](https://fptoj.com/problem/dl-bsgs) | ⭐⭐⭐ | BSGS | [Logarithm Rời Rạc](logarithm-roi-rac.md) |
| `dl-log-fact` | [DL với tích](https://fptoj.com/problem/dl-log-fact) | ⭐⭐⭐ | BSGS nâng cao | [Logarithm Rời Rạc](logarithm-roi-rac.md) |
| `dl-pohlig` | [Pohlig-Hellman](https://fptoj.com/problem/dl-pohlig) | ⭐⭐⭐⭐ | DL nâng cao | [Logarithm Rời Rạc](logarithm-roi-rac.md) |