# Bài 1: Độ Phức Tạp Thời Gian - Tại Sao Thuật Toán Chạy Chậm Như Rùa?

> **Tác giả:** Hà Trí Kiên
> **Nội dung tham khảo từ:** VNOI Wiki - Độ phức tạp thời gian, Topcoder - Computational Complexity

## 1. Chuyện gì đang xảy ra?

### Bài toán: Ai là người chạy nhanh nhất?

Giả sử bạn có **2 người bạn** - An và Bình - cùng nhận nhiệm vụ tìm một cuốn sách trong thư viện có **N** kệ sách.

- **An** lười biếng: cô ấy đi từ kệ đầu tiên đến kệ cuối cùng, lần lượt kiểm tra từng kệ một. Nếu N = 1.000.000 kệ, cô ấy phải kiểm tra cả 1.000.000 kệ! 😴

- **Bình** thông minh hơn: vì sách đã được xếp theo thứ tự ABC, Bình chia đôi giá sách, loại bỏ một nửa mỗi lần. Với N = 1.000.000 kệ, Bình chỉ cần kiểm tra khoảng **20 lần** là xong! 🚀

Cùng một bài toán, nhưng **thuật toán khác nhau** → thời gian chạy khác nhau **cực kỳ lớn**!

**Câu hỏi đặt ra:** Làm sao để biết thuật toán nào nhanh, thuật toán nào chậm **trước khi** chạy thử? → Đó chính là lý do ta cần học về **Độ phức tạp thời gian**!

---

## 2. Toán học bổ trợ: Giải ngố cấp tốc

### Logarit (log) là gì? Tại sao nó xuất hiện khắp nơi?

Bạn không cần học đạo hàm hay tích phân để hiểu logarit! Hãy nghĩ đơn giản thế này:

> **Logarit cơ số 2 của N** (viết là log₂N) = **Số lần bạn phải nhân 2 với chính nó để ra N**.

Ví dụ:
- log₂(8) = 3, vì 2 × 2 × 2 = 8 (nhân 3 lần)
- log₂(16) = 4, vì 2 × 2 × 2 × 2 = 16 (nhân 4 lần)
- log₂(1.000.000) ≈ 20

**Vì sao quan trọng?** Khi một thuật toán "chia đôi" vấn đề mỗi bước (như Bình tìm sách), số bước cần thiết chính là log₂N!

**Mẹo nhớ nhanh:**
| N | log₂N (xấp xỉ) |
|---|---|
| 1.000 | 10 |
| 1.000.000 | 20 |
| 1.000.000.000 | 30 |

> **Lưu ý:** Trong lập trình thi đấu, ta viết gọn là `log N` mà không cần ghi cơ số. Vì log₂N, log₁₀N, lnN chỉ khác nhau một hằng số, mà hằng số thì ta... bỏ qua! (Sẽ giải thích bên dưới).

### O-lớn (Big-O) - Chiếc "máy đo" tốc độ thuật toán

Thay vì đếm chính xác "thuật toán chạy 1.532.789 bước", ta chỉ cần biết **nó tăng nhanh như thế nào khi dữ liệu đầu vào tăng**.

**O-lớn** là cách viết tắt để nói: "Khi N đủ lớn, thuật toán này chạy không quá c × (một hàm nào đó) bước".

Ví dụ:
- `f(n) = 2n + 10` → O(n), vì khi n đủ lớn, 10 chả là gì cả, 2n cũng chỉ là "n với hệ số nhỏ"
- `f(n) = 3n² + 5n + 100` → O(n²), vì khi n đủ lớn, 3n² "nuốt chửng" mọi thứ còn lại

**Nguyên tắc đơn giản:** Chỉ giữ **số mũ cao nhất**, bỏ **hệ số** và **số hạng nhỏ hơn**.

---

## 3. Thuật toán này hoạt động như thế nào?

### Bảng "tốc độ" các độ phức tạp thường gặp

Hãy tưởng tượng máy tính chạy khoảng **100.000.000 phép tính/giây** (10⁸). Bảng dưới cho biết **N lớn nhất** để thuật toán chạy xong trong **1 giây**:

| O(?) | Tên gọi | N tối đa | Ví dụ thực tế |
|------|---------|-----------|---------------|
| O(1) | Hằng số | Tùy ý | Lấy phần tử đầu mảng |
| O(log N) | Logarit | 10¹⁸ | Tìm kiếm nhị phân |
| O(N) | Tuyến tính | 10⁸ | Duyệt mảng |
| O(N log N) | "N log N" | 10⁶ | Merge Sort, Quick Sort |
| O(N²) | Bậc 2 | 10⁴ (10.000) | 2 vòng lặp lồng nhau |
| O(N³) | Bậc 3 | 500 | 3 vòng lặp lồng nhau |
| O(2ᴺ) | Mũ | 20 | Quay lui thử mọi trường hợp |
| O(N!) | Giai thừa | 11 | Sinh tất cả hoán vị |

### Ví dụ trực quan: Bạn đi từ Hà Nội vào TP.HCM

- **O(1):** Bạn có cánh cửa thần kỳ → Bước 1 bước là tới. Siêu nhanh!
- **O(log N):** Mỗi bước bạn đi gấp đôi bước trước (1km, 2km, 4km, 8km...) → Chỉ cần ~20 bước là tới!
- **O(N):** Bạn đi bộ đều đặn 1km/bước → Cần 1.700 bước (km).
- **O(N²):** Bạn đi 1km, rồi quay lại đi 1km, rồi lại quay lại... mỗi "vòng" chỉ tiến thêm 1km → Cần 1.700² ≈ 2.900.000 bước. Kiệt sức!
- **O(2ᴺ):** Bạn thử MỌI con đường có thể (kể cả đường vòng qua Lào, Campuchia...) → Cần 2¹⁷⁰⁰ con đường. Không bao giờ xong!

### Cách tính O-lớn cho code - 3 quy tắc vàng

**Quy tắc 1:** Vòng lặp `for i = 1 to N` → O(N)

**Quy tắc 2:** Hai vòng lặp **liên tiếp** (nối đuôi nhau) → **Cộng** độ phức tạp.

```
for i = 1 to N:     // O(N)
    ...
for j = 1 to M:     // O(M)
    ...
→ Tổng: O(N + M)
```

**Quy tắc 3:** Hai vòng lặp **lồng nhau** → **Nhân** độ phức tạp.

```
for i = 1 to N:         // O(N)
    for j = 1 to M:     // O(M)
        ...
→ Tổng: O(N × M)
```

### Ví dụ phân tích code

**Ví dụ 1: Hai vòng lặp nối tiếp**
```cpp
int sum = 0;
for (int i = 0; i < n; i++) sum += i;   // O(n)
for (int j = 0; j < n; j++) sum += j;   // O(n)
// Tổng: O(n) + O(n) = O(2n) = O(n)
```

**Ví dụ 2: Hai vòng lặp lồng nhau**
```cpp
int sum = 0;
for (int i = 0; i < n; i++) {       // n lần
    for (int j = 0; j < n; j++) {   // n lần
        sum += j;
    }
}
// Tổng: O(n) × O(n) = O(n²)
```

**Ví dụ 3: Vòng trong chạy ít hơn**
```cpp
int sum = 0;
for (int i = 0; i < n; i++) {       // n lần
    for (int j = 0; j < i; j++) {   // 0 + 1 + 2 + ... + (n-1) = n(n-1)/2 lần
        sum += j;
    }
}
// Tổng: n(n-1)/2 = O(n²)  ← Vẫn là O(n²) vì bỏ hệ số!
```

### Kĩ thuật Hai con trỏ - Kẻ lừa đảo!

Xem đoạn code này:
```cpp
int j = 0;
for (int i = 0; i < n; i++) {              // i chạy từ 0 đến n
    while (j < n && a[i] - a[j] > d)       // j cũng chỉ chạy từ 0 đến n
        j++;
}
```

Thoạt nhìn: vòng lặp lồng nhau → O(n²)?

**Sai!** Hãy đếm tổng số lần `j++` chạy trong TOÀN BỘ chương trình: j chỉ tăng từ 0 đến n, mỗi giá trị tối đa 1 lần. Vậy tổng = O(n).

→ Tổng cộng: i chạy n lần + j chạy n lần = O(n) + O(n) = **O(n)**!

> **Bài học:** Không phải cứ thấy vòng lặp lồng là O(n²)! Phải xem xét kĩ biến bên trong chạy bao nhiêu lần **tổng cộng**.

---

## 4. Bắt tay vào Code nào!

### Ví dụ: Đo thời gian chạy thực tế

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n = 100000000; // 10^8
    
    // ===== O(N) =====
    clock_t start = clock();
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        sum += i;
    }
    clock_t end = clock();
    cout << "O(N): " << (double)(end - start) / CLOCKS_PER_SEC << " giay" << endl;
    
    // ===== O(N^2) - chỉ chạy với n nhỏ =====
    n = 10000; // Giảm n xuống vì O(n^2) với n=10^8 sẽ rất lâu
    start = clock();
    sum = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            sum += i + j;
        }
    }
    end = clock();
    cout << "O(N^2) voi n=10000: " << (double)(end - start) / CLOCKS_PER_SEC << " giay" << endl;
    
    return 0;
}
```

### Ví dụ: Tìm kiếm nhị phân - O(log N)

```cpp
// Tìm kiếm nhị phân: tìm xem 'target' có trong mảng đã sắp xếp không
int binary_search(int a[], int n, int target) {
    int lo = 0, hi = n - 1;        // Giới hạn tìm kiếm: từ đầu đến cuối mảng
    
    while (lo <= hi) {              // Khi còn khoảng để tìm
        int mid = lo + (hi - lo) / 2;  // Chọn vị trí giữa (tránh tràn số!)
        
        if (a[mid] == target)
            return mid;             // Tìm thấy!
        else if (a[mid] < target)
            lo = mid + 1;           // Target nằm bên phải → bỏ nửa trái
        else
            hi = mid - 1;           // Target nằm bên trái → bỏ nửa phải
    }
    return -1;  // Không tìm thấy
}
// Mỗi bước giảm một nửa → O(log N)
```

### Code Python

```python
import time

# ===== O(N) =====
n = 10**8
start = time.time()
s = 0
for i in range(n):
    s += i
print(f"O(N): {time.time() - start:.3f} giay")

# ===== O(N^2) =====
n = 10000
start = time.time()
s = 0
for i in range(n):
    for j in range(n):
        s += i + j
print(f"O(N^2) voi n=10000: {time.time() - start:.3f} giay")
```

---

## 5. Lưu ý / Cạm bẫy hay gặp

### Bẫy 1: O(n²) với n = 10⁵ → TLE (Time Limit Exceeded)!

Nếu đề cho n ≤ 10⁵, thì O(n²) = 10¹⁰ phép tính → **quá 1 giây**! Bạn cần tìm thuật toán O(n log n) hoặc O(n).

**Mẹo:** Nhìn n trong đề bài, tra bảng ở trên để biết thuật toán nào "đọ" được.

### Bẫy 2: Hằng số ẩn - Kẻ thù giấu mặt

Hai thuật toán cùng O(n) **không có nghĩa** chạy nhanh như nhau!

```cpp
// Cách 1: O(n), hằng số nhỏ
for (int i = 0; i < n; i++) sum++;

// Cách 2: O(n), hằng số lớn (gấp 1000 lần!)
for (int i = 0; i < n; i++)
    for (int k = 0; k < 1000; k++) sum++;
```

Cả hai đều O(n), nhưng cách 2 chậm gấp 1000 lần!

### Bẫy 3: Tràn số khi tính mid

```cpp
// SAI: có thể tràn số khi lo + hi > 2 tỷ
int mid = (lo + hi) / 2;

// ĐÚNG: tránh tràn số
int mid = lo + (hi - lo) / 2;
```

### Bẫy 4: O(1) ≠ "chạy nhanh"

O(1) chỉ nghĩa là **không phụ thuộc vào n**. Nó có thể là 1 phép tính, nhưng cũng có thể là 1 tỷ phép tính (hằng số rất lớn)!

Ví dụ: Một thuật toán quay lui chơi cờ vua là O(1) vì bàn cờ có giới hạn cố định. Nhưng "hằng số" đó lớn đến mức... vũ trụ cũng không đủ thời gian! 😄

### Bẫy 5: Đừng quên log N trong phân tích

Khi gặp code kiểu này:
```cpp
for (int i = 1; i <= n; i++) {
    for (int j = i; j <= n; j += i) {  // j += i, không phải j++
        // ...
    }
}
```

Vòng trong chạy n/1 + n/2 + n/3 + ... + n/n = n × (1 + 1/2 + 1/3 + ... + 1/n) ≈ n × log N

→ Độ phức tạp là **O(n log n)**, không phải O(n²)!

---

**Chúc mừng!** Bạn đã nắm được nền tảng quan trọng nhất trong lập trình thi đấu. Từ giờ, mỗi khi viết code, hãy tự hỏi: "Thuật toán của mình có độ phức tạp là bao nhiêu? Nó có kịp chạy trong thời gian giới hạn không?"

---

## Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Weird Algorithm](https://cses.fi/problemset/task/1068) | CSES | ⭐ | Độ phức tạp cơ bản |
| [CSES - Repetitions](https://cses.fi/problemset/task/1069) | CSES | ⭐ | Độ phức tạp tuyến tính |
| [CSES - Increasing Array](https://cses.fi/problemset/task/1094) | CSES | ⭐ | Phân tích độ phức tạp |

## Bài viết liên quan

- [Bài 2: Thuật toán sắp xếp](02-thuat-toan-sap-xep.md)
- [Bài 3: Tìm kiếm nhị phân](03-tim-kiem-nhi-phan.md)

## Tài liệu tham khảo

- [VNOI Wiki - Độ phức tạp thời gian](https://wiki.vnoi.info/algo/basic/computational-complexity)
- [Topcoder - Computational Complexity Section 1](https://www.topcoder.com/community/data-science/data-science-tutorials/computational-complexity-section-1/)
- [Topcoder - Computational Complexity Section 2](https://www.topcoder.com/community/data-science/data-science-tutorials/computational-complexity-section-2/)
- [GeeksforGeeks - Time Complexity Analysis](https://www.geeksforgeeks.org/dsa/understanding-time-complexity-with-simple-examples/)
- [YouTube - Big O Notation (freeCodeCamp)](https://www.youtube.com/watch?v=Mo4vesaut8g)

**Bài tiếp theo:** [Thuật toán sắp xếp →](02-thuat-toan-sap-xep.md)
