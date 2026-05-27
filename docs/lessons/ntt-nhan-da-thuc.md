# Bài 67: NTT & Nhân Đa Thức

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** CP-Algorithms, VNOI Wiki

## 1. Bài Toán Nhân Đa Thức

### 1.1 Phát biểu

Cho hai đa thức $A(x) = a_0 + a_1 x + \cdots + a_n x^n$ và $B(x) = b_0 + b_1 x + \cdots + b_m x^m$. Tính tích $C(x) = A(x) \cdot B(x)$.

### 1.2 Cách thường: $O(nm)$

Nhân trực tiếp → quá chậm khi $n, m \sim 10^5$.

### 1.3 Cách nhanh: FFT / NTT $O(n \log n)$

Sử dụng biến đổi Fourier nhanh (FFT) hoặc biến đổi số nguyên tố (NTT) để nhân đa thức trong $O(n \log n)$.

---

## 2. FFT (Fast Fourier Transform) - Tổng quan

### 2.1 Ý tưởng

1. Chuyển đa thức từ **không gian hệ số** sang **không gian giá trị** (tại các điểm đặc biệt) - O(n log n)
2. Nhân hai đa thức trong không gian giá trị - O(n)
3. Chuyển ngược lại - O(n log n)

### 2.2 Sử dụng trong thi đấu

Trong thi đấu, thường dùng **NTT** (Number Theoretic Transform) thay vì FFT để tránh lỗi số thực.

---

## 3. NTT (Number Theoretic Transform)

### 3.1 Tại sao NTT?

FFT dùng số phức → sai số dấu phẩy động. NTT dùng **số nguyên modulo** → chính xác 100%.

### 3.2 Điều kiện

Cần modulo $p$ sao cho tồn tại căn nguyên thủy bậc $2^k$ (với $2^k \geq 2n$).

!!! info "Căn nguyên thủy là gì?"
    Số $g$ là **căn nguyên thủy** modulo $p$ nếu mọi số từ $1$ đến $p-1$ đều biểu diễn được dưới dạng $g^j \bmod p$ (với $j$ từ $1$ đến $p-1$). Nói cách khác, $g$ "sinh ra" toàn bộ nhóm nhân modulo $p$.
    
    Khi đó, $\omega = g^{(p-1)/2^k}$ đóng vai trò tương tự "căn đơn vị" trong FFT — nó chia vòng tròn đơn vị thành $2^k$ phần bằng nhau trong trường số nguyên modulo. Cụ thể: $\omega^{2^k} \equiv 1 \pmod{p}$ nhưng $\omega^j \not\equiv 1$ cho $0 < j < 2^k$.

Các modulo thường dùng:
- $p = 998244353 = 119 \times 2^{23} + 1$ → căn nguyên thủy $g = 3$, tối đa $2^{23}$ phần tử
- $p = 985661441 = 235 \times 2^{22} + 1$ → $g = 3$
- $p = 754974721 = 45 \times 2^{24} + 1$ → $g = 11$

### 3.3 Căn nguyên thủy bậc $2^k$

Nếu $g$ là căn nguyên thủy modulo $p$, thì $\omega = g^{(p-1)/2^k}$ là căn nguyên thủy bậc $2^k$ (tức $\omega^{2^k} = 1$ và $\omega^j \neq 1$ cho $0 < j < 2^k$).

---

## 4. Cài đặt NTT

=== "C++"

    ```cpp
    const long long MOD = 998244353;
    const long long G = 3; // căn nguyên thủy

    long long powerMod(long long a, long long b, long long mod) {
        long long res = 1;
        a %= mod;
        while (b > 0) {
            if (b & 1) res = res * a % mod;
            a = a * a % mod;
            b >>= 1;
        }
        return res;
    }

    void ntt(vector<long long>& a, bool invert) {
        int n = a.size();
        // Bit-reversal permutation
        for (int i = 1, j = 0; i < n; i++) {
            int bit = n >> 1;
            for (; j & bit; bit >>= 1) j ^= bit;
            j ^= bit;
            if (i < j) swap(a[i], a[j]);
        }

        for (int len = 2; len <= n; len <<= 1) {
            long long wlen = powerMod(G, (MOD - 1) / len, MOD);
            if (invert) wlen = powerMod(wlen, MOD - 2, MOD);

            for (int i = 0; i < n; i += len) {
                long long w = 1;
                for (int j = 0; j < len / 2; j++) {
                    long long u = a[i + j];
                    long long v = a[i + j + len / 2] * w % MOD;
                    a[i + j] = (u + v) % MOD;
                    a[i + j + len / 2] = (u - v + MOD) % MOD;
                    w = w * wlen % MOD;
                }
            }
        }

        if (invert) {
            long long invN = powerMod(n, MOD - 2, MOD);
            for (auto& x : a) x = x * invN % MOD;
        }
    }

    vector<long long> multiply(vector<long long> a, vector<long long> b) {
        int n = 1;
        while (n < (int)a.size() + (int)b.size()) n <<= 1;
        a.resize(n); b.resize(n);

        ntt(a, false);
        ntt(b, false);
        for (int i = 0; i < n; i++) a[i] = a[i] * b[i] % MOD;
        ntt(a, true);
        return a;
    }
    ```

=== "Python"

    ```python
    MOD = 998244353
    G = 3

    def power_mod(a, b, mod):
        res = 1
        a %= mod
        while b > 0:
            if b & 1:
                res = res * a % mod
            a = a * a % mod
            b >>= 1
        return res

    def ntt(a, invert):
        n = len(a)
        j = 0
        for i in range(1, n):
            bit = n >> 1
            while j & bit:
                j ^= bit
                bit >>= 1
            j ^= bit
            if i < j:
                a[i], a[j] = a[j], a[i]

        length = 2
        while length <= n:
            wlen = power_mod(G, (MOD - 1) // length, MOD)
            if invert:
                wlen = power_mod(wlen, MOD - 2, MOD)
            for i in range(0, n, length):
                w = 1
                for j in range(length // 2):
                    u = a[i + j]
                    v = a[i + j + length // 2] * w % MOD
                    a[i + j] = (u + v) % MOD
                    a[i + j + length // 2] = (u - v + MOD) % MOD
                    w = w * wlen % MOD
            length <<= 1

        if invert:
            inv_n = power_mod(n, MOD - 2, MOD)
            for i in range(n):
                a[i] = a[i] * inv_n % MOD

    def multiply(a, b):
        n = 1
        while n < len(a) + len(b):
            n <<= 1
        a = a + [0] * (n - len(a))
        b = b + [0] * (n - len(b))

        ntt(a, False)
        ntt(b, False)
        for i in range(n):
            a[i] = a[i] * b[i] % MOD
        ntt(a, True)
        return a
    ```

---

## 5. Ứng dụng

### 5.1 Nhân số lớn

Mỗi chữ số là một hệ số đa thức → nhân 2 số trong $O(n \log n)$.

### 5.2 Đếm cặp có tổng cho trước

Cho mảng $a$, đếm số cặp $(i, j)$ sao cho $a_i + a_j = k$.

Tạo đa thức $A(x) = \sum x^{a_i}$, tính $A(x)^2$, hệ số của $x^k$ là đáp án.

!!! info "Tại sao cách này hoạt động?"
    Mỗi phần tử $a_i$ tương ứng với một "cột mốc" $x^{a_i}$ trong đa thức. Khi nhân $A(x) \times A(x)$, hệ số của $x^k$ bằng tổng số cách chọn hai số mũ $a_i, a_j$ sao cho $a_i + a_j = k$ — chính là số cặp có tổng bằng $k$.

### 5.3 Tổ hợp với convolution

Nhiều bài toán tổ hợp có thể giải bằng convolution (nhân đa thức).

---

## 6. So sánh FFT và NTT

| Tiêu chí | FFT | NTT |
|-----------|-----|-----|
| Loại số | Số phức (double) | Số nguyên modulo |
| Sai số | Có (dấu phẩy động) | Không (chính xác) |
| Tốc độ | Nhanh hơn | Chậm hơn ~2x |
| Điều kiện | Không | Cần modulo đặc biệt |
| Thi đấu | Ít dùng | Dùng nhiều |

---

## 7. Bài tập luyện tập

### Bài 1: Nhân đa thức

**Đề bài:** Cho 2 đa thức $A(x)$ bậc $n$ và $B(x)$ bậc $m$. Tính tích $C(x) = A(x) \cdot B(x)$.

**Input:**
- Dòng 1: 2 số nguyên $n, m$ $(0 \leq n, m \leq 10^5)$
- Dòng 2: $n+1$ số nguyên $a_0, a_1, \ldots, a_n$ (hệ số $A$)
- Dòng 3: $m+1$ số nguyên $b_0, b_1, \ldots, b_m$ (hệ số $B$)

**Output:** $n+m+1$ số nguyên là hệ số của $C(x)$, modulo $998244353$.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `2 1`<br>`1 2 3`<br>`4 5` | `4 13 17 15` |

**Giải thích:** $(1 + 2x + 3x^2)(4 + 5x) = 4 + 13x + 17x^2 + 15x^3$.

??? tip "Lời giải"
    Dùng NTT. Độ phức tạp $O(n \log n)$.
    
    === "C++"
    
        ```cpp
        #include <bits/stdc++.h>
        using namespace std;
        const long long MOD = 998244353;
        const long long G = 3;
    
        long long powerMod(long long a, long long b, long long mod) {
            long long res = 1; a %= mod;
            while (b > 0) {
                if (b & 1) res = res * a % mod;
                a = a * a % mod; b >>= 1;
            }
            return res;
        }
    
        void ntt(vector<long long>& a, bool invert) {
            int n = a.size();
            for (int i = 1, j = 0; i < n; i++) {
                int bit = n >> 1;
                for (; j & bit; bit >>= 1) j ^= bit;
                j ^= bit;
                if (i < j) swap(a[i], a[j]);
            }
            for (int len = 2; len <= n; len <<= 1) {
                long long wlen = powerMod(G, (MOD - 1) / len, MOD);
                if (invert) wlen = powerMod(wlen, MOD - 2, MOD);
                for (int i = 0; i < n; i += len) {
                    long long w = 1;
                    for (int j = 0; j < len / 2; j++) {
                        long long u = a[i + j], v = a[i + j + len / 2] * w % MOD;
                        a[i + j] = (u + v) % MOD;
                        a[i + j + len / 2] = (u - v + MOD) % MOD;
                        w = w * wlen % MOD;
                    }
                }
            }
            if (invert) {
                long long invN = powerMod(n, MOD - 2, MOD);
                for (auto& x : a) x = x * invN % MOD;
            }
        }
    
        vector<long long> multiply(vector<long long> a, vector<long long> b) {
            int n = 1;
            while (n < (int)a.size() + (int)b.size()) n <<= 1;
            a.resize(n); b.resize(n);
            ntt(a, false); ntt(b, false);
            for (int i = 0; i < n; i++) a[i] = a[i] * b[i] % MOD;
            ntt(a, true);
            return a;
        }
    
        int main() {
            int n, m; cin >> n >> m;
            vector<long long> a(n + 1), b(m + 1);
            for (int i = 0; i <= n; i++) cin >> a[i];
            for (int i = 0; i <= m; i++) cin >> b[i];
            vector<long long> c = multiply(a, b);
            for (int i = 0; i <= n + m; i++) cout << c[i] << " \n"[i == n + m];
        }
        ```
---

### Bài 2: Đếm cặp có tổng K

**Đề bài:** Cho mảng $a$ gồm $n$ phần tử và số nguyên $k$. Đếm số cặp $(i,j)$ sao cho $a_i + a_j = k$ (với $i < j$).

**Input:**
- Dòng 1: 2 số nguyên $n, k$ $(1 \leq n \leq 10^5, 0 \leq k \leq 2 \cdot 10^5)$
- Dòng 2: $n$ số nguyên $a_i$ $(0 \leq a_i \leq 10^5)$

**Output:** Số cặp thỏa mãn.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `5 6`<br>`1 2 3 4 5` | `2` |

**Giải thích:** Các cặp: (1,5) và (2,4).

??? tip "Lời giải"
    Tạo đa thức $A(x) = \sum x^{a_i}$. Tính $A(x)^2$ bằng NTT. Hệ số $x^k$ là số cặp (có cả $(i,i)$, cần xử lý).
    
    === "C++"
    
        ```cpp
        #include <bits/stdc++.h>
        using namespace std;
        const long long MOD = 998244353;
        const long long G = 3;
    
        long long powerMod(long long a, long long b, long long mod) {
            long long res = 1; a %= mod;
            while (b > 0) {
                if (b & 1) res = res * a % mod;
                a = a * a % mod; b >>= 1;
            }
            return res;
        }
    
        void ntt(vector<long long>& a, bool invert) {
            int n = a.size();
            for (int i = 1, j = 0; i < n; i++) {
                int bit = n >> 1;
                for (; j & bit; bit >>= 1) j ^= bit;
                j ^= bit;
                if (i < j) swap(a[i], a[j]);
            }
            for (int len = 2; len <= n; len <<= 1) {
                long long wlen = powerMod(G, (MOD - 1) / len, MOD);
                if (invert) wlen = powerMod(wlen, MOD - 2, MOD);
                for (int i = 0; i < n; i += len) {
                    long long w = 1;
                    for (int j = 0; j < len / 2; j++) {
                        long long u = a[i + j], v = a[i + j + len / 2] * w % MOD;
                        a[i + j] = (u + v) % MOD;
                        a[i + j + len / 2] = (u - v + MOD) % MOD;
                        w = w * wlen % MOD;
                    }
                }
            }
            if (invert) {
                long long invN = powerMod(n, MOD - 2, MOD);
                for (auto& x : a) x = x * invN % MOD;
            }
        }
    
        int main() {
            int n, k; cin >> n >> k;
            int maxVal = 0;
            vector<int> a(n);
            for (int i = 0; i < n; i++) { cin >> a[i]; maxVal = max(maxVal, a[i]); }
            int sz = 1;
            while (sz <= maxVal) sz <<= 1;
            vector<long long> poly(sz, 0);
            for (int x : a) poly[x]++;
            vector<long long> p2(poly.begin(), poly.end());
            ntt(p2, false);
            for (int i = 0; i < sz; i++) p2[i] = p2[i] * p2[i] % MOD;
            ntt(p2, true);
            long long ans = p2[k];
            for (int x : a) if (2 * x == k) ans--;
            cout << ans / 2 << "\n";
        }
        ```
---

### Bài 3: Nhân số lớn

**Đề bài:** Cho 2 số nguyên không âm $A$ và $B$ (tối đa $10^5$ chữ số). Tính $A \times B$.

**Input:** 2 dòng, mỗi dòng là 1 số nguyên không âm.

**Output:** Tích $A \times B$.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `123`<br>`456` | `56088` |

??? tip "Lời giải"
    Mỗi chữ số là 1 hệ số đa thức. Nhân 2 đa thức bằng NTT, xử lý nhớ.