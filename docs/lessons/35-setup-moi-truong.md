# Bài 35: Setup Môi Trường Thi Đấu - Từ Đầu Đến Cuối

> **Tác giả:** Hà Trí Kiên

## 1. Tại sao phải setup trước?

Bạn có 5 phút đầu giờ thi. Nếu chưa setup → mất thời gian copy-paste, tìm lỗi compile. Setup sẵn → bắt đầu code ngay!

**Mục tiêu:** Cài đặt xong từ A → Z: có trình biên dịch, có editor, có template, biết compile và chạy code.

---

## 2. Tổng quan các phần mềm cần cài

| Phần mềm | Dùng để | Bắt buộc? |
|----------|---------|-----------|
| **MinGW-w64** (hoặc MSYS2) | Biên dịch C/C++ trên Windows | **Bắt buộc** (nếu code C++) |
| **Python 3** (hoặc PyPy) | Chạy code Python | **Bắt buộc** (nếu code Python) |
| **Code Editor** | Viết code | **Bắt buộc** |
| **Code::Blocks** | IDE all-in-one (editor + compile + debug) | Khuyến nghị cho người mới |
| **Thonny** | IDE Python đơn giản | Khuyến nghị cho người mới học Python |
| **VS Code** | Editor mạnh, hỗ trợ cả C++ và Python | Khuyến nghị cho người đã quen |
| **Dev-C++** | IDE C++ nhẹ, phổ biến trong trường VN | Tùy chọn |
| **Sublime Text** | Editor nhẹ, nhanh | Tùy chọn |
| **CP Editor** | Editor chuyên cho competitive programming | Tùy chọn |

---

## 3. Bước 1: Cài trình biên dịch C/C++ (MinGW-w64)

### 3.1. Tại sao cần MinGW-w64?

Windows không có sẵn `g++` (trình biên dịch C++). Bạn cần cài MinGW-w64 để có lệnh `g++` chạy trong Command Prompt / PowerShell.

### 3.2. Tải và cài đặt

**Cách 1: Tải trực tiếp (khuyến nghị)**

1. Vào [https://www.mingw-w64.org/](https://www.mingw-w64.org/) → click **Downloads**
2. Hoặc tải trực tiếp từ: [https://github.com/niXman/mingw-builds-binaries/releases](https://github.com/niXman/mingw-builds-binaries/releases)
3. Chọn phiên bản: `x86_64-posix-seh` (64-bit Windows)
4. Giải nén vào `C:\mingw64`
5. Thêm `C:\mingw64\bin` vào PATH:

**Thêm vào PATH (Windows 10/11):**
```
1. Nhấn Windows + S, gõ "Environment Variables"
2. Click "Edit the system environment variables"
3. Click "Environment Variables"
4. Trong "System variables", tìm "Path", click "Edit"
5. Click "New", gõ: C:\mingw64\bin
6. Click "OK" ở tất cả cửa sổ
7. Mở Command Prompt MỚI, gõ: g++ --version
```

**Cách 2: Dùng MSYS2 (nếu muốn quản lý packages)**

1. Tải MSYS2 từ [https://www.msys2.org/](https://www.msys2.org/)
2. Cài đặt vào `C:\msys64`
3. Mở MSYS2 UCRT64, chạy:
```bash
pacman -S mingw-w64-ucrt-x86_64-gcc
```
4. Thêm `C:\msys64\ucrt64\bin` vào PATH

### 3.3. Kiểm tra

Mở **Command Prompt mới** (hoặc PowerShell), gõ:

```bash
g++ --version
```

Nếu hiện ra phiên bản (ví dụ `g++ (x86_64-posix-seh-rev1, Built by MinGW-Builds project) 13.2.0`) → **thành công!**

### 3.4. Lệnh compile cơ bản

```bash
# Compile file solution.cpp thành solution.exe
g++ -std=c++17 -O2 -Wall -o solution.exe solution.cpp

# Chạy
solution.exe

# Chạy với input từ file
solution.exe < input.txt

# Chạy và lưu output ra file
solution.exe < input.txt > output.txt
```

| Flag | Ý nghĩa |
|------|---------|
| `-std=c++17` | Dùng chuẩn C++17 (có `auto`, structured bindings, ...) |
| `-O2` | Tối ưu hóa tốc độ (quan trọng khi thi!) |
| `-Wall` | Hiển thị tất cả cảnh báo |
| `-o solution.exe` | Đặt tên file output |

---

## 4. Bước 2: Cài Python / PyPy

### 4.1. Cài Python

1. Vào [https://www.python.org/downloads/](https://www.python.org/downloads/)
2. Tải phiên bản mới nhất (3.12+)
3. **QUAN TRỌNG:** Khi cài, tick chọn **"Add Python to PATH"**
4. Cài đặt xong, mở Command Prompt mới:

```bash
python --version
# Python 3.12.x

pip --version
# pip 24.x.x from ...
```

### 4.2. Cài PyPy (tùy chọn - nhanh hơn Python 5-10 lần)

1. Vào [https://www.pypy.org/download.html](https://www.pypy.org/download.html)
2. Tải "PyPy3.10 Windows 64-bit" (hoặc phiên bản mới nhất)
3. Giải nén vào `C:\pypy3`
4. Thêm `C:\pypy3` vào PATH
5. Kiểm tra: `pypy3 --version`

!!! tip "Khi nào dùng PyPy?"
    PyPy nhanh hơn Python rất nhiều cho competitive programming. Nhiều online judge (Codeforces, CSES) đều hỗ trợ PyPy. Nếu bài TLE với Python, thử PyPy!

### 4.3. Các thư viện Python thường dùng

```bash
# Cài các thư viện hay dùng (tùy chọn)
pip install numpy        # Tính toán số (ít dùng khi thi)
pip install networkx     # Đồ thị (ít dùng khi thi)
```

!!! warning "Khi thi"
    Hầu hết online judge chỉ có thư viện chuẩn Python. Không được cài thêm thư viện bên ngoài!

---

## 5. Bước 3: Chọn và cài Code Editor / IDE

### 5.1. Code::Blocks (Khuyến nghị cho người mới)

**Ưu điểm:**

- All-in-one: editor + compiler + debugger trong 1 phần mềm
- Không cần cài thêm gì (đã có sẵn MinGW nếu tải phiên bản `codeblocks-xx.xx-mingw-setup`)
- Giao diện đơn giản, dễ dùng
- Phổ biến trong các trường học Việt Nam

**Cài đặt:**

1. Vào [https://www.codeblocks.org/downloads/binaries/](https://www.codeblocks.org/downloads/binaries/)
2. Tải phiên bản **`codeblocks-20.03mingw-setup.exe`** (có sẵn MinGW!)
3. Cài đặt bình thường
4. Mở Code::Blocks → File → New → Project → Console Application → C++ → đặt tên → Finish
5. Nhấn F9 để compile + chạy

**Cấu hình:**

- Settings → Compiler → chọn "GNU GCC Compiler"
- Settings → Compiler → Compiler flags → tick `-std=c++17` và `-O2`

### 5.2. Thonny (Khuyến nghị cho người mới học Python)

**Ưu điểm:**

- Giao diện cực kỳ đơn giản, designed cho người mới
- Có sẵn Python (không cần cài riêng)
- Debug từng bước dễ dàng
- Phù hợp cho học sinh cấp 2, cấp 3 mới bắt đầu

**Cài đặt:**

1. Vào [https://thonny.org/](https://thonny.org/)
2. Tải phiên bản cho Windows
3. Cài đặt (Python đi kèm)
4. Mở Thonny → viết code → nhấn F5 để chạy

**Lưu ý:** Thonny đơn giản nhưng **thiếu một số tính năng** khi thi đấu (không có snippet, không có compile C++). Nên chuyển sang VS Code hoặc Code::Blocks khi đã quen.

### 5.3. VS Code (Khuyến nghị cho người đã quen)

**Ưu điểm:**

- Hỗ trợ C++, Python, và hầu hết ngôn ngữ khác
- Extensions phong phú (IntelliSense, debugging, snippets)
- Terminal tích hợp
- Miễn phí, cross-platform

**Cài đặt:**

1. Tải VS Code từ [https://code.visualstudio.com/](https://code.visualstudio.com/)
2. Cài đặt các extensions:

| Extension | Dùng cho |
|-----------|----------|
| **C/C++** (Microsoft) | IntelliSense, debugging C++ |
| **Code Runner** | Chạy code nhanh bằng 1 nút |
| **Python** (Microsoft) | Hỗ trợ Python |
| **Competitive Programming Helper** | Quản lý test case |

3. Cấu hình Code Runner:
   - Settings → Code Runner: Executor Map → thêm:
```json
{
    "cpp": "cd $dir && g++ -std=c++17 -O2 -Wall -o $fileNameWithoutExt.exe $fileName && $dir$fileNameWithoutExt.exe",
    "python": "python -u"
}
```

### 5.4. Dev-C++ (Phổ biến trong trường VN)

**Ưu điểm:**

- Nhẹ, cài nhanh
- Có sẵn MinGW
- Phổ biến trong các kỳ thi HSG tỉnh

**Nhược điểm:**

- Đã ngừng phát triển (phiên bản gốc)
- Giao diện cũ

**Cài đặt:**

1. Tải từ [https://sourceforge.net/projects/orwelldevcpp/](https://sourceforge.net/projects/orwelldevcpp/)
2. Hoặc tải Embarcadero Dev-C++ (phiên bản mới hơn): [https://github.com/Embarcadero/Dev-Cpp](https://github.com/Embarcadero/Dev-Cpp)
3. Cài đặt, mở Dev-C++ → File → New → Source File → viết code → F11 compile + chạy

### 5.5. Sublime Text (Editor nhẹ, nhanh)

**Ưu điểm:**

- Rất nhẹ, mở nhanh
- Gõ code mượt
- Hỗ trợ snippet

**Nhược điểm:** Không có built-in compiler, cần cấu hình thêm.

**Cài đặt:**

1. Tải từ [https://www.sublimetext.com/download](https://www.sublimetext.com/download)
2. Cài Package Control: `Ctrl+Shift+P` → gõ "Install Package Control"
3. Cài thêm package: C++ Snippets, Python Snippets

### 5.6. CP Editor (Editor chuyên cho competitive programming)

**Ưu điểm:**

- Tự động compile + chạy test case
- Tích hợp với competitive programming (Codeforces, AtCoder)
- Stress test built-in
- Template tự động

**Cài đặt:**

1. Tải từ [https://cpeditor.org/](https://cpeditor.org/)
2. Cài đặt, cấu hình compiler path
3. Tạo bài mới → viết code → nhấn Run để chạy tất cả test case

---

## 6. Bước 4: Template C++ cho thi đấu

### Template cơ bản — Copy-paste là chạy

```cpp
#include <bits/stdc++.h>
using namespace std;

// ===== Type aliases =====
#define ll long long
#define ull unsigned long long
#define pb push_back
#define all(x) (x).begin(), (x).end()
#define rall(x) (x).rbegin(), (x).rend()

// ===== Constants =====
const ll MOD = 1e9 + 7;
const ll INF = 1e18;
const int MAXN = 2e5 + 5;

// ===== Fast I/O =====
void fastIO() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);
}

// ===== Main =====
int main() {
    fastIO();
    
    int t = 1;
    // cin >> t;  // Bỏ comment nếu có nhiều test case
    while (t--) {
        // Code ở đây
        
    }
    return 0;
}
```

### Giải thích từng phần

| Phần | Tác dụng |
|------|----------|
| `#include <bits/stdc++.h>` | Include TẤT CẢ thư viện chuẩn (tiện, nhưng chỉ dùng khi thi) |
| `long long` aliases | Tránh viết dài, `ll` ngắn hơn |
| `all(x)` | `(x).begin(), (x).end()` — dùng cho `sort(all(v))` |
| `MOD`, `INF`, `MAXN` | Hằng số thường dùng |
| `fastIO()` | Tắt sync C/C++, tăng tốc I/O **rất nhiều** |
| `int t = 1` | Multi-test pattern |

### Template nâng cao — Debug macro

```cpp
// ===== Debug (CHỈ dùng khi debug, XÓA khi nộp bài!) =====
#define debug(x) cerr << #x << " = " << (x) << endl;
#define debugv(v) cerr << #v << " = "; for (auto x : v) cerr << x << " "; cerr << endl;

// Cách dùng:
// debug(n);        → in: n = 5
// debugv(arr);     → in: arr = 1 2 3 4 5
```

!!! warning "NHỚ XÓA debug macro khi nộp bài!"
    Debug macro dùng `cerr` (in ra stderr), không ảnh hưởng output. Nhưng tốt nhất nên xóa trước khi submit.

---

## 7. Template Python cho thi đấu

### Template cơ bản

```python
import sys
input = sys.stdin.readline

def solve():
    # Code ở đây
    n = int(input())
    a = list(map(int, input().split()))
    
    # ...
    print(result)

t = 1
# t = int(input())  # Bỏ comment nếu có nhiều test case
for _ in range(t):
    solve()
```

### Các import thường dùng

```python
import sys
from collections import deque, defaultdict, Counter
from heapq import heappush, heappop, heapify
from bisect import bisect_left, bisect_right
from math import gcd, sqrt, ceil, floor, log2
from functools import lru_cache

# Fast I/O
input = sys.stdin.readline

# Đệ quy sâu (mặc định ~1000, tăng lên 10^6)
sys.setrecursionlimit(10**6)
```

---

## 8. So sánh C++ vs Python trong thi đấu

| Tiêu chí | C++ | Python |
|----------|-----|--------|
| Tốc độ | **Nhanh** (~10^8 phép tính/giây) | Chậm hơn (~10^7 phép tính/giây, PyPy ~10^7-10^8) |
| I/O | Cần `fastIO()` | Cần `sys.stdin.readline` |
| Code ngắn | Trung bình | **Ngắn hơn** |
| Thư viện | `bits/stdc++.h` | Import từng cái |
| Đệ quy | Không giới hạn | Cần `setrecursionlimit` |
| BigInt | Cần `__int128` | **Tự động** |
| Debug | `cerr`, macro | `print()` |

### Khi nào dùng C++?

- Bài cần tốc độ (N ≤ 10^6, O(N log N))
- Bài cần bitmask/DP trạng thái
- Bài dùng nhiều cấu trúc dữ liệu

### Khi nào dùng Python?

- Bài toán lớn (BigInt, số rất lớn)
- Code nhanh (đếm, string processing)
- Bài ít test case, không cần tối ưu tốc độ

---

## 9. Workflow: Viết code → Compile → Chạy → Nộp bài

### 9.1. Với Code::Blocks

```
1. Mở Code::Blocks → File → New → Console Application → C++
2. Xóa code mẫu, paste template vào
3. Viết code giải bài
4. Nhấn F9 (Build + Run)
5. Xem output ở cửa sổ console phía dưới
6. Nếu đúng → copy code nộp lên online judge
```

### 9.2. Với VS Code

```
1. Mở VS Code → File → New File → lưu thành solution.cpp
2. Viết code
3. Nhấn Ctrl+` mở terminal
4. Gõ: g++ -std=c++17 -O2 -Wall -o solution.exe solution.cpp && solution.exe
5. Hoặc dùng Code Runner: nhấn nút ▶
6. Nếu đúng → copy code nộp
```

### 9.3. Với Thonny (Python)

```
1. Mở Thonny
2. Viết code ở cửa sổ trên
3. Nhấn F5 (Run)
4. Xem output ở cửa sổ Shell phía dưới
5. Nếu đúng → copy code nộp
```

### 9.4. Với Command Prompt / PowerShell

```bash
# Compile C++
g++ -std=c++17 -O2 -Wall -o solution.exe solution.cpp

# Chạy với input từ bàn phím
solution.exe

# Chạy với input từ file
solution.exe < input.txt

# So sánh output với expected
solution.exe < input.txt > my_output.txt
fc my_output.txt expected.txt

# Python
python solution.py < input.txt
```

---

## 10. Bước 5: Cài đặt trên Linux (Ubuntu)

Nếu bạn dùng Linux (hoặc WSL trên Windows):

```bash
# Cài compiler
sudo apt update
sudo apt install g++ python3 python3-pip

# Cài thêm các thư viện (tùy chọn)
sudo apt install pypy3

# Kiểm tra
g++ --version
python3 --version
```

---

## 11. Các Online Judge phổ biến

| Online Judge | URL | Ngôn ngữ hỗ trợ | Ghi chú |
|-------------|-----|-----------------|---------|
| **CSES** | [cses.fi](https://cses.fi) | C++, Python, Java | Bài tập theo chủ đề, rất tốt cho người mới |
| **Codeforces** | [codeforces.com](https://codeforces.com) | C++, Python, Java, ... | Contest hàng tuần, cộng đồng lớn |
| **VNOJ** | [oj.vnoi.info](https://oj.vnoi.info) | C++, Python | Bài tập Việt Nam, đề thi HSG |
| **SPOJ** | [spoj.com](https://spoj.com) | Hầu hết ngôn ngữ | Kho bài lớn, nhiều bài classic |
| **LeetCode** | [leetcode.com](https://leetcode.com) | C++, Python, Java, ... | Phỏng vấn, luyện kỹ năng code |
| **AtCoder** | [atcoder.jp](https://atcoder.jp) | C++, Python, Java, ... | Contest chất lượng cao từ Nhật |

### Lưu ý khi nộp bài

- **Codeforces:** Hỗ trợ C++17, C++20. Có PyPy 3 (nhanh hơn Python thường).
- **CSES:** Chỉ hỗ trợ C++ và Python. Timeout 1 giây, memory 512MB.
- **VNOJ:** Hỗ trợ C++ và Python. Một số bài có giới hạn thời gian nghiêm ngặt.
- **SPOJ:** Nhiều trình biên dịch khác nhau. Chọn đúng khi nộp.

---

## 12. Bước 6: Chuẩn bị cho ngày thi

### Checklist trước khi thi

```
☐ Đã cài g++ và kiểm tra g++ --version
☐ Đã cài Python (hoặc PyPy)
☐ Đã cài editor quen dùng (Code::Blocks / VS Code / Thonny)
☐ Đã lưu template vào file sẵn (template.cpp, template.py)
☐ Đã test compile template 1 lần
☐ Đã chuẩn bị USB (nếu thi offline)
☐ Đã biết cách copy code nộp bài
```

### Mẹo: Tạo thư mục thi đấu sẵn

```
D:\THI_HSG\
├── template.cpp          ← Template C++
├── template.py           ← Template Python
├── bai1\
│   ├── bai1.cpp
│   └── test\
├── bai2\
│   ├── bai2.cpp
│   └── test\
└── submit\
    ├── bai1.cpp
    └── bai2.cpp
```

(Xem thêm [Bài 39: Tổ chức code](39-to-chuc-code.md) để biết chi tiết)

---

## 13. Lưu ý quan trọng

### 13.1. Dùng đúng kiểu dữ liệu

```cpp
// SAI: int chỉ đến ~2×10^9 → tràn khi cộng!
int sum = 0;
for (int i = 0; i < n; i++) sum += a[i];  // Có thể tràn!

// ĐÚNG: Dùng long long khi giá trị có thể lớn
long long sum = 0;
```

**Quy tắc:** Nếu không chắc → dùng `long long`!

### 13.2. Luôn dùng `fastIO()` trong C++

```cpp
// Không fastIO: cin/cout đồng bộ với printf/scanf → CHẬM
// Có fastIO: tắt đồng bộ → nhanh gấp 5-10 lần!

ios::sync_with_stdio(false);
cin.tie(nullptr);
```

### 13.3. Quên `endl` → dùng `"\n"`

```cpp
// SAI: endl flush buffer → chậm
cout << result << endl;

// ĐÚNG: "\n" không flush → nhanh hơn
cout << result << "\n";
```

### 13.4. Python: `input()` vs `sys.stdin.readline`

```python
# SAI: input() đọc cả dòng + strip → chậm hơn
n = int(input())

# ĐÚNG: sys.stdin.readline nhanh hơn nhiều
import sys
input = sys.stdin.readline
n = int(input())
```

### 13.5. Compile với flag đúng

```bash
# SAI: Không có -O2 → chạy chậm, có thể TLE
g++ solution.cpp

# ĐÚNG: Luôn dùng -O2 khi nộp bài
g++ -std=c++17 -O2 -Wall -o solution.exe solution.cpp
```

---

## 14. Bảng so sánh các Editor / IDE

| Tiêu chí | Code::Blocks | Thonny | VS Code | Dev-C++ | Sublime Text | CP Editor |
|----------|-------------|--------|---------|---------|-------------|-----------|
| **Dễ cài** | ★★★★★ | ★★★★★ | ★★★★ | ★★★★★ | ★★★★ | ★★★ |
| **Dễ dùng** | ★★★★★ | ★★★★★ | ★★★★ | ★★★★ | ★★★ | ★★★ |
| **Hỗ trợ C++** | ★★★★★ | ✗ | ★★★★★ | ★★★★★ | ★★★ | ★★★★★ |
| **Hỗ trợ Python** | ✗ | ★★★★★ | ★★★★★ | ✗ | ★★★ | ★★★ |
| **Debug** | ★★★★★ | ★★★★ | ★★★★★ | ★★★ | ★★ | ★★★★ |
| **Snippet** | ★★★ | ★★ | ★★★★★ | ★★★ | ★★★★ | ★★★★★ |
| **Nhẹ** | ★★★★ | ★★★★★ | ★★★ | ★★★★★ | ★★★★★ | ★★★★ |
| **Phù hợp** | Người mới | Người mới Python | Mọi người | Người mới | Người quen | Thi đấu |

### Khuyến nghị theo đối tượng

| Đối tượng | Nên dùng |
|-----------|---------|
| **Học sinh cấp 2 mới bắt đầu** | **Thonny** (Python) hoặc **Code::Blocks** (C++) |
| **Học sinh cấp 3 luyện thi HSG** | **Code::Blocks** hoặc **VS Code** |
| **Đã quen code, muốn nhanh** | **VS Code** + extensions hoặc **CP Editor** |
| **Thi offline (trên máy trường)** | **Dev-C++** (thường đã có sẵn) hoặc **Code::Blocks** |

---

## 15. Bài tập luyện tập

Hãy setup template và thử submit bài đơn giản:

| Bài | Nền tảng | Mục đích |
|-----|----------|----------|
| [CSES - Weird Algorithm](https://cses.fi/problemset/task/1068) | CSES | Test template C++ |
| [CSES - Missing Number](https://cses.fi/problemset/task/1083) | CSES | Test I/O |
| [CSES - Permutations](https://cses.fi/problemset/task/1070) | CSES | Test logic đơn giản |

---

## Tài liệu tham khảo

- [MinGW-w64 - Downloads](https://www.mingw-w64.org/)
- [Code::Blocks - Downloads](https://www.codeblocks.org/downloads/)
- [Thonny - Python IDE for beginners](https://thonny.org/)
- [VS Code - Download](https://code.visualstudio.com/)
- [CP Editor](https://cpeditor.org/)
- [Codeforces - Good Contest Templates](https://codeforces.com/blog/entry/75429)
- [USACO Guide - Contest Strategy](https://usaco.guide/general/contests)

**Bài tiếp theo:** [Độ phức tạp thời gian →](01-do-phuc-tap-thoi-gian.md)
