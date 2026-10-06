# Matroid - Lý Thuyết Tổ Hợp Nâng Cao

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** CP-Algorithms - Matroid

---

## 1. Bản chất vấn đề

### Vì sao cần Matroid? (đọc phần này trước 3 axiom)

Bạn đã biết 2 thuật toán tham lam kinh điển:

- **Kruskal (MST):** xét cạnh theo trọng số tăng dần, thêm cạnh nếu không tạo chu trình.
- **Lập lịch có deadline:** xét việc theo lợi nhuận giảm dần, thêm việc nếu còn xếp được lịch.

Cả hai đều "tham thì đúng". Tại sao? Vì cả hai cùng là **một** thuật toán duy nhất chạy trên 2 matroid khác nhau (graphic matroid và partition matroid). Matroid là cái khung chung trả lời câu hỏi: *"bài toán tham lam nào thì đúng?"* — nếu mô hình hóa được thành matroid, tham lam chắc chắn tối ưu, khỏi cần chứng minh riêng.

### Định nghĩa Matroid

Matroid $\mathcal{M} = (E, \mathcal{I})$ gồm:

- $E$: tập hợp các phần tử (ground set).
- $\mathcal{I} \subseteq 2^E$: tập các tập con **độc lập** (independent sets).

**Tính chất:**

1. $\emptyset \in \mathcal{I}$ (tập rỗng độc lập).
2. Nếu $A \in \mathcal{I}$ và $B \subseteq A$ thì $B \in \mathcal{I}$ (hereditary).
3. Nếu $A, B \in \mathcal{I}$ và $|A| < |B|$ thì $\exists x \in B \setminus A$ sao cho $A \cup \{x\} \in \mathcal{I}$ (exchange property).

### Các loại Matroid

| Loại | Ground set $E$ | Tập con độc lập |
|------|---------------|-----------------|
| **Uniform matroid** $U_{k,n}$ | $n$ phần tử | Tập con kích thước $\le k$ |
| **Linear matroid** | Các vector | Tập con tuyến tính độc lập |
| **Graphic matroid** | Các cạnh đồ thị | Tập con không tạo chu trình (rừng, cây khung) |
| **Partition matroid** | Phân hoạch $E$ | Chọn $\le k_i$ phần tử từ mỗi nhóm |

---

## 2. Tư duy cốt lõi

### Thuật toán tham lam trên Matroid

**Bài toán:** Tìm tập con độc lập lớn nhất có trọng số lớn nhất.

**Thuật toán:** Sắp xếp phần tử theo trọng số giảm dần. Thêm phần tử vào tập kết quả nếu tập kết quả vẫn độc lập.

**Kết quả:** Thuật toán tham lam cho nghiệm tối ưu trên **mọi** matroid!

### Trace chi tiết

**Graphic matroid (cây khung trọng số lớn nhất):** Đồ thị 4 đỉnh, 5 cạnh.

| Cạnh | Trọng số |
|------|----------|
| $(0,1)$ | 10 |
| $(1,2)$ | 8 |
| $(0,2)$ | 5 |
| $(2,3)$ | 7 |
| $(0,3)$ | 3 |

**Sắp xếp giảm dần:** $(0,1)=10$, $(1,2)=8$, $(2,3)=7$, $(0,2)=5$, $(0,3)=3$

| Bước | Cạnh | Thêm? | Lý do | Kết quả |
|------|------|-------|-------|---------|
| 1 | $(0,1)$ w=10 | Có | Không tạo chu trình | $\{(0,1)\}$ |
| 2 | $(1,2)$ w=8 | Có | Không tạo chu trình | $\{(0,1),(1,2)\}$ |
| 3 | $(2,3)$ w=7 | Có | Không tạo chu trình | $\{(0,1),(1,2),(2,3)\}$ |
| 4 | $(0,2)$ w=5 | Không | Tạo chu trình $0-1-2-0$ | |
| 5 | $(0,3)$ w=3 | Không | Tạo chu trình $0-1-2-3-0$ | |

**Kết quả:** Cây khung lớn nhất = $\{(0,1),(1,2),(2,3)\}$, trọng số = $10+8+7 = 25$.

---

## 3. Phân tích tính đúng đắn

### Tại sao tham lam đúng trên Matroid?

**Định lý:** Thuật toán tham lam tìm được tập con độc lập có tổng trọng số lớn nhất trên mọi matroid.

**Chứng minh (từng bước):** Giả sử tham lam chọn $A = \{a_1, a_2, \ldots, a_k\}$ (theo thứ tự giảm dần $w(a_1) \ge w(a_2) \ge \cdots$). Gọi $B = \{b_1, b_2, \ldots, b_m\}$ là một nghiệm tối ưu (sắp giảm dần tương tự). Ta biến đổi $B$ thành $A$ mà không giảm trọng số:

1. **So sánh phần tử đầu:** $a_1$ là phần tử nặng nhất trong toàn $E$ (tham lam xét nó đầu tiên và $\{a_1\}$ luôn độc lập theo axiom 1+2), nên $w(a_1) \ge w(b_1)$. Nếu $a_1 \notin B$, thay $b_1$ bằng $a_1$: tập mới vẫn độc lập? $B$ độc lập, $|B| \ge 1$; xét $\{a_1\}$ (độc lập, cỡ 1) với $B$: nếu $a_1 \notin B$ thì exchange property cho phép "nhét" $a_1$ vào $B$ rồi loại $b_1$ ra mà vẫn độc lập — trọng số không giảm vì $w(a_1) \ge w(b_1)$.
2. **Quy nạp:** giả sử đã biến $k-1$ phần tử đầu của $B$ thành $a_1, \dots, a_{k-1}$ mà vẫn tối ưu. Xét $a_k$: khi tham lam chọn nó, tập $\{a_1, \dots, a_k\}$ độc lập. Áp dụng exchange property giữa tập này (cỡ $k$) và $B$ hiện tại (cỡ $\ge k$): tồn tại phần tử trong $B$ có thể thay bằng $a_k$ mà giữ tính độc lập, và vì tham lam xét theo thứ tự giảm dần, $w(a_k)$ không nhỏ hơn phần tử bị thay.
3. **Kết thúc:** sau $k$ bước, $B$ chứa $A$. Nếu $|B| > |A|$, tham lam đã dừng nghĩa là mọi phần tử còn lại đều phá vỡ tính độc lập — mâu thuẫn với $B$ độc lập chứa $A$ thực sự. Vậy $|B| = |A|$ và $B = A$ (sai khác hoán vị), nên $A$ tối ưu. ∎

**Bản chất 1 câu:** exchange property đảm bảo "chọn nặng trước không bao giờ kẹt" — mọi lựa chọn tham lam đều nằm trong *ít nhất một* nghiệm tối ưu, nên đi hết quá trình vẫn tối ưu.

---

## 4. Đánh giá độ phức tạp

| Thao tác | Thời gian |
|----------|-----------|
| Tham lam trên Matroid | $O(|E| \cdot \log |E| + |E| \cdot T)$ |

$T$ = thời gian kiểm tra tính độc lập.

---

## 5. Trực quan: Tại sao exchange property quan trọng?

### Ví dụ minh họa

Giả sử ta có tập nền $E = \{1, 2, 3, 4\}$ với $\mathcal{I}$ là tập độc lập của uniform matroid $U_{2,4}$ (chọn tối đa 2 phần tử). Trọng số: $w_1 = 50$, $w_2 = 40$, $w_3 = 30$, $w_4 = 10$.

Tham lam sắp xếp giảm dần: $1(50)$, $2(40)$, $3(30)$, $4(10)$.

- Chọn 1: $\{1\}$ độc lập ✓
- Chọn 2: $\{1, 2\}$ độc lập ✓
- Chọn 3: $\{1, 2, 3\}$ không độc lập (kích thước 3 > 2) ✗
- Chọn 4: $\{1, 2, 4\}$ không độc lập (kích thước 3 > 2) ✗

Kết quả: $\{1, 2\}$ với tổng $90$. **Exchange property đảm bảo** ta không bỏ lỡ phần tử nặng hơn — vì nếu có cách chọn tốt hơn, ta có thể "tráo đổi" phần tử mà không phá vỡ tính độc lập.

### Phản ví dụ: khi không có exchange property

Xét tập nền $E = \{a, b, c\}$ với tập độc lập $\mathcal{I} = \{\emptyset, \{a\}, \{b\}\}$ — tập này **không có exchange property** vì $|\{b\}| = |\{a\}| = 1$ nhưng không thể thêm phần tử nào từ $\{b\}$ vào $\{a\}$.

Trọng số: $w_a = 0$, $w_b = 100$, $w_c = 50$.

Tham lam: sắp xếp $b(100)$, $c(50)$, $a(0)$.

- Chọn $c$: $\{c\}$ không độc lập ✗ (không nằm trong $\mathcal{I}$!)
- Chọn $a$: $\{a\}$ độc lập ✓
- Chọn $b$: $\{a, b\}$ không độc lập ✗ (vì $|A|=|B|$ nhưng không thể exchange!)

Kết quả: $\{a\}$ với tổng $0$, nhưng tối ưu là $\{b\}$ với tổng $100$. **Tham lam thất bại** vì thiếu exchange property!

> **Bài học:** Exchange property là điều kiện **cần và đủ** để tham lam tối ưu. Nếu một hệ tập có hereditary property nhưng không có exchange property → tham lam có thể cho kết quả sai.

---

## 6. Mẹo và bẫy thường gặp

### Nhầm lẫn giữa tập độc lập lớn nhất và tối đại

- **Lớn nhất** (maximum): tập độc lập có **tổng trọng số** lớn nhất.
- **Tối đại** (maximal): tập độc lập không thể **thêm** phần tử nào mà vẫn độc lập.

Trong matroid, mọi tập độc lập tối đại đều có cùng kích thước (tính chất **rank**). Nhưng tập lớn nhất là tập tối đại có tổng trọng số lớn nhất.

### Không kiểm tra tính độc lập đúng cách

Khi cài đặt, hàm kiểm tra `isIndependent(S)` là trái tim của thuật toán:

| Matroid | Cách kiểm tra |
|---------|---------------|
| Uniform | `|S| <= k` |
| Graphic | DSU kiểm tra chu trình |
| Linear | Khử Gauss kiểm tra phụ thuộc tuyến tính |
| Partition | Mỗi nhóm không vượt giới hạn |

### Sắp xếp sai thứ tự

```cpp
// Muốn cây khung LỚN NHẤT → sắp GIẢM dần
sort(edges.rbegin(), edges.rend());

// Muốn cây khung NHỎ NHẤT → sắp TĂNG dần  
sort(edges.begin(), edges.end());
```

### Quên rằng tham lam luôn đúng trên MỌI matroid

Nếu bạn chứng minh được bài toán có cấu trúc matroid, bạn có thể dùng tham lam mà không cần lo lắng! Ngược lại, nếu tham lam sai, rất có thể bài toán không phải matroid.

---

## Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [mat-uniform](https://fptoj.com/problem/mat-uniform) | FPTOJ | ⭐⭐ | Uniform Matroid: chọn tối đa K phần tử |
| [mat-graphic-min](https://fptoj.com/problem/mat-graphic-min) | FPTOJ | ⭐⭐ | Graphic Matroid: cây khung nhỏ nhất |
| [mat-graphic-max](https://fptoj.com/problem/mat-graphic-max) | FPTOJ | ⭐⭐ | Graphic Matroid: cây khung lớn nhất |
| [mat-partition-color](https://fptoj.com/problem/mat-partition-color) | FPTOJ | ⭐⭐⭐ | Partition Matroid: chọn theo màu |
| [mat-uniform-k](https://fptoj.com/problem/mat-uniform-k) | FPTOJ | ⭐⭐⭐ | Uniform Matroid có trọng số |
| [mat-linear-indep](https://fptoj.com/problem/mat-linear-indep) | FPTOJ | ⭐⭐⭐⭐ | Linear Matroid: độc lập tuyến tính |
| [mat-greedy-proof](https://fptoj.com/problem/mat-greedy-proof) | FPTOJ | ⭐⭐⭐⭐ | Kiểm tra tham lam tối ưu |
| [mat-partition-job](https://fptoj.com/problem/mat-partition-job) | FPTOJ | ⭐⭐⭐⭐⭐ | Partition Matroid: lập lịch |

---

## Code minh họa

### Ví dụ 1: Greedy trên Graphic Matroid (Kruskal)

=== "C++"

    ```cpp
    // Ví dụ: Greedy trên Graphic matroid — tìm cây khung trọng số lớn nhất
    // Dùng Kruskal — tham lam trên graphic matroid
    #include <bits/stdc++.h>
    using namespace std;

    // Disjoint Set Union: kiểm tra thêm cạnh có tạo chu trình không
    struct DSU {
        vector<int> par;               // par[x] < 0: x là gốc, |par[x]| = kích thước tập
        DSU(int n) : par(n + 1, -1) {} // Ban đầu mỗi đỉnh là 1 tập riêng

        // Tìm gốc của tập chứa x (có nén đường đi)
        int find(int x) {
            // Nếu par[x] < 0, x là gốc; ngược lại đệ quy lên cha
            return par[x] < 0 ? x : par[x] = find(par[x]);
        }

        // Hợp nhất tập chứa a và b, trả về true nếu hợp nhất được
        bool unite(int a, int b) {
            a = find(a);  // Tìm gốc của a
            b = find(b);  // Tìm gốc của b
            if (a == b) return false;  // Cùng tập → thêm cạnh sẽ tạo chu trình

            // Union by size: gắn tập nhỏ vào tập lớn
            if (par[a] > par[b]) swap(a, b);
            par[a] += par[b];  // Cập nhật kích thước
            par[b] = a;        // Gắn b vào a
            return true;
        }
    };

    int main() {
        int n, m;
        cin >> n >> m;

        vector<tuple<int,int,int>> edges; // Lưu (trọng số, đỉnh u, đỉnh v)
        for (int i = 0; i < m; i++) {
            int u, v, w;
            cin >> u >> v >> w;
            edges.push_back({w, u, v});
        }

        // Tham lam: sắp xếp cạnh theo trọng số giảm dần
        sort(edges.rbegin(), edges.rend());

        DSU dsu(n);            // Khởi tạo DSU với n đỉnh
        long long total = 0;   // Tổng trọng số cây khung
        int cnt = 0;           // Số cạnh đã chọn

        for (auto [w, u, v] : edges) {
            // Nếu thêm cạnh (u, v) không tạo chu trình (tập độc lập)
            if (dsu.unite(u, v)) {
                total += w;    // Cộng trọng số vào tổng
                cnt++;         // Tăng số cạnh đã chọn
                if (cnt == n - 1) break;  // Đủ n-1 cạnh → có cây khung
            }
        }

        cout << total << "\n";
        return 0;
    }
    ```

=== "Python"

    ```python
    # Disjoint Set Union: kiểm tra thêm cạnh có tạo chu trình không
    class DSU:
        def __init__(self, n):
            self.par = [-1] * (n + 1)  # par[x] < 0: x là gốc, |par[x]| = kích thước

        # Tìm gốc của tập chứa x (có nén đường đi)
        def find(self, x):
            if self.par[x] < 0:
                return x                # x là gốc
            self.par[x] = self.find(self.par[x])  # Nén đường đi
            return self.par[x]

        # Hợp nhất tập chứa a và b, trả về True nếu hợp nhất được
        def unite(self, a, b):
            a, b = self.find(a), self.find(b)  # Tìm gốc của a và b
            if a == b:
                return False            # Cùng tập → thêm cạnh sẽ tạo chu trình

            # Union by size: gắn tập nhỏ vào tập lớn
            if self.par[a] > self.par[b]:
                a, b = b, a
            self.par[a] += self.par[b]  # Cập nhật kích thước
            self.par[b] = a             # Gắn b vào a
            return True

    n, m = map(int, input().split())
    edges = []
    for _ in range(m):
        u, v, w = map(int, input().split())
        edges.append((w, u, v))  # Lưu (trọng số, đỉnh u, đỉnh v)

    # Tham lam: sắp xếp cạnh theo trọng số giảm dần
    edges.sort(reverse=True)

    dsu = DSU(n)         # Khởi tạo DSU với n đỉnh
    total = cnt = 0      # Tổng trọng số, số cạnh đã chọn

    for w, u, v in edges:
        # Nếu thêm cạnh (u, v) không tạo chu trình (tập độc lập)
        if dsu.unite(u, v):
            total += w   # Cộng trọng số vào tổng
            cnt += 1     # Tăng số cạnh đã chọn
            if cnt == n - 1:
                break    # Đủ n-1 cạnh → có cây khung

    print(total)
    ```

### Ví dụ 2: Greedy trên Uniform Matroid

**Bài toán:** Cho $n$ đồ vật với trọng số $w_i$, chọn tối đa $k$ đồ vật có tổng trọng số lớn nhất.

Đây là **uniform matroid** $U_{k,n}$: tập độc lập là tập con kích thước $\leq k$. Tham lam: sắp xếp giảm dần, chọn $k$ phần tử lớn nhất.

=== "C++"

    ```cpp
    // Uniform Matroid: chọn tối đa k phần tử có tổng trọng số lớn nhất
    #include <bits/stdc++.h>
    using namespace std;

    int main() {
        int n, k;
        cin >> n >> k;

        vector<int> w(n);  // Trọng số của n đồ vật
        for (int i = 0; i < n; i++)
            cin >> w[i];

        // Tham lam: sắp xếp trọng số giảm dần
        sort(w.rbegin(), w.rend());

        // Chọn k phần tử lớn nhất (hoặc tất cả nếu n < k)
        long long total = 0;
        for (int i = 0; i < min(n, k); i++)
            total += w[i];  // Cộng trọng số phần tử thứ i

        cout << total << "\n";
        return 0;
    }
    ```

=== "Python"

    ```python
    # Uniform Matroid: chọn tối đa k phần tử có tổng trọng số lớn nhất
    n, k = map(int, input().split())
    w = list(map(int, input().split()))  # Trọng số của n đồ vật

    # Tham lam: sắp xếp trọng số giảm dần
    w.sort(reverse=True)

    # Chọn k phần tử lớn nhất (hoặc tất cả nếu n < k)
    total = sum(w[:min(n, k)])  # Cắt lát và tính tổng

    print(total)
    ```

### Ví dụ 3: Greedy trên Partition Matroid

**Bài toán:** Có $n$ đồ vật, mỗi đồ vật có màu $c_i$ (từ $1$ đến $C$) và trọng số $w_i$. Với mỗi màu $c$, được chọn tối đa $k_c$ đồ vật. Tìm tập có tổng trọng số lớn nhất.

**Tính độc lập:** Tập là độc lập nếu với mỗi màu $c$, số đồ vật được chọn màu $c$ $\leq k_c$.

=== "C++"

    ```cpp
    // Partition Matroid: mỗi màu được chọn tối đa k_c đồ vật
    #include <bits/stdc++.h>
    using namespace std;

    int main() {
        int n, C;
        cin >> n >> C;

        vector<int> limit(C + 1);  // limit[c] = số đồ vật tối đa của màu c
        for (int c = 1; c <= C; c++)
            cin >> limit[c];

        vector<tuple<int,int,int>> items;  // (trọng số, màu, chỉ số)
        for (int i = 0; i < n; i++) {
            int w, color;
            cin >> w >> color;
            items.push_back({w, color, i});
        }

        // Tham lam: sắp xếp đồ vật theo trọng số giảm dần
        sort(items.rbegin(), items.rend());

        long long total = 0;
        vector<int> cnt(C + 1, 0);  // cnt[c] = số đồ vật màu c đã chọn

        for (auto [w, color, idx] : items) {
            // Chỉ chọn nếu chưa vượt giới hạn của màu này
            if (cnt[color] < limit[color]) {
                total += w;          // Cộng trọng số
                cnt[color]++;        // Tăng số lượng màu này đã dùng
            }
        }

        cout << total << "\n";
        return 0;
    }
    ```

=== "Python"

    ```python
    # Partition Matroid: mỗi màu được chọn tối đa k_c đồ vật
    n, C = map(int, input().split())

    limit = [0] * (C + 1)  # limit[c] = số đồ vật tối đa của màu c
    for c in range(1, C + 1):
        limit[c] = int(input())  # Đọc từng giới hạn (có thể đọc 1 dòng)

    items = []  # (trọng số, màu, chỉ số)
    for i in range(n):
        w, color = map(int, input().split())
        items.append((w, color, i))

    # Tham lam: sắp xếp đồ vật theo trọng số giảm dần
    items.sort(reverse=True)

    total = 0
    cnt = [0] * (C + 1)  # cnt[c] = số đồ vật màu c đã chọn

    for w, color, idx in items:
        # Chỉ chọn nếu chưa vượt giới hạn của màu này
        if cnt[color] < limit[color]:
            total += w      # Cộng trọng số
            cnt[color] += 1 # Tăng số lượng màu này đã dùng

    print(total)
    ```
