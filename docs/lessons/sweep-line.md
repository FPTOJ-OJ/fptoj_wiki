# Thuật Toán Đường Quét (Sweep Line)

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** VNOI Wiki, CP-Algorithms - Sweep Line

---

## 1. Bản chất vấn đề

### Bài toán: Tìm giao điểm đoạn thẳng

Cho $N$ đoạn thẳng trong mặt phẳng. Kiểm tra có đoạn nào giao nhau không, hoặc đếm số cặp giao điểm.

**Cách thường:** Duyệt mọi cặp $O(N^2)$.

**Sweep Line:** Quét theo 1 chiều (thường là trục $x$), duy trì trạng thái tại mỗi thời điểm $\Rightarrow O(N \log N)$.

### Ứng dụng

| Bài toán | Sweep Line |
|----------|------------|
| Giao điểm đoạn thẳng | $O(N \log N)$ |
| Diện tích hợp hình chữ nhật | $O(N \log N)$ |
| Bài toán đặt camera | $O(N \log N)$ |
| Đếm cặp đoạn giao nhau | $O(N \log N)$ |

---

## 2. Tư duy cốt lõi

### Ý tưởng: Dòng quét (sweep line)

Tưởng tượng 1 đường thẳng đứng quét từ trái sang phải. Tại mỗi thời điểm:

1. **Sự kiện bắt đầu:** Gặp đầu trái của đoạn → thêm đoạn vào "tập hoạt động".
2. **Sự kiện kết thúc:** Gặp đầu phải của đoạn → xóa đoạn khỏi "tập hoạt động".
3. **Kiểm tra:** Các đoạn trong "tập hoạt động" có giao nhau không?

```matplotlib
fig, axes = plt.subplots(1, 3, figsize=(14, 5))

segments = [
    ((0.5, 3), (4.5, 3), 'A'),
    ((1.5, 1.5), (5, 1.5), 'B'),
    ((2, 4.5), (6, 4.5), 'C'),
    ((3, 2), (7, 2), 'D'),
]

sweep_positions = [2.0, 4.0, 6.0]
sweep_colors = ['#f44336', '#FF9800', '#4CAF50']

for idx, (sx, sc) in enumerate(zip(sweep_positions, sweep_colors)):
    ax = axes[idx]
    active = []
    for (x1, y1), (x2, y2), name in segments:
        is_active = x1 <= sx <= x2
        color = '#2196F3' if is_active else '#555'
        alpha_val = 1.0 if is_active else 0.3
        lw = 3 if is_active else 1.5
        ax.plot([x1, x2], [y1, y2], '-', color=color, linewidth=lw, alpha=alpha_val, solid_capstyle='round')
        mid_x = (x1 + x2) / 2
        ax.annotate(name, (mid_x, y1), textcoords='offset points', xytext=(0, 10), fontsize=10, ha='center', fontweight='bold', color=color)
        if is_active:
            active.append(name)

    ax.axvline(sx, color=sc, linewidth=2.5, linestyle='--', alpha=0.9, label=f'Đường quét x={sx}')
    ax.plot([sx], [0.8], marker='v', color=sc, markersize=12)
    active_str = ', '.join(active) if active else 'Không có'
    ax.set_title(f'x = {sx} | Hoạt động: {active_str}', fontsize=10, fontweight='bold')
    ax.set_xlim(-0.2, 8); ax.set_ylim(0.3, 5.2)
    ax.set_xlabel('x'); ax.set_ylabel('y')
    ax.legend(loc='upper left', fontsize=8)
    ax.grid(True, alpha=0.2)

fig.suptitle('Thuật toán Sweep Line - Đường quét', fontsize=14, fontweight='bold', y=1.02)
plt.tight_layout()
```

### Cài đặt bằng Priority Queue + Set

- **Priority Queue (min-heap):** Lưu các sự kiện (tọa độ $x$, loại sự kiện, chỉ số đoạn).
- **Set (BST):** Lưu các đoạn đang hoạt động, sắp xếp theo $y$ tại vị trí quét hiện tại.

### Sweep Line 1D: Tìm điểm phủ nhiều đoạn nhất

Bài toán: Cho $N$ đoạn trên trục số $[L_i, R_i]$, tìm số lượng đoạn phủ nhiều nhất tại một điểm.

**Cách làm:** Tại $L_i$ tạo sự kiện +1, tại $R_i$ tạo sự kiện -1. Quét từ trái sang phải, cộng dồn, lấy giá trị lớn nhất.

Ví dụ: Đoạn $[1,4], [2,5], [3,6]$.

| Sự kiện $x$ | Loại | Tổng cộng dồn | Giá trị lớn nhất |
|-------------|------|---------------|-------------------|
| 1 | +1 | 1 | 1 |
| 2 | +1 | 2 | 2 |
| 3 | +1 | 3 | **3** |
| 4 | -1 | 2 | 3 |
| 5 | -1 | 1 | 3 |
| 6 | -1 | 0 | 3 |

Kết quả: điểm $x=3$ có 3 đoạn phủ.

### Trace chi tiết (Diện tích hợp)

**Ví dụ với 3 hình chữ nhật:**

- HCN1: $(1,1)-(4,3)$
- HCN2: $(2,2)-(5,4)$
- HCN3: $(3,0)-(6,3)$

**Danh sách sự kiện** (sau khi sắp xếp):

| $x$ | Type | $y_1$ | $y_2$ | active_len | Diện tích thêm |
|-----|------|-------|-------|------------|----------------|
| 1 | +1 | 1 | 3 | 0 → 2 | $0 \cdot (1-1) = 0$ |
| 2 | +1 | 2 | 4 | 2 → 3 | $2 \cdot (2-1) = 2$ |
| 3 | +1 | 0 | 3 | 3 → 4 | $3 \cdot (3-2) = 3$ |
| 4 | -1 | 1 | 3 | 4 → 3 | $4 \cdot (4-3) = 4$ |
| 5 | -1 | 2 | 4 | 3 → 2 | $3 \cdot (5-4) = 3$ |
| 6 | -1 | 0 | 3 | 2 → 0 | $2 \cdot (6-5) = 2$ |

**Tổng diện tích:** $0 + 2 + 3 + 4 + 3 + 2 = 14$.

### Trace chi tiết (Giao điểm đoạn thẳng)

**3 đoạn:** $A = [(1,1)-(4,3)]$, $B = [(2,2)-(5,1)]$, $C = [(3,0)-(6,4)]$

| Sự kiện $x$ | Loại | Đoạn | Hành động |
|-------------|------|------|-----------|
| 1 | Bắt đầu | $A$ | Thêm $A$ vào set |
| 2 | Bắt đầu | $B$ | Thêm $B$ vào set. Kiểm tra $A \cap B$? |
| 3 | Bắt đầu | $C$ | Thêm $C$ vào set. Kiểm tra $A \cap C$? $B \cap C$? |
| 4 | Kết thúc | $A$ | Xóa $A$ khỏi set |
| 5 | Kết thúc | $B$ | Xóa $B$ khỏi set |
| 6 | Kết thúc | $C$ | Xóa $C$ khỏi set |

---

## 3. Phân tích tính đúng đắn

### Tại sao chỉ cần kiểm tra láng giềng trong set?

Khi quét đến vị trí $x$, các đoạn trong set được sắp xếp theo $y$. Nếu 2 đoạn $A$ và $B$ giao nhau, tại thời điểm quét qua điểm giao, chúng sẽ là **láng giềng** trong set (không có đoạn nào nằm giữa).

Do đó, chỉ cần kiểm tra mỗi đoạn với láng giềng trên/dưới trong set.

---

## 4. Đánh giá độ phức tạp

| Thao tác | Thời gian |
|----------|-----------|
| Sắp xếp sự kiện | $O(N \log N)$ |
| Xử lý mỗi sự kiện (set) | $O(\log N)$ |
| **Tổng** | $O(N \log N)$ |

---

## Code minh họa

### Diện tích hợp hình chữ nhật

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    // Cấu trúc sự kiện cho Sweep Line
    struct Event {
        int x, y1, y2, type; // type: +1 (bắt đầu HCN), -1 (kết thúc HCN)
        bool operator<(const Event& o) const {
            if (x != o.x) return x < o.x;       // Sắp xếp theo tọa độ x tăng dần
            return type < o.type;                // Sự kiện bắt đầu (-1) trước kết thúc (+1)
        }
    };

    int main() {
        int n;
        cin >> n;                                // Số hình chữ nhật

        vector<Event> events;
        set<int> ycoords;                        // Lưu các tọa độ y để rời rạc hóa

        for (int i = 0; i < n; i++) {
            int x1, y1, x2, y2;
            cin >> x1 >> y1 >> x2 >> y2;         // Đọc HCN: (x1,y1) - (x2,y2)
            events.push_back({x1, y1, y2, 1});   // Sự kiện bắt đầu tại x1
            events.push_back({x2, y1, y2, -1});  // Sự kiện kết thúc tại x2
            ycoords.insert(y1);                   // Lưu y1 để rời rạc
            ycoords.insert(y2);                   // Lưu y2 để rời rạc
        }

        sort(events.begin(), events.end());       // Sắp xếp sự kiện theo x

        // Rời rạc hóa tọa độ y
        vector<int> ys(ycoords.begin(), ycoords.end());
        map<int, int> ytoi;                      // Ánh xạ y gốc → chỉ số trong mảng
        for (int i = 0; i < (int)ys.size(); i++) ytoi[ys[i]] = i;

        int m = ys.size();                       // Số tọa độ y sau rời rạc
        vector<int> cnt(m, 0);                   // cnt[i] = số HCN đang phủ đoạn [ys[i], ys[i+1]]

        long long area = 0;
        int prev_x = events[0].x;                // Vị trí x trước đó

        for (auto& e : events) {
            // Tính diện tích từ prev_x đến e.x
            // active_len = tổng độ dài các đoạn y đang được phủ
            int active_len = 0;
            for (int i = 0; i < m - 1; i++) {
                if (cnt[i] > 0) {               // Đoạn [ys[i], ys[i+1]] đang được phủ
                    active_len += ys[i + 1] - ys[i];
                }
            }
            area += (long long)active_len * (e.x - prev_x); // Diện tích = dài * rộng

            // Cập nhật mảng cnt: thêm/xóa HCN tại sự kiện này
            int lo = ytoi[e.y1], hi = ytoi[e.y2];
            for (int i = lo; i < hi; i++) {      // Cập nhật các đoạn y bị ảnh hưởng
                cnt[i] += e.type;                 // +1 nếu bắt đầu, -1 nếu kết thúc
            }
            prev_x = e.x;
        }

        cout << area << "\n";                    // In tổng diện tích
        return 0;
    }
    ```

=== "Python"

    ```python
    import sys
    from collections import defaultdict
    input = sys.stdin.readline

    n = int(input())                           # Số hình chữ nhật
    events = []                                # Danh sách sự kiện (x, type, y1, y2)
    ycoords = set()

    for _ in range(n):
        x1, y1, x2, y2 = map(int, input().split())  # Đọc HCN
        events.append((x1, 1, y1, y2))          # Sự kiện bắt đầu tại x1
        events.append((x2, -1, y1, y2))         # Sự kiện kết thúc tại x2
        ycoords.add(y1)                         # Lưu y để rời rạc hóa
        ycoords.add(y2)

    events.sort()                               # Sắp xếp theo x, rồi theo type

    # Rời rạc hóa tọa độ y
    ys = sorted(ycoords)
    ytoi = {y: i for i, y in enumerate(ys)}     # Ánh xạ y → chỉ số
    m = len(ys)
    cnt = [0] * m                               # cnt[i] = số HCN phủ đoạn [ys[i], ys[i+1]]

    area = 0
    prev_x = events[0][0]                       # Vị trí x trước đó

    for x, typ, y1, y2 in events:
        # Tính tổng độ dài y đang được phủ
        active_len = 0
        for i in range(m - 1):
            if cnt[i] > 0:                      # Đoạn đang có HCN phủ
                active_len += ys[i + 1] - ys[i]
        area += active_len * (x - prev_x)       # Diện tích = dài * (x_mới - x_cũ)

        # Cập nhật mảng phủ
        lo, hi = ytoi[y1], ytoi[y2]
        for i in range(lo, hi):                 # Cập nhật các đoạn từ lo đến hi-1
            cnt[i] += typ                       # Thêm hoặc xóa HCN
        prev_x = x

    print(area)                                 # Tổng diện tích hợp
    ```

---

## 5. Bài tập luyện tập (FPTOJ)

| Bài | Nền tảng | Độ khó | Kiểu bài tập (Bản chất) |
|-----|----------|--------|------------------------|
| `sweep-seg-intersect` | [Giao điểm đoạn thẳng](https://fptoj.com/problem/sweep-seg-intersect) | ⭐⭐ | Sweep Line - giao điểm |
| `sweep-rect-area` | [Diện tích hợp hình chữ nhật](https://fptoj.com/problem/sweep-rect-area) | ⭐⭐⭐ | Sweep Line - diện tích |
| `sweep-max-overlap` | [Điểm phủ nhiều đoạn nhất](https://fptoj.com/problem/sweep-max-overlap) | ⭐⭐ | Sweep Line 1D |
| `sweep-rect-overlap` | [Điểm phủ nhiều hình chữ nhật nhất](https://fptoj.com/problem/sweep-rect-overlap) | ⭐⭐⭐ | Sweep Line 2D |
| `sweep-pair-count` | [Đếm cặp đoạn giao nhau](https://fptoj.com/problem/sweep-pair-count) | ⭐⭐⭐ | Sweep Line + BIT |
| `sweep-points-rect` | [Đếm điểm trong hình chữ nhật](https://fptoj.com/problem/sweep-points-rect) | ⭐⭐ | Sweep Line + BIT |
| `sweep-max-gap` | [Khoảng trống lớn nhất](https://fptoj.com/problem/sweep-max-gap) | ⭐⭐ | Sweep Line 1D |
| `sweep-camera` | [Đặt camera phủ kín đoạn](https://fptoj.com/problem/sweep-camera) | ⭐⭐⭐ | Sweep Line - phủ đoạn |
