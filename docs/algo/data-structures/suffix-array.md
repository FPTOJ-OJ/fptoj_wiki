
**Mảng Hậu Tố** là một CTDL giúp **sort** các **hậu tố** theo **thứ tự từ điển**.

Mảng này chứa các số nguyên, khởi đầu của các hậu tố.

Có 2 cách để xây dựng một mảng hậu tố:

1. **Thuật toán không xác định:** Sử dụng thuật toán **Rabin-Karp** và kiểm tra nếu một hậu tố có thứ tự từ điển nhỏ hơn một hậu tố khác,tìm **mảng tiền tố chung lớn nhất** (**LCP**), sau đó sử dụng **Tìm Kiếm Nhị Phân** và **hàm băm** (**Hash**) và kiểm tra ký tự tiếp theo sau **LCP** của chúng.

_Code C++:_

```cpp

namespace HashSuffixArray {

    const int MAXN = 1 << 21;

    typedef unsigned long long hash;
    const hash BASE = 137;

    int N;
    char * S;
    int sa[MAXN];
    hash h[MAXN], hPow[MAXN];

    #define getHash(lo, size) (h[lo] - h[(lo) + (size)] * hPow[size])

    inline bool sufCmp(int i, int j)
    {
        int lo = 1, hi = min(N - i, N - j);
        while (lo <= hi)
        {
            int mid = (lo + hi) >> 1;
            if (getHash(i, mid) == getHash(j, mid))
                lo = mid + 1;
            else
                hi = mid - 1;
        }
        return S[i + hi] < S[j + hi];
    }

    void buildSA()
    {
        N = strlen(S);
        hPow[0] = 1;
        for (int i = 1; i <= N; ++i)
            hPow[i] = hPow[i - 1] * BASE;
        h[N] = 0;
        for (int i = N - 1; i >= 0; --i)
            h[i] = h[i + 1] * BASE + S[i], sa[i] = i;

        stable_sort(sa, sa + N, sufCmp);
    }

} // end namespace HashSuffixArray

```

```python
class HashSuffixArray:
    BASE = 137

    def __init__(self, s):
        self.S = s
        self.N = len(s)
        self.sa = list(range(self.N))
        self.h = [0] * (self.N + 1)
        self.hPow = [1] * (self.N + 1)
        self._build()

    def _get_hash(self, lo, size):
        return self.h[lo] - self.h[lo + size] * self.hPow[size]

    def _suf_cmp(self, i, j):
        lo, hi = 1, min(self.N - i, self.N - j)
        while lo <= hi:
            mid = (lo + hi) >> 1
            if self._get_hash(i, mid) == self._get_hash(j, mid):
                lo = mid + 1
            else:
                hi = mid - 1
        return self.S[i + hi] < self.S[j + hi]

    def _build(self):
        for i in range(1, self.N + 1):
            self.hPow[i] = self.hPow[i - 1] * self.BASE
        self.h[self.N] = 0
        for i in range(self.N - 1, -1, -1):
            self.h[i] = self.h[i + 1] * self.BASE + ord(self.S[i])
        self.sa.sort(key=lambda x: [self._suf_cmp(x, y) for y in self.sa])
```

2. **Thuật toán xác định:** Sort log(Độ dài lớn nhất) bước, với bước thứ i (tính từ 0), sort chúng theo $2^i$ ký tự đầu tiên và đưa hậu tố có cùng tiền tố với $2^{i}$ ký tự vào cùng một bucket.

_Code:_

```cpp

/*
Suffix array O(n lg^2 n)
LCP table O(n)
*/
## include <cstdio>
## include <algorithm>
## include <cstring>

using namespace std;

## define REP(i, n) for (int i = 0; i < (int)(n); ++i)

namespace SuffixArray
{
    const int MAXN = 1 << 21;
    char * S;
    int N, gap;
    int sa[MAXN], pos[MAXN], tmp[MAXN], lcp[MAXN];

    bool sufCmp(int i, int j)
    {
        if (pos[i] != pos[j])
            return pos[i] < pos[j];
        i += gap;
        j += gap;
        return (i < N && j < N) ? pos[i] < pos[j] : i > j;
    }

    void buildSA()
    {
        N = strlen(S);
        REP(i, N) sa[i] = i, pos[i] = S[i];
        for (gap = 1;; gap *= 2)
        {
            sort(sa, sa + N, sufCmp);
            REP(i, N - 1) tmp[i + 1] = tmp[i] + sufCmp(sa[i], sa[i + 1]);
            REP(i, N) pos[sa[i]] = tmp[i];
            if (tmp[N - 1] == N - 1) break;
        }
    }

    void buildLCP()
    {
        for (int i = 0, k = 0; i < N; ++i) if (pos[i] != N - 1)
        {
            for (int j = sa[pos[i] + 1]; S[i + k] == S[j + k];)
            ++k;
            lcp[pos[i]] = k;
            if (k)--k;
        }
    }
} // end namespace SuffixArray

```

```python
class SuffixArray:
    def __init__(self, s):
        self.S = s
        self.N = len(s)
        self.sa = list(range(self.N))
        self.pos = [ord(c) for c in s]
        self.tmp = [0] * self.N
        self.lcp = [0] * self.N
        self._build_sa()
        self._build_lcp()

    def _suf_cmp(self, i, j):
        if self.pos[i] != self.pos[j]:
            return self.pos[i] < self.pos[j]
        i2, j2 = i + self.gap, j + self.gap
        if i2 < self.N and j2 < self.N:
            return self.pos[i2] < self.pos[j2]
        return i > j

    def _build_sa(self):
        self.gap = 1
        while True:
            self.sa.sort(key=lambda x: (self.pos[x], self.pos[x + self.gap] if x + self.gap < self.N else -1))
            self.tmp[0] = 0
            for i in range(self.N - 1):
                self.tmp[i + 1] = self.tmp[i] + (1 if self._suf_cmp(self.sa[i], self.sa[i + 1]) else 0)
            for i in range(self.N):
                self.pos[self.sa[i]] = self.tmp[i]
            if self.tmp[self.N - 1] == self.N - 1:
                break
            self.gap *= 2

    def _build_lcp(self):
        k = 0
        for i in range(self.N):
            if self.pos[i] == self.N - 1:
                continue
            j = self.sa[self.pos[i] + 1]
            while i + k < self.N and j + k < self.N and self.S[i + k] == self.S[j + k]:
                k += 1
            self.lcp[self.pos[i]] = k
            if k:
                k -= 1
```

Source: [mukel](http://codeforces.com/profile/mukel)

## Tài liệu tham khảo:

- [Codeforces](http://codeforces.com/blog/entry/15729)
