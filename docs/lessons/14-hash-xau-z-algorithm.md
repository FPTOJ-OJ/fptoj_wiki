# Bài 14: Hash Xâu & Z-Algorithm

> **Tác giả:** Hà Trí Kiên<br>
> **Nội dung tham khảo từ:** VNOI Wiki - Hash, Z-function

## 1. Hash Xâu - So Sánh Xâu Siêu Nhanh!

### Ẩn dụ: Mã vạch sản phẩm

Mỗi sản phẩm có mã vạch riêng. Muốn biết 2 sản phẩm có giống nhau không? Chỉ cần quét mã vạch!

**Hash xâu** cũng vậy: biến mỗi xâu thành 1 con số. So sánh 2 xâu = so sánh 2 con số!

### Ý tưởng

Chuyển xâu sang số hệ cơ số `base` (thường là 31), lấy modulo cho số nguyên tố lớn (thường là 10⁹+7).

```
hash("abc") = (1 × 31² + 2 × 31¹ + 3 × 31⁰) % MOD
```
=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    
    const long long MOD = 1e9 + 7;
    const long long BASE = 31;
    
    // Tính hash của xâu - O(N)
    long long computeHash(string s) {
        long long hash = 0;
        for (char c : s)
            hash = (hash * BASE + (c - 'a' + 1)) % MOD;
        return hash;
    }
    
    // Tìm xâu mẫu trong văn bản - O(N + M)
    vector<int> rabinKarp(string text, string pattern) {
        int n = text.size(), m = pattern.size();
        vector<int> positions;
        
        // Tính hash của mẫu
        long long hashP = computeHash(pattern);
        
        // Tính lũy thừa BASE
        vector<long long> power(n + 1);
        power[0] = 1;
        for (int i = 1; i <= n; i++)
            power[i] = (power[i-1] * BASE) % MOD;
        
        // Tính hash tiền tố của văn bản
        vector<long long> hashT(n + 1);
        for (int i = 0; i < n; i++)
            hashT[i + 1] = (hashT[i] * BASE + (text[i] - 'a' + 1)) % MOD;
        
        // Tìm kiếm
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
        for (int p : pos) cout << p << " ";  // 2 5 7
    }
    ```

=== "Python"

    ```python
    def rabin_karp(text, pattern):
        n, m = len(text), len(pattern)
        BASE, MOD = 31, 10**9 + 7
        
        # Hash của mẫu
        hash_p = 0
        for c in pattern:
            hash_p = (hash_p * BASE + ord(c) - ord('a') + 1) % MOD
        
        # Lũy thừa BASE
        power = [1] * (n + 1)
        for i in range(1, n + 1):
            power[i] = (power[i-1] * BASE) % MOD
        
        # Hash tiền tố văn bản
        hash_t = [0] * (n + 1)
        for i in range(n):
            hash_t[i+1] = (hash_t[i] * BASE + ord(text[i]) - ord('a') + 1) % MOD
        
        # Tìm kiếm
        positions = []
        for i in range(n - m + 1):
            cur_hash = (hash_t[i+m] - hash_t[i] * power[m] % MOD + MOD) % MOD
            if cur_hash == hash_p:
                positions.append(i)
        return positions
    ```

---

## 2. Z-Algorithm - Tìm Tiền Tố Chung Lớn Nhất!

### Ý tưởng

Z[i] = độ dài tiền tố chung lớn nhất của xâu S và xâu con bắt đầu từ vị trí i.

```
S = "aabaaab"
Z = [0, 1, 0, 2, 3, 2, 0]

Z[1]=1: "a" khớp "a..."
Z[3]=2: "aa" khớp "aa..."
Z[4]=3: "aab" khớp "aab..."
```

### Ví dụ chi tiết từng bước

Cho xâu `S = "aabaaab"` (độ dài 7), ta tính mảng Z:

```
Index:    0  1  2  3  4  5  6
S:        a  a  b  a  a  a  b
Z:        -  ?  ?  ?  ?  ?  ?

Khởi tạo: l = 0, r = 0
Z[0] không xét (thường đặt = 0)
```

**Bước 1: i = 1**

```
i=1 nằm ngoài vùng [l,r]=[0,0] → so sánh trực tiếp từ đầu:
  S[0]='a' vs S[1]='a' → khớp, Z[1]++
  S[1]='a' vs S[2]='b' → không khớp, dừng
Z[1] = 1
Cập nhật: l=1, r=1 (vì i+Z[i]-1 = 1+1-1 = 1)

S:     a  a  b  a  a  a  b
Z:     -  1  ?  ?  ?  ?  ?
         [l,r]
```

**Bước 2: i = 2**

```
i=2 nằm ngoài vùng [l,r]=[1,1] → so sánh trực tiếp:
  S[0]='a' vs S[2]='b' → không khớp, dừng
Z[2] = 0
Không cập nhật l, r (vì i+Z[i]-1 = 1, không > r=1)

S:     a  a  b  a  a  a  b
Z:     -  1  0  ?  ?  ?  ?
```

**Bước 3: i = 3**

```
i=3 nằm ngoài vùng [l,r]=[1,1] → so sánh trực tiếp:
  S[0]='a' vs S[3]='a' → khớp, Z[3]++
  S[1]='a' vs S[4]='a' → khớp, Z[3]++
  S[2]='b' vs S[5]='a' → không khớp, dừng
Z[3] = 2
Cập nhật: l=3, r=4 (vì 3+2-1=4)

S:     a  a  b  a  a  a  b
Z:     -  1  0  2  ?  ?  ?
               [l..r]
```

**Bước 4: i = 4**

```
i=4 nằm trong vùng [l,r]=[3,4]
  Z[i-l] = Z[4-3] = Z[1] = 1
  Z[4] = min(r-i+1, Z[i-l]) = min(4-4+1, 1) = min(1, 1) = 1
  → Bắt đầu so sánh thêm từ vị trí 1 (vì Z[4]=1):
  S[1]='a' vs S[5]='a' → khớp, Z[4]++
  S[2]='b' vs S[6]='b' → khớp, Z[4]++
  S[3]='a' vs S[7] → hết xâu, dừng
Z[4] = 3
Cập nhật: l=4, r=6 (vì 4+3-1=6)

S:     a  a  b  a  a  a  b
Z:     -  1  0  2  3  ?  ?
                  [l.....r]
```

**Bước 5: i = 5**

```
i=5 nằm trong vùng [l,r]=[4,6]
  Z[i-l] = Z[5-4] = Z[1] = 1
  Z[5] = min(r-i+1, Z[i-l]) = min(6-5+1, 1) = min(2, 1) = 1
  → Bắt đầu so sánh thêm từ vị trí Z[5]=1:
  S[1]='a' vs S[6]='b' → không khớp, dừng
Z[5] = 1
Không cập nhật l, r (5+1-1=5, không > r=6)

S:     a  a  b  a  a  a  b
Z:     -  1  0  2  3  1  ?
```

**Bước 6: i = 6**

```
i=6 nằm trong vùng [l,r]=[4,6]
  Z[i-l] = Z[6-4] = Z[2] = 0
  Z[6] = min(r-i+1, Z[i-l]) = min(6-6+1, 0) = min(1, 0) = 0
  → So sánh trực tiếp:
  S[0]='a' vs S[6]='b' → không khớp, dừng
Z[6] = 0
```

**Kết quả cuối cùng:**

```
S:     a  a  b  a  a  a  b
Z:     -  1  0  2  3  1  0
```

### Giải thích thuật toán

Thuật toán Z-function hoạt động bằng cách duy trì vùng `[l, r]` là vùng khớp xa nhất bên phải đã tìm được:

- **Nếu `i > r`**: Không có thông tin nào reuse được → so sánh từ đầu
- **Nếu `i ≤ r`**: Có thể reuse `Z[i-l]` (vì `S[0..Z[i-l]-1]` = `S[l..l+Z[i-l]-1]` = `S[i..i+Z[i-l]-1]`)

```cpp
// Minh họa: i nằm trong vùng [l, r]
// S[0...Z[i-l]-1] = S[l...l+Z[i-l]-1]  (vì vùng [l,r] đã khớp)
// S[l...l+Z[i-l]-1] = S[i...i+Z[i-l]-1] (vì i nằm trong [l,r])
// → S[0...Z[i-l]-1] = S[i...i+Z[i-l]-1]
// → Z[i] ít nhất = Z[i-l], nhưng không vượt quá r-i+1
```

=== "C++"

    ```cpp
    vector<int> z_function(string s) {
        int n = s.length();
        vector<int> z(n);
        // l, r: ranh giới vùng khớp xa nhất bên phải
        for (int i = 1, l = 0, r = 0; i < n; i++) {
            // Nếu i nằm trong vùng [l, r], reuse kết quả đã tính
            if (i <= r)
                z[i] = min(r - i + 1, z[i - l]);
            // Mở rộng vùng khớp bằng cách so sánh từng ký tự
            while (i + z[i] < n && s[z[i]] == s[i + z[i]])
                z[i]++;
            // Cập nhật vùng [l, r] nếu mở rộng được xa hơn
            if (i + z[i] - 1 > r) {
                l = i;
                r = i + z[i] - 1;
            }
        }
        return z;
    }
    
    // Tìm xâu mẫu bằng Z-algorithm
    vector<int> zSearch(string text, string pattern) {
        // Nối pattern + "$" + text, ký tự "$" không xuất hiện trong text/pattern
        string combined = pattern + "$" + text;
        vector<int> z = z_function(combined);
        int m = pattern.length();
        vector<int> positions;
        // Nếu Z[i] == m, nghĩa là pattern khớp hoàn toàn tại vị trí i-m-1 trong text
        for (int i = m + 1; i < combined.length(); i++)
            if (z[i] == m)
                positions.push_back(i - m - 1);
        return positions;
    }
    ```

=== "Python"

    ```python
    def z_function(s):
        n = len(s)
        z = [0] * n
        l, r = 0, 0  # ranh giới vùng khớp xa nhất bên phải
        for i in range(1, n):
            # Nếu i nằm trong vùng [l, r], reuse kết quả đã tính
            if i <= r:
                z[i] = min(r - i + 1, z[i - l])
            # Mở rộng vùng khớp bằng cách so sánh từng ký tự
            while i + z[i] < n and s[z[i]] == s[i + z[i]]:
                z[i] += 1
            # Cập nhật vùng [l, r] nếu mở rộng được xa hơn
            if i + z[i] - 1 > r:
                l, r = i, i + z[i] - 1
        return z
    
    def z_search(text, pattern):
        # Nối pattern + "$" + text, ký tự "$" không xuất hiện trong text/pattern
        combined = pattern + "$" + text
        z = z_function(combined)
        m = len(pattern)
        positions = []
        # Nếu Z[i] == m, nghĩa là pattern khớp hoàn toàn tại vị trí i-m-1 trong text
        for i in range(m + 1, len(combined)):
            if z[i] == m:
                positions.append(i - m - 1)
        return positions
    ```

---

## 3. So sánh 3 thuật toán tìm xâu mẫu

| Thuật toán | Độ phức tạp | Ưu điểm | Nhược điểm |
|-----------|-------------|---------|------------|
| Brute-force | O(NM) | Đơn giản nhất | Chậm với dữ liệu lớn |
| KMP | O(N + M) | Ổn định, không dùng modulo | Khó hiểu hơn |
| Hash | O(N + M) | Linh hoạt, dễ code | Có thể collision |
| Z-algorithm | O(N + M) | Không cần hash, không lo collision | Cần ký tự phân tách |

## 4. Giải thích chi tiết: Hash tiền tố hoạt động thế nào?

### Tại sao hash đoạn [l, r] tính được O(1)?

Giống như prefix sum, ta tính hash **tiền tố** trước:

```
hashT[i] = hash của S[0..i-1] (i ký tự đầu)

hashT[0] = 0
hashT[1] = hash("a")
hashT[2] = hash("ab")
hashT[3] = hash("abc")
...
```

Hash đoạn [l, r] = hashT[r+1] - hashT[l] × BASE^(r-l+1)

```
Ví dụ: S = "abcab", tính hash đoạn [2, 4] = "cab"

hashT[5] = hash("abcab")
hashT[2] = hash("ab")

hash("cab") = hashT[5] - hashT[2] × BASE³
            = hash("abcab") - hash("ab") × BASE³
```

**Tại sao nhân BASE³?** Vì hashT[l] đang ở bậc "thấp" hơn so với vị trí thực trong hashT[r+1]. Cần nhân lên để "cân bằng" trước khi trừ.

### Hash collision — Xác suất và cách phòng tránh

#### Xác suất collision là bao nhiêu?

Với modulo `M` và `n` xâu khác nhau, xác suất **ít nhất 1 cặp** trùng hash (theo [Birthday Paradox](https://en.wikipedia.org/wiki/Birthday_problem)):

```
P(collision) ≈ 1 - e^(-n² / (2M))
```

**Bảng minh họa:**

| Số xâu (n) | MOD = 10⁹+7 | MOD = 10⁹+9 | 2 hash (MOD1 × MOD2) |
|-------------|--------------|--------------|----------------------|
| 10³ | ~0.00005% | ~0.00005% | ~0% |
| 10⁵ | ~0.5% | ~0.5% | ~0% |
| 10⁶ | ~39% | ~39% | ~0.00000000005% |
| 10⁷ | ~99.99% | ~99.99% | ~0.000005% |

→ Với 1 hash, chỉ cần **~31,000 xâu** là xác suất collision đã đạt **~50%** (theo Birthday Paradox: √(2 × 10⁹) ≈ 44,721).

→ Với **2 hash**, xác suất collision giảm xuống gần như **bằng 0** ngay cả với hàng triệu xâu.

#### Tại sao 2 hash an toàn hơn?

```
Hash 1: dùng MOD1 = 10^9 + 7 → có ~10^9 giá trị khác nhau
Hash 2: dùng MOD2 = 10^9 + 9 → có ~10^9 giá trị khác nhau

Khi dùng CẢ HAI: không gian giá trị = 10^9 × 10^9 = 10^18
→ Xác suất collision ≈ 1 / 10^18 ≈ 0
```

**Tuy nhiên**, trong thi đấu, nếu testcase cố tình tạo để hack hash, ngay cả 2 hash cũng có thể bị hack. Cách an toàn nhất là dùng **random BASE** hoặc **3 hash**.

#### Ví dụ thực tế: Khi nào collision xảy ra?

```cpp
// Ví dụ: S = "abcde", T = "lmnop" (cùng độ dài 5)
// Với BASE=31, MOD=10^9+7:
// hash(S) = (1×31⁴ + 2×31³ + 3×31² + 4×31 + 5) % MOD
// hash(T) = (12×31⁴ + 13×31³ + 14×31² + 15×31 + 16) % MOD
// → Khác nhau (thường vậy), nhưng KHÔNG ĐẢM BẢO 100%
```

**Giải pháp:** Dùng **2 hash** với 2 MOD khác nhau:

```cpp
// Hash 1: MOD1 = 10^9 + 7
// Hash 2: MOD2 = 10^9 + 9
// Chỉ khi CẢ HAI hash giống nhau mới coi là trùng
// Xác suất sai: ~1/(10^9 × 10^9) ≈ 0
```

=== "C++"

    ```cpp
    // Cài đặt 2 hash an toàn
    const long long MOD1 = 1e9 + 7, MOD2 = 1e9 + 9;
    const long long BASE1 = 31, BASE2 = 37;
    
    struct DoubleHash {
        long long h1, h2;
        DoubleHash(long long a = 0, long long b = 0) : h1(a), h2(b) {}
        bool operator==(const DoubleHash& o) const { return h1 == o.h1 && h2 == o.h2; }
    };
    
    DoubleHash computeDoubleHash(string s) {
        long long h1 = 0, h2 = 0;
        for (char c : s) {
            h1 = (h1 * BASE1 + (c - 'a' + 1)) % MOD1;
            h2 = (h2 * BASE2 + (c - 'a' + 1)) % MOD2;
        }
        return DoubleHash(h1, h2);
    }
    ```

=== "Python"

    ```python
    # Cài đặt 2 hash an toàn
    MOD1, MOD2 = 10**9 + 7, 10**9 + 9
    BASE1, BASE2 = 31, 37
    
    def compute_double_hash(s):
        h1, h2 = 0, 0
        for c in s:
            h1 = (h1 * BASE1 + ord(c) - ord('a') + 1) % MOD1
            h2 = (h2 * BASE2 + ord(c) - ord('a') + 1) % MOD2
        return (h1, h2)
    ```

---

## 5. Lưu ý và Bẫy hay gặp

### 5.1. Hash collision — Sai kết quả

```cpp
// SAI: Chỉ dùng 1 hash → có thể bị hack
if (hash1 == hash2)  // Có thể collision!

// ĐÚNG: Dùng 2 hash
if (hash1a == hash2a && hash1b == hash2b)  // An toàn
```

### 5.2. Quên `+ MOD` khi trừ

```cpp
// SAI: (a - b) % MOD có thể ÂM nếu a < b
long long curHash = (hashT[i+m] - hashT[i] * power[m]) % MOD;

// ĐÚNG: Luôn + MOD rồi % MOD
long long curHash = (hashT[i+m] - hashT[i] * power[m] % MOD + MOD) % MOD;
```

### 5.3. Chọn BASE không tốt

```cpp
// SAI: BASE = 1 → hash = tổng mã ASCII → collision cao!
// SAI: BASE = 256 → overflow nếu không modulo

// ĐÚNG: BASE = 31 hoặc 131 (số nguyên tố, không quá nhỏ)
const long long BASE = 31;
```

### 5.4. Quên modulo khi nhân

```cpp
// SAI: a * a có thể tràn long long trước khi modulo
result = (result * a) % MOD;

// ĐÚNG: Dùng __int128 hoặc cast
result = (__int128)result * a % MOD;
```

### 5.5. Z-function: Quên ký tự phân tách

```cpp
// SAI: Không có "$" → Z[i] có thể match sai
string combined = pattern + text;

// ĐÚNG: Phải có ký tự phân tách không xuất hiện trong pattern/text
string combined = pattern + "$" + text;
```

### 5.6. Hash: Quên tính lũy thừa BASE trước

```cpp
// SAI: Tính power[i] bên trong vòng lặp tìm kiếm → O(N²)
for (int i = 0; i <= n - m; i++) {
    long long pw = 1;
    for (int j = 0; j < m; j++) pw = pw * BASE % MOD;  // Tính lại mỗi lần!
    ...
}

// ĐÚNG: Tính trước power[] một lần → O(N)
vector<long long> power(n + 1);
power[0] = 1;
for (int i = 1; i <= n; i++)
    power[i] = (power[i-1] * BASE) % MOD;
```

### 5.7. Z-function: Nhầm Z[0]

```
Z[0] thường được định nghĩa = 0 hoặc = n (độ dài xâu).
Trong hầu hết cài đặt, Z[0] = 0 và không được sử dụng.
ĐỪNG nhầm Z[0] với Z[1]!
```

### 5.8. Hash: Ký tự 'a' có giá trị 0 hay 1?

```cpp
// SAI: 'a' = 0 → hash("a") = hash("aa") = hash("aaa") = ...
hash = (hash * BASE + (c - 'a')) % MOD;  // 'a' = 0!

// ĐÚNG: 'a' = 1 để tránh mất ký tự đầu
hash = (hash * BASE + (c - 'a' + 1)) % MOD;  // 'a' = 1
```

---

## Bài tập luyện tập

### Cơ bản (Làm quen với Hash & Z-function)

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - String Matching](https://cses.fi/problemset/task/1753) | CSES | ⭐⭐ | Tìm xâu bằng Hash/KMP |
| [CSES - Finding Borders](https://cses.fi/problemset/task/1732) | CSES | ⭐⭐ | Prefix function / Z-function |
| [SPOJ - NHAY](https://www.spoj.com/problems/NHAY/) | SPOJ | ⭐⭐ | KMP/Hash |
| [VNOJ - SUBSTR](https://oj.vnoi.info/problem/substr) | VNOJ | ⭐⭐ | Hash/KMP |
| [VNOJ - NKTEXT](https://oj.vnoi.info/problem/nktext) | VNOJ | ⭐⭐ | Hash xâu |

### Trung bình (Áp dụng Hash vào bài toán phức tạp hơn)

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Counting Patterns](https://cses.fi/problemset/task/1733) | CSES | ⭐⭐⭐ | Hash + Set/Map |
| [CSES - Pattern Positions](https://cses.fi/problemset/task/1734) | CSES | ⭐⭐⭐ | Hash + Binary Search |
| [CF - MUH and Cube Walls](https://codeforces.com/problemset/problem/471/D) | CF | ⭐⭐⭐ | KMP nâng cao |
| [VNOJ - PALINY](https://oj.vnoi.info/problem/paliny) | VNOJ | ⭐⭐⭐ | Palindrome + Hash |
| [CF - Good Substrings](https://codeforces.com/problemset/problem/271/D) | CF | ⭐⭐⭐ | Hash + Set đếm substring |
| [CF - Password](https://codeforces.com/problemset/problem/126/B) | CF | ⭐⭐⭐ | Z-function + Hash |

### Nâng cao (Thi đấu)

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CF - Palindrome Degree](https://codeforces.com/problemset/problem/7/D) | CF | ⭐⭐⭐⭐ | Hash palindrome |
| [CF - String Compression](https://codeforces.com/problemset/problem/827/C) | CF | ⭐⭐⭐⭐ | Hash + KMP |
| [VNOJ - QUERYSTR](https://oj.vnoi.info/problem/querystr) | VNOJ | ⭐⭐⭐⭐ | Hash + Queries |
| [CF - Occurrences](https://codeforces.com/problemset/problem/633/C) | CF | ⭐⭐⭐⭐ | Hash + DP |
| [SPOJ - ADAPHONE](https://www.spoj.com/problems/ADAPHONE/) | SPOJ | ⭐⭐⭐⭐ | Hash nâng cao |

---

## Bài viết liên quan

- [Bài 9: KMP & Z-Algorithm](09-kmp-tim-xau.md)
- [Bài 16: Hash Table](16-hash-table.md)

## Tài liệu tham khảo

- [VNOI Wiki - Hash](https://wiki.vnoi.info/algo/string/hash)
- [VNOI Wiki - Z-function](https://wiki.vnoi.info/algo/string/z-algo)
- [CP-Algorithms - String Hashing](https://cp-algorithms.com/string/string-hashing.html)
- [CP-Algorithms - Z-function](https://cp-algorithms.com/string/z-function.html)
- [GeeksforGeeks - Rabin-Karp Algorithm](https://www.geeksforgeeks.org/dsa/rabin-karp-algorithm-for-pattern-searching/)
- [YouTube - String Hashing (Errichto)](https://www.youtube.com/watch?v=6GFMKq5vKWM)

**Bài tiếp theo:** [Deque & Sliding Window →](15-deque-sliding-window.md)