# Bài 22: Hình Học Cơ Bản

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** VNOI Wiki - Hình học tính toán

---

## 1. Điểm và Vector

### Bản chất vấn đề

Trong mặt phẳng Oxy, một **điểm** $P$ được biểu diễn bằng cặp tọa độ $(x, y)$. Một **vector** $\vec{AB}$ là phép dịch chuyển từ điểm $A$ đến điểm $B$, có thành phần $(B.x - A.x,\ B.y - A.y)$.

Vector không phụ thuộc vào vị trí bắt đầu — hai vector cùng phương và độ dài thì bằng nhau dù ở đâu trên mặt phẳng.

### Tư duy cốt lõi

Mọi phép toán hình học trong competitive programming đều quy về hai phép toán trên vector: **tích vô hướng** (dot product) và **tích có hướng** (cross product). Nắm vững hai phép này là chìa khóa để giải hầu hết bài toán hình học cơ bản.

### Cấu trúc dữ liệu cơ bản

=== "C++"

    ```cpp
    struct Point {
        double x, y;
        Point operator-(const Point& o) const { return {x - o.x, y - o.y}; }
        Point operator+(const Point& o) const { return {x + o.x, y + o.y}; }
        Point operator*(double k) const { return {x * k, y * k}; }
    };
    ```

=== "Python"

    ```python
    # Dùng tuple (x, y) hoặc class Point
    # Các hàm bên dưới nhận tuple (x, y) làm đầu vào
    pass
    ```

---

## 2. Tích vô hướng (Dot Product)

### Bản chất vấn đề

Cho hai vector $\vec{A} = (A.x,\ A.y)$ và $\vec{B} = (B.x,\ B.y)$. Tích vô hướng là một số vô hướng:

$$\vec{A} \cdot \vec{B} = A.x \cdot B.x + A.y \cdot B.y$$

Về mặt hình học:

$$\vec{A} \cdot \vec{B} = |\vec{A}| \cdot |\vec{B}| \cdot \cos\theta$$

trong đó $\theta$ là góc giữa hai vector.

### Tư duy cốt lõi

Dấu của tích vô hướng cho biết **quan hệ góc** giữa hai vector:

- $\vec{A} \cdot \vec{B} > 0$: góc nhọn ($\theta < 90°$) — cùng hướng
- $\vec{A} \cdot \vec{B} = 0$: vuông góc ($\theta = 90°$)
- $\vec{A} \cdot \vec{B} < 0$: góc tù ($\theta > 90°$) — ngược hướng

### Phân tích tính đúng đắn

Từ công thức $\vec{A} \cdot \vec{B} = |\vec{A}| \cdot |\vec{B}| \cdot \cos\theta$, vì $|\vec{A}| \geq 0$ và $|\vec{B}| \geq 0$, dấu của tích vô hướng hoàn toàn phụ thuộc vào $\cos\theta$. Hàm cosine dương khi $\theta \in (0°, 90°)$, âm khi $\theta \in (90°, 180°)$, và bằng 0 khi $\theta = 90°$.

### Đánh giá độ phức tạp

Tính tích vô hướng: $O(1)$.

### Code

=== "C++"

    ```cpp
    double dot(Point A, Point B) {
        return A.x * B.x + A.y * B.y;
    }
    ```

=== "Python"

    ```python
    def dot(A, B):
        return A[0] * B[0] + A[1] * B[1]
    ```

### Ứng dụng

- Kiểm tra hai vector vuông góc: `dot(A, B) == 0`
- Tính góc giữa hai vector: $\theta = \arccos\left(\dfrac{\vec{A} \cdot \vec{B}}{|\vec{A}| \cdot |\vec{B}|}\right)$
- Chiếu điểm lên đường thẳng

---

## 3. Tích có hướng (Cross Product)

### Bản chất vấn đề

Cho hai vector $\vec{A} = (A.x,\ A.y)$ và $\vec{B} = (B.x,\ B.y)$. Tích có hướng (trong 2D) là một số vô hướng:

$$\vec{A} \times \vec{B} = A.x \cdot B.y - A.y \cdot B.x$$

Giá trị này bằng **diện tích có dấu** của hình bình hành tạo bởi $\vec{A}$ và $\vec{B}$.

### Tư duy cốt lõi

Dấu của tích có hướng cho biết **hướng quay** từ $\vec{A}$ sang $\vec{B}$:

- $\vec{A} \times \vec{B} > 0$: $\vec{B}$ nằm bên **trái** $\vec{A}$ (quay ngược chiều kim đồng hồ — CCW)
- $\vec{A} \times \vec{B} = 0$: $\vec{A}$ và $\vec{B}$ **thẳng hàng** (collinear)
- $\vec{A} \times \vec{B} < 0$: $\vec{B}$ nằm bên **phải** $\vec{A}$ (quay theo chiều kim đồng hồ — CW)

Hình dung đơn giản: khi quẹo xe từ hướng $\vec{A}$ sang $\vec{B}$, cross > 0 là quẹo trái, cross < 0 là quẹo phải, cross = 0 là đi thẳng.

```matplotlib
fig, axes = plt.subplots(1, 2, figsize=(12, 5))

ax = axes[0]
A = np.array([0, 0])
B = np.array([3, 0])
C_ccw = np.array([2, 3])
ax.annotate('', xy=B, xytext=A, arrowprops=dict(arrowstyle='->', color='#2196F3', lw=2.5))
ax.annotate('', xy=C_ccw, xytext=A, arrowprops=dict(arrowstyle='->', color='#f44336', lw=2.5))
ax.plot(*A, 'ko', markersize=8, zorder=5); ax.annotate('O', A, textcoords='offset points', xytext=(-12, -12), fontsize=11, fontweight='bold')
ax.plot(*B, 'ko', markersize=8, zorder=5); ax.annotate('A', B, textcoords='offset points', xytext=(5, -12), fontsize=10)
ax.plot(*C_ccw, 'ko', markersize=8, zorder=5); ax.annotate('B', C_ccw, textcoords='offset points', xytext=(5, 5), fontsize=10)
arc_ccw = np.linspace(0, np.arctan2(3, 2), 30)
ax.plot(0.8*np.cos(arc_ccw), 0.8*np.sin(arc_ccw), color='#4CAF50', lw=2)
ax.set_title('Cross > 0: Quay trái (CCW)', fontsize=12, color='#4CAF50', fontweight='bold')
ax.set_xlim(-0.5, 4); ax.set_ylim(-0.5, 3.5)
ax.set_aspect('equal'); ax.grid(True, alpha=0.3)

ax = axes[1]
C_cw = np.array([2, -3])
ax.annotate('', xy=B, xytext=A, arrowprops=dict(arrowstyle='->', color='#2196F3', lw=2.5))
ax.annotate('', xy=C_cw, xytext=A, arrowprops=dict(arrowstyle='->', color='#f44336', lw=2.5))
ax.plot(*A, 'ko', markersize=8, zorder=5); ax.annotate('O', A, textcoords='offset points', xytext=(-12, 8), fontsize=11, fontweight='bold')
ax.plot(*B, 'ko', markersize=8, zorder=5); ax.annotate('A', B, textcoords='offset points', xytext=(5, 8), fontsize=10)
ax.plot(*C_cw, 'ko', markersize=8, zorder=5); ax.annotate('B', C_cw, textcoords='offset points', xytext=(5, -10), fontsize=10)
arc_cw = np.linspace(0, -np.arctan2(3, 2), 30)
ax.plot(0.8*np.cos(arc_cw), 0.8*np.sin(arc_cw), color='#FF5722', lw=2)
ax.set_title('Cross < 0: Quay phải (CW)', fontsize=12, color='#FF5722', fontweight='bold')
ax.set_xlim(-0.5, 4); ax.set_ylim(-3.5, 0.5)
ax.set_aspect('equal'); ax.grid(True, alpha=0.3)

fig.suptitle('Tích có hướng (Cross Product) - Hướng quay', fontsize=14, fontweight='bold', y=1.02)
plt.tight_layout()
```

### Phân tích tính đúng đắn

Xét hệ tọa độ chuẩn (x sang phải, y lên trên). Vector $\vec{A} = (1, 0)$ và $\vec{B} = (0, 1)$ cho $\vec{A} \times \vec{B} = 1 > 0$, đúng vì $\vec{B}$ nằm bên trái $\vec{A}$. Ma trận $[\vec{A} | \vec{B}]$ có định thức dương tương ứng với phép biến đổi bảo toàn hướng (orientation-preserving).

### Đánh giá độ phức tạp

Tính tích có hướng: $O(1)$.

### Code

=== "C++"

    ```cpp
    double cross(Point A, Point B) {
        return A.x * B.y - A.y * B.x;
    }
    ```

=== "Python"

    ```python
    def cross(A, B):
        return A[0] * B[1] - A[1] * B[0]
    ```

---

## 4. Khoảng cách

### Bản chất vấn đề

Khoảng cách Euclid giữa hai điểm $A$ và $B$:

$$d(A, B) = \sqrt{(A.x - B.x)^2 + (A.y - B.y)^2}$$

Trong nhiều bài toán, ta chỉ cần so sánh khoảng cách nên dùng **khoảng cách bình phương** để tránh hàm `sqrt` và sai số số thực.

### Code

=== "C++"

    ```cpp
    double distance(Point A, Point B) {
        double dx = A.x - B.x, dy = A.y - B.y;
        return sqrt(dx * dx + dy * dy);
    }

    double distSq(Point A, Point B) {
        double dx = A.x - B.x, dy = A.y - B.y;
        return dx * dx + dy * dy;
    }
    ```

=== "Python"

    ```python
    import math

    def distance(A, B):
        return math.sqrt((A[0] - B[0])**2 + (A[1] - B[1])**2)

    def dist_sq(A, B):
        return (A[0] - B[0])**2 + (A[1] - B[1])**2
    ```

---

## 5. Xác định hướng quay (Orientation)

### Bản chất vấn đề

Cho ba điểm $A$, $B$, $C$. Hỏi khi đi từ $A \to B \to C$, hướng quay là gì? Ta tính:

$$\text{val} = \vec{AB} \times \vec{AC} = (B.x - A.x)(C.y - A.y) - (B.y - A.y)(C.x - A.x)$$

- $\text{val} > 0$: CCW (quẹo trái)
- $\text{val} = 0$: thẳng hàng
- $\text{val} < 0$: CW (quẹo phải)

### Tư duy cốt lõi

Đây là phép toán nền tảng cho hầu hết bài toán hình học: kiểm tra đoạn thẳng cắt nhau, xây dựng bao lồi, kiểm tra điểm trong đa giác. Orientation chính là "nguyên tử" của hình học tính toán.

### Phân tích tính đúng đắn

$\vec{AB} \times \vec{AC}$ tính diện tích có dấu của tam giác $ABC$. Nếu $C$ nằm bên trái đường thẳng $AB$, diện tích có dấu dương (CCW). Nếu bên phải, âm (CW). Nếu trên đường thẳng, bằng 0.

### Đánh giá độ phức tạp

$O(1)$ cho mỗi lần kiểm tra.

### Code

=== "C++"

    ```cpp
    int orientation(Point A, Point B, Point C) {
        double val = cross(B - A, C - A);
        if (val > 0) return 1;   // CCW
        if (val < 0) return -1;  // CW
        return 0;                // Thẳng hàng
    }
    ```

=== "Python"

    ```python
    def orientation(A, B, C):
        val = cross((B[0]-A[0], B[1]-A[1]), (C[0]-A[0], C[1]-A[1]))
        if val > 0: return 1
        if val < 0: return -1
        return 0
    ```

---

## 6. Kiểm tra điểm nằm trên đoạn thẳng

### Bản chất vấn đề

Khi ba điểm $A$, $B$, $P$ thẳng hàng (orientation = 0), ta cần kiểm tra $P$ có nằm **trên đoạn** $AB$ không. Điều kiện: tọa độ của $P$ phải nằm trong hình chữ nhật bao quanh $A$ và $B$.

### Code

=== "C++"

    ```cpp
    bool onSegment(Point A, Point B, Point P) {
        return min(A.x, B.x) <= P.x && P.x <= max(A.x, B.x) &&
               min(A.y, B.y) <= P.y && P.y <= max(A.y, B.y);
    }
    ```

=== "Python"

    ```python
    def on_segment(A, B, P):
        return (min(A[0], B[0]) <= P[0] <= max(A[0], B[0]) and
                min(A[1], B[1]) <= P[1] <= max(A[1], B[1]))
    ```

---

## 7. Kiểm tra hai đoạn thẳng cắt nhau

### Bản chất vấn đề

Cho hai đoạn $AB$ và $CD$. Hỏi chúng có giao điểm không?

### Tư duy cốt lõi

Hai đoạn $AB$ và $CD$ cắt nhau khi và chỉ khi:

1. $C$ và $D$ nằm ở **hai phía khác nhau** của đường thẳng $AB$
2. $A$ và $B$ nằm ở **hai phía khác nhau** của đường thẳng $CD$

Điều kiện (1) và (2) phát hiện bằng cách kiểm tra dấu của cross product. Ngoài ra, cần xét trường hợp đặc biệt khi các điểm thẳng hàng (cross = 0) và nằm trên đoạn.

### Phân tích tính đúng đắn

Gọi $d_1 = \vec{AB} \times \vec{AC}$, $d_2 = \vec{AB} \times \vec{AD}$. Nếu $d_1$ và $d_2$ khác dấu, $C$ và $D$ nằm hai phía khác nhau của $AB$. Tương tự với $d_3 = \vec{CD} \times \vec{CA}$, $d_4 = \vec{CD} \times \vec{CB}$.

Khi $d_1 = 0$ và $C$ nằm trên đoạn $AB$, hai đoạn cắt nhau tại $C$ (trường hợp collinear).

### Đánh giá độ phức tạp

$O(1)$.

### Code

=== "C++"

    ```cpp
    bool segmentsIntersect(Point A, Point B, Point C, Point D) {
        double d1 = cross(B - A, C - A);
        double d2 = cross(B - A, D - A);
        double d3 = cross(D - C, A - C);
        double d4 = cross(D - C, B - C);

        if (((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) &&
            ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0)))
            return true;

        if (d1 == 0 && onSegment(A, B, C)) return true;
        if (d2 == 0 && onSegment(A, B, D)) return true;
        if (d3 == 0 && onSegment(C, D, A)) return true;
        if (d4 == 0 && onSegment(C, D, B)) return true;

        return false;
    }
    ```

=== "Python"

    ```python
    def segments_intersect(A, B, C, D):
        d1 = cross((B[0]-A[0], B[1]-A[1]), (C[0]-A[0], C[1]-A[1]))
        d2 = cross((B[0]-A[0], B[1]-A[1]), (D[0]-A[0], D[1]-A[1]))
        d3 = cross((D[0]-C[0], D[1]-C[1]), (A[0]-C[0], A[1]-C[1]))
        d4 = cross((D[0]-C[0], D[1]-C[1]), (B[0]-C[0], B[1]-C[1]))

        if ((d1 > 0 and d2 < 0) or (d1 < 0 and d2 > 0)) and \
           ((d3 > 0 and d4 < 0) or (d3 < 0 and d4 > 0)):
            return True

        if d1 == 0 and on_segment(A, B, C): return True
        if d2 == 0 and on_segment(A, B, D): return True
        if d3 == 0 and on_segment(C, D, A): return True
        if d4 == 0 and on_segment(C, D, B): return True

        return False
    ```

---

## 8. Diện tích tam giác

### Bản chất vấn đề

Diện tích tam giác $ABC$ có thể tính bằng tích có hướng:

$$S = \frac{1}{2} |\vec{AB} \times \vec{AC}|$$

Ngoài ra, khi biết ba cạnh $a$, $b$, $c$, dùng công thức Heron:

$$p = \frac{a + b + c}{2}, \quad S = \sqrt{p(p-a)(p-b)(p-c)}$$

### Tư duy cốt lõi

Công thức cross product nhanh và chính xác hơn Heron vì không cần tính căn bậc hai hai lần. Dùng Heron khi chỉ biết độ dài ba cạnh.

### Đánh giá độ phức tạp

Cả hai cách: $O(1)$.

### Code

=== "C++"

    ```cpp
    double triangleArea(Point A, Point B, Point C) {
        return abs(cross(B - A, C - A)) / 2.0;
    }

    double triangleAreaHeron(double a, double b, double c) {
        double s = (a + b + c) / 2;
        return sqrt(s * (s - a) * (s - b) * (s - c));
    }
    ```

=== "Python"

    ```python
    def triangle_area(A, B, C):
        return abs(cross((B[0]-A[0], B[1]-A[1]), (C[0]-A[0], C[1]-A[1]))) / 2.0

    def triangle_area_heron(a, b, c):
        s = (a + b + c) / 2
        return math.sqrt(s * (s - a) * (s - b) * (s - c))
    ```

---

## 9. Diện tích đa giác (Shoelace Formula)

### Bản chất vấn đề

Cho đa giác có $N$ đỉnh $(x_1, y_1), (x_2, y_2), \ldots, (x_N, y_N)$ được liệt kê theo thứ tự (CW hoặc CCW). Diện tích được tính bằng công thức Shoelace:

$$S = \frac{1}{2} \left| \sum_{i=0}^{N-1} (x_i \cdot y_{i+1} - x_{i+1} \cdot y_i) \right|$$

trong đó chỉ số modulo $N$ (đỉnh $N$ quay về đỉnh $0$).

### Tư duy cốt lõi

Công thức Shoelace thực chất là tổng diện tích có dấu của các tam giác $(O, P_i, P_{i+1})$ với $O$ là gốc tọa độ. Các phần dương và âm tự triệt tiêu, chỉ còn lại diện tích đa giác.

### Phân tích tính đúng đắn

Mỗi thành phần $x_i \cdot y_{i+1} - x_{i+1} \cdot y_i$ là cross product của hai vector $(x_i, y_i)$ và $(x_{i+1}, y_{i+1})$, tức gấp đôi diện tích có dấu tam giác $OP_iP_{i+1}$. Tổng có dấu cho đúng diện tích đa giác bất kể đỉnh theo CW hay CCW, vì ta lấy giá trị tuyệt đối.

### Đánh giá độ phức tạp

$O(N)$ với $N$ là số đỉnh.

### Code

=== "C++"

    ```cpp
    double polygonArea(vector<Point>& polygon) {
        double area = 0;
        int n = polygon.size();
        for (int i = 0; i < n; i++) {
            int j = (i + 1) % n;
            area += polygon[i].x * polygon[j].y;
            area -= polygon[j].x * polygon[i].y;
        }
        return abs(area) / 2.0;
    }
    ```

=== "Python"

    ```python
    def polygon_area(polygon):
        area = 0
        n = len(polygon)
        for i in range(n):
            j = (i + 1) % n
            area += polygon[i][0] * polygon[j][1]
            area -= polygon[j][0] * polygon[i][1]
        return abs(area) / 2.0
    ```

---

## 10. Khoảng cách từ điểm đến đường thẳng và đoạn thẳng

### Bản chất vấn đề

- **Đường thẳng** đi qua $A$ và $B$: khoảng cách từ $P$ đến đường thẳng là độ cao của tam giác $PAB$ ứng với đáy $AB$:

$$d(P, \text{line } AB) = \frac{|\vec{AB} \times \vec{AP}|}{|\vec{AB}|}$$

- **Đoạn thẳng** $AB$: khoảng cách từ $P$ là khoảng cách nhỏ nhất từ $P$ đến mọi điểm trên đoạn. Nếu hình chiếu $P'$ của $P$ lên đường thẳng $AB$ nằm trên đoạn, kết quả bằng khoảng cách đến đường thẳng. Nếu không, kết quả là khoảng cách đến đầu mút gần nhất.

### Tư duy cốt lõi

Với đoạn thẳng, ta dùng phép chiếu: tính tham số $t = \dfrac{\vec{AP} \cdot \vec{AB}}{|\vec{AB}|^2}$. Nếu $t \in [0, 1]$, hình chiếu nằm trên đoạn. Nếu $t < 0$, điểm gần nhất là $A$. Nếu $t > 1$, điểm gần nhất là $B$.

### Phân tích tính đúng đắn

Phép chiếu vector $\vec{AP}$ lên $\vec{AB}$ cho tỷ lệ $t$ dọc theo đoạn. Giới hạn $t$ trong $[0, 1]$ đảm bảo ta chỉ xét điểm trên đoạn, không ra ngoài.

### Đánh giá độ phức tạp

Cả hai phép tính: $O(1)$.

### Code

=== "C++"

    ```cpp
    double distPointToLine(Point P, Point A, Point B) {
        return abs(cross(B - A, P - A)) / distance(A, B);
    }

    double distPointToSegment(Point P, Point A, Point B) {
        double d2 = distSq(A, B);
        if (d2 == 0) return distance(P, A);

        double t = dot(P - A, B - A) / d2;
        t = max(0.0, min(1.0, t));

        Point projection = A + (B - A) * t;
        return distance(P, projection);
    }
    ```

=== "Python"

    ```python
    def dist_point_to_line(P, A, B):
        return abs(cross((B[0]-A[0], B[1]-A[1]), (P[0]-A[0], P[1]-A[1]))) / distance(A, B)

    def dist_point_to_segment(P, A, B):
        d2 = dist_sq(A, B)
        if d2 == 0:
            return distance(P, A)
        t = max(0, min(1, dot((P[0]-A[0], P[1]-A[1]), (B[0]-A[0], B[1]-A[1])) / d2))
        projection = (A[0] + (B[0]-A[0]) * t, A[1] + (B[1]-A[1]) * t)
        return distance(P, projection)
    ```

---

## 11. Điểm trong đa giác (Point in Polygon)

### Bản chất vấn đề

Cho đa giác (lồi hoặc không lồi) và một điểm $P$, xác định $P$ có nằm trong đa giác không.

### Tư duy cốt lõi

**Phương pháp Ray Casting (Tia đếm):** Vẽ một tia ngang từ $P$ sang phải vô cực. Đếm số lần tia cắt cạnh đa giác.

- Số lần cắt **lẻ** → $P$ nằm trong đa giác
- Số lần cắt **chẵn** → $P$ nằm ngoài đa giác

Với **đa giác lồi**, ta có cách nhanh hơn: kiểm tra $P$ nằm cùng phía (cùng dấu cross product) với tất cả các cạnh.

### Phân tích tính đúng đắn

Ray Casting hoạt động vì mỗi lần tia đi từ ngoài vào trong hoặc ngược lại, trạng thái "trong/ngoài" đổi. Tổng số lần đổi là lẻ khi bắt đầu từ ngoài và kết thúc trong, hoặc ngược lại.

Với đa giác lồi, một điểm nằm trong khi và chỉ khi nó nằm bên trong mọi cạnh (vì đa giác lồi là giao của nửa mặt phẳng).

### Đánh giá độ phức tạp

- Ray Casting (đa giác bất kỳ): $O(N)$
- Kiểm tra đa giác lồi: $O(N)$

### Code — Ray Casting (mọi đa giác)

=== "C++"

    ```cpp
    bool pointInPolygon(Point P, vector<Point>& polygon) {
        int n = polygon.size();
        bool inside = false;

        for (int i = 0, j = n - 1; i < n; j = i++) {
            Point A = polygon[i], B = polygon[j];

            if (((A.y > P.y) != (B.y > P.y)) &&
                (P.x < (B.x - A.x) * (P.y - A.y) / (B.y - A.y) + A.x))
                inside = !inside;
        }
        return inside;
    }
    ```

=== "Python"

    ```python
    def point_in_polygon(P, polygon):
        n = len(polygon)
        inside = False
        for i in range(n):
            j = (i - 1) % n
            A, B = polygon[i], polygon[j]
            if ((A[1] > P[1]) != (B[1] > P[1])) and \
               (P[0] < (B[0] - A[0]) * (P[1] - A[1]) / (B[1] - A[1]) + A[0]):
                inside = not inside
        return inside
    ```

### Code — Đa giác lồi (dùng cross product)

=== "C++"

    ```cpp
    bool pointInConvexPolygon(Point P, vector<Point>& polygon) {
        int n = polygon.size();
        for (int i = 0; i < n; i++) {
            int j = (i + 1) % n;
            if (cross(polygon[j] - polygon[i], P - polygon[i]) < 0)
                return false;
        }
        return true;
    }
    ```

=== "Python"

    ```python
    def point_in_convex_polygon(P, polygon):
        n = len(polygon)
        for i in range(n):
            j = (i + 1) % n
            if cross((polygon[j][0]-polygon[i][0], polygon[j][1]-polygon[i][1]),
                     (P[0]-polygon[i][0], P[1]-polygon[i][1])) < 0:
                return False
        return True
    ```

---

## 12. Lưu ý quan trọng

- **So sánh số thực:** Không dùng `==`. Dùng `abs(a - b) < 1e-9` (epsilon).
- **Tràn số:** Cross product với tọa độ nguyên → dùng `long long`. Với tọa độ thực → dùng `double`.
- **Thứ tự đỉnh:** Đa giác cho theo CW hay CCW ảnh hưởng dấu của cross product. Luôn xác định rõ trước khi code.
- **Precision:** Hình học thường yêu cầu precision cao. Tránh phép trừ hai số gần nhau (cancellation).

---

## 13. Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Point Location Test](https://cses.fi/problemset/task/2189) | CSES | ⭐⭐ | Cross product |
| [CSES - Line Segment Intersection](https://cses.fi/problemset/task/2190) | CSES | ⭐⭐⭐ | Đoạn thẳng cắt nhau |
| [CSES - Polygon Area](https://cses.fi/problemset/task/2191) | CSES | ⭐⭐ | Diện tích đa giác |
| [CF - Geometry problems](https://codeforces.com/problemset?tags=geometry) | CF | ⭐⭐–⭐⭐⭐ | Tổng hợp hình học |
| [VNOJ - VODIVIDING](https://oj.vnoi.info/problem/vodividing) | VNOJ | ⭐⭐⭐ | Geometry |
| [CSES - Convex Hull](https://cses.fi/problemset/task/2195) | CSES | ⭐⭐⭐ | Bao lồi |
| [CSES - Maximum Manhattan Distances](https://cses.fi/problemset/task/2194) | CSES | ⭐⭐ | Khoảng cách |

## Bài viết liên quan

- [Bài 28: Bao lồi](bao-loi.md)

## Tài liệu tham khảo

- [VNOI Wiki - Hình học tính toán](https://wiki.vnoi.info/algo/geometry/basic-geometry-1)
- [CP-Algorithms - Geometry](https://cp-algorithms.com/geometry/basic-geometry.html)
- [Topcoder - Geometry Concepts](https://www.topcoder.com/thrive/articles/Geometry%20Concepts)
- [USACO Guide - Geometry](https://usaco.guide/adv/geo)
- [YouTube - Geometry for CP (Errichto)](https://www.youtube.com/watch?v=OMmPGgKdWQc)

**Bài tiếp theo:** [Stack Nâng Cao →](stack-nang-cao.md)
