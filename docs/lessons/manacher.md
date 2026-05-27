# Bài 20: Manacher - Tìm Palindrome Dài Nhất

> **Tác giả:** Hà Trí Kiên
> **Nội dung tham khảo từ:** VNOI Wiki - Thuật toán Manacher

## Bản chất vấn đề

Cho xâu $S$ độ dài $N$, tìm palindrome con liên tiếp dài nhất.

**Palindrome** là xâu đọc xuôi ngược đều giống nhau, ví dụ `aba`, `abba`, `racecar`.

Palindrome có hai loại:

| Loại | Ví dụ | Tâm |
|------|-------|-----|
| Lẻ | `aba` | Ký tự `b` ở giữa |
| Chẵn | `abba` | Khoảng giữa hai ký tự `b` |

Nếu xử lý riêng hai loại, code sẽ phức tạp và dễ sai. Manacher giải quyết bài toán này trong $O(N)$ bằng cách chuyển tất cả thành palindrome lẻ.

So sánh các phương pháp:

| Phương pháp | Độ phức tạp | Ghi chú |
|-------------|-------------|---------|
| Duyệt cặp $(i,j)$, kiểm tra palindrome | $O(N^3)$ | Quá chậm |
| Hash xâu + Binary Search | $O(N \log N)$ | Khá tốt |
| Manacher | $O(N)$ | Tuyến tính, tốt nhất |

---

## Tư duy cốt lõi

### Bước 1: Chèn ký tự đặc biệt

Chèn ký tự `#` giữa mỗi ký tự, thêm `^` ở đầu và `$` ở cuối để tránh kiểm tra biên.

Xâu $S$ = `abba` trở thành $T$ = `^#a#b#b#a#$`.

Sau khi chèn, mọi palindrome đều có độ dài lẻ. Bán kính palindrome tại vị trí $i$ trong $T$ chính là độ dài palindrome gốc trong $S$.

| Xâu gốc | Xâu đã chèn $T$ | Bán kính |
|----------|-------------------|----------|
| `aba` (3 ký tự) | `#a#b#a#` | 3 |
| `abba` (4 ký tự) | `#a#b#b#a#` | 4 |

Công thức: palindrome dài $L$ trong $S$ có bán kính $L$ trong $T$.

### Bước 2: Mảng $P$ và kỹ thuật nhân đôi thông tin

Định nghĩa $P[i]$ = bán kính palindrome lớn nhất có tâm tại $i$ trong $T$.

Ví dụ với $T$ = `^#a#b#b#a#$`:

| Chỉ số $i$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|------------|---|---|---|---|---|---|---|---|---|---|---|
| $T[i]$ | ^ | # | a | # | b | # | b | # | a | # | $ |
| $P[i]$ | 0 | 0 | 1 | 0 | 1 | 4 | 1 | 0 | 1 | 0 | 0 |

$P[5]=4$ nghĩa là palindrome dài nhất có tâm tại index 5 có bán kính 4, tức là `abba` dài 4 ký tự trong xâu gốc.

### Bước 3: Tận dụng thông tin đã tính

Khi tính $P[i]$, giả sử ta đã biết palindrome bao quanh tâm $C$ với biên phải $R$. Gọi $i_{mirror} = 2C - i$ là điểm đối xứng của $i$ qua $C$.

Nếu $P[i_{mirror}]$ đã biết, ta có thể khởi tạo $P[i]$ mà không cần so sánh lại từ đầu. Có ba trường hợp:

| Trường hợp | Điều kiện | Kết luận |
|------------|-----------|----------|
| 1 | $i \geq R$ | Không có thông tin reuse, $P[i]=0$, mở rộng từ đầu |
| 2 | $i < R$ và $P[i_{mirror}] < R - i$ | Palindrome tại $i_{mirror}$ nằm trong palindrome tại $C$, nên $P[i] = P[i_{mirror}]$ |
| 3 | $i < R$ và $P[i_{mirror}] \geq R - i$ | Palindrome tại $i_{mirror}$ tràn ra ngoài, $P[i] \geq R-i$, cần mở rộng thêm |

Sau khi tính xong $P[i]$, nếu $i + P[i] > R$ thì cập nhật $C = i$, $R = i + P[i]$.

---

## Phân tích tính đúng đắn

**Tại sao kỹ thuật nhân đôi thông tin đúng?**

Palindrome đối xứng qua tâm $C$, nên mọi vị trí $i$ nằm trong palindrome tâm $C$ đều có "bản sao" tại $i_{mirror} = 2C - i$.

Trường hợp 2: $P[i_{mirror}] < R - i$ nghĩa là toàn bộ palindrome tại $i_{mirror}$ nằm trong phạm vi $[C-(R-C), R]$. Do đối xứng, palindrome tại $i$ có ít nhất cùng bán kính, và không thể lớn hơn vì ký tự ngay bên ngoài biên đã khác.

Trường hợp 3: $P[i_{mirror}] \geq R - i$ nghĩa là palindrome tại $i_{mirror}$ chạm hoặc vượt biên phải $R$. Do đối xứng, palindrome tại $i$ có ít nhất bán kính $R-i$. Phần vượt ra ngoài chưa được kiểm tra, nên cần mở rộng thêm.

**Tại sao duyệt từ trái sang phải đảm bảo đúng?**

Khi duyệt $i$ từ 1 đến $n-2$, mỗi vị trí chỉ cập nhật $C$ và $R$ khi mở rộng ra ngoài. Biên phải $R$ chỉ tăng, không giảm. Mọi $i < R$ đều có thể reuse thông tin từ $i_{mirror} < i$ (vì $i_{mirror} = 2C - i < C < i$).

---

## Đánh giá độ phức tạp

| Yếu tố | Phân tích |
|---------|-----------|
| Thời gian | $O(N)$ - mỗi vị trí $i$ chỉ mở rộng khi $R$ tăng, mà $R$ tối đa tăng $2N+1$ lần |
| Không gian | $O(N)$ - mảng $P$ độ dài $2N+1$ |

**Chứng minh thời gian tuyến tính:** Biên phải $R$ bắt đầu từ 0, chỉ tăng khi mở rộng. Tổng số lần tăng $R$ qua toàn bộ vòng lặp là $O(N)$. Mọi lần gán $P[i] = P[i_{mirror}]$ hoặc $P[i] = R-i$ đều là $O(1)$. Do đó tổng thời gian là $O(N)$.

---

## Code triển khai

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    string preprocess(string s) {
        string t = "^";
        for (char c : s) {
            t += '#';
            t += c;
        }
        t += "#$";
        return t;
    }

    pair<int,int> manacher(string s) {
        string t = preprocess(s);
        int n = t.length();
        vector<int> P(n, 0);
        int C = 0, R = 0;

        for (int i = 1; i < n - 1; i++) {
            int i_mirror = 2 * C - i;

            if (i < R)
                P[i] = min(R - i, P[i_mirror]);

            while (t[i + P[i] + 1] == t[i - P[i] - 1])
                P[i]++;

            if (i + P[i] > R) {
                C = i;
                R = i + P[i];
            }
        }

        int maxLen = 0, center = 0;
        for (int i = 1; i < n - 1; i++) {
            if (P[i] > maxLen) {
                maxLen = P[i];
                center = i;
            }
        }

        int start = (center - maxLen) / 2;
        return {start, maxLen};
    }

    int main() {
        string s = "babad";
        auto [start, len] = manacher(s);
        cout << s.substr(start, len) << endl;
    }
    ```

=== "Python"

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

## Bước chạy chi tiết

Ví dụ với xâu $S$ = `abba`, xâu đã chèn $T$ = `^#a#b#b#a#$`.

| $i$ | $T[i]$ | $i < R$? | Khởi tạo $P[i]$ | Mở rộng | $P[i]$ | $C$ | $R$ |
|-----|---------|----------|------------------|---------|---------|-----|-----|
| 1 | `#` | Không | 0 | `t[2]=a` vs `t[0]=^` khác | 0 | 1 | 1 |
| 2 | `a` | Không | 0 | `t[3]=#` vs `t[1]=#` bằng, `t[4]=b` vs `t[0]=^` khác | 1 | 2 | 3 |
| 3 | `#` | Không | 0 | `t[4]=b` vs `t[2]=a` khác | 0 | 2 | 3 |
| 4 | `b` | Không | 0 | `t[5]=#` vs `t[3]=#` bằng, `t[6]=b` vs `t[2]=a` khác | 1 | 4 | 5 |
| 5 | `#` | Không | 0 | `t[6]=b` vs `t[4]=b` bằng, `t[7]=#` vs `t[3]=#` bằng, `t[8]=a` vs `t[2]=a` bằng, `t[9]=#` vs `t[1]=#` bằng, `t[10]=$` vs `t[0]=^` khác | 4 | 5 | 9 |
| 6 | `b` | Có ($6<9$) | $\min(3, P[4])=\min(3,1)=1$ | `t[8]=a` vs `t[4]=b` khác | 1 | 5 | 9 |
| 7 | `#` | Có ($7<9$) | $\min(2, P[3])=\min(2,0)=0$ | `t[8]=a` vs `t[6]=b` khác | 0 | 5 | 9 |
| 8 | `a` | Có ($8<9$) | $\min(1, P[2])=\min(1,1)=1$ | Mở rộng ra ngoài $R$, kiểm tra thêm | 1 | 5 | 9 |
| 9 | `#` | Không | 0 | `t[10]=$` vs `t[8]=a` khác | 0 | 5 | 9 |

Kết quả: $P[5]=4$, palindrome dài nhất có tâm tại index 5 trong $T$, vị trí bắt đầu trong $S$ là $(5-4)/2=0$, độ dài 4, tức là `abba`.

---

## Ứng dụng

| Bài toán | Độ phức tạp | Ghi chú |
|----------|-------------|---------|
| Tìm palindrome dài nhất | $O(N)$ | Bài toán cơ bản |
| Đếm số palindrome con | $O(N)$ | Tổng $\sum P[i] / 2$ |
| Kiểm tra xâu có palindrome độ dài $K$ | $O(N)$ | Kiểm tra $\max(P) \geq K$ |
| Tìm tất cả palindrome | $O(N^2)$ | Duyệt và in từ mảng $P$ |
| Palindrome dài nhất chứa ký tự tại vị trí $i$ | $O(N)$ | Dùng $P[i]$ |

---

## Lưu ý

- Manacher chỉ áp dụng cho xâu, không áp dụng cho mảng số
- Nếu chỉ cần kiểm tra palindrome: Hash xâu cũng được ($O(N)$)
- Khi chèn `#`, độ dài xâu tăng gấp đôi, chú ý bộ nhớ
- Không cần chèn `^` và `$` nếu cẩn thận kiểm tra biên trong code
- Manacher là thuật toán "hai con trỏ" kết hợp "tận dụng thông tin đã tính"

---

## Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Palindrome Queries](https://cses.fi/problemset/task/2420) | CSES | ⭐⭐⭐ | Palindrome + Hash |
| [LeetCode - Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/) | LC | ⭐⭐ | Manacher |
| [LeetCode - Palindromic Substrings](https://leetcode.com/problems/palindromic-substrings/) | LC | ⭐⭐ | Đếm palindrome |
| [VNOJ - NKPALIN](https://oj.vnoi.info/problem/nkpalin) | VNOJ | ⭐⭐ | Palindrome |
| [VNOJ - PALINY](https://oj.vnoi.info/problem/paliny) | VNOJ | ⭐⭐⭐ | Palindrome longest |
| [SPOJ - LPALIN](https://www.spoj.com/problems/LPALIN/) | SPOJ | ⭐⭐ | Longest palindrome |

## Bài viết liên quan

- [Bài 9: KMP & Z-Algorithm](kmp-tim-xau.md)
- [Bài 14: Hash xâu](hash-xau-z-algorithm.md)

## Tài liệu tham khảo

- [VNOI Wiki - Manacher](https://wiki.vnoi.info/algo/string/manacher)
- [CP-Algorithms - Manacher's Algorithm](https://cp-algorithms.com/string/manacher.html)
- [GeeksforGeeks - Manacher's Algorithm](https://www.geeksforgeeks.org/dsa/manachers-algorithm-linear-time-longest-palindrome-substring-part-1/)
- [YouTube - Manacher's Algorithm (takeuforward)](https://www.youtube.com/watch?v=nbTSfr1HFKs)

**Bài tiếp theo:** [Greedy](greedy.md)
