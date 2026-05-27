# Bài 30: Binary Search Tree (BST) - Cây Tìm Kiếm Nhị Phân

> **Tác giả:** Hà Trí Kiên<br>
> **Nội dung tham khảo từ:** CP-Algorithms, GeeksforGeeks - BST

## 1. Chuyện gì đang xảy ra?

### Bài toán

Bạn có tập hợp số, cần thực hiện:

- Thêm số mới
- Tìm số có tồn tại không
- Xóa số
- Tìm số nhỏ nhất / lớn nhất
- Tìm số nhỏ hơn/giới hạn dưới (lower_bound)

**Cách 1: Mảng** — thêm O(1), tìm O(N). Chậm!

**Cách 2: Set (cây đỏ-đen)** — tất cả O(log N). Tốt, nhưng "hộp đen"!

**Cách 3: BST** — tất cả O(log N) trung bình, và bạn **hiểu tại sao**!

### BST là gì?

Binary Search Tree là cây nhị phân với tính chất:

> **Mọi nút bên trái < nút cha < mọi nút bên phải**<br>

<p align="center"><img src="/uploads/img/gif/bst.gif" alt="Binary Search Tree - VisuAlgo" style="max-width: 700px;" /><br><em>Minh họa thao tác trên BST (Nguồn: VisuAlgo)</em></p>

```
        8
       / \
      3   10
     / \    \
    1   6    14
       / \   /
      4   7 13

Tất cả nút bên trái 8: {3, 1, 6, 4, 7} < 8 ✅
Tất cả nút bên phải 8: {10, 14, 13} > 8 ✅
Tương tự cho mọi nút!
```

### Tại sao tính chất này quan trọng?

Nhờ tính chất BST, ta có thể **tìm kiếm như tìm kiếm nhị phân**:

```
Tìm số 7 trong BST:

Bắt đầu tại gốc 8: 7 < 8 → đi TRÁI
Tại 3: 7 > 3 → đi PHẢI
Tại 6: 7 > 6 → đi PHẢI
Tại 7: 7 = 7 → TÌM THẤY! ✅

Chỉ 4 bước (thay vì duyệt hết 8 số)!
```

---

## 2. Các thao tác cơ bản

### 2.1. Tìm kiếm (Search)

**Ý tưởng:** Tại mỗi nút, so sánh giá trị cần tìm với nút:

- Nhỏ hơn → đi trái
- Lớn hơn → đi phải
- Bằng → tìm thấy!

```
Tìm 5:

        8          5 < 8 → đi trái
       /
      3            5 > 3 → đi phải
       \
        6          5 < 6 → đi trái
       /
      4            5 > 4 → đi phải
     (NULL)        → Không tìm thấy!

Tìm 6:
        8 → 3 → 6 → TÌM THẤY!
```

**Độ phức tạp:** O(h) với h là chiều cao cây. Trung bình O(log N), worst case O(N).

### 2.2. Chèn (Insert)

**Ý tưởng:** Tìm vị trí thích hợp (như search), rồi thêm nút mới vào.

```
Chèn 5:

        8          5 < 8 → đi trái
       /
      3            5 > 3 → đi phải
       \
        6          5 < 6 → đi trái
       /
      4            5 > 4 → đi phải → thêm 5 ở đây!

        8
       / \
      3   10
       \
        6
       / \
      4   7
       \
        5  ← mới thêm!
```

### 2.3. Xóa (Delete)

Xóa phức tạp hơn chèn, có 3 trường hợp:

**Trường hợp 1: Nút lá (không có con)** → Xóa trực tiếp

```
Xóa 4 (lá):  ... → 4 → NULL
              Xóa: ... → NULL
```

**Trường hợp 2: Có 1 con** → Thay thế bằng con

```
Xóa 3 (có 1 con phải là 6):
        8                 8
       / \               / \
      3   10    →       6   10
       \               / \
        6             4   7
       / \
      4   7
```

**Trường hợp 3: Có 2 con** → Thay bằng nút **tiền nhiệm** (max bên trái) hoặc **kế nhiệm** (min bên phải)

```
Xóa 8 (gốc, có 2 con):
  Tìm min bên phải (kế nhiệm): min({10, 14, 13}) = 10
  Thay 8 bằng 10, rồi xóa 10 ở vị trí cũ

        10                    ← thay thế!
       /  \
      3    14
       \   /
        6 13
       / \
      4   7
```

### 2.4. Tìm min / max

- **Min:** Đi liên tục sang trái từ gốc
- **Max:** Đi liên tục sang phải từ gốc

```
Min: 8 → 3 → 1  (đi trái liên tục)
Max: 8 → 10 → 14  (đi phải liên tục)
```

---

## 3. Code C++ — BST hoàn chỉnh

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    
    struct Node {
        int val;
        Node *left, *right;
        
        Node(int v) : val(v), left(nullptr), right(nullptr) {}
    };
    
    struct BST {
        Node* root = nullptr;
        
        // Thêm phần tử - O(h)
        Node* insert(Node* node, int val) {
            if (node == nullptr) return new Node(val);
            
            if (val < node->val)
                node->left = insert(node->left, val);    // Nhỏ hơn → trái
            else if (val > node->val)
                node->right = insert(node->right, val);  // Lớn hơn → phải
            
            return node;  // Trả về nút (có thể đã thay đổi)
        }
        
        void insert(int val) { root = insert(root, val); }
        
        // Tìm kiếm - O(h)
        bool search(Node* node, int val) {
            if (node == nullptr) return false;
            if (val == node->val) return true;
            if (val < node->val) return search(node->left, val);
            return search(node->right, val);
        }
        
        bool search(int val) { return search(root, val); }
        
        // Tìm nút nhỏ nhất trong cây con
        Node* findMin(Node* node) {
            while (node->left != nullptr)
                node = node->left;
            return node;
        }
        
        // Xóa phần tử - O(h)
        Node* erase(Node* node, int val) {
            if (node == nullptr) return nullptr;
            
            if (val < node->val)
                node->left = erase(node->left, val);
            else if (val > node->val)
                node->right = erase(node->right, val);
            else {
                // Tìm thấy nút cần xóa
                // Trường hợp 1 & 2: 0 hoặc 1 con
                if (node->left == nullptr) {
                    Node* temp = node->right;
                    delete node;
                    return temp;
                }
                if (node->right == nullptr) {
                    Node* temp = node->left;
                    delete node;
                    return temp;
                }
                // Trường hợp 3: 2 con
                Node* successor = findMin(node->right);
                node->val = successor->val;
                node->right = erase(node->right, successor->val);
            }
            return node;
        }
        
        void erase(int val) { root = erase(root, val); }
        
        // Duyệt inorder: cho ra dãy tăng dần
        void inorder(Node* node) {
            if (node == nullptr) return;
            inorder(node->left);
            cout << node->val << " ";
            inorder(node->right);
        }
        
        void print() { inorder(root); cout << endl; }
    };
    ```

=== "Python"

    ```python
    class Node:
        def __init__(self, val):
            self.val = val
            self.left = None
            self.right = None
    
    class BST:
        def __init__(self):
            self.root = None
        
        def insert(self, val):
            self.root = self._insert(self.root, val)
        
        def _insert(self, node, val):
            if node is None:
                return Node(val)
            if val < node.val:
                node.left = self._insert(node.left, val)
            elif val > node.val:
                node.right = self._insert(node.right, val)
            return node
        
        def search(self, val):
            return self._search(self.root, val)
        
        def _search(self, node, val):
            if node is None: return False
            if val == node.val: return True
            if val < node.val: return self._search(node.left, val)
            return self._search(node.right, val)
        
        def find_min(self, node):
            while node.left:
                node = node.left
            return node
        
        def erase(self, val):
            self.root = self._erase(self.root, val)
        
        def _erase(self, node, val):
            if node is None: return None
            if val < node.val:
                node.left = self._erase(node.left, val)
            elif val > node.val:
                node.right = self._erase(node.right, val)
            else:
                if node.left is None: return node.right
                if node.right is None: return node.left
                successor = self.find_min(node.right)
                node.val = successor.val
                node.right = self._erase(node.right, successor.val)
            return node
        
        def inorder(self, node=None, result=None):
            if result is None: result = []
            if node is None: return result
            self.inorder(node.left, result)
            result.append(node.val)
            self.inorder(node.right, result)
            return result
    ```

---

## 4. Duyệt cây (Tree Traversal)

### 4.1. Inorder (trung tố): Trái → Gốc → Phải

```cpp
void inorder(Node* node) {
    if (node == nullptr) return;
    inorder(node->left);      // Trái
    cout << node->val << " "; // Gốc
    inorder(node->right);     // Phải
}
// BST → inorder cho dãy TĂNG DẦN!
```

### 4.2. Preorder (tiền tố): Gốc → Trái → Phải

```cpp
void preorder(Node* node) {
    if (node == nullptr) return;
    cout << node->val << " "; // Gốc
    preorder(node->left);     // Trái
    preorder(node->right);    // Phải
}
```

### 4.3. Postorder (hậu tố): Trái → Phải → Gốc

```cpp
void postorder(Node* node) {
    if (node == nullptr) return;
    postorder(node->left);    // Trái
    postorder(node->right);   // Phải
    cout << node->val << " "; // Gốc
}
```

```
Cây:        8
           / \
          3   10
         / \    \
        1   6    14

Inorder:   1 3 6 8 10 14    (tăng dần!)
Preorder:  8 3 1 6 10 14    (copy cây)
Postorder: 1 6 3 14 10 8    (xóa cây)
```

---

## 5. Vấn đề lớn: BST bị "méo" (Unbalanced)

### Worst Case: Dãy tăng dần → BST thành linked list!

```
Chèn 1, 2, 3, 4, 5 vào BST rỗng:

1
 \
  2
   \
    3
     \
      4
       \
        5

Cây nghiêng hoàn toàn → chiều cao = N = 5!
→ Mọi thao tác đều O(N) thay vì O(log N)!
```

### Giải pháp: Cây BST tự cân bằng

Các biến thể giữ cây luôn cân bằng (chiều cao ≈ log N):

| Cây | Chiều cao | Ý tưởng |
|-----|----------|---------|
| AVL Tree | ≤ 1.44 log N | Chênh lệch chiều cao 2 con ≤ 1 |
| Red-Black Tree | ≤ 2 log N | Tô màu đỏ-đen, đảm bảo cân bằng |
| B-Tree | O(log N) | Mỗi nút nhiều khóa, dùng trong database |

!!! tip "Trong thực tế"
    Trong competitive programming, hiếm khi tự cài BST. Dùng `set` / `map` trong C++ (Red-Black Tree) hoặc `dict` trong Python (Hash Table).

---

## 6. Ứng dụng của BST

### 6.1. Tìm kiếm nhị phân trên mảng đã sắp xếp

BST chính là "phiên bản cây" của tìm kiếm nhị phân trên mảng!

### 6.2. Duyệt khoảng (Range Traversal)

Tìm tất cả phần tử trong khoảng [L, R]:

```cpp
void rangeQuery(Node* node, int L, int R) {
    if (node == nullptr) return;
    if (L < node->val) rangeQuery(node->left, L, R);
    if (L <= node->val && node->val <= R)
        cout << node->val << " ";  // In phần tử trong khoảng
    if (R > node->val) rangeQuery(node->right, L, R);
}
```

### 6.3. Kiểm tra cây có phải BST

```cpp
bool isBST(Node* node, long long minVal, long long maxVal) {
    if (node == nullptr) return true;
    if (node->val <= minVal || node->val >= maxVal) return false;
    return isBST(node->left, minVal, node->val) &&
           isBST(node->right, node->val, maxVal);
}

// Gọi: isBST(root, LLONG_MIN, LLONG_MAX)
```

---

## 7. Lưu ý & Cạm bẫy

### 7.1. BST khác với Heap

| | BST | Heap |
|--|-----|------|
| Tính chất | trái < cha < phải | cha ≥ con (max-heap) |
| Tìm kiếm | O(log N) | O(N) |
| Inorder | Tăng dần | Không có ý nghĩa |
| Ứng dụng | Set, Map | Priority Queue |

### 7.2. BST bị méo → O(N)

Chèn dãy tăng/giảm dần → cây nghiêng. Trong thi đấu, nếu cần BST cân bằng → dùng `set` / `map` (C++) đã cài Red-Black Tree sẵn.

### 7.3. Không có phần tử trùng

BST cơ bản không lưu trùng. Nếu chèn trùng → bỏ qua (hoặc đếm số lần xuất hiện ở nút).

---

## 8. Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [LeetCode - Validate BST](https://leetcode.com/problems/validate-binary-search-tree/) | LC | ⭐⭐ | Kiểm tra BST |
| [LeetCode - Lowest Common Ancestor of BST](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/) | LC | ⭐⭐ | LCA trên BST |
| [LeetCode - Kth Smallest Element in BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/) | LC | ⭐⭐ | Duyệt inorder |
| [LeetCode - Insert into BST](https://leetcode.com/problems/insert-into-a-binary-search-tree/) | LC | ⭐ | Chèn BST |
| [LeetCode - Delete Node in BST](https://leetcode.com/problems/delete-node-in-a-bst/) | LC | ⭐⭐⭐ | Xóa BST |
| [CSES - Tree Traversals](https://cses.fi/problemset/task/1702) | CSES | ⭐⭐ | BST traversal |
| [CSES - Distinct Colors](https://cses.fi/problemset/task/1139) | CSES | ⭐⭐⭐ | Subtree query |

---

## Tài liệu tham khảo

- [CP-Algorithms - BST](https://cp-algorithms.com/data_structures/bst.html)
- [GeeksforGeeks - BST](https://www.geeksforgeeks.org/dsa/binary-search-tree-data-structure/)
- [VNOI Wiki - Cấu trúc dữ liệu tổng quan](https://wiki.vnoi.info/algo/data-structures/overview-data-structures)
- [YouTube - BST (takeuforward)](https://www.youtube.com/watch?v=pYT9F8_LFTM)

**Bài trước:** [Sparse Table ←](29-sparse-table.md) | **Bài tiếp theo:** [Bao lồi →](28-bao-loi.md)