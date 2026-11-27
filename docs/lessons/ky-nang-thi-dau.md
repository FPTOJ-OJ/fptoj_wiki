# Bài 77: Kỹ Năng Thi Đấu HSG Tin Học Việt Nam

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** Kinh nghiệm thi HSG, VOI, VNOI

## 1. Cấu trúc đề thi HSG Tin học Việt Nam

### 1.1. Format đề thi

```
Thời gian: 180 phút (3 giờ) — HSG tỉnh; 300 phút (5 giờ) — HSG quốc gia
Số bài: 3-4 bài (HSG tỉnh) hoặc 5-6 bài (HSG quốc gia)
Mỗi bài: 10-100 điểm tùy subtask
Tổng điểm: 100-300 điểm

Mỗi bài có nhiều TESTCASE, mỗi testcase có điểm riêng
Bạn chỉ được NỘP BÀI 1 LẦN DUY NHẤT (hoặc giới hạn số lần nộp, tùy kỳ thi)
```

### 1.2. Subtask là gì?

```
Ví dụ bài "Tìm đường ngắn nhất":
  Subtask 1 (30%): N ≤ 100, M ≤ 1000    → Brute force được
  Subtask 2 (30%): N ≤ 1000, M ≤ 10000  → Dijkstra O(M log N)
  Subtask 3 (40%): N ≤ 10^5, M ≤ 10^5   → Dijkstra + fast I/O

→ Nếu chỉ giải được subtask 1+2 → được 60 điểm!
→ Quan trọng: SUBMIT SUBTASK DỄ TRƯỚC!
```

### 1.3. Cách nộp bài

```
HSG tỉnh:  Nộp USB (chỉ được nộp 1 lần!)
HSG quốc gia: Nộp qua hệ thống online (có thể nộp nhiều lần)

VỚI NỘP USB:
- Chuẩn bị code SẴN trong thư mục
- Mỗi bài 1 file: bai1.cpp, bai2.cpp, bai3.cpp
- KHÔNG được nộp lại → phải test kỹ trước khi nộp!
```

---

## 2. Quản lý thời gian thi HSG — Từng phút

### 2.1. Phân bổ 180 phút (HSG tỉnh)

```
0-10 phút:   Đọc TẤT CẢ đề, đánh giá độ khó
10-20 phút:  Lên kế hoạch: bài nào làm trước, bài nào sau
20-60 phút:  Làm bài DỄ nhất (lấy điểm nhanh)
60-120 phút: Làm bài TRUNG BÌNH
120-160 phút: Làm bài KHÓ (hoặc tối ưu bài đã làm)
160-180 phút: KIỂM TRA LẠI → chuẩn bị nộp USB
```

### 2.2. Phân bổ 300 phút (HSG quốc gia)

```
0-15 phút:    Đọc đề, đánh giá, lên kế hoạch
15-60 phút:   Bài dễ nhất (1-2 bài)
60-150 phút:  Bài trung bình (2-3 bài)
150-240 phút: Bài khó
240-280 phút: Tối ưu code, kiểm tra edge case
280-300 phút: Chuẩn bị nộp bài
```

### 2.3. Quy tắc "mất gốc" (quan trọng nhất!)

```
QUY TẮC: Mỗi bài chỉ dành TỐI ĐA 40 phút

Nếu 40 phút chưa ra:
  → DỪNG LẠI NGAY
  → Chuyển sang bài khác
  → Quay lại sau khi đã làm xong bài khác

Tại sao?
- Não cần "reset" để có góc nhìn mới
- Bài khác có thể dễ hơn → điểm nhanh hơn
- Mất 40 phút cho 0 điểm > Mất 40 phút cho 30 điểm
```

### 2.4. Quy tắc "điểm tối đa"

```
Ưu tiên: Bài nào cho NHIỀU ĐIỂM NHẤT trong thời gian ngắn nhất

Ví dụ:
  Bài 1: Dễ, 30 điểm, 20 phút → LÀM TRƯỚC
  Bài 2: Trung bình, 40 điểm, 60 phút → LÀM THỨ 2
  Bài 3: Khó, 100 điểm, 120 phút → LÀM SAU

Tổng: 30 + 40 + (cố gắng) = 70+ điểm
```

---

## 3. Chiến thuật đọc đề thi HSG

### 3.1. Đọc nhanh (5 phút đầu)

```
Với mỗi bài, chỉ cần biết:
1. Bài toán yêu cầu gì? (1 câu)
2. Input/Output là gì?
3. Giới hạn N, M là bao nhiêu?
4. Có subtask không? Subtask nào dễ?

Ghi ra giấy:
  Bài 1: Đếm đường đi — N≤100 — Dễ ★
  Bài 2: Tìm MST — N≤10^5 — Trung bình ★★
  Bài 3: DP bitmask — N≤20 — Khó ★★★
  Bài 4: String matching — N≤10^6 — Trung bình ★★
```

### 3.2. Đọc kỹ (khi bắt đầu làm bài)

```
Khi bắt đầu làm 1 bài:

1. Đọc LẠI đề từ đầu
2. Gạch chân: input, output, ràng buộc
3. Chạy sample test bằng tay (trên giấy)
4. Nghĩ giải pháp thô trước
5. Nghĩ giải pháp tối ưu
6. Code
7. Test với sample
```

---

## 4. Checklist trước khi nộp (tóm tắt)

> Để tránh trùng lặp, checklist chi tiết (trước thi / trong thi / trước khi nộp) đã gộp vào **Mục 9. Checklist hoàn chỉnh** ở cuối bài. Trước khi nộp bài bất kỳ, luôn kiểm tra 3 điểm bắt buộc: **đúng tên file I/O, biên dịch không lỗi/cảnh báo nghiêm trọng, và đã xóa sạch lệnh in debug**.

---

## 5. Kỹ năng thực chiến

### 5.1. Brute force trước, tối ưu sau

Trong phòng thi, tư duy an toàn nhất là luôn xây dựng nghiệm đơn giản trước rồi mới nâng cấp thuật toán:

1. **Bước 1 (Giữ chắc điểm cơ bản):** Cài lời giải duyệt trâu $O(N^2)$ hoặc quay lui $O(2^N)$, kiểm tra ngay trên sample test. Nếu có subtask $N \le 100$, bạn đã chắc chắn có điểm bộ test nhỏ và có công cụ kiểm chứng cho bước sau.
2. **Bước 2 (Tối ưu thuật toán):** Khi đã hiểu rõ cấu trúc bài toán từ brute force, tìm cách giảm độ phức tạp xuống $O(N \log N)$ hoặc $O(N)$, đồng thời dùng brute force làm bản chuẩn để stress test.
3. **Bước 3 (Biết điểm dừng):** Nếu hết thời gian phân bổ cho bài đó mà vẫn chưa ra lời giải tối ưu, giữ lại bản brute force sạch sẽ (không tràn bộ nhớ trên test nhỏ) rồi chuyển sang bài khác để tối đa hóa tổng điểm.

### 5.2. Đọc constraints → suy ra thuật toán

Giới hạn dữ liệu trong đề bài là gợi ý trực tiếp về độ phức tạp mục tiêu cần đạt:

| Giới hạn tiêu biểu | Độ phức tạp mục tiêu | Hướng tiếp cận thường gặp |
| :--- | :--- | :--- |
| $N \le 10$ | $O(N!)$ hoặc $O(2^N)$ | Quay lui, hoán vị, vét cạn |
| $N \le 20$ | $O(2^N)$ hoặc $O(N \cdot 2^N)$ | Bitmask DP, Meet in the Middle (nếu $N \le 40$) |
| $N \le 100$ | $O(N^3)$ | Floyd-Warshall, DP 3 chiều |
| $N \le 500$ | $O(N^3)$ | Nhân ma trận, Bellman-Ford, bài toán trên đồ thị nhỏ |
| $N \le 2000$ | $O(N^2)$ | Quy hoạch động 2 chiều, duyệt cặp phần tử |
| $N \le 10^5$ | $O(N \log N)$ | Sort, Binary Search, Segment Tree, BIT, Dijkstra |
| $N \le 10^6$ | $O(N)$ | Hai con trỏ, Stack/Queue đơn điệu, Prefix Sum |
| $N \le 10^9$ | $O(\log N)$ hoặc $O(1)$ | Tìm kiếm nhị phân trên đáp án, Công thức Toán, Lũy thừa ma trận |

### 5.3. Nhận diện dạng bài

```
Thấy "đếm số cách"     → DP hoặc Tổ hợp
Thấy "tối thiểu/tối đa" → Greedy hoặc DP
Thấy "trên cây"        → DFS/BFS, LCA, DP on tree
Thấy "trên đồ thị"     → BFS/DFS, Dijkstra, Floyd
Thấy "xâu"             → KMP, Hash, DP, Trie
Thấy "trên mảng"       → Prefix Sum, Two pointers, SegTree
Thấy "tìm kiếm"        → Binary Search, Hash Table
Thấy "sắp xếp"         → Sort, Priority Queue
```

### 5.4. Khi bị "bí" hoàn toàn

```
1. Viết brute force → chạy sample
2. Tìm pattern trong output (thủ công với test nhỏ)
3. Thử đổi cách tiếp cận:
   - Đổi trạng thái DP
   - Đổi thứ tự duyệt
   - Đổi cấu trúc dữ liệu
4. Nếu vẫn không ra → nộp brute force → chuyển bài
```

---

## 6. Kỹ năng code nhanh trong thi đấu

### 6.1. Template copy-paste

```cpp
// Template thi đấu: copy nguyên file, chỉ dùng phần cần thiết
// Mục đích: code nhanh, tránh bug vặt (fast I/O, long long, DSU, lũy thừa...)

#include <bits/stdc++.h>
using namespace std;
#define ll long long                    // viết tắt: ll thay cho long long
#define all(x) (x).begin(), (x).end()   // viết tắt duyệt toàn container
const ll MOD = 1e9 + 7;                 // modulo phổ biến, đổi nếu đề cho khác
const ll INF = 1e18;                    // vô cực cho long long (đồ thị, DP)

void fastIO() {
    ios::sync_with_stdio(false);        // tắt đồng bộ C/C++ → cin nhanh hơn
    cin.tie(nullptr);                   // không tự flush cout trước mỗi cin
}

// ===== DSU (hợp nhất tập rời rạc: Kruskal, đếm thành phần) =====
struct DSU {
    vector<int> p, s;                   // p: cha, s: kích thước tập (để union by size)
    DSU(int n) : p(n+1), s(n+1,1) { iota(all(p),0); } // ban đầu mỗi đỉnh 1 tập
    int find(int v) { return v==p[v]?v:p[v]=find(p[v]); } // nén đường đi
    bool unite(int a, int b) {
        a=find(a); b=find(b);           // đưa về gốc
        if(a==b) return false;          // đã cùng tập → không gộp
        if(s[a]<s[b]) swap(a,b);        // gắn cây nhỏ vào cây to
        p[b]=a; s[a]+=s[b];             // cập nhật cha + kích thước
        return true;
    }
};

// ===== Binary Search (tìm vị trí true đầu tiên trên [lo, hi]) =====
int bs(int lo, int hi, function<bool(int)> check) {
    while(lo<hi) {
        int mid = lo+(hi-lo)/2;         // tránh tràn số so với (lo+hi)/2
        if(check(mid)) hi=mid;          // mid đạt → đáp án nằm bên trái
        else lo=mid+1;                  // chưa đạt → bỏ nửa trái
    }
    return lo;
}

// ===== Fast Power (lũy thừa modular O(log b)) =====
ll power(ll a, ll b, ll mod) {
    ll res=1; a%=mod;                   // đưa a về [0, mod)
    while(b>0) {
        if(b&1) res=res*a%mod;          // bit 1 → nhân vào kết quả
        a=a*a%mod; b>>=1;               // bình phương cơ số, chia đôi số mũ
    }
    return res;
}

int main() {
    fastIO();                           // LUÔN gọi đầu main để I/O nhanh
    int t=1;
    // cin>>t;                          // bỏ comment nếu đề có nhiều test
    while(t--) {
        // Code here
    }
}
```

### 6.2. Viết code nhanh — Shortcut

```cpp
// Đọc nhanh
int n; cin>>n;
vector<int> a(n);
for(auto& x : a) cin>>x;

// In nhanh
for(auto x : a) cout<<x<<" ";

// Sort
sort(all(a));

// Binary search
auto it = lower_bound(all(a), x);

// Đếm phần tử
unordered_map<int,int> cnt;
for(auto x : a) cnt[x]++;

// Tổng
ll sum = accumulate(all(a), 0LL);
```

---

## 7. Kỹ năng test code trước khi nộp

### 7.1. Test với sample

```
LUÔN chạy sample test NGAY sau khi code xong
Nếu sai → debug ngay
Nếu đúng → test thêm edge cases
```

### 7.2. Test edge cases

```
- N = 0 (mảng rỗng)
- N = 1 (mảng 1 phần tử)
- Tất cả phần tử giống nhau
- Mảng tăng dần / giảm dần
- Phần tử âm / dương / 0
- Số rất lớn (10^9) / rất nhỏ (-10^9)
- Đồ thị 1 đỉnh, 0 cạnh
- Cây là đường thẳng (linked list)
```

### 7.3. Stress test (nếu còn thời gian)

```cpp
// Sinh testcase ngẫu nhiên → so sánh brute force với code chính
for(int test = 0; test < 1000; test++) {
    // Sinh input ngẫu nhiên
    int n = rand() % 10 + 1;
    vector<int> a(n);
    for(auto& x : a) x = rand() % 100;
    
    // Chạy cả 2
    int expected = bruteForce(a);
    int actual = mySolution(a);
    
    if(expected != actual) {
        cout << "BUG at test " << test << endl;
        // In ra input để debug
        break;
    }
}
```

---

## 8. Kinh nghiệm từ các tuyển thủ

### 8.1. Từ Lê Minh Hoàng (VNOI)

> "Đọc đề kỹ, hiểu đúng bài toán quan trọng hơn code nhanh."

### 8.2. Từ các tuyển thủ quốc gia

> "Làm nhiều bài hơn, mỗi bài ít thời gian hơn. Thà 5 bài 60 điểm hơn 1 bài 100 điểm."

> "Khi bí, thử viết lại bài toán bằng lời nói thường. Thường sẽ thấy cách giải."

> "Luôn nộp brute force cho subtask dễ. 30 điểm > 0 điểm."

### 8.3. Kinh nghiệm cá nhân

```
1. Đọc đề 2 lần trước khi code
2. Viết pseudocode trên giấy trước
3. Code từ trên xuống dưới, test từng phần
4. Không fix bug quá 15 phút → viết lại
5. Luôn có backup plan (brute force)
```

---

## 9. Checklist hoàn chỉnh (bản duy nhất — dùng cho mọi kỳ thi)

### Trước khi thi

```
□ Template đã copy sẵn (DSU, lũy thừa, binary search — xem §6.1)
□ Máy thi compile được (g++ / python) — biên dịch thử 1 file trắng
□ Giấy + bút (vẽ sơ đồ, pseudocode), đồng hồ, nước uống
□ Thiết bị nộp bài sẵn sàng: USB đã format HOẶC tài khoản hệ thống nộp online
```

### Trong khi thi

```
□ Đọc hết đề (10 phút đầu), đánh giá ★/★★/★★★
□ Lên kế hoạch: bài dễ → trung bình → khó; mỗi bài ≤ 40 phút
□ Test sample NGAY sau khi code; test edge case (N=0, N=1, all same)
□ Nộp brute force lấy điểm subtask nếu không tối ưu được
```

### Trước khi nộp (USB hay online đều dùng chung)

```
□ Tên file đúng format (bai1.cpp, ...) — đúng quy định của kỳ thi
□ Compile được trên máy thi (chạy thử, không chỉ chạy trên máy cá nhân)
□ Output đúng format (khoảng trắng, xuống dòng, hoa/thường)
□ Đã xóa debug macro / cerr / input test cứng
□ Đã nộp CẢ bản brute force (giữ điểm subtask dễ)
□ Kiểm tra đọc lại được: USB cắm lại đọc được / hệ thống báo Accepted tiếp nhận
```

---

## 10. Bài tập luyện tập

### Bài tập thực chiến trên FPTOJ

| Mã bài | Tên bài | Chủ đề | Độ khó |
|---|---|---|---|
| `fptat1-pair` | [Perfect Pair](https://fptoj.com/problem/fptat1-pair) | Kỹ thuật hai con trỏ | ⭐ |
| `fptat1-stair` | [Magic Staircase](https://fptoj.com/problem/fptat1-stair) | Quy hoạch động | ⭐ |
| `fptat1-treasure` | [Treasure Subarray](https://fptoj.com/problem/fptat1-treasure) | Tìm kiếm nhị phân | ⭐ |
| `fptat1-tree` | [Planting Trees](https://fptoj.com/problem/fptat1-tree) | Cấu trúc dữ liệu | ⭐ |

### Nguồn luyện đề tổng hợp

| Bài | Nền tảng | Mục đích |
|-----|----------|----------|
| [CSES Problem Set](https://cses.fi/problemset/) | CSES | Luyện tốc độ làm bài |
| [Codeforces Rounds](https://codeforces.com/contests) | CF | Luyện thi đấu thực tế |
| [VNOJ - VOI problems](https://oj.vnoi.info/) | VNOJ | Luyện đề HSG |
| [AtCoder Beginner Contest](https://atcoder.jp/contests/) | AtCoder | Bài chất lượng cao |

---

## Tài liệu tham khảo

- [VNOI Wiki - Kinh nghiệm thi VOI](https://wiki.vnoi.info/algo/skill/Kinh-nghiem-thi-VOI)
- [VNOI Wiki - Kỹ năng thi](https://wiki.vnoi.info/algo/skill/Ki-nang-thi-cu)
- [USACO Guide - Contest Strategy](https://usaco.guide/general/contests)

---

**Bài trước:** [← Bài 76: Binary Search Tree (BST)](bst.md) | **Bài tiếp theo:** [Bài 78: Sinh Testcase & Stress Test →](sinh-testcase.md)
