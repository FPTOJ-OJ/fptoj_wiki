# Bài 26: Xâu ký tự cơ bản

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

### Các thao tác cơ bản trong C++

| Thao tác | Cú pháp | Mô tả |
|----------|---------|--------|
| Đọc xâu | `cin >> s` | Đọc một từ (kết thúc khi gặp dấu cách/xuống dòng) |
| Đọc cả dòng | `getline(cin, s)` | Đọc cả dòng bao gồm dấu cách |
| Độ dài | `s.size()` hoặc `s.length()` | Trả về số ký tự |
| Truy cập | `s[i]` | Truy cập ký tự thứ `i` |
| So sánh | `s1 == s2` | So sánh hai xâu |
| Nối xâu | `s1 + s2` | Nối hai xâu |
| Đảo ngược | `reverse(s.begin(), s.end())` | Đảo ngược xâu |
| Chuyển số | `stoi(s)`, `stoll(s)` | Chuyển xâu thành số |
| Chuyển HOA/thường | `toupper(c)`, `tolower(c)` | Đổi chữ hoa/thường |

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

**Cách giải quyết đơn giản:** Dùng mảng đếm 26 phần tử.

```cpp
vector<int> cnt(26, 0);          // Mảng đếm 26 chữ cái, khởi tạo = 0
for (char c : s)                 // Duyệt từng ký tự trong xâu
    cnt[c - 'a']++;              // 'a' -> 0, 'b' -> 1, ..., 'z' -> 25
```

### 2.2. Đếm số từ

**Bài toán:** Đếm số từ trong xâu (các từ phân cách bởi dấu cách).

**Lưu ý:** Phải xử lý trường hợp **nhiều dấu cách liên tiếp** và **dấu cách đầu/cuối**.

**Hai cách tiếp cận:**

1. **Duyệt thủ công** với cờ `inWord`:
```cpp
int cnt = 0;                        // Biến đếm số từ
bool inWord = false;                // Cờ: đang ở trong một từ không?
for (char c : s) {
    if (c != ' ') {                 // Gặp ký tự không phải dấu cách
        if (!inWord) {              // Nếu đang KHÔNG trong từ
            cnt++;                  // Thì đây là bắt đầu của một từ mới
            inWord = true;          // Đánh dấu đã vào trong từ
        }
    } else {                        // Gặp dấu cách
        inWord = false;             // Đã ra khỏi từ
    }
}
```

2. **Dùng `stringstream`** (chậm hơn nhưng code gọn):
```cpp
stringstream ss(s);                 // Tạo stringstream từ xâu s
string word;
int cnt = 0;
while (ss >> word) cnt++;           // Toán tử >> tự động bỏ qua khoảng trắng
```

### 2.3. Kiểm tra palindrome

**Bài toán:** Xâu đọc xuôi = đọc ngược?

**Cách giải quyết:** Hai con trỏ, một từ đầu và một từ cuối, so sánh và di chuyển vào trong.

```cpp
int l = 0, r = s.size() - 1;     // Hai con trỏ: l từ đầu, r từ cuối
while (l < r) {                   // Dừng khi l >= r (đã duyệt hết xâu)
    if (s[l] != s[r]) return false; // Ký tự không khớp -> không phải palindrome
    l++; r--;                     // Di chuyển con trỏ vào trong
}
return true;                      // Tất cả cặp đều khớp -> là palindrome
```

### 2.4. Chuẩn hóa xâu

**Quy tắc chuẩn hóa:**
- Xóa khoảng trắng thừa ở đầu/cuối
- Giữa các từ chỉ 1 dấu cách
- Viết hoa chữ cái đầu, còn lại viết thường

**Cách giải quyết:**

```cpp
string normalize(string s) {
    // Bước 1: Xóa dấu cách thừa ở đầu
    while (!s.empty() && s[0] == ' ') s.erase(0, 1);
    // Bước 2: Xóa dấu cách thừa ở cuối
    while (!s.empty() && s.back() == ' ') s.pop_back();

    stringstream ss(s);     // Tách từ bằng stringstream
    string word, result;
    while (ss >> word) {
        // Chuyển tất cả ký tự về chữ thường trước
        for (char& c : word) c = tolower(c);
        // Viết hoa chữ cái đầu của mỗi từ
        word[0] = toupper(word[0]);
        // Thêm từ vào kết quả, cách nhau bởi 1 dấu cách
        if (!result.empty()) result += ' ';
        result += word;
    }
    return result;
}
// Input:  "  ngUYễn   Văn  AN  "
// Output: "Nguyễn Văn An"
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
// Input:  "aaabbcccc"
// Output: "a3b2c4"
```

### 2.7. Hoán vị (Anagram)

**Bài toán:** Hai xâu là hoán vị khi sắp xếp lại các ký tự xâu này được xâu kia.

**Cách giải quyết:** Đếm tần suất ký tự ở cả hai xâu, so sánh. Hoặc sort cả hai và so sánh.

```cpp
sort(a.begin(), a.end());
sort(b.begin(), b.end());
if (a == b) cout << "YES" << endl;
```

---

## 3. Các kỹ thuật hữu ích

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

- [Bài 9: KMP - Tìm Xâu Mẫu](kmp-tim-xau.md)
- [Bài 14: Hash xâu & Z-Algorithm](hash-xau-z-algorithm.md)
- [Bài 16: Hash Table](hash-table.md)

## Tài liệu tham khảo

- [CP-Algorithms - String Processing](https://cp-algorithms.com/string/)
- [VNOI Wiki - String](https://wiki.vnoi.info/algo/string/basic)
- [GeeksforGeeks - String Data Structure](https://www.geeksforgeeks.org/string-data-structure/)
- [C++ Reference - std::string](https://en.cppreference.com/w/cpp/string/basic_string)

**Bài tiếp theo:** [Bài 27: Hash xâu →](hash-xau-z-algorithm.md)
