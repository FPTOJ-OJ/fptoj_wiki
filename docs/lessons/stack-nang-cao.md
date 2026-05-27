# Bài 24: Stack Nâng Cao - Expression Parsing & Ứng Dụng

> **Tác giả:** Hà Trí Kiên<br>
> **Nội dung tham khảo từ:** VNOI Wiki - Stack, CP-Algorithms

---

## 1. Tính giá trị biểu thức số học

### Bản chất vấn đề

Cho biểu thức `"2 * 3 + 4 * 5"`, tính kết quả đúng quy tắc ưu tiên toán tử: nhân/chia trước cộng/trừ sau. Nếu tính từ trái sang phải không quan tâm ưu tiên sẽ ra sai.

### Tư duy cốt lõi

Sử dụng **2 stack**: `val` (stack giá trị toán hạng) và `ops` (stack toán tử). Khi gặp một toán tử mới, trước khi push vào `ops`, phải xử lý hết các toán tử đang chờ trong `ops` có độ ưu tiên **lớn hơn hoặc bằng** toán tử hiện tại. Sau khi duyệt xong biểu thức, xử lý nốt toán tử còn lại trong `ops`.

Quy tắc xử lý từng ký tự:

1. Gặp **toán hạng** (số) → push vào `val`
2. Gặp **toán tử** → pop và xử lý các toán tử trong `ops` có ưu tiên $\geq$ ưu tiên toán tử hiện tại, sau đó push toán tử mới vào `ops`
3. Duyệt xong → pop hết toán tử còn lại trong `ops`

### Minh họa thuật toán

```mermaid
flowchart LR
    A["Duyệt biểu thức"] --> B{Ký tự là số?}
    B -- "Có" --> C["Push số vào val"]
    B -- "Không" --> D{ops.top() ưu tiên >= hiện tại?}
    D -- "Có" --> E["Pop ops, pop 2 giá trị từ val, tính toán, push kết quả vào val"]
    E --> D
    D -- "Không" --> F["Push toán tử vào ops"]
    C --> A
    F --> A
    A --> G["Xử lý hết ops còn lại"]
```

### Bảng trace: `"2 * 3 + 4 * 5"`

| Bước | Ký tự | Hành động | `val` | `ops` |
|------|--------|-----------|-------|-------|
| 1 | `2` | Push vào `val` | `[2]` | `[]` |
| 2 | `*` | Push vào `ops` | `[2]` | `[*]` |
| 3 | `3` | Push vào `val` | `[2, 3]` | `[*]` |
| 4 | `+` | `priority(*) >= priority(+)`, tính `2*3=6`, push `+` | `[6]` | `[+]` |
| 5 | `4` | Push vào `val` | `[6, 4]` | `[+]` |
| 6 | `*` | `priority(+) < priority(*)`, không xử lý, push `*` | `[6, 4]` | `[+, *]` |
| 7 | `5` | Push vào `val` | `[6, 4, 5]` | `[+, *]` |
| 8 | Hết | Tính `4*5=20`, tính `6+20=26` | `[26]` | `[]` |

**Kết quả:** $26$

### Phân tích tính đúng đắn

Thuật toán đảm bảo đúng quy tắc ưu tiên vì trước khi push mỗi toán tử mới, tất cả toán tử có ưu tiên cao hơn hoặc bằng đã được xử lý xong. Điều này nghĩa là toán tử có ưu tiên cao hơn luôn được thực hiện trước, tương tự quy tắc tính toán thông thường.

Với tính kết hợp trái-sang-phải (left-to-right associativity): khi gặp toán tử mới cùng ưu tiên, toán tử cũ được xử lý trước → đảm bảo tính từ trái sang phải.

### Đánh giá độ phức tạp

- **Thời gian:** $O(N)$ với $N$ là độ dài biểu thức. Mỗi ký tự được push/pop tối đa 1 lần vào mỗi stack.
- **Bộ nhớ:** $O(N)$ cho 2 stack trong trường hợp xấu nhất (ví dụ: `1+2+3+...`).

### Code

=== "C++"

    ```cpp
    int priority(char op) {
        if (op == '+' || op == '-') return 1;
        return 2;
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
            if (s[i] == ' ') continue;
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

=== "Python"

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

## 2. Xử lý biểu thức có dấu ngoặc

### Bản chất vấn đề

Mở rộng bài toán tính biểu thức để hỗ trợ ngoặc `()`. Ngoặc có ưu tiên cao nhất: mọi biểu thức trong ngoặc phải được tính trước.

### Tư duy cốt lõi

Vẫn dùng 2 stack `val` và `ops`, thêm 2 quy tắc:

- Gặp `(` → push vào `ops` như một "mốc"
- Gặp `)` → pop và xử lý toán tử trong `ops` cho đến khi gặp `(`, sau đó loại bỏ `(`

Khi gặp toán tử, điều kiện dừng pop là `ops.top() != '('` — nghĩa là `(` đóng vai trò "hàng rào" ngăn không xử lý toán tử bên ngoài ngoặc.

### Bảng trace: `"(1 + 2) * 3"`

| Bước | Ký tự | Hành động | `val` | `ops` |
|------|--------|-----------|-------|-------|
| 1 | `(` | Push vào `ops` | `[]` | `[(]` |
| 2 | `1` | Push vào `val` | `[1]` | `[(]` |
| 3 | `+` | `ops.top() == '('`, dừng, push `+` | `[1]` | `[(, +]` |
| 4 | `2` | Push vào `val` | `[1, 2]` | `[(, +]` |
| 5 | `)` | Tính `1+2=3`, pop `(` | `[3]` | `[]` |
| 6 | `*` | Push vào `ops` | `[3]` | `[*]` |
| 7 | `3` | Push vào `val` | `[3, 3]` | `[*]` |
| 8 | Hết | Tính `3*3=9` | `[9]` | `[]` |

**Kết quả:** $9$ (không phải $7$ nếu tính sai `1+2*3`)

### Phân tích tính đúng đắn

Ngoặc `(` được push vào stack như một "hàng rào". Khi gặp `)`, thuật toán pop toán tử cho đến khi gặp `(`, đảm bảo toàn bộ biểu thức trong ngoặc được tính xong trước. `(` sau đó bị loại bỏ, không ảnh hưởng đến xử lý phía ngoài.

Mỗi cặp ngoặc đúng luôn khớp đúng vì `(` chỉ bị loại bỏ khi gặp `)` tương ứng.

### Đánh giá độ phức tạp

- **Thời gian:** $O(N)$
- **Bộ nhớ:** $O(N)$

### Code

=== "C++"

    ```cpp
    int priority(char op) {
        if (op == '+' || op == '-') return 1;
        return 2;
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
                ops.pop_back();
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

=== "Python"

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
            elif s[i] == '(':
                ops.append('(')
                i += 1
            elif s[i] == ')':
                while ops and ops[-1] != '(':
                    process()
                ops.pop()
                i += 1
            else:
                while ops and ops[-1] != '(' and priority.get(ops[-1], 0) >= priority.get(s[i], 0):
                    process()
                ops.append(s[i])
                i += 1
        while ops:
            process()
        return vals[0]
    ```

---

## 3. Kiểm tra dãy ngoặc đúng

### Bản chất vấn đề

Cho một chuỗi chỉ gồm các ký tự `(`, `)`, `[`, `]`, `{`, `}`. Kiểm tra xem chuỗi có hợp lệ không, tức là mỗi ngoặc mở phải có ngoặc đóng tương ứng đúng loại và đúng thứ tự.

### Tư duy cốt lõi

Dùng 1 stack ký tự. Khi gặp ngoặc mở → push vào stack. Khi gặp ngoặc đóng → kiểm tra stack.top() có phải ngoặc mở tương ứng không, nếu đúng thì pop, nếu sai thì chuỗi không hợp lệ. Sau khi duyệt hết, stack phải rỗng.

### Bảng trace

| Bước | Ký tự | Hành động | Stack |
|------|--------|-----------|-------|
| 1 | `(` | Push | `[(]` |
| 2 | `[` | Push | `[(, []` |
| 3 | `{` | Push | `[(, [, {]` |
| 4 | `}` | `top == {` khớp → Pop | `[(, []` |
| 5 | `]` | `top == [` khớp → Pop | `[(]` |
| 6 | `)` | `top == (` khớp → Pop | `[]` |

Stack rỗng → **Hợp lệ**

Trường hợp `"([)]"`: gặp `)` khi `top == [` ≠ `(` → **Không hợp lệ**

### Phân tích tính đúng đắn

Stack lưu trữ các ngoặc mở theo đúng thứ tự xuất hiện. Khi gặp ngoặc đóng, ngoặc mở gần nhất luôn ở đỉnh stack (LIFO). Nếu ngoặc đóng không khớp với đỉnh stack, nghĩa là thứ tự lồng ngoặc sai.

### Đánh giá độ phức tạp

- **Thời gian:** $O(N)$ với $N$ là độ dài chuỗi
- **Bộ nhớ:** $O(N)$ trong trường hợp xấu nhất (tất cả đều là ngoặc mở)

### Code

=== "C++"

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

=== "Python"

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

---

## 4. Monotonic Stack - Stack đơn điệu

### Bản chất vấn đề

Monotonic Stack là kỹ thuật duy trì các phần tử trong stack theo thứ tự tăng dần hoặc giảm dần. Khi gặp phần tử mới vi phạm thứ tự, pop các phần tử cũ ra và xử lý. Đây là nền tảng cho nhiều bài toán quan trọng.

### Next Greater Element (NGE)

**Bài toán:** Với mỗi phần tử trong mảng, tìm phần tử lớn hơn đầu tiên bên phải.

**Tư duy cốt lõi:** Duyệt từ trái sang phải, duy trì stack giảm dần. Khi gặp phần tử mới lớn hơn đỉnh stack, pop đỉnh stack và gán kết quả cho phần tử bị pop.

### Bảng trace: `a = [4, 5, 2, 25]`

| Bước | `i` | `a[i]` | Hành động | Stack (index) | `nge` |
|------|-----|--------|-----------|---------------|-------|
| 1 | 0 | 4 | Push | `[0]` | `[-1, -1, -1, -1]` |
| 2 | 1 | 5 | `a[0]=4 < 5` → `nge[0]=5`, pop, push | `[1]` | `[5, -1, -1, -1]` |
| 3 | 2 | 2 | `a[1]=5 > 2`, chỉ push | `[1, 2]` | `[5, -1, -1, -1]` |
| 4 | 3 | 25 | `a[2]=2 < 25` → `nge[2]=25`, pop; `a[1]=5 < 25` → `nge[1]=25`, pop; push | `[3]` | `[5, 25, 25, -1]` |

**Kết quả:** $\text{nge} = [5, 25, 25, -1]$

### Phân tích tính đúng đắn

Mỗi phần tử được push vào stack đúng 1 lần và pop ra đúng 1 lần. Khi phần tử tại index $j$ bị pop bởi phần tử tại index $i$ ($i > j$), nghĩa là $a[i]$ là phần tử lớn hơn đầu tiên bên phải $a[j]$. Các phần tử nằm giữa $j$ và $i$ trong stack đều nhỏ hơn $a[j]$ (đảm bảo bởi tính chất stack giảm dần), nên không phải là NGE của $a[j]$.

### Đánh giá độ phức tạp

- **Thời gian:** $O(N)$ — dù có 2 vòng lặp lồng nhau, mỗi phần tử chỉ push/pop tối đa 1 lần.
- **Bộ nhớ:** $O(N)$ cho stack.

### Code

=== "C++"

    ```cpp
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
    ```

=== "Python"

    ```python
    def next_greater(a):
        n = len(a)
        nge = [-1] * n
        st = []
        for i in range(n):
            while st and a[st[-1]] < a[i]:
                nge[st[-1]] = a[i]
                st.pop()
            st.append(i)
        return nge
    ```

---

## 5. Largest Rectangle in Histogram

### Bản chất vấn đề

Cho $N$ cột histogram có chiều rộng 1 và chiều cao $h[i]$. Tìm hình chữ nhật lớn nhất có thể vẽ được trong histogram.

### Tư duy cốt lõi

Duyệt từ trái sang phải, duy trì stack **tăng dần** chiều cao (lưu index). Khi gặp cột thấp hơn đỉnh stack, pop đỉnh stack và tính diện tích hình chữ nhật với chiều cao là cột bị pop.

**Công thức tính chiều rộng:** Sau khi pop cột tại index $j$:

- Biên trái: đỉnh stack mới (cột bên trái đầu tiên nhỏ hơn $h[j]$)
- Biên phải: index hiện tại $i$ (cột bên phải đầu tiên nhỏ hơn $h[j]$)
- $\text{width} = i - \text{stack.top()} - 1$ (nếu stack không rỗng), hoặc $i$ (nếu stack rỗng)

### Bảng trace: `h = [2, 1, 5, 6, 2, 3]`

| Bước | `i` | Hành động | Stack (index) | Diện tích tính được | `maxArea` |
|------|-----|-----------|---------------|---------------------|-----------|
| 1 | 0 | Push | `[0]` | — | 0 |
| 2 | 1 | `h[0]=2 > 1` → pop idx 0, push | `[1]` | $2 \times 1 = 2$ | 2 |
| 3 | 2 | Push | `[1, 2]` | — | 2 |
| 4 | 3 | Push | `[1, 2, 3]` | — | 2 |
| 5 | 4 | `h[3]=6 > 2` → pop idx 3; `h[2]=5 > 2` → pop idx 2; push | `[1, 4]` | $6 \times 1 = 6$; $5 \times 2 = 10$ | 10 |
| 6 | 5 | Push | `[1, 4, 5]` | — | 10 |
| 7 | 6 (end) | Pop idx 5; pop idx 4; pop idx 1 | `[]` | $3 \times 1 = 3$; $2 \times 4 = 8$; $1 \times 6 = 6$ | 10 |

**Kết quả:** $10$ (hình chữ nhật chiều cao 5, chiều rộng 2 tại cột index 2-3)

### Phân tích tính đúng đắn

Khi pop cột tại index $j$ với chiều cao $h[j]$, đỉnh stack mới là cột bên trái đầu tiên có chiều nhỏ hơn $h[j]$, và index hiện tại $i$ là cột bên phải đầu tiên nhỏ hơn $h[j]$. Vậy hình chữ nhật với chiều cao $h[j]$ mở rộng từ $\text{stack.top()} + 1$ đến $i - 1$, tức là chiều rộng $i - \text{stack.top()} - 1$.

Mọi hình chữ nhật tối ưu đều được xét vì mỗi cột đều được pop đúng 1 lần và diện tích được tính đúng tại thời điểm đó.

### Đánh giá độ phức tạp

- **Thời gian:** $O(N)$ — mỗi cột push/pop tối đa 1 lần
- **Bộ nhớ:** $O(N)$ cho stack

### Code

=== "C++"

    ```cpp
    int largestRectangleArea(vector<int>& heights) {
        stack<int> st;
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

=== "Python"

    ```python
    def largest_rectangle_area(heights):
        st = []
        max_area = 0
        n = len(heights)
        for i in range(n + 1):
            h = 0 if i == n else heights[i]
            while st and h < heights[st[-1]]:
                height = heights[st.pop()]
                width = i if not st else i - st[-1] - 1
                max_area = max(max_area, height * width)
            st.append(i)
        return max_area
    ```

---

## 6. Stock Span Problem

### Bản chất vấn đề

Cho giá cổ phiếu mỗi ngày. Với mỗi ngày, tìm số ngày liên tiếp trước đó mà giá cổ phiếu $\leq$ giá hôm nay (bao gồm cả ngày hôm nay).

### Tư duy cốt lõi

Dùng stack giảm dần (lưu index). Pop các phần tử trong stack có giá $\leq$ giá hiện tại. Giá trị span tại ngày $i$ là $i - \text{stack.top()}$ (nếu stack không rỗng) hoặc $i + 1$ (nếu stack rỗng, tức tất cả ngày trước đều $\leq$).

### Bảng trace: `prices = [100, 80, 60, 70, 60, 75, 85]`

| Bước | `i` | `prices[i]` | Hành động | Stack (index) | `span[i]` |
|------|-----|-------------|-----------|---------------|-----------|
| 1 | 0 | 100 | Push | `[0]` | $0+1=1$ |
| 2 | 1 | 80 | `100 > 80`, chỉ push | `[0, 1]` | $1-0=1$ |
| 3 | 2 | 60 | `80 > 60`, chỉ push | `[0, 1, 2]` | $2-1=1$ |
| 4 | 3 | 70 | `60 <= 70` → pop idx 2, push | `[0, 1, 3]` | $3-1=2$ |
| 5 | 4 | 60 | `70 > 60`, chỉ push | `[0, 1, 3, 4]` | $4-3=1$ |
| 6 | 5 | 75 | `60 <= 75` → pop idx 4; `70 <= 75` → pop idx 3; push | `[0, 1, 5]` | $5-1=4$ |
| 7 | 6 | 85 | `75 <= 85` → pop idx 5; `80 <= 85` → pop idx 1; `100 > 85`, dừng, push | `[0, 6]` | $6-0=6$ |

**Kết quả:** $\text{span} = [1, 1, 1, 2, 1, 4, 6]$

### Phân tích tính đúng đắn

Stack lưu index của các ngày có giá **giảm dần**. Khi gặp ngày $i$ có giá cao hơn, các ngày có giá thấp hơn ở đỉnh stack bị pop. Ngày còn lại ở đỉnh stack là ngày gần nhất bên trái có giá cao hơn giá hiện tại. Số ngày liên tiếp $\leq$ giá hiện tại chính là khoảng cách từ ngày đó đến ngày hiện tại.

### Đánh giá độ phức tạp

- **Thời gian:** $O(N)$ — mỗi ngày push/pop tối đa 1 lần
- **Bộ nhớ:** $O(N)$ cho stack

### Code

=== "C++"

    ```cpp
    vector<int> stockSpan(vector<int>& prices) {
        int n = prices.size();
        vector<int> span(n);
        stack<int> st;
        for (int i = 0; i < n; i++) {
            while (!st.empty() && prices[st.top()] <= prices[i])
                st.pop();
            span[i] = st.empty() ? i + 1 : i - st.top();
            st.push(i);
        }
        return span;
    }
    ```

=== "Python"

    ```python
    def stock_span(prices):
        n = len(prices)
        span = [0] * n
        st = []
        for i in range(n):
            while st and prices[st[-1]] <= prices[i]:
                st.pop()
            span[i] = i + 1 if not st else i - st[-1]
            st.append(i)
        return span
    ```

---

## 7. Trung tố → Hậu tố (Infix → Postfix)

### Bản chất vấn đề

Chuyển đổi biểu thức trung tố `2 + 3 * 4` sang biểu thức hậu tố `2 3 4 * +` (Reverse Polish Notation). Hậu tố không cần ngoặc và thứ tự ưu tiên được thể hiện qua vị trí toán tử.

### Tư duy cốt lõi

Sử dụng thuật toán **Shunting-yard** (Dijkstra): dùng 1 stack toán tử và 1 chuỗi kết quả. Quy tắc:

1. Gặp **số** → thêm vào kết quả
2. Gặp **`(`** → push vào stack
3. Gặp **`)`** → pop toán tử từ stack vào kết quả cho đến khi gặp `(`, sau đó loại bỏ `(`
4. Gặp **toán tử** → pop toán tử có ưu tiên $\geq$ từ stack vào kết quả, sau đó push toán tử mới

### Bảng trace: `"2 + 3 * 4"`

| Bước | Ký tự | Hành động | Stack toán tử | Kết quả |
|------|--------|-----------|---------------|---------|
| 1 | `2` | Thêm vào kết quả | `[]` | `2 ` |
| 2 | `+` | Push | `[+]` | `2 ` |
| 3 | `3` | Thêm vào kết quả | `[+]` | `2 3 ` |
| 4 | `*` | `priority(+) < priority(*)`, chỉ push | `[+, *]` | `2 3 ` |
| 5 | `4` | Thêm vào kết quả | `[+, *]` | `2 3 4 ` |
| 6 | Hết | Pop `*`, pop `+` | `[]` | `2 3 4 * + ` |

**Kết quả:** `2 3 4 * +`

### Phân tích tính đúng đắn

Thuật toán đảm bảo rằng toán tử có ưu tiên cao hơn xuất hiện sau các toán hạng của nó trong chuỗi hậu tố, tương ứng với việc thực hiện trước. Toán tử có ưu tiên thấp hơn bị đẩy ra sau, nghĩa là nó sẽ được thực hiện sau.

### Đánh giá độ phức tạp

- **Thời gian:** $O(N)$
- **Bộ nhớ:** $O(N)$ cho stack và chuỗi kết quả

### Code

=== "C++"

    ```cpp
    int priority(char op) {
        if (op == '+' || op == '-') return 1;
        return 2;
    }

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

=== "Python"

    ```python
    def infix_to_postfix(s):
        priority = {'+': 1, '-': 1, '*': 2, '/': 2}
        result = []
        ops = []
        i = 0
        while i < len(s):
            if s[i] == ' ':
                i += 1
            elif s[i].isdigit():
                num = ''
                while i < len(s) and s[i].isdigit():
                    num += s[i]
                    i += 1
                result.append(num)
            elif s[i] == '(':
                ops.append('(')
                i += 1
            elif s[i] == ')':
                while ops and ops[-1] != '(':
                    result.append(ops.pop())
                ops.pop()
                i += 1
            else:
                while ops and ops[-1] != '(' and priority.get(ops[-1], 0) >= priority.get(s[i], 0):
                    result.append(ops.pop())
                ops.append(s[i])
                i += 1
        while ops:
            result.append(ops.pop())
        return ' '.join(result)
    ```

---

## 8. Tính toán biểu thức hậu tố (Postfix Evaluation)

### Bản chất vấn đề

Cho biểu thức hậu tố `"2 3 4 * +"`, tính kết quả bằng cách duyệt từ trái sang phải.

### Tư duy cốt lõi

Dùng 1 stack số. Gặp số → push. Gặp toán tử → pop 2 số, tính toán, push kết quả lại.

### Bảng trace: `"2 3 4 * +"`

| Bước | Token | Hành động | Stack |
|------|-------|-----------|-------|
| 1 | `2` | Push | `[2]` |
| 2 | `3` | Push | `[2, 3]` |
| 3 | `4` | Push | `[2, 3, 4]` |
| 4 | `*` | Pop 3, 4; tính $3 \times 4 = 12$; push | `[2, 12]` |
| 5 | `+` | Pop 12, 2; tính $2 + 12 = 14$; push | `[14]` |

**Kết quả:** $14$

### Phân tích tính đúng đắn

Biểu thức hậu tố đã encode sẵn thứ tự thực hiện. Khi gặp toán tử, 2 toán hạng gần nhất luôn ở đỉnh stack, đảm bảo phép tính đúng.

### Đánh giá độ phức tạp

- **Thời gian:** $O(N)$
- **Bộ nhớ:** $O(N)$ cho stack

### Code

=== "C++"

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

=== "Python"

    ```python
    def eval_rpn(tokens):
        st = []
        for t in tokens:
            if t in '+-*/':
                r, l = st.pop(), st.pop()
                if t == '+': st.append(l + r)
                elif t == '-': st.append(l - r)
                elif t == '*': st.append(l * r)
                else: st.append(int(l / r))
            else:
                st.append(int(t))
        return st[0]
    ```

---

## 9. Min Stack - Lấy giá trị nhỏ nhất $O(1)$

### Bản chất vấn đề

Thiết kế một cấu trúc dữ liệu stack hỗ trợ 4 thao tác: `push`, `pop`, `top`, và `getMin` — tất cả đều $O(1)$.

### Tư duy cốt lõi

Dùng thêm 1 stack phụ `minSt` để lưu giá trị nhỏ nhất tại mỗi thời điểm. Khi push phần tử mới $x$:

- Nếu $x \leq \text{minSt.top()}$ → push $x$ vào cả 2 stack
- Nếu $x > \text{minSt.top()}$ → chỉ push vào stack chính, giá trị min không đổi

Khi pop: nếu phần tử bị pop bằng giá trị nhỏ nhất hiện tại ($\text{st.top()} == \text{minSt.top()}$), pop cả `minSt`.

### Phân tích tính đúng đắn

`minSt` luôn lưu chuỗi giá trị nhỏ nhất tại mỗi thời điểm. Khi phần tử nhỏ nhất bị pop ra, phần tử nhỏ nhất tiếp theo nằm ngay dưới trong `minSt`. Đảm bảo `getMin()` luôn trả về đúng giá trị min trong $O(1)$.

### Đánh giá độ phức tạp

- **Thời gian:** Tất cả thao tác đều $O(1)$
- **Bộ nhớ:** $O(N)$ cho stack chính; $O(N)$ cho `minSt` trong trường hợp xấu nhất (mảng giảm dần), $O(1)$ nếu mảng tăng dần

### Code

=== "C++"

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

=== "Python"

    ```python
    class MinStack:
        def __init__(self):
            self.st = []
            self.min_st = []

        def push(self, x):
            self.st.append(x)
            if not self.min_st or x <= self.min_st[-1]:
                self.min_st.append(x)

        def pop(self):
            if self.st[-1] == self.min_st[-1]:
                self.min_st.pop()
            self.st.pop()

        def top(self):
            return self.st[-1]

        def get_min(self):
            return self.min_st[-1]
    ```

---

## 10. Lưu ý & Cạm bẫy

### Toán tử một ngôi (Unary minus)

Biểu thức `"-5 + 3"` hoặc `"2 * (-3)"` yêu cầu xử lý toán tử `-` một ngôi. Code cơ bản nhầm lẫn `-` một ngôi với `-` nhị phân.

Cách sửa: khi gặp `-` mà **phía trước là toán tử, `(`, hoặc đầu chuỗi** → push $0$ vào `val` trước để chuyển thành `"0 - 5"`.

=== "C++"

    ```cpp
    if (s[i] == '-' && (i == 0 || s[i-1] == '(' ||
         s[i-1] == '+' || s[i-1] == '-')) {
        val.push_back(0);
    }
    ```

=== "Python"

    ```python
    if s[i] == '-' and (i == 0 or s[i-1] in '(+-'):
        vals.append(0)
    ```

### Toán tử cùng độ ưu tiên

Với điều kiện `priority(ops.back()) >= priority(s[i])`, phép trừ sẽ được tính từ trái sang phải (left-to-right associativity): $8 - 3 - 2 = (8 - 3) - 2 = 3$.

Nếu dùng `>` thay vì `>=`, kết quả sai: $8 - (3 - 2) = 7$.

### Stack rỗng khi truy cập

Quy tắc: **luôn kiểm tra `empty()` trước khi gọi `top()` hoặc `pop()`**. Đây là lỗi runtime phổ biến nhất.

=== "C++"

    ```cpp
    while (!ops.empty() && ...)  // kiểm tra empty() trước
    ```

=== "Python"

    ```python
    while ops and ...  # kiểm tra truthy trước
    ```

### Chia cho 0

Luôn kiểm tra $r \neq 0$ trước khi thực hiện phép chia.

### Ngoặc lồng sâu

Thuật toán stack không đệ quy xử lý được hàng triệu lớp lồng nhau an toàn, không lo tràn stack như cách tiếp cận đệ quy.

---

## 11. Tổng hợp: Khi nào dùng Stack?

| Bài toán | Loại Stack | Ý tưởng chính |
|----------|-----------|---------------|
| Tính biểu thức | 2 stack ($\text{val}$ + $\text{ops}$) | Hoãn toán tử, xử lý theo ưu tiên |
| Kiểm tra ngoặc | Stack ký tự | Push ngoặc mở, pop ngoặc đóng |
| Largest Rectangle | Monotonic Stack (tăng dần) | Pop khi gặp cột thấp hơn |
| Stock Span | Monotonic Stack (giảm dần) | Pop khi gặp giá cao hơn |
| Next Greater Element | Monotonic Stack | Gán kết quả khi pop |
| Min Stack | 2 stack | Stack phụ lưu min tại mỗi thời điểm |
| Postfix Evaluation | Stack số | Pop 2 số khi gặp toán tử |
| Trung tố → Hậu tố | Stack toán tử | Shunting-yard algorithm |

---

## 12. Bài tập luyện tập

### Mức cơ bản (⭐ ~ ⭐⭐)

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [LeetCode - Valid Parentheses](https://leetcode.com/problems/valid-parentheses/) | LeetCode | ⭐ | Kiểm tra ngoặc |
| [LeetCode - Min Stack](https://leetcode.com/problems/min-stack/) | LeetCode | ⭐⭐ | Min Stack $O(1)$ |
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

- [Bài 7: Mảng, Stack, Prefix Sum](mang-stack-prefix-sum.md)
- [Bài 15: Deque & Sliding Window](deque-sliding-window.md)

## Tài liệu tham khảo

- [VNOI Wiki - Stack](https://wiki.vnoi.info/algo/data-structures/Stack)
- [GeeksforGeeks - Stack Data Structure](https://www.geeksforgeeks.org/dsa/stack-data-structure/)
- [CP-Algorithms - Nearest Smaller Element](https://cp-algorithms.com/data_structures/stack_queue_modification.html)

**Bài tiếp theo:** [Binary Search Tree →](bst.md)
