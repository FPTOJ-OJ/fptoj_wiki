# Bài 19: Tổ Hợp & Xác Suất

> **Tác giả:** Hà Trí Kiên
> **Nội dung tham khảo từ:** VNOI Wiki - Cách tính số tổ hợp, Xác suất

## 1. Tổ hợp C(n, k)

### Ẩn dụ: Chọn đội bóng

Có 10 bạn, chọn 5 bạn đi đá bóng. Có bao nhiêu cách chọn? → C(10, 5) = 252!

### Công thức

```
C(n, k) = n! / (k! × (n-k)!)

Tính chất:
C(n, 0) = C(n, n) = 1
C(n, k) = C(n-1, k-1) + C(n-1, k)  (tam giác Pascal)
```

### Code C++

```cpp
const long long MOD = 1e9 + 7;

// ===== Cách 1: Tam giác Pascal - O(N²) =====
long long C[5001][5001];
void buildPascal(int n) {
    for (int i = 0; i <= n; i++) {
        C[i][0] = C[i][i] = 1;
        for (int j = 1; j < i; j++)
            C[i][j] = (C[i-1][j-1] + C[i-1][j]) % MOD;
    }
}

// ===== Cách 2: Factorial + Modular Inverse - O(N log MOD) =====
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

// C(n, k) mod MOD - O(1) sau khi preprocess
long long nCk(int n, int k) {
    if (k < 0 || k > n) return 0;
    return fact[n] % MOD * inv_fact[k] % MOD * inv_fact[n-k] % MOD;
}
```

### Code Python

```python
MOD = 10**9 + 7

# Python có sẵn math.comb (không lấy modulo)
import math
print(math.comb(10, 5))  # 252

# Có modulo: dùng precompute
def build_factorial(n):
    fact = [1] * (n + 1)
    for i in range(1, n + 1):
        fact[i] = fact[i-1] * i % MOD
    inv_fact = [1] * (n + 1)
    inv_fact[n] = pow(fact[n], MOD - 2, MOD)
    for i in range(n - 1, -1, -1):
        inv_fact[i] = inv_fact[i+1] * (i+1) % MOD
    return fact, inv_fact

def nCk(n, k, fact, inv_fact):
    if k < 0 or k > n: return 0
    return fact[n] * inv_fact[k] % MOD * inv_fact[n-k] % MOD
```

---

## 2. Xác suất cơ bản

### Công thức

```
P(A) = số kết quả thuận lợi / tổng số kết quả

P(A và B) = P(A) × P(B|A)
P(A hoặc B) = P(A) + P(B) - P(A và B)
```

### Ví dụ: Xúc xắc

```cpp
// Xác suất được tổng = 7 khi tung 2 xúc xắc
// Kết quả thuận lợi: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6
// Tổng kết quả: 6 × 6 = 36
// P = 6/36 = 1/6

// Tính modulo: P = 6 × modInverse(36) % MOD
```

---

## 3. Lưu ý

- **C(n, k) với n lớn:** Dùng factorial + modular inverse
- **C(n, k) với n nhỏ (≤ 5000):** Dùng tam giác Pascal
- **Xác suất modulo:** Phép chia → dùng modInverse
- **Tránh tràn số:** Luôn lấy modulo sau mỗi phép nhân

---

---

## Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Binomial Coefficients](https://cses.fi/problemset/task/1079) | CSES | ⭐⭐ | C(n,k) mod p |
| [CSES - Creating Strings II](https://cses.fi/problemset/task/1716) | CSES | ⭐⭐ | Hoán vị có trùng |
| [CSES - Distributing Apples](https://cses.fi/problemset/task/1717) | CSES | ⭐⭐ | Tổ hợp có lặp |

## Bài viết liên quan

- [Bài 18: Euclid & Modular Inverse](18-euclid-modular-inverse.md)
- [Bài 26: Số học nâng cao](26-so-hoc-nang-cao.md)

## Tài liệu tham khảo

- [VNOI Wiki - Cách tính số tổ hợp](https://wiki.vnoi.info/algo/algebra/nCk)
- [CP-Algorithms - Binomial Coefficients](https://cp-algorithms.com/combinatorics/binomial-coefficients.html)
- [HackerEarth - Combinatorics](https://www.hackerearth.com/practice/math/combinatorics/basics-combinatorics/tutorial/)
- [GeeksforGeeks - nCr using Pascal's Triangle](https://www.geeksforgeeks.org/dsa/program-to-calculate-the-value-of-ncr-using-pascals-triangle/)

**Bài tiếp theo:** [Manacher →](20-manacher.md)
