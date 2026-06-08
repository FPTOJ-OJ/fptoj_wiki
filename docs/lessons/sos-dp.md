# Quy Hoạch Động SOS (Sum Over Subsets)

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** CP-Algorithms - SOS DP

---

## 1. Bản chất vấn đề

### Bài toán: Tổng trên tất cả tập con

Cho mảng $F$ chỉ mục bởi bitmask $0$ đến $2^N - 1$. Tính:

$$G[mask] = \sum_{S \subseteq mask} F[S]$$

**Duyệt thường:** Với mỗi $mask$, duyệt tất cả tập con $O(2^{|mask|})$. Tổng: $O(3^N)$.

**SOS DP:** $O(N \cdot 2^N)$.

### Ứng dụng

| Bài toán | Sử dụng SOS DP |
|----------|---------------|
| Tổng trên tập con | Tính $G[mask] = \sum_{S \subseteq mask} F[S]$ |
| Superset sum | Tính $G[mask] = \sum_{S \supseteq mask} F[S]$ |
| Đếm cặp $(i, j)$ với $i \mathbin{\&} j = 0$ | SOS DP + inclusion-exclusion |

---

## 2. Tư duy cốt lõi

### Ý tưởng: Duyệt từng bit

Thay vì duyệt tất cả tập con, duyệt từng bit $i$ từ 0 đến $N-1$:

- Nếu bit $i$ của $mask$ là 1: $G[mask] = G[mask] + G[mask \oplus 2^i]$
- Nếu bit $i$ của $mask$ là 0: $G[mask]$ giữ nguyên (đã tính ở bước trước)

### Trace chi tiết

$N = 3$, $F = [1, 2, 3, 4, 5, 6, 7, 8]$ (tương ứng mask 000 đến 111)

**Kỳ vọng:** $G[111] = F[000] + F[001] + F[010] + F[011] + F[100] + F[101] + F[110] + F[111] = 36$

**SOS DP:**

| Bước | Bit $i$ | Cập nhật |
|------|---------|----------|
| 0 | Khởi tạo | $G = F = [1,2,3,4,5,6,7,8]$ |
| 1 | $i=0$ | Với mask có bit 0 = 1: cộng $G[mask \oplus 1]$ |
| | | $G[001] += G[000] = 2+1 = 3$ |
| | | $G[011] += G[010] = 4+3 = 7$ |
| | | $G[101] += G[100] = 6+5 = 11$ |
| | | $G[111] += G[110] = 8+7 = 15$ |
| 2 | $i=1$ | $G[010] += G[000] = 3+1 = 4$ |
| | | $G[011] += G[001] = 7+3 = 10$ |
| | | $G[110] += G[100] = 7+5 = 12$ |
| | | $G[111] += G[101] = 15+11 = 26$ |
| 3 | $i=2$ | $G[100] += G[000] = 5+1 = 6$ |
| | | $G[101] += G[001] = 11+3 = 14$ |
| | | $G[110] += G[010] = 12+4 = 16$ |
| | | $G[111] += G[011] = 26+10 = 36$ |

**Kết quả:** $G[111] = 36$ ✓

```matplotlib
import numpy as np

F = [1, 2, 3, 4, 5, 6, 7, 8]
N = 3
size = 1 << N

G = np.zeros((N + 1, size), dtype=int)
G[0] = F[:]

for i in range(N):
    G[i + 1] = G[i].copy()
    for mask in range(size):
        if mask & (1 << i):
            G[i + 1][mask] += G[i][mask ^ (1 << i)]

fig, axes = plt.subplots(1, N + 1, figsize=(14, 4))

labels = [f'{i:03b}' for i in range(size)]
step_labels = ['Khởi tạo\nG = F', 'Sau bit 0\nG[mask] += G[mask⊕1]', 'Sau bit 1\nG[mask] += G[mask⊕2]', 'Sau bit 2\nG[mask] += G[mask⊕4]']

vmin = G.min()
vmax = G.max()

for idx in range(N + 1):
    ax = axes[idx]
    data = G[idx].reshape(1, -1)
    im = ax.imshow(data, cmap='YlOrRd', aspect='auto', vmin=vmin, vmax=vmax)

    for i in range(size):
        ax.text(i, 0, str(G[idx][i]), ha='center', va='center', fontsize=13, fontweight='bold',
                color='white' if G[idx][i] > vmax * 0.6 else 'black')

    ax.set_xticks(range(size))
    ax.set_xticklabels(labels, fontsize=10, fontfamily='monospace')
    ax.set_yticks([])
    ax.set_title(step_labels[idx], fontsize=11, fontweight='bold')

    if idx > 0:
        changed = []
        for m in range(size):
            if G[idx][m] != G[idx - 1][m]:
                changed.append(m)
        for m in changed:
            ax.add_patch(plt.Rectangle((m - 0.5, -0.5), 1, 1, fill=False, edgecolor='#2ecc71', linewidth=3))

fig.suptitle('SOS DP: Tiến trình cập nhật G[mask] qua từng bit\n(N=3, F=[1,2,3,4,5,6,7,8])', fontsize=14, fontweight='bold')
plt.tight_layout()
```

---

## 3. Phân tích tính đúng đắn

### Tại sao $O(N \cdot 2^N)$?

Sau bước $i$, $G[mask]$ = tổng $F[S]$ với $S \subseteq mask$ và $S$ chỉ khác $mask$ ở các bit $0, 1, \ldots, i$.

Sau bước $N-1$, $G[mask]$ = tổng $F[S]$ với $S \subseteq mask$ (tất cả bit).

---

## 4. Đánh giá độ phức tạp

| Thao tác | Thời gian | Không gian |
|----------|-----------|------------|
| SOS DP | $O(N \cdot 2^N)$ | $O(2^N)$ |

---

## Code minh họa

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    int main() {
        int n;
        cin >> n;
        int size = 1 << n;

        vector<long long> F(size), G(size);
        for (int i = 0; i < size; i++) {
            cin >> F[i];
            G[i] = F[i];
        }

        // SOS DP
        for (int i = 0; i < n; i++) {
            for (int mask = 0; mask < size; mask++) {
                if (mask & (1 << i)) {
                    G[mask] += G[mask ^ (1 << i)];
                }
            }
        }

        for (int mask = 0; mask < size; mask++) {
            cout << "G[" << mask << "] = " << G[mask] << "\n";
        }
        return 0;
    }
    ```

=== "Python"

    ```python
    n = int(input())
    size = 1 << n
    F = list(map(int, input().split()))
    G = F[:]

    for i in range(n):
        for mask in range(size):
            if mask & (1 << i):
                G[mask] += G[mask ^ (1 << i)]

    for mask in range(size):
        print(f"G[{mask}] = {G[mask]}")
    ```
