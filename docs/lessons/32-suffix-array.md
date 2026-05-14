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

#### Ví dụ chi tiết: Xây dựng SA cho S = "banana$"

```
S = "banana$", N = 7

═══════════════════════════════════════════════════════════
Bước 1 (k=1): Sắp xếp theo 1 ký tự
═══════════════════════════════════════════════════════════

Ký tự tại mỗi vị trí:
  i:     0    1    2    3    4    5    6
  S[i]:  b    a    n    a    n    a    $

Gán rank ban đầu theo mã ASCII:
  $=0, a=1, b=2, n=3

  i:     0    1    2    3    4    5    6
  rank:  2    1    3    1    3    1    0

Sắp xếp theo rank → SA = [6, 1, 3, 5, 0, 2, 4]
  ($, a, a, a, b, n, n)

Gán rank mới (rank liên tục):
  i:     0    1    2    3    4    5    6
  rank:  4    1    5    1    5    1    0

═══════════════════════════════════════════════════════════
Bước 2 (k=2): Sắp xếp theo (rank[i], rank[i+2])
═══════════════════════════════════════════════════════════

Mỗi hậu tố i được biểu diễn bởi cặp (rank[i], rank[i+2]):
  i=0: (rank[0], rank[2]) = (4, 5)  → "ba"
  i=1: (rank[1], rank[3]) = (1, 1)  → "an"
  i=2: (rank[2], rank[4]) = (5, 5)  → "na"
  i=3: (rank[3], rank[5]) = (1, 1)  → "an"  ← trùng với i=1
  i=4: (rank[4], rank[6]) = (5, 0)  → "na"
  i=5: (rank[5], -1)      = (1, -1) → "a$"
  i=6: (rank[6], -1)      = (0, -1) → "$"

  (rank[i+2] = -1 nếu i+2 >= n, nghĩa là hậu tố ngắn hơn → đứng trước)

Sắp xếp:
  (0,-1) < (1,-1) < (1,1) = (1,1) < (4,5) < (5,0) < (5,5)
   i=6     i=5     i=1     i=3     i=0     i=4     i=2

SA = [6, 5, 1, 3, 0, 4, 2]
Gán rank mới:
  i:     0    1    2    3    4    5    6
  rank:  4    1    5    1    3    0    2

═══════════════════════════════════════════════════════════
Bước 3 (k=4): Sắp xếp theo (rank[i], rank[i+4])
═══════════════════════════════════════════════════════════

Mỗi hậu tố i được biểu diễn bởi cặp (rank[i], rank[i+4]):
  i=0: (rank[0], rank[4]) = (4, 3)  → "bana"
  i=1: (rank[1], rank[5]) = (1, 0)  → "ana$"
  i=2: (rank[2], rank[6]) = (5, 2)  → "nana"
  i=3: (rank[3], -1)      = (1, -1) → "ana"
  i=4: (rank[4], -1)      = (3, -1) → "na"
  i=5: (rank[5], -1)      = (0, -1) → "a"
  i=6: (rank[6], -1)      = (2, -1) → "$"

Sắp xếp:
  (0,-1) < (1,-1) < (1,0) < (2,-1) < (3,-1) < (4,3) < (5,2)
   i=6     i=3     i=1     i=6→i=6  i=4      i=0     i=2

  Sửa: (0,-1)=i=6, (1,-1)=i=3, (1,0)=i=1, (2,-1)=i=6... 
  → Kiểm tra lại: i=6 có rank=2, không phải 0.

  Đúng hơn:
  (0,-1): i=5 (rank[5]=0)   → "a$"
  (1,-1): i=3 (rank[3]=1)   → "ana$"
  (1,0):  i=1 (rank[1]=1, rank[5]=0) → "anana$"
  (2,-1): i=6 (rank[6]=2)   → "$"
  (3,-1): i=4 (rank[4]=3)   → "na$"
  (4,3):  i=0 (rank[0]=4, rank[4]=3) → "banana$"
  (5,2):  i=2 (rank[2]=5, rank[6]=2) → "nana$"

SA = [5, 3, 1, 6, 4, 0, 2]

Gán rank mới:
  i:     0    1    2    3    4    5    6
  rank:  5    2    6    1    4    0    3

═══════════════════════════════════════════════════════════
Bước 4 (k=8): k >= N → Dừng!
═══════════════════════════════════════════════════════════

Vì k=8 >= N=7, mỗi hậu tố đã được phân biệt hoàn toàn.

Kết quả: SA = [6, 5, 3, 1, 0, 4, 2]
  "$", "a$", "ana$", "anana$", "banana$", "na$", "nana$"
```

#### Tóm tắt quy trình Doubling

```
Bắt đầu: rank = mã ASCII của từng ký tự
Lặp k = 1, 2, 4, 8, ...:
  1. Sắp xếp SA theo cặp (rank[i], rank[i+k])
  2. Gán rank mới liên tục: rank[SA[0]]=0, rank[SA[1]]=1, ...
  3. Nếu tất cả rank khác nhau → dừng sớm
Độ phức tạp: O(N log N) bước, mỗi bước sort O(N log N) → O(N log² N)
```

=== "C++"

    ```cpp
    // Xây dựng Suffix Array bằng phương pháp Doubling — O(N log² N)
    vector<int> buildSA(string s) {
        int n = s.size();
        vector<int> sa(n), rank(n), tmp(n);
        
        // Khởi tạo: sa = [0,1,...,n-1], rank = mã ASCII
        for (int i = 0; i < n; i++) {
            sa[i] = i;
            rank[i] = s[i];
        }
        
        // Doubling: k = 1, 2, 4, 8, ...
        for (int k = 1; k < n; k <<= 1) {
            // So sánh 2 hậu tố a, b dựa trên (rank[i], rank[i+k])
            auto cmp = [&](int a, int b) {
                if (rank[a] != rank[b]) return rank[a] < rank[b];
                // Nếu rank[i] bằng nhau, so sánh rank[i+k]
                // Hậu tố ngắn hơn (i+k >= n) được ưu tiên đứng trước
                int ra = (a + k < n) ? rank[a + k] : -1;
                int rb = (b + k < n) ? rank[b + k] : -1;
                return ra < rb;
            };
            sort(sa.begin(), sa.end(), cmp);
            
            // Gán rank mới liên tục: rank[SA[0]]=0, rank[SA[1]]=1, ...
            // Nếu 2 hậu tố liên tiếp khác nhau → rank tăng 1
            tmp[sa[0]] = 0;
            for (int i = 1; i < n; i++)
                tmp[sa[i]] = tmp[sa[i-1]] + (cmp(sa[i-1], sa[i]) ? 1 : 0);
            rank = tmp;
            
            // Tối ưu: nếu tất cả rank đã khác nhau → dừng sớm
            if (rank[sa[n-1]] == n - 1) break;
        }
        return sa;
    }
    ```

=== "Python"

    ```python
    def build_sa(s):
        """Xây dựng Suffix Array bằng phương pháp Doubling — O(N log² N)"""
        n = len(s)
        sa = list(range(n))          # sa = [0, 1, ..., n-1]
        rank = [ord(c) for c in s]   # rank ban đầu = mã ASCII
        tmp = [0] * n
        
        k = 1
        while k < n:
            # Sắp xếp SA theo cặp (rank[i], rank[i+k])
            # Hậu tố ngắn hơn (i+k >= n) → rank phụ = -1 → đứng trước
            sa.sort(key=lambda x: (rank[x], rank[x + k] if x + k < n else -1))
            
            # Gán rank mới liên tục
            tmp[sa[0]] = 0
            for i in range(1, n):
                prev = (rank[sa[i-1]], rank[sa[i-1]+k] if sa[i-1]+k < n else -1)
                curr = (rank[sa[i]], rank[sa[i]+k] if sa[i]+k < n else -1)
                tmp[sa[i]] = tmp[sa[i-1]] + (1 if prev < curr else 0)
            rank = tmp[:]
            
            # Tối ưu: tất cả rank khác nhau → dừng sớm
            if rank[sa[-1]] == n - 1:
                break
            k <<= 1
        
        return sa
    ```

### 2.3. Phương pháp SA-IS — O(N)

Đây là thuật toán tuyến tính, dựa trên ý tưởng **Induced Sorting**. Ý tưởng chính:

1. Phân loại ký tự thành **S-type** (nhỏ hơn ký tự bên phải) và **L-type** (lớn hơn hoặc bằng)
2. Tìm **LMS** (Leftmost S-type) suffixes
3. Đệ quy xây dựng SA cho LMS suffixes
4. "Induced" ra SA đầy đủ

SA-IS rất phức tạp, thường chỉ cần biết Doubling là đủ cho competitive programming. Xem thêm tại [CP-Algorithms](https://cp-algorithms.com/string/suffix-array.html).

---

## 3. LCP Array (Longest Common Prefix)

### LCP là gì?

`LCP[i]` = độ dài tiền tố chung dài nhất giữa hậu tố `SA[i]` và `SA[i-1]`.

LCP array là **bạn đồng hành** không thể thiếu của Suffix Array. Nó cho biết "hai hậu tố liền kề trong SA giống nhau bao nhiêu ký tự".

```
S = "banana$"
SA:  [6, 5, 3, 1, 0, 4, 2]

Hậu tố theo SA:
  SA[0]=6: "$"
  SA[1]=5: "a$"
  SA[2]=3: "ana$"
  SA[3]=1: "anana$"
  SA[4]=0: "banana$"
  SA[5]=4: "na$"
  SA[6]=2: "nana$"

So sánh từng cặp hậu tố liền kề:
  LCP[0] = 0  (không có hậu tố trước đó)
  LCP[1] = lcp("$", "a$")           = 0  (không có ký tự chung)
  LCP[2] = lcp("a$", "ana$")        = 1  (prefix chung "a")
  LCP[3] = lcp("ana$", "anana$")    = 3  (prefix chung "ana")
  LCP[4] = lcp("anana$", "banana$") = 0  (không có ký tự chung)
  LCP[5] = lcp("banana$", "na$")    = 0  (không có ký tự chung)
  LCP[6] = lcp("na$", "nana$")      = 2  (prefix chung "na")

LCP = [0, 0, 1, 3, 0, 0, 2]
```

### Tại sao LCP quan trọng?

LCP array giúp giải quyết nhiều bài toán mà chỉ Suffix Array không đủ:

- **Tìm xâu con chung dài nhất của 2 xâu:** Dùng LCP trên SA của xâu ghép
- **Đếm số xâu con khác nhau:** Công thức `N*(N+1)/2 - sum(LCP)`
- **Tìm xâu con xuất hiện ≥ K lần:** Tìm đoạn liên tiếp trong SA có LCP ≥ K
- **Tìm lặp lại dài nhất:** Giá trị lớn nhất trong LCP

### Xây dựng LCP bằng Kasai's Algorithm — O(N)

**Bài toán:** Cho S và SA, tính LCP array.

**Cách naïve:** Với mỗi cặp (SA[i], SA[i-1]), so sánh từng ký tự → O(N²).

**Kasai's Algorithm:** Tận dụng tính chất `LCP[i] ≥ LCP[i-1] - 1` để đạt O(N).

#### Ý tưởng cốt lõi

Khi duyệt hậu tố theo thứ tự **gốc** (i = 0, 1, 2, ..., N-1) thay vì theo SA:

- Gọi `rank[i]` = vị trí của hậu tố i trong SA (rank[SA[j]] = j)
- Hậu tố `i` và hậu tố đứng trước nó trong SA (`SA[rank[i]-1]`) có quan hệ gần gũi
- Nếu ta đã tính `lcp(SA[j], SA[j-1]) = k`, thì `lcp(SA[j+1], SA[j]) ≥ k - 1`

**Tại sao?** Hậu tố `SA[j]` và `SA[j-1]` có prefix chung dài k. Bỏ ký tự đầu của cả hai → hậu tố `SA[j]+1` và `SA[j-1]+1` có prefix chung dài k-1. Nếu `SA[j]+1` đứng ngay trước `SA[j-1]+1` trong SA, thì LCP ≥ k-1.

#### Ví dụ chi tiết: Tính LCP cho S = "banana$"

```
S = "banana$"
SA  = [6, 5, 3, 1, 0, 4, 2]
        $  a$ ana$ anana$ banana$ na$ nana$

Tính rank (rank[SA[i]] = i):
  rank[6]=0, rank[5]=1, rank[3]=2, rank[1]=3
  rank[0]=4, rank[4]=5, rank[2]=6

Duyệt i = 0, 1, 2, ..., 6 (theo thứ tự gốc):

i=0: rank[0]=4
  j = SA[rank[0]-1] = SA[3] = 1  → so sánh hậu tố 0 ("banana$") và 1 ("anana$")
  k=0: s[0]='b' ≠ s[1]='a' → k=0
  LCP[4] = 0, k = 0

i=1: rank[1]=3
  j = SA[rank[1]-1] = SA[2] = 3  → so sánh hậu tố 1 ("anana$") và 3 ("ana$")
  k=0: s[1]='a' = s[3]='a' → k++
  k=1: s[2]='n' = s[4]='n' → k++
  k=2: s[3]='a' = s[5]='a' → k++
  k=3: s[4]='n' ≠ s[6]='$' → dừng
  LCP[3] = 3, k = 2 (giảm 1 → k=2 cho bước sau)

i=2: rank[2]=6
  j = SA[rank[2]-1] = SA[5] = 4  → so sánh hậu tố 2 ("nana$") và 4 ("banana$")
  k=2: s[2+2]='n' ≠ s[4+2]='$' → dừng
  → Nhưng k=2 quá lớn, kiểm tra lại: k hiện tại = 2
  → s[2]='n' ≠ s[4]='b' → k=0 ngay
  LCP[6] = 0, k = 0

  (Lưu ý: k không tăng vì ngay ký tự đầu đã khác)

i=3: rank[3]=2
  j = SA[rank[3]-1] = SA[1] = 5  → so sánh hậu tố 3 ("ana$") và 5 ("a$")
  k=0: s[3]='a' = s[5]='a' → k++
  k=1: s[4]='n' ≠ s[6]='$' → dừng
  LCP[2] = 1, k = 0

i=4: rank[4]=5
  j = SA[rank[4]-1] = SA[4] = 0  → so sánh hậu tố 4 ("na$") và 0 ("banana$")
  k=0: s[4]='n' ≠ s[0]='b' → dừng
  LCP[5] = 0, k = 0

i=5: rank[5]=1
  j = SA[rank[5]-1] = SA[0] = 6  → so sánh hậu tố 5 ("a$") và 6 ("$")
  k=0: s[5]='a' ≠ s[6]='$' → dừng
  LCP[1] = 0, k = 0

i=6: rank[6]=0 → bỏ qua (rank=0, không có hậu tố trước)

Kết quả: LCP = [0, 0, 1, 3, 0, 0, 2]
```

#### Code Kasai's Algorithm

=== "C++"

    ```cpp
    // Kasai's Algorithm — Tính LCP array trong O(N)
    // Ý tưởng: duyệt hậu tố theo thứ tự gốc, tận dụng LCP[i] ≥ LCP[i-1] - 1
    vector<int> buildLCP(string s, vector<int>& sa) {
        int n = s.size();
        vector<int> rank(n), lcp(n);
        
        // Tính rank: rank[SA[i]] = i (vị trí của hậu tố i trong SA)
        for (int i = 0; i < n; i++)
            rank[sa[i]] = i;
        
        int k = 0;  // Độ dài LCP hiện tại (từ bước trước)
        for (int i = 0; i < n; i++) {
            // rank[i]=0 nghĩa là hậu tố i đứng đầu SA → không có ai để so sánh
            if (rank[i] == 0) { k = 0; continue; }
            
            // j = hậu tố đứng ngay trước i trong SA
            int j = sa[rank[i] - 1];
            
            // So sánh từng ký tự, bắt đầu từ k (không phải từ 0!)
            while (i + k < n && j + k < n && s[i + k] == s[j + k])
                k++;
            
            lcp[rank[i]] = k;
            
            // Giảm k đi 1 cho bước tiếp theo (tính chất: LCP[i] ≥ LCP[i-1] - 1)
            if (k > 0) k--;
        }
        return lcp;
    }
    ```

=== "Python"

    ```python
    def build_lcp(s, sa):
        """Kasai's Algorithm — Tính LCP array trong O(N)"""
        n = len(s)
        rank = [0] * n
        lcp = [0] * n
        
        # Tính rank: rank[SA[i]] = i
        for i in range(n):
            rank[sa[i]] = i
        
        k = 0  # Độ dài LCP hiện tại
        for i in range(n):
            # rank[i]=0 → hậu tố đầu SA, không so sánh được
            if rank[i] == 0:
                k = 0
                continue
            
            # j = hậu tố đứng trước i trong SA
            j = sa[rank[i] - 1]
            
            # So sánh từ vị trí k (tận dụng kết quả bước trước)
            while i + k < n and j + k < n and s[i + k] == s[j + k]:
                k += 1
            
            lcp[rank[i]] = k
            
            # Giảm k đi 1 cho bước sau
            if k > 0:
                k -= 1
        
        return lcp
    ```

### Tính chất quan trọng của LCP

1. **LCP[i] ≥ LCP[i-1] - 1:** Đây là tính chất then chốt giúp Kasai đạt O(N)
2. **Tổng LCP ≤ N log N:** Tổng các giá trị LCP bị chặn
3. **LCP trên đoạn [l+1, r]:** `min(LCP[l+1], LCP[l+2], ..., LCP[r])` = độ dài prefix chung dài nhất của tất cả hậu tố trong SA[l..r]

### RMQ trên LCP

Để trả lời câu hỏi "LCP của 2 hậu tố bất kỳ SA[i] và SA[j] (i < j) là bao nhiêu?", ta cần tìm min trên đoạn LCP[i+1..j]. Dùng **Sparse Table** hoặc **Segment Tree** để trả lời O(1) hoặc O(log N) mỗi truy vấn.

```cpp
// Sparse Table cho RMQ trên LCP — O(N log N) xây dựng, O(1) truy vấn
vector<vector<int>> buildSparseTable(vector<int>& lcp) {
    int n = lcp.size();
    int LOG = 0;
    while ((1 << LOG) <= n) LOG++;
    
    vector<vector<int>> st(LOG, vector<int>(n));
    st[0] = lcp;
    
    for (int j = 1; j < LOG; j++)
        for (int i = 0; i + (1 << j) <= n; i++)
            st[j][i] = min(st[j-1][i], st[j-1][i + (1 << (j-1))]);
    
    return st;
}

// Truy vấn min trên đoạn [l, r]
int query(vector<vector<int>>& st, int l, int r) {
    if (l > r) swap(l, r);
    int len = r - l + 1;
    int k = 31 - __builtin_clz(len);  // log2(len)
    return min(st[k][l], st[k][r - (1 << k) + 1]);
}

// LCP của 2 hậu tố tại vị trí i, j trong SA
int getLCP(vector<vector<int>>& st, vector<int>& rank, int i, int j) {
    int ri = rank[i], rj = rank[j];
    if (ri > rj) swap(ri, rj);
    if (ri == rj) return (int)st[0].size() - ri;  // cùng hậu tố
    return query(st, ri + 1, rj);  // min LCP trên đoạn [ri+1, rj]
}
```

---

## 4. Ứng dụng

### 4.1. Tìm kiếm pattern — O(M log N)

Tìm pattern P trong xâu S bằng binary search trên Suffix Array.

```cpp
// Tìm tất cả vị trí P xuất hiện trong S — O(M log N)
// Ý tưởng: hậu tố bắt đầu bằng P nằm trong 1 đoạn liên tiếp trong SA
vector<int> search(string s, vector<int>& sa, string pattern) {
    int n = s.size(), m = pattern.size();
    
    // Tìm ranh trái: vị trí đầu tiên mà hậu tố >= pattern
    int lo = 0, hi = n - 1;
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        // So sánh pattern với hậu tố SA[mid]
        if (s.compare(sa[mid], min(m, (int)s.size() - sa[mid]), pattern) >= 0)
            hi = mid;
        else
            lo = mid + 1;
    }
    
    // Tìm tất cả vị trí match (nằm liên tiếp từ lo)
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

**Giải thích:** Mỗi hậu tố S[i..] đóng góp (N-i) xâu con. Nhưng nếu hậu tố SA[j] và SA[j-1] có prefix chung dài LCP[j], thì có L[j] xâu con bị đếm trùng.

### 4.3. Tìm xâu con chung dài nhất của 2 xâu

Ghép 2 xâu: `T = S1 + "$" + S2`. Xây dựng SA và LCP cho T. Tìm 2 hậu tố liền kề trong SA mà **một thuộc S1, một thuộc S2** → LCP của chúng là ứng viên. Kết quả = max của các ứng viên đó.

```cpp
// Tìm xâu con chung dài nhất của s1 và s2 — O(N log N)
string longestCommonSubstring(string s1, string s2) {
    string t = s1 + "$" + s2;
    int n1 = s1.size(), n = t.size();
    
    auto sa = buildSA(t);
    auto lcp = buildLCP(t, sa);
    
    int best = 0, pos = 0;
    for (int i = 1; i < n; i++) {
        // Kiểm tra 2 hậu tố liền kề có thuộc 2 xâu khác nhau không
        bool inS1 = (sa[i] < n1);
        bool inS2 = (sa[i-1] < n1);
        // (sa[i] > n1) và (sa[i-1] > n1) → cả hai trong S2 (bỏ qua ký tự $)
        if (inS1 != inS2 && lcp[i] > best) {
            best = lcp[i];
            pos = sa[i];
        }
    }
    return s1.substr(pos, best);  // hoặc pos - n1 - 1 nếu pos > n1
}
```

### 4.4. Tìm xâu con lặp lại dài nhất

Tìm giá trị lớn nhất trong LCP array. Vị trí đó cho biết 2 hậu tố liền kề có prefix chung dài nhất → xâu con lặp lại dài nhất.

---

## 5. Lưu ý và Common Mistakes

### Lưu ý khi cài đặt

- **Luôn thêm ký tự `$`** (hoặc ký tự nhỏ nhất) vào cuối xâu. Không có `$`, thuật toán có thể sai với hậu tố là prefix của hậu tố khác.
- **Doubling O(N log² N)** đủ nhanh cho N ≤ 10⁵. Nếu cần nhanh hơn, dùng SA-IS O(N) nhưng code phức tạp hơn nhiều.
- **Suffix Array + LCP** là combo mạnh nhất cho bài toán xâu trong competitive programming.

### Common Mistakes (Lỗi thường gặp)

1. **Quên ký tự terminator `$`:**
   ```
   Sai:  buildSA("banana")   → có thể sai khi so sánh hậu tố
   Đúng: buildSA("banana$")  → an toàn
   ```

2. **Rank cũ chưa cập nhật khi dùng cho bước tiếp theo:**
   - Trong Doubling, phải cập rank NGAY SAU KHI sort xong, trước khi sang k tiếp theo.

3. **Trong Kasai's, quên giảm k sau mỗi bước:**
   ```cpp
   // Sai: không giảm k
   // Đúng:
   if (k > 0) k--;  // Bắt buộc!
   ```

4. **So sánh LCP nhầm cặp:**
   - `LCP[i]` so sánh `SA[i]` và `SA[i-1]`, KHÔNG phải `SA[i]` và `SA[i+1]`.

5. **Truy vấn LCP trên RMQ quên cộng 1:**
   ```cpp
   // Sai:  query(st, ri, rj)     → lấy min từ LCP[ri] đến LCP[rj]
   // Đúng: query(st, ri + 1, rj) → lấy min từ LCP[ri+1] đến LCP[rj]
   // Vì LCP[i] = lcp(SA[i], SA[i-1]), nên đoạn [ri+1, rj] mới đúng
   ```

6. **Python sort key quá dài, dễ lỗi cú pháp:**
   - Nên tách ra hàm riêng hoặc dùng tuple ngắn gọn:
   ```python
   # Khó đọc:
   sa.sort(key=lambda x: (rank[x], rank[x+k] if x+k < n else -1))
   
   # Rõ ràng hơn:
   def key_func(x):
       return (rank[x], rank[x + k] if x + k < n else -1)
   sa.sort(key=key_func)
   ```

7. **Không tối ưu dừng sớm:**
   - Nếu tất cả rank đã khác nhau (rank[SA[n-1]] == n-1), dừng ngay. Bỏ qua bước này → TLE với test lớn.

8. **Dùng `s.substr()` trong comparator:**
   ```cpp
   // Sai (O(N² log N)):
   sort(sa.begin(), sa.end(), [&](int a, int b) {
       return s.substr(a) < s.substr(b);  // substr tạo xâu mới mỗi lần!
   });
   // Đúng (O(N log² N)): dùng rank[]
   ```

---

## 6. Bài tập luyện tập

### Cơ bản

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [SPOJ - SARRAY](https://www.spoj.com/problems/SARRAY/) | SPOJ | ⭐⭐⭐ | Cài đặt SA cơ bản |
| [SPOJ - SUBST1](https://www.spoj.com/problems/SUBST1/) | SPOJ | ⭐⭐ | Đếm xâu con khác nhau |
| [CSES - Substring Order I](https://cses.fi/problemset/task/2108) | CSES | ⭐⭐⭐ | Suffix Array |
| [CSES - Substring Order II](https://cses.fi/problemset/task/2109) | CSES | ⭐⭐⭐⭐ | SA + LCP |

### Trung bình

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Substring Queries](https://cses.fi/problemset/task/2110) | CSES | ⭐⭐⭐⭐ | SA + Binary Search |
| [CSES - String Reorder](https://cses.fi/problemset/task/1753) | CSES | ⭐⭐⭐ | SA + LCP |
| [VNOJ - NKVWORDS](https://oj.vnoi.info/problem/nkvwords) | VNOJ | ⭐⭐⭐ | SA + LCP |
| [VNOJ - VOSLIS](https://oj.vnoi.info/problem/voslis) | VNOJ | ⭐⭐⭐⭐ | Xâu con chung dài nhất |

### Nâng cao

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [Codeforces - Palindromic Characteristics](https://codeforces.com/problemset/problem/17/E) | Codeforces | ⭐⭐⭐⭐ | SA + Palindrome |
| [Codeforces - MUH and Cube Walls](https://codeforces.com/problemset/problem/471/D) | Codeforces | ⭐⭐⭐⭐ | SA + Pattern matching |
| [Codeforces - Little Elephant and Strings](https://codeforces.com/problemset/problem/204/E) | Codeforces | ⭐⭐⭐⭐⭐ | SA + LCP + Binary Search |
| [SPOJ - SARRAY2](https://www.spoj.com/problems/SARRAY2/) | SPOJ | ⭐⭐⭐⭐⭐ | SA cài đặt nâng cao |

### Gợi ý lộ trình luyện tập

1. **Bước 1:** Cài đặt SA bằng Doubling → SPOJ SARRAY
2. **Bước 2:** Cài đặt Kasai's LCP → SUBST1
3. **Bước 3:** SA + Binary Search → CSES Substring Order I
4. **Bước 4:** SA + LCP + RMQ → CSES Substring Order II, VNOJ VOSLIS
5. **Bước 5:** Kết hợp với kỹ thuật khác → Codeforces problems

---

## 7. So sánh với Hash Xâu

| Tiêu chí | Suffix Array + LCP | Hash Xâu |
|-----------|-------------------|-----------|
| Độ phức tạp xây dựng | O(N log² N) | O(N) |
| So sánh 2 xâu con | O(1) với RMQ | O(1) |
| Tìm pattern | O(M log N) | O(N + M) |
| Đếm xâu con khác nhau | O(N) | O(N² log N) |
| Xâu con chung dài nhất | O(N log N) | O(N log N) + binary search |
| Collision | Chính xác 100% | Có xác suất sai |
| Code phức tạp | Trung bình | Đơn giản |

**Khi nào dùng SA?** Khi cần chính xác 100%, khi cần nhiều truy vấn trên cùng xâu, khi bài toán yêu cầu RMQ trên LCP.

**Khi nào dùng Hash?** Khi code nhanh, khi chỉ cần so sánh 2 xâu con cụ thể, khi chấp nhận xác suất sai nhỏ.

---

## Tài liệu tham khảo

- [CP-Algorithms - Suffix Array](https://cp-algorithms.com/string/suffix-array.html)
- [CP-Algorithms - LCP Array](https://cp-algorithms.com/string/suffix-array.html#finding-the-longest-common-prefix-of-two-substrings-lcp-array)
- [VNOI Wiki - Suffix Array](https://wiki.vnoi.info/algo/data-structures/suffix-array)
- [YouTube - Suffix Array (takeuforward)](https://www.youtube.com/watch?v=0bL1GPeT5FQ)
- [YouTube - LCP Array & Kasai's Algorithm](https://www.youtube.com/watch?v=71IkJ0GERcI)

**Bài trước:** [← Linked List](33-linked-list.md) | **Bài tiếp theo:** [Euclid & Modular Inverse →](18-euclid-modular-inverse.md)
