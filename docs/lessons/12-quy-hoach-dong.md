# Bài 12: Quy Hoạch Động (DP) - Từ Nhập Môn Đến Thành Thạo!

> **Tác giả:** Hà Trí Kiên
> **Nội dung tham khảo từ:** VNOI Wiki - Quy hoạch động, Topcoder - DP from Novice to Advanced

## 1. DP là gì?

### Ẩn dụ: Leo cầu thang nhớ đường

Bạn leo cầu thang, mỗi bước 1 hoặc 2 bậc. Thay vì tính lại từ đầu mỗi lần, bạn **nhớ kết quả** các bậc đã tính → không tính lại!

**DP** = Đệ quy + Nhớ kết quả!

---

## 2. 4 bước xây dựng DP

| Bước | Câu hỏi | Ví dụ (Leo cầu thang) |
|------|---------|----------------------|
| 1. Trạng thái | `dp[i]` lưu gì? | Số cách lên bậc i |
| 2. Công thức | `dp[i]` tính từ đâu? | `dp[i] = dp[i-1] + dp[i-2]` |
| 3. Cơ sở | Giá trị ban đầu? | `dp[1]=1, dp[2]=2` |
| 4. Đáp án | Kết quả ở đâu? | `dp[n]` |

---

## 3. Các dạng DP cơ bản

### 3.1. DP tuyến tính (1D)

```cpp
// Leo cầu thang
int climbStairs(int n) {
    if (n <= 2) return n;
    vector<int> dp(n + 1);
    dp[1] = 1; dp[2] = 2;
    for (int i = 3; i <= n; i++)
        dp[i] = dp[i-1] + dp[i-2];
    return dp[n];
}

// Dãy con tăng dài nhất (LIS) - O(N log N)
int lis(vector<int>& a) {
    vector<int> tail;
    for (int x : a) {
        auto it = lower_bound(tail.begin(), tail.end(), x);
        if (it == tail.end()) tail.push_back(x);
        else *it = x;
    }
    return tail.size();
}
```

### 3.2. DP 2 chiều (Knapsack)

```cpp
// Cái túi 0/1
int knapsack(vector<int>& w, vector<int>& v, int W) {
    int n = w.size();
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j <= W; j++) {
            dp[i][j] = dp[i-1][j];  // Không lấy
            if (j >= w[i-1])
                dp[i][j] = max(dp[i][j], dp[i-1][j - w[i-1]] + v[i-1]);
        }
    }
    return dp[n][W];
}
```

### 3.3. DP trên xâu

```cpp
// Xâu con chung nhất (LCS)
int lcs(string a, string b) {
    int n = a.size(), m = b.size();
    vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (a[i-1] == b[j-1])
                dp[i][j] = dp[i-1][j-1] + 1;
            else
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
        }
    }
    return dp[n][m];
}

// Khoảng cách chỉnh sửa (Edit Distance)
int editDistance(string a, string b) {
    int n = a.size(), m = b.size();
    vector<vector<int>> dp(n + 1, vector<int>(m + 1));
    for (int i = 0; i <= n; i++) dp[i][0] = i;
    for (int j = 0; j <= m; j++) dp[0][j] = j;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (a[i-1] == b[j-1]) dp[i][j] = dp[i-1][j-1];
            else dp[i][j] = 1 + min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]});
        }
    }
    return dp[n][m];
}
```

### 3.4. Tối ưu bộ nhớ

```cpp
// Chỉ cần 1 hàng thay vì 2D
vector<int> dp(W + 1, 0);
for (int i = 1; i <= n; i++) {
    for (int j = W; j >= w[i-1]; j--)  // Duyệt NGƯỢC!
        dp[j] = max(dp[j], dp[j - w[i-1]] + v[i-1]);
}
```

---

## 4. Nhận biết bài DP

| Dấu hiệu | Dạng DP |
|----------|---------|
| "Đếm số cách" | Cộng trạng thái |
| "Tìm max/min" | Max/min trạng thái |
| "Có N vật, chọn hoặc không" | Knapsack |
| "Xâu con chung" | LCS |
| "Dãy con tăng" | LIS |
| "Palindrome" | DP trên xâu |
| "Đi trên lưới" | DP 2D |

---

## 5. Bài tập luyện tập (theo độ khó)

| Bài | Nền tảng | Độ khó |
|-----|----------|--------|
| [CSES - Dice Combinations](https://cses.fi/problemset/task/1633) | CSES | ⭐ |
| [CSES - Minimizing Coins](https://cses.fi/problemset/task/1634) | CSES | ⭐⭐ |
| [CSES - Longest Common Subsequence](https://cses.fi/problemset/task/3403) | CSES | ⭐⭐ |
| [Atcoder DP Contest](https://atcoder.jp/contests/dp) | Atcoder | ⭐⭐-⭐⭐⭐ |
| [LeetCode - DP Study Plan](https://leetcode.com/studyplan/dynamic-programming/) | LeetCode | ⭐⭐-⭐⭐⭐ |

## Tài liệu tham khảo

- [CP-Algorithms - Introduction to DP](https://cp-algorithms.com/dynamic_programming/intro-to-dp.html)
- [USACO Guide - Introduction to DP](https://usaco.guide/gold/intro-dp)
- [Topcoder - DP from Novice to Advanced](https://www.topcoder.com/thrive/articles/Dynamic%20Programming:%20From%20Novice%20to%20Advanced)
- [Codeforces - DP Tutorial and Problem List](https://codeforces.com/blog/entry/67679)
- [Errichto - DP Tutorials (YouTube)](https://www.youtube.com/playlist?list=PLtfqa971vD5FQIQuAaZe4thK-QGOdAou3)
- [VNOI Wiki - Quy hoạch động cơ bản](https://wiki.vnoi.info/algo/dp/basic-dynamic-programming-1)
- [GeeksforGeeks - Dynamic Programming](https://www.geeksforgeeks.org/dsa/introduction-to-dynamic-programming-data-structures-and-algorithm-tutorials/)
