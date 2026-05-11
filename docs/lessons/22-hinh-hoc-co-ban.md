# Bài 22: Hình Học Cơ Bản

> **Tác giả:** Hà Trí Kiên<br>
> **Nội dung tham khảo từ:** VNOI Wiki - Hình học tính toán

## 1. Điểm và Vector

### Ẩn dụ: Bản đồ thành phố

Mỗi điểm trên bản đồ có tọa độ (x, y). Vector = mũi tên từ điểm A đến điểm B.

```cpp
struct Point {
    double x, y;
};

// Vector từ A đến B
Point vector(Point A, Point B) {
    return {B.x - A.x, B.y - A.y};
}
```

---

## 2. Các phép toán cơ bản

### Tích vô hướng (Dot Product)

```
A · B = A.x × B.x + A.y × B.y

Ý nghĩa hình học:
- A · B = |A| × |B| × cos(θ)  với θ là góc giữa A và B
- A · B > 0: góc nhọn (< 90°) - cùng hướng
- A · B = 0: vuông góc (90°)
- A · B < 0: góc tù (> 90°) - ngược hướng
```

**Ứng dụng:**

- Kiểm tra 2 vector có vuông góc không: `dot(A, B) == 0`
- Chiếu điểm lên đường thẳng: tính góc giữa 2 vector
- Tìm góc giữa 2 vector: `θ = acos(dot(A, B) / (|A| × |B|))`

### Tích có hướng (Cross Product)

```
A × B = A.x × B.y - A.y × B.x

Ý nghĩa hình học:
- |A × B| = diện tích hình bình hành tạo bởi A và B
- A × B > 0: B nằm bên TRÁI A (quay ngược chiều kim đồng hồ - CCW)
- A × B = 0: A và B thẳng hàng (collinear)
- A × B < 0: B nằm bên PHẢI A (quay theo chiều kim đồng hồ - CW)
```

**Ẩn dụ: Quẹo xe**

- Cross > 0: quẹo trái
- Cross = 0: đi thẳng
- Cross < 0: quẹo phải

**Ứng dụng:**

- Xác định hướng quay (CCW hay CW)
- Kiểm tra 3 điểm có thẳng hàng không
- Kiểm tra 2 đoạn thẳng cắt nhau
- Tính diện tích tam giác, đa giác
- Xây dựng bao lồi (Convex Hull)

### Code C++

```cpp
struct Point {
    double x, y;
    Point operator-(const Point& other) const {
        return {x - other.x, y - other.y};
    }
    Point operator+(const Point& other) const {
        return {x + other.x, y + other.y};
    }
    Point operator*(double k) const {
        return {x * k, y * k};
    }
};

// Tích vô hướng
double dot(Point A, Point B) {
    return A.x * B.x + A.y * B.y;
}

// Tích có hướng
double cross(Point A, Point B) {
    return A.x * B.y - A.y * B.x;
}

// Khoảng cách 2 điểm
double distance(Point A, Point B) {
    double dx = A.x - B.x, dy = A.y - B.y;
    return sqrt(dx * dx + dy * dy);
}

// Khoảng cách bình phương (tránh sqrt, dùng cho so sánh)
double distSq(Point A, Point B) {
    double dx = A.x - B.x, dy = A.y - B.y;
    return dx * dx + dy * dy;
}
```

### Code Python

```python
import math

def dot(A, B):
    return A[0]*B[0] + A[1]*B[1]

def cross(A, B):
    return A[0]*B[1] - A[1]*B[0]

def distance(A, B):
    return math.sqrt((A[0]-B[0])**2 + (A[1]-B[1])**2)
```

---

## 3. Ứng dụng Cross Product

### 3.1. Kiểm tra 3 điểm có thẳng hàng không

```cpp
bool areCollinear(Point A, Point B, Point C) {
    return abs(cross(B - A, C - A)) < 1e-9;
}
```

### Code Python

```python
def are_collinear(A, B, C):
    return abs(cross((B[0]-A[0], B[1]-A[1]), (C[0]-A[0], C[1]-A[1]))) < 1e-9
```

### 3.2. Xác định hướng quay (CCW)

Cho 3 điểm A, B, C. Hỏi từ A→B→C quay theo hướng nào?

```cpp
// Trả về: > 0 nếu CCW (trái), = 0 nếu thẳng hàng, < 0 nếu CW (phải)
int orientation(Point A, Point B, Point C) {
    double val = cross(B - A, C - A);
    if (val > 0) return 1;   // CCW (trái)
    if (val < 0) return -1;  // CW (phải)
    return 0;                // Thẳng hàng
}
```

### Code Python

```python
def orientation(A, B, C):
    val = cross((B[0]-A[0], B[1]-A[1]), (C[0]-A[0], C[1]-A[1]))
    if val > 0: return 1
    if val < 0: return -1
    return 0
```

### 3.3. Kiểm tra 2 đoạn thẳng cắt nhau

```cpp
// Kiểm tra điểm P có nằm trên đoạn AB không (khi A, B, P thẳng hàng)
bool onSegment(Point A, Point B, Point P) {
    return min(A.x, B.x) <= P.x && P.x <= max(A.x, B.x) &&
           min(A.y, B.y) <= P.y && P.y <= max(A.y, B.y);
}

// Kiểm tra đoạn AB cắt đoạn CD không
bool segmentsIntersect(Point A, Point B, Point C, Point D) {
    double d1 = cross(B - A, C - A);
    double d2 = cross(B - A, D - A);
    double d3 = cross(D - C, A - C);
    double d4 = cross(D - C, B - C);
    
    // Nếu C và D nằm ở 2 phía khác nhau của AB,
    // VÀ A và B nằm ở 2 phía khác nhau của CD
    if (((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) &&
        ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0)))
        return true;
    
    // Trường hợp đặc biệt: các điểm thẳng hàng
    if (d1 == 0 && onSegment(A, B, C)) return true;
    if (d2 == 0 && onSegment(A, B, D)) return true;
    if (d3 == 0 && onSegment(C, D, A)) return true;
    if (d4 == 0 && onSegment(C, D, B)) return true;
    
    return false;
}
```
```python
def segments_intersect(A, B, C, D):
    d1 = cross((B[0]-A[0], B[1]-A[1]), (C[0]-A[0], C[1]-A[1]))
    d2 = cross((B[0]-A[0], B[1]-A[1]), (D[0]-A[0], D[1]-A[1]))
    d3 = cross((D[0]-C[0], D[1]-C[1]), (A[0]-C[0], A[1]-C[1]))
    d4 = cross((D[0]-C[0], D[1]-C[1]), (B[0]-C[0], B[1]-C[1]))
    
    if ((d1 > 0 and d2 < 0) or (d1 < 0 and d2 > 0)) and \
       ((d3 > 0 and d4 < 0) or (d3 < 0 and d4 > 0)):
        return True
    
    def on_segment(P, Q, R):
        return min(P[0], Q[0]) <= R[0] <= max(P[0], Q[0]) and \
               min(P[1], Q[1]) <= R[1] <= max(P[1], Q[1])
    
    if d1 == 0 and on_segment(A, B, C): return True
    if d2 == 0 and on_segment(A, B, D): return True
    if d3 == 0 and on_segment(C, D, A): return True
    if d4 == 0 and on_segment(C, D, B): return True
    return False
```

---

## 4. Kiểm tra điểm nằm trong đa giác (Point in Polygon)

### Bài toán

Cho đa giác lồi (hoặc không lồi) và 1 điểm P, kiểm tra P có nằm trong đa giác không.

### Phương pháp: Ray Casting (Tia đếm)

Vẽ 1 tia từ P ra vô cực. Đếm số lần tia cắt cạnh đa giác.

- Nếu **lẻ** → P nằm trong đa giác
- Nếu **chẵn** → P nằm ngoài đa giác

```cpp
// Kiểm tra điểm P có nằm trong đa giác không
// Đa giác có N đỉnh, được cho theo thứ tự (clockwise hoặc counterclockwise)
bool pointInPolygon(Point P, vector<Point>& polygon) {
    int n = polygon.size();
    bool inside = false;
    
    for (int i = 0, j = n - 1; i < n; j = i++) {
        Point A = polygon[i], B = polygon[j];
        
        // Kiểm tra tia ngang từ P sang phải có cắt cạnh AB không
        if (((A.y > P.y) != (B.y > P.y)) &&  // AB cắt tia ngang tại P
            (P.x < (B.x - A.x) * (P.y - A.y) / (B.y - A.y) + A.x))  // Giao điểm bên phải P
            inside = !inside;
    }
    return inside;
}
```

### Code Python

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

### Cho đa giác lồi - Dùng cross product nhanh hơn

Nếu đa giác lồi, ta có thể kiểm tra P nằm cùng "phía" với tất cả cạnh:

```cpp
bool pointInConvexPolygon(Point P, vector<Point>& polygon) {
    int n = polygon.size();
    for (int i = 0; i < n; i++) {
        int j = (i + 1) % n;
        if (cross(polygon[j] - polygon[i], P - polygon[i]) < 0)
            return false;  // P nằm ngoài cạnh ij
    }
    return true;
}
```

### Code Python

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

## 5. Diện tích đa giác

### Công thức Shoelace

Cho đa giác có N đỉnh (x₁,y₁), (x₂,y₂), ..., (xₙ,yₙ):

```
Diện tích = |Σ(xᵢ × yᵢ₊₁ - xᵢ₊₁ × yᵢ)| / 2
```

**Ẩn dụ:** Imagine "buộc dây" qua các đỉnh theo thứ tự, rồi "thắt" lại → diện tích bên trong!

```cpp
double polygonArea(vector<Point>& p) {
    int n = p.size();
    double area = 0;
    for (int i = 0; i < n; i++) {
        int j = (i + 1) % n;
        area += p[i].x * p[j].y;
        area -= p[j].x * p[i].y;
    }
    return abs(area) / 2.0;
}
```

### Diện tích tam giác

```cpp
// Cách 1: Dùng cross product
double triangleArea(Point A, Point B, Point C) {
    return abs(cross(B - A, C - A)) / 2.0;
}

// Cách 2: Dùng Heron (khi biết 3 cạnh)
double triangleAreaHeron(double a, double b, double c) {
    double s = (a + b + c) / 2;
    return sqrt(s * (s-a) * (s-b) * (s-c));
}
```

### Code Python

```python
def triangle_area(A, B, C):
    return abs(cross((B[0]-A[0], B[1]-A[1]), (C[0]-A[0], C[1]-A[1]))) / 2.0

def triangle_area_heron(a, b, c):
    s = (a + b + c) / 2
    return math.sqrt(s * (s-a) * (s-b) * (s-c))
```

---

## 6. Khoảng cách trong hình học

### Khoảng cách từ điểm đến đường thẳng

Cho đường thẳng đi qua A và B, khoảng cách từ P đến đường thẳng:

```cpp
double distPointToLine(Point P, Point A, Point B) {
    return abs(cross(B - A, P - A)) / distance(A, B);
}
```

### Code Python

```python
def dist_point_to_line(P, A, B):
    return abs(cross((B[0]-A[0], B[1]-A[1]), (P[0]-A[0], P[1]-A[1]))) / distance(A, B)
```

### Khoảng cách từ điểm đến đoạn thẳng

```cpp
double distPointToSegment(Point P, Point A, Point B) {
    double d2 = distSq(A, B);
    if (d2 == 0) return distance(P, A);  // A = B
    
    // Chiếu P lên đường thẳng AB
    double t = dot(P - A, B - A) / d2;
    t = max(0.0, min(1.0, t));  // Giới hạn trong đoạn AB
    
    Point projection = A + (B - A) * t;
    return distance(P, projection);
}
```

### Code Python

```python
def dist_point_to_segment(P, A, B):
    d2 = (A[0]-B[0])**2 + (A[1]-B[1])**2
    if d2 == 0: return distance(P, A)
    t = max(0, min(1, dot((P[0]-A[0], P[1]-A[1]), (B[0]-A[0], B[1]-A[1])) / d2))
    projection = (A[0] + (B[0]-A[0])*t, A[1] + (B[1]-A[1])*t)
    return distance(P, projection)
```

---

## 7. Code Python tổng hợp

```python
import math

class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __sub__(self, other):
        return Point(self.x - other.x, self.y - other.y)
    
    def __add__(self, other):
        return Point(self.x + other.x, self.y + other.y)

def dot(A, B):
    return A.x * B.x + A.y * B.y

def cross(A, B):
    return A.x * B.y - A.y * B.x

def distance(A, B):
    return math.sqrt((A.x - B.x)**2 + (A.y - B.y)**2)

def polygon_area(polygon):
    area = 0
    n = len(polygon)
    for i in range(n):
        j = (i + 1) % n
        area += polygon[i].x * polygon[j].y
        area -= polygon[j].x * polygon[i].y
    return abs(area) / 2.0

def segments_intersect(A, B, C, D):
    d1 = cross(B - A, C - A)
    d2 = cross(B - A, D - A)
    d3 = cross(D - C, A - C)
    d4 = cross(D - C, B - C)
    
    if ((d1 > 0 and d2 < 0) or (d1 < 0 and d2 > 0)) and \
       ((d3 > 0 and d4 < 0) or (d3 < 0 and d4 > 0)):
        return True
    return False
```

---

## 8. Lưu ý

- **Tràn số:** Dùng `double` hoặc `long long` tùy bài. Cross product với tọa độ nguyên → `long long`
- **So sánh số thực:** Không dùng `==`, dùng `abs(a - b) < epsilon` (epsilon = 1e-9)
- **Tích có hướng** rất quan trọng: kiểm tra hướng, kiểm tra điểm trong đa giác, bao lồi
- **Thứ tự đỉnh:** Đa giác cho theo CW hoặc CCW, ảnh hưởng dấu của cross product
- **Precision:** Hình học thường yêu cầu precision cao, cẩn thận với floating point

---

## 9. Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Point Location Test](https://cses.fi/problemset/task/2189) | CSES | ⭐⭐ | Cross product |
| [CSES - Line Segment Intersection](https://cses.fi/problemset/task/2190) | CSES | ⭐⭐⭐ | Đoạn thẳng cắt nhau |
| [CSES - Polygon Area](https://cses.fi/problemset/task/2191) | CSES | ⭐⭐ | Diện tích đa giác |
| [CF - Geometry problems](https://codeforces.com/problemset?tags=geometry) | CF | ⭐⭐-⭐⭐⭐ | Tổng hợp hình học |
| [VNOJ - VODIVIDING](https://oj.vnoi.info/problem/vodividing) | VNOJ | ⭐⭐⭐ | Geometry |
| [CSES - Convex Hull](https://cses.fi/problemset/task/2195) | CSES | ⭐⭐⭐ | Bao lồi |
| [CSES - Maximum Manhattan Distances](https://cses.fi/problemset/task/2194) | CSES | ⭐⭐ | Khoảng cách |

## Bài viết liên quan

- [Bài 28: Bao lồi](28-bao-loi.md)

## Tài liệu tham khảo

- [VNOI Wiki - Hình học tính toán](https://wiki.vnoi.info/algo/geometry/basic-geometry-1)
- [CP-Algorithms - Geometry](https://cp-algorithms.com/geometry/basic-geometry.html)
- [Topcoder - Geometry Concepts](https://www.topcoder.com/thrive/articles/Geometry%20Concepts)
- [USACO Guide - Geometry](https://usaco.guide/adv/geo)
- [YouTube - Geometry for CP (Errichto)](https://www.youtube.com/watch?v=OMmPGgKdWQc)

**Bài tiếp theo:** [Stack Nâng Cao →](24-stack-nang-cao.md)
