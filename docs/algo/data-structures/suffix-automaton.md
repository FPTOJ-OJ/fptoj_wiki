

**Tác giả**: Cao Xuân Hưng

## Giới thiệu

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

## Bài tập áp dụng

- [CF Round 94 - B](http://codeforces.com/problemset/problem/128/B)

## Tài liệu tham khảo

- [Saisumit - Suffix Automaton](https://saisumit.wordpress.com/2016/01/26/suffix-automaton/)
- [A short guide to suffix automata](http://codeforces.com/blog/entry/20861)