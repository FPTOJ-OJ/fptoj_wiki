# Bài 20: Manacher - Tìm Palindrome Dài Nhất

> **Tác giả:** Hà Trí Kiên<br>
> **Nội dung tham khảo từ:** VNOI Wiki - Thuật toán Manacher

## 1. Palindrome là gì?

**Palindrome** = Xâu đọc xuôi ngược đều giống. Ví dụ: "aba", "abba", "racecar".

### Bài toán: Tìm palindrome dài nhất trong xâu

Cho xâu S, tìm palindrome con dài nhất.

**Cách "ngốc":** Thử mọi cặp (i, j), kiểm tra có palindrome không → O(N³).
**Hash xâu + Binary Search:** O(N log N).
**Manacher:** O(N)! Thuật toán tuyến tính tốt nhất.

---

## 2. Vấn đề với cách tiếp cận trực tiếp

Palindrome có 2 loại:

- **Palindrome lẻ:** "aba" (tâm = ký tự 'b')
- **Palindrome chẵn:** "abba" (tâm = giữa 'b' và 'b')

Nếu xử lý riêng 2 loại → code phức tạp, dễ sai. Manacher giải quyết bằng cách **chèn ký tự đặc biệt** để chuyển tất cả thành palindrome lẻ!

---

## 3. Ý tưởng Manacher - Bước 1: Chèn ký tự đặc biệt

Chèn `#` giữa các ký tự và thêm `^` ở đầu, `$` ở cuối:

```
"abba" → "^#a#b#b#a#$"
"aba"  → "^#a#b#a#$"
```

Sau khi chèn:

- Palindrome chẵn "abba" (4 ký tự) → "#a#b#b#a#" (9 ký tự, bán kính 4)
- Palindrome lẻ "aba" (3 ký tự) → "#a#b#a#" (7 ký tự, bán kính 3)
- **Tất cả đều trở thành palindrome lẻ!**

Công thức: palindrome dài L trong xâu gốc → palindrome dài 2L+1 trong xâu mới → bán kính = L.

---

## 4. Ý tưởng Manacher - Bước 2: Mảng P và kỹ thuật "nhân đôi thông tin"

### Mảng P

P[i] = bán kính palindrome lớn nhất có tâm tại i (trong xâu đã chèn).

```
Xâu đã chèn: # a # b # b # a #
Chỉ số:      0 1 2 3 4 5 6 7 8
P:            0 1 0 1 4 1 0 1 0
                  ↑
            P[4]=4 → palindrome có tâm tại index 4 ('#' giữa 2 b)
            Bán kính 4 → "abba" dài 4 ký tự trong xâu gốc
```

### Kỹ thuật: Dùng thông tin đã tính

Khi tính P[i], nếu ta đã biết palindrome bao quanh tâm `C` trước đó (với biên phải R), ta có thể **khởi tạo** P[i] từ P[i_mirror] mà không cần so sánh lại từ đầu.

**i_mirror** = điểm đối xứng của i qua C = `2*C - i`

```
Ví dụ: C = 4, R = 8 (palindrome "a#b#b#a" có tâm 4, biên phải 8)

Xâu: # a # b # b # a #
     0 1 2 3 4 5 6 7 8
     ↑       ↑       ↑
   i=2     C=4     i_mirror=6

Nếu P[6] đã biết, ta có thể khởi tạo P[2] = min(R-i, P[6])
```

### 3 trường hợp

Khi tính P[i]:

**Trường hợp 1: i >= R** (i nằm ngoài palindrome hiện tại)

- Không có thông tin nào reuse được → P[i] = 0, mở rộng từ đầu

**Trường hợp 2: i < R và P[i_mirror] < R - i**

- Palindrome tại i_mirror nằm hoàn toàn trong palindrome tại C
- → P[i] = P[i_mirror] (đối xứng hoàn toàn)

**Trường hợp 3: i < R và P[i_mirror] >= R - i**

- Palindrome tại i_mirror "tràn" ra ngoài palindrome tại C
- → P[i] ít nhất = R - i, sau đó cần mở rộng thêm

---

## 5. Code C++ - Chi tiết từng bước

```cpp
#include <bits/stdc++.h>
using namespace std;

// Bước 1: Chèn ký tự đặc biệt
// "aba" → "^#a#b#a#$"
// Thêm ^ và $ để tránh kiểm tra biên
string preprocess(string s) {
    string t = "^";
    for (char c : s) {
        t += '#';
        t += c;
    }
    t += "#$";
    return t;
}

// Manacher - O(N)
pair<int,int> manacher(string s) {
    string t = preprocess(s);
    int n = t.length();
    vector<int> P(n, 0);  // P[i] = bán kính palindrome tại tâm i
    int C = 0, R = 0;     // C = tâm palindrome hiện tại, R = biên phải
    
    // Duyệt từ 1 đến n-2 (bỏ qua ^ và $)
    for (int i = 1; i < n - 1; i++) {
        int i_mirror = 2 * C - i;  // Điểm đối xứng qua C
        
        // Khởi tạo P[i] từ thông tin đã có
        if (i < R)
            P[i] = min(R - i, P[i_mirror]);
        
        // Mở rộng palindrome tại tâm i
        // So sánh 2 ký tự ở 2 bên: t[i + P[i] + 1] và t[i - P[i] - 1]
        while (t[i + P[i] + 1] == t[i - P[i] - 1])
            P[i]++;
        
        // Cập nhật C và R nếu palindrome tại i mở rộng ra ngoài
        if (i + P[i] > R) {
            C = i;
            R = i + P[i];
        }
    }
    
    // Tìm palindrome dài nhất
    int maxLen = 0, center = 0;
    for (int i = 1; i < n - 1; i++) {
        if (P[i] > maxLen) {
            maxLen = P[i];
            center = i;
        }
    }
    
    // Chuyển từ chỉ số trong xâu đã chèn về xâu gốc
    int start = (center - maxLen) / 2;  // Vị trí bắt đầu trong xâu gốc
    return {start, maxLen};
}

int main() {
    string s = "babad";
    auto [start, len] = manacher(s);
    cout << s.substr(start, len) << endl;  // "bab" hoặc "aba"
}
```

### Code Python

```python
def manacher(s):
    t = '^#' + '#'.join(s) + '#$'
    n = len(t)
    p = [0] * n
    c, r = 0, 0
    for i in range(1, n - 1):
        if i < r:
            p[i] = min(r - i, p[2 * c - i])
        while t[i + p[i] + 1] == t[i - p[i] - 1]:
            p[i] += 1
        if i + p[i] > r:
            c, r = i, i + p[i]
    max_len = max(p)
    center = p.index(max_len)
    start = (center - max_len) // 2
    return s[start:start + max_len]
```

---

## 6. Bước chạy chi tiết

```
Xâu gốc: "abba"
Xâu đã chèn: "^#a#b#b#a#$"
Chỉ số:       0 1 2 3 4 5 6 7 8 9 10

i=1: t[1]='a', mở rộng: t[0]='^' != t[2]='#' → P[1]=0
     C=1, R=1

i=2: t[2]='#', i<R? 2>1 → không reuse
     Mở rộng: t[3]='b' != t[1]='a' → P[2]=0
     C=2, R=2

i=3: t[3]='b', i<R? 3>2 → không reuse
     Mở rộng: t[4]='#' != t[2]='#' → bằng nhau!
     P[3]=1, t[5]='b' != t[1]='a' → dừng
     P[3]=1, C=3, R=4

i=4: t[4]='#', i<R? 4>=4 → không reuse (i phải < R)
     Mở rộng: t[5]='b' == t[3]='b' → P[4]=1
     t[6]='a' == t[2]='#'? Không → dừng? 
     Kiểm tra lại: t[i+P[i]+1] = t[5]='b', t[i-P[i]-1] = t[3]='b' → bằng → P[4]=1
     t[6]='a', t[2]='#' → không bằng → dừng
     P[4]=1? Sai! Let me recheck...
     
     Actually: t = "^#a#b#b#a#$"
     i=4: P[4]=0 ban đầu
     t[5]='b', t[3]='b' → bằng → P[4]=1
     t[6]='a', t[2]='#' → không bằng → dừng
     P[4]=1 → C=4, R=5
     
     Hmm, kết quả chưa đúng. P[4] nên = 4 cho "abba".
     
     Let me re-index:
     t = "^#a#b#b#a#$"
     idx: 0 1 2 3 4 5 6 7 8 9 10
     
     i=4 (t[4]='b'): 
     i_mirror = 2*3 - 4 = 2 (t[2]='#')
     i < R? 4 >= 4 → No → P[4]=0
     Mở rộng: t[5]='b' == t[3]='b' → P[4]=1
     t[6]='a' == t[2]='#' → No → dừng
     P[4]=1, C=4, R=5
     
     i=5 (t[5]='b'):
     i_mirror = 2*4 - 5 = 3 (t[3]='b')
     i < R? 5 >= 5 → No → P[5]=0
     Mở rộng: t[6]='a' == t[4]='b' → No → dừng
     P[5]=0
     
     i=6 (t[6]='a'):
     Mở rộng: t[7]='a' == t[5]='b' → No → P[6]=0
     
     Hmm, kết quả P[4]=1 chỉ ra palindrome "b#b" (bán kính 1, dài 1 trong xâu gốc = "bb" dài 2). 
     Nhưng "abba" dài 4!
     
     Có lỗi trong code. Vấn đề là preprocessing.
     
     Correct: "^#a#b#b#a#$"
     P[4] (tâm '#') = 4 → "a#b#b#a" → "abba" dài 4
     
     Để P[4]=4, cần:
     t[5]='b' == t[3]='b' → P=1
     t[6]='a' == t[2]='a'? t[2]='a'! → P=2
     t[7]='#' == t[1]='#'? → P=3
     t[8]='a' == t[0]='^'? → No → dừng
     
     Wait, t[6]='a', t[2]='a'? Let me recheck:
     t = "^#a#b#b#a#$"
     t[0]='^', t[1]='#', t[2]='a', t[3]='#', t[4]='b', t[5]='#', t[6]='b', t[7]='#', t[8]='a', t[9]='#', t[10]='$'
     
     Oh! I had the wrong indexing. Let me redo:
     ^ # a # b # b # a # $
     0 1 2 3 4 5 6 7 8 9 10
     
     So t[4]='b', t[6]='b'. The palindrome "abba" has center at index 5 ('#').
     
     i=5: t[5]='#'
     t[6]='b' == t[4]='b' → P[5]=1
     t[7]='#' == t[3]='#' → P[5]=2
     t[8]='a' == t[2]='a' → P[5]=3
     t[9]='#' == t[1]='#' → P[5]=4
     t[10]='$' == t[0]='^' → No → dừng
     P[5]=4! ✅
```

---

## 7. Ứng dụng

| Bài toán | Độ phức tạp | Ghi chú |
|----------|-------------|---------|
| Tìm palindrome dài nhất | O(N) | Bài toán cơ bản |
| Đếm số palindrome con | O(N) | Tổng P[i] / 2 |
| Kiểm tra xâu có palindrome độ dài K | O(N) | Kiểm tra max(P) >= K |
| Tìm tất cả palindrome | O(N²) | Duyệt và in từ P[] |
| Palindrome dài nhất chứa ký tự tại vị trí i | O(N) | Dùng P[i] |

---

## 8. Lưu ý

- **Manacher** chỉ áp dụng cho xâu, không áp dụng cho mảng số
- Nếu chỉ cần kiểm tra palindrome: dùng Hash xâu cũng được (O(N))
- Khi chèn `#`, độ dài xâu tăng gấp đôi → chú ý bộ nhớ
- **Không cần chèn `^` và `$`** nếu cẩn thận kiểm tra biên trong code
- Manacher là thuật toán "hai con trỏ" kết hợp "tận dụng thông tin đã tính"

---

## 9. Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Palindrome Queries](https://cses.fi/problemset/task/2420) | CSES | ⭐⭐⭐ | Palindrome + Hash |
| [LeetCode - Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/) | LC | ⭐⭐ | Manacher |
| [LeetCode - Palindromic Substrings](https://leetcode.com/problems/palindromic-substrings/) | LC | ⭐⭐ | Đếm palindrome |
| [VNOJ - NKPALIN](https://oj.vnoi.info/problem/nkpalin) | VNOJ | ⭐⭐ | Palindrome |
| [VNOJ - PALINY](https://oj.vnoi.info/problem/paliny) | VNOJ | ⭐⭐⭐ | Palindrome longest |
| [SPOJ - LPALIN](https://www.spoj.com/problems/LPALIN/) | SPOJ | ⭐⭐ | Longest palindrome |

## Bài viết liên quan

- [Bài 9: KMP & Z-Algorithm](09-kmp-tim-xau.md)
- [Bài 14: Hash xâu](14-hash-xau-z-algorithm.md)

## Tài liệu tham khảo

- [VNOI Wiki - Manacher](https://wiki.vnoi.info/algo/string/manacher)
- [CP-Algorithms - Manacher's Algorithm](https://cp-algorithms.com/string/manacher.html)
- [GeeksforGeeks - Manacher's Algorithm](https://www.geeksforgeeks.org/dsa/manachers-algorithm-linear-time-longest-palindrome-substring-part-1/)
- [YouTube - Manacher's Algorithm (takeuforward)](https://www.youtube.com/watch?v=nbTSfr1HFKs)

**Bài tiếp theo:** [Greedy →](21-greedy.md)
