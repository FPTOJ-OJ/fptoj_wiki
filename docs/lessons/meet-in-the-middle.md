# Chia Đôi Tập (Meet in the Middle) - Biến $O(2^N)$ Thành $O(2^{N/2})$

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** VNOI Wiki - Meet in the Middle, USACO Guide

---

## 1. Bản chất vấn đề

### Bài toán: Tổng tập con bằng $X$

Cho mảng $A$ gồm $N$ phần tử. Đếm số tập con có tổng đúng bằng $X$.

- $N \le 40$, $X \le 10^{18}$, $A_i \le 10^{15}$.

**Cách duyệt thường:** Duyệt tất cả $2^N$ tập con $\Rightarrow O(2^N)$.

Với $N = 40$: $2^{40} \approx 10^{12}$ $\Rightarrow$ **quá chậm!**

**Meet in the Middle:** Chia mảng thành 2 nửa, duyệt riêng từng nửa rồi ghép kết quả $\Rightarrow O(2^{N/2} \cdot N)$.

Với $N = 40$: $2^{20} \approx 10^6$ $\Rightarrow$ **chấp nhận được!**

```matplotlib
N = np.arange(10, 45)
brute = 2**N
mitm = 2**(N/2) * N

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

ax1.plot(N, brute, label='Brute force $2^N$', color='#e74c3c', linewidth=2)
ax1.plot(N, mitm, label='Meet in the Middle $2^{N/2} \\cdot N$', color='#2ecc71', linewidth=2)
ax1.axhline(y=1e8, color='gray', linestyle='--', alpha=0.5, label='Giới hạn $10^8$ phép')
ax1.set_xlabel('N')
ax1.set_ylabel('Số phép tính (thang log)')
ax1.set_title('So sánh độ phức tạp')
ax1.set_yscale('log')
ax1.legend(fontsize=9)
ax1.grid(True, alpha=0.3)

N2 = np.arange(20, 42)
brute_time = 2**N2 / 1e9
mitm_time = 2**(N2/2) * N2 / 1e9

ax2.bar(N2 - 0.2, np.minimum(brute_time, 1e6), 0.4, label='Brute force (giây)', color='#e74c3c', alpha=0.7)
ax2.bar(N2 + 0.2, mitm_time, 0.4, label='Meet in the Middle (giây)', color='#2ecc71', alpha=0.7)
ax2.set_xlabel('N')
ax2.set_ylabel('Thời gian (giây, thang log)')
ax2.set_title('Thời gian thực tế ước tính')
ax2.set_yscale('log')
ax2.legend(fontsize=9)
ax2.grid(True, alpha=0.3, axis='y')

plt.tight_layout()
```

### Khi nào dùng Meet in the Middle?

| Đặc điểm | Mô tả |
|-----------|-------|
| $N$ nhỏ ($20 \le N \le 40$) | Duyệt $2^N$ quá chậm, nhưng $2^{N/2}$ chấp nhận được |
| Bài toán tập con / tổ hợp | Cần xét tất cả cách chọn |
| Không có quy hoạch động | Không thể tối ưu bằng DP |

---

## 2. Tư duy cốt lõi

### Ý tưởng chính

Chia mảng $A$ thành 2 nửa:

- **Nửa trái:** $L = A[0], A[1], \ldots, A[\lfloor N/2 \rfloor - 1]$ (kích thước $n_1 = \lfloor N/2 \rfloor$)
- **Nửa phải:** $R = A[\lfloor N/2 \rfloor], \ldots, A[N-1]$ (kích thước $n_2 = \lceil N/2 \rceil$)

**Bước 1:** Sinh tất cả $2^{n_1}$ tổng tập con của nửa trái $\Rightarrow$ lưu vào mảng `sumL`.

**Bước 2:** Sinh tất cả $2^{n_2}$ tổng tập con của nửa phải $\Rightarrow$ lưu vào mảng `sumR`.

**Bước 3:** Với mỗi giá trị $s$ trong `sumL`, tìm số phần tử trong `sumR` bằng $X - s$.

### Minh họa luồng thuật toán

```mermaid
flowchart LR
    A["Mảng A [N phần tử]"] --> B["Chia đôi"]
    B --> C["Nửa trái: n₁ phần tử"]
    B --> D["Nửa phải: n₂ phần tử"]
    C --> E["Sinh 2^n₁ tổng tập con"]
    D --> F["Sinh 2^n₂ tổng tập con"]
    E --> G["Lưu vào sumL"]
    F --> H["Sắp xếp sumR"]
    G --> I["Với mỗi s ∈ sumL:\nĐếm (X - s) trong sumR bằng Binary Search"]
    H --> I
    I --> J["Tổng kết quả"]
```

### Trace chi tiết với ví dụ

**Input:** $A = [2, 3, 5, 8, 13, 21]$, $N = 6$, $X = 26$

**Bước 1 — Chia đôi:**

| Nửa | Phần tử | Kích thước |
|-----|---------|------------|
| Trái | $[2, 3, 5]$ | $n_1 = 3$ |
| Phải | $[8, 13, 21]$ | $n_2 = 3$ |

**Bước 2 — Sinh tổng tập con nửa trái** ($2^3 = 8$ tập):

| Mask | Nhị phân | Phần tử chọn | Tổng |
|------|----------|--------------|------|
| 0 | 000 | $\{\}$ | $0$ |
| 1 | 001 | $\{2\}$ | $2$ |
| 2 | 010 | $\{3\}$ | $3$ |
| 3 | 011 | $\{2, 3\}$ | $5$ |
| 4 | 100 | $\{5\}$ | $5$ |
| 5 | 101 | $\{2, 5\}$ | $7$ |
| 6 | 110 | $\{3, 5\}$ | $8$ |
| 7 | 111 | $\{2, 3, 5\}$ | $10$ |

$\text{sumL} = [0, 2, 3, 5, 5, 7, 8, 10]$

**Bước 3 — Sinh tổng tập con nửa phải** ($2^3 = 8$ tập):

| Mask | Nhị phân | Phần tử chọn | Tổng |
|------|----------|--------------|------|
| 0 | 000 | $\{\}$ | $0$ |
| 1 | 001 | $\{8\}$ | $8$ |
| 2 | 010 | $\{13\}$ | $13$ |
| 3 | 011 | $\{8, 13\}$ | $21$ |
| 4 | 100 | $\{21\}$ | $21$ |
| 5 | 101 | $\{8, 21\}$ | $29$ |
| 6 | 110 | $\{13, 21\}$ | $34$ |
| 7 | 111 | $\{8, 13, 21\}$ | $42$ |

$\text{sumR} = [0, 8, 13, 21, 21, 29, 34, 42]$

**Sắp xếp sumR:** $[0, 8, 13, 21, 21, 29, 34, 42]$

**Bước 4 — Ghép đôi:** Với mỗi $s \in \text{sumL}$, tìm số phần tử bằng $X - s = 26 - s$ trong `sumR`.

| $s$ (sumL) | Cần tìm $(26 - s)$ | Số lần xuất hiện trong sumR | Các tập con hợp lệ |
|------------|--------------------|-----------------------------|---------------------|
| $0$ | $26$ | $0$ | — |
| $2$ | $24$ | $0$ | — |
| $3$ | $23$ | $0$ | — |
| $5$ | $21$ | $2$ | $\{2, 3\} + \{8, 13\}$, $\{5\} + \{8, 13\}$, $\{2, 3\} + \{21\}$, $\{5\} + \{21\}$ |
| $7$ | $19$ | $0$ | — |
| $8$ | $18$ | $0$ | — |
| $10$ | $16$ | $0$ | — |

Kết quả: **4 tập con** có tổng bằng 26.

---

## 3. Phân tích tính đúng đắn

### Tại sao mọi tập con đều được xét?

Mọi tập con $S \subseteq A$ đều được phân thành đúng 2 phần:

$$S = (S \cap L) \cup (S \cap R)$$

Trong đó $S \cap L$ là phần tử của $S$ thuộc nửa trái, $S \cap R$ là phần tử thuộc nửa phải.

- **Bước 2** sinh ra **tất cả** $2^{n_1}$ tập con của $L$ $\Rightarrow$ $S \cap L$ chắc chắn xuất hiện trong `sumL`.
- **Bước 3** sinh ra **tất cả** $2^{n_2}$ tập con của $R$ $\Rightarrow$ $S \cap R$ chắc chắn xuất hiện trong `sumR`.
- **Bước 4** ghép mọi cặp $(s_L, s_R)$ sao cho $s_L + s_R = X$ $\Rightarrow$ tập con $S$ với $\text{sum}(S) = X$ được đếm đúng.

### Tại sao không đếm trùng?

Nếu dùng **sắp xếp + binary search** (đếm số lần xuất hiện), mỗi tập con $S$ được đếm đúng 1 lần vì mỗi cặp $(S \cap L, S \cap R)$ là duy nhất.

---

## 4. Đánh giá độ phức tạp

| Bước | Độ phức tạp thời gian | Độ phức tạp không gian |
|------|----------------------|------------------------|
| Sinh tổng nửa trái | $O(2^{N/2})$ | $O(2^{N/2})$ |
| Sinh tổng nửa phải | $O(2^{N/2})$ | $O(2^{N/2})$ |
| Sắp xếp sumR | $O(2^{N/2} \cdot N)$ | $O(2^{N/2})$ |
| Ghép đôi (binary search) | $O(2^{N/2} \cdot N)$ | $O(1)$ |
| **Tổng** | $O(2^{N/2} \cdot N)$ | $O(2^{N/2})$ |

So sánh với cách duyệt thường $O(2^N)$:

| $N$ | $2^N$ | $2^{N/2} \cdot N$ | Cải thiện |
|-----|-------|-------------------|------------|
| 20 | $10^6$ | $10^7$ | Tương đương |
| 30 | $10^9$ | $3 \times 10^6$ | $\sim 300\times$ |
| 40 | $10^{12}$ | $4 \times 10^7$ | $\sim 25000\times$ |

---

## Code minh họa

### Bài toán: Đếm tập con có tổng bằng $X$

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    int main() {
        int n;
        long long x;
        cin >> n >> x;

        vector<long long> a(n);
        for (int i = 0; i < n; i++) cin >> a[i];

        int n1 = n / 2, n2 = n - n1;

        // Bước 1: Sinh tổng tập con nửa trái
        vector<long long> sumL;
        for (int mask = 0; mask < (1 << n1); mask++) {
            long long s = 0;
            for (int i = 0; i < n1; i++) {
                if (mask & (1 << i)) s += a[i];
            }
            sumL.push_back(s);
        }

        // Bước 2: Sinh tổng tập con nửa phải
        vector<long long> sumR;
        for (int mask = 0; mask < (1 << n2); mask++) {
            long long s = 0;
            for (int i = 0; i < n2; i++) {
                if (mask & (1 << i)) s += a[n1 + i];
            }
            sumR.push_back(s);
        }

        // Bước 3: Sắp xếp sumR
        sort(sumR.begin(), sumR.end());

        // Bước 4: Đếm
        long long ans = 0;
        for (long long s : sumL) {
            long long need = x - s;
            auto lo = lower_bound(sumR.begin(), sumR.end(), need);
            auto hi = upper_bound(sumR.begin(), sumR.end(), need);
            ans += hi - lo;
        }

        cout << ans << endl;
        return 0;
    }
    ```

=== "Python"

    ```python
    from bisect import bisect_left, bisect_right

    n, x = map(int, input().split())
    a = list(map(int, input().split()))

    n1 = n // 2
    n2 = n - n1

    # Bước 1: Sinh tổng tập con nửa trái
    sumL = []
    for mask in range(1 << n1):
        s = 0
        for i in range(n1):
            if mask & (1 << i):
                s += a[i]
        sumL.append(s)

    # Bước 2: Sinh tổng tập con nửa phải
    sumR = []
    for mask in range(1 << n2):
        s = 0
        for i in range(n2):
            if mask & (1 << i):
                s += a[n1 + i]
        sumR.append(s)

    # Bước 3: Sắp xếp sumR
    sumR.sort()

    # Bước 4: Đếm
    ans = 0
    for s in sumL:
        need = x - s
        lo = bisect_left(sumR, need)
        hi = bisect_right(sumR, need)
        ans += hi - lo

    print(ans)
    ```

### Ứng dụng: Bài toán phân công $N$ người $N$ việc (Bitmask Meet in the Middle)

Bài toán: Cho ma trận chi phí $C[N][N]$. Giao mỗi người 1 việc sao cho tổng chi phí nhỏ nhất.

**Cách thường:** Bitmask DP $O(2^N \cdot N)$ — chỉ chạy được $N \le 20$.

**Meet in the Middle:** Chia $N$ người thành 2 nhóm, mỗi nhóm $N/2$ người. Duyệt bitmask từng nhóm rồi ghép $\Rightarrow O(2^{N/2} \cdot N)$ — chạy được $N \le 40$.

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    int main() {
        int n;
        cin >> n;
        int n1 = n / 2, n2 = n - n1;

        vector<vector<int>> c(n, vector<int>(n));
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                cin >> c[i][j];

        // Bước 1: Với nửa trái, dpL[mask] = chi phí nhỏ nhất
        // khi giao việc cho các người trong mask (mask bit 1 = người đã được giao)
        int szL = 1 << n1;
        vector<int> dpL(szL, INT_MAX);
        dpL[0] = 0;
        for (int mask = 0; mask < szL; mask++) {
            int cnt = __builtin_popcount(mask); // số người đã giao
            for (int j = 0; j < n1; j++) {
                if (!(mask & (1 << j))) {
                    int nmask = mask | (1 << j);
                    dpL[nmask] = min(dpL[nmask], dpL[mask] + c[j][cnt]);
                }
            }
        }

        // Bước 2: Tương tự cho nửa phải
        int szR = 1 << n2;
        vector<int> dpR(szR, INT_MAX);
        dpR[0] = 0;
        for (int mask = 0; mask < szR; mask++) {
            int cnt = __builtin_popcount(mask);
            for (int j = 0; j < n2; j++) {
                if (!(mask & (1 << j))) {
                    int nmask = mask | (1 << j);
                    dpR[nmask] = min(dpR[nmask], dpR[mask] + c[n1 + j][n1 + cnt]);
                }
            }
        }

        // Bước 3: Ghép — dpL[mask] + dpR[full ^ mask]
        int full = (1 << n2) - 1;
        int ans = INT_MAX;
        for (int mask = 0; mask < szL; mask++) {
            if (dpL[mask] < INT_MAX) {
                ans = min(ans, dpL[mask] + dpR[full]);
            }
        }

        cout << ans << endl;
        return 0;
    }
    ```

=== "Python"

    ```python
    import sys
    input = sys.stdin.readline

    n = int(input())
    n1 = n // 2
    n2 = n - n1
    c = [list(map(int, input().split())) for _ in range(n)]

    # Bước 1: Nửa trái
    szL = 1 << n1
    dpL = [float('inf')] * szL
    dpL[0] = 0
    for mask in range(szL):
        cnt = bin(mask).count('1')
        for j in range(n1):
            if not (mask & (1 << j)):
                nmask = mask | (1 << j)
                dpL[nmask] = min(dpL[nmask], dpL[mask] + c[j][cnt])

    # Bước 2: Nửa phải
    szR = 1 << n2
    dpR = [float('inf')] * szR
    dpR[0] = 0
    for mask in range(szR):
        cnt = bin(mask).count('1')
        for j in range(n2):
            if not (mask & (1 << j)):
                nmask = mask | (1 << j)
                dpR[nmask] = min(dpR[nmask], dpR[mask] + c[n1 + j][n1 + cnt])

    # Bước 3: Ghép
    ans = min(dpL[mask] + dpR[(1 << n2) - 1] for mask in range(szL) if dpL[mask] < float('inf'))

    print(ans)
    ```
