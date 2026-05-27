# Bài 58: Nguyên Lý Bao Hàm - Loại Trừ

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** CP-Algorithms, VNOI Wiki

## 1. Nguyên Lý Cơ Bản

### 1.1 Công thức 2 tập

Cho hai tập $A$ và $B$, số phần tử trong hợp:

$$|A \cup B| = |A| + |B| - |A \cap B|$$

Trừ đi phần giao vì đã đếm hai lần.

### 1.2 Công thức 3 tập

$$|A \cup B \cup C| = |A| + |B| + |C| - |A \cap B| - |A \cap C| - |B \cap C| + |A \cap B \cap C|$$

### 1.3 Công thức tổng quát (n tập)

$$\left|\bigcup_{i=1}^{n} A_i\right| = \sum_{i} |A_i| - \sum_{i<j} |A_i \cap A_j| + \sum_{i<j<k} |A_i \cap A_j \cap A_k| - \cdots + (-1)^{n+1} |A_1 \cap \cdots \cap A_n|$$

Hoặc viết gọn:

$$\left|\bigcup_{i=1}^{n} A_i\right| = \sum_{\emptyset \neq S \subseteq \{1,\ldots,n\}} (-1)^{|S|+1} \left|\bigcap_{i \in S} A_i\right|$$

**Tương tự, đếm phần bù** (những phần tử KHÔNG thuộc tập nào):

$$\left|\overline{A_1} \cap \overline{A_2} \cap \cdots \cap \overline{A_n}\right| = \sum_{S \subseteq \{1,\ldots,n\}} (-1)^{|S|} \left|\bigcap_{i \in S} A_i\right|$$

---

## 2. Ví dụ trực quan

### 2.1 Đếm số không chia hết cho 2, 3, hoặc 5 trong [1, 100]

Gọi:
- $A$: số chia hết cho 2 → $|A| = \lfloor 100/2 \rfloor = 50$
- $B$: số chia hết cho 3 → $|B| = \lfloor 100/3 \rfloor = 33$
- $C$: số chia hết cho 5 → $|C| = \lfloor 100/5 \rfloor = 20$

Giao:
- $|A \cap B| = \lfloor 100/6 \rfloor = 16$
- $|A \cap C| = \lfloor 100/10 \rfloor = 10$
- $|B \cap C| = \lfloor 100/15 \rfloor = 6$
- $|A \cap B \cap C| = \lfloor 100/30 \rfloor = 3$

Áp dụng:

$$|A \cup B \cup C| = 50 + 33 + 20 - 16 - 10 - 6 + 3 = 74$$

Số không chia hết cho 2, 3, 5: $100 - 74 = 26$.

---

## 3. Cài Đặt Tổng Quát

### 3.1 Duyệt tất cả tập con bằng bitmask

Khi số điều kiện $n$ nhỏ (≤ 20), duyệt tất cả $2^n$ tập con:

=== "C++"

    ```cpp
    // Đếm số từ 1 đến limit KHÔNG chia hết cho bất kỳ số nào trong a[]
    long long inclusionExclusion(vector<int>& a, long long limit) {
        int n = a.size();
        long long result = 0;
        for (int mask = 1; mask < (1 << n); mask++) {
            long long lcm = 1;
            int bitCount = 0;
            for (int i = 0; i < n; i++) {
                if (mask & (1 << i)) {
                    bitCount++;
                    lcm = lcm / __gcd(lcm, (long long)a[i]) * a[i];
                    if (lcm > limit) break; // overflow protection
                }
            }
            if (lcm > limit) continue;
            if (bitCount % 2 == 1)
                result += limit / lcm;
            else
                result -= limit / lcm;
        }
        return limit - result;
    }
    ```

=== "Python"

    ```python
    from math import gcd

    def inclusion_exclusion(a, limit):
        n = len(a)
        result = 0
        for mask in range(1, 1 << n):
            lcm = 1
            bit_count = 0
            for i in range(n):
                if mask & (1 << i):
                    bit_count += 1
                    lcm = lcm * a[i] // gcd(lcm, a[i])
                    if lcm > limit:
                        break
            if lcm > limit:
                continue
            if bit_count % 2 == 1:
                result += limit // lcm
            else:
                result -= limit // lcm
        return limit - result
    ```

**Độ phức tạp:** $O(2^n \cdot n)$ cho mỗi truy vấn.

---

## 4. Derangements (Hoán vị không có phần tử cố định)

### 4.1 Bài toán

Đếm số hoán vị của $\{1, 2, \ldots, n\}$ sao cho **không phần tử nào đứng nguyên vị trí**.

### 4.2 Công thức

Gọi $A_i$ là tập hoán vị mà phần tử $i$ đứng nguyên vị trí. Cần đếm phần bù.

$$D(n) = n! \sum_{k=0}^{n} \frac{(-1)^k}{k!}$$

!!! info "Tại sao công thức này đúng?"
    Áp dụng inclusion-exclusion: bắt đầu từ $n!$ (tổng hoán vị), trừ đi các hoán vị có ít nhất 1 phần tử đứng đúng ($\binom{n}{1}(n-1)!$), cộng lại các hoán vị có ít nhất 2 phần tử đứng đúng ($\binom{n}{2}(n-2)!$), ... Sau khi rút gọn ta được công thức trên. Mỗi hệ số $\frac{(-1)^k}{k!}$ tương ứng với việc chọn $k$ phần tử cố định tại chỗ.

Hoặc truy hồi: $D(n) = (n-1)(D(n-1) + D(n-2))$, $D(1) = 0, D(2) = 1$.

=== "C++"

    ```cpp
    long long derangement(int n) {
        if (n == 0) return 1;
        if (n == 1) return 0;
        vector<long long> D(n + 1);
        D[0] = 1; D[1] = 0;
        for (int i = 2; i <= n; i++)
            D[i] = (i - 1) * (D[i-1] + D[i-2]) % MOD;
        return D[n];
    }
    ```

=== "Python"

    ```python
    def derangement(n):
        if n == 0: return 1
        if n == 1: return 0
        D = [0] * (n + 1)
        D[0] = 1
        D[1] = 0
        for i in range(2, n + 1):
            D[i] = (i - 1) * (D[i-1] + D[i-2]) % MOD
        return D[n]
    ```

---

## 5. Đếm hoán vị có phần tử bị cấm

### 5.1 Bài toán

Cho $n$ phần tử, mỗi phần tử $i$ có một tập $B_i$ các vị trí **bị cấm**. Đếm số hoán vị mà phần tử $i$ không đứng ở vị trí nào trong $B_i$.

### 5.2 Giải bằng Inclusion-Exclusion

Với mỗi tập con $S$ của các điều kiện "vi phạm", tính số hoán vị thỏa mãn tất cả vi phạm trong $S$, rồi cộng/trừ theo công thức.

---

## 6. Surjection (Ánh onto)

### 6.1 Bài toán

Đếm số ánh xạ từ tập $n$ phần tử **onto** tập $k$ phần tử (mỗi phần tử trong tập đích phải được ánh tới ít nhất một lần).

### 6.2 Công thức

$$\text{Surj}(n, k) = \sum_{i=0}^{k} (-1)^i \binom{k}{i} (k-i)^n$$

!!! info "Tại sao công thức này đúng?"
    Áp dụng inclusion-exclusion: $(k-i)^n$ là số ánh xạ mà ít nhất $i$ phần tử trong tập đích **không** được ánh tới (chỉ ánh vào $k-i$ phần tử còn lại). $\binom{k}{i}$ là cách chọn $i$ phần tử bị bỏ qua. Dấu $(-1)^i$ là hệ số inclusion-exclusion.

=== "C++"

    ```cpp
    long long surjection(int n, int k) {
        long long res = 0;
        for (int i = 0; i <= k; i++) {
            long long term = C(k, i) * powerMod(k - i, n, MOD) % MOD;
            if (i % 2 == 0)
                res = (res + term) % MOD;
            else
                res = (res - term + MOD) % MOD;
        }
        return res;
    }
    ```

---

## 7. Grid Paths với vật cản

### 7.1 Bài toán

Đếm số đường đi từ $(0,0)$ đến $(n,m)$ trên lưới, không đi qua các ô bị cấm.

### 7.2 Sắp xếp và Inclusion-Exclusion

Sắp xếp các ô cấm theo thứ tự. Với mỗi ô cấm $i$, đếm số đường đi từ gốc đến $i$ mà không qua ô cấm nào khác, rồi trừ đi phần đóng góp vào đích.

=== "C++"

    ```cpp
    // Đếm đường đi từ (0,0) đến (n,m) không qua các ô cấm
    long long gridPathsWithObstacles(int n, int m, vector<pair<int,int>>& banned) {
        // Sắp xếp theo (x, y)
        sort(banned.begin(), banned.end());
        int k = banned.size();
        vector<long long> dp(k);

        for (int i = 0; i < k; i++) {
            dp[i] = C(banned[i].first + banned[i].second, banned[i].first);
            for (int j = 0; j < i; j++) {
                if (banned[j].first <= banned[i].first && banned[j].second <= banned[i].second) {
                    long long ways = dp[j] * C(
                        banned[i].first - banned[j].first + banned[i].second - banned[j].second,
                        banned[i].first - banned[j].first
                    ) % MOD;
                    dp[i] = (dp[i] - ways + MOD) % MOD;
                }
            }
        }

        long long total = C(n + m, n);
        for (int i = 0; i < k; i++) {
            if (banned[i].first <= n && banned[i].second <= m) {
                long long ways = dp[i] * C(
                    n - banned[i].first + m - banned[i].second,
                    n - banned[i].first
                ) % MOD;
                total = (total - ways + MOD) % MOD;
            }
        }
        return total;
    }
    ```

---

## 8. Bài tập luyện tập

### Bài 1: Đếm số không chia hết

**Đề bài:** Cho số nguyên $n$ và $k$ số nguyên $a_1, a_2, \ldots, a_k$. Đếm bao nhiêu số từ $1$ đến $n$ **không chia hết** cho bất kỳ $a_i$ nào.

**Input:**
- Dòng 1: 2 số nguyên $n, k$ $(1 \leq n \leq 10^9, 1 \leq k \leq 20)$
- Dòng 2: $k$ số nguyên $a_i$ $(2 \leq a_i \leq 10^9)$

**Output:** Số lượng số từ 1 đến $n$ không chia hết cho bất kỳ $a_i$.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `10 2`<br>`2 3` | `3` |
| `100 3`<br>`2 3 5` | `26` |

**Giải thích (test 1):** Số từ 1 đến 10 chia hết cho 2 hoặc 3: {2,3,4,6,8,9,10} = 7 số. Đáp án = 10 - 7 = 3.

??? tip "Lời giải"
    Dùng inclusion-exclusion trên $k$ số. Duyệt $2^k$ tập con, tính LCM, cộng/trừ.
    
    === "C++"
    
        ```cpp
        #include <bits/stdc++.h>
        using namespace std;
    
        long long solve(vector<int>& a, long long n) {
            int k = a.size();
            long long result = 0;
            for (int mask = 1; mask < (1 << k); mask++) {
                long long lcm = 1;
                int bits = 0;
                for (int i = 0; i < k; i++) {
                    if (mask & (1 << i)) {
                        bits++;
                        lcm = lcm / __gcd(lcm, (long long)a[i]) * a[i];
                        if (lcm > n) break;
                    }
                }
                if (lcm > n) continue;
                if (bits % 2 == 1) result += n / lcm;
                else result -= n / lcm;
            }
            return n - result;
        }
    
        int main() {
            int n, k; cin >> n >> k;
            vector<int> a(k);
            for (int i = 0; i < k; i++) cin >> a[i];
            cout << solve(a, n) << "\n";
        }
        ```
---

### Bài 2: Christmas Party (Derangement)

**Đề bài:** Có $n$ người và $n$ mũ. Mỗi người có đúng 1 mũ yêu cầu. Đếm số cách phân mũ sao cho **không ai nhận đúng mũ mình yêu cầu**.

**Input:** Số nguyên $n$ $(1 \leq n \leq 10^6)$

**Output:** Số derangements modulo $10^9 + 7$.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `3` | `2` |
| `4` | `9` |

**Giải thích (test 1):** 3 người {1,2,3}, mũ {1,2,3}. Derangements: {2,3,1} và {3,1,2}.

??? tip "Lời giải"
    $D(n) = (n-1)(D(n-1) + D(n-2))$ với $D(1) = 0, D(2) = 1$.
    
    === "C++"
    
        ```cpp
        #include <bits/stdc++.h>
        using namespace std;
        const long long MOD = 1e9 + 7;
    
        int main() {
            int n; cin >> n;
            if (n == 1) { cout << 0 << "\n"; return 0; }
            long long d1 = 0, d2 = 1;
            for (int i = 3; i <= n; i++) {
                long long d = (i - 1) * (d2 + d1) % MOD;
                d1 = d2; d2 = d;
            }
            cout << d2 << "\n";
        }
        ```
---

### Bài 3: Đếm surjection

**Đề bài:** Cho 2 số nguyên $n$ và $k$. Đếm số ánh xạ từ tập $\{1,2,\ldots,n\}$ **onto** tập $\{1,2,\ldots,k\}$ (mỗi phần tử trong tập đích được ánh tới ít nhất 1 lần).

**Input:** 2 số nguyên $n, k$ $(1 \leq k \leq n \leq 10^6)$

**Output:** Kết quả modulo $10^9 + 7$.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `3 2` | `6` |
| `4 3` | `36` |

**Giải thích (test 1):** Ánh xạ từ {1,2,3} onto {1,2}: mỗi phần tử {1,2} phải xuất hiện ít nhất 1 lần. Có $2^3 = 8$ ánh xạ tổng, trừ 2 ánh xạ chỉ tới 1 phần tử → $8 - 2 = 6$.

??? tip "Lời giải"
    $\text{Surj}(n,k) = \sum_{i=0}^{k} (-1)^i \binom{k}{i} (k-i)^n$.
    
    === "C++"
    
        ```cpp
        #include <bits/stdc++.h>
        using namespace std;
        const long long MOD = 1e9 + 7;
    
        long long powerMod(long long a, long long b, long long mod) {
            long long res = 1; a %= mod;
            while (b > 0) {
                if (b & 1) res = res * a % mod;
                a = a * a % mod; b >>= 1;
            }
            return res;
        }
    
        int main() {
            long long n, k; cin >> n >> k;
            // Precompute factorials
            vector<long long> fact(k + 1), inv_fact(k + 1);
            fact[0] = 1;
            for (int i = 1; i <= k; i++) fact[i] = fact[i-1] * i % MOD;
            inv_fact[k] = powerMod(fact[k], MOD - 2, MOD);
            for (int i = k - 1; i >= 0; i--) inv_fact[i] = inv_fact[i + 1] * (i + 1) % MOD;
    
            long long res = 0;
            for (int i = 0; i <= k; i++) {
                long long term = fact[k] * inv_fact[i] % MOD * inv_fact[k - i] % MOD;
                term = term * powerMod(k - i, n, MOD) % MOD;
                if (i % 2 == 0) res = (res + term) % MOD;
                else res = (res - term + MOD) % MOD;
            }
            cout << res << "\n";
        }
        ```
---

### Bài 4: Grid paths có vật cản

**Đề bài:** Lưới $n \times m$ có $k$ ô bị cấm. Đếm số đường đi từ $(1,1)$ đến $(n,m)$ chỉ đi phải hoặc xuống, không qua ô cấm.

**Input:**
- Dòng 1: 3 số nguyên $n, m, k$ $(1 \leq n, m \leq 10^5, 0 \leq k \leq 2000)$
- $k$ dòng tiếp: 2 số nguyên $r, c$ — ô bị cấm tại hàng $r$, cột $c$

**Output:** Số đường đi modulo $10^9 + 7$.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `3 3 1`<br>`2 2` | `2` |

**Giải thích:** Lưới 3x3, ô (2,2) bị cấm. Đường đi hợp lệ: $(1,1) \to (1,2) \to (1,3) \to (2,3) \to (3,3)$ và $(1,1) \to (2,1) \to (3,1) \to (3,2) \to (3,3)$.

??? tip "Lời giải"
    Sắp xếp ô cấm, dùng DP kết hợp inclusion-exclusion.