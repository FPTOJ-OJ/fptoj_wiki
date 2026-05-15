# C15: Mẹo thi đấu C++

> **Tác giả:** Hà Trí Kiên<br>
> **Chủ đề:** Template, trick, macro, cheat sheet

---

## 1. Tổng quan

Tổng hợp các **mẹo, trick, template** cho thi đấu C++.

---

## 2. Template thi đấu đầy đủ

```cpp
#include <bits/stdc++.h>
using namespace std;

// ===== TYPEDEF =====
typedef long long ll;
typedef pair<int, int> pii;
typedef pair<ll, ll> pll;
typedef vector<int> vi;
typedef vector<ll> vll;
typedef vector<vector<int>> vvi;
typedef vector<pair<int, int>> vpii;

// ===== MACRO =====
#define FOR(i, a, b) for (int i = (a); i < (b); i++)
#define REP(i, n) FOR(i, 0, n)
#define ROF(i, a, b) for (int i = (b) - 1; i >= (a); i--)
#define all(x) (x).begin(), (x).end()
#define sz(x) (int)(x).size()
#define pb push_back
#define mp make_pair
#define fi first
#define se second

// ===== CONSTANTS =====
const int INF = 1e9 + 7;
const ll LINF = 1e18;
const int MOD = 1e9 + 7;
const int MAXN = 1e5 + 5;

// ===== SOLVE =====
void solve() {
    // Code của bạn ở đây
}

// ===== MAIN =====
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int t = 1;
    // cin >> t;
    while (t--) {
        solve();
    }
    return 0;
}
```

---

## 3. Typedef thường dùng

```cpp
typedef long long ll;
typedef pair<int, int> pii;
typedef pair<ll, ll> pll;
typedef vector<int> vi;
typedef vector<ll> vll;
typedef vector<vector<int>> vvi;
typedef vector<pair<int, int>> vpii;
typedef vector<pair<ll, ll>> vpll;
```

---

## 4. Macro thường dùng

```cpp
// Vòng lặp
#define FOR(i, a, b) for (int i = (a); i < (b); i++)
#define REP(i, n) FOR(i, 0, n)
#define ROF(i, a, b) for (int i = (b) - 1; i >= (a); i--)
#define EACH(x, a) for (auto& x : a)

// Thao tác
#define all(x) (x).begin(), (x).end()
#define sz(x) (int)(x).size()
#define pb push_back
#define mp make_pair
#define fi first
#define se second

// Debug
#define debug(x) cerr << #x << " = " << x << endl
#define debugv(v) cerr << #v << " = "; for (auto x : v) cerr << x << " "; cerr << endl
```

!!! warning "Macro có thể gây lỗi"
    ```cpp
    // SAI
    #define SQUARE(x) x * x
    cout << SQUARE(3 + 1);  // 3 + 1 * 3 + 1 = 7
    
    // ĐÚNG
    #define SQUARE(x) ((x) * (x))
    cout << SQUARE(3 + 1);  // ((3 + 1) * (3 + 1)) = 16
    ```

---

## 5. Trick thi đấu

### 5.1. Đọc input nhanh

```cpp
// Cách 1: cin với fast I/O
ios_base::sync_with_stdio(false);
cin.tie(NULL);

// Cách 2: getchar
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
```

### 5.2. In output nhanh

```cpp
// Cách 1: cout với "\n"
cout << result << "\n";

// Cách 2: putchar
inline void writeInt(int x) {
    if (x < 0) {
        putchar('-');
        x = -x;
    }
    if (x > 9) writeInt(x / 10);
    putchar(x % 10 + '0');
}
```

### 5.3. Đọc nhiều testcase

```cpp
void solve() {
    // Code của bạn ở đây
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

### 5.4. Đọc mảng

```cpp
int n;
cin >> n;
vi arr(n);
for (int i = 0; i < n; i++) cin >> arr[i];

// Hoặc dùng REP
REP(i, n) cin >> arr[i];
```

### 5.5. Đọc matrix

```cpp
int n, m;
cin >> n >> m;
vvi matrix(n, vi(m));
REP(i, n) REP(j, m) cin >> matrix[i][j];
```

### 5.6. Đọc đồ thị

```cpp
int n, m;
cin >> n >> m;
vvi graph(n);
REP(i, m) {
    int u, v;
    cin >> u >> v;
    u--; v--;  // Nếu đỉnh đánh số từ 1
    graph[u].pb(v);
    graph[v].pb(u);  // Đồ thị vô hướng
}
```

---

## 6. Các hàm tiện ích

### 6.1. GCD, LCM

```cpp
ll gcd(ll a, ll b) {
    while (b) {
        a %= b;
        swap(a, b);
    }
    return a;
}

ll lcm(ll a, ll b) {
    return a / gcd(a, b) * b;
}
```

### 6.2. Lũy thừa nhanh

```cpp
ll power(ll base, ll exp, ll mod) {
    ll result = 1;
    base %= mod;
    while (exp > 0) {
        if (exp & 1) result = result * base % mod;
        exp >>= 1;
        base = base * base % mod;
    }
    return result;
}
```

### 6.3. Kiểm tra số nguyên tố

```cpp
bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}
```

### 6.4. Sàng nguyên tố

```cpp
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

## 7. Cheat sheet

```cpp
// ===== IMPORT =====
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
#define pb push_back
#define fi first
#define se second

// ===== CONSTANTS =====
const int INF = 1e9 + 7;
const ll LINF = 1e18;
const int MOD = 1e9 + 7;

// ===== INPUT =====
ios_base::sync_with_stdio(false);
cin.tie(NULL);

// ===== VECTOR =====
vi arr(n);
vvi matrix(n, vi(m));

// ===== SORT =====
sort(all(arr));
sort(all(arr), greater<int>());

// ===== SET/MAP =====
set<int> s;
map<int, int> m;
unordered_set<int> us;
unordered_map<int, int> um;

// ===== QUEUE/STACK =====
queue<int> q;
stack<int> st;
priority_queue<int> pq;  // max-heap
priority_queue<int, vi, greater<int>> pq;  // min-heap
deque<int> dq;

// ===== ALGORITHM =====
lower_bound(all(arr), x)
upper_bound(all(arr), x)
binary_search(all(arr), x)
__gcd(a, b)
```

---

## 8. So sánh Python vs C++

| Python | C++ | Ghi chú |
|--------|-----|---------|
| `input()` | `cin >> x` | C++ nhanh hơn |
| `print(x)` | `cout << x` | C++ nhanh hơn |
| `arr = [0] * n` | `vi arr(n)` | |
| `arr.sort()` | `sort(all(arr))` | |
| `set()` | `unordered_set<int>` | |
| `dict()` | `unordered_map<int, int>` | |
| `heapq` | `priority_queue` | C++ là max-heap |
| `deque()` | `deque<int>` | |
| `math.gcd(a, b)` | `__gcd(a, b)` | |
| `pow(a, b, m)` | `power(a, b, m)` | Phải tự cài |
| `bisect_left(arr, x)` | `lower_bound(all(arr), x)` | |
| `for x in arr:` | `for (int x : arr)` | |
| `for i in range(n):` | `REP(i, n)` | |

---

## 9. Lưu ý / Cạm bẫy hay gặp

### Bẫy 1: Tràn số

```cpp
// SAI
int a = 1e9, b = 1e9;
int c = a * b;  // Tràn số!

// ĐÚNG
ll c = (ll)a * b;
```

### Bẫy 2: Chia nguyên

```cpp
// SAI
double c = 5 / 2;  // c = 2.0

// ĐÚNG
double c = (double)5 / 2;  // c = 2.5
double c = 5.0 / 2;        // c = 2.5
```

### Bẫy 3: So sánh số thực

```cpp
// SAI
double a = 0.1 + 0.2;
if (a == 0.3) { ... }  // Có thể sai!

// ĐÚNG
if (abs(a - 0.3) < 1e-9) { ... }
```

### Bẫy 4: Quên long long

```cpp
// SAI
int n = 1e9;
int sum = n * (n + 1) / 2;  // Tràn số!

// ĐÚNG
ll n = 1e9;
ll sum = n * (n + 1) / 2;
```

---

## 10. Bài tập thực hành

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
    
    #define FOR(i, a, b) for (int i = (a); i < (b); i++)
    #define REP(i, n) FOR(i, 0, n)
    #define all(x) (x).begin(), (x).end()
    #define pb push_back
    #define fi first
    #define se second
    
    void solve() {
        int n;
        cin >> n;
        vi arr(n);
        REP(i, n) cin >> arr[i];
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

## 11. Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Weird Algorithm](https://cses.fi/problemset/task/1068) | CSES | ⭐ | Template cơ bản |

---

## Bài viết liên quan

- [← C14: algorithm nâng cao](C14-algorithm-nang-cao.md)
- [Chương 2: C++ cho Thi Đấu](index.md)

---

**Bài trước:** [C14: algorithm nâng cao](C14-algorithm-nang-cao.md)<br>
**Quay lại:** [Chương 2: C++ cho Thi Đấu](index.md)
