# Kĩ Thuật Bao Lồi Trong Quy Hoạch Động

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** VNOI Wiki

---

## 1. Bản chất vấn đề

### Bài toán: Tối ưu hoá với hàm chi phí lồi

Cho công thức DP:

$$dp[i] = \min_{0 \le j < i} \{ dp[j] + C(j, i) \}$$

Trong đó $C(j, i)$ là hàm **lồi** theo $i$ (ví dụ: $(S[i] - S[j])^2$).

**Convex Hull Trick (CHT):** Duy trì tập các đường thẳng, tìm đường thẳng cho giá trị nhỏ nhất tại $x = i$.

### So sánh

| Phương pháp | Thời gian |
|-------------|-----------|
| Duyệt thường | $O(N^2)$ |
| **Convex Hull Trick** | $O(N \log N)$ hoặc $O(N)$ |
| Divide & Conquer | $O(N \log N)$ |

---

## 2. Tư duy cốt lõi

### Ý tưởng: Mỗi $j$ tương ứng 1 đường thẳng

Viết lại: $dp[i] = \min_j \{ m_j \cdot x_i + b_j \}$

Trong đó $m_j$ và $b_j$ phụ thuộc vào $j$, $x_i$ phụ thuộc vào $i$.

**CHT duy trì:** Tập đường thẳng, truy vấn đường thẳng cho giá trị nhỏ nhất tại $x = x_i$.

### Li Chao Tree

Mỗi nút quản lý 1 đoạn $[lo, hi]$, lưu 1 đường thẳng. Khi thêm đường thẳng mới:

- So sánh tại mid: đường thẳng nào tốt hơn tại mid → giữ lại.
- Đường thẳng tệ hơn tại mid → đệ quy sang 1 trong 2 con.

---

## 3. Đánh giá độ phức tạp

| Phương pháp | Thời gian | Không gian |
|-------------|-----------|------------|
| CHT (sắp xếp) | $O(N \log N)$ | $O(N)$ |
| Li Chao Tree | $O(N \log N)$ | $O(N)$ |
| CHT (đơn điệu) | $O(N)$ | $O(N)$ |

---

## Code minh họa

### Convex Hull Trick — Đường thẳng thêm đơn điệu

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    struct Line {
        long long m, b;
        long long eval(long long x) { return m * x + b; }
    };

    struct CHT {
        deque<Line> lines;

        // Kiểm tra giao điểm
        bool bad(Line a, Line b, Line c) {
            return (__int128)(b.b - a.b) * (a.m - c.m) >= (__int128)(c.b - a.b) * (a.m - b.m);
        }

        void add(long long m, long long b) {
            Line l = {m, b};
            while (lines.size() >= 2 && bad(lines[lines.size()-2], lines[lines.size()-1], l))
                lines.pop_back();
            lines.push_back(l);
        }

        long long query(long long x) {
            while (lines.size() >= 2 && lines[0].eval(x) >= lines[1].eval(x))
                lines.pop_front();
            return lines[0].eval(x);
        }
    };

    int main() {
        int n;
        cin >> n;

        vector<long long> a(n + 1), s(n + 1, 0);
        for (int i = 1; i <= n; i++) {
            cin >> a[i];
            s[i] = s[i-1] + a[i];
        }

        // dp[i] = min(dp[j] + s[j]^2 - 2*s[j]*s[i] + s[i]^2)
        // = s[i]^2 + min(dp[j] + s[j]^2 - 2*s[j]*s[i])
        // m = -2*s[j], b = dp[j] + s[j]^2

        vector<long long> dp(n + 1, LLONG_MAX);
        dp[0] = 0;

        CHT cht;
        cht.add(0, 0); // j=0: m=0, b=0

        for (int i = 1; i <= n; i++) {
            dp[i] = s[i] * s[i] + cht.query(s[i]);
            cht.add(-2 * s[i], dp[i] + s[i] * s[i]);
        }

        cout << dp[n] << "\n";
        return 0;
    }
    ```

=== "Python"

    ```python
    from collections import deque
    import sys
    input = sys.stdin.readline

    n = int(input())
    a = [0] + list(map(int, input().split()))
    s = [0] * (n + 1)
    for i in range(1, n + 1):
        s[i] = s[i-1] + a[i]

    class CHT:
        def __init__(self):
            self.lines = deque()

        def _bad(self, a, b, c):
            return (b[1] - a[1]) * (a[0] - c[0]) >= (c[1] - a[1]) * (a[0] - b[0])

        def add(self, m, b):
            l = (m, b)
            while len(self.lines) >= 2 and self._bad(self.lines[-2], self.lines[-1], l):
                self.lines.pop()
            self.lines.append(l)

        def query(self, x):
            while len(self.lines) >= 2 and self.lines[0][0]*x + self.lines[0][1] >= self.lines[1][0]*x + self.lines[1][1]:
                self.lines.popleft()
            return self.lines[0][0] * x + self.lines[0][1]

    dp = [float('inf')] * (n + 1)
    dp[0] = 0
    cht = CHT()
    cht.add(0, 0)

    for i in range(1, n + 1):
        dp[i] = s[i] * s[i] + cht.query(s[i])
        cht.add(-2 * s[i], dp[i] + s[i] * s[i])

    print(dp[n])
    ```
