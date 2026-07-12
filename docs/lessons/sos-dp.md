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
        int n;                   // Số bit (N)
        cin >> n;
        int size = 1 << n;       // Tổng số mask: 2^N

        vector<long long> F(size), G(size);
        for (int i = 0; i < size; i++) {
            cin >> F[i];         // Đọc giá trị F cho từng mask
            G[i] = F[i];         // Khởi tạo G = F (bước 0)
        }

        // === SOS DP: duyệt từng bit ===
        // Sau bước i, G[mask] = tổng F[S] với S ⊆ mask
        //   và S chỉ khác mask ở các bit 0..i
        for (int i = 0; i < n; i++) {
            for (int mask = 0; mask < size; mask++) {
                // Nếu bit thứ i của mask là 1
                if (mask & (1 << i)) {
                    // mask ^ (1 << i) = mask với bit i bị tắt
                    // G[mask ^ (1<<i)] đã bao gồm tổng F[S] với S ⊆ mask\{bit i}
                    G[mask] += G[mask ^ (1 << i)];
                }
                // Nếu bit i = 0, G[mask] giữ nguyên (đã tính ở bước trước)
            }
        }

        // In kết quả
        for (int mask = 0; mask < size; mask++) {
            cout << "G[" << mask << "] = " << G[mask] << "\n";
        }
        return 0;
    }
    ```

=== "Python"

    ```python
    n = int(input())             # Số bit (N)
    size = 1 << n                # Tổng số mask: 2^N
    F = list(map(int, input().split()))
    G = F[:]                     # Khởi tạo G = F (bước 0)

    # === SOS DP: duyệt từng bit ===
    # Sau bước i, G[mask] = tổng F[S] với S ⊆ mask
    #   và S chỉ khác mask ở các bit 0..i
    for i in range(n):
        for mask in range(size):
            # Nếu bit thứ i của mask là 1
            if mask & (1 << i):
                # mask ^ (1 << i) = mask với bit i bị tắt
                # G[mask ^ (1<<i)] đã bao gồm tổng F[S] với S ⊆ mask\{bit i}
                G[mask] += G[mask ^ (1 << i)]
            # Nếu bit i = 0, G[mask] giữ nguyên (đã tính ở bước trước)

    # In kết quả
    for mask in range(size):
        print(f"G[{mask}] = {G[mask]}")
    ```

---

## 5. Biến thể

### 5.1 Tổng trên tập cha (Superset Sum)

Thay vì cộng dồn vào tập con, ta tính:

$$G[mask] = \sum_{S \supseteq mask} F[S]$$

Cách làm: **đảo ngược điều kiện bit**.

=== "C++"

    ```cpp
    // Tổng trên tập CHA: G[mask] = sum F[S] với S ⊇ mask
    for (int i = 0; i < n; i++) {
        for (int mask = 0; mask < size; mask++) {
            // Nếu bit thứ i của mask là 0 (để thêm vào superset)
            if (!(mask & (1 << i))) {
                // mask | (1 << i) = mask với bit i bật → superset của mask
                G[mask] += G[mask | (1 << i)];
            }
        }
    }
    ```

=== "Python"

    ```python
    # Tổng trên tập CHA: G[mask] = sum F[S] với S ⊇ mask
    for i in range(n):
        for mask in range(size):
            # Nếu bit thứ i của mask là 0 (để thêm vào superset)
            if not (mask & (1 << i)):
                # mask | (1 << i) = mask với bit i bật → superset của mask
                G[mask] += G[mask | (1 << i)]
    ```

### 5.2 Giá trị lớn nhất / nhỏ nhất trên tập con

Thay `+=` bằng `max` hoặc `min`:

```cpp
// G[mask] = max F[S] với S ⊆ mask
for (int i = 0; i < n; i++)
    for (int mask = 0; mask < size; mask++)
        if (mask & (1 << i))
            G[mask] = max(G[mask], G[mask ^ (1 << i)]);
```

### 5.3 Đếm số tập con thỏa mãn điều kiện

Thay `+=` bằng phép đếm:

```cpp
// cnt[mask] = số lượng tập con S ⊆ mask có F[S] > 0
for (int i = 0; i < n; i++)
    for (int mask = 0; mask < size; mask++)
        if (mask & (1 << i))
            cnt[mask] += cnt[mask ^ (1 << i)];
```

---

## 6. Lưu ý và bẫy thường gặp

### Sai thứ tự vòng lặp

```cpp
// SAI: đảo thứ tự → mỗi bit bị "lan truyền" nhiều lần
for (int mask = 0; mask < size; mask++)
    for (int i = 0; i < n; i++)
        if (mask & (1 << i))
            G[mask] += G[mask ^ (1 << i)];

// ĐÚNG: duyệt bit ngoài, mask trong — mỗi bit chỉ ảnh hưởng 1 lần
for (int i = 0; i < n; i++)
    for (int mask = 0; mask < size; mask++)
        if (mask & (1 << i))
            G[mask] += G[mask ^ (1 << i)];
```

**Giải thích:** Nếu duyệt mask trước rồi mới duyệt bit, khi xử lý `G[mask]`, ta sẽ dùng giá trị `G[mask ^ (1<<i)]` đã được cập nhật bởi các bit khác trong cùng một "lượt" → kết quả sai.

### Tràn số với phép cộng

Với $N = 20$, số tập con là $2^{20} \approx 10^6$. Nếu mỗi $F[i] \leq 10^9$, tổng có thể lên đến $10^{15}$ → cần `long long` (64-bit).

### Giá trị F[S] có thể âm

Khi $F[S]$ có giá trị âm, kết quả SOS DP vẫn đúng vì phép cộng bảo toàn dấu. Tuy nhiên nếu dùng `max`/`min`, cần khởi tạo đúng:

```cpp
// Dùng -INF để không bỏ sót giá trị âm
const long long INF = 1e18;
vector<long long> G(size, -INF);
```

### Áp dụng cho bài toán AND/OR/XOR

| Phép toán tập hợp | Phép thao tác bit |
|:---|:---|
| Tập con ($S \subseteq mask$) | $S \mathbin{\&} mask = S$ |
| Tập cha ($S \supseteq mask$) | $S \mathbin{|} mask = S$ |
| Không giao ($S \cap mask = \emptyset$) | $S \mathbin{\&} mask = 0$ |

Với bài toán đếm cặp $i \mathbin{\&} j = 0$:
$$\text{số cặp} = \sum_{mask} F[mask] \cdot G[(2^N - 1) \oplus mask]$$

Trong đó $G$ là SOS DP trên tập con (subset sum), và $(2^N-1) \oplus mask$ là phần bù của mask.

---

## Bài tập luyện tập

| Mã bài | Tên bài tập | Độ khó | Kiểu bài tập (Bản chất) | Bài học lý thuyết |
| :--- | :--- | :---: | :--- | :--- |
| `sos-sum-sub` | [Tổng Trên Tập Con](https://fptoj.com/problem/sos-sum-sub) | ⭐⭐ | Tổng trên tập con | [SOS DP](sos-dp.md) |
| `sos-max-sub` | [Lớn Nhất Trên Tập Con](https://fptoj.com/problem/sos-max-sub) | ⭐⭐ | Giá trị lớn nhất trên tập con | [SOS DP](sos-dp.md) |
| `sos-cnt-sub` | [Đếm Trên Tập Con](https://fptoj.com/problem/sos-cnt-sub) | ⭐⭐⭐ | Đếm số lượng trên tập con | [SOS DP](sos-dp.md) |
| `sos-or-pair` | [Cặp OR](https://fptoj.com/problem/sos-or-pair) | ⭐⭐⭐ | Đếm cặp OR | [SOS DP](sos-dp.md) |
| `sos-and-zero` | [Cặp AND Bằng 0](https://fptoj.com/problem/sos-and-zero) | ⭐⭐⭐ | Đếm cặp AND bằng $0$ | [SOS DP](sos-dp.md) |
| `sos-three-or` | [Ba Số OR](https://fptoj.com/problem/sos-three-or) | ⭐⭐⭐⭐ | Ba số có OR lớn nhất | [SOS DP](sos-dp.md) |
| `sos-max-xor-sub` | [XOR Lớn Nhất Trên Tập Con](https://fptoj.com/problem/sos-max-xor-sub) | ⭐⭐⭐ | XOR lớn nhất trên tập con | [SOS DP](sos-dp.md) |
| `sos-four-and` | [Bốn Số AND](https://fptoj.com/problem/sos-four-and) | ⭐⭐⭐⭐ | Bốn số có AND lớn nhất | [SOS DP](sos-dp.md) |
| `sos-gcd-set` | [GCD Tập Hợp](https://fptoj.com/problem/sos-gcd-set) | ⭐⭐⭐⭐ | GCD của tập hợp | [SOS DP](sos-dp.md) |
| `sos-seven-and` | [Bảy Số AND](https://fptoj.com/problem/sos-seven-and) | ⭐⭐⭐⭐⭐ | Bảy số AND | [SOS DP](sos-dp.md) |
| `sos-xor-pair` | [Cặp XOR](https://fptoj.com/problem/sos-xor-pair) | ⭐⭐ | Đếm cặp XOR | [SOS DP](sos-dp.md) |
