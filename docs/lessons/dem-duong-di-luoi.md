# Bài 59: Đếm Đường Đi Trên Lưới

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** CP-Algorithms, VNOI Wiki

## 1. Bài Toán Cơ Bản

### 1.1 Đếm đường đi từ (0,0) đến (n,m)

Mỗi bước chỉ được đi **phải** hoặc **xuống**. Từ $(0,0)$ đến $(n,m)$ cần đúng $n$ bước xuống và $m$ bước phải, tổng $n + m$ bước.

Số cách chọn vị trí $n$ bước xuống trong $n + m$ bước:

$$\text{Paths}(n, m) = \binom{n + m}{n} = \binom{n + m}{m}$$

**Ví dụ:** Từ $(0,0)$ đến $(2,3)$: $\binom{5}{2} = 10$ đường đi.

=== "C++"

    ```cpp
    // Đếm đường đi trên lưới n×m (0-indexed) - chỉ đi phải hoặc xuống
    // n: số bước xuống, m: số bước phải
    long long gridPaths(int n, int m) {
        // Chọn vị trí của n bước xuống trong tổng n+m bước
        // Số cách = C(n+m, n) = C(n+m, m)
        return C(n + m, n); // dùng hàm C(n,k) đã cài ở Bài 19
    }
    ```

=== "Python"

    ```python
    def grid_paths(n, m):
        # Chọn vị trí của n bước xuống trong tổng n+m bước
        # Số cách = C(n+m, n) = C(n+m, m)
        return C(n + m, n)  # dùng hàm C(n,k) đã cài ở Bài 19
    ```

---

## 2. Đếm đường đi có vật cản

### 2.1 Bài toán

Trên lưới có $k$ ô bị cấm. Đếm số đường đi từ $(0,0)$ đến $(n,m)$ không đi qua ô cấm nào.

### 2.2 Ý tưởng

Sắp xếp các ô cấm theo thứ tự (từ trái qua phải, trên xuống dưới). Với mỗi ô cấm $i$, đếm số đường đi từ gốc đến $i$ mà **không qua ô cấm nào khác**, rồi trừ đi đóng góp vào đích.

Gọi $f(i)$ = số đường đi từ $(0,0)$ đến ô cấm $i$ mà không qua ô cấm nào khác.

$$f(i) = \text{Paths}(0 \to i) - \sum_{j < i} f(j) \times \text{Paths}(j \to i)$$

Kết quả = $\text{Paths}(0 \to \text{đích}) - \sum_i f(i) \times \text{Paths}(i \to \text{đích})$

=== "C++"

    ```cpp
    long long gridPathsObstacles(int n, int m, vector<pair<int,int>>& banned) {
        // Sắp xếp các ô cấm theo tọa độ (x tăng dần, rồi y tăng dần)
        sort(banned.begin(), banned.end());
        int k = banned.size();
        vector<long long> dp(k);             // dp[i] = số đường đến ô cấm i mà KHÔNG qua ô cấm nào khác

        for (int i = 0; i < k; i++) {
            // Bước 1: đếm tổng số đường từ (0,0) đến ô cấm i (có thể qua ô cấm khác)
            dp[i] = C(banned[i].first + banned[i].second, banned[i].first);
            // Bước 2: trừ đi các đường đi qua ô cấm j (với j < i)
            for (int j = 0; j < i; j++) {
                // Chỉ xét ô cấm j nằm ở góc trên-trái so với ô i
                if (banned[j].first <= banned[i].first && banned[j].second <= banned[i].second) {
                    // Số đường đi từ (0,0) → j → i = dp[j] * Paths(j → i)
                    int dx = banned[i].first - banned[j].first;   // Số bước xuống từ j đến i
                    int dy = banned[i].second - banned[j].second; // Số bước phải từ j đến i
                    dp[i] = (dp[i] - dp[j] * C(dx + dy, dx) % MOD + MOD) % MOD;
                }
            }
        }

        // Tổng số đường từ (0,0) đến đích (n,m) không hạn chế
        long long total = C(n + m, n);
        // Trừ đi các đường phải đi qua một ô cấm nào đó
        for (int i = 0; i < k; i++) {
            if (banned[i].first <= n && banned[i].second <= m) {
                int dx = n - banned[i].first;   // Số bước xuống còn lại
                int dy = m - banned[i].second;  // Số bước phải còn lại
                total = (total - dp[i] * C(dx + dy, dx) % MOD + MOD) % MOD;
            }
        }
        return total;
    }
    ```

=== "Python"

    ```python
    def grid_paths_obstacles(n, m, banned):
        # Sắp xếp các ô cấm theo tọa độ (x tăng dần, rồi y tăng dần)
        banned.sort()
        k = len(banned)
        dp = [0] * k                      # dp[i] = số đường đến ô cấm i mà KHÔNG qua ô cấm nào khác

        for i in range(k):
            # Bước 1: đếm tổng số đường từ (0,0) đến ô cấm i (có thể qua ô cấm khác)
            dp[i] = C(banned[i][0] + banned[i][1], banned[i][0])
            # Bước 2: trừ đi các đường đi qua ô cấm j (với j < i)
            for j in range(i):
                # Chỉ xét ô cấm j nằm ở góc trên-trái so với ô i
                if banned[j][0] <= banned[i][0] and banned[j][1] <= banned[i][1]:
                    dx = banned[i][0] - banned[j][0]   # Số bước xuống từ j đến i
                    dy = banned[i][1] - banned[j][1]   # Số bước phải từ j đến i
                    dp[i] = (dp[i] - dp[j] * C(dx + dy, dx)) % MOD

        # Tổng số đường từ (0,0) đến đích (n,m) không hạn chế
        total = C(n + m, n)
        # Trừ đi các đường phải đi qua một ô cấm nào đó
        for i in range(k):
            if banned[i][0] <= n and banned[i][1] <= m:
                dx = n - banned[i][0]    # Số bước xuống còn lại
                dy = m - banned[i][1]   # Số bước phải còn lại
                total = (total - dp[i] * C(dx + dy, dx)) % MOD
        return total % MOD
    ```

---

## 3. Catalan Numbers & Đường đi không vượt đường chéo

### 3.1 Bài toán Dyck Path

Đếm đường đi từ $(0,0)$ đến $(n,n)$ chỉ đi **phải** hoặc **xuống**, không bao giờ đi **trên** đường chéo chính (tức tại mọi thời điểm số bước phải ≤ số bước xuống).

$$\text{Catalan}(n) = \frac{1}{n+1}\binom{2n}{n} = \binom{2n}{n} - \binom{2n}{n+1}$$

### 3.2 Các bài toán tương đương

Catalan number xuất hiện ở rất nhiều bài toán:

- Đếm dãy ngoặc đúng độ dài $2n$
- Đếm cây nhị phân có $n$ đỉnh
- Đếm cách chia đa giác lồi $n+2$ cạnh thành tam giác
- Đếm đường đi Dyck

=== "C++"

    ```cpp
    // Số Catalan thứ n: đếm đường đi Dyck từ (0,0) đến (n,n) không vượt đường chéo
    long long catalan(int n) {
        // C(2n, n) / (n+1) = C(2n, n) * (n+1)^(-1) mod MOD
        return C(2 * n, n) * modInverse(n + 1, MOD) % MOD;
    }
    ```

=== "Python"

    ```python
    def catalan(n):
        # Số Catalan thứ n: đếm đường đi Dyck từ (0,0) đến (n,n) không vượt đường chéo
        # C(2n, n) / (n+1) = C(2n, n) * (n+1)^(-1) mod MOD
        return C(2 * n, n) * pow(n + 1, MOD - 2, MOD) % MOD
    ```

---

## 4. Tổng đường đi trên lưới

### 4.1 Bài toán

Tính tổng số đường đi từ $(0,0)$ đến **mọi ô** $(i, j)$ trên lưới $n \times m$.

### 4.2 Quy hoạch động

$$\text{dp}[i][j] = \text{dp}[i-1][j] + \text{dp}[i][j-1]$$

với $\text{dp}[0][0] = 1$.

Tổng = $\sum_{i=0}^{n} \sum_{j=0}^{m} \text{dp}[i][j]$

---

## 5. Grid với nhiều loại bước

### 5.1 Bài toán

Từ $(0,0)$ đến $(n,m)$, mỗi bước có thể đi $(+1, 0), (0, +1), (+1, +1)$. Đếm số đường đi.

### 5.2 Quy hoạch động

$$\text{dp}[i][j] = \text{dp}[i-1][j] + \text{dp}[i][j-1] + \text{dp}[i-1][j-1]$$

Hoặc dùng ma trận chuyển nếu $n$ rất lớn (xem Bài 57).

---

## 6. Đếm đường đi trên lưới 3D

### 6.1 Bài toán

Từ $(0,0,0)$ đến $(a,b,c)$, mỗi bước đi $(+1,0,0), (0,+1,0), (0,0,+1)$.

$$\text{Paths} = \binom{a+b+c}{a, b, c} = \frac{(a+b+c)!}{a! \cdot b! \cdot c!}$$

=== "C++"

    ```cpp
    // Đếm đường đi trên lưới 3D từ (0,0,0) → (a,b,c)
    // Mỗi bước đi (1,0,0), (0,1,0), hoặc (0,0,1)
    long long gridPaths3D(int a, int b, int c) {
        // Công thức Multinomial: (a+b+c)! / (a! * b! * c!)
        // = C(a+b+c, a) * C(b+c, b) * C(c, c) = C(a+b+c, a) * C(b+c, b)
        return C(a + b + c, a) * C(b + c, b) % MOD;
    }
    ```

---

### Ví dụ minh họa: Lưới có vật cản (từng bước)

Xét lưới $3 \times 3$ (tức $n=3, m=3$), cần đi từ $(0,0)$ đến $(3,3)$. Có 2 ô cấm: $(1,1)$ và $(2,1)$.

??? info "Mở rộng: Trace chi tiết"
    ```
    Lưới 3×3 với ô cấm:
    S . . .
    . X . .    ← (1,1) bị cấm
    . X . .    ← (2,1) bị cấm
    . . . G
    ```

    **Bước 1: Sắp xếp ô cấm** → `[(1,1), (2,1)]`

    **Bước 2: Tính `dp` cho từng ô cấm**
    
    - `dp[0] = C(1+1, 1) = C(2,1) = 2` (2 đường từ $(0,0)$ đến $(1,1)$)
    - `dp[1] = C(2+1, 2) = C(3,2) = 3` (3 đường từ $(0,0)$ đến $(2,1)$)
      - Trừ đường qua $(1,1)$: `dp[0] × C((2-1)+(1-1), (2-1)) = 2 × C(1,1) = 2 × 1 = 2`
      - `dp[1] = (3 - 2) % MOD = 1`

    **Bước 3: Đường đến đích (3,3)**
    
    - Tổng: `C(3+3, 3) = C(6,3) = 20`
    - Trừ qua $(1,1)$: `dp[0] × C((3-1)+(3-1), (3-1)) = 2 × C(4,2) = 2 × 6 = 12`
    - Trừ qua $(2,1)$: `dp[1] × C((3-2)+(3-1), (3-2)) = 1 × C(3,1) = 1 × 3 = 3`
    - **Kết quả:** `(20 - 12 - 3) % MOD = 5` đường hợp lệ.

---

## 7. Mẹo và lưu ý

### 7.1 Các trường hợp đặc biệt

| Trường hợp | Kết quả | Giải thích |
|:---|:---:|:---|
| $n=0$ hoặc $m=0$ (lưới 1D) | $1$ | Chỉ có đúng một đường đi thẳng |
| $n=m=0$ | $1$ | Điểm xuất phát trùng điểm đích |
| Ô cấm nằm tại $(0,0)$ | $0$ | Không thể xuất phát |
| Ô cấm nằm tại $(n,m)$ | $0$ | Không thể đến đích |
| $k > n+m$ (nhiều ô cấm) | $O(k^2)$ | Độ phức tạp phụ thuộc số ô cấm, không phụ thuộc kích thước lưới |

### 7.2 Cạm bẫy thường gặp

- **Modulo âm:** Khi thực hiện phép trừ modulo, luôn dùng `(x - y + MOD) % MOD` để tránh kết quả âm.
- **Sort sai thứ tự:** Phải sắp xếp ô cấm theo thứ tự topo (từ trên xuống, trái qua phải). Nếu ô $j$ không nằm ở góc trên-trái của ô $i$, không thể đi từ $j$ đến $i$.
- **Bỏ quên trường hợp ô cấm nằm ngoài vùng:** Một số ô cấm có thể có tọa độ lớn hơn đích, cần lọc `banned[i].first <= n && banned[i].second <= m`.
- **Nhầm $\binom{n+m}{n}$ với $\binom{2n}{n}$:** Chỉ khi $n=m$ thì mới bằng $\binom{2n}{n}$. Với lưới chữ nhật, dùng $\binom{n+m}{n}$.
- **Quên tính chất đối xứng:** $\binom{n+m}{n} = \binom{n+m}{m}$, chọn cái nào nhỏ hơn để tính nhanh hơn.

### 7.3 Mở rộng: Các đồng nhất thức tổ hợp liên quan

| Đồng nhất thức | Công thức | Ý nghĩa trên lưới |
|:---|:---|:---|
| **Vandermonde** | $\sum_{i=0}^{k}\binom{n}{i}\binom{m}{k-i} = \binom{n+m}{k}$ | Chọn $k$ bước phải từ mặt phẳng con |
| **Hockey-stick** | $\sum_{i=0}^{n}\binom{i+k}{k} = \binom{n+k+1}{k+1}$ | Tổng đường đi đến các điểm trên cùng hàng/cột |
| **Catalan** | $C_n = \frac{1}{n+1}\binom{2n}{n}$ | Đường đi không vượt đường chéo |

---

## 8. Bài tập luyện tập

| Mã bài | Tên bài tập | Độ khó | Kiểu bài tập (Bản chất) | Bài học lý thuyết |
| :--- | :--- | :---: | :--- | :--- |
| `gp-basic` | [Đường đi trên lưới cơ bản](https://fptoj.com/problem/gp-basic) | ⭐⭐ | $C(n+m-2, n-1)$ | [Đếm Đường Đi Trên Lưới](dem-duong-di-luoi.md) |
| `gp-dice` | [Dice combinations](https://fptoj.com/problem/gp-dice) | ⭐ | DP tổng xúc xắc | [Đếm Đường Đi Trên Lưới](dem-duong-di-luoi.md) |
| `gp-dyck` | [Dyck path](https://fptoj.com/problem/gp-dyck) | ⭐⭐ | Số Catalan | [Đếm Đường Đi Trên Lưới](dem-duong-di-luoi.md) |
| `gp-robot` | [Robot trên lưới](https://fptoj.com/problem/gp-robot) | ⭐⭐ | DP 2D vật cản | [Đếm Đường Đi Trên Lưới](dem-duong-di-luoi.md) |
| `gp-maze` | [Mê cung tổng lớn nhất](https://fptoj.com/problem/gp-maze) | ⭐⭐ | DP đường đi max sum | [Đếm Đường Đi Trên Lưới](dem-duong-di-luoi.md) |
| `gp-multiset` | [Tổ hợp có lặp](https://fptoj.com/problem/gp-multiset) | ⭐⭐ | $C(S+n-1,n-1)$ | [Đếm Đường Đi Trên Lưới](dem-duong-di-luoi.md) |
| `gp-binom-sum` | [Tổng nhị thức Vandermonde](https://fptoj.com/problem/gp-binom-sum) | ⭐⭐ | $\sum C(n,i)C(m,i)$ | [Đếm Đường Đi Trên Lưới](dem-duong-di-luoi.md) |
| `gp-paths-all` | [Đường đi không chạm chéo](https://fptoj.com/problem/gp-paths-all) | ⭐⭐⭐ | Catalan không chạm | [Đếm Đường Đi Trên Lưới](dem-duong-di-luoi.md) |
| `gp-obstacle` | [Lưới có vật cản](https://fptoj.com/problem/gp-obstacle) | ⭐⭐⭐⭐ | IE + DP đường đi | [Đếm Đường Đi Trên Lưới](dem-duong-di-luoi.md) |
| `gp-ksteps` | [Đường đi K bước trên đồ thị](https://fptoj.com/problem/gp-ksteps) | ⭐⭐⭐⭐ | Lũy thừa ma trận | [Đếm Đường Đi Trên Lưới](dem-duong-di-luoi.md) |