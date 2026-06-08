# Bài 32: Suffix Array — Mảng Hậu Tố

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** CP-Algorithms, VNOI Wiki

---

## Bản chất vấn đề

### Bài toán cơ bản

Cho xâu $S$ độ dài $N$. Cần trả lời nhanh các câu hỏi:

- Tìm tất cả vị trí xuất hiện của pattern $P$ trong $S$
- Đếm số xâu con khác nhau
- Tìm xâu con chung dài nhất của hai xâu
- Tìm xâu con lặp lại dài nhất

Suffix Array là cấu trúc dữ liệu giải quyết tất cả bài toán trên với độ phức tạp tốt.

### Hậu tố và Suffix Array

**Hậu tố** (suffix) của $S$ bắt đầu tại vị trí $i$ là xâu $S[i..N-1]$.

**Suffix Array** $SA$ là mảng các chỉ số $i$, sắp xếp theo thứ tự từ điển của hậu tố $S[i..]$.

Ví dụ với $S = \text{"banana\$"}$ (ký tự $\$$ là terminator, nhỏ hơn mọi ký tự khác):

| Chỉ số $i$ | Hậu tố $S[i..]$ |
|:-----------:|:-----------------|
| 0 | banana$ |
| 1 | anana$ |
| 2 | nana$ |
| 3 | ana$ |
| 4 | na$ |
| 5 | a$ |
| 6 | \$ |

Sắp xếp theo thứ tự từ điển:

| Thứ tự | Chỉ số $SA[i]$ | Hậu tố |
|:------:|:---------------:|:--------|
| 0 | 6 | \$ |
| 1 | 5 | a$ |
| 2 | 3 | ana$ |
| 3 | 1 | anana$ |
| 4 | 0 | banana$ |
| 5 | 4 | na$ |
| 6 | 2 | nana$ |

Kết quả: $SA = [6, 5, 3, 1, 0, 4, 2]$

### Vai trò của ký tự terminator $\$$

Ký tự $\$$ nhỏ hơn mọi ký tự khác. Điều này đảm bảo hậu tố ngắn hơn luôn đứng trước hậu tố dài hơn khi có cùng tiền tố. Nếu không có $\$$, so sánh "a" và "ana" vẫn đúng, nhưng các trường hợp biên có thể gây lỗi.

---

## Tư duy cốt lõi

### Phương pháp Doubling — $O(N \log^2 N)$

**Ý tưởng:** Sắp xếp hậu tố theo $1$ ký tự, rồi $2$ ký tự, rồi $4$ ký tự, ..., cho đến $N$ ký tự. Mỗi bước, hậu tố $i$ được biểu diễn bởi cặp $(rank[i],\ rank[i+k])$ — hạng của nửa trái và nửa phải.

**Quy trình:**

1. Khởi tạo $rank[i] = $ mã ASCII của $S[i]$
2. Lặp với $k = 1, 2, 4, 8, \ldots$:
    - Sắp xếp $SA$ theo cặp $(rank[i],\ rank[i+k])$
    - Gán rank mới liên tục: $rank[SA[0]] = 0,\ rank[SA[1]] = 1, \ldots$
    - Nếu tất cả rank khác nhau thì dừng sớm
3. Dừng khi $k \geq N$

**Ví dụ minh họa với $S = \text{"banana\$"}$, $N = 7$:**

Bước 1 ($k=1$): Sắp xếp theo 1 ký tự

| $i$ | $S[i]$ | $rank[i]$ (ban đầu) |
|:---:|:------:|:-------------------:|
| 0 | b | 2 |
| 1 | a | 1 |
| 2 | n | 3 |
| 3 | a | 1 |
| 4 | n | 3 |
| 5 | a | 1 |
| 6 | \$ | 0 |

Sắp xếp theo $rank$: $SA = [6, 1, 3, 5, 0, 2, 4]$

Gán rank mới:

| $i$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|:---:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| $rank[i]$ | 4 | 1 | 5 | 1 | 5 | 1 | 0 |

Bước 2 ($k=2$): Sắp xếp theo $(rank[i],\ rank[i+2])$

| $i$ | $rank[i]$ | $rank[i+2]$ | Cặp |
|:---:|:---------:|:-----------:|:-------:|
| 0 | 4 | 5 | (4, 5) |
| 1 | 1 | 1 | (1, 1) |
| 2 | 5 | 5 | (5, 5) |
| 3 | 1 | 1 | (1, 1) |
| 4 | 5 | 0 | (5, 0) |
| 5 | 1 | -1 | (1, -1) |
| 6 | 0 | -1 | (0, -1) |

Sắp xếp: $SA = [6, 5, 1, 3, 0, 4, 2]$

Gán rank mới:

| $i$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|:---:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| $rank[i]$ | 4 | 1 | 5 | 1 | 3 | 0 | 2 |

Bước 3 ($k=4$): Sắp xếp theo $(rank[i],\ rank[i+4])$

| $i$ | $rank[i]$ | $rank[i+4]$ | Cặp |
|:---:|:---------:|:-----------:|:-------:|
| 0 | 4 | 3 | (4, 3) |
| 1 | 1 | 0 | (1, 0) |
| 2 | 5 | 2 | (5, 2) |
| 3 | 1 | -1 | (1, -1) |
| 4 | 3 | -1 | (3, -1) |
| 5 | 0 | -1 | (0, -1) |
| 6 | 2 | -1 | (2, -1) |

Sắp xếp: $SA = [5, 3, 1, 6, 4, 0, 2]$

Khi $k=8 \geq N=7$, dừng. Mỗi hậu tố đã được phân biệt hoàn toàn.

Kết quả: $SA = [6, 5, 3, 1, 0, 4, 2]$

### Cài đặt Doubling

=== "C++"

    ```cpp
    vector<int> buildSA(string s) {
        int n = s.size();
        vector<int> sa(n), rank(n), tmp(n);
        for (int i = 0; i < n; i++) {
            sa[i] = i;
            rank[i] = s[i];
        }
        for (int k = 1; k < n; k <<= 1) {
            auto cmp = [&](int a, int b) {
                if (rank[a] != rank[b]) return rank[a] < rank[b];
                int ra = (a + k < n) ? rank[a + k] : -1;
                int rb = (b + k < n) ? rank[b + k] : -1;
                return ra < rb;
            };
            sort(sa.begin(), sa.end(), cmp);
            tmp[sa[0]] = 0;
            for (int i = 1; i < n; i++)
                tmp[sa[i]] = tmp[sa[i-1]] + (cmp(sa[i-1], sa[i]) ? 1 : 0);
            rank = tmp;
            if (rank[sa[n-1]] == n - 1) break;
        }
        return sa;
    }
    ```

=== "Python"

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
                prev = (rank[sa[i-1]], rank[sa[i-1]+k] if sa[i-1]+k < n else -1)
                curr = (rank[sa[i]], rank[sa[i]+k] if sa[i]+k < n else -1)
                tmp[sa[i]] = tmp[sa[i-1]] + (1 if prev < curr else 0)
            rank = tmp[:]
            if rank[sa[-1]] == n - 1:
                break
            k <<= 1
        return sa
    ```

### LCP Array — Bạn đồng hành của Suffix Array

$LCP[i]$ là độ dài tiền tố chung dài nhất giữa hậu tố $SA[i]$ và $SA[i-1]$. $LCP[0] = 0$ (không có hậu tố trước đó).

Ví dụ với $S = \text{"banana\$"}$, $SA = [6, 5, 3, 1, 0, 4, 2]$:

| $i$ | $SA[i]$ | Hậu tố | $LCP[i]$ | Giải thích |
|:---:|:-------:|:--------|:---------:|:------------|
| 0 | 6 | \$ | 0 | Không có hậu tố trước |
| 1 | 5 | a\$ | 0 | lcp(\$, a\$) = 0 |
| 2 | 3 | ana\$ | 1 | lcp(a\$, ana\$) = 1 |
| 3 | 1 | anana\$ | 3 | lcp(ana\$, anana\$) = 3 |
| 4 | 0 | banana\$ | 0 | lcp(anana\$, banana\$) = 0 |
| 5 | 4 | na\$ | 0 | lcp(banana\$, na\$) = 0 |
| 6 | 2 | nana\$ | 2 | lcp(na\$, nana\$) = 2 |

$LCP = [0, 0, 1, 3, 0, 0, 2]$

### Kasai's Algorithm — Xây dựng LCP trong $O(N)$

**Ý tưởng cốt lõi:** Duyệt hậu tố theo thứ tự gốc $i = 0, 1, \ldots, N-1$ thay vì theo $SA$. Gọi $rank[i]$ là vị trí của hậu tố $i$ trong $SA$. Khi đã tính $LCP[j] = k$, thì $LCP[j+1] \geq k - 1$.

**Tại sao?** Hậu tố $SA[j]$ và $SA[j-1]$ có prefix chung dài $k$. Bỏ ký tự đầu của cả hai, hậu tố $SA[j]+1$ và $SA[j-1]+1$ có prefix chung dài $k-1$.

**Ví dụ chi tiết với $S = \text{"banana\$"}$:**

$SA = [6, 5, 3, 1, 0, 4, 2]$, tính $rank$: $rank[6]=0,\ rank[5]=1,\ rank[3]=2,\ rank[1]=3,\ rank[0]=4,\ rank[4]=5,\ rank[2]=6$.

Duyệt $i = 0, 1, \ldots, 6$:

| $i$ | $rank[i]$ | $j = SA[rank[i]-1]$ | So sánh | $LCP[rank[i]]$ | $k$ sau |
|:---:|:---------:|:--------------------:|:--------|:---------------:|:-------:|
| 0 | 4 | SA[3] = 1 | banana\$ vs anana\$: khác ngay | $LCP[4]=0$ | 0 |
| 1 | 3 | SA[2] = 3 | anana\$ vs ana\$: 3 ký tự giống | $LCP[3]=3$ | 2 |
| 2 | 6 | SA[5] = 4 | nana\$ vs banana\$: khác ngay | $LCP[6]=0$ | 0 |
| 3 | 2 | SA[1] = 5 | ana\$ vs a\$: 1 ký tự giống | $LCP[2]=1$ | 0 |
| 4 | 5 | SA[4] = 0 | na\$ vs banana\$: khác ngay | $LCP[5]=0$ | 0 |
| 5 | 1 | SA[0] = 6 | a\$ vs \$: khác ngay | $LCP[1]=0$ | 0 |
| 6 | 0 | Bỏ qua | — | — | — |

Kết quả: $LCP = [0, 0, 1, 3, 0, 0, 2]$

### Cài đặt Kasai's Algorithm

=== "C++"

    ```cpp
    vector<int> buildLCP(string s, vector<int>& sa) {
        int n = s.size();
        vector<int> rank(n), lcp(n);
        for (int i = 0; i < n; i++)
            rank[sa[i]] = i;
        int k = 0;
        for (int i = 0; i < n; i++) {
            if (rank[i] == 0) { k = 0; continue; }
            int j = sa[rank[i] - 1];
            while (i + k < n && j + k < n && s[i + k] == s[j + k])
                k++;
            lcp[rank[i]] = k;
            if (k > 0) k--;
        }
        return lcp;
    }
    ```

=== "Python"

    ```python
    def build_lcp(s, sa):
        n = len(s)
        rank = [0] * n
        lcp = [0] * n
        for i in range(n):
            rank[sa[i]] = i
        k = 0
        for i in range(n):
            if rank[i] == 0:
                k = 0
                continue
            j = sa[rank[i] - 1]
            while i + k < n and j + k < n and s[i + k] == s[j + k]:
                k += 1
            lcp[rank[i]] = k
            if k > 0:
                k -= 1
        return lcp
    ```

### RMQ trên LCP

Để tính LCP của hai hậu tố bất kỳ $SA[i]$ và $SA[j]$ ($i < j$), cần tìm $\min(LCP[i+1], LCP[i+2], \ldots, LCP[j])$. Dùng Sparse Table để trả lời $O(1)$ mỗi truy vấn.

=== "C++"

    ```cpp
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

    int query(vector<vector<int>>& st, int l, int r) {
        if (l > r) swap(l, r);
        int len = r - l + 1;
        int k = 31 - __builtin_clz(len);
        return min(st[k][l], st[k][r - (1 << k) + 1]);
    }

    int getLCP(vector<vector<int>>& st, vector<int>& rank, int i, int j) {
        int ri = rank[i], rj = rank[j];
        if (ri > rj) swap(ri, rj);
        if (ri == rj) return (int)st[0].size() - ri;
        return query(st, ri + 1, rj);
    }
    ```

### Phương pháp SA-IS — $O(N)$

SA-IS là thuật toán tuyến tính dựa trên Induced Sorting. Ý tưởng chính:

1. Phân loại ký tự thành S-type (nhỏ hơn ký tự bên phải) và L-type (lớn hơn hoặc bằng)
2. Tìm LMS (Leftmost S-type) suffixes
3. Đệ quy xây dựng $SA$ cho LMS suffixes
4. Induced ra $SA$ đầy đủ

SA-IS rất phức tạp, thường chỉ cần Doubling là đủ cho competitive programming. Xem thêm tại [CP-Algorithms](https://cp-algorithms.com/string/suffix-array.html).

---

## Phân tích tính đúng đắn

### Tính đúng đắn của Doubling

**Bước cơ sở:** Khi $k=1$, sắp xếp theo ký tự đầu tiên. Hai hậu tố có cùng ký tự đầu được xếp cạnh nhau nhưng chưa phân biệt hoàn toàn.

**Bước đệ quy:** Giả sử sau bước $k$, hai hậu tố $i$ và $j$ có cùng $rank$ khi và chỉ khi $S[i..i+k-1] = S[j..j+k-1]$ (prefix dài $k$ giống nhau). Ở bước $2k$, so sánh $(rank[i],\ rank[i+k])$ với $(rank[j],\ rank[j+k])$. Điều này tương đương so sánh $S[i..i+2k-1]$ với $S[j..j+2k-1]$.

**Kết luận:** Sau $\lceil \log_2 N \rceil$ bước, mỗi hậu tố được phân biệt hoàn toàn vì prefix dài $N$ đủ để so sánh toàn bộ hậu tố.

### Tính đúng đắn của Kasai's

**Bổ đề then chốt:** $LCP(rank[i]) \geq LCP(rank[i-1]) - 1$.

**Chứng minh:** Gọi $h = LCP(rank[i-1])$. Hậu tố $SA[rank[i-1]]$ và $SA[rank[i-1]-1]$ có prefix chung dài $h$. Bỏ ký tự đầu, hậu tố $SA[rank[i-1]]+1$ và $SA[rank[i-1]-1]+1$ có prefix chung dài $h-1$. Hậu tố $SA[rank[i-1]]+1 = i$ đứng sau $SA[rank[i-1]-1]+1$ trong $SA$ (vì $SA$ đã sắp xếp). Do đó $LCP(rank[i]) \geq h - 1$.

**Hệ quả:** Khi duyệt $i$ từ $0$ đến $N-1$, giá trị $k$ không cần reset về $0$ mà chỉ giảm tối đa $1$ mỗi bước. Tổng số lần tăng $k$ tối đa $N$, tổng số lần giảm tối đa $N$, nên tổng độ phức tạp $O(N)$.

### Tính chất quan trọng của LCP

1. $LCP[i] \geq LCP[i-1] - 1$: Tính chất then chốt giúp Kasai đạt $O(N)$
2. $\sum LCP[i] \leq N \log N$: Tổng các giá trị LCP bị chặn
3. $\min(LCP[l+1], LCP[l+2], \ldots, LCP[r])$ = độ dài prefix chung dài nhất của tất cả hậu tố trong $SA[l..r]$

---

## Đánh giá độ phức tạp

### Xây dựng Suffix Array

| Phương pháp | Thời gian | Không gian | Ghi chú |
|:------------|:---------:|:----------:|:--------|
| Sort hậu tố trực tiếp | $O(N^2 \log N)$ | $O(N)$ | Quá chậm |
| Doubling | $O(N \log^2 N)$ | $O(N)$ | Đủ cho $N \leq 10^5$ |
| SA-IS | $O(N)$ | $O(N)$ | Code phức tạp |

### Xây dựng LCP Array

| Phương pháp | Thời gian | Không gian |
|:------------|:---------:|:----------:|
| Naïve | $O(N^2)$ | $O(N)$ |
| Kasai's | $O(N)$ | $O(N)$ |

### Các truy vấn phổ biến

| Bài toán | Độ phức tạp | Phương pháp |
|:---------|:----------:|:------------|
| Tìm pattern $P$ | $O(|P| \log N)$ | Binary search trên $SA$ |
| Đếm xâu con khác nhau | $O(N)$ | Công thức $N(N+1)/2 - \sum LCP$ |
| Xâu con chung dài nhất | $O(N \log N)$ | $SA + LCP$ trên xâu ghép |
| LCP của 2 hậu tố bất kỳ | $O(1)$ | Sparse Table trên $LCP$ |
| Xâu con lặp lại dài nhất | $O(N)$ | $\max(LCP)$ |

---

## Ứng dụng

### Tìm kiếm pattern — $O(|P| \log N)$

Tìm pattern $P$ trong $S$ bằng binary search trên $SA$. Hậu tố bắt đầu bằng $P$ nằm trong một đoạn liên tiếp trong $SA$.

=== "C++"

    ```cpp
    vector<int> search(string s, vector<int>& sa, string pattern) {
        int n = s.size(), m = pattern.size();
        int lo = 0, hi = n - 1;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (s.compare(sa[mid], min(m, (int)s.size() - sa[mid]), pattern) >= 0)
                hi = mid;
            else
                lo = mid + 1;
        }
        vector<int> result;
        while (lo < n && s.compare(sa[lo], min(m, (int)s.size() - sa[lo]), pattern) == 0) {
            result.push_back(sa[lo]);
            lo++;
        }
        return result;
    }
    ```

=== "Python"

    ```python
    def search(s, sa, pattern):
        n, m = len(s), len(pattern)
        lo, hi = 0, n - 1
        while lo < hi:
            mid = (lo + hi) // 2
            if s[sa[mid]:sa[mid]+m] >= pattern:
                hi = mid
            else:
                lo = mid + 1
        result = []
        while lo < n and s[sa[lo]:sa[lo]+m] == pattern:
            result.append(sa[lo])
            lo += 1
        return result
    ```

### Đếm số xâu con khác nhau

Mỗi hậu tố $S[i..]$ đóng góp $N-i$ xâu con. Số xâu con bị đếm trùng = $\sum LCP[i]$. Số xâu con khác nhau:

$$\frac{N(N+1)}{2} - \sum_{i=0}^{N-1} LCP[i]$$

### Tìm xâu con chung dài nhất của hai xâu

Ghép hai xâu: $T = S_1 + \text{"\$"} + S_2$. Xây dựng $SA$ và $LCP$ cho $T$. Tìm hai hậu tố liền kề trong $SA$ mà một thuộc $S_1$, một thuộc $S_2$. Kết quả là $\max(LCP[i])$ tại các vị trí đó.

=== "C++"

    ```cpp
    string longestCommonSubstring(string s1, string s2) {
        string t = s1 + "$" + s2;
        int n1 = s1.size(), n = t.size();
        auto sa = buildSA(t);
        auto lcp = buildLCP(t, sa);
        int best = 0, pos = 0;
        for (int i = 1; i < n; i++) {
            bool inS1 = (sa[i] < n1);
            bool inS2 = (sa[i-1] < n1);
            if (inS1 != inS2 && lcp[i] > best) {
                best = lcp[i];
                pos = sa[i];
            }
        }
        return s1.substr(pos, best);
    }
    ```

=== "Python"

    ```python
    def longest_common_substring(s1, s2):
        t = s1 + "$" + s2
        n1 = len(s1)
        sa = build_sa(t)
        lcp = build_lcp(t, sa)
        best, pos = 0, 0
        for i in range(1, len(t)):
            in_s1 = sa[i] < n1
            in_s2 = sa[i-1] < n1
            if in_s1 != in_s2 and lcp[i] > best:
                best = lcp[i]
                pos = sa[i]
        return s1[pos:pos+best]
    ```

### Tìm xâu con lặp lại dài nhất

Tìm giá trị lớn nhất trong $LCP$ array. Hai hậu tố liền kề tại vị trí đó có prefix chung dài nhất, tức là xâu con lặp lại dài nhất.

---

## Lưu ý và lỗi thường gặp

1. **Luôn thêm ký tự $\$$** vào cuối xâu. Không có $\$$, thuật toán có thể sai khi hậu tố này là prefix của hậu tố khác.

2. **Cập nhật rank ngay sau khi sort** trong Doubling. Nếu dùng rank cũ cho bước tiếp theo, kết quả sai.

3. **Giảm $k$ sau mỗi bước** trong Kasai's. Quên giảm $k$ khiến thuật toán chạy quá $O(N)$.

4. **$LCP[i]$ so sánh $SA[i]$ và $SA[i-1]$**, không phải $SA[i]$ và $SA[i+1]$.

5. **Truy vấn RMQ trên LCP:** Dùng đoạn $[ri+1, rj]$ thay vì $[ri, rj]$. Vì $LCP[i] = lcp(SA[i], SA[i-1])$, đoạn $[ri+1, rj]$ mới đúng.

6. **Không dùng `s.substr()` trong comparator** của Doubling. Mỗi lần gọi tạo xâu mới, khiến độ phức tạp thành $O(N^2 \log N)$. Dùng $rank[]$ thay thế.

7. **Tối ưu dừng sớm:** Nếu $rank[SA[N-1]] == N-1$, tất cả rank đã khác nhau, dừng ngay.

---

## So sánh với Hash Xâu

| Tiêu chí | Suffix Array + LCP | Hash Xâu |
|:---------|:------------------:|:---------:|
| Xây dựng | $O(N \log^2 N)$ | $O(N)$ |
| So sánh hai xâu con | $O(1)$ với RMQ | $O(1)$ |
| Tìm pattern | $O(M \log N)$ | $O(N+M)$ |
| Đếm xâu con khác nhau | $O(N)$ | $O(N^2 \log N)$ |
| Chính xác | 100% | Có xác suất sai |

Dùng SA khi cần chính xác 100% hoặc nhiều truy vấn trên cùng xâu. Dùng Hash khi code nhanh hoặc chỉ so sánh hai xâu con cụ thể.

---

## Bài tập luyện tập

### Cơ bản

| Bài | Nền tảng | Độ khó | Chủ đề |
|:----|:--------:|:------:|:-------|
| [SPOJ - SARRAY](https://www.spoj.com/problems/SARRAY/) | SPOJ | ⭐⭐⭐ | Cài đặt SA cơ bản |
| [SPOJ - SUBST1](https://www.spoj.com/problems/SUBST1/) | SPOJ | ⭐⭐ | Đếm xâu con khác nhau |
| [CSES - Substring Order I](https://cses.fi/problemset/task/2108) | CSES | ⭐⭐⭐ | Suffix Array |
| [CSES - Substring Order II](https://cses.fi/problemset/task/2109) | CSES | ⭐⭐⭐⭐ | SA + LCP |

### Trung bình

| Bài | Nền tảng | Độ khó | Chủ đề |
|:----|:--------:|:------:|:-------|
| [CSES - Substring Queries](https://cses.fi/problemset/task/2110) | CSES | ⭐⭐⭐⭐ | SA + Binary Search |
| [CSES - String Matching](https://cses.fi/problemset/task/1753) | CSES | ⭐⭐⭐ | SA + LCP |
| [VNOJ - NKVWORDS](https://oj.vnoi.info/problem/nkvwords) | VNOJ | ⭐⭐⭐ | SA + LCP |
| [VNOJ - VOSLIS](https://oj.vnoi.info/problem/voslis) | VNOJ | ⭐⭐⭐⭐ | Xâu con chung dài nhất |

### Nâng cao

| Bài | Nền tảng | Độ khó | Chủ đề |
|:----|:--------:|:------:|:-------|
| [Codeforces - Palindromic Characteristics](https://codeforces.com/problemset/problem/17/E) | Codeforces | ⭐⭐⭐⭐ | SA + Palindrome |
| [Codeforces - MUH and Cube Walls](https://codeforces.com/problemset/problem/471/D) | Codeforces | ⭐⭐⭐⭐ | SA + Pattern matching |
| [Codeforces - Little Elephant and Strings](https://codeforces.com/problemset/problem/204/E) | Codeforces | ⭐⭐⭐⭐⭐ | SA + LCP + Binary Search |
| [SPOJ - SARRAY2](https://www.spoj.com/problems/SARRAY2/) | SPOJ | ⭐⭐⭐⭐⭐ | SA nâng cao |

### Lộ trình luyện tập

1. Cài đặt SA bằng Doubling — SPOJ SARRAY
2. Cài đặt Kasai's LCP — SUBST1
3. SA + Binary Search — CSES Substring Order I
4. SA + LCP + RMQ — CSES Substring Order II, VNOJ VOSLIS
5. Kết hợp kỹ thuật khác — Codeforces problems

---

## Tài liệu tham khảo

- [CP-Algorithms - Suffix Array](https://cp-algorithms.com/string/suffix-array.html)
- [VNOI Wiki - Suffix Array](https://wiki.vnoi.info/algo/data-structures/suffix-array)
- [YouTube - Suffix Array (takeuforward)](https://www.youtube.com/watch?v=0bL1GPeT5FQ)
- [YouTube - LCP Array & Kasai's Algorithm](https://www.youtube.com/watch?v=71IkJ0GERcI)

**Bài trước:** [Linked List](linked-list.md) | **Bài tiếp theo:** [Euclid & Modular Inverse](euclid-modular-inverse.md)
