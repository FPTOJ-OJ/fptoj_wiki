# C05: String — Xử lý chuỗi trong C++

> **Tác giả:** FPTOJ Wiki<br>
> **Chủ đề:** Chuỗi `string`, các phương thức, xử lý xâu thi đấu

---

## Bạn sẽ học được gì?

Sau bài này, bạn có thể:

- Khai báo và sử dụng `string` trong C++
- Các phương thức thường dùng: `length`, `substr`, `find`, `replace`
- Chuyển đổi giữa `string` và số
- Xử lý chuỗi trong thi đấu

---

## 1. Khai báo string

```cpp
#include <string>

string s1 = "Hello";           // Khởi tạo từ chuỗi literal
string s2;                     // Chuỗi rỗng
string s3(5, 'A');             // "AAAAA" (5 ký tự 'A')
string s4 = s1;                // Sao chép s1
```

---

## 2. Các thao tác cơ bản

### Độ dài và truy cập

```cpp
string s = "Hello";

cout << s.length() << endl;   // 5 (hoặc s.size())
cout << s[0] << endl;         // 'H' (ký tự đầu)
cout << s[4] << endl;         // 'o' (ký tự cuối)
cout << s.front() << endl;    // 'H' (ký tự đầu)
cout << s.back() << endl;     // 'o' (ký tự cuối)
```

### Nối chuỗi

```cpp
string s = "Hello";
s += " World";           // s = "Hello World"
s += '!';                // s = "Hello World!"
s.append("!!!");         // s = "Hello World!!!!"
```

### Cắt chuỗi (substr)

```cpp
string s = "Hello World";

cout << s.substr(0, 5) << endl;   // "Hello" (từ vị trí 0, lấy 5 ký tự)
cout << s.substr(6) << endl;      // "World" (từ vị trí 6 đến hết)
cout << s.substr(3, 4) << endl;   // "lo W" (từ vị trí 3, lấy 4 ký tự)
```

### Tìm kiếm (find)

```cpp
string s = "Hello World";

// Tìm chuỗi con
int pos = s.find("World");
if (pos != string::npos) {
    cout << "Tim thay tai vi tri: " << pos << endl;  // 6
}

// Tìm từ vị trí nào
int pos2 = s.find("l", 4);  // Tìm 'l' từ vị trí 4
cout << pos2 << endl;        // 9

// Không tìm thấy
int pos3 = s.find("xyz");
if (pos3 == string::npos) {
    cout << "Khong tim thay" << endl;
}
```

### Thay thế (replace)

```cpp
string s = "Hello World";
s.replace(6, 5, "C++");  // Thay 5 ký tự từ vị trí 6 bằng "C++"
cout << s << endl;        // "Hello C++"
```

### Chèn và xóa

```cpp
string s = "Hello World";

// Chèn
s.insert(5, ",");          // s = "Hello, World"

// Xóa
s.erase(5, 2);             // Xóa 2 ký tự từ vị trí 5: s = "Hello World"
```

---

## 3. Chuyển đổi kiểu

### String → Số

```cpp
string s1 = "123";
string s2 = "3.14";
string s3 = "FF";

int a = stoi(s1);           // 123
long long b = stoll(s1);    // 123
double c = stod(s2);        // 3.14
int d = stoi(s3, nullptr, 16);  // 255 (hex → int)
```

### Số → String

```cpp
int a = 123;
double b = 3.14;

string s1 = to_string(a);   // "123"
string s2 = to_string(b);   // "3.140000"
```

### Chuyển đổi ký tự

```cpp
char c = 'A';
char lower = tolower(c);    // 'a'
char upper = toupper(c);    // 'A'

// char → int
char digit = '7';
int num = digit - '0';      // 7

// int → char
int n = 7;
char ch = n + '0';          // '7'

// Kiểm tra ký tự
isdigit('7');   // true
isalpha('A');   // true
isalnum('A');   // true
isspace(' ');   // true
```

---

## 4. Xử lý chuỗi thi đấu

### Tách từ

```cpp
string s = "Hello World C++ Programming";
stringstream ss(s);
string word;

while (ss >> word) {
    cout << word << endl;
}
// Output:
// Hello
// World
// C++
// Programming
```

### Tách theo delimiter

```cpp
string s = "apple,banana,cherry";
stringstream ss(s);
string token;

while (getline(ss, token, ',')) {
    cout << token << endl;
}
// Output:
// apple
// banana
// cherry
```

### Đếm tần suất ký tự

```cpp
string s = "abracadabra";
int cnt[256] = {0};
for (char c : s) cnt[(unsigned char)c]++;

cout << 'a' << ": " << cnt['a'] << endl;  // 5
cout << 'b' << ": " << cnt['b'] << endl;  // 2
```

### Kiểm tra palindrome

```cpp
string s = "abcba";
string rev = s;
reverse(rev.begin(), rev.end());
if (s == rev) {
    cout << "Palindrome" << endl;
}
```

### Đảo ngược chuỗi

```cpp
string s = "Hello";
reverse(s.begin(), s.end());
cout << s << endl;  // "olleH"
```

### Sắp xếp ký tự

```cpp
string s = "programming";
sort(s.begin(), s.end());
cout << s << endl;  // "aggimmnoprr"
```

### Đếm số từ

```cpp
string s = "Hello World C++";
stringstream ss(s);
string word;
int count = 0;
while (ss >> word) count++;
cout << count << endl;  // 3
```

### Chuyển chữ hoa/thường

```cpp
string s = "Hello World";

// Chuyển tất cả sang chữ hoa
transform(s.begin(), s.end(), s.begin(), ::toupper);
cout << s << endl;  // "HELLO WORLD"

// Chuyển tất cả sang chữ thường
transform(s.begin(), s.end(), s.begin(), ::tolower);
cout << s << endl;  // "hello world"
```

### Xóa khoảng trắng

```cpp
string s = "  Hello World  ";

// Xóa khoảng trắng đầu và cuối
s.erase(s.begin(), find_if(s.begin(), s.end(), [](unsigned char ch) {
    return !isspace(ch);
}));
s.erase(find_if(s.rbegin(), s.rend(), [](unsigned char ch) {
    return !isspace(ch);
}).base(), s.end());
// s = "Hello World"
```

### Tìm tất cả vị trí của chuỗi con

```cpp
string s = "abcabcabc";
string pattern = "abc";

vector<int> positions;
size_t pos = s.find(pattern);
while (pos != string::npos) {
    positions.push_back(pos);
    pos = s.find(pattern, pos + 1);
}

for (int p : positions) {
    cout << "Tim thay tai " << p << endl;
}
// Output:
// Tim thay tai 0
// Tim thay tai 3
// Tim thay tai 6
```

---

## 5. So sánh Python vs C++

| Thao tác | Python | C++ |
|----------|--------|-----|
| Độ dài | `len(s)` | `s.length()` |
| Ký tự đầu | `s[0]` | `s[0]` |
| Cắt chuỗi | `s[1:5]` | `s.substr(1, 4)` |
| Tìm kiếm | `s.find("abc")` | `s.find("abc")` |
| Thay thế | `s.replace("a", "b")` | `s.replace(pos, len, "b")` |
| Nối chuỗi | `s1 + s2` | `s1 + s2` |
| Đảo ngược | `s[::-1]` | `reverse(s.begin(), s.end())` |
| Tách từ | `s.split()` | `stringstream` + `>>` |
| Tách theo delimiter | `s.split(",")` | `getline(ss, token, ',')` |
| Chữ hoa | `s.upper()` | `transform(... ::toupper)` |
| Chữ thường | `s.lower()` | `transform(... ::tolower)` |
| Kiểm tra chữ số | `s.isdigit()` | `isdigit(c)` |
| Kiểm tra chữ cái | `s.isalpha()` | `isalpha(c)` |
| Nối list thành string | `" ".join(arr)` | stringstream |

---

## 6. Bài tập thực hành

### Bài 1: Đếm từ
Đọc một dòng văn bản. In ra số từ trong dòng.

```cpp
// Code của bạn ở đây
```

??? tip "Lời giải"
    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    
    int main() {
        string line;
        getline(cin, line);
        stringstream ss(line);
        string word;
        int count = 0;
        while (ss >> word) count++;
        cout << count << endl;
        return 0;
    }
    ```

### Bài 2: Kiểm tra palindrome
Đọc chuỗi $s$. In ra "Yes" nếu $s$ là palindrome, "No" nếu không.

```cpp
// Code của bạn ở đây
```

??? tip "Lời giải"
    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    
    int main() {
        string s;
        cin >> s;
        string t = s;
        reverse(t.begin(), t.end());
        cout << (s == t ? "Yes" : "No") << endl;
        return 0;
    }
    ```

### Bài 3: Chuyển đổi số
Đọc một dòng chứa các số nguyên cách nhau bởi dấu phẩy. In ra tổng.

**Input:** `10,20,30,40` → **Output:** `100`

```cpp
// Code của bạn ở đây
```

??? tip "Lời giải"
    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    
    int main() {
        string line;
        getline(cin, line);
        stringstream ss(line);
        string token;
        int sum = 0;
        while (getline(ss, token, ',')) {
            sum += stoi(token);
        }
        cout << sum << endl;
        return 0;
    }
    ```

### Bài 4: Tìm ký tự xuất hiện nhiều nhất
Đọc chuỗi $s$. In ra ký tự xuất hiện nhiều nhất (nếu bằng nhau, in ký tự nhỏ hơn).

```cpp
// Code của bạn ở đây
```

??? tip "Lời giải"
    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    
    int main() {
        string s;
        cin >> s;
        int cnt[256] = {0};
        for (char c : s) cnt[(unsigned char)c]++;
        
        char best = 'a';
        for (char c = 'a'; c <= 'z'; c++) {
            if (cnt[c] > cnt[(unsigned char)best]) {
                best = c;
            }
        }
        cout << best << endl;
        return 0;
    }
    ```

---

## Bài viết liên quan

- [C04: Mảng & Vector →](C04-mang-vector.md)
- [C06: Hàm trong C++ →](C06-ham.md)

---

**Bài tiếp theo:** [C06: Hàm trong C++ →](C06-ham.md)
