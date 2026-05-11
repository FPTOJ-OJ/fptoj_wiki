# Bài 22: Hình Học Cơ Bản

> **Tác giả:** Hà Trí Kiên
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

Ý nghĩa:
- A · B > 0: góc nhọn (< 90°)
- A · B = 0: vuông góc (90°)
- A · B < 0: góc tù (> 90°)
```

### Tích có hướng (Cross Product)

```
A × B = A.x × B.y - A.y × B.x

Ý nghĩa:
- A × B > 0: B nằm bên trái A (quay ngược chiều kim đồng hồ)
- A × B = 0: A và B thẳng hàng
- A × B < 0: B nằm bên phải A (quay theo chiều kim đồng hồ)
```

### Code C++

```cpp
struct Point {
    double x, y;
    Point operator-(const Point& other) const {
        return {x - other.x, y - other.y};
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
```

---

## 3. Kiểm tra điểm nằm trong/t ngoài đa giác

### Cross Product để xác định hướng

Cho 3 điểm A, B, C. `cross(B-A, C-A)` cho biết C nằm bên trái hay bên phải đường thẳng AB.

### Kiểm tra 2 đoạn thẳng cắt nhau

```cpp
// Kiểm tra đoạn AB cắt đoạn CD không
bool segmentsIntersect(Point A, Point B, Point C, Point D) {
    double d1 = cross(B - A, C - A);
    double d2 = cross(B - A, D - A);
    double d3 = cross(D - C, A - C);
    double d4 = cross(D - C, B - C);
    
    if (((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) &&
        ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0)))
        return true;
    
    return false;
}
```

---

## 4. Diện tích đa giác

### Công thức Shoelace

Cho đa giác có N đỉnh (x₁,y₁), (x₂,y₂), ..., (xₙ,yₙ):

```
Diện tích = |Σ(xᵢ × yᵢ₊₁ - xᵢ₊₁ × yᵢ)| / 2
```

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

---

## 5. Lưu ý

- **Tràn số:** Dùng `double` hoặc `long long` tùy bài
- **So sánh số thực:** Không dùng `==`, dùng `abs(a - b) < epsilon`
- **Tích có hướng** rất quan trọng: kiểm tra hướng, kiểm tra điểm trong đa giác, bao lồi

---

---

## Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Point Location Test](https://cses.fi/problemset/task/2189) | CSES | ⭐⭐ | Cross product |
| [CSES - Line Segment Intersection](https://cses.fi/problemset/task/2190) | CSES | ⭐⭐⭐ | Đoạn thẳng cắt nhau |
| [CSES - Polygon Area](https://cses.fi/problemset/task/2191) | CSES | ⭐⭐ | Diện tích đa giác |
| [CF - Geometry problems](https://codeforces.com/problemset?tags=geometry) | CF | ⭐⭐-⭐⭐⭐ | Tổng hợp hình học |

## Bài viết liên quan

- [Bài 28: Bao lồi](28-bao-loi.md)

## Tài liệu tham khảo

- [VNOI Wiki - Hình học tính toán](https://wiki.vnoi.info/algo/geometry/basic-geometry-1)
- [CP-Algorithms - Geometry](https://cp-algorithms.com/geometry/basic-geometry.html)
- [Topcoder - Geometry Concepts](https://www.topcoder.com/thrive/articles/Geometry%20Concepts)
- [USACO Guide - Geometry](https://usaco.guide/adv/geo)
- [YouTube - Geometry for CP (Errichto)](https://www.youtube.com/watch?v=OMmPGgKdWQc)

**Bài tiếp theo:** [Floyd-Warshall & Bellman-Ford →](23-floyd-warshall-bellman-ford.md)
