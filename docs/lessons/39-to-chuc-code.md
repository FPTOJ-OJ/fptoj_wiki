# Bài 39: Tổ Chức Code & Chuẩn Bị Nộp Bài

> **Tác giả:** Hà Trí Kiên<br>
> **Nội dung:** Kỹ năng tổ chức code, quản lý thư mục, chuẩn bị nộp USB

## 1. Tại sao phải tổ chức code?

Bạn code xong 3 bài, đến lúc nộp USB → tìm file không ra, copy nhầm file cũ, quên xóa debug → **mất điểm oan!**

**Tổ chức code tốt = nộp bài an toàn = không mất điểm vô ích.**

---

## 2. Cấu trúc thư mục thi đấu

### 2.1. Trên máy thi (trước khi copy lên USB)

```
D:\THI_HSG\
├── template.cpp          ← Template chung (copy sẵn)
├── bai1\
│   ├── bai1.cpp          ← Code bài 1
│   ├── test\             ← Thư mục test
│   │   ├── 1.in          ← Input test 1
│   │   ├── 1.out         ← Expected output 1
│   │   ├── 2.in
│   │   ├── 2.out
│   │   └── ...
│   └── run.bat           ← Script chạy test
├── bai2\
│   ├── bai2.cpp
│   ├── test\
│   └── run.bat
├── bai3\
│   ├── bai3.cpp
│   ├── test\
│   └── run.bat
└── submit\               ← Thư mục chuẩn bị nộp
    ├── bai1.cpp
    ├── bai2.cpp
    └── bai3.cpp
```

### 2.2. Trên USB (nộp bài)

```
USB:\
├── bai1.cpp
├── bai2.cpp
└── bai3.cpp
```

**Lưu ý:** Chỉ nộp file `.cpp` đã xóa debug, đã test kỹ!

---

## 3. Script tạo thư mục thi đấu (Windows)

Lưu thành `setup_thi.bat`, chạy 1 lần trước khi thi:

```batch
@echo off
echo Tao cau truc thu muc thi dau...

mkdir D:\THI_HSG
mkdir D:\THI_HSG\bai1\test
mkdir D:\THI_HSG\bai2\test
mkdir D:\THI_HSG\bai3\test
mkdir D:\THI_HSG\bai4\test
mkdir D:\THI_HSG\bai5\test
mkdir D:\THI_HSG\submit

echo Da tao xong!
echo.
echo Cau truc:
echo D:\THI_HSG\
echo ├── bai1\ (code + test)
echo ├── bai2\ (code + test)
echo ├── bai3\ (code + test)
echo ├── submit\ (file chuan bi nop)
echo └── template.cpp

pause
```

---

## 4. Script compile & chạy test (Windows)

Lưu thành `run.bat` trong mỗi thư mục bài:

```batch
@echo off
setlocal enabledelayedexpansion
REM ===== Compile =====
g++ -std=c++17 -O2 -Wall -o bai1.exe bai1.cpp
if errorlevel 1 (
    echo COMPILE ERROR!
    pause
    exit /b 1
)

REM ===== Chạy test =====
echo Dang chay test...
set pass=0
set fail=0

for %%f in (test\*.in) do (
    set "filename=%%~nf"
    bai1.exe < "%%f" > "test\temp.out"
    fc /W "test\%%~nf.out" "test\temp.out" > nul
    if errorlevel 1 (
        echo [FAIL] Test %%~nf
        set /a fail+=1
    ) else (
        echo [PASS] Test %%~nf
        set /a pass+=1
    )
)

echo.
echo Ket qua: !pass! PASS, !fail! FAIL
pause
```

---

## 5. Script chuẩn bị nộp bài

Lưu thành `prepare_submit.bat` trong `D:\THI_HSG\`:

```batch
@echo off
echo ===== CHUAN BI NOP BAI =====
echo.

REM Xóa thư mục submit cũ
if exist submit\*.cpp del /q submit\*.cpp

REM Copy code vào thư mục submit
echo Copy bai1...
copy bai1\bai1.cpp submit\ > nul

echo Copy bai2...
copy bai2\bai2.cpp submit\ > nul

echo Copy bai3...
copy bai3\bai3.cpp submit\ > nul

echo Copy bai4...
copy bai4\bai4.cpp submit\ 2>nul

echo Copy bai5...
copy bai5\bai5.cpp submit\ 2>nul

echo.
echo ===== DA COPY XONG =====
echo.
echo Kiem tra thu muc submit:
dir /b submit\

echo.
echo ===== KIEM TRA DEBUG =====
echo Dang kiem tra debug macro trong code...

findstr /C:"debug(" submit\*.cpp >nul 2>&1
if not errorlevel 1 (
    echo [CANH BAO] Tim thay debug macro! Xoa truoc khi nop!
) else (
    echo [OK] Khong tim thay debug macro
)

findstr /C:"cerr" submit\*.cpp >nul 2>&1
if not errorlevel 1 (
    echo [CANH BAO] Tim thay cerr! Xoa truoc khi nop!
) else (
    echo [OK] Khong tim thay cerr
)

echo.
echo ===== KIEM TRA COMPILE =====
for %%f in (submit\*.cpp) do (
    g++ -std=c++17 -O2 -Wall -o test_compile.exe "%%f" 2>nul
    if errorlevel 1 (
        echo [LOI] %%f khong compile duoc!
    ) else (
        echo [OK] %%f compile duoc
        del test_compile.exe 2>nul
    )
)

echo.
echo ===== CHUAN BI NOP USB =====
echo Copy thu muc submit vao USB...
echo.
echo Nhan phim bat ky de tiep tuc...
pause >nul

REM Copy vào USB (thay E: bằng ký tự USB của bạn)
REM xcopy submit\*.cpp E:\ /Y

echo.
echo DA XONG! Kiem tra USB truoc khi nop!
pause
```

---

## 6. Script sinh testcase tự động

Lưu thành `gen_test.cpp`:

```cpp
#include <bits/stdc++.h>
using namespace std;

mt19937 rng(chrono::steady_clock::now().time_since_epoch().count());

int randInt(int l, int r) {
    return uniform_int_distribution<int>(l, r)(rng);
}

// ===== Sinh testcase cho bài tìm đường =====
void genPathTest(int testId) {
    int n = randInt(2, 20);
    int m = randInt(n-1, min(n*(n-1)/2, 50));
    
    ofstream inp("test/" + to_string(testId) + ".in");
    inp << n << " " << m << endl;
    
    // Sinh cây trước (đảm bảo liên thông)
    for(int i = 2; i <= n; i++) {
        int par = randInt(1, i-1);
        int w = randInt(1, 100);
        inp << par << " " << i << " " << w << endl;
    }
    
    // Sinh thêm cạnh
    for(int i = n; i <= m; i++) {
        int u = randInt(1, n);
        int v = randInt(1, n);
        while(v == u) v = randInt(1, n);
        int w = randInt(1, 100);
        inp << u << " " << v << " " << w << endl;
    }
    inp.close();
}

// ===== Sinh testcase cho bài mảng =====
void genArrayTest(int testId) {
    int n = randInt(1, 20);
    int valMin = randInt(-100, 0);
    int valMax = randInt(0, 100);
    
    ofstream inp("test/" + to_string(testId) + ".in");
    inp << n << endl;
    for(int i = 0; i < n; i++) {
        inp << randInt(valMin, valMax);
        if(i < n-1) inp << " ";
    }
    inp << endl;
    inp.close();
}

int main() {
    // Sinh 10 test
    for(int i = 1; i <= 10; i++) {
        genArrayTest(i);
        // genPathTest(i);  // Bỏ comment nếu là bài đồ thị
    }
    cout << "Da sinh 10 test!" << endl;
    return 0;
}
```

---

## 7. Script stress test

Lưu thành `stress_test.cpp`:

```cpp
#include <bits/stdc++.h>
using namespace std;

mt19937 rng(chrono::steady_clock::now().time_since_epoch().count());

int randInt(int l, int r) {
    return uniform_int_distribution<int>(l, r)(rng);
}

// ===== Brute force (chắc chắn đúng) =====
int bruteForce(vector<int>& a) {
    int maxSum = INT_MIN;
    for(int i = 0; i < a.size(); i++) {
        int sum = 0;
        for(int j = i; j < a.size(); j++) {
            sum += a[j];
            maxSum = max(maxSum, sum);
        }
    }
    return maxSum;
}

// ===== Code cần test =====
int mySolution(vector<int>& a) {
    int maxSum = a[0], curSum = a[0];
    for(int i = 1; i < a.size(); i++) {
        curSum = max(a[i], curSum + a[i]);
        maxSum = max(maxSum, curSum);
    }
    return maxSum;
}

int main() {
    int testCount = 0;
    int failCount = 0;
    
    while(failCount == 0) {
        testCount++;
        
        // Sinh testcase
        int n = randInt(1, 20);
        vector<int> a(n);
        for(auto& x : a) x = randInt(-100, 100);
        
        // Chạy cả 2
        int expected = bruteForce(a);
        int actual = mySolution(a);
        
        if(expected != actual) {
            failCount++;
            cout << "BUG FOUND at test " << testCount << "!" << endl;
            cout << "Input: n=" << n << endl;
            for(auto x : a) cout << x << " ";
            cout << endl;
            cout << "Expected: " << expected << endl;
            cout << "Actual: " << actual << endl;
        }
        
        if(testCount % 10000 == 0) {
            cout << "Da test " << testCount << " test, chua tim thay bug..." << endl;
        }
    }
    
    cout << endl;
    cout << "Tong cong: " << testCount << " test, " << failCount << " bug" << endl;
    return 0;
}
```

---

## 8. Workflow hoàn chỉnh khi thi

### Bước 1: Chuẩn bị (trước khi thi)

```
1. Format USB
2. Chạy setup_thi.bat → tạo thư mục
3. Copy template vào mỗi thư mục bài
4. Kiểm tra g++ hoạt động
5. Chuẩn bị giấy + bút
```

### Bước 2: Khi nhận đề (10 phút đầu)

```
1. Đọc TẤT CẢ đề
2. Ghi ra giấy:
   Bài 1: [mô tả ngắn] — ★ Dễ
   Bài 2: [mô tả ngắn] — ★★ Trung bình
   Bài 3: [mô tả ngắn] — ★★★ Khó
3. Quyết định thứ tự làm bài
```

### Bước 3: Làm bài (120-250 phút)

```
1. Mở thư mục bài1/
2. Copy template vào bai1.cpp
3. Code bài 1
4. Tạo test/sample trong test/
5. Chạy run.bat → kiểm tra
6. Nếu xong → chuyển bài 2
7. Lặp lại cho bài 2, 3...
```

### Bước 4: Kiểm tra (20 phút cuối)

```
1. Chạy run.bat cho TẤT CẢ bài
2. Kiểm tra edge cases thủ công
3. Xóa debug macro
4. Kiểm tra output format
```

### Bước 5: Nộp bài (5 phút cuối)

```
1. Chạy prepare_submit.bat
2. Kiểm tra thư mục submit/
3. Copy submit\ vào USB
4. Kiểm tra USB đọc được
5. Nộp USB
```

---

## 9. Lưu ý quan trọng

### 9.1. LUÔN có backup

```
- Copy code ra nhiều nơi (USB, ổ cứng, Desktop)
- Lưu version cũ trước khi sửa (bai1_v1.cpp, bai1_v2.cpp)
- USB dự phòng (nếu được phép)
```

### 9.2. KHÔNG code trực tiếp trên USB

```
Sai lầm: Code trực tiếp trên USB → mất dữ liệu nếu USB hỏng

Đúng: Code trên ổ cứng → copy vào USB khi nộp
```

### 9.3. Kiểm tra compile TRƯỚC khi nộp

```bash
# Compile thử TẤT CẢ bài
g++ -std=c++17 -O2 -Wall -o test bai1.cpp
g++ -std=c++17 -O2 -Wall -o test bai2.cpp
g++ -std=c++17 -O2 -Wall -o test bai3.cpp
```

### 9.4. Kiểm tra output format

```
- Thừa/thiếu khoảng trắng → WA
- Thừa/thiếu xuống dòng → WA
- In hoa/thường khác đề → WA
```

---

## 10. Bài tập luyện tập

Tạo thư mục thi đấu mẫu và thử workflow:

| Bài | Mục đích |
|-----|----------|
| Tạo thư mục `D:\THI_HSG\` | Luyện setup |
| Viết template.cpp | Luyện template |
| Tạo run.bat | Luyện test tự động |
| Tạo 5 test cho 1 bài | Luyện sinh test |
| Chạy stress test | Luyện tìm bug |

### Bài tập thực hành workflow

Sau khi đã setup xong, thử nộp bài trên các nền tảng để quen workflow:

| Bài | Nền tảng | Độ khó | Mục đích |
|-----|----------|--------|----------|
| [CSES - Weird Algorithm](https://cses.fi/problemset/task/1068) | CSES | ⭐ | Quen nộp bài online |
| [CSES - Missing Number](https://cses.fi/problemset/task/1083) | CSES | ⭐ | Luyện đọc input/output |
| [CSES - Repetitions](https://cses.fi/problemset/task/1069) | CSES | ⭐ | Luyện template + test |
| [CSES - Increasing Array](https://cses.fi/problemset/task/1094) | CSES | ⭐ | Luyện stress test |
| [CSES - Permutations](https://cses.fi/problemset/task/1070) | CSES | ⭐ | Luyện edge cases |

---

## Tài liệu tham khảo

- [VNOI Wiki - Kỹ năng thi](https://wiki.vnoi.info/algo/skill/Ki-nang-thi-cu)
- [USACO Guide - Contest Strategy](https://usaco.guide/general/contests)

**Bài trước:** [Debug & Mẹo ←](38-debug-meo.md) | **Bài tiếp theo:** [Về trang tổng hợp →](index.md)
