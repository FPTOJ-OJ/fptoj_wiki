# P01: Cài đặt & Hello World

> **Tác giả:** Hà Trí Kiên<br>
> **Chủ đề:** Cài đặt Python, IDE, chương trình đầu tiên

---

## 1. Python là gì?

Python là ngôn ngữ lập trình **dễ học, dễ đọc, dễ viết**. Được sử dụng rộng rãi trong:
- Thi đấu lập trình (competitive programming)
- Khoa học dữ liệu, AI
- Web development
- Scripting, tự động hóa

!!! tip "Tại sao chọn Python cho người mới?"
    - Cú pháp gần với ngôn ngữ tự nhiên
    - Không cần khai báo kiểu dữ liệu
    - Không cần dấu chấm phẩy `;`
    - Không cần ngoặc nhọn `{}` — dùng thụt lề (indent)

---

## 2. Cài đặt Python

### Cách 1: Cài từ trang chính thức (Khuyến nghị)

1. Truy cập [python.org](https://www.python.org/downloads/)
2. Tải phiên bản mới nhất (Python 3.12+)
3. Khi cài đặt, **đánh dấu** "Add Python to PATH"
4. Kiểm tra: mở Terminal/Command Prompt, gõ:

```bash
python --version
```

Nếu hiện ra `Python 3.x.x` là cài thành công!

### Cách 2: Cài từ Microsoft Store (Windows)

1. Mở Microsoft Store
2. Tìm "Python 3.12"
3. Cài đặt

### Cách 3: Sử dụng Online

Nếu không muốn cài đặt, có thể sử dụng online:

- **[Replit](https://replit.com/)** — IDE online miễn phí
- **[Google Colab](https://colab.research.google.com/)** — Notebook online
- **[Python Online](https://www.online-python.com/)** — Chạy Python online

---

## 3. Chọn IDE / Text Editor

!!! question "Nên chọn IDE nào?"
    Nếu bạn **chưa biết chọn gì**, hãy dùng **Thonny** (cho người mới) hoặc **IDLE** (đi kèm Python). Đây là 2 IDE **đơn giản nhất** để bắt đầu học Python.

### Thonny (Rất khuyến nghị cho người mới)

1. Tải [Thonny](https://thonny.org/) — IDE Python đơn giản, phù hợp cho người mới bắt đầu
2. Cài đặt, mở Thonny
3. Gõ code vào cửa sổ trên, nhấn **F5** để chạy

!!! tip "Tại sao Thonny rất khuyến nghị?"
    - Giao diện **đơn giản**, không gây rối
    - Hiển thị **biến** trực quan khi chạy từng dòng
    - **Debug** dễ dàng (chạy từng bước)
    - **Không cần cài thêm** gì (đã có sẵn Python)
    - Phù hợp cho người **chưa biết gì** về lập trình

### IDLE (Đi kèm Python — Cũng rất tốt)

- Cài đặt Python xong sẽ có sẵn IDLE
- Mở Start → tìm "IDLE"
- Gõ code vào cửa sổ, nhấn **F5** để chạy

!!! tip "IDLE"
    - **Đã có sẵn** khi cài Python (không cần cài thêm)
    - **Đơn giản**, dễ sử dụng
    - Phù hợp cho **test nhanh** và **học cơ bản**

### So sánh Thonny và IDLE

| | Thonny | IDLE |
|---|--------|------|
| **Cài đặt** | Cần tải thêm | Có sẵn khi cài Python |
| **Giao diện** | Trực quan, hiện biến | Đơn giản |
| **Debug** | Mạnh mẽ (chạy từng dòng, xem biến) | Cơ bản |
| **Phù hợp cho** | Người mới bắt đầu | Test nhanh, học cơ bản |

!!! tip "Lời khuyên cho các em"
    - **Người mới bắt đầu:** Dùng **Thonny** (trực quan, dễ debug)
    - **Không muốn cài thêm:** Dùng **IDLE** (đã có sẵn)
    - **Muốn mạnh mẽ hơn:** Dùng **VS Code** (phổ biến, nhiều extension)
    - **Không nên dùng PyCharm** cho thi đấu (nặng, phức tạp, không được phép)

### VS Code (Phổ biến nhưng phức tạp)

1. Tải [VS Code](https://code.visualstudio.com/)
2. Cài extension "Python" của Microsoft
3. Mở terminal trong VS Code (`Ctrl + ``)

!!! warning "VS Code"
    - **Phổ biến nhất** hiện nay
    - Hỗ trợ **nhiều ngôn ngữ**
    - Nhưng **hơi phức tạp** cho người mới
    - **Không được dùng** trong nhiều kỳ thi

### PyCharm (Không khuyến nghị cho thi đấu)

1. Tải [PyCharm Community](https://www.jetbrains.com/pycharm/) (miễn phí)
2. Cài đặt, tạo project mới
3. Tạo file `.py`, nhấn **Shift + F10** để chạy

!!! warning "PyCharm"
    - **Mạnh mẽ** nhưng **rất phức tạp** cho người mới
    - **Nặng**, tốn tài nguyên máy
    - **Không được dùng** trong thi đấu (thường)
    - Phù hợp cho **dự án lớn**, không phải thi đấu

---

## 4. Chương trình đầu tiên: Hello World

### Cách 1: Chạy file .py

Tạo file `hello.py`:

```python
print("Hello World!")
```

Chạy trong terminal:

```bash
python hello.py
```

Kết quả:

```
Hello World!
```

### Cách 2: Chạy trực tiếp (Interactive Mode)

Mở terminal, gõ `python` để vào chế độ tương tác:

```
>>> print("Hello World!")
Hello World!
>>> 2 + 3
5
>>> exit()  # Thoát
```

---

## 5. Cấu trúc cơ bản của một chương trình Python

```python
# Đây là comment — không được chạy
# Dùng để ghi chú cho code

"""
Đây là docstring — comment nhiều dòng
Dùng để mô tả function, class, module
"""

# Chương trình đầu tiên
print("Xin chào các bạn!")
print("Mình là Python")
print("Rất vui được gặp các bạn")
```

!!! info "Comment trong Python"
    - `#` — Comment 1 dòng
    - `"""..."""` — Comment nhiều dòng (docstring)
    - Comment giúp code dễ hiểu hơn, không ảnh hưởng đến chương trình

---

## 6. Indentation (Thụt lề) — Quan trọng!

Python dùng **thụt lề** để xác định khối code, không dùng `{}` như C++/Java.

=== "Python (Đúng)"

    ```python
    if True:
        print("Dòng này thụt lề 4 spaces")
        print("Cũng thuộc khối if")
    print("Dòng này không thụt lề — ngoài khối if")
    ```

=== "C++ (So sánh)"

    ```cpp
    if (true) {
        cout << "Dùng ngoặc nhọn {}";
        cout << "Để xác định khối code";
    }
    cout << "Ngoài khối if";
    ```

!!! warning "Lưu ý quan trọng"
    - Dùng **4 spaces** (khuyến nghị) hoặc **1 tab** — KHÔNG trộn lẫn
    - Thụt lề sai → Lỗi `IndentationError`
    - Trong thi đấu, hãy dùng 4 spaces cho nhất quán

---

## 7. Template thi đấu Python

Khi thi đấu, hãy dùng template sau để tiết kiệm thời gian:

```python
import sys
input = sys.stdin.readline  # Đọc input nhanh hơn

# ===== CODE CHÍNH =====
n = int(input())
arr = list(map(int, input().split()))

# Xử lý ở đây
print(sum(arr))
```

!!! tip "Tại sao cần template?"
    - `input = sys.stdin.readline` giúp đọc input **nhanh hơn** rất nhiều
    - Tiết kiệm thời gian gõ khi thi đấu
    - Tránh quên import

---

## 8. Chạy và debug

### Lỗi thường gặp

```python
# Lỗi 1: Thiếu dấu ngoặc
print("Hello"  # SyntaxError: unexpected EOF

# Lỗi 2: Thụt lề sai
if True:
print("Hello")  # IndentationError

# Lỗi 3: Sai tên biến
print(messge)  # NameError: name 'messge' is not defined
```

### Cách debug đơn giản

```python
# Dùng print() để kiểm tra giá trị biến
x = 42
print("x =", x)  # In ra: x = 42

# Dùng print() để kiểm tra luồng chạy
print("Điểm 1")
# ... code ...
print("Điểm 2")
```

---

## 9. Lưu ý / Cạm bẫy hay gặp

### Bẫy 1: Python 2 vs Python 3

!!! warning "Quan trọng"
    Luôn dùng **Python 3**. Python 2 đã ngừng hỗ trợ từ 2020.

```python
# Python 2 (KHÔNG dùng)
print "Hello"       # Không có ngoặc

# Python 3 (DÙNG)
print("Hello")      # Có ngoặc
```

### Bẫy 2: Case-sensitive

Python **phân biệt chữ hoa chữ thường**:

```python
name = "Alice"
Name = "Bob"
NAME = "Charlie"
# Đây là 3 biến KHÁC NHAU
```

### Bẫy 3: Tên file không được trùng thư viện chuẩn

```python
# SAI: Đặt tên file là "math.py"
# → Khi import math sẽ bị lỗi (import chính file của bạn)

# ĐÚNG: Đặt tên file khác, ví dụ "solution.py", "main.py"
```

---

## 10. Bài tập thực hành

### Bài 1: Hello World
Viết chương trình in ra dòng chữ `Hello World!`

<div class="cp-pg" data-language="python" data-starter="# Viết code ở đây" data-input="" data-expected="Hello World!" data-hint="Dùng print()"></div>

??? tip "Lời giải"
    ```python
    print("Hello World!")
    ```

### Bài 2: In tên
Viết chương trình in ra tên của bạn.

<div class="cp-pg" data-language="python" data-starter="# Viết code ở đây" data-input="" data-expected="Nguyen Van A" data-hint="Dùng print() với chuỗi"></div>

??? tip "Lời giải"
    ```python
    print("Nguyen Van A")
    ```

### Bài 3: In nhiều dòng
Viết chương trình in ra: `Ten: Nguyen Van A`, `Lop: 10A1`, `Truong: THPT ABC` (mỗi dòng một dòng).

<div class="cp-pg" data-language="python" data-starter="# Viết code ở đây" data-input="" data-expected="Ten: Nguyen Van A\nLop: 10A1\nTruong: THPT ABC" data-hint="Dùng 3 lệnh print()"></div>

??? tip "Lời giải"
    ```python
    print("Ten: Nguyen Van A")
    print("Lop: 10A1")
    print("Truong: THPT ABC")
    ```

### Bài 4: Tính toán đơn giản
Viết chương trình tính và in ra kết quả của: `2 + 3 * 4`

<div class="cp-pg" data-language="python" data-starter="# Viết code ở đây" data-input="" data-expected="14" data-hint="Dùng print(2 + 3 * 4)"></div>

??? tip "Lời giải"
    ```python
    print(2 + 3 * 4)  # Kết quả: 14
    ```

---

## 11. Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [AtCoder - Product](https://atcoder.jp/contests/abc086/tasks/abc086_a) | AtCoder | ⭐ | Nhập/xuất cơ bản |
| [CSES - Weirdd Algorithm](https://cses.fi/problemset/task/1068) | CSES | ⭐ | Chương trình đầu tiên |

---

## Bài viết liên quan

- [P02: Biến & Kiểu dữ liệu →](P02-bien-kieu-du-lieu.md)
- [Tổng quan Chương 1: Python](index.md)

---

**Bài tiếp theo:** [P02: Biến & Kiểu dữ liệu →](P02-bien-kieu-du-lieu.md)
