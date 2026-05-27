# Bài 17: Trie - Cây Tìm Kiếm Tiền Tố

> **Tác giả:** Hà Trí Kiên<br>
> **Nội dung tham khảo từ:** VNOI Wiki - Trie

## 1. Chuyện gì đang xảy ra?

### Bài toán: Tự động hoàn thành

Bạn gõ "app" → điện thoại gợi ý "apple", "application", "appstore". Làm sao tìm nhanh tất cả từ bắt đầu bằng "app"?

**Trie** (cây tiền tố) = cấu trúc dữ liệu lưu tập hợp xâu, tìm kiếm theo tiền tố cực nhanh!

### So sánh với các cấu trúc khác

| | Trie | Hash Table | Set/Map |
|--|------|-----------|---------|
| Tìm kiếm | O(L) | O(L) trung bình | O(L log N) |
| Tìm theo prefix | O(L) ✅ | O(N × L) ❌ | O(N × L) ❌ |
| Bộ nhớ | Nhiều hơn | Ít hơn | Trung bình |
| Ứng dụng chính | Prefix, xâu | Tra cứu chính xác | Sắp xếp |

(L = độ dài xâu, N = số xâu)

---

## 2. Trie hoạt động như thế nào?

### Ẩn dụ: Cây gia phả

Mỗi node là 1 ký tự. Đi từ gốc → lá = 1 từ hoàn chỉnh. Các từ có cùng tiền tố **chia sẻ** chung đường đi từ gốc!

<p align="center"><img src="/uploads/img/trie.png" alt="Trie" style="max-width: 700px;" /><br><em>Minh họa cấu trúc cây Trie</em></p>

### Tại sao Trie nhanh cho tìm prefix?

Khi tìm tất cả từ bắt đầu bằng "app":

1. Đi theo đường a → p → p (3 bước = O(L))
2. Từ node "pp", duyệt tất cả nhánh con → tìm được "app", "apple"

So với hash table: phải kiểm tra **từng từ** trong từ điển → O(N × L)!

### Cách Trie lưu xâu - Chi tiết từng node

```
Thêm "app":
  root --('a')--> node1 --('p')--> node2 --('p')--> node3 (isEnd=true)

Thêm "apple":
  root --('a')--> node1 --('p')--> node2 --('p')--> node3 (isEnd=true)
                                                      |
                                                     ('l')--> node4 --('e')--> node5 (isEnd=true)

→ "app" và "apple" CHIA SẺ chung đường root → node1 → node2 → node3
→ Tiết kiệm bộ nhớ khi có nhiều từ cùng prefix!
```

---

## 3. Code C++ - Cài đặt chi tiết

=== "C++"

    !!! tip "nullptr trong C++"
        `nullptr` là hằng số đại diện cho **con trỏ rỗng** (null pointer). Dùng thay cho `NULL` trong C++ hiện đại. Ví dụ:
        ```cpp
        int* p = nullptr;  // p không trỏ đến đâu cả
        if (p == nullptr) { /* p rỗng */ }
        ```

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    
    // Mỗi node lưu 26 con trỏ (cho 26 chữ cái a-z)
    struct TrieNode {
        TrieNode* children[26];  // children[0] = 'a', children[1] = 'b', ...
        bool isEnd;              // true nếu node này là kết thúc của 1 từ hợp lệ
        int count;               // Số lần chèn qua node này (đếm prefix)
        
        TrieNode() {
            for (int i = 0; i < 26; i++)
                children[i] = nullptr;
            isEnd = false;
            count = 0;
        }
    };
    
    struct Trie {
        TrieNode* root;
        
        Trie() { root = new TrieNode(); }
        
        // Thêm từ vào Trie - O(L)
        // Duyệt từng ký tự, tạo node mới nếu chưa tồn tại
        void insert(string word) {
            TrieNode* cur = root;
            for (char c : word) {
                int idx = c - 'a';  // 'a' → 0, 'b' → 1, ...
                if (cur->children[idx] == nullptr)
                    cur->children[idx] = new TrieNode();  // Tạo node mới
                cur = cur->children[idx];
                cur->count++;  // Đếm số từ đi qua node này
            }
            cur->isEnd = true;  // Đánh dấu kết thúc từ
        }
        
        // Tìm từ có tồn tại không - O(L)
        // Duyệt theo từng ký tự, nếu thiếu node → không tồn tại
        bool search(string word) {
            TrieNode* cur = root;
            for (char c : word) {
                int idx = c - 'a';
                if (cur->children[idx] == nullptr)
                    return false;  // Không có đường đi → từ không tồn tại
                cur = cur->children[idx];
            }
            return cur->isEnd;  // Phải là kết thúc từ hợp lệ
        }
        
        // Kiểm tra có từ nào bắt đầu bằng prefix không - O(L)
        bool startsWith(string prefix) {
            TrieNode* cur = root;
            for (char c : prefix) {
                int idx = c - 'a';
                if (cur->children[idx] == nullptr)
                    return false;
                cur = cur->children[idx];
            }
            return true;  // Chỉ cần đường đi tồn tại, không cần isEnd
        }
        
        // Đếm số từ có prefix cho trước - O(L)
        int countPrefix(string prefix) {
            TrieNode* cur = root;
            for (char c : prefix) {
                int idx = c - 'a';
                if (cur->children[idx] == nullptr)
                    return 0;
                cur = cur->children[idx];
            }
            return cur->count;
        }
        
        // Giải phóng bộ nhớ (quan trọng khi dùng nhiều!)
        void deleteTrie(TrieNode* node) {
            if (node == nullptr) return;
            for (int i = 0; i < 26; i++)
                deleteTrie(node->children[i]);
            delete node;
        }
        
        ~Trie() { deleteTrie(root); }
    };
    ```

=== "Python"

    ```python
    class TrieNode:
        def __init__(self):
            self.children = {}      # dict: ký tự → TrieNode
            self.is_end = False
            self.count = 0          # Số từ đi qua node này
    
    class Trie:
        def __init__(self):
            self.root = TrieNode()
        
        def insert(self, word):         # O(L)
            cur = self.root
            for c in word:
                if c not in cur.children:
                    cur.children[c] = TrieNode()
                cur = cur.children[c]
                cur.count += 1
            cur.is_end = True
        
        def search(self, word):         # O(L)
            cur = self.root
            for c in word:
                if c not in cur.children:
                    return False
                cur = cur.children[c]
            return cur.is_end
        
        def starts_with(self, prefix):  # O(L)
            cur = self.root
            for c in prefix:
                if c not in cur.children:
                    return False
                cur = cur.children[c]
            return True
        
        def count_prefix(self, prefix): # O(L)
            cur = self.root
            for c in prefix:
                if c not in cur.children:
                    return 0
                cur = cur.children[c]
            return cur.count
    ```

---

## 4. Ứng dụng: Bitwise Trie - Tìm XOR lớn nhất

### Bài toán

Cho mảng A và số X, tìm phần tử trong A sao cho A[i] XOR X là lớn nhất.

### Ý tưởng

Thay vì lưu ký tự, ta lưu **từng bit** (0 hoặc 1) của số. Khi tìm XOR lớn nhất, ở mỗi bit ta ưu tiên đi theo bit **ngược** với bit của X (vì 0⊕1=1 và 1⊕0=1 cho kết quả lớn hơn).

```
X = 5 = 101 (binary)
Muốn XOR lớn nhất → ưu tiên bit ngược:
  Bit 2: X có 1 → ưu tiên đi theo 0
  Bit 1: X có 0 → ưu tiên đi theo 1
  Bit 0: X có 1 → ưu tiên đi theo 0
```
=== "C++"

    ```cpp
    struct BitTrieNode {
        BitTrieNode* children[2];  // 0 và 1
        BitTrieNode() {
            children[0] = children[1] = nullptr;
        }
    };
    
    struct BitTrie {
        BitTrieNode* root;
        static const int MAX_BIT = 30;  // Số bit tối đa (cho số <= 10^9)
        
        BitTrie() { root = new BitTrieNode(); }
        
        // Thêm số vào trie - O(MAX_BIT)
        void insert(int num) {
            BitTrieNode* cur = root;
            for (int i = MAX_BIT; i >= 0; i--) {
                int bit = (num >> i) & 1;  // Lấy bit thứ i
                if (cur->children[bit] == nullptr)
                    cur->children[bit] = new BitTrieNode();
                cur = cur->children[bit];
            }
        }
        
        // Tìm số trong trie sao cho XOR với x là lớn nhất - O(MAX_BIT)
        int findMaxXor(int x) {
            BitTrieNode* cur = root;
            int result = 0;
            for (int i = MAX_BIT; i >= 0; i--) {
                int bit = (x >> i) & 1;
                int want = 1 - bit;  // Ưu tiên bit ngược
                
                if (cur->children[want] != nullptr) {
                    result |= (1 << i);  // Bit này contribute 1 vào XOR
                    cur = cur->children[want];
                } else {
                    cur = cur->children[bit];  // Không có lựa chọn, đi theo bit giống
                }
            }
            return result;
        }
    };
    
    // Ví dụ sử dụng:
    // A = [3, 10, 5, 25, 2, 8], X = 5
    // BitTrie chứa các số trong A
    // findMaxXor(5) → 5 XOR 25 = 28 (lớn nhất)
    ```

=== "Python"

    ```python
    class BitTrieNode:
        def __init__(self):
            self.children = [None, None]  # 0 và 1
    
    class BitTrie:
        MAX_BIT = 30
        
        def __init__(self):
            self.root = BitTrieNode()
        
        def insert(self, num):
            cur = self.root
            for i in range(self.MAX_BIT, -1, -1):
                bit = (num >> i) & 1
                if cur.children[bit] is None:
                    cur.children[bit] = BitTrieNode()
                cur = cur.children[bit]
        
        def find_max_xor(self, x):
            cur = self.root
            result = 0
            for i in range(self.MAX_BIT, -1, -1):
                bit = (x >> i) & 1
                want = 1 - bit
                if cur.children[want] is not None:
                    result |= (1 << i)
                    cur = cur.children[want]
                else:
                    cur = cur.children[bit]
            return result
    ```

---

## 5. Ứng dụng: Auto-complete và Tìm kiếm xâu
=== "C++"

    ```cpp
    // Tìm tất cả từ có prefix cho trước
    void findAllWithPrefix(TrieNode* node, string prefix, vector<string>& result) {
        if (node->isEnd)
            result.push_back(prefix);
        
        for (int i = 0; i < 26; i++) {
            if (node->children[i] != nullptr) {
                char c = 'a' + i;
                findAllWithPrefix(node->children[i], prefix + c, result);
            }
        }
    }
    
    vector<string> autocomplete(Trie& trie, string prefix) {
        TrieNode* cur = trie.root;
        // Đi đến node của prefix
        for (char c : prefix) {
            int idx = c - 'a';
            if (cur->children[idx] == nullptr)
                return {};  // Không có từ nào với prefix này
            cur = cur->children[idx];
        }
        // Duyệt tất cả từ từ node này
        vector<string> result;
        findAllWithPrefix(cur, prefix, result);
        return result;
    }
    ```

=== "Python"

    ```python
    def find_all_with_prefix(node, prefix, result):
        if node.is_end:
            result.append(prefix)
        for c, child in node.children.items():
            find_all_with_prefix(child, prefix + c, result)
    
    def autocomplete(trie, prefix):
        cur = trie.root
        for c in prefix:
            if c not in cur.children:
                return []
            cur = cur.children[c]
        result = []
        find_all_with_prefix(cur, prefix, result)
        return result
    ```

---

## 6. Lưu ý

- **Độ phức tạp:** O(L) cho mỗi thao tác (L = độ dài từ)
- **Bộ nhớ:** Có thể lớn nếu nhiều từ khác nhau (mỗi node có 26 con trỏ)
- **Tối ưu:** Dùng `unordered_map<char, TrieNode*>` thay vì mảng 26 phần tử nếu bảng chữ cái lớn (Unicode, v.v.)
- **Xóa từ trong Trie:** Phức tạp hơn (cần dọn node không dùng), thường ít dùng trong competitive programming
- **Bitwise Trie:** Rất hữu ích cho bài toán XOR maximum, áp dụng cho nhiều bài hard

---

## 7. Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Word Combinations](https://cses.fi/problemset/task/1731) | CSES | ⭐⭐⭐ | Trie + DP |
| [LeetCode - Implement Trie](https://leetcode.com/problems/implement-trie-prefix-tree/) | LC | ⭐⭐ | Cài đặt Trie |
| [LeetCode - Word Search II](https://leetcode.com/problems/word-search-ii/) | LC | ⭐⭐⭐ | Trie + Backtracking |
| [LeetCode - Maximum XOR of Two Numbers](https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/) | LC | ⭐⭐ | Bitwise Trie |
| [VNOJ - VOI18STR](https://oj.vnoi.info/problem/voi18str) | VNOJ | ⭐⭐⭐ | String with Trie |
| [CSES - Substring Queries](https://cses.fi/problemset/task/2110) | CSES | ⭐⭐⭐ | Suffix structure |

## Bài viết liên quan

- [Bài 16: Hash Table](16-hash-table.md)
- [Bài 9: KMP](09-kmp-tim-xau.md)

## Tài liệu tham khảo

- [VNOI Wiki - Trie](https://wiki.vnoi.info/algo/data-structures/trie)
- [CP-Algorithms - Trie](https://cp-algorithms.com/string/trie.html)
- [GeeksforGeeks - Trie Data Structure](https://www.geeksforgeeks.org/dsa/trie-insert-and-search/)
- [USACO Guide - Trie](https://usaco.gold/adv/trie)
- [YouTube - Trie Data Structure (takeuforward)](https://www.youtube.com/watch?v=AXjmTQ8LEoI)

**Bài tiếp theo:** [Heap (Hàng đợi ưu tiên) →](08a-heap.md)