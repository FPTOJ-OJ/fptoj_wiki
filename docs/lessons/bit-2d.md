# BIT 2D (Fenwick Tree 2D) - Truy Vấn Tổng Hình Chữ Nhật

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** VNOI Wiki - Fenwick Tree, CP-Algorithms

---

## 1. Bản chất vấn đề

### Bài toán: Truy vấn tổng hình chữ nhật

Cho ma trận $A$ kích thước $N \times M$, thực hiện $Q$ truy vấn:

- **Update:** `update(x, y, val)` — Cộng $val$ vào $A[x][y]$.
- **Query:** `query(x1, y1, x2, y2)` — Tính tổng các phần tử trong hình chữ nhật từ $(x1, y1)$ đến $(x2, y2)$.

**Fenwick Tree 1D** giải quyết trên mảng 1D. Mở rộng lên 2D để xử lý ma trận.

### So sánh

| Cấu trúc | Update | Query | Không gian |
|----------|--------|-------|------------|
| Duyệt thường | $O(1)$ | $O(N \cdot M)$ | $O(NM)$ |
| Prefix Sum 2D | $O(NM)$ (phải build lại) | $O(1)$ | $O(NM)$ |
| **BIT 2D** | $O(\log N \cdot \log M)$ | $O(\log N \cdot \log M)$ | $O(NM)$ |

Prefix Sum 2D không hỗ trợ update. BIT 2D hỗ trợ cả update và query.

---

## 2. Tư duy cốt lõi

### Từ BIT 1D sang BIT 2D

**BIT 1D:** `query(i)` = tổng từ $1$ đến $i$. Dùng `i & (-i)` để nhảy.

**BIT 2D:** Mở rộng — `query(x, y)` = tổng hình chữ nhật từ $(1,1)$ đến $(x,y)$.

Mỗi ô `(x, y)` trong BIT 2D quản lý một hình chữ nhật con.

### Công thức update BIT 2D

Với mỗi cập nhật `update(x, y, val)`, duyệt tất cả nút cha theo cả 2 chiều:

- Vòng ngoài: `x` nhảy theo `x += x & (-x)` (tương tự BIT 1D).
- Vòng trong: với mỗi `x`, duyệt `y` theo `y += y & (-y)`.
- Cộng `val` vào `bit[x][y]` tại mỗi nút.

### Công thức query BIT 2D

Với mỗi truy vấn `query(x, y)` (tổng từ $(1,1)$ đến $(x,y)$):

- Vòng ngoài: `x` giảm theo `x -= x & (-x)`.
- Vòng trong: với mỗi `x`, duyệt `y` giảm theo `y -= y & (-y)`.
- Cộng dồn `bit[x][y]` vào kết quả.

### Truy vấn hình chữ nhật bằng nguyên lý bao hàm - loại trừ

$$\text{sum}(x1, y1, x2, y2) = Q(x2, y2) - Q(x1-1, y2) - Q(x2, y1-1) + Q(x1-1, y1-1)$$

```mermaid
flowchart LR
    A["Tổng HCN (x1,y1)→(x2,y2)"] --> B["= Q(x2,y2)"]
    A --> C["- Q(x1-1,y2)"]
    A --> D["- Q(x2,y1-1)"]
    A --> E["+ Q(x1-1,y1-1)"]
```

### Trace chi tiết

**Ma trận $3 \times 3$:**

| | $y=1$ | $y=2$ | $y=3$ |
|---|---|---|---|
| $x=1$ | $2$ | $3$ | $1$ |
| $x=2$ | $4$ | $1$ | $5$ |
| $x=3$ | $3$ | $2$ | $6$ |

**Truy vấn:** Tổng HCN $(1,2)$ đến $(2,3)$.

**Kỳ vọng:** $A[1][2] + A[1][3] + A[2][2] + A[2][3] = 3 + 1 + 1 + 5 = 10$

**Tính bằng BIT:**

| Bước | Gọi | Kết quả |
|------|-----|---------|
| 1 | $Q(2, 3)$ | Tổng $(1,1) \to (2,3)$ = $2+3+1+4+1+5 = 16$ |
| 2 | $Q(0, 3)$ | $0$ (vì $x=0$) |
| 3 | $Q(2, 1)$ | Tổng $(1,1) \to (2,1)$ = $2+4 = 6$ |
| 4 | $Q(0, 1)$ | $0$ (vì $x=0$) |

$\text{Kết quả} = 16 - 0 - 6 + 0 = 10$ ✓

---

## 3. Phân tích tính đúng đắn

### BIT 2D dựa trên nguyên lý nào?

BIT 2D mở rộng BIT 1D: thay vì `bit[i]` quản lý đoạn 1D, `bit[i][j]` quản lý hình chữ nhật 2D.

Phép `i += i & (-i)` trong BIT 1D nhảy đến nút cha quản lý đoạn lớn hơn. Trong BIT 2D, lồng 2 vòng lặp `x` và `y` để nhảy theo cả 2 chiều.

### Công thức bao hàm - loại trừ 2D

Tương tự nguyên lý inclusion-exclusion cho diện tích:

$$\text{Area}(A \cup B) = \text{Area}(A) + \text{Area}(B) - \text{Area}(A \cap B)$$

Áp dụng cho tổng hình chữ nhật:

$$S(x1,y1,x2,y2) = S(1,1,x2,y2) - S(1,1,x1-1,y2) - S(1,1,x2,y1-1) + S(1,1,x1-1,y1-1)$$

---

## 4. Đánh giá độ phức tạp

| Thao tác | Thời gian | Không gian |
|----------|-----------|------------|
| Khởi tạo | $O(NM \log N \log M)$ | $O(NM)$ |
| Update 1 ô | $O(\log N \cdot \log M)$ | $O(1)$ |
| Query tổng HCN | $O(\log N \cdot \log M)$ | $O(1)$ |

---

## Code minh họa

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    int n, m;
    vector<vector<long long>> bit;

    void update(int x, int y, long long val) {
        // i += i & (-i): nhảy tới nút cha quản lý đoạn lớn hơn (lowbit)
        // Vòng ngoài theo x, vòng trong theo y → phủ hết các nút cha 2D
        for (int i = x; i <= n; i += i & (-i))
            for (int j = y; j <= m; j += j & (-j))
                bit[i][j] += val; // CỘNG dồn delta, không phải gán (=)
    }

    long long query(int x, int y) {
        long long res = 0;
        // i -= i & (-i): nhảy ngược về nút trước đó để cộng dồn
        for (int i = x; i > 0; i -= i & (-i))
            for (int j = y; j > 0; j -= j & (-j))
                res += bit[i][j];
        return res;
    }

    long long queryRect(int x1, int y1, int x2, int y2) {
        return query(x2, y2) - query(x1 - 1, y2) - query(x2, y1 - 1) + query(x1 - 1, y1 - 1);
    }

    int main() {
        ios_base::sync_with_stdio(false);
        cin.tie(NULL);

        cin >> n >> m;
        bit.assign(n + 1, vector<long long>(m + 1, 0));

        // Đọc ma trận và cập nhật BIT
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                long long val;
                cin >> val;
                update(i, j, val);
            }
        }

        int q;
        cin >> q;
        while (q--) {
            int type;
            cin >> type;
            if (type == 1) {
                int x, y;
                long long val;
                cin >> x >> y >> val;
                update(x, y, val);
            } else {
                int x1, y1, x2, y2;
                cin >> x1 >> y1 >> x2 >> y2;
                cout << queryRect(x1, y1, x2, y2) << "\n";
            }
        }
        return 0;
    }
    ```

=== "Python"

    ```python
    import sys
    input = sys.stdin.readline

    n, m = map(int, input().split())
    bit = [[0] * (m + 1) for _ in range(n + 1)]

    def update(x, y, val):
        # i & (-i) = lowbit: bit 1 thấp nhất của i (vd i=6(110) → lowbit=2)
        # += lowbit để nhảy tới nút cha; -= lowbit để nhảy ngược khi query
        i = x
        while i <= n:
            j = y
            while j <= m:
                bit[i][j] += val  # CỘNG dồn delta, không phải gán (=)
                j += j & (-j)  # nhảy sang nút cha theo chiều y
            i += i & (-i)  # nhảy sang nút cha theo chiều x

    def query(x, y):
        # Tổng HCN (1,1)→(x,y): cộng dồn các nút BIT phủ kín vùng đó
        res = 0
        i = x
        while i > 0:
            j = y
            while j > 0:
                res += bit[i][j]
                j -= j & (-j)  # lùi về nút trước theo y
            i -= i & (-i)  # lùi về nút trước theo x
        return res

    def query_rect(x1, y1, x2, y2):
        return query(x2, y2) - query(x1 - 1, y2) - query(x2, y1 - 1) + query(x1 - 1, y1 - 1)

    for i in range(1, n + 1):
        row = list(map(int, input().split()))
        for j in range(1, m + 1):
            update(i, j, row[j - 1])

    q = int(input())
    for _ in range(q):
        parts = list(map(int, input().split()))
        if parts[0] == 1:
            x, y, val = parts[1], parts[2], parts[3]
            update(x, y, val)
        else:
            x1, y1, x2, y2 = parts[1], parts[2], parts[3], parts[4]
            print(query_rect(x1, y1, x2, y2))
    ```

---

## 5. Lỗi thường gặp

### SAI: Quên BIT là 1-indexed

```cpp
// SAI: truyền x = 0 hoặc lặp từ 0
update(0, 1, val); // vòng for không chạy / truy vấn sai
```

```cpp
// ĐÚNG: mọi chỉ số từ 1..n, 1..m
// Input 0-indexed thì cộng 1 trước khi gọi update/query
update(x + 1, y + 1, val);
```

### SAI: Nhầm cộng-gán (`+=`) với gán (`=`)

```cpp
// SAI: ghi đè làm mất dữ liệu các lần update trước
bit[i][j] = val;
```

```cpp
// ĐÚNG: BIT lưu tổng dồn → luôn cộng delta
bit[i][j] += val;
```

### SAI: Build bằng `update` từng ô → $O(NM \log N \log M)$ quá chậm

```cpp
// SAI (chậm với N, M ≥ 1000): N*M lần update
for (int i = 1; i <= n; i++)
    for (int j = 1; j <= m; j++) update(i, j, a[i][j]);
```

```cpp
// ĐÚNG: nếu chỉ cần query tĩnh (không update sau đó) → dùng Prefix Sum 2D O(NM).
// Nếu cần BIT động mà N, M lớn → đọc hết ma trận rồi build O(NM) bằng DP:
// bit[i][j] = a[i][j] + bit[i-lowbit][j] + bit[i][j-lowbit] - bit[i-lowbit][j-lowbit]
// (chỉ dùng khi hiểu rõ cấu trúc BIT; còn không thì chấp nhận update từng ô với N, M nhỏ)
```

---

## 6. Bài tập luyện tập

| Mã bài | Tên bài tập | Độ khó | Kiểu bài tập (Bản chất) |
|---|---|---|---|
| [`b2d-point-add`](https://fptoj.com/problem/b2d-point-add) | Cập Nhật Điểm Tổng Lưới | ⭐⭐ | Point Update, Range Query cơ bản |
| [`b2d-range-add`](https://fptoj.com/problem/b2d-range-add) | Cộng Đoạn Lưới Truy Vấn Điểm | ⭐⭐ | Range Update, Point Query (Mảng hiệu 2D) |
| [`b2d-rect-xor`](https://fptoj.com/problem/b2d-rect-xor) | Tổng XOR Vùng Hình Chữ Nhật | ⭐⭐⭐ | 2D BIT trên phép toán XOR tự nghịch đảo |
| [`b2d-invert`](https://fptoj.com/problem/b2d-invert) | Lật Bóng Đèn Ma Trận | ⭐⭐⭐ | Đảo trạng thái + Đếm tổng vùng |
| [`b2d-range-sum`](https://fptoj.com/problem/b2d-range-sum) | Cộng Đoạn Lưới Tính Tổng | ⭐⭐⭐⭐ | Range Update 2D, Range Query 2D (4 BIT 2D) |
| [`b2d-max-subgrid`](https://fptoj.com/problem/b2d-max-subgrid) | Tổng Lưới Con Lớn Nhất | ⭐⭐⭐⭐ | BIT 2D + Duyệt max lưới con cố định |
| [`b2d-coord-comp`](https://fptoj.com/problem/b2d-coord-comp) | Ngôi Sao Trên Bầu Trời | ⭐⭐⭐⭐ | Rời rạc hóa tọa độ + BIT 2D |
| [`b2d-nested-rect`](https://fptoj.com/problem/b2d-nested-rect) | Khung Tranh Bao Nhau | ⭐⭐⭐⭐ | Sorting (Sweep-line) + BIT 2D |

---

## Tài liệu tham khảo

- [CP-Algorithms — Fenwick Tree 2D](https://cp-algorithms.com/data_structures/fenwick.html#multi-dimensional-fenwick-tree)
- [VNOI Wiki — Fenwick Tree](https://wiki.vnoi.info/algo/data-structures/fenwick)
- [USACO Guide — 2D Range Queries](https://usaco.guide/plat/2DRQ?lang=cpp)



