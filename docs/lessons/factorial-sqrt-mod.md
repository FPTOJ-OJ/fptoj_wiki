# Giai Thừa Modulo & Căn Bậc Hai Modulo

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** CP-Algorithms

---

## Bản chất vấn đề

### Bài toán động lực: vì sao cần học bài này?

Bạn gặp 2 kiểu bài rất hay ra thi:

1. **"Tính $n! \bmod p$ với $n$ tới $10^{18}$, $p$ nguyên tố nhỏ (vd $p=10^9+7$)."** Tính trực tiếp $1 \cdot 2 \cdots n$ là không thể — vừa quá lâu, vừa chắc chắn chứa thừa số $p$ (kết quả $=0$). Nhưng bài toán con $\frac{n!}{k!} \bmod p$ hay $n!$ với $n$ gần $p$ (vd $(p-2)!$) lại tính nhanh được nhờ định lý Wilson — đó là nửa đầu bài này.
2. **"Giải $x^2 \equiv n \pmod{p}$ (vd $x^2 \equiv 5 \pmod{41}$)."** Thử từng $x$ từ $0$ tới $p-1$ tốn $O(p)$ — quá chậm với $p \approx 10^9$. Tonelli-Shanks giải trong $O(\log^2 p)$ — đó là nửa sau bài này. Ứng dụng thật: giải phương trình bậc hai modulo, mật mã đường cong elliptic.

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

**Giải thích từng thành phần:** với $p$ nguyên tố lẻ và $n$ không chia hết cho $p$, lũy thừa $n^{(p-1)/2} \bmod p$ chỉ có thể bằng $1$ hoặc $p-1$ ($\equiv -1$). Bằng $1$ nghĩa là $n$ là **dư bậc hai** (tồn tại $x$ sao cho $x^2 \equiv n$) — ví dụ $2^{(7-1)/2}=2^3=8\equiv 1 \pmod{7}$ nên $x^2\equiv 2 \pmod{7}$ có nghiệm ($x=3,4$). Bằng $-1$ nghĩa là $n$ là **non-residue** (vô nghiệm) — không cần chạy Tonelli-Shanks nữa, trả về $-1$ ngay. Đây chính là dòng `if (power(n, (p-1)/2, p) != 1) return -1;` trong code. Trường hợp $n=0$ xử lý riêng (nghiệm $x=0$).

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

**Giải thích từng biến (ánh xạ với code):**

- **$Q, S$** (`q, s` trong code): tách hết thừa số $2$ ra khỏi $p-1$. $Q$ là phần lẻ, $S$ là số lần chia được cho $2$. Ví dụ $p=41$: $40 = 5 \cdot 2^3$ nên $Q=5, S=3$. $S$ càng lớn thì vòng lặp càng nhiều bước.
- **$z$** (non-residue): "chìa khóa" sinh ra phần tử có bậc đúng $2^S$. Tìm bằng cách thử $z=2,3,\dots$ cho tới khi $z^{(p-1)/2}\equiv -1$. Tồn tại vì đúng một nửa số trong $[1,p-1]$ là non-residue.
- **$c = z^Q$**: phần tử có bậc $2^S$, dùng để "sửa" $r$ từng bước (mỗi lần bình phương $c$ thì bậc giảm một nửa).
- **$t = n^Q$**: "thước đo sai số" — $t=1$ nghĩa là $r$ hiện tại đã là nghiệm đúng. Còn $t \ne 1$ thì cần tiếp tục sửa.
- **$r = n^{(Q+1)/2}$**: nghiệm **xấp xỉ ban đầu** (đúng trong trường hợp $S=1$, tức $p \equiv 3 \pmod{4}$).
- **$m$** (khởi tạo $m=S$): chặn trên của bậc của $t$. Mỗi vòng lặp tìm $i$ (bậc thực của $t$) rồi đặt $m \leftarrow i$ nên $m$ giảm dần → đảm bảo dừng.
- **$b = c^{2^{(m-i-1)}}$**: "miếng vá" có bậc đúng $2^{i+1}$; nhân vào $r$ ($r \leftarrow r \cdot b$) và $t$ ($t \leftarrow t \cdot b^2$) để đưa $t$ về bậc thấp hơn.

### Trace chi tiết

#### Ví dụ 1: $p \equiv 3 \pmod{4}$ (trường hợp đơn giản)

Tìm $x$ sao cho $x^2 \equiv 2 \pmod{7}$.

$p = 7 \equiv 3 \pmod{4}$ $\Rightarrow$ $x = 2^{\frac{7+1}{4}} = 2^2 = 4$.

**Kiểm tra:** $4^2 = 16 \equiv 2 \pmod{7}$ ✓

#### Ví dụ 2: $p \equiv 1 \pmod{4}$ (Tonelli-Shanks đầy đủ)

Tìm $x$ sao cho $x^2 \equiv 5 \pmod{41}$ ($p = 41$).

**Bước 1:** Phân tích $p - 1 = 40 = 5 \cdot 2^3$. Vậy $Q = 5$, $S = 3$.

**Bước 2:** Tìm $z$ là non-residue: $z = 2$ (vì $2^{20} \equiv -1 \pmod{41}$).

**Bước 3:** Khởi tạo:

| Biến | Giá trị | Công thức |
|------|---------|-----------|
| $m$ | 3 | $m = S$ |
| $c$ | $2^5 = 32$ | $c = z^Q$ |
| $t$ | $5^5 = 3125 \equiv 9 \pmod{41}$ | $t = n^Q$ |
| $r$ | $5^{(5+1)/2} = 5^3 = 125 \equiv 2 \pmod{41}$ | $r = n^{(Q+1)/2}$ |

**Bước 4:** Vòng lặp:

| Vòng | $t$ | $i$ (số mũ) | $m$ | $c$ | $r$ |
|------|-----|-------------|-----|-----|-----|
| 1 | $9$ | $2$ (vì $9^2=81\equiv -1$, $(-1)^2=1$) | $2$ | $32^2=1024\equiv 40$ | $2 \cdot 32 = 64 \equiv 23$ |
| 2 | $9 \cdot 40 = 360 \equiv 32$ | $1$ (vì $32^2=1024\equiv 40$, $40^2=1600\equiv 1$) | $1$ | $40^2=1600\equiv 1$ | $23 \cdot 40 = 920 \equiv 18$ |
| 3 | $32 \cdot 1 = 32$ | $1$ | $1$ | — | — |

Sau vòng 3, $t = 1$ → dừng. Kết quả $x = r = 18$.

**Kiểm tra:** $18^2 = 324 \equiv 5 \pmod{41}$ ✓. Nghiệm còn lại: $41 - 18 = 23$.

### Giai thừa modulo: mở rộng

#### Định lý Wilson tổng quát (cho tích dạng $(p-1)! \mod p$)

$(p-1)! \equiv -1 \pmod{p}$ với $p$ nguyên tố. Hệ quả:

$$(p-2)! \equiv 1 \pmod{p}$$
$$(p-3)! \equiv -2^{-1} \pmod{p}$$
$$(p-4)! \equiv 6^{-1} \pmod{p}$$

Ứng dụng: tính nhanh giai thừa với modulo gần $p$ mà không cần duyệt từ $1$ đến $n$.

#### Tích đoạn liên tiếp

Tính $\prod_{i=L}^{R} i \bmod p$ với $L, R < p$:

1. Nếu $L > R$: tích bằng 1.
2. Nếu $R - L < 10^6$: duyệt trực tiếp.
3. Nếu đoạn dài và $L$ nhỏ: dùng $R! \cdot (L-1)!^{-1} \pmod{p}$ (nếu $R < p$).

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

    // Lũy thừa modular nhanh: tính a^b % p trong O(log b)
    long long power(long long a, long long b, long long p) {
        long long res = 1;
        a %= p;                              // Đưa a về [0, p-1]
        while (b > 0) {
            if (b & 1) res = res * a % p;    // Nếu bit cuối của b là 1, nhân res với a
            a = a * a % p;                    // Bình phương a
            b >>= 1;                          // Dịch phải b: chia đôi
        }
        return res;
    }

    // Tìm căn bậc hai modulo p: x^2 ≡ n (mod p)
    // Trả về -1 nếu không tồn tại nghiệm
    long long sqrtMod(long long n, long long p) {
        if (n == 0) return 0;                // n = 0 → nghiệm duy nhất x = 0
        if (power(n, (p - 1) / 2, p) != 1) return -1; // Euler criterion: kiểm tra tồn tại nghiệm

        // Trường hợp đặc biệt p ≡ 3 (mod 4): nghiệm đơn giản x = n^((p+1)/4)
        if (p % 4 == 3) return power(n, (p + 1) / 4, p);

        // --- Tonelli-Shanks cho p ≡ 1 (mod 4) ---
        // Bước 1: Phân tích p-1 = Q * 2^S, Q lẻ
        long long q = p - 1, s = 0;
        while (q % 2 == 0) { q /= 2; s++; }

        // Bước 2: Tìm z là non-residue bậc 2 (z^((p-1)/2) ≡ -1 mod p)
        long long z = 2;
        while (power(z, (p - 1) / 2, p) != p - 1) z++;

        // Bước 3: Khởi tạo các biến
        long long m = s, c = power(z, q, p);   // c = z^Q
        long long t = power(n, q, p);           // t = n^Q
        long long r = power(n, (q + 1) / 2, p); // r = n^((Q+1)/2) — xấp xỉ nghiệm

        // Bước 4: Vòng lặp chính — giảm m cho đến khi t = 1
        while (t != 1) {
            // Tìm số mũ i nhỏ nhất sao cho t^(2^i) ≡ 1 (mod p)
            long long tmp = t, i = 0;
            while (tmp != 1) {
                tmp = tmp * tmp % p;
                i++;
            }
            // Cập nhật b = c^(2^(m-i-1))
            long long b = c;
            for (long long j = 0; j < m - i - 1; j++)
                b = b * b % p;
            m = i;                              // Giảm m
            c = b * b % p;                      // c mới = b^2
            t = t * c % p;                      // t mới = t * c
            r = r * b % p;                      // r mới = r * b
        }

        return r;                               // Căn bậc hai modulo p
    }

    int main() {
        long long n, p;
        cin >> n >> p;                          // Đọc n và modulo p (nguyên tố)
        long long ans = sqrtMod(n, p);
        if (ans == -1) cout << "Khong ton tai\n";  // Không có căn bậc hai
        else cout << ans << "\n";                   // In nghiệm
        return 0;
    }
    ```

=== "Python"

    ```python
    # Lũy thừa modular nhanh: tính a^b % p trong O(log b)
    def power(a, b, p):
        res = 1
        a %= p                         # Đưa a về [0, p-1]
        while b > 0:
            if b & 1:                  # Bit cuối của b là 1
                res = res * a % p
            a = a * a % p               # Bình phương a
            b >>= 1                     # Dịch phải b: chia đôi
        return res

    # Tìm căn bậc hai modulo p: x^2 ≡ n (mod p)
    # Trả về -1 nếu không tồn tại nghiệm
    def sqrt_mod(n, p):
        if n == 0:                     # Trường hợp đặc biệt n = 0
            return 0
        if power(n, (p - 1) // 2, p) != 1:  # Euler criterion: kiểm tra tồn tại nghiệm
            return -1
        if p % 4 == 3:                 # p ≡ 3 (mod 4): công thức đơn giản
            return power(n, (p + 1) // 4, p)

        # --- Tonelli-Shanks cho p ≡ 1 (mod 4) ---
        q, s = p - 1, 0                # Phân tích p-1 = Q * 2^S, Q lẻ
        while q % 2 == 0:
            q //= 2
            s += 1

        z = 2                          # Tìm non-residue bậc 2
        while power(z, (p - 1) // 2, p) != p - 1:
            z += 1

        m, c = s, power(z, q, p)       # c = z^Q
        t, r = power(n, q, p), power(n, (q + 1) // 2, p)  # t = n^Q, r = n^((Q+1)/2)

        while t != 1:                  # Vòng lặp chính
            tmp, i = t, 0
            while tmp != 1:            # Tìm i nhỏ nhất: t^(2^i) ≡ 1
                tmp = tmp * tmp % p
                i += 1
            b = c
            for _ in range(m - i - 1): # b = c^(2^(m-i-1))
                b = b * b % p
            m = i                      # Giảm m
            c = b * b % p              # c mới = b^2
            t = t * c % p              # t mới = t * c
            r = r * b % p              # r mới = r * b

        return r                       # Căn bậc hai modulo p

    n, p = map(int, input().split())
    ans = sqrt_mod(n, p)
    print(ans if ans != -1 else "Khong ton tai")
    ```

---

## 4. Lỗi thường gặp (SAI / ĐÚNG)

### SAI 1: $n \ge p$ vẫn đi tính vòng lặp → TLE / sai

```python
# SAI: n = 10**18, p = 7 → lặp 10**18 lần, treo máy
res = 1
for i in range(1, n + 1):
    res = res * i % p
```

```python
# ĐÚNG: n! chứa thừa số p nên bằng 0 ngay
if n >= p:
    return 0
```

### SAI 2: Quên check Euler criterion → lặp vô hạn / trả nghiệm rác

```python
# SAI: bỏ qua kiểm tra, Tonelli-Shanks với n là non-residue không bao giờ cho t = 1
def sqrt_mod(n, p):
    ...  # chạy thẳng vào vòng while t != 1
```

```python
# ĐÚNG: kiểm tra trước, vô nghiệm thì trả -1 ngay
if power(n, (p - 1) // 2, p) != 1:
    return -1
```

### SAI 3: Chỉ in một nghiệm, quên nghiệm kép $p - r$

```python
# SAI: chỉ in r
print(r)
```

```python
# ĐÚNG: nếu r != 0 thì nghiệm còn lại là p - r (vd r=18, p=41 → 23)
print(r, p - r)
```

### SAI 4: Tràn số với `res * a` trong C++ khi $p \approx 10^9$

```cpp
// SAI: res * a có thể tới ~10^18, vẫn vừa long long nhưng
// nếu dùng int 32-bit thì tràn → sai
int res = res * a % p;
```

```cpp
// ĐÚNG: luôn dùng long long cho res, a, p
long long res = res * a % p;
```

---

## 5. Bài tập luyện tập

| Mã bài | Tên bài tập | Độ khó | Kiểu bài tập (Bản chất) | Bài học lý thuyết |
| :--- | :--- | :---: | :--- | :--- |
| `fsm-fact-basic` | [Giai thừa modulo cơ bản](https://fptoj.com/problem/fsm-fact-basic) | ⭐ | $n! \bmod p$ với $n < p$ | [Giai Thừa & Căn Bậc Hai Modulo](factorial-sqrt-mod.md) |
| `fsm-fact-zero` | [Giai thừa và số 0 modulo](https://fptoj.com/problem/fsm-fact-zero) | ⭐ | $n! \equiv 0 \pmod{p}$ khi $n \ge p$ | [Giai Thừa & Căn Bậc Hai Modulo](factorial-sqrt-mod.md) |
| `fsm-fact-range` | [Tích đoạn modulo](https://fptoj.com/problem/fsm-fact-range) | ⭐ | $\prod_{i=L}^R i \bmod p$ | [Giai Thừa & Căn Bậc Hai Modulo](factorial-sqrt-mod.md) |
| `fsm-sqrt-easy` | [Căn bậc hai modulo (p ≡ 3 mod 4)](https://fptoj.com/problem/fsm-sqrt-easy) | ⭐⭐ | $x \equiv n^{(p+1)/4} \pmod{p}$ | [Giai Thừa & Căn Bậc Hai Modulo](factorial-sqrt-mod.md) |
| `fsm-sqrt-check` | [Kiểm tra căn bậc hai modulo](https://fptoj.com/problem/fsm-sqrt-check) | ⭐ | $x^2 \equiv n \pmod{p}$ | [Giai Thừa & Căn Bậc Hai Modulo](factorial-sqrt-mod.md) |
| `fsm-sqrt-ts` | [Tonelli-Shanks](https://fptoj.com/problem/fsm-sqrt-ts) | ⭐⭐⭐ | Căn bậc hai modulo tổng quát | [Giai Thừa & Căn Bậc Hai Modulo](factorial-sqrt-mod.md) |
| `fsm-sqrt-both` | [Hai căn bậc hai modulo](https://fptoj.com/problem/fsm-sqrt-both) | ⭐⭐⭐ | Cả hai nghiệm $r$ và $p-r$ | [Giai Thừa & Căn Bậc Hai Modulo](factorial-sqrt-mod.md) |
