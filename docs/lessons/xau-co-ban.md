# Bài 44: Xâu Ký Tự Cơ Bản

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** VNOI Wiki - String, CP-Algorithms - String basics

---

## Bạn sẽ học được gì?

- Các thao tác cơ bản với xâu ký tự: đếm tần số, đếm từ, chuẩn hóa
- Kỹ thuật so sánh và biến đổi xâu: palindrome, hoán vị, nén RLE
- Kiến thức nền tảng để học các thuật toán xâu nâng cao (KMP, Hash, Z-algorithm)

---

## 1. Khái niệm cơ bản

### Xâu ký tự là gì?

Xâu (chuỗi) là một dãy các ký tự liên tiếp, ví dụ: `"hello"`, `"abc123"`. Trong lập trình thi đấu, xâu thường gồm:

- **Chữ cái Latin** in thường (`a`-`z`) hoặc in hoa (`A`-`Z`)
- **Chữ số** (`0`-`9`)
- **Ký tự đặc biệt** (dấu cách, dấu câu)

### Các thao tác cơ bản trong C++ & Python

| Thao tác | C++ (`std::string`) | Python (`str`) | Mô tả |
|----------|---------------------|----------------|-------|
| Đọc 1 từ | `cin >> s` | `input().split()` | Đọc tới dấu cách/xuống dòng |
| Đọc cả dòng | `getline(cin, s)` | `sys.stdin.readline().rstrip('\r\n')` | Đọc trọn 1 dòng có dấu cách |
| Độ dài | `s.size()` | `len(s)` | Số ký tự |
| Truy cập | `s[i]` | `s[i]` | Ký tự tại chỉ số `i` (Python bất biến) |
| Nối xâu | `s1 + s2` | `s1 + s2` / `"".join(...)` | Nối nhiều xâu ở Python nên dùng `join` |
| Đảo ngược | `reverse(s.begin(), s.end())` | `s[::-1]` | Tạo xâu đảo ngược |
| Chuyển số | `stoi(s)`, `stoll(s)` | `int(s)` | Chuyển xâu thành số nguyên |
| Đổi HOA/thường | `toupper(c)`, `tolower(c)` | `s.upper()`, `s.lower()` | Chuẩn hóa kiểu chữ |

### Tại sao cần học xử lý xâu?

Trong thi đấu, có rất nhiều bài toán liên quan đến xâu:

- Đếm tần số ký tự, tần số từ
- Kiểm tra xâu đối xứng (palindrome)
- Sắp xếp từ điển
- Tìm xâu con, đếm xâu con
- Hash xâu, KMP, Z-algorithm (các bài nâng cao)

Xâu ký tự có **nhiều thuật toán chuyên biệt** vì cấu trúc xâu rất đặc thù (tính tuần tự, lặp lại).

---

## 2. Các dạng bài toán thường gặp

### 2.1. Đếm tần suất ký tự

**Bài toán:** Đếm số lần xuất hiện của 26 chữ cái trong xâu.

**Cách giải quyết đơn giản:** Dùng mảng đếm 26 phần tử (`ord(c) - ord('a')` ánh xạ `'a'` $\to 0$, `'z'` $\to 25$).

=== "C++"

    ```cpp
    vector<int> cnt(26, 0);          // Mảng đếm 26 chữ cái, khởi tạo = 0
    for (char c : s)                 // Duyệt từng ký tự trong xâu
        cnt[c - 'a']++;              // 'a' -> 0, 'b' -> 1, ..., 'z' -> 25
    ```

=== "Python"

    ```python
    cnt = [0] * 26
    for c in s:
        cnt[ord(c) - ord('a')] += 1
    ```

### 2.2. Đếm số từ

**Bài toán:** Đếm số từ trong xâu (các từ phân cách bởi dấu cách).

**Lưu ý:** Phải xử lý trường hợp **nhiều dấu cách liên tiếp** và **dấu cách đầu/cuối**.

=== "C++ (Duyệt thủ công & stringstream)"

    ```cpp
    // Cách 1: Duyệt thủ công O(N) với cờ trạng thái inWord
    int cnt = 0;
    bool inWord = false;
    for (char c : s) {
        if (c != ' ') {
            if (!inWord) { cnt++; inWord = true; }
        } else {
            inWord = false;
        }
    }

    // Cách 2: Dùng stringstream (gọn nhẹ)
    stringstream ss(s);
    string word;
    int cntStream = 0;
    while (ss >> word) cntStream++;
    ```

=== "Python"

    ```python
    # s.split() không đối số tự động gộp mọi khoảng trắng liên tiếp và bỏ đầu/cuối
    cnt = len(s.split())
    ```

> **Trace tay §2.2 — `s = "  an   com  "` (2 dấu cách đầu, 3 dấu cách giữa, 2 cuối):**
>
> | Ký tự | `c != ' '`? | `inWord` trước | Hành động | `cnt` |
> |-------|-------------|----------------|-----------|-------|
> | `' '` | Không | `false` | `inWord = false` | 0 |
> | `' '` | Không | `false` | giữ `false` | 0 |
> | `'a'` | Có | `false` | `cnt++` → 1, `inWord = true` | 1 |
> | `'n'` | Có | `true` | ở trong từ, không đếm | 1 |
> | `' '`×3 | Không | `true`→`false` | ra khỏi từ | 1 |
> | `'c'` | Có | `false` | `cnt++` → 2, `inWord = true` | 2 |
> | `'o','m'` | Có | `true` | không đếm | 2 |
> | `' '`×2 | Không | `true`→`false` | ra khỏi từ | 2 |
>
> Kết quả `cnt = 2` ✓ (nhiều dấu cách kề nhau chỉ đổi `inWord` 1 lần).

### 2.3. Kiểm tra palindrome

**Bài toán:** Xâu đọc xuôi = đọc ngược?

**Cách giải quyết:** Hai con trỏ, một từ đầu và một từ cuối, so sánh và di chuyển vào trong.

=== "C++"

    ```cpp
    bool isPalindrome(const string& s) {
        int l = 0, r = (int)s.size() - 1;
        while (l < r) {
            if (s[l] != s[r]) return false;
            l++; r--;
        }
        return true;
    }
    ```

=== "Python"

    ```python
    def is_palindrome(s):
        return s == s[::-1]
    ```

> **Trace tay §2.3 — `s = "abca"` (không phải palindrome, dừng sớm):**
>
> | Vòng | `l` | `r` | So sánh `s[l]` vs `s[r]` | Hành động |
> |------|-----|-----|--------------------------|-----------|
> | 1 | 0 | 3 | `'a'` vs `'a'` → khớp | `l=1, r=2` |
> | 2 | 1 | 2 | `'b'` vs `'c'` → lệch | `return false` |
>
> Với `s = "aba"`: vòng 1 so `'a'` vs `'a'` khớp → `l=1, r=1` → điều kiện `l < r` sai → `return true` ✓.

### 2.4. Chuẩn hóa xâu

**Quy tắc chuẩn hóa:**

- Xóa khoảng trắng thừa ở đầu/cuối
- Giữa các từ chỉ 1 dấu cách
- Viết hoa chữ cái đầu, còn lại viết thường

**Cách giải quyết:**

=== "C++"

    ```cpp
    string normalize(string s) {
        stringstream ss(s);     // Tách từ bằng stringstream (tự bỏ khoảng trắng thừa)
        string word, result;
        while (ss >> word) {
            for (char& c : word) c = tolower((unsigned char)c);
            word[0] = toupper((unsigned char)word[0]);
            if (!result.empty()) result += ' ';
            result += word;
        }
        return result;
    }
    // Input:  "  ngUYen   Van  AN  " -> Output: "Nguyen Van An" (hỗ trợ ASCII)
    ```

=== "Python"

    ```python
    def normalize(s):
        return " ".join(w.capitalize() for w in s.split())
    ```

### 2.5. Sắp xếp theo từ điển

**Cách giải quyết:** Dùng `sort` với comparator mặc định của `string`. So sánh xâu trong C++ đã tự động theo thứ tự từ điển.

**Ví dụ minh họa:**

```cpp
vector<string> words = {"code", "abc", "z", "abcd", "xyz"};
sort(words.begin(), words.end()); // Sắp xếp theo từ điển
// Kết quả: ["abc", "abcd", "code", "xyz", "z"]
```

### 2.6. Mã hóa RLE (Run-Length Encoding)

**Ý tưởng:** Biến `aaaa` thành `a4`, `aabbb` thành `a2b3`.

**Cải biến phổ biến:** Nếu xâu nén **dài hơn** xâu gốc, giữ nguyên xâu gốc.

=== "C++"

    ```cpp
    string rle(string s) {
        string result = "";
        int n = s.size();
        for (int i = 0; i < n; ) {       // Duyệt từng ký tự
            char c = s[i];
            int cnt = 1;                  // Đếm số lần xuất hiện liên tiếp
            while (i + 1 < n && s[i + 1] == c) {
                cnt++;
                i++;
            }
            result += c;                  // Thêm ký tự
            result += to_string(cnt);     // Thêm số lần xuất hiện
            i++;
        }
        // Nếu xâu nén dài hơn xâu gốc -> trả lại xâu gốc
        return (result.size() < s.size()) ? result : s;
    }
    // Input:  "aaabbcccc" -> Output: "a3b2c4"
    ```

=== "Python"

    ```python
    def rle(s):
        n = len(s)
        parts = []
        i = 0
        while i < n:
            c = s[i]
            cnt = 1
            while i + 1 < n and s[i + 1] == c:
                cnt += 1
                i += 1
            parts.append(f"{c}{cnt}")
            i += 1
        res = "".join(parts)
        return res if len(res) < n else s
    ```

> **Trace tay §2.6 — RLE với `s = "aaabb"` (`n = 5`):**
>
> | Vòng | `i` đầu vòng | `c` | Đếm `cnt` (while trong) | Ghi `result` | `i` cuối vòng |
> |------|--------------|-----|--------------------------|--------------|---------------|
> | 1 | 0 | `'a'` | `s[1]=='a'`→2, `s[2]=='a'`→3, `s[3]=='b'` dừng | `"a3"` | 3 |
> | 2 | 3 | `'b'` | `s[4]=='b'`→2, hết xâu dừng | `"a3b2"` | 5 |
>
> `result = "a3b2"` dài 4 < 5 = `s.size()` → trả `"a3b2"`. Chú ý `i++` cuối vòng nhảy qua nhóm đã đếm, nên vòng `for` không cần `i++` riêng.

### 2.7. Hoán vị (Anagram)

**Bài toán:** Hai xâu là hoán vị khi sắp xếp lại các ký tự xâu này được xâu kia.

**Cách giải quyết:** Đếm tần suất ký tự ở cả hai xâu, so sánh. Hoặc sort cả hai và so sánh.

=== "C++"

    ```cpp
    sort(a.begin(), a.end());
    sort(b.begin(), b.end());
    cout << (a == b ? "YES" : "NO") << "\n";
    ```

=== "Python"

    ```python
    from collections import Counter
    print("YES" if Counter(a) == Counter(b) else "NO")
    ```

---

## 3. Đánh giá độ phức tạp & Kỹ thuật hữu ích

| Thao tác trên xâu độ dài $N$ | Độ phức tạp (C++ / Python) | Ghi chú |
| :--- | :--- | :--- |
| Đếm tần suất / RLE / Palindrome | $O(N)$ | Duyệt một lần hoặc 2 con trỏ |
| Tách từ / Chuẩn hóa | $O(N)$ | Trong Python dùng `"".join()` tránh nối `+=` lặp lại $O(N^2)$ |
| Sắp xếp $K$ xâu độ dài trung bình $L$ | $O(K \log K \cdot L)$ | Mỗi phép so sánh 2 xâu tốn tới $O(L)$ |
| Kiểm tra hoán vị (Sort vs Đếm) | $O(N \log N)$ vs $O(N)$ | Dùng mảng đếm 26 hoặc `Counter` nhanh hơn `sort` |

### 3.1. Đảo ngược một xâu con

```cpp
// Đảo ngược đoạn từ vị trí l đến r (bao gồm cả l và r)
reverse(s.begin() + l, s.begin() + r + 1);
// Ví dụ: s = "abcdef", l=1, r=3 -> s = "adcbef"
```

### 3.2. Tách xâu theo ký tự phân cách

Dùng `stringstream`:
```cpp
stringstream ss(s);          // Tạo luồng từ xâu s
string word;
while (ss >> word) {         // Mỗi lần đọc một từ (bỏ qua khoảng trắng)
    // Xử lý word: word là một từ đã tách
}
```
**Tách theo ký tự đặc biệt (ví dụ dấu phẩy):**
```cpp
string s = "a,b,c,d";
stringstream ss(s);
string token;
while (getline(ss, token, ',')) { // Dùng dấu phẩy làm phân cách
    cout << token << "\n";         // In ra: a, b, c, d
}
```

### 3.3. Tìm xâu con (substring)

```cpp
// Cắt xâu con từ vị trí pos, lấy len ký tự
string sub = s.substr(pos, len);
// Ví dụ: s = "algorithm", s.substr(2, 3) = "gor"
// Nếu không truyền len -> cắt từ pos đến hết xâu
string tail = s.substr(5);  // Từ vị trí 5 đến cuối
```

### 3.4. Tìm vị trí xâu con

```cpp
size_t pos = s.find(pattern);    // Tìm pattern trong s
if (pos != string::npos) {       // string::npos = "không tìm thấy"
    // Tìm thấy pattern tại vị trí pos
}
// Tìm từ vị trí start trở đi:
size_t pos2 = s.find(pattern, start);
```

---

## 4. Lưu ý và cạm bẫy

### Bẫy 1: Đọc xâu có dấu cách

```cpp
// SAI: cin >> s chỉ đọc đến dấu cách đầu tiên
string s; cin >> s;

// ĐÚNG: Dùng getline để đọc cả dòng
string s; getline(cin, s);
```

### Bẫy 2: Quên xóa ký tự thừa cuối xâu

```cpp
// SAI: Không xóa '\r' khi input từ file Windows
// ĐÚNG: Thêm bước loại bỏ ký tự thừa
while (!s.empty() && (s.back() == '\r' || s.back() == '\n')) s.pop_back();
```

### Bẫy 3: So sánh xâu lowercase/uppercase

```cpp
// SAI: "ABC" != "abc"
// ĐÚNG: Chuyển về cùng case trước khi so sánh
for (char& c : s) c = tolower(c);
```

### Bẫy 4: Ký tự null `'\0'` không xuất hiện ở cuối xâu kiểu C++

```cpp
// SAI: Dùng hàm của C (strlen, strcpy)
// ĐÚNG: Dùng string của C++ với .size(), .substr()
```

### Bẫy 5: Khởi tạo vector đếm

```cpp
// SAI: vector<int> cnt; // cnt rỗng, chưa có phần tử nào!
vector<int> cnt(26, 0);  // Tạo 26 phần tử giá trị 0
```

---

## Kỹ thuật nâng cao bổ sung

### Đếm số lần xuất hiện của mọi ký tự (dùng `map`)

Khi xâu chứa ký tự ngoài bảng chữ cái Latin (unicode, dấu câu), không thể dùng mảng 26 phần tử:

```cpp
map<char, int> freq;            // Map đếm tần suất cho ký tự bất kỳ
for (char c : s) freq[c]++;     // Tần suất của từng ký tự riêng biệt
```

### Kiểm tra ký tự số / chữ cái (dùng built-in)

```cpp
isalpha(c)   // true nếu c là chữ cái (a-z hoặc A-Z)
isdigit(c)   // true nếu c là chữ số (0-9)
isalnum(c)   // true nếu c là chữ cái hoặc chữ số
isspace(c)   // true nếu c là khoảng trắng, tab, xuống dòng
```

### Đổi giữa xâu và số

```cpp
// Xâu -> Số
int num = stoi("123");          // Chuyển sang int
long long big = stoll("9999999999"); // Chuyển sang long long

// Số -> Xâu
string s = to_string(42);       // "42"
```

---

## Bài tập luyện tập

| Mã bài | Tên bài tập | Độ khó | Chủ đề |
|---|---|---|---|
| [`strb-freq`](https://fptoj.com/problem/strb-freq) | Thống kê chữ cái | ⭐ | Đếm tần suất ký tự |
| [`strb-wordcnt`](https://fptoj.com/problem/strb-wordcnt) | Đếm số từ trong xâu | ⭐ | Đếm số từ (nhiều dấu cách) |
| [`strb-palin`](https://fptoj.com/problem/strb-palin) | Kiểm tra xâu đối xứng | ⭐ | Hai con trỏ kiểm tra palindrome |
| [`strb-name`](https://fptoj.com/problem/strb-name) | Chuẩn hóa họ tên | ⭐⭐ | Tách từ + viết hoa/thường |
| [`strb-sortword`](https://fptoj.com/problem/strb-sortword) | Sắp xếp từ trong xâu | ⭐⭐ | `sort` vector string |
| [`strb-rle`](https://fptoj.com/problem/strb-rle) | Mã hóa RLE | ⭐⭐ | Nén xâu bằng Run-Length Encoding |
| [`strb-unique`](https://fptoj.com/problem/strb-unique) | Xóa ký tự trùng liên tiếp | ⭐⭐ | Duyệt giữ ký tự khác trước |
| [`strb-anagram`](https://fptoj.com/problem/strb-anagram) | Hoán vị xâu (Anagram) | ⭐⭐ | Đếm tần suất 26 ký tự |

## Bài viết liên quan

- [Bài 45: KMP - Tìm Xâu Mẫu](kmp-tim-xau.md)
- [Bài 46: Hash xâu & Z-Algorithm](hash-xau-z-algorithm.md)
- [Bài 15: Hash Table](hash-table.md)

## Tài liệu tham khảo

- [CP-Algorithms - String Processing](https://cp-algorithms.com/string/)
- [VNOI Wiki - String](https://wiki.vnoi.info/algo/string/basic)
- [GeeksforGeeks - String Data Structure](https://www.geeksforgeeks.org/string-data-structure/)
- [C++ Reference - std::string](https://en.cppreference.com/w/cpp/string/basic_string)

---

**Bài trước:** [← Bài 43: Binary Search on Answer](binary-search-on-answer.md) | **Bài tiếp theo:** [Bài 45: KMP →](kmp-tim-xau.md)
