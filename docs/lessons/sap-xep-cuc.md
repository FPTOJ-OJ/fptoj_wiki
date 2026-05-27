# Bài 64: Sắp Xếp Cực & Quét Góc

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** CP-Algorithms, VNOI Wiki

## 1. Sắp xếp cực (Polar Sort)

### 1.1 Ý tưởng

Sắp xếp các điểm theo **góc** từ một điểm gốc (thường là gốc tọa độ hoặc điểm có tung độ nhỏ nhất). Đây là bước quan trọng trong nhiều thuật toán hình học.

### 1.2 Dùng atan2

Hàm `atan2(y, x)` trả về góc từ trục $x$ dương, trong khoảng $(-\pi, \pi]$. Sắp xếp theo giá trị này.

=== "C++"

    ```cpp
    // Sắp xếp điểm theo góc từ gốc tọa độ
    void polarSort(vector<Point>& points) {
        sort(points.begin(), points.end(), [](const Point& A, const Point& B) {
            double aA = atan2(A.y, A.x);
            double aB = atan2(B.y, B.x);
            if (abs(aA - aB) > 1e-9) return aA < aB;
            // Cùng góc → sắp xếp theo khoảng cách
            return A.x * A.x + A.y * A.y < B.x * B.x + B.y * B.y;
        });
    }
    ```

=== "Python"

    ```python
    import math

    def polar_sort(points):
        def key_func(P):
            return (math.atan2(P[1], P[0]), P[0]**2 + P[1]**2)
        points.sort(key=key_func)
    ```

### 1.3 Sắp xếp theo góc từ điểm任意

Chuyển tất cả điểm về tọa độ tương đối so với điểm gốc, rồi sắp xếp.

=== "C++"

    ```cpp
    void polarSortAround(vector<Point>& points, Point O) {
        sort(points.begin(), points.end(), [&O](const Point& A, const Point& B) {
            Point a = {A.x - O.x, A.y - O.y};
            Point b = {B.x - O.x, B.y - O.y};
            double aa = atan2(a.y, a.x);
            double ab = atan2(b.y, b.x);
            if (abs(aa - ab) > 1e-9) return aa < ab;
            return a.x * a.x + a.y * a.y < b.x * b.x + b.y * b.y;
        });
    }
    ```

---

## 2. Quét góc (Angular Sweep)

### 2.1 Ý tưởng

Duyệt một góc quay từ $0$ đến $2\pi$, tại mỗi vị trí đếm số điểm nằm trong một phạm vi góc cho trước (thường là nửa đường tròn, tứ giác, ...).

### 2.2 Bài toán: Maximum points in a half-plane

Cho $n$ điểm, tìm số điểm tối đa nằm trong một **nửa mặt phẳng** (bởi một đường thẳng đi qua gốc).

### 2.3 Giải pháp

Sắp xếp tất cả điểm theo góc. Với mỗi điểm $i$, tìm số điểm nằm trong góc $[\theta_i, \theta_i + \pi)$ bằng binary search trên mảng góc đã sắp xếp (nhân đôi mảng để xử lý vòng tròn).

=== "C++"

    ```cpp
    int maxPointsInHalfPlane(vector<Point>& points) {
        int n = points.size();
        if (n <= 2) return n;

        vector<double> angles;
        for (auto& P : points) {
            angles.push_back(atan2(P.y, P.x));
        }
        sort(angles.begin(), angles.end());

        // Nhân đôi mảng để xử lý vòng tròn
        vector<double> doubled;
        for (double a : angles) doubled.push_back(a);
        for (double a : angles) doubled.push_back(a + 2 * M_PI);

        int ans = 0;
        int j = 0;
        for (int i = 0; i < n; i++) {
            while (j < 2 * n && doubled[j] - doubled[i] < M_PI - 1e-9) j++;
            ans = max(ans, j - i);
        }
        return ans;
    }
    ```

=== "Python"

    ```python
    import math

    def max_points_in_half_plane(points):
        n = len(points)
        if n <= 2:
            return n

        angles = sorted(math.atan2(P[1], P[0]) for P in points)
        doubled = angles + [a + 2 * math.pi for a in angles]

        ans = 0
        j = 0
        for i in range(n):
            while j < 2 * n and doubled[j] - doubled[i] < math.pi - 1e-9:
                j += 1
            ans = max(ans, j - i)
        return ans
    ```

---

## 3. Bài toán: Maximum points in a circle

### 3.1 Phát biểu

Cho $n$ điểm, tìm bán kính nhỏ nhất của đường tròn chứa ít nhất $k$ điểm.

### 3.2 Giải pháp

Với mỗi điểm $i$ làm tâm đường tròn:
- Tính khoảng cách từ $i$ đến tất cả điểm khác
- Sắp xếp khoảng cách
- Lấy bán kính = khoảng cách thứ $k-1$

=== "C++"

    ```cpp
    double minRadiusToCoverK(vector<Point>& points, int k) {
        int n = points.size();
        double ans = 1e18;

        for (int i = 0; i < n; i++) {
            vector<double> dists;
            for (int j = 0; j < n; j++) {
                if (i != j) {
                    double d = sqrt((points[i].x - points[j].x) * (points[i].x - points[j].x) +
                                   (points[i].y - points[j].y) * (points[i].y - points[j].y));
                    dists.push_back(d);
                }
            }
            sort(dists.begin(), dists.end());
            if ((int)dists.size() >= k - 1) {
                ans = min(ans, dists[k - 2]);
            }
        }
        return ans;
    }
    ```

---

## 4. Bài toán: Visible points từ một điểm

### 4.1 Phát biểu

Cho $n$ điểm trên mặt phẳng và một điểm quan sát $O$. Đếm số điểm "nhìn thấy" được từ $O$, tức là không bị che bởi điểm khác trên cùng một tia.

### 4.2 Giải pháp

Sắp xếp các điểm theo góc từ $O$. Các điểm cùng góc → chỉ đếm 1.

=== "C++"

    ```cpp
    int visiblePoints(Point O, vector<Point>& points) {
        vector<double> angles;
        for (auto& P : points) {
            if (abs(P.x - O.x) > 1e-9 || abs(P.y - O.y) > 1e-9) {
                angles.push_back(atan2(P.y - O.y, P.x - O.x));
            }
        }
        sort(angles.begin(), angles.end());
        // Đếm số góc khác nhau
        int cnt = 0;
        for (int i = 0; i < (int)angles.size(); i++) {
            if (i == 0 || abs(angles[i] - angles[i-1]) > 1e-9) cnt++;
        }
        return cnt;
    }
    ```

---

## 5. Bài toán: Minimum rotation angle

### 5.1 Phát biểu

Cho 2 vector $A$ và $B$. Tìm góc nhỏ nhất (radian) cần quay $A$ để trùng $B$.

### 5.2 Công thức

$$\theta = \min(|\theta_A - \theta_B|, 2\pi - |\theta_A - \theta_B|)$$

=== "C++"

    ```cpp
    double minRotationAngle(Point A, Point B) {
        double a = atan2(A.y, A.x);
        double b = atan2(B.y, B.x);
        double diff = abs(a - b);
        return min(diff, 2 * M_PI - diff);
    }
    ```

---

## 6. Bài tập luyện tập

### Bài 1: Sắp xếp theo góc

**Đề bài:** Cho $n$ điểm trên mặt phẳng. Sắp xếp chúng theo góc từ gốc tọa độ (từ trục $x$ dương, ngược chiều kim đồng hồ). Nếu cùng góc, sắp theo khoảng cách tăng dần.

**Input:**
- Dòng 1: số nguyên $n$ $(1 \leq n \leq 10^5)$
- $n$ dòng: 2 số nguyên $x_i, y_i$ $(|x_i|, |y_i| \leq 10^4)$, không có điểm nào là gốc tọa độ

**Output:** In ra $n$ dòng, mỗi dòng 2 số $x, y$ sau khi sắp xếp.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `4`<br>`1 1`<br>`-1 1`<br>`1 -1`<br>`-1 -1` | `1 1`<br>`-1 1`<br>`-1 -1`<br>`1 -1` |

??? tip "Lời giải"
    Sắp xếp theo `atan2(y, x)`, nếu bằng nhau thì theo $x^2 + y^2$.
    
    === "C++"
    
        ```cpp
        #include <bits/stdc++.h>
        using namespace std;
        int main() {
            int n; cin >> n;
            vector<pair<long long,long long>> p(n);
            for (int i = 0; i < n; i++) cin >> p[i].first >> p[i].second;
            sort(p.begin(), p.end(), [](auto& a, auto& b) {
                double aa = atan2(a.second, a.first);
                double ab = atan2(b.second, b.first);
                if (abs(aa - ab) > 1e-9) return aa < ab;
                return a.first * a.first + a.second * a.second
                     < b.first * b.first + b.second * b.second;
            });
            for (auto& [x, y] : p) cout << x << " " << y << "\n";
        }
        ```
---

### Bài 2: Maximum points trong nửa mặt phẳng

**Đề bài:** Cho $n$ điểm trên mặt phẳng. Tìm số điểm tối đa nằm trong một **nửa mặt phẳng** (bởi một đường thẳng đi qua gốc tọa độ).

**Input:**
- Dòng 1: số nguyên $n$ $(1 \leq n \leq 10^5)$
- $n$ dòng: 2 số nguyên $x_i, y_i$ $(|x_i|, |y_i| \leq 10^4)$

**Output:** Số điểm tối đa.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `4`<br>`1 0`<br>`0 1`<br>`-1 0`<br>`0 -1` | `2` |

??? tip "Lời giải"
    Sắp xếp theo góc, dùng two pointers trên mảng góc nhân đôi.
    
    === "C++"
    
        ```cpp
        #include <bits/stdc++.h>
        using namespace std;
        int main() {
            int n; cin >> n;
            vector<double> angles;
            for (int i = 0; i < n; i++) {
                int x, y; cin >> x >> y;
                if (x == 0 && y == 0) continue;
                angles.push_back(atan2(y, x));
            }
            sort(angles.begin(), angles.end());
            int m = angles.size();
            vector<double> dbl(angles.begin(), angles.end());
            for (double a : angles) dbl.push_back(a + 2 * M_PI);
    
            int ans = 0, j = 0;
            for (int i = 0; i < m; i++) {
                while (j < 2 * m && dbl[j] - dbl[i] < M_PI - 1e-9) j++;
                ans = max(ans, j - i);
            }
            cout << ans << "\n";
        }
        ```
---

### Bài 3: Visible points

**Đề bài:** Cho $n$ điểm và điểm quan sát $O(a,b)$. Đếm số điểm "nhìn thấy" từ $O$ (không bị che bởi điểm khác trên cùng một tia).

**Input:**
- Dòng 1: 3 số nguyên $n, a, b$ $(1 \leq n \leq 10^5)$
- $n$ dòng: 2 số nguyên $x_i, y_i$

**Output:** Số điểm nhìn thấy.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `4 0 0`<br>`1 1`<br>`2 2`<br>`3 3`<br>`1 0` | `2` |

**Giải thích:** (1,1), (2,2), (3,3) cùng tia → chỉ đếm 1. (1,0) tia khác → đếm 1. Tổng = 2.

??? tip "Lời giải"
    Tính góc từ $O$ đến mỗi điểm, đếm số góc khác nhau.
    
    === "C++"
    
        ```cpp
        #include <bits/stdc++.h>
        using namespace std;
        int main() {
            int n, a, b; cin >> n >> a >> b;
            set<pair<long long,long long>> dirs;
            for (int i = 0; i < n; i++) {
                int x, y; cin >> x >> y;
                long long dx = x - a, dy = y - b;
                if (dx == 0 && dy == 0) continue;
                long long g = __gcd(abs(dx), abs(dy));
                dirs.insert({dx / g, dy / g});
            }
            cout << dirs.size() << "\n";
        }
        ```
---

### Bài 4: Minimum rotation angle

**Đề bài:** Cho 2 vector $A(x_1,y_1)$ và $B(x_2,y_2)$. Tìm góc nhỏ nhất (độ) cần quay $A$ để trùng $B$.

**Input:** 4 số thực $x_1, y_1, x_2, y_2$

**Output:** Góc nhỏ nhất (độ), làm tròn 4 chữ số thập phân.

**Ví dụ:**

| Input | Output |
|-------|--------|
| `1 0 0 1` | `90.0000` |
| `1 0 -1 0` | `180.0000` |

??? tip "Lời giải"
    $\theta = \min(|\theta_A - \theta_B|, 2\pi - |\theta_A - \theta_B|)$.