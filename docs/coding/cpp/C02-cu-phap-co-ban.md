# C02: Cú pháp cơ bản

> **Tác giả:** Hà Trí Kiên<br>
> **Chủ đề:** Biến, kiểu dữ liệu, nhập/xuất trong C++

---

## 1. Tổng quan

C++ là ngôn ngữ **statically typed** — phải khai báo kiểu dữ liệu trước khi sử dụng.

```cpp
int x = 5;        // Số nguyên
double y = 3.14;  // Số thực
string s = "Hello"; // Chuỗi
bool b = true;    // Boolean
```

---

## 2. Kiểu dữ liệu cơ bản

### 2.1. Số nguyên

```cpp
int a = 42;           // 32-bit, [-2^31, 2^31-1] ≈ [-2 tỷ, 2 tỷ]
long long b = 1e18;   // 64-bit, [-2^63, 2^63-1] ≈ [-9×10^18, 9×10^18]
short c = 100;        // 16-bit
unsigned int d = 42;  // Không âm
```

!!! warning "long long trong thi đấu"
    Luôn dùng `long long` cho số nguyên trong thi đấu để tránh **tràn số**:
    ```cpp
    long long n;
    cin >> n;
    ```

### 2.2. Số thực

```cpp
float a = 3.14f;      // 32-bit, ít chính xác
double b = 3.14;      // 64-bit, chính xác hơn (khuyến nghị)
long double c = 3.14; // 80-bit hoặc 128-bit
```

!!! tip "Trong thi đấu"
    Luôn dùng `double` cho số thực.

### 2.3. Chuỗi

```cpp
string s = "Hello";   // Chuỗi ký tự
char c = 'A';         // 1 ký tự
```

### 2.4. Boolean

```cpp
bool b = true;    // true hoặc false
bool b2 = false;
```

---

## 3. Khai báo biến

```cpp
// Khai báo và gán
int x = 5;
int y = 10;

// Khai báo nhiều biến
int a, b, c;
a = b = c = 0;

// Khai báo với giá trị
int n = 100;
double pi = 3.14159;
string name = "Alice";

// Hằng số
const int MAX_N = 1000000;
const int MOD = 1e9 + 7;
```

---

## 4. Nhập/xuất

### 4.1. cout — In ra màn hình

```cpp
int x = 42;
string s = "Hello";

// In cơ bản
cout << "Hello World!" << endl;
cout << x << endl;
cout << s << endl;

// In nhiều giá trị
cout << x << " " << y << endl;

// In với endl (xuống dòng + flush)
cout << x << endl;

// In với "\n" (xuống dòng, nhanh hơn)
cout << x << "\n";

// In không xuống dòng
cout << x << " ";
```

!!! tip "endl vs \n"
    - `endl`: Xuống dòng + flush buffer → **chậm hơn**
    - `"\n"`: Chỉ xuống dòng → **nhanh hơn**
    - Trong thi đấu, ưu tiên dùng `"\n"`

### 4.2. cin — Đọc từ bàn phím

```cpp
int n;
cin >> n;  // Đọc 1 số nguyên

double x;
cin >> x;  // Đọc 1 số thực

string s;
cin >> s;  // Đọc 1 từ (dừng ở khoảng trắng)

// Đọc nhiều giá trị
int a, b;
cin >> a >> b;

// Đọc mảng
int arr[100];
for (int i = 0; i < n; i++) {
    cin >> arr[i];
}

// Đọc cả dòng
string line;
getline(cin, line);
```

### 4.3. scanf/printf — Nhanh hơn (C-style)

```cpp
int n;
scanf("%d", &n);  // Đọc số nguyên

double x;
scanf("%lf", &x); // Đọc số thực

char s[100];
scanf("%s", s);   // Đọc chuỗi

printf("%d\n", n);  // In số nguyên
printf("%.2f\n", x); // In số thực, 2 chữ số thập phân
printf("%s\n", s);   // In chuỗi
```

!!! tip "Khi nào dùng scanf/printf?"
    - Dùng `scanf/printf` khi cần I/O **rất nhanh**
    - Dùng `cin/cout` với `ios_base::sync_with_stdio(false)` cũng đủ nhanh cho hầu hết bài

---

## 5. Toán tử

### 5.1. Toán tử số học

```cpp
int a = 17, b = 5;

cout << a + b << endl;   // 22 — Cộng
cout << a - b << endl;   // 12 — Trừ
cout << a * b << endl;   // 85 — Nhân
cout << a / b << endl;   // 3  — Chia nguyên (làm tròn về 0)
cout << a % b << endl;   // 2  — Lấy dư
```

!!! warning "Chia nguyên trong C++"
    - C++ làm tròn **về 0** (không phải xuống như Python)
    - `-17 / 5 = -3` trong C++, nhưng `-17 // 5 = -4` trong Python

### 5.2. Toán tử so sánh

```cpp
cout << (a == b) << endl;  // Bằng
cout << (a != b) << endl;  // Khác
cout << (a < b) << endl;   // Nhỏ hơn
cout << (a > b) << endl;   // Lớn hơn
cout << (a <= b) << endl;  // Nhỏ hơn hoặc bằng
cout << (a >= b) << endl;  // Lớn hơn hoặc bằng
```

### 5.3. Toán tử logic

```cpp
bool x = true, y = false;

cout << (x && y) << endl;  // AND
cout << (x || y) << endl;  // OR
cout << (!x) << endl;      // NOT
```

### 5.4. Toán tử bitwise

```cpp
int a = 12, b = 10;  // a = 1100, b = 1010

cout << (a & b) << endl;   // 8  — AND
cout << (a | b) << endl;   // 14 — OR
cout << (a ^ b) << endl;   // 6  — XOR
cout << (~a) << endl;      // -13 — NOT
cout << (a << 2) << endl;  // 48 — Shift trái
cout << (a >> 2) << endl;  // 3  — Shift phải
```

### 5.5. Toán tử gán

```cpp
int x = 10;

x += 5;   // x = x + 5
x -= 3;   // x = x - 3
x *= 2;   // x = x * 2
x /= 4;   // x = x / 4
x %= 3;   // x = x % 3
x &= 3;   // x = x & 3
x |= 3;   // x = x | 3
x ^= 3;   // x = x ^ 3
x <<= 1;  // x = x << 1
x >>= 1;  // x = x >> 1
```

### 5.6. Toán tử tăng/giảm

```cpp
int x = 5;

x++;   // x = 6 (tăng sau)
x--;   // x = 5 (giảm sau)
++x;   // x = 6 (tăng trước)
--x;   // x = 5 (giảm trước)
```

!!! tip "i++ vs ++i"
    - `i++`: Tăng sau (trả về giá trị cũ)
    - `++i`: Tăng trước (trả về giá trị mới)
    - Trong thi đấu, thường dùng `i++` trong for loop

---

## 6. Toán tử ba ngôi (Ternary)

```cpp
int x = 10;

// Cú pháp: condition ? value_if_true : value_if_false
string result = (x > 0) ? "Duong" : "Am";
cout << result << endl;  // "Duong"

// Có thể lồng nhau (nhưng khó đọc)
string result2 = (x > 0) ? "Duong" : (x < 0) ? "Am" : "Khong";
```

---

## 7. Ép kiểu

```cpp
// Implicit conversion (tự động)
int a = 5;
double b = a;      // int → double (OK)

// Explicit conversion (ép kiểu tường minh)
double c = 3.14;
int d = (int)c;    // double → int (3, cắt phần thập phân)
int e = int(c);    // C++ style

// Ép kiểu trong phép tính
int a = 5, b = 2;
double c = (double)a / b;  // 2.5 (không phải 2!)
double d = a / b;          // 2 (chia nguyên trước!)
```

!!! warning "Tràn số"
    ```cpp
    int a = 1e9, b = 1e9;
    // int c = a * b;  // Tràn số! Kết quả sai
    
    long long c = (long long)a * b;  // ĐÚNG
    ```

---

## 8. So sánh với Python

| Python | C++ | Ghi chú |
|--------|-----|---------|
| `x = 5` | `int x = 5;` | Phải khai báo kiểu |
| `print(x)` | `cout << x;` | Syntax khác |
| `x = input()` | `cin >> x;` | |
| `x / y` (chia thực) | `(double)x / y` | C++ chia nguyên nếu cả 2 là int |
| `x // y` (chia nguyên) | `x / y` | |
| `x ** y` (lũy thừa) | `pow(x, y)` | Cần `#include <cmath>` |
| `abs(x)` | `abs(x)` | |

---

## 9. Pattern thường gặp trong thi đấu

### 9.1. Template thi đấu

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    // Code của bạn ở đây
    
    return 0;
}
```

### 9.2. Đọc mảng

```cpp
int n;
cin >> n;
vector<int> arr(n);
for (int i = 0; i < n; i++) {
    cin >> arr[i];
}
```

### 9.3. Đọc matrix

```cpp
int n, m;
cin >> n >> m;
vector<vector<int>> matrix(n, vector<int>(m));
for (int i = 0; i < n; i++) {
    for (int j = 0; j < m; j++) {
        cin >> matrix[i][j];
    }
}
```

### 9.4. Đọc nhiều testcase

```cpp
int t;
cin >> t;
while (t--) {
    int n;
    cin >> n;
    // Xử lý...
    cout << result << "\n";
}
```

---

## 10. Lưu ý / Cạm bẫy hay gặp

### Bẫy 1: Tràn số

```cpp
// SAI
int a = 1e9, b = 1e9;
int c = a * b;  // Tràn số!

// ĐÚNG
long long c = (long long)a * b;
```

### Bẫy 2: Chia nguyên

```cpp
// SAI
double c = 5 / 2;  // c = 2.0 (chia nguyên!)

// ĐÚNG
double c = (double)5 / 2;  // c = 2.5
double c = 5.0 / 2;        // c = 2.5
```

### Bẫy 3: Quên chấm phẩy

```cpp
// SAI
int x = 5  // Lỗi compile!

// ĐÚNG
int x = 5;
```

### Bẫy 4: So sánh số thực

```cpp
// SAI
double a = 0.1 + 0.2;
if (a == 0.3) { ... }  // Có thể sai!

// ĐÚNG
if (abs(a - 0.3) < 1e-9) { ... }
```

---

## 11. Bài tập thực hành

### Bài 1: In Hello World
Viết chương trình in "Hello World!".

```cpp
// Code của bạn ở đây
```

??? tip "Lời giải"
    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    
    int main() {
        cout << "Hello World!" << endl;
        return 0;
    }
    ```

### Bài 2: Tổng 2 số
Đọc 2 số nguyên a, b. In ra a + b.

```cpp
// Code của bạn ở đây
```

??? tip "Lời giải"
    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    
    int main() {
        ios_base::sync_with_stdio(false);
        cin.tie(NULL);
        
        int a, b;
        cin >> a >> b;
        cout << a + b << endl;
        
        return 0;
    }
    ```

### Bài 3: Tính diện tích hình tròn
Đọc bán kính r. Tính diện tích hình tròn (S = π × r²).

```cpp
// Code của bạn ở đây
```

??? tip "Lời giải"
    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    
    int main() {
        double r;
        cin >> r;
        cout << fixed << setprecision(2) << M_PI * r * r << endl;
        return 0;
    }
    ```

---

## 12. Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [AtCoder - A + B](https://atcoder.jp/contests/abc086/tasks/abc086_a) | AtCoder | ⭐ | Nhập/xuất |
| [CSES - Weird Algorithm](https://cses.fi/problemset/task/1068) | CSES | ⭐ | Toán tử |

---

## Bài viết liên quan

- [← C01: Tại sao C++?](C01-tai-sao-cpp.md)
- [C03: Điều kiện & Vòng lặp →](C03-dieu-kien-vong-lap.md)

---

**Bài trước:** [C01: Tại sao C++?](C01-tai-sao-cpp.md)<br>
**Bài tiếp theo:** [C03: Điều kiện & Vòng lặp →](C03-dieu-kien-vong-lap.md)
