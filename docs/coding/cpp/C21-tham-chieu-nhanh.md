# C21: Tham chiếu nhanh — memset, memcpy, scanf/printf, Tips & Tricks

> **Tác giả:** FPTOJ Wiki<br>
> **Chủ đề:** memset, memcpy, fill, scanf/printf nâng cao, auto, using, freopen, bitset, tips thi đấu

---

## Bạn sẽ học được gì?

Sau bài này, bạn có thể:

- Sử dụng `memset`, `memcpy`, `fill` để khởi tạo và sao chép mảng
- Dùng `scanf`/`printf` với format specifier nâng cao
- Dùng `auto`, `using`, `bitset`
- Biết các trick thi đấu quan trọng

---

## 1. memset — Khởi tạo mảng nhanh

### memset là gì?

`memset` gán một giá trị cho **từng byte** của mảng. Nhanh hơn vòng lặp rất nhiều.

```cpp
#include <cstring>  // hoặc <bits/stdc++.h>

int a[1000000];

memset(a, 0, sizeof(a));    // Gán tất cả = 0 ✓
memset(a, -1, sizeof(a));   // Gán tất cả = -1 ✓
memset(a, 0x3f, sizeof(a)); // Gán tất cả = 1061109567 (~10^9) ✓
```

### Tại sao memset chỉ hoạt động với 0 và -1?

```cpp
int a[5];

// ĐÚNG: memset với 0
memset(a, 0, sizeof(a));
// a = {0, 0, 0, 0, 0}

// ĐÚNG: memset với -1
memset(a, -1, sizeof(a));
// a = {-1, -1, -1, -1, -1}

// SAI: memset với 1 — KHÔNG cho kết quả là 1!
memset(a, 1, sizeof(a));
// a = {16843009, 16843009, 16843009, 16843009, 16843009}
// Vì memset gán TỪNG BYTE = 1, mà int có 4 byte
// → 0x01010101 = 16843009
```

!!! danger "Lưu ý quan trọng"
    - `memset(a, 0, sizeof(a))` → tất cả = **0** ✓
    - `memset(a, -1, sizeof(a))` → tất cả = **-1** ✓
    - `memset(a, 0x3f, sizeof(a))` → tất cả = **1061109567** (~10^9) ✓
    - `memset(a, 1, sizeof(a))` → **SAI!** = 16843009
    - `memset(a, 127, sizeof(a))` → tất cả = **2139062143** (~2×10^9) ✓

### memset với mảng bool

```cpp
bool visited[1000000];

memset(visited, false, sizeof(visited));  // Gán tất cả = false
memset(visited, true, sizeof(visited));   // Gán tất cả = true (vì true = 1 = 0x01)
```

### memset với mảng 2D

```cpp
int a[1000][1000];

memset(a, 0, sizeof(a));    // Gán toàn bộ ma trận = 0
memset(a, -1, sizeof(a));   // Gán toàn bộ ma trận = -1
```

### Khi nào dùng memset?

```cpp
// Trong bài có nhiều test case, cần reset mảng sau mỗi test
int t;
cin >> t;
while (t--) {
    int n;
    cin >> n;
    int a[1000];
    memset(a, 0, sizeof(a));  // Reset mảng
    
    // Xử lý test case...
}
```

---

## 2. memcpy — Sao chép mảng nhanh

```cpp
int a[1000] = {1, 2, 3, 4, 5};
int b[1000];

// Sao chép a sang b
memcpy(b, a, sizeof(a));  // b = {1, 2, 3, 4, 5, ...}

// Sao chép n phần tử đầu tiên
int n = 5;
memcpy(b, a, n * sizeof(int));  // b = {1, 2, 3, 4, 5}
```

### Ứng dụng: Backup mảng

```cpp
int a[1000], backup[1000];

// Backup trước khi sửa
memcpy(backup, a, sizeof(a));

// Sửa mảng a...
// Nếu cần khôi phục:
memcpy(a, backup, sizeof(a));
```

!!! warning "memcpy chỉ dùng cho mảng tĩnh"
    Với `vector`, dùng `=` hoặc `assign`:
    ```cpp
    vector<int> a = {1, 2, 3};
    vector<int> b = a;  // Sao chép
    ```

---

## 3. fill — Khởi tạo mảng an toàn hơn memset

```cpp
#include <algorithm>

int a[1000];

// fill hoạt động với MỌI giá trị (không chỉ 0 và -1)
fill(a, a + 1000, 42);      // a = {42, 42, 42, ...}
fill(a, a + 1000, 1000000); // a = {1000000, 1000000, ...}

// Với vector
vector<int> v(1000);
fill(v.begin(), v.end(), 42);

// fill_n — Gán n phần tử
fill_n(a, 100, 42);  // Gán 100 phần tử đầu = 42
```

### memset vs fill

| | memset | fill |
|---|--------|------|
| **Tốc độ** | Nhanh hơn | Chậm hơn một chút |
| **Giá trị** | Chỉ 0, -1, 0x3f | **Mọi giá trị** |
| **Cơ chế** | Gán từng byte | Gán từng phần tử |
| **Dùng khi** | Cần reset về 0 hoặc -1 | Cần giá trị khác |

!!! tip "Chọn nào?"
    - Cần reset về **0** hoặc **-1** → dùng `memset` (nhanh hơn)
    - Cần giá trị **khác** → dùng `fill` (an toàn hơn)
    - Không chắc → dùng `fill` (luôn đúng)

---

## 4. scanf/printf nâng cao

### Format specifier đầy đủ

```cpp
int a = 42;
double b = 3.14159;
char c = 'A';
char s[] = "Hello";

// Độ rộng và đệm
printf("%10d\n", a);      // "        42" (10 ký tự, đệm bằng spaces)
printf("%010d\n", a);     // "0000000042" (10 ký tự, đệm bằng 0)
printf("%-10d|\n", a);    // "42        |" (căn trái)

// Số thực
printf("%.2f\n", b);      // "3.14" (2 chữ số thập phân)
printf("%10.2f\n", b);    // "      3.14" (10 ký tự, 2 chữ số thập phân)
printf("%e\n", b);         // "3.141590e+00" (scientific notation)

// Chuỗi
printf("%10s\n", s);      // "     Hello" (10 ký tự, căn phải)
printf("%-10s|\n", s);    // "Hello     |" (căn trái)
printf("%.3s\n", s);      // "Hel" (chỉ 3 ký tự đầu)

// Hex và Octal
printf("%x\n", 255);      // "ff" (hex thường)
printf("%X\n", 255);      // "FF" (hex hoa)
printf("%o\n", 255);      // "377" (octal)
printf("%#x\n", 255);     // "0xff" (hex với prefix)

// Unsigned
printf("%u\n", 4294967295U);  // "4294967295"
```

### Bảng format specifier

| Specifier | Ý nghĩa | Ví dụ |
|-----------|----------|-------|
| `%d` | int | `printf("%d", 42)` |
| `%ld` | long | `printf("%ld", 42L)` |
| `%lld` | long long | `printf("%lld", 42LL)` |
| `%u` | unsigned int | `printf("%u", 42U)` |
| `%f` | float/double | `printf("%f", 3.14)` |
| `%lf` | double (scanf) | `scanf("%lf", &x)` |
| `%e` | scientific | `printf("%e", 3.14)` |
| `%c` | char | `printf("%c", 'A')` |
| `%s` | string | `printf("%s", "Hello")` |
| `%x` | hex | `printf("%x", 255)` |
| `%o` | octal | `printf("%o", 255)` |
| `%%` | dấu % | `printf("%%")` |

### scanf nâng cao

```cpp
// Đọc cả dòng (bao gồm khoảng trắng)
char line[1000];
scanf("%[^\n]", line);  // Đọc đến khi gặp '\n'

// Đọc số cho đến khi hết input
int x;
while (scanf("%d", &x) != EOF) {
    printf("%d\n", x);
}

// Kiểm tra scanf trả về
int a, b;
int result = scanf("%d %d", &a, &b);
if (result == 2) {
    printf("Doc duoc 2 so: %d %d\n", a, b);
} else if (result == EOF) {
    printf("Het input\n");
} else {
    printf("Loi input\n");
}
```

---

## 5. getline và cin.ignore()

### Vấn đề: getline sau cin >>

```cpp
int n;
string s;

cin >> n;        // Đọc số, nhưng '\n' còn lại trong buffer
getline(cin, s); // SAI! Đọc dòng trống '\n' còn lại

// ĐÚNG: Phải có cin.ignore() ở giữa
cin >> n;
cin.ignore();    // Bỏ qua '\n' còn lại
getline(cin, s); // Đọc đúng dòng
```

### Đọc nhiều dòng sau cin >>

```cpp
int n;
cin >> n;
cin.ignore();  // Quan trọng!

vector<string> lines(n);
for (int i = 0; i < n; i++) {
    getline(cin, lines[i]);
}
```

### Đọc số nguyên trên nhiều dòng

```cpp
// Mỗi dòng 1 số
for (int i = 0; i < n; i++) {
    int x;
    cin >> x;  // Tự động bỏ qua newline
}
```

---

## 6. auto — Tự động suy luận kiểu

```cpp
// Tự động suy luận kiểu
auto x = 42;           // int
auto y = 3.14;         // double
auto z = "Hello";      // const char*
auto s = string("Hi"); // string
auto v = vector<int>{1, 2, 3}; // vector<int>

// Hữu ích với iterator
map<string, int> mp;
auto it = mp.begin();  // Thay vì map<string, int>::iterator it = mp.begin();

// Hữu ích với lambda
auto add = [](int a, int b) { return a + b; };

// Hữu ích với range-based for
vector<pair<int,int>> vp = {{1, 2}, {3, 4}};
for (auto &[a, b] : vp) {  // C++17 structured bindings
    cout << a << " " << b << endl;
}
```

!!! tip "Khi nào dùng auto?"
    - Kiểu dài, phức tạp → dùng `auto`
    - Kiểu đơn giản (`int`, `string`) → có thể viết rõ
    - Trong range-based for → luôn dùng `auto`

---

## 7. using — Type alias hiện đại

```cpp
// Thay vì typedef:
typedef long long ll;
typedef pair<int,int> pii;

// Dùng using (C++11, khuyến nghị):
using ll = long long;
using pii = pair<int,int>;
using vi = vector<int>;
using vvi = vector<vector<int>>;

// using linh hoạt hơn typedef
using Func = function<int(int,int)>;  // Không thể viết với typedef
```

---

## 8. '\n' vs endl — Hiệu suất

```cpp
// SLOW: endl flush buffer sau mỗi lần in
for (int i = 0; i < 1000000; i++) {
    cout << i << endl;  // Chậm!
}

// FAST: '\n' không flush buffer
for (int i = 0; i < 1000000; i++) {
    cout << i << '\n';  // Nhanh hơn!
}

// TRICK: Redefine endl thành '\n'
#define endl '\n'
```

!!! tip "Trong thi đấu"
    Luôn dùng `'\n'` thay vì `endl`, hoặc thêm `#define endl '\n'` vào template.

---

## 9. freopen — Đọc/ghi file khi test local

```cpp
int main() {
    // Đọc từ file input.txt
    freopen("input.txt", "r", stdin);
    
    // Ghi ra file output.txt
    freopen("output.txt", "w", stdout);
    
    // Code bình thường, dùng cin/cout
    int n;
    cin >> n;
    cout << n * 2 << endl;
    
    return 0;
}
```

!!! tip "Khi nào dùng freopen?"
    - Khi test local với file input/output
    - Khi muốn so sánh output với đáp án
    - **Khi nộp bài**: xóa hoặc comment dòng freopen!

---

## 10. bitset — Bit operations trên >64 phần tử

```cpp
#include <bitset>

bitset<1000> bs;  // 1000 bit

bs[5] = 1;        // Bật bit 5
bs.set(10);       // Bật bit 10
bs.reset(5);      // Tắt bit 5
bs.flip(3);       // Đảo bit 3
bs.count();       // Đếm số bit 1
bs.any();         // Có bit 1 nào không?
bs.none();        // Không có bit 1 nào?
bs.all();         // Tất cả đều là bit 1?

// Toán tử
bitset<8> a("10101010");
bitset<8> b("11001100");
cout << (a & b) << endl;  // 10001000
cout << (a | b) << endl;  // 11101110
cout << (a ^ b) << endl;  // 01100110
```

---

## 11. Tips thi đấu quan trọng

### Multi-test case template

```cpp
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int t;
    cin >> t;
    while (t--) {
        // Xử lý mỗi test case
        int n;
        cin >> n;
        // ...
    }
    return 0;
}
```

### Tràn số khi nhân

```cpp
int a = 100000, b = 100000;

// SAI: Tràn số int
int c = a * b;  // Sai!

// ĐÚNG: Ép kiểu long long
long long c = 1LL * a * b;  // Đúng!
```

### Modulo với số âm

```cpp
// C++: -7 % 3 = -1 (không phải 2!)
// Python: -7 % 3 = 2

// Để có kết quả dương:
int mod(int a, int m) {
    return (a % m + m) % m;
}
```

### max/min với nhiều giá trị

```cpp
// C++11: Dùng initializer list
int a = 3, b = 5, c = 7;
cout << max({a, b, c}) << endl;  // 7
cout << min({a, b, c}) << endl;  // 3
```

### emplace_back vs push_back

```cpp
vector<pair<int,int>> v;

// push_back: tạo pair trước, rồi copy vào vector
v.push_back({1, 2});

// emplace_back: tạo pair trực tiếp trong vector (nhanh hơn)
v.emplace_back(1, 2);
```

### swap 2 biến

```cpp
int a = 5, b = 10;
swap(a, b);  // a = 10, b = 5
```

### Kiểm tra debug với assert

```cpp
#include <cassert>

int n = 5;
assert(n > 0);  // OK, không làm gì
assert(n < 0);  // CRASH! Chương trình dừng và báo lỗi
```

---

## 12. Bảng tổng hợp hàm thường quên

| Hàm | Thư viện | Mô tả |
|-----|----------|--------|
| `memset(a, val, sizeof(a))` | `<cstring>` | Khởi tạo mảng theo byte |
| `memcpy(dst, src, size)` | `<cstring>` | Sao chép mảng |
| `fill(a, a+n, val)` | `<algorithm>` | Khởi tạo mảng theo phần tử |
| `swap(a, b)` | `<utility>` | Hoán đổi 2 biến |
| `max({a, b, c})` | `<algorithm>` | Max nhiều giá trị |
| `min({a, b, c})` | `<algorithm>` | Min nhiều giá trị |
| `abs(x)` | `<cstdlib>` | Giá trị tuyệt đối |
| `__gcd(a, b)` | `<algorithm>` | GCD |
| `tolower(c)` | `<cctype>` | Chữ thường |
| `toupper(c)` | `<cctype>` | Chữ hoa |
| `isdigit(c)` | `<cctype>` | Kiểm tra chữ số |
| `isalpha(c)` | `<cctype>` | Kiểm tra chữ cái |

---

## Bài viết liên quan

- [C15: Mẹo thi đấu C++ →](C15-meo-thi-dau-cpp.md)
- [C17: Thuật toán STL & Số học →](C17-thuat-toan-stl.md)

---

**Quay lại:** [Chương 2: C++ cho Thi Đấu](index.md)
