# Bài 26: Số Học Nâng Cao - Euler Totient & Modular Arithmetic

> **Tác giả:** Hà Trí Kiên
> **Nội dung tham khảo từ:** VNOI Wiki - Số học, HackerEarth Number Theory Series

## 1. Đếm số nguyên tố cùng nhau - Euler Totient

### Bài toán: Có bao nhiêu số từ 1 đến N nguyên tố cùng nhau với N?

**φ(N)** = số nguyên dương ≤ N mà nguyên tố cùng nhau với N.

```
φ(12) = 4  (các số: 1, 5, 7, 11)
φ(7) = 6   (các số: 1, 2, 3, 4, 5, 6)
```

### Công thức

```
Nếu N = p1^a1 × p2^a2 × ... × pk^ak
Thì φ(N) = N × (1 - 1/p1) × (1 - 1/p2) × ... × (1 - 1/pk)
```

### Code C++

```cpp
// Tính φ(n) - O(sqrt(n))
long long eulerPhi(long long n) {
    long long result = n;
    for (long long i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            while (n % i == 0) n /= i;
            result -= result / i;
        }
    }
    if (n > 1) result -= result / n;
    return result;
}

// Sàng Euler - tính φ cho tất cả số từ 1 đến N - O(N log log N)
vector<int> eulerSieve(int n) {
    vector<int> phi(n + 1);
    for (int i = 0; i <= n; i++) phi[i] = i;
    for (int i = 2; i <= n; i++) {
        if (phi[i] == i) {  // i là nguyên tố
            for (int j = i; j <= n; j += i)
                phi[j] -= phi[j] / i;
        }
    }
    return phi;
}
```

---

## 2. Tính tổ hợp với modulo

### Công thức

```
C(n, k) = n! / (k! × (n-k)!)
C(n, k) mod p = fact[n] × inv_fact[k] × inv_fact[n-k] mod p
```

### Code C++

```cpp
const long long MOD = 1e9 + 7;
long long fact[1000001], inv_fact[1000001];

long long powerMod(long long a, long long b, long long mod) {
    long long result = 1;
    a %= mod;
    while (b > 0) {
        if (b & 1) result = result * a % mod;
        a = a * a % mod;
        b >>= 1;
    }
    return result;
}

void buildFactorial(int n) {
    fact[0] = 1;
    for (int i = 1; i <= n; i++)
        fact[i] = fact[i-1] * i % MOD;
    inv_fact[n] = powerMod(fact[n], MOD - 2, MOD);
    for (int i = n - 1; i >= 0; i--)
        inv_fact[i] = inv_fact[i+1] * (i+1) % MOD;
}

long long nCk(int n, int k) {
    if (k < 0 || k > n) return 0;
    return fact[n] % MOD * inv_fact[k] % MOD * inv_fact[n-k] % MOD;
}

// nPk (hoán vị)
long long nPk(int n, int k) {
    if (k < 0 || k > n) return 0;
    return fact[n] % MOD * inv_fact[n-k] % MOD;
}
```

### Code Python

```python
MOD = 10**9 + 7

def power_mod(a, b, mod=MOD):
    result = 1
    a %= mod
    while b > 0:
        if b & 1:
            result = result * a % mod
        a = a * a % mod
        b >>= 1
    return result

def euler_phi(n):
    result = n
    i = 2
    while i * i <= n:
        if n % i == 0:
            while n % i == 0:
                n //= i
            result -= result // i
        i += 1
    if n > 1:
        result -= result // n
    return result

def build_factorial(n):
    fact = [1] * (n + 1)
    for i in range(1, n + 1):
        fact[i] = fact[i-1] * i % MOD
    inv_fact = [1] * (n + 1)
    inv_fact[n] = power_mod(fact[n], MOD - 2)
    for i in range(n - 1, -1, -1):
        inv_fact[i] = inv_fact[i+1] * (i+1) % MOD
    return fact, inv_fact

def nCk(n, k, fact, inv_fact):
    if k < 0 or k > n: return 0
    return fact[n] * inv_fact[k] % MOD * inv_fact[n-k] % MOD
```

---

## 3. Lucas Theorem (khi n rất lớn)

Khi n rất lớn (10^18) nhưng p nhỏ (10^6), ta dùng **Lucas Theorem**:

```
C(n, k) mod p = Π C(ni, ki) mod p
Trong đó ni, ki là các chữ số của n, k ở hệ cơ số p
```

---

## 4. Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [SPOJ - ETF](https://www.spoj.com/problems/ETF/) | SPOJ | ⭐⭐ | Euler Totient |
| [SPOJ - GCDEX](https://www.spoj.com/problems/GCDEX/) | SPOJ | ⭐⭐⭐ | GCD + Euler |
| [CSES - Exponentiation](https://cses.fi/problemset/task/1095) | CSES | ⭐⭐ | Lũy thừa modulo |
| [CSES - Binomial Coefficients](https://cses.fi/problemset/task/1079) | CSES | ⭐⭐ | Tổ hợp modulo |
| [SPOJ - NCNK - nCk](https://www.spoj.com/problems/NCNK/) | SPOJ | ⭐⭐ | Tổ hợp lớn |
| [CF - Yet Another Number Theory](https://codeforces.com/) | CF | ⭐⭐⭐ | Tổng hợp số học |

## Bài viết liên quan

- [Bài 11: Lũy thừa nhị phân & Sàng nguyên tố](11-luy-thua-nhi-phan-sang-nguyen-to.md)
- [Bài 18: Euclid & Modular Inverse](18-euclid-modular-inverse.md)
- [Bài 19: Tổ hợp & Xác suất](19-to-hop-xac-suat.md)

## Tài liệu tham khảo

- [HackerEarth - Number Theory 1-7](https://www.hackerearth.com/practice/math/number-theory/basic-number-theory-1/tutorial/)
- [VNOI Wiki - Số học](https://vnoi.info/translate/he/So-hoc-Phan-1-Modulo-gcd)
- [CP-Algorithms - Euler Function](https://cp-algorithms.com/algebra/phi-function.html)
- [CP-Algorithms - Modular Inverse](https://cp-algorithms.com/algebra/module-inverse.html)
- [GeeksforGeeks - Euler's Totient Function](https://www.geeksforgeeks.org/dsa/eulers-totient-function/)
