# Bài 9: KMP - Tìm Xâu Mẫu O(N)!

> **Tác giả:** Hà Trí Kiên<br>
> **Nội dung tham khảo từ:** VNOI Wiki - KMP

## 1. Chuyện gì đang xảy ra?

### Bài toán: Tìm từ khóa trong văn bản

Bạn có văn bản `T = "aabcabaab"` và muốn tìm xem mẫu `P = "ab"` xuất hiện ở đâu.

**Brute-force:** Tại mỗi vị trí, so sánh từng ký tự → O(NM). Với N=10⁶, M=10³ → 10⁹ phép tính → **TLE!**

**KMP:** Chỉ cần **O(N+M)**!

---

## 2. Hàm tiền tố (Prefix Function) - Chìa khóa của KMP

### Định nghĩa

`π[i]` = độ dài tiền tố chuẩn dài nhất của `s[0..i]` mà cũng là hậu tố.

**Nói nôm na:** `π[i]` = độ dài đoạn đầu của xâu khớp chính xác với đoạn cuối.

```
s = "aabaaab"
i:     0  1  2  3  4  5  6
s[i]:  a  a  b  a  a  a  b
π[i]:  0  1  0  1  2  2  3
```

Giải thích từng vị trí:

- `π[0]=0`: luôn bằng 0 (tiền tố chuẩn không được bằng chính xâu)
- `π[1]=1`: "aa" → tiền tố "a" = hậu tố "a", độ dài **1**
- `π[2]=0`: "aab" → không có tiền tố nào khớp hậu tố, độ dài **0**
- `π[4]=2`: "aabaa" → tiền tố "aa" = hậu tố "aa", độ dài **2**
- `π[6]=3`: "aabaaab" → tiền tố "aab" = hậu tố "aab", độ dài **3**

### Minh họa từng bước tính `π` cho "aabăaab"

```
Bước i=1: xét 'a'. j = π[0] = 0.
  s[1]='a' == s[0]='a' → j++ = 1. π[1]=1

Bước i=2: xét 'b'. j = π[1] = 1.
  s[2]='b' != s[1]='a' → nhảy: j = π[j-1] = π[0] = 0
  s[2]='b' != s[0]='a', j=0, không match nữa → π[2]=0

Bước i=3: xét 'a'. j = π[2] = 0.
  s[3]='a' == s[0]='a' → j++ = 1. π[3]=1

Bước i=4: xét 'a'. j = π[3] = 1.
  s[4]='a' == s[1]='a' → j++ = 2. π[4]=2

Bước i=5: xét 'a'. j = π[4] = 2.
  s[5]='a' != s[2]='b' → nhảy: j = π[1] = 1
  s[5]='a' == s[1]='a' → j++ = 2. π[5]=2

Bước i=6: xét 'b'. j = π[5] = 2.
  s[6]='b' == s[2]='b' → j++ = 3. π[6]=3
```

### Tại sao nhảy về `π[j-1]` thay vì về 0?

**Đây là mấu chốt của KMP!** Khi s[i] != s[j], ta đã biết:
- Đoạn `s[0..j-1]` khớp với `s[i-j..i-1]`
- `π[j-1]` = độ dài tiền tố = hậu tố của `s[0..j-1]`
- Nghĩa là `π[j-1]` ký tự đầu của s đã khớp `π[j-1]` ký tự cuối trước i!
- → Không cần kiểm tra lại, **nhảy thẳng** tới `j = π[j-1]`

```
Ví dụ: s = "abcabd", so sánh tới i=5, j=3 ('d' != 'a')
  π[2] = 0 → j = 0, thử s[5] vs s[0] = 'd' vs 'a' → không khớp
  π[5] = 0

Ví dụ phức tạp hơn: s = "aabcaab", i=6 (s[6]='b'), j=3
  s[6]='b' != s[3]='c' → j = π[2] = 1
  s[6]='b' != s[1]='a' → j = π[0] = 0
  s[6]='b' != s[0]='a' → π[6] = 0
```

**Điều này đảm bảo O(N):** Biến j chỉ tăng khi match, giảm khi nhảy. Tổng lần tăng ≤ N, tổng lần giảm ≤ N → O(N) tổng!

### Code C++: Tính hàm tiền tố

```cpp
vector<int> prefixFunction(string s) {
    int n = s.length();
    vector<int> pi(n, 0);
    // π[0] = 0 theo định nghĩa, bắt đầu từ i=1
    for (int i = 1; i < n; i++) {
        int j = pi[i - 1];           // Sử dụng kết quả bước trước!
        while (j > 0 && s[i] != s[j])
            j = pi[j - 1];           // "Nhảy cóc" về prefix ngắn hơn
        if (s[i] == s[j])
            j++;                     // Ký tự khớp → mở rộng thêm 1
        pi[i] = j;                   // Ghi nhận kết quả
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
        j = pi[i - 1]                # Sử dụng kết quả bước trước
        while j > 0 and s[i] != s[j]:
            j = pi[j - 1]            # "Nhảy cóc" về prefix ngắn hơn
        if s[i] == s[j]:
            j += 1
        pi[i] = j
    return pi
```

---

## 3. KMP - Tìm xâu mẫu

### Ý tưởng

Khi so sánh thất bại tại vị trí j trong pattern, ta đã biết `π[j-1]` ký tự đầu của pattern đã khớp với text → **nhảy về `j = π[j-1]`** thay vì restart từ đầu.

**Mẹo cài đặt nhanh:** Gép `pattern + "#" + text` thành 1 xâu, tính prefix function. Khi `π[i] == len(pattern)`, ta tìm thấy 1 lần xuất hiện!
- Dấu `"#"` đảm bảo `π` của phần text **không bao giờ vượt quá** `len(pattern)` → tránh match trong chính pattern.

```cpp
vector<int> kmpSearch(string text, string pattern) {
    string combined = pattern + "#" + text;  // Dấu # làm bước ngăn cách
    vector<int> pi = prefixFunction(combined);
    vector<int> positions;
    int m = pattern.length();
    for (int i = m + 1; i < combined.length(); i++) {
        if (pi[i] == m)                          // Khớp hoàn toàn!
            positions.push_back(i - 2 * m);       // Chức vị trong text gốc
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
        if pi[i] == m:                       # Khớp hoàn toàn!
            positions.append(i - 2 * m)      # Vị trí trong text gốc
    return positions
```

### Minh họa KMP tìm mẫu

```
T = "aabcabaab",  P = "ab"
Combined = "ab#aabcabaab"

Préfix function của combined:
 i: 0  1  2  3  4  5  6  7  8  9 10 11
 s: a  b  #  a  a  b  c  a  b  a  a  b
π: 0  0  0  1  1  2  0  1  2  1  1  2
                       ^π=2=m → vị trí i=8, pos=8-4=4
                              ^π=2=m → vị trí i=11, pos=11-4=7? → sai...

Thực tế: pos = i - 2*m = i - 4
  i=8: pos = 8-4 = 4 → T[4..5]="ab" ✓
  i=11: pos = 11-4 = 7 → T[7..8]="ab" ✓

Đượng dần thiết lập T[1]="aabcabaab":
  vị trí 0: 'a'
  vị trí 1: 'a' → "aa" không match "ab"
  vị trí 2: 'b' → 'a' không match 'a' được, 'b' không match 'a'
  vị trí 4: 'a'+'b'="ab" ✓  vị trí 7: 'a'+'b'="ab" ✓

Output: [4, 7] → P xuất hiện tại vị trí 4 và 7 trong T.
```

!!! tip "Thử tương tác"
    - [KMP String Search](https://algorithm-visualizer.org/dynamic-programming/knuth-morris-pratts-string-search)
    - [Z String Search](https://algorithm-visualizer.org/dynamic-programming/z-string-search)

---

## 4. Ứng dụng thực tế

### 4.1. Đếm số lần xuất hiện của mẫu

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

### 4.2. Tìm chu kỳ nhỏ nhất của xâu

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

### 4.3. Kiểm tra xâu có phải lặp lại không

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

## 5. Lưu ý / Cạm bẫy hay gặp

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

// Giải pháp: Dùng Z-algorithm trên text trực tiếp (xem Bài 14)
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

## 6. Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Pattern Positions](https://cses.fi/problemset/task/2107) | CSES | ⭐⭐ | KMP tìm vị trí |
| [SPOJ - NHAY](https://www.spoj.com/problems/NHAY/) | SPOJ | ⭐⭐ | KMP cơ bản |
| [CF - MUH and Cube Walls](https://codeforces.com/problemset/problem/471/D) | CF | ⭐⭐⭐ | KMP nâng cao |
| [VNOJ - SUBSTR](https://oj.vnoi.info/problem/substr) | VNOJ | ⭐⭐ | Tìm xâu con bằng KMP/Hash |
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
