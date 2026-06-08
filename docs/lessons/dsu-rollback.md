# DSU Rollback - Gộp Tập Hợp Có Hoàn Tác

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** CP-Algorithms - DSU with Rollback

---

## 1. Bản chất vấn đề

### Bài toán: Kiểm tra liên thông theo thời gian

Cho $N$ đỉnh, thực hiện $Q$ truy vấn theo thời gian:

- **Type 1:** Thêm cạnh $(u, v)$ tại thời điểm $t$.
- **Type 2:** Xóa cạnh $(u, v)$ tại thời điểm $t$.
- **Type 3:** Kiểm tra $u$ và $v$ có liên thông tại thời điểm $t$ không.

**DSU thường** không hỗ trợ xóa cạnh (không hoàn tác gộp).

**DSU Rollback:** Hỗ trợ **hoàn tác** (undo) thao tác gộp gần nhất $\Rightarrow$ giải quyết offline bằng Divide & Conquer trên thời gian.

### So sánh

| Cấu trúc | Gộp | Tìm | Hoàn tác |
|----------|-----|-----|----------|
| DSU thường | $O(\alpha(N))$ | $O(\alpha(N))$ | Không |
| **DSU Rollback** | $O(\log N)$ | $O(\log N)$ | $O(1)$ |

---

## 2. Tư duy cốt lõi

### Ý tưởng: Không dùng path compression

DSU Rollback **không dùng path compression** (vì khó hoàn tác). Thay vào đó, chỉ dùng **union by size/rank**.

Khi gộp 2 tập, lưu lại:
- Đỉnh nào bị thay đổi (root cũ).
- Kích thước nào bị thay đổi.

Để hoàn tác: khôi phục root và kích thước.

### Trace chi tiết

**5 đỉnh:** 1, 2, 3, 4, 5

| Bước | Thao tác | Gộp | Lưu trạng thái | parent[] | size[] |
|------|----------|-----|----------------|----------|--------|
| 0 | — | — | — | $[1,2,3,4,5]$ | $[1,1,1,1,1]$ |
| 1 | Gộp(1,2) | root 2→1 | $(2, \text{parent}[2]=2, \text{size}[1]=1)$ | $[1,1,3,4,5]$ | $[2,1,1,1,1]$ |
| 2 | Gộp(3,4) | root 4→3 | $(4, \text{parent}[4]=4, \text{size}[3]=1)$ | $[1,1,3,3,5]$ | $[2,1,2,1,1]$ |
| 3 | Gộp(1,3) | root 3→1 | $(3, \text{parent}[3]=3, \text{size}[1]=2)$ | $[1,1,1,3,5]$ | $[4,1,2,1,1]$ |
| 4 | **Undo** bước 3 | Khôi phục 3 | | $[1,1,3,3,5]$ | $[2,1,2,1,1]$ |

**Kiểm tra liên thông:** `find(1) == find(4)`?

- Trước undo: có (cùng root 1).
- Sau undo bước 3: không (root 1 ≠ root 3).

---

## 3. Phân tích tính đúng đắn

### Tại sao không dùng path compression?

Path compression thay đổi **nhiều** parent trong 1 lần `find`. Để hoàn tác, cần lưu tất cả thay đổi → tốn bộ nhớ và thời gian.

Chỉ dùng union by size: mỗi lần gộp chỉ thay đổi **1** parent $\Rightarrow$ hoàn tác $O(1)$.

### Chiều cao cây

Với union by size (không path compression), chiều cao cây tối đa $O(\log N)$. Do đó `find` là $O(\log N)$.

---

## 4. Đánh giá độ phức tạp

| Thao tác | Thời gian |
|----------|-----------|
| Find | $O(\log N)$ |
| Gộp | $O(\log N)$ |
| Hoàn tác | $O(1)$ |

---

## Code minh họa

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    struct DSU_Rollback {
        vector<int> parent, sz;
        stack<tuple<int,int,int>> history; // (node, old_parent, old_size_node)
        int components;

        DSU_Rollback(int n) : parent(n + 1), sz(n + 1, 1), components(n) {
            iota(parent.begin(), parent.end(), 0);
        }

        int find(int v) {
            while (v != parent[v]) v = parent[v];
            return v;
        }

        bool unite(int a, int b) {
            a = find(a);
            b = find(b);
            if (a == b) {
                history.push({-1, -1, -1}); // đánh dấu không thay đổi
                return false;
            }
            if (sz[a] < sz[b]) swap(a, b);
            // Gộp b vào a
            history.push({b, parent[b], sz[a]});
            parent[b] = a;
            sz[a] += sz[b];
            components--;
            return true;
        }

        void rollback() {
            auto [b, old_parent, old_sz_a] = history.top();
            history.pop();
            if (b == -1) return; // không có thay đổi
            sz[parent[b]] = old_sz_a; // parent[b] vẫn là a tại thời điểm gộp
            parent[b] = old_parent;
            components++;
        }
    };

    int main() {
        ios_base::sync_with_stdio(false);
        cin.tie(NULL);

        int n, q;
        cin >> n >> q;

        DSU_Rollback dsu(n);

        while (q--) {
            int type;
            cin >> type;
            if (type == 1) {
                int u, v;
                cin >> u >> v;
                dsu.unite(u, v);
            } else if (type == 2) {
                dsu.rollback();
            } else {
                int u, v;
                cin >> u >> v;
                cout << (dsu.find(u) == dsu.find(v) ? "YES" : "NO") << "\n";
            }
        }
        return 0;
    }
    ```

=== "Python"

    ```python
    import sys
    input = sys.stdin.readline

    class DSURollback:
        def __init__(self, n):
            self.parent = list(range(n + 1))
            self.sz = [1] * (n + 1)
            self.history = []
            self.components = n

        def find(self, v):
            while v != self.parent[v]:
                v = self.parent[v]
            return v

        def unite(self, a, b):
            a = self.find(a)
            b = self.find(b)
            if a == b:
                self.history.append((-1, -1, -1))
                return False
            if self.sz[a] < self.sz[b]:
                a, b = b, a
            self.history.append((b, self.parent[b], self.sz[a]))
            self.parent[b] = a
            self.sz[a] += self.sz[b]
            self.components -= 1
            return True

        def rollback(self):
            b, old_parent, old_sz_a = self.history.pop()
            if b == -1:
                return
            self.sz[self.parent[b]] = old_sz_a
            self.parent[b] = old_parent
            self.components += 1

    n, q = map(int, input().split())
    dsu = DSURollback(n)

    for _ in range(q):
        parts = list(map(int, input().split()))
        if parts[0] == 1:
            dsu.unite(parts[1], parts[2])
        elif parts[0] == 2:
            dsu.rollback()
        else:
            print("YES" if dsu.find(parts[1]) == dsu.find(parts[2]) else "NO")
    ```
