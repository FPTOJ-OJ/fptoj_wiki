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
```

### Code Python

```python
import math
g = math.gcd(12, 8)    # 4
l = math.lcm(12, 8)    # 24
```

---

## 2. Modular Inverse - Nghịch đảo modulo

### Ẩn dụ: Chia trong thế giới modulo

Trong toán học thường: `a / b = a × (1/b)`. Nhưng trong modulo, không có "chia"! Ta cần tìm số `x` sao cho `b × x ≡ 1 (mod M)` → `x` là nghịch đảo modulo của `b`.

### Cách tính

**Phương pháp 1: Lũy thừa nhị phân** (khi M là số nguyên tố)

```
a^(-1) ≡ a^(M-2) (mod M)   (theo định lý Fermat nhỏ)
```

**Phương pháp 2: Extended Euclid** (tổng quát hơn)

### Code C++

```cpp
const long long MOD = 1e9 + 7;

// Lũy thừa nhị phân
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
long long modInverse(long long a, long long mod) {
    return powerMod(a, mod - 2, mod);
}

// Phép chia modulo
long long modDivide(long long a, long long b, long long mod) {
    return (__int128)a * modInverse(b, mod) % mod;
}
```

### Code Python

```python
MOD = 10**9 + 7

# Nghịch đảo modulo (Python 3.8+)
inv = pow(5, MOD - 2, MOD)  # 5^(-1) mod MOD

# Phép chia modulo
result = (a * pow(b, MOD - 2, MOD)) % MOD
```

---

## 3. Lưu ý

- **GCD:** `__gcd(a, b)` trong C++ hoặc `math.gcd(a, b)` trong Python
- **Modular Inverse:** Chỉ áp dụng khi `gcd(a, M) = 1` (a và M nguyên tố cùng nhau)
- **Tránh tràn số:** Dùng `(__int128)` khi nhân 2 số long long rồi lấy modulo
- **Phân biệt:** `a / b % MOD` ≠ `(a % MOD) / (b % MOD)` → phải dùng modInverse!

---

---

## Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Exponentiation](https://cses.fi/problemset/task/1095) | CSES | ⭐⭐ | Power mod |
| [SPOJ - GCD](https://www.spoj.com/problems/GCD/) | SPOJ | ⭐ | GCD cơ bản |
| [CSES - Binomial Coefficients](https://cses.fi/problemset/task/1079) | CSES | ⭐⭐ | Modular inverse |

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
