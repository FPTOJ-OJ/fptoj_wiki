# Bài 28: Bao Lồi (Convex Hull)

> **Tác giả:** Hà Trí Kiên<br>
> **Nội dung tham khảo từ:** VNOI Wiki - Bao lồi, CP-Algorithms

## 1. Bao lồi là gì?

### Ẩn dụ: Bọc kẹo

Bạn có N viên kẹo rải trên bàn. Lấy 1 sợi dây thun bọc quanh tất cả các viên kẹo. Sợi dây sẽ tự nhiên "tì" vào những viên kẹo ở ngoài cùng — đường dây tạo thành **bao lồi**!

**Bao lồi** (Convex Hull) là đa giác lồi nhỏ nhất chứa tất cả các điểm đã cho. Mọi điểm đều nằm trong hoặc trên biên của đa giác này.

<p align="center"><img src="/uploads/img/convex-hull.svg" alt="Convex Hull" style="max-width: 700px;" /><br><em>Hình minh họa bao lồi (Convex Hull) bao quanh một tập điểm</em></p>

### Tại sao gọi là "lồi"?

Một đa giác **lồi** (convex) có tính chất: với mọi cặp điểm A, B bên trong đa giác, đoạn thẳng AB **hoàn toàn** nằm trong đa giác. Nghĩa là đa giác không có phần nào "lõm" vào trong.

Ngược lại, đa giác **không lồi** (concave) có ít nhất một chỗ "lõm" — nếu nối 2 điểm trong vùng lõm, đoạn thẳng sẽ đi ra ngoài.

### Tính chất quan trọng

- Bao lồi là **duy nhất** cho một tập điểm (không có 2 bao lồi khác nhau)
- Bao lồi là đa giác lồi — mọi góc trong đều ≤ 180°
- Các đỉnh của bao lồi là **tập con** của các điểm ban đầu
- Nếu chỉ có 1 hoặc 2 điểm, bao lồi là chính các điểm đó
- Số đỉnh bao lồi ≤ N (tổng số điểm)

---

## 2. Công cụ cốt lõi: Tích có hướng (Cross Product)

Trước khi vào thuật toán, bạn **phải** hiểu tích có hướng. Đây là phép toán nền tảng cho mọi bài toán hình học tính toán.

### Định nghĩa

Cho 3 điểm O, A, B:

```
cross(O, A, B) = (A.x - O.x) × (B.y - O.y) - (A.y - O.y) × (B.x - O.x)
```

### Ý nghĩa hình học

```
cross > 0  →  A→B quay TRÁI (counter-clockwise / CCW)
cross = 0  →  A, O, B thẳng hàng (collinear)
cross < 0  →  A→B quay PHẢI (clockwise / CW)
```

**Ẩn dụ: Quẹo xe**

Imagine bạn đang lái xe từ O đến A, rồi muốn rẽ đến B:

- `cross > 0`: quẹo trái
- `cross = 0`: đi thẳng
- `cross < 0`: quẹo phải

### Tại sao tích có hướng hoạt động?

Tích có hướng thực chất là tích có hướng (cross product) của 2 vector OA và OB trong không gian 2D. Công thức:

```
OA × OB = |OA| × |OB| × sin(θ)
```

với θ là góc từ OA đến OB. Khi θ ∈ (0°, 180°) → sin(θ) > 0 → quay trái. Khi θ ∈ (180°, 360°) → sin(θ) < 0 → quay phải.
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

---

## 3. Andrew's Monotone Chain (Khuyến nghị)

### Tại sao nên dùng thuật toán này?

Andrew's Monotone Chain là thuật toán xây dựng bao lồi **đơn giản nhất**, **dễ code nhất**, và **ít lỗi nhất**. Nếu bạn chỉ cần học 1 thuật toán bao lồi — hãy học cái này.

### Ý tưởng

1. Sắp xếp tất cả điểm theo tọa độ (x tăng dần, nếu x bằng nhau thì y tăng dần)
2. Xây **nửa dưới** (lower hull): duyệt từ trái sang phải, giữ chỉ các điểm tạo quay trái
3. Xây **nửa trên** (upper hull): duyệt từ phải sang trái, giữ chỉ các điểm tạo quay trái
4. Ghép 2 nửa lại → bao lồi hoàn chỉnh

### Tại sao thuật toán này đúng?

**Tưởng tượng:** Bạn đang "quấn dây" quanh các điểm. Bắt đầu từ điểm trái nhất, quấn xuống dưới (lower hull), rồi quấn ngược lên trên (upper hull). Tại mỗi bước, nếu dây không quay trái mà quay phải hoặc thẳng hàng, nghĩa là điểm đó nằm "bên trong" — bỏ nó đi.

Phép kiểm tra `cross <= 0` nghĩa là: nếu điểm mới tạo hướng quay phải hoặc thẳng hàng so với 2 điểm cuối stack, thì điểm cuối stack **không phải** đỉnh bao lồi → loại bỏ.

<p align="center"><img src="/uploads/img/convex-hull.svg" alt="Monotone Chain Illustration" style="max-width: 700px;" /><br><em>Hình minh họa thuật toán Monotone Chain xây dựng bao lồi</em></p>
=== "C++"

    ```cpp
    // Andrew's Monotone Chain - O(N log N)
    // Trả về các đỉnh bao lồi theo thứ tự CCW
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
    
        hull.pop_back();  // Điểm đầu bị trùng (điểm trái nhất xuất hiện 2 lần)
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

### Phân tích độ phức tạp

- **Sắp xếp:** O(N log N)
- **Xây bao lồi:** O(N) — mỗi điểm được thêm vào tối đa 1 lần và loại bỏ tối đa 1 lần
- **Tổng:** O(N log N)

---

## 4. Graham Scan (Nâng cao)

### Ý tưởng

Graham Scan là thuật toán bao lồi cổ điển, hoạt động khác với Monotone Chain:

1. Chọn điểm **gốc** (pivot): điểm có y nhỏ nhất (nếu bằng nhau, x nhỏ nhất)
2. Sắp xếp các điểm còn lại theo **góc** so với pivot (dùng `atan2`)
3. Duyệt từ pivot, giữ lại chỉ các điểm tạo quay trái

### Tại sao Graham Scan hoạt động?

Khi đã sắp xếp theo góc, các điểm được "quét" theo thứ tự vòng quanh pivot. Nếu 3 điểm liên tiếp tạo quay phải, điểm giữa nằm "bên trong" — loại bỏ nó. Kết quả là chỉ còn lại các đỉnh bao lồi.

### So sánh với Andrew's Monotone Chain

| Tiêu chí | Andrew's Monotone Chain | Graham Scan |
|----------|------------------------|-------------|
| Sắp xếp theo | Tọa độ (x, y) | Góc (atan2) |
| Dễ code | ⭐⭐⭐ Rất dễ | ⭐⭐ Phức tạp hơn |
| Xử lý thẳng hàng | Dễ dàng | Cần cẩn thận |
| Hiệu suất | Tốt | Tốt |
| Khuyến nghị | ⭐ Nên dùng | Học để hiểu thêm |
=== "C++"

    ```cpp
    // Graham Scan - O(N log N)
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
            if (c != 0) return c > 0;  // CCW trước
            // Nếu thẳng hàng, điểm gần pivot hơn đứng trước
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

## 5. Lưu ý / Cạm bẫy

### 5.1. Điểm thẳng hàng (Collinear Points)

**Vấn đề:** Khi nhiều điểm nằm trên cùng 1 cạnh bao lồi, bạn cần quyết định: giữ tất cả hay chỉ giữ 2 đầu?

```
A --- B --- C --- D    (4 điểm thẳng hàng)
```

- Dùng `cross < 0` (strict): giữ tất cả điểm trên cạnh → bao lồi có nhiều đỉnh "thừa"
- Dùng `cross <= 0` (loại bỏ thẳng hàng): chỉ giữ 2 đầu → bao lồi gọn hơn

**Khuyến nghị:** Hầu hết bài toán yêu cầu **loại bỏ** điểm thẳng hàng → dùng `cross <= 0`. Nếu bài yêu cầu giữ lại, đổi thành `cross < 0`.

```cpp
// Loại bỏ điểm thẳng hàng (giữ chỉ đỉnh bao lồi thực sự)
while (hull.size() >= 2 && cross(a, b, c) <= 0) hull.pop_back();

// Giữ lại điểm thẳng hàng
while (hull.size() >= 2 && cross(a, b, c) < 0) hull.pop_back();
```

### 5.2. Ít hơn 3 điểm

- 0 điểm → trả về rỗng
- 1 điểm → trả về chính điểm đó
- 2 điểm → trả về cả 2 (đoạn thẳng, không phải đa giác)

Nếu code của bạn không xử lý 2 điểm đúng cách, bao lồi có thể trả về 1 điểm (sai!).

```cpp
if (n <= 1) return points;
// Andrew's Monotone Chain tự xử lý đúng 2 điểm
```

### 5.3. Tọa độ nguyên vs số thực

**Tọa độ nguyên (long long):**

- Dùng `long long` cho cross product → chính xác tuyệt đối
- Phạm vi: |x|, |y| ≤ 10^9 an toàn (vì cross = O(10^18) vừa trong `long long`)

**Tọa độ số thực (double):**

- Dùng `abs(cross) < epsilon` thay vì `cross == 0`
- Epsilon thường dùng: `1e-9` hoặc `1e-12`
- Cẩn thận: so sánh `<= 0` với double có thể sai do sai số

```cpp
// Với double - dùng epsilon
const double EPS = 1e-9;
while (hull.size() >= 2 &&
       cross(hull[hull.size()-2], hull[hull.size()-1], points[i]) < EPS)
    hull.pop_back();
```

### 5.4. Thứ tự đỉnh: CW vs CCW

- Andrew's Monotone Chain trả về đỉnh theo thứ tự **CCW** (ngược chiều kim đồng hồ)
- Một số bài toán yêu cầu **CW** (theo chiều kim đồng hồ) → đảo ngược vector kết quả
- Luôn kiểm tra đề bài yêu cầu thứ tự nào!

```cpp
vector<Point> hull = convexHull(points);
// Nếu cần CW, đảo ngược:
reverse(hull.begin(), hull.end());
```

### 5.5. Điểm trùng nhau

Nếu tập điểm có nhiều điểm trùng nhau:

- Andrew's Monotone Chain vẫn hoạt động đúng (vì sort sẽ đặt chúng cạnh nhau)
- Nhưng nếu dùng `cross < 0` thay vì `<= 0`, điểm trùng có thể nằm trên bao lồi → không cần lo

### 5.6. Bao lồi là đường thẳng (degenerate case)

Khi tất cả điểm thẳng hàng, bao lồi chỉ là 1 đoạn thẳng, không phải đa giác. Một số bài toán (tính diện tích, kiểm tra điểm trong bao lồi) sẽ trả về 0 hoặc sai với trường hợp này.

```cpp
// Kiểm tra bao lồi có phải đường thẳng không
bool isLine(vector<Point>& hull) {
    if (hull.size() <= 2) return true;
    // Kiểm tra tất cả điểm có thẳng hàng không
    for (int i = 2; i < hull.size(); i++) {
        if (cross(hull[0], hull[1], hull[i]) != 0) return false;
    }
    return true;
}
```

---

## 6. Ứng dụng thực tế

### 6.1. Diện tích bao lồi (Công thức Shoelace)

Sau khi có bao lồi, tính diện tích bằng công thức Shoelace:

```
Diện tích = |Σ(xᵢ × yᵢ₊₁ - xᵢ₊₁ × yᵢ)| / 2
```

**Ẩn dụ:** Imagine "buộc dây" qua các đỉnh theo thứ tự, rồi "thắt" lại → diện tích bên trong!

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

### 6.2. Chu vi bao lồi

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

### 6.3. Cặp điểm gần nhất (Closest Pair of Points)

Bao lồi giúp **thu hẹp phạm vi tìm kiếm** cho bài toán cặp điểm gần nhất. Tuy nhiên, thuật toán chính cho bài này là chia để trị O(N log N), không trực tiếp dùng bao lồi. Tuy nhiên, bao lồi hữu ích trong nhiều biến thể hình học.

### 6.4. Đường kính bao lồi - Rotating Calipers

**Bài toán:** Tìm khoảng cách lớn nhất giữa 2 điểm trong tập điểm (= đường kính bao lồi).

**Thuật toán Rotating Calipers:**

Ý tưởng: Imagine 2 đường thẳng song song kẹp bao lồi từ 2 phía. Quay 2 đường thẳng này quanh bao lồi, tại mỗi vị trí đo khoảng cách. Khoảng cách lớn nhất là đường kính.

Thực tế, ta duyệt qua các cặp đỉnh đối diện trên bao lồi. Mỗi đỉnh "đối diện" di chuyển tối đa O(N) bước → tổng O(N).

=== "C++"

    ```cpp
    // Đường kính bao lồi (khoảng cách xa nhất giữa 2 điểm)
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
            // Quay j cho đến khi diện tích tam giác giảm
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
        if n <= 1: return 0
        if n == 2:
            return math.sqrt((hull[0][0]-hull[1][0])**2 + (hull[0][1]-hull[1][1])**2)
    
        max_dist = 0
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

### 6.5. Đường tròn bao nhỏ nhất (Minimum Enclosing Circle)

**Bài toán:** Tìm đường tròn nhỏ nhất chứa tất cả các điểm.

**Liên hệ với bao lồi:** Đường tròn bao nhỏ nhất chỉ cần xét các đỉnh bao lồi (vì mọi điểm khác nằm bên trong).

Thuật toán Welzl's algorithm giải bài này trong O(N) thời gian kỳ vọng, nhưng với số điểm nhỏ, ta có thể dùng cách đơn giản hơn:

1. Tính bao lồi
2. Thử mọi cặp đỉnh làm đường kính đường tròn
3. Thử mọi bộ 3 đỉnh làm đường tròn ngoại tiếp
4. Chọn đường tròn nhỏ nhất chứa tất cả đỉnh

### 6.6. Kiểm tra điểm trong bao lồi

Với bao lồi lồi, kiểm tra điểm P có nằm trong bao lồi không có thể dùng binary search O(log N):

```cpp
// Kiểm tra điểm P có nằm trong bao lồi (đã sắp xếp CCW) không
// Bao lồi phải có >= 3 đỉnh
bool pointInHull(const Point& P, const vector<Point>& hull) {
    int n = hull.size();
    if (n == 0) return false;
    if (n == 1) return P.x == hull[0].x && P.y == hull[0].y;
    if (n == 2) {
        // Kiểm tra P có nằm trên đoạn thẳng không
        return cross(hull[0], hull[1], P) == 0 &&
               min(hull[0].x, hull[1].x) <= P.x && P.x <= max(hull[0].x, hull[1].x) &&
               min(hull[0].y, hull[1].y) <= P.y && P.y <= max(hull[0].y, hull[1].y);
    }

    // P phải nằm cùng phía với tâm bao lồi so với mọi cạnh
    // Dùng binary search để tìm tam giác chứa P
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

---

## 7. Các thuật toán khác (tham khảo)

### Jarvis March (Gift Wrapping)

- **Ý tưởng:** Bọc quà — từ điểm trái nhất, tìm điểm "quay trái nhất" tiếp theo, lặp lại cho đến khi quay về điểm đầu
- **Độ phức tạp:** O(N × H) với H là số đỉnh bao lồi
- **Ưu điểm:** Nhanh khi H rất nhỏ (H << N)
- **Nhược điểm:** Chậm khi H ≈ N (trường hợp xấu nhất O(N²))

### Chan's Algorithm

- **Ý tưởng:** Kết hợp Monotone Chain và Jarvis March
- **Độ phức tạp:** O(N log H) — tối ưu về mặt lý thuyết
- **Thực tế:** Ít khi cần dùng trong competitive programming

---

## 8. Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
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

## 9. Bài viết liên quan

- [Bài 22: Hình học cơ bản](22-hinh-hoc-co-ban.md) — Tích có hướng, tích vô hướng, kiểm tra giao điểm

## 10. Tài liệu tham khảo

- [VNOI Wiki - Bao lồi](https://vnoi.info/translate/wcipeg/Convex-Hull)
- [VNOI Wiki - Giải thích trực quan về bao lồi](https://vnoi.info/translate/wcipeg/Bao-lồi)
- [CP-Algorithms - Convex Hull](https://cp-algorithms.com/geometry/convex-hull.html)
- [CP-Algorithms - Rotating Calipers](https://cp-algorithms.com/geometry/rotating-calipers.html)
- [USACO Guide - Convex Hull](https://usaco.guide/adv/geo)
- [YouTube - Convex Hull (Errichto)](https://www.youtube.com/watch?v=B2aDgfbj3kE)

**Bài tiếp theo:** [Kỹ năng thi đấu →](36-ky-nang-thi-dau.md)