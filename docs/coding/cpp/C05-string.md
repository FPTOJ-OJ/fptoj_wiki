# C05: String trong C++

> **Tác giả:** Hà Trí Kiên<br>
> **Chủ đề:** Chuỗi C++, các phương thức, xử lý xâu

---

## 1. Tổng quan

String trong C++ là class `std::string`, linh hoạt hơn char array.

```cpp
#include <string>

string s = "Hello";
```

---

## 2. Tạo String

```cpp
string s1 = "Hello";           // Từ chuỗi literal
string s2("Hello");            // Constructor
string s3(5, 'a');             // "aaaaa" — 5 ký tự 'a'
string s4 = s1;                // Copy
string s5 = s1.substr(0, 3);  // "Hel" — substring
```

---

## 3. Truy cập ký tự

```cpp
string s = "Hello";

// Index
cout << s[0] << endl;    // 'H'
cout << s[4] << endl;    // 'o'
cout << s.back() << endl; // Ký tự cuối
cout << s.front() << endl; // Ký tự đầu

// Sửa ký tự
s[0] = 'h';  // "hello"
```

---

## 4. Các phương thức thường dùng

### 4.1. Độ dài

```cpp
string s = "Hello";
cout << s.length() << endl;  // 5
cout << s.size() << endl;    // 5 (tương đương)
cout << s.empty() << endl;   // 0 (false)
```

### 4.2. Cộng chuỗi

```cpp
string s1 = "Hello";
string s2 = " World";

// Cách 1: +
string s3 = s1 + s2;  // "Hello World"

// Cách 2: +=
s1 += s2;  // "Hello World"

// Cách 3: append
s1.append(s2);
```

### 4.3. Substring

```cpp
string s = "Hello World";
string sub = s.substr(6, 5);  // "World" — từ vị trí 6, lấy 5 ký tự
string sub2 = s.substr(6);    // "World" — từ vị trí 6 đến cuối
```

### 4.4. Tìm kiếm

```cpp
string s = "Hello World";

// find: trả về vị trí đầu tiên, hoặc string::npos nếu không tìm thấy
size_t pos = s.find("World");
if (pos != string::npos) {
    cout << "Tim thay tai vi tri " << pos << endl;  // 6
}

// find từ vị trí cụ thể
size_t pos2 = s.find("o", 5);  // Tìm "o" từ vị trí 5

// rfind: tìm từ phải sang trái
size_t pos3 = s.rfind("o");  // 7
```

### 4.5. So sánh

```cpp
string s1 = "abc";
string s2 = "abd";

// So sánh theo thứ tự từ điển
if (s1 < s2) cout << "s1 < s2" << endl;
if (s1 > s2) cout << "s1 > s2" << endl;
if (s1 == s2) cout << "s1 == s2" << endl;
if (s1 != s2) cout << "s1 != s2" << endl;
```

### 4.6. Chuyển đổi

```cpp
// int → string
int n = 42;
string s = to_string(n);  // "42"

// string → int
string s = "42";
int n = stoi(s);  // 42

// string → long long
long long ll = stoll(s);

// string → double
double d = stod("3.14");
```

### 4.7. Các phương thức khác

```cpp
string s = "Hello World";

// Chữ hoa/thường
transform(s.begin(), s.end(), s.begin(), ::toupper);  // "HELLO WORLD"
transform(s.begin(), s.end(), s.begin(), ::tolower);  // "hello world"

// Kiểm tra
isalpha('a');  // true — là chữ cái?
isdigit('5');  // true — là chữ số?
isalnum('a');  // true — là chữ cái hoặc chữ số?
isspace(' ');  // true — là khoảng trắng?
```

---

## 5. Chuỗi char array (C-style)

```cpp
// Ít dùng trong thi đấu, nhưng cần biết
char s[] = "Hello";
char s2[100];  // Mảng ký tự

// Các hàm thường dùng
strlen(s);           // Độ dài
strcpy(s2, s);       // Copy
strcat(s2, " World"); // Nối
strcmp(s, s2);       // So sánh

// Đọc chuỗi có khoảng trắng
char s[100];
cin.getline(s, 100);
```

---

## 6. So sánh với Python

| Python | C++ | Ghi chú |
|--------|-----|---------|
| `len(s)` | `s.length()` hoặc `s.size()` | |
| `s[0]` | `s[0]` | Giống nhau |
| `s[1:3]` | `s.substr(1, 2)` | C++: vị trí + độ dài |
| `s.find("x")` | `s.find("x")` | C++ trả về `string::npos` nếu không có |
| `s.replace(...)` | Không có trực tiếp | Phải tự cài |
| `s.split()` | Không có trực tiếp | Dùng stringstream |
| `" ".join(arr)` | Không có trực tiếp | Dùng vòng lặp |
| `s.upper()` | `transform(...)` | Phức tạp hơn |
| `s.lower()` | `transform(...)` | Phức tạp hơn |
| `int(s)` | `stoi(s)` | |
| `str(n)` | `to_string(n)` | |

---

## 7. Pattern thường gặp trong thi đấu

### 7.1. Đọc chuỗi có khoảng trắng

```cpp
string s;
getline(cin, s);  // Đọc cả dòng
```

### 7.2. Tách từ

```cpp
string s = "Hello World Python";
stringstream ss(s);
string word;
while (ss >> word) {
    cout << word << endl;
}
```

### 7.3. Nối mảng thành chuỗi

```cpp
vector<string> words = {"Hello", "World", "Python"};
string result = "";
for (int i = 0; i < words.size(); i++) {
    if (i > 0) result += " ";
    result += words[i];
}
// result = "Hello World Python"
```

### 7.4. Đếm tần suất ký tự

```cpp
string s = "abracadabra";
map<char, int> freq;
for (char c : s) {
    freq[c]++;
}
```

### 7.5. Kiểm tra palindrome

```cpp
string s = "racecar";
string rev = s;
reverse(rev.begin(), rev.end());
if (s == rev) {
    cout << "Palindrome" << endl;
}
```

---

## 8. Lưu ý / Cạm bẫy hay gặp

### Bẫy 1: find trả về string::npos

```cpp
string s = "Hello";
size_t pos = s.find("x");
// pos = string::npos (rất lớn!)

// ĐÚNG
if (pos != string::npos) {
    cout << "Tim thay" << endl;
}
```

### Bẫy 2: substring với tham số sai

```cpp
string s = "Hello";
// s.substr(10, 5);  // Lỗi! Vị trí ngoài phạm vi

// Kiểm tra trước
if (pos + len <= s.length()) {
    string sub = s.substr(pos, len);
}
```

### Bẫy 3: So sánh chuỗi

```cpp
char s1[] = "Hello";
char s2[] = "Hello";

// SAI: So sánh địa chỉ
// if (s1 == s2) { ... }  // Không đúng!

// ĐÚNG
if (strcmp(s1, s2) == 0) { ... }

// Dùng string thì OK
string a = "Hello";
string b = "Hello";
if (a == b) { ... }  // Đúng!
```

---

## 9. Bài tập thực hành

### Bài 1: Đếm ký tự
Cho xâu s. Đếm số chữ hoa, chữ thường, chữ số.

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
        int upper = 0, lower = 0, digit = 0;
        for (char c : s) {
            if (isupper(c)) upper++;
            else if (islower(c)) lower++;
            else if (isdigit(c)) digit++;
        }
        cout << "Hoa: " << upper << ", Thuong: " << lower << ", So: " << digit << endl;
        return 0;
    }
    ```

### Bài 2: Kiểm tra palindrome
Cho xâu s. Kiểm tra s có phải palindrome không.

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
        string rev = s;
        reverse(rev.begin(), rev.end());
        if (s == rev) {
            cout << "Palindrome" << endl;
        } else {
            cout << "Not palindrome" << endl;
        }
        return 0;
    }
    ```

### Bài 3: Đảo ngược từ
Cho xâu s gồm nhiều từ. Đảo ngược thứ tự các từ.

```cpp
// Code của bạn ở đây
```

??? tip "Lời giải"
    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    
    int main() {
        string s;
        getline(cin, s);
        
        stringstream ss(s);
        vector<string> words;
        string word;
        while (ss >> word) {
            words.push_back(word);
        }
        
        reverse(words.begin(), words.end());
        for (int i = 0; i < words.size(); i++) {
            if (i > 0) cout << " ";
            cout << words[i];
        }
        cout << endl;
        
        return 0;
    }
    ```

---

## 10. Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Palindrome Reorder](https://cses.fi/problemset/task/1755) | CSES | ⭐⭐ | String, đếm tần suất |
| [CSES - Creating Strings](https://cses.fi/problemset/task/1622) | CSES | ⭐⭐ | Hoán vị xâu |

---

## Bài viết liên quan

- [← C04: Mảng & Vector](C04-mang-vector.md)
- [C06: Hàm →](C06-ham.md)

---

**Bài trước:** [C04: Mảng & Vector](C04-mang-vector.md)<br>
**Bài tiếp theo:** [C06: Hàm →](C06-ham.md)
