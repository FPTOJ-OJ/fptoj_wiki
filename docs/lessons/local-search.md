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

## 4. Khi nào dùng — Khi nào không nên

### Khi nào nên dùng Local Search

| Tình huống | Giải thích |
|------------|------------|
| Không gian nghiệm quá lớn để duyệt toàn bộ | $N!$, $2^N$ quá lớn → cần xấp xỉ |
| Cấu trúc láng giềng tự nhiên | TSP: đổi 2 đỉnh, N-Queens: đổi vị trí 1 hậu |
| Cần kết quả nhanh, không cần tối ưu tuyệt đối | Bài toán thực tế thường chấp nhận sai số nhỏ |
| Hàm mục tiêu liên tục / mượt | Gradient Descent hoạt động tốt |

### Khi nào không nên

| Tình huống | Giải thích |
|------------|------------|
| Bài toán yêu cầu kết quả chính xác tuyệt đối | Local search chỉ cho xấp xỉ |
| Không gian nghiệm có quá nhiều cực tiểu cục bộ | Hill Climbing sẽ kẹt |
| Hàm mục tiêu "phẳng" (plateau) | Không có hướng cải thiện rõ ràng |
| Cần chứng minh tính tối ưu | Không thể chứng minh local optimum = global |

---

## 5. Chọn tham số cho Simulated Annealing

Đây là phần **quan trọng nhất** để SA hoạt động hiệu quả.

### Nhiệt độ

| Tham số | Ý nghĩa | Gợi ý |
|---------|---------|-------|
| $T_{\text{init}}$ | Nhiệt độ bắt đầu | Đủ lớn để xác suất chấp nhận nghiệm tệ ban đầu ~ $0.5$–$0.8$ |
| $T_{\text{final}}$ | Nhiệt độ kết thúc | Đủ nhỏ để không chấp nhận nghiệm tệ nữa |
| Hệ số giảm ($\alpha$) | Tốc độ nguội | $0.995$–$0.99999$, càng gần 1 càng chậm |

### Công thức giảm nhiệt phổ biến

- **Giảm nhân:** $T \leftarrow T \times \alpha$ (đơn giản, phổ biến nhất)
- **Giảm tuyến tính:** $T \leftarrow T - \Delta T$
- **Giảm log:** $T \leftarrow T_{\text{init}} / \log(k + 2)$

### Chọn số vòng lặp

Số vòng lặp = $-\frac{\log(T_{\text{final}} / T_{\text{init}})}{\log(\alpha)}$

| $T_{\text{init}}$ | $\alpha$ | $T_{\text{final}}$ | Số vòng lặp |
|---|---|---|---|
| 1000 | 0.999 | 0.001 | ~6900 |
| 1000 | 0.9999 | 0.001 | ~69000 |
| 10000 | 0.99999 | 0.001 | ~161000 |

**Mẹo thực tế:** Điều chỉnh $\alpha$ để tổng số vòng lặp vừa khớp giới hạn thời gian (~$10^5$–$10^6$).

### Hàm xác suất chấp nhận

$$P(\text{accept}) = e^{\frac{-\Delta E}{T}} \quad \text{với } \Delta E = \text{score}_{\text{neighbor}} - \text{score}_{\text{current}}$$

- Khi $T$ lớn: $P \approx 1$ → chấp nhận gần như mọi nghiệm (khám phá)
- Khi $T$ nhỏ: $P \approx 0$ → chỉ chấp nhận nghiệm tốt hơn (leo đồi)

### Bẫy thường gặp

1. **$T_{\text{init}}$ quá nhỏ**: Thuật toán hoạt động như Hill Climbing thông thường, dễ kẹt local optimum.
2. **$T_{\text{final}}$ quá lớn**: Kết thúc quá sớm, chưa hội tụ về kết quả tốt.
3. **$\alpha$ quá nhỏ** (vd: $0.9$): Nhiệt giảm quá nhanh, không đủ thời gian khám phá.
4. **Hàm sinh láng giềng kém**: Láng giềng quá xa → xác suất chấp nhận thấp; quá gần → mất thời gian.
5. **Không lưu nghiệm tốt nhất toàn cục**: Luôn giữ `best` riêng, vì SA có thể chấp nhận nghiệm tệ và đánh mất global optimum.

---

## Code minh họa

### Hill Climbing — Leo đồi cho TSP

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    int main() {
        int n;
        cin >> n;

        // Nhập ma trận khoảng cách giữa các thành phố
        vector<vector<int>> dist(n, vector<int>(n));
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                cin >> dist[i][j];

        // Khởi tạo nghiệm ban đầu — thứ tự thăm thành phố 0, 1, ..., n-1
        vector<int> tour(n);
        iota(tour.begin(), tour.end(), 0);

        // Hàm tính tổng khoảng cách của hành trình tour
        auto calc = [&](vector<int>& t) {
            int s = 0;
            for (int i = 0; i < n; i++)
                s += dist[t[i]][t[(i + 1) % n]];  // khoảng cách từ i đến (i+1)%n
            return s;
        };

        int best = calc(tour);

        // Lặp cho đến khi không còn cải thiện được nữa
        bool improved = true;
        while (improved) {
            improved = false;
            // Thử mọi cặp hoán đổi (i, j)
            for (int i = 0; i < n && !improved; i++) {
                for (int j = i + 1; j < n; j++) {
                    swap(tour[i], tour[j]);         // thử đổi 2 thành phố
                    int cur = calc(tour);            // tính lại tổng
                    if (cur < best) {                // nếu tốt hơn
                        best = cur;                  // cập nhật kỷ lục
                        improved = true;             // đánh dấu có cải thiện
                        break;                       // chấp nhận ngay, lặp lại từ đầu
                    } else {
                        swap(tour[i], tour[j]);      // hoàn tác nếu không tốt hơn
                    }
                }
            }
        }

        cout << best << "\n";
        return 0;
    }
    ```

=== "Python"

    ```python
    import sys
    input = sys.stdin.readline

    n = int(input())
    # Nhập ma trận khoảng cách giữa các thành phố
    dist = [list(map(int, input().split())) for _ in range(n)]

    # Khởi tạo nghiệm ban đầu — thứ tự thăm thành phố 0, 1, ..., n-1
    tour = list(range(n))

    # Hàm tính tổng khoảng cách của hành trình
    def calc(t):
        return sum(dist[t[i]][t[(i + 1) % n]] for i in range(n))

    best = calc(tour)

    # Lặp cho đến khi không còn cải thiện được nữa
    improved = True
    while improved:
        improved = False
        # Thử mọi cặp hoán đổi (i, j)
        for i in range(n):
            for j in range(i + 1, n):
                tour[i], tour[j] = tour[j], tour[i]  # thử đổi 2 thành phố
                cur = calc(tour)                       # tính lại tổng
                if cur < best:                         # nếu tốt hơn
                    best = cur                         # cập nhật kỷ lục
                    improved = True                    # đánh dấu có cải thiện
                    break                              # chấp nhận ngay
                else:
                    tour[i], tour[j] = tour[j], tour[i]  # hoàn tác nếu không tốt hơn
            if improved:
                break                                  # thoát vòng ngoài, lặp lại từ đầu

    print(best)
    ```

### Simulated Annealing cho TSP

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    int main() {
        int n;
        cin >> n;

        // Nhập ma trận khoảng cách giữa các thành phố
        vector<vector<int>> dist(n, vector<int>(n));
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                cin >> dist[i][j];

        // Khởi tạo nghiệm ban đầu
        vector<int> tour(n);
        iota(tour.begin(), tour.end(), 0);

        // Hàm tính tổng khoảng cách của hành trình tour
        auto calc = [&](vector<int>& t) {
            int s = 0;
            for (int i = 0; i < n; i++)
                s += dist[t[i]][t[(i + 1) % n]];  // khoảng cách từ i đến (i+1)%n
            return s;
        };

        int best = calc(tour);
        mt19937 rng(42);       // sinh số ngẫu nhiên, seed cố định để tái hiện
        double T = 1000.0;     // nhiệt độ ban đầu

        for (int iter = 0; iter < 100000; iter++) {
            // Sinh láng giềng: đổi chỗ ngẫu nhiên 2 thành phố
            int i = rng() % n, j = rng() % n;
            if (i == j) continue;  // bỏ qua nếu trùng chỉ số

            swap(tour[i], tour[j]);    // thử đổi 2 thành phố
            int cur = calc(tour);      // tính chi phí mới

            // Chấp nhận nếu tốt hơn, hoặc với xác suất e^(-delta/T)
            if (cur < best || exp((best - cur) / T) > (double)rng() / rng.max()) {
                best = cur;            // cập nhật kỷ lục
            } else {
                swap(tour[i], tour[j]); // hoàn tác vì không chấp nhận
            }

            T *= 0.9999; // giảm nhiệt độ — càng nguội càng ít chấp nhận nghiệm tệ
        }

        // In ra nghiệm tốt nhất toàn cục (lưu riêng, không phụ thuộc SA)
        cout << best << "\n";
        return 0;
    }
    ```

=== "Python"

    ```python
    import random
    import math

    n = int(input())
    # Nhập ma trận khoảng cách giữa các thành phố
    dist = [list(map(int, input().split())) for _ in range(n)]

    # Khởi tạo nghiệm ban đầu
    tour = list(range(n))

    # Hàm tính tổng khoảng cách của hành trình
    def calc(t):
        return sum(dist[t[i]][t[(i + 1) % n]] for i in range(n))

    best = calc(tour)
    T = 1000.0         # nhiệt độ ban đầu
    random.seed(42)    # seed cố định để tái hiện

    for _ in range(100000):
        # Sinh láng giềng: đổi chỗ ngẫu nhiên 2 thành phố
        i, j = random.randint(0, n - 1), random.randint(0, n - 1)
        if i == j:
            continue   # bỏ qua nếu trùng chỉ số

        tour[i], tour[j] = tour[j], tour[i]  # thử đổi 2 thành phố
        cur = calc(tour)                      # tính chi phí mới

        # Chấp nhận nếu tốt hơn, hoặc với xác suất e^(-delta/T)
        if cur < best or math.exp((best - cur) / T) > random.random():
            best = cur                        # cập nhật kỷ lục
        else:
            tour[i], tour[j] = tour[j], tour[i]  # hoàn tác vì không chấp nhận

        T *= 0.9999  # giảm nhiệt độ — càng nguội càng ít chấp nhận nghiệm tệ

    # In ra nghiệm tốt nhất toàn cục (lưu riêng, không phụ thuộc SA)
    print(best)
    ```

## Bài tập luyện tập

| Mã bài | Tên bài tập | Độ khó | Kiểu bài tập (Bản chất) | Bài học lý thuyết |
| :--- | :--- | :---: | :--- | :--- |
| `ls-find-peak` | [Tìm đỉnh](https://fptoj.com/problem/ls-find-peak) | ⭐ | Local Search - Tìm đỉnh cơ bản | [Local Search](local-search.md) |
| `ls-hill-1d` | [Leo đồi 1D](https://fptoj.com/problem/ls-hill-1d) | ⭐⭐ | Local Search - Leo đồi 1D | [Local Search](local-search.md) |
| `ls-hill-2d` | [Leo đồi 2D](https://fptoj.com/problem/ls-hill-2d) | ⭐⭐ | Local Search - Leo đồi 2D | [Local Search](local-search.md) |
| `ls-tsp` | [Người du lịch](https://fptoj.com/problem/ls-tsp) | ⭐⭐⭐ | Local Search - TSP Simulated Annealing | [Local Search](local-search.md) |
| `ls-nqueen` | [N-Hậu](https://fptoj.com/problem/ls-nqueen) | ⭐⭐⭐ | Local Search - N Queens | [Local Search](local-search.md) |
| `ls-sudoku` | [Sudoku](https://fptoj.com/problem/ls-sudoku) | ⭐⭐⭐ | Local Search - Giải Sudoku | [Local Search](local-search.md) |
| `ls-schedule` | [Xếp lịch](https://fptoj.com/problem/ls-schedule) | ⭐⭐⭐⭐ | Local Search - Xếp lịch | [Local Search](local-search.md) |
| `ls-coloring` | [Tô màu](https://fptoj.com/problem/ls-coloring) | ⭐⭐⭐⭐ | Local Search - Tô màu đồ thị | [Local Search](local-search.md) |
| `ls-knapsack` | [Ba lô](https://fptoj.com/problem/ls-knapsack) | ⭐⭐⭐⭐ | Local Search - Knapsack SA | [Local Search](local-search.md) |
