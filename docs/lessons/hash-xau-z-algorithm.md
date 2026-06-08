# Bài 14: Hash Xâu & Z-Algorithm

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** VNOI Wiki - Hash, Z-function

---

## 1. Hash Xâu

### Bản chất vấn đề

Cho xâu $S$ độ dài $N$, cần so sánh nhanh hai xâu con bất kỳ hoặc tìm tất cả vị trí xuất hiện của mẫu $P$ (độ dài $M$) trong $S$.

So sánh trực tiếp từng ký tự mất $O(NM)$ — quá chậm khi $N, M$ lớn.

### Tư duy cốt lõi

**Polynomial Hash** chuyển mỗi xâu thành một số nguyên:

$$\text{hash}(S) = \sum_{i=0}^{n-1} (S[i] - \texttt{'a'} + 1) \cdot B^{n-1-i} \pmod{M}$$

Với $B$ là cơ số (thường dùng 31 hoặc 131) và $M$ là số nguyên tố lớn (thường $10^9 + 7$).

**Hash tiền tố** cho phép tính hash của bất kỳ đoạn con $S[l..r]$ trong $O(1)$:

$$\text{hash}(S[l..r]) = H[r+1] - H[l] \cdot B^{r-l+1} \pmod{M}$$

trong đó $H[i]$ là hash của $i$ ký tự đầu tiên.

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    const long long MOD = 1e9 + 7;
    const long long BASE = 31;

    long long computeHash(string s) {
        long long h = 0;
        for (char c : s)
            h = (h * BASE + (c - 'a' + 1)) % MOD;
        return h;
    }

    vector<int> rabinKarp(string text, string pattern) {
        int n = text.size(), m = pattern.size();
        vector<int> positions;

        long long hashP = computeHash(pattern);

        vector<long long> power(n + 1);
        power[0] = 1;
        for (int i = 1; i <= n; i++)
            power[i] = (power[i - 1] * BASE) % MOD;

        vector<long long> hashT(n + 1);
        for (int i = 0; i < n; i++)
            hashT[i + 1] = (hashT[i] * BASE + (text[i] - 'a' + 1)) % MOD;

        for (int i = 0; i <= n - m; i++) {
            long long curHash = (hashT[i + m] - hashT[i] * power[m] % MOD + MOD) % MOD;
            if (curHash == hashP)
                positions.push_back(i);
        }
        return positions;
    }

    int main() {
        string text = "aabcabaab";
        string pattern = "ab";
        auto pos = rabinKarp(text, pattern);
        for (int p : pos) cout << p << " ";
        // Kết quả: 1 4 7
    }
    ```

=== "Python"

    ```python
    def rabin_karp(text, pattern):
        n, m = len(text), len(pattern)
        BASE, MOD = 31, 10**9 + 7

        hash_p = 0
        for c in pattern:
            hash_p = (hash_p * BASE + ord(c) - ord('a') + 1) % MOD

        power = [1] * (n + 1)
        for i in range(1, n + 1):
            power[i] = (power[i - 1] * BASE) % MOD

        hash_t = [0] * (n + 1)
        for i in range(n):
            hash_t[i + 1] = (hash_t[i] * BASE + ord(text[i]) - ord('a') + 1) % MOD

        positions = []
        for i in range(n - m + 1):
            cur_hash = (hash_t[i + m] - hash_t[i] * power[m] % MOD + MOD) % MOD
            if cur_hash == hash_p:
                positions.append(i)
        return positions

    print(rabin_karp("aabcabaab", "ab"))
    # Kết quả: [1, 4, 7]
    ```

### Phân tích tính đúng đắn

**Hash tiền tố hoạt động như thế nào?**

Tương tự prefix sum, $H[i]$ lưu hash của $i$ ký tự đầu. Khi cần hash đoạn $S[l..r]$, ta "trừ đi" phần tiền tố $S[0..l-1]$ sau khi nhân lên để cân bậc.

Ví dụ với $S = \texttt{"abcab"}$, $B = 31$, tính hash đoạn $[2, 4] = \texttt{"cab"}$:

| $i$ | 0 | 1 | 2 | 3 | 4 | 5 |
|-----|---|---|---|---|---|---|
| $H[i]$ | $0$ | $H(\texttt{"a"})$ | $H(\texttt{"ab"})$ | $H(\texttt{"abc"})$ | $H(\texttt{"abca"})$ | $H(\texttt{"abcab"})$ |

$$\text{hash}(\texttt{"cab"}) = H[5] - H[2] \cdot B^3 \pmod{M}$$

Phần $H[2] \cdot B^3$ chính là hash của $\texttt{"ab"}$ được "dịch lên" bậc cao để khi trừ đi sẽ loại bỏ đúng phần đóng góp của $S[0..1]$ trong $H[5]$.

**Tại sao có thể collision?**

Với modulo $M$, chỉ có tối đa $M$ giá trị hash khác nhau. Theo [Birthday Paradox](https://en.wikipedia.org/wiki/Birthday_problem), khi có $n$ xâu, xác suất ít nhất một cặp trùng hash là:

$$P \approx 1 - e^{-n^2 / (2M)}$$

| Số xâu ($n$) | $M = 10^9+7$ | $M = 10^9+9$ | $2$ hash |
|--------------|---------------|---------------|----------|
| $10^3$ | $\sim 0.00005\%$ | $\sim 0.00005\%$ | $\sim 0\%$ |
| $10^5$ | $\sim 0.5\%$ | $\sim 0.5\%$ | $\sim 0\%$ |
| $10^6$ | $\sim 39\%$ | $\sim 39\%$ | $\sim 5 \times 10^{-11}\%$ |
| $10^7$ | $\sim 99.99\%$ | $\sim 99.99\%$ | $\sim 5 \times 10^{-6}\%$ |

Với $1$ hash, chỉ cần $\sim 44{,}721$ xâu ($\approx \sqrt{2 \times 10^9}$) là xác suất collision đã đạt $\sim 50\%$.

**Giải pháp: Double Hash** — dùng $2$ modulo khác nhau. Chỉ khi **cả hai** hash đều khớp mới kết luận xâu trùng. Không gian giá trị khi đó là $10^9 \times 10^9 = 10^{18}$, xác suất collision gần bằng $0$.

=== "C++"

    ```cpp
    const long long MOD1 = 1e9 + 7, MOD2 = 1e9 + 9;
    const long long BASE1 = 31, BASE2 = 37;

    struct DoubleHash {
        long long h1, h2;
        DoubleHash(long long a = 0, long long b = 0) : h1(a), h2(b) {}
        bool operator==(const DoubleHash& o) const {
            return h1 == o.h1 && h2 == o.h2;
        }
    };

    DoubleHash computeDoubleHash(string s) {
        long long h1 = 0, h2 = 0;
        for (char c : s) {
            h1 = (h1 * BASE1 + (c - 'a' + 1)) % MOD1;
            h2 = (h2 * BASE2 + (c - 'a' + 1)) % MOD2;
        }
        return DoubleHash(h1, h2);
    }

    DoubleHash computePrefixDoubleHash(string s, int l, int r,
                                        vector<long long>& p1, vector<long long>& p2,
                                        vector<long long>& h1, vector<long long>& h2) {
        long long a = (h1[r + 1] - h1[l] * p1[r - l + 1] % MOD1 + MOD1) % MOD1;
        long long b = (h2[r + 1] - h2[l] * p2[r - l + 1] % MOD2 + MOD2) % MOD2;
        return DoubleHash(a, b);
    }
    ```

=== "Python"

    ```python
    MOD1, MOD2 = 10**9 + 7, 10**9 + 9
    BASE1, BASE2 = 31, 37

    def compute_double_hash(s):
        h1, h2 = 0, 0
        for c in s:
            h1 = (h1 * BASE1 + ord(c) - ord('a') + 1) % MOD1
            h2 = (h2 * BASE2 + ord(c) - ord('a') + 1) % MOD2
        return (h1, h2)
    ```

### Đánh giá độ phức tạp

- **Thời gian:** $O(N + M)$ — tính trước hash tiền tố và lũy thừa $B$ trong $O(N)$, mỗi đoạn con kiểm tra $O(1)$
- **Không gian:** $O(N)$ — mảng hash tiền tố và lũy thừa
- **Double Hash:** thời gian và không gian gấp đôi, vẫn $O(N + M)$

---

## 2. Z-Algorithm

### Bản chất vấn đề

Tính mảng $Z$ cho xâu $S$ độ dài $N$, trong đó $Z[i]$ là độ dài đoạn con dài nhất bắt đầu tại vị trí $i$ trùng với tiền tố của $S$.

$$Z[i] = \max\{k : S[0..k-1] = S[i..i+k-1]\}$$

Khi kết hợp với ký tự phân tách, Z-function giải bài toán tìm xâu mẫu trong $O(N + M)$.

### Tư duy cốt lõi

**Cài đặt trực tiếp** (dễ hiểu, $O(N^2)$ worst-case):

=== "C++"

    ```cpp
    vector<int> z_function_naive(string s) {
        int n = s.length();
        vector<int> z(n);
        for (int i = 1; i < n; i++)
            while (i + z[i] < n && s[z[i]] == s[i + z[i]])
                z[i]++;
        return z;
    }
    ```

=== "Python"

    ```python
    def z_function_naive(s):
        n = len(s)
        z = [0] * n
        for i in range(1, n):
            while i + z[i] < n and s[z[i]] == s[i + z[i]]:
                z[i] += 1
        return z
    ```

**Tối ưu hóa:** Duy trì vùng $[l, r]$ là vùng khớp xa nhất bên phải đã tìm được. Nếu $i \leq r$, ta có thể reuse kết quả đã tính.

=== "C++"

    ```cpp
    vector<int> z_function(string s) {
        int n = s.length();
        vector<int> z(n);
        for (int i = 1, l = 0, r = 0; i < n; i++) {
            if (i <= r)
                z[i] = min(r - i + 1, z[i - l]);
            while (i + z[i] < n && s[z[i]] == s[i + z[i]])
                z[i]++;
            if (i + z[i] - 1 > r) {
                l = i;
                r = i + z[i] - 1;
            }
        }
        return z;
    }

    vector<int> zSearch(string text, string pattern) {
        string combined = pattern + "$" + text;
        vector<int> z = z_function(combined);
        int m = pattern.length();
        vector<int> positions;
        for (int i = m + 1; i < (int)combined.length(); i++)
            if (z[i] == m)
                positions.push_back(i - m - 1);
        return positions;
    }

    int main() {
        string text = "aabcabaab";
        string pattern = "ab";
        auto pos = zSearch(text, pattern);
        for (int p : pos) cout << p << " ";
        // Kết quả: 1 4 7
    }
    ```

=== "Python"

    ```python
    def z_function(s):
        n = len(s)
        z = [0] * n
        l, r = 0, 0
        for i in range(1, n):
            if i <= r:
                z[i] = min(r - i + 1, z[i - l])
            while i + z[i] < n and s[z[i]] == s[i + z[i]]:
                z[i] += 1
            if i + z[i] - 1 > r:
                l, r = i, i + z[i] - 1
        return z

    def z_search(text, pattern):
        combined = pattern + "$" + text
        z = z_function(combined)
        m = len(pattern)
        positions = []
        for i in range(m + 1, len(combined)):
            if z[i] == m:
                positions.append(i - m - 1)
        return positions

    print(z_search("aabcabaab", "ab"))
    # Kết quả: [1, 4, 7]
    ```

### Phân tích tính đúng đắn

**Minh họa tính mảng Z** với $S = \texttt{"aabaaab"}$ (độ dài $7$):

| $i$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|-----|---|---|---|---|---|---|---|
| $S[i]$ | `a` | `a` | `b` | `a` | `a` | `a` | `b` |
| $Z[i]$ | — | ? | ? | ? | ? | ? | ? |

Khởi tạo: $l = 0,\ r = 0$. Ta bỏ qua $Z[0]$ (không sử dụng).

**Bước 1: $i = 1$**

$i = 1$ nằm ngoài vùng $[l, r] = [0, 0]$ → so sánh từ đầu.

So sánh: $S[0] = \texttt{'a'}$ vs $S[1] = \texttt{'a'}$ → khớp, $S[1] = \texttt{'a'}$ vs $S[2] = \texttt{'b'}$ → không khớp.

$Z[1] = 1$. Cập nhật: $l = 1,\ r = 1$.

| $i$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|-----|---|---|---|---|---|---|---|
| $Z[i]$ | — | $1$ | ? | ? | ? | ? | ? |

**Bước 2: $i = 2$**

$i = 2$ nằm ngoài vùng $[l, r] = [1, 1]$ → so sánh từ đầu.

So sánh: $S[0] = \texttt{'a'}$ vs $S[2] = \texttt{'b'}$ → không khớp.

$Z[2] = 0$. Không cập nhật $l, r$.

| $i$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|-----|---|---|---|---|---|---|---|
| $Z[i]$ | — | $1$ | $0$ | ? | ? | ? | ? |

**Bước 3: $i = 3$**

$i = 3$ nằm ngoài vùng $[l, r] = [1, 1]$ → so sánh từ đầu.

So sánh: $S[0] = \texttt{'a'}$ vs $S[3] = \texttt{'a'}$ → khớp, $S[1] = \texttt{'a'}$ vs $S[4] = \texttt{'a'}$ → khớp, $S[2] = \texttt{'b'}$ vs $S[5] = \texttt{'a'}$ → không khớp.

$Z[3] = 2$. Cập nhật: $l = 3,\ r = 4$.

| $i$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|-----|---|---|---|---|---|---|---|
| $Z[i]$ | — | $1$ | $0$ | $2$ | ? | ? | ? |

**Bước 4: $i = 4$**

$i = 4$ nằm trong vùng $[l, r] = [3, 4]$ → reuse.

$Z[i - l] = Z[4 - 3] = Z[1] = 1$. Đặt $Z[4] = \min(r - i + 1,\ Z[i - l]) = \min(1, 1) = 1$.

So sánh tiếp: $S[1] = \texttt{'a'}$ vs $S[5] = \texttt{'a'}$ → khớp, $S[2] = \texttt{'b'}$ vs $S[6] = \texttt{'b'}$ → khớp.

$Z[4] = 3$. Cập nhật: $l = 4,\ r = 6$.

| $i$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|-----|---|---|---|---|---|---|---|
| $Z[i]$ | — | $1$ | $0$ | $2$ | $3$ | ? | ? |

**Bước 5: $i = 5$**

$i = 5$ nằm trong vùng $[l, r] = [4, 6]$ → reuse.

$Z[i - l] = Z[5 - 4] = Z[1] = 1$. Đặt $Z[5] = \min(6 - 5 + 1,\ 1) = \min(2, 1) = 1$.

So sánh tiếp: $S[1] = \texttt{'a'}$ vs $S[6] = \texttt{'b'}$ → không khớp.

$Z[5] = 1$. Không cập nhật $l, r$.

| $i$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|-----|---|---|---|---|---|---|---|
| $Z[i]$ | — | $1$ | $0$ | $2$ | $3$ | $1$ | ? |

**Bước 6: $i = 6$**

$i = 6$ nằm trong vùng $[l, r] = [4, 6]$ → reuse.

$Z[i - l] = Z[6 - 4] = Z[2] = 0$. Đặt $Z[6] = \min(6 - 6 + 1,\ 0) = \min(1, 0) = 0$.

So sánh trực tiếp: $S[0] = \texttt{'a'}$ vs $S[6] = \texttt{'b'}$ → không khớp.

$Z[6] = 0$.

**Kết quả:**

| $i$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|-----|---|---|---|---|---|---|---|
| $S[i]$ | `a` | `a` | `b` | `a` | `a` | `a` | `b` |
| $Z[i]$ | — | $1$ | $0$ | $2$ | $3$ | $1$ | $0$ |

**Tại sao reuse đúng?**

Vì $S[l..r]$ đã khớp với $S[0..r-l]$, và $i$ nằm trong $[l, r]$, nên:

$$S[i..i+Z[i-l]-1] = S[l..l+Z[i-l]-1] = S[0..Z[i-l]-1]$$

Do đó $Z[i] \geq Z[i-l]$, nhưng không vượt quá $r - i + 1$ (phần đã biết khớp).

### Đánh giá độ phức tạp

- **Thời gian:** $O(N)$ cho Z-function, $O(N + M)$ cho tìm kiếm mẫu. Mỗi lần so sánh ký tự, $r$ tăng ít nhất $1$, và $r$ chỉ tăng, nên tổng số phép so sánh tối đa $2N$.
- **Không gian:** $O(N + M)$ — mảng $Z$ trên xâu kết hợp.

**Tìm kiếm xâu mẫu bằng Z-Algorithm:**

Nối xâu thành $P + \texttt{"\$"} + T$, ký tự $\texttt{"\$"}$ không xuất hiện trong $P$ hay $T$. Tính mảng $Z$ trên xâu kết hợp. Nếu $Z[i] = |P|$ thì $P$ xuất hiện trong $T$ tại vị trí $i - |P| - 1$.

---

## 3. So sánh các thuật toán tìm xâu mẫu

| Thuật toán | Độ phức tạp | Ưu điểm | Nhược điểm |
|-----------|-------------|---------|------------|
| Brute-force | $O(NM)$ | Đơn giản nhất | Chậm với dữ liệu lớn |
| KMP | $O(N + M)$ | Ổn định, không dùng modulo | Khó hiểu hơn |
| Hash (Rabin-Karp) | $O(N + M)$ | Linh hoạt, dễ code | Có thể collision |
| Z-Algorithm | $O(N + M)$ | Không cần hash, không lo collision | Cần ký tự phân tách |

---

## 4. Lưu ý và bẫy hay gặp

### Hash collision — Sai kết quả

```cpp
// SAI: Chỉ dùng 1 hash → có thể bị hack
if (hash1 == hash2)  // Có thể collision!

// ĐÚNG: Dùng 2 hash
if (hash1a == hash2a && hash1b == hash2b)  // An toàn
```

### Quên $+$ MOD khi trừ

```cpp
// SAI: (a - b) % MOD có thể âm nếu a < b
long long curHash = (hashT[i + m] - hashT[i] * power[m]) % MOD;

// ĐÚNG: Luôn + MOD rồi % MOD
long long curHash = (hashT[i + m] - hashT[i] * power[m] % MOD + MOD) % MOD;
```

### Chọn BASE không tốt

```cpp
// SAI: BASE = 1 → hash = tổng mã ASCII → collision cao!
// SAI: BASE = 256 → overflow nếu không modulo

// ĐÚNG: BASE = 31 hoặc 131 (số nguyên tố, không quá nhỏ)
const long long BASE = 31;
```

### Quên modulo khi nhân

```cpp
// SAI: a * a có thể tràn long long trước khi modulo
result = (result * a) % MOD;

// ĐÚNG: Dùng __int128 hoặc cast
result = (__int128)result * a % MOD;
```

### Z-Algorithm: Quên ký tự phân tách

```cpp
// SAI: Không có "$" → Z[i] có thể match sai
string combined = pattern + text;

// ĐÚNG: Phải có ký tự phân tách không xuất hiện trong pattern/text
string combined = pattern + "$" + text;
```

### Hash: Ký tự `'a'` có giá trị 0 hay 1?

```cpp
// SAI: 'a' = 0 → hash("a") = hash("aa") = hash("aaa") = ...
hash = (hash * BASE + (c - 'a')) % MOD;

// ĐÚNG: 'a' = 1 để tránh mất ký tự đầu
hash = (hash * BASE + (c - 'a' + 1)) % MOD;
```

---

## Bài tập luyện tập

### Cơ bản

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - String Matching](https://cses.fi/problemset/task/1753) | CSES | ⭐⭐ | Tìm xâu bằng Hash/KMP |
| [CSES - Finding Borders](https://cses.fi/problemset/task/1732) | CSES | ⭐⭐ | Prefix function / Z-function |
| [SPOJ - NHAY](https://www.spoj.com/problems/NHAY/) | SPOJ | ⭐⭐ | KMP/Hash |
| [VNOJ - SUBSTR](https://oj.vnoi.info/problem/substr) | VNOJ | ⭐⭐ | Hash/KMP |
| [VNOJ - NKTEXT](https://oj.vnoi.info/problem/nktext) | VNOJ | ⭐⭐ | Hash xâu |

### Trung bình

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Counting Patterns](https://cses.fi/problemset/task/1733) | CSES | ⭐⭐⭐ | Hash + Set/Map |
| [CSES - Pattern Positions](https://cses.fi/problemset/task/1734) | CSES | ⭐⭐⭐ | Hash + Binary Search |
| [CF - MUH and Cube Walls](https://codeforces.com/problemset/problem/471/D) | CF | ⭐⭐⭐ | KMP nâng cao |
| [VNOJ - PALINY](https://oj.vnoi.info/problem/paliny) | VNOJ | ⭐⭐⭐ | Palindrome + Hash |
| [CF - Good Substrings](https://codeforces.com/problemset/problem/271/D) | CF | ⭐⭐⭐ | Hash + Set đếm substring |
| [CF - Password](https://codeforces.com/problemset/problem/126/B) | CF | ⭐⭐⭐ | Z-function + Hash |

### Nâng cao

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CF - Palindrome Degree](https://codeforces.com/problemset/problem/7/D) | CF | ⭐⭐⭐⭐ | Hash palindrome |
| [CF - String Compression](https://codeforces.com/problemset/problem/827/C) | CF | ⭐⭐⭐⭐ | Hash + KMP |
| [VNOJ - QUERYSTR](https://oj.vnoi.info/problem/querystr) | VNOJ | ⭐⭐⭐⭐ | Hash + Queries |
| [CF - Occurrences](https://codeforces.com/problemset/problem/633/C) | CF | ⭐⭐⭐⭐ | Hash + DP |
| [SPOJ - ADAPHONE](https://www.spoj.com/problems/ADAPHONE/) | SPOJ | ⭐⭐⭐⭐ | Hash nâng cao |

---

## Bài viết liên quan

- [Bài 9: KMP & Z-Algorithm](kmp-tim-xau.md)
- [Bài 16: Hash Table](hash-table.md)

## Tài liệu tham khảo

- [VNOI Wiki - Hash](https://wiki.vnoi.info/algo/string/hash)
- [VNOI Wiki - Z-function](https://wiki.vnoi.info/algo/string/z-algo)
- [CP-Algorithms - String Hashing](https://cp-algorithms.com/string/string-hashing.html)
- [CP-Algorithms - Z-function](https://cp-algorithms.com/string/z-function.html)
- [GeeksforGeeks - Rabin-Karp Algorithm](https://www.geeksforgeeks.org/dsa/rabin-karp-algorithm-for-pattern-searching/)
- [YouTube - String Hashing (Errichto)](https://www.youtube.com/watch?v=6GFMKq5vKWM)

**Bài tiếp theo:** [Deque & Sliding Window →](deque-sliding-window.md)
