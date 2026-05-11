# Bài 18: Euclid & Modular Inverse - Số Học Cơ Bản

> **Tác giả:** Hà Trí Kiên
> **Nội dung tham khảo từ:** VNOI Wiki - Thuật toán Euclid, Nghịch đảo modulo

## 1. GCD - Ước Chung Lớn Nhất

### Ẩn dụ: Chia đều kẹo

Bạn có 12 viên kẹo đỏ và 8 viên kẹo xanh. Muốn chia thành nhiều túi đều nhau, mỗi túi cùng số đỏ và xanh. Mỗi túi tối đa bao nhiêu? → GCD(12, 8) = 4!

### Thuật toán Euclid

```
GCD(a, b) = GCD(b, a % b)   nếu b > 0
GCD(a, 0) = a
```

**Tại sao hoạt động?** Nếu d là ước chung của a và b, thì d cũng là ước của a % b (vì a = q×b + r, nên r = a - q×b, mà d chia hết cả a lẫn b → d chia hết r).

### Code C++

```cpp
// GCD - O(log(min(a,b)))
long long gcd(long long a, long long b) {
    while (b) {
        a %= b;
        swap(a, b);
    }
    return a;
}

// LCM - Bội chung nhỏ nhất
long long lcm(long long a, long long b) {
    return a / gcd(a, b) * b;  // Chia trước để tránh tràn số
}

// C++ có sẵn __gcd(a, b) trong <algorithm>
// C++17 có std::gcd() và std::lcm() trong <numeric>
```

### Code Python

```python
import math
g = math.gcd(12, 8)    # 4
l = math.lcm(12, 8)    # 24
```

### Bước chạy

```
GCD(48, 18):
  48 % 18 = 12 → GCD(18, 12)
  18 % 12 = 6  → GCD(12, 6)
  12 % 6  = 0  → GCD(6, 0)
  Trả về 6 ✅

GCD(100, 35):
  100 % 35 = 30 → GCD(35, 30)
  35 % 30 = 5  → GCD(30, 5)
  30 % 5  = 0  → GCD(5, 0)
  Trả về 5 ✅
```

---

## 2. Extended Euclid - Euclid mở rộng

### Bài toán

Tìm x, y sao cho: `a × x + b × y = GCD(a, b)`

Nghiệm **luôn tồn tại** (theo định lý Bézout)!

### Tại sao quan trọng?

Extended Euclid cho ta cách tính **modular inverse** tổng quát (không cần M là số nguyên tố).

### Ý tưởng

Từ Euclid: `GCD(a, b) = GCD(b, a % b)`

Nếu đã biết `x', y'` sao cho `b × x' + (a % b) × y' = GCD(a, b)`:

```
a % b = a - (a/b) × b    (chia lấy phần nguyên)

Thay vào:
b × x' + (a - (a/b) × b) × y' = GCD
b × x' + a × y' - (a/b) × b × y' = GCD
a × y' + b × (x' - (a/b) × y') = GCD

→ x = y'
→ y = x' - (a/b) × y'
```

### Code C++

```cpp
// Extended Euclid - trả về GCD(a, b), đồng thời tìm x, y
// sao cho a*x + b*y = GCD(a, b)
long long extendedGcd(long long a, long long b, long long& x, long long& y) {
    if (b == 0) {
        x = 1;
        y = 0;
        return a;
    }
    long long x1, y1;
    long long g = extendedGcd(b, a % b, x1, y1);
    x = y1;
    y = x1 - (a / b) * y1;
    return g;
}

// Ví dụ:
// extendedGcd(35, 15, x, y) → GCD=5, x=1, y=-2
// Kiểm tra: 35×1 + 15×(-2) = 35 - 30 = 5 ✅
```

### Code Python

```python
def extended_gcd(a, b):
    if b == 0:
        return a, 1, 0
    g, x1, y1 = extended_gcd(b, a % b)
    x = y1
    y = x1 - (a // b) * y1
    return g, x, y

# Ví dụ:
g, x, y = extended_gcd(35, 15)
print(g, x, y)  # 5 1 -2
# 35*1 + 15*(-2) = 5 ✅
```

---

## 3. Modular Inverse - Nghịch đảo modulo

### Ẩn dụ: Chia trong thế giới modulo

Trong toán học thường: `a / b = a × (1/b)`. Nhưng trong modulo, không có "chia"! Ta cần tìm số `x` sao cho `b × x ≡ 1 (mod M)` → `x` là nghịch đảo modulo của `b`.

**Ví dụ:** Trong mod 7:
- 3 × 5 = 15 ≡ 1 (mod 7) → 5 là nghịch đảo của 3 (mod 7)
- Vậy `a / 3 (mod 7)` = `a × 5 (mod 7)`

### Khi nào tồn tại?

Nghịch đảo modulo của a (mod M) tồn tại khi và chỉ khi **GCD(a, M) = 1** (a và M nguyên tố cùng nhau).

### Phương pháp 1: Fermat's Little Theorem (khi M là số nguyên tố)

**Định lý Fermat nhỏ:** Nếu p là số nguyên tố và a không chia hết p, thì:

```
a^(p-1) ≡ 1 (mod p)
```

**Tại sao?** Đây là kết quả của lý thuyết nhóm: tập {1, 2, ..., p-1} tạo thành nhóm nhân modulo p. Mọi phần tử trong nhóm có bậc chia hết p-1 (theo định lý Lagrange).

Từ `a^(p-1) ≡ 1 (mod p)`, ta suy ra:

```
a^(p-1) ≡ 1 (mod p)
a × a^(p-2) ≡ 1 (mod p)
→ a^(-1) ≡ a^(p-2) (mod p)
```

**Vậy nghịch đảo modulo của a = a^(M-2) mod M** (khi M là số nguyên tố).

```
Ví dụ: Tìm 3^(-1) mod 7
3^(7-2) = 3^5 = 243
243 mod 7 = 243 - 34×7 = 243 - 238 = 5
Kiểm tra: 3 × 5 = 15 ≡ 1 (mod 7) ✅
```

### Phương pháp 2: Extended Euclid (tổng quát)

Từ `a × x + M × y = GCD(a, M) = 1`:

```
a × x + M × y = 1
a × x ≡ 1 (mod M)   (vì M × y ≡ 0 mod M)
→ x là nghịch đảo modulo của a
```

**Ưu điểm:** Hoạt động với mọi M, không cần M là số nguyên tố.

---

## 4. Code chi tiết

### Code C++

```cpp
const long long MOD = 1e9 + 7;

// Lũy thừa nhị phân - O(log b)
long long powerMod(long long a, long long b, long long mod) {
    long long result = 1;
    a %= mod;
    while (b > 0) {
        if (b & 1) result = (__int128)result * a % mod;
        a = (__int128)a * a % mod;
        b >>= 1;
    }
    return result;
}

// Nghịch đảo modulo (MOD là số nguyên tố) - O(log MOD)
// Dùng Fermat's Little Theorem: a^(-1) = a^(MOD-2) mod MOD
long long modInverse(long long a, long long mod) {
    return powerMod(a, mod - 2, mod);
}

// Nghịch đảo modulo (tổng quát, dùng Extended Euclid)
// Hoạt động với mọi mod (không cần nguyên tố)
long long modInverseExtendedGcd(long long a, long long mod) {
    long long x, y;
    long long g = extendedGcd(a, mod, x, y);
    if (g != 1) return -1;  // Không tồn tại nghịch đảo
    return (x % mod + mod) % mod;  // Đảm bảo kết quả dương
}

// Phép chia modulo: a / b mod MOD = a * b^(-1) mod MOD
long long modDivide(long long a, long long b, long long mod) {
    return (__int128)a * modInverse(b, mod) % mod;
}
```

### Code Python

```python
MOD = 10**9 + 7

# Nghịch đảo modulo (Python 3.8+)
# Dùng Fermat: a^(-1) = a^(MOD-2) mod MOD
inv = pow(5, MOD - 2, MOD)  # 5^(-1) mod MOD

# Hoặc dùng built-in (Python 3.8+)
inv = pow(5, -1, MOD)

# Phép chia modulo
result = (a * pow(b, MOD - 2, MOD)) % MOD

# Extended Euclid
def extended_gcd(a, b):
    if b == 0:
        return a, 1, 0
    g, x1, y1 = extended_gcd(b, a % b)
    return g, y1, x1 - (a // b) * y1

def mod_inverse_ext(a, mod):
    g, x, y = extended_gcd(a, mod)
    if g != 1:
        return -1
    return (x % mod + mod) % mod
```

---

## 5. Khi nào dùng Modular Inverse?

### 5.1. Tính nCk mod p (tổ hợp)

```
nCk = n! / (k! × (n-k)!)
    = n! × (k!)^(-1) × ((n-k)!)^(-1)  mod p
```

→ Cần tính nghịch đảo của k! và (n-k)!

### 5.2. Phép chia modulo

```
a / b mod p = a × b^(-1) mod p
```

**Lưu ý:** `(a / b) % p` ≠ `(a % p) / (b % p)` → Phải dùng modInverse!

### 5.3. Tính tỷ lệ / phân số modulo

Khi bài toán yêu cầu tính `(a/b) mod p`, ta chuyển thành `(a × b^(-1)) mod p`.

### 5.4. Precompute nghịch đảo giai thừa

Để tính nCk nhanh cho nhiều truy vấn, ta precompute nghịch đảo của giai thừa:

```cpp
long long fact[1000001], inv_fact[1000001];

void buildFactorial(int n) {
    fact[0] = 1;
    for (int i = 1; i <= n; i++)
        fact[i] = fact[i-1] * i % MOD;
    
    // Tính inv_fact[n] = (n!)^(-1) bằng Fermat
    inv_fact[n] = powerMod(fact[n], MOD - 2, MOD);
    
    // Tính inv_fact[i] từ inv_fact[i+1]:
    // (i!)^(-1) = ((i+1)!)^(-1) × (i+1)
    for (int i = n - 1; i >= 0; i--)
        inv_fact[i] = inv_fact[i+1] * (i+1) % MOD;
}

// C(n, k) mod MOD - O(1) sau khi preprocess
long long nCk(int n, int k) {
    if (k < 0 || k > n) return 0;
    return fact[n] % MOD * inv_fact[k] % MOD * inv_fact[n-k] % MOD;
}
```

---

## 6. Bảng nghịch đảo modulo nhỏ

```
MOD = 7:
a:     1  2  3  4  5  6
a^-1:  1  4  5  2  3  6

Kiểm tra: 2 × 4 = 8 ≡ 1 (mod 7) ✅
          3 × 5 = 15 ≡ 1 (mod 7) ✅
          6 × 6 = 36 ≡ 1 (mod 7) ✅ (nghịch đảo của 6 là chính nó!)
```

---

## 7. Lưu ý

- **GCD:** `__gcd(a, b)` trong C++ hoặc `math.gcd(a, b)` trong Python
- **Modular Inverse:** Chỉ áp dụng khi `gcd(a, M) = 1` (a và M nguyên tố cùng nhau)
- **Tránh tràn số:** Dùng `(__int128)` khi nhân 2 số long long rồi lấy modulo
- **Phân biệt:** `a / b % MOD` ≠ `(a % MOD) / (b % MOD)` → phải dùng modInverse!
- **MOD thường dùng:** 10⁹ + 7 (nguyên tố), 998244353 (nguyên tố, thường dùng cho NTT)
- **Extended Euclid** tổng quát hơn Fermat, nhưng Fermat nhanh hơn (chỉ cần lũy thừa)

---

## 8. Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Exponentiation](https://cses.fi/problemset/task/1095) | CSES | ⭐⭐ | Power mod |
| [CSES - Exponentiation II](https://cses.fi/problemset/task/1096) | CSES | ⭐⭐ | Fermat |
| [SPOJ - GCD](https://www.spoj.com/problems/GCD/) | SPOJ | ⭐ | GCD cơ bản |
| [CSES - Binomial Coefficients](https://cses.fi/problemset/task/1079) | CSES | ⭐⭐ | Modular inverse |
| [VNOJ - VPOWER](https://oj.vnoi.info/problem/vpower) | VNOJ | ⭐⭐ | Power mod |
| [VNOJ - VOMARBLE](https://oj.vnoi.info/problem/vomarble) | VNOJ | ⭐⭐⭐ | Combinatorics |
| [SPOJ - DIVSUM](https://www.spoj.com/problems/DIVSUM/) | SPOJ | ⭐⭐ | Ươc số |

## Bài viết liên quan

- [Bài 11: Lũy thừa nhị phân](11-luy-thua-nhi-phan-sang-nguyen-to.md)
- [Bài 19: Tổ hợp & Xác suất](19-to-hop-xac-suat.md)
- [Bài 26: Số học nâng cao](26-so-hoc-nang-cao.md)

## Tài liệu tham khảo

- [VNOI Wiki - Thuật toán Euclid](https://wiki.vnoi.info/algo/algebra/euclid)
- [VNOI Wiki - Nghịch đảo modulo](https://wiki.vnoi.info/algo/math/modular-inverse)
- [CP-Algorithms - Euclidean Algorithm](https://cp-algorithms.com/algebra/euclid-algorithm.html)
- [CP-Algorithms - Modular Inverse](https://cp-algorithms.com/algebra/module-inverse.html)
- [HackerEarth - Number Theory](https://www.hackerearth.com/practice/math/number-theory/basic-number-theory-1/tutorial/)

**Bài tiếp theo:** [Tổ hợp & Xác suất →](19-to-hop-xac-suat.md)
