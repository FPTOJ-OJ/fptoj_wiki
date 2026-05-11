# Bài 27: Lý Thuyết Trò Chơi - Ai Thắng?

> **Tác giả:** Hà Trí Kiên
> **Nội dung tham khảo từ:** VNOI Wiki - Lý thuyết trò chơi

## 1. Trò chơi Nim

### Bài toán

Có N đống đá, mỗi đống có a[i] viên. 2 người luân phiên lấy đá. Mỗi lượt được lấy ≥ 1 viên từ 1 đống bất kỳ. Ai lấy viên cuối cùng **thắng**.

### Kết luận kinh điển

```
a[1] XOR a[2] XOR ... XOR a[n] ≠ 0 → Người đi trước THẮNG
a[1] XOR a[2] XOR ... XOR a[n] = 0 → Người đi trước THUA
```

### Code

```cpp
// Kiểm tra người đi trước có thắng không
bool firstPlayerWins(vector<int>& piles) {
    int xorSum = 0;
    for (int x : piles) xorSum ^= x;
    return xorSum != 0;
}
```

---

## 2. Grundy Number (Sprague-Grundy)

### Ý tưởng

Mỗi trạng thái trò chơi có 1 số **Grundy**. Trạng thái Grundy = 0 → **thua** (P-position). Grundy ≠ 0 → **thắng** (N-position).

```
Grundy(state) = MEX{Grundy(các trạng thái có thể đi được)}

MEX = Minimum Excluded value (giá trị nguyên không âm nhỏ nhất không có trong tập)
```

### Code

```cpp
// Tính MEX
int mex(vector<int>& s) {
    sort(s.begin(), s.end());
    s.erase(unique(s.begin(), s.end()), s.end());
    for (int i = 0; i < s.size(); i++)
        if (s[i] != i) return i;
    return s.size();
}

// Tính Grundy cho bài toán cụ thể
int grundy[1001];
bool computed[1001];

int calcGrundy(int state) {
    if (computed[state]) return grundy[state];
    computed[state] = true;
    
    vector<int> nextStates;
    // Liệt kê các trạng thái tiếp theo từ state
    // Ví dụ: lấy 1, 2, hoặc 3 viên đá
    if (state >= 1) nextStates.push_back(calcGrundy(state - 1));
    if (state >= 2) nextStates.push_back(calcGrundy(state - 2));
    if (state >= 3) nextStates.push_back(calcGrundy(state - 3));
    
    grundy[state] = mex(nextStates);
    return grundy[state];
}
```

---

## 3. Ứng dụng: Trò chơi trên DAG

Nhiều bài toán CP về trò chơi thực chất là tìm Grundy number trên đồ thị có hướng không chu trình (DAG).

---

## 4. Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Nim Game I](https://cses.fi/problemset/task/1730) | CSES | ⭐⭐ | Nim cơ bản |
| [CSES - Nim Game II](https://cses.fi/problemset/task/1098) | CSES | ⭐⭐ | Nim biến thể |
| [SPOJ - MCOINS](https://www.spoj.com/problems/MCOINS/) | SPOJ | ⭐⭐ | Grundy |
| [CF - Game with Stones](https://codeforces.com/) | CF | ⭐⭐⭐ | Sprague-Grundy |
| [Atcoder DP Contest - Grundy](https://atcoder.jp/contests/dp/tasks) | Atcoder | ⭐⭐⭐ | Game DP |

## Bài viết liên quan

- [Bài 5: Phép toán bit](05-phep-toan-bit.md) (XOR)
- [Bài 12: Quy hoạch động](12-quy-hoach-dong.md)

## Tài liệu tham khảo

- [VNOI Wiki - Lý thuyết trò chơi](https://wiki.vnoi.info/algo/math/game-theory)
- [CP-Algorithms - Game Theory](https://cp-algorithms.com/game_theory/sprague-grundy-nim.html)
- [GeeksforGeeks - Game Theory](https://www.geeksforgeeks.org/dsa/game-theory/)
- [YouTube - Nim Game & Sprague-Grundy (Errichto)](https://www.youtube.com/watch?v=6jMRgUeJ2YQ)
