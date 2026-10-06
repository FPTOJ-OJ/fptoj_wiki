# Định Lý Thặng Dư Trung Hoa (CRT) - Ghép Phương Trình Modular

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** CP-Algorithms - CRT

---

## 1. Bản chất vấn đề

### Bài toán: Giải hệ phương trình đồng dư

Giải hệ:

$$\begin{cases} x \equiv a_1 \pmod{m_1} \\ x \equiv a_2 \pmod{m_2} \\ \vdots \\ x \equiv a_k \pmod{m_k} \end{cases}$$

Trong đó $m_1, m_2, \ldots, m_k$ **nguyên tố cùng nhau** đôi một ($\gcd(m_i, m_j) = 1$ với $i \neq j$).

### Định lý CRT

Nếu $\gcd(m_i, m_j) = 1$ với mọi $i \neq j$, hệ phương trình có **nghiệm duy nhất** modulo $M = m_1 \cdot m_2 \cdots m_k$.

### Ví dụ

$$\begin{cases} x \equiv 2 \pmod{3} \\ x \equiv 3 \pmod{5} \\ x \equiv 2 \pmod{7} \end{cases}$$

Nghiệm: $x = 23$ (vì $23 \mod 3 = 2$, $23 \mod 5 = 3$, $23 \mod 7 = 2$). Mọi nghiệm có dạng $x = 23 + 105k$ với $k \in \mathbb{Z}$.

---

## 2. Tư duy cốt lõi

### Công thức CRT

$$x = \sum_{i=1}^{k} a_i \cdot M_i \cdot M_i^{-1} \pmod{M}$$

Trong đó:

- $M = m_1 \cdot m_2 \cdots m_k$
- $M_i = M / m_i$
- $M_i^{-1}$ là nghịch đảo modular của $M_i$ modulo $m_i$

### Trace chi tiết

Hệ: $x \equiv 2 \pmod{3}$, $x \equiv 3 \pmod{5}$, $x \equiv 2 \pmod{7}$

**Bước 1:** Tính $M = 3 \times 5 \times 7 = 105$

**Bước 2:** Tính $M_i$:

| $i$ | $m_i$ | $M_i = M / m_i$ | $M_i \mod m_i$ | $M_i^{-1} \pmod{m_i}$ |
|-----|-------|-----------------|----------------|----------------------|
| 1 | 3 | $105/3 = 35$ | $35 \mod 3 = 2$ | $2^{-1} \pmod{3} = 2$ (vì $2 \times 2 = 4 \equiv 1$) |
| 2 | 5 | $105/5 = 21$ | $21 \mod 5 = 1$ | $1^{-1} \pmod{5} = 1$ |
| 3 | 7 | $105/7 = 15$ | $15 \mod 7 = 1$ | $1^{-1} \pmod{7} = 1$ |

**Bước 3:** Tính $x$:

$$x = 2 \times 35 \times 2 + 3 \times 21 \times 1 + 2 \times 15 \times 1 = 140 + 63 + 30 = 233$$

$$x = 233 \mod 105 = 23$$

**Kiểm tra:** $23 \mod 3 = 2$ ✓, $23 \mod 5 = 3$ ✓, $23 \mod 7 = 2$ ✓

---

## 3. Phân tích tính đúng đắn

### Tại sao $M_i \cdot M_i^{-1} \equiv 1 \pmod{m_i}$?

$M_i = M / m_i$ không chia hết cho $m_i$ (vì $\gcd(m_i, m_j) = 1$). Do đó $\gcd(M_i, m_i) = 1$ $\Rightarrow$ $M_i$ có nghịch đảo modulo $m_i$.

### Tại sao $M_i \cdot M_i^{-1} \equiv 0 \pmod{m_j}$ với $j \neq i$?

$M_i$ chia hết cho $m_j$ (vì $M_i = M / m_i$ chứa $m_j$). Do đó $M_i \cdot M_i^{-1} \equiv 0 \pmod{m_j}$.

---

## 4. Đánh giá độ phức tạp

| Thao tác | Thời gian |
|----------|-----------|
| CRT cho $k$ phương trình | $O(k \cdot \log(\max m_i))$ |
| Tính nghịch đảo modular (Euclid) | $O(\log m)$ |

---

## Code minh họa

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    // Thuật toán Euclid mở rộng: tìm (x, y) sao cho a*x + b*y = gcd(a, b)
    long long extgcd(long long a, long long b, long long& x, long long& y) {
        if (b == 0) { x = 1; y = 0; return a; }  // Điều kiện dừng: gcd(a, 0) = a
        long long x1, y1;
        long long g = extgcd(b, a % b, x1, y1);   // Đệ quy Euclid chuẩn
        x = y1;
        y = x1 - (a / b) * y1;                     // Truy hồi tìm nghiệm từ kết quả đệ quy
        return g;                                   // Trả về gcd(a, b)
    }

    // Tính nghịch đảo modular: tìm x sao cho a*x ≡ 1 (mod m)
    // Giải phương trình a*x + m*y = 1 bằng Euclid mở rộng
    long long modInverse(long long a, long long m) {
        long long x, y;
        extgcd(a, m, x, y);                         // Giải a*x + m*y = gcd(a,m) = 1 (vì gcd=1)
        return (x % m + m) % m;                     // Đảm bảo kết quả trong [0, m-1]
    }

    // Hàm CRT: giải hệ phương trình x ≡ a_i (mod m_i)
    // a: vector các số dư, m: vector các modulo (nguyên tố cùng nhau đôi một)
    long long crt(vector<long long>& a, vector<long long>& m) {
        long long M = 1;
        for (long long mi : m) M *= mi;             // Bước 1: M = tích tất cả các modulo

        long long x = 0;
        for (int i = 0; i < (int)a.size(); i++) {
            long long Mi = M / m[i];                 // Bước 2: M_i = M / m_i
            long long inv = modInverse(Mi % m[i], m[i]); // Bước 3: nghịch đảo M_i mod m_i
            // Dùng __int128 để tránh tràn số khi nhân 3 số lớn (a_i * M_i * inv)
            long long term = (__int128)a[i] * Mi % M * inv % M;
            x = (x + term) % M;                      // Bước 4: cộng dồn vào nghiệm tổng
        }
        return (x + M) % M;                          // Đảm bảo nghiệm không âm
    }

    int main() {
        int k;
        cin >> k;                                    // Số lượng phương trình trong hệ
        vector<long long> a(k), m(k);
        for (int i = 0; i < k; i++) cin >> a[i] >> m[i]; // Đọc lần lượt a_i và m_i
        cout << crt(a, m) << "\n";                   // In nghiệm duy nhất modulo M
        return 0;
    }
    ```

=== "Python"

    ```python
    # Euclid mở rộng: trả về (gcd, x, y) sao cho a*x + b*y = gcd(a, b)
    def extgcd(a, b):
        if b == 0:
            return a, 1, 0                # Điều kiện dừng: gcd(a, 0) = a
        g, x1, y1 = extgcd(b, a % b)      # Đệ quy Euclid: gcd(b, a % b)
        return g, y1, x1 - (a // b) * y1  # Truy hồi tính x, y

    # Nghịch đảo modular của a modulo m
    # Trả về x sao cho a*x ≡ 1 (mod m), giả sử gcd(a, m) = 1
    def mod_inverse(a, m):
        g, x, _ = extgcd(a, m)
        return x % m                      # Đảm bảo kết quả dương

    # Giải hệ phương trình đồng dư CRT
    # a: list số dư, m: list modulo (nguyên tố cùng nhau đôi một)
    def crt(a, m):
        M = 1
        for mi in m:
            M *= mi                       # M = tích các modulo
        x = 0
        for ai, mi in zip(a, m):          # Duyệt từng phương trình trong hệ
            Mi = M // mi                   # M_i = M / m_i
            inv = mod_inverse(Mi % mi, mi) # Nghịch đảo M_i modulo m_i
            x = (x + ai * Mi * inv) % M   # Cộng dồn: x += a_i * M_i * M_i^(-1)
        return x

    k = int(input())                      # Số phương trình
    a, m = [], []
    for _ in range(k):
        ai, mi = map(int, input().split()) # Đọc a_i, m_i
        a.append(ai)
        m.append(mi)
    print(crt(a, m))                      # In nghiệm
    ```

---

## 5. Các trường hợp đặc biệt và lưu ý

### Khi modulo không nguyên tố cùng nhau

Nếu $m_i$ và $m_j$ không nguyên tố cùng nhau, hệ có thể vô nghiệm hoặc có nhiều nghiệm modulo $LCM(m_1, \ldots, m_k)$. Cách xử lý:

1. **Ghép từng cặp:** Với hai phương trình $x \equiv a_1 \pmod{m_1}$, $x \equiv a_2 \pmod{m_2}$, tồn tại nghiệm khi $a_1 \equiv a_2 \pmod{gcd(m_1, m_2)}$.
2. **Nghiệm chung:** $x \equiv x_0 \pmod{LCM(m_1, m_2)}$, tìm $x_0$ bằng Extended Euclid kết hợp CRT.

**Ví dụ số:** $x \equiv 2 \pmod{4}$, $x \equiv 4 \pmod{6}$. $\gcd(4,6) = 2$; kiểm tra: $2 \equiv 4 \pmod{2}$? $0 \equiv 0$ ✓ → có nghiệm. Liệt kê: $x \in \{2, 6, 10, 14, \dots\}$ gặp $\{4, 10, 16, \dots\}$ tại $x = 10$ (mod $LCM = 12$). Ngược lại $x \equiv 1 \pmod{4}$, $x \equiv 2 \pmod{6}$: $1 \not\equiv 2 \pmod{2}$ → **vô nghiệm** (số lẻ không thể chẵn).

### Khi $a_i \ge m_i$

Trong thực tế, $a_i$ có thể lớn hơn $m_i$. Hãy rút gọn $a_i \gets a_i \bmod m_i$ trước khi tính, vì $x \equiv a_i \pmod{m_i}$ và $x \equiv a_i \bmod m_i \pmod{m_i}$ là tương đương.

### Tràn số

Khi tính $M = \prod m_i$, $M$ có thể rất lớn (vượt quá $10^{18}$). Trong C++, dùng `__int128` hoặc xử lý số lớn. Trong Python, số nguyên tự động mở rộng không giới hạn.

### Thuật toán Garner

Khi cần lưu nghiệm dưới dạng hỗn hợp (mixed-radix) thay vì modulo $M$, dùng **Garner's Algorithm**. Garner biểu diễn nghiệm thành $x = x_0 + x_1 \cdot m_1 + x_2 \cdot (m_1 \cdot m_2) + \ldots$ với $0 \le x_i < m_{i+1}$. Điều này hữu ích khi $M$ quá lớn để lưu trực tiếp, nhưng cần so sánh hoặc in nghiệm.

### Lỗi thường gặp

```cpp
// SAI: ghép 2 phương trình mà không kiểm tra điều kiện tương thích
// x ≡ 1 (mod 4), x ≡ 2 (mod 6): code CRT chuẩn cho ra số,
// nhưng 1 ≢ 2 (mod 2) → hệ VÔ NGHIỆM, đáp án đó là rác!

// ĐÚNG: luôn kiểm tra (a1 - a2) % gcd(m1, m2) == 0 trước khi ghép
long long g = std::gcd(m1, m2);
if ((a1 - a2) % g != 0) return NO_SOLUTION;
```

- **Nhân $M = \prod m_i$ tràn `long long`:** $M$ dễ vượt $10^{18}$ với $k \ge 3$ modulo lớn — dùng `__int128` cho mọi phép nhân trung gian, hoặc chuyển sang Garner.
- **Quên rút gọn $a_i \gets a_i \bmod m_i$:** $a_i$ âm hoặc $\ge m_i$ làm lệch mọi bước sau — chuẩn hóa ngay khi đọc input.

---

## 6. Bài tập luyện tập

| Mã bài | Tên bài tập | Độ khó | Kiểu bài tập (Bản chất) | Bài học lý thuyết |
| :--- | :--- | :---: | :--- | :--- |
| `crt-pair` | [CRT hai phương trình](https://fptoj.com/problem/crt-pair) | ⭐ | CRT cơ bản 2 phương trình | [Định lý Thặng dư Trung Hoa](crt.md) |
| `crt-inv` | [CRT với dư bằng 1](https://fptoj.com/problem/crt-inv) | ⭐ | CRT trường hợp đặc biệt | [Định lý Thặng dư Trung Hoa](crt.md) |
| `crt` | [Định Lý Thặng Dư Trung Hoa](https://fptoj.com/problem/crt) | ⭐⭐⭐ | CRT tổng quát | [Định lý Thặng dư Trung Hoa](crt.md) |
| `crt-basic` | [CRT cơ bản](https://fptoj.com/problem/crt-basic) | ⭐⭐ | CRT nhiều phương trình | [Định lý Thặng dư Trung Hoa](crt.md) |
| `euclid-crt` | [Định lý thặng dư Trung Hoa](https://fptoj.com/problem/euclid-crt) | ⭐⭐⭐⭐ | CRT với Extended Euclid | [Euclid & Modular Inverse](euclid-modular-inverse.md) |
| `crt-prime` | [CRT với modulo nguyên tố](https://fptoj.com/problem/crt-prime) | ⭐⭐ | CRT modulo nguyên tố | [Định lý Thặng dư Trung Hoa](crt.md) |
| `crt-large` | [CRT nhiều phương trình](https://fptoj.com/problem/crt-large) | ⭐⭐⭐ | CRT với $k \le 100$ | [Định lý Thặng dư Trung Hoa](crt.md) |
| `crt-garner` | [CRT thuật toán Garner](https://fptoj.com/problem/crt-garner) | ⭐⭐⭐ | Thuật toán Garner | [Định lý Thặng dư Trung Hoa](crt.md) |

### Tham khảo thêm

| Bài | Nền tảng | Độ khó | Mô tả |
|---|---|---|---|
| [Hackerrank - Number Of Ways](https://www.hackerrank.com/challenges/number-of-ways) | Hackerrank | ⭐⭐⭐⭐ | Ứng dụng CRT giải hệ modular lớn |

