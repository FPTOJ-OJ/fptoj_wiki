# Bài 60: Hình Học Đường Tròn

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** CP-Algorithms, VNOI Wiki

## 1. Phương trình đường tròn

### 1.1 Dạng tổng quát

Đường tròn tâm $(a, b)$, bán kính $r$:

$$(x - a)^2 + (y - b)^2 = r^2$$

### 1.2 Dạng khai triển

$$x^2 + y^2 - 2ax - 2by + (a^2 + b^2 - r^2) = 0$$

Viết gọn: $x^2 + y^2 + Dx + Ey + F = 0$ với $D = -2a, E = -2b, F = a^2 + b^2 - r^2$.

### 1.3 Xác định từ 3 điểm

Cho 3 điểm không thẳng hàng, tìm đường tròn đi qua 3 điểm (đường tròn ngoại tiếp).

=== "C++"

    ```cpp
    struct Circle {
        double x, y, r;
    };

    Circle circumCircle(Point A, Point B, Point C) {
        double a = B.x - A.x, b = B.y - A.y;
        double c = C.x - A.x, d = C.y - A.y;
        double e = a * (A.x + B.x) + b * (A.y + B.y);
        double f = c * (A.x + C.x) + d * (A.y + C.y);
        double g = 2.0 * (a * (C.y - B.y) - b * (C.x - B.x));
        if (abs(g) < 1e-9) return {0, 0, -1}; // 3 điểm thẳng hàng
        double cx = (d * e - b * f) / g;
        double cy = (a * f - c * e) / g;
        double r = sqrt((A.x - cx) * (A.x - cx) + (A.y - cy) * (A.y - cy));
        return {cx, cy, r};
    }
    ```

---

## 2. Vị trí tương đối điểm - đường tròn

### 2.1 Khoảng cách điểm đến tâm

Cho điểm $P$ và đường tròn tâm $O$, bán kính $r$:

```
d = |OP|
d < r  → P nằm TRONG đường tròn
d = r  → P nằm TRÊN đường tròn
d > r  → P nằm NGOÀI đường tròn
```

### 2.2 Kiểm tra điểm nằm trong đường tròn

=== "C++"

    ```cpp
    bool pointInCircle(Point P, Circle C) {
        double d = (P.x - C.x) * (P.x - C.x) + (P.y - C.y) * (P.y - C.y);
        return d <= C.r * C.r + 1e-9;
    }
    ```

---

## 3. Tiếp tuyến từ điểm đến đường tròn

### 3.1 Bài toán

Cho điểm $P$ ngoài đường tròn tâm $O$, bán kính $r$. Tìm các tiếp tuyến từ $P$ đến đường tròn.

### 3.2 Công thức

Khoảng cách $d = |PO|$. Độ dài tiếp tuyến:

$$l = \sqrt{d^2 - r^2}$$

Góc giữa $PO$ và tiếp tuyến: $\sin(\alpha) = r/d$

=== "C++"

    ```cpp
    // Trả về 2 điểm tiếp xúc
    pair<Point,Point> tangentPoints(Point P, Circle C) {
        double d = sqrt((P.x - C.x) * (P.x - C.x) + (P.y - C.y) * (P.y - C.y));
        if (d < C.r - 1e-9) return {{0,0},{0,0}}; // P trong đường tròn

        Point O = {C.x, C.y};
        double alpha = asin(C.r / d);
        double beta = atan2(P.y - O.y, P.x - O.x);

        double t1 = beta + alpha, t2 = beta - alpha;
        Point T1 = {O.x + C.r * cos(t1), O.y + C.r * sin(t1)};
        Point T2 = {O.x + C.r * cos(t2), O.y + C.r * sin(t2)};
        return {T1, T2};
    }
    ```

---

## 4. Giao hai đường tròn

### 4.1 Các trường hợp

Cho hai đường tròn $C_1(tam O_1, r_1)$ và $C_2(tam O_2, r_2)$, $d = |O_1 O_2|$:

```
d > r1 + r2         → Không giao (rời nhau)
d = r1 + r2         → Tiếp xúc ngoài (1 điểm giao)
|r1 - r2| < d < r1+r2 → Giao nhau (2 điểm)
d = |r1 - r2|       → Tiếp xúc trong (1 điểm)
d < |r1 - r2|       → Không giao (nằm trong nhau)
d = 0 && r1 = r2    → Trùng nhau (vô số điểm)
```

### 4.2 Tìm điểm giao

=== "C++"

    ```cpp
    vector<Point> circleCircleIntersection(Circle C1, Circle C2) {
        double d = sqrt((C1.x - C2.x) * (C1.x - C2.x) + (C1.y - C2.y) * (C1.y - C2.y));
        if (d > C1.r + C2.r + 1e-9) return {};     // Rời nhau
        if (d < abs(C1.r - C2.r) - 1e-9) return {}; // Nằm trong nhau

        double a = (C1.r * C1.r - C2.r * C2.r + d * d) / (2 * d);
        double h = sqrt(max(0.0, C1.r * C1.r - a * a));

        double mx = C1.x + a * (C2.x - C1.x) / d;
        double my = C1.y + a * (C2.y - C1.y) / d;

        if (h < 1e-9) return {{mx, my}}; // Tiếp xúc 1 điểm

        double rx = -h * (C2.y - C1.y) / d;
        double ry = h * (C2.x - C1.x) / d;
        return {{mx + rx, my + ry}, {mx - rx, my - ry}};
    }
    ```

---

## 5. Đường tròn ngoại tiếp tam giác

### 5.1 Định nghĩa

Đường tròn đi qua cả 3 đỉnh của tam giác. Tâm = giao 3 đường trung trực.

### 5.2 Bán kính ngoại tiếp

$$R = \frac{abc}{4S}$$

với $a, b, c$ là 3 cạnh, $S$ là diện tích tam giác.

=== "C++"

    ```cpp
    double circumradius(double a, double b, double c) {
        double s = (a + b + c) / 2;
        double area = sqrt(s * (s - a) * (s - b) * (s - c)); // Heron
        return a * b * c / (4 * area);
    }
    ```

---

## 6. Đường tròn nội tiếp tam giác

### 6.1 Định nghĩa

Đường tròn tiếp xúc cả 3 cạnh của tam giác. Tâm = giao 3 đường phân giác.

### 6.2 Bán kính nội tiếp

$$r = \frac{S}{s}$$

với $S$ là diện tích, $s = (a+b+c)/2$ là nửa chu vi.

=== "C++"

    ```cpp
    double inradius(double a, double b, double c) {
        double s = (a + b + c) / 2;
        double area = sqrt(s * (s - a) * (s - b) * (s - c));
        return area / s;
    }
    ```

---

## 7. Diện tích giao hai đường tròn

### 7.1 Công thức

Cho hai đường tròn bán kính $r_1, r_2$, khoảng cách tâm $d$:

$$S = r_1^2 \cos^{-1}\left(\frac{d^2 + r_1^2 - r_2^2}{2dr_1}\right) + r_2^2 \cos^{-1}\left(\frac{d^2 + r_2^2 - r_1^2}{2dr_2}\right) - \frac{1}{2}\sqrt{(-d+r_1+r_2)(d+r_1-r_2)(d-r_1+r_2)(d+r_1+r_2)}$$

=== "C++"

    ```cpp
    double circleIntersectionArea(Circle C1, Circle C2) {
        double d = sqrt((C1.x - C2.x) * (C1.x - C2.x) + (C1.y - C2.y) * (C1.y - C2.y));
        if (d >= C1.r + C2.r) return 0.0;          // Không giao
        if (d + min(C1.r, C2.r) <= max(C1.r, C2.r)) {
            double r = min(C1.r, C2.r);
            return M_PI * r * r;                    // Nằm trong nhau
        }
        double r1 = C1.r, r2 = C2.r;
        double alpha = acos((d*d + r1*r1 - r2*r2) / (2*d*r1));
        double beta  = acos((d*d + r2*r2 - r1*r1) / (2*d*r2));
        return r1*r1*alpha + r2*r2*beta - 0.5*sqrt((-d+r1+r2)*(d+r1-r2)*(d-r1+r2)*(d+r1+r2));
    }
    ```

---

## 8. Bài tập luyện tập

### Bài 1: Kiểm tra điểm trong đường tròn

**Đề bài:** Cho $q$ truy vấn. Mỗi truy vấn cho tọa độ điểm $P(x,y)$ và đường tròn tâm $O(a,b)$ bán kính $r$. Kiểm tra $P$ có nằm trong (hoặc trên) đường tròn không.

**Input:**
- Dòng 1: số nguyên $q$ $(1 \leq q \leq 10^5)$
- $q$ dòng: 5 số $x, y, a, b, r$ $(|x|,|y|,|a|,|b| \leq 10^9, 1 \leq r \leq 10^9)$

**Output:** Với mỗi truy vấn, in `YES` nếu $P$ nằm trong đường tròn, `NO` nếu không.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `3`<br>`0 0 0 0 5`<br>`3 4 0 0 5`<br>`6 0 0 0 5` | `YES`<br>`YES`<br>`NO` |

??? tip "Lời giải"
    Kiểm tra $(x-a)^2 + (y-b)^2 \leq r^2$. Dùng long long để tránh tràn.
    
    === "C++"
    
        ```cpp
        #include <bits/stdc++.h>
        using namespace std;
        int main() {
            int q; cin >> q;
            while (q--) {
                long long x, y, a, b, r;
                cin >> x >> y >> a >> b >> r;
                long long dx = x - a, dy = y - b;
                cout << (dx * dx + dy * dy <= r * r ? "YES" : "NO") << "\n";
            }
        }
        ```
---

### Bài 2: Giao hai đường tròn

**Đề bài:** Cho 2 đường tròn $C_1(a_1, b_1, r_1)$ và $C_2(a_2, b_2, r_2)$. Xác định số điểm giao của chúng.

**Input:** 6 số nguyên $a_1, b_1, r_1, a_2, b_2, r_2$ $(1 \leq r_1, r_2 \leq 10^9)$

**Output:** Số điểm giao (0, 1, 2, hoặc -1 nếu trùng nhau).

**Ví dụ:**

| Input | Output |
|-------|--------|
| `0 0 5 8 0 5` | `2` |
| `0 0 3 0 7 2` | `0` |
| `0 0 5 3 4 5` | `-1` |

??? tip "Lời giải"
    So sánh $d = |O_1O_2|$ với $r_1 + r_2$ và $|r_1 - r_2|$.
    
    === "C++"
    
        ```cpp
        #include <bits/stdc++.h>
        using namespace std;
        int main() {
            long long x1, y1, r1, x2, y2, r2;
            cin >> x1 >> y1 >> r1 >> x2 >> y2 >> r2;
            long long dx = x1 - x2, dy = y1 - y2;
            long long d2 = dx * dx + dy * dy;
            long long sum = r1 + r2, diff = abs(r1 - r2);
            if (d2 == 0 && r1 == r2) cout << -1 << "\n";
            else if (d2 > sum * sum || d2 < diff * diff) cout << 0 << "\n";
            else if (d2 == sum * sum || d2 == diff * diff) cout << 1 << "\n";
            else cout << 2 << "\n";
        }
        ```
---

### Bài 3: Ngoại tiếp tam giác

**Đề bài:** Cho 3 đỉnh tam giác $A(x_1,y_1), B(x_2,y_2), C(x_3,y_3)$. Tính bán kính đường tròn ngoại tiếp.

**Input:** 6 số thực $x_1, y_1, x_2, y_2, x_3, y_3$ $(|x_i|, |y_i| \leq 10^4)$

**Output:** Bán kính đường tròn ngoại tiếp, làm tròn 3 chữ số thập phân.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `0 0 3 0 0 4` | `2.500` |

**Giải thích:** Tam giác vuông cạnh 3-4-5, bán kính ngoại tiếp = 5/2 = 2.5.

??? tip "Lời giải"
    $R = \frac{abc}{4S}$ với $a,b,c$ là 3 cạnh, $S$ là diện tích (Heron).
    
    === "C++"
    
        ```cpp
        #include <bits/stdc++.h>
        using namespace std;
        int main() {
            double x1, y1, x2, y2, x3, y3;
            cin >> x1 >> y1 >> x2 >> y2 >> x3 >> y3;
            double a = hypot(x2 - x1, y2 - y1);
            double b = hypot(x3 - x2, y3 - y2);
            double c = hypot(x1 - x3, y1 - y3);
            double s = (a + b + c) / 2;
            double area = sqrt(s * (s - a) * (s - b) * (s - c));
            double R = a * b * c / (4 * area);
            cout << fixed << setprecision(3) << R << "\n";
        }
        ```
---

### Bài 4: Tiếp tuyến từ điểm

**Đề bài:** Cho điểm $P(x_0, y_0)$ ngoài đường tròn tâm $O(a,b)$ bán kính $r$. Tính độ dài tiếp tuyến từ $P$ đến đường tròn.

**Input:** 5 số thực $x_0, y_0, a, b, r$

**Output:** Độ dài tiếp tuyến, làm tròn 3 chữ số thập phân.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `5 0 0 0 3` | `4.000` |

**Giải thích:** $d = 5, r = 3$, tiếp tuyến = $\sqrt{25 - 9} = 4$.

??? tip "Lời giải"
    $l = \sqrt{d^2 - r^2}$ với $d = |PO|$.