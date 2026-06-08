# Local Search - Tìm Kiếm Cục Bộ

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** CP-Algorithms - Local Search

---

## 1. Bản chất vấn đề

### Ý tưởng

Bắt đầu từ 1 nghiệm bất kỳ. Lặp lại: di chuyển đến nghiệm "láng giềng" tốt hơn cho đến khi không cải thiện được.

### Ứng dụng

| Bài toán | Local Search |
|----------|-------------|
| TSP xấp xỉ | Hill Climbing, Simulated Annealing |
| Max-Cut | Kernighan-Lin |
| SAT | WalkSAT |
| Tối ưu hàm | Gradient Descent |

---

## 2. Tư duy cốt lõi

### Hill Climbing

```text
current = nghiệm bất kỳ
repeat:
    neighbor = nghiệm láng giềng tốt nhất của current
    if neighbor tốt hơn current:
        current = neighbor
    else:
        dừng
return current
```

### Simulated Annealing

Giống Hill Climbing nhưng **có xác suất** chấp nghiệm tệ hơn (để thoát local optimum).

$$P(\text{accept}) = e^{\frac{\text{score}_{\text{current}} - \text{score}_{\text{neighbor}}}{T}}$$

$T$ (nhiệt độ) giảm dần theo thời gian.

### Trace: TSP bằng Hill Climbing

4 thành phố, khoảng cách:

| | A | B | C | D |
|---|---|---|---|---|
| A | 0 | 10 | 15 | 20 |
| B | 10 | 0 | 35 | 25 |
| C | 15 | 35 | 0 | 30 |
| D | 20 | 25 | 30 | 0 |

**Nghiệm ban đầu:** $A \to B \to C \to D \to A$, tổng = $10 + 35 + 30 + 20 = 95$

**Láng giềng (đổi 2 đỉnh):**

| Đổi | Nghiệm mới | Tổng | Cải thiện? |
|-----|-----------|------|------------|
| $(B,C)$ | $A \to C \to B \to D \to A$ | $15 + 35 + 25 + 20 = 95$ | Không |
| $(B,D)$ | $A \to D \to C \to B \to A$ | $20 + 30 + 35 + 10 = 95$ | Không |
| $(C,D)$ | $A \to B \to D \to C \to A$ | $10 + 25 + 30 + 15 = 80$ | **Có!** |

**Nghiệm mới:** $A \to B \to D \to C \to A$, tổng = 80.

Tiếp tục lặp cho đến khi không cải thiện.

---

## 3. Đánh giá độ phức tạp

| Thuật toán | Thời gian | Chất lượng |
|------------|-----------|------------|
| Hill Climbing | $O(\text{iterations} \times N)$ | Local optimum |
| Simulated Annealing | $O(\text{iterations} \times N)$ | Gần global optimum |
| Kernighan-Lin | $O(N^2 \log N)$ | Cải thiện 2-opt |

---

## Code minh họa

### Simulated Annealing cho TSP

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    int main() {
        int n;
        cin >> n;

        vector<vector<int>> dist(n, vector<int>(n));
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                cin >> dist[i][j];

        // Nghiệm ban đầu
        vector<int> tour(n);
        iota(tour.begin(), tour.end(), 0);

        auto calc = [&](vector<int>& t) {
            int s = 0;
            for (int i = 0; i < n; i++)
                s += dist[t[i]][t[(i + 1) % n]];
            return s;
        };

        int best = calc(tour);
        mt19937 rng(42);
        double T = 1000.0;

        for (int iter = 0; iter < 100000; iter++) {
            int i = rng() % n, j = rng() % n;
            if (i == j) continue;

            swap(tour[i], tour[j]);
            int cur = calc(tour);

            if (cur < best || exp((best - cur) / T) > (double)rng() / rng.max()) {
                best = cur;
            } else {
                swap(tour[i], tour[j]); // hoàn tác
            }

            T *= 0.9999; // giảm nhiệt
        }

        cout << best << "\n";
        return 0;
    }
    ```

=== "Python"

    ```python
    import random
    import math

    n = int(input())
    dist = [list(map(int, input().split())) for _ in range(n)]

    tour = list(range(n))

    def calc(t):
        return sum(dist[t[i]][t[(i + 1) % n]] for i in range(n))

    best = calc(tour)
    T = 1000.0
    random.seed(42)

    for _ in range(100000):
        i, j = random.randint(0, n - 1), random.randint(0, n - 1)
        if i == j:
            continue
        tour[i], tour[j] = tour[j], tour[i]
        cur = calc(tour)

        if cur < best or math.exp((best - cur) / T) > random.random():
            best = cur
        else:
            tour[i], tour[j] = tour[j], tour[i]

        T *= 0.9999

    print(best)
    ```
