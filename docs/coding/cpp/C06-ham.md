# C06: Hàm trong C++

> **Tác giả:** FPTOJ Wiki<br>
> **Chủ đề:** Định nghĩa hàm, overload, tham trị/tham chiếu, đệ quy, lambda

---

## Bạn sẽ học được gì?

Sau bài này, bạn có thể:

- Định nghĩa và gọi hàm trong C++
- Hiểu tham trị vs tham chiếu
- Sử dụng hàm overload
- Viết hàm đệ quy
- Sử dụng lambda cơ bản

---

## 1. Định nghĩa hàm cơ bản

```cpp
// Hàm không trả về giá trị
void greet(string name) {
    cout << "Hello " << name << "!" << endl;
}

// Hàm trả về giá trị
int add(int a, int b) {
    return a + b;
}

// Hàm với giá trị mặc định
void printInfo(string name, int age = 18) {
    cout << name << " " << age << endl;
}

int main() {
    greet("Nam");           // Hello Nam!
    cout << add(3, 5);      // 8
    printInfo("Nam");       // Nam 18
    printInfo("Nam", 20);   // Nam 20
    return 0;
}
```

!!! note "Khác biệt với Python"
    | Python | C++ |
    |--------|-----|
    | `def add(a, b):` | `int add(int a, int b) {` |
    | Không cần khai báo kiểu | **Phải khai báo kiểu** trả về |
    | Thụt lề | Dùng `{` `}` |
    | `return` tùy chọn | **Phải có `return`** nếu có kiểu trả về |

---

## 2. Truyền tham trị vs Tham chiếu

### Tham trị (Pass by Value) — Sao chép

```cpp
void tangMot(int x) {
    x++;  // Chỉ thay đổi bản sao
}

int main() {
    int a = 5;
    tangMot(a);
    cout << a << endl;  // 5 — Giá trị không thay đổi!
    return 0;
}
```

### Tham chiếu (Pass by Reference) — Thay đổi trực tiếp

```cpp
void tangMot(int &x) {
    x++;  // Thay đổi giá trị gốc
}

int main() {
    int a = 5;
    tangMot(a);
    cout << a << endl;  // 6 — Giá trị đã thay đổi!
    return 0;
}
```

### const Reference — Chỉ đọc, không sao chép

```cpp
void print(const string &s) {
    // s là reference nhưng không thể sửa
    cout << s << endl;
    // s += "!";  // Lỗi compile!
}
```

!!! tip "Khi nào dùng gì?"
    - **Tham trị (`int x`):** Kiểu nhỏ (int, char, bool), không cần thay đổi
    - **Tham chiếu (`int &x`):** Cần thay đổi giá trị
    - **Const reference (`const int &x`):** Không thay đổi, tránh sao chép (nhanh hơn với object lớn)

### Truyền vector

```cpp
// SAI: Sao chép toàn bộ vector (chậm)
void process(vector<int> a) { ... }

// ĐÚNG: Truyền tham chiếu (có thể sửa)
void process(vector<int> &a) { ... }

// ĐÚNG: Truyền const reference (không sửa, nhanh)
void print(const vector<int> &a) {
    for (int x : a) cout << x << " ";
}
```

---

## 3. Hàm Overload — Cùng tên, khác tham số

```cpp
// Hàm tính tổng 2 số
int sum(int a, int b) {
    return a + b;
}

// Hàm tính tổng 3 số (overload)
int sum(int a, int b, int c) {
    return a + b + c;
}

// Hàm tính tổng 2 số thực (overload)
double sum(double a, double b) {
    return a + b;
}

int main() {
    cout << sum(3, 5) << endl;       // 8   — gọi sum(int, int)
    cout << sum(3, 5, 7) << endl;    // 15  — gọi sum(int, int, int)
    cout << sum(3.14, 2.71) << endl; // 5.85 — gọi sum(double, double)
    return 0;
}
```

---

## 4. Hàm đệ quy

### Đệ quy cơ bản — Giai thừa

```cpp
long long factorial(int n) {
    if (n <= 1) return 1;       // Điều kiện dừng
    return n * factorial(n - 1); // Gọi đệ quy
}

int main() {
    cout << factorial(5) << endl;  // 120
    return 0;
}
```

### Đệ quy — Fibonacci

```cpp
long long fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}
```

### Đệ quy — Lũy thừa nhanh

```cpp
long long power(long long base, long long exp, long long mod) {
    if (exp == 0) return 1;
    long long half = power(base, exp / 2, mod);
    long long result = (half * half) % mod;
    if (exp % 2 == 1) result = (result * base) % mod;
    return result;
}
```

### Đệ quy — Tìm kiếm nhị phân

```cpp
int binarySearch(const vector<int> &a, int target, int lo, int hi) {
    if (lo > hi) return -1;
    int mid = lo + (hi - lo) / 2;
    if (a[mid] == target) return mid;
    if (a[mid] < target) return binarySearch(a, target, mid + 1, hi);
    return binarySearch(a, target, lo, mid - 1);
}
```

!!! warning "Hạn chế của đệ quy"
    - Đệ quy quá sâu → **tràn stack** (stack overflow)
    - Giới hạn ~10^4 đến 10^5 lớp đệ quy
    - Nếu cần đệ quy sâu → dùng vòng lặp hoặc tăng kích thước stack

---

## 5. Hàm utility thường dùng trong thi đấu

```cpp
// GCD (Ước chung lớn nhất)
long long gcd(long long a, long long b) {
    while (b) { a %= b; swap(a, b); }
    return a;
}

// LCM (Bội chung nhỏ nhất)
long long lcm(long long a, long long b) {
    return a / gcd(a, b) * b;
}

// Kiểm tra số nguyên tố
bool isPrime(long long n) {
    if (n < 2) return false;
    for (long long i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

// Lũy thừa nhanh modulo
long long powerMod(long long base, long long exp, long long mod) {
    long long result = 1;
    base %= mod;
    while (exp > 0) {
        if (exp & 1) result = (result * base) % mod;
        base = (base * base) % mod;
        exp >>= 1;
    }
    return result;
}

// Sàng nguyên tố
vector<bool> sieve(int n) {
    vector<bool> isPrime(n + 1, true);
    isPrime[0] = isPrime[1] = false;
    for (int i = 2; i * i <= n; i++) {
        if (isPrime[i]) {
            for (int j = i * i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }
    return isPrime;
}
```

---

## 6. So sánh Python vs C++

| Python | C++ |
|--------|-----|
| `def add(a, b):` | `int add(int a, int b) {` |
| `return a + b` | `return a + b;` |
| Không cần kiểu trả về | **Phải khai báo kiểu** |
| `def f(x=10):` | `void f(int x = 10) {` |
| `lambda x: x * 2` | `[](int x) { return x * 2; }` |
| Truyền object (reference) | Truyền tham trị (copy) |
| `*args` | Overload hoặc template |

---

## 7. Bài tập thực hành

### Bài 1: Viết hàm tìm max
Viết hàm `findMax` nhận mảng và trả về phần tử lớn nhất.

```cpp
// Code của bạn ở đây
```

??? tip "Lời giải"
    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    
    int findMax(const vector<int> &a) {
        return *max_element(a.begin(), a.end());
    }
    
    int main() {
        vector<int> a = {3, 1, 4, 1, 5, 9};
        cout << findMax(a) << endl;  // 9
        return 0;
    }
    ```

### Bài 2: Viết hàm kiểm tra số nguyên tố
Viết hàm `isPrime` nhận số nguyên, trả về `true` nếu là số nguyên tố.

```cpp
// Code của bạn ở đây
```

??? tip "Lời giải"
    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    
    bool isPrime(int n) {
        if (n < 2) return false;
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) return false;
        }
        return true;
    }
    
    int main() {
        for (int i = 1; i <= 20; i++) {
            if (isPrime(i)) cout << i << " ";
        }
        cout << endl;
        // Output: 2 3 5 7 11 13 17 19
        return 0;
    }
    ```

### Bài 3: Hoán đổi 2 số
Viết hàm `swap2` nhận 2 số nguyên và hoán đổi giá trị của chúng.

```cpp
// Code của bạn ở đây
```

??? tip "Lời giải"
    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    
    void swap2(int &a, int &b) {
        int temp = a;
        a = b;
        b = temp;
    }
    
    int main() {
        int a = 5, b = 10;
        swap2(a, b);
        cout << a << " " << b << endl;  // 10 5
        return 0;
    }
    ```

---

## Bài viết liên quan

- [C05: String →](C05-string.md)
- [C07: Template & Fast I/O →](C07-template-fast-io.md)

---

**Bài tiếp theo:** [C07: Template & Fast I/O →](C07-template-fast-io.md)
