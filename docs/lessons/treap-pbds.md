# Bài 101: Treap & PBDS - Cây Tìm Kiếm Cân Bằng Cho Thi Đấu

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** CP-Algorithms - Treap, Codeforces PBDS Guide

---

## 1. Bản chất vấn đề

`std::set` và `std::map` trong C++ rất tiện nhưng **không hỗ trợ trực tiếp**:

1. Tìm phần tử đứng thứ $k$ (`find_by_order`) hoặc đếm số phần tử nhỏ hơn $x$ (`order_of_key`) trong $O(\log N)$.
2. Chia cắt hoặc ghép nối mảng động, đảo ngược một đoạn $[l, r]$ của dãy trong $O(\log N)$ (như cắt/dán đoạn văn bản).

Để giải quyết, trong lập trình thi đấu có hai công cụ chủ lực:

- **GNU PBDS (`tree` / `gp_hash_table`):** Có sẵn trong trình biên dịch `g++` (GCC), chỉ cần ~5 dòng khai báo là có ngay Order Statistic Tree và Hash Table siêu nhanh.
- **Treap (Tree + Heap) & Implicit Treap:** Tự cài ~50 dòng không dùng phép quay phức tạp (như AVL/Red-Black), hỗ trợ tách mảng (`split`), ghép mảng (`merge`), đảo đoạn (`reverse`) và lazy propagation.

---

## 2. Tư duy cốt lõi

### Phần A: Policy-Based Data Structures (PBDS) trong C++

Thư viện `<ext/pb_ds/assoc_container.hpp>` của GCC cung cấp cấu trúc cây đỏ-đen mở rộng:

- `find_by_order(k)`: trả về iterator trỏ tới phần tử nhỏ thứ $k$ (**0-indexed**).
- `order_of_key(x)`: trả về số phần tử **nhỏ hơn nghiêm ngặt** $x$.
- Ngoài ra `gp_hash_table<Key, Value>` là bảng băm nhanh hơn `unordered_map` từ 2 đến 5 lần (nên dùng kèm custom hash `splitmix64` để tránh anti-hash test).

> **Lưu ý:** PBDS theo ngữ nghĩa `set` (không chứa phần tử trùng). Muốn dùng như `multiset`, hãy lưu cặp `pair<T, int>` với số thứ tự tăng dần duy nhất làm thành phần thứ hai (hoặc dùng `less_equal<T>`, nhưng cẩn thận `lower_bound`/`upper_bound` bị đảo nghĩa và `erase` không dùng trực tiếp được).

### Phần B: Treap (Cây + Heap ngẫu nhiên)

Mỗi nút trong Treap mang **hai giá trị**:

- **`key`** (hoặc vị trí ngầm định trong *Implicit Treap*): tuân theo tính chất **Binary Search Tree (BST)** ($\text{trái} < \text{nút} < \text{phải}$).
- **`prio`** (độ ưu tiên sinh ngẫu nhiên): tuân theo tính chất **Max-Heap** ($\text{prio}[\text{cha}] \ge \text{prio}[\text{con}]$).

Nhờ `prio` ngẫu nhiên, chiều cao kỳ vọng của cây luôn là **$O(\log N)$**. Toàn bộ thao tác trên Treap chỉ dựa vào **2 hàm cơ bản**:

1. **`split(t, key, l, r)`:** Tách cây `t` thành cây `l` (chứa phần tử $\le key$, hoặc $k$ phần tử đầu tiên trong Implicit Treap) và cây `r` (phần còn lại).
2. **`merge(t, l, r)`:** Ghép hai cây `l` và `r` (với mọi khóa ở `l` nhỏ hơn ở `r`) thành một cây `t` duy nhất, nút nào có `prio` lớn hơn sẽ làm gốc.

### Minh họa cắt & đảo đoạn trên Implicit Treap

Giả sử dãy có độ dài $N$, muốn đảo ngược đoạn $[l, r]$:

1. Tách $l-1$ phần tử đầu $\to$ cây `A`, phần còn lại $\to$ cây `BC`.
2. Tách $r - l + 1$ phần tử đầu của `BC` $\to$ cây `B` (chính là đoạn $[l, r]$), phần còn lại $\to$ cây `C`.
3. Gắn cờ lazy `rev ^= 1` lên gốc cây `B`.
4. Ghép lại: `merge(A, B)` rồi `merge(..., C)`. Toàn bộ tốn $O(\log N)$!

---

## 3. Đánh giá độ phức tạp

| Cấu trúc / Thao tác | Thời gian | Không gian | Ghi chú |
| :--- | :---: | :---: | :--- |
| PBDS `ordered_set` (`find_by_order`, `order_of_key`, `insert`, `erase`) | $O(\log N)$ chuẩn | $O(N)$ | Chỉ chạy trên GCC (`g++`), hằng số nhỏ hơn tự viết nhẹ |
| Treap (`split`, `merge`, `insert`, `erase`) | $O(\log N)$ kỳ vọng | $O(N)$ | Chuẩn mọi trình biên dịch C++ / Python |
| Implicit Treap (cắt, dán, đảo đoạn $[l, r]$) | $O(\log N)$ kỳ vọng | $O(N)$ | Cân mọi thao tác mảng động mà Segment Tree không làm được |

---

## Code minh họa

### 1. PBDS `ordered_set` & `gp_hash_table` (C++)

```cpp
#include <bits/stdc++.h>
#include <ext/pb_ds/assoc_container.hpp>
#include <ext/pb_ds/tree_policy.hpp>
using namespace std;
using namespace __gnu_pbds;

template <class T>
using ordered_set = tree<T, null_type, less<T>, rb_tree_tag,
                         tree_order_statistics_node_update>;

// Custom hash an toàn chống hack collision trên Codeforces
struct SplitMixHash {
    static uint64_t splitmix64(uint64_t x) {
        x += 0x9e3779b97f4a7c15ULL;
        x = (x ^ (x >> 30)) * 0xbf58476d1ce4e5b9ULL;
        x = (x ^ (x >> 27)) * 0x94d049bb133111ebULL;
        return x ^ (x >> 31);
    }
    size_t operator()(uint64_t x) const {
        static const uint64_t FIXED_RANDOM =
            chrono::steady_clock::now().time_since_epoch().count();
        return splitmix64(x + FIXED_RANDOM);
    }
};

template <class K, class V>
using fast_map = gp_hash_table<K, V, SplitMixHash>;

int main() {
    ordered_set<int> os;
    os.insert(10);
    os.insert(30);
    os.insert(20);
    // Phần tử nhỏ thứ 1 (0-indexed) là 20
    cout << *os.find_by_order(1) << "\n";
    // Số phần tử < 25 là 2 (gồm 10 và 20)
    cout << os.order_of_key(25) << "\n";
    return 0;
}
```

### 2. Implicit Treap — Đảo đoạn $[l, r]$ và Truy vấn tổng đoạn

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    mt19937 rng(chrono::steady_clock::now().time_since_epoch().count());

    struct Node {
        int val, sz;
        uint32_t prio;
        long long sum;
        bool rev;
        Node *l, *r;
        Node(int v) : val(v), sz(1), prio(rng()), sum(v), rev(false), l(nullptr), r(nullptr) {}
    };

    int getSz(Node* t) { return t ? t->sz : 0; }
    long long getSum(Node* t) { return t ? t->sum : 0; }

    void pull(Node* t) {
        if (!t) return;
        t->sz = 1 + getSz(t->l) + getSz(t->r);
        t->sum = t->val + getSum(t->l) + getSum(t->r);
    }

    void push(Node* t) {
        if (t && t->rev) {
            swap(t->l, t->r);
            if (t->l) t->l->rev ^= 1;
            if (t->r) t->r->rev ^= 1;
            t->rev = false;
        }
    }

    // Tách cây t thành [k phần tử đầu] (l) và [phần còn lại] (r)
    void split(Node* t, int k, Node*& l, Node*& r) {
        if (!t) { l = r = nullptr; return; }
        push(t);
        int leftSz = getSz(t->l);
        if (k <= leftSz) {
            split(t->l, k, l, t->l);
            r = t;
        } else {
            split(t->r, k - leftSz - 1, t->r, r);
            l = t;
        }
        pull(t);
    }

    // Ghép l và r thành cây t
    void merge(Node*& t, Node* l, Node* r) {
        push(l);
        push(r);
        if (!l || !r) { t = l ? l : r; return; }
        if (l->prio > r->prio) {
            merge(l->r, l->r, r);
            t = l;
        } else {
            merge(r->l, l, r->l);
            t = r;
        }
        pull(t);
    }

    // Đảo đoạn [l, r] (1-indexed)
    void reverseRange(Node*& root, int l, int r) {
        Node *t1, *t2, *t3;
        split(root, l - 1, t1, t2);
        split(t2, r - l + 1, t2, t3);
        if (t2) t2->rev ^= 1;
        merge(root, t1, t2);
        merge(root, root, t3);
    }

    int main() {
        ios_base::sync_with_stdio(false);
        cin.tie(nullptr);

        int n, q;
        cin >> n >> q;
        Node* root = nullptr;
        for (int i = 0; i < n; i++) {
            int x;
            cin >> x;
            merge(root, root, new Node(x));
        }

        while (q--) {
            int type, l, r;
            cin >> type >> l >> r;
            if (type == 1) {
                reverseRange(root, l, r);
            } else {
                Node *t1, *t2, *t3;
                split(root, l - 1, t1, t2);
                split(t2, r - l + 1, t2, t3);
                cout << getSum(t2) << "\n";
                merge(root, t1, t2);
                merge(root, root, t3);
            }
        }
        return 0;
    }
    ```

=== "Python"

    ```python
    import random
    import sys

    sys.setrecursionlimit(200000)
    input = sys.stdin.readline

    class Node:
        __slots__ = ("val", "sz", "prio", "total", "rev", "l", "r")
        def __init__(self, val):
            self.val = val
            self.sz = 1
            self.prio = random.random()
            self.total = val
            self.rev = False
            self.l = None
            self.r = None

    def get_sz(t):
        return t.sz if t else 0

    def get_sum(t):
        return t.total if t else 0

    def pull(t):
        if t:
            t.sz = 1 + get_sz(t.l) + get_sz(t.r)
            t.total = t.val + get_sum(t.l) + get_sum(t.r)

    def push(t):
        if t and t.rev:
            t.l, t.r = t.r, t.l
            if t.l:
                t.l.rev ^= True
            if t.r:
                t.r.rev ^= True
            t.rev = False

    def split(t, k):
        if t is None:
            return None, None
        push(t)
        left_sz = get_sz(t.l)
        if k <= left_sz:
            l, t.l = split(t.l, k)
            pull(t)
            return l, t
        else:
            t.r, r = split(t.r, k - left_sz - 1)
            pull(t)
            return t, r

    def merge(l, r):
        push(l)
        push(r)
        if l is None:
            return r
        if r is None:
            return l
        if l.prio > r.prio:
            l.r = merge(l.r, r)
            pull(l)
            return l
        else:
            r.l = merge(l, r.l)
            pull(r)
            return r
    ```

---

## 4. Lỗi thường gặp (SAI / ĐÚNG)

- **Dùng `less_equal<int>` trong PBDS rồi gọi `erase(val)`:** Với `less_equal`, hàm `os.erase(val)` không xóa được phần tử vì cơ chế tìm kiếm nội bộ bị lệch chuẩn chặt! Nếu muốn đa tập trên PBDS, hãy lưu `pair<int, int>{val, id++}` với `less<pair<int, int>>`.
- **Quên `push(t)` trong Implicit Treap:** Mọi hàm `split`, `merge` hoặc DFS in mảng đều **bắt buộc** gọi `push(t)` trước khi chạm vào `t->l`, `t->r`, nếu không thứ tự đảo ngược sẽ bị sai hoàn toàn.
- **Quên `pull(t)` sau khi sửa con:** Luôn cập nhật lại `sz`, `sum` ở cuối `split` và `merge`.

---

## 5. Bài tập luyện tập

### Bài tập trên FPTOJ

| Mã bài | Tên bài tập | Độ khó | Kiểu bài tập (Bản chất) | Bài học lý thuyết |
| :--- | :--- | :---: | :--- | :--- |
| `treap-ordered-set` | [Tập hợp động (Ordered Set)](https://fptoj.com/problem/treap-ordered-set) | ⭐⭐⭐ | PBDS (`find_by_order`, `order_of_key`) | [Treap & PBDS](treap-pbds.md) |
| `treap-cut-paste` | [Cắt và Dán xâu (Implicit Treap)](https://fptoj.com/problem/treap-cut-paste) | ⭐⭐⭐⭐ | Implicit Treap (`split` + `merge`) | [Treap & PBDS](treap-pbds.md) |
| `treap-rev-sum` | [Đảo đoạn và Tính tổng (Implicit Treap)](https://fptoj.com/problem/treap-rev-sum) | ⭐⭐⭐⭐ | Implicit Treap + Lazy Reverse & Sum | [Treap & PBDS](treap-pbds.md) |

### Bài tập tham khảo thêm

| Bài toán | Nền tảng | Độ khó | Kỹ thuật |
| :--- | :--- | :---: | :--- |
| [CSES - Salary Queries](https://cses.fi/problemset/task/1144) | CSES | ⭐⭐⭐ | PBDS `ordered_set` đếm trong đoạn giá trị |
| [CSES - Josephus Problem II](https://cses.fi/problemset/task/2163) | CSES | ⭐⭐⭐ | `find_by_order` + `erase` trong $O(N \log N)$ |
| [CSES - Cut and Paste](https://cses.fi/problemset/task/2072) | CSES | ⭐⭐⭐⭐ | Implicit Treap cắt dán đoạn xâu |
| [CSES - Reversals and Sums](https://cses.fi/problemset/task/2074) | CSES | ⭐⭐⭐⭐ | Implicit Treap đảo đoạn + tính tổng |

---

**Bài trước:** [← Bài 100: Chia căn & Mo's Algorithm](sqrt-mo.md) | **Bài tiếp theo:** [Bài 102: Parallel Binary Search →](parallel-binary-search.md)
