# Bài 38: Debug & Mẹo Thi Đấu

> **Tác giả:** Hà Trí Kiên<br>
> **Nội dung tham khảo từ:** VNOI Wiki, Codeforces blogs, Kinh nghiệm thi đấu

## 1. Các loại lỗi thường gặp

| Loại lỗi | Triệu chứng | Cách sửa |
|----------|-------------|----------|
| **WA** (Wrong Answer) | Output sai | Debug logic, stress test |
| **TLE** (Time Limit Exceeded) | Chạy quá chậm | Tối ưu độ phức tạp |
| **RE** (Runtime Error) | Chương trình crash | Kiểm tra truy cập mảng, chia 0 |
| **MLE** (Memory Limit Exceeded) | Hết bộ nhớ | Giảm kích thước mảng |
| **CE** (Compile Error) | Không compile được | Kiểm tra cú pháp |

---

## 2. Debug hiệu quả

### 2.1. Phương pháp "In ra giấy"

```
1. Chạy code với input nhỏ bằng tay
2. Ghi giá trị biến tại mỗi bước
3. So sánh với expected output
4. Tìm bước đầu tiên SAI → đó là bug!
```

### 2.2. Phương pháp "Binary Search bug"

```
Nếu code dài, không biết bug ở đâu:

1. Comment nửa sau code
2. Chạy với test nhỏ
3. Nếu đúng → bug ở nửa sau
4. Nếu sai → bug ở nửa trước
5. Lặp lại cho đến khi tìm ra
```

### 2.3. Debug macro

=== "C++"

    ```cpp
    // ===== Debug macro =====
    #define debug(x) cerr << #x << " = " << (x) << endl;
    #define debugv(v) { cerr << #v << " = [ "; for (auto x : v) cerr << x << " "; cerr << "]\n"; }
    #define debug2d(m) { cerr << #m << ":\n"; for (auto& row : m) { for (auto x : row) cerr << x << " "; cerr << endl; } }
    
    // Cách dùng:
    int n = 5;
    debug(n);           // In: n = 5
    
    vector<int> a = {1, 2, 3};
    debugv(a);          // In: a = [ 1 2 3 ]
    
    vector<vector<int>> mat = {{1, 2}, {3, 4}};
    debug2d(mat);       // In: mat: 1 2 \n 3 4
    ```

=== "Python"

    ```python
    # In biến
    print(f"n = {n}")
    print(f"arr = {arr}")
    print(f"result = {result}")
    
    # In mảng 2 chiều
    for i, row in enumerate(matrix):
        print(f"row[{i}] = {row}")
    
    # Dừng tại breakpoint
    import pdb; pdb.set_trace()  # Debugger interactive
    ```

---

## 3. Fix TLE (Time Limit Exceeded)

### 3.1. Nguyên nhân phổ biến

```
1. Độ phức tạp quá cao: O(N²) với N = 10^5 → 10^10 phép tính → TLE!
2. I/O chậm: cout endl nhiều lần
3. Đệ quy sâu: stack overflow
4. Sử dụng cấu trúc dữ liệu sai: set/map khi có thể dùng unordered_
```

### 3.2. Cách fix

```cpp
// FIX 1: Tối ưu I/O
ios::sync_with_stdio(false);
cin.tie(nullptr);
cout << result << "\n";  // Thay endl bằng "\n"

// FIX 2: Dùng unordered_map thay vì map
unordered_map<int, int> mp;  // O(1) thay vì O(log N)

// FIX 3: Dùng scanf/printf thay vì cin/cout
scanf("%d", &n);
printf("%d\n", result);

// FIX 4: Tối ưu thuật toán
// Thay O(N²) bằng O(N log N) hoặc O(N)
```

### 3.3. Kiểm tra độ phức tạp trước khi code

```
N = 10^5, O(N²) = 10^10 → TLE (giới hạn ~10^8 phép tính/giây)
N = 10^5, O(N log N) ≈ 10^6 → OK
N = 10^6, O(N) = 10^6 → OK
```

---

## 4. Fix RE (Runtime Error)

### 4.1. Nguyên nhân phổ biến

```
1. Truy cập mảng ngoài giới hạn: a[-1], a[n]
2. Chia cho 0
3. Stack overflow (đệ quy quá sâu)
4. Dereference null pointer
5. Pop từ stack/queue rỗng
```

### 4.2. Cách fix

```cpp
// FIX 1: Kiểm tra giới hạn mảng
if (i >= 0 && i < n) {
    // Truy cập a[i]
}

// FIX 2: Kiểm tra chia 0
if (b != 0) {
    result = a / b;
}

// FIX 3: Tăng stack size (Windows)
// Compile với flag: -Wl,--stack,268435456
// Hoặc viết lại bằng iterative

// FIX 4: Kiểm tra trước khi pop
if (!st.empty()) st.pop();

// FIX 5: Khởi tạo mảng đúng kích thước
vector<int> a(n + 1);  // Thay vì a[n] (có thể tràn stack)
```

---

## 5. Fix WA (Wrong Answer)

### 5.1. Các lỗi WA phổ biến

```
1. Off-by-one: sai chỉ số 1
2. Quên modulo
3. Quên xử lý edge case
4. Đọc sai đề
5. In sai format (thừa/thiếu khoảng trắng)
```

### 5.2. Off-by-one (sai chỉ số)

```cpp
// LỖI THƯỜNG GẶP NHẤT!

// SAI: Mảng 0-indexed nhưng dùng 1-indexed
for (int i = 1; i <= n; i++) cin >> a[i];  // a[0] bỏ qua!

// SAI: Quên i < n vs i <= n
for (int i = 0; i <= n; i++)  // Thừa 1 phần tử!

// ĐÚNG: Nhất quán
for (int i = 0; i < n; i++) cin >> a[i];  // 0-indexed
// hoặc
for (int i = 1; i <= n; i++) cin >> a[i];  // 1-indexed
```

### 5.3. Quên modulo

```cpp
// SAI: Kết quả có thể rất lớn → tràn!
long long result = a * b;

// ĐÚNG: Luôn modulo khi đề yêu cầu
long long result = (a * b) % MOD;

// SAI: (a - b) % MOD có thể âm
long long diff = (a - b) % MOD;

// ĐÚNG: + MOD trước khi %
long long diff = ((a - b) % MOD + MOD) % MOD;
```

### 5.4. Đọc sai đề

```
Đây là lỗi NGUY HIỂM NHẤT! Mất thời gian code sai bài.

Cách phòng tránh:
1. Đọc đề 2 lần trước khi code
2. Chạy sample test NGAY sau khi code
3. Kiểm tra input/output format kỹ
```

---

## 6. Mẹo thi đấu

### 6.1. Mẹo I/O nhanh

```cpp
// C++: Fast I/O
ios::sync_with_stdio(false);
cin.tie(nullptr);

// C++: Đọc nhiều số trên 1 dòng
int a, b, c;
cin >> a >> b >> c;

// C++: Đọc cả dòng
string line;
getline(cin, line);

// Python: Fast I/O
import sys
input = sys.stdin.readline
```

### 6.2. Mẹo code ngắn

=== "C++"

    ```cpp
    // Shortcuts
    #define ll long long
    #define pb push_back
    #define all(x) (x).begin(), (x).end()
    
    // One-liner
    sort(all(v));
    int n = v.size();
    auto it = lower_bound(all(v), x);
    ```

=== "Python"

    ```python
    # Python one-liners
    sorted_arr = sorted(arr)
    n = len(arr)
    idx = bisect_left(arr, x)
    ```

### 6.3. Mẹo xử lý modulo

```cpp
const ll MOD = 1e9 + 7;

// Cộng modulo
ll add(ll a, ll b) { return (a + b) % MOD; }

// Trừ modulo (KHÔNG BAO GIỜ âm)
ll sub(ll a, ll b) { return ((a - b) % MOD + MOD) % MOD; }

// Nhân modulo (tránh tràn)
ll mul(ll a, ll b) { return (__int128)a * b % MOD; }

// Lũy thừa modulo
ll power(ll a, ll b) {
    ll res = 1;
    while (b > 0) {
        if (b & 1) res = mul(res, a);
        a = mul(a, a);
        b >>= 1;
    }
    return res;
}

// Nghịch đảo modulo (Fermat)
ll inv(ll a) { return power(a, MOD - 2); }

// Chia modulo
ll div(ll a, ll b) { return mul(a, inv(b)); }
```

### 6.4. Mẹo debug nhanh

```
1. Nếu WA → chạy sample test NGAY
2. Nếu TLE → kiểm tra độ phức tạp trước
3. Nếu RE → kiểm tra truy cập mảng
4. Nếu không biết lỗi gì → viết lại code (thường nhanh hơn fix)
```

---

## 7. Checklist trước khi nộp bài

```
□ Đọc lại đề 1 lần nữa (đúng bài?)
□ Chạy sample test (output giống hệt?)
□ Kiểm tra edge cases (N=0, N=1, all same)
□ Kiểm tra modulo (đúng MOD? Không âm?)
□ Kiểm tra I/O format (khoảng trắng? Xuống dòng?)
□ Xóa debug macro/in?
□ Tắt freopen? (nếu nộp online)
□ Kiểm tra độ phức tạp? (không TLE?)
```

---

## 8. Bảng tra cứu nhanh

### Độ phức tạp vs Giới hạn N

| Độ phức tạp | N tối đa (1 giây) | N tối đa (2 giây) |
|-------------|-------------------|-------------------|
| O(log N) | 10^18 | 10^18 |
| O(N) | 10^8 | 2×10^8 |
| O(N log N) | 10^6 | 2×10^6 |
| O(N²) | 10^4 | 1.5×10^4 |
| O(N³) | 500 | 700 |
| O(2^N) | 25 | 26 |
| O(N!) | 11 | 12 |

### Các hằng số MOD thường dùng

```cpp
const ll MOD1 = 1e9 + 7;    // Nguyên tố, dùng nhiều nhất
const ll MOD2 = 1e9 + 9;    // Dùng cho double hash
const ll MOD3 = 998244353;   // Dùng cho NTT (FFT)
```

---

## 9. Bài tập luyện tập

| Bài | Nền tảng | Mục đích |
|-----|----------|----------|
| [CSES - Weird Algorithm](https://cses.fi/problemset/task/1068) | CSES | Luyện debug |
| [CSES - Repetitions](https://cses.fi/problemset/task/1069) | CSES | Luyện edge case |
| [CSES - Increasing Array](https://cses.fi/problemset/task/1094) | CSES | Luyện I/O |

---

## Tài liệu tham khảo

- [VNOI Wiki - Kỹ năng thi](https://wiki.vnoi.info/algo/skill/Ki-nang-thi-cu)
- [Codeforces - Common Mistakes](https://codeforces.com/blog/entry/67216)
- [USACO Guide - Debugging](https://usaco.guide/general/debugging)

**Bài trước:** [Sinh testcase ←](37-sinh-testcase.md) | **Bài tiếp theo:** [Về trang tổng hợp →](index.md)
