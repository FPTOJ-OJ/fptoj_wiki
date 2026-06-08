# Bài 53: Chia căn & Mo's Algorithm - Xử lý truy vấn!

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** VNOI Wiki, CP-Algorithms

---

## Bạn sẽ học được gì?

- Sqrt Decomposition: chia mảng thành √N khối, tiền xử lý câu trả lời cho từng khối
- Mo's Algorithm: sắp xếp truy vấn offline để tối ưu số lần thêm/xóa phần tử
- Ứng dụng: đếm phần tử khác nhau trong đoạn, tần suất, truy vấn trên cây, v.v.

---

## 1. Sqrt Decomposition - Ý tưởng cơ bản

### 1.1. Tại sao cần chia căn?

Xét bài toán: cho mảng `A[0..N-1]`, có `Q` truy vấn:
- **Truy vấn 1:** Cập nhật `A[i] = val`
- **Truy vấn 2:** Tính tổng đoạn `[l, r]`

Cách trực tiếp: mỗi truy vấn tổng mất `O(N)`, tổng `O(NQ)` → TLE nếu `N, Q` lớn.

**Ý tưởng chia căn:** Chia mảng thành các khối kích thước `√N`. Mỗi khối lưu tổng của khối đó. Khi truy vấn, chỉ cần cộng tổng các khối đầy đủ + các phần tử lẻ ở hai đầu.

```matplotlib
N = np.linspace(100, 100000, 100)
naive = N
sqrt_N = np.sqrt(N)
mo = N * np.sqrt(N)
seg_tree = np.log2(N)

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

ax1.plot(N, naive, label='Brute force $O(N)$', color='#e74c3c', linewidth=2)
ax1.plot(N, sqrt_N, label='Sqrt $O(\\sqrt{N})$', color='#2ecc71', linewidth=2)
ax1.plot(N, seg_tree, label='Segment Tree $O(\\log N)$', color='#3498db', linewidth=2)
ax1.set_xlabel('N (kích thước mảng)')
ax1.set_ylabel('Thời gian mỗi truy vấn')
ax1.set_title('So sánh thời gian mỗi truy vấn')
ax1.legend(fontsize=9)
ax1.grid(True, alpha=0.3)

Q = np.linspace(100, 100000, 100)
brute_total = N * Q / 1000
sqrt_total = (N + Q) * np.sqrt(N) / 1000
mo_total = (N + Q) * np.sqrt(N) / 1000

ax2.plot(Q, brute_total, label='Brute force $O(NQ)$', color='#e74c3c', linewidth=2)
ax2.plot(Q, sqrt_total, label='Sqrt/Mo\'s $O((N+Q)\\sqrt{N})$', color='#2ecc71', linewidth=2)
ax2.set_xlabel('Q (số truy vấn)')
ax2.set_ylabel('Tổng thời gian (nghìn phép)')
ax2.set_title('Tổng thời gian xử lý Q truy vấn\n(N = 10000)')
ax2.legend(fontsize=9)
ax2.grid(True, alpha=0.3)

plt.tight_layout()
```

### 1.2. Cấu trúc khối

```
Mảng: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]   (N = 10)
Block size B = ⌈√10⌉ = 4

Block 0: [3, 1, 4, 1]  → sum = 9
Block 1: [5, 9, 2, 6]  → sum = 22
Block 2: [5, 3]        → sum = 8

Chỉ số khối của phần tử i: block_id = i / B
```

```
Visual representation:
Index:  0   1   2   3   4   5   6   7   8   9
Array: [3] [1] [4] [1] [5] [9] [2] [6] [5] [3]
        ├───Block 0───┤ ├───Block 1───┤ ├Blk 2┤
Sum:         9                22             8

Truy vấn [2, 7]:
Block 0: chỉ lấy A[2], A[3]  → 4 + 1 = 5  (phần lẻ trái)
Block 1: lấy cả khối          → 22          (khối đầy đủ)
Block 2: chỉ lấy A[6], A[7]  → 2 + 6 = 8  (phần lẻ phải)
Tổng = 5 + 22 + 8 = 35
```

### 1.3. Độ phức tạp

| Thao tác | Độ phức tạp |
|---|---|
| Tiền xử lý | `O(N)` |
| Truy vấn tổng `[l, r]` | `O(√N)` |
| Cập nhật điểm `A[i]` | `O(1)` |
| Tổng cho `Q` truy vấn | `O(N + Q√N)` |

### 1.4. Code đầy đủ - Range Sum Query with Point Update

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    struct SqrtDecomp {
        int n, blockSize;
        vector<int> arr, blocks;

        SqrtDecomp(const vector<int>& a) {
            n = a.size();
            blockSize = (int)ceil(sqrt(n));
            arr = a;
            blocks.assign(blockSize, 0);

            for (int i = 0; i < n; i++)
                blocks[i / blockSize] += arr[i];
        }

        void update(int idx, int val) {
            blocks[idx / blockSize] += val - arr[idx];
            arr[idx] = val;
        }

        int query(int l, int r) {
            int sum = 0;
            int bl = l / blockSize, br = r / blockSize;

            if (bl == br) {
                for (int i = l; i <= r; i++)
                    sum += arr[i];
            } else {
                // Phần lẻ bên trái
                for (int i = l; i < (bl + 1) * blockSize; i++)
                    sum += arr[i];
                // Các khối đầy đủ ở giữa
                for (int b = bl + 1; b < br; b++)
                    sum += blocks[b];
                // Phần lẻ bên phải
                for (int i = br * blockSize; i <= r; i++)
                    sum += arr[i];
            }
            return sum;
        }
    };

    int main() {
        ios::sync_with_stdio(false);
        cin.tie(nullptr);

        int n, q;
        cin >> n >> q;
        vector<int> a(n);
        for (int i = 0; i < n; i++) cin >> a[i];

        SqrtDecomp sd(a);

        while (q--) {
            int type;
            cin >> type;
            if (type == 1) { // Cập nhật
                int idx, val;
                cin >> idx >> val;
                sd.update(idx, val);
            } else { // Truy vấn tổng [l, r]
                int l, r;
                cin >> l >> r;
                cout << sd.query(l, r) << "\n";
            }
        }
        return 0;
    }
    ```

=== "Python"

    ```python
    import math

    class SqrtDecomp:
        def __init__(self, arr):
            self.n = len(arr)
            self.block_size = math.ceil(math.sqrt(self.n))
            self.arr = arr[:]
            self.blocks = [0] * self.block_size

            for i in range(self.n):
                self.blocks[i // self.block_size] += self.arr[i]

        def update(self, idx, val):
            block_id = idx // self.block_size
            self.blocks[block_id] += val - self.arr[idx]
            self.arr[idx] = val

        def query(self, l, r):
            total = 0
            bl = l // self.block_size
            br = r // self.block_size

            if bl == br:
                for i in range(l, r + 1):
                    total += self.arr[i]
            else:
                # Phần lẻ bên trái
                for i in range(l, (bl + 1) * self.block_size):
                    total += self.arr[i]
                # Các khối đầy đủ ở giữa
                for b in range(bl + 1, br):
                    total += self.blocks[b]
                # Phần lẻ bên phải
                for i in range(br * self.block_size, r + 1):
                    total += self.arr[i]
            return total

    n, q = map(int, input().split())
    a = list(map(int, input().split()))
    sd = SqrtDecomp(a)

    for _ in range(q):
        parts = list(map(int, input().split()))
        if parts[0] == 1:
            sd.update(parts[1], parts[2])
        else:
            print(sd.query(parts[1], parts[2]))
    ```

---

## 2. Sqrt Decomposition: Range Frequency Query

### 2.1. Bài toán

Cho mảng `A[0..N-1]`, truy vấn: đếm số lần giá trị `x` xuất hiện trong đoạn `[l, r]`.

### 2.2. Ý tưởng

Mỗi khối lưu một **bảng tần suất** (`map` hoặc mảng nếu giá trị nhỏ). Khi truy vấn:
- Các khối đầy đủ: tra bảng tần suất → `O(1)` mỗi khối
- Phần lẻ: đếm trực tiếp → `O(√N)`

### 2.3. Code

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    struct RangeFreq {
        int n, blockSize;
        vector<int> arr;
        vector<unordered_map<int,int>> blockFreq;

        RangeFreq(const vector<int>& a) {
            n = a.size();
            blockSize = max(1, (int)ceil(sqrt(n)));
            arr = a;
            int numBlocks = (n + blockSize - 1) / blockSize;
            blockFreq.resize(numBlocks);

            for (int i = 0; i < n; i++)
                blockFreq[i / blockSize][arr[i]]++;
        }

        // Đếm số lần x xuất hiện trong [l, r]
        int query(int l, int r, int x) {
            int cnt = 0;
            int bl = l / blockSize, br = r / blockSize;

            if (bl == br) {
                for (int i = l; i <= r; i++)
                    if (arr[i] == x) cnt++;
            } else {
                for (int i = l; i < (bl + 1) * blockSize; i++)
                    if (arr[i] == x) cnt++;
                for (int b = bl + 1; b < br; b++) {
                    auto it = blockFreq[b].find(x);
                    if (it != blockFreq[b].end())
                        cnt += it->second;
                }
                for (int i = br * blockSize; i <= r; i++)
                    if (arr[i] == x) cnt++;
            }
            return cnt;
        }
    };
    ```

=== "Python"

    ```python
    import math
    from collections import defaultdict

    class RangeFreq:
        def __init__(self, arr):
            self.n = len(arr)
            self.block_size = max(1, math.ceil(math.sqrt(self.n)))
            self.arr = arr[:]
            self.num_blocks = (self.n + self.block_size - 1) // self.block_size
            self.block_freq = [defaultdict(int) for _ in range(self.num_blocks)]

            for i in range(self.n):
                self.block_freq[i // self.block_size][self.arr[i]] += 1

        def query(self, l, r, x):
            cnt = 0
            bl = l // self.block_size
            br = r // self.block_size

            if bl == br:
                for i in range(l, r + 1):
                    if self.arr[i] == x:
                        cnt += 1
            else:
                for i in range(l, (bl + 1) * self.block_size):
                    if self.arr[i] == x:
                        cnt += 1
                for b in range(bl + 1, br):
                    cnt += self.block_freq[b].get(x, 0)
                for i in range(br * self.block_size, r + 1):
                    if self.arr[i] == x:
                        cnt += 1
            return cnt
    ```

---

## 3. Mo's Algorithm - Sắp xếp truy vấn offline

### 3.1. Tại sao cần Mo's Algorithm?

Sqrt Decomposition xử lý tốt mỗi truy vấn riêng lẻ, nhưng Mo's Algorithm xử lý **nhiều truy vấn cùng lúc** bằng cách sắp xếp chúng để tối thiểu số thay đổi giữa các truy vấn liên tiếp.

**Bài toán mẫu:** Cho mảng `A[0..N-1]`, có `Q` truy vấn: với mỗi `[l, r]`, tính một giá trị nào đó (tổng, số phần tử khác nhau, ...). Không có cập nhật.

### 3.2. Ý tưởng cốt lõi

1. **Offline:** Xử lý tất cả truy vấn cùng lúc, không theo thứ tự nhập
2. **Sắp xếp truy vấn:** Sắp xếp theo `(block của L, R)` để minimize số phần tử thêm/xóa
3. **Hai con trỏ:** Duy trì đoạn `[curL, curR]` hiện tại, thêm/xóa phần tử để chuyển sang truy vấn tiếp theo

### 3.3. Cách sắp xếp (Mo's Order)

```
Sắp xếp truy vấn (l, r) theo:
  1. block_id = l / blockSize  (tăng dần)
  2. Nếu cùng block: r tăng dần (block chẵn) hoặc r giảm dần (block lẻ)
     → đây là "odd-even optimization" để tăng cache hit
```

```
Visualization - Các truy vấn được sắp xếp:

Block size B = 3, Mảng N = 10

Block 0 (idx 0-2):  Q1(0,4)  Q2(1,3)  Q5(2,7)
Block 1 (idx 3-5):  Q3(3,8)  Q6(4,6)
Block 2 (idx 6-8):  Q4(7,9)  Q7(6,9)
Block 3 (idx 9-9):  Q8(9,9)

R di chuyển trong mỗi block:
  Block 0: R → → → (tăng)
  Block 1: R ← ← ← (giảm, vì block lẻ)
  Block 2: R → → → (tăng)
  Block 3: R →     (tăng)

Tổng di chuyển của R: O(N × √N) vì R quét qua lại tối đa √N lần
Tổng di chuyển của L: O(Q × √N) vì mỗi truy vấn L di chuyển tối đa √N
→ Tổng: O((N + Q) × √N)
```

### 3.4. Code Mo's Algorithm (khung cơ bản)

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    int blockSize;

    struct Query {
        int l, r, idx;
        bool operator<(const Query& other) const {
            int blockA = l / blockSize, blockB = other.l / blockSize;
            if (blockA != blockB) return blockA < blockB;
            // Odd-even optimization
            return (blockA & 1) ? (r > other.r) : (r < other.r);
        }
    };

    int main() {
        ios::sync_with_stdio(false);
        cin.tie(nullptr);

        int n, q;
        cin >> n >> q;
        vector<int> a(n);
        for (int i = 0; i < n; i++) cin >> a[i];

        blockSize = max(1, (int)sqrt(n));
        vector<Query> queries(q);
        for (int i = 0; i < q; i++) {
            cin >> queries[i].l >> queries[i].r;
            queries[i].idx = i;
        }
        sort(queries.begin(), queries.end());

        vector<long long> ans(q);
        long long curAns = 0;
        int curL = 0, curR = -1;

        auto add = [&](int pos) {
            // Thêm phần tử a[pos] vào đoạn hiện tại
            // Cập nhật curAns tùy bài toán
        };
        auto remove = [&](int pos) {
            // Xóa phần tử a[pos] khỏi đoạn hiện tại
            // Cập nhật curAns tùy bài toán
        };

        for (auto& qr : queries) {
            while (curL > qr.l) add(--curL);
            while (curR < qr.r) add(++curR);
            while (curL < qr.l) remove(curL++);
            while (curR > qr.r) remove(curR--);
            ans[qr.idx] = curAns;
        }

        for (int i = 0; i < q; i++)
            cout << ans[i] << "\n";
        return 0;
    }
    ```

=== "Python"

    ```python
    import math

    block_size = 1

    def mo_algorithm(arr, queries):
        n = len(arr)
        q = len(queries)
        global block_size
        block_size = max(1, int(math.sqrt(n)))

        # queries[i] = (l, r, idx)
        def mo_order(query):
            l, r, idx = query
            block_id = l // block_size
            # Odd-even optimization
            return (block_id, r if block_id % 2 == 0 else -r)

        queries.sort(key=mo_order)

        ans = [0] * q
        cur_l, cur_r = 0, -1
        cur_ans = 0

        def add(pos):
            nonlocal cur_ans
            # Thêm arr[pos] vào đoạn, cập nhật cur_ans
            pass

        def remove(pos):
            nonlocal cur_ans
            # Xóa arr[pos] khỏi đoạn, cập nhật cur_ans
            pass

        for l, r, idx in queries:
            while cur_l > l:
                cur_l -= 1
                add(cur_l)
            while cur_r < r:
                cur_r += 1
                add(cur_r)
            while cur_l < l:
                remove(cur_l)
                cur_l += 1
            while cur_r > r:
                remove(cur_r)
                cur_r -= 1
            ans[idx] = cur_ans

        return ans
    ```

---

## 4. Mo's Algorithm - Xử lý từng bước

### 4.1. Ví dụ minh họa chi tiết

Cho mảng `A = [1, 2, 1, 3, 2, 1]`, `N = 6`, và 3 truy vấn:
- Q0: `[0, 2]` → đếm số phần tử khác nhau
- Q1: `[1, 4]`
- Q2: `[0, 5]`

**Block size = ⌈√6⌉ = 3**

```
Bước 0: Sắp xếp truy vấn
  Q0: (l=0, r=2) → block = 0/3 = 0
  Q1: (l=1, r=4) → block = 1/3 = 0
  Q2: (l=0, r=5) → block = 0/3 = 0
  Sắp xếp theo (block, r): Q0(0,2), Q1(1,4), Q2(0,5)
  → Thứ tự xử lý: Q0 → Q1 → Q2

Bước 1: Xử lý Q0 [0, 2]
  curL=0, curR=-1 (đoạn rỗng)

  add(0): arr[0]=1, freq[1]=1, distinct=1    curR→0
  add(1): arr[1]=2, freq[2]=1, distinct=2    curR→1
  add(2): arr[2]=1, freq[1]=2, distinct=2    curR→2

  Kết quả Q0 = 2  ✓  (đoạn [1,2,1] có 2 giá trị khác nhau)

  Trạng thái: curL=0, curR=2, freq={1:2, 2:1}, distinct=2

Bước 2: Xử lý Q1 [1, 4]
  Cần: curL=1, curR=4
  Hiện tại: curL=0, curR=2

  remove(0): arr[0]=1, freq[1]=1, distinct=2  curL→1
  add(3):    arr[3]=3, freq[3]=1, distinct=3  curR→3
  add(4):    arr[4]=2, freq[2]=2, distinct=3  curR→4

  Kết quả Q1 = 3  ✓  (đoạn [2,1,3,2] có 3 giá trị khác nhau)

  Trạng thái: curL=1, curR=4, freq={1:1, 2:2, 3:1}, distinct=3

Bước 3: Xử lý Q2 [0, 5]
  Cần: curL=0, curR=5
  Hiện tại: curL=1, curR=4

  add(--curL):  arr[0]=1, freq[1]=2, distinct=3  curL→0
  add(++curR):  arr[5]=1, freq[1]=3, distinct=3  curR→5

  Kết quả Q2 = 3  ✓  (đoạn [1,2,1,3,2,1] có 3 giá trị khác nhau)
```

```
Tóm tắt di chuyển con trỏ:

  Q0 [0,2]: add 0, add 1, add 2           (3 thao tác)
  Q1 [1,4]: remove 0, add 3, add 4        (3 thao tác)
  Q2 [0,5]: add 0, add 5                  (2 thao tác)
  ─────────────────────────────────────
  Tổng: 8 thao tác (thay vì 3 × 6 = 18 nếu xử lý riêng lẻ)
```

---

## 5. Bài toán mẫu: Đếm phần tử khác nhau trong đoạn (DQUERY)

### 5.1. Đề bài

Cho mảng `A[0..N-1]` và `Q` truy vấn `[l, r]`. Với mỗi truy vấn, đếm số **phần tử khác nhau** trong đoạn `[l, r]`.

**Ràng buộc:** `1 ≤ N, Q ≤ 300,000`, `1 ≤ A[i] ≤ 10^6`

### 5.2. Phân tích

- State: mảng tần suất `freq[val]` + biến `distinct` đếm số giá trị có `freq > 0`
- `add(pos)`: `freq[A[pos]]++; if (freq[A[pos]] == 1) distinct++`
- `remove(pos)`: `freq[A[pos]]--; if (freq[A[pos]] == 0) distinct--`

### 5.3. Code đầy đủ

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    const int MAXVAL = 1000001;
    int freq[MAXVAL];

    int blockSize;

    struct Query {
        int l, r, idx;
        bool operator<(const Query& other) const {
            int bl = l / blockSize, br = other.l / blockSize;
            if (bl != br) return bl < br;
            return (bl & 1) ? (r > other.r) : (r < other.r);
        }
    };

    int main() {
        ios::sync_with_stdio(false);
        cin.tie(nullptr);

        int n;
        cin >> n;
        vector<int> a(n);
        for (int i = 0; i < n; i++) cin >> a[i];

        int q;
        cin >> q;
        blockSize = max(1, (int)sqrt(n));
        vector<Query> queries(q);
        for (int i = 0; i < q; i++) {
            cin >> queries[i].l >> queries[i].r;
            queries[i].l--; queries[i].r--; // 0-indexed
            queries[i].idx = i;
        }
        sort(queries.begin(), queries.end());

        vector<int> ans(q);
        int distinct = 0;
        int curL = 0, curR = -1;

        auto add = [&](int pos) {
            if (freq[a[pos]] == 0) distinct++;
            freq[a[pos]]++;
        };
        auto remove = [&](int pos) {
            freq[a[pos]]--;
            if (freq[a[pos]] == 0) distinct--;
        };

        for (auto& qr : queries) {
            while (curL > qr.l) add(--curL);
            while (curR < qr.r) add(++curR);
            while (curL < qr.l) remove(curL++);
            while (curR > qr.r) remove(curR--);
            ans[qr.idx] = distinct;
        }

        for (int i = 0; i < q; i++)
            cout << ans[i] << "\n";
        return 0;
    }
    ```

=== "Python"

    ```python
    import math, sys
    input = sys.stdin.readline

    def main():
        n = int(input())
        a = list(map(int, input().split()))
        q = int(input())

        queries = []
        for i in range(q):
            l, r = map(int, input().split())
            queries.append((l - 1, r - 1, i))

        block_size = max(1, int(math.sqrt(n)))
        queries.sort(key=lambda x: (x[0] // block_size,
                                    x[1] if (x[0] // block_size) % 2 == 0 else -x[1]))

        MAXVAL = max(a) + 1
        freq = [0] * MAXVAL
        distinct = 0
        cur_l, cur_r = 0, -1
        ans = [0] * q

        def add(pos):
            nonlocal distinct
            if freq[a[pos]] == 0:
                distinct += 1
            freq[a[pos]] += 1

        def remove(pos):
            nonlocal distinct
            freq[a[pos]] -= 1
            if freq[a[pos]] == 0:
                distinct -= 1

        for l, r, idx in queries:
            while cur_l > l:
                cur_l -= 1
                add(cur_l)
            while cur_r < r:
                cur_r += 1
                add(cur_r)
            while cur_l < l:
                remove(cur_l)
                cur_l += 1
            while cur_r > r:
                remove(cur_r)
                cur_r -= 1
            ans[idx] = distinct

        print('\n'.join(map(str, ans)))

    main()
    ```

---

## 6. Mo's Algorithm trên cây (Mo's on Trees)

### 6.1. Bài toán

Cho cây `N` đỉnh, mỗi đỉnh có giá trị. Truy vấn: với hai đỉnh `(u, v)`, tính giá trị nào đó trên **đường đi** từ `u` đến `v`.

### 6.2. Ý tưởng: Euler Tour

Biến cây thành mảng bằng **Euler Tour** (duyệt DFS, ghi lại thời điểm vào/ra):

```
Cây:        1
           / \
          2   3
         / \
        4   5

Euler Tour (in/out):
  in[1]=0, in[2]=1, in[4]=2, in[4]=3, in[5]=4, in[5]=5,
  in[2]=6, in[3]=7, in[3]=8, in[1]=9

  Mảng E: [1, 2, 4, 4, 5, 5, 2, 3, 3, 1]
```

### 6.3. XOR Trick cho Path Query

Với truy vấn đường đi `(u, v)`, giả sử `in[u] ≤ in[v]`:

- Nếu `u` là tổ tiên của `v`: xét đoạn `[in[u], in[v]]` trong Euler Tour
- Ngược lại: xét đoạn `[out[u], in[v]]` (hoặc `[in[u], in[v]]` tùy cách cài đặt) cộng thêm LCA

**XOR Trick:** Dùng mảng `visited[]` để đánh dấu. Khi thêm/xóa đỉnh, XOR bit visited:
- Nếu đỉnh xuất hiện 2 lần trong đoạn → hủy nhau (tương đương không nằm trên đường đi)
- Nếu xuất hiện 1 lần → nằm trên đường đi

```
Ví dụ: Truy vấn đường đi (4, 5)
  LCA(4, 5) = 2

  Nếu dùng đoạn [out[4], in[5]] = [3, 4]:
    E[3] = 4 (out), E[4] = 5 (in)
    visited[4] ^= 1 → 1 (thêm 4)
    visited[5] ^= 1 → 1 (thêm 5)
    → Đoạn {4, 5} nhưng thiếu LCA = 2

  → Thêm LCA vào nếu cần (nếu LCA không nằm trong đoạn)
```

### 6.4. Code Mo's on Trees

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    const int MAXN = 100005;
    const int LOG = 17;

    vector<int> adj[MAXN];
    int val[MAXN], in[MAXN], out[MAXN], euler[2 * MAXN];
    int par[MAXN][LOG], depth[MAXN];
    int timer = 0;

    void dfs(int u, int p) {
        in[u] = timer;
        euler[timer++] = u;
        par[u][0] = p;
        depth[u] = (p == -1) ? 0 : depth[p] + 1;
        for (int i = 1; i < LOG; i++)
            par[u][i] = (par[u][i-1] == -1) ? -1 : par[par[u][i-1]][i-1];
        for (int v : adj[u])
            if (v != p) dfs(v, u);
        out[u] = timer;
        euler[timer++] = u;
    }

    int lca(int u, int v) {
        if (depth[u] < depth[v]) swap(u, v);
        for (int i = LOG - 1; i >= 0; i--)
            if (par[u][i] != -1 && depth[par[u][i]] >= depth[v])
                u = par[u][i];
        if (u == v) return u;
        for (int i = LOG - 1; i >= 0; i--)
            if (par[u][i] != par[v][i])
                u = par[u][i], v = par[v][i];
        return par[u][0];
    }

    int blockSize;
    bool visited[MAXN];
    int freq[MAXN]; // Tần suất giá trị trên đường đi hiện tại
    int distinct = 0;

    struct Query {
        int l, r, lca_node, idx;
        bool operator<(const Query& other) const {
            int bl = l / blockSize, br = other.l / blockSize;
            if (bl != br) return bl < br;
            return (bl & 1) ? (r > other.r) : (r < other.r);
        }
    };

    void toggle(int node) {
        if (visited[node]) {
            freq[val[node]]--;
            if (freq[val[node]] == 0) distinct--;
        } else {
            if (freq[val[node]] == 0) distinct++;
            freq[val[node]]++;
        }
        visited[node] = !visited[node];
    }

    int main() {
        int n, q;
        cin >> n >> q;
        for (int i = 0; i < n; i++) cin >> val[i];

        // Đọc cây, xây dựng Euler Tour
        for (int i = 0; i < n - 1; i++) {
            int u, v; cin >> u >> v;
            adj[u].push_back(v);
            adj[v].push_back(u);
        }
        memset(par, -1, sizeof(par));
        dfs(0, -1);

        blockSize = max(1, (int)sqrt(2 * n));
        vector<Query> queries(q);
        for (int i = 0; i < q; i++) {
            int u, v; cin >> u >> v;
            if (in[u] > in[v]) swap(u, v);
            int w = lca(u, v);
            if (w == u) { // u là tổ tiên của v
                queries[i] = {in[u], in[v], -1, i};
            } else {
                queries[i] = {out[u], in[v], w, i};
            }
        }
        sort(queries.begin(), queries.end());

        vector<int> ans(q);
        int curL = 0, curR = -1;

        for (auto& qr : queries) {
            while (curL > qr.l) toggle(euler[--curL]);
            while (curR < qr.r) toggle(euler[++curR]);
            while (curL < qr.l) toggle(euler[curL++]);
            while (curR > qr.r) toggle(euler[curR--]);

            // Nếu LCA không nằm trong đoạn, thêm vào
            if (qr.lca_node != -1)
                toggle(qr.lca_node);

            ans[qr.idx] = distinct;

            // Hoàn tác nếu đã thêm LCA
            if (qr.lca_node != -1)
                toggle(qr.lca_node);
        }

        for (int i = 0; i < q; i++)
            cout << ans[i] << "\n";
        return 0;
    }
    ```

---

## 7. Mo's với cập nhật (Mo's 3D)

### 7.1. Bài toán

Giống DQUERY nhưng có thêm **cập nhật**: `A[i] = val`. Cần xử lý cả truy vấn truy xuất lẫn cập nhật.

### 7.2. Ý tưởng: Thêm chiều thời gian

Mỗi truy vấn truy xuất giờ có 3 tham số: `(l, r, t)` — thời điểm `t` là số cập nhật đã xảy ra trước đó.

**Sắp xếp:** `(block_l, block_r, t)` với block size = `N^(2/3)`.

```
Block size:
  blockL = N^(2/3)
  blockR = N^(2/3)

  Sắp xếp theo (l/blockL, r/blockR, t)
  → Độ phức tạp: O(N^(5/3)) mỗi truy vấn
  → Tổng: O(Q × N^(5/3))
```

### 7.3. Code khung

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    int blockSize;
    int curTime = 0; // Số cập nhật đã áp dụng

    struct Query {
        int l, r, t, idx;
        bool operator<(const Query& o) const {
            if (l / blockSize != o.l / blockSize)
                return l / blockSize < o.l / blockSize;
            if (r / blockSize != o.r / blockSize)
                return r / blockSize < o.r / blockSize;
            return t < o.t;
        }
    };

    struct Update {
        int pos, oldVal, newVal;
    };

    int main() {
        int n, q;
        cin >> n >> q;
        vector<int> a(n);
        for (int i = 0; i < n; i++) cin >> a[i];

        vector<Query> queries;
        vector<Update> updates;
        int updateCount = 0;

        blockSize = max(1, (int)pow(n, 2.0/3.0));

        for (int i = 0; i < q; i++) {
            char type;
            cin >> type;
            if (type == 'Q') {
                int l, r;
                cin >> l >> r;
                queries.push_back({l, r, updateCount, (int)queries.size()});
            } else {
                int pos, val;
                cin >> pos >> val;
                updates.push_back({pos, -1, val}); // oldVal sẽ cập nhật sau
                updateCount++;
            }
        }

        // Xử lý Mo's với chiều thời gian
        // add(pos), remove(pos), applyUpdate(t), undoUpdate(t)
        // Tương tự Mo's thường nhưng thêm apply/undo update

        return 0;
    }
    ```

### 7.4. Hàm apply/undo update

```cpp
void applyUpdate(Update& u, int curL, int curR) {
    // Cập nhật giá trị tại u.pos
    // Nếu u.pos nằm trong [curL, curR]: remove old, add new
    a[u.pos] = u.newVal;
}

void undoUpdate(Update& u, int curL, int curR) {
    // Hoàn tác cập nhật
    a[u.pos] = u.oldVal;
}
```

---

## 8. Hilbert Curve Optimization

### 8.1. Vấn đề với Mo's thường

Mo's sắp xếp theo `(block_l, block_r)` tạo ra thứ tự zigzag. Hilbert Curve tạo thứ tự **liên tục hơn** về mặt không gian 2D, giảm cache miss.

### 8.2. Hilbert Order

Hilbert Curve là đường cong lấp đầy không gian 2D. Mỗi điểm `(x, y)` có một giá trị Hilbert order. Sắp xếp truy vấn theo Hilbert order của `(l, r)`.

```
Hilbert Curve (level 2):
┌───┬───┐
│ 1 │ 2 │
│   │   │
├───┼───┤
│ 0 │ 3 │
│   │   │
└───┴───┘

Thứ tự duyệt: (0,0)→(0,1)→(1,1)→(1,0)
→ Các điểm gần nhau trên đường cong gần nhau trên mặt phẳng
```

### 8.3. Code Hilbert Order

=== "C++"

    ```cpp
    // Tính Hilbert order cho điểm (x, y) trong lưới 2^n × 2^n
    inline long long hilbertOrder(int x, int y, int pow = 21, int rotate = 0) {
        if (pow == 0) return 0;
        int hpow = 1 << (pow - 1);
        int seg = (x < hpow) ? ((y < hpow) ? 0 : 3) : ((y < hpow) ? 1 : 2);
        seg = (seg + rotate) & 3;
        int nx = x & (x ^ hpow), ny = y & (y ^ hpow);
        int nrot = (rotate + [3, 0, 0, 1][seg]) & 3;
        long long subSquareSize = 1LL << (2 * pow - 2);
        long long ans = seg * subSquareSize;
        long long add = hilbertOrder(nx, ny, pow - 1, nrot);
        ans += (seg == 1 || seg == 2) ? add : (subSquareSize - add - 1);
        return ans;
    }

    struct Query {
        int l, r, idx;
        long long ord;
        void computeOrder() {
            ord = hilbertOrder(l, r);
        }
        bool operator<(const Query& o) const {
            return ord < o.ord;
        }
    };
    ```

=== "Python"

    ```python
    def hilbert_order(x, y, pow=21, rotate=0):
        if pow == 0:
            return 0
        hpow = 1 << (pow - 1)
        seg = (0 if x < hpow else (3 if y < hpow else 1)) if y < hpow else (2 if x < hpow else 1)
        # Simplified version
        if x < hpow:
            if y < hpow:
                seg = 0
            else:
                seg = 3
        else:
            if y < hpow:
                seg = 1
            else:
                seg = 2
        seg = (seg + rotate) & 3
        nx = x & (x ^ hpow)
        ny = y & (y ^ hpow)
        nrot = (rotate + [3, 0, 0, 1][seg]) & 3
        sub_square_size = 1 << (2 * pow - 2)
        ans = seg * sub_square_size
        add = hilbert_order(nx, ny, pow - 1, nrot)
        if seg == 1 or seg == 2:
            ans += add
        else:
            ans += sub_square_size - add - 1
        return ans
    ```

### 8.4. So sánh hiệu suất

| Phương pháp | Số lần di chuyển con trỏ | Cache behavior |
|---|---|---|
| Mo's thường | `O(N√N)` | Kém (zigzag) |
| Hilbert Mo's | `O(N√N)` | Tốt hơn (liên tục) |

Hilbert Mo's không giảm độ phức tạp lý thuyết nhưng **hệ số nhỏ hơn đáng kể** trong thực tế.

---

## 9. Lưu ý & Cạm bẫy

### 9.1. Chọn Block Size

```
Mo's thường:      blockSize = √N
Mo's 3D (updates): blockSize = N^(2/3)
Mo's 2D:          blockSize = N^(2/3) cho cả hai chiều

Thực tế: thử nghiệm với N^(2/3) hoặc N/sqrt(Q) thường cho kết quả tốt
```

### 9.2. Off-by-one trong add/remove

```cpp
// SAI: curL và curR xử lý không đối xứng
while (curL > qr.l) add(--curL);   // Thêm bên trái: giảm trước
while (curR < qr.r) add(++curR);   // Thêm bên phải: tăng trước
while (curL < qr.l) remove(curL++); // Xóa bên trái: tăng sau
while (curR > qr.r) remove(curR--); // Xóa bên phải: giảm sau

// Đây là pattern đúng! Đảm bảo curL và curR luôn nằm trong đoạn [curL, curR]
```

### 9.3. Quên sắp xếp đúng

```cpp
// SAI: chỉ sắp xếp theo l/blockSize
sort(queries.begin(), queries.end(),
     [](Query a, Query b) { return a.l/B < b.l/B; });

// ĐÚNG: sắp xếp theo (l/blockSize, r) với odd-even optimization
```

### 9.4. TLE với hằng số lớn

- Dùng `unordered_map` thay vì mảng nếu giá trị nhỏ → **TLE**
- Dùng `map` thay vì `unordered_map` → **TLE**
- Quên `ios::sync_with_stdio(false); cin.tie(nullptr);` → **TLE**
- Lambda capture `[&]` chậm hơn function object trong một số trường hợp

### 9.5. Các lỗi thường gặp khác

```
1. Quên 0-indexed: Đề bài cho 1-indexed → phải trừ 1
2. Quên hoàn tác LCA trong Mo's on Trees
3. Block size = 0 khi N = 1 → chia cho 0 → RE
4. Giá trị âm trong freq array → cần offset hoặc dùng map
5. Không xử lý trùng LCA trong Mo's on Trees
```

---

## 10. Bảng tổng hợp độ phức tạp

| Thuật toán | Block Size | Mỗi truy vấn | Tổng |
|---|---|---|---|
| Sqrt Decomposition | `√N` | `O(√N)` | `O(N + Q√N)` |
| Mo's Algorithm | `√N` | `O(√N)` amortized | `O((N+Q)√N)` |
| Mo's 3D (với updates) | `N^(2/3)` | `O(N^(2/3))` amortized | `O(Q × N^(2/3))` |
| Hilbert Mo's | — | `O(√N)` amortized | `O((N+Q)√N)` với hằng số tốt hơn |

---

## 11. Bài tập luyện tập

| STT | Bài | Nguồn | Độ khó | Ghi chú |
|---|---|---|---|---|
| 1 | DQUERY | SPOJ | ★★★ | Đếm phần tử khác nhau - Mo's kinh điển |
| 2 | Powerful array | CF 86D | ★★★ | Tần suất × giá trị |
| 3 | COT2 | SPOJ | ★★★★ | Mo's trên cây |
| 4 | Machine Learning | CF 940F | ★★★★ | Mo's 3D (với updates) |
| 5 | Count on a Tree II | SPOJ | ★★★★ | Mo's trên cây, đếm khác nhau |
| 6 | Xor Tree | CF 220B | ★★★ | Mo's + xor |
| 7 | Number of Different | CF 246E | ★★★★ | Mo's on tree + theo tầng |
| 8 | Array and Operations | CF 444C | ★★★ | Sqrt + lazy |
| 9 | Good Subsegments | CF 1237D | ★★★★ | Mo's + sliding window |
| 10 | Balanced Cow Subsets | USACO | ★★★★ | Meet in the middle + Sqrt |
| 11 | [CSES - Dynamic Range Sum Queries](https://cses.fi/problemset/task/1648) | CSES | ★★☆ | Sqrt decomposition cơ bản |
| 12 | [CSES - Dynamic Range Min Queries](https://cses.fi/problemset/task/1649) | CSES | ★★☆ | Sqrt + min |
| 13 | [CSES - Range Xor Queries](https://cses.fi/problemset/task/1650) | CSES | ★★☆ | Sqrt + xor |
| 14 | [VNOJ - DQUERY](https://oj.vnoi.info/problem/dquery) | VNOJ | ★★★ | Mo's Algorithm kinh điển |
| 15 | [VNOJ - NKLINEUP](https://oj.vnoi.info/problem/nklineup) | VNOJ | ★★☆ | Min/max range query |

---

## 12. Tổng kết

```
┌─────────────────────────────────────────────────────────────┐
│                    Sqrt Decomposition                       │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌────┐               │
│  │ Block 0 │ │ Block 1 │ │ Block 2 │ │ ...│               │
│  │  sum=9  │ │ sum=22  │ │ sum=8   │ │    │               │
│  └─────────┘ └─────────┘ └─────────┘ └────┘               │
│  Query [l,r] = partial_left + full_blocks + partial_right   │
│  Độ phức tạp: O(√N) mỗi truy vấn                           │
├─────────────────────────────────────────────────────────────┤
│                      Mo's Algorithm                         │
│  Sắp xếp: (block_l, block_r) → O(√N) thay đổi giữa queries │
│                                                               │
│  Q1 ──→ Q2 ──→ Q3 ──→ Q4                                    │
│  [0,5]  [2,7]  [1,3]  [4,8]                                  │
│    │       │       │       │                                  │
│    └───────┴───────┴───────┘                                  │
│    Chỉ thêm/xóa vài phần tử giữa các truy vấn              │
│                                                               │
│  Độ phức tạp: O((N+Q)√N)                                    │
├─────────────────────────────────────────────────────────────┤
│  Nâng cao:                                                    │
│  • Mo's on Trees: Euler Tour + Mo's                          │
│  • Mo's 3D: thêm chiều thời gian, block = N^(2/3)           │
│  • Hilbert Mo's: sắp xếp theo Hilbert curve                 │
└─────────────────────────────────────────────────────────────┘
```

**Khi nào dùng Sqrt Decomposition?**
- Cần cập nhật điểm + truy vấn đoạn → Sqrt Decomposition
- Nhiều truy vấn offline, không cập nhật → Mo's Algorithm
- Nhiều truy vấn offline + có cập nhật → Mo's 3D
- Truy vấn trên đường đi cây → Mo's on Trees

**Khi nào KHÔNG dùng?**
- Cần `O(log N)` mỗi truy vấn → dùng Segment Tree / BIT
- Có cập nhật đoạn → dùng Segment Tree với lazy propagation
- Dữ liệu nhỏ → dùng cách trực tiếp, không cần phức tạp hóa
