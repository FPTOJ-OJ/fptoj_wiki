# Binary Lifting - Nhảy Nhị Phân Trên Mảng

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** VNOI Wiki, CP-Algorithms - Binary Lifting

---

## 1. Bản chất vấn đề

### Bài toán: Truy vấn phần tử thứ $k$ trên chuỗi

Cho dãy $A$ gồm $N$ phần tử. Thực hiện $Q$ truy vấn: phần tử thứ $k$ (0-indexed) là gì?

Nếu chỉ có 1 mảng tĩnh $\Rightarrow$ $O(1)$ mỗi truy vấn.

Nhưng nếu mỗi phần tử **trỏ đến phần tử tiếp theo** theo quy tắc nào đó (như nhảy trên chuỗi, nhảy trên cây)?

**Binary Lifting:** Precompute $2^i$-th ancestor cho mỗi phần tử $\Rightarrow$ truy vấn $O(\log N)$.

### Ứng dụng

| Bài toán | Mô tả |
|----------|-------|
| LCA (Lowest Common Ancestor) | Tìm tổ tiên chung gần nhất trên cây |
| Nhảy trên chuỗi | Từ phần tử $u$, nhảy $k$ bước là phần tử nào? |
| Floyd's Cycle Detection | Tìm chu kỳ trong dãy |
| Sparse Table | Truy vấn min/max trên đoạn |

---

## 2. Tư duy cốt lõi

### Ý tưởng: Nhảy theo lũy thừa của 2

Thay vì nhảy từng bước 1 ($O(k)$), ta nhảy theo lũy thừa của 2:

$$k = 2^{a_1} + 2^{a_2} + \ldots + 2^{a_m}$$

Với $m \le \lfloor \log_2 k \rfloor + 1$.

**Ví dụ:** Nhảy 13 bước = nhảy 8 bước + nhảy 4 bước + nhảy 1 bước ($13 = 1101_2$).

### Bảng tiền xử lý

Gọi `up[v][i]` = phần tử khi nhảy $2^i$ bước từ phần tử $v$.

**Công thức:**

$$\text{up}[v][i] = \text{up}[\text{up}[v][i-1]][i-1]$$

Nghĩa là: nhảy $2^i$ bước = nhảy $2^{i-1}$ bước 2 lần.

### Trace chi tiết

Cho dãy: $A = [2, 5, 1, 3, 4]$, với quy tắc $f(i) = A[i] \mod 5$ (nhảy đến chỉ số $A[i] \mod 5$).

| $i$ | $A[i]$ | $f(i) = A[i] \mod 5$ |
|-----|--------|----------------------|
| 0 | 2 | 2 |
| 1 | 5 | 0 |
| 2 | 1 | 1 |
| 3 | 3 | 3 |
| 4 | 4 | 4 |

Bảng `up[v][i]`:

| $v$ | $up[v][0]$ (nhảy $2^0=1$ bước) | $up[v][1]$ (nhảy $2^1=2$ bước) | $up[v][2]$ (nhảy $2^2=4$ bước) |
|-----|--------------------------------|--------------------------------|--------------------------------|
| 0 | 2 | $up[2][0] = 1$ | $up[1][1] = 0$ |
| 1 | 0 | $up[0][0] = 2$ | $up[2][1] = 1$ |
| 2 | 1 | $up[1][0] = 0$ | $up[0][1] = 1$ |
| 3 | 3 | $up[3][0] = 3$ | $up[3][1] = 3$ |
| 4 | 4 | $up[4][0] = 4$ | $up[4][1] = 4$ |

**Truy vấn:** Từ phần tử 0, nhảy 3 bước ($3 = 011_2$):

| Bước | Bit | Nhảy | Kết quả |
|------|-----|------|---------|
| 1 | bit 0 = 1 | $2^0 = 1$ bước: $up[0][0] = 2$ | Đến 2 |
| 2 | bit 1 = 1 | $2^1 = 2$ bước: $up[2][1] = 0$ | Đến 0 |

Kết quả: Từ 0, nhảy 3 bước → đến phần tử **0**.

---

## 3. Phân tích tính đúng đắn

### Tại sao mọi số bước đều biểu diễn được?

Mọi số nguyên dương $k$ đều biểu diễn được dưới dạng tổng các lũy thừa của 2 (nhị phân). Do đó, mọi số bước $k$ đều có thể ghép từ các nhảy $2^0, 2^1, 2^2, \ldots$

### Tại sao `up[v][i] = up[up[v][i-1]][i-1]`?

Nhảy $2^i$ bước từ $v$ = nhảy $2^{i-1}$ bước từ $v$ → đến $u = \text{up}[v][i-1]$ → nhảy thêm $2^{i-1}$ bước từ $u$ → đến $\text{up}[u][i-1]$.

Đây là tính chất **bán nhóm** (semigroup) của phép nhảy.

---

## 4. Đánh giá độ phức tạp

| Thao tác | Thời gian | Không gian |
|----------|-----------|------------|
| Tiền xử lý | $O(N \log N)$ | $O(N \log N)$ |
| Nhảy $k$ bước | $O(\log N)$ | $O(1)$ |
| LCA | $O(\log N)$ mỗi truy vấn | $O(N \log N)$ |

---

## Code minh họa

### Binary Lifting trên dãy — Truy vấn nhảy $k$ bước

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    int main() {
        ios_base::sync_with_stdio(false);
        cin.tie(NULL);

        int n, q;
        cin >> n >> q;

        int LOG = __lg(n) + 1;
        vector<vector<int>> up(n, vector<int>(LOG));

        // Đọc hàm nhảy: up[v][0] = phần tử sau 1 bước
        for (int i = 0; i < n; i++) {
            cin >> up[i][0];
        }

        // Tiền xử lý: up[v][i] = up[up[v][i-1]][i-1]
        for (int j = 1; j < LOG; j++) {
            for (int i = 0; i < n; i++) {
                up[i][j] = up[up[i][j - 1]][j - 1];
            }
        }

        // Truy vấn: từ v, nhảy k bước
        while (q--) {
            int v;
            long long k;
            cin >> v >> k;

            for (int j = 0; j < LOG; j++) {
                if (k & (1LL << j)) {
                    v = up[v][j];
                }
            }

            cout << v << "\n";
        }
        return 0;
    }
    ```

=== "Python"

    ```python
    import sys
    input = sys.stdin.readline

    n, q = map(int, input().split())
    LOG = n.bit_length()

    up = [[0] * LOG for _ in range(n)]

    # Đọc hàm nhảy
    row = list(map(int, input().split()))
    for i in range(n):
        up[i][0] = row[i]

    # Tiền xử lý
    for j in range(1, LOG):
        for i in range(n):
            up[i][j] = up[up[i][j - 1]][j - 1]

    # Truy vấn
    for _ in range(q):
        v, k = map(int, input().split())
        for j in range(LOG):
            if k & (1 << j):
                v = up[v][j]
        print(v)
    ```
