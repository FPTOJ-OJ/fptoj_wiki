# Bài 28: Bao Lồi (Convex Hull)

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** VNOI Wiki - Bao lồi, CP-Algorithms

---

## Bản chất vấn đề

### Bao lồi là gì?

Cho $N$ điểm trong mặt phẳng. **Bao lồi** (Convex Hull) là đa giác lồi nhỏ nhất chứa tất cả $N$ điểm — mọi điểm đều nằm trong hoặc trên biên của đa giác này.

Ẩn dụ đơn giản: bạn có $N$ viên kẹo rải trên bàn, lấy một sợi dây thun bọc quanh tất cả. Sợi dây sẽ tự "tì" vào những viên kẹo ở ngoài cùng. Đường dây tạo thành chính là bao lồi.

<p align="center"><img src="/uploads/img/convex-hull.svg" alt="Convex Hull" style="max-width: 700px;" /><br><em>Hình minh họa bao lồi bao quanh một tập điểm</em></p>

```matplotlib
np.random.seed(42)
pts = np.array([[2,1],[3,3],[5,5],[7,2],[8,4],[1,4],[4,0],[6,6],[9,1],[0,3],
                [3.5,2.5],[6,1],[5,3],[2,5],[8,6],[1,2],[7,5],[4,4],[9,3],[0,0]])

def cross(O, A, B):
    return (A[0]-O[0])*(B[1]-O[1]) - (A[1]-O[1])*(B[0]-O[0])

sorted_pts = sorted(map(tuple, pts))
lower = []
for p in sorted_pts:
    while len(lower) >= 2 and cross(lower[-2], lower[-1], p) <= 0:
        lower.pop()
    lower.append(p)
upper = []
for p in reversed(sorted_pts):
    while len(upper) >= 2 and cross(upper[-2], upper[-1], p) <= 0:
        upper.pop()
    upper.append(p)
lower_hull = np.array(lower)
upper_hull = np.array(upper)

fig, ax = plt.subplots(figsize=(8, 6))
ax.scatter(pts[:,0], pts[:,1], s=50, color='#6c757d', zorder=5)
for i, (x, y) in enumerate(pts):
    ax.annotate(f'P{i}', (x, y), textcoords='offset points', xytext=(5, 5), fontsize=7, color='#adb5bd')

ax.plot(lower_hull[:,0], lower_hull[:,1], 'o-', color='#2196F3', linewidth=2.5,
        markersize=8, label='Nửa dưới (Lower hull)', zorder=4)
ax.plot(upper_hull[:,0], upper_hull[:,1], 'o-', color='#f44336', linewidth=2.5,
        markersize=8, label='Nửa trên (Upper hull)', zorder=4)

hull_all = np.array(lower[:-1] + upper[:-1] + [lower[0]])
ax.fill(hull_all[:,0], hull_all[:,1], alpha=0.1, color='#4CAF50')
ax.plot(hull_all[:,0], hull_all[:,1], '--', color='#4CAF50', linewidth=1.5, alpha=0.6, label='Bao lồi hoàn chỉnh')

ax.set_xlabel('x'); ax.set_ylabel('y')
ax.set_title("Bao lồi - Andrew's Monotone Chain")
ax.legend(loc='upper left', fontsize=9)
ax.grid(True, alpha=0.3)
ax.set_aspect('equal')
plt.tight_layout()
```

### Tính chất của đa giác lồi

Một đa giác **lồi** (convex) có tính chất: với mọi cặp điểm $A$, $B$ nằm trong đa giác, đoạn thẳng $AB$ hoàn toàn nằm trong đa giác. Đa giác không có phần nào "lõm" vào trong.

Ngược lại, đa giác **không lồi** (concave) có ít nhất một chỗ lõm — nếu nối 2 điểm trong vùng lõm, đoạn thẳng sẽ đi ra ngoài.

### Các tính chất quan trọng

- Bao lồi là **duy nhất** cho một tập điểm
- Bao lồi là đa giác lồi — mọi góc trong đều $\leq 180°$
- Các đỉnh của bao lồi là tập con của các điểm ban đầu
- Nếu chỉ có 1 hoặc 2 điểm, bao lồi là chính các điểm đó
- Số đỉnh bao lồi $\leq N$

---

## Tư duy cốt lõi

### Công cụ nền tảng: Tích có hướng (Cross Product)

Trước khi vào thuật toán, bạn **phải** hiểu tích có hướng. Đây là phép toán nền tảng cho mọi bài toán hình học tính toán.

**Định nghĩa.** Cho 3 điểm $O$, $A$, $B$:

$$\text{cross}(O, A, B) = (A_x - O_x)(B_y - O_y) - (A_y - O_y)(B_x - O_x)$$

**Ý nghĩa hình học:**

- $\text{cross}(O, A, B) > 0$: quay trái (counter-clockwise)
- $\text{cross}(O, A, B) = 0$: $O$, $A$, $B$ thẳng hàng (collinear)
- $\text{cross}(O, A, B) < 0$: quay phải (clockwise)

Ẩn dụ: imagine bạn đang lái xe từ $O$ đến $A$, rồi muốn rẽ đến $B$. cross $> 0$ là quẹo trái, cross $= 0$ là đi thẳng, cross $< 0$ là quẹo phải.

**Tại sao tích có hướng hoạt động?**

Tích có hướng thực chất là tích có hướng (cross product) của 2 vector $\vec{OA}$ và $\vec{OB}$ trong không gian 2D:

$$\vec{OA} \times \vec{OB} = |\vec{OA}| \cdot |\vec{OB}| \cdot \sin\theta$$

với $\theta$ là góc từ $\vec{OA}$ đến $\vec{OB}$. Khi $\theta \in (0°, 180°)$ thì $\sin\theta > 0$ (quay trái). Khi $\theta \in (180°, 360°)$ thì $\sin\theta < 0$ (quay phải).

**Cài đặt:**

=== "C++"

    ```cpp
    struct Point {
        long long x, y;
        bool operator<(const Point& other) const {
            return x < other.x || (x == other.x && y < other.y);
        }
    };

    long long cross(const Point& O, const Point& A, const Point& B) {
        return (A.x - O.x) * (B.y - O.y) - (A.y - O.y) * (B.x - O.x);
    }
    ```

=== "Python"

    ```python
    def cross(O, A, B):
        return (A[0] - O[0]) * (B[1] - O[1]) - (A[1] - O[1]) * (B[0] - O[0])
    ```

### Andrew's Monotone Chain (Khuyến nghị)

Andrew's Monotone Chain là thuật toán xây dựng bao lồi **đơn giản nhất**, **dễ code nhất**, và **ít lỗi nhất**. Nếu bạn chỉ cần học 1 thuật toán bao lồi — hãy học cái này.

**Ý tưởng:**

1. Sắp xếp tất cả điểm theo tọa độ ($x$ tăng dần, nếu $x$ bằng nhau thì $y$ tăng dần)
2. Xây **nửa dưới** (lower hull): duyệt từ trái sang phải, giữ chỉ các điểm tạo quay trái
3. Xây **nửa trên** (upper hull): duyệt từ phải sang trái, giữ chỉ các điểm tạo quay trái
4. Ghép 2 nửa lại thành bao lồi hoàn chỉnh

Tưởng tượng bạn đang "quấn dây" quanh các điểm. Bắt đầu từ điểm trái nhất, quấn xuống dưới (lower hull), rồi quấn ngược lên trên (upper hull). Tại mỗi bước, nếu dây không quay trái mà quay phải hoặc thẳng hàng, nghĩa là điểm đó nằm "bên trong" — bỏ nó đi.

Phép kiểm tra $\text{cross} \leq 0$ nghĩa là: nếu điểm mới tạo hướng quay phải hoặc thẳng hàng so với 2 điểm cuối stack, thì điểm cuối stack **không phải** đỉnh bao lồi, loại bỏ.

**Cài đặt:**

=== "C++"

    ```cpp
    vector<Point> convexHull(vector<Point>& points) {
        int n = points.size();
        if (n <= 1) return points;

        sort(points.begin(), points.end());
        vector<Point> hull;

        // Xây nửa dưới (lower hull)
        for (int i = 0; i < n; i++) {
            while (hull.size() >= 2 &&
                   cross(hull[hull.size()-2], hull[hull.size()-1], points[i]) <= 0)
                hull.pop_back();
            hull.push_back(points[i]);
        }

        // Xây nửa trên (upper hull)
        int lowerSize = hull.size();
        for (int i = n - 2; i >= 0; i--) {
            while (hull.size() > lowerSize &&
                   cross(hull[hull.size()-2], hull[hull.size()-1], points[i]) <= 0)
                hull.pop_back();
            hull.push_back(points[i]);
        }

        hull.pop_back(); // Điểm đầu bị trùng
        return hull;
    }
    ```

=== "Python"

    ```python
    def convex_hull(points):
        points = sorted(points)
        if len(points) <= 1:
            return points

        # Nửa dưới
        lower = []
        for p in points:
            while len(lower) >= 2 and cross(lower[-2], lower[-1], p) <= 0:
                lower.pop()
            lower.append(p)

        # Nửa trên
        upper = []
        for p in reversed(points):
            while len(upper) >= 2 and cross(upper[-2], upper[-1], p) <= 0:
                upper.pop()
            upper.append(p)

        return lower[:-1] + upper[:-1]
    ```

### Graham Scan (Nâng cao)

Graham Scan là thuật toán bao lồi cổ điển, hoạt động khác với Monotone Chain:

1. Chọn điểm **gốc** (pivot): điểm có $y$ nhỏ nhất (nếu bằng nhau, $x$ nhỏ nhất)
2. Sắp xếp các điểm còn lại theo **góc** so với pivot (dùng $\text{atan2}$)
3. Duyệt từ pivot, giữ lại chỉ các điểm tạo quay trái

Khi đã sắp xếp theo góc, các điểm được "quét" theo thứ tự vòng quanh pivot. Nếu 3 điểm liên tiếp tạo quay phải, điểm giữa nằm "bên trong" — loại bỏ nó.

**Cài đặt:**

=== "C++"

    ```cpp
    vector<Point> grahamScan(vector<Point>& points) {
        int n = points.size();
        if (n <= 2) return points;

        // Tìm pivot (điểm có y nhỏ nhất, nếu bằng thì x nhỏ nhất)
        int pivotIdx = 0;
        for (int i = 1; i < n; i++) {
            if (points[i].y < points[pivotIdx].y ||
                (points[i].y == points[pivotIdx].y && points[i].x < points[pivotIdx].x))
                pivotIdx = i;
        }
        swap(points[0], points[pivotIdx]);
        Point pivot = points[0];

        // Sắp xếp theo góc so với pivot
        sort(points.begin() + 1, points.end(), [&](const Point& a, const Point& b) {
            long long c = cross(pivot, a, b);
            if (c != 0) return c > 0;
            long long d1 = (a.x - pivot.x) * (a.x - pivot.x) + (a.y - pivot.y) * (a.y - pivot.y);
            long long d2 = (b.x - pivot.x) * (b.x - pivot.x) + (b.y - pivot.y) * (b.y - pivot.y);
            return d1 < d2;
        });

        vector<Point> hull;
        for (int i = 0; i < n; i++) {
            while (hull.size() >= 2 &&
                   cross(hull[hull.size()-2], hull[hull.size()-1], points[i]) <= 0)
                hull.pop_back();
            hull.push_back(points[i]);
        }
        return hull;
    }
    ```

=== "Python"

    ```python
    import math

    def graham_scan(points):
        n = len(points)
        if n <= 2:
            return points[:]

        # Tìm pivot
        pivot_idx = min(range(n), key=lambda i: (points[i][1], points[i][0]))
        points[0], points[pivot_idx] = points[pivot_idx], points[0]
        pivot = points[0]

        # Sắp xếp theo góc so với pivot
        def angle_and_dist(p):
            dx, dy = p[0] - pivot[0], p[1] - pivot[1]
            return (math.atan2(dy, dx), dx*dx + dy*dy)

        points[1:] = sorted(points[1:], key=angle_and_dist)

        hull = []
        for p in points:
            while len(hull) >= 2 and cross(hull[-2], hull[-1], p) <= 0:
                hull.pop()
            hull.append(p)
        return hull
    ```

---

## Phân tích tính đúng đắn

### Andrew's Monotone Chain

**Bảo toàn tính lồi:** Khi duyệt qua các điểm theo thứ tự $x$ tăng dần, tại mỗi bước ta duy trì invariant: các điểm trong stack luôn tạo thành một chuỗi lồi (mọi hướng rẽ đều là quay trái). Khi thêm điểm mới $P$:

- Nếu $\text{cross}(\text{top-1}, \text{top}, P) > 0$: hướng rẽ là quay trái, giữ nguyên tính lồi
- Nếu $\text{cross}(\text{top-1}, \text{top}, P) \leq 0$: hướng rẽ là quay phải hoặc thẳng hàng, điểm top nằm "bên trong" — loại bỏ để khôi phục tính lồi

Mỗi điểm bị loại bỏ không bao giờ được thêm lại (vì ta duyệt từ trái sang phải), nên thuật toán kết thúc đúng.

**Tại sao ghép 2 nửa đúng?** Lower hull bao gồm tất cả đỉnh bao lồi từ trái nhất sang phải nhất theo chiều dưới. Upper hull bao gồm tất cả đỉnh bao lồi từ phải nhất sang trái nhất theo chiều trên. Ghép lại, ta được toàn bộ bao lồi theo thứ tự CCW.

### Graham Scan

**Bảo toàn tính lồi:** Tương tự Monotone Chain, nhưng thay vì chia thành 2 nửa, Graham Scan quét toàn bộ điểm theo góc quanh pivot. Vì các điểm đã được sắp xếp theo góc, việc loại bỏ điểm "bên trong" đảm bảo chỉ còn lại các đỉnh bao lồi.

**Xử lý điểm thẳng hàng:** Khi 2 điểm có cùng góc so với pivot, điểm gần hơn đứng trước. Điều này đảm bảo điểm gần (không phải đỉnh bao lồi) bị loại bỏ trước khi xét điểm xa hơn.

---

## Đánh giá độ phức tạp

### Andrew's Monotone Chain

- **Sắp xếp:** $O(N \log N)$
- **Xây bao lồi:** $O(N)$ — mỗi điểm được thêm vào stack tối đa 1 lần và bị loại bỏ tối đa 1 lần
- **Tổng:** $O(N \log N)$

### Graham Scan

- **Tìm pivot:** $O(N)$
- **Sắp xếp theo góc:** $O(N \log N)$
- **Xây bao lồi:** $O(N)$
- **Tổng:** $O(N \log N)$

### So sánh 2 thuật toán

| Tiêu chí | Andrew's Monotone Chain | Graham Scan |
|---|---|---|
| Sắp xếp theo | Tọa độ $(x, y)$ | Góc $\text{atan2}$ |
| Dễ code | Rất dễ | Phức tạp hơn |
| Xử lý thẳng hàng | Dễ dàng | Cần cẩn thận |
| Khuyến nghị | Nên dùng | Học để hiểu thêm |

---

## Lưu ý và cạm bẫy

### Điểm thẳng hàng (Collinear Points)

Khi nhiều điểm nằm trên cùng 1 cạnh bao lồi, bạn cần quyết định: giữ tất cả hay chỉ giữ 2 đầu.

- Dùng $\text{cross} < 0$ (strict): giữ tất cả điểm trên cạnh, bao lồi có nhiều đỉnh "thừa"
- Dùng $\text{cross} \leq 0$ (loại bỏ thẳng hàng): chỉ giữ 2 đầu, bao lồi gọn hơn

**Khuyến nghị:** Hầu hết bài toán yêu cầu **loại bỏ** điểm thẳng hàng, dùng $\text{cross} \leq 0$. Nếu bài yêu cầu giữ lại, đổi thành $\text{cross} < 0$.

=== "C++"

    ```cpp
    // Loại bỏ điểm thẳng hàng (giữ chỉ đỉnh bao lồi thực sự)
    while (hull.size() >= 2 && cross(a, b, c) <= 0) hull.pop_back();

    // Giữ lại điểm thẳng hàng
    while (hull.size() >= 2 && cross(a, b, c) < 0) hull.pop_back();
    ```

=== "Python"

    ```python
    # Loại bỏ điểm thẳng hàng
    while len(hull) >= 2 and cross(hull[-2], hull[-1], p) <= 0:
        hull.pop()

    # Giữ lại điểm thẳng hàng
    while len(hull) >= 2 and cross(hull[-2], hull[-1], p) < 0:
        hull.pop()
    ```

### Ít hơn 3 điểm

- 0 điểm: trả về rỗng
- 1 điểm: trả về chính điểm đó
- 2 điểm: trả về cả 2 (đoạn thẳng, không phải đa giác)

Nếu code không xử lý 2 điểm đúng cách, bao lồi có thể trả về 1 điểm (sai!).

### Tọa độ nguyên vs số thực

**Tọa độ nguyên ($\text{long long}$):** Dùng `long long` cho cross product, chính xác tuyệt đối. Phạm vi $|x|, |y| \leq 10^9$ an toàn vì cross $= O(10^{18})$ vừa trong `long long`.

**Tọa độ số thực ($\text{double}$):** Dùng $|\text{cross}| < \varepsilon$ thay vì $\text{cross} == 0$. Epsilon thường dùng: $10^{-9}$ hoặc $10^{-12}$. Cẩn thận: so sánh $\leq 0$ với double có thể sai do sai số.

=== "C++"

    ```cpp
    const double EPS = 1e-9;
    while (hull.size() >= 2 &&
           cross(hull[hull.size()-2], hull[hull.size()-1], points[i]) < EPS)
        hull.pop_back();
    ```

=== "Python"

    ```python
    EPS = 1e-9
    while len(hull) >= 2 and cross(hull[-2], hull[-1], p) < EPS:
        hull.pop()
    ```

### Thứ tự đỉnh: CW vs CCW

Andrew's Monotone Chain trả về đỉnh theo thứ tự **CCW** (ngược chiều kim đồng hồ). Một số bài toán yêu cầu **CW** (theo chiều kim đồng hồ) — đảo ngược vector kết quả. Luôn kiểm tra đề bài yêu cầu thứ tự nào!

=== "C++"

    ```cpp
    vector<Point> hull = convexHull(points);
    // Nếu cần CW, đảo ngược:
    reverse(hull.begin(), hull.end());
    ```

=== "Python"

    ```python
    hull = convex_hull(points)
    # Nếu cần CW, đảo ngược:
    hull.reverse()
    ```

### Điểm trùng nhau

Nếu tập điểm có nhiều điểm trùng nhau, Andrew's Monotone Chain vẫn hoạt động đúng vì sort sẽ đặt chúng cạnh nhau.

### Bao lồi là đường thẳng (degenerate case)

Khi tất cả điểm thẳng hàng, bao lồi chỉ là 1 đoạn thẳng, không phải đa giác. Một số bài toán (tính diện tích, kiểm tra điểm trong bao lồi) sẽ trả về 0 hoặc sai với trường hợp này.

=== "C++"

    ```cpp
    bool isLine(vector<Point>& hull) {
        if (hull.size() <= 2) return true;
        for (int i = 2; i < (int)hull.size(); i++) {
            if (cross(hull[0], hull[1], hull[i]) != 0) return false;
        }
        return true;
    }
    ```

=== "Python"

    ```python
    def is_line(hull):
        if len(hull) <= 2:
            return True
        return all(cross(hull[0], hull[1], p) == 0 for p in hull[2:])
    ```

---

## Ứng dụng thực tế

### Diện tích bao lồi (Công thức Shoelace)

Sau khi có bao lồi, tính diện tích bằng công thức Shoelace:

$$S = \frac{1}{2} \left| \sum_{i=0}^{n-1} (x_i \cdot y_{i+1} - x_{i+1} \cdot y_i) \right|$$

với chỉ số modulo $n$ (đỉnh $n$ = đỉnh $0$).

=== "C++"

    ```cpp
    double hullArea(vector<Point>& hull) {
        long long area = 0;
        int n = hull.size();
        for (int i = 0; i < n; i++) {
            int j = (i + 1) % n;
            area += hull[i].x * hull[j].y;
            area -= hull[j].x * hull[i].y;
        }
        return abs(area) / 2.0;
    }
    ```

=== "Python"

    ```python
    def hull_area(hull):
        area = 0
        n = len(hull)
        for i in range(n):
            j = (i + 1) % n
            area += hull[i][0] * hull[j][1]
            area -= hull[j][0] * hull[i][1]
        return abs(area) / 2.0
    ```

### Chu vi bao lồi

=== "C++"

    ```cpp
    double hullPerimeter(vector<Point>& hull) {
        double perim = 0;
        int n = hull.size();
        for (int i = 0; i < n; i++) {
            int j = (i + 1) % n;
            double dx = hull[i].x - hull[j].x;
            double dy = hull[i].y - hull[j].y;
            perim += sqrt(dx * dx + dy * dy);
        }
        return perim;
    }
    ```

=== "Python"

    ```python
    import math

    def hull_perimeter(hull):
        perim = 0.0
        n = len(hull)
        for i in range(n):
            j = (i + 1) % n
            dx = hull[i][0] - hull[j][0]
            dy = hull[i][1] - hull[j][1]
            perim += math.sqrt(dx * dx + dy * dy)
        return perim
    ```

### Đường kính bao lồi — Rotating Calipers

**Bài toán:** Tìm khoảng cách lớn nhất giữa 2 điểm trong tập điểm (= đường kính bao lồi).

**Ý tưởng:** 2 đường thẳng song song kẹp bao lồi từ 2 phía. Quay 2 đường thẳng này quanh bao lồi, tại mỗi vị trí đo khoảng cách. Khoảng cách lớn nhất là đường kính. Thực tế, ta duyệt qua các cặp đỉnh đối diện trên bao lồi. Mỗi đỉnh "đối diện" di chuyển tối đa $O(N)$ bước, tổng $O(N)$.

=== "C++"

    ```cpp
    double hullDiameter(vector<Point>& hull) {
        int n = hull.size();
        if (n <= 1) return 0;
        if (n == 2) {
            double dx = hull[0].x - hull[1].x;
            double dy = hull[0].y - hull[1].y;
            return sqrt(dx * dx + dy * dy);
        }

        double maxDist = 0;
        int j = 1;
        for (int i = 0; i < n; i++) {
            int ni = (i + 1) % n;
            while (true) {
                int nj = (j + 1) % n;
                long long cur = abs(cross(hull[i], hull[ni], hull[j]));
                long long nxt = abs(cross(hull[i], hull[ni], hull[nj]));
                if (nxt > cur) j = nj;
                else break;
            }
            double dx = hull[i].x - hull[j].x;
            double dy = hull[i].y - hull[j].y;
            maxDist = max(maxDist, sqrt(dx * dx + dy * dy));
            dx = hull[ni].x - hull[j].x;
            dy = hull[ni].y - hull[j].y;
            maxDist = max(maxDist, sqrt(dx * dx + dy * dy));
        }
        return maxDist;
    }
    ```

=== "Python"

    ```python
    import math

    def hull_diameter(hull):
        n = len(hull)
        if n <= 1: return 0.0
        if n == 2:
            return math.sqrt((hull[0][0]-hull[1][0])**2 + (hull[0][1]-hull[1][1])**2)

        max_dist = 0.0
        j = 1
        for i in range(n):
            ni = (i + 1) % n
            while True:
                nj = (j + 1) % n
                cur = abs(cross(hull[i], hull[ni], hull[j]))
                nxt = abs(cross(hull[i], hull[ni], hull[nj]))
                if nxt > cur:
                    j = nj
                else:
                    break
            max_dist = max(max_dist, math.sqrt((hull[i][0]-hull[j][0])**2 + (hull[i][1]-hull[j][1])**2))
            max_dist = max(max_dist, math.sqrt((hull[ni][0]-hull[j][0])**2 + (hull[ni][1]-hull[j][1])**2))
        return max_dist
    ```

### Kiểm tra điểm trong bao lồi

Với bao lồi lồi (đã sắp xếp CCW), kiểm tra điểm $P$ có nằm trong bao lồi không có thể dùng binary search $O(\log N)$:

=== "C++"

    ```cpp
    bool pointInHull(const Point& P, const vector<Point>& hull) {
        int n = hull.size();
        if (n == 0) return false;
        if (n == 1) return P.x == hull[0].x && P.y == hull[0].y;
        if (n == 2) {
            return cross(hull[0], hull[1], P) == 0 &&
                   min(hull[0].x, hull[1].x) <= P.x && P.x <= max(hull[0].x, hull[1].x) &&
                   min(hull[0].y, hull[1].y) <= P.y && P.y <= max(hull[0].y, hull[1].y);
        }

        if (cross(hull[0], hull[1], P) < 0) return false;
        if (cross(hull[0], hull[n-1], P) > 0) return false;

        int lo = 1, hi = n - 1;
        while (hi - lo > 1) {
            int mid = (lo + hi) / 2;
            if (cross(hull[0], hull[mid], P) >= 0) lo = mid;
            else hi = mid;
        }
        return cross(hull[lo], hull[hi], P) >= 0;
    }
    ```

=== "Python"

    ```python
    def point_in_hull(P, hull):
        n = len(hull)
        if n == 0: return False
        if n == 1: return P[0] == hull[0][0] and P[1] == hull[0][1]
        if n == 2:
            return (cross(hull[0], hull[1], P) == 0 and
                    min(hull[0][0], hull[1][0]) <= P[0] <= max(hull[0][0], hull[1][0]) and
                    min(hull[0][1], hull[1][1]) <= P[1] <= max(hull[0][1], hull[1][1]))

        if cross(hull[0], hull[1], P) < 0: return False
        if cross(hull[0], hull[n-1], P) > 0: return False

        lo, hi = 1, n - 1
        while hi - lo > 1:
            mid = (lo + hi) // 2
            if cross(hull[0], hull[mid], P) >= 0:
                lo = mid
            else:
                hi = mid
        return cross(hull[lo], hull[hi], P) >= 0
    ```

---

## Các thuật toán khác (tham khảo)

### Jarvis March (Gift Wrapping)

- **Ý tưởng:** Bọc quà — từ điểm trái nhất, tìm điểm "quay trái nhất" tiếp theo, lặp lại cho đến khi quay về điểm đầu
- **Độ phức tạp:** $O(N \cdot H)$ với $H$ là số đỉnh bao lồi
- **Ưu điểm:** Nhanh khi $H$ rất nhỏ ($H \ll N$)
- **Nhược điểm:** Chậm khi $H \approx N$ (trường hợp xấu nhất $O(N^2)$)

### Chan's Algorithm

- **Ý tưởng:** Kết hợp Monotone Chain và Jarvis March
- **Độ phức tạp:** $O(N \log H)$ — tối ưu về mặt lý thuyết
- **Thực tế:** Ít khi cần dùng trong competitive programming

---

## Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|---|---|---|---|
| [CSES - Convex Hull](https://cses.fi/problemset/task/2195) | CSES | ⭐⭐ | Bao lồi cơ bản |
| [Kattis - Convex Hull](https://open.kattis.com/problems/convexhull) | Kattis | ⭐⭐ | Bao lồi cơ bản |
| [SPOJ - BSHEEP](https://www.spoj.com/problems/BSHEEP/) | SPOJ | ⭐⭐⭐ | Bao lồi + chu vi |
| [CF - Convex Hull](https://codeforces.com/contest/166/problem/B) | CF | ⭐⭐⭐ | Điểm trong bao lồi |
| [CF - Wonderful Randomized Sum](https://codeforces.com/contest/186/problem/A) | CF | ⭐⭐⭐ | Ứng dụng bao lồi |
| [Kattis - Polygon Area](https://open.kattis.com/problems/polygonarea) | Kattis | ⭐⭐ | Diện tích đa giác |
| [CSES - Maximum Manhattan Distances](https://cses.fi/problemset/task/2194) | CSES | ⭐⭐⭐ | Khoảng cách + bao lồi |
| [VNOJ - VMHULL](https://oj.vnoi.info/problem/vmhull) | VNOJ | ⭐⭐⭐ | Bao lồi |
| [VNOJ - VODIVIDING](https://oj.vnoi.info/problem/vodividing) | VNOJ | ⭐⭐⭐ | Geometry + bao lồi |
| [CF - The Fair Nut and Rectangles](https://codeforces.com/contest/1083/problem/A) | CF | ⭐⭐⭐⭐ | DP + bao lồi |

### Gợi ý tiếp cận

- **Mới bắt đầu:** Bắt đầu với CSES Convex Hull — cài Andrew's Monotone Chain và submit
- **Trung cấp:** SPOJ BSHEEP — cần tính chu vi bao lồi
- **Nâng cao:** CF 166B — kiểm tra điểm trong bao lồi với binary search

---

## Bài viết liên quan

- [Bài 22: Hình học cơ bản](hinh-hoc-co-ban.md) — Tích có hướng, tích vô hướng, kiểm tra giao điểm

## Tài liệu tham khảo

- [VNOI Wiki - Bao lồi](https://vnoi.info/translate/wcipeg/Convex-Hull)
- [VNOI Wiki - Giải thích trực quan về bao lồi](https://vnoi.info/translate/wcipeg/Bao-lồi)
- [CP-Algorithms - Convex Hull](https://cp-algorithms.com/geometry/convex-hull.html)
- [CP-Algorithms - Rotating Calipers](https://cp-algorithms.com/geometry/rotating-calipers.html)
- [USACO Guide - Convex Hull](https://usaco.guide/adv/geo)
- [YouTube - Convex Hull (Errichto)](https://www.youtube.com/watch?v=B2aDgfbj3kE)

**Bài tiếp theo:** [Kỹ năng thi đấu →](ky-nang-thi-dau.md)
