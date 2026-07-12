# Quy Hoạch Động Bitmask

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** VNOI Wiki, CP-Algorithms - DP with Bitmasks

---

## 1. Bản chất vấn đề

### Bài toán: Người du lịch (Bitmask TSP)

Cho $N$ thành phố và ma trận khoảng cách $C[N][N]$. Tìm đường đi ngắn nhất đi qua tất cả thành phố **đúng 1 lần** và quay về thành phố xuất phát.

**Duyệt thường:** $O(N!)$ — quá chậm!

**Bitmask DP:** $O(2^N \cdot N^2)$ — chấp nhận được với $N \le 20$.

### Ý tưởng

Dùng bitmask $S$ biểu diễn **tập thành phố đã thăm**. $dp[S][v]$ = chi phí nhỏ nhất để đi qua tất cả thành phố trong $S$, đang ở thành phố $v$.

---

## 2. Tư duy cốt lõi

### Công thức truy hồi

$$dp[S][v] = \min_{u \in S, u \neq v} \{ dp[S \setminus \{v\}][u] + C[u][v] \}$$

**Khởi tạo:** $dp[\{v\}][v] = C[0][v]$ (đi trực tiếp từ thành phố 0 đến $v$).

**Kết quả:** $\min_{v=1}^{N-1} dp[\{0, 1, \ldots, N-1\}][v] + C[v][0]$ (quay về 0).

### Trace chi tiết

**3 thành phố:** $C = \begin{pmatrix} 0 & 10 & 15 \\ 10 & 0 & 20 \\ 15 & 20 & 0 \end{pmatrix}$

| $S$ (mask) | $v$ | $dp[S][v]$ | Tính toán |
|------------|-----|------------|-----------|
| $\{0\}$ (001) | 0 | 0 | Khởi tạo |
| $\{1\}$ (010) | 1 | 10 | $C[0][1] = 10$ |
| $\{2\}$ (100) | 2 | 15 | $C[0][2] = 15$ |
| $\{0,1\}$ (011) | 0 | $dp[\{1\}][1] + C[1][0] = 10 + 10 = 20$ | |
| $\{0,1\}$ (011) | 1 | $dp[\{0\}][0] + C[0][1] = 0 + 10 = 10$ | |
| $\{0,2\}$ (101) | 0 | $dp[\{2\}][2] + C[2][0] = 15 + 15 = 30$ | |
| $\{0,2\}$ (101) | 2 | $dp[\{0\}][0] + C[0][2] = 0 + 15 = 15$ | |
| $\{1,2\}$ (110) | 1 | $dp[\{2\}][2] + C[2][1] = 15 + 20 = 35$ | |
| $\{1,2\}$ (110) | 2 | $dp[\{1\}][1] + C[1][2] = 10 + 20 = 30$ | |
| $\{0,1,2\}$ (111) | 0 | $\min(dp[\{1,2\}][1]+C[1][0], dp[\{1,2\}][2]+C[2][0]) = \min(45, 45) = 45$ | |
| $\{0,1,2\}$ (111) | 1 | $\min(dp[\{0,2\}][0]+C[0][1], dp[\{0,2\}][2]+C[2][1]) = \min(40, 35) = 35$ | |
| $\{0,1,2\}$ (111) | 2 | $\min(dp[\{0,1\}][0]+C[0][2], dp[\{0,1\}][1]+C[1][2]) = \min(35, 30) = 30$ | |

**Kết quả:** $\min(45 + 0, 35 + 20, 30 + 15) = \min(45, 55, 45) = 45$

---

## 3. Phân tích tính đúng đắn

### Tại sao bitmask DP đúng?

**Bất biến:** Khi tính $dp[S][v]$, tất cả $dp[S'][u]$ với $|S'| < |S|$ đã được tính (duyệt mask tăng dần theo số bit 1).

**Tại sao duyệt mask tăng dần đảm bảo đúng?**

Số bit 1 trong $S$ = số thành phố đã thăm. Khi chuyển từ $S$ sang $S' = S \cup \{u\}$, số bit 1 tăng đúng 1. Do đó, duyệt mask từ $0$ đến $2^N - 1$ đảm bảo mọi tập con $S'$ đã được xử lý trước $S$.

**Tại sao công thức truy hồi đúng?**

Mọi đường đi Hamilton kết thúc tại $v$ với tập thành phố đã thăm = $S$ phải có đỉnh cuối trước $v$ là một đỉnh $u \in S \setminus \{v\}$. Do đó:

$$dp[S][v] = \min_{u \in S, u \neq v} \{ dp[S \setminus \{v\}][u] + C[u][v] \}$$

Công thức này xét **tất cả** khả năng cho đỉnh cuối trước $v$ → không bỏ sót.

**Tại sao $O(2^N \cdot N)$ trạng thái đủ?**

Mỗi trạng thái $(S, v)$ với $v \in S$ là duy nhất. Số cặp $(S, v)$ hợp lệ = $\sum_{k=1}^{N} \binom{N}{k} \cdot k = N \cdot 2^{N-1} = O(2^N \cdot N)$.

---

## 4. Đánh giá độ phức tạp

| Thao tác | Thời gian | Không gian |
|----------|-----------|------------|
| Bitmask TSP | $O(2^N \cdot N^2)$ | $O(2^N \cdot N)$ |
| Bitmask DP nói chung | $O(2^N \cdot N \cdot f(N))$ | $O(2^N \cdot N)$ |

$f(N)$ = chi phí chuyển trạng thái.

---

## 4. Các thao tác bitmask quan trọng

Trong bitmask DP, những thao tác bit sau được dùng liên tục. **Học thuộc lòng!**

| Thao tác | Cú pháp | Ý nghĩa |
|----------|---------|---------|
| Kiểm tra bit thứ $k$ | `mask & (1 << k)` | `true` nếu $k \in S$ |
| Bật bit thứ $k$ | `mask \| (1 << k)` | $S \cup \{k\}$ |
| Tắt bit thứ $k$ | `mask & ~(1 << k)` | $S \setminus \{k\}$ |
| Đảo bit thứ $k$ | `mask ^ (1 << k)` | toggle $k$ |
| Mask đầy đủ $N$ bit | `(1 << N) - 1` | $\{0, 1, \ldots, N-1\}$ |
| Lấy bit thấp nhất | `mask & -mask` | $k = \min(S)$ |
| Tắt bit thấp nhất | `mask & (mask - 1)` | Xóa $k = \min(S)$ |
| Đếm số bit 1 | `__builtin_popcount(mask)` (C++) hoặc `bin(mask).count('1')` (Python) | $\|S\|$ |
| Duyệt tất cả tập con của mask | `for (int sub = mask; sub; sub = (sub-1) & mask)` | $O(3^N)$ tổng thể |
| Kiểm tra tập con | `(sub & mask) == sub` | $sub \subseteq mask$ |

---

## 5. Ví dụ bổ sung: Bài toán Phân công

### Bài toán

Cho $N$ người và $N$ công việc ($N \le 20$). Ma trận $C[i][j]$ = chi phí giao việc $j$ cho người $i$. Mỗi người làm đúng 1 việc, mỗi việc có đúng 1 người làm. Tìm tổng chi phí nhỏ nhất.

### Công thức DP

$mask$ = tập các công việc đã được giao. Duyệt lần lượt từng người $i$:

$$dp[mask] = \min_{j \in mask} \{ dp[mask \setminus \{j\}] + C[i-1][j] \}$$

với $i = \text{popcount}(mask)$ = số công việc đã giao = người thứ $i$ sẽ nhận.

### Trace chi tiết

$N=3$, $C = \begin{pmatrix} 3 & 2 & 7 \\ 5 & 1 & 3 \\ 2 & 4 & 1 \end{pmatrix}$

| $mask$ | $i$ (số người đã giao) | Công thức | $dp[mask]$ |
|:---:|:---:|---|---:|
| 000 | 0 | Khởi tạo | 0 |
| 001 | 1 | $dp[000] + C[0][0] = 0 + 3$ | 3 |
| 010 | 1 | $dp[000] + C[0][1] = 0 + 2$ | 2 |
| 100 | 1 | $dp[000] + C[0][2] = 0 + 7$ | 7 |
| 011 | 2 | $\min(dp[001]+C[1][1], dp[010]+C[1][0]) = \min(3+1, 2+5)$ | 4 |
| 101 | 2 | $\min(dp[001]+C[1][2], dp[100]+C[1][0]) = \min(3+3, 7+5)$ | 6 |
| 110 | 2 | $\min(dp[010]+C[1][2], dp[100]+C[1][1]) = \min(2+3, 7+1)$ | 5 |
| 111 | 3 | $\min(dp[011]+C[2][2], dp[101]+C[2][1], dp[110]+C[2][0]) = \min(4+1, 6+4, 5+2)$ | **5** |

Kết quả: $dp[111] = 5$ (người 0 làm việc 1, người 1 làm việc 2, người 2 làm việc 0).

---

## 6. Các bẫy thường gặp

### Bẫy 1: Quên khởi tạo `INT_MAX` / `inf`

Luôn khởi tạo toàn bộ mảng `dp` với giá trị vô cùng. Sai sót phổ biến là chỉ khởi tạo `dp[0][0] = 0` mà quên các trạng thái khác → truy xuất giá trị rác.

### Bẫy 2: Duyệt mask sai thứ tự

Bitmask DP yêu cầu duyệt mask **tăng dần**. Nếu duyệt ngược, trạng thái con chưa được tính → kết quả sai.

### Bẫy 3: Overflow khi $N > 20$

Với $N > 20$, $2^N \cdot N^2$ có thể vượt giới hạn. Mẹo tối ưu:
- Nếu đồ thị đối xứng: giảm $N$ bằng cách cố định đỉnh xuất phát
- Dùng `unsigned` thay vì `int` để tiết kiệm bộ nhớ (nếu giá trị nhỏ)
- Cân nhắc chuyển sang Branch & Bound + heuristic

### Bẫy 4: Quên đường về trong TSP

Sau khi tính $dp[\text{full}][v]$, cần cộng thêm $C[v][0]$ (quay về thành phố 0). Rất nhiều người quên bước này.

### Bẫy 5: Nhầm $mask$ là tập hợp hay chỉ số

- `mask & (1 << v)` kiểm tra $v$ **có trong** $S$ hay không
- `mask | (1 << u)` **thêm** $u$ vào $S$

Đừng nhầm: `mask` biểu diễn tập thành phố **đã thăm**, không phải vị trí hiện tại.

---

## Code minh họa

### Người du lịch (TSP)

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    int main() {
        int n;                             // số thành phố
        cin >> n;

        // Nhập ma trận chi phí c[i][j] = khoảng cách từ i đến j
        vector<vector<int>> c(n, vector<int>(n));
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                cin >> c[i][j];

        int full = (1 << n) - 1;           // mask đầy đủ: tất cả n thành phố
        // dp[mask][v] = chi phí nhỏ nhất để thăm tập mask, đang đứng ở v
        vector<vector<int>> dp(1 << n, vector<int>(n, INT_MAX));

        // Khởi tạo: đi từ thành phố 0 đến thẳng v
        for (int v = 1; v < n; v++)
            dp[1 << v][v] = c[0][v];       // mask chỉ gồm v, chi phí = c[0][v]

        // Duyệt mask tăng dần — đảm bảo tập con đã được tính trước
        for (int mask = 1; mask <= full; mask++) {
            for (int v = 0; v < n; v++) {
                if (!(mask & (1 << v))) continue;   // v không có trong mask → bỏ qua
                if (dp[mask][v] == INT_MAX) continue; // trạng thái không khả thi

                // Thử đi tiếp đến thành phố u chưa thăm
                for (int u = 0; u < n; u++) {
                    if (mask & (1 << u)) continue;   // u đã được thăm → bỏ qua
                    int nmask = mask | (1 << u);      // thêm u vào tập đã thăm
                    dp[nmask][u] = min(dp[nmask][u], dp[mask][v] + c[v][u]);
                }
            }
        }

        // Tìm đường đi ngắn nhất: đã thăm hết, quay về 0
        int ans = INT_MAX;
        for (int v = 1; v < n; v++)
            ans = min(ans, dp[full][v] + c[v][0]); // full = tất cả thành phố

        cout << ans << "\n";
        return 0;
    }
    ```

=== "Python"

    ```python
    import sys
    input = sys.stdin.readline

    n = int(input())                       # số thành phố
    # Nhập ma trận chi phí c[i][j] = khoảng cách từ i đến j
    c = [list(map(int, input().split())) for _ in range(n)]

    full = (1 << n) - 1                    # mask đầy đủ: tất cả n thành phố
    # dp[mask][v] = chi phí nhỏ nhất để thăm tập mask, đang đứng ở v
    dp = [[float('inf')] * n for _ in range(1 << n)]

    # Khởi tạo: đi từ thành phố 0 đến thẳng v
    for v in range(1, n):
        dp[1 << v][v] = c[0][v]            # mask chỉ gồm v, chi phí = c[0][v]

    # Duyệt mask tăng dần — đảm bảo tập con đã được tính trước
    for mask in range(1, full + 1):
        for v in range(n):
            if not (mask & (1 << v)) or dp[mask][v] == float('inf'):
                continue                   # v không có trong mask hoặc trạng thái không khả thi

            # Thử đi tiếp đến thành phố u chưa thăm
            for u in range(n):
                if mask & (1 << u):
                    continue               # u đã được thăm → bỏ qua
                nmask = mask | (1 << u)    # thêm u vào tập đã thăm
                dp[nmask][u] = min(dp[nmask][u], dp[mask][v] + c[v][u])

    # Tìm đường đi ngắn nhất: đã thăm hết, quay về 0
    ans = min(dp[full][v] + c[v][0] for v in range(1, n))
    print(ans)
    ```

### Bài toán Phân công (Assignment Problem)

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    int main() {
        int n;                             // số người = số công việc
        cin >> n;

        // Nhập ma trận chi phí C[i][j]
        vector<vector<int>> C(n, vector<int>(n));
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                cin >> C[i][j];

        int full = (1 << n) - 1;           // mask đầy đủ
        // dp[mask] = chi phí nhỏ nhất để gán các công việc trong mask
        vector<int> dp(1 << n, INT_MAX);
        dp[0] = 0;                         // chưa gán việc nào → chi phí 0

        for (int mask = 0; mask <= full; mask++) {
            // i = số công việc đã gán = người tiếp theo cần gán
            int i = __builtin_popcount(mask);
            if (i >= n) continue;          // đã gán hết → bỏ qua

            // Thử gán việc j cho người i
            for (int j = 0; j < n; j++) {
                if (mask & (1 << j)) continue;     // việc j đã được gán
                int nmask = mask | (1 << j);        // thêm việc j vào tập đã gán
                dp[nmask] = min(dp[nmask], dp[mask] + C[i][j]);
            }
        }

        cout << dp[full] << "\n";          // kết quả khi gán hết N việc
        return 0;
    }
    ```

=== "Python"

    ```python
    import sys
    input = sys.stdin.readline

    n = int(input())                       # số người = số công việc
    # Nhập ma trận chi phí C[i][j]
    C = [list(map(int, input().split())) for _ in range(n)]

    full = (1 << n) - 1                    # mask đầy đủ
    # dp[mask] = chi phí nhỏ nhất để gán các công việc trong mask
    dp = [float('inf')] * (1 << n)
    dp[0] = 0                              # chưa gán việc nào → chi phí 0

    for mask in range(full + 1):
        i = bin(mask).count('1')           # số bit 1 = số người đã được gán việc
        if i >= n:
            continue                       # đã gán hết → bỏ qua

        # Thử gán việc j cho người i
        for j in range(n):
            if mask & (1 << j):
                continue                   # việc j đã được gán
            nmask = mask | (1 << j)        # thêm việc j vào tập đã gán
            dp[nmask] = min(dp[nmask], dp[mask] + C[i][j])

    print(dp[full])                        # kết quả khi gán hết N việc
    ```

---

## Bài tập luyện tập trên FPTOJ

| # | Bài | Điểm | Độ khó |
|:-:|------|:----:|:------:|
| 1 | [bsm-01 - Chia Kẹo Thành Hai Nhóm](https://fptoj.com/problem/bsm-01) | 15 | ⭐⭐ |
| 2 | [bsm-02 - Đếm Cách Chọn Thùng Hàng Có Tổng $S$](https://fptoj.com/problem/bsm-02) | 15 | ⭐⭐ |
| 3 | [bsm-03 - Hành Trình Thu Mua Nông Sản](https://fptoj.com/problem/bsm-03) | 20 | ⭐⭐⭐ |
| 4 | [bsm-04 - Phân Công Công Nhân Kho](https://fptoj.com/problem/bsm-04) | 20 | ⭐⭐⭐ |
| 5 | [bsm-05 - Tuyến Xe Buýt Khép Kín](https://fptoj.com/problem/bsm-05) | 25 | ⭐⭐⭐ |
| 6 | [bsm-06 - Đếm Hành Trình Giao Hàng](https://fptoj.com/problem/bsm-06) | 25 | ⭐⭐⭐⭐ |
| 7 | [bsm-07 - Chia Quà Cho Nhiều Lớp](https://fptoj.com/problem/bsm-07) | 30 | ⭐⭐⭐⭐ |
| 8 | [bsm-08 - Xếp Cá Trên Bàn Cờ $N \times N$](https://fptoj.com/problem/bsm-08) | 30 | ⭐⭐⭐⭐ |

## Bài viết liên quan

- [Quy hoạch động cơ bản](quy-hoach-dong.md)
- [DP trên DAG](dp-on-dag.md)
- [Tối ưu hóa quy hoạch động](dp-optimization.md)
