# Bài 20: Manacher - Tìm Palindrome Dài Nhất

> **Tác giả:** Hà Trí Kiên
> **Nội dung tham khảo từ:** VNOI Wiki - Thuật toán Manacher

## 1. Palindrome là gì?

**Palindrome** = Xâu đọc xuôi ngược đều giống. Ví dụ: "aba", "abba", "racecar".

### Bài toán: Tìm palindrome dài nhất trong xâu

Cho xâu S, tìm palindrome con dài nhất.

**Cách "ngốc":** Thử mọi cặp (i, j), kiểm tra có palindrome không → O(N³).
**Manacher:** O(N)!

---

## 2. Ý tưởng Manacher

### Kỹ thuật: Chèn ký tự đặc biệt

Chèn `#` giữa các ký tự để xử lý cả palindrome chẵn và lẻ:

```
"abba" → "#a#b#b#a#"
"aba"  → "#a#b#a#"
```

### Mảng P

P[i] = bán kính palindrome lớn nhất có tâm tại i.

```
#a#b#b#a#
P: 0 1 0 1 4 1 0 1 0
         ↑
   P[4]=4 → palindrome dài nhất có tâm tại '#' giữa 2 b,
   bán kính 4 → "abba" dài 4 ký tự
```

### Tối ưu: Dùng thông tin đã tính

Khi tính P[i], nếu ta đã biết palindrome bao quanh tâm `C` trước đó, ta có thể **khởi tạo** P[i] từ P[i_mirror] mà không cần so sánh lại từ đầu.

---

## 3. Code C++

```cpp
// Manacher - O(N)
string preprocess(string s) {
    string t = "#";
    for (char c : s) {
        t += c;
        t += '#';
    }
    return t;
}

pair<int,int> manacher(string s) {
    string t = preprocess(s);
    int n = t.length();
    vector<int> P(n, 0);
    int C = 0, R = 0;  // Tâm và biên phải của palindrome hiện tại
    
    for (int i = 1; i < n - 1; i++) {
        int i_mirror = 2 * C - i;  // Đối xứng qua C
        
        if (i < R)
            P[i] = min(R - i, P[i_mirror]);
        
        // Mở rộng palindrome
        while (i + P[i] + 1 < n && i - P[i] - 1 >= 0 
               && t[i + P[i] + 1] == t[i - P[i] - 1])
            P[i]++;
        
        // Cập nhật C và R
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
    
    int start = (center - maxLen) / 2;  // Vị trí bắt đầu trong xâu gốc
    return {start, maxLen};
}
```

---

## 4. Ứng dụng

| Bài toán | Độ phức tạp |
|----------|-------------|
| Tìm palindrome dài nhất | O(N) |
| Đếm số palindrome con | O(N) |
| Kiểm tra xâu có palindrome độ dài K | O(N) |

---

## 5. Lưu ý

- **Manacher** chỉ áp dụng cho xâu, không áp dụng cho mảng số
- Nếu chỉ cần kiểm tra palindrome: dùng Hash xâu cũng được (O(N))
- Khi chèn `#`, độ dài xâu tăng gấp đôi → chú ý bộ nhớ

---

---

## Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Palindrome Queries](https://cses.fi/problemset/task/2420) | CSES | ⭐⭐⭐ | Palindrome + Hash |
| [LeetCode - Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/) | LC | ⭐⭐ | Manacher |
| [LeetCode - Palindromic Substrings](https://leetcode.com/problems/palindromic-substrings/) | LC | ⭐⭐ | Đếm palindrome |

## Bài viết liên quan

- [Bài 9: KMP & Z-Algorithm](09-kmp-tim-xau.md)
- [Bài 14: Hash xâu](14-hash-xau-z-algorithm.md)

## Tài liệu tham khảo

- [VNOI Wiki - Manacher](https://wiki.vnoi.info/algo/string/manacher)
- [CP-Algorithms - Manacher's Algorithm](https://cp-algorithms.com/string/manacher.html)
- [GeeksforGeeks - Manacher's Algorithm](https://www.geeksforgeeks.org/dsa/manachers-algorithm-linear-time-longest-palindrome-substring-part-1/)
- [YouTube - Manacher's Algorithm (takeuforward)](https://www.youtube.com/watch?v=nbTSfr1HFKs)

**Bài tiếp theo:** [Greedy →](21-greedy.md)
