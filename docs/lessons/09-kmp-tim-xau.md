# Bài 9: KMP & Z-Algorithm - Tìm Xâu Mẫu O(N)!

> **Tác giả:** Hà Trí Kiên
> **Nội dung tham khảo từ:** VNOI Wiki - KMP, Z-function

## 1. Chuyện gì đang xảy ra?

### Bài toán: Tìm từ khóa trong văn bản

Bạn có văn bản `T = "aabcabaab"` và muốn tìm xem mẫu `P = "ab"` xuất hiện ở đâu.

**Brute-force:** Tại mỗi vị trí, so sánh từng ký tự → O(NM). Với N=10⁶, M=10³ → 10⁹ phép tính → **TLE!**

**KMP/Z-algorithm:** Chỉ cần **O(N+M)**!

---

## 2. Hàm tiền tố (Prefix Function) - Chìa khóa của KMP

### Định nghĩa

`π[i]` = độ dài tiền tố chuẩn dài nhất của `s[0..i]` mà cũng là hậu tố.

```
s = "aabaaab"
i:     0  1  2  3  4  5  6
s[i]:  a  a  b  a  a  a  b
π[i]:  0  1  0  1  2  2  3
```

Giải thích:
- `π[1]=1`: "aa" → tiền tố "a" = hậu tố "a", độ dài 1
- `π[4]=2`: "aabaa" → tiền tố "aa" = hậu tố "aa", độ dài 2
- `π[6]=3`: "aabaaab" → tiền tố "aab" = hậu tố "aab", độ dài 3

### Code C++: Tính hàm tiền tố

```cpp
vector<int> prefixFunction(string s) {
    int n = s.length();
    vector<int> pi(n, 0);
    for (int i = 1; i < n; i++) {
        int j = pi[i - 1];
        while (j > 0 && s[i] != s[j])
            j = pi[j - 1];  // Nhảy cóc! Không quay về 0
        if (s[i] == s[j])
            j++;
        pi[i] = j;
    }
    return pi;
}
```

---

## 3. KMP - Tìm xâu mẫu

### Ý tưởng

Khi so sánh thất bại tại vị trí i, thay vì bắt đầu lại từ đầu, ta **nhảy đến π[i-1]** vì đã biết π[i-1] ký tự đầu khớp!

```
T = "aabcabaab"
P = "abcab"
         ↑ Thất bại tại vị trí 4 (so sánh 'c' vs 'a')
π[3] = 1 → Nhảy: so sánh từ vị trí 1 của P
```

### Code C++

```cpp
vector<int> kmpSearch(string text, string pattern) {
    string combined = pattern + "#" + text;
    vector<int> pi = prefixFunction(combined);
    vector<int> positions;
    int m = pattern.length();
    for (int i = m + 1; i < combined.length(); i++) {
        if (pi[i] == m)
            positions.push_back(i - 2 * m);
    }
    return positions;
}
```

---

## 4. Z-Algorithm

### Định nghĩa

`z[i]` = độ dài tiền tố chung lớn nhất của `s` và `s[i..n-1]`.

```
s = "aaabaab"
z = [0, 2, 1, 0, 2, 2, 3]
```

### Code C++

```cpp
vector<int> zFunction(string s) {
    int n = s.length();
    vector<int> z(n);
    for (int i = 1, l = 0, r = 0; i < n; i++) {
        if (i <= r)
            z[i] = min(r - i + 1, z[i - l]);
        while (i + z[i] < n && s[z[i]] == s[i + z[i]])
            z[i]++;
        if (i + z[i] - 1 > r) {
            l = i;
            r = i + z[i] - 1;
        }
    }
    return z;
}
```

---

## 5. So sánh KMP vs Z-algorithm

| | KMP | Z-algorithm |
|--|-----|-------------|
| Hàm chính | Prefix function (π) | Z-function |
| Độ phức tạp | O(N+M) | O(N+M) |
| Tìm xâu mẫu | Có | Có |
| Ứng dụng khác | Chu trình, palindrome | Tiền tố chung |
| Dễ cài đặt | Trung bình | Dễ hơn |

---

## 6. Bài tập luyện tập

| Bài | Nền tảng | Độ khó |
|-----|----------|--------|
| [CSES - Pattern Positions](https://cses.fi/problemset/task/2107) | CSES | ⭐⭐ |
| [SPOJ - NHAY](https://www.spoj.com/problems/NHAY/) | SPOJ | ⭐⭐ |
| [CF - MUH and Cube Walls](https://codeforces.com/problemset/problem/471/D) | CF | ⭐⭐⭐ |

## Tài liệu tham khảo

- [CP-Algorithms - Prefix Function & KMP](https://cp-algorithms.com/string/prefix-function.html)
- [CP-Algorithms - Z-function](https://cp-algorithms.com/string/z-function.html)
- [Topcoder - Introduction to String Searching](https://www.topcoder.com/community/competitive-programming/tutorials/introduction-to-string-searching-algorithms/)
- [USACO Guide - String Searching](https://usaco.guide/adv/string-search)
- [GeeksforGeeks - KMP Algorithm](https://www.geeksforgeeks.org/dsa/kmp-algorithm-for-pattern-searching/)
- [takeuforward - KMP Algorithm](https://takeuforward.org/data-structure/kmp-algorithm)
- [Codeforces - KMP Resource for Beginners](https://codeforces.com/blog/entry/92981)
