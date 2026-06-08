# Bài 63: Góc & Phép Quay

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** CP-Algorithms, VNOI Wiki

## 1. Góc giữa hai vector

### 1.1 Dùng atan2

Hàm `atan2(y, x)` trả về góc (radian) từ trục $x$ dương đến vector $(x, y)$, trong khoảng $(-\pi, \pi]$.

=== "C++"

    ```cpp
    double angleOfVector(Point A) {
        return atan2(A.y, A.x); // góc từ trục x đến vector A
    }

    double angleBetween(Point A, Point B) {
        double a = atan2(A.y, A.x);
        double b = atan2(B.y, B.x);
        double diff = abs(a - b);
        if (diff > M_PI) diff = 2 * M_PI - diff;
        return diff; // góc nhỏ nhất giữa 2 vector
    }
    ```

=== "Python"

    ```python
    import math

    def angle_of_vector(A):
        return math.atan2(A[1], A[0])

    def angle_between(A, B):
        a = math.atan2(A[1], A[0])
        b = math.atan2(B[1], B[0])
        diff = abs(a - b)
        if diff > math.pi:
            diff = 2 * math.pi - diff
        return diff
    ```

### 1.2 Dùng dot product

$$\cos(\theta) = \frac{A \cdot B}{|A| \cdot |B|}$$

=== "C++"

    ```cpp
    double angleBetweenDot(Point A, Point B) {
        double cosTheta = dot(A, B) / (magnitude(A) * magnitude(B));
        cosTheta = max(-1.0, min(1.0, cosTheta)); // clamp
        return acos(cosTheta);
    }
    ```

---

## 2. Phép quay điểm

### 2.1 Quay quanh gốc tọa độ

Quay điểm $(x, y)$ một góc $\theta$:

$$\begin{pmatrix} x' \\ y' \end{pmatrix} = \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix}$$

$$x' = x\cos\theta - y\sin\theta$$

$$y' = x\sin\theta + y\cos\theta$$

**Minh họa trực quan (Phép quay điểm quanh gốc tọa độ):**
```matplotlib
# Tọa độ điểm gốc
O = np.array([0, 0])
P = np.array([3, 2])

# Góc quay (60 độ) đổi sang radian
theta_deg = 60
theta = np.radians(theta_deg)

# Ma trận xoay
R = np.array([[np.cos(theta), -np.sin(theta)],
              [np.sin(theta),  np.cos(theta)]])
P_rot = R.dot(P)

fig, ax = plt.subplots(figsize=(6, 6))

# Vẽ trục Oxy
ax.axhline(0, color='gray', alpha=0.3)
ax.axvline(0, color='gray', alpha=0.3)

# Vẽ các vector mũi tên chỉ vị trí điểm trước và sau xoay
ax.annotate('', xy=P, xytext=O, arrowprops=dict(arrowstyle="->", color='#3399ff', lw=2.5, mutation_scale=15))
ax.annotate('', xy=P_rot, xytext=O, arrowprops=dict(arrowstyle="->", color='#2ea44f', lw=2.5, mutation_scale=15))

# Vẽ điểm P và P'
ax.scatter([P[0], P_rot[0]], [P[1], P_rot[1]], color=['#3399ff', '#2ea44f'], s=80, zorder=5)

# Nhãn tên điểm và tọa độ
ax.text(P[0] + 0.15, P[1], f'P({P[0]}, {P[1]})', color='#3399ff', fontweight='bold', fontsize=10)
ax.text(P_rot[0] + 0.15, P_rot[1] + 0.15, f"P'({P_rot[0]:.2f}, {P_rot[1]:.2f})", color='#2ea44f', fontweight='bold', fontsize=10)
ax.text(0.1, -0.25, 'O(0,0)', fontsize=9)

# Vẽ cung góc quay theta
r_arc = 1.2
# Góc của P và P' so với trục hoành
phi_start = np.arctan2(P[1], P[0])
phi_end = np.arctan2(P_rot[1], P_rot[0])
angles = np.linspace(phi_start, phi_end, 50)
arc_x = r_arc * np.cos(angles)
arc_y = r_arc * np.sin(angles)
ax.plot(arc_x, arc_y, color='#ff9933', linestyle='--', lw=2)
ax.text(r_arc * np.cos(angles[25]) + 0.25, r_arc * np.sin(angles[25]) + 0.1, r'$\theta = 60^\circ$', 
        color='#ff9933', fontweight='bold', fontsize=11)

# Căn chỉnh hiển thị trục tỷ lệ 1:1
ax.set_aspect('equal')
ax.set_xlim(-1, 5)
ax.set_ylim(-1, 5)
ax.set_xlabel('Trục hoành X')
ax.set_ylabel('Trục tung Y')
ax.set_title('Phép quay điểm P một góc 60° CCW quanh gốc tọa độ O')
ax.grid(True, alpha=0.3, linestyle=':')
plt.tight_layout()
```


=== "C++"

    ```cpp
    Point rotate(Point P, double theta) {
        return {
            P.x * cos(theta) - P.y * sin(theta),
            P.x * sin(theta) + P.y * cos(theta)
        };
    }
    ```

=== "Python"

    ```python
    import math

    def rotate(P, theta):
        x, y = P
        return (
            x * math.cos(theta) - y * math.sin(theta),
            x * math.sin(theta) + y * math.cos(theta)
        )
    ```

### 2.2 Quay quanh điểm bất kỳ

Quay điểm $P$ quanh tâm $O$ góc $\theta$:

$$P' = O + \text{rotate}(P - O, \theta)$$

=== "C++"

    ```cpp
    Point rotateAround(Point P, Point O, double theta) {
        Point translated = {P.x - O.x, P.y - O.y};
        Point rotated = rotate(translated, theta);
        return {rotated.x + O.x, rotated.y + O.y};
    }
    ```

---

## 3. Phép quay 90°

### 3.1 Quay 90° ngược chiều kim đồng hồ (CCW)

$(x, y) \to (-y, x)$

### 3.2 Quay 90° theo chiều kim đồng hồ (CW)

$(x, y) \to (y, -x)$

=== "C++"

    ```cpp
    Point rotate90CCW(Point P) { return {-P.y, P.x}; }
    Point rotate90CW(Point P) { return {P.y, -P.x}; }
    ```

---

## 4. Ứng dụng: Điểm đối xứng qua trục

### 4.1 Đối xứng qua trục tung $Oy$

$(x, y) \to (-x, y)$

### 4.2 Đối xứng qua trục hoành $Ox$

$(x, y) \to (x, -y)$

### 4.3 Đối xứng qua đường thẳng任意

Xem Bài 61 - phần reflectPoint.

---

## 5. Kiểm tra điểm nằm trong góc

### 5.1 Bài toán

Cho 3 điểm $O, A, B$. Kiểm tra điểm $P$ có nằm trong góc $\angle AOB$ không.

### 5.2 Ý tưởng

Sử dụng cross product để kiểm tra $P$ nằm cùng phía $A$ và $B$ so với $O$.

=== "C++"

    ```cpp
    // Kiểm tra P nằm trong góc AOB (góc < 180°)
    bool pointInAngle(Point O, Point A, Point B, Point P) {
        double crossOA = cross(A - O, P - O);
        double crossOB = cross(B - O, P - O);
        if (cross(A - O, B - O) >= 0) {
            return crossOA >= -1e-9 && crossOB <= 1e-9;
        } else {
            return crossOA >= -1e-9 || crossOB <= 1e-9;
        }
    }
    ```

---

## 6. Xoay hình học

### 6.1 Xoay đa giác

Xoay toàn bộ đa giác quanh tâm $O$ góc $\theta$:

=== "C++"

    ```cpp
    vector<Point> rotatePolygon(vector<Point>& poly, Point O, double theta) {
        vector<Point> result;
        for (auto& P : poly)
            result.push_back(rotateAround(P, O, theta));
        return result;
    }
    ```

### 6.2 Ứng dụng: Bài toán minimum bounding rectangle

Xoay đa giác các góc khác nhau để tìm hình chữ nhật bao nhỏ nhất.

---

## 7. Bài tập luyện tập

### Bài 1: Quay điểm

**Đề bài:** Cho điểm $P(x,y)$ và góc $\theta$ (độ). Quay $P$ quanh gốc tọa độ một góc $\theta$ ngược chiều kim đồng hồ.

**Input:** 3 số thực $x, y, \theta$ $(|x|,|y| \leq 10^4, 0 \leq \theta \leq 360)$

**Output:** Tọa độ điểm sau khi quay, làm tròn 4 chữ số thập phân.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `1 0 90` | `0.0000 1.0000` |
| `1 1 45` | `-0.0000 1.4142` |

??? tip "Lời giải"
    $x' = x\cos\theta - y\sin\theta$, $y' = x\sin\theta + y\cos\theta$. Đổi $\theta$ từ độ sang radian.
    
    === "C++"
    
        ```cpp
        #include <bits/stdc++.h>
        using namespace std;
        int main() {
            double x, y, theta;
            cin >> x >> y >> theta;
            double rad = theta * M_PI / 180.0;
            double nx = x * cos(rad) - y * sin(rad);
            double ny = x * sin(rad) + y * cos(rad);
            cout << fixed << setprecision(4) << nx << " " << ny << "\n";
        }
        ```
---

### Bài 2: Góc giữa 2 vector

**Đề bài:** Cho 2 vector $A(x_1,y_1)$ và $B(x_2,y_2)$. Tính góc giữa chúng (độ).

**Input:** 4 số thực $x_1, y_1, x_2, y_2$

**Output:** Góc giữa 2 vector (độ), làm tròn 4 chữ số thập phân.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `1 0 0 1` | `90.0000` |
| `1 0 1 1` | `45.0000` |

??? tip "Lời giải"
    $\theta = \arccos\left(\frac{A \cdot B}{|A| \cdot |B|}\right)$, đổi sang độ.
    
    === "C++"
    
        ```cpp
        #include <bits/stdc++.h>
        using namespace std;
        int main() {
            double x1, y1, x2, y2;
            cin >> x1 >> y1 >> x2 >> y2;
            double dot = x1 * x2 + y1 * y2;
            double mag = hypot(x1, y1) * hypot(x2, y2);
            double angle = acos(max(-1.0, min(1.0, dot / mag)));
            cout << fixed << setprecision(4) << angle * 180.0 / M_PI << "\n";
        }
        ```
---

### Bài 3: Điểm đối xứng

**Đề bài:** Cho điểm $P(x,y)$ và đường thẳng $Ax + By + C = 0$. Tìm điểm đối xứng của $P$ qua đường thẳng.

**Input:** 5 số thực $x, y, A, B, C$

**Output:** Tọa độ điểm đối xứng, làm tròn 4 chữ số thập phân.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `1 0 1 -1 0` | `0.0000 1.0000` |
| `0 0 1 0 -3` | `6.0000 0.0000` |

??? tip "Lời giải"
    Chiếu $P$ lên đường thẳng $H$, rồi $P' = 2H - P$.
    
    === "C++"
    
        ```cpp
        #include <bits/stdc++.h>
        using namespace std;
        int main() {
            double x, y, A, B, C;
            cin >> x >> y >> A >> B >> C;
            double d = (A * x + B * y + C) / (A * A + B * B);
            double nx = x - 2 * A * d;
            double ny = y - 2 * B * d;
            cout << fixed << setprecision(4) << nx << " " << ny << "\n";
        }
        ```
---

### Bài 4: Kiểm tra quay

**Đề bài:** Cho 3 điểm $A, B, C$ theo thứ tự. Xác định $C$ nằm bên trái, bên phải, hay thẳng hàng so với vector $AB$.

**Input:** 6 số thực $x_A, y_A, x_B, y_B, x_C, y_C$

**Output:** `LEFT`, `RIGHT`, hoặc `COLLINEAR`.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `0 0 1 0 0 1` | `LEFT` |
| `0 0 1 0 0 -1` | `RIGHT` |
| `0 0 1 0 2 0` | `COLLINEAR` |

??? tip "Lời giải"
    Tính cross product $(B-A) \times (C-A)$. Dương = trái, âm = phải, 0 = thẳng hàng.