# C08: Reference & Pointer

> **Tác giả:** FPTOJ Wiki<br>
> **Chủ đề:** Tham chiếu, con trỏ, truyền tham số

---

## Bạn sẽ học được gì?

Sau bài này, bạn có thể:

- Hiểu Reference và Pointer trong C++
- Truyền tham trị, tham chiếu, con trỏ
- Trả về nhiều giá trị từ hàm

---

## 1. Reference — Tham chiếu

### Reference là gì?

Reference là **biệt danh** (alias) cho một biến khác. Chúng trỏ cùng một vùng nhớ.

```cpp
int a = 10;
int &b = a;  // b là biệt danh của a

b = 20;
cout << a << endl;  // 20 — a cũng thay đổi!
```

### Reference trong hàm

```cpp
void tang(int &x) {
    x++;  // Thay đổi trực tiếp biến gốc
}

int main() {
    int a = 5;
    tang(a);
    cout << a << endl;  // 6
    return 0;
}
```

### const Reference — Chỉ đọc

```cpp
void print(const string &s) {
    // s là reference nhưng không thể sửa
    cout << s << endl;
    // s += "!";  // Lỗi compile!
}
```

!!! tip "Luôn dùng `const &` cho object lớn"
    ```cpp
    // SAI: Sao chép toàn bộ vector (chậm)
    void process(vector<int> a) { ... }
    
    // ĐÚNG: Truyền const reference (nhanh, không sao chép)
    void process(const vector<int> &a) { ... }
    ```

---

## 2. Pointer — Con trỏ

### Con trỏ là gì?

Con trỏ là biến **lưu địa chỉ** của biến khác.

```cpp
int a = 10;
int *p = &a;  // p lưu địa chỉ của a

cout << p << endl;    // Địa chỉ của a (ví dụ: 0x7fff5fbff8ac)
cout << *p << endl;   // 10 — Giá trị tại địa chỉ đó
cout << &a << endl;   // Địa chỉ của a
```

| Toán tử | Ý nghĩa |
|---------|----------|
| `&a` | Lấy địa chỉ của `a` |
| `*p` | Lấy giá trị tại địa chỉ `p` (dereference) |

### Con trỏ NULL

```cpp
int *p = nullptr;   // Con trỏ không trỏ đến đâu (C++11, khuyến nghị)

if (p != nullptr) {
    cout << *p << endl;  // Không chạy vì p là nullptr
}
```

---

## 3. So sánh Reference vs Pointer

| | Reference | Pointer |
|---|-----------|---------|
| **Ký hiệu** | `int &r = a;` | `int *p = &a;` |
| **NULL** | Không được NULL | Có thể NULL |
| **Thay đổi** | Không thể đổi biến tham chiếu | Có thể đổi biến trỏ |
| **Syntax** | Dùng như biến thường | Cần `*` để dereference |
| **Khuyến nghị** | **Ưu tiên dùng** | Dùng khi cần |

---

## 4. Truyền tham số — 3 cách

### Truyền tham trị (Pass by Value)

```cpp
void func(int x) {
    x = 100;  // Chỉ thay đổi bản sao
}
// a không thay đổi
```

### Truyền tham chiếu (Pass by Reference)

```cpp
void func(int &x) {
    x = 100;  // Thay đổi biến gốc
}
// a bị thay đổi
```

### Truyền con trỏ (Pass by Pointer)

```cpp
void func(int *x) {
    *x = 100;  // Thay đổi biến gốc qua con trỏ
}
// a bị thay đổi
```

!!! tip "Chọn cách nào?"
    - **Tham trị:** Khi không cần thay đổi giá trị
    - **Tham chiếu:** **Ưu tiên** khi cần thay đổi giá trị
    - **Con trỏ:** Khi cần có thể NULL hoặc cần quản lý bộ nhớ

---

## 5. Trả về nhiều giá trị

### Cách 1: Dùng reference

```cpp
void minMax(const vector<int> &a, int &mn, int &mx) {
    mn = *min_element(a.begin(), a.end());
    mx = *max_element(a.begin(), a.end());
}

int main() {
    vector<int> a = {3, 1, 4, 1, 5, 9};
    int mn, mx;
    minMax(a, mn, mx);
    cout << mn << " " << mx << endl;  // 1 9
    return 0;
}
```

### Cách 2: Dùng pair/tuple

```cpp
pair<int,int> minMax(const vector<int> &a) {
    return {*min_element(a.begin(), a.end()),
            *max_element(a.begin(), a.end())};
}

int main() {
    vector<int> a = {3, 1, 4, 1, 5, 9};
    auto [mn, mx] = minMax(a);  // C++17 structured bindings
    cout << mn << " " << mx << endl;  // 1 9
    return 0;
}
```

---

## 6. Bài tập thực hành

### Bài 1: Hoán đổi 2 số
Viết hàm `swap2` nhận 2 số nguyên và hoán đổi giá trị của chúng.

???? tip "Lời giải"
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

- [C07: Template & Fast I/O →](C07-template-fast-io.md)
- [C09: pair & tuple →](C09-pair-tuple.md)

---

**Bài tiếp theo:** [C09: pair & tuple →](C09-pair-tuple.md)
