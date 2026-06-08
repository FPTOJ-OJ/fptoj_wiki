# Bài 61: Phương Trình Đường Thẳng & Giao Điểm

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** CP-Algorithms, VNOI Wiki

---

## Bạn sẽ học được gì?

- **Các dạng phương trình đường thẳng:** Khái niệm vectơ pháp tuyến, vectơ chỉ phương và cách chuyển đổi linh hoạt giữa các dạng.
- **Vị trí tương đối và Phép chiếu:** Công thức tính khoảng cách từ điểm đến đường thẳng và tìm tọa độ điểm đối xứng.
- **Giao điểm đường thẳng và đoạn thẳng:** Sử dụng định thức Cramer và tích có hướng (Cross Product) để giải quyết các trường hợp giao nhau.
- **Diện tích đa giác:** Chứng minh và ứng dụng công thức Shoelace (Gauss).
- Toàn bộ thuật toán được cài đặt chi tiết bằng cả C++ và Python.

---

## 1. Các dạng phương trình đường thẳng

Trong mặt phẳng tọa độ $Oxy$, một đường thẳng có thể được biểu diễn dưới nhiều dạng toán học khác nhau:

### 1.1 Dạng tổng quát
$$Ax + By + C = 0$$
Trong đó:
- Vectơ pháp tuyến (vuông góc với đường thẳng): $\vec{n} = (A, B)$ (với $A^2 + B^2 > 0$).
- Vectơ chỉ phương (song song với đường thẳng): $\vec{u} = (-B, A)$.

### 1.2 Dạng hệ số góc
$$y = kx + b$$
Trong đó $k$ là hệ số góc (độ dốc), $b$ là tung độ gốc (giao điểm với trục $Oy$). Dạng này không biểu diễn được đường thẳng thẳng đứng song song với trục $Oy$ (khi $B = 0$ ở dạng tổng quát).
- Chuyển sang dạng tổng quát: $kx - y + b = 0 \implies A = k, B = -1, C = b$.

### 1.3 Dạng tham số
$$\begin{cases} x = x_0 + t \cdot u_x \\ y = y_0 + t \cdot u_y \end{cases}$$
Trong đó $P_0(x_0, y_0)$ là một điểm thuộc đường thẳng, $\vec{u} = (u_x, u_y)$ là vectơ chỉ phương, và $t \in \mathbb{R}$ là tham số tự do.

---

### 1.4 Cách dựng phương trình đường thẳng từ dữ kiện đầu vào

#### Đường thẳng đi qua 2 điểm $P(x_1, y_1)$ và $Q(x_2, y_2)$
Vectơ chỉ phương là $\vec{PQ} = (x_2 - x_1, y_2 - y_1)$. Do đó, vectơ pháp tuyến là $\vec{n} = (y_1 - y_2, x_2 - x_1)$.
Thay điểm $P$ vào phương trình tổng quát, ta thu được hệ số tự do $C$:
$$A = y_1 - y_2, \quad B = x_2 - x_1, \quad C = x_1 y_2 - x_2 y_1$$

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    struct Point {
        double x, y;
    };

    struct Line {
        double A, B, C; // Ax + By + C = 0
    };

    // Dựng đường thẳng đi qua 2 điểm
    Line lineFromPoints(Point P, Point Q) {
        double A = Q.y - P.y;
        double B = P.x - Q.x;
        double C = P.y * Q.x - P.x * Q.y;
        return {A, B, C};
    }

    // Dựng đường thẳng từ 1 điểm và vectơ pháp tuyến n
    Line lineFromPointNormal(Point P, Point n) {
        return {n.x, n.y, -n.x * P.x - n.y * P.y};
    }
    ```

=== "Python"

    ```python
    class Point:
        def __init__(self, x, y):
            self.x = x
            self.y = y

    class Line:
        def __init__(self, A, B, C):
            self.A = A
            self.B = B
            self.C = C

    def line_from_points(P, Q):
        A = Q.y - P.y
        B = P.x - Q.x
        C = P.y * Q.x - P.x * Q.y
        return Line(A, B, C)

    def line_from_point_normal(P, n):
        return Line(n.x, n.y, -n.x * P.x - n.y * P.y)
    ```

---

## 2. Vị trí tương đối giữa Điểm và Đường thẳng

### 2.1 Khoảng cách từ điểm đến đường thẳng
Cho điểm $P(x_0, y_0)$ và đường thẳng $L: Ax + By + C = 0$. Khoảng cách hình học ngắn nhất từ $P$ đến $L$ được tính bằng công thức:
$$d = \frac{|A x_0 + B y_0 + C|}{\sqrt{A^2 + B^2}}$$

### 2.2 Điểm đối xứng qua đường thẳng
Để tìm điểm đối xứng $P'$ của điểm $P(x_0, y_0)$ qua đường thẳng $L: Ax + By + C = 0$:
1. Hình chiếu vuông góc $H(x_H, y_H)$ của $P$ lên $L$ lệch một lượng tỉ lệ với vectơ pháp tuyến $\vec{n} = (A, B)$:
   $$H = P - t \cdot \vec{n}, \quad \text{với } t = \frac{A x_0 + B y_0 + C}{A^2 + B^2}$$
2. Điểm đối xứng $P'$ thỏa mãn $H$ là trung điểm của $PP'$:
   $$P' = 2H - P = P - 2 \cdot t \cdot \vec{n}$$
   $$x_{P'} = x_0 - \frac{2A(A x_0 + B y_0 + C)}{A^2 + B^2}$$
   $$y_{P'} = y_0 - \frac{2B(A x_0 + B y_0 + C)}{A^2 + B^2}$$

=== "C++"

    ```cpp
    // Khoảng cách từ điểm đến đường thẳng
    double pointToLine(Point P, Line L) {
        return abs(L.A * P.x + L.B * P.y + L.C) / hypot(L.A, L.B);
    }

    // Tìm điểm đối xứng qua đường thẳng
    Point reflectPoint(Point P, Line L) {
        double d = (L.A * P.x + L.B * P.y + L.C) / (L.A * L.A + L.B * L.B);
        return {P.x - 2.0 * L.A * d, P.y - 2.0 * L.B * d};
    }
    ```

=== "Python"

    ```python
    import math

    def point_to_line(P, L):
        return abs(L.A * P.x + L.B * P.y + L.C) / math.hypot(L.A, L.B)

    def reflect_point(P, L):
        d = (L.A * P.x + L.B * P.y + L.C) / (L.A**2 + L.B**2)
        return Point(P.x - 2.0 * L.A * d, P.y - 2.0 * L.B * d)
    ```

---

## 3. Giao điểm của hai đường thẳng

Cho hai đường thẳng $L_1: A_1 x + B_1 y + C_1 = 0$ và $L_2: A_2 x + B_2 y + C_2 = 0$.

### 3.1 Phân tích điều kiện giao nhau (Định thức Cramer)
Hệ phương trình xác định giao điểm:
$$\begin{cases} A_1 x + B_1 y = -C_1 \\ A_2 x + B_2 y = -C_2 \end{cases}$$
Ta tính các định thức:
$$D = A_1 B_2 - A_2 B_1, \quad D_x = B_1 C_2 - B_2 C_1, \quad D_y = C_1 A_2 - C_2 A_1$$

- **$D \neq 0$:** Hai đường thẳng cắt nhau tại $1$ điểm duy nhất:
  $$x = \frac{D_x}{D}, \quad y = \frac{D_y}{D}$$
- **$D = 0$:**
  - Nếu $D_x = 0$ (hoặc $D_y = 0$): Hai đường thẳng **trùng nhau** (vô số giao điểm).
  - Nếu $D_x \neq 0$ (hoặc $D_y \neq 0$): Hai đường thẳng **song song** (không có giao điểm).

```matplotlib
plt.figure(figsize=(9, 7))

# Line 1: y = x + 1  =>  x - y + 1 = 0
x1 = np.linspace(-2, 5, 100)
y1 = x1 + 1
plt.plot(x1, y1, color='#e74c3c', linewidth=2, label='$L_1: y = x + 1$')

# Line 2: y = -0.5x + 4  =>  0.5x + y - 4 = 0
y2 = -0.5 * x1 + 4
plt.plot(x1, y2, color='#3498db', linewidth=2, label='$L_2: y = -\\frac{1}{2}x + 4$')

# Line 3: y = 2x - 2  =>  2x - y - 2 = 0
y3 = 2 * x1 - 2
plt.plot(x1, y3, color='#2ecc71', linewidth=2, label='$L_3: y = 2x - 2$')

# Intersection points
# L1 & L2: x+1 = -0.5x+4 => 1.5x=3 => x=2, y=3
plt.plot(2, 3, 'o', color='#f39c12', markersize=10, zorder=5)
plt.annotate('Giao (2, 3)', (2, 3), textcoords="offset points",
             xytext=(10, 10), fontsize=10, fontweight='bold', color='#f39c12')

# L1 & L3: x+1 = 2x-2 => x=3, y=4
plt.plot(3, 4, 'o', color='#f39c12', markersize=10, zorder=5)
plt.annotate('Giao (3, 4)', (3, 4), textcoords="offset points",
             xytext=(10, -15), fontsize=10, fontweight='bold', color='#f39c12')

# L2 & L3: -0.5x+4 = 2x-2 => 2.5x=6 => x=2.4, y=2.8
ix, iy = 2.4, 2.8
plt.plot(ix, iy, 'o', color='#f39c12', markersize=10, zorder=5)
plt.annotate('Giao (2.4, 2.8)', (ix, iy), textcoords="offset points",
             xytext=(-80, -20), fontsize=10, fontweight='bold', color='#f39c12')

# Point P with perpendicular distance to L2
P = (4.5, 1.0)
plt.plot(*P, 's', color='#9b59b6', markersize=10, zorder=5, label='Điểm P(4.5, 1)')

# Foot of perpendicular from P to L2: 0.5x + y - 4 = 0
# H = P - t * n, t = (0.5*4.5 + 1*1 - 4)/(0.25+1) = (2.25+1-4)/1.25 = -0.75/1.25 = -0.6
t = (0.5 * P[0] + 1 * P[1] - 4) / (0.25 + 1)
Hx = P[0] - 0.5 * t
Hy = P[1] - 1 * t
plt.plot([P[0], Hx], [P[1], Hy], '--', color='#9b59b6', linewidth=2)
plt.plot(Hx, Hy, 'D', color='#9b59b6', markersize=8, zorder=5)
plt.annotate('H', (Hx, Hy), textcoords="offset points",
             xytext=(8, 5), fontsize=10, color='#9b59b6')
plt.annotate('Khoảng cách d', ((P[0]+Hx)/2, (P[1]+Hy)/2),
             textcoords="offset points", xytext=(-60, 10), fontsize=9,
             color='#9b59b6', style='italic')

plt.xlim(-1.5, 5.5)
plt.ylim(-2.5, 6)
plt.xlabel('x', fontsize=12)
plt.ylabel('y', fontsize=12)
plt.title('Giao điểm đường thẳng & Khoảng cách từ điểm đến đường thẳng', fontsize=13)
plt.legend(loc='upper right', fontsize=10)
plt.grid(True, alpha=0.3)
plt.axhline(y=0, color='k', linewidth=0.5)
plt.axvline(x=0, color='k', linewidth=0.5)
plt.gca().set_aspect('equal', adjustable='box')
plt.tight_layout()
```

=== "C++"

    ```cpp
    // Trả về giao điểm, nếu song song hoặc trùng trả về điểm vô cùng {1e18, 1e18}
    Point lineIntersection(Line L1, Line L2) {
        double det = L1.A * L2.B - L2.A * L1.B;
        if (abs(det) < 1e-9) {
            return {1e18, 1e18}; 
        }
        double x = (L1.B * L2.C - L2.B * L1.C) / det;
        double y = (L1.C * L2.A - L2.C * L1.A) / det;
        return {x, y};
    }
    ```

=== "Python"

    ```python
    def line_intersection(L1, L2):
        det = L1.A * L2.B - L2.A * L1.B
        if abs(det) < 1e-9:
            return Point(1e18, 1e18)
        x = (L1.B * L2.C - L2.B * L1.C) / det
        y = (L1.C * L2.A - L2.C * L1.A) / det
        return Point(x, y)
    ```

---

## 4. Giao điểm của hai đoạn thẳng

**Bài toán:** Cho đoạn thẳng $AB$ và đoạn thẳng $CD$. Hãy kiểm tra xem hai đoạn thẳng này có cắt nhau không, và tìm tọa độ giao điểm nếu có.

### 4.1 Thuật toán sử dụng Tích có hướng (Cross Product)
Ta định nghĩa phép tính tích có hướng của hai vectơ $\vec{u}$ và $\vec{v}$:
$$\vec{u} \times \vec{v} = u_x v_y - u_y v_x$$
Về mặt hình học, tích có hướng cho biết hướng quay của vectơ.

Hai đoạn thẳng $AB$ và $CD$ giao nhau khi và chỉ khi:
1. Hai điểm $C$ và $D$ nằm về hai phía khác nhau đối với đường thẳng chứa đoạn $AB$.
2. Hai điểm $A$ và $B$ nằm về hai phía khác nhau đối với đường thẳng chứa đoạn $CD$.

Điều này tương đương với:
$$((\vec{AB} \times \vec{AC}) \cdot (\vec{AB} \times \vec{AD}) \le 0) \quad \land \quad ((\vec{CD} \times \vec{CA}) \cdot (\vec{CD} \times \vec{CB}) \le 0)$$

*Lưu ý trường hợp đặc biệt:* Khi tích có hướng bằng $0$, tức là điểm nằm thẳng hàng với đoạn thẳng, ta cần dùng hàm `on_segment` để kiểm tra điểm đó có thực sự nằm đè lên đoạn thẳng kia hay không.

=== "C++"

    ```cpp
    double cross(Point A, Point B) {
        return A.x * B.y - A.y * B.x;
    }

    Point subtract(Point A, Point B) {
        return {A.x - B.x, A.y - B.y};
    }

    bool onSegment(Point A, Point B, Point P) {
        return min(A.x, B.x) <= P.x + 1e-9 && P.x <= max(A.x, B.x) + 1e-9 &&
               min(A.y, B.y) <= P.y + 1e-9 && P.y <= max(A.y, B.y) + 1e-9;
    }

    bool segmentsIntersect(Point A, Point B, Point C, Point D) {
        double d1 = cross(subtract(B, A), subtract(C, A));
        double d2 = cross(subtract(B, A), subtract(D, A));
        double d3 = cross(subtract(D, C), subtract(A, C));
        double d4 = cross(subtract(D, C), subtract(B, C));

        if (((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) &&
            ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0))) {
            return true;
        }

        if (abs(d1) < 1e-9 && onSegment(A, B, C)) return true;
        if (abs(d2) < 1e-9 && onSegment(A, B, D)) return true;
        if (abs(d3) < 1e-9 && onSegment(C, D, A)) return true;
        if (abs(d4) < 1e-9 && onSegment(C, D, B)) return true;

        return false;
    }
    ```

=== "Python"

    ```python
    def cross(A, B):
        return A.x * B.y - A.y * B.x

    def subtract(A, B):
        return Point(A.x - B.x, A.y - B.y)

    def on_segment(A, B, P):
        return (min(A.x, B.x) <= P.x + 1e-9 <= max(A.x, B.x) + 1e-9 and
                min(A.y, B.y) <= P.y + 1e-9 <= max(A.y, B.y) + 1e-9)

    def segments_intersect(A, B, C, D):
        d1 = cross(subtract(B, A), subtract(C, A))
        d2 = cross(subtract(B, A), subtract(D, A))
        d3 = cross(subtract(D, C), subtract(A, C))
        d4 = cross(subtract(D, C), subtract(B, C))

        if (((d1 > 0 and d2 < 0) or (d1 < 0 and d2 > 0)) and
            ((d3 > 0 and d4 < 0) or (d3 < 0 and d4 > 0))):
            return True

        if abs(d1) < 1e-9 and on_segment(A, B, C): return True
        if abs(d2) < 1e-9 and on_segment(A, B, D): return True
        if abs(d3) < 1e-9 and on_segment(C, D, A): return True
        if abs(d4) < 1e-9 and on_segment(C, D, B): return True

        return False
    ```

---

## 5. Khoảng cách ngắn nhất giữa các đối tượng hình học

### 5.1 Khoảng cách từ điểm $P$ đến đoạn thẳng $AB$
Để tính khoảng cách ngắn nhất từ $P$ đến đoạn thẳng $AB$:
1. Tìm hình chiếu vuông góc $H$ của $P$ trên đường thẳng $AB$.
2. Nếu hình chiếu $H$ nằm trong đoạn $AB$ (tương đương góc $\angle PAB$ và $\angle PBA$ đều nhọn), khoảng cách cần tìm là đoạn vuông góc $PH$.
3. Nếu $H$ nằm ngoài đoạn $AB$, khoảng cách ngắn nhất là khoảng cách từ $P$ tới đầu mút gần hơn (tức là $\min(PA, PB)$).

=== "C++"

    ```cpp
    double pointToSegment(Point P, Point A, Point B) {
        double d2 = (B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y);
        if (d2 < 1e-9) {
            return hypot(P.x - A.x, P.y - A.y); // A và B trùng nhau
        }
        
        // Tính tỷ lệ chiếu t
        double t = ((P.x - A.x) * (B.x - A.x) + (P.y - A.y) * (B.y - A.y)) / d2;
        t = max(0.0, min(1.0, t)); // Giới hạn t trong đoạn [0, 1] để hình chiếu nằm trên đoạn thẳng

        Point proj = {A.x + t * (B.x - A.x), A.y + t * (B.y - A.y)};
        return hypot(P.x - proj.x, P.y - proj.y);
    }
    ```

=== "Python"

    ```python
    def point_to_segment(P, A, B):
        d2 = (B.x - A.x)**2 + (B.y - A.y)**2
        if d2 < 1e-9:
            return math.hypot(P.x - A.x, P.y - A.y)
            
        t = ((P.x - A.x) * (B.x - A.x) + (P.y - A.y) * (B.y - A.y)) / d2
        t = max(0.0, min(1.0, t))
        
        proj_x = A.x + t * (B.x - A.x)
        proj_y = A.y + t * (B.y - A.y)
        return math.hypot(P.x - proj_x, P.y - proj_y)
    ```

---

## 6. Diện tích đa giác (Công thức Shoelace / Gauss)

**Bài toán:** Cho một đa giác gồm $n$ đỉnh được liệt kê theo thứ tự ngược chiều kim đồng hồ (hoặc cùng chiều): $(x_1, y_1), (x_2, y_2), \dots, (x_n, y_n)$. Hãy tính diện tích bề mặt của đa giác đó.

### Công thức tổng quát
$$S = \frac{1}{2} \left| \sum_{i=1}^{n} (x_i y_{i+1} - x_{i+1} y_i) \right|$$
Với quy ước đỉnh thứ $n+1$ trùng với đỉnh thứ $1$: $(x_{n+1}, y_{n+1}) = (x_1, y_1)$.

=== "C++"

    ```cpp
    double polygonArea(const vector<Point>& poly) {
        int n = poly.size();
        double area = 0.0;
        for (int i = 0; i < n; i++) {
            int j = (i + 1) % n;
            area += poly[i].x * poly[j].y - poly[j].x * poly[i].y;
        }
        return abs(area) / 2.0;
    }
    ```

=== "Python"

    ```python
    def polygon_area(poly):
        n = len(poly)
        area = 0.0
        for i in range(n):
            j = (i + 1) % n
            area += poly[i].x * poly[j].y - poly[j].x * poly[i].y
        return abs(area) / 2.0
    ```

---

## 7. Bài tập luyện tập và Lời giải chi tiết

### Bài 1: Giao hai đường thẳng
**Đề bài:** Cho hai đường thẳng $L_1: A_1 x + B_1 y + C_1 = 0$ và $L_2: A_2 x + B_2 y + C_2 = 0$. Tìm điểm giao của hai đường thẳng, hoặc in ra `PARALLEL` (song song) hoặc `IDENTICAL` (trùng nhau).
**Độ khó:** ★★☆

??? tip "Lời giải"
    Sử dụng phương pháp Cramer để tính định thức và kiểm tra các điều kiện.

    === "C++"

        ```cpp
        #include <bits/stdc++.h>
        using namespace std;

        int main() {
            double A1, B1, C1, A2, B2, C2;
            if (cin >> A1 >> B1 >> C1 >> A2 >> B2 >> C2) {
                double det = A1 * B2 - A2 * B1;
                if (abs(det) < 1e-9) {
                    // Kiểm tra tỷ lệ hệ số tự do
                    if (abs(A1 * C2 - A2 * C1) < 1e-9 && abs(B1 * C2 - B2 * C1) < 1e-9) {
                        cout << "IDENTICAL\n";
                    } else {
                        cout << "PARALLEL\n";
                    }
                } else {
                    double x = (B1 * C2 - B2 * C1) / det;
                    double y = (C1 * A2 - C2 * A1) / det;
                    cout << fixed << setprecision(3) << x << " " << y << "\n";
                }
            }
            return 0;
        }
        ```

    === "Python"

        ```python
        import sys

        def main():
            input = sys.stdin.read
            data = input().split()
            if not data:
                return
            A1, B1, C1, A2, B2, C2 = map(float, data)
            det = A1 * B2 - A2 * B1
            if abs(det) < 1e-9:
                # Kiểm tra trùng nhau
                if abs(A1 * C2 - A2 * C1) < 1e-9 and abs(B1 * C2 - B2 * C1) < 1e-9:
                    print("IDENTICAL")
                else:
                    print("PARALLEL")
            else:
                x = (B1 * C2 - B2 * C1) / det
                y = (C1 * A2 - C2 * A1) / det
                print(f"{x:.3f} {y:.3f}")

        if __name__ == '__main__':
            main()
        ```

---

### Bài 2: Khoảng cách từ điểm tới đường thẳng
**Đề bài:** Cho điểm $P(x_0, y_0)$ và đường thẳng $L: Ax + By + C = 0$. Hãy tính khoảng cách từ $P$ tới $L$.
**Độ khó:** ★☆☆

??? tip "Lời giải"
    Áp dụng trực tiếp công thức: $d = \frac{|A x_0 + B y_0 + C|}{\sqrt{A^2 + B^2}}$.

    === "C++"

        ```cpp
        #include <bits/stdc++.h>
        using namespace std;

        int main() {
            double x0, y0, A, B, C;
            if (cin >> x0 >> y0 >> A >> B >> C) {
                double dist = abs(A * x0 + B * y0 + C) / hypot(A, B);
                cout << fixed << setprecision(4) << dist << "\n";
            }
            return 0;
        }
        ```

    === "Python"

        ```python
        import sys
        import math

        def main():
            input = sys.stdin.read
            data = input().split()
            if not data:
                return
            x0, y0, A, B, C = map(float, data)
            dist = abs(A * x0 + B * y0 + C) / math.hypot(A, B)
            print(f"{dist:.4f}")

        if __name__ == '__main__':
            main()
        ```

---

### Bài 3: Khoảng cách giữa hai đoạn thẳng
**Đề bài:** Cho hai đoạn thẳng $AB$ và $CD$ được xác định bởi tọa độ các đầu mút. Hãy tính khoảng cách ngắn nhất giữa hai đoạn thẳng này.
**Độ khó:** ★★★☆

??? tip "Lời giải"
    Kiểm tra xem hai đoạn thẳng có cắt nhau không. 
    - Nếu cắt nhau, khoảng cách bằng $0.0$.
    - Nếu không cắt nhau, khoảng cách ngắn nhất chính là giá trị nhỏ nhất của các khoảng cách từ đầu mút của đoạn này tới đoạn thẳng kia: $\min(\text{dist}(A, CD), \text{dist}(B, CD), \text{dist}(C, AB), \text{dist}(D, AB))$.

    === "C++"

        ```cpp
        #include <bits/stdc++.h>
        using namespace std;

        struct Point {
            double x, y;
        };

        double cross(Point A, Point B) {
            return A.x * B.y - A.y * B.x;
        }

        Point sub(Point A, Point B) {
            return {A.x - B.x, A.y - B.y};
        }

        bool onSeg(Point A, Point B, Point P) {
            return min(A.x, B.x) <= P.x + 1e-9 && P.x <= max(A.x, B.x) + 1e-9 &&
                   min(A.y, B.y) <= P.y + 1e-9 && P.y <= max(A.y, B.y) + 1e-9;
        }

        bool intersect(Point A, Point B, Point C, Point D) {
            double d1 = cross(sub(B, A), sub(C, A));
            double d2 = cross(sub(B, A), sub(D, A));
            double d3 = cross(sub(D, C), sub(A, C));
            double d4 = cross(sub(D, C), sub(B, C));

            if (((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) &&
                ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0))) return true;

            if (abs(d1) < 1e-9 && onSeg(A, B, C)) return true;
            if (abs(d2) < 1e-9 && onSeg(A, B, D)) return true;
            if (abs(d3) < 1e-9 && onSeg(C, D, A)) return true;
            if (abs(d4) < 1e-9 && onSeg(C, D, B)) return true;
            return false;
        }

        double pointToSeg(Point P, Point A, Point B) {
            double d2 = (B.x - A.x)*(B.x - A.x) + (B.y - A.y)*(B.y - A.y);
            if (d2 < 1e-9) return hypot(P.x - A.x, P.y - A.y);
            double t = ((P.x - A.x)*(B.x - A.x) + (P.y - A.y)*(B.y - A.y)) / d2;
            t = max(0.0, min(1.0, t));
            Point proj = {A.x + t * (B.x - A.x), A.y + t * (B.y - A.y)};
            return hypot(P.x - proj.x, P.y - proj.y);
        }

        int main() {
            Point A, B, C, D;
            if (cin >> A.x >> A.y >> B.x >> B.y >> C.x >> C.y >> D.x >> D.y) {
                if (intersect(A, B, C, D)) {
                    cout << "0.0000\n";
                } else {
                    double d1 = pointToSeg(A, C, D);
                    double d2 = pointToSeg(B, C, D);
                    double d3 = pointToSeg(C, A, B);
                    double d4 = pointToSeg(D, A, B);
                    cout << fixed << setprecision(4) << min({d1, d2, d3, d4}) << "\n";
                }
            }
            return 0;
        }
        ```

    === "Python"

        ```python
        import sys
        import math

        class Point:
            def __init__(self, x, y):
                self.x = x
                self.y = y

        def cross(A, B):
            return A.x * B.y - A.y * B.x

        def sub(A, B):
            return Point(A.x - B.x, A.y - B.y)

        def on_seg(A, B, P):
            return (min(A.x, B.x) <= P.x + 1e-9 <= max(A.x, B.x) + 1e-9 and
                    min(A.y, B.y) <= P.y + 1e-9 <= max(A.y, B.y) + 1e-9)

        def intersect(A, B, C, D):
            d1 = cross(sub(B, A), sub(C, A))
            d2 = cross(sub(B, A), sub(D, A))
            d3 = cross(sub(D, C), sub(A, C))
            d4 = cross(sub(D, C), sub(B, C))

            if (((d1 > 0 and d2 < 0) or (d1 < 0 and d2 > 0)) and
                ((d3 > 0 and d4 < 0) or (d3 < 0 and d4 > 0))):
                return True

            if abs(d1) < 1e-9 and on_seg(A, B, C): return True
            if abs(d2) < 1e-9 and on_seg(A, B, D): return True
            if abs(d3) < 1e-9 and on_seg(C, D, A): return True
            if abs(d4) < 1e-9 and on_seg(C, D, B): return True
            return False

        def point_to_seg(P, A, B):
            d2 = (B.x - A.x)**2 + (B.y - A.y)**2
            if d2 < 1e-9:
                return math.hypot(P.x - A.x, P.y - A.y)
            t = ((P.x - A.x) * (B.x - A.x) + (P.y - A.y) * (B.y - A.y)) / d2
            t = max(0.0, min(1.0, t))
            proj_x = A.x + t * (B.x - A.x)
            proj_y = A.y + t * (B.y - A.y)
            return math.hypot(P.x - proj_x, P.y - proj_y)

        def main():
            input = sys.stdin.read
            data = input().split()
            if not data:
                return
            ax, ay, bx, by, cx, cy, dx, dy = map(float, data)
            A = Point(ax, ay)
            B = Point(bx, by)
            C = Point(cx, cy)
            D = Point(dx, dy)

            if intersect(A, B, C, D):
                print("0.0000")
            else:
                d1 = point_to_seg(A, C, D)
                d2 = point_to_seg(B, C, D)
                d3 = point_to_seg(C, A, B)
                d4 = point_to_seg(D, A, B)
                print(f"{min(d1, d2, d3, d4):.4f}")

        if __name__ == '__main__':
            main()
        ```

---

### Bài 4: Tính diện tích đa giác
**Đề bài:** Cho một đa giác lồi hoặc lõm gồm $n$ đỉnh. Hãy tính diện tích bề mặt của đa giác đó.
**Độ khó:** ★★☆

??? tip "Lời giải"
    Áp dụng trực tiếp công thức Shoelace: $S = \frac{1}{2} | \sum (x_i y_{i+1} - x_{i+1} y_i) |$.

    === "C++"

        ```cpp
        #include <bits/stdc++.h>
        using namespace std;

        struct Point {
            double x, y;
        };

        int main() {
            int n;
            if (cin >> n) {
                vector<Point> poly(n);
                for (int i = 0; i < n; i++) {
                    cin >> poly[i].x >> poly[i].y;
                }
                double area = 0.0;
                for (int i = 0; i < n; i++) {
                    int j = (i + 1) % n;
                    area += poly[i].x * poly[j].y - poly[j].x * poly[i].y;
                }
                cout << fixed << setprecision(2) << abs(area) / 2.0 << "\n";
            }
            return 0;
        }
        ```

    === "Python"

        ```python
        import sys

        class Point:
            def __init__(self, x, y):
                self.x = x
                self.y = y

        def main():
            input = sys.stdin.read
            data = input().split()
            if not data:
                return
            n = int(data[0])
            poly = []
            idx = 1
            for _ in range(n):
                poly.append(Point(float(data[idx]), float(data[idx+1])))
                idx += 2
            
            area = 0.0
            for i in range(n):
                j = (i + 1) % n
                area += poly[i].x * poly[j].y - poly[j].x * poly[i].y
            print(f"{abs(area) / 2.0:.2f}")

        if __name__ == '__main__':
            main()
        ```