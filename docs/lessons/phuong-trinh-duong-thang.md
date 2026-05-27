# Bài 61: Phương Trình Đường Thẳng & Giao Điểm

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** CP-Algorithms, VNOI Wiki

## 1. Các dạng phương trình đường thẳng

### 1.1 Dạng tổng quát

$$Ax + By + C = 0$$

Với $(A, B)$ là vector pháp tuyến (vuông góc với đường thẳng).

### 1.2 Dạng hệ số góc

$$y = kx + b$$

với $k$ là hệ số góc, $b$ là tung tại gốc.

Chuyển sang tổng quát: $kx - y + b = 0$ → $A = k, B = -1, C = b$.

### 1.3 Dạng tham số

$$\begin{cases} x = x_0 + t \cdot dx \\ y = y_0 + t \cdot dy \end{cases}$$

với $(x_0, y_0)$ là điểm trên đường thẳng, $(dx, dy)$ là vector hướng.

### 1.4 Chuyển đổi

=== "C++"

    ```cpp
    struct Line {
        double A, B, C; // Ax + By + C = 0
    };

    // Từ 2 điểm
    Line lineFromPoints(Point P, Point Q) {
        return {Q.y - P.y, P.x - Q.x, P.y * Q.x - P.x * Q.y};
    }

    // Từ điểm và vector pháp tuyến
    Line lineFromPointNormal(Point P, Point n) {
        return {n.x, n.y, -n.x * P.x - n.y * P.y};
    }
    ```

---

## 2. Vị trí tương đối điểm - đường thẳng

### 2.1 Khoảng cách điểm đến đường thẳng

Cho điểm $P(x_0, y_0)$ và đường thẳng $Ax + By + C = 0$:

$$d = \frac{|Ax_0 + By_0 + C|}{\sqrt{A^2 + B^2}}$$

=== "C++"

    ```cpp
    double pointToLine(Point P, Line L) {
        return abs(L.A * P.x + L.B * P.y + L.C) / sqrt(L.A * L.A + L.B * L.B);
    }
    ```

=== "Python"

    ```python
    def point_to_line(P, L):
        A, B, C = L
        return abs(A * P[0] + B * P[1] + C) / (A**2 + B**2)**0.5
    ```

### 2.2 Điểm đối xứng qua đường thẳng

=== "C++"

    ```cpp
    Point reflectPoint(Point P, Line L) {
        double d = (L.A * P.x + L.B * P.y + L.C) / (L.A * L.A + L.B * L.B);
        return {P.x - 2 * L.A * d, P.y - 2 * L.B * d};
    }
    ```

---

## 3. Giao hai đường thẳng

### 3.1 Điều kiện

Cho hai đường thẳng $L_1: A_1x + B_1y + C_1 = 0$ và $L_2: A_2x + B_2y + C_2 = 0$:

```
A1*B2 != A2*B1  → Giao nhau tại 1 điểm
A1*B2 == A2*B1:
  - A1*C2 == A2*C1 (hoặc B1*C2 == B2*C1) → Trùng nhau
  - Ngược lại → Song song
```

### 3.2 Tìm điểm giao

$$x = \frac{B_1 C_2 - B_2 C_1}{A_1 B_2 - A_2 B_1}, \quad y = \frac{C_1 A_2 - C_2 A_1}{A_1 B_2 - A_2 B_1}$$

=== "C++"

    ```cpp
    Point lineIntersection(Line L1, Line L2) {
        double det = L1.A * L2.B - L2.A * L1.B;
        if (abs(det) < 1e-9) return {1e18, 1e18}; // Song song hoặc trùng
        double x = (L1.B * L2.C - L2.B * L1.C) / det;
        double y = (L1.C * L2.A - L2.C * L1.A) / det;
        return {x, y};
    }
    ```

=== "Python"

    ```python
    def line_intersection(L1, L2):
        A1, B1, C1 = L1
        A2, B2, C2 = L2
        det = A1 * B2 - A2 * B1
        if abs(det) < 1e-9:
            return None  # Song song hoặc trùng
        x = (B1 * C2 - B2 * C1) / det
        y = (C1 * A2 - C2 * A1) / det
        return (x, y)
    ```

---

## 4. Giao hai đoạn thẳng

### 4.1 Bài toán

Cho đoạn $AB$ và đoạn $CD$. Kiểm tra chúng có giao nhau không, và tìm điểm giao nếu có.

### 4.2 Ý tưởng

Sử dụng cross product (Bài 22):
- Điểm $C, D$ nằm ở **hai phía** khác nhau của đường thẳng $AB$
- Điểm $A, B$ nằm ở **hai phía** khác nhau của đường thẳng $CD$

=== "C++"

    ```cpp
    // Kiểm tra 2 đoạn AB và CD có giao nhau không
    bool segmentsIntersect(Point A, Point B, Point C, Point D) {
        double d1 = cross(B - A, C - A);
        double d2 = cross(B - A, D - A);
        double d3 = cross(D - C, A - C);
        double d4 = cross(D - C, B - C);

        if (((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) &&
            ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0)))
            return true;

        // Trường hợp đặc biệt: điểm nằm trên đoạn
        auto onSegment = [](Point A, Point B, Point P) {
            return min(A.x, B.x) <= P.x + 1e-9 && P.x <= max(A.x, B.x) + 1e-9 &&
                   min(A.y, B.y) <= P.y + 1e-9 && P.y <= max(A.y, B.y) + 1e-9;
        };

        if (abs(d1) < 1e-9 && onSegment(A, B, C)) return true;
        if (abs(d2) < 1e-9 && onSegment(A, B, D)) return true;
        if (abs(d3) < 1e-9 && onSegment(C, D, A)) return true;
        if (abs(d4) < 1e-9 && onSegment(C, D, B)) return true;

        return false;
    }

    // Tìm điểm giao của 2 đoạn (nếu có)
    Point segmentIntersection(Point A, Point B, Point C, Point D) {
        Line L1 = lineFromPoints(A, B);
        Line L2 = lineFromPoints(C, D);
        return lineIntersection(L1, L2);
    }
    ```

---

## 5. Khoảng cách giữa các đối tượng

### 5.1 Khoảng cách điểm đến đoạn

Chiếu điểm $P$ lên đường thẳng chứa đoạn $AB$. Nếu hình chiếu nằm trong đoạn, khoảng cách = khoảng cách đến đường thẳng. Ngược lại = khoảng cách đến đầu đoạn gần hơn.

=== "C++"

    ```cpp
    double pointToSegment(Point P, Point A, Point B) {
        double d2 = (B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y);
        if (d2 < 1e-9) return sqrt((P.x - A.x) * (P.x - A.x) + (P.y - A.y) * (P.y - A.y));

        double t = ((P.x - A.x) * (B.x - A.x) + (P.y - A.y) * (B.y - A.y)) / d2;
        t = max(0.0, min(1.0, t));

        Point proj = {A.x + t * (B.x - A.x), A.y + t * (B.y - A.y)};
        return sqrt((P.x - proj.x) * (P.x - proj.x) + (P.y - proj.y) * (P.y - proj.y));
    }
    ```

### 5.2 Khoảng cách giữa 2 đoạn

=== "C++"

    ```cpp
    double segmentToSegment(Point A, Point B, Point C, Point D) {
        if (segmentsIntersect(A, B, C, D)) return 0.0;
        double d1 = pointToSegment(A, C, D);
        double d2 = pointToSegment(B, C, D);
        double d3 = pointToSegment(C, A, B);
        double d4 = pointToSegment(D, A, B);
        return min({d1, d2, d3, d4});
    }
    ```

---

## 6. Diện tích đa giác

### 6.1 Công thức Shoelace

Cho đa giác có $n$ đỉnh $(x_1, y_1), (x_2, y_2), \ldots, (x_n, y_n)$:

$$S = \frac{1}{2} \left| \sum_{i=1}^{n} (x_i y_{i+1} - x_{i+1} y_i) \right|$$

với $(x_{n+1}, y_{n+1}) = (x_1, y_1)$.

=== "C++"

    ```cpp
    double polygonArea(vector<Point>& poly) {
        int n = poly.size();
        double area = 0;
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
        area = 0
        for i in range(n):
            j = (i + 1) % n
            area += poly[i][0] * poly[j][1] - poly[j][0] * poly[i][1]
        return abs(area) / 2.0
    ```

---

## 7. Bài tập luyện tập

### Bài 1: Giao hai đường thẳng

**Đề bài:** Cho 2 đường thẳng $L_1: A_1x + B_1y + C_1 = 0$ và $L_2: A_2x + B_2y + C_2 = 0$. Tìm điểm giao hoặc xác định quan hệ (song song / trùng nhau).

**Input:** 6 số thực $A_1, B_1, C_1, A_2, B_2, C_2$ $(|A_i|, |B_i|, |C_i| \leq 10^4)$

**Output:** Nếu giao nhau: in tọa độ điểm giao (3 chữ số thập phân). Nếu song song: `PARALLEL`. Nếu trùng: `IDENTICAL`.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `1 -1 0`<br>`1 1 -4` | `2.000 2.000` |
| `1 -1 0`<br>`2 -2 1` | `PARALLEL` |

??? tip "Lời giải"
    Tính det $= A_1B_2 - A_2B_1$. Nếu det = 0 → song song hoặc trùng. Ngược lại → tính $x, y$ bằng công thức Cramer.
    
    === "C++"
    
        ```cpp
        #include <bits/stdc++.h>
        using namespace std;
        int main() {
            double A1, B1, C1, A2, B2, C2;
            cin >> A1 >> B1 >> C1 >> A2 >> B2 >> C2;
            double det = A1 * B2 - A2 * B1;
            if (abs(det) < 1e-9) {
                if (abs(A1 * C2 - A2 * C1) < 1e-9 && abs(B1 * C2 - B2 * C1) < 1e-9)
                    cout << "IDENTICAL\n";
                else
                    cout << "PARALLEL\n";
            } else {
                double x = (B1 * C2 - B2 * C1) / det;
                double y = (C1 * A2 - C2 * A1) / det;
                cout << fixed << setprecision(3) << x << " " << y << "\n";
            }
        }
        ```
---

### Bài 2: Khoảng cách điểm đến đường thẳng

**Đề bài:** Cho điểm $P(x_0, y_0)$ và đường thẳng $Ax + By + C = 0$. Tính khoảng cách từ $P$ đến đường thẳng.

**Input:** 5 số thực $x_0, y_0, A, B, C$

**Output:** Khoảng cách, làm tròn 4 chữ số thập phân.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `0 0 1 -1 0` | `0.0000` |
| `1 0 1 -1 0` | `0.7071` |

??? tip "Lời giải"
    $d = \frac{|Ax_0 + By_0 + C|}{\sqrt{A^2 + B^2}}$.
---

### Bài 3: Khoảng cách hai đoạn thẳng

**Đề bài:** Cho 2 đoạn $AB$ và $CD$. Tính khoảng cách nhỏ nhất giữa chúng.

**Input:** 8 số thực $x_A, y_A, x_B, y_B, x_C, y_C, x_D, y_D$

**Output:** Khoảng cách, làm tròn 4 chữ số thập phân.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `0 0 1 0`<br>`0 1 1 1` | `1.0000` |
| `0 0 1 1`<br>`0 1 1 0` | `0.0000` |

??? tip "Lời giải"
    Kiểm tra 2 đoạn có giao không (cross product). Nếu giao → 0. Nếu không → min khoảng cách từ 4 đầu đoạn đến đoạn còn lại.
---

### Bài 4: Diện tích đa giác

**Đề bài:** Cho đa giác lồi $n$ đỉnh. Tính diện tích.

**Input:**
- Dòng 1: số nguyên $n$ $(3 \leq n \leq 10^5)$
- $n$ dòng: 2 số thực $x_i, y_i$

**Output:** Diện tích, làm tròn 2 chữ số thập phân.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `4`<br>`0 0`<br>`4 0`<br>`4 3`<br>`0 3` | `12.00` |

??? tip "Lời giải"
    Công thức Shoelace: $S = \frac{1}{2}|\sum (x_i y_{i+1} - x_{i+1} y_i)|$.