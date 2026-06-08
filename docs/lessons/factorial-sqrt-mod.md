# Giai Thừa Modulo & Căn Bậc Hai Modulo

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** CP-Algorithms

---

## Bản chất vấn đề

### Giai thừa modulo

Tính $n! \mod p$ với $p$ nguyên tố. Khi $n < p$, tính trực tiếp $O(n)$. Khi $n \ge p$, $n! \equiv 0 \pmod{p}$ vì chứa thừa số $p$. Ứng dụng: tính $\frac{n!}{k!} \mod p$.

### Căn bậc hai modulo

Tìm $x$ sao cho $x^2 \equiv n \pmod{p}$. Tương đương "căn bậc hai" trong modulo. Ứng dụng: giải phương trình bậc hai modulo, elliptic curve cryptography.

---

## 1. Giai Thừa Modulo Nguyên Tố

### Bài toán

Tính $n! \mod p$ với $p$ nguyên tố và $n$ rất lớn ($n \le 10^{18}$).

### Khi $n < p$

Tính trực tiếp: $n! = 1 \cdot 2 \cdots n \mod p$. Độ phức tạp $O(n)$.

### Khi $n \ge p$

$n! \equiv 0 \pmod{p}$ vì $n!$ chứa thừa số $p$.

Nhưng nếu cần tính $\frac{n!}{k!} \mod p$ (với $n, k < p$), dùng:

$$\frac{n!}{k!} = (k+1)(k+2) \cdots n \pmod{p}$$

### Wilson's Theorem ứng dụng

$(p-1)! \equiv -1 \pmod{p}$

Do đó: $(p-1)! = (p-1) \cdot (p-2)! \equiv -1 \pmod{p}$

$\Rightarrow (p-2)! \equiv 1 \pmod{p}$

---

## 2. Căn Bậc Hai Modulo (Tonelli-Shanks)

### Bài toán

Tìm $x$ sao cho $x^2 \equiv n \pmod{p}$, với $p$ nguyên tố lẻ.

### Điều kiện nghiệm tồn tại

Nghiệm tồn tại khi $n^{\frac{p-1}{2}} \equiv 1 \pmod{p}$ (Euler's criterion).

### Thuật toán Tonelli-Shanks

**Trường hợp đặc biệt:** $p \equiv 3 \pmod{4}$:

$$x \equiv n^{\frac{p+1}{4}} \pmod{p}$$

**Chứng minh:** $x^2 = n^{\frac{p+1}{2}} = n \cdot n^{\frac{p-1}{2}}$. Theo Euler's criterion, $n^{\frac{p-1}{2}} \equiv 1$ (vì $n$ là dư bậc 2). Do đó $x^2 \equiv n$.

**Trường hợp tổng quát ($p \equiv 1 \pmod{4}$):**

Phân tích $p - 1 = Q \cdot 2^S$ với $Q$ lẻ. Ý tưởng:

1. Tìm $z$ là **non-residue** bậc 2 ($z^{\frac{p-1}{2}} \equiv -1 \pmod{p}$).
2. Khởi tạo: $c = z^Q$, $t = n^Q$, $r = n^{(Q+1)/2}$.
3. Lặp: Nếu $t = 1$ → trả về $r$. Ngược lại, tìm mũ $i$ nhỏ nhất sao cho $t^{2^i} = 1$. Cập nhật $c, t, r$ và giảm $m$.

Mỗi lần lặp, $m$ giảm 1 nên thuật toán dừng sau tối đa $S$ bước.

### Trace chi tiết

Tìm $x$ sao cho $x^2 \equiv 2 \pmod{7}$.

$p = 7 \equiv 3 \pmod{4}$ $\Rightarrow$ $x = 2^{\frac{7+1}{4}} = 2^2 = 4$.

**Kiểm tra:** $4^2 = 16 \equiv 2 \pmod{7}$ ✓

---

## 3. Đánh giá độ phức tạp

| Thuật toán | Thời gian |
|------------|-----------|
| $n! \mod p$ (trực tiếp, $n < p$) | $O(n)$ |
| Tonelli-Shanks | $O(\log^2 p)$ |
| Căn bậc 2 khi $p \equiv 3 \pmod{4}$ | $O(\log p)$ |

---

## Code minh họa

### Tonelli-Shanks — Căn bậc hai modulo

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

    // Trả về -1 nếu không tồn tại nghiệm
    long long sqrtMod(long long n, long long p) {
        if (n == 0) return 0;
        if (power(n, (p - 1) / 2, p) != 1) return -1;
        if (p % 4 == 3) return power(n, (p + 1) / 4, p);

        // Tonelli-Shanks
        long long q = p - 1, s = 0;
        while (q % 2 == 0) { q /= 2; s++; }

        long long z = 2;
        while (power(z, (p - 1) / 2, p) != p - 1) z++;

        long long m = s, c = power(z, q, p);
        long long t = power(n, q, p);
        long long r = power(n, (q + 1) / 2, p);

        while (t != 1) {
            long long tmp = t, i = 0;
            while (tmp != 1) {
                tmp = tmp * tmp % p;
                i++;
            }
            long long b = c;
            for (long long j = 0; j < m - i - 1; j++)
                b = b * b % p;
            m = i;
            c = b * b % p;
            t = t * c % p;
            r = r * b % p;
        }

        return r;
    }

    int main() {
        long long n, p;
        cin >> n >> p;
        long long ans = sqrtMod(n, p);
        if (ans == -1) cout << "Khong ton tai\n";
        else cout << ans << "\n";
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

    def sqrt_mod(n, p):
        if n == 0:
            return 0
        if power(n, (p - 1) // 2, p) != 1:
            return -1
        if p % 4 == 3:
            return power(n, (p + 1) // 4, p)

        q, s = p - 1, 0
        while q % 2 == 0:
            q //= 2
            s += 1

        z = 2
        while power(z, (p - 1) // 2, p) != p - 1:
            z += 1

        m, c = s, power(z, q, p)
        t, r = power(n, q, p), power(n, (q + 1) // 2, p)

        while t != 1:
            tmp, i = t, 0
            while tmp != 1:
                tmp = tmp * tmp % p
                i += 1
            b = c
            for _ in range(m - i - 1):
                b = b * b % p
            m = i
            c = b * b % p
            t = t * c % p
            r = r * b % p

        return r

    n, p = map(int, input().split())
    ans = sqrt_mod(n, p)
    print(ans if ans != -1 else "Khong ton tai")
    ```
