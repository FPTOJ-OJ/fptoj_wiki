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
        vector<int> parent, sz; // parent: gốc; sz: kích thước cụm (để union by size)
        stack<tuple<int,int,int>> history; // (b, parent cũ của b, size cũ của a)
        int components; // Số cụm hiện tại

        DSU_Rollback(int n) : parent(n + 1), sz(n + 1, 1), components(n) {
            iota(parent.begin(), parent.end(), 0); // Bước 0: mỗi đỉnh một cụm
        }

        int find(int v) {
            while (v != parent[v]) v = parent[v]; // Bước 1: leo lên gốc, KHÔNG nén đường
            return v;
        }

        bool unite(int a, int b) {
            a = find(a); // Bước 2: tìm gốc 2 bên
            b = find(b);
            if (a == b) {
                history.push({-1, -1, -1}); // Bước 3: cùng cụm -> đẩy mốc rỗng giữ nhịp undo
                return false;
            }
            if (sz[a] < sz[b]) swap(a, b); // Bước 4: a luôn là cụm to hơn
            // Bước 5: gộp b vào a, lưu (b, parent cũ, size cũ của a) để undo
            history.push({b, parent[b], sz[a]});
            parent[b] = a;
            sz[a] += sz[b];
            components--; // Bước 6: mất đi 1 cụm
            return true;
        }

        void rollback() {
            auto [b, old_parent, old_sz_a] = history.top(); // Bước 7: lấy mốc gần nhất
            history.pop();
            if (b == -1) return; // Bước 8: mốc rỗng -> không có gì để gỡ
            sz[parent[b]] = old_sz_a; // Bước 9: khôi phục size của a (parent[b] vẫn là a)
            parent[b] = old_parent; // Bước 10: tách b về gốc cũ
            components++; // Bước 11: tăng lại số cụm
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

---

## 5. Lỗi thường gặp (SAI / ĐÚNG)

### Lỗi 1: Quên đẩy mốc khi `a == b`

**SAI:** `unite` cùng cụm mà không push → số lần `rollback()` lệch khỏi số lần `unite()`.

```cpp
// SAI: bỏ qua, stack ngắn hơn số thao tác
if (a == b) return false;
```

**ĐÚNG:** luôn push mốc `(-1,-1,-1)` để mỗi `unite` ứng với đúng một `rollback`.

```cpp
// ĐÚNG: giữ nhịp 1-1 giữa unite và rollback
if (a == b) { history.push({-1, -1, -1}); return false; }
```

### Lỗi 2: Dùng path compression trong `find`

**SAI:** `parent[v] = find(parent[v])` sửa hàng loạt cha → undo phải lưu cả đường đi, vừa chậm vừa khó.

```cpp
// SAI: không hoàn tác nổi
int find(int v) { return v == parent[v] ? v : parent[v] = find(parent[v]); }
```

**ĐÚNG:** chỉ leo `while`, kết hợp union by size giữ chiều cao $O(\log N)$ mà undo chỉ $O(1)$.

```cpp
// ĐÚNG: không nén, mỗi unite chỉ đổi đúng 1 parent
int find(int v) { while (v != parent[v]) v = parent[v]; return v; }
```

### Lỗi 3: Rollback quá tay (quá số lần unite)

**SAI:** gọi `rollback()` khi stack rỗng → `top()` trên stack rỗng → crash / hành vi không xác định.

```cpp
// SAI: không kiểm tra
dsu.rollback(); // stack có thể rỗng!
```

**ĐÚNG:** lưu checkpoint `snapshot = history.size()` trước khi vào nhánh D&C, chỉ rollback về đúng mốc đó.

```cpp
// ĐÚNG: quay về đúng checkpoint
int snap = dsu.history.size();
// ... unite nhiều lần ...
while ((int)dsu.history.size() > snap) dsu.rollback();
```

---

## 6. Bài tập luyện tập trên FPTOJ

Dưới đây là các bài tập giúp bạn rèn luyện kỹ thuật DSU Rollback, từ cơ bản đến nâng cao. Các mã bài đều có dạng `dsur-*` và được liệt kê trong [Problem Set](cses.md#-1q-nhóm-dsu-rollback-gộp-tập-hợp-có-hoàn-tác).

### 5.1. Rollback cơ bản (`dsur-basic`)

Trong một buổi thực hành cấu trúc dữ liệu, bạn được yêu cầu mô phỏng hệ thống quản lý nhóm. Ban đầu có **N** phần tử, mỗi phần tử là một nhóm riêng biệt. Có **Q** thao tác:

- **1 u v**: Gộp nhóm chứa u và nhóm chứa v.
- **2**: Hoàn tác thao tác gộp gần nhất. Nếu không có thao tác nào để hoàn tác thì bỏ qua.
- **3 u v**: Hỏi u và v có đang cùng nhóm không?

*Ràng buộc:* N, Q ≤ 10⁵.

### 5.2. Tổng nhóm có rollback (`dsur-sum`)

Trong ngân hàng dữ liệu, mỗi tài khoản có số dư **a[i]**. Hệ thống có thể gộp các tài khoản thành nhóm (tổng số dư cộng dồn) và hoàn tác việc gộp. Có **Q** thao tác:

- **1 u v**: Gộp nhóm chứa u và nhóm chứa v.
- **2**: Hoàn tác thao tác gộp gần nhất.
- **3 u**: In tổng số dư của nhóm chứa u.

*Ràng buộc:* N, Q ≤ 10⁵, |a[i]| ≤ 10⁹. Yêu cầu lưu thêm thông tin tổng và khôi phục khi rollback.

### 5.3. Dòng thời gian — Timeline (`dsur-timeline`)

Một thí nghiệm theo dõi sự kết nối giữa **N** nút mạng theo thời gian. Có **Q** sự kiện:

- **1 u v**: Nút u và v kết nối với nhau.
- **2 u v**: Kết nối giữa u và v bị đứt (đảm bảo đã tồn tại).
- **3 u v**: Hỏi u và v có kết nối không?

Xử lý offline bằng **Chia để trị trên thời gian (Divide and Conquer on Time)** kết hợp DSU Rollback. Đây là bài tập kinh điển để hiểu cách áp dụng D&C vào bài toán dynamic connectivity.

*Ràng buộc:* N, Q ≤ 10⁵.

### 5.4. Đồ thị động — Dynamic Connectivity (`dsur-online`)

Cho đồ thị vô hướng **N** đỉnh, ban đầu rỗng. Có **Q** truy vấn:

- `add u v`: Thêm cạnh (u, v).
- `remove u v`: Xoá cạnh (u, v).
- `query u v`: Hỏi u và v có liên thông không?

Giải bài toán **Dynamic Connectivity** offline bằng Segment Tree trên thời gian kết hợp DSU Rollback: mỗi cạnh tồn tại trong một khoảng thời gian, thêm vào node Segment Tree tương ứng, sau đó DFS để xử lý.

*Ràng buộc:* N, Q ≤ 10⁵.

### 5.5. Lưu trữ trạng thái — Persistent DSU (`dsur-persistence`)

Hệ thống quản lý phiên bản dữ liệu, mỗi thao tác gộp tạo một snapshot mới. Có **Q** thao tác:

- **1 u v**: Gộp hai nhóm, tạo phiên bản mới.
- **2 k**: Quay lại phiên bản thứ k (đánh số từ 0).
- **3 u v**: Hỏi ở phiên bản hiện tại, u và v có cùng nhóm không?

Không thể dùng rollback đơn thuần vì có thể quay lại phiên bản bất kỳ. Cần duy trì mảng lịch sử kích thước tại mỗi phiên bản, dùng `rollbackTo(targetSize)`.

*Ràng buộc:* N, Q ≤ 10⁵.

### 5.6. Số vùng kết nối qua thời gian (`dsur-connect`)

Trong mạng lưới giao thông **N** nút, các tuyến đường được xây và phá theo thời gian. Có **Q** sự kiện:

- `connect u v`: Xây đường nối u và v.
- `disconnect u v`: Phá đường (đảm bảo tồn tại).
- `count`: In số thành phần liên thông hiện tại.

Dùng DSU Rollback mở rộng để lưu thêm biến `components`, khôi phục khi rollback. Kết hợp với Segment Tree trên thời gian để xử lý.

*Ràng buộc:* N, Q ≤ 10⁵.

### 5.7. Đồ thị hai phía động — Dynamic Bipartite (`dsur-bipartite`)

Đồ thị **N** đỉnh, ban đầu rỗng. Có **Q** thao tác:

- `add u v`: Thêm cạnh.
- `remove u v`: Xoá cạnh (đảm bảo tồn tại).
- `query`: Hỏi đồ thị hiện tại có hai phía không?

Sử dụng DSU Rollback mở rộng với **parity DSU**: ngoài parent và size, lưu thêm parity (chẵn lẻ) để kiểm tra tính hai phía. Khi thêm cạnh nối hai đỉnh cùng parity trong cùng tập → vi phạm.

*Ràng buộc:* N, Q ≤ 10⁵. Bài tập khó, yêu cầu hiểu sâu về DSU rollback và đồ thị hai phía.

### 5.8. Cây khung động — Dynamic MST (`dsur-mst`)

Cho đồ thị **N** đỉnh, ban đầu không cạnh. Có **Q** thao tác:

- `add u v w`: Thêm cạnh (u, v) trọng số w.
- `remove u v`: Xoá cạnh (u, v) — đảm bảo tồn tại.
- `query`: In tổng trọng số MST hiện tại. Nếu đồ thị không liên thông, in -1.

Kết hợp D&C trên thời gian với DSU Rollback. Trong mỗi đoạn thời gian, chỉ giữ các cạnh tồn tại suốt đoạn đó, thực hiện Kruskal với các cạnh còn lại.

*Ràng buộc:* N ≤ 10⁴, Q ≤ 5 × 10⁴. Bài tập khó nhất trong nhóm, yêu cầu thành thạo cả DSU Rollback, Kruskal và D&C trên thời gian.
