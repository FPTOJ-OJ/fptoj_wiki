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
        ios_base::sync_with_stdio(false);        // Tăng tốc I/O
        cin.tie(NULL);

        int n, q;
        cin >> n >> q;

        int LOG = __lg(n) + 1;                   // Số bit cần thiết: ⌊log₂(n)⌋ + 1
        // up[v][j] = đỉnh đến được khi nhảy 2^j bước từ đỉnh v
        vector<vector<int>> up(n, vector<int>(LOG));

        // Đọc hàm nhảy: up[v][0] = đỉnh sau 1 bước (2^0) từ v
        for (int i = 0; i < n; i++) {
            cin >> up[i][0];
        }

        // Tiền xử lý: up[v][i] = up[ up[v][i-1] ][i-1]
        // Nhảy 2^i bước = nhảy 2^(i-1) bước, rồi nhảy tiếp 2^(i-1) bước nữa
        for (int j = 1; j < LOG; j++) {          // Duyệt từng lũy thừa của 2
            for (int i = 0; i < n; i++) {        // Duyệt từng đỉnh
                up[i][j] = up[up[i][j - 1]][j - 1];
            }
        }

        // Truy vấn: từ đỉnh v, nhảy k bước
        while (q--) {
            int v;
            long long k;
            cin >> v >> k;

            // Duyệt từng bit của k, nếu bit thứ j = 1 thì nhảy 2^j bước
            for (int j = 0; j < LOG; j++) {
                if (k & (1LL << j)) {            // Kiểm tra bit thứ j của k
                    v = up[v][j];                // Nhảy 2^j bước từ v
                }
            }

            cout << v << "\n";                   // In đỉnh kết quả
        }
        return 0;
    }
    ```

=== "Python"

    ```python
    import sys
    input = sys.stdin.readline                      # Tăng tốc I/O

    n, q = map(int, input().split())
    LOG = n.bit_length()                            # Số bit cần thiết: ⌊log₂(n)⌋ + 1

    # up[v][j] = đỉnh đến được khi nhảy 2^j bước từ đỉnh v
    up = [[0] * LOG for _ in range(n)]

    # Đọc hàm nhảy: up[v][0] = đỉnh sau 1 bước (2^0) từ v
    row = list(map(int, input().split()))
    for i in range(n):
        up[i][0] = row[i]

    # Tiền xử lý: up[v][i] = up[ up[v][i-1] ][i-1]
    # Nhảy 2^i bước = nhảy 2^(i-1) bước, rồi nhảy tiếp 2^(i-1) bước nữa
    for j in range(1, LOG):                         # Duyệt từng lũy thừa của 2
        for i in range(n):                          # Duyệt từng đỉnh
            up[i][j] = up[up[i][j - 1]][j - 1]

    # Truy vấn: từ đỉnh v, nhảy k bước
    for _ in range(q):
        v, k = map(int, input().split())
        # Duyệt từng bit của k, nếu bit thứ j = 1 thì nhảy 2^j bước
        for j in range(LOG):
            if k & (1 << j):                        # Kiểm tra bit thứ j của k
                v = up[v][j]                        # Nhảy 2^j bước từ v
        print(v)                                    # In đỉnh kết quả
    ```

---

### Minh họa trực quan: Nhảy nhị phân

Giả sử $n=10$, $k=22 = 10110_2$:

$$
22 = 16 + 4 + 2 = 2^4 + 2^2 + 2^1
$$

```
Nhảy từ v:  v ───2^4───→ u1 ───2^2───→ u2 ───2^1───→ u3 (đích)
Bit của k:   1   0   1   1   0  (đọc từ phải sang trái: bit 0...bit 4)
             ↑       ↑   ↑
           bit 1   bit 2 bit 4
```

**Quá trình truy vấn:**
| Bit $j$ | $1 \ll j$ | `k & (1<<j)` | Có nhảy? | `v = up[v][j]` |
|:---:|:---:|:---:|:---:|:---|
| 0 | 1 | $22 \& 1 = 0$ | ❌ | Giữ nguyên |
| 1 | 2 | $22 \& 2 = 2 \neq 0$ | ✅ | Nhảy $2^1=2$ bước |
| 2 | 4 | $22 \& 4 = 4 \neq 0$ | ✅ | Nhảy $2^2=4$ bước |
| 3 | 8 | $22 \& 8 = 0$ | ❌ | Giữ nguyên |
| 4 | 16 | $22 \& 16 = 16 \neq 0$ | ✅ | Nhảy $2^4=16$ bước |

Tổng số bước nhảy: $2 + 4 + 16 = 22 = k$ ✓

---

### Ứng dụng mở rộng: Phát hiện chu kỳ (Cycle Detection)

Khi làm việc với đồ thị hàm số (mỗi đỉnh có đúng một cạnh ra), binary lifting có thể giúp trả lời các truy vấn về chu kỳ.

**Bài toán con:** Từ đỉnh $v$, sau bao nhiêu bước thì vào chu kỳ? Chu kỳ có độ dài bao nhiêu?

=== "C++"
    ```cpp
    // Tìm điểm vào chu kỳ và độ dài chu kỳ từ đỉnh start
    // step[v]  : số bước từ start đến v
    // cycleLen : độ dài chu kỳ (tính được khi gặp lại đỉnh đã thăm)
    int findCycle(int start, vector<vector<int>>& up, int LOG) {
        vector<int> step(n, -1);               // step[v] = số bước từ start để đến v
        int v = start;
        int cnt = 0;
        while (step[v] == -1) {                // Chưa gặp lại đỉnh đã thăm
            step[v] = cnt++;                   // Ghi nhận thứ tự ghé thăm
            v = up[v][0];                      // Nhảy 1 bước
        }
        // Khi gặp lại v đã thăm: cnt - step[v] = độ dài chu kỳ
        int cycleStart = v;                    // Đỉnh bắt đầu chu kỳ
        int cycleLen = cnt - step[v];          // Độ dài chu kỳ
        int distToCycle = step[v];             // Số bước từ start đến điểm vào chu kỳ
        return cycleLen;
    }
    ```

=== "Python"
    ```python
    def find_cycle(start, up, n):
        step = [-1] * n                        # step[v] = số bước từ start để đến v
        v = start
        cnt = 0
        while step[v] == -1:                   # Chưa gặp lại đỉnh đã thăm
            step[v] = cnt                      # Ghi nhận thứ tự ghé thăm
            cnt += 1
            v = up[v][0]                       # Nhảy 1 bước
        # Khi gặp lại v đã thăm: cnt - step[v] = độ dài chu kỳ
        cycle_len = cnt - step[v]              # Độ dài chu kỳ
        dist_to_cycle = step[v]                # Số bước từ start đến điểm vào chu kỳ
        return cycle_len, dist_to_cycle
    ```

---

## 5. Mẹo và lưu ý

### 5.1 Các trường hợp đặc biệt

| Trường hợp | Xử lý |
|:---|:---|
| $k = 0$ | Không nhảy bước nào, kết quả là chính đỉnh $v$. Vòng lặp bit sẽ không kích hoạt bước nhảy nào. |
| $k$ rất lớn (vượt $N$) | Với đồ thị hàm số có chu kỳ, $k$ lớn sẽ quay vòng trong chu kỳ. Dùng phương pháp chu kỳ ở trên để xử lý. |
| $N = 1$ | Chỉ có 1 đỉnh, `LOG = 1`. Bảng `up[0][0]` có thể trỏ về chính nó (tự vòng). |
| $k > 2^{LOG}$ | Không thể nhảy quá $2^{LOG}-1$ bước trong bảng đã tiền xử lý. Với đồ thị hàm số, dùng modulo chu kỳ trước khi nhảy. |

### 5.2 Cạm bẫy thường gặp

- **Sai kích thước `LOG`:** Dùng `__lg(n) + 1` trong C++ hoặc `n.bit_length()` trong Python. Nếu đặt $LOG$ quá nhỏ, nhảy $k$ lớn sẽ truy cập ngoài mảng.
- **Nhầm thứ tự vòng lặp tiền xử lý:** Vòng ngoài phải là $j$ (lũy thừa), vòng trong là $i$ (đỉnh). Nếu đảo ngược, `up[up[i][j-1]][j-1]` có thể truy cập giá trị chưa được tính.
- **Dùng `int` cho $k$:** $k$ có thể lớn hơn $2^{31}$, dùng `long long` trong C++ và không cần lo trong Python.
- **Quên kiểm tra bit:** Luôn kiểm tra `if (k & (1LL << j))` thay vì `if (k >> j & 1)` để tránh lỗi với $k$ âm hoặc quá lớn.
- **Không xử lý trường hợp không tồn tại:** Với đồ thị không phải hàm số, nếu nhảy ra ngoài phạm vi, cần kiểm tra đỉnh `-1` hoặc giá trị sentinel.

### 5.3 Mẹo tối ưu

- Với $N \le 2 \times 10^5$, $LOG \approx 18$. Bảng `up` tiêu tốn khoảng $N \times 18 \times 4$ byte (với `int`) ≈ $14\text{ MB}$ — hoàn toàn chấp nhận được.
- Khi cần lưu thêm thông tin (tổng, min, max) trên đường nhảy, tạo thêm bảng song song với `up`.
- Kết hợp binary lifting với tìm kiếm nhị phân để giải các bài toán "nhảy đến khi vượt ngưỡng" (ví dụ: tổng trượt $\ge S$).

---

## 6. Bài tập luyện tập

| Mã bài | Tên bài tập | Độ khó | Kiểu bài tập (Bản chất) |
|---|---|---|---|
| [`bla-k-step`](https://fptoj.com/problem/bla-k-step) | Nhảy K Bước | ⭐ | Mô phỏng nhảy trên đồ thị hàm số bằng Binary Lifting |
| [`bla-next-greater`](https://fptoj.com/problem/bla-next-greater) | Nhảy Phải Số Lớn Hơn | ⭐⭐ | Tìm số lớn hơn tiếp theo kết hợp nhảy nhị phân |
| [`bla-cycle-det`](https://fptoj.com/problem/bla-cycle-det) | Tìm Chu Kỳ | ⭐⭐ | Tìm điểm vào chu kỳ, độ dài và khoảng cách trên đồ thị hàm số |
| [`bla-min-edge`](https://fptoj.com/problem/bla-min-edge) | Giá Trị Cực Tiểu Khi Nhảy | ⭐⭐⭐ | Truy vấn giá trị cực tiểu trên đường đi của Binary Lifting |
| [`bla-jump-limit`](https://fptoj.com/problem/bla-jump-limit) | Nhảy Đến Khi Vượt Ngưỡng | ⭐⭐⭐ | Tìm kiếm nhị phân kết hợp tổng lũy lũy thừa 2 trên đường đi |
| [`bla-reach-steps`](https://fptoj.com/problem/bla-reach-steps) | Số Bước Để Đến V | ⭐⭐⭐ | Tính số bước tối thiểu giữa hai đỉnh hoặc kiểm tra vô nghiệm |
| [`bla-sliding-sum`](https://fptoj.com/problem/bla-sliding-sum) | Tổng Trượt Vượt Ngưỡng | ⭐⭐⭐ | Tìm vị trí trượt xa nhất có tổng $\ge S$ |
| [`bla-segment-cover`](https://fptoj.com/problem/bla-segment-cover) | Phủ Đoạn | ⭐⭐⭐⭐ | Chọn ít đoạn thẳng nhất phủ kín khoảng $[A, B]$ |
| [`bla-partition`](https://fptoj.com/problem/bla-partition) | Phân Hoạch Đoạn Con | ⭐⭐⭐⭐ | Phân chia mảng thành các đoạn có tổng $\le M$ (RMQ + Binary Lifting) |
| [`bla-kth-distinct`](https://fptoj.com/problem/bla-kth-distinct) | Số Thứ K Khác Biệt | ⭐⭐⭐⭐ | Jump trên mảng với số lượng phần tử phân biệt bằng $D$ |

---

**Bài liên quan:**
*   [Segment Tree](segment-tree.md)
*   [Fenwick Tree (BIT)](fenwick-tree.md)
*   [Lowest Common Ancestor (LCA) trên cây](lca-binary-lifting.md)
