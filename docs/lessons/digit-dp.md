# Bài 48: Digit DP

> **Tác giả:** FPTOJ Team<br>
> **Tham khảo:** CP-Algorithms, USACO Guide

---

## Bản chất vấn đề

### Bài toán kinh điển

Cho số nguyên dương $N$. Đếm số lượng số nguyên $x$ trong khoảng $[0, N]$ thỏa mãn một điều kiện nào đó liên quan đến **chữ số**.

**Ví dụ:** Cho $N = 47$, đếm số lượng số trong $[0, 47]$ có tổng chữ số chẵn.

### Phương pháp naïve

Duyệt từng số từ $0$ đến $N$, kiểm tra điều kiện cho mỗi số.

- **Độ phức tạp:** $O(N)$
- Khi $N = 10^{18}$, phương pháp naïve cần $10^{18}$ phép tính — không thể chạy trong thời gian cho phép.

### Tại sao cần Digit DP?

Mọi số nguyên đều có thể biểu diễn dưới dạng chuỗi chữ số. Thay vì duyệt từng số, ta **xây dựng số từ trái sang phải**, chữ số này qua chữ số khác. Số chữ số của $N$ chỉ là $O(\log_{10} N)$ — rất nhỏ (khoảng 18 chữ số khi $N = 10^{18}$).

### Khi nào sử dụng Digit DP?

| Tiêu chí | Mô tả |
|-----------|--------|
| Khoảng giá trị | $N$ rất lớn ($10^{18}$), không thể duyệt |
| Điều kiện | Liên quan đến **chữ số** (tổng, tích, bitmask, ...) |
| State | Có thể biểu diễn qua state có kích thước nhỏ |

---

## Tư duy cốt lõi

### Xây dựng số từng chữ số

Cho $N$ có $n$ chữ số, ký hiệu $d_0 d_1 \ldots d_{n-1}$ (từ trái sang phải). Ta duyệt từng vị trí $pos$ từ $0$ đến $n-1$, tại mỗi vị trí chọn chữ số $d$ sao cho số tạo thành không vượt quá $N$.

### Ràng buộc chặt (Tight Constraint)

Khi chọn chữ số tại vị trí $pos$, ta cần biết các chữ số đã chọn trước đó có **bằng đúng** prefix của $N$ hay không:

| Giá trị $tight$ | Ý nghĩa | Chữ số được chọn |
|------------------|----------|-------------------|
| $1$ (true) | Các chữ số đã chọn **bằng đúng** prefix của $N$ | $0$ đến $d_{pos}$ (chữ số thứ $pos$ của $N$) |
| $0$ (false) | Các chữ số đã chọn **nhỏ hơn** prefix của $N$ | $0$ đến $9$ (tự do) |

### Minh họa với $N = 47$

$N = 47$ có 2 chữ số: $d_0 = 4$, $d_1 = 7$.

```mermaid
graph TD
    ROOT["Bắt đầu"] --> A0["pos=0, d=0, tight=0"]
    ROOT --> A1["pos=0, d=1, tight=0"]
    ROOT --> A2["pos=0, d=2, tight=0"]
    ROOT --> A3["pos=0, d=3, tight=0"]
    ROOT --> A4["pos=0, d=4, tight=1"]

    A0 --> B0["pos=1: d=0..9 (10 số)"]
    A1 --> B1["pos=1: d=0..9 (10 số)"]
    A2 --> B2["pos=1: d=0..9 (10 số)"]
    A3 --> B3["pos=1: d=0..9 (10 số)"]
    A4 --> B4["pos=1: d=0..7 (8 số)"]


```

Khi $d_0 = 4$ (bằng đúng chữ số đầu của $N$), ta vẫn bị ràng buộc: $d_1$ chỉ được chọn từ $0$ đến $7$. Khi $d_0 < 4$, $d_1$ được chọn tự do từ $0$ đến $9$.

Tổng số: $10 + 10 + 10 + 10 + 8 = 48$ số (từ $0$ đến $47$).

```matplotlib
import numpy as np

N = 47
digits = [4, 7]
n = len(digits)

fig, ax = plt.subplots(figsize=(10, 5))

pos_labels = ['pos=0\n(d₀=4)', 'pos=1\n(d₁=7)']
tight_branches = [5, 8]
free_branches = [10, 10]

x = np.arange(n)
width = 0.35

bars1 = ax.bar(x - width/2, tight_branches, width, label='tight=1 (bó buộc)', color='#e74c3c', alpha=0.85, edgecolor='white')
bars2 = ax.bar(x + width/2, free_branches, width, label='tight=0 (tự do)', color='#2ecc71', alpha=0.85, edgecolor='white')

for bar, val in zip(bars1, tight_branches):
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.2, str(val),
            ha='center', fontsize=13, fontweight='bold', color='#e74c3c')
for bar, val in zip(bars2, free_branches):
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.2, str(val),
            ha='center', fontsize=13, fontweight='bold', color='#2ecc71')

ax.set_xlabel('Vị trí chữ số', fontsize=12)
ax.set_ylabel('Số lựa chọn chữ số', fontsize=12)
ax.set_title(f'Digit DP: Số lựa chọn tại mỗi vị trí (N={N})\ntight=1 chỉ chọn 0..d[pos], tight=0 chọn tự do 0..9', fontsize=13, fontweight='bold')
ax.set_xticks(x)
ax.set_xticklabels(pos_labels, fontsize=12)
ax.set_ylim(0, 12)
ax.set_yticks(range(11))
ax.legend(fontsize=11, loc='upper right')
ax.grid(True, axis='y', alpha=0.3)

ax.axhline(y=10, color='gray', linestyle=':', alpha=0.5)
ax.text(n - 0.3, 10.3, 'Giới hạn tối đa = 10', fontsize=9, color='gray')

plt.tight_layout()
```

### State của Digit DP

State tổng quát có dạng $dp[pos][tight][\ldots]$, trong đó:

| Thành phần | Ý nghĩa | Kích thước |
|------------|----------|------------|
| $pos$ | Vị trí chữ số hiện tại | $0$ đến $n-1$, tối đa $20$ |
| $tight$ | Có bị ràng buộc bởi $N$ không | $0$ hoặc $1$ |
| $\ldots$ | Các state bổ sung tùy bài | Tùy bài toán |

Các state bổ sung thường gặp:

| State bổ sung | Ý nghĩa | Kích thước tối đa |
|---------------|----------|-------------------|
| $sum$ | Tổng chữ số đã chọn | $9 \times 18 = 162$ |
| $mask$ | Bitmask chữ số đã dùng | $2^{10} = 1024$ |
| $last\_digit$ | Chữ số trước đó | $10$ |
| $has\_zero$ | Đã gặp chữ số $0$ chưa | $2$ |
| $started$ | Đã bắt đầu số chưa | $2$ |

### Quá trình chuyển state

Tại mỗi trạng thái $(pos, tight, \ldots)$:

1. Nếu $pos = n$ (đã xét hết chữ số): kiểm tra điều kiện, trả về $0$ hoặc $1$.
2. Xác định giới hạn: $limit = tight ? d_{pos} : 9$.
3. Duyệt $d$ từ $0$ đến $limit$, gọi đệ quy với state mới.
4. Cộng dồn kết quả.

### Bảng theo dõi quá trình với $N = 47$, đếm số có tổng chữ số chẵn

State: $dp[pos][tight][sum \bmod 2]$

| $pos$ | $tight$ | Chữ số chọn ($d$) | $sum \bmod 2$ mới | $tight$ mới | Kết quả |
|-------|---------|---------------------|--------------------|-------------|---------|
| $0$ | $1$ | $0$ | $0$ | $0$ | $5$ |
| $0$ | $1$ | $1$ | $1$ | $0$ | $5$ |
| $0$ | $1$ | $2$ | $0$ | $0$ | $5$ (memoized) |
| $0$ | $1$ | $3$ | $1$ | $0$ | $5$ (memoized) |
| $0$ | $1$ | $4$ | $0$ | $1$ | $4$ |

Tổng: $5 + 5 + 5 + 5 + 4 = 24$ số có tổng chữ số chẵn trong $[0, 47]$.

### Đếm số trong khoảng $[L, R]$

Sử dụng tính chất:

$$count(L, R) = count(0, R) - count(0, L - 1)$$

Lưu ý: Khi $L = 0$, $count(0, -1) = 0$.

---

## Phân tích tính đúng đắn

### Tại sao chỉ memoize khi $tight = 0$?

Khi $tight = 1$, state $(pos, tight=1, \ldots)$ bị ràng buộc bởi $N$. Mỗi đường đi từ gốc đến lá trong cây đệ quy là **duy nhất** — không có hai nhánh nào có cùng state với $tight = 1$ mà cho kết quả giống nhau (vì chúng đều đi theo đúng prefix của $N$).

Ngược lại, khi $tight = 0$, các chữ số đã chọn nhỏ hơn prefix của $N$. Mọi chữ số tiếp theo đều được chọn tự do ($0$ đến $9$). Do đó, state $(pos, tight=0, \ldots)$ có thể xuất hiện nhiều lần và kết quả là **giống nhau** — đủ điều kiện để memoize.

### Tại sao cần phân biệt leading zeros?

Khi xây dựng số $007$, chữ số $0$ ở vị trí đầu tiên không phải là "chữ số thực sự" của số $7$. Nếu không phân biệt, ta sẽ đếm sai các state liên quan đến chữ số $0$.

**Giải pháp:** Sử dụng state $started$ hoặc $last\_digit$ với giá trị đặc biệt:

| State | Giá trị | Ý nghĩa |
|-------|---------|----------|
| $started = 0$ | false | Đang ở phần leading zeros |
| $started = 1$ | true | Đã chọn ít nhất 1 chữ số khác $0$ |

Hoặc dùng $last\_digit = 10$ (giá trị sentinel) để biểu thị "chưa chọn chữ số nào".

### Tại sao $new\_tight = tight \land (d == limit)$?

- Nếu trước đó đã $tight = 0$ (đã nhỏ hơn prefix): $new\_tight = 0$ (vẫn tự do).
- Nếu trước đó $tight = 1$ và $d < limit$: $new\_tight = 0$ (đã nhỏ hơn tại vị trí này).
- Nếu trước đó $tight = 1$ và $d = limit$: $new\_tight = 1$ (vẫn bằng đúng prefix).

Đây là phép AND logic — chỉ duy trì ràng buộc khi **tất cả** các chữ số trước đó đều bằng đúng prefix của $N$ **và** chữ số hiện tại cũng bằng đúng giới hạn.

### Kiểm tra correctness với ví dụ nhỏ

Cho $N = 47$, đếm số có tổng chữ số chẵn trong $[0, 47]$:

| Số | Tổng chữ số | Chẵn? |
|----|-------------|-------|
| $0$ | $0$ | Yes |
| $1$ | $1$ | No |
| $2$ | $2$ | Yes |
| $3$ | $3$ | No |
| $4$ | $4$ | Yes |
| $5$ | $5$ | No |
| $6$ | $6$ | Yes |
| $7$ | $7$ | No |
| $8$ | $8$ | Yes |
| $9$ | $9$ | No |
| $10$ | $1$ | No |
| $11$ | $2$ | Yes |
| $12$ | $3$ | No |
| $13$ | $4$ | Yes |
| $14$ | $5$ | No |
| $15$ | $6$ | Yes |
| $16$ | $7$ | No |
| $17$ | $8$ | Yes |
| $18$ | $9$ | No |
| $19$ | $10$ | Yes |
| $20$ | $2$ | Yes |
| $21$ | $3$ | No |
| $22$ | $4$ | Yes |
| $23$ | $5$ | No |
| $24$ | $6$ | Yes |
| $25$ | $7$ | No |
| $26$ | $8$ | Yes |
| $27$ | $9$ | No |
| $28$ | $10$ | Yes |
| $29$ | $11$ | No |
| $30$ | $3$ | No |
| $31$ | $4$ | Yes |
| $32$ | $5$ | No |
| $33$ | $6$ | Yes |
| $34$ | $7$ | No |
| $35$ | $8$ | Yes |
| $36$ | $9$ | No |
| $37$ | $10$ | Yes |
| $38$ | $11$ | No |
| $39$ | $12$ | Yes |
| $40$ | $4$ | Yes |
| $41$ | $5$ | No |
| $42$ | $6$ | Yes |
| $43$ | $7$ | No |
| $44$ | $8$ | Yes |
| $45$ | $9$ | No |
| $46$ | $10$ | Yes |
| $47$ | $11$ | No |

Liệt kê: $0, 2, 4, 6, 8, 11, 13, 15, 17, 19, 20, 22, 24, 26, 28, 31, 33, 35, 37, 39, 40, 42, 44, 46$ — tổng cộng $24$ số. Kết quả từ Digit DP: $24$. ✓

---

## Đánh giá độ phức tạp

### Độ phức tạp tổng quát

- **Thời gian:** $O(n \times 2 \times S \times 10)$, trong đó $n = \lfloor \log_{10} N \rfloor + 1$, $S$ là kích thước state bổ sung.
- **Bộ nhớ:** $O(n \times 2 \times S)$ (chỉ memoize khi $tight = 0$ nên thực tế giảm một nửa).

| State bổ sung | $S$ | Thời gian | Bộ nhớ |
|---------------|-----|-----------|--------|
| Không có | $1$ | $O(n)$ | $O(n)$ |
| $sum \bmod 2$ | $2$ | $O(40n)$ | $O(4n)$ |
| $sum$ (tổng chữ số) | $162$ | $O(3240n)$ | $O(324n)$ |
| $mask$ (bitmask $10$ bit) | $1024$ | $O(20480n)$ | $O(2048n)$ |
| $mask + last\_digit$ | $10240$ | $O(204800n)$ | $O(20480n)$ |

Với $n \leq 18$ (khi $N \leq 10^{18}$), ngay cả trường hợp $S = 1024$, thời gian chỉ khoảng $18 \times 2 \times 1024 \times 10 \approx 3.7 \times 10^5$ phép tính.

### Giới hạn state

Khi kết hợp nhiều state bổ sung, tổng số state có thể bùng nổ:

$$\text{Tổng states} = n \times 2 \times S_1 \times S_2 \times \ldots$$

Nếu tổng states quá lớn ($> 10^7$), có thể bị MLE. Giải pháp:

- Chỉ memoize khi $tight = 0$ (giảm một nửa số states cần lưu).
- Dùng $map$ / $unordered\_map$ thay vì mảng nếu nhiều state rỗng.
- Giảm dimensions: dùng modulo thay vì giá trị tuyệt đối.

---

## Template

### Template Digit DP

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    using ll = long long;

    string s;           // chuỗi chữ số của N
    int n;              // số chữ số của N
    ll dp[20][2];       // dp[pos][tight]

    ll solve(int pos, bool tight) {
        if (pos == n) {         // đã xét hết chữ số
            return 1;
        }

        ll &res = dp[pos][tight];
        if (res != -1 && !tight) return res;  // memoization khi tight = 0

        int limit = tight ? (s[pos] - '0') : 9;  // giới hạn chữ số có thể chọn
        ll ans = 0;

        for (int d = 0; d <= limit; d++) {
            bool new_tight = tight && (d == limit);  // cập nhật ràng buộc
            ans += solve(pos + 1, new_tight);        // đệ quy
        }

        if (!tight) res = ans;  // lưu kết quả khi tight = 0
        return ans;
    }

    int main() {
        ll N;
        cin >> N;
        s = to_string(N);
        n = s.size();
        memset(dp, -1, sizeof(dp));  // khởi tạo dp với -1
        cout << solve(0, true) << endl;  // bắt đầu từ vị trí 0, tight = true
        return 0;
    }
    ```

=== "Python"

    ```python
    from functools import lru_cache

    def digit_dp(N):
        s = str(N)          # chuỗi chữ số của N
        n = len(s)          # số chữ số của N

        @lru_cache(maxsize=None)
        def solve(pos, tight):
            if pos == n:            # đã xét hết chữ số
                return 1

            limit = int(s[pos]) if tight else 9  # giới hạn chữ số có thể chọn
            ans = 0

            for d in range(0, limit + 1):
                new_tight = tight and (d == limit)  # cập nhật ràng buộc
                ans += solve(pos + 1, new_tight)    # đệ quy

            return ans

        return solve(0, True)  # bắt đầu từ vị trí 0, tight = True
    ```

---

## Ví dụ 1: Đếm số có tổng chữ số bằng $K$

> **Bài toán:** Cho $N$ và $K$. Đếm số lượng số trong $[0, N]$ có tổng các chữ số đúng bằng $K$.

**State:** $dp[pos][tight][sum]$, trong đó $sum$ là tổng chữ số đã chọn.

**Điều kiện cắt nhánh:** Nếu $sum > K$, trả về $0$.

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    using ll = long long;

    string s;           // chuỗi chữ số của N
    int n, K;           // số chữ số của N và tổng cần đạt
    ll dp[20][2][200];  // dp[pos][tight][sum]

    ll solve(int pos, bool tight, int sum) {
        if (sum > K) return 0;  // cắt nhánh nếu vượt quá K
        if (pos == n) return (sum == K) ? 1 : 0;  // kiểm tra điều kiện

        ll &res = dp[pos][tight][sum];
        if (res != -1 && !tight) return res;  // memoization

        int limit = tight ? (s[pos] - '0') : 9;  // giới hạn chữ số
        ll ans = 0;

        for (int d = 0; d <= limit; d++) {
            bool new_tight = tight && (d == limit);
            ans += solve(pos + 1, new_tight, sum + d);  // cộng dồn tổng
        }

        if (!tight) res = ans;
        return ans;
    }

    int main() {
        ll N;
        cin >> N >> K;
        s = to_string(N);
        n = s.size();
        memset(dp, -1, sizeof(dp));
        cout << solve(0, true, 0) << endl;
        return 0;
    }
    ```

=== "Python"

    ```python
    from functools import lru_cache

    def count_digit_sum(N, K):
        s = str(N)          # chuỗi chữ số của N
        n = len(s)          # số chữ số của N

        @lru_cache(maxsize=None)
        def solve(pos, tight, total):
            if total > K:           # cắt nhánh nếu vượt quá K
                return 0
            if pos == n:            # kiểm tra điều kiện
                return 1 if total == K else 0

            limit = int(s[pos]) if tight else 9  # giới hạn chữ số
            ans = 0

            for d in range(0, limit + 1):
                new_tight = tight and (d == limit)
                ans += solve(pos + 1, new_tight, total + d)  # cộng dồn tổng

            return ans

        return solve(0, True, 0)

    N, K = map(int, input().split())
    print(count_digit_sum(N, K))
    ```

---

## Ví dụ 2: Đếm số không chứa chữ số $4$

> **Bài toán:** Cho $N$. Đếm số lượng số trong $[0, N]$ không chứa chữ số $4$.

**State:** $dp[pos][tight]$ — không cần state bổ sung vì điều kiện chỉ phụ thuộc vào chữ số hiện tại.

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    using ll = long long;

    string s;           // chuỗi chữ số của N
    int n;              // số chữ số của N
    ll dp[20][2];       // dp[pos][tight]

    ll solve(int pos, bool tight) {
        if (pos == n) return 1;  // đã xét hết chữ số

        ll &res = dp[pos][tight];
        if (res != -1 && !tight) return res;  // memoization

        int limit = tight ? (s[pos] - '0') : 9;  // giới hạn chữ số
        ll ans = 0;

        for (int d = 0; d <= limit; d++) {
            if (d == 4) continue;  // bỏ qua chữ số 4
            bool new_tight = tight && (d == limit);
            ans += solve(pos + 1, new_tight);
        }

        if (!tight) res = ans;
        return ans;
    }

    int main() {
        ll N;
        cin >> N;
        s = to_string(N);
        n = s.size();
        memset(dp, -1, sizeof(dp));
        cout << solve(0, true) << endl;
        return 0;
    }
    ```

=== "Python"

    ```python
    from functools import lru_cache

    def count_without_four(N):
        s = str(N)          # chuỗi chữ số của N
        n = len(s)          # số chữ số của N

        @lru_cache(maxsize=None)
        def solve(pos, tight):
            if pos == n:            # đã xét hết chữ số
                return 1

            limit = int(s[pos]) if tight else 9  # giới hạn chữ số
            ans = 0

            for d in range(0, limit + 1):
                if d == 4:          # bỏ qua chữ số 4
                    continue
                new_tight = tight and (d == limit)
                ans += solve(pos + 1, new_tight)

            return ans

        return solve(0, True)

    N = int(input())
    print(count_without_four(N))
    ```

---

## Ví dụ 3: Đếm số có chữ số không giảm

> **Bài toán:** Cho $N$. Đếm số lượng số trong $[0, N]$ mà các chữ số từ trái sang phải không giảm (ví dụ: $1123$, $4559$, $7$).

**State:** $dp[pos][tight][last\_digit]$, trong đó $last\_digit$ là chữ số trước đó đã chọn. Dùng $last\_digit = 10$ để biểu thị "chưa chọn chữ số nào" (leading zeros).

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    using ll = long long;

    string s;               // chuỗi chữ số của N
    int n;                  // số chữ số của N
    ll dp[20][2][11];       // dp[pos][tight][last_digit]

    ll solve(int pos, bool tight, int last_digit) {
        if (pos == n) return 1;  // đã xét hết chữ số

        ll &res = dp[pos][tight][last_digit];
        if (res != -1 && !tight) return res;  // memoization

        int limit = tight ? (s[pos] - '0') : 9;  // giới hạn chữ số
        ll ans = 0;

        for (int d = 0; d <= limit; d++) {
            if (d < last_digit) continue;  // đảm bảo không giảm
            bool new_tight = tight && (d == limit);
            int new_last = (last_digit == 10 && d == 0) ? 10 : d;  // giữ sentinel cho leading zero
            ans += solve(pos + 1, new_tight, new_last);
        }

        if (!tight) res = ans;
        return ans;
    }

    int main() {
        ll N;
        cin >> N;
        s = to_string(N);
        n = s.size();
        memset(dp, -1, sizeof(dp));
        cout << solve(0, true, 10) << endl;  // last_digit = 10 (sentinel)
        return 0;
    }
    ```

=== "Python"

    ```python
    from functools import lru_cache

    def count_non_decreasing(N):
        s = str(N)              # chuỗi chữ số của N
        n = len(s)              # số chữ số của N

        @lru_cache(maxsize=None)
        def solve(pos, tight, last_digit):
            if pos == n:                # đã xét hết chữ số
                return 1

            limit = int(s[pos]) if tight else 9  # giới hạn chữ số
            ans = 0

            for d in range(0, limit + 1):
                if d < last_digit:      # đảm bảo không giảm
                    continue
                new_tight = tight and (d == limit)
                new_last = 10 if (last_digit == 10 and d == 0) else d  # giữ sentinel cho leading zero
                ans += solve(pos + 1, new_tight, new_last)

            return ans

        return solve(0, True, 10)  # last_digit = 10 (sentinel)

    N = int(input())
    print(count_non_decreasing(N))
    ```

---

## Ví dụ 4: Đếm số trong khoảng $[L, R]$ có tổng chữ số chẵn

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    using ll = long long;

    string s;           // chuỗi chữ số của N
    int n;              // số chữ số của N
    ll dp[20][2][2];    // dp[pos][tight][sum_mod]

    ll solve(int pos, bool tight, int sum_mod) {
        if (pos == n) return (sum_mod == 0) ? 1 : 0;  // kiểm tra tổng chẵn

        ll &res = dp[pos][tight][sum_mod];
        if (res != -1 && !tight) return res;  // memoization

        int limit = tight ? (s[pos] - '0') : 9;  // giới hạn chữ số
        ll ans = 0;

        for (int d = 0; d <= limit; d++) {
            bool new_tight = tight && (d == limit);
            ans += solve(pos + 1, new_tight, (sum_mod + d) % 2);  // cập nhật tổng modulo 2
        }

        if (!tight) res = ans;
        return ans;
    }

    ll count_up_to(ll N) {
        if (N < 0) return 0;
        s = to_string(N);
        n = s.size();
        memset(dp, -1, sizeof(dp));
        return solve(0, true, 0);  // bắt đầu với sum_mod = 0
    }

    int main() {
        ll L, R;
        cin >> L >> R;
        cout << count_up_to(R) - count_up_to(L - 1) << endl;  // hiệu số đếm
        return 0;
    }
    ```

=== "Python"

    ```python
    from functools import lru_cache

    def count_even_digit_sum(N):
        if N < 0:
            return 0
        s = str(N)          # chuỗi chữ số của N
        n = len(s)          # số chữ số của N

        @lru_cache(maxsize=None)
        def solve(pos, tight, sum_mod):
            if pos == n:            # kiểm tra tổng chẵn
                return 1 if sum_mod == 0 else 0

            limit = int(s[pos]) if tight else 9  # giới hạn chữ số
            ans = 0

            for d in range(0, limit + 1):
                new_tight = tight and (d == limit)
                ans += solve(pos + 1, new_tight, (sum_mod + d) % 2)  # cập nhật tổng modulo 2

            return ans

        return solve(0, True, 0)  # bắt đầu với sum_mod = 0

    L, R = map(int, input().split())
    print(count_even_digit_sum(R) - count_even_digit_sum(L - 1))  # hiệu số đếm
    ```

---

## Các state bổ sung thường gặp

### Bitmask chữ số đã dùng

Đếm số trong $[0, N]$ sử dụng đúng $K$ chữ số khác nhau.

**State:** $dp[pos][tight][mask]$, trong đó $mask$ là bitmask $10$ bit, bit $i = 1$ nếu chữ số $i$ đã xuất hiện.

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    using ll = long long;

    string s;               // chuỗi chữ số của N
    int n, K;               // số chữ số của N và số lượng chữ số khác nhau
    ll dp[20][2][1024];     // dp[pos][tight][mask] với mask 10 bit

    ll solve(int pos, bool tight, int mask) {
        if (pos == n) return (__builtin_popcount(mask) == K) ? 1 : 0;  // kiểm tra số chữ số khác nhau

        ll &res = dp[pos][tight][mask];
        if (res != -1 && !tight) return res;  // memoization

        int limit = tight ? (s[pos] - '0') : 9;  // giới hạn chữ số
        ll ans = 0;

        for (int d = 0; d <= limit; d++) {
            bool new_tight = tight && (d == limit);
            int new_mask = mask | (1 << d);  // bật bit tương ứng với chữ số d
            ans += solve(pos + 1, new_tight, new_mask);
        }

        if (!tight) res = ans;
        return ans;
    }

    int main() {
        ll N;
        cin >> N >> K;
        s = to_string(N);
        n = s.size();
        memset(dp, -1, sizeof(dp));
        cout << solve(0, true, 0) << endl;  // bắt đầu với mask = 0
        return 0;
    }
    ```

=== "Python"

    ```python
    from functools import lru_cache

    def count_distinct_digits(N, K):
        s = str(N)              # chuỗi chữ số của N
        n = len(s)              # số chữ số của N

        @lru_cache(maxsize=None)
        def solve(pos, tight, mask):
            if pos == n:        # kiểm tra số chữ số khác nhau
                return 1 if bin(mask).count('1') == K else 0

            limit = int(s[pos]) if tight else 9  # giới hạn chữ số
            ans = 0

            for d in range(0, limit + 1):
                new_tight = tight and (d == limit)
                new_mask = mask | (1 << d)  # bật bit tương ứng với chữ số d
                ans += solve(pos + 1, new_tight, new_mask)

            return ans

        return solve(0, True, 0)  # bắt đầu với mask = 0

    N, K = map(int, input().split())
    print(count_distinct_digits(N, K))
    ```

### Không có chữ số nào lặp lại

Đếm số trong $[0, N]$ mà không có chữ số nào xuất hiện quá một lần.

**State:** $dp[pos][tight][mask]$. Nếu bit $d$ đã bật trong $mask$ mà chọn $d$ nữa — bỏ qua.

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    using ll = long long;

    string s;               // chuỗi chữ số của N
    int n;                  // số chữ số của N
    ll dp[20][2][1024];     // dp[pos][tight][mask]

    ll solve(int pos, bool tight, int mask) {
        if (pos == n) return 1;  // đã xét hết chữ số

        ll &res = dp[pos][tight][mask];
        if (res != -1 && !tight) return res;  // memoization

        int limit = tight ? (s[pos] - '0') : 9;  // giới hạn chữ số
        ll ans = 0;

        for (int d = 0; d <= limit; d++) {
            if (mask & (1 << d)) continue;  // chữ số d đã dùng
            bool new_tight = tight && (d == limit);
            int new_mask = mask | (1 << d);  // đánh dấu chữ số d đã dùng
            if (d == 0 && mask == 0) new_mask = 0;  // bỏ qua leading zero
            ans += solve(pos + 1, new_tight, new_mask);
        }

        if (!tight) res = ans;
        return ans;
    }

    int main() {
        ll N;
        cin >> N;
        s = to_string(N);
        n = s.size();
        memset(dp, -1, sizeof(dp));
        cout << solve(0, true, 0) << endl;
        return 0;
    }
    ```

=== "Python"

    ```python
    from functools import lru_cache

    def count_no_repeating(N):
        s = str(N)              # chuỗi chữ số của N
        n = len(s)              # số chữ số của N

        @lru_cache(maxsize=None)
        def solve(pos, tight, mask):
            if pos == n:                # đã xét hết chữ số
                return 1

            limit = int(s[pos]) if tight else 9  # giới hạn chữ số
            ans = 0

            for d in range(0, limit + 1):
                if mask & (1 << d):     # chữ số d đã dùng
                    continue
                new_tight = tight and (d == limit)
                new_mask = mask | (1 << d)   # đánh dấu chữ số d đã dùng
                if d == 0 and mask == 0:     # bỏ qua leading zero
                    new_mask = 0
                ans += solve(pos + 1, new_tight, new_mask)

            return ans

        return solve(0, True, 0)

    N = int(input())
    print(count_no_repeating(N))
    ```

### Tích các chữ số bằng $0$

Đếm số trong $[0, N]$ mà tích các chữ số bằng $0$ (tức có ít nhất $1$ chữ số $0$ thực sự, không tính leading zeros).

**State:** $dp[pos][tight][has\_zero]$, trong đó $has\_zero = 1$ nếu đã gặp chữ số $0$ thực sự.

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    using ll = long long;

    string s;               // chuỗi chữ số của N
    int n;                  // số chữ số của N
    ll dp[20][2][2];        // dp[pos][tight][has_zero]

    ll solve(int pos, bool tight, bool has_zero) {
        if (pos == n) return has_zero ? 1 : 0;  // kiểm tra có chứa số 0

        ll &res = dp[pos][tight][has_zero];
        if (res != -1 && !tight) return res;  // memoization

        int limit = tight ? (s[pos] - '0') : 9;  // giới hạn chữ số
        ll ans = 0;

        for (int d = 0; d <= limit; d++) {
            bool new_tight = tight && (d == limit);
            bool new_zero = has_zero || (d == 0 && pos > 0);  // đánh dấu nếu gặp số 0 thực sự
            ans += solve(pos + 1, new_tight, new_zero);
        }

        if (!tight) res = ans;
        return ans;
    }

    int main() {
        ll N;
        cin >> N;
        s = to_string(N);
        n = s.size();
        memset(dp, -1, sizeof(dp));
        cout << solve(0, true, false) << endl;  // bắt đầu với has_zero = false
        return 0;
    }
    ```

=== "Python"

    ```python
    from functools import lru_cache

    def count_product_zero(N):
        s = str(N)              # chuỗi chữ số của N
        n = len(s)              # số chữ số của N

        @lru_cache(maxsize=None)
        def solve(pos, tight, has_zero):
            if pos == n:        # kiểm tra có chứa số 0
                return 1 if has_zero else 0

            limit = int(s[pos]) if tight else 9  # giới hạn chữ số
            ans = 0

            for d in range(0, limit + 1):
                new_tight = tight and (d == limit)
                new_zero = has_zero or (d == 0 and pos > 0)  # đánh dấu nếu gặp số 0 thực sự
                ans += solve(pos + 1, new_tight, new_zero)

            return ans

        return solve(0, True, False)  # bắt đầu với has_zero = False

    N = int(input())
    print(count_product_zero(N))
    ```

### GCD các chữ số lớn hơn $1$

Đếm số trong $[0, N]$ mà GCD tất cả các chữ số lớn hơn $1$.

**State:** $dp[pos][tight][gcd\_sofar]$. Khi chưa chọn chữ số nào, $gcd = 0$.

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    using ll = long long;

    string s;               // chuỗi chữ số của N
    int n;                  // số chữ số của N
    ll dp[20][2][10];       // dp[pos][tight][gcd_sofar] (gcd từ 1..9 hoặc 0)

    ll solve(int pos, bool tight, int g) {
        if (pos == n) return (g > 1) ? 1 : 0;  // kiểm tra GCD > 1

        ll &res = dp[pos][tight][g];
        if (res != -1 && !tight) return res;  // memoization

        int limit = tight ? (s[pos] - '0') : 9;  // giới hạn chữ số
        ll ans = 0;

        for (int d = 0; d <= limit; d++) {
            bool new_tight = tight && (d == limit);
            int new_g = (g == 0) ? d : __gcd(g, d);  // cập nhật GCD
            ans += solve(pos + 1, new_tight, new_g);
        }

        if (!tight) res = ans;
        return ans;
    }

    int main() {
        ll N;
        cin >> N;
        s = to_string(N);
        n = s.size();
        memset(dp, -1, sizeof(dp));
        cout << solve(0, true, 0) << endl;  // bắt đầu với gcd = 0
        return 0;
    }
    ```

=== "Python"

    ```python
    from functools import lru_cache
    from math import gcd

    def count_gcd_gt_one(N):
        s = str(N)              # chuỗi chữ số của N
        n = len(s)              # số chữ số của N

        @lru_cache(maxsize=None)
        def solve(pos, tight, g):
            if pos == n:        # kiểm tra GCD > 1
                return 1 if g > 1 else 0

            limit = int(s[pos]) if tight else 9  # giới hạn chữ số
            ans = 0

            for d in range(0, limit + 1):
                new_tight = tight and (d == limit)
                new_g = d if g == 0 else gcd(g, d)  # cập nhật GCD
                ans += solve(pos + 1, new_tight, new_g)

            return ans

        return solve(0, True, 0)  # bắt đầu với gcd = 0

    N = int(input())
    print(count_gcd_gt_one(N))
    ```

---

## Cạm bẫy thường gặp

### Off-by-one trong khoảng $[L, R]$

Công thức đúng: $count(L, R) = count(0, R) - count(0, L - 1)$.

Nếu dùng $count(0, R) - count(0, L)$, ta sẽ thiếu số $L$. Đặc biệt, khi $L = 0$, hàm $count(0, -1)$ phải trả về $0$.

### Quên reset dp giữa các test case

Khi chạy nhiều test case, phải gọi `memset(dp, -1, sizeof(dp))` cho mỗi test case vì $N$ khác nhau dẫn đến $s$ và $n$ khác nhau.

### State explosion

Khi kết hợp quá nhiều state bổ sung, tổng số state có thể vượt quá giới hạn bộ nhớ. Cần tính toán trước kích thước state:

$$\text{Tổng states} = n \times 2 \times S_1 \times S_2 \times \ldots \leq 10^7$$

Nếu vượt quá, cân nhắc giảm dimensions hoặc dùng $map$ thay vì mảng.

---

## Bài tập

| # | Tên bài | Nguồn | Độ khó | Ghi chú |
|---|---------|-------|--------|---------|
| 1 | [Digit Sum](https://atcoder.jp/contests/dp/tasks/dp_s) | AtCoder DP | ★★☆ | Tổng chữ số chia hết cho $D$ |
| 2 | [LIDS](https://codeforces.com/problemset/problem/1245/F) | CF | ★★★ | Dãy con tăng dài nhất theo chữ số |
| 3 | [Palindromic Numbers](https://codeforces.com/problemset/problem/401/D) | CF | ★★☆ | Đếm số palindrome |
| 4 | [Magic Numbers](https://codeforces.com/problemset/problem/628/D) | CF | ★★☆ | Số "magic" với digit $m$ |
| 5 | [Classy Numbers](https://codeforces.com/problemset/problem/1036/C) | CF | ★★☆ | Tối đa $3$ chữ số khác $0$ |
| 6 | [XOR Palindrome](https://codeforces.com/problemset/problem/1731/D) | CF | ★★★ | Palindrome XOR |
| 7 | [Investigation](https://open.kattis.com/problems/investigation) | Kattis | ★★☆ | Chia hết cho $K$, tổng chữ số |
| 8 | [Digit Count](https://www.spoj.com/problems/CPCRC1C/) | SPOJ | ★★☆ | Tổng chữ số từ $A$ đến $B$ |
| 9 | [Sum of Digits](https://codeforces.com/problemset/problem/165/C) | CF | ★★☆ | Đếm substring có tổng chữ số $= K$ |
| 10 | [Number of Numbers](https://www.codechef.com/problems/DIGITDP) | CodeChef | ★★★ | Nhiều query, Digit DP |
| 11 | [Counting Numbers](https://cses.fi/problemset/task/2220) | CSES | ★★☆ | Đếm số không có chữ số liền kề giống nhau |

## Bài tập luyện tập

| Mã bài | Tên bài tập | Độ khó | Kiểu bài tập (Bản chất) | Bài học lý thuyết |
| :--- | :--- | :---: | :--- | :--- |
| `dig-count-3` | [Đếm Số Chia Hết Cho 3](https://fptoj.com/problem/dig-count-3) | ⭐⭐ | Đếm số chia hết cho $3$ | [Digit DP](digit-dp.md) |
| `dig-sum-digit` | [Tổng Chữ Số](https://fptoj.com/problem/dig-sum-digit) | ⭐⭐ | Tính tổng các chữ số | [Digit DP](digit-dp.md) |
| `dig-not-13` | [Không Chứa 13](https://fptoj.com/problem/dig-not-13) | ⭐⭐ | Đếm số không chứa xâu "13" | [Digit DP](digit-dp.md) |
| `dig-no-adj-same` | [Không Có Chữ Liền Kề Giống Nhau](https://fptoj.com/problem/dig-no-adj-same) | ⭐⭐ | Hai chữ số liền kề không giống nhau | [Digit DP](digit-dp.md) |
| `dig-no-trailing` | [Không Có Số 0 Ở Đầu](https://fptoj.com/problem/dig-no-trailing) | ⭐⭐ | Đếm số không có số $0$ ở đầu | [Digit DP](digit-dp.md) |
| `dig-product` | [Tích Chữ Số](https://fptoj.com/problem/dig-product) | ⭐⭐⭐ | Tích các chữ số | [Digit DP](digit-dp.md) |
| `dig-palindrome` | [Số Palindrome](https://fptoj.com/problem/dig-palindrome) | ⭐⭐⭐ | Đếm số palindrome | [Digit DP](digit-dp.md) |
| `dig-div-digit` | [Chia Hết Cho Các Chữ Số](https://fptoj.com/problem/dig-div-digit) | ⭐⭐⭐ | Số chia hết cho từng chữ số | [Digit DP](digit-dp.md) |
| `dig-k-digit` | [Số Có K Chữ Số](https://fptoj.com/problem/dig-k-digit) | ⭐⭐⭐⭐ | Đếm số có đúng $K$ chữ số | [Digit DP](digit-dp.md) |
| `dig-sum-even` | [Tổng Chẵn](https://fptoj.com/problem/dig-sum-even) | ⭐⭐⭐⭐ | Đếm số có tổng chữ số chẵn | [Digit DP](digit-dp.md) |
| `dig-num-square` | [Số Chính Phương](https://fptoj.com/problem/dig-num-square) | ⭐⭐⭐ | Đếm số chính phương | [Digit DP](digit-dp.md) |

---

> **Bài tiếp theo:** [Bài 49: Interval DP](interval-dp.md)
