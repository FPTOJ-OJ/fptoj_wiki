# Bài 55: Ternary Search - Tìm kiếm tam phân!

> **Tác giả:** FPTOJ Wiki<br>
> **Nội dung tham khảo từ:** CP-Algorithms, e-maxx

---

## Bạn sẽ học được gì?
- Ternary Search trên hàm unimodal (đơn đỉnh)
- Tìm max/min của hàm lõm/lồi trong O(log N)
- Ứng dụng: tối ưu hàm bậc 2, tìm đỉnh parabol
- Ternary Search trên miền nghiệm (answer space)
- Mở rộng sang 2D Ternary Search

---

## 1. Giới thiệu

### Ẩn dụ: Tìm đỉnh núi

Giả sử bạn đang đứng trước một dãy núi mù sương. Bạn muốn tìm **đỉnh cao nhất** nhưng chỉ có thể đo độ cao tại một số điểm. Nếu bạn chia dãy núi thành 3 phần bằng nhau và đo tại 2 điểm m1, m2:

- Nếu `độ_cao(m1) < độ_cao(m2)` → đỉnh phải nằm ở **phần bên phải** (từ m1 trở đi)
- Nếu `độ_cao(m1) > độ_cao(m2)` → đỉnh phải nằm ở **phần bên trái** (đến m2)
- Nếu bằng nhau → đỉnh nằm ở giữa

Cứ mỗi bước, bạn loại bỏ được **1/3** phạm vi tìm kiếm!

### Hàm Unimodal (Đơn đỉnh)

Một hàm được gọi là **unimodal** nếu nó chỉ có **một đỉnh** duy nhất:

```
Hàm đơn đỉnh (đơn mode):

    f(x)                ╭──╮
     ↑                 ╭╯    ╰╮        ← Hàm lồi (concave down)
     │               ╭╯        ╰╮         có 1 đỉnh MAX
     │             ╭╯            ╰╮
     │           ╭╯                ╰╮
     │         ╭╯                    ╰╮
     └─────────╯──────────────────────╰──→ x

    f(x)
     ↑╲                          ╱
     │  ╲                      ╱
     │    ╲                  ╱          ← Hàm lõm (concave up)
     │      ╲              ╱               có 1 đáy MIN
     │        ╲          ╱
     │          ╲      ╱
     │            ╲──╱
     └──────────────────────────────────→ x
```

**Định nghĩa chính xác:**
- Hàm **đơn đỉnh tăng rồi giảm** (unimodal): ∃ đỉnh c sao cho f tăng liên tục trên [l, c] và giảm liên tục trên [c, r]
- Hàm **đơn đỉnh giảm rồi tăng**: ∃ đáy c sao cho f giảm liên tục trên [l, c] và tăng liên tục trên [c, r]

### Tại sao không dùng Binary Search?

| Tính chất | Binary Search | Ternary Search |
|-----------|--------------|----------------|
| Yêu cầu | Hàm **monotonic** (đơn điệu) | Hàm **unimodal** (đơn đỉnh) |
| Kiểu | Tìm vị trí trong mảng sorted | Tìm max/min của hàm |
| Độ phức tạp | O(log₂ N) | O(log₁.₅ N) ≈ O(1.585 · log₂ N) |

**Lưu ý:** Ternary Search mỗi lần lặp gọi f 2 lần, nên tổng số lần đánh giá là O(2 · log₁.₅ N). So với Binary Search (1 lần/lặp), hiệu suất thực tế gần tương đương.

---

## 2. Thuật toán Ternary Search

### Ý tưởng cốt lõi

Cho hàm unimodal `f(x)` trên đoạn `[l, r]`, muốn tìm `x` sao cho `f(x)` đạt giá trị lớn nhất.

```
Bước 1: Chia [l, r] thành 3 phần bằng nhau

    l         m1        m2         r
    ├─────────┼─────────┼─────────┤
    │  Phần 1 │  Phần 2 │  Phần 3 │

Bước 2: So sánh f(m1) và f(m2)

    Nếu f(m1) < f(m2):
        → Đỉnh KHÔNG thể nằm trong Phần 1
        → Thu hẹp: [l, r] = [m1, r]

    Nếu f(m1) > f(m2):
        → Đỉnh KHÔNG thể nằm trong Phần 3
        → Thu hẹp: [l, r] = [l, m2]

    Nếu f(m1) = f(m2):
        → Đỉnh nằm trong Phần 2
        → Thu hẹp: [l, r] = [m1, m2]

Bước 3: Lặp lại cho đến khi đoạn [l, r] đủ nhỏ
```

### Minh họa từng bước

```
Giả sử tìm MAX của hàm trên đoạn [0, 9]:

Lần 1:  l=0, r=9
         m1=3, m2=6
         f(3)=7, f(6)=9
         f(3) < f(6) → loại [0, 3)
         → [l, r] = [3, 9]

    0   1   2  [3   4   5  [6   7   8   9]
                ↑           ↑
               m1          m2
    ├───────────┤───────────┤───────────┤
    │  LOẠI    │           │           │

Lần 2:  l=3, r=9
         m1=5, m2=7
         f(5)=8, f(7)=8.5
         f(5) < f(7) → loại [3, 5)
         → [l, r] = [5, 9]

    3   4  [5   6  [7   8   9]
            ↑       ↑
           m1      m2
    ├───────┤───────┤───────┤
    │ LOẠI │       │       │

Lần 3:  l=5, r=9
         m1=6.33, m2=7.67
         ... tiếp tục thu hẹp

    Sau O(log_{1.5}(range)) lần → tìm được xấp xỉ đỉnh
```

### Code C++

```cpp
#include <bits/stdc++.h>
using namespace std;

// Hàm unimodal mẫu: f(x) = -(x-3)^2 + 10
// Đỉnh tại x = 3, f(3) = 10
double f(double x) {
    return -(x - 3) * (x - 3) + 10;
}

// Tìm x sao cho f(x) đạt MAX trên [l, r]
double ternary_search_max(double l, double r) {
    // Lặp đủ số lần để đảm bảo precision
    // Mỗi lần thu hẹp 2/3, sau k lần còn (2/3)^k
    // 200 lần là đủ cho double precision
    for (int iter = 0; iter < 200; iter++) {
        double m1 = l + (r - l) / 3.0;
        double m2 = r - (r - l) / 3.0;
        if (f(m1) < f(m2)) {
            l = m1;  // Đỉnh ở bên phải
        } else {
            r = m2;  // Đỉnh ở bên trái
        }
    }
    return (l + r) / 2.0;
}

// Tìm x sao cho f(x) đạt MIN trên [l, r]
double ternary_search_min(double l, double r) {
    for (int iter = 0; iter < 200; iter++) {
        double m1 = l + (r - l) / 3.0;
        double m2 = r - (r - l) / 3.0;
        if (f(m1) > f(m2)) {
            l = m1;  // Đỉnh (đáy) ở bên phải
        } else {
            r = m2;  // Đỉnh (đáy) ở bên trái
        }
    }
    return (l + r) / 2.0;
}

int main() {
    double x_max = ternary_search_max(0.0, 10.0);
    printf("MAX tại x = %.6f, f(x) = %.6f\n", x_max, f(x_max));
    // Output: MAX tại x = 3.000000, f(x) = 10.000000
    return 0;
}
```

### Code Python

```python
def f(x):
    """Hàm unimodal mẫu: f(x) = -(x-3)^2 + 10"""
    return -(x - 3) ** 2 + 10

def ternary_search_max(l, r):
    """Tìm x sao cho f(x) đạt MAX trên [l, r]"""
    for _ in range(200):
        m1 = l + (r - l) / 3.0
        m2 = r - (r - l) / 3.0
        if f(m1) < f(m2):
            l = m1
        else:
            r = m2
    return (l + r) / 2.0

def ternary_search_min(l, r):
    """Tìm x sao cho f(x) đạt MIN trên [l, r]"""
    for _ in range(200):
        m1 = l + (r - l) / 3.0
        m2 = r - (r - l) / 3.0
        if f(m1) > f(m2):
            l = m1
        else:
            r = m2
    return (l + r) / 2.0

x_max = ternary_search_max(0.0, 10.0)
print(f"MAX tai x = {x_max:.6f}, f(x) = {f(x_max):.6f}")
# Output: MAX tai x = 3.000000, f(x) = 10.000000
```

### Độ phức tạp

| Yếu tố | Giá trị |
|---------|---------|
| Số lần lặp | O(log₁.₅(r - l)) cho liên tục, O(log₁.₅ N) cho nguyên |
| Mỗi lần lặp | O(1) (tính f 2 lần) |
| **Tổng** | **O(log₁.₅ N)** ≈ O(1.585 · log₂ N) |

---

## 3. Ternary Search trên số nguyên

Khi `x` chỉ nhận giá trị **nguyên**, ta không thể chia chính xác thành 3 phần. Cần xử lý đặc biệt.

### Vấn đề với số nguyên

```
Đoạn [0, 10]:
    m1 = 0 + (10-0)/3 = 3
    m2 = 10 - (10-0)/3 = 6

Đoạn [3, 6]:
    m1 = 3 + (6-3)/3 = 4
    m2 = 6 - (6-3)/3 = 5

Đoạn [4, 5]:
    m1 = 4 + (5-4)/3 = 4   ← m1 = m2 = 4! Vòng lặp vô hạn!
    m2 = 5 - (5-4)/3 = 4
```

### Giải pháp: Dừng sớm + Brute Force

Khi `r - l <= 3`, duyệt tất cả các phần tử còn lại để tìm đáp án.

### Code C++

```cpp
#include <bits/stdc++.h>
using namespace std;

// Hàm unimodal trên số nguyên
int f(int x) {
    // Ví dụ: f(x) = -(x-5)^2 + 20, đỉnh tại x=5
    return -(x - 5) * (x - 5) + 20;
}

// Tìm x nguyên sao cho f(x) đạt MAX trên [l, r]
int ternary_search_max_int(int l, int r) {
    while (r - l > 3) {
        int m1 = l + (r - l) / 3;
        int m2 = r - (r - l) / 3;
        if (f(m1) < f(m2)) {
            l = m1;
        } else {
            r = m2;
        }
    }
    // Brute force trên đoạn còn lại [l, r]
    int best_x = l;
    for (int i = l + 1; i <= r; i++) {
        if (f(i) > f(best_x)) {
            best_x = i;
        }
    }
    return best_x;
}

// Tìm x nguyên sao cho f(x) đạt MIN trên [l, r]
int ternary_search_min_int(int l, int r) {
    while (r - l > 3) {
        int m1 = l + (r - l) / 3;
        int m2 = r - (r - l) / 3;
        if (f(m1) > f(m2)) {
            l = m1;
        } else {
            r = m2;
        }
    }
    int best_x = l;
    for (int i = l + 1; i <= r; i++) {
        if (f(i) < f(best_x)) {
            best_x = i;
        }
    }
    return best_x;
}

int main() {
    int x = ternary_search_max_int(0, 100);
    cout << "MAX tai x = " << x << ", f(x) = " << f(x) << "\n";
    // Output: MAX tai x = 5, f(x) = 20
    return 0;
}
```

### Code Python

```python
def f(x):
    """Hàm unimodal trên số nguyên"""
    return -(x - 5) ** 2 + 20

def ternary_search_max_int(l, r):
    """Tìm x nguyên sao cho f(x) đạt MAX trên [l, r]"""
    while r - l > 3:
        m1 = l + (r - l) // 3
        m2 = r - (r - l) // 3
        if f(m1) < f(m2):
            l = m1
        else:
            r = m2
    # Brute force
    best_x = l
    for i in range(l + 1, r + 1):
        if f(i) > f(best_x):
            best_x = i
    return best_x

def ternary_search_min_int(l, r):
    """Tìm x nguyên sao cho f(x) đạt MIN trên [l, r]"""
    while r - l > 3:
        m1 = l + (r - l) // 3
        m2 = r - (r - l) // 3
        if f(m1) > f(m2):
            l = m1
        else:
            r = m2
    best_x = l
    for i in range(l + 1, r + 1):
        if f(i) < f(best_x):
            best_x = i
    return best_x

x = ternary_search_max_int(0, 100)
print(f"MAX tai x = {x}, f(x) = {f(x)}")
# Output: MAX tai x = 5, f(x) = 20
```

### Tóm tắt Integer Ternary Search

```
┌─────────────────────────────────────────────────────┐
│           INTEGER TERNARY SEARCH                     │
├─────────────────────────────────────────────────────┤
│  while r - l > 3:                                   │
│      m1 = l + (r-l)/3                              │
│      m2 = r - (r-l)/3                              │
│      so sánh f(m1), f(m2) → loại 1/3              │
│                                                      │
│  brute force [l, r] (tối đa 4 phần tử)            │
└─────────────────────────────────────────────────────┘
```

---

## 4. Ví dụ 1: Tìm cực trị hàm bậc 2

### Đề bài

Cho hàm `f(x) = -x² + 6x + 5`. Tìm giá trị `x` (thực) sao cho `f(x)` đạt giá trị lớn nhất.

### Nhận xét

Đây là hàm bậc 2 với hệ số âm (-1) trước x² → **hàm lồi**, có đỉnh parabol.

Đỉnh parabol: `x = -b/(2a) = -6/(2·(-1)) = 3`

`f(3) = -9 + 18 + 5 = 14`

### Ternary Search Step-by-Step

```
f(x) = -x² + 6x + 5

    f(x)
  14 ┤         ╭───╮
     │       ╭╯     ╰╮
  12 ┤     ╭╯         ╰╮
     │   ╭╯             ╰╮
  10 ┤  ╭╯                ╰╮
     │╭╯                    ╰╮
   8 ┤╯                       ╰╮
     │                          ╰╮
   6 ┤                            ╰╮
     │                              ╰
   4 ┤
     └──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──→ x
        0  1  2  3  4  5  6  7  8  9  10

Ternary Search trên [0, 10]:

Lần 1: m1 = 0 + 10/3 ≈ 3.33
        m2 = 10 - 10/3 ≈ 6.67
        f(3.33) = -11.09 + 19.98 + 5 = 13.89
        f(6.67) = -44.49 + 40.02 + 5 = 0.53
        f(m1) > f(m2) → r = 6.67
        → [0, 6.67]

Lần 2: m1 = 0 + 6.67/3 ≈ 2.22
        m2 = 6.67 - 6.67/3 ≈ 4.45
        f(2.22) = -4.93 + 13.32 + 5 = 13.39
        f(4.45) = -19.80 + 26.70 + 5 = 11.90
        f(m1) > f(m2) → r = 4.45
        → [0, 4.45]

Lần 3: m1 ≈ 1.48, m2 ≈ 2.97
        f(1.48) = -2.19 + 8.88 + 5 = 11.69
        f(2.97) = -8.82 + 17.82 + 5 = 14.00
        f(m1) < f(m2) → l = 1.48
        → [1.48, 4.45]

... tiếp tục hội tụ về x = 3.0

Sau ~100 lần: x ≈ 3.000000, f(x) ≈ 14.000000 ✓
```

### Code đầy đủ

=== "C++"

```cpp
#include <bits/stdc++.h>
using namespace std;

double f(double x) {
    return -x * x + 6 * x + 5;
}

int main() {
    double l = 0.0, r = 10.0;
    for (int iter = 0; iter < 200; iter++) {
        double m1 = l + (r - l) / 3.0;
        double m2 = r - (r - l) / 3.0;
        if (f(m1) < f(m2)) {
            l = m1;
        } else {
            r = m2;
        }
    }
    double x = (l + r) / 2.0;
    printf("x = %.6f, f(x) = %.6f\n", x, f(x));
    // Output: x = 3.000000, f(x) = 14.000000
    return 0;
}
```

=== "Python"

```python
def f(x):
    return -x ** 2 + 6 * x + 5

l, r = 0.0, 10.0
for _ in range(200):
    m1 = l + (r - l) / 3.0
    m2 = r - (r - l) / 3.0
    if f(m1) < f(m2):
        l = m1
    else:
        r = m2

x = (l + r) / 2.0
print(f"x = {x:.6f}, f(x) = {f(x):.6f}")
# Output: x = 3.000000, f(x) = 14.000000
```

---

## 5. Ví dụ 2: Tìm hàm cực tiểu (Minimize)

### Khi nào dùng Ternary Search cho Minimization?

Khi hàm là **đơn đỉnh giảm rồi tăng** (hàm lõm), ta tìm **giá trị nhỏ nhất**.

```
    f(x)
     │╲                          ╱
     │  ╲                      ╱
     │    ╲                  ╱
     │      ╲    MIN       ╱
     │        ╲  ╱╲      ╱
     │          ╲╱    ╲╱
     └──────────────────────────────→ x
              ↑
           tìm điểm này
```

### Bài toán mẫu

Cho N điểm trên đường thẳng có tọa độ `x₁, x₂, ..., xₙ`. Tìm điểm `p` sao cho **tổng khoảng cách** từ `p` đến tất cả các điểm là nhỏ nhất.

`f(p) = Σ|p - xᵢ|`

**Nhận xét:** Hàm `f(p)` là hàm lõm (piecewise linear, giảm rồi tăng) → dùng Ternary Search được!

### Code

=== "C++"

```cpp
#include <bits/stdc++.h>
using namespace std;

int n;
vector<double> a;

// Tổng khoảng cách từ p đến tất cả các điểm
double f(double p) {
    double sum = 0;
    for (int i = 0; i < n; i++) {
        sum += abs(a[i] - p);
    }
    return sum;
}

int main() {
    cin >> n;
    a.resize(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    double l = *min_element(a.begin(), a.end());
    double r = *max_element(a.begin(), a.end());

    for (int iter = 0; iter < 200; iter++) {
        double m1 = l + (r - l) / 3.0;
        double m2 = r - (r - l) / 3.0;
        if (f(m1) > f(m2)) {  // Tìm MIN nên đảo dấu
            l = m1;
        } else {
            r = m2;
        }
    }

    double p = (l + r) / 2.0;
    printf("Diem toi uu: %.6f\n", p);
    printf("Tong khoang cach: %.6f\n", f(p));
    return 0;
}
```

=== "Python"

```python
def solve():
    n = int(input())
    a = list(map(float, input().split()))

    def f(p):
        return sum(abs(x - p) for x in a)

    l, r = min(a), max(a)
    for _ in range(200):
        m1 = l + (r - l) / 3.0
        m2 = r - (r - l) / 3.0
        if f(m1) > f(m2):
            l = m1
        else:
            r = m2

    p = (l + r) / 2.0
    print(f"Diem toi uu: {p:.6f}")
    print(f"Tong khoang cach: {f(p):.6f}")

solve()
```

---

## 6. Ternary Search trên miền nghiệm (Answer Space)

### Tư tưởng

Thay vì tìm `x` tối ưu trên một hàm liên tục, ta **tìm nghiệm** trên một **miền giá trị** (answer space) mà tại đó một điều kiện nào đó thỏa mãn, và hàm kiểm tra là **unimodal**.

### Bài toán mẫu: Chi phí vận chuyển

Có N kho hàng trên đường thẳng tại vị trí `xᵢ`. Muốn xây **1 nhà máy** tại vị trí `p` sao cho:
- Tổng chi phí vận chuyển = Σ wᵢ · |p - xᵢ| là **nhỏ nhất**
- Trong đó `wᵢ` là số lượng hàng tại kho thứ i

Hàm `f(p) = Σ wᵢ · |p - xᵢ|` vẫn là hàm lõm → Ternary Search!

### Code

=== "C++"

```cpp
#include <bits/stdc++.h>
using namespace std;

int n;
vector<double> pos, weight;

double f(double p) {
    double cost = 0;
    for (int i = 0; i < n; i++) {
        cost += weight[i] * abs(pos[i] - p);
    }
    return cost;
}

int main() {
    cin >> n;
    pos.resize(n);
    weight.resize(n);
    for (int i = 0; i < n; i++) {
        cin >> pos[i] >> weight[i];
    }

    double l = *min_element(pos.begin(), pos.end());
    double r = *max_element(pos.begin(), pos.end());

    for (int iter = 0; iter < 200; iter++) {
        double m1 = l + (r - l) / 3.0;
        double m2 = r - (r - l) / 3.0;
        if (f(m1) > f(m2)) {
            l = m1;
        } else {
            r = m2;
        }
    }

    printf("Vi tri toi uu: %.6f\n", (l + r) / 2.0);
    printf("Chi phi: %.6f\n", f((l + r) / 2.0));
    return 0;
}
```

=== "Python"

```python
def solve():
    n = int(input())
    pos = []
    weight = []
    for _ in range(n):
        p, w = map(float, input().split())
        pos.append(p)
        weight.append(w)

    def f(p):
        return sum(w * abs(x - p) for x, w in zip(pos, weight))

    l, r = min(pos), max(pos)
    for _ in range(200):
        m1 = l + (r - l) / 3.0
        m2 = r - (r - l) / 3.0
        if f(m1) > f(m2):
            l = m1
        else:
            r = m2

    p = (l + r) / 2.0
    print(f"Vi tri toi uu: {p:.6f}")
    print(f"Chi phi: {f(p):.6f}")

solve()
```

### Bài toán mẫu: Tìm điểm gần nhất

**Bài toán:** Cho N điểm trong mặt phẳng. Cho 1 điểm truy vấn Q. Tìm điểm trong tập N điểm sao cho **tổng bình phương khoảng cách** từ điểm đó đến tất cả N điểm là nhỏ nhất.

`f(x, y) = Σ ((x - xᵢ)² + (y - yᵢ)²)`

Hàm này là **unimodal** trong cả x và y → dùng Ternary Search 2D!

---

## 7. Ternary Search 2D

### Tư tưởng

Khi hàm `f(x, y)` là unimodal trong cả hai biến, ta có thể **lồng 2 vòng Ternary Search**:

```
Ternary Search trên x:
    Với mỗi x, dùng Ternary Search để tìm y tốt nhất
    → f(x) = min_y f(x, y) cũng là unimodal
    → Ternary Search trên f(x) để tìm x tốt nhất
```

### Code C++

```cpp
#include <bits/stdc++.h>
using namespace std;

// Hàm 2D unimodal mẫu
// f(x,y) = -(x-2)^2 - (y-3)^2 + 10
// Đỉnh tại (2, 3), f(2,3) = 10
double f(double x, double y) {
    return -(x - 2) * (x - 2) - (y - 3) * (y - 3) + 10;
}

// Ternary Search trên y cho x cố định
double ternary_search_y(double x, double ly, double ry) {
    for (int iter = 0; iter < 200; iter++) {
        double m1 = ly + (ry - ly) / 3.0;
        double m2 = ry - (ry - ly) / 3.0;
        if (f(x, m1) < f(x, m2)) {
            ly = m1;
        } else {
            ry = m2;
        }
    }
    return (ly + ry) / 2.0;
}

// Ternary Search 2D
pair<double, double> ternary_search_2d(
    double lx, double rx, double ly, double ry
) {
    for (int iter = 0; iter < 200; iter++) {
        double x1 = lx + (rx - lx) / 3.0;
        double x2 = rx - (rx - lx) / 3.0;

        // Tìm y tốt nhất cho x1 và x2
        double y1 = ternary_search_y(x1, ly, ry);
        double y2 = ternary_search_y(x2, ly, ry);

        if (f(x1, y1) < f(x2, y2)) {
            lx = x1;
        } else {
            rx = x2;
        }
    }
    double best_x = (lx + rx) / 2.0;
    double best_y = ternary_search_y(best_x, ly, ry);
    return {best_x, best_y};
}

int main() {
    auto [x, y] = ternary_search_2d(-10, 10, -10, 10);
    printf("MAX tai (%.6f, %.6f), f = %.6f\n", x, y, f(x, y));
    // Output: MAX tai (2.000000, 3.000000), f = 10.000000
    return 0;
}
```

### Code Python

```python
def f(x, y):
    """Hàm 2D unimodal mẫu"""
    return -(x - 2) ** 2 - (y - 3) ** 2 + 10

def ternary_search_y(x, ly, ry):
    """Ternary Search trên y cho x cố định"""
    for _ in range(200):
        m1 = ly + (ry - ly) / 3.0
        m2 = ry - (ry - ly) / 3.0
        if f(x, m1) < f(x, m2):
            ly = m1
        else:
            ry = m2
    return (ly + ry) / 2.0

def ternary_search_2d(lx, rx, ly, ry):
    """Ternary Search 2D"""
    for _ in range(200):
        x1 = lx + (rx - lx) / 3.0
        x2 = rx - (rx - lx) / 3.0
        y1 = ternary_search_y(x1, ly, ry)
        y2 = ternary_search_y(x2, ly, ry)
        if f(x1, y1) < f(x2, y2):
            lx = x1
        else:
            rx = x2
    best_x = (lx + rx) / 2.0
    best_y = ternary_search_y(best_x, ly, ry)
    return best_x, best_y

x, y = ternary_search_2d(-10, 10, -10, 10)
print(f"MAX tai ({x:.6f}, {y:.6f}), f = {f(x, y):.6f}")
# Output: MAX tai (2.000000, 3.000000), f = 10.000000
```

### Độ phức tạp 2D

| Yếu tố | Giá trị |
|---------|---------|
| Outer loop | O(log₁.₅(range_x)) |
| Inner loop (mỗi lần outer) | O(log₁.₅(range_y)) |
| **Tổng** | **O(log₁.₅(range_x) · log₁.₅(range_y))** |

---

## 8. Các lỗi thường gặp

### Lỗi 1: Nhầm Unimodal với Monotonic

```
HÀM MONOTONIC (đơn điệu - dùng Binary Search):
    f(x) = 2x + 3
    f(x)
     │        ╱
     │      ╱
     │    ╱
     │  ╱
     │╱
     └──────────→ x
    Luôn tăng → dùng Binary Search!

HÀM UNIMODAL (đơn đỉnh - dùng Ternary Search):
    f(x) = -x² + 4x
    f(x)
     │    ╭╮
     │  ╭╯  ╰╮
     │╭╯      ╰╮
     │╯         ╰╮
     └──────────────→ x
    Tăng rồi giảm → dùng Ternary Search!
```

**Quy tắc:**
- Hàm **monotonic** (tăng/giảm liên tục) → **Binary Search**
- Hàm **unimodal** (1 đỉnh/đáy) → **Ternary Search**
- Hàm **không xác định** → không dùng được cả hai!

### Lỗi 2: Integer Overflow khi tính m1, m2

```cpp
// SAI: có thể overflow
int m1 = l + (r - l) / 3;  // OK nếu l, r là int

// SAI với long long
long long m1 = l + (r - l) / 3;  // (r-l) có thể > 2^31

// ĐÚNG: kiểm tra kiểu dữ liệu
long long m1 = l + (r - l) / 3LL;
long long m2 = r - (r - l) / 3LL;
```

### Lỗi 3: Dừng quá sớm với Floating Point

```cpp
// SAI: so sánh trực tiếp với epsilon
while (r - l > 1e-9) { ... }  // Có thể không dừng!

// ĐÚNG: lặp số lần cố định
for (int iter = 0; iter < 200; iter++) { ... }
```

**Giải thích:** Với double (khoảng 15-16 chữ số thập phân), 200 lần lặp là đủ vì `(2/3)^200 ≈ 10^(-35)`.

### Lỗi 4: Hàm không thực sự Unimodal

```
Hàm có NHIỀU đỉnh (không unimodal):

    f(x)
     │  ╭╮    ╭╮
     │╭╯  ╰╮╭╯  ╰╮
     │╯     ╰╯     ╰╮
     └──────────────────→ x

    → Ternary Search có thể bỏ qua đỉnh thực sự!
```

**Cách kiểm tra:** Đạo hàm `f'(x)` đổi dấu **đúng 1 lần** trên miền tìm kiếm.

### Lỗi 5: Quên Brute Force với Integer Ternary Search

```cpp
// SAI: không brute force khi r-l <= 3
while (r - l > 3) {
    // ... ternary search
}
// Kết quả: có thể sai vì chưa kiểm tra hết!

// ĐÚNG: brute force phần còn lại
while (r - l > 3) {
    // ... ternary search
}
int best = l;
for (int i = l + 1; i <= r; i++) {
    if (f(i) > f(best)) best = i;
}
```

### Bảng tổng hợp lỗi

| Lỗi | Hậu quả | Cách sửa |
|-----|---------|----------|
| Nhầm monotonic với unimodal | Sai hoàn toàn | Kiểm tra tính chất hàm |
| Integer overflow | Kết quả âm / sai | Dùng đúng kiểu dữ liệu |
| Dừng quá sớm (float) | Lặp vô hạn | Dùng số lần lặp cố định |
| Hàm không unimodal | Bỏ qua đỉnh thực | Verify tính unimodal |
| Quên brute force (integer) | Sai 1-2 đơn vị | Luôn brute force [l,r] |

---

## 9. Bài tập luyện tập

| # | Tên bài | Nguồn | Độ khó | Ghi chú |
|---|---------|-------|--------|---------|
| 1 | [Block Towers](https://codeforces.com/contest/626/problem/E) | CF | ★★★ | Ternary search kinh điển |
| 2 | [Maximize!](https://codeforces.com/contest/939/problem/E) | CF | ★★★ | Ternary trên mảng sorted |
| 3 | [Devu and his Brother](https://codeforces.com/contest/439/problem/D) | CF | ★★★ | Ternary search cơ bản |
| 4 | [Weakness and Poorness](https://codeforces.com/contest/578/problem/C) | CF | ★★★★ | Ternary trên giá trị thực |
| 5 | [Restorer Distance](https://codeforces.com/contest/1355/problem/E) | CF | ★★★★ | Ternary trên answer space |
| 6 | [Searching Local Minimum](https://codeforces.com/contest/1479/problem/A) | CF | ★★★★ | Interactive, ternary-like |
| 7 | [Nature Reserve](https://codeforces.com/contest/1059/problem/D) | CF | ★★★★ | Ternary trên giá trị thực |
| 8 | [Moore's Law](https://atcoder.jp/contests/arc054/tasks/arc054_b) | AtCoder | ★★★ | Ternary trên hàm liên tục |
| 9 | [Stick Lengths](https://cses.fi/problemset/task/1074) | CSES | ★★☆ | Tìm giá trị tối thiểu |
| 10 | [Array Division](https://cses.fi/problemset/task/1085) | CSES | ★★★ | Binary search on answer |
| 11 | [Factory Machines](https://cses.fi/problemset/task/1620) | CSES | ★★☆ | Binary search on answer |

### Gợi ý cách tiếp cận

**Bài 1-3:** Áp dụng trực tiếp Ternary Search trên hàm unimodal. Bắt đầu với floating point, sau đó thử integer.

**Bài 4-5:** Cần nhận ra hàm mục tiêu là unimodal. Đôi khi cần biến đổi bài toán trước khi apply ternary search.

**Bài 6-8:** Ternary search trên miền nghiệm (answer space) hoặc hàm liên tục. Kết hợp với binary search hoặc geometry.

---

## 10. So sánh với các thuật toán khác

```
┌──────────────────────────────────────────────────────────────┐
│                    CHỌN THUẬT TOÁN TỐI ƯU                    │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Hàm có tính chất gì?                                       │
│       │                                                      │
│       ├── Monotonic (đơn điệu) ──→ Binary Search             │
│       │   VD: f(x) = 2x + 3                                 │
│       │                                                      │
│       ├── Unimodal (đơn đỉnh) ──→ Ternary Search             │
│       │   VD: f(x) = -x² + 4x                               │
│       │                                                      │
│       ├── Convex (lồi/lõm) ────→ Ternary Search              │
│       │   hoặc Gradient Descent                              │
│       │                                                      │
│       └── Không xác định ──────→ Brute Force /               │
│                                   Golden Section Search      │
│                                   hoặc heuristic             │
└──────────────────────────────────────────────────────────────┘
```

### Golden Section Search (Nâng cao)

Golden Section Search là biến thể của Ternary Search với **tỷ lệ vàng** φ ≈ 1.618:

```
Thay vì chia 3 phần bằng nhau:
    m1 = l + (r-l)/3, m2 = r - (r-l)/3

Dùng tỷ lệ vàng:
    m1 = l + (r-l)/(1+φ), m2 = r - (r-l)/(1+φ)

Ưu điểm: chỉ cần tính f MỘT lần mỗi lần lặp (thay vì 2 lần)
```

---

## Tóm tắt bài học

```
┌──────────────────────────────────────────────────────────────┐
│                   TERNARY SEARCH - TÓM TẮT                   │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ✅ Khi nào dùng:                                           │
│     - Hàm unimodal (đơn đỉnh)                               │
│     - Cần tìm max/min của hàm liên tục                     │
│     - Hàm kiểm tra (check function) là unimodal             │
│                                                              │
│  ❌ Khi nào KHÔNG dùng:                                     │
│     - Hàm monotonic → dùng Binary Search                    │
│     - Hàm có nhiều đỉnh → không giải được                   │
│     - Hàm discrete, không có tính chất unimodal             │
│                                                              │
│  📐 Độ phức tạp: O(log₁.₅ N) ≈ O(1.585 · log₂ N)         │
│                                                              │
│  🔧 Template (floating point):                               │
│     for (int i = 0; i < 200; i++) {                         │
│         m1 = l + (r-l)/3; m2 = r - (r-l)/3;                │
│         if (f(m1) < f(m2)) l = m1; else r = m2;            │
│     }                                                        │
│                                                              │
│  🔧 Template (integer):                                      │
│     while (r - l > 3) { ... }                               │
│     brute force [l, r]                                       │
│                                                              │
│  ⚠️ Lưu ý:                                                   │
│     - Dùng 200 lần lặp cho double                           │
│     - Luôn brute force cho integer                           │
│     - Kiểm tra hàm có thực sự unimodal không                │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Tài liệu tham khảo

- [CP-Algorithms - Ternary Search](https://cp-algorithms.com/num_methods/ternary_search.html)
- [e-maxx - Ternary Search](https://e-maxx.ru/algo/ternary_search)
- [Codeforces EDU - Binary Search (có phần về Ternary)](https://codeforces.com/edu/course/2/lesson/6)
- [AtCoder Library - Ternary Search](https://atcoder.github.io/ac-library/)

---

*Bài viết này là một phần của FPTOJ Wiki - Dự án xây dựng kho tài liệu lập trình thi đấu tiếng Việt.*
