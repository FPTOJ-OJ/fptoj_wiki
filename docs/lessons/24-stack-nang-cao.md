# Bài 24: Stack Nâng Cao - Expression & Bracket Matching

> **Tác giả:** Hà Trí Kiên
> **Nội dung tham khảo từ:** VNOI Wiki - Stack

## 1. Stack trong xử lý biểu thức

### Bài toán: Tính giá trị biểu thức

Cho `"2 * 3 + 4 * 5"` → tính kết quả. Phải đảm bảo nhân trước cộng sau!

### Ý tưởng: Stack đơn điệu

Duyệt biểu thức từ trái sang phải:
- Gặp **toán hạng** → đẩy vào stack `val`
- Gặp **toán tử** → xử lý toán tử trước đó nếu nó có **độ ưu tiên ≥** toán tử hiện tại

```cpp
int priority(char op) {
    if (op == '+' || op == '-') return 1;
    return 2;  // * và /
}

void processOp(vector<int>& val, char op) {
    int r = val.back(); val.pop_back();
    int l = val.back(); val.pop_back();
    switch(op) {
        case '+': val.push_back(l + r); break;
        case '-': val.push_back(l - r); break;
        case '*': val.push_back(l * r); break;
        case '/': val.push_back(l / r); break;
    }
}

int evaluate(string s) {
    vector<int> val;
    vector<char> ops;
    for (int i = 0; i < s.size(); i++) {
        if (isdigit(s[i])) {
            int num = 0;
            while (i < s.size() && isdigit(s[i]))
                num = num * 10 + s[i++] - '0';
            val.push_back(num);
            i--;
        } else {
            while (!ops.empty() && priority(ops.back()) >= priority(s[i]))
                processOp(val, ops.back()), ops.pop_back();
            ops.push_back(s[i]);
        }
    }
    while (!ops.empty())
        processOp(val, ops.back()), ops.pop_back();
    return val.back();
}
```

---

## 2. Kiểm tra dãy ngoặc đúng

### Bài toán: Kiểm tra `(()[{}])` có hợp lệ không?

```cpp
bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            st.push(c);
        } else {
            if (st.empty()) return false;
            if (c == ')' && st.top() != '(') return false;
            if (c == ']' && st.top() != '[') return false;
            if (c == '}' && st.top() != '{') return false;
            st.pop();
        }
    }
    return st.empty();
}
```

---

## 3. Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [SPOJ - STPAR](https://www.spoj.com/problems/STPAR/) | SPOJ | ⭐⭐ | Stack sắp xếp |
| [CF 280B - Maximum Xor Secondary](https://codeforces.com/problemset/problem/280/B) | CF | ⭐⭐⭐ | Stack đơn điệu |
| [LeetCode - Valid Parentheses](https://leetcode.com/problems/valid-parentheses/) | LC | ⭐ | Ngoặc đúng |
| [LeetCode - Min Stack](https://leetcode.com/problems/min-stack/) | LC | ⭐⭐ | Stack đặc biệt |
| [LeetCode - Evaluate RPN](https://leetcode.com/problems/evaluate-reverse-polish-notation/) | LC | ⭐⭐ | Tính biểu thức |
| [CSES - Nearest Smaller Values](https://cses.fi/problemset/task/1645) | CSES | ⭐⭐ | Stack đơn điệu |

## Bài viết liên quan

- [Bài 7: Mảng, Stack, Prefix Sum](07-mang-stack-prefix-sum.md)
- [Bài 15: Deque & Sliding Window](15-deque-sliding-window.md)

## Tài liệu tham khảo

- [VNOI Wiki - Stack](https://wiki.vnoi.info/algo/data-structures/Stack)
- [GeeksforGeeks - Stack Data Structure](https://www.geeksforgeeks.org/dsa/stack-data-structure/)
- [CP-Algorithms - Expression Parsing](https://cp-algorithms.com/string/expression_parsing.html)
