# SPFA (Shortest Path Faster Algorithm)

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** VNOI Wiki, CP-Algorithms - SPFA

---

## 1. Bản chất vấn đề

### Bài toán: Tìm đường đi ngắn nhất có cạnh âm

Cho đồ thị có trọng số (có thể **âm**). Tìm đường đi ngắn nhất từ đỉnh $S$.

- **Dijkstra:** Không hoạt động với cạnh âm.
- **Bellman-Ford:** $O(NM)$ — đúng nhưng chậm.
- **SPFA:** Cải tiến Bellman-Ford — trung bình $O(M)$, worst case $O(NM)$.

### Tại sao cần SPFA?

Trong thực tế thi đấu, nhiều bài toán yêu cầu tìm đường đi ngắn nhất trên đồ thị có cạnh âm nhưng không có chu trình âm. Ví dụ:

- **Chênh lệch tỉ giá:** Mua bán ngoại tệ có phí giao dịch (có thể âm nếu có ưu đãi).
- **Mạng giao thông:** Một số tuyến đường có "phần thưởng" (giảm thời gian) do đi xuống dốc.
- **Lập lịch:** Một số công việc có thể rút ngắn thời gian chờ giữa các bước.

Trong các bài toán này, Bellman-Ford $O(NM)$ có thể quá chậm với $N, M \le 10^5$. SPFA tận dụng thực tế là hầu hết các bước lặp trong Bellman-Ford không thay đổi gì — SPFA chỉ duyệt cạnh từ những đỉnh **thực sự thay đổi** khoảng cách.

### So sánh chi tiết với Bellman-Ford

| Thuật toán | Trọng số âm | Trung bình | Worst case | Cách hoạt động |
|------------|------------|------------|------------|----------------|
| Dijkstra | Không | $O(M \log N)$ | $O(M \log N)$ | Tham lam — chọn đỉnh gần nhất chưa xét |
| Bellman-Ford | Có | $O(NM)$ | $O(NM)$ | Lặp $N-1$ lần, mỗi lần duyệt **toàn bộ** $M$ cạnh |
| **SPFA** | Có | $O(M)$ | $O(NM)$ | Chỉ duyệt cạnh từ đỉnh **vừa được cập nhật** (dùng queue) |

**Điểm khác biệt cốt lõi:** Bellman-Ford "ngu ngốc" duyệt toàn bộ cạnh trong mỗi vòng lặp, kể cả khi không có gì thay đổi. SPFA thông minh hơn — nó chỉ đưa vào hàng đợi những đỉnh có khoảng cách vừa giảm, vì chỉ những đỉnh này mới có khả năng giảm khoảng cách của đỉnh khác.

---

## 2. Tư duy cốt lõi

### Ý tưởng: Chỉ cập nhật đỉnh thay đổi

Bellman-Ford lặp $N-1$ lần, mỗi lần duyệt **tất cả** cạnh. SPFA chỉ duyệt cạnh từ đỉnh **vừa được cập nhật** (dùng queue).

### Trace chi tiết

**Đồ thị:** 4 đỉnh, 5 cạnh.

| Cạnh | Trọng số |
|------|----------|
| $0 \to 1$ | 2 |
| $0 \to 2$ | 3 |
| $1 \to 3$ | 1 |
| $2 \to 1$ | -2 |
| $2 \to 3$ | 4 |

**SPFA từ đỉnh 0:**

| Bước | Queue (trái → phải) | Xử lý | Cập nhật | dist[] |
|------|---------------------|--------|----------|--------|
| 0 | $[0]$ | 0 | $dist[0] = 0$, thêm 1 (w=2), thêm 2 (w=3) | $[0, \infty, \infty, \infty]$ |
| 1 | $[1, 2]$ → pop 1 | 1 | $dist[1] = 2$ (qua 0→1), thêm 3 (w=1) | $[0, 2, 3, \infty]$ |
| 2 | $[2, 3]$ → pop 2 | 2 | $dist[1] = \min(2, 3+(-2)) = 1$ → cập nhật, thêm 1; $dist[3] = 3+4 = 7$, thêm 3 | $[0, 1, 3, 7]$ |
| 3 | $[3, 1]$ → pop 3 | 3 | Không cập nhật gì | $[0, 1, 3, 7]$ |
| 4 | $[1]$ → pop 1 | 1 | $dist[3] = \min(7, 1+1) = 2$ → cập nhật, thêm 3 | $[0, 1, 3, 2]$ |
| 5 | $[3]$ → pop 3 | 3 | Không cập nhật gì | $[0, 1, 3, 2]$ |

**Kết quả:** $dist = [0, 1, 3, 2]$

### Kiểm tra chu trình âm

Nếu 1 đỉnh được cập nhật **$\ge N$ lần** $\Rightarrow$ tồn tại chu trình âm.

---

## 3. Phân tích tính đúng đắn

### Tại sao SPFA đúng?

Tương tự Bellman-Ford: mỗi lần 1 đỉnh $u$ được đưa vào queue và xử lý, nó cập nhật khoảng cách cho các đỉnh kề. Nếu khoảng cách cải thiện, đỉnh kề được thêm vào queue.

Khi queue rỗng, mọi đường đi ngắn nhất đã được tìm thấy (tương tự Bellman-Ford hội tụ).

### Worst case $O(NM)$

Khi đồ thị là chuỗi: $0 \to 1 \to 2 \to \ldots \to N-1$, mỗi đỉnh có thể được cập nhật $O(N)$ lần.

---

## 4. Cạm bẫy & Tối ưu

### Bẫy 1: Đồ thị không liên thông

Nếu đồ thị có nhiều thành phần liên thông, các đỉnh không đến được từ $S$ sẽ giữ $dist = \infty$. SPFA vẫn đúng — chỉ xử lý các đỉnh đến được từ $S$.

### Bẫy 2: Tràn số khi cộng trọng số

```cpp
// SAI: dist[u] + w có thể tràn long long nếu w rất âm
if (dist[u] + w < dist[v]) { ... }

// ĐÚNG: Kiểm tra dist[u] != INF trước khi cộng
if (dist[u] != LLONG_MAX && dist[u] + w < dist[v]) { ... }
```

### Bẫy 3: Chu trình âm không đến được từ $S$

Nếu chu trình âm nằm trong thành phần liên thông **khác** với $S$, SPFA sẽ không bao giờ phát hiện được (vì queue chỉ bắt đầu từ $S$). Nếu cần phát hiện mọi chu trình âm, phải thêm **tất cả** đỉnh vào queue ban đầu.

### Bẫy 4: Đa cạnh và khuyên

- **Đa cạnh (multi-edge):** SPFA xử lý bình thường — mỗi cạnh được duyệt độc lập.
- **Khuyên (self-loop):** Nếu khuyên có trọng số âm $\Rightarrow$ chu trình âm ngay lập tức. Nếu trọng số dương hoặc 0, vô hại.

### Mẹo 1: Đường đi dài nhất

Để tìm đường đi **dài nhất**, đảo dấu tất cả trọng số: $w' = -w$. Nếu có chu trình dương trong đồ thị gốc $\Rightarrow$ chu trình âm trong đồ thị đảo dấu $\Rightarrow$ SPFA phát hiện được.

### Mẹo 2: Tối ưu SLF (Small Label First)

Thay queue thường bằng **deque**: khi đưa đỉnh $v$ vào, nếu $dist[v] < dist[front]$ thì đẩy vào **đầu** deque, ngược lại đẩy vào **cuối**. Kỹ thuật này giảm số lần xử lý đỉnh đáng kể trong thực tế.

### Mẹo 3: Tối ưu LLL (Large Label Last)

Sau khi pop đỉnh $u$ ra khỏi queue, nếu $dist[u] >$ trung bình $dist$ của các đỉnh trong queue, đẩy lại vào **cuối** queue. Kỹ thuật này hoạt động tốt trên đồ thị dày đặc.

---

## 5. Đánh giá độ phức tạp

| Thuật toán | Trung bình | Worst case | Không gian |
|------------|------------|------------|------------|
| Bellman-Ford | $O(NM)$ | $O(NM)$ | $O(N + M)$ |
| **SPFA** | $O(M)$ | $O(NM)$ | $O(N + M)$ |

---

## Code minh họa

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    int main() {
        // Tối ưu tốc độ nhập/xuất
        ios_base::sync_with_stdio(false);
        cin.tie(NULL);

        int n, m;
        cin >> n >> m;

        // Danh sách kề: adj[u] = danh sách các cặp (v, w)
        vector<vector<pair<int,int>>> adj(n);
        for (int i = 0; i < m; i++) {
            int u, v, w;
            cin >> u >> v >> w;
            adj[u].push_back({v, w}); // Cạnh u -> v trọng số w
        }

        int s; // Đỉnh xuất phát
        cin >> s;

        // dist[v] = khoảng cách ngắn nhất từ s đến v
        vector<long long> dist(n, LLONG_MAX);
        // inQueue[v] = true nếu v đang có trong hàng đợi
        vector<bool> inQueue(n, false);
        // cnt[v] = số lần đỉnh v được đưa vào queue (để phát hiện chu trình âm)
        vector<int> cnt(n, 0);

        // Khởi tạo: khoảng cách từ s đến s = 0
        dist[s] = 0;
        queue<int> q;
        q.push(s);
        inQueue[s] = true; // Đánh dấu s đã vào queue

        bool hasNegCycle = false; // Cờ phát hiện chu trình âm

        while (!q.empty()) {
            int u = q.front(); // Lấy đỉnh u ra khỏi queue
            q.pop();
            inQueue[u] = false; // Đánh dấu u đã rời khỏi queue

            // Duyệt tất cả cạnh kề của u
            for (auto [v, w] : adj[u]) {
                // Nếu đi qua u giúp rút ngắn khoảng cách đến v
                // (xem Bẫy 2: phải kiểm tra dist[u] != INF trước khi cộng)
                if (dist[u] != LLONG_MAX && dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w; // Cập nhật khoảng cách
                    if (!inQueue[v]) { // Nếu v chưa trong queue
                        q.push(v); // Đưa v vào queue để xử lý sau
                        inQueue[v] = true;
                        cnt[v]++; // Tăng số lần v vào queue
                        // Nếu v vào queue >= n lần -> có chu trình âm
                        if (cnt[v] >= n) {
                            hasNegCycle = true;
                            break;
                        }
                    }
                }
            }
            if (hasNegCycle) break; // Thoát nếu phát hiện chu trình âm
        }

        if (hasNegCycle) {
            cout << "Ton tai chu trinh am\n";
        } else {
            // In khoảng cách từ s đến tất cả các đỉnh
            // In -1 nếu không thể đến được (dist = LLONG_MAX)
            for (int i = 0; i < n; i++) {
                cout << (dist[i] == LLONG_MAX ? -1 : dist[i]) << " ";
            }
            cout << "\n";
        }
        return 0;
    }
    ```

=== "Python"

    ```python
    from collections import deque
    import sys
    input = sys.stdin.readline  # Tối ưu nhập dữ liệu

    n, m = map(int, input().split())
    # Danh sách kề: adj[u] = danh sách các cặp (v, w)
    adj = [[] for _ in range(n)]
    for _ in range(m):
        u, v, w = map(int, input().split())
        adj[u].append((v, w))  # Cạnh u -> v trọng số w

    s = int(input())  # Đỉnh xuất phát
    dist = [float('inf')] * n  # Khoảng cách ngắn nhất từ s
    in_queue = [False] * n     # Đỉnh v có đang trong queue không?
    cnt = [0] * n              # Số lần mỗi đỉnh được đưa vào queue

    # Khởi tạo: khoảng cách từ s đến s = 0
    dist[s] = 0
    q = deque([s])
    in_queue[s] = True
    has_neg_cycle = False

    while q:
        u = q.popleft()  # Lấy đỉnh u ra khỏi queue (đầu hàng đợi)
        in_queue[u] = False  # Đánh dấu u đã rời queue

        # Duyệt tất cả cạnh kề của u
        for v, w in adj[u]:
            # Nếu đi qua u rút ngắn được khoảng cách đến v
            # (xem Bẫy 2: dist[u] = inf + w sẽ sai, phải kiểm tra trước)
            if dist[u] != float('inf') and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w  # Cập nhật khoảng cách
                if not in_queue[v]:    # Nếu v chưa có trong queue
                    q.append(v)        # Đưa v vào queue
                    in_queue[v] = True
                    cnt[v] += 1        # Tăng số lần v được đưa vào
                    # Nếu v vào queue >= n lần -> có chu trình âm
                    if cnt[v] >= n:
                        has_neg_cycle = True
                        break
        if has_neg_cycle:
            break  # Thoát nếu phát hiện chu trình âm

    if has_neg_cycle:
        print("Ton tai chu trinh am")
    else:
        # In khoảng cách, in -1 nếu không thể đến được (inf)
        print(' '.join(str(d if d != float('inf') else -1) for d in dist))
    ```

---

## 6. Bài tập thực hành trên FPTOJ

Dưới đây là danh sách 8 bài tập thực hành được đồng bộ trên hệ thống [FPTOJ](https://fptoj.com) về chuyên đề **SPFA**:

| Mã bài | Tên bài tập | Độ khó | Chuyên đề | Bản chất bài tập | Lời giải chi tiết |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `spfa-basic` | [Hành trình thu thập](https://fptoj.com/problem/spfa-basic) | ⭐ | SPFA | SPFA cơ bản tìm đường ngắn nhất có cạnh âm | [Xem hướng dẫn](https://fptoj.com/problem/spfa-basic/solution) |
| `spfa-detect` | [Khai thác tài nguyên](https://fptoj.com/problem/spfa-detect) | ⭐ | SPFA | Phát hiện chu trình âm từ ~S~ | [Xem hướng dẫn](https://fptoj.com/problem/spfa-detect/solution) |
| `spfa-grid` | [Dịch chuyển trên lưới](https://fptoj.com/problem/spfa-grid) | ⭐⭐ | SPFA | SPFA trên bảng lưới 2D | [Xem hướng dẫn](https://fptoj.com/problem/spfa-grid/solution) |
| `spfa-longest` | [Con đường thương nhân](https://fptoj.com/problem/spfa-longest) | ⭐⭐ | SPFA | Đường đi dài nhất hoặc phát hiện chu trình dương | [Xem hướng dẫn](https://fptoj.com/problem/spfa-longest/solution) |
| `spfa-slf` | [Đồ thị lưới hiểm trở](https://fptoj.com/problem/spfa-slf) | ⭐⭐ | SPFA | Tối ưu hàng đợi SLF (Small Label First) | [Xem hướng dẫn](https://fptoj.com/problem/spfa-slf/solution) |
| `spfa-cycle` | [Bẫy thời gian](https://fptoj.com/problem/spfa-cycle) | ⭐⭐⭐ | SPFA | Tìm và truy vết cụ thể chu trình âm | [Xem hướng dẫn](https://fptoj.com/problem/spfa-cycle/solution) |
| `spfa-k-neg` | [Chuyến đi giới hạn](https://fptoj.com/problem/spfa-k-neg) | ⭐⭐⭐ | SPFA | Đường ngắn nhất đi tối đa ~K~ cạnh âm | [Xem hướng dẫn](https://fptoj.com/problem/spfa-k-neg/solution) |
| `spfa-limit` | [Sức bền của xe](https://fptoj.com/problem/spfa-limit) | ⭐⭐⭐⭐ | SPFA | Trạng thái tích lũy pin và reset tại trạm sạc | [Xem hướng dẫn](https://fptoj.com/problem/spfa-limit/solution) |

