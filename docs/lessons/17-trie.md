# Bài 17: Trie - Cây Tìm Kiếm Tiền Tố

> **Tác giả:** Hà Trí Kiên
> **Nội dung tham khảo từ:** VNOI Wiki - Trie

## 1. Chuyện gì đang xảy ra?

### Bài toán: Tự động hoàn thành

Bạn gõ "app" → điện thoại gợi ý "apple", "application", "appstore". Làm sao tìm nhanh tất cả từ bắt đầu bằng "app"?

**Trie** (cây tiền tố) = cấu trúc dữ liệu lưu tập hợp xâu, tìm kiếm theo tiền tố cực nhanh!

---

## 2. Trie hoạt động như thế nào?

### Ẩn dụ: Cây gia phả

Mỗi node là 1 ký tự. Đi từ gốc → lá = 1 từ hoàn chỉnh.

```
Từ điển: ["app", "apple", "bat", "ball"]

        (root)
       /     \
      a       b
      |       |
      p       a
      p*      / \
     / \     t*  l
    l   -           l*
    e*                  ← "apple" kết thúc ở đây
```

Đánh dấu `*` = đây là kết thúc 1 từ hợp lệ.

---

## 3. Code C++

```cpp
struct TrieNode {
    TrieNode* children[26];  // 26 chữ cái
    bool isEnd;              // Đánh dấu kết thúc từ
    
    TrieNode() {
        for (int i = 0; i < 26; i++)
            children[i] = nullptr;
        isEnd = false;
    }
};

struct Trie {
    TrieNode* root;
    
    Trie() { root = new TrieNode(); }
    
    // Thêm từ vào Trie - O(len)
    void insert(string word) {
        TrieNode* cur = root;
        for (char c : word) {
            int idx = c - 'a';
            if (cur->children[idx] == nullptr)
                cur->children[idx] = new TrieNode();
            cur = cur->children[idx];
        }
        cur->isEnd = true;
    }
    
    // Tìm từ có tồn tại không - O(len)
    bool search(string word) {
        TrieNode* cur = root;
        for (char c : word) {
            int idx = c - 'a';
            if (cur->children[idx] == nullptr)
                return false;
            cur = cur->children[idx];
        }
        return cur->isEnd;
    }
    
    // Kiểm tra có từ nào bắt đầu bằng prefix không - O(len)
    bool startsWith(string prefix) {
        TrieNode* cur = root;
        for (char c : prefix) {
            int idx = c - 'a';
            if (cur->children[idx] == nullptr)
                return false;
            cur = cur->children[idx];
        }
        return true;
    }
};
```

### Code Python

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, word):         # O(len)
        cur = self.root
        for c in word:
            if c not in cur.children:
                cur.children[c] = TrieNode()
            cur = cur.children[c]
        cur.is_end = True
    
    def search(self, word):         # O(len)
        cur = self.root
        for c in word:
            if c not in cur.children:
                return False
            cur = cur.children[c]
        return cur.is_end
    
    def starts_with(self, prefix):  # O(len)
        cur = self.root
        for c in prefix:
            if c not in cur.children:
                return False
            cur = cur.children[c]
        return True
```

---

## 4. Ứng dụng

| Bài toán | Dùng Trie |
|----------|-----------|
| Tự động hoàn thành | Duyệt từ node prefix |
| Kiểm tra từ trong từ điển | `search()` |
| Đếm số từ có prefix | Duyệt và đếm |
| XOR lớn nhất (Bitwise Trie) | Đi theo bit ngược |

---

## 5. Lưu ý

- **Độ phức tạp:** O(L) cho mỗi thao tác (L = độ dài từ)
- **Bộ nhớ:** Có thể lớn nếu nhiều từ khác nhau
- **Tối ưu:** Dùng `unordered_map` thay vì mảng 26 phần tử nếu bảng chữ cái lớn

---

---

## Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Word Combinations](https://cses.fi/problemset/task/1731) | CSES | ⭐⭐⭐ | Trie + DP |
| [LeetCode - Implement Trie](https://leetcode.com/problems/implement-trie-prefix-tree/) | LC | ⭐⭐ | Cài đặt Trie |
| [LeetCode - Word Search II](https://leetcode.com/problems/word-search-ii/) | LC | ⭐⭐⭐ | Trie + Backtracking |

## Bài viết liên quan

- [Bài 16: Hash Table](16-hash-table.md)
- [Bài 9: KMP](09-kmp-tim-xau.md)

## Tài liệu tham khảo

- [VNOI Wiki - Trie](https://wiki.vnoi.info/algo/data-structures/trie)
- [CP-Algorithms - Trie](https://cp-algorithms.com/string/trie.html)
- [GeeksforGeeks - Trie Data Structure](https://www.geeksforgeeks.org/dsa/trie-insert-and-search/)
- [USACO Guide - Trie](https://usaco.gold/adv/trie)
- [YouTube - Trie Data Structure (takeuforward)](https://www.youtube.com/watch?v=AXjmTQ8LEoI)

**Bài tiếp theo:** [Euclid & Modular Inverse →](18-euclid-modular-inverse.md)
