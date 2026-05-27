# Bài 52: Suffix Automaton - Máy trạng thái hậu tố!

> **Tác giả:** FPTOJ Wiki<br>
> **Nội dung tham khảo từ:** CP-Algorithms, e-maxx

---

## Bạn sẽ học được gì?

- Suffix Automaton (SAM) là gì và tại sao nó mạnh mẽ
- Cách xây dựng online trong O(N)
- Các ứng dụng: đếm xâu con khác nhau, tìm xâu con chung dài nhất, đếm số lần xuất hiện, tìm xâu con thứ K

---

## 1. Giới thiệu

### Bài toán

Cho xâu S. Nhiều câu hỏi đặt ra:

- Đếm số xâu con khác nhau của S?
- Tìm xâu con chung dài nhất của hai xâu?
- Mỗi xâu con xuất hiện bao nhiêu lần?
- Xâu con thứ K theo thứ tự từ điển là gì?

**Suffix Automaton (SAM)** là cấu trúc dữ liệu giải quyết **tất cả** bài toán trên!

### Suffix Automaton là gì?

Suffix Automaton là một **Deterministic Finite Automaton (DFA)** tối thiểu nhận **tất cả các hậu tố** của xâu S.

```
Đặc điểm:
- Số trạng thái: O(N)
- Số cạnh chuyển: O(N)
- Xây dựng online: O(N)
```

> **Tại sao SAM mạnh hơn Suffix Array?**
>
> SAM hoạt động online (xử lý từng ký tự), hỗ trợ thêm/xóa ký tự đầu, và nhiều bài toán trên xâu con trở nên đơn giản hơn.

### Ví dụ trực quan: SAM của xâu "abcbc"

```mermaid
stateDiagram-v2
    direction LR
    [*] --> q0
    q0 --> q1 : a
    q0 --> q5 : b
    q0 --> q3 : c
    q1 --> q2 : b
    q2 --> q3 : c
    q3 --> q4 : b
    q4 --> q6 : c
    q5 --> q7 : c
    q7 --> q4 : b

    state q0 {
        note: len=0 (init)
    }
    state q1 {
        note: len=1 (a)
    }
    state q2 {
        note: len=2 (ab)
    }
    state q3 {
        note: len=3 (abc)
    }
    state q4 {
        note: len=4 (abcb)
    }
    state q5 {
        note: len=1 (b, clone)
    }
    state q6 {
        note: len=5 (abcbc)
    }
    state q7 {
        note: len=2 (bc, clone)
    }
```

Mỗi trạng thái đại diện cho một **lớp tương đương** các vị trí kết thúc trong xâu.

---

## 2. Khái niệm cốt lõi

### 2.1. Trạng thái (State) — Lớp tương đương

Mỗi trạng thái v trong SAM tương ứng với một **tập các vị trí kết thúc** (endpos) trong xâu.

**Lớp tương đương (Equivalence Class):** Hai xâu con s₁, s₂ thuộc cùng một lớp khi chúng xuất hiện tại **cùng tập các vị trí kết thúc** trong xâu.

```
Ví dụ: S = "abcbc"

Xâu con "bc" xuất hiện kết thúc tại vị trí {3, 5}
Xâu con "abc" xuất hiện kết thúc tại vị trí {3}

→ "bc" và "abc" KHÁC lớp (khác endpos)
```

### 2.2. len[v] — Độ dài dài nhất

`len[v]` = độ dài của xâu con **dài nhất** trong trạng thái v.

```
Nếu trạng thái v chứa các xâu con {s₁, s₂, ...}
thì len[v] = max(len(s₁), len(s₂), ...)
```

### 2.3. link[v] — Suffix link

`link[v]` = trạng thái chứa **hậu tố dài nhất** của xâu dài nhất trong v, mà thuộc lớp khác.

```
Nếu trạng thái v có xâu dài nhất là "abc"
và hậu tố "bc" thuộc trạng thái u ≠ v
thì link[v] = u
```

**Tính chất quan trọng:**

```
len[link[v]] < len[v]
Các suffix link tạo thành một cây (suffix link tree) với gốc là trạng thái init
```

### 2.4. next[v][c] — Hàm chuyển

`next[v][c]` = trạng thái khi đọc thêm ký tự c từ trạng thái v.

```
Nếu từ trạng thái v, đọc ký tự c → chuyển sang trạng thái next[v][c]
```

### 2.5. Tổng kết cấu trúc

```cpp
struct State {
    int len;          // Độ dài dài nhất trong trạng thái
    int link;         // Suffix link
    map<char,int> next; // Các cạnh chuyển (hoặc int next[26] cho chữ cái thường)
};
```

**Bộ nhớ:** Tối đa 2N - 1 trạng thái, 3N - 4 cạnh chuyển.

---

## 3. Thuật toán xây dựng — O(N)

### 3.1. Ý tưởng chính

Xây dựng SAM **online**: lần lượt thêm từng ký tự của xâu S.

Khi thêm ký tự mới `c` vào cuối:

1. **Tạo trạng thái mới** `cur` với `len[cur] = len[last] + 1`
2. **Duyệt suffix link** từ `last` về `init`: thêm cạnh `next[p][c] = cur` cho các trạng thái chưa có cạnh `c`
3. Nếu gặp trạng thái `p` đã có cạnh `c` trỏ đến `q`:
   - Nếu `len[p] + 1 == len[q]` → chỉ cần `link[cur] = q`
   - Nếu không → **clone** trạng thái `q`: tạo `clone` với `len[clone] = len[p] + 1`, sao chép cạnh của `q`, cập nhật suffix link

### 3.2. Hoạt động của phép Clone

Phép clone rất quan trọng: nó đảm bảo mỗi trạng thái chỉ chứa các xâu con có cùng tập endpos.

```
Khi len[p] + 1 < len[q]:
- Tạo clone với len = len[p] + 1
- Sao chép tất cả cạnh và suffix link từ q
- Cập nhật: link[clone] = link[q], link[q] = link[cur] = clone
- Sửa các cạnh next[p][c] trỏ đến q thành trỏ đến clone (dọc suffix link)
```

### 3.3. Code C++

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    const int MAXLEN = 200005; // Kích thước xâu tối đa

    struct SuffixAutomaton {
        struct State {
            int len;           // Độ dài dài nhất trong trạng thái
            int link;          // Suffix link
            int next[26];      // Cạnh chuyển cho 26 chữ cái thường
            State() : len(0), link(-1) {
                memset(next, -1, sizeof(next));
            }
        };

        State st[MAXLEN * 2]; // Tối đa 2N - 1 trạng thái
        int sz;               // Số trạng thái hiện tại
        int last;             // Trạng thái cuối cùng (đại diện cho toàn bộ xâu hiện tại)

        SuffixAutomaton() {
            st[0].len = 0;
            st[0].link = -1;
            sz = 1;
            last = 0;
        }

        void extend(char ch) {
            int c = ch - 'a';
            int cur = sz++;
            st[cur].len = st[last].len + 1;

            int p = last;
            // Bước 1: Duyệt suffix link, thêm cạnh trỏ đến cur
            while (p != -1 && st[p].next[c] == -1) {
                st[p].next[c] = cur;
                p = st[p].link;
            }

            if (p == -1) {
                // Không tìm thấy trạng thái nào có cạnh c
                st[cur].link = 0;
            } else {
                int q = st[p].next[c];
                if (st[p].len + 1 == st[q].len) {
                    // Trường hợp tốt: len[q] = len[p] + 1
                    st[cur].link = q;
                } else {
                    // Cần clone trạng thái q
                    int clone = sz++;
                    st[clone].len = st[p].len + 1;
                    st[clone].link = st[q].link;
                    memcpy(st[clone].next, st[q].next, sizeof(st[q].next));

                    // Sửa các cạnh trỏ đến q → trỏ đến clone
                    while (p != -1 && st[p].next[c] == q) {
                        st[p].next[c] = clone;
                        p = st[p].link;
                    }

                    st[q].link = st[cur].link = clone;
                }
            }
            last = cur;
        }

        void build(const string& s) {
            for (char ch : s) {
                extend(ch);
            }
        }
    };

    int main() {
        ios_base::sync_with_stdio(false);
        cin.tie(NULL);

        string s;
        cin >> s;

        SuffixAutomaton sam;
        sam.build(s);

        // In thông tin SAM
        for (int i = 0; i < sam.sz; i++) {
            cout << "State " << i
                 << ": len=" << sam.st[i].len
                 << ", link=" << sam.st[i].link << "\n";
        }

        return 0;
    }
    ```

=== "Python"

    ```python
    class SuffixAutomaton:
        def __init__(self, max_states=200005 * 2):
            self.next = [[-1] * 26 for _ in range(max_states)]
            self.link = [-1] * max_states
            self.length = [0] * max_states
            self.sz = 1          # Số trạng thái hiện tại
            self.last = 0        # Trạng thái cuối cùng

        def extend(self, ch):
            c = ord(ch) - ord('a')
            cur = self.sz
            self.sz += 1
            self.length[cur] = self.length[self.last] + 1

            p = self.last
            # Bước 1: Duyệt suffix link, thêm cạnh trỏ đến cur
            while p != -1 and self.next[p][c] == -1:
                self.next[p][c] = cur
                p = self.link[p]

            if p == -1:
                self.link[cur] = 0
            else:
                q = self.next[p][c]
                if self.length[p] + 1 == self.length[q]:
                    self.link[cur] = q
                else:
                    # Clone trạng thái q
                    clone = self.sz
                    self.sz += 1
                    self.length[clone] = self.length[p] + 1
                    self.link[clone] = self.link[q]
                    self.next[clone] = self.next[q][:]

                    while p != -1 and self.next[p][c] == q:
                        self.next[p][c] = clone
                        p = self.link[p]

                    self.link[q] = clone
                    self.link[cur] = clone

            self.last = cur

        def build(self, s):
            for ch in s:
                self.extend(ch)


    # Sử dụng
    s = input().strip()
    sam = SuffixAutomaton()
    sam.build(s)

    for i in range(sam.sz):
        print(f"State {i}: len={sam.length[i]}, link={sam.link[i]}")
    ```

---

## 4. Trace từng bước: Xây dựng SAM cho "abcbc"

### Bước 1: Thêm 'a' (vị trí 0)

```
Tạo state 1: len=1
p = 0 (init), c = 'a'
  state 0 chưa có cạnh 'a' → next[0]['a'] = 1
  p = link[0] = -1 → dừng
p == -1 → link[1] = 0

Kết quả:
  State 0: len=0, link=-1, next={a:1}
  State 1: len=1, link=0
  last = 1
```

### Bước 2: Thêm 'b' (vị trí 1)

```
Tạo state 2: len=2
p = 1, c = 'b'
  state 1 chưa có cạnh 'b' → next[1]['b'] = 2
  p = link[1] = 0
  state 0 chưa có cạnh 'b' → next[0]['b'] = 2
  p = link[0] = -1 → dừng
p == -1 → link[2] = 0

Kết quả:
  State 0: len=0, next={a:1, b:2}
  State 1: len=1, link=0, next={b:2}
  State 2: len=2, link=0
  last = 2
```

### Bước 3: Thêm 'c' (vị trí 2)

```
Tạo state 3: len=3
p = 2, c = 'c'
  state 2 chưa có cạnh 'c' → next[2]['c'] = 3
  p = link[2] = 0
  state 0 chưa có cạnh 'c' → next[0]['c'] = 3
  p = link[0] = -1 → dừng
p == -1 → link[3] = 0

Kết quả:
  State 0: len=0, next={a:1, b:2, c:3}
  State 1: len=1, link=0, next={b:2}
  State 2: len=2, link=0, next={c:3}
  State 3: len=3, link=0
  last = 3
```

### Bước 4: Thêm 'b' (vị trí 3)

```
Tạo state 4: len=4
p = 3, c = 'b'
  state 3 chưa có cạnh 'b' → next[3]['b'] = 4
  p = link[3] = 0
  state 0 CÓ cạnh 'b' → next[0]['b'] = 2, q = 2
  Kiểm tra: len[p]+1 = 1, len[q] = 2
  len[p]+1 < len[q] → CẦN CLONE!

  Clone state 2 → state 5:
    len[5] = len[0] + 1 = 1
    link[5] = link[2] = 0
    next[5] = next[2] = {c:3}

  Sửa cạnh: next[0]['b'] đang trỏ đến 2, len[0]+1=1 < len[2]=2
    → next[0]['b'] = 5

  link[2] = 5, link[4] = 5

Kết quả:
  State 0: len=0, next={a:1, b:5, c:3}
  State 1: len=1, link=0, next={b:2}
  State 2: len=2, link=5, next={c:3}
  State 3: len=3, link=0, next={b:4}
  State 4: len=4, link=5
  State 5: len=1, link=0, next={c:3}     ← CLONE
  last = 4
```

### Bước 5: Thêm 'c' (vị trí 4)

```
Tạo state 6: len=5
p = 4, c = 'c'
  state 4 chưa có cạnh 'c' → next[4]['c'] = 6
  p = link[4] = 5
  state 5 CÓ cạnh 'c' → next[5]['c'] = 3, q = 3
  Kiểm tra: len[p]+1 = 2, len[q] = 3
  len[p]+1 < len[q] → CẦN CLONE!

  Clone state 3 → state 7:
    len[7] = len[5] + 1 = 2
    link[7] = link[3] = 0
    next[7] = next[3] = {b:4}

  Sửa cạnh: next[5]['b']? state 5 không có cạnh 'b' → dừng
  link[3] = 7, link[6] = 7

Kết quả cuối cùng:
  State 0: len=0, next={a:1, b:5, c:3}         [init]
  State 1: len=1, link=0, next={b:2}            [a]
  State 2: len=2, link=5, next={c:3}            [ab]
  State 3: len=3, link=7, next={b:4}            [abc]
  State 4: len=4, link=5, next={c:6}            [abcb]
  State 5: len=1, link=0, next={c:7}            [b]  (clone)
  State 6: len=5, link=7                        [abcbc]
  State 7: len=2, link=0, next={b:4}            [bc] (clone)
  last = 6
```

### Cây suffix link

```
         0 (init)
       / | \
      1  5  7
      |     |
      2     4
      |     |
      3     6
```

---

## 5. Ứng dụng 1: Đếm số xâu con khác nhau

### Ý tưởng

Mỗi trạng thái v trong SAM đại diện cho `len[v] - len[link[v]]` xâu con khác nhau.

**Tổng số xâu con khác nhau** = Σ (len[v] - len[link[v]]) với mọi v ≠ 0.

```
Giải thích:
- Trạng thái v chứa các xâu con có độ dài từ len[link[v]]+1 đến len[v]
- Số xâu con trong v = len[v] - len[link[v]]
```

### Code

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    const int MAXLEN = 200005;

    struct SuffixAutomaton {
        struct State {
            int len, link;
            int next[26];
            State() : len(0), link(-1) { memset(next, -1, sizeof(next)); }
        };

        State st[MAXLEN * 2];
        int sz, last;

        SuffixAutomaton() {
            st[0].len = 0; st[0].link = -1;
            sz = 1; last = 0;
        }

        void extend(char ch) {
            int c = ch - 'a';
            int cur = sz++;
            st[cur].len = st[last].len + 1;
            int p = last;
            while (p != -1 && st[p].next[c] == -1) {
                st[p].next[c] = cur;
                p = st[p].link;
            }
            if (p == -1) {
                st[cur].link = 0;
            } else {
                int q = st[p].next[c];
                if (st[p].len + 1 == st[q].len) {
                    st[cur].link = q;
                } else {
                    int clone = sz++;
                    st[clone].len = st[p].len + 1;
                    st[clone].link = st[q].link;
                    memcpy(st[clone].next, st[q].next, sizeof(st[q].next));
                    while (p != -1 && st[p].next[c] == q) {
                        st[p].next[c] = clone;
                        p = st[p].link;
                    }
                    st[q].link = st[cur].link = clone;
                }
            }
            last = cur;
        }

        long long countDistinctSubstrings() {
            long long ans = 0;
            for (int i = 1; i < sz; i++) {
                ans += st[i].len - st[st[i].link].len;
            }
            return ans;
        }
    };

    int main() {
        ios_base::sync_with_stdio(false);
        cin.tie(NULL);

        string s;
        cin >> s;

        SuffixAutomaton sam;
        for (char ch : s) sam.extend(ch);

        cout << sam.countDistinctSubstrings() << "\n";
        return 0;
    }
    ```

=== "Python"

    ```python
    class SuffixAutomaton:
        def __init__(self, max_states=400010):
            self.next = [[-1] * 26 for _ in range(max_states)]
            self.link = [-1] * max_states
            self.length = [0] * max_states
            self.sz = 1
            self.last = 0

        def extend(self, ch):
            c = ord(ch) - ord('a')
            cur = self.sz; self.sz += 1
            self.length[cur] = self.length[self.last] + 1
            p = self.last
            while p != -1 and self.next[p][c] == -1:
                self.next[p][c] = cur
                p = self.link[p]
            if p == -1:
                self.link[cur] = 0
            else:
                q = self.next[p][c]
                if self.length[p] + 1 == self.length[q]:
                    self.link[cur] = q
                else:
                    clone = self.sz; self.sz += 1
                    self.length[clone] = self.length[p] + 1
                    self.link[clone] = self.link[q]
                    self.next[clone] = self.next[q][:]
                    while p != -1 and self.next[p][c] == q:
                        self.next[p][c] = clone
                        p = self.link[p]
                    self.link[q] = clone
                    self.link[cur] = clone
            self.last = cur

        def count_distinct_substrings(self):
            ans = 0
            for i in range(1, self.sz):
                ans += self.length[i] - self.length[self.link[i]]
            return ans


    s = input().strip()
    sam = SuffixAutomaton()
    for ch in s:
        sam.extend(ch)
    print(sam.count_distinct_substrings())
    ```

### Ví dụ

```
S = "abcbc"
Xâu con khác nhau: a, ab, abc, abcb, abcbc, b, bc, bcb, bcbc, c, cb, cbc → 12

Tính bằng SAM:
State 1: len(1) - len(link=0) = 1 - 0 = 1   [a]
State 2: len(2) - len(link=5) = 2 - 1 = 1   [ab]
State 3: len(3) - len(link=7) = 3 - 2 = 1   [abc]
State 4: len(4) - len(link=5) = 4 - 1 = 3   [abcb, bcb, cb]
State 5: len(1) - len(link=0) = 1 - 0 = 1   [b]
State 6: len(5) - len(link=7) = 5 - 2 = 3   [abcbc, bcbc, cbc]
State 7: len(2) - len(link=0) = 2 - 0 = 2   [bc, c]

Tổng: 1 + 1 + 1 + 3 + 1 + 3 + 2 = 12 ✓
```

---

## 6. Ứng dụng 2: Xâu con chung dài nhất (LCS) của hai xâu

### Ý tưởng

1. Xây dựng SAM cho xâu S₁
2. Duyệt xâu S₂ trên SAM: với mỗi ký tự, đi theo cạnh tương ứng
3. Nếu không có cạnh → quay lại suffix link
4. Ghi nhận độ dài lớn nhất đạt được tại mỗi bước

### Code

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    const int MAXLEN = 200005;

    struct SuffixAutomaton {
        struct State {
            int len, link;
            int next[26];
            State() : len(0), link(-1) { memset(next, -1, sizeof(next)); }
        };

        State st[MAXLEN * 2];
        int sz, last;

        SuffixAutomaton() {
            st[0].len = 0; st[0].link = -1;
            sz = 1; last = 0;
        }

        void extend(char ch) {
            int c = ch - 'a';
            int cur = sz++;
            st[cur].len = st[last].len + 1;
            int p = last;
            while (p != -1 && st[p].next[c] == -1) {
                st[p].next[c] = cur;
                p = st[p].link;
            }
            if (p == -1) {
                st[cur].link = 0;
            } else {
                int q = st[p].next[c];
                if (st[p].len + 1 == st[q].len) {
                    st[cur].link = q;
                } else {
                    int clone = sz++;
                    st[clone].len = st[p].len + 1;
                    st[clone].link = st[q].link;
                    memcpy(st[clone].next, st[q].next, sizeof(st[q].next));
                    while (p != -1 && st[p].next[c] == q) {
                        st[p].next[c] = clone;
                        p = st[p].link;
                    }
                    st[q].link = st[cur].link = clone;
                }
            }
            last = cur;
        }

        void build(const string& s) {
            for (char ch : s) extend(ch);
        }

        // Tìm xâu con chung dài nhất với xâu t
        string longestCommonSubstring(const string& t) {
            int v = 0, l = 0, best = 0, bestpos = 0;

            for (int i = 0; i < (int)t.size(); i++) {
                int c = t[i] - 'a';
                if (st[v].next[c] != -1) {
                    v = st[v].next[c];
                    l++;
                } else {
                    while (v != -1 && st[v].next[c] == -1) {
                        v = st[v].link;
                    }
                    if (v == -1) {
                        v = 0; l = 0;
                    } else {
                        l = st[v].len + 1;
                        v = st[v].next[c];
                    }
                }
                if (l > best) {
                    best = l;
                    bestpos = i;
                }
            }

            return t.substr(bestpos - best + 1, best);
        }
    };

    int main() {
        ios_base::sync_with_stdio(false);
        cin.tie(NULL);

        string s1, s2;
        cin >> s1 >> s2;

        SuffixAutomaton sam;
        sam.build(s1);

        string lcs = sam.longestCommonSubstring(s2);
        cout << lcs.size() << "\n";
        if (!lcs.empty()) cout << lcs << "\n";

        return 0;
    }
    ```

=== "Python"

    ```python
    class SuffixAutomaton:
        def __init__(self, max_states=400010):
            self.next = [[-1] * 26 for _ in range(max_states)]
            self.link = [-1] * max_states
            self.length = [0] * max_states
            self.sz = 1
            self.last = 0

        def extend(self, ch):
            c = ord(ch) - ord('a')
            cur = self.sz; self.sz += 1
            self.length[cur] = self.length[self.last] + 1
            p = self.last
            while p != -1 and self.next[p][c] == -1:
                self.next[p][c] = cur
                p = self.link[p]
            if p == -1:
                self.link[cur] = 0
            else:
                q = self.next[p][c]
                if self.length[p] + 1 == self.length[q]:
                    self.link[cur] = q
                else:
                    clone = self.sz; self.sz += 1
                    self.length[clone] = self.length[p] + 1
                    self.link[clone] = self.link[q]
                    self.next[clone] = self.next[q][:]
                    while p != -1 and self.next[p][c] == q:
                        self.next[p][c] = clone
                        p = self.link[p]
                    self.link[q] = clone
                    self.link[cur] = clone
            self.last = cur

        def build(self, s):
            for ch in s:
                self.extend(ch)

        def longest_common_substring(self, t):
            v, l, best, best_pos = 0, 0, 0, 0
            for i, ch in enumerate(t):
                c = ord(ch) - ord('a')
                if self.next[v][c] != -1:
                    v = self.next[v][c]
                    l += 1
                else:
                    while v != -1 and self.next[v][c] == -1:
                        v = self.link[v]
                    if v == -1:
                        v, l = 0, 0
                    else:
                        l = self.length[v] + 1
                        v = self.next[v][c]
                if l > best:
                    best = l
                    best_pos = i
            return t[best_pos - best + 1 : best_pos + 1]


    s1 = input().strip()
    s2 = input().strip()

    sam = SuffixAutomaton()
    sam.build(s1)

    lcs = sam.longest_common_substring(s2)
    print(len(lcs))
    if lcs:
        print(lcs)
    ```

### Ví dụ

```
S₁ = "abcbc"
S₂ = "cbabd"

Duyệt S₂ trên SAM của S₁:
  'c' → state 3 (len=1) → l=1
  'b' → state 4 (len=2) → l=2    (xâu "cb")
  'a' → không có cạnh từ state 4
        → link[4]=5, next[5]['a']? Không
        → link[5]=0, next[0]['a']=1 → state 1, l=1
  'b' → state 2 (len=2) → l=2    (xâu "ab")
  'd' → không có cạnh → l=0

LCS = "cb" hoặc "ab", độ dài = 2
```

---

## 7. Ứng dụng 3: Đếm số lần xuất hiện

### Ý tưởng

Mỗi trạng thái v có `endpos` là tập các vị trí kết thúc. Số phần tử trong `endpos` chính là số lần xâu con tương ứng xuất hiện.

**Cách tính:**

1. Gán `cnt[v] = 1` cho trạng thái cuối cùng (last), `cnt[v] = 0` cho các trạng thái khác
2. Sắp xếp các trạng thái theo `len` giảm dần
3. Với mỗi trạng thái v: `cnt[link[v]] += cnt[v]`

**Lý do:** Nếu xâu con trong trạng thái v xuất hiện k lần, thì hậu tố của nó (trong trạng thái link[v]) cũng xuất hiện ít nhất k lần.

### Code

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    const int MAXLEN = 200005;

    struct SuffixAutomaton {
        struct State {
            int len, link;
            int next[26];
            long long cnt;  // Số lần xuất hiện
            State() : len(0), link(-1), cnt(0) {
                memset(next, -1, sizeof(next));
            }
        };

        State st[MAXLEN * 2];
        int sz, last;

        SuffixAutomaton() {
            st[0].len = 0; st[0].link = -1;
            sz = 1; last = 0;
        }

        void extend(char ch) {
            int c = ch - 'a';
            int cur = sz++;
            st[cur].len = st[last].len + 1;
            st[cur].cnt = 1;  // Mỗi trạng thái mới đại diện cho 1 vị trí kết thúc
            int p = last;
            while (p != -1 && st[p].next[c] == -1) {
                st[p].next[c] = cur;
                p = st[p].link;
            }
            if (p == -1) {
                st[cur].link = 0;
            } else {
                int q = st[p].next[c];
                if (st[p].len + 1 == st[q].len) {
                    st[cur].link = q;
                } else {
                    int clone = sz++;
                    st[clone].len = st[p].len + 1;
                    st[clone].link = st[q].link;
                    st[clone].cnt = 0;  // Clone không thêm vị trí kết thúc mới
                    memcpy(st[clone].next, st[q].next, sizeof(st[q].next));
                    while (p != -1 && st[p].next[c] == q) {
                        st[p].next[c] = clone;
                        p = st[p].link;
                    }
                    st[q].link = st[cur].link = clone;
                }
            }
            last = cur;
        }

        void build(const string& s) {
            for (char ch : s) extend(ch);
        }

        // Tính số lần xuất hiện cho mỗi trạng thái
        void computeOccurrences() {
            // Sắp xếp theo len giảm dần bằng counting sort
            vector<int> cnt_by_len(MAXLEN * 2, 0);
            for (int i = 0; i < sz; i++) cnt_by_len[st[i].len]++;
            for (int i = 1; i < MAXLEN * 2; i++) cnt_by_len[i] += cnt_by_len[i-1];
            vector<int> order(sz);
            for (int i = sz - 1; i >= 0; i--) {
                order[--cnt_by_len[st[i].len]] = i;
            }

            // Duyệt từ trạng thái có len lớn nhất
            for (int i = sz - 1; i >= 1; i--) {
                int v = order[i];
                if (st[v].link != -1) {
                    st[st[v].link].cnt += st[v].cnt;
                }
            }
        }

        // Tìm số lần xuất hiện của xâu con t
        long long countOccurrences(const string& t) {
            int v = 0;
            for (char ch : t) {
                int c = ch - 'a';
                if (st[v].next[c] == -1) return 0;
                v = st[v].next[c];
            }
            return st[v].cnt;
        }
    };

    int main() {
        ios_base::sync_with_stdio(false);
        cin.tie(NULL);

        string s;
        cin >> s;

        SuffixAutomaton sam;
        sam.build(s);
        sam.computeOccurrences();

        int q;
        cin >> q;
        while (q--) {
            string t;
            cin >> t;
            cout << sam.countOccurrences(t) << "\n";
        }

        return 0;
    }
    ```

=== "Python"

    ```python
    class SuffixAutomaton:
        def __init__(self, max_states=400010):
            self.next = [[-1] * 26 for _ in range(max_states)]
            self.link = [-1] * max_states
            self.length = [0] * max_states
            self.cnt = [0] * max_states
            self.sz = 1
            self.last = 0

        def extend(self, ch):
            c = ord(ch) - ord('a')
            cur = self.sz; self.sz += 1
            self.length[cur] = self.length[self.last] + 1
            self.cnt[cur] = 1
            p = self.last
            while p != -1 and self.next[p][c] == -1:
                self.next[p][c] = cur
                p = self.link[p]
            if p == -1:
                self.link[cur] = 0
            else:
                q = self.next[p][c]
                if self.length[p] + 1 == self.length[q]:
                    self.link[cur] = q
                else:
                    clone = self.sz; self.sz += 1
                    self.length[clone] = self.length[p] + 1
                    self.link[clone] = self.link[q]
                    self.cnt[clone] = 0
                    self.next[clone] = self.next[q][:]
                    while p != -1 and self.next[p][c] == q:
                        self.next[p][c] = clone
                        p = self.link[p]
                    self.link[q] = clone
                    self.link[cur] = clone
            self.last = cur

        def build(self, s):
            for ch in s:
                self.extend(ch)

        def compute_occurrences(self):
            # Sắp xếp theo length giảm dần
            order = sorted(range(self.sz), key=lambda i: self.length[i], reverse=True)
            for v in order:
                if self.link[v] != -1:
                    self.cnt[self.link[v]] += self.cnt[v]

        def count_occurrences(self, t):
            v = 0
            for ch in t:
                c = ord(ch) - ord('a')
                if self.next[v][c] == -1:
                    return 0
                v = self.next[v][c]
            return self.cnt[v]


    s = input().strip()
    sam = SuffixAutomaton()
    sam.build(s)
    sam.compute_occurrences()

    q = int(input())
    for _ in range(q):
        t = input().strip()
        print(sam.count_occurrences(t))
    ```

---

## 8. Ứng dụng 4: Xâu con thứ K theo thứ tự từ điển

### Ý tưởng

1. Xây dựng SAM, tính `cnt[v]` = số đường đi từ trạng thái v đến trạng thái kết thúc (số xâu con bắt đầu từ v)
2. Duyệt từ trạng thái init, với mỗi cạnh theo thứ tự từ điển, nhảy sang nếu K ≤ cnt[next]

### Code

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    const int MAXLEN = 200005;

    struct SuffixAutomaton {
        struct State {
            int len, link;
            int next[26];
            long long cnt;  // Số đường đi từ trạng thái này
            State() : len(0), link(-1), cnt(-1) {
                memset(next, -1, sizeof(next));
            }
        };

        State st[MAXLEN * 2];
        int sz, last;

        SuffixAutomaton() {
            st[0].len = 0; st[0].link = -1;
            sz = 1; last = 0;
        }

        void extend(char ch) {
            int c = ch - 'a';
            int cur = sz++;
            st[cur].len = st[last].len + 1;
            int p = last;
            while (p != -1 && st[p].next[c] == -1) {
                st[p].next[c] = cur;
                p = st[p].link;
            }
            if (p == -1) {
                st[cur].link = 0;
            } else {
                int q = st[p].next[c];
                if (st[p].len + 1 == st[q].len) {
                    st[cur].link = q;
                } else {
                    int clone = sz++;
                    st[clone].len = st[p].len + 1;
                    st[clone].link = st[q].link;
                    memcpy(st[clone].next, st[q].next, sizeof(st[q].next));
                    while (p != -1 && st[p].next[c] == q) {
                        st[p].next[c] = clone;
                        p = st[p].link;
                    }
                    st[q].link = st[cur].link = clone;
                }
            }
            last = cur;
        }

        void build(const string& s) {
            for (char ch : s) extend(ch);
        }

        // Đếm số đường đi (số xâu con) từ trạng thái v
        long long countPaths(int v) {
            if (st[v].cnt != -1) return st[v].cnt;
            st[v].cnt = 1;  // Xâu rỗng (trạng thái hiện tại)
            for (int c = 0; c < 26; c++) {
                if (st[v].next[c] != -1) {
                    st[v].cnt += countPaths(st[v].next[c]);
                }
            }
            return st[v].cnt;
        }

        // Tìm xâu con thứ K (1-indexed)
        string kthSubstring(long long k) {
            countPaths(0);
            if (k > st[0].cnt - 1) return "";  // Không đủ xâu con

            string result;
            int v = 0;

            while (k > 0) {
                for (int c = 0; c < 26; c++) {
                    if (st[v].next[c] == -1) continue;
                    int u = st[v].next[c];
                    if (k <= st[u].cnt) {
                        result += (char)('a' + c);
                        v = u;
                        break;
                    }
                    k -= st[u].cnt;
                }
            }

            return result;
        }
    };

    int main() {
        ios_base::sync_with_stdio(false);
        cin.tie(NULL);

        string s;
        long long k;
        cin >> s >> k;

        SuffixAutomaton sam;
        sam.build(s);

        string ans = sam.kthSubstring(k);
        if (ans.empty()) {
            cout << "No such substring.\n";
        } else {
            cout << ans << "\n";
        }

        return 0;
    }
    ```

=== "Python"

    ```python
    import sys
    sys.setrecursionlimit(300000)

    class SuffixAutomaton:
        def __init__(self, max_states=400010):
            self.next = [[-1] * 26 for _ in range(max_states)]
            self.link = [-1] * max_states
            self.length = [0] * max_states
            self.cnt = [-1] * max_states
            self.sz = 1
            self.last = 0

        def extend(self, ch):
            c = ord(ch) - ord('a')
            cur = self.sz; self.sz += 1
            self.length[cur] = self.length[self.last] + 1
            p = self.last
            while p != -1 and self.next[p][c] == -1:
                self.next[p][c] = cur
                p = self.link[p]
            if p == -1:
                self.link[cur] = 0
            else:
                q = self.next[p][c]
                if self.length[p] + 1 == self.length[q]:
                    self.link[cur] = q
                else:
                    clone = self.sz; self.sz += 1
                    self.length[clone] = self.length[p] + 1
                    self.link[clone] = self.link[q]
                    self.next[clone] = self.next[q][:]
                    while p != -1 and self.next[p][c] == q:
                        self.next[p][c] = clone
                        p = self.link[p]
                    self.link[q] = clone
                    self.link[cur] = clone
            self.last = cur

        def build(self, s):
            for ch in s:
                self.extend(ch)

        def count_paths(self, v):
            if self.cnt[v] != -1:
                return self.cnt[v]
            self.cnt[v] = 1
            for c in range(26):
                if self.next[v][c] != -1:
                    self.cnt[v] += self.count_paths(self.next[v][c])
            return self.cnt[v]

        def kth_substring(self, k):
            self.count_paths(0)
            if k > self.cnt[0] - 1:
                return ""
            result = []
            v = 0
            while k > 0:
                for c in range(26):
                    if self.next[v][c] == -1:
                        continue
                    u = self.next[v][c]
                    if k <= self.cnt[u]:
                        result.append(chr(ord('a') + c))
                        v = u
                        break
                    k -= self.cnt[u]
            return ''.join(result)


    s = input().strip()
    k = int(input())

    sam = SuffixAutomaton()
    sam.build(s)

    ans = sam.kth_substring(k)
    if not ans:
        print("No such substring.")
    else:
        print(ans)
    ```

---

## 9. So sánh: SAM vs Suffix Array

| Tiêu chí | Suffix Automaton | Suffix Array |
|---|---|---|
| **Bộ nhớ** | O(N) trạng thái, O(N) cạnh | O(N) |
| **Xây dựng** | O(N) online | O(N log N) hoặc O(N) |
| **Đếm xâu con khác nhau** | O(N) — đơn giản | O(N log N) — cần LCP |
| **Xâu con chung dài nhất** | O(N) — match trên SAM | O(N) — cần suffix array 2 xâu |
| **Số lần xuất hiện** | O(N) — DP trên cây | O(N) — cần LCP + RMQ |
| **Xâu con thứ K** | O(N) — DP + duyệt | O(N) — duyệt suffix array |
| **Thêm ký tự đầu** | Khó (cần rebuild) | Khó |
| **Thêm ký tự cuối** | O(1) amortized | O(N log N) rebuild |
| **Triển khai** | Phức tạp hơn | Đơn giản hơn |

### Khi nào dùng SAM?

- Cần **xây dựng online** (xử lý streaming)
- Bài toán liên quan đến **xâu con** (distinct substrings, occurrences)
- Cần tìm **xâu con chung** của nhiều xâu
- Bài toán yêu cầu **duyệt trên automaton** (pattern matching nhiều pattern)

### Khi nào dùng Suffix Array?

- Bài toán liên quan đến **hậu tố** (suffix comparison, LCP)
- Cần **sắp xếp hậu tố**
- Triển khai nhanh, ít bug hơn

---

## 10. Lưu ý và cạm bẫy

### Kích thước mảng

```cpp
// SAM có tối đa 2N - 1 trạng thái
// Luôn khai báo mảng có kích thước 2*N hoặc 4*N
const int MAXLEN = 200005;
State st[MAXLEN * 2];  // ← KHÔNG PHẢI st[MAXLEN]!
```

### Phép Clone

- Clone **phải** sao chép toàn bộ cạnh và suffix link
- `cnt[clone] = 0` (clone không thêm vị trí kết thúc mới)
- Sau clone, phải cập nhật suffix link cho cả `q` và `cur`

### Khởi tạo

- Trạng thái 0 là trạng thái init: `len[0] = 0`, `link[0] = -1`
- `last = 0` ban đầu
- `sz = 1` (chỉ có trạng thái init)

### Ký tự

- Code trên giả sử chỉ có 26 chữ cái thường (a-z)
- Nếu có nhiều ký tự hơn → dùng `map<char,int>` thay vì mảng `next[26]`
- Nếu dùng `map`: độ phức tạp mỗi bước là O(log Σ) thay vì O(1)

### 0-indexed vs 1-indexed

- Các trạng thái trong SAM là **0-indexed** (state 0 = init)
- Khi đếm xâu con khác nhau, bỏ qua state 0 (xâu rỗng)
- Khi tính `cnt`, gán `cnt[v] = 1` cho trạng thái mới tạo, `cnt[clone] = 0`

### Tránh TLE

- Dùng mảng `int next[26]` thay vì `map<char,int>` khi chỉ có chữ cái thường
- Dùng counting sort thay vì `std::sort` khi sắp xếp trạng thái theo `len`

---

## 11. Bài tập luyện tập

| Bài | Nguồn | Độ khó | Ghi chú |
|---|---|---|---|
| Distinct Substrings | SPOJ - SUBST1 | ★★☆ | Ứng dụng 1 trực tiếp |
| Longest Common Substring | SPOJ - LCS | ★★☆ | Ứng dụng 2 trực tiếp |
| Longest Common Substring (3 strings) | SPOJ - LCS3 | ★★★ | Mở rộng LCS |
| Number of Occurrences | CF - 271D | ★★☆ | Đếm occurrences |
| K-th Substring | CF - 128B | ★★★ | Xâu con thứ K |
| Password | CF - 126B | ★★★ | Xâu con vừa là prefix vừa là suffix, xuất hiện giữa |
| String Set Queries | CF - 710F | ★★★★ | Dynamic SAM |
| Palindromes and Supersequences | CF - 932G | ★★★★★ | SAM + palindromic tree |
| [CSES - Distinct Substrings](https://cses.fi/problemset/task/2105) | CSES | ★★☆ | Đếm xâu con khác nhau |
| [CSES - Repeating Substring](https://cses.fi/problemset/task/2106) | CSES | ★★★ | Tìm xâu con lặp lại dài nhất |
| [CSES - Substring Order I](https://cses.fi/problemset/task/2108) | CSES | ★★★ | Xâu con thứ K |
| [CSES - Substring Distribution](https://cses.fi/problemset/task/2110) | CSES | ★★★ | Thống kê xâu con |
| [CSES - Pattern Positions](https://cses.fi/problemset/task/2104) | CSES | ★★★ | Tìm vị trí mẫu |
| [VNOJ - SUBSTR](https://oj.vnoi.info/problem/substr) | VNOJ | ★★☆ | Tìm xâu con |

---

## Tóm tắt

```
Suffix Automaton = DFA tối thiểu nhận tất cả hậu tố
├── Trạng thái = lớp tương đương endpos
├── len[v] = độ dài dài nhất trong trạng thái v
├── link[v] = suffix link → hậu tố dài nhất khác lớp
├── next[v][c] = cạnh chuyển
│
├── Xây dựng: O(N) online
├── Bộ nhớ: O(N) trạng thái, O(N) cạnh
│
└── Ứng dụng:
    ├── Đếm xâu con khác nhau: Σ(len[v] - len[link[v]])
    ├── LCS hai xâu: match trên SAM
    ├── Số lần xuất hiện: DP trên suffix link tree
    └── Xâu con thứ K: DP đếm đường đi + duyệt
```
