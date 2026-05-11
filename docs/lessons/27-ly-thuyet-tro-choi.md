# Bài 27: Lý Thuyết Trò Chơi - Ai Thắng?

> **Tác giả:** Hà Trí Kiên
> **Nội dung tham khảo từ:** VNOI Wiki, CP-Algorithms, Errichto

---

## Mục lục

1. [Tổng quan](#1-tổng-quan)
2. [Trò chơi Nim](#2-trò-chơi-nim)
3. [P-position và N-position](#3-p-position-và-n-position)
4. [Grundy Number (Sprague-Grundy)](#4-grundy-number-sprague-grundy)
5. [Tính Grundy số từng bước - Ví dụ chi tiết](#5-tính-grundy-số-từng-bước---ví-dụ-chi-tiết)
6. [Tổng hợp trò chơi (Game Sum)](#6-tổng-hợp-trò-chơi-game-sum)
7. [Ứng dụng thực tế](#7-ứng-dụng-thực-tế)
8. [Lưu ý / Cạm bẫy](#8-lưu-ý--cạm-bẫy)
9. [Bài tập luyện tập](#9-bài-tập-luyện-tập)
10. [Tài liệu tham khảo](#10-tài-liệu-tham-khảo)

---

## 1. Tổng quan

### Lý thuyết trò chơi trong CP là gì?

Trong competitive programming, "lý thuyết trò chơi" đề cập đến một lớp bài toán where:

- Có **2 người chơi luân phiên** thực hiện nước đi
- Cả hai đều chơi **hoàn hảo** (không bao giờ mắc sai lầm)
- Trò chơi **không có yếu tố ngẫu nhiên** (deterministic)
- Trò chơi **kết thúc hữu hạn** (không ai thắng)

> **Câu hỏi cốt lõi:** Cho trạng thái ban đầu, người đi trước thắng hay người đi sau thắng?

### Tư duy cốt lõi: "Người thông minh không bao giờ thua"

Hãy tưởng tượng bạn đang chơi cờ. Nếu bạn có thể **ép đối thủ vào thế bất lợi** bất kể đối thủ làm gì, bạn thắng. Lý thuyết trò chơi giúp chúng ta xác định chính xác "thế bất lợi" đó là gì.

---

## 2. Trò chơi Nim

### Bài toán gốc

Có **N đống đá**, mỗi đống có `a[i]` viên. Hai người luân phiên lấy đá:

- Mỗi lượt lấy **≥ 1 viên** từ **đúng 1 đống**
- Ai lấy viên cuối cùng **thắng** (normal play)

### Tại sao XOR liên quan?

Đây là câu hỏi mà nhiều người học lần đầu thắc mắc. Hãy nghĩ đơn giản:

> **XOR là phép toán "không nhớ"** - nó phát hiện sự bất đối xứng giữa các đống.

**Ví dụ trực quan:**

```
Đống A: 3 viên  →  011 (nhị phân)
Đống B: 5 viên  →  101 (nhị phân)
Đống C: 6 viên  →  110 (nhị phân)

XOR = 011 ⊕ 101 ⊕ 110 = 000 (= 0) → Người đi trước THUA
```

Khi XOR = 0, các đống "cân bằng hoàn hảo". Bất kỳ nước đi nào cũng phá vỡ sự cân bằng này, và đối thủ thông minh sẽ khôi phục lại trạng thái XOR = 0.

### Kết luận kinh điển

```
a[1] ⊕ a[2] ⊕ ... ⊕ a[n] ≠ 0  →  Người đi trước THẮNG (N-position)
a[1] ⊕ a[2] ⊕ ... ⊕ a[n] = 0  →  Người đi trước THUA  (P-position)
```

### Chứng minh ngắn gọn

**Nếu XOR ≠ 0 (người đi trước thắng):**

1. Gọi `s = a[1] ⊕ a[2] ⊕ ... ⊕ a[n] ≠ 0`
2. Tìm bit cao nhất của `s`, giả sử là bit thứ `k`
3. Chọn đống `i` mà bit thứ `k` của `a[i]` là 1
4. Đặt `a[i]' = a[i] ⊕ s` → khi đó `a[i]' < a[i]` (vì bit cao nhất bị tắt)
5. Lấy `a[i] - a[i]'` viên từ đống `i`
6. XOR mới = `s ⊕ a[i] ⊕ a[i]' = s ⊕ a[i] ⊕ (a[i] ⊕ s) = 0` → đối thủ nhận XOR = 0

**Nếu XOR = 0 (người đi trước thua):**

- Bất kỳ nước đi nào cũng làm XOR ≠ 0
- Đối thủ luôn có thể đưa XOR về 0 (theo logic trên)
- Cuối cùng, trạng thái (0, 0, ..., 0) có XOR = 0 → người đi trước không còn nước đi

### Code

```cpp
// Kiểm tra người đi trước có thắng không
bool firstPlayerWins(vector<int>& piles) {
    int xorSum = 0;
    for (int x : piles) xorSum ^= x;
    return xorSum != 0;
}

// Tìm nước đi tối ưu (nếu thắng)
pair<int,int> findWinningMove(vector<int>& piles) {
    int xorSum = 0;
    for (int x : piles) xorSum ^= x;
    if (xorSum == 0) return {-1, -1}; // Không có nước thắng

    for (int i = 0; i < piles.size(); i++) {
        int target = piles[i] ^ xorSum;
        if (target < piles[i]) {
            return {i, piles[i] - target}; // Lấy từ đống i, lấy pile[i]-target viên
        }
    }
    return {-1, -1};
}
```

```python
def first_player_wins(piles):
    xor_sum = 0
    for x in piles:
        xor_sum ^= x
    return xor_sum != 0
```

---

## 3. P-position và N-position

Đây là khái niệm nền tảng cho toàn bộ lý thuyết trò chơi:

| Ký hiệu | Nghĩa | Điều kiện |
|----------|-------|-----------|
| **P-position** | **P**revious player wins (người **vừa đi** thắng) | Grundy = 0 |
| **N-position** | **N**ext player wins (người **sắp đi** thắng) | Grundy ≠ 0 |

> **Mẹo nhớ:** P = "Previous" = người đi trước **thua** (vì người vừa đi = người đi trước thắng). N = "Next" = người sắp đi **thắng**.

### Quy tắc chuyển trạng thái

```
- Mọi trạng thái mà có thể đi đến ≥ 1 P-position → N-position
- Mọi trạng thái mà TẤT CẢ nước đi đều dẫn đến N-position → P-position
- Trạng thái kết thúc (không có nước đi) → P-position (người đến lượt thua)
```

**Ví dụ đơn giản:** Nếu bạn đang ở trạng thái mà bất kỳ nước đi nào cũng đưa đối thủ vào thế thắng (N-position), thì bạn đang ở P-position (bạn thua).

---

## 4. Grundy Number (Sprague-Grundy)

### Tại sao cần Grundy?

Nim chỉ áp dụng cho trò chơi "lấy đá từ đống". Nhưng rất nhiều bài toán CP phức tạp hơn:

- Lấy đá với giới hạn số viên
- Đi trên đồ thị có hướng
- Chia đống đá

**Grundy number mở rộng** khái niệm Nim cho **bất kỳ trò chơi nào** thoả mãn điều kiện Sprague-Grundy.

### Định nghĩa

```
Grundy(state) = MEX{ Grundy(next_state) | next_state là trạng thái có thể đi được }

MEX(S) = giá trị nguyên không âm nhỏ nhất KHÔNG có trong tập S
```

> **MEX là gì?** Nếu S = {0, 1, 3} thì MEX(S) = 2 (vì 0 có, 1 có, 2 không có → MEX = 2).

### Tại sao Grundy hoạt động?

**Tư duy:** Grundy number thực chất là "kích thước đống Nim tương đương".

- Trạng thái có Grundy = 0 tương đương đống Nim rỗng (thua)
- Trạng thái có Grundy = k tương đương đống Nim có k viên

Khi bạn kết hợp nhiều trò chơi con (game sum), bạn chỉ cần XOR các Grundy numbers — giống hệt Nim!

### Code tính Grundy (đệ quy + memo)

```cpp
int grundy[1001];
bool computed[1001];

int calcGrundy(int state) {
    if (computed[state]) return grundy[state];
    computed[state] = true;

    vector<int> nextStates;
    // Liệt kê tất cả trạng thái tiếp theo từ state
    // Ví dụ: lấy 1, 2, hoặc 3 viên đá
    if (state >= 1) nextStates.push_back(calcGrundy(state - 1));
    if (state >= 2) nextStates.push_back(calcGrundy(state - 2));
    if (state >= 3) nextStates.push_back(calcGrundy(state - 3));

    grundy[state] = mex(nextStates);
    return grundy[state];
}

int mex(vector<int>& s) {
    sort(s.begin(), s.end());
    s.erase(unique(s.begin(), s.end()), s.end());
    for (int i = 0; i < (int)s.size(); i++)
        if (s[i] != i) return i;
    return s.size();
}
```

```python
def mex(s):
    s = sorted(set(s))
    for i in range(len(s)):
        if s[i] != i:
            return i
    return len(s)

def grundy(n, moves):
    dp = [0] * (n + 1)
    for i in range(1, n + 1):
        next_states = []
        for m in moves:
            if i >= m:
                next_states.append(dp[i - m])
        dp[i] = mex(next_states)
    return dp[n]
```

---

## 5. Tính Grundy số từng bước - Ví dụ chi tiết

### Ví dụ 1: Subtraction Game {1, 2, 3}

**Luật:** Có 1 đống n viên đá. Mỗi lượt lấy 1, 2, hoặc 3 viên. Ai lấy cuối cùng thắng.

Bảng Grundy numbers:

```
state:    0   1   2   3   4   5   6   7   8   9  10
Grundy:   0   1   2   3   0   1   2   3   0   1   2
```

**Tính từng bước:**

```
G(0) = MEX{} = 0
         (không có nước đi → MEX của tập rỗng = 0)

G(1) = MEX{G(0)} = MEX{0} = 1
         (chỉ có thể lấy 1 viên → dẫn đến state 0)

G(2) = MEX{G(1), G(0)} = MEX{1, 0} = 2
         (lấy 1 viên → state 1, lấy 2 viên → state 0)

G(3) = MEX{G(2), G(1), G(0)} = MEX{2, 1, 0} = 3
         (lấy 1 → state 2, lấy 2 → state 1, lấy 3 → state 0)

G(4) = MEX{G(3), G(2), G(1)} = MEX{3, 2, 1} = 0  ← P-position!
         (lấy 1 → state 3, lấy 2 → state 2, lấy 3 → state 1)

G(5) = MEX{G(4), G(3), G(2)} = MEX{0, 3, 2} = 1
         ...
```

**Nhận xét:** Với subtraction set {1, 2, 3}, Grundy(n) = n mod 4. N-position khi n mod 4 ≠ 0.

### Ví dụ 2: Subtraction Game {1, 3, 4}

```
G(0) = 0
G(1) = MEX{G(0)} = MEX{0} = 1
G(2) = MEX{G(1)} = MEX{1} = 0        (chỉ lấy được 1 viên)
G(3) = MEX{G(2), G(0)} = MEX{0, 0} = MEX{0} = 1
G(4) = MEX{G(3), G(1), G(0)} = MEX{1, 1, 0} = MEX{0, 1} = 2
G(5) = MEX{G(4), G(2), G(1)} = MEX{2, 0, 1} = 3
G(6) = MEX{G(5), G(3), G(2)} = MEX{3, 1, 0} = 2
G(7) = MEX{G(6), G(4), G(3)} = MEX{2, 2, 1} = MEX{1, 2} = 0  ← P-position!
G(8) = MEX{G(7), G(5), G(4)} = MEX{0, 3, 2} = 1
G(9) = MEX{G(8), G(6), G(5)} = MEX{1, 2, 3} = 0  ← P-position!
G(10) = MEX{G(9), G(7), G(6)} = MEX{0, 0, 2} = MEX{0, 2} = 1
```

```
state:     0   1   2   3   4   5   6   7   8   9  10
Grundy:    0   1   0   1   2   3   2   0   1   0   1
                   ↑       ↑           ↑   ↑
                 P-pos   N-pos       P   P
```

**P-positions:** 0, 2, 7, 9, ... (không có pattern đơn giản như mod — phải tính)

### Ví dụ 3: Trò chơi trên DAG

**Bài toán:** Cho DAG có n đỉnh, mỗi đỉnh có thể đi đến các đỉnh kề. Người chơi di chuyển quân cờ, ai không đi được thua.

```
Ví dụ DAG:
    0 → 1 → 3
    0 → 2 → 3
    1 → 4
    2 → 4

Tính Grundy (duyệt ngược topological order):
G(4) = MEX{} = 0                     (sink - không đi đâu được)
G(3) = MEX{} = 0                     (sink)
G(2) = MEX{G(3), G(4)} = MEX{0, 0} = MEX{0} = 1
G(1) = MEX{G(3), G(4)} = MEX{0, 0} = MEX{0} = 1
G(0) = MEX{G(1), G(2)} = MEX{1, 1} = MEX{1} = 0  ← P-position!
```

**Code DAG Grundy:**

```cpp
vector<int> adj[MAXN]; // adj[u] = danh sách đỉnh kề (u → v)
int grundy[MAXN];

int dfs(int u) {
    if (grundy[u] != -1) return grundy[u];
    vector<int> next;
    for (int v : adj[u]) {
        next.push_back(dfs(v));
    }
    grundy[u] = mex(next);
    return grundy[u];
}
```

---

## 6. Tổng hợp trò chơi (Game Sum)

### Định lý Sprague-Grundy

> Nếu trò chơi là **tổng** (sum) của nhiều trò chơi con độc lập, Grundy của trò chơi tổng bằng **XOR** các Grundy của trò chơi con.

```
Grundy(G₁ + G₂ + ... + Gₖ) = Grundy(G₁) ⊕ Grundy(G₂) ⊕ ... ⊕ Grundy(Gₖ)
```

**Tư duy:** Mỗi trò chơi con tương đương 1 đống Nim. Chơi tổng nhiều trò chơi = chơi Nim nhiều đống.

### Ví dụ

**Bài toán:** Có 3 đống đá, mỗi đống có thể lấy 1, 2, hoặc 3 viên. Ai lấy cuối cùng thắng.

```
Đống 1: 5 viên → Grundy(5) = 5 mod 4 = 1
Đống 2: 7 viên → Grundy(7) = 7 mod 4 = 3
Đống 3: 3 viên → Grundy(3) = 3 mod 4 = 3

Tổng Grundy = 1 ⊕ 3 ⊕ 3 = 1 ≠ 0 → Người đi trước THẮNG
```

**Bài toán phức tạp hơn:** Có n đống, mỗi đống có luật lấy khác nhau (đống i lấy tối đa i viên).

```
Đống 1: lấy tối đa 1 viên → Grundy = n₁ mod 2
Đống 2: lấy tối đa 2 viên → Grundy = n₂ mod 3
Đống k: lấy tối đa k viên → Grundy = nₖ mod (k+1)

Kết quả = Grundy₁ ⊕ Grundy₂ ⊕ ... ⊕ Grundyₖ
```

---

## 7. Ứng dụng thực tế

### 7.1 Wythoff's Game

**Luật:** Có 2 đống đá. Mỗi lượt có thể:
- Lấy ≥ 1 viên từ **1 đống** bất kỳ, HOẶC
- Lấy **số lượng bằng nhau** từ **cả 2 đống**

**P-positions** là các cặp `(⌊kφ⌋, ⌊kφ²⌋)` với `φ = (1+√5)/2` (tỷ lệ vàng).

```
P-positions: (0,0), (1,2), (3,5), (4,7), (6,10), (8,13), ...
```

```cpp
// Kiểm tra (a, b) có phải P-position trong Wythoff's Game không
bool isWythoffP(int a, int b) {
    if (a > b) swap(a, b);
    double phi = (1 + sqrt(5)) / 2;
    int k = b - a;
    return a == (int)(k * phi);
}
```

### 7.2 Subtraction Games

**Luật:** Có 1 đống n viên. Cho tập S = {s₁, s₂, ..., sₖ}. Mỗi lượt lấy đúng sᵢ viên (sᵢ ∈ S).

**Grundy có chu kỳ!** Với subtraction set hữu hạn, Grundy numbers luôn tuần hoàn sau một điểm.

```cpp
// Subtraction game với set S
int grundy[MAXN];
int computeGrundy(int n, vector<int>& S) {
    grundy[0] = 0;
    for (int i = 1; i <= n; i++) {
        set<int> reachable;
        for (int s : S) {
            if (i >= s) reachable.insert(grundy[i - s]);
        }
        grundy[i] = mex(reachable);
    }
    return grundy[n];
}
```

### 7.3 Games on Graphs (Sprague-Grundy trên DAG)

Nhiều bài toán CP là trò chơi trên DAG:

- **Vertex deletion game:** Xoá đỉnh, tất cả đỉnh reachable cũng bị xoá
- **Edge game:** Chọn cạnh, di chuyển quân cờ
- **Tree game:** Trò chơi trên cây (cây là DAG đặc biệt)

```cpp
// Grundy trên DAG - duyệt topological
vector<int> adj[MAXN];
int grundy[MAXN];
bool visited[MAXN];

int dfs(int u) {
    if (visited[u]) return grundy[u];
    visited[u] = true;
    
    set<int> nextValues;
    for (int v : adj[u]) {
        nextValues.insert(dfs(v));
    }
    
    // Tính MEX
    int g = 0;
    while (nextValues.count(g)) g++;
    grundy[u] = g;
    return g;
}
```

### 7.4 Stone Pile Games (Chia đống)

**Luật:** Có 1 đống n viên đá. Mỗi lượt chia đống thành 2 đống con (mỗi đống ≥ 1 viên). Ai không chia được thua.

```
G(0) = G(1) = 0  (không chia được)
G(2) = MEX{G(1)⊕G(1)} = MEX{0⊕0} = MEX{0} = 1
G(3) = MEX{G(1)⊕G(2), G(2)⊕G(1)} = MEX{1, 1} = MEX{1} = 0
G(4) = MEX{G(1)⊕G(3), G(2)⊕G(2), G(3)⊕G(1)} = MEX{0, 0, 0} = MEX{0} = 1
```

**Nhận xét:** Grundy(n) = 0 nếu n lẻ, = 1 nếu n chẵn (trong trường hợp này).

### 7.5 Green Hackenbush

**Luật:** Cho cây (hoặc rừng) có hướng. Mỗi lượt cắt 1 cạnh. Cạnh bị cắt làm mất toàn bộ subtree bên dưới. Ai cắt cuối cùng thắng.

**Kết quả:** Grundy của cây = XOR các Grundy của subtree con + 1.

```cpp
int treeGrundy(int u, int parent) {
    int g = 0;
    for (int v : adj[u]) {
        if (v != parent) {
            g ^= (treeGrundy(v, u) + 1);
        }
    }
    return g;
}
```

---

## 8. Lưu ý / Cạm bẫy

### 8.1 Sai lầm phổ biến trong Nim

**Sai lầm 1: Nhầm luật "lấy cuối cùng thua" vs "lấy cuối cùng thắng"**

```
Normal play (lấy cuối cùng THẮNG): XOR ≠ 0 → thắng
Misère play (lấy cuối cùng THUA):  Khác hoàn toàn!
```

Với Misère Nim (chỉ 1 viên/đống > 1):
- Nếu tất cả đống ≤ 1: thắng khi XOR = 0 (ngược lại normal play)
- Nếu có đống > 1: thắng khi XOR ≠ 0 (giống normal play)

**Sai lầm 2: Quên rằng Nim chỉ áp dụng khi mỗi đống độc lập**

```
Nếu các đống có liên quan (ví dụ: lấy từ đống này ảnh hưởng đống khác),
phải dùng Grundy, không dùng Nim trực tiếp.
```

**Sai lầm 3: Lấy nhầm đống trong nước đi**

Khi tìm nước đi tối ưu, phải đảm bảo `a[i] ^ xorSum < a[i]` (không phải `a[i] ^ xorSum > 0`).

### 8.2 Hiểu sai Grundy Numbers

**Sai lầm 1: Grundy = 0 không có nghĩa là "không có nước đi"**

```
Grundy = 0 nghĩa là P-position (người đi trước thua).
Có thể có rất nhiều nước đi, nhưng TẤT CẢ đều dẫn đến N-position.
```

**Sai lầm 2: Grundy không phải "số viên đá còn lại"**

```
Grundy là chỉ số抽象 (abstract index), không phải số lượng cụ thể.
Grundy = 3 không có nghĩa là "còn 3 viên đá".
```

**Sai lầm 3: Quên tính MEX đúng cách**

```
MEX({0, 1, 3}) = 2  ←很多人 quên 2
MEX({1, 2, 3}) = 0  ← 0 không có trong tập!
MEX({}) = 0          ← tập rỗng → MEX = 0
```

### 8.3 Khi nào dùng XOR vs phép toán khác?

| Bài toán | Phép toán |
|----------|-----------|
| Nim cổ điển (N đống, lấy tự do) | XOR trực tiếp các a[i] |
| Subtraction game (1 đống, lấy tối đa k) | Grundy = n mod (k+1), không cần XOR |
| Tổng nhiều trò chơi con | XOR các Grundy numbers |
| Trò chơi trên DAG | Tính Grundy bằng MEX, không phải XOR |
| Wythoff's Game | Dùng tỷ lệ vàng, không dùng XOR |

**Tóm lại:** XOR chỉ dùng khi **kết hợp** nhiều trò chơi con (game sum). Khi tính Grundy cho 1 trò chơi đơn lẻ, dùng MEX.

### 8.4 Cạm bẫy kỹ thuật

**1. Stack overflow khi đệ quy quá sâu:**

```cpp
// SAI: Đệ quy sâu có thể stack overflow
int grundy(int n) {
    if (n == 0) return 0;
    // ... đệ quy
}

// ĐÚNG: Dùng bottom-up DP
int grundy[MAXN];
void compute(int n) {
    grundy[0] = 0;
    for (int i = 1; i <= n; i++) {
        // Tính grundy[i] từ các giá trị trước
    }
}
```

**2. Quên memoization → TLE:**

```cpp
// SAI: Tính lại nhiều lần → O(2^n)
int grundy(int n) { ... }

// ĐÚNG: Memoize → O(n)
bool computed[MAXN];
int memo[MAXN];
int grundy(int n) {
    if (computed[n]) return memo[n];
    computed[n] = true;
    // ...
    return memo[n] = result;
}
```

**3. MEX implementation sai:**

```cpp
// SAI: Chỉ kiểm tra phần tử đầu
int mex(vector<int>& s) {
    if (s.empty() || s[0] != 0) return 0; // SAI nếu s = {1, 2}
    // ...
}

// ĐÚNG: Phải sort + unique trước
int mex(vector<int>& s) {
    sort(s.begin(), s.end());
    s.erase(unique(s.begin(), s.end()), s.end());
    for (int i = 0; i < (int)s.size(); i++)
        if (s[i] != i) return i;
    return s.size();
}
```

---

## 9. Bài tập luyện tập

### Nim cơ bản

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Nim Game I](https://cses.fi/problemset/task/1730) | CSES | ⭐⭐ | Nim cổ điển |
| [CSES - Nim Game II](https://cses.fi/problemset/task/1098) | CSES | ⭐⭐ | Nim biến thể |
| [SPOJ - MCOINS](https://www.spoj.com/problems/MCOINS/) | SPOJ | ⭐⭐ | Subtraction game |

### Sprague-Grundy

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CF - 15C](https://codeforces.com/problemset/problem/15/C) | CF | ⭐⭐ | Nim nhiều đống |
| [CF - 1191D](https://codeforces.com/problemset/problem/1191/D) | CF | ⭐⭐⭐ | Game phân tích |
| [CF - 138D](https://codeforces.com/problemset/problem/138/D) | CF | ⭐⭐⭐⭐ | Game trên lưới |
| [CF - 9D](https://codeforces.com/problemset/problem/9/D) | CF | ⭐⭐⭐⭐ | Game trên cây |
| [Atcoder DP Contest - Grundy](https://atcoder.jp/contests/dp/tasks) | Atcoder | ⭐⭐⭐ | Game DP |

### Game trên DAG / Trees

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CF - 2B](https://codeforces.com/problemset/problem/2/B) | CF | ⭐⭐⭐ | Game trên DAG |
| [CF - 455B](https://codeforces.com/problemset/problem/455/B) | CF | ⭐⭐⭐ | Game trên cây |
| [CF - 1109D](https://codeforces.com/problemset/problem/1109/D) | CF | ⭐⭐⭐⭐ | Game trên cây nâng cao |

### Wythoff & Special Games

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [SPOJ - MCOINS](https://www.spoj.com/problems/MCOINS/) | SPOJ | ⭐⭐ | Subtraction game |
| [CF - 317D](https://codeforces.com/problemset/problem/317/D) | CF | ⭐⭐⭐⭐ | Game theory nâng cao |
| [CF - 982D](https://codeforces.com/problemset/problem/982/D) | CF | ⭐⭐⭐⭐ | Game + Sorting |

### Bài tập tổng hợp

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [Kattis - Game of Stones](https://open.kattis.com/problems/gameofstones) | Kattis | ⭐⭐ | Nim + Subtraction |
| [DMOJ - Game Theory](https://dmoj.ca/problem/game) | DMOJ | ⭐⭐⭐ | Grundy tổng hợp |
| [LightOJ - Game Theory](https://lightoj.com/problem/guilty-prince) | LightOJ | ⭐⭐⭐ | Game trên lưới |

---

## 10. Tài liệu tham khảo

- [VNOI Wiki - Lý thuyết trò chơi](https://wiki.vnoi.info/algo/math/game-theory)
- [CP-Algorithms - Sprague-Grundy Theorem](https://cp-algorithms.com/game_theory/sprague-grundy-nim.html)
- [Errichto - Nim Game & Sprague-Grundy (YouTube)](https://www.youtube.com/watch?v=6jMRgUeJ2YQ)
- [William Fiset - Game Theory (YouTube)](https://www.youtube.com/playlist?list=PLDV1Zeh2NRsDj3NzHbbF7JwNRFOKhl_7U)
- [Stanford - Game Theory Notes](https://web.stanford.edu/~guertin/game_theory_notes.html)

## Bài viết liên quan

- [Bài 5: Phép toán bit](05-phep-toan-bit.md) — XOR là nền tảng cho Nim
- [Bài 12: Quy hoạch động](12-quy-hoach-dong.md) — Grundy dùng DP
- [Bài 18: Euclid & Modular Inverse](18-euclid-modular-inverse.md) — Modular arithmetic trong subtraction games
