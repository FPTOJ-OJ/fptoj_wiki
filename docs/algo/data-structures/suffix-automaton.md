

**Tác giả**: Cao Xuân Hưng

> **Gợi ý:** Xem thêm bài giảng chi tiết kèm trace từng bước, cài đặt C++/Python và bài tập tại [Suffix Automaton (Bài học)](../../lessons/suffix-automaton.md).

## Giới thiệu

**Suffix Automaton (SAM)** là một cấu trúc dữ liệu dạng đồ thị có hướng không chu trình (DAG) biểu diễn toàn bộ tập các xâu con của một xâu $S$ độ dài $N$ chỉ với $O(N)$ trạng thái và $O(N)$ cạnh chuyển (tối đa $2N - 1$ trạng thái và $3N - 4$ cạnh).

Với SAM, ta có thể giải nhiều bài toán xâu trong thời gian tuyến tính $O(N)$: kiểm tra xâu con tồn tại, đếm số xâu con phân biệt, tìm xâu con chung dài nhất, đếm số lần xuất hiện của mỗi xâu con.

## Định nghĩa

- **Suffix automaton** của một chuỗi $S$ là đồ thị liên thông có hướng không chu trình (DAG) trong đó mỗi nút là một trạng thái của chuỗi và mỗi cạnh nối là một bước chuyển trạng thái được đánh dấu bằng một kí tự trong $S$.

- Đồ thị gồm một nút gốc (**initial state**) được đánh dấu i. Từ nút gốc, ta có thể đi đến tất cả các nút trong đồ thị.

- Một số nút kết thúc (**terminal state**) được đánh dấu (*) với ý nghĩa nếu ta đi từ nút gốc đến một nút kết thúc bất kì, ta sẽ nhận được một hậu tố (suffix) của S.

- Dưới đây là một ví dụ về suffix automaton của chuỗi "acbcbc".

<img src="/All_Images_Collected/SA.png" alt="Suffix Automaton" style="max-width: 700px; display: block; margin: 0 auto;" />

<img src="/All_Images_Collected/SAa.png" alt="Suffix Automaton - Step a" style="max-width: 700px; display: block; margin: 0 auto;" />

<img src="/All_Images_Collected/SAaa.png" alt="Suffix Automaton - Step aa" style="max-width: 700px; display: block; margin: 0 auto;" />

<img src="/All_Images_Collected/SAab.png" alt="Suffix Automaton - Step ab" style="max-width: 700px; display: block; margin: 0 auto;" />

<img src="/All_Images_Collected/SAaba.png" alt="Suffix Automaton - Step aba" style="max-width: 700px; display: block; margin: 0 auto;" />

<img src="/All_Images_Collected/SAabb.png" alt="Suffix Automaton - Step abb" style="max-width: 700px; display: block; margin: 0 auto;" />

<img src="/All_Images_Collected/SAabbb.png" alt="Suffix Automaton - Step abbb" style="max-width: 700px; display: block; margin: 0 auto;" />

<img src="/All_Images_Collected/SA_suffix_links.png" alt="Suffix Automaton Suffix Links" style="max-width: 700px; display: block; margin: 0 auto;" />

## Cài đặt mẫu (C++)

```cpp
#include <bits/stdc++.h>
using namespace std;

struct SuffixAutomaton {
    struct State {
        int len = 0, link = -1;
        map<char, int> next;
    };

    vector<State> st;
    int last = 0;

    SuffixAutomaton(int maxLen = 0) {
        st.reserve(2 * maxLen + 1);
        st.push_back(State());
    }

    void extend(char c) {
        int cur = st.size();
        st.push_back(State());
        st[cur].len = st[last].len + 1;
        int p = last;
        while (p != -1 && !st[p].next.count(c)) {
            st[p].next[c] = cur;
            p = st[p].link;
        }
        if (p == -1) {
            st[cur].link = 0;
        } else {
            int q = st[p].next[c];
            if (st[p].len + 1 == st[q].len) {
                st[cur].link = q;
            } else {
                int clone = st.size();
                st.push_back(st[q]);
                st[clone].len = st[p].len + 1;
                while (p != -1 && st[p].next[c] == q) {
                    st[p].next[c] = clone;
                    p = st[p].link;
                }
                st[q].link = st[cur].link = clone;
            }
        }
        last = cur;
    }

    long long countDistinctSubstrings() const {
        long long ans = 0;
        for (size_t i = 1; i < st.size(); i++)
            ans += st[i].len - st[st[i].link].len;
        return ans;
    }
};
```

## Bài tập áp dụng

- [CF Round 94 - B](http://codeforces.com/problemset/problem/128/B)

## Tài liệu tham khảo

- [Saisumit - Suffix Automaton](https://saisumit.wordpress.com/2016/01/26/suffix-automaton/)
- [A short guide to suffix automata](http://codeforces.com/blog/entry/20861)