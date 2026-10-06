# Bài 66: Căn Nguyên Thủy & Dấu Hiệu Bình Phương

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** CP-Algorithms, VNOI Wiki

## 0. Tại sao phải học?

Hai bài toán thi đấu cần gấp kiến thức này:

1. **NTT (nhân đa thức $O(n \log n)$):** cần một "đơn vị căn" modulo $p$ — chính là căn nguyên thủy của $p = 998244353$ (đáp án: $g = 3$). Không có $g$, không chạy được NTT.
2. **Giải $x^2 \equiv a \pmod{p}$:** ví dụ $x^2 \equiv 10 \pmod{13}$ có nghiệm không? Nghiệm là mấy? Thử tay $1^2..12^2$ thì được, nhưng với $p \approx 10^9$ phải có thuật toán — đó là Tonelli-Shanks ở §5.

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

**Vì sao chỉ cần kiểm tra $k$ phép thay vì $p-1$ phép?** Bậc của $g$ (số mũ nhỏ nhất để $g^d \equiv 1$) luôn là **ước** của $p-1$. Nếu bậc $< p-1$, nó phải "rơi" vào một ước thực sự lớn nhất, tức $(p-1)/q_i$ với $q_i$ là một thừa số nguyên tố của $p-1$. Ví dụ $p = 7$: $p-1 = 6 = 2 \cdot 3$. Thay vì thử $3^1, \dots, 3^6$, chỉ cần kiểm tra $3^{6/2} = 3^3 = 27 \equiv 6 \ne 1$ và $3^{6/3} = 3^2 = 9 \equiv 2 \ne 1$ → bậc của 3 không thể nhỏ hơn 6 → bậc đúng bằng 6 → 3 là căn nguyên thủy. Chỉ 2 phép lũy thừa thay vì 6!

### 2.2 Cài đặt

=== "C++"

    ```cpp
    long long modPow(long long a, long long e, long long mod) {
        long long r = 1;
        while (e) {
            if (e & 1) r = r * a % mod;
            a = a * a % mod;
            e >>= 1;
        }
        return r;
    }

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
                if (modPow(g, phi / q, p) == 1) {
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
    long long modPow(long long a, long long e, long long mod) {
        long long r = 1;
        while (e) {
            if (e & 1) r = r * a % mod;
            a = a * a % mod;
            e >>= 1;
        }
        return r;
    }

    int legendre(long long a, long long p) {
        long long result = modPow(a, (p - 1) / 2, p);
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

**Trace tay:** Giải $x^2 \equiv 10 \pmod{13}$. $p = 13 \equiv 1 \pmod{4}$ nên phải dùng Tonelli-Shanks.

- Tách $p - 1 = 12 = 3 \cdot 2^2$ → $Q = 3$, $S = 2$.
- Tìm $z$ là NQR: thử $z = 2$: $2^6 = 64 \equiv 12 \equiv -1 \pmod{13}$ ✓ (dùng Euler criterion).
- Khởi tạo: $M = 2$; $c = 2^3 = 8$; $t = 10^3 = 1000 \equiv 12$; $R = 10^2 = 100 \equiv 9$ (vì $(Q+1)/2 = 2$).
- Vòng 1: $t = 12 \ne 1$. Bình phương $t$: $12^2 = 144 \equiv 1$ → chỉ cần $i = 1$ bước. $b = c^{2^{M-i-1}} = 8^{2^0} = 8$. Cập nhật: $M = 1$; $c = 8^2 = 64 \equiv 12$; $t = 12 \cdot 12 = 144 \equiv 1$; $R = 9 \cdot 8 = 72 \equiv 7$.
- Vòng 2: $t = 1$ → trả về $R = 7$. Kiểm tra: $7^2 = 49 = 39 + 10 \equiv 10 \pmod{13}$ ✓ (nghiệm còn lại là $13 - 7 = 6\)).

Ý tưởng mỗi vòng lặp: $t$ đo "khoảng cách" tới đáp án ($t = 1$ nghĩa là $R^2 \equiv n$); nhân $R$ với $b$ (căn bậc 2 của đơn vị) để kéo $t$ về 1 mà không phá vỡ bất biến $R^2 \equiv n \cdot t$.

=== "C++"

    ```cpp
    long long modPow(long long a, long long e, long long mod) {
        long long r = 1;
        while (e) {
            if (e & 1) r = r * a % mod;
            a = a * a % mod;
            e >>= 1;
        }
        return r;
    }

    // Tìm x sao cho x^2 ≡ n (mod p), p nguyên tố lẻ
    // Trả về -1 nếu không tồn tại
    long long tonelliShanks(long long n, long long p) {
        if (n == 0) return 0;
        if (modPow(n, (p - 1) / 2, p) != 1) return -1; // n không phải QR

        // Trường hợp đặc biệt p ≡ 3 (mod 4)
        if (p % 4 == 3) return modPow(n, (p + 1) / 4, p);

        // Tìm Q, S sao cho p - 1 = Q * 2^S, Q lẻ
        long long Q = p - 1;
        int S = 0;
        while (Q % 2 == 0) { Q /= 2; S++; }

        // Tìm z là NQR
        long long z = 2;
        while (modPow(z, (p - 1) / 2, p) != p - 1) z++;

        long long M = S;
        long long c = modPow(z, Q, p);
        long long t = modPow(n, Q, p);
        long long R = modPow(n, (Q + 1) / 2, p);

        while (true) {
            if (t == 1) return R;
            // Tìm i nhỏ nhất sao cho t^(2^i) ≡ 1
            long long tmp = t;
            int i = 0;
            while (tmp != 1) {
                tmp = tmp * tmp % p;
                i++;
            }
            long long b = modPow(c, 1LL << (M - i - 1), p);
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

## 7. Lỗi thường gặp

```cpp
// SAI: modPow tràn khi p lớn (a*a vượt long long nếu p ~ 1e18)
long long r = r * a % mod;

// ĐÚNG: dùng __int128 cho p lớn
long long r = (__int128)r * a % mod;
```

- **Quên kiểm tra QR trước Tonelli:** nếu $n$ không phải QR mà cứ chạy vòng lặp, code treo vô hạn (vì $t$ không bao giờ về 1). Luôn kiểm tra `pow(n, (p-1)/2) == 1` trước.
- **$p = 2$:** mọi số lẻ đều $\equiv 1 \equiv 1^2$ — xử lý riêng, đừng chạy thuật toán tổng quát.
- **Nhầm lẫn 2 nghiệm:** Tonelli trả về 1 nghiệm $R$; nghiệm còn lại là $p - R$. Bài hỏi "liệt kê" mà chỉ in 1 nghiệm sẽ WA.
- **Euler criterion với $p$ hợp số:** $a^{(p-1)/2} \equiv 1$ không đảm bảo $p$ nguyên tố (số Carmichael) — đừng dùng làm test nguyên tố.

---

## 7. Bài tập luyện tập

| Mã bài | Tên bài tập | Độ khó | Kiểu bài tập (Bản chất) | Bài học lý thuyết |
| :--- | :--- | :---: | :--- | :--- |
| `pr-legendre` | [Legendre symbol](https://fptoj.com/problem/pr-legendre) | ⭐ | Kiểm tra QR | [Căn Nguyên Thủy](can-nguyen-thuy.md) |
| `pr-count` | [Đếm căn nguyên thủy](https://fptoj.com/problem/pr-count) | ⭐⭐ | $\varphi(p-1)$ | [Căn Nguyên Thủy](can-nguyen-thuy.md) |
| `pr-all` | [Liệt kê căn nguyên thủy](https://fptoj.com/problem/pr-all) | ⭐⭐ | In tất cả primitive root | [Căn Nguyên Thủy](can-nguyen-thuy.md) |
| `pr-qr-check` | [QR check nhiều truy vấn](https://fptoj.com/problem/pr-qr-check) | ⭐⭐ | Euler criterion | [Căn Nguyên Thủy](can-nguyen-thuy.md) |
| `pr-basic` | [Căn nguyên thủy](https://fptoj.com/problem/pr-basic) | ⭐⭐⭐ | Tìm primitive root | [Căn Nguyên Thủy](can-nguyen-thuy.md) |
| `pr-sqrt` | [Căn bậc hai modulo](https://fptoj.com/problem/pr-sqrt) | ⭐⭐⭐ | Tonelli-Shanks | [Căn Nguyên Thủy](can-nguyen-thuy.md) |