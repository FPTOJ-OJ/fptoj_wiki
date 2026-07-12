# Hàm Phi Euler ($\varphi$) - Đếm Số Nguyên Tố Cùng Nhau

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** VNOI Wiki, CP-Algorithms - Euler's Totient

---

## 1. Bản chất vấn đề

### Định nghĩa

Hàm Euler $\varphi(n)$ đếm số nguyên dương $k$ sao cho $1 \le k \le n$ và $\gcd(k, n) = 1$ (nguyên tố cùng nhau với $n$).

**Ví dụ:** $\varphi(12)$: Các số nguyên tố cùng nhau với 12 trong $[1, 12]$: $\{1, 5, 7, 11\}$ $\Rightarrow$ $\varphi(12) = 4$.

### Ứng dụng

| Bài toán | Sử dụng $\varphi$ |
|----------|-------------------|
| Định lý Euler: $a^{\varphi(n)} \equiv 1 \pmod{n}$ | Tính lũy thừa modulo |
| Nghịch đảo modulo | $a^{-1} \equiv a^{\varphi(n)-1} \pmod{n}$ |
| Đếm phân số tối giản | Số phân số $\frac{k}{n}$ với $\gcd(k,n)=1$ |

---

## 2. Tư duy cốt lõi

### Công thức tính $\varphi(n)$

Nếu $n = p_1^{a_1} \cdot p_2^{a_2} \cdots p_k^{a_k}$ (phân tích thừa số nguyên tố):

$$\varphi(n) = n \cdot \prod_{i=1}^{k} \left(1 - \frac{1}{p_i}\right)$$

**Ví dụ:** $\varphi(12) = 12 \cdot (1 - \frac{1}{2}) \cdot (1 - \frac{1}{3}) = 12 \cdot \frac{1}{2} \cdot \frac{2}{3} = 4$

### Tính $\varphi(n)$ bằng sàng

Dùng biến thể Eratosthenes: ban đầu $\varphi[i] = i$. Với mỗi số nguyên tố $p$, nhân $\varphi[j]$ với $(1 - 1/p)$ cho tất cả bội của $p$.

### Trace chi tiết: Tính $\varphi$ từ 1 đến 12

| $n$ | Phân tích | $\varphi(n)$ |
|-----|-----------|-------------|
| 1 | — | 1 |
| 2 | $2$ | $2 \cdot (1 - 1/2) = 1$ |
| 3 | $3$ | $3 \cdot (1 - 1/3) = 2$ |
| 4 | $2^2$ | $4 \cdot (1 - 1/2) = 2$ |
| 5 | $5$ | $5 \cdot (1 - 1/5) = 4$ |
| 6 | $2 \cdot 3$ | $6 \cdot (1 - 1/2)(1 - 1/3) = 2$ |
| 7 | $7$ | $7 \cdot (1 - 1/7) = 6$ |
| 8 | $2^3$ | $8 \cdot (1 - 1/2) = 4$ |
| 9 | $3^2$ | $9 \cdot (1 - 1/3) = 6$ |
| 10 | $2 \cdot 5$ | $10 \cdot (1 - 1/2)(1 - 1/5) = 4$ |
| 11 | $11$ | $11 \cdot (1 - 1/11) = 10$ |
| 12 | $2^2 \cdot 3$ | $12 \cdot (1 - 1/2)(1 - 1/3) = 4$ |

---

## 3. Phân tích tính đúng đắn

### Nguyên lý loại trừ

Số nguyên tố cùng nhau với $n$ = $n$ - (số chia hết cho ít nhất 1 thừa số nguyên tố của $n$).

Dùng inclusion-exclusion với các thừa số nguyên tố $p_1, p_2, \ldots, p_k$:

$$\varphi(n) = n - \sum_{i}\frac{n}{p_i} + \sum_{i<j}\frac{n}{p_i p_j} - \ldots = n \cdot \prod_{i}\left(1 - \frac{1}{p_i}\right)$$

### Tính chất nhân tính

Nếu $\gcd(a, b) = 1$ thì $\varphi(ab) = \varphi(a) \cdot \varphi(b)$.

Đây là tính chất **hàm nhân tính** (multiplicative function).

---

## 4. Đánh giá độ phức tạp

| Phương pháp | Thời gian | Không gian |
|-------------|-----------|------------|
| Tính $\varphi(n)$ trực tiếp | $O(\sqrt{n})$ | $O(1)$ |
| Sàng $\varphi$ từ 1 đến $N$ | $O(N \log \log N)$ | $O(N)$ |

---

## Code minh họa

### Tính $\varphi(n)$ trực tiếp

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    long long phi(long long n) {
        long long result = n;           // φ(n) khởi tạo = n
        // Duyệt các ước nguyên tố p ≤ √n
        for (long long p = 2; p * p <= n; p++) {
            if (n % p == 0) {           // p là ước nguyên tố
                while (n % p == 0)      // Loại bỏ tất cả thừa số p khỏi n
                    n /= p;
                result -= result / p;   // Nhân với (1 - 1/p): result = result * (p-1) / p
            }
        }
        // Nếu sau vòng lặp n > 1, thì n là số nguyên tố cuối cùng
        if (n > 1)
            result -= result / n;       // Nhân với (1 - 1/n) cho thừa số nguyên tố còn lại
        return result;
    }

    int main() {
        long long n;
        cin >> n;
        cout << phi(n) << "\n";
        return 0;
    }
    ```

=== "Python"

    ```python
    def phi(n):
        result = n                       # φ(n) khởi tạo = n
        p = 2
        # Duyệt các ước nguyên tố p ≤ √n
        while p * p <= n:
            if n % p == 0:               # p là ước nguyên tố
                while n % p == 0:        # Loại bỏ tất cả thừa số p khỏi n
                    n //= p
                result -= result // p    # Nhân với (1 - 1/p): result = result * (p-1) / p
            p += 1
        # Nếu sau vòng lặp n > 1, thì n là số nguyên tố cuối cùng
        if n > 1:
            result -= result // n        # Nhân với (1 - 1/n) cho thừa số nguyên tố còn lại
        return result

    n = int(input())
    print(phi(n))
    ```

### Sàng $\varphi$ từ 1 đến $N$

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    int main() {
        int n;
        cin >> n;

        vector<int> phi(n + 1);                // Mảng chứa φ(i) cho i = 1..n
        iota(phi.begin(), phi.end(), 0);       // Khởi tạo φ[i] = i cho mọi i

        // Duyệt qua các số i, nếu φ[i] == i (chưa bị điều chỉnh) thì i là số nguyên tố
        for (int i = 2; i <= n; i++) {
            if (phi[i] == i) {                 // i là số nguyên tố
                // Duyệt tất cả các bội của i: j = i, 2i, 3i, ...
                for (int j = i; j <= n; j += i) {
                    // Nhân φ[j] với (1 - 1/i) = (i-1)/i
                    // Tương đương: φ[j] = φ[j] - φ[j]/i
                    phi[j] -= phi[j] / i;
                }
            }
        }

        // In kết quả φ(1)..φ(n)
        for (int i = 1; i <= n; i++) {
            cout << "phi(" << i << ") = " << phi[i] << "\n";
        }
        return 0;
    }
    ```

=== "Python"

    ```python
    n = int(input())
    phi = list(range(n + 1))              # Khởi tạo φ[i] = i cho mọi i

    # Duyệt qua các số i, nếu φ[i] == i (chưa bị điều chỉnh) thì i là số nguyên tố
    for i in range(2, n + 1):
        if phi[i] == i:                   # i là số nguyên tố
            # Duyệt tất cả các bội của i: j = i, 2i, 3i, ...
            for j in range(i, n + 1, i):
                # Nhân φ[j] với (1 - 1/i) = (i-1)/i
                # Tương đương: φ[j] = φ[j] - φ[j]/i
                phi[j] -= phi[j] // i

    # In kết quả φ(1)..φ(n)
    for i in range(1, n + 1):
        print(f"phi({i}) = {phi[i]}")
    ```

---

### Trace sàng phi Euler với N = 12

Giải thích từng bước chạy của thuật toán sàng $\varphi$:

| Vòng lặp $i$ | Là số nguyên tố? | Cập nhật các bội của $i$ | Mảng $\varphi$ sau vòng lặp |
|:---:|:---:|:---|:---|
| Khởi tạo | — | — | $[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]$ |
| $i=2$ | ✅ (phi[2]=2) | $j=2,4,6,8,10,12$: `phi[j] -= phi[j]/2` | $[0, 1, 1, 3, 2, 5, 3, 7, 4, 9, 5, 11, 6]$ |
| $i=3$ | ✅ (phi[3]=3) | $j=3,6,9,12$: `phi[j] -= phi[j]/3` | $[0, 1, 1, 2, 2, 5, 2, 7, 4, 6, 5, 11, 4]$ |
| $i=4$ | ❌ (phi[4]=2≠4) | Bỏ qua | $[0, 1, 1, 2, 2, 5, 2, 7, 4, 6, 5, 11, 4]$ |
| $i=5$ | ✅ (phi[5]=5) | $j=5,10$: `phi[j] -= phi[j]/5` | $[0, 1, 1, 2, 2, 4, 2, 7, 4, 6, 4, 11, 4]$ |
| $i=6$ | ❌ (phi[6]=2≠6) | Bỏ qua | $[0, 1, 1, 2, 2, 4, 2, 7, 4, 6, 4, 11, 4]$ |
| $i=7$ | ✅ (phi[7]=7) | $j=7$: `phi[7] -= phi[7]/7` | $[0, 1, 1, 2, 2, 4, 2, 6, 4, 6, 4, 11, 4]$ |
| $i=8$ | ❌ | Bỏ qua | $[0, 1, 1, 2, 2, 4, 2, 6, 4, 6, 4, 11, 4]$ |
| $i=9$ | ❌ | Bỏ qua | $[0, 1, 1, 2, 2, 4, 2, 6, 4, 6, 4, 11, 4]$ |
| $i=10$ | ❌ | Bỏ qua | $[0, 1, 1, 2, 2, 4, 2, 6, 4, 6, 4, 11, 4]$ |
| $i=11$ | ✅ (phi[11]=11) | $j=11$: `phi[11] -= phi[11]/11` | $[0, 1, 1, 2, 2, 4, 2, 6, 4, 6, 4, 10, 4]$ |
| $i=12$ | ❌ | Bỏ qua | $[0, 1, 1, 2, 2, 4, 2, 6, 4, 6, 4, 10, 4]$ |

??? tip "Giải thích chi tiết"
    - **Bước $i=2$:** Các bội của 2 được nhân với $(1-1/2)=1/2$. Ví dụ $\varphi[6]$ giảm từ 6 xuống 3.
    - **Bước $i=3$:** Các bội của 3 được nhân thêm $(1-1/3)=2/3$. $\varphi[6]$ giảm từ 3 xuống 2.
    - **Bước $i=4$:** $\varphi[4]=2\neq4$ nên 4 không phải nguyên tố, bỏ qua. Điều này là đúng vì thừa số 2 của 4 đã được xử lý ở vòng $i=2$.
    - Sau vòng $i=2$, các bội của 2 đã có $\varphi$ đúng cho thừa số nguyên tố 2. Khi $i=4$, $\varphi[4]$ không còn bằng 4 nên điều kiện `phi[i]==i` không còn đúng.
    - Kết quả cuối cùng trùng khớp với bảng trace bên trên!

---

## 5. Mẹo và lưu ý

### 5.1 Các trường hợp đặc biệt

| Trường hợp | $\varphi(n)$ | Giải thích |
|:---|:---:|:---|
| $n = 1$ | $1$ | Theo định nghĩa, $\gcd(1,1)=1$ |
| $n$ là số nguyên tố $p$ | $p-1$ | Tất cả các số từ $1$ đến $p-1$ đều nguyên tố cùng nhau với $p$ |
| $n = p^k$ (lũy thừa nguyên tố) | $p^k - p^{k-1} = p^{k-1}(p-1)$ | Loại bỏ các bội của $p$ trong $[1, p^k]$ |
| $n$ là tích hai số nguyên tố $p \cdot q$ | $(p-1)(q-1)$ | Hệ quả của tính nhân tính |

### 5.2 Cạm bẫy thường gặp

- **Tràn số:** Với $n$ lớn (đến $10^{12}$), $\varphi(n)$ cũng lớn tương đương. Dùng `long long` trong C++ và chú ý giới hạn modulo trong các bài yêu cầu.
- **Bỏ quên thừa số cuối:** Trong thuật toán $O(\sqrt{n})$, luôn kiểm tra `if (n > 1)` sau vòng lặp. Nếu không, thừa số nguyên tố cuối cùng (lớn hơn $\sqrt{n}$) sẽ bị bỏ sót.
- **Sàng quá giới hạn bộ nhớ:** Với $N = 10^7$, cần $40\text{ MB}$ cho mảng `phi` kiểu `int`. Cân nhắc dùng `vector<int>` thay vì mảng tĩnh quá lớn trên stack.
- **Nhầm lẫn giữa $\varphi$ và số ước:** $\varphi$ đếm số nguyên tố cùng nhau, không phải số ước. Hai khái niệm này hoàn toàn khác biệt.
- **Quên tính chất $\varphi$ là hàm nhân tính:** Chỉ đúng khi $\gcd(a,b)=1$. Tổng quát: $\varphi(ab) = \varphi(a) \cdot \varphi(b) \cdot \frac{d}{\varphi(d)}$ với $d=\gcd(a,b)$.

---

## 6. Bài tập luyện tập

| Mã bài | Tên bài tập | Độ khó | Kiểu bài tập (Bản chất) | Bài học lý thuyết |
| :--- | :--- | :---: | :--- | :--- |
| `phi-euler` | [Hàm Phi Euler](https://fptoj.com/problem/phi-euler) | ⭐⭐ | $\varphi(N)$ cơ bản | [Hàm Phi Euler](phi-euler.md) |
| `phi-range` | [Sàng Phi Euler](https://fptoj.com/problem/phi-range) | ⭐⭐ | Sàng $\varphi(1..N)$ | [Hàm Phi Euler](phi-euler.md) |
| `phi-sum` | [Tổng Phi Euler trên đoạn](https://fptoj.com/problem/phi-sum) | ⭐⭐ | Prefix sum $\varphi$ | [Hàm Phi Euler](phi-euler.md) |
| `phi-frac` | [Đếm phân số tối giản](https://fptoj.com/problem/phi-frac) | ⭐⭐ | $\sum \varphi(i)$ | [Hàm Phi Euler](phi-euler.md) |
| `phi-multi` | [Tổng Phi trên ước](https://fptoj.com/problem/phi-multi) | ⭐ | Tính chất $\sum_{d|n} \varphi(d) = n$ | [Hàm Phi Euler](phi-euler.md) |
| `phi-gcd-sum` | [Tổng GCD với Phi Euler](https://fptoj.com/problem/phi-gcd-sum) | ⭐⭐⭐ | $\sum \gcd(i, N)$ dùng $\varphi$ | [Hàm Phi Euler](phi-euler.md) |
| `phi-div-euler` | [Chia modulo bằng định lý Euler](https://fptoj.com/problem/phi-div-euler) | ⭐⭐⭐ | $a \times b^{\varphi(M)-1} \bmod M$ | [Hàm Phi Euler](phi-euler.md) |
| `phi-exponent` | [Lũy thừa modulo bằng định lý Euler](https://fptoj.com/problem/phi-exponent) | ⭐⭐⭐ | $a^n \bmod M$ rút gọn số mũ | [Hàm Phi Euler](phi-euler.md) |
| `phi-order` | [Cấp của số modulo](https://fptoj.com/problem/phi-order) | ⭐⭐⭐ | Tìm cấp $a^k \equiv 1 \pmod{M}$ | [Hàm Phi Euler](phi-euler.md) |
| `phi-coprime-r` | [Đếm nguyên tố cùng nhau trong đoạn](https://fptoj.com/problem/phi-coprime-r) | ⭐⭐⭐⭐ | Inclusion-Exclusion + $\varphi$ | [Hàm Phi Euler](phi-euler.md) |

### Tham khảo thêm

| Bài | Nền tảng | Độ khó | Mô tả |
|---|---|---|---|
| [CSES - Counting Divisors](https://cses.fi/problemset/task/1713) | CSES | ⭐⭐ | Đếm ước số của $N$ |
| [CSES - Divisor Analysis](https://cses.fi/problemset/task/2182) | CSES | ⭐⭐⭐ | Phân tích các ước (số lượng, tổng, tích) |

