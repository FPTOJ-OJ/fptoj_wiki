# Bài 19: Tổ Hợp & Xác Suất

> **Tác giả:** Hà Trí Kiên<br>
> **Nội dung tham khảo từ:** VNOI Wiki - Cách tính số tổ hợp, Xác suất

## 1. Tổ hợp C(n, k)

### Ẩn dụ: Chọn đội bóng

Có 10 bạn, chọn 5 bạn đi đá bóng. Có bao nhiêu cách chọn? → C(10, 5) = 252!

### Công thức

```
C(n, k) = n! / (k! × (n-k)!)

Tính chất:
C(n, 0) = C(n, n) = 1
C(n, k) = C(n, n-k)   (đối xứng)
C(n, k) = C(n-1, k-1) + C(n-1, k)  (tam giác Pascal)
```

### Tại sao C(n, k) = C(n-1, k-1) + C(n-1, k)?

Đây là công thức truy hồi quan trọng nhất của tổ hợp. Hãy tưởng tượng:

Bạn có n người, muốn chọn k người. Xét **người thứ n** (người cuối cùng):

- **Trường hợp 1:** Chọn người thứ n → cần chọn thêm k-1 người từ n-1 người còn lại → C(n-1, k-1)
- **Trường hợp 2:** Không chọn người thứ n → cần chọn k người từ n-1 người còn lại → C(n-1, k)

Tổng 2 trường hợp = C(n, k)!

### Tam giác Pascal - Trực quan

```
n=0:         1
n=1:        1 1
n=2:       1 2 1
n=3:      1 3 3 1
n=4:     1 4 6 4 1
n=5:    1 5 10 10 5 1
n=6:   1 6 15 20 15 6 1

Mỗi số = tổng 2 số phía trên nó:
  C(4,2) = 6 = C(3,1) + C(3,2) = 3 + 3 = 6 ✅
  C(5,3) = 10 = C(4,2) + C(4,3) = 6 + 4 = 10 ✅
```

---

## 2. Cách tính C(n, k)

### Cách 1: Tam giác Pascal - O(N²)

Phù hợp khi N nhỏ (≤ 5000) và cần tính nhiều C(n, k).

```cpp
const long long MOD = 1e9 + 7;
long long C[5001][5001];

void buildPascal(int n) {
    for (int i = 0; i <= n; i++) {
        C[i][0] = C[i][i] = 1;
        for (int j = 1; j < i; j++)
            C[i][j] = (C[i-1][j-1] + C[i-1][j]) % MOD;
    }
}

// Truy vấn O(1)
// C(n, k) đã lưu trong mảng C[n][k]
```

### Code Python

```python
MOD = 10**9 + 7

def build_pascal(n):
    C = [[0] * (n + 1) for _ in range(n + 1)]
    for i in range(n + 1):
        C[i][0] = C[i][i] = 1
        for j in range(1, i):
            C[i][j] = (C[i-1][j-1] + C[i-1][j]) % MOD
    return C
```

**Ưu điểm:** Đơn giản, dễ hiểu
**Nhược điểm:** O(N²) bộ nhớ, chỉ N ≤ 5000

### Cách 2: Factorial + Modular Inverse - O(N log MOD)

Phù hợp khi N lớn (≤ 10⁶) và MOD là số nguyên tố.

```cpp
const long long MOD = 1e9 + 7;

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

long long fact[1000001], inv_fact[1000001];

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

**Công thức:** `C(n, k) = n! × (k!)^(-1) × ((n-k)!)^(-1) mod MOD`

**Ưu điểm:** O(N) preprocess, O(1) truy vấn, N có thể đến 10⁶
**Nhược điểm:** Cần MOD là số nguyên tố

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

### So sánh 2 cách

| | Tam giác Pascal | Factorial + Inverse |
|--|-----------------|---------------------|
| Preprocess | O(N²) | O(N) |
| Truy vấn | O(1) | O(1) |
| Bộ nhớ | O(N²) | O(N) |
| Giới hạn N | ~5000 | ~10⁶ |
| Yêu cầu | Không | MOD nguyên tố |

---

## 3. Các biến thể tổ hợp

### 3.1. Hoán vị có lặp (Permutation with repetition)

Có n đồ vật, trong đó có n₁ đồ loại 1, n₂ đồ loại 2, ..., nₖ đồ loại k.

```
Số cách sắp xếp = n! / (n₁! × n₂! × ... × nₖ!)
```

**Ví dụ:** Sắp xếp các ký tự trong "MISSISSIPPI":

- M: 1, I: 4, S: 4, P: 2 → tổng 11
- Kết quả = 11! / (1! × 4! × 4! × 2!) = 34650

### 3.2. Tổ hợp có lặp (Combination with repetition)

Chọn k đồ từ n loại, được phép chọn lại.

```
C(n+k-1, k) = C(n+k-1, n-1)
```

**Ví dụ:** Chọn 3 viên kẹo từ 5 loại (đỏ, xanh, vàng, trắng, đen), được chọn lại.
→ C(5+3-1, 3) = C(7, 3) = 35

### 3.3. Catalan Numbers

Dãy Catalan Cₙ xuất hiện trong nhiều bài toán đếm:

```
C₀ = 1
Cₙ = Σ Cᵢ × Cₙ₋₁₋ᵢ  (i từ 0 đến n-1)
Cₙ = C(2n, n) / (n+1)

Dãy: 1, 1, 2, 5, 14, 42, 132, 429, ...
```

**Ứng dụng của Catalan:**

- Số cách đặt dấu ngoặc đúng: `(()())` có 2 cách cho n=2
- Số cây nhị phân có n node
- Số đường đi trên lưới không vượt qua đường chéo
- Số cách chia đa giác lồi thành tam giác

```cpp
// Tính Catalan numbers
long long catalan[1001];
void buildCatalan(int n) {
    catalan[0] = catalan[1] = 1;
    for (int i = 2; i <= n; i++)
        for (int j = 0; j < i; j++)
            catalan[i] = (catalan[i] + catalan[j] * catalan[i-1-j]) % MOD;
}

// Hoặc dùng công thức: Cₙ = C(2n, n) / (n+1)
long long catalanFast(int n) {
    return nCk(2*n, n) * modInverse(n+1, MOD) % MOD;
}
```

### Code Python

```python
def build_catalan(n):
    catalan = [0] * (n + 1)
    catalan[0] = catalan[1] = 1
    for i in range(2, n + 1):
        for j in range(i):
            catalan[i] = (catalan[i] + catalan[j] * catalan[i-1-j]) % MOD
    return catalan

def catalan_fast(n, fact, inv_fact):
    return nCk(2*n, n, fact, inv_fact) * pow(n+1, MOD-2, MOD) % MOD
```

---

## 4. Xác suất cơ bản

### Công thức

```
P(A) = số kết quả thuận lợi / tổng số kết quả

P(A và B) = P(A) × P(B|A)   (xác suất có điều kiện)
P(A hoặc B) = P(A) + P(B) - P(A và B)
P(không A) = 1 - P(A)
```

### Ví dụ: Xúc xắc

```cpp
// Xác suất được tổng = 7 khi tung 2 xúc xắc
// Kết quả thuận lợi: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6
// Tổng kết quả: 6 × 6 = 36
// P = 6/36 = 1/6

// Tính modulo: P = 6 × modInverse(36) % MOD
```

### Code Python

```python
# Xác suất được tổng = 7 khi tung 2 xúc xắc
# Kết quả thuận lợi: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6
# Tổng kết quả: 6 × 6 = 36
# P = 6/36 = 1/6

# Tính modulo: P = 6 * pow(36, MOD-2, MOD) % MOD
```

### Bài toán xác suất phổ biến

**Bài toán:** Tung n đồng xu, xác suất được đúng k mặt ngửa?

```
P(k mặt ngửa) = C(n, k) / 2^n
```

**Giải thích:**

- Số cách chọn k đồng xu ra mặt ngửa = C(n, k)
- Tổng kết quả = 2^n (mỗi đồng xu có 2 trạng thái)

### Ví dụ: Expected Value (Giá trị kỳ vọng)

```cpp
// Kỳ vọng số lần tung xúc xắc cho đến khi được 6
// P(được 6) = 1/6 mỗi lần
// E = 1/P = 6 (trung bình cần 6 lần)

// Kỳ vọng = Σ (giá trị × xác suất)
// Ví dụ: Kỳ vọng khi tung 1 xúc xắc
// E = 1×1/6 + 2×1/6 + 3×1/6 + 4×1/6 + 5×1/6 + 6×1/6 = 3.5
```

### Code Python

```python
# Kỳ vọng số lần tung xúc xắc cho đến khi được 6
# P(được 6) = 1/6 mỗi lần
# E = 1/P = 6 (trung bình cần 6 lần)

# Kỳ vọng = Σ (giá trị × xác suất)
# Ví dụ: Kỳ vọng khi tung 1 xúc xắc
# E = 1*1/6 + 2*1/6 + 3*1/6 + 4*1/6 + 5*1/6 + 6*1/6 = 3.5
```

---

## 5. Xác suất trên DP

Nhiều bài toán xác suất có thể giải bằng DP.

### Ví dụ: Xác suất được nhiều hơn nửa mặt ngửa

Tung n đồng xu, xác suất có **nhiều hơn n/2** mặt ngửa?

```cpp
// dp[i][j] = xác suất được j mặt ngửa sau i lần tung
// dp[0][0] = 1
// dp[i][j] = dp[i-1][j-1] * 0.5 + dp[i-1][j] * 0.5

double probMoreThanHalf(int n) {
    vector<vector<double>> dp(n+1, vector<double>(n+1, 0));
    dp[0][0] = 1.0;
    
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j <= i; j++) {
            dp[i][j] = dp[i-1][j] * 0.5;  // Lần i ra sấp
            if (j > 0) dp[i][j] += dp[i-1][j-1] * 0.5;  // Lần i ra ngửa
        }
    }
    
    double result = 0;
    for (int j = n/2 + 1; j <= n; j++)
        result += dp[n][j];
    return result;
}
```

### Code Python

```python
def prob_more_than_half(n):
    dp = [[0.0] * (n + 1) for _ in range(n + 1)]
    dp[0][0] = 1.0
    for i in range(1, n + 1):
        for j in range(i + 1):
            dp[i][j] = dp[i-1][j] * 0.5
            if j > 0:
                dp[i][j] += dp[i-1][j-1] * 0.5
    return sum(dp[n][n//2 + 1:])
```

---

## 6. Lưu ý / Cạm bẫy hay gặp

### Bẫy 1: Phép chia modulo ≠ phép chia thường

```cpp
// SAI: (a / b) % MOD ≠ (a % MOD) / (b % MOD)
long long wrong = (a / b) % MOD;

// ĐÚNG: Dùng modular inverse
long long correct = a % MOD * powerMod(b, MOD - 2, MOD) % MOD;
```

**Lý do:** Modular arithmetic không có phép chia trực tiếp. Phải chuyển sang nhân với nghịch đảo modulo.

### Bẫy 2: Tràn số khi tính factorial

```cpp
// SAI: fact[i] có thể tràn long long trước khi lấy modulo
fact[i] = fact[i-1] * i;  // Tràn khi i > 20!

// ĐÚNG: Luôn lấy modulo sau mỗi phép nhân
fact[i] = fact[i-1] * i % MOD;
```

### Bẫy 3: Tam giác Pascal tốn bộ nhớ

```cpp
// C[5001][5001] → ~200MB bộ nhớ → có thể MLE!
long long C[5001][5001];

// Giải pháp: Chỉ dùng khi N ≤ 5000
// Với N > 5000, chuyển sang factorial + inverse (O(N) bộ nhớ)
```

### Bẫy 4: Catalan - Quên edge case

```cpp
// SAI: Không xử lý n = 0
long long catalan(int n) {
    return nCk(2*n, n) / (n+1);  // Sai vì chia thường!
}

// ĐÚNG:
long long catalan(int n) {
    if (n == 0) return 1;  // C₀ = 1
    return nCk(2*n, n) * powerMod(n+1, MOD-2, MOD) % MOD;
}
```

**Lưu ý:** `C(2n, n) / (n+1)` phải chuyển thành `C(2n, n) × (n+1)^(-1) mod MOD`.

### Bẫy 5: Sai điều kiện trong nCk

```cpp
// SAI: Không kiểm tra k < 0
long long nCk(int n, int k) {
    return fact[n] * inv_fact[k] % MOD * inv_fact[n-k] % MOD;
}

// ĐÚNG:
long long nCk(int n, int k) {
    if (k < 0 || k > n) return 0;  // Điều kiện bắt buộc
    return fact[n] % MOD * inv_fact[k] % MOD * inv_fact[n-k] % MOD;
}
```

### Bẫy 6: Quên tính nghịch đảo factorial đúng cách

```cpp
// SAI: Tính từng inv_fact[i] riêng lẻ → O(N log MOD)
for (int i = 0; i <= n; i++)
    inv_fact[i] = powerMod(fact[i], MOD - 2, MOD);  // Chậm!

// ĐÚNG: Tính inv_fact[n] trước, sau đó đi ngược lại → O(N + log MOD)
inv_fact[n] = powerMod(fact[n], MOD - 2, MOD);
for (int i = n - 1; i >= 0; i--)
    inv_fact[i] = inv_fact[i+1] * (i+1) % MOD;
```

### Bẫy 7: Expected Value - Quên trọng số

```cpp
// SAI: Kỳ vọng = tổng giá trị / số trường hợp (chỉ đúng khi đều xác suất)
E = (1 + 2 + 3 + 4 + 5 + 6) / 6;  // Đúng vì xúc xắc công bằng

// ĐÚNG (tổng quát): E = Σ (giá trị × xác suất)
// Khi xác suất không đều, phải nhân trọng số!
```

### Mẹo thi cử

- **C(n, k) với n lớn:** Dùng factorial + modular inverse
- **C(n, k) với n nhỏ (≤ 5000):** Dùng tam giác Pascal
- **Xác suất modulo:** Phép chia → dùng modInverse
- **Tránh tràn số:** Luôn lấy modulo sau mỗi phép nhân
- **Catalan:** Xuất hiện trong nhiều bài toán đếm hình học, cây, dãy ngoặc
- **Expected Value:** Thường kết hợp với DP

---

## 7. Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Binomial Coefficients](https://cses.fi/problemset/task/1079) | CSES | ⭐⭐ | C(n,k) mod p |
| [CSES - Creating Strings II](https://cses.fi/problemset/task/1716) | CSES | ⭐⭐ | Hoán vị có trùng |
| [CSES - Distributing Apples](https://cses.fi/problemset/task/1717) | CSES | ⭐⭐ | Tổ hợp có lặp |
| [VNOJ - Atcoder DP Contest I - Coins](https://oj.vnoi.info/problem/atcoder_dp_i) | VNOJ | ⭐⭐ | Probability DP |
| [VNOJ - VOMARBLE](https://oj.vnoi.info/problem/vomarble) | VNOJ | ⭐⭐⭐ | Combinatorics |
| [CSES - Counting Necklaces](https://cses.fi/problemset/task/2111) | CSES | ⭐⭐⭐ | Burnside's lemma |
| [LeetCode - Unique Paths](https://leetcode.com/problems/unique-paths/) | LC | ⭐⭐ | C(n,k) cơ bản |

## Bài viết liên quan

- [Bài 18: Euclid & Modular Inverse](18-euclid-modular-inverse.md)
- [Bài 26: Số học nâng cao](26-so-hoc-nang-cao.md)

## Tài liệu tham khảo

- [VNOI Wiki - Cách tính số tổ hợp](https://wiki.vnoi.info/algo/algebra/nCk)
- [CP-Algorithms - Binomial Coefficients](https://cp-algorithms.com/combinatorics/binomial-coefficients.html)
- [HackerEarth - Combinatorics](https://www.hackerearth.com/practice/math/combinatorics/basics-combinatorics/tutorial/)
- [GeeksforGeeks - nCr using Pascal's Triangle](https://www.geeksforgeeks.org/dsa/program-to-calculate-the-value-of-ncr-using-pascals-triangle/)

**Bài tiếp theo:** [Manacher →](20-manacher.md)
