


**Nguồn**: [emaxx](https://cp-algorithms.com/string/aho_corasick.html#toc-tgt-3)

## Lưu ý

Trước khi đọc bài viết này bạn cần nắm được các kiến thức sau:

- [Xử lý xâu](../../algo/string/basic.md)
- [KMP](../wcipeg/kmp.md)
- [Trie](../../algo/data-structures/trie.md)

## Giới thiệu

Như các bạn đã biết:

- Thuật toán [KMP](../wcipeg/kmp.md) giúp tìm kiếm 1 xâu con (pattern) trong 1 xâu lớn với độ phức tạp $O(M + N)$ với $M$ và $N$ là độ dài 2 xâu.
- Cấu trúc dữ liệu [Trie](../../algo/data-structures/trie.md) giúp chúng ta lưu trữ và tìm kiếm $N$.

Cấu trúc dữ liệu **Aho-Corasick** có thể hình dung như 1 sự kết hợp giữa trie và KMP:


// IN PROGRESS