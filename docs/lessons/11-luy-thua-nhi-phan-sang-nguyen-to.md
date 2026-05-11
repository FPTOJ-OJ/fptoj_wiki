# Bài 11: Lũy Thừa Nhị Phân & Sàng Nguyên Tố

> **Tác giả:** Hà Trí Kiên
> **Nội dung tham khảo từ:** VNOI Wiki - Lũy thừa nhị phân, Sàng nguyên tố

## 1. Lũy thừa nhị phân (Binary Exponentiation)

### Ẩn dụ: Nhân đôi tiền tiết kiệm

Muốn tính 3¹⁰. Thay vì nhân 3 mười lần, ta "nhân đôi":
- 3¹ = 3
- 3² = 3 × 3 = 9
- 3⁴ = 9 × 9 = 81
- 3⁸ = 81 × 81 = 6561

10 = 8 + 2 → 3¹⁰ = 3⁸ × 3² = 6561 × 9 = 59049

Chỉ cần **4 phép nhân** thay vì 10!

### Công thức

```
a^b = (a^(b/2))²       nếu b chẵn
a^b = (a^(b/2))² × a   nếu b lẻ
```

### Code C++

```cpp
// Tính a^b - O(log b)
long long power(long long a, long long b) {
    long long result = 1;
    while (b > 0) {
        if (b % 2 == 1)        // Nếu b lẻ
            result *= a;        // Nhân thêm a
        a *= a;                 // Nhân đôi a
        b /= 2;                // Chia đôi b
    }
    return result;
}

// Tính a^b % MOD - O(log b) - DÙNG NHIỀU NHẤT!
long long powerMod(long long a, long long b, long long MOD) {
    long long result = 1;
    a %= MOD;
    while (b > 0) {
        if (b % 2 == 1)
            result = (result * a) % MOD;
        a = (a * a) % MOD;
        b /= 2;
    }
    return result;
}
```

### Code Python

```python
# Python có sẵn hàm pow(a, b, mod) - rất nhanh!
result = pow(2, 100, 10**9 + 7)  # 2^100 mod (10^9+7)

# Tự cài đặt
def power_mod(a, b, mod):
    result = 1
    a %= mod
    while b > 0:
        if b % 2 == 1:
            result = (result * a) % mod
        a = (a * a) % mod
        b //= 2
    return result
```

---

## 2. Sàng nguyên tố Eratosthenes

### Ẩn dụ: Loại người gian lận

Bạn có 100 người xếp hàng. Bắt đầu từ người số 2: đánh dấu tất cả bội số của 2 (4, 6, 8, ...). Tiếp theo người số 3 chưa bị đánh dấu → đánh dấu bội số của 3 (6, 9, 12, ...). Tiếp tục... Ai không bị đánh dấu → là số nguyên tố!

### Code C++

```cpp
// Sàng Eratosthenes - O(N log log N)
vector<bool> sieve(int n) {
    vector<bool> isPrime(n + 1, true);
    isPrime[0] = isPrime[1] = false;
    
    for (int i = 2; i * i <= n; i++) {
        if (isPrime[i]) {
            for (int j = i * i; j <= n; j += i)
                isPrime[j] = false;  // Đánh dấu bội số
        }
    }
    return isPrime;
}

// Kiểm tra 1 số có phải nguyên tố không - O(sqrt(N))
bool isPrime(int n) {
    if (n < 2) return false;
    if (n == 2) return true;
    if (n % 2 == 0) return false;
    for (int i = 3; i * i <= n; i += 2)
        if (n % i == 0) return false;
    return true;
}

// Phân tích thừa số nguyên tố - O(sqrt(N))
vector<int> primeFactors(int n) {
    vector<int> factors;
    for (int i = 2; i * i <= n; i++) {
        while (n % i == 0) {
            factors.push_back(i);
            n /= i;
        }
    }
    if (n > 1) factors.push_back(n);
    return factors;
}
```

### Code Python

```python
# Sàng Eratosthenes
def sieve(n):
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    for i in range(2, int(n**0.5) + 1):
        if is_prime[i]:
            for j in range(i*i, n+1, i):
                is_prime[j] = False
    return is_prime

# Kiểm tra nguyên tố
def is_prime(n):
    if n < 2: return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0: return False
    return True
```

---

## 3. Lưu ý

### Bẫy 1: Tràn số khi tính lũy thừa

```cpp
// SAI: a*a có thể tràn long long
result = result * a % MOD;

// ĐÚNG: dùng __int128 hoặc nhân theo modulo
result = (__int128)result * a % MOD;
```

### Code Python

```python
# Python không bị tràn số nguyên (bigint tự động)
# Nhưng vẫn cần modulo để giữ số nhỏ
result = result * a % MOD  # An toàn trong Python!
```

### Bẫy 2: Sàng nguyên tố với N lớn

N = 10⁷ → sàng OK. N = 10⁸ → có thể thiếu bộ nhớ!

**Giải pháp:** Dùng segmented sieve (sàng phân đoạn) cho N rất lớn.

### Mẹo thi cử

| Bài toán | Dùng gì |
|----------|---------|
| Tính a^b % MOD | `powerMod(a, b, MOD)` |
| Kiểm tra nguyên tố N ≤ 10⁷ | Sàng Eratosthenes |
| Kiểm tra nguyên tố N ≤ 10¹² | Miller-Rabin (nâng cao) |
| Phân tích thừa số | Duyệt đến √N |

---

---

## Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Exponentiation](https://cses.fi/problemset/task/1095) | CSES | ⭐⭐ | Lũy thừa nhị phân |
| [CSES - Exponentiation II](https://cses.fi/problemset/task/1712) | CSES | ⭐⭐⭐ | Fermat nhỏ |
| [CSES - Counting Divisors](https://cses.fi/problemset/task/1713) | CSES | ⭐⭐ | Sàng ước |
| [CSES - Primes](https://cses.fi/problemset/task/1714) | CSES | ⭐⭐ | Sàng nguyên tố |
| [SPOJ - Prime Generator](https://www.spoj.com/problems/PRIME1/) | SPOJ | ⭐⭐ | Sàng phân đoạn |

## Bài viết liên quan

- [Bài 18: Euclid & Modular Inverse](18-euclid-modular-inverse.md)
- [Bài 26: Số học nâng cao](26-so-hoc-nang-cao.md)

## Tài liệu tham khảo

- [VNOI Wiki - Lũy thừa nhị phân](https://wiki.vnoi.info/algo/algebra/binary_exponentation)
- [VNOI Wiki - Sàng nguyên tố](https://wiki.vnoi.info/algo/algebra/prime_sieve)
- [CP-Algorithms - Binary Exponentiation](https://cp-algorithms.com/algebra/binary-exp.html)
- [CP-Algorithms - Sieve of Eratosthenes](https://cp-algorithms.com/algebra/sieve-of-eratosthenes.html)
- [HackerEarth - Number Theory](https://www.hackerearth.com/practice/math/number-theory/basic-number-theory-1/tutorial/)
- [GeeksforGeeks - Binary Exponentiation](https://www.geeksforgeeks.org/dsa/modular-exponentiation-power-in-modular-arithmetic/)

**Bài tiếp theo:** [Quy hoạch động →](12-quy-hoach-dong.md)
