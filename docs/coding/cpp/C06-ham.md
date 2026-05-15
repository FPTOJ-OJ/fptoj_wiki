# C06: Hàm trong C++

> **Tác giả:** Hà Trí Kiên<br>
> **Chủ đề:** Định nghĩa hàm, overload, default parameters, inline

---

## 1. Tổng quan

Hàm trong C++ **bắt buộc khai báo kiểu trả về** và **kiểu tham số**.

```cpp
// Cú pháp
<kiểu_trả về> <tên_hàm>(<tham số>) {
    // Thân hàm
    return <giá trị>;
}
```

---

## 2. Định nghĩa hàm cơ bản

```cpp
// Hàm không trả về giá trị
void printHello() {
    cout << "Hello!" << endl;
}

// Hàm trả về int
int add(int a, int b) {
    return a + b;
}

// Hàm trả về double
double area(double r) {
    return M_PI * r * r;
}
```

### Gọi hàm

```cpp
int main() {
    printHello();           // Hello!
    cout << add(3, 5);     // 8
    cout << area(5.0);     // 78.5398
    return 0;
}
```

---

## 3. Tham số mặc định

```cpp
// Tham số mặc định phải ở CUỐI
void greet(string name, string greeting = "Hello") {
    cout << greeting << ", " << name << "!" << endl;
}

int main() {
    greet("Alice");           // Hello, Alice!
    greet("Alice", "Hi");    // Hi, Alice!
    return 0;
}
```

!!! warning "Tham số mặc định phải ở cuối"
    ```cpp
    // SAI
    // void func(int a = 1, int b) { }  // Lỗi compile!
    
    // ĐÚNG
    void func(int a, int b = 1) { }
    ```

---

## 4. Function Overload

C++ cho phép nhiều hàm **cùng tên** nhưng **khác tham số**:

```cpp
int add(int a, int b) {
    return a + b;
}

double add(double a, double b) {
    return a + b;
}

int add(int a, int b, int c) {
    return a + b + c;
}

int main() {
    cout << add(3, 5);        // 8 — gọi hàm int, int
    cout << add(3.5, 5.5);   // 9.0 — gọi hàm double, double
    cout << add(1, 2, 3);    // 6 — gọi hàm int, int, int
    return 0;
}
```

---

## 5. Truyền tham số

### 5.1. Truyền giá trị (Pass by Value)

```cpp
void increment(int x) {
    x++;  // Chỉ thay đổi bản copy
}

int main() {
    int a = 5;
    increment(a);
    cout << a;  // 5 — a không bị thay đổi
    return 0;
}
```

### 5.2. Truyền tham chiếu (Pass by Reference)

```cpp
void increment(int& x) {
    x++;  // Thay đổi biến gốc
}

int main() {
    int a = 5;
    increment(a);
    cout << a;  // 6 — a bị thay đổi
    return 0;
}
```

### 5.3. Truyền con trỏ (Pass by Pointer)

```cpp
void increment(int* x) {
    (*x)++;  // Thay đổi biến gốc qua con trỏ
}

int main() {
    int a = 5;
    increment(&a);
    cout << a;  // 6 — a bị thay đổi
    return 0;
}
```

### So sánh

| Cách truyền | Thay đổi gốc? | Sử dụng |
|-------------|---------------|---------|
| Pass by Value | ❌ Không | Dữ liệu nhỏ, không cần sửa |
| Pass by Reference | ✅ Có | Cần sửa dữ liệu, tránh copy |
| Pass by Pointer | ✅ Có | Có thể NULL, dùng trong C |

!!! tip "Trong thi đấu"
    - Dùng **reference** (`&`) khi cần sửa dữ liệu
    - Dùng **const reference** (`const &`) khi chỉ đọc, tránh copy

```cpp
// Truyền const reference — chỉ đọc, không sửa, không copy
void printVector(const vector<int>& v) {
    for (int x : v) {
        cout << x << " ";
    }
}
```

---

## 6. Inline Function

```cpp
// Inline: trình biên dịch sẽ thay thế trực tiếp (nhanh hơn cho hàm ngắn)
inline int square(int x) {
    return x * x;
}
```

!!! tip "Khi nào dùng inline?"
    - Hàm **ngắn** (1-2 dòng)
    - Gọi **nhiều lần** trong vòng lặp
    - Không dùng đệ quy

---

## 7. Hàm đệ quy

```cpp
// Giai thừa
long long factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// Fibonacci
long long fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

// GCD (Euclid)
int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}
```

---

## 8. So sánh với Python

| Python | C++ | Ghi chú |
|--------|-----|---------|
| `def func(a, b):` | `int func(int a, int b) {` | Phải khai báo kiểu |
| `return a + b` | `return a + b;` | Giống nhau |
| Không có overload | Có overload | C++ linh hoạt hơn |
| `def func(a, b=1):` | `void func(int a, int b = 1) {` | Giống nhau |
| Truyền giá trị | Truyền giá trị | Giống nhau |
| Không có reference | Có reference | C++ kiểm soát tốt hơn |

---

## 9. Pattern thường gặp trong thi đấu

### 9.1. Hàm solve() cho testcase

```cpp
void solve() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    // Xử lý...
    cout << result << "\n";
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int t;
    cin >> t;
    while (t--) {
        solve();
    }
    return 0;
}
```

### 9.2. Hàm GCD, LCM

```cpp
int gcd(int a, int b) {
    while (b) {
        a %= b;
        swap(a, b);
    }
    return a;
}

int lcm(int a, int b) {
    return a / gcd(a, b) * b;  // Tránh tràn số
}
```

### 9.3. Hàm kiểm tra số nguyên tố

```cpp
bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}
```

### 9.4. Hàm lũy thừa nhanh

```cpp
long long power(long long base, long long exp, long long mod) {
    long long result = 1;
    base %= mod;
    while (exp > 0) {
        if (exp & 1) result = result * base % mod;
        exp >>= 1;
        base = base * base % mod;
    }
    return result;
}
```

---

## 10. Lưu ý / Cạm bẫy hay gặp

### Bẫy 1: Quên return

```cpp
// SAI
int add(int a, int b) {
    a + b;  // Không return!
}

// ĐÚNG
int add(int a, int b) {
    return a + b;
}
```

### Bẫy 2: Truyền reference không cần thiết

```cpp
// SAI: Truyền reference cho biến tạm
// void print(int& x) { cout << x; }
// print(5);  // Lỗi! 5 là hằng số

// ĐÚNG
void print(const int& x) { cout << x; }
void print(int x) { cout << x; }
```

### Bẫy 3: Đệ quy quá sâu

```cpp
// SAI: Stack overflow
void infinite() {
    infinite();
}

// ĐÚNG: Giới hạn đệ quy
// Tăng stack size hoặc dùng iterative
```

---

## 11. Bài tập thực hành

### Bài 1: Hàm tính GCD
Viết hàm tính GCD của 2 số.

```cpp
// Code của bạn ở đây
```

??? tip "Lời giải"
    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    
    int gcd(int a, int b) {
        while (b) {
            a %= b;
            swap(a, b);
        }
        return a;
    }
    
    int main() {
        int a, b;
        cin >> a >> b;
        cout << gcd(a, b) << endl;
        return 0;
    }
    ```

### Bài 2: Hàm kiểm tra palindrome
Viết hàm kiểm tra xâu có phải palindrome không.

```cpp
// Code của bạn ở đây
```

??? tip "Lời giải"
    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    
    bool isPalindrome(string s) {
        string rev = s;
        reverse(rev.begin(), rev.end());
        return s == rev;
    }
    
    int main() {
        string s;
        cin >> s;
        cout << (isPalindrome(s) ? "Palindrome" : "Not palindrome") << endl;
        return 0;
    }
    ```

---

## 12. Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Weird Algorithm](https://cses.fi/problemset/task/1068) | CSES | ⭐ | Hàm đệ quy |

---

## Bài viết liên quan

- [← C05: String](C05-string.md)
- [C07: Template & Fast I/O →](C07-template-fast-io.md)

---

**Bài trước:** [C05: String](C05-string.md)<br>
**Bài tiếp theo:** [C07: Template & Fast I/O →](C07-template-fast-io.md)
