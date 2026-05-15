# C07: Template & Fast I/O

> **Tác giả:** Hà Trí Kiên<br>
> **Chủ đề:** Template thi đấu, tối ưu nhập/xuất

---

## 1. Tổng quan

Template thi đấu giúp **tiết kiệm thời gian** gõ code và **tối ưu tốc độ** chạy.

---

## 2. Template thi đấu cơ bản

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

### Giải thích

| Dòng | Tác dụng |
|------|----------|
| `#include <bits/stdc++.h>` | Include TẤT CẢ thư viện chuẩn |
| `using namespace std;` | Không cần ghi `std::` |
| `ios_base::sync_with_stdio(false)` | Tắt đồng bộ C/C++ I/O → nhanh hơn |
| `cin.tie(NULL)` | Tách cin và cout → nhanh hơn |

---

## 3. Template thi đấu đầy đủ

```cpp
#include <bits/stdc++.h>
using namespace std;

// ===== TYPEDEF =====
typedef long long ll;
typedef pair<int, int> pii;
typedef vector<int> vi;
typedef vector<vector<int>> vvi;

// ===== MACRO =====
#define FOR(i, a, b) for (int i = (a); i < (b); i++)
#define REP(i, n) FOR(i, 0, n)
#define all(x) (x).begin(), (x).end()
#define sz(x) (int)(x).size()

// ===== CONSTANTS =====
const int INF = 1e9 + 7;
const ll LINF = 1e18;
const int MOD = 1e9 + 7;

// ===== SOLVE =====
void solve() {
    // Code của bạn ở đây
}

// ===== MAIN =====
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int t = 1;
    // cin >> t;  // Bỏ comment nếu có nhiều testcase
    while (t--) {
        solve();
    }
    return 0;
}
```

---

## 4. Fast I/O

### 4.1. Tắt đồng bộ

```cpp
// Bắt buộc phải có ở đầu main()
ios_base::sync_with_stdio(false);
cin.tie(NULL);
```

!!! warning "Lưu ý"
    - Sau khi tắt đồng bộ, **KHÔNG** trộn `cin/cout` với `scanf/printf`
    - Phải đặt **trước** mọi lệnh `cin/cout`

### 4.2. Dùng "\n" thay vì endl

```cpp
// CHẬM
cout << result << endl;  // endl = "\n" + flush

// NHANH
cout << result << "\n";  // Chỉ xuống dòng
```

### 4.3. Đọc input nhanh nhất

```cpp
// Cách 1: Dùng cin (đủ nhanh cho hầu hết bài)
int n;
cin >> n;

// Cách 2: Dùng getchar (nhanh hơn)
inline int readInt() {
    int x = 0;
    char c = getchar();
    while (c < '0' || c > '9') c = getchar();
    while (c >= '0' && c <= '9') {
        x = x * 10 + (c - '0');
        c = getchar();
    }
    return x;
}

// Cách 3: Dùng fread (nhanh nhất)
namespace fastio {
    char buf[1 << 21], *p1 = buf, *p2 = buf;
    inline char gc() {
        if (p1 == p2) {
            p1 = buf;
            p2 = buf + fread(buf, 1, 1 << 21, stdin);
        }
        return p1 == p2 ? EOF : *p1++;
    }
    inline int readInt() {
        int x = 0;
        char c = gc();
        while (c < '0' || c > '9') c = gc();
        while (c >= '0' && c <= '9') {
            x = x * 10 + (c - '0');
            c = gc();
        }
        return x;
    }
}
using fastio::readInt;
```

### 4.4. In output nhanh nhất

```cpp
// Cách 1: Dùng cout (đủ nhanh cho hầu hết bài)
cout << result << "\n";

// Cách 2: Dùng putchar (nhanh hơn)
inline void writeInt(int x) {
    if (x < 0) {
        putchar('-');
        x = -x;
    }
    if (x > 9) writeInt(x / 10);
    putchar(x % 10 + '0');
}

// Cách 3: Dùng fwrite (nhanh nhất)
namespace fastout {
    char buf[1 << 21];
    int p = -1;
    inline void flush() {
        fwrite(buf, 1, p + 1, stdout);
        p = -1;
    }
    inline void pc(char c) {
        if (p == (1 << 21) - 1) flush();
        buf[++p] = c;
    }
    inline void writeInt(int x) {
        if (x < 0) {
            pc('-');
            x = -x;
        }
        if (x > 9) writeInt(x / 10);
        pc(x % 10 + '0');
    }
}
```

---

## 5. Macro thường dùng

```cpp
// Macro vòng lặp
#define FOR(i, a, b) for (int i = (a); i < (b); i++)
#define REP(i, n) FOR(i, 0, n)
#define ROF(i, a, b) for (int i = (b) - 1; i >= (a); i--)

// Macro thao tác
#define all(x) (x).begin(), (x).end()
#define sz(x) (int)(x).size()
#define pb push_back
#define mp make_pair

// Macro debug
#define debug(x) cerr << #x << " = " << x << endl
#define debugv(v) cerr << #v << " = "; for (auto x : v) cerr << x << " "; cerr << endl
```

!!! warning "Macro có thể gây lỗi"
    ```cpp
    // SAI: Macro với dấu ngoặc
    #define SQUARE(x) x * x
    cout << SQUARE(3 + 1);  // 3 + 1 * 3 + 1 = 7 (không phải 16!)
    
    // ĐÚNG
    #define SQUARE(x) ((x) * (x))
    cout << SQUARE(3 + 1);  // ((3 + 1) * (3 + 1)) = 16
    ```

---

## 6. Typedef thường dùng

```cpp
typedef long long ll;
typedef pair<int, int> pii;
typedef pair<ll, ll> pll;
typedef vector<int> vi;
typedef vector<ll> vll;
typedef vector<vector<int>> vvi;
typedef vector<pair<int, int>> vpii;
```

---

## 7. So sánh với Python

| Python | C++ | Ghi chú |
|--------|-----|---------|
| `input()` | `cin >> x` | C++ nhanh hơn với fast I/O |
| `print(x)` | `cout << x` | C++ nhanh hơn với "\n" |
| Không cần | `ios_base::sync_with_stdio(false)` | C++ cần tắt đồng bộ |
| Không cần | `#include <bits/stdc++.h>` | C++ cần include |

---

## 8. Bài tập thực hành

### Bài 1: Template thi đấu
Viết template thi đấu C++ đầy đủ.

```cpp
// Code của bạn ở đây
```

??? tip "Lời giải"
    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    
    typedef long long ll;
    typedef pair<int, int> pii;
    typedef vector<int> vi;
    
    const int INF = 1e9 + 7;
    const ll LINF = 1e18;
    const int MOD = 1e9 + 7;
    
    void solve() {
        int n;
        cin >> n;
        vi arr(n);
        for (int i = 0; i < n; i++) cin >> arr[i];
        cout << accumulate(all(arr), 0LL) << "\n";
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

---

## 9. Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Weird Algorithm](https://cses.fi/problemset/task/1068) | CSES | ⭐ | Template cơ bản |

---

## Bài viết liên quan

- [← C06: Hàm](C06-ham.md)
- [C08: Reference & Pointer →](C08-reference-pointer.md)

---

**Bài trước:** [C06: Hàm](C06-ham.md)<br>
**Bài tiếp theo:** [C08: Reference & Pointer →](C08-reference-pointer.md)
