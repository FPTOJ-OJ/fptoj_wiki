# Bài 54: Convex Hull Trick & Li Chao Tree

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** VNOI Wiki, CP-Algorithms

---

## Bạn sẽ học được gì?

- **Bản chất của Convex Hull Trick (CHT):** Kỹ thuật chuyển đổi bài toán tối ưu hóa quy hoạch động phi tuyến thành bài toán hình học quản lý bao lồi của các đường thẳng.
- **Chứng minh điều kiện loại bỏ đường thẳng:** Công thức toán học đằng sau việc xác định một đường thẳng bị vô dụng (redundant line).
- **Thuật toán Static CHT:** Cài đặt tối ưu bằng cấu trúc Deque trong $O(N)$ hoặc Tìm kiếm nhị phân trong $O(N \log N)$.
- **Thuật toán Dynamic CHT với Li Chao Tree:** Cấu trúc dữ liệu mạnh mẽ để quản lý các đường thẳng thêm vào theo thứ tự bất kỳ.
- **Ứng dụng qua bài toán kinh điển:** Batch Scheduling (IOI 2002) và ACQUIRE (USACO).

---

## 1. Bài toán dẫn nhập và Biểu diễn Hình học

### 1.1 Mô tả bài toán
Trong các bài toán quy hoạch động, ta thường gặp công thức tối ưu hóa có dạng:
$$dp[i] = \min_{0 \le j < i} \{ dp[j] + b[j] \cdot a[i] \} + c[i]$$
Trong đó $a[i]$ là tham số truy vấn tại bước $i$, $b[j]$ là hệ số góc thu được từ trạng thái $j$, và $dp[j]$ là giá trị tối ưu đã tính.

Nếu duyệt qua mọi trạng thái $j < i$, độ phức tạp thời gian để tính toàn bộ mảng $dp$ là $O(N^2)$. Khi $N \ge 10^5$, thuật toán này sẽ bị quá thời gian (TLE).

### 1.2 Biểu diễn dưới dạng hình học
Với mỗi lựa chọn $j$, ta có thể coi cụm giá trị phụ thuộc vào $j$ là một đường thẳng trong hệ tọa độ $Oxy$:
$$f_j(x) = m_j \cdot x + c_j$$
Trong đó:
- Hệ số góc: $m_j = b[j]$
- Hệ số tự do (tung độ gốc): $c_j = dp[j]$

Bài toán lúc này quy về: Tìm giá trị nhỏ nhất của tập hợp các đường thẳng $\{f_0, f_1, \dots, f_{i-1}\}$ tại hoành độ truy vấn $x = a[i]$.
Đường bao dưới cùng của tất cả các đường thẳng này được gọi là **Đường bao dưới (Lower Envelope)**. Hình dạng của Lower Envelope là một đường lồi hướng xuống dưới, được ghép bởi các phân đoạn của các đường thẳng có hệ số góc giảm dần (hoặc tăng dần).

---

## 2. Phân tích Toán học về sự vô dụng của đường thẳng

Khi thêm một đường thẳng mới vào tập hợp, một số đường thẳng cũ có thể không bao giờ đạt giá trị nhỏ nhất tại bất kỳ hoành độ $x$ nào nữa. Ta gọi những đường thẳng này là vô dụng (bad/redundant lines) và cần loại bỏ chúng khỏi cấu trúc quản lý bao lồi.

### Chứng minh công thức loại bỏ
Xét ba đường thẳng liên tiếp $L_1, L_2, L_3$ với hệ số góc giảm dần $m_1 > m_2 > m_3$.
Phương trình của các đường thẳng:
$$L_1: y = m_1 x + c_1$$
$$L_2: y = m_2 x + c_2$$
$$L_3: y = m_3 x + c_3$$

Hoành độ giao điểm của $L_1$ và $L_2$ là:
$$x_{12} = \frac{c_2 - c_1}{m_1 - m_2}$$
Hoành độ giao điểm của $L_2$ và $L_3$ là:
$$x_{23} = \frac{c_3 - c_2}{m_2 - m_3}$$

Đường thẳng ở giữa $L_2$ sẽ trở nên **vô dụng** khi và chỉ khi giao điểm của $L_2$ và $L_3$ nằm ở bên trái (hoặc trùng) giao điểm của $L_1$ và $L_2$:
$$x_{23} \le x_{12}$$

Điều này tương đương với:
$$\frac{c_3 - c_2}{m_2 - m_3} \le \frac{c_2 - c_1}{m_1 - m_2}$$

Vì $m_1 > m_2 > m_3$, các hiệu số $m_1 - m_2$ và $m_2 - m_3$ đều lớn hơn $0$. Ta có thể nhân chéo trực tiếp để tránh chia số thực dẫn đến sai số:
$$(c_3 - c_2)(m_1 - m_2) \le (c_2 - c_1)(m_2 - m_3)$$

```matplotlib
x = np.linspace(-1, 4, 200)

y1 = 3 * x + 1
y2 = 1.5 * x + 2.5
y3 = 0.5 * x + 4

y2_red = 1.5 * x + 3.2

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

ax1.plot(x, y1, '--', label='$L_1 (y=3x+1)$', alpha=0.7)
ax1.plot(x, y2, '-', label='$L_2 (y=1.5x+2.5)$', linewidth=2)
ax1.plot(x, y3, '--', label='$L_3 (y=0.5x+4)$', alpha=0.7)
envelope1 = np.minimum(np.minimum(y1, y2), y3)
ax1.plot(x, envelope1, color='red', alpha=0.3, linewidth=6, label='Lower Envelope')
ax1.set_title('Trường hợp $L_2$ có ích ($x_{12} < x_{23}$)')
ax1.set_xlabel('x')
ax1.set_ylabel('y')
ax1.grid(True, alpha=0.3)
ax1.legend()

ax2.plot(x, y1, '--', label='$L_1 (y=3x+1)$', alpha=0.7)
ax2.plot(x, y2_red, '-', label='$L_2 (y=1.5x+3.2)$', linewidth=2)
ax2.plot(x, y3, '--', label='$L_3 (y=0.5x+4)$', alpha=0.7)
envelope2 = np.minimum(y1, y3)
ax2.plot(x, envelope2, color='red', alpha=0.3, linewidth=6, label='Lower Envelope')
ax2.set_title('Trường hợp $L_2$ vô dụng ($x_{23} \\leq x_{12}$)')
ax2.set_xlabel('x')
ax2.set_ylabel('y')
ax2.grid(True, alpha=0.3)
ax2.legend()

plt.tight_layout()
```

---

## 3. Static CHT (Hệ số góc đơn điệu)

Nếu các đường thẳng được thêm vào theo thứ tự hệ số góc $m_j$ đơn điệu (ví dụ giảm dần), ta gọi đây là **Static CHT**. Ta có hai trường hợp dựa trên tính đơn điệu của hoành độ truy vấn $x$:

### Trường hợp A: Hoành độ truy vấn $x$ đơn điệu tăng ($O(N)$)
Ta duy trì bao lồi bằng cấu trúc hàng đợi hai đầu Deque. Do $x$ tăng dần, đường thẳng tối ưu ở đầu Deque cũng dịch chuyển theo một chiều. Ta dùng con trỏ tịnh tiến ở đầu Deque.

### Trường hợp B: Hoành độ truy vấn $x$ bất kỳ ($O(N \log N)$)
Ta không thể loại bỏ phần tử ở đầu Deque vì các truy vấn sau có thể quay lại hoành độ nhỏ. Tuy nhiên, các khoảng tối ưu của các đường thẳng sắp xếp tăng dần. Ta dùng Tìm kiếm nhị phân (Binary Search) trên Deque để tìm đường thẳng tối ưu.

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    struct Line {
        long long m, c;
        long long eval(long long x) const {
            return m * x + c;
        }
    };

    struct ConvexHullTrick {
        vector<Line> hull;

        // Kiểm tra xem l2 có vô dụng khi chèn l3 sau l1 không
        bool is_bad(const Line& l1, const Line& l2, const Line& l3) {
            // Nhân chéo kiểu __int128 để tránh tràn số
            return (__int128)(l3.c - l2.c) * (l1.m - l2.m) 
                <= (__int128)(l2.c - l1.c) * (l2.m - l3.m);
        }

        // Thêm đường thẳng mới (yêu cầu m giảm dần)
        void add_line(long long m, long long c) {
            Line nw = {m, c};
            // Nếu trùng hệ số góc, chỉ giữ đường thẳng có tung độ gốc tốt hơn
            if (!hull.empty() && hull.back().m == m) {
                if (c >= hull.back().c) return;
                hull.pop_back();
            }
            while (hull.size() >= 2 && is_bad(hull[hull.size() - 2], hull.back(), nw)) {
                hull.pop_back();
            }
            hull.push_back(nw);
        }

        // Trường hợp 1: x tăng dần (Duyệt tịnh tiến bằng con trỏ ptr)
        int ptr = 0;
        long long query_linear(long long x) {
            if (hull.empty()) return 1e18;
            ptr = min(ptr, (int)hull.size() - 1);
            while (ptr + 1 < (int)hull.size() && hull[ptr + 1].eval(x) <= hull[ptr].eval(x)) {
                ptr++;
            }
            return hull[ptr].eval(x);
        }

        // Trường hợp 2: x bất kỳ (Tìm kiếm nhị phân)
        long long query_binary_search(long long x) {
            if (hull.empty()) return 1e18;
            int lo = 0, hi = (int)hull.size() - 1;
            while (lo < hi) {
                int mid = (lo + hi) / 2;
                if (hull[mid].eval(x) <= hull[mid + 1].eval(x)) {
                    hi = mid;
                } else {
                    lo = mid + 1;
                }
            }
            return hull[lo].eval(x);
        }
    };
    ```

=== "Python"

    ```python
    class ConvexHullTrick:
        def __init__(self):
            self.hull = [] # Danh sách các đường thẳng dạng (m, c)
            self.ptr = 0

        def _is_bad(self, l1, l2, l3):
            # Nhân chéo tránh phép chia số thực
            return (l3[1] - l2[1]) * (l1[0] - l2[0]) <= (l2[1] - l1[1]) * (l2[0] - l3[0])

        def add_line(self, m, c):
            nw = (m, c)
            if self.hull and self.hull[-1][0] == m:
                if c >= self.hull[-1][1]:
                    return
                self.hull.pop()
            while len(self.hull) >= 2 and self._is_bad(self.hull[-2], self.hull[-1], nw):
                self.hull.pop()
            self.hull.append(nw)

        def query_linear(self, x):
            if not self.hull:
                return float('inf')
            self.ptr = min(self.ptr, len(self.hull) - 1)
            while self.ptr + 1 < len(self.hull) and (self.hull[self.ptr + 1][0] * x + self.hull[self.ptr + 1][1]) <= (self.hull[self.ptr][0] * x + self.hull[self.ptr][1]):
                self.ptr += 1
            return self.hull[self.ptr][0] * x + self.hull[self.ptr][1]

        def query_binary_search(self, x):
            if not self.hull:
                return float('inf')
            lo, hi = 0, len(self.hull) - 1
            while lo < hi:
                mid = (lo + hi) // 2
                val1 = self.hull[mid][0] * x + self.hull[mid][1]
                val2 = self.hull[mid + 1][0] * x + self.hull[mid + 1][1]
                if val1 <= val2:
                    hi = mid
                else:
                    lo = mid + 1
            return self.hull[lo][0] * x + self.hull[lo][1]
    ```

---

## 4. Dynamic CHT với Li Chao Tree

Khi hệ số góc $m$ được thêm vào theo **thứ tự bất kỳ**, ta không thể duy trì bao lồi bằng Deque. Mặc dù cấu trúc `std::set` động có thể giải quyết nhưng cài đặt cực kỳ phức tạp và dễ lỗi. **Li Chao Tree** là một cây phân đoạn Segment Tree được thiết kế để giải quyết bài toán CHT động một cách hiệu quả và ngắn gọn.

### Ý tưởng cốt lõi
Cây quản lý miền giá trị của $x$ là $[X_{min}, X_{max}]$. Mỗi nút của cây quản lý đoạn $[lo, hi]$ và lưu trữ đường thẳng tối ưu nhất tại hoành độ trung tâm $mid = \lfloor (lo + hi)/2 \rfloor$.
Khi thêm một đường thẳng mới $nw$ vào đoạn $[lo, hi]$ đang giữ đường thẳng $cur$:
1. So sánh $nw(mid)$ và $cur(mid)$. Nếu $nw$ tốt hơn, ta tráo đổi $nw$ và $cur$ để nút luôn lưu đường thẳng tốt nhất tại $mid$.
2. Ta so sánh giá trị tại biên $lo$ hoặc $hi$ của $nw$ và $cur$ để quyết định đệ quy đẩy đường thẳng kém hơn xuống nút con bên trái hoặc bên phải.

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    const long long INF = 1e18;

    struct Line {
        long long m, c;
        long long eval(long long x) const {
            return m * x + c;
        }
    };

    struct LiChaoTree {
        int n;
        vector<Line> tree;
        long long min_x, max_x;

        LiChaoTree(long long lo, long long hi) {
            min_x = lo;
            max_x = hi;
            n = 1;
            while (n < (hi - lo + 1)) n <<= 1;
            tree.assign(2 * n, {0, INF});
        }

        void add_line(Line nw, int node, long long lo, long long hi) {
            long long mid = lo + (hi - lo) / 2;
            Line& cur = tree[node];

            bool left_better = nw.eval(lo) < cur.eval(lo);
            bool mid_better = nw.eval(mid) < cur.eval(mid);

            if (mid_better) {
                swap(cur, nw);
            }

            if (lo == hi) return;

            if (left_better != mid_better) {
                add_line(nw, 2 * node, lo, mid);
            } else {
                add_line(nw, 2 * node + 1, mid + 1, hi);
            }
        }

        void add_line(long long m, long long c) {
            add_line({m, c}, 1, min_x, max_x);
        }

        long long query(long long x, int node, long long lo, long long hi) {
            long long res = tree[node].eval(x);
            if (lo == hi) return res;
            long long mid = lo + (hi - lo) / 2;
            if (x <= mid) {
                return min(res, query(x, 2 * node, lo, mid));
            } else {
                return min(res, query(x, 2 * node + 1, mid + 1, hi));
            }
        }

        long long query(long long x) {
            return query(x, 1, min_x, max_x);
        }
    };
    ```

=== "Python"

    ```python
    class Line:
        def __init__(self, m=0, c=float('inf')):
            self.m = m
            self.c = c
        def eval(self, x):
            return self.m * x + self.c

    class LiChaoTree:
        def __init__(self, lo, hi):
            self.min_x = lo
            self.max_x = hi
            # Số lượng nút tối đa khoảng 4 * kích thước đoạn
            self.tree = [Line() for _ in range(4 * (hi - lo + 1))]

        def _add_line(self, node, lo, hi, nw):
            mid = (lo + hi) // 2
            cur = self.tree[node]

            left_better = nw.eval(lo) < cur.eval(lo)
            mid_better = nw.eval(mid) < cur.eval(mid)

            if mid_better:
                self.tree[node], nw = nw, cur
                cur = self.tree[node]

            if lo == hi:
                return

            if left_better != mid_better:
                self._add_line(2 * node, lo, mid, nw)
            else:
                self._add_line(2 * node + 1, mid + 1, hi, nw)

        def add_line(self, m, c):
            self._add_line(1, self.min_x, self.max_x, Line(m, c))

        def _query(self, node, lo, hi, x):
            res = self.tree[node].eval(x)
            if lo == hi:
                return res
            mid = (lo + hi) // 2
            if x <= mid:
                return min(res, self._query(2 * node, lo, mid, x))
            else:
                return min(res, self._query(2 * node + 1, mid + 1, hi, x))

        def query(self, x):
            return self._query(1, self.min_x, self.max_x, x)
    ```

---

## 5. Li Chao Tree kết hợp Nén tọa độ (Coordinate Compression)

Khi miền giá trị truy vấn $x$ rất lớn (ví dụ $10^9$) nhưng số lượng điểm truy vấn thực tế nhỏ, ta có thể nén các giá trị truy vấn $x$ thành các chỉ số từ $0$ tới $M-1$. Ta chạy Li Chao Tree trên không gian chỉ số này.

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    const long long INF = 1e18;

    struct Line {
        long long m, c;
        long long eval(long long x) const {
            return m * x + c;
        }
    };

    struct LiChaoCompressed {
        int n;
        vector<Line> tree;
        vector<long long> coords;

        LiChaoCompressed(const vector<long long>& xs) {
            coords = xs;
            sort(coords.begin(), coords.end());
            coords.erase(unique(coords.begin(), coords.end()), coords.end());
            n = coords.size();
            tree.assign(4 * n, {0, INF});
        }

        void add_line(Line nw, int node, int lo, int hi) {
            int mid = (lo + hi) / 2;
            long long x_lo = coords[lo];
            long long x_mid = coords[mid];
            long long x_hi = coords[hi];
            Line& cur = tree[node];

            bool left_better = nw.eval(x_lo) < cur.eval(x_lo);
            bool mid_better = nw.eval(x_mid) < cur.eval(x_mid);

            if (mid_better) swap(cur, nw);

            if (lo == hi) return;

            if (left_better != mid_better) {
                add_line(nw, 2 * node, lo, mid);
            } else {
                add_line(nw, 2 * node + 1, mid + 1, hi);
            }
        }

        void add_line(long long m, long long c) {
            add_line({m, c}, 1, 0, n - 1);
        }

        long long query(int idx, int node, int lo, int hi) {
            long long res = tree[node].eval(coords[idx]);
            if (lo == hi) return res;
            int mid = (lo + hi) / 2;
            if (idx <= mid) {
                return min(res, query(idx, 2 * node, lo, mid));
            } else {
                return min(res, query(idx, 2 * node + 1, mid + 1, hi));
            }
        }

        long long query(long long x) {
            int idx = lower_bound(coords.begin(), coords.end(), x) - coords.begin();
            return query(idx, 1, 0, n - 1);
        }
    };
    ```

=== "Python"

    ```python
    import bisect

    class Line:
        def __init__(self, m=0, c=float('inf')):
            self.m = m
            self.c = c
        def eval(self, x):
            return self.m * x + self.c

    class LiChaoCompressed:
        def __init__(self, xs):
            self.coords = sorted(list(set(xs)))
            self.n = len(self.coords)
            self.tree = [Line() for _ in range(4 * self.n)]

        def _add_line(self, node, lo, hi, nw):
            mid = (lo + hi) // 2
            x_lo = self.coords[lo]
            x_mid = self.coords[mid]
            x_hi = self.coords[hi]
            cur = self.tree[node]

            left_better = nw.eval(x_lo) < cur.eval(x_lo)
            mid_better = nw.eval(x_mid) < cur.eval(x_mid)

            if mid_better:
                self.tree[node], nw = nw, cur
                cur = self.tree[node]

            if lo == hi:
                return

            if left_better != mid_better:
                self._add_line(2 * node, lo, mid, nw)
            else:
                self._add_line(2 * node + 1, mid + 1, hi, nw)

        def add_line(self, m, c):
            self._add_line(1, 0, self.n - 1, Line(m, c))

        def _query(self, node, lo, hi, idx):
            res = self.tree[node].eval(self.coords[idx])
            if lo == hi:
                return res
            mid = (lo + hi) // 2
            if idx <= mid:
                return min(res, self._query(2 * node, lo, mid, idx))
            else:
                return min(res, self._query(2 * node + 1, mid + 1, hi, idx))

        def query(self, x):
            idx = bisect.bisect_left(self.coords, x)
            return self._query(1, 0, self.n - 1, idx)
    ```

---

## 6. Bài toán kinh điển: Batch Scheduling (IOI 2002)

**Bài toán:** Có $N$ công việc cần xử lý. Công việc thứ $i$ có thời gian chạy $t[i]$ và hệ số phạt $f[i]$. Ta chia các công việc thành các nhóm liên tiếp (batch). Khi bắt đầu một batch mới, ta mất thời gian thiết lập $S$. Tất cả các công việc trong một batch chỉ hoàn thành khi công việc cuối cùng của batch đó xong. Chi phí phạt của một công việc bằng tích thời điểm hoàn thành và hệ số phạt của nó. Tìm cách chia batch có tổng chi phí nhỏ nhất.

### Phân tích quy hoạch động và CHT
Gọi $T[i] = \sum_{k=1}^i t[k]$ và $F[i] = \sum_{k=1}^i f[k]$.
Công thức quy hoạch động tính từ cuối lên (hoặc tính xuôi bằng cách cộng dồn tác động thời gian thiết lập):
$$dp[i] = \min_{0 \le j < i} \{ dp[j] + T[i] \cdot (F[N] - F[j]) + S \cdot (F[N] - F[j]) \}$$
$$dp[i] = \min_{0 \le j < i} \{ dp[j] - (T[i] + S) \cdot F[j] \} + (T[i] + S) \cdot F[N]$$

Đây là cấu trúc CHT:
- Hoành độ truy vấn: $x = T[i] + S$ (tăng dần).
- Hệ số góc đường thẳng: $m_j = -F[j]$ (giảm dần do $F$ tăng dần).
- Tung độ gốc: $c_j = dp[j]$.

Ta áp dụng trực tiếp Static CHT Deque với $O(N)$ thời gian.

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    int main() {
        ios_base::sync_with_stdio(false);
        cin.tie(NULL);

        int n;
        long long S;
        if (!(cin >> n >> S)) return 0;

        vector<long long> t(n + 1), f(n + 1);
        for (int i = 1; i <= n; i++) cin >> t[i] >> f[i];

        vector<long long> T(n + 1, 0), F(n + 1, 0);
        for (int i = 1; i <= n; i++) {
            T[i] = T[i - 1] + t[i];
            F[i] = F[i - 1] + f[i];
        }

        deque<pair<long long, long long>> dq; // {m, c}
        dq.push_back({0, 0}); // dp[0] = 0

        auto eval = [](pair<long long, long long> line, long long x) {
            return line.first * x + line.second;
        };

        auto is_bad = [](pair<long long, long long> l1, pair<long long, long long> l2, pair<long long, long long> l3) {
            return (__int128)(l3.second - l2.second) * (l1.first - l2.first) 
                <= (__int128)(l2.second - l1.second) * (l2.first - l3.first);
        };

        vector<long long> dp(n + 1, 0);
        for (int i = 1; i <= n; i++) {
            long long x = T[i] + S;
            while (dq.size() >= 2 && eval(dq[1], x) <= eval(dq[0], x)) {
                dq.pop_front();
            }
            dp[i] = eval(dq[0], x) + (T[i] + S) * F[n] - S * F[i]; // Chỉnh lại theo đúng công thức tích lũy
            
            pair<long long, long long> nw = {-F[i], dp[i] + S * F[i]};
            while (dq.size() >= 2 && is_bad(dq[dq.size() - 2], dq.back(), nw)) {
                dq.pop_back();
            }
            dq.push_back(nw);
        }

        cout << dp[n] << "\n";
        return 0;
    }
    ```

=== "Python"

    ```python
    import sys
    from collections import deque

    def main():
        input = sys.stdin.read
        data = input().split()
        if not data:
            return
        
        n = int(data[0])
        S = int(data[1])
        t = [0] * (n + 1)
        f = [0] * (n + 1)
        idx = 2
        for i in range(1, n + 1):
            t[i] = int(data[idx])
            f[i] = int(data[idx+1])
            idx += 2

        T = [0] * (n + 1)
        F = [0] * (n + 1)
        for i in range(1, n + 1):
            T[i] = T[i-1] + t[i]
            F[i] = F[i-1] + f[i]

        dq = deque()
        dq.append((0, 0)) # (m, c) của dp[0]

        def eval_line(line, x):
            return line[0] * x + line[1]

        def is_bad(l1, l2, l3):
            return (l3[1] - l2[1]) * (l1[0] - l2[0]) <= (l2[1] - l1[1]) * (l2[0] - l3[0])

        dp = [0] * (n + 1)
        for i in range(1, n + 1):
            x = T[i] + S
            while len(dq) >= 2 and eval_line(dq[1], x) <= eval_line(dq[0], x):
                dq.popleft()
            dp[i] = eval_line(dq[0], x) + (T[i] + S) * F[n] - S * F[i]

            nw = (-F[i], dp[i] + S * F[i])
            while len(dq) >= 2 and is_bad(dq[-2], dq[-1], nw):
                dq.pop()
            dq.append(nw)

        print(dp[n])

    if __name__ == '__main__':
        main()
    ```

---

## 7. Cạm bẫy và Kinh nghiệm cài đặt

> [!WARNING]
> ### 1. Tràn số khi nhân chéo giao điểm
> Khi kiểm tra điều kiện chèn đường thẳng:
> $$(c_3 - c_2)(m_1 - m_2) \le (c_2 - c_1)(m_2 - m_3)$$
> Các giá trị có thể đạt tới $10^{18}$, tích của chúng sẽ vượt quá giới hạn kiểu `long long`. Luôn sử dụng số nguyên lớn `__int128` trong C++ hoặc kiểu số thực lớn nếu cần thiết để đảm bảo độ chính xác.

> [!IMPORTANT]
> ### 2. Xử lý đường thẳng trùng hệ số góc (Coincident Slopes)
> Khi hai đường thẳng có cùng hệ số góc $m_1 = m_2$, chúng song song nhau. Khoảng cách giao điểm sẽ tiến tới vô cùng. 
> - Nếu $c_1 \le c_2$, đường thẳng $L_2$ hoàn toàn nằm phía trên $L_1$ nên nó vô dụng.Ta bắt buộc phải loại bỏ đường thẳng có tung độ gốc kém hơn trước khi thực hiện so sánh chéo để tránh lỗi chia cho $0$.

---

## 8. Bài tập luyện tập

| STT | Bài toán | Kỹ thuật áp dụng | Độ khó | Liên kết |
| :--- | :--- | :--- | :--- | :--- |
| 1 | [Kalila and Dimna (CF 319C)](https://codeforces.com/problemset/problem/319/C) | CHT Deque cơ bản | ★★★☆ | [Codeforces](https://codeforces.com/problemset/problem/319/C) |
| 2 | [Commando (APIO 2010)](https://oj.vnoi.info/problem/commando) | CHT Deque | ★★★★ | [VNOJ](https://oj.vnoi.info/problem/commando) |
| 3 | [Frog 3 (AtCoder DP Z)](https://atcoder.jp/contests/dp/tasks/dp_z) | CHT Deque / Li Chao Tree | ★★★★ | [AtCoder](https://atcoder.jp/contests/dp/tasks/dp_z) |
| 4 | [ACQUIRE (USACO)](https://oj.vnoi.info/problem/acquire) | CHT lọc kích thước | ★★★★☆ | [VNOJ](https://oj.vnoi.info/problem/acquire) |
| 5 | [Line Container (Yosupo)](https://judge.yosupo.jp/problem/line_add_get_min) | Li Chao Tree cơ bản | ★★★☆ | [Library-Checker](https://judge.yosupo.jp/problem/line_add_get_min) |
