# C15: Mẹo thi đấu C++

> **Tác giả:** FPTOJ Wiki<br>
> **Chủ đề:** Template, macro, trick, cheat sheet Python ↔ C++

---

## Bạn sẽ học được gì?

Sau bài này, bạn có thể:

- Viết template thi đấu đầy đủ
- Sử dụng macro để code nhanh hơn
- Tra cứu nhanh cú pháp Python ↔ C++

---

## 1. Template thi đấu đầy đủ

```cpp
#include <bits/stdc++.h>
using namespace std;

// ===== TYPES =====
typedef long long ll;
typedef unsigned long long ull;
typedef pair<int,int> pii;
typedef pair<ll,ll> pll;
typedef vector<int> vi;
typedef vector<ll> vll;
typedef vector<pii> vpii;

// ===== MACROS =====
#define FOR(i, a, b) for (int i = (a); i <= (b); i++)
#define REP(i, n) FOR(i, 0, (n) - 1)
#define FORD(i, a, b) for (int i = (a); i >= (b); i--)
#define all(v) (v).begin(), (v).end()
#define sz(v) (int)(v).size()
#define pb push_back
#define fi first
#define se second
#define endl '\n'

// ===== CONSTANTS =====
const int INF = 1e9 + 7;
const ll LINF = 1e18;
const int MOD = 1e9 + 7;
const int MAXN = 1e6 + 5;

// ===== MAIN =====
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    // Code của bạn ở đây
    
    return 0;
}
```

---

## 2. Macro thường dùng

```cpp
// Vòng lặp
#define REP(i, n) for (int i = 0; i < (n); i++)
#define FOR(i, a, b) for (int i = (a); i <= (b); i++)
#define FORD(i, a, b) for (int i = (a); i >= (b); i--)

// Vector
#define all(v) (v).begin(), (v).end()
#define sz(v) (int)(v).size()
#define pb push_back

// Pair
#define fi first
#define se second

// Debug (chỉ dùng khi debug, xóa khi nộp bài)
#define dbg(x) cerr << #x << " = " << (x) << endl
```

---

## 3. Trick thường dùng

### Đọc nhanh nhiều số

```cpp
// Thay vì:
for (int i = 0; i < n; i++) cin >> a[i];

// Viết:
REP(i, n) cin >> a[i];
```

### In mảng nhanh

```cpp
// Thay vì:
for (int i = 0; i < n; i++) {
    if (i > 0) cout << " ";
    cout << a[i];
}
cout << endl;

// Viết:
REP(i, n) cout << a[i] << " \n"[i == n-1];
```

### Đổi dấu để dùng min-heap

```cpp
// Thay vì tạo min-heap:
priority_queue<int, vector<int>, greater<int>> pq;

// Đơn giản hơn: đổi dấu
priority_queue<int> pq;
pq.push(-x);
int val = -pq.top();
```

### memset với -1 và 0

```cpp
int a[MAXN];
memset(a, 0, sizeof(a));   // Gán tất cả = 0
memset(a, -1, sizeof(a));  // Gán tất cả = -1
memset(a, 0x3f, sizeof(a)); // Gán tất cả = giá trị lớn (~10^9)
```

---

## 4. Cheat Sheet: Python ↔ C++

| Python | C++ |
|--------|-----|
| `print(x)` | `cout << x << endl` |
| `x = int(input())` | `cin >> x` |
| `a, b = map(int, input().split())` | `cin >> a >> b` |
| `list(range(n))` | `vector<int>(n)` |
| `a.append(x)` | `a.push_back(x)` |
| `a.pop()` | `a.pop_back()` |
| `len(a)` | `a.size()` |
| `a.sort()` | `sort(all(a))` |
| `sorted(a)` | `sort(all(a))` |
| `a[::-1]` | `reverse(all(a))` |
| `max(a)` | `*max_element(all(a))` |
| `min(a)` | `*min_element(all(a))` |
| `sum(a)` | `accumulate(all(a), 0LL)` |
| `set()` | `set<int>` |
| `dict()` | `map<string, int>` |
| `collections.Counter` | `map<int, int>` + loop |
| `collections.deque` | `deque<int>` |
| `heapq` | `priority_queue<int, vector<int>, greater<>>` |
| `itertools.permutations` | `next_permutation(all(a))` |
| `bisect_left` | `lower_bound(all(a), x)` |
| `bisect_right` | `upper_bound(all(a), x)` |
| `x ** n` | `pow(x, n)` hoặc lũy thừa nhanh |
| `math.gcd(a, b)` | `__gcd(a, b)` |
| `float('inf')` | `1e18` hoặc `LLONG_MAX` |
| `x // y` | `x / y` (chia nguyên) |
| `x % y` | `x % y` |

---

## 5. Các hằng số thường dùng

```cpp
const int INF = 1e9 + 7;      // Vô cực cho int
const ll LINF = 1e18;          // Vô cực cho long long
const int MOD = 1e9 + 7;      // Modulo thường dùng
const double PI = acos(-1.0);  // Số Pi
const double EPS = 1e-9;       // Sai số cho số thực
```

---

## Bài viết liên quan

- [C14: algorithm nâng cao →](C14-algorithm-nang-cao.md)
- [C16: Bài tập tổng hợp →](C16-bai-tap-tong-hop.md)

---

**Bài tiếp theo:** [C16: Bài tập tổng hợp →](C16-bai-tap-tong-hop.md)
