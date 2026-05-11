# Bài 16: Hash Table (Bảng Băm)

> **Tác giả:** Hà Trí Kiên
> **Nội dung tham khảo từ:** VNOI Wiki - Bảng băm

## 1. Chuyện gì đang xảy ra?

### Bài toán: Tra cứu từ điển

Bạn có 100.000 từ tiếng Anh. Người dùng nhập 1 từ, hỏi từ đó có trong từ điển không?

**Cách "ngốc":** Duyệt tuần tự → O(N) mỗi truy vấn. 100.000 truy vấn → O(10¹⁰). Quá chậm!

**Hash Table:** O(1) mỗi truy vấn! Như tra cứu theo mục lục sách.

---

## 2. Hash Table hoạt động như thế nào?

### Ẩn dụ: Tủ hồ sơ

Mỗi hồ sơ có 1 "mã số" (hash). Khi cần tìm hồ sơ → tính mã số → mở ngăn kéo đúng mã số → lấy ra!

```
"hello" → hash("hello") = 7 → lưu ở ngăn kéo 7
"world" → hash("world") = 3 → lưu ở ngăn kéo 3
```

### Xử lý xung đột (Collision)

2 từ khác nhau có thể cùng hash → "xung đột"! Giải pháp: **danh sách liên kết** ở mỗi ngăn kéo.

```
Ngăn 7: ["hello"] → ["apple"] → NULL  (cùng hash = 7)
```

---

## 3. Code C++: Dùng thư viện

```cpp
#include <unordered_map>
#include <unordered_set>
using namespace std;

int main() {
    // ===== unordered_map: bảng ánh xạ key → value =====
    unordered_map<string, int> wordCount;
    
    wordCount["hello"] = 5;       // Thêm/cập nhật - O(1)
    wordCount["world"] = 3;
    
    if (wordCount.find("hello") != wordCount.end())  // Tìm kiếm - O(1)
        cout << "Tim thay: " << wordCount["hello"] << endl;
    
    wordCount.erase("hello");     // Xóa - O(1)
    
    // Duyệt toàn bộ
    for (auto& [key, value] : wordCount)
        cout << key << ": " << value << endl;
    
    // ===== unordered_set: tập hợp không trùng lặp =====
    unordered_set<int> s;
    s.insert(5);       // Thêm - O(1)
    s.insert(10);
    s.insert(5);       // Trùng → không thêm
    
    if (s.count(5))    // Kiểm tra tồn tại - O(1)
        cout << "5 co trong tap hop\n";
    
    cout << "So phan tu: " << s.size() << endl;  // 2
}
```

### Code Python

```python
# ===== dict: bảng ánh xạ key → value =====
word_count = {}
word_count["hello"] = 5      # Thêm/cập nhật - O(1)
word_count["world"] = 3

if "hello" in word_count:    # Tìm kiếm - O(1)
    print(f"Tim thay: {word_count['hello']}")

del word_count["hello"]      # Xóa - O(1)

# ===== set: tập hợp không trùng lặp =====
s = set()
s.add(5)         # Thêm - O(1)
s.add(10)
s.add(5)         # Trùng → không thêm

if 5 in s:       # Kiểm tra - O(1)
    print("5 co trong tap hop")

print(len(s))    # 2
```

---

## 4. Ứng dụng

| Bài toán | Dùng gì |
|----------|---------|
| Đếm số lần xuất hiện | `unordered_map<value, count>` |
| Kiểm tra trùng lặp | `unordered_set` |
| Nhóm phần tử theo key | `unordered_map<key, vector>` |
| Two Sum (tìm 2 số có tổng X) | `unordered_map` |

### Ví dụ: Two Sum bằng Hash Table

```cpp
vector<int> twoSum(vector<int>& a, int target) {
    unordered_map<int, int> pos;  // giá trị → chỉ số
    for (int i = 0; i < a.size(); i++) {
        int complement = target - a[i];
        if (pos.count(complement))
            return {pos[complement], i};
        pos[a[i]] = i;
    }
    return {};
}
```

---

## 5. Lưu ý

- **Độ phức tạp trung bình:** O(1) cho mọi thao tác
- **Worst case:** O(N) khi tất cả phần tử cùng hash (hiếm)
- **Hash Table ≠ Map (cây đỏ-đen):** Map luôn O(log N), Hash trung bình O(1) nhưng worst O(N)
- Trong C++: `map` = cây đỏ-đen (có thứ tự), `unordered_map` = hash table (không thứ tự)

---

---

## Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Distinct Numbers](https://cses.fi/problemset/task/1621) | CSES | ⭐ | Set |
| [CSES - Sum of Two Values](https://cses.fi/problemset/task/1640) | CSES | ⭐⭐ | Map |
| [LeetCode - Two Sum](https://leetcode.com/problems/two-sum/) | LC | ⭐ | Map cơ bản |
| [LeetCode - Group Anagrams](https://leetcode.com/problems/group-anagrams/) | LC | ⭐⭐ | Map + string |

## Bài viết liên quan

- [Bài 14: Hash xâu & Z-algorithm](14-hash-xau-z-algorithm.md)
- [Bài 17: Trie](17-trie.md)

## Tài liệu tham khảo

- [VNOI Wiki - Bảng băm](https://wiki.vnoi.info/algo/data-structures/hash-table)
- [CP-Algorithms - Hash Table](https://cp-algorithms.com/string/string-hashing.html)
- [GeeksforGeeks - Hashing Data Structure](https://www.geeksforgeeks.org/dsa/hashing-data-structure/)
- [Codeforces - Hash Tables](https://codeforces.com/blog/entry/60445)

**Bài tiếp theo:** [Trie →](17-trie.md)
