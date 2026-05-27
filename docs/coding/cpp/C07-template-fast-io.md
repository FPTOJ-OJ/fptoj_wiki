# C07: Template & Fast I/O

> **Tác giả:** FPTOJ Wiki<br>
> **Chủ đề:** Template thi đấu, typedef, macro, tối ưu nhập/xuất

---

## Bạn sẽ học được gì?

Sau bài này, bạn có thể:

- Viết template thi đấu chuyên nghiệp
- Dùng `typedef` và `#define` để code nhanh hơn
- Tối ưu tốc độ nhập/xuất

---

## 1. Template thi đấu

```cpp
#include <bits/stdc++.h>
using namespace std;

// ===== TEMPLATE =====
typedef long long ll;
typedef pair<int,int> pii;
typedef pair<ll,ll> pll;

#define FOR(i, a, b) for (int i = (a); i <= (b); i++)
#define REP(i, n) FOR(i, 0, (n) - 1)
#define all(v) (v).begin(), (v).end()
#define sz(v) (int)(v).size()
#define pb push_back
#define fi first
#define se second

const int INF = 2e9;
const ll LINF = 1e18;
const int MOD = 1e9 + 7;
// ===== END TEMPLATE =====

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    return 0;
}
```

---

## 2. typedef — Đặt tên kiểu ngắn

```cpp
typedef long long ll;
typedef pair<int,int> pii;
typedef vector<int> vi;
typedef vector<vector<int>> vvi;

// Bây giờ có thể viết ngắn hơn:
ll n = 1e18;           // Thay vì long long n = 1e18;
pii p = {1, 2};        // Thay vì pair<int,int> p = {1, 2};
vi a = {1, 2, 3};      // Thay vì vector<int> a = {1, 2, 3};
```

---

## 3. Macro — Tự động thay thế

### Macro viết tắt

```cpp
#define FOR(i, a, b) for (int i = (a); i <= (b); i++)
#define REP(i, n) FOR(i, 0, (n) - 1)
#define all(v) (v).begin(), (v).end()
#define sz(v) (int)(v).size()
#define pb push_back
#define fi first
#define se second
```

### Sử dụng macro

```cpp
// Thay vì:
for (int i = 0; i < n; i++) { ... }

// Viết:
REP(i, n) { ... }

// Thay vì:
sort(a.begin(), a.end());

// Viết:
sort(all(a));

// Thay vì:
a.push_back(10);

// Viết:
a.pb(10);
```

---

## 4. Fast I/O — Tối ưu nhập/xuất

### Tại sao cần Fast I/O?

| Phương thức | Tốc độ | Dùng khi |
|-------------|--------|----------|
| `cin`/`cout` (bật sync) | Chậm | Debug |
| `cin`/`cout` (tắt sync) | **Nhanh** | Thi đấu |
| `scanf`/`printf` | **Nhanh** | Thi đấu |
| `getchar`/`putchar` | **Rất nhanh** | Cần tốc độ tối đa |

### Tắt sync (Luôn dùng trong thi đấu)

```cpp
ios_base::sync_with_stdio(false);
cin.tie(NULL);
// cout.tie(NULL);  // Không cần thiết — cout không tied đến input stream nào
```

!!! warning "Lưu ý khi tắt sync"
    - **Không** dùng chung `cin`/`cout` với `scanf`/`printf`
    - **Không** dùng `puts`/`gets` với `cout`/`cin`

### Fast Input với getchar

```cpp
// Đọc số nguyên nhanh
int readInt() {
    int x = 0, sign = 1;
    char c = getchar();
    while (c < '0' || c > '9') {
        if (c == '-') sign = -1;
        c = getchar();
    }
    while (c >= '0' && c <= '9') {
        x = x * 10 + (c - '0');
        c = getchar();
    }
    return x * sign;
}
```

### Fast Output với putchar

```cpp
// In số nguyên nhanh
void writeInt(long long x) {
    if (x < 0) { putchar('-'); x = -x; }
    if (x > 9) writeInt(x / 10);
    putchar(x % 10 + '0');
}
```

---

## 5. Khi nào dùng gì?

| Tình huống | Nên dùng |
|------------|----------|
| Thi đấu bình thường | `cin`/`cout` + tắt sync |
| Input rất lớn (>10^6 số) | `scanf`/`printf` hoặc `getchar` |
| Output rất lớn | `printf` hoặc `putchar` |
| Debug | `cin`/`cout` (bật sync) |

---

## Bài viết liên quan

- [C06: Hàm trong C++ →](C06-ham.md)
- [C08: Reference & Pointer →](C08-reference-pointer.md)

---

**Bài tiếp theo:** [C08: Reference & Pointer →](C08-reference-pointer.md)
