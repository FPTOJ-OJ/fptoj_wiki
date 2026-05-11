# Bài 24: Stack Nâng Cao - Expression Parsing & Ứng Dụng

> **Tác giả:** Hà Trí Kiên<br>
> **Nội dung tham khảo từ:** VNOI Wiki - Stack, CP-Algorithms

## 1. Stack trong xử lý biểu thức

### Bài toán: Tính giá trị biểu thức

Cho biểu thức `"2 * 3 + 4 * 5"` → tính kết quả. Phải đảm bảo **nhân trước cộng sau**!

```
2 * 3 + 4 * 5
  ↓
(2 * 3) + (4 * 5)   =  6 + 20  =  26   ✅

Nếu tính từ trái sang phải không quan tâm ưu tiên:
2 * 3 + 4 * 5
  ↓
6 + 4 * 5  →  10 * 5  =  50   ❌
```

### Tại sao cần Stack?

Khi gặp `2 * 3 +`, chưa thể tính ngay vì chưa biết `+` có bị "thế chỗ" bởi `*` phía sau hay không. Stack giúp **hoãn lại** việc xử lý, đảm bảo thứ tự ưu tiên đúng.

### Thuật toán: Hai stack (Shunting-yard đơn giản hóa)

Duyệt biểu thức từ trái sang phải, dùng **2 stack**:

- `val` (stack giá trị): lưu các toán hạng
- `ops` (stack toán tử): lưu các toán tử đang chờ xử lý

**Quy tắc:**

1. Gặp **toán hạng** (số) → đẩy vào `val`
2. Gặp **toán tử** → trước khi đẩy, xử lý hết các toán tử trong `ops` có **độ ưu tiên ≥** toán tử hiện tại
3. Duyệt xong → xử lý hết toán tử còn lại trong `ops`

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

### Trace chi tiết: `"2 * 3 + 4 * 5"`

```
Bước 1: Đọc '2'     → val = [2],           ops = []
Bước 2: Đọc '*'      → val = [2],           ops = [*(2)]
Bước 3: Đọc '3'      → val = [2, 3],        ops = [*(2)]
Bước 4: Đọc '+'      → priority(*) >= priority(+)
                       → processOp(2*3=6)
                       → val = [6],           ops = []
                       → push '+'
                       → val = [6],           ops = [+(1)]
Bước 5: Đọc '4'      → val = [6, 4],        ops = [+(1)]
Bước 6: Đọc '*'      → priority(+) < priority(*), không xử lý
                       → val = [6, 4],        ops = [+(1), *(2)]
Bước 7: Đọc '5'      → val = [6, 4, 5],     ops = [+(1), *(2)]
Bước 8: Hết toán tử  → processOp(4*5=20)    → val = [6, 20]
                       → processOp(6+20=26)   → val = [26]

Kết quả: 26 ✅
```

### Code Python

```python
def evaluate(s):
    vals, ops = [], []
    priority = {'+': 1, '-': 1, '*': 2, '/': 2}
    def process():
        r, l = vals.pop(), vals.pop()
        op = ops.pop()
        if op == '+': vals.append(l + r)
        elif op == '-': vals.append(l - r)
        elif op == '*': vals.append(l * r)
        elif op == '/': vals.append(l // r)
    i = 0
    while i < len(s):
        if s[i].isdigit():
            num = 0
            while i < len(s) and s[i].isdigit():
                num = num * 10 + int(s[i])
                i += 1
            vals.append(num)
        else:
            while ops and priority.get(ops[-1], 0) >= priority.get(s[i], 0):
                process()
            ops.append(s[i])
            i += 1
    while ops:
        process()
    return vals[0]
```

---

## 2. Xử lý dấu ngoặc trong biểu thức

### Bài toán: Tính `"(2 + 3) * (4 + 5)"`

Ngoặc thay đổi hoàn toàn thứ tự ưu tiên. Ta cần **đặc biệt xử lý** khi gặp `(`, `)`, `[`, `]`, `{`, `}`.

### Quy tắc

- Gặp `(` → đẩy vào stack `ops` (không cần xét ưu tiên)
- Gặp `)` → xử lý hết toán tử trong `ops` cho đến khi gặp `(`

### Code C++: Hỗ trợ ngoặc

```cpp
int evaluate(string s) {
    vector<int> val;
    vector<char> ops;
    for (int i = 0; i < s.size(); i++) {
        if (s[i] == ' ') continue;
        if (isdigit(s[i])) {
            int num = 0;
            while (i < s.size() && isdigit(s[i]))
                num = num * 10 + s[i++] - '0';
            val.push_back(num);
            i--;
        } else if (s[i] == '(') {
            ops.push_back('(');
        } else if (s[i] == ')') {
            while (!ops.empty() && ops.back() != '(')
                processOp(val, ops.back()), ops.pop_back();
            ops.pop_back();  // loại bỏ '('
        } else {
            while (!ops.empty() && ops.back() != '(' &&
                   priority(ops.back()) >= priority(s[i]))
                processOp(val, ops.back()), ops.pop_back();
            ops.push_back(s[i]);
        }
    }
    while (!ops.empty())
        processOp(val, ops.back()), ops.pop_back();
    return val.back();
}
```

### Trace: `"(1 + 2) * 3"`

```
Bước 1: Đọc '('      → ops = ['(']
Bước 2: Đọc '1'      → val = [1]
Bước 3: Đọc '+'      → ops = ['(', '+']
Bước 4: Đọc '2'      → val = [1, 2]
Bước 5: Đọc ')'      → processOp(1+2=3) → val = [3], pop '('
                         ops = [], val = [3]
Bước 6: Đọc '*'      → ops = ['*']
Bước 7: Đọc '3'      → val = [3, 3]
Bước 8: Kết thúc     → processOp(3*3=9) → val = [9]

Kết quả: 9 ✅ (không phải 7 nếu tính 1+2*3)
```

---

## 3. Kiểm tra dãy ngoặc đúng

### Bài toán: Kiểm tra `(()[{}])` có hợp lệ không?

**Quy tắc hợp lệ:**

1. Mỗi ngoặc mở phải có ngoặc đóng tương ứng
2. Ngoặc đóng phải đúng loại với ngoặc mở gần nhất
3. Stack rỗng khi duyệt hết → hợp lệ

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

### Code Python

```python
def is_valid(s):
    stack = []
    pairs = {')': '(', ']': '[', '}': '{'}
    for c in s:
        if c in '([{':
            stack.append(c)
        else:
            if not stack or stack[-1] != pairs[c]:
                return False
            stack.pop()
    return len(stack) == 0
```

### Ví dụ trace

```
"([{}])"
  '(' → stack = ['(']
  '[' → stack = ['(', '[']
  '{' → stack = ['(', '[', '{']
  '}' → stack.top() == '{' ✅ → stack = ['(', '[']
  ']' → stack.top() == '[' ✅ → stack = ['(']
  ')' → stack.top() == '(' ✅ → stack = []
  → stack rỗng → HỢP LỆ ✅

"([)]"
  '(' → stack = ['(']
  '[' → stack = ['(', '[']
  ')' → stack.top() == '[' ≠ '(' → KHÔNG HỢP LỆ ❌
```

---

## 4. Lưu ý & Cạm bẫy

### 4.1. Độ ưu tiên toán tử - Edge Cases

**Toán tử một ngôi (Unary minus):**

```
"-5 + 3"     → kết quả mong đợi: -2
"2 * (-3)"   → kết quả mong đợi: -6
```

Code cơ bản ở trên **không xử lý được** unary minus vì `-` bị nhầm lẫn với binary minus. Cách sửa: khi gặp `-` mà **phía trước là toán tử hoặc đầu chuỗi**, đánh dấu nó là unary (thêm `'u'` vào stack hoặc ghi nhận số âm trực tiếp).

```cpp
// Xử lý unary minus: chuyển "-5" thành "(0-5)"
// Hoặc: gặp '-' mà trước đó là '(' hoặc đầu chuỗi → push 0 vào val trước
if (s[i] == '-' && (i == 0 || s[i-1] == '(' || s[i-1] == '+' || s[i-1] == '-')) {
    val.push_back(0);  // thêm 0 giả lập "0 - 5"
}
```

### 4.2. Xử lý ngoặc lồng nhau sâu

```
"((((((1 + 2)))))"  → 6 ngoặc lồng nhau
```

Thuật toán vẫn hoạt động đúng vì mỗi `(` đều được push vào stack, và mỗi `)` sẽ pop đúng 1 `(`. Tuy nhiên:

- **Stack overflow (tràn stack):** Nếu dùng đệ quy thay vì stack, biểu thức lồng sâu ~10⁵ lớp có thể crash. Dùng stack **không đệ quy** sẽ an toàn hơn.
- **Giới hạn:** Stack thường cấp phát trên heap, xử lý được hàng triệu phần tử. Nhưng nếu dùng `stack<int>` trong C++ với giới hạn bộ nhớ, hãy chú ý.

### 4.3. Chia cho 0

```cpp
case '/': val.push_back(l / r); break;  // r có thể = 0!
```

Luôn kiểm tra `r != 0` trước khi chia. Trong thi đấu, test chia cho 0 hiếm khi xuất hiện nhưng trong production code thì **bắt buộc phải xử lý**.

### 4.4. Toán tử có cùng độ ưu tiên

```
"8 - 3 - 2"
```

Với code `priority(ops.back()) >= priority(s[i])`, phép trừ sẽ được xử lý **từ trái sang phải** (left-to-right associativity): `(8 - 3) - 2 = 3`. Đây là hành vi đúng.

Nếu dùng `>` thay vì `>=`, toán tử có cùng ưu tiên sẽ **không** được xử lý ngay → kết quả sai: `8 - (3 - 2) = 7`.

### 4.5. Dấu cách và ký tự lạ

```
"2 + 3 * 4"   → có dấu cách giữa các token
"2+3*4"        → không có dấu cách
```

Code cơ bản chỉ xử lý số và toán tử. Nếu biểu thức có dấu cách, cần bỏ qua `s[i] == ' '`. Nếu có ký tự lạ (chữ cái, dấu chấm...), cần báo lỗi hoặc bỏ qua.

### 4.6. Stack rỗng khi truy cập top()

```cpp
while (!ops.empty() && ...)  // LUÔN kiểm tra empty() trước khi top()
```

Đây là lỗi runtime phổ biến nhất khi dùng stack. Quy tắc: **luôn kiểm tra `empty()` trước khi gọi `top()` hoặc `pop()`**.

---

## 5. Ứng dụng thực tế của Stack

### 5.1. Largest Rectangle in Histogram

**Bài toán:** Cho N cột histogram có chiều rộng 1 và chiều cao `h[i]`. Tìm hình chữ nhật lớn nhất có thể vẽ được.

```
Chiều cao:  [2, 1, 5, 6, 2, 3]
Hình chữ nhật lớn nhất = 10 (cột 5 và 6, chiều rộng 2, chiều cao 5)
```

**Ý tưởng Stack đơn điệu (Monotonic Stack):**

Duyệt từ trái sang phải, duy trì stack **tăng dần** chiều cao. Khi gặp cột thấp hơn, pop các cột cao hơn ra và tính diện tích.

```cpp
int largestRectangleArea(vector<int>& heights) {
    stack<int> st;  // lưu index
    int maxArea = 0;
    int n = heights.size();
    for (int i = 0; i <= n; i++) {
        int h = (i == n) ? 0 : heights[i];
        while (!st.empty() && h < heights[st.top()]) {
            int height = heights[st.top()]; st.pop();
            int width = st.empty() ? i : i - st.top() - 1;
            maxArea = max(maxArea, height * width);
        }
        st.push(i);
    }
    return maxArea;
}
```

**Giải thích width:**

- `st.top()` là index của cột bên trái đầu tiên có chiều cao nhỏ hơn
- `i` là index của cột bên phải đầu tiên có chiều cao nhỏ hơn
- `width = i - st.top() - 1` là khoảng cách giữa 2 cột "biên"

### 5.2. Stock Span Problem

**Bài toán:** Cho giá cổ phiếu mỗi ngày. Với mỗi ngày, tìm số ngày liên tiếp trước đó mà giá ≤ giá hôm nay.

```
Giá:    [100, 80, 60, 70, 60, 75, 85]
Span:   [  1,  1,  1,  2,  1,  4,  6]
```

**Ý tưởng:** Stack đơn điệu giảm dần. Pop các phần tử có giá ≤ giá hiện tại.

```cpp
vector<int> stockSpan(vector<int>& prices) {
    int n = prices.size();
    vector<int> span(n);
    stack<int> st;  // lưu index
    for (int i = 0; i < n; i++) {
        while (!st.empty() && prices[st.top()] <= prices[i])
            st.pop();
        span[i] = st.empty() ? i + 1 : i - st.top();
        st.push(i);
    }
    return span;
}
```

### 5.3. Next Greater Element / Next Smaller Element

**Next Greater Element (NGE):** Với mỗi phần tử, tìm phần tử lớn hơn đầu tiên bên phải.

```
Mảng:    [4, 5, 2, 25]
NGE:     [5, 25, 25, -1]
```

**Next Smaller Element (NSE):** Tương tự nhưng tìm phần tử nhỏ hơn đầu tiên.

**Previous Greater Element / Previous Smaller Element:** Tìm bên trái thay vì bên phải.

```cpp
// Next Greater Element
vector<int> nextGreater(vector<int>& a) {
    int n = a.size();
    vector<int> nge(n, -1);
    stack<int> st;
    for (int i = 0; i < n; i++) {
        while (!st.empty() && a[st.top()] < a[i]) {
            nge[st.top()] = a[i];
            st.pop();
        }
        st.push(i);
    }
    return nge;
}

// Next Smaller Element
vector<int> nextSmaller(vector<int>& a) {
    int n = a.size();
    vector<int> nse(n, -1);
    stack<int> st;
    for (int i = 0; i < n; i++) {
        while (!st.empty() && a[st.top()] > a[i]) {
            nse[st.top()] = a[i];
            st.pop();
        }
        st.push(i);
    }
    return nse;
}
```

**Độ phức tạp:** O(N) dù có 2 vòng lặp lồng nhau, vì mỗi phần tử được push/pop tối đa 1 lần.

### 5.4. Trung tố → Hậu tố (Infix → Postfix)

Biến đổi `2 + 3 * 4` thành `2 3 4 * +` (hậu tố / Reverse Polish Notation).

**Thuật toán Shunting-yard (Dijkstra):**

```cpp
string infixToPostfix(string s) {
    string result = "";
    stack<char> ops;
    for (int i = 0; i < s.size(); i++) {
        if (s[i] == ' ') continue;
        if (isdigit(s[i])) {
            while (i < s.size() && isdigit(s[i]))
                result += s[i++];
            result += ' ';
            i--;
        } else if (s[i] == '(') {
            ops.push('(');
        } else if (s[i] == ')') {
            while (!ops.empty() && ops.top() != '(')
                result += ops.top(), result += ' ', ops.pop();
            ops.pop();
        } else {
            while (!ops.empty() && ops.top() != '(' &&
                   priority(ops.top()) >= priority(s[i]))
                result += ops.top(), result += ' ', ops.pop();
            ops.push(s[i]);
        }
    }
    while (!ops.empty())
        result += ops.top(), result += ' ', ops.pop();
    return result;
}
```

### 5.5. Min Stack - Lấy giá trị nhỏ nhất O(1)

**Bài toán:** Thiết kế stack hỗ trợ `push`, `pop`, `top`, và `getMin` (lấy giá trị nhỏ nhất) - tất cả O(1).

**Ý tưởng:** Dùng stack phụ `minStack` luôn lưu giá trị nhỏ nhất tại mỗi thời điểm.

```cpp
class MinStack {
    stack<int> st, minSt;
public:
    void push(int x) {
        st.push(x);
        if (minSt.empty() || x <= minSt.top())
            minSt.push(x);
        else
            minSt.push(minSt.top());  // lặp lại min hiện tại
    }
    void pop() {
        st.pop();
        minSt.pop();
    }
    int top() { return st.top(); }
    int getMin() { return minSt.top(); }
};
```

**Cách khác (tiết kiệm bộ nhớ):** Chỉ push vào `minSt` khi `x` nhỏ hơn hoặc bằng `minSt.top()`. Khi pop, chỉ pop `minSt` nếu `st.top() == minSt.top()`.

```cpp
class MinStack {
    stack<int> st, minSt;
public:
    void push(int x) {
        st.push(x);
        if (minSt.empty() || x <= minSt.top())
            minSt.push(x);
    }
    void pop() {
        if (st.top() == minSt.top())
            minSt.pop();
        st.pop();
    }
    int top() { return st.top(); }
    int getMin() { return minSt.top(); }
};
```

### 5.6. Tính toán biểu thức hậu tố (Postfix Evaluation)

Cho biểu thức hậu tố `"2 3 4 * +"` → tính kết quả.

**Thuật toán:** Duyệt từ trái sang phải:

- Gặp số → push vào stack
- Gặp toán tử → pop 2 số, tính toán, push kết quả lại

```cpp
int evalRPN(vector<string>& tokens) {
    stack<int> st;
    for (string& t : tokens) {
        if (t == "+" || t == "-" || t == "*" || t == "/") {
            int r = st.top(); st.pop();
            int l = st.top(); st.pop();
            if (t == "+") st.push(l + r);
            else if (t == "-") st.push(l - r);
            else if (t == "*") st.push(l * r);
            else st.push(l / r);
        } else {
            st.push(stoi(t));
        }
    }
    return st.top();
}
```

---

## 6. Tổng hợp: Khi nào dùng Stack?

| Bài toán | Loại Stack | Ý tưởng chính |
|----------|-----------|---------------|
| Tính biểu thức | 2 stack (val + ops) | Hoãn toán tử, xử lý theo ưu tiên |
| Kiểm tra ngoặc | Stack ký tự | Push ngoặc mở, pop ngoặc đóng |
| Largest Rectangle | Monotonic Stack (tăng dần) | Pop khi gặp cột thấp hơn |
| Stock Span | Monotonic Stack (giảm dần) | Pop khi gặp giá cao hơn |
| Next Greater Element | Monotonic Stack | Gán kết quả khi pop |
| Min Stack | 2 stack | Stack phụ lưu min tại mỗi thời điểm |
| Postfix Evaluation | Stack số | Pop 2 số khi gặp toán tử |
| Trung tố → Hậu tố | Stack toán tử | Shunting-yard algorithm |

---

## 7. Bài tập luyện tập

### Mức cơ bản (⭐ ~ ⭐⭐)

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [LeetCode - Valid Parentheses](https://leetcode.com/problems/valid-parentheses/) | LeetCode | ⭐ | Kiểm tra ngoặc |
| [LeetCode - Min Stack](https://leetcode.com/problems/min-stack/) | LeetCode | ⭐⭐ | Min Stack O(1) |
| [LeetCode - Evaluate RPN](https://leetcode.com/problems/evaluate-reverse-polish-notation/) | LeetCode | ⭐⭐ | Tính hậu tố |
| [LeetCode - Implement Queue using Stacks](https://leetcode.com/problems/implement-queue-using-stacks/) | LeetCode | ⭐⭐ | Stack ↔ Queue |
| [SPOJ - STPAR](https://www.spoj.com/problems/STPAR/) | SPOJ | ⭐⭐ | Stack sắp xếp |
| [CSES - Nearest Smaller Values](https://cses.fi/problemset/task/1645) | CSES | ⭐⭐ | Next/Previous Smaller |

### Mức trung bình (⭐⭐⭐)

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [LeetCode - Daily Temperatures](https://leetcode.com/problems/daily-temperatures/) | LeetCode | ⭐⭐⭐ | Next Greater Element |
| [LeetCode - Next Greater Element II](https://leetcode.com/problems/next-greater-element-ii/) | LeetCode | ⭐⭐⭐ | NGE trên mảng vòng |
| [LeetCode - Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/) | LeetCode | ⭐⭐⭐ | Monotonic Stack |
| [LeetCode - Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/) | LeetCode | ⭐⭐⭐ | Stack hoặc 2 con trỏ |
| [LeetCode - Basic Calculator](https://leetcode.com/problems/basic-calculator/) | LeetCode | ⭐⭐⭐ | Tính biểu thức + ngoặc |
| [LeetCode - Remove K Digits](https://leetcode.com/problems/remove-k-digits/) | LeetCode | ⭐⭐⭐ | Monotonic Stack |
| [CF 280B - Maximum Xor Secondary](https://codeforces.com/problemset/problem/280/B) | CF | ⭐⭐⭐ | Stack đơn điệu |

### Mức khó (⭐⭐⭐⭐ ~ ⭐⭐⭐⭐⭐)

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [LeetCode - Maximal Rectangle](https://leetcode.com/problems/maximal-rectangle/) | LeetCode | ⭐⭐⭐⭐ | Largest Rectangle mở rộng |
| [LeetCode - Basic Calculator II](https://leetcode.com/problems/basic-calculator-ii/) | LeetCode | ⭐⭐⭐⭐ | Biểu thức không ngoặc |
| [LeetCode - Longest Valid Parentheses](https://leetcode.com/problems/longest-valid-parentheses/) | LeetCode | ⭐⭐⭐⭐ | Stack + DP |
| [SPOJ - MAXRECT](https://www.spoj.com/problems/MAXRECT/) | SPOJ | ⭐⭐⭐⭐ | Largest Rectangle 2D |

---

## Bài viết liên quan

- [Bài 7: Mảng, Stack, Prefix Sum](07-mang-stack-prefix-sum.md)
- [Bài 15: Deque & Sliding Window](15-deque-sliding-window.md)

## Tài liệu tham khảo

- [VNOI Wiki - Stack](https://wiki.vnoi.info/algo/data-structures/Stack)
- [GeeksforGeeks - Stack Data Structure](https://www.geeksforgeeks.org/dsa/stack-data-structure/)
- [CP-Algorithms - Nearest Smaller Element](https://cp-algorithms.com/data_structures/stack_queue_modification.html)

**Bài tiếp theo:** [Binary Search Tree →](30-bst.md)
