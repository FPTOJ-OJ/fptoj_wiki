# Bài 62: Định Lý Pick & Đếm Điểm Nguyên

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** CP-Algorithms, VNOI Wiki

## 1. Định Lý Pick

### 1.1 Phát biểu

Cho đa giác lồi có đỉnh tại các điểm nguyên. Gọi:
- $I$ = số điểm nguyên **nằm trong** đa giác
- $B$ = số điểm nguyên **trên cạnh** đa giác
- $S$ = diện tích đa giác

Thì:

$$S = I + \frac{B}{2} - 1$$

Hoặc đổi ra:

$$I = S - \frac{B}{2} + 1$$

### 1.2 Ví dụ

Tam giác $(0,0), (4,0), (0,3)$:
- Diện tích: $S = \frac{1}{2} \cdot 4 \cdot 3 = 6$
- Điểm trên cạnh: $(0,0), (1,0), (2,0), (3,0), (4,0)$ → 5 điểm; $(0,0), (0,1), (0,2), (0,3)$ → 4 điểm; $(4,0), (3,1), (2,2), (1,3), (0,4)$ → không đúng... 
- Cạnh $(0,0)-(4,0)$: $\gcd(4, 0) + 1 = 5$ điểm
- Cạnh $(4,0)-(0,3)$: $\gcd(4, 3) + 1 = 2$ điểm
- Cạnh $(0,3)-(0,0)$: $\gcd(0, 3) + 1 = 4$ điểm
- $B = 5 + 2 + 4 - 3 = 8$ (trừ 3 đỉnh bị đếm trùng)
- $I = 6 - 8/2 + 1 = 3$

---

## 2. Đếm điểm nguyên trên đoạn

### 2.1 Công thức

Cho đoạn từ $(x_1, y_1)$ đến $(x_2, y_2)$, số điểm nguyên **trên đoạn** (bao gồm 2 đầu):

$$\gcd(|x_2 - x_1|, |y_2 - y_1|) + 1$$

### 2.2 Chứng minh

Gọi $dx = |x_2 - x_1|, dy = |y_2 - y_1|$. Các điểm nguyên trên đoạn có dạng:

$$(x_1 + t \cdot \frac{dx}{g}, y_1 + t \cdot \frac{dy}{g}) \quad \text{với } t = 0, 1, \ldots, g$$

với $g = \gcd(dx, dy)$. Có $g + 1$ điểm.

=== "C++"

    ```cpp
    int latticePointsOnSegment(Point A, Point B) {
        int dx = abs((int)B.x - (int)A.x);
        int dy = abs((int)B.y - (int)A.y);
        return __gcd(dx, dy) + 1;
    }
    ```

=== "Python"

    ```python
    from math import gcd

    def lattice_points_on_segment(A, B):
        dx = abs(B[0] - A[0])
        dy = abs(B[1] - A[1])
        return gcd(dx, dy) + 1
    ```

---

## 3. Đếm điểm nguyên trên chu vi đa giác

### 3.1 Công thức

Tổng số điểm nguyên trên tất cả cạnh, trừ đi các đỉnh bị đếm trùng:

$$B = \sum_{i=0}^{n-1} \gcd(|x_{i+1} - x_i|, |y_{i+1} - y_i|)$$

(không cộng 1 vì mỗi đỉnh được đếm bởi 2 cạnh kề)

=== "C++"

    ```cpp
    int latticePointsOnBoundary(vector<Point>& poly) {
        int n = poly.size();
        int B = 0;
        for (int i = 0; i < n; i++) {
            int j = (i + 1) % n;
            int dx = abs((int)poly[j].x - (int)poly[i].x);
            int dy = abs((int)poly[j].y - (int)poly[i].y);
            B += __gcd(dx, dy);
        }
        return B;
    }
    ```

=== "Python"

    ```python
    def lattice_points_on_boundary(poly):
        n = len(poly)
        B = 0
        for i in range(n):
            j = (i + 1) % n
            dx = abs(poly[j][0] - poly[i][0])
            dy = abs(poly[j][1] - poly[i][1])
            B += gcd(dx, dy)
        return B
    ```

---

## 4. Áp dụng Định lý Pick

### 4.1 Đếm điểm nguyên trong đa giác

=== "C++"

    ```cpp
    // Đếm điểm nguyên trong đa giác lồi (đỉnh nguyên)
    int latticePointsInside(vector<Point>& poly) {
        double area = polygonArea(poly);
        int B = latticePointsOnBoundary(poly);
        return (int)(area - B / 2.0 + 1 + 1e-9);
    }
    ```

### 4.2 Tổng hợp: Diện tích, điểm trong, điểm biên

=== "C++"

    ```cpp
    struct PickResult {
        double area;
        int interior;  // điểm nguyên bên trong
        int boundary;  // điểm nguyên trên cạnh
    };

    PickResult pickTheorem(vector<Point>& poly) {
        PickResult res;
        res.area = polygonArea(poly);
        res.boundary = latticePointsOnBoundary(poly);
        res.interior = (int)(res.area - res.boundary / 2.0 + 1 + 1e-9);
        return res;
    }
    ```

---

## 5. Bài toán đếm điểm nguyên trong tam giác

### 5.1 Tam giác có đỉnh nguyên

Áp dụng trực tiếp Định lý Pick.

### 5.2 Tam giác có đỉnh không nguyên

Cần dùng phương pháp khác. Một cách: tính diện tích chính xác bằng cross product, rồi đếm điểm nguyên bằng thuật toán sweep.

### 5.3 Công thức cho tam giác gốc

Tam giác $(0,0), (a,0), (0,b)$ với $a, b > 0$:

Số điểm nguyên bên trong (không tính trên cạnh):

$$I = \frac{(a-1)(b-1) - \gcd(a,b) + 1}{2}$$

---

## 6. Bài toán nâng cao

### 6.1 Đếm điểm nguyên trong hình tròn

Đếm số cặp $(x, y)$ nguyên sao cho $x^2 + y^2 \leq r^2$.

Duyệt $x$ từ $-r$ đến $r$, tính $y_{\max} = \lfloor\sqrt{r^2 - x^2}\rfloor$, đếm $2y_{\max} + 1$.

=== "C++"

    ```cpp
    int latticePointsInCircle(int r) {
        int cnt = 0;
        for (int x = -r; x <= r; x++) {
            int ymax = (int)sqrt((double)r * r - (double)x * x);
            cnt += 2 * ymax + 1;
        }
        return cnt;
    }
    ```

### 6.2 Đếm điểm nguyên trong hình chữ nhật

Hình chữ nhật từ $(x_1, y_1)$ đến $(x_2, y_2)$:

$$(x_2 - x_1 + 1) \times (y_2 - y_1 + 1)$$

---

## 7. Bài tập luyện tập

### Bài 1: Đếm điểm nguyên trong tam giác

**Đề bài:** Cho tam giác có 3 đỉnh tại điểm nguyên $(x_1,y_1), (x_2,y_2), (x_3,y_3)$. Đếm số điểm nguyên nằm **bên trong** tam giác (không tính trên cạnh và đỉnh).

**Input:** 6 số nguyên $x_1, y_1, x_2, y_2, x_3, y_3$ $(|x_i|, |y_i| \leq 10^6)$

**Output:** Số điểm nguyên bên trong.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `0 0 4 0 0 3` | `3` |

**Giải thích:** Tam giác (0,0)-(4,0)-(0,3). Diện tích = 6. Điểm trên cạnh: B = 8. I = 6 - 8/2 + 1 = 3.

??? tip "Lời giải"
    Áp dụng Pick's theorem: $I = S - B/2 + 1$.
    
    === "C++"
    
        ```cpp
        #include <bits/stdc++.h>
        using namespace std;
    
        long long cross(long long x1, long long y1, long long x2, long long y2) {
            return x1 * y2 - x2 * y1;
        }
    
        int main() {
            long long x1, y1, x2, y2, x3, y3;
            cin >> x1 >> y1 >> x2 >> y2 >> x3 >> y3;
            long long area2 = abs(cross(x2 - x1, y2 - y1, x3 - x1, y3 - y1));
            long long B = __gcd(abs(x2 - x1), abs(y2 - y1))
                         + __gcd(abs(x3 - x2), abs(y3 - y2))
                         + __gcd(abs(x1 - x3), abs(y1 - y3));
            long long I = (area2 - B + 2) / 2;
            cout << I << "\n";
        }
        ```
---

### Bài 2: Đếm điểm nguyên trên đoạn

**Đề bài:** Cho $q$ truy vấn. Mỗi truy vấn cho 2 điểm nguyên $A(x_1,y_1)$ và $B(x_2,y_2)$. Đếm số điểm nguyên nằm trên đoạn $AB$ (bao gồm cả 2 đầu).

**Input:**
- Dòng 1: số nguyên $q$ $(1 \leq q \leq 10^5)$
- $q$ dòng: 4 số nguyên $x_1, y_1, x_2, y_2$ $(|x_i|, |y_i| \leq 10^9)$

**Output:** Với mỗi truy vấn, in ra số điểm nguyên.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `3`<br>`0 0 4 0`<br>`0 0 3 3`<br>`1 1 4 4` | `5`<br>`4`<br>`4` |

??? tip "Lời giải"
    Số điểm nguyên trên đoạn = $\gcd(|x_2-x_1|, |y_2-y_1|) + 1$.
    
    === "C++"
    
        ```cpp
        #include <bits/stdc++.h>
        using namespace std;
        int main() {
            int q; cin >> q;
            while (q--) {
                long long x1, y1, x2, y2;
                cin >> x1 >> y1 >> x2 >> y2;
                cout << __gcd(abs(x2 - x1), abs(y2 - y1)) + 1 << "\n";
            }
        }
        ```
---

### Bài 3: Diện tích và điểm nguyên

**Đề bài:** Cho đa giác lồi $n$ đỉnh (tọa độ nguyên). Tính: (1) diện tích, (2) số điểm nguyên trên cạnh, (3) số điểm nguyên bên trong.

**Input:**
- Dòng 1: số nguyên $n$ $(3 \leq n \leq 10^5)$
- $n$ dòng: 2 số nguyên $x_i, y_i$ $(|x_i|, |y_i| \leq 10^6)$

**Output:** 3 số: diện tích (có thể là .5), điểm trên cạnh, điểm bên trong.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `4`<br>`0 0`<br>`4 0`<br>`4 3`<br>`0 3` | `12.0 14 3` |

??? tip "Lời giải"
    Shoelace cho diện tích, $\gcd$ cho điểm trên cạnh, Pick cho điểm bên trong.
    
    === "C++"
    
        ```cpp
        #include <bits/stdc++.h>
        using namespace std;
    
        int main() {
            int n; cin >> n;
            vector<long long> x(n), y(n);
            for (int i = 0; i < n; i++) cin >> x[i] >> y[i];
    
            long long area2 = 0, B = 0;
            for (int i = 0; i < n; i++) {
                int j = (i + 1) % n;
                area2 += x[i] * y[j] - x[j] * y[i];
                B += __gcd(abs(x[j] - x[i]), abs(y[j] - y[i]));
            }
            area2 = abs(area2);
            long long I = (area2 - B + 2) / 2;
    
            if (area2 % 2 == 0)
                cout << area2 / 2 << ".0 ";
            else
                cout << area2 / 2 << ".5 ";
            cout << B << " " << I << "\n";
        }
        ```
---

### Bài 4: Điểm nguyên trong hình chữ nhật

**Đề bài:** Cho hình chữ nhật có 2 đỉnh đối diện $(x_1,y_1)$ và $(x_2,y_2)$. Đếm số điểm nguyên nằm bên trong (không tính trên cạnh).

**Input:** 4 số nguyên $x_1, y_1, x_2, y_2$ $(|x_i|, |y_i| \leq 10^9, x_1 < x_2, y_1 < y_2)$

**Output:** Số điểm nguyên bên trong.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `0 0 3 3` | `4` |
| `1 1 4 5` | `6` |

??? tip "Lời giải"
    $(x_2 - x_1 - 1) \times (y_2 - y_1 - 1)$.