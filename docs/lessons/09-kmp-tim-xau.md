# Bài 9: KMP & Z-Algorithm - Tìm Xâu Mẫu O(N)!

> **Tác giả:** Hà Trí Kiên
> **Nội dung tham khảo từ:** VNOI Wiki - KMP, Z-function

## 1. Chuyện gì đang xảy ra?

### Bài toán: Tìm từ khóa trong văn bản

Bạn có văn bản `T = "aabcabaab"` và muốn tìm xem mẫu `P = "ab"` xuất hiện ở đâu.

**Brute-force:** Tại mỗi vị trí, so sánh từng ký tự → O(NM). Với N=10⁶, M=10³ → 10⁹ phép tính → **TLE!**

**KMP/Z-algorithm:** Chỉ cần **O(N+M)**!

---

## 2. Hàm tiền tố (Prefix Function) - Chìa khóa của KMP

### Định nghĩa

`π[i]` = độ dài tiền tố chuẩn dài nhất của `s[0..i]` mà cũng là hậu tố.

```
s = "aabaaab"
i:     0  1  2  3  4  5  6
s[i]:  a  a  b  a  a  a  b
π[i]:  0  1  0  1  2  2  3
```

Giải thích:
- `π[1]=1`: "aa" → tiền tố "a" = hậu tố "a", độ dài 1
- `π[4]=2`: "aabaa" → tiền tố "aa" = hậu tố "aa", độ dài 2
- `π[6]=3`: "aabaaab" → tiền tố "aab" = hậu tố "aab", độ dài 3

### Code C++: Tính hàm tiền tố

```cpp
vector<int> prefixFunction(string s) {
    int n = s.length();
    vector<int> pi(n, 0);
    for (int i = 1; i < n; i++) {
        int j = pi[i - 1];
        while (j > 0 && s[i] != s[j])
            j = pi[j - 1];  // Nhảy cóc! Không quay về 0
        if (s[i] == s[j])
            j++;
        pi[i] = j;
    }
    return pi;
}
```

### Code Python: Tính hàm tiền tố

```python
def prefix_function(s):
    n = len(s)
    pi = [0] * n
    for i in range(1, n):
        j = pi[i - 1]
        while j > 0 and s[i] != s[j]:
            j = pi[j - 1]  # Nhảy cóc! Không quay về 0
        if s[i] == s[j]:
            j += 1
        pi[i] = j
    return pi
```

---

## 3. KMP - Tìm xâu mẫu

### Ý tưởng

Khi so sánh thất bại tại vị trí i, thay vì bắt đầu lại từ đầu, ta **nhảy đến π[i-1]** vì đã biết π[i-1] ký tự đầu khớp!

```
T = "aabcabaab"
P = "abcab"
         ↑ Thất bại tại vị trí 4 (so sánh 'c' vs 'a')
π[3] = 1 → Nhảy: so sánh từ vị trí 1 của P
```

### Code C++

```cpp
vector<int> kmpSearch(string text, string pattern) {
    string combined = pattern + "#" + text;
    vector<int> pi = prefixFunction(combined);
    vector<int> positions;
    int m = pattern.length();
    for (int i = m + 1; i < combined.length(); i++) {
        if (pi[i] == m)
            positions.push_back(i - 2 * m);
    }
    return positions;
}
```

### Code Python: KMP tìm xâu mẫu

```python
def kmp_search(text, pattern):
    combined = pattern + "#" + text
    pi = prefix_function(combined)
    positions = []
    m = len(pattern)
    for i in range(m + 1, len(combined)):
        if pi[i] == m:
            positions.append(i - 2 * m)
    return positions
```

---

## 4. Z-Algorithm

### Định nghĩa

`z[i]` = độ dài tiền tố chung lớn nhất của `s` và `s[i..n-1]`.

```
s = "aaabaab"
z = [0, 2, 1, 0, 2, 2, 3]
```

Giải thích chi tiết:
- `z[0]=0`: Quy ước, không xét
- `z[1]=2`: "aa" khớp "aa..." → độ dài 2
- `z[2]=1`: "a" khớp "a..." → độ dài 1
- `z[3]=0`: "b" không khớp "a..." → 0
- `z[4]=2`: "aa" khớp "aa..." → độ dài 2
- `z[5]=1`: "a" khớp "a..." → độ dài 1
- `z[6]=3`: "aab" khớp "aab..." → độ dài 3

### Code C++

```cpp
vector<int> zFunction(string s) {
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
```

### Code Python

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
```

---

## 5. Ứng dụng thực tế

### 5.1. Đếm số lần xuất hiện của mẫu

```cpp
// Đếm số lần pattern xuất hiện trong text
int countOccurrences(string text, string pattern) {
    string combined = pattern + "#" + text;
    vector<int> pi = prefixFunction(combined);
    int count = 0;
    int m = pattern.length();
    for (int i = m + 1; i < combined.length(); i++)
        if (pi[i] == m) count++;
    return count;
}
```

### Code Python: Đếm số lần xuất hiện

```python
def count_occurrences(text, pattern):
    combined = pattern + "#" + text
    pi = prefix_function(combined)
    count = 0
    m = len(pattern)
    for i in range(m + 1, len(combined)):
        if pi[i] == m:
            count += 1
    return count
```

### 5.2. Tìm chu kỳ nhỏ nhất của xâu

```cpp
// Xâu "abcabcabc" có chu kỳ "abc" độ dài 3
int shortestPeriod(string s) {
    vector<int> pi = prefixFunction(s);
    int n = s.length();
    int period = n - pi[n - 1];
    if (n % period == 0) return period;
    return n;  // Không có chu kỳ
}
```

### Code Python: Tìm chu kỳ nhỏ nhất

```python
def shortest_period(s):
    pi = prefix_function(s)
    n = len(s)
    period = n - pi[n - 1]
    if n % period == 0:
        return period
    return n  # Không có chu kỳ
```

### 5.3. Kiểm tra xâu có phải lặp lại không

```cpp
// "abcabc" = "abc" lặp 2 lần → true
// "abcabd" → false
bool isRepeated(string s) {
    vector<int> pi = prefixFunction(s);
    int n = s.length();
    int period = n - pi[n - 1];
    return (n % period == 0 && period < n);
}
```

### Code Python: Kiểm tra xâu lặp lại

```python
def is_repeated(s):
    pi = prefix_function(s)
    n = len(s)
    period = n - pi[n - 1]
    return n % period == 0 and period < n
```

---

## 6. So sánh KMP vs Z-algorithm

| | KMP | Z-algorithm |
|--|-----|-------------|
| Hàm chính | Prefix function (π) | Z-function |
| Độ phức tạp | O(N+M) | O(N+M) |
| Tìm xâu mẫu | Có | Có |
| Ứng dụng khác | Chu trình, palindrome | Tiền tố chung |
| Dễ cài đặt | Trung bình | Dễ hơn |

---

## 6. Lưu ý / Cạm bẫy hay gặp

### Bẫy 1: Off-by-one trong hàm tiền tố

```cpp
// SAI: Bắt đầu từ i = 0 → ghi đè pi[0], sai logic
for (int i = 0; i < n; i++) { ... }

// ĐÚNG: Bắt đầu từ i = 1 vì pi[0] luôn = 0
for (int i = 1; i < n; i++) { ... }
```

**Lưu ý:** `π[0]` luôn bằng 0 theo định nghĩa. Bắt đầu vòng lặp từ `i = 1`.

### Bẫy 2: Hash collision khi dùng Hash thay KMP

Khi dùng hash để tìm xâu mẫu, có xác suất va chạm (hash collision) → kết quả sai.

```cpp
// Nên dùng double hash để giảm xác suất va chạm
const long long MOD1 = 1e9 + 7, MOD2 = 1e9 + 9;
const long long BASE = 311;

pair<long long, long long> getHash(string s) {
    long long h1 = 0, h2 = 0;
    for (char c : s) {
        h1 = (h1 * BASE + c) % MOD1;
        h2 = (h2 * BASE + c) % MOD2;
    }
    return {h1, h2};
}
```

**Khuyến nghị:** Nếu cần chính xác 100%, dùng KMP hoặc Z-algorithm thay vì hash.

### Bẫy 3: Bộ nhớ với xâu lớn

Khi N = 10⁶, mảng `combined = pattern + "#" + text` có độ dài ~2×10⁶. Mảng `pi` cũng cùng kích thước.

```cpp
// Với N = 10^6, cần ~8MB cho mảng pi (int)
// Với N = 10^7, cần ~80MB → có thể MLE!

// Giải pháp: Dùng Z-algorithm trên text trực tiếp
// hoặc chia nhỏ text thành các đoạn
```

### Bẫy 4: Sai vị trí khi dùng KMP với delimiter

```cpp
// SAI: Không dùng delimiter → match ngay trong pattern
string combined = pattern + text;  // Có thể match ở vị trí < m

// ĐÚNG: Dùng ký tự không xuất hiện trong pattern/text
string combined = pattern + "#" + text;
```

### Bẫy 5: Quên xử lý overlap matches

Khi cần đếm cả các lần xuất hiện chồng chéo (overlapping):

```
Text: "aaaa", Pattern: "aa"
→ Có 3 lần xuất hiện: [0,1], [1,2], [2,3]
→ Không phải 2 (non-overlapping)!
```

KMP tự động xử lý overlap vì nhảy theo `π[i-1]`, không nhảy toàn bộ pattern.

### So sánh: KMP vs Hash-based approach

| | KMP | Hash-based |
|--|-----|-----------|
| Độ phức tạp | O(N+M) xác định | O(N+M) trung bình |
| Chính xác | 100% | Có xác suất collision |
| Bộ nhớ | O(N+M) | O(N) nếu tính rolling hash |
| Dễ cài đặt | Trung bình | Dễ hơn |
| Ứng dụng tốt nhất | Tìm exact match | Tìm nhiều pattern khác nhau |
| Xử lý overlap | Tự nhiên | Cần thêm logic |

**Khi nào dùng KMP:** Cần chính xác 100%, tìm 1 pattern cố định.
**Khi nào dùng Hash:** Tìm nhiều pattern, cần code ngắn, chấp nhận xác suất nhỏ sai.

---

## 7. Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Pattern Positions](https://cses.fi/problemset/task/2107) | CSES | ⭐⭐ | KMP tìm vị trí |
| [SPOJ - NHAY](https://www.spoj.com/problems/NHAY/) | SPOJ | ⭐⭐ | KMP cơ bản |
| [CF - MUH and Cube Walls](https://codeforces.com/problemset/problem/471/D) | CF | ⭐⭐⭐ | KMP nâng cao |
| [VNOJ - SUBSTR](https://oj.vnoi.info/problem/substr) | VNOJ | ⭐⭐ | Tìm xâu con bằng KMP/Hash |
| [VNOJ - KMP](https://oj.vnoi.info/problem/kmp) | VNOJ | ⭐⭐ | KMP trực tiếp |
| [VNOJ - NKPALIN](https://oj.vnoi.info/problem/nkpalin) | VNOJ | ⭐⭐⭐ | Palindrome + KMP |
| [VNOJ - PALINY](https://oj.vnoi.info/problem/paliny) | VNOJ | ⭐⭐⭐ | Palindrome dài nhất |

## 7. Bài viết liên quan

- [Bài 14: Hash xâu & Z-algorithm](14-hash-xau-z-algorithm.md)
- [Bài 20: Manacher (Palindrome)](20-manacher.md)
- [Bài 17: Trie](17-trie.md)

## Tài liệu tham khảo

- [CP-Algorithms - Prefix Function & KMP](https://cp-algorithms.com/string/prefix-function.html)
- [CP-Algorithms - Z-function](https://cp-algorithms.com/string/z-function.html)
- [Topcoder - Introduction to String Searching](https://www.topcoder.com/community/competitive-programming/tutorials/introduction-to-string-searching-algorithms/)
- [USACO Guide - String Searching](https://usaco.guide/adv/string-search)
- [GeeksforGeeks - KMP Algorithm](https://www.geeksforgeeks.org/dsa/kmp-algorithm-for-pattern-searching/)
- [takeuforward - KMP Algorithm](https://takeuforward.org/data-structure/kmp-algorithm)
- [Codeforces - KMP Resource for Beginners](https://codeforces.com/blog/entry/92981)
