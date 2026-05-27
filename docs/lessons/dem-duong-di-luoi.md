# Bài 59: Đếm Đường Đi Trên Lưới

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** CP-Algorithms, VNOI Wiki

## 1. Bài Toán Cơ Bản

### 1.1 Đếm đường đi từ (0,0) đến (n,m)

Mỗi bước chỉ được đi **phải** hoặc **xuống**. Từ $(0,0)$ đến $(n,m)$ cần đúng $n$ bước xuống và $m$ bước phải, tổng $n + m$ bước.

Số cách chọn vị trí $n$ bước xuống trong $n + m$ bước:

$$\text{Paths}(n, m) = \binom{n + m}{n} = \binom{n + m}{m}$$

**Ví dụ:** Từ $(0,0)$ đến $(2,3)$: $\binom{5}{2} = 10$ đường đi.

=== "C++"

    ```cpp
    // Đếm đường đi trên lưới n×m (0-indexed) - chỉ đi phải hoặc xuống
    long long gridPaths(int n, int m) {
        return C(n + m, n); // dùng hàm C(n,k) đã cài ở Bài 19
    }
    ```

=== "Python"

    ```python
    def grid_paths(n, m):
        return C(n + m, n)  # dùng hàm C(n,k) đã cài ở Bài 19
    ```

---

## 2. Đếm đường đi có vật cản

### 2.1 Bài toán

Trên lưới có $k$ ô bị cấm. Đếm số đường đi từ $(0,0)$ đến $(n,m)$ không đi qua ô cấm nào.

### 2.2 Ý tưởng

Sắp xếp các ô cấm theo thứ tự (từ trái qua phải, trên xuống dưới). Với mỗi ô cấm $i$, đếm số đường đi từ gốc đến $i$ mà **không qua ô cấm nào khác**, rồi trừ đi đóng góp vào đích.

Gọi $f(i)$ = số đường đi từ $(0,0)$ đến ô cấm $i$ mà không qua ô cấm nào khác.

$$f(i) = \text{Paths}(0 \to i) - \sum_{j < i} f(j) \times \text{Paths}(j \to i)$$

Kết quả = $\text{Paths}(0 \to \text{đích}) - \sum_i f(i) \times \text{Paths}(i \to \text{đích})$

=== "C++"

    ```cpp
    long long gridPathsObstacles(int n, int m, vector<pair<int,int>>& banned) {
        sort(banned.begin(), banned.end());
        int k = banned.size();
        vector<long long> dp(k);

        for (int i = 0; i < k; i++) {
            dp[i] = C(banned[i].first + banned[i].second, banned[i].first);
            for (int j = 0; j < i; j++) {
                if (banned[j].first <= banned[i].first && banned[j].second <= banned[i].second) {
                    dp[i] = (dp[i] - dp[j] * C(
                        banned[i].first - banned[j].first + banned[i].second - banned[j].second,
                        banned[i].first - banned[j].first
                    ) % MOD + MOD) % MOD;
                }
            }
        }

        long long total = C(n + m, n);
        for (int i = 0; i < k; i++) {
            if (banned[i].first <= n && banned[i].second <= m) {
                total = (total - dp[i] * C(
                    n - banned[i].first + m - banned[i].second,
                    n - banned[i].first
                ) % MOD + MOD) % MOD;
            }
        }
        return total;
    }
    ```

=== "Python"

    ```python
    def grid_paths_obstacles(n, m, banned):
        banned.sort()
        k = len(banned)
        dp = [0] * k

        for i in range(k):
            dp[i] = C(banned[i][0] + banned[i][1], banned[i][0])
            for j in range(i):
                if banned[j][0] <= banned[i][0] and banned[j][1] <= banned[i][1]:
                    dp[i] = (dp[i] - dp[j] * C(
                        banned[i][0] - banned[j][0] + banned[i][1] - banned[j][1],
                        banned[i][0] - banned[j][0]
                    )) % MOD

        total = C(n + m, n)
        for i in range(k):
            if banned[i][0] <= n and banned[i][1] <= m:
                total = (total - dp[i] * C(
                    n - banned[i][0] + m - banned[i][1],
                    n - banned[i][0]
                )) % MOD
        return total % MOD
    ```

---

## 3. Catalan Numbers & Đường đi không vượt đường chéo

### 3.1 Bài toán Dyck Path

Đếm đường đi từ $(0,0)$ đến $(n,n)$ chỉ đi **phải** hoặc **xuống**, không bao giờ đi **trên** đường chéo chính (tức tại mọi thời điểm số bước phải ≤ số bước xuống).

$$\text{Catalan}(n) = \frac{1}{n+1}\binom{2n}{n} = \binom{2n}{n} - \binom{2n}{n+1}$$

### 3.2 Các bài toán tương đương

Catalan number xuất hiện ở rất nhiều bài toán:

- Đếm dãy ngoặc đúng độ dài $2n$
- Đếm cây nhị phân có $n$ đỉnh
- Đếm cách chia đa giác lồi $n+2$ cạnh thành tam giác
- Đếm đường đi Dyck

=== "C++"

    ```cpp
    long long catalan(int n) {
        return C(2 * n, n) * modInverse(n + 1, MOD) % MOD;
    }
    ```

=== "Python"

    ```python
    def catalan(n):
        return C(2 * n, n) * pow(n + 1, MOD - 2, MOD) % MOD
    ```

---

## 4. Tổng đường đi trên lưới

### 4.1 Bài toán

Tính tổng số đường đi từ $(0,0)$ đến **mọi ô** $(i, j)$ trên lưới $n \times m$.

### 4.2 Quy hoạch động

$$\text{dp}[i][j] = \text{dp}[i-1][j] + \text{dp}[i][j-1]$$

với $\text{dp}[0][0] = 1$.

Tổng = $\sum_{i=0}^{n} \sum_{j=0}^{m} \text{dp}[i][j]$

---

## 5. Grid với nhiều loại bước

### 5.1 Bài toán

Từ $(0,0)$ đến $(n,m)$, mỗi bước có thể đi $(+1, 0), (0, +1), (+1, +1)$. Đếm số đường đi.

### 5.2 Quy hoạch động

$$\text{dp}[i][j] = \text{dp}[i-1][j] + \text{dp}[i][j-1] + \text{dp}[i-1][j-1]$$

Hoặc dùng ma trận chuyển nếu $n$ rất lớn (xem Bài 57).

---

## 6. Đếm đường đi trên lưới 3D

### 6.1 Bài toán

Từ $(0,0,0)$ đến $(a,b,c)$, mỗi bước đi $(+1,0,0), (0,+1,0), (0,0,+1)$.

$$\text{Paths} = \binom{a+b+c}{a, b, c} = \frac{(a+b+c)!}{a! \cdot b! \cdot c!}$$

=== "C++"

    ```cpp
    long long gridPaths3D(int a, int b, int c) {
        return C(a + b + c, a) * C(b + c, b) % MOD;
    }
    ```

---

## 7. Bài tập luyện tập

### Bài 1: Đếm đường đi cơ bản

**Đề bài:** Cho lưới $n \times m$. Mỗi bước chỉ được đi sang phải hoặc xuống. Từ góc trái trên $(1,1)$ đến góc phải dưới $(n,m)$, có bao nhiêu đường đi?

**Input:** 2 số nguyên $n, m$ $(1 \leq n, m \leq 10^6)$

**Output:** Số đường đi modulo $10^9 + 7$.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `2 3` | `3` |
| `3 3` | `6` |

??? tip "Lời giải"
    Đáp án = $C(n+m-2, n-1)$. Precompute factorial và modular inverse.
    
    === "C++"
    
        ```cpp
        #include <bits/stdc++.h>
        using namespace std;
        const long long MOD = 1e9 + 7;
        const int MAXN = 2e6 + 5;
        long long fact[MAXN], inv_fact[MAXN];
    
        long long powerMod(long long a, long long b, long long mod) {
            long long res = 1; a %= mod;
            while (b > 0) {
                if (b & 1) res = res * a % mod;
                a = a * a % mod; b >>= 1;
            }
            return res;
        }
    
        void build() {
            fact[0] = 1;
            for (int i = 1; i < MAXN; i++) fact[i] = fact[i-1] * i % MOD;
            inv_fact[MAXN-1] = powerMod(fact[MAXN-1], MOD - 2, MOD);
            for (int i = MAXN - 2; i >= 0; i--) inv_fact[i] = inv_fact[i+1] * (i+1) % MOD;
        }
    
        long long C(int n, int k) {
            if (k < 0 || k > n) return 0;
            return fact[n] * inv_fact[k] % MOD * inv_fact[n-k] % MOD;
        }
    
        int main() {
            build();
            int n, m; cin >> n >> m;
            cout << C(n + m - 2, n - 1) << "\n";
        }
        ```
---

### Bài 2: Grid Paths (7x7)

**Đề bài:** Cho lưới $7 \times 7$. Có một số ô bị chặn. Đếm số đường đi từ góc trái trên đến góc phải dưới, chỉ đi phải hoặc xuống, không qua ô chặn.

**Input:** 48 ký tự. Mỗi ký tự là `.` (trống) hoặc `#` (chặn), đọc từ trái sang phải, trên xuống dưới. Ô $(1,1)$ và $(7,7)$ luôn trống.

**Output:** Số đường đi.

**Ví dụ:** (input toàn `.`) → Output: `12870`

??? tip "Lời giải"
    Dùng bitmask DP hoặc BFS đếm đường đi trên lưới nhỏ.
---

### Bài 3: Dyck Path (Catalan)

**Đề bài:** Cho số nguyên $n$. Đếm số đường đi từ $(0,0)$ đến $(n,n)$ chỉ đi phải hoặc xuống, không bao giờ đi trên đường chéo (tức tại mọi thời điểm số bước phải ≤ số bước xuống).

**Input:** Số nguyên $n$ $(1 \leq n \leq 10^6)$

**Output:** Kết quả modulo $10^9 + 7$.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `3` | `5` |
| `4` | `14` |

**Giải thích (test 1):** Catalan(3) = 5. Các đường đi hợp lệ từ (0,0) đến (3,3).

??? tip "Lời giải"
    $C_n = \frac{1}{n+1}\binom{2n}{n}$.
    
    === "C++"
    
        ```cpp
        #include <bits/stdc++.h>
        using namespace std;
        const long long MOD = 1e9 + 7;
        const int MAXN = 2e6 + 5;
        long long fact[MAXN], inv_fact[MAXN];
    
        long long powerMod(long long a, long long b, long long mod) {
            long long res = 1; a %= mod;
            while (b > 0) {
                if (b & 1) res = res * a % mod;
                a = a * a % mod; b >>= 1;
            }
            return res;
        }
    
        void build() {
            fact[0] = 1;
            for (int i = 1; i < MAXN; i++) fact[i] = fact[i-1] * i % MOD;
            inv_fact[MAXN-1] = powerMod(fact[MAXN-1], MOD - 2, MOD);
            for (int i = MAXN - 2; i >= 0; i--) inv_fact[i] = inv_fact[i+1] * (i+1) % MOD;
        }
    
        long long C(int n, int k) {
            if (k < 0 || k > n) return 0;
            return fact[n] * inv_fact[k] % MOD * inv_fact[n-k] % MOD;
        }
    
        int main() {
            build();
            int n; cin >> n;
            long long ans = C(2 * n, n) * powerMod(n + 1, MOD - 2, MOD) % MOD;
            cout << ans << "\n";
        }
        ```
---

### Bài 4: Dice Combinations

**Đề bài:** Có bao nhiêu cách để tung xúc xắc (1-6) sao cho tổng các mặt bằng $n$?

**Input:** Số nguyên $n$ $(1 \leq n \leq 10^6)$

**Output:** Kết quả modulo $10^9 + 7$.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `3` | `4` |
| `4` | `8` |

**Giải thích (test 1):** Tổng = 3: {1+1+1, 1+2, 2+1, 3} = 4 cách.

??? tip "Lời giải"
    $dp[i] = dp[i-1] + dp[i-2] + \cdots + dp[i-6]$, dùng prefix sum để tối ưu.