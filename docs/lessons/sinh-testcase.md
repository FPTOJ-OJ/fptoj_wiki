# Bài 78: Sinh Testcase & Stress Test

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** Codeforces blogs, USACO Guide

## 1. Tại sao phải sinh testcase?

Bạn code xong, submit → WA (Wrong Answer). Nhưng sample test chạy đúng! Vậy lỗi ở test nào?

**Sinh testcase** = tạo input ngẫu nhiên, so sánh output của code bạn với code brute force → tìm test mà code bạn SAI!

```
Code bạn (O(N log N))  ← có thể có bug
Code brute force (O(N²)) ← chắc chắn đúng (đơn giản)

Sinh testcase ngẫu nhiên → chạy cả 2 → so output
→ Nếu khác nhau → TÌM RA BUG!
```

---

## 2. Sinh testcase cơ bản

### 2.1. Sinh số ngẫu nhiên

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    
    // rng: bộ sinh số ngẫu nhiên (seed bằng thời gian -> mỗi lần chạy ra test khác nhau)
    mt19937 rng(chrono::steady_clock::now().time_since_epoch().count());
    
    // randInt(l, r): trả về số nguyên ngẫu nhiên đều trong [l, r]
    // Dùng uniform_int_distribution để phân phối đều, tránh modulo-bias của rand()%k
    int randInt(int l, int r) {
        return uniform_int_distribution<int>(l, r)(rng);
    }
    
    int main() {
        // Sinh số ngẫu nhiên trong [a, b]
        int a = 1, b = 100;
        int random_num = randInt(a, b);
        cout << random_num << endl;
        
        // Sinh mảng ngẫu nhiên: n phần tử, mỗi phần tử trong [1, 100]
        int n = 10;
        vector<int> arr(n);
        for (int i = 0; i < n; i++)
            arr[i] = randInt(1, 100);
        
        // In testcase đúng format đề: dòng 1 là n, dòng 2 là n số
        cout << n << endl;
        for (int x : arr) cout << x << " ";
        cout << endl;
    }
    ```

=== "Python"

    ```python
    import random
    
    def gen_array(n_min=1, n_max=10, val_min=1, val_max=100):
        """Sinh mảng ngẫu nhiên"""
        n = random.randint(n_min, n_max)
        arr = [random.randint(val_min, val_max) for _ in range(n)]
        return n, arr
    
    def gen_tree(n):
        """Sinh cây ngẫu nhiên (Prüfer sequence)"""
        edges = []
        for i in range(2, n + 1):
            parent = random.randint(1, i - 1)
            edges.append((parent, i))
        return edges
    
    def gen_string(length_min=1, length_max=10, charset='abc'):
        """Sinh xâu ngẫu nhiên"""
        length = random.randint(length_min, length_max)
        return ''.join(random.choices(charset, k=length))
    
    # Ví dụ: Sinh testcase cho bài đếm
    n, arr = gen_array(1, 5, 1, 10)
    print(n)
    print(*arr)
    ```

### 2.2. Sinh testcase cho bài tìm kiếm nhị phân

```cpp
// Sinh testcase cho Binary Search
void genBinarySearch() {
    int n = randInt(1, 100);  // 1 ≤ n ≤ 100
    int target = randInt(1, 1000);
    
    vector<int> arr(n);
    for (int i = 0; i < n; i++)
        arr[i] = randInt(1, 1000);
    // BẮT BUỘC sort: đề binary search yêu cầu mảng tăng dần,
    // không sort thì test sinh ra vi phạm ràng buộc đề -> vô nghĩa
    sort(arr.begin(), arr.end());  // Đảm bảo mảng tăng dần
    
    // In testcase
    cout << n << " " << target << endl;
    for (int x : arr) cout << x << " ";
    cout << endl;
}
```

### 2.3. Sinh testcase cho bài đồ thị

```cpp
// Sinh cây ngẫu nhiên (N đỉnh, N-1 cạnh)
// Vì sao đúng: đỉnh i (i>=2) nối với 1 đỉnh cha trong [1, i-1] nên đồ thị
// liên thông (mọi đỉnh đều về được 1), có đúng N-1 cạnh -> là cây, không chu trình
void genTree() {
    int n = randInt(2, 11);  // 2 ≤ n ≤ 11
    
    cout << n << endl;
    for (int i = 2; i <= n; i++) {
        int parent = randInt(1, i - 1);  // Cha ngẫu nhiên từ 1..i-1
        cout << parent << " " << i << " " << randInt(1, 100) << endl;
    }
}

// Sinh đồ thị ngẫu nhiên (có thể có chu trình)
// Khác genTree: u, v độc lập nên có thể trùng nhau (khuyên) hoặc trùng cạnh cũ
// (đa cạnh) và xuất hiện chu trình -> dùng để test thuật toán đồ thị tổng quát
void genGraph() {
    int n = randInt(2, 10);
    int m = randInt(n - 1, n * (n-1) / 2);
    
    cout << n << " " << m << endl;
    for (int i = 0; i < m; i++) {
        int u = randInt(1, n);
        int v = randInt(1, n);
        int w = randInt(1, 100);
        cout << u << " " << v << " " << w << endl;
    }
}
```

---

## 3. Stress Test — Kỹ thuật tìm bug hiệu quả nhất

### 3.1. Stress Test là gì?

```
Lặp lại N lần:
  1. Sinh testcase ngẫu nhiên
  2. Chạy code "đúng" (brute force) → expected
  3. Chạy code "cần test" → actual
  4. Nếu expected ≠ actual → IN RA TESTCASE ĐÓ → DEBUG!
```

### 3.2. Template Stress Test

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    
    // ===== Code brute force (chắc chắn đúng) =====
    long long bruteForce(vector<int>& a) {
        // Ví dụ: tìm max subarray sum - O(N²)
        long long maxSum = LLONG_MIN;
        for (int i = 0; i < a.size(); i++) {
            long long sum = 0;
            for (int j = i; j < a.size(); j++) {
                sum += a[j];
                maxSum = max(maxSum, sum);
            }
        }
        return maxSum;
    }
    
    // ===== Code cần test (có thể có bug) =====
    long long mySolution(vector<int>& a) {
        // Kadane's algorithm - O(N)
        long long maxSum = a[0], curSum = a[0];
        for (int i = 1; i < a.size(); i++) {
            curSum = max((long long)a[i], curSum + a[i]);
            maxSum = max(maxSum, curSum);
        }
        return maxSum;
    }
    
    mt19937 rng(chrono::steady_clock::now().time_since_epoch().count());
    int randInt(int l, int r) {
        return uniform_int_distribution<int>(l, r)(rng);
    }
    
    int main() {
        for (int test = 1; test <= 10000; test++) {
            // Bước 1: Sinh testcase ngẫu nhiên
            int n = randInt(1, 20);
            vector<int> a(n);
            for (int i = 0; i < n; i++)
                a[i] = randInt(-100, 100);  // [-100, 100]
            
            // Bước 2: Chạy cả 2
            long long expected = bruteForce(a);
            long long actual = mySolution(a);
            
            // Bước 3: So sánh
            if (expected != actual) {
                cout << "BUG FOUND at test " << test << "!\n";
                cout << "Input: n=" << n << endl;
                for (int x : a) cout << x << " ";
                cout << endl;
                cout << "Expected: " << expected << endl;
                cout << "Actual: " << actual << endl;
                return 0;
            }
        }
        
        cout << "All 10000 tests passed!\n";
        return 0;
    }
    ```

=== "Python"

    ```python
    import random
    import sys
    
    def brute_force(a):
        """Brute force - O(N²) - chắc chắn đúng"""
        max_sum = float('-inf')
        for i in range(len(a)):
            s = 0
            for j in range(i, len(a)):
                s += a[j]
                max_sum = max(max_sum, s)
        return max_sum
    
    def my_solution(a):
        """Kadane's - O(N) - cần test"""
        max_sum = cur_sum = a[0]
        for i in range(1, len(a)):
            cur_sum = max(a[i], cur_sum + a[i])
            max_sum = max(max_sum, cur_sum)
        return max_sum
    
    # Stress test
    for test in range(1, 10001):
        n = random.randint(1, 20)
        a = [random.randint(-100, 100) for _ in range(n)]
        
        expected = brute_force(a)
        actual = my_solution(a)
        
        if expected != actual:
            print(f"BUG at test {test}!")
            print(f"Input: {n}")
            print(f"Array: {a}")
            print(f"Expected: {expected}")
            print(f"Actual: {actual}")
            sys.exit(0)
    
    print("All 10000 tests passed!")
    ```

---

## 4. Các dạng testcase cần kiểm tra

Khi tự sinh bộ test để dò bug, bạn nên tách làm 3 nhóm test thay vì chỉ sinh hoàn toàn ngẫu nhiên (vì test ngẫu nhiên ít khi chạm đúng biên):

### 4.1. Trường hợp biên (Edge cases)

- Kích thước nhỏ nhất: $N = 0$ (nếu đề cho phép), $N = 1$ (mảng 1 phần tử).
- Dữ liệu đơn điệu hoặc trùng lặp: toàn bộ phần tử bằng nhau, dãy tăng nghiêm ngặt hoặc giảm nghiêm ngặt.
- Biên miền giá trị: số $0$, số âm lớn nhất ($-10^9$), số dương lớn nhất ($10^9$) để kiểm tra tràn số hoặc chia cho $0$.

### 4.2. Trường hợp ngóc ngách (Corner cases)

- Tổng hoặc kết quả đúng bằng $0$, bài toán vô nghiệm (cần in `-1` hoặc `NO`), hoặc có nhiều nghiệm tối ưu cùng tồn tại.
- Đồ thị rời rạc / 1 đỉnh / 0 cạnh / chứa khuyên và đa cạnh (nếu đề không cấm).
- Cây suy biến thành đường thẳng (chain) hoặc hình sao (star graph) để ép các thuật toán trên cây rơi vào chiều sâu / bậc cực đại.

### 4.3. Test ngẫu nhiên kích thước nhỏ (Random stress test)

- Sinh hàng nghìn test với $N \le 15 \dots 20$ để vét cạn brute force chạy cực nhanh và so sánh với thuật toán tối ưu.
- Sau khi vượt qua $10^4$ test nhỏ, nhớ chạy thêm **1 test kích thước cực đại ($N = N_{\max}$)** để đo thời gian chạy và lượng bộ nhớ thực tế (tránh TLE/MLE/Stack Overflow).

---

## 5. Quy trình xử lý khi gặp WA

1. **Đọc lại đề bài:** Kiểm tra xem có hiểu nhầm điều kiện biên, thứ tự in, 0-indexed vs 1-indexed hoặc yêu cầu lấy modulo hay không.
2. **Kiểm tra lại với brute force:** Viết hàm brute force đơn giản ($O(N^2)$ hoặc $O(2^N)$), tuyệt đối không tái sử dụng lại logic nghi ngờ sai từ code chính.
3. **Chạy stress test:** So sánh đầu ra giữa brute force và code chính trên bộ test nhỏ.
4. **Thu hẹp testcase lỗi:** Nếu phát hiện sai ở test $N = 18$, thử hạ dần kích thước sinh xuống $N = 4, 5$ để tìm phản ví dụ nhỏ nhất giúp trace tay dễ dàng.
5. **Kiểm tra tràn số & trường hợp đặc biệt:** Nếu stress test nhỏ đều đúng hết nhưng nộp vẫn WA, nguyên nhân thường nằm ở **tràn kiểu `int` (`long long`)**, sai số dấu phẩy động (`double`), hoặc biên $N_{\max}$ chưa được kiểm tra.

---

## 6. Lưu ý quan trọng & Đánh giá độ phức tạp

| Tiêu chí | Sai lầm thường gặp | Cách làm đúng |
| :--- | :--- | :--- |
| Độ tin cậy bản chuẩn | Dùng lại công thức tối ưu để tự test chính mình | Brute force phải ngây thơ nhất có thể ($O(N^2)$ / $O(2^N)$) |
| Độ phủ bộ test | Chỉ sinh test $N \le 10$ với toàn số dương | Phối hợp test nhỏ ($N$ nhỏ, có số âm/$0$), test cây suy biến và 1 test $N_{\max}$ |
| So sánh kết quả | Chỉ so số lượng hoặc bỏ qua khoảng trắng/xuống dòng | So sánh khớp từng dòng (hoặc dùng `diff -w`), cẩn thận với bài nhiều đáp án (cần viết *checker*) |
| Tốc độ stress test | Chạy vòng lặp $10^4$ test qua disk I/O chậm trên Python | Giữ sinh + brute + solution trong cùng tiến trình khi có thể để test đạt > $1000$ lần/giây |

---

## 7. Bài tập luyện tập

Hãy thử stress test với các bài sau:

| Bài | Nền tảng | Mục đích |
|-----|----------|----------|
| [CSES - Maximum Subarray Sum](https://cses.fi/problemset/task/1643) | CSES | Luyện stress test Kadane's |
| [CSES - Missing Number](https://cses.fi/problemset/task/1083) | CSES | Luyện sinh testcase |
| [CSES - Distinct Numbers](https://cses.fi/problemset/task/1621) | CSES | Luyện brute force |

---

## Tài liệu tham khảo

- [Codeforces - Stress Test Tutorial](https://codeforces.com/blog/entry/62393)
- [USACO Guide - Debugging](https://usaco.guide/general/debugging)
- [Errichto - Stress Test Video](https://www.youtube.com/watch?v=f8J4Ji6OjgQ)

---

**Bài trước:** [← Bài 77: Kỹ Năng Thi Đấu HSG Tin Học Việt Nam](ky-nang-thi-dau.md) | **Bài tiếp theo:** [Bài 79: Debug & Mẹo Thi Đấu →](debug-meo.md)
