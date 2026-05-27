# C15: Mẹo thi đấu C++ — Template, Macro, Trick

> **Bạn sẽ học được:** Template thi đấu, macro, shortcut, trick hay<br>
> **Yêu cầu:** Đã học C14 (Algorithm nâng cao)<br>
> **Thời gian:** 30 phút

---

## Template thi đấu — Copy-paste là xong

### Template cơ bản

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    return 0;
}
```

### Template đầy đủ

```cpp
#include <bits/stdc++.h>
using namespace std;

// Định nghĩa kiểu dữ liệu
typedef long long ll;
typedef pair<int, int> pii;
typedef vector<int> vi;

// Hằng số
const int MOD = 1e9 + 7;
const int INF = 1e9;
const long long LLINF = 1e18;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    return 0;
}
```

!!! tip "Lưu template vào file"
    Tạo file `template.cpp` trong thư mục thi đấu. Mỗi lần bắt đầu bài mới, chỉ cần copy-paste.

---

## Macro — Viết ngắn hơn

### Các macro thường dùng

```cpp
// Rút gọn kiểu dữ liệu
#define ll long long
#define pii pair<int, int>
#define vi vector<int>
#define vll vector<long long>

// Rút gọn hàm
#define pb push_back
#define mp make_pair
#define fi first
#define se second

// Rút gọn vòng lặp
#define FOR(i, a, b) for (int i = (a); i <= (b); i++)
#define FORD(i, a, b) for (int i = (a); i >= (b); i--)
#define REP(i, n) FOR(i, 0, (n) - 1)

// Debug
#define dbg(x) cerr << #x << " = " << x << endl
```

### Sử dụng macro

```cpp
// Thay vì viết:
vector<pair<int, int>> v;
v.push_back(make_pair(1, 2));
cout << v[0].first << endl;

// Viết ngắn hơn:
vi v;
v.pb(mp(1, 2));
cout << v[0].fi << endl;
```

!!! warning "Cẩn thận với macro"
    - Macro chỉ là **thay thế text**, không phải hàm
    - Có thể gây lỗi không ngờ
    - Chỉ dùng trong thi đấu, không dùng trong code production

---

## Trick hay trong thi đấu

### Trick 1: Đọc n số nguyên nhanh

```cpp
// Cách thường
int n;
cin >> n;
vector<int> a(n);
for (int i = 0; i < n; i++) cin >> a[i];

// Cách ngắn hơn
int n;
cin >> n;
vector<int> a(n);
for (auto &x : a) cin >> x;
```

### Trick 2: In mảng nhanh

```cpp
// Cách thường
for (int i = 0; i < n; i++) cout << a[i] << " ";

// Cách ngắn hơn
for (int x : a) cout << x << " ";
```

### Trick 3: Tính tổng nhanh

```cpp
// Cách thường
long long sum = 0;
for (int x : a) sum += x;

// Cách ngắn hơn
long long sum = accumulate(a.begin(), a.end(), 0LL);
```

### Trick 4: Tìm min/max nhanh

```cpp
// Cách thường
int minVal = a[0];
for (int x : a) minVal = min(minVal, x);

// Cách ngắn hơn
int minVal = *min_element(a.begin(), a.end());
```

### Trick 5: Đảo ngược mảng

```cpp
reverse(a.begin(), a.end());
```

### Trick 6: Sắp xếp giảm dần

```cpp
sort(a.begin(), a.end(), greater<int>());
```

### Trick 7: Kiểm tra số nguyên tố nhanh

```cpp
bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}
```

### Trick 8: Tính GCD nhanh

```cpp
// Dùng hàm có sẵn (C++17: std::gcd trong <numeric>)
int g = gcd(a, b);  // cần #include <numeric> và using namespace std;

// Hoặc dùng __gcd (GCC extension, không chuẩn C++)
// int g = __gcd(a, b);

// Hoặc tự viết
int gcd(int a, int b) {
    while (b) { int r = a % b; a = b; b = r; }
    return a;
}
```

---

## Xử lý lỗi thường gặp

### Lỗi 1: Tràn số

```cpp
// ❌ SAI
int sum = 0;
for (int i = 0; i < n; i++) sum += a[i];

// ✅ ĐÚNG
long long sum = 0;
for (int i = 0; i < n; i++) sum += a[i];
```

### Lỗi 2: Quên modulo

```cpp
// ❌ SAI
int result = (a * b) % MOD;

// ✅ ĐÚNG (tránh tràn)
long long result = (1LL * a * b) % MOD;
```

### Lỗi 3: Nhầm `=` và `==`

```cpp
// ❌ SAI
if (x = 5) { ... }

// ✅ ĐÚNG
if (x == 5) { ... }
```

---

## Cheat sheet — Bảng tra cứu nhanh

### Nhập/xuất

```cpp
// Nhập
cin >> a >> b;
getline(cin, s);

// Xuất
cout << a << " " << b << endl;
printf("%d %d\n", a, b);
```

### Vector

```cpp
vector<int> a(n);
a.push_back(x);
a.pop_back();
a.size();
sort(a.begin(), a.end());
reverse(a.begin(), a.end());
```

### String

```cpp
string s;
s.length();
s.substr(pos, len);
s.find(sub);
getline(cin, s);
```

### Set/Map

```cpp
set<int> s;
s.insert(x);
s.count(x);
s.erase(x);

map<string, int> m;
m[key] = value;
m.count(key);
```

### Algorithm

```cpp
sort(a.begin(), a.end());
reverse(a.begin(), a.end());
unique(a.begin(), a.end());
lower_bound(a.begin(), a.end(), x);
upper_bound(a.begin(), a.end(), x);
binary_search(a.begin(), a.end(), x);
next_permutation(a.begin(), a.end());
```

---

## Bài tập thực hành

### Bài 1: Template
Tạo file `template.cpp` với template thi đấu đầy đủ. Dùng template để đọc $n$ số nguyên và in tổng.

<div class="cp-pg" data-language="cpp" data-starter="#include &lt;bits/stdc++.h&gt;\nusing namespace std;\n\ntypedef long long ll;\n#define REP(i, n) for (int i = 0; i &lt; (n); i++)\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    // Viết code ở đây\n    \n    return 0;\n}" data-input="5
1 2 3 4 5" data-expected="15" data-hint="Dùng REP(i, n) để đọc và cộng dồn"></div>

???? tip "Lời giải"
    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    
    typedef long long ll;
    #define REP(i, n) for (int i = 0; i < (n); i++)
    
    int main() {
        ios_base::sync_with_stdio(false);
        cin.tie(NULL);
        
        int n;
        cin >> n;
        ll sum = 0;
        int x;
        REP(i, n) {
            cin >> x;
            sum += x;
        }
        cout << sum << endl;
        return 0;
    }
    ```

### Bài 2: Viết ngắn gọn
Viết lại đoạn code sau bằng macro:

```cpp
vector<pair<int, int>> v;
v.push_back(make_pair(1, 2));
v.push_back(make_pair(3, 4));
for (int i = 0; i < v.size(); i++) {
    cout << v[i].first << " " << v[i].second << endl;
}
```

<div class="cp-pg" data-language="cpp" data-starter="#include &lt;bits/stdc++.h&gt;\nusing namespace std;\n\n#define pb push_back\n#define fi first\n#define se second\n#define pii pair&lt;int, int&gt;\n\nint main() {\n    // Viết code ở đây\n    return 0;\n}" data-input="" data-expected="1 2
3 4" data-hint="Dùng pb, fi, se, structured binding"></div>

???? tip "Lời giải"
    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    
    #define pb push_back
    #define fi first
    #define se second
    #define pii pair<int, int>
    
    int main() {
        vector<pii> v;
        v.pb({1, 2});
        v.pb({3, 4});
        for (auto &[x, y] : v) {
            cout << x << " " << y << endl;
        }
        return 0;
    }
    ```

---

## Tóm tắt bài học

| Nội dung | Chi tiết |
|----------|----------|
| **Template** | `#include <bits/stdc++.h>` + `ios_base::sync_with_stdio(false)` |
| **Macro** | `#define ll long long`, `#define pb push_back` |
| **Trick** | `for (auto &x : a) cin >> x;` |
| **Cheat sheet** | Bảng tra cứu nhanh |

---

## Bài viết liên quan

- [C14: Algorithm nâng cao ←](C14-algorithm-nang-cao.md)
- [C16: Bài tập tổng hợp →](C16-bai-tap-tong-hop.md)

---

**Bài tiếp theo:** [C16: Bài tập tổng hợp →](C16-bai-tap-tong-hop.md)
