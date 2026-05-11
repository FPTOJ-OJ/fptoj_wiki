# Bài 14: Hash Xâu & Z-Algorithm

> **Tác giả:** Hà Trí Kiên
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

### Code C++: Hash xâu + Tìm xâu mẫu

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
    for (int p : pos) cout << p << " ";  // 1 4 7
}
```

### Code Python

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
Z = [0, 2, 1, 0, 2, 2, 3]

Z[1]=2: "aa" khớp "aa..."
Z[4]=2: "aa" khớp "aa..."
Z[6]=3: "aab" khớp "aab..."
```

### Code C++

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

// Tìm xâu mẫu bằng Z-algorithm
vector<int> zSearch(string text, string pattern) {
    string combined = pattern + "$" + text;
    vector<int> z = z_function(combined);
    int m = pattern.length();
    vector<int> positions;
    for (int i = m + 1; i < combined.length(); i++)
        if (z[i] == m)
            positions.push_back(i - m - 1);
    return positions;
}
```

---

## 3. So sánh 3 thuật toán tìm xâu mẫu

| Thuật toán | Độ phức tạp | Ưu điểm |
|-----------|-------------|---------|
| Brute-force | O(NM) | Đơn giản nhất |
| KMP | O(N + M) | Ổn định, không dùng modulo |
| Hash | O(N + M) | Linh hoạt, dễ code |
| Z-algorithm | O(N + M) | Không cần hash, không lo collision |

### Bẫy hay gặp với Hash

- **Hash collision:** 2 xâu khác nhau nhưng hash giống nhau → dùng 2 hash (2 MOD khác nhau) để giảm xác suất sai
- **Quên `+ MOD` khi trừ:** `(a - b) % MOD` có thể âm → phải `((a - b) % MOD + MOD) % MOD`

---

---

## Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - String Matching](https://cses.fi/problemset/task/1753) | CSES | ⭐⭐ | Tìm xâu bằng Hash/KMP |
| [CSES - Finding Borders](https://cses.fi/problemset/task/1732) | CSES | ⭐⭐ | Prefix function |
| [SPOJ - NHAY](https://www.spoj.com/problems/NHAY/) | SPOJ | ⭐⭐ | KMP/Hash |
| [CF - MUH and Cube Walls](https://codeforces.com/problemset/problem/471/D) | CF | ⭐⭐⭐ | KMP nâng cao |
| [VNOJ - SUBSTR](https://oj.vnoi.info/problem/substr) | VNOJ | ⭐⭐ | Hash/KMP |
| [VNOJ - PALINY](https://oj.vnoi.info/problem/paliny) | VNOJ | ⭐⭐⭐ | Palindrome + Hash |
| [VNOJ - NKTEXT](https://oj.vnoi.info/problem/nktext) | VNOJ | ⭐⭐ | Hash xâu |

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

**Bạn đã hoàn thành toàn bộ 23 bài học CP!**
