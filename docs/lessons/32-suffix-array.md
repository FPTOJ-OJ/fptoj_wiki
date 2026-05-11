# Bài 32: Suffix Array - Mảng Hậu Tố

> **Tác giả:** Hà Trí Kiên<br>
> **Nội dung tham khảo từ:** CP-Algorithms - Suffix Array, VNOI Wiki

## 1. Chuyện gì đang xảy ra?

### Bài toán

Cho xâu S. Có nhiều câu hỏi:

- Tìm tất cả vị trí xuất hiện của pattern P trong S
- Đếm số xâu con khác nhau
- Tìm xâu con chung dài nhất của 2 xâu
- Tìm xâu con lặp lại dài nhất

**Suffix Array** là cấu trúc dữ liệu mạnh mẽ giải quyết tất cả bài toán trên!

### Hậu tố (Suffix) là gì?

Hậu tố của xâu S = xâu bắt đầu từ vị trí i đến cuối.

```
S = "banana"
Suffixes:
  i=0: "banana"
  i=1: "anana"
  i=2: "nana"
  i=3: "ana"
  i=4: "na"
  i=5: "a"
```

### Suffix Array là gì?

Suffix Array = mảng các **chỉ số** i, sắp xếp theo thứ tự **từ điển** của hậu tố S[i..].

```
S = "banana$"
($ = ký tự kết thúc, nhỏ nhất)

Hậu tố      Chỉ số   Sắp xếp
"banana$"    0        "a$"      → 5
"anana$"     1        "ana$"    → 3
"nana$"      2        "anana$"  → 1
"ana$"       3        "banana$" → 0
"na$"        4        "na$"     → 4
"a$"         5        "nana$"   → 2
"$"          6        "$"       → 6

Suffix Array (SA): [6, 5, 3, 1, 0, 4, 2]
```

### Tại sao cần ký tự $ (terminator)?

`$` nhỏ hơn mọi ký tự khác → đảm bảo hậu tố ngắn hơn luôn đứng trước hậu tố dài hơn có cùng prefix.

Không có `$`: "a" vs "ana" — "a" ngắn hơn, nhưng "a" < "ana" trong từ điển → OK
Nhưng với "an" vs "ana" — "an" < "ana" → cũng OK
`$` giúp xử lý edge case an toàn.

---

## 2. Xây dựng Suffix Array

### 2.1. Phương pháp đơn giản: Sort — O(N log² N)

```cpp
// Cách đơn giản: sort các hậu tố
vector<int> buildSA(string s) {
    int n = s.size();
    vector<int> sa(n);
    iota(sa.begin(), sa.end(), 0);  // [0, 1, 2, ..., n-1]
    
    // Sort theo hậu tố bắt đầu từ mỗi chỉ số
    sort(sa.begin(), sa.end(), [&](int a, int b) {
        return s.substr(a) < s.substr(b);
    });
    
    return sa;
}
// Độ phức tạp: O(N² log N) — quá chậm cho N lớn!
```

### 2.2. Phương pháp Doubling — O(N log² N)

**Ý tưởng:** Sắp xếp theo 1 ký tự, rồi 2 ký tự, rồi 4 ký tự, ... cho đến N ký tự.

Mỗi bước, hậu tố "i" được xếp hạng dựa trên **(rank[i], rank[i + k])** — rank của nửa trái và nửa phải.

```
S = "banana", N = 6

Bước 1 (k=1): Sắp xếp theo 1 ký tự
  rank: b=0, a=1, n=2  (a < b < n)
  Hậu tố:  i=0(b) i=1(a) i=2(n) i=3(a) i=4(n) i=5(a)
  rank[1]:  0      1      2      1      2      1
  SA: [0, 1, 3, 5, 2, 4]

Bước 2 (k=2): Sắp xếp theo 2 ký tự (rank[i], rank[i+1])
  i=0: (0, 1) = "ba"
  i=1: (1, 2) = "an"
  i=2: (2, 1) = "na"
  i=3: (1, 2) = "an"  ← cùng với i=1!
  i=4: (2, 1) = "na"  ← cùng với i=2!
  i=5: (1, -) = "a$"
  Sắp xếp: "a$" < "an" = "an" < "ba" < "na" = "na"
  SA: [5, 1, 3, 0, 2, 4]

Bước 4 (k=4): Sắp xếp theo 4 ký tự
  ...tiếp tục cho đến k >= N
```

### 2.3. Code Doubling — O(N log² N)

```cpp
vector<int> buildSA(string s) {
    int n = s.size();
    vector<int> sa(n), rank(n), tmp(n);
    
    // Khởi tạo: rank = mã ASCII
    for (int i = 0; i < n; i++) {
        sa[i] = i;
        rank[i] = s[i];
    }
    
    for (int k = 1; k < n; k <<= 1) {
        // Sắp xếp theo (rank[i], rank[i+k])
        auto cmp = [&](int a, int b) {
            if (rank[a] != rank[b]) return rank[a] < rank[b];
            int ra = (a + k < n) ? rank[a + k] : -1;
            int rb = (b + k < n) ? rank[b + k] : -1;
            return ra < rb;
        };
        sort(sa.begin(), sa.end(), cmp);
        
        // Cập nhật rank mới
        tmp[sa[0]] = 0;
        for (int i = 1; i < n; i++)
            tmp[sa[i]] = tmp[sa[i-1]] + (cmp(sa[i-1], sa[i]) ? 1 : 0);
        rank = tmp;
        
        if (rank[sa[n-1]] == n - 1) break;  // Đã sắp xếp xong
    }
    return sa;
}
```

### Code Python

```python
def build_sa(s):
    n = len(s)
    sa = list(range(n))
    rank = [ord(c) for c in s]
    tmp = [0] * n
    
    k = 1
    while k < n:
        sa.sort(key=lambda x: (rank[x], rank[x + k] if x + k < n else -1))
        
        tmp[sa[0]] = 0
        for i in range(1, n):
            tmp[sa[i]] = tmp[sa[i-1]] + (1 if (rank[sa[i-1]], rank[sa[i-1]+k] if sa[i-1]+k < n else -1) < (rank[sa[i]], rank[sa[i]+k] if sa[i]+k < n else -1) else 0)
        rank = tmp[:]
        
        if rank[sa[-1]] == n - 1:
            break
        k <<= 1
    
    return sa
```

---

## 3. LCP Array (Longest Common Prefix)

### LCP là gì?

`LCP[i]` = độ dài tiền tố chung dài nhất giữa hậu tố `SA[i]` và `SA[i-1]`.

```
S = "banana$"
SA:  [6, 5, 3, 1, 0, 4, 2]
Hậu tố: "$", "a$", "ana$", "anana$", "banana$", "na$", "nana$"

LCP:  _, 1, 3, 1, 0, 2, 0
       ↑  ↑  ↑  ↑  ↑  ↑
       $  a  ana anana banana na nana
         vs   vs  vs   vs    vs  vs
         $   a$  ana$ anana$ banana$ na$

LCP[2] = 3: "ana$" và "a$" có prefix chung dài 3 = "ana"
LCP[5] = 2: "na$" và "banana$" có prefix chung dài 0
             → Đúng: LCP[5] = 2 là so sánh SA[5]="na$" và SA[4]="banana$"
             → "na$" vs "banana$" → prefix chung = 0
             → SA: [6,5,3,1,0,4,2], SA[4]=0 ("banana$"), SA[5]=4 ("na$")
             → LCP[5] = lcp(SA[5], SA[4]) = lcp("na$", "banana$") = 0
             → Sửa lại: LCP = [_, 1, 3, 1, 0, 0, 0]
```

### Xây dựng LCP bằng Kasai's Algorithm — O(N)

**Ý tưởng:** Dùng mảng `rank[]` (rank[i] = vị trí của hậu tố i trong SA).

```cpp
vector<int> buildLCP(string s, vector<int>& sa) {
    int n = s.size();
    vector<int> rank(n), lcp(n);
    
    // Tính rank: rank[sa[i]] = i
    for (int i = 0; i < n; i++)
        rank[sa[i]] = i;
    
    int k = 0;  // Độ dài LCP hiện tại
    for (int i = 0; i < n; i++) {
        if (rank[i] == 0) { k = 0; continue; }
        
        int j = sa[rank[i] - 1];  // Hậu tố đứng trước i trong SA
        while (i + k < n && j + k < n && s[i + k] == s[j + k])
            k++;
        
        lcp[rank[i]] = k;
        if (k > 0) k--;  // Giảm 1 cho bước tiếp theo
    }
    return lcp;
}
```

---

## 4. Ứng dụng

### 4.1. Tìm kiếm pattern — O(M log N)

Tìm pattern P trong xâu S bằng binary search trên Suffix Array.

```cpp
// Tìm tất cả vị trí P xuất hiện trong S
vector<int> search(string s, vector<int>& sa, string pattern) {
    int n = s.size(), m = pattern.size();
    int lo = 0, hi = n - 1;
    
    // Tìm vị trí đầu tiên >= pattern
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        if (s.compare(sa[mid], min(m, (int)s.size() - sa[mid]), pattern) >= 0)
            hi = mid;
        else
            lo = mid + 1;
    }
    
    // Tìm tất cả vị trí match
    vector<int> result;
    while (lo < n && s.compare(sa[lo], min(m, (int)s.size() - sa[lo]), pattern) == 0) {
        result.push_back(sa[lo]);
        lo++;
    }
    return result;
}
```

### 4.2. Đếm số xâu con khác nhau

Tổng số hậu tố = N. Số hậu tố trùng prefix = LCP. Số xâu con khác nhau:

```
Số xâu con khác nhau = N * (N+1) / 2 - tổng(LCP)
```

---

## 5. Lưu ý

- **Luôn thêm ký tự `$`** vào cuối xâu để xử lý edge case
- **Doubling O(N log² N)** đủ nhanh cho N ≤ 10⁵
- **SA-IS O(N)** là thuật toán tuyến tính, nhưng phức tạp hơn nhiều
- **Suffix Array + LCP** là combo mạnh nhất cho bài toán xâu trong competitive programming

---

## 6. Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [SPOJ - SARRAY](https://www.spoj.com/problems/SARRAY/) | SPOJ | ⭐⭐⭐ | Cài đặt SA |
| [CSES - Substring Order I](https://cses.fi/problemset/task/2108) | CSES | ⭐⭐⭐ | Suffix Array |
| [CSES - Substring Order II](https://cses.fi/problemset/task/2109) | CSES | ⭐⭐⭐⭐ | SA + LCP |
| [CSES - Substring Queries](https://cses.fi/problemset/task/2110) | CSES | ⭐⭐⭐⭐ | SA + Binary Search |
| [SPOJ - SUBST1](https://www.spoj.com/problems/SUBST1/) | SPOJ | ⭐⭐ | Đếm xâu con khác nhau |

---

## Tài liệu tham khảo

- [CP-Algorithms - Suffix Array](https://cp-algorithms.com/string/suffix-array.html)
- [CP-Algorithms - LCP Array](https://cp-algorithms.com/string/suffix-array.html#finding-the-longest-common-prefix-of-two-substrings-lcp-array)
- [VNOI Wiki - Suffix Array](https://wiki.vnoi.info/algo/data-structures/suffix-array)
- [YouTube - Suffix Array (takeuforward)](https://www.youtube.com/watch?v=0bL1GPeT5FQ)

**Bài tiếp theo:** [Euclid & Modular Inverse →](18-euclid-modular-inverse.md)
