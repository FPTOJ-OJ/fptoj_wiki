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

## Code minh họa

### Người du lịch (TSP)

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    int main() {
        int n;
        cin >> n;

        vector<vector<int>> c(n, vector<int>(n));
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                cin >> c[i][j];

        int full = (1 << n) - 1;
        vector<vector<int>> dp(1 << n, vector<int>(n, INT_MAX));

        // Khởi tạo
        for (int v = 1; v < n; v++)
            dp[1 << v][v] = c[0][v];

        // DP
        for (int mask = 1; mask <= full; mask++) {
            for (int v = 0; v < n; v++) {
                if (!(mask & (1 << v))) continue;
                if (dp[mask][v] == INT_MAX) continue;
                for (int u = 0; u < n; u++) {
                    if (mask & (1 << u)) continue;
                    int nmask = mask | (1 << u);
                    dp[nmask][u] = min(dp[nmask][u], dp[mask][v] + c[v][u]);
                }
            }
        }

        int ans = INT_MAX;
        for (int v = 1; v < n; v++)
            ans = min(ans, dp[full][v] + c[v][0]);

        cout << ans << "\n";
        return 0;
    }
    ```

=== "Python"

    ```python
    import sys
    input = sys.stdin.readline

    n = int(input())
    c = [list(map(int, input().split())) for _ in range(n)]

    full = (1 << n) - 1
    dp = [[float('inf')] * n for _ in range(1 << n)]

    for v in range(1, n):
        dp[1 << v][v] = c[0][v]

    for mask in range(1, full + 1):
        for v in range(n):
            if not (mask & (1 << v)) or dp[mask][v] == float('inf'):
                continue
            for u in range(n):
                if mask & (1 << u):
                    continue
                nmask = mask | (1 << u)
                dp[nmask][u] = min(dp[nmask][u], dp[mask][v] + c[v][u])

    ans = min(dp[full][v] + c[v][0] for v in range(1, n))
    print(ans)
    ```
