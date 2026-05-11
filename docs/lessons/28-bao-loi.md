# Bài 28: Bao Lồi (Convex Hull)

> **Tác giả:** Hà Trí Kiên
> **Nội dung tham khảo từ:** VNOI Wiki - Bao lồi

## 1. Bao lồi là gì?

### Ẩn dụ: Bọc kẹo

Bạn có N viên kẹo rải trên bàn. Lấy 1 sợi dây thun bọc quanh tất cả. Đường dây tạo thành **bao lồi**!

**Bao lồi** = đa giác lồi nhỏ nhất chứa tất cả các điểm đã cho.

```
    *   *
   * * *
    * *    ← Bao lồi bọc quanh
     *
```

---

## 2. Thuật toán Graham Scan

### Ý tưởng

1. Chọn điểm **trái nhất** (y nhỏ nhất, x nhỏ nhất) làm gốc
2. Sắp xếp các điểm còn lại theo **góc** so với gốc
3. Duyệt, giữ lại chỉ các điểm tạo thành **quay trái** (counter-clockwise)

### Code C++

```cpp
struct Point {
    long long x, y;
    bool operator<(const Point& other) const {
        return x < other.x || (x == other.x && y < other.y);
    }
};

// Tích có hướng: >0 = quay trái, =0 = thẳng hàng, <0 = quay phải
long long cross(Point O, Point A, Point B) {
    return (A.x - O.x) * (B.y - O.y) - (A.y - O.y) * (B.x - O.x);
}

// Bao lồi - Andrew's Monotone Chain - O(N log N)
vector<Point> convexHull(vector<Point>& points) {
    int n = points.size();
    if (n <= 1) return points;
    
    sort(points.begin(), points.end());
    vector<Point> hull;
    
    // Nửa dưới
    for (int i = 0; i < n; i++) {
        while (hull.size() >= 2 && 
               cross(hull[hull.size()-2], hull[hull.size()-1], points[i]) <= 0)
            hull.pop_back();
        hull.push_back(points[i]);
    }
    
    // Nửa trên
    int lowerSize = hull.size();
    for (int i = n - 2; i >= 0; i--) {
        while (hull.size() > lowerSize && 
               cross(hull[hull.size()-2], hull[hull.size()-1], points[i]) <= 0)
            hull.pop_back();
        hull.push_back(points[i]);
    }
    
    hull.pop_back();  // Bỏ điểm trùng
    return hull;
}

// Diện tích bao lồi (công thức Shoelace)
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

### Code Python

```python
def cross(O, A, B):
    return (A[0] - O[0]) * (B[1] - O[1]) - (A[1] - O[1]) * (B[0] - O[0])

def convex_hull(points):
    points = sorted(points)
    if len(points) <= 1:
        return points
    lower = []
    for p in points:
        while len(lower) >= 2 and cross(lower[-2], lower[-1], p) <= 0:
            lower.pop()
        lower.append(p)
    upper = []
    for p in reversed(points):
        while len(upper) >= 2 and cross(upper[-2], upper[-1], p) <= 0:
            upper.pop()
        upper.append(p)
    return lower[:-1] + upper[:-1]

def polygon_area(hull):
    area = 0
    n = len(hull)
    for i in range(n):
        j = (i + 1) % n
        area += hull[i][0] * hull[j][1]
        area -= hull[j][0] * hull[i][1]
    return abs(area) / 2.0
```

---

## 3. Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [SPOJ - BSHEEP](https://www.spoj.com/problems/BSHEEP/) | SPOJ | ⭐⭐⭐ | Bao lồi |
| [CSES - Convex Hull](https://cses.fi/problemset/task/2195) | CSES | ⭐⭐⭐ | Bao lồi cơ bản |
| [CF - Convex Hull](https://codeforces.com/) | CF | ⭐⭐⭐ | Bao lồi + tìm kiếm |
| [Kattis - Convex Hull](https://open.kattis.com/problems/convexhull) | Kattis | ⭐⭐⭐ | Bao lồi |

## Bài viết liên quan

- [Bài 22: Hình học cơ bản](22-hinh-hoc-co-ban.md)

## Tài liệu tham khảo

- [VNOI Wiki - Bao lồi](https://vnoi.info/translate/wcipeg/Convex-Hull)
- [VNOI Wiki - Giải thích trực quan về bao lồi](https://vnoi.info/translate/wcipeg/Bao-lồi)
- [CP-Algorithms - Convex Hull](https://cp-algorithms.com/geometry/convex-hull.html)
- [GeeksforGeeks - Convex Hull](https://www.geeksforgeeks.org/dsa/convex-hull-set-1-jarviss-algorithm-or-wrapping/)
