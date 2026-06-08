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

### So sánh

| Thuật toán | Trọng số âm | Trung bình | Worst case |
|------------|------------|------------|------------|
| Dijkstra | Không | $O(M \log N)$ | $O(M \log N)$ |
| Bellman-Ford | Có | $O(NM)$ | $O(NM)$ |
| **SPFA** | Có | $O(M)$ | $O(NM)$ |

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

## 4. Đánh giá độ phức tạp

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
        ios_base::sync_with_stdio(false);
        cin.tie(NULL);

        int n, m;
        cin >> n >> m;

        vector<vector<pair<int,int>>> adj(n);
        for (int i = 0; i < m; i++) {
            int u, v, w;
            cin >> u >> v >> w;
            adj[u].push_back({v, w});
        }

        int s;
        cin >> s;

        vector<long long> dist(n, LLONG_MAX);
        vector<bool> inQueue(n, false);
        vector<int> cnt(n, 0);

        dist[s] = 0;
        queue<int> q;
        q.push(s);
        inQueue[s] = true;

        bool hasNegCycle = false;

        while (!q.empty()) {
            int u = q.front();
            q.pop();
            inQueue[u] = false;

            for (auto [v, w] : adj[u]) {
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    if (!inQueue[v]) {
                        q.push(v);
                        inQueue[v] = true;
                        cnt[v]++;
                        if (cnt[v] >= n) {
                            hasNegCycle = true;
                            break;
                        }
                    }
                }
            }
            if (hasNegCycle) break;
        }

        if (hasNegCycle) {
            cout << "Ton tai chu trinh am\n";
        } else {
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
    input = sys.stdin.readline

    n, m = map(int, input().split())
    adj = [[] for _ in range(n)]
    for _ in range(m):
        u, v, w = map(int, input().split())
        adj[u].append((v, w))

    s = int(input())
    dist = [float('inf')] * n
    in_queue = [False] * n
    cnt = [0] * n

    dist[s] = 0
    q = deque([s])
    in_queue[s] = True
    has_neg_cycle = False

    while q:
        u = q.popleft()
        in_queue[u] = False
        for v, w in adj[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                if not in_queue[v]:
                    q.append(v)
                    in_queue[v] = True
                    cnt[v] += 1
                    if cnt[v] >= n:
                        has_neg_cycle = True
                        break
        if has_neg_cycle:
            break

    if has_neg_cycle:
        print("Ton tai chu trinh am")
    else:
        print(' '.join(str(d if d != float('inf') else -1) for d in dist))
    ```
