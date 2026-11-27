# Bài 97: DP on Broken Profile - Quy Hoạch Động Lát Gạch

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** CP-Algorithms - Dynamic Programming on Broken Profile, CSES Problem Set

---

## 1. Bản chất vấn đề

### Bài toán kinh điển (Counting Tilings)

Cho lưới kích thước $N \times M$ với một chiều nhỏ (thường $N \le 10 \dots 12$) và chiều còn lại lớn ($M \le 1000$). Hãy đếm số cách lát kín lưới bằng các viên gạch domino kích thước $1 \times 2$ và $2 \times 1$ (chia lấy dư cho $10^9 + 7$).

- **Vì sao Bitmask từng hàng lại dễ chậm?** Nếu chuyển trạng thái từ cả cột `mask_cur` sang cả cột `mask_next` trong một bước, số cặp chuyển là $O(2^N \cdot 2^N) = O(4^N)$ mỗi cột (với $N=12$, $4^{12} \approx 1.6 \times 10^7$ mỗi cột $\Rightarrow$ quá chậm!).
- **DP on Broken Profile (duyệt từng ô một):** Thay vì nhảy nguyên cả cột, ta xét **từng ô $(i, j)$** theo thứ tự từng cột, từng hàng. Khi đó đường biên ("profile") giữa các ô đã xét và chưa xét luôn gồm đúng $N$ ô. Mỗi ô chỉ có tối đa 2 lựa chọn (đặt gạch dọc hay ngang) $\Rightarrow$ thời gian chuyển trạng thái giảm mạnh xuống **$O(N \cdot M \cdot 2^N)$**!

---

## 2. Tư duy cốt lõi

Hãy hình dung ranh giới (profile) là một đường gấp khúc cắt ngang qua lưới, tách phần đã điền (bên trái) và phần chưa điền (bên phải).

Xét **cách cài đặt đơn giản theo từng cột + sinh chuyển trạng thái (chỉ duyệt các chuyển tiếp hợp lệ):**
- Giả sử `mask` (độ dài $N$ bit) biểu thị các ô trên cột hiện tại **đã bị gạch ngang từ cột trước nhô sang** (bit $i$ bằng `1` nghĩa là ô ở hàng $i$ của cột hiện tại đã kín chỗ).
- Để lấp đầy toàn bộ cột hiện tại và sinh `next_mask` nhô sang cột kế tiếp, tại từng hàng $i = 0 \dots N-1$:
  - **Nếu bit $i$ của `mask` đã là `1`:** Ô $(i, j)$ đã có gạch rồi $\Rightarrow$ chỉ việc đi tiếp xuống hàng $i + 1$ (không nhô gì sang cột mới tại hàng $i$).
  - **Nếu bit $i$ của `mask` là `0`:** Ô $(i, j)$ đang trống! Để lấp kín nó, ta chỉ có đúng 2 cách:
    1. **Đặt gạch ngang $1 \times 2$:** Lấp ô $(i, j)$ và nhô sang ô $(i, j+1)$ $\Rightarrow$ bật bit $i$ trong `next_mask`.
    2. **Đặt gạch dọc $2 \times 1$:** Chỉ làm được nếu $i + 1 < N$ và ô $(i+1, j)$ cũng đang trống (bit $i+1$ của `mask` là `0`) $\Rightarrow$ nhảy thẳng xuống hàng $i + 2$, không bật bit nào ở `next_mask`.

Khi xử lý hết cột cuối ($j = M$), đáp án chính là `dp[M][0]` (không được phép còn phần gạch nào nhô ra ngoài biên phải!).

### Biến thể ô-từng-ô ($O(N \cdot M \cdot 2^N)$ thực sự)

Nếu $N$ lên tới $15$ hoặc $16$ và ta không muốn sinh đệ quy từng cột, có thể lưu trạng thái `dp[mask]` và chuyển từng ô $i = 0 \dots N-1$ qua $N$ bước con ngay trong cột:
- Lúc đang đứng ở ô hàng $i$, `mask` lưu tình trạng của đúng đường gấp khúc độ dài $N$.
- Mỗi ô chỉ tạo ra tối đa $2$ trạng thái kế tiếp nên tổng số chuyển đổi trên toàn cột luôn $\le 2 \cdot N \cdot 2^N$.

---

## 3. Phân tích tính đúng đắn & Độ phức tạp

- **Tính không trùng lặp:** Mỗi ô trống có đúng hai cách phủ không giao nhau (gạch ngang đè sang phải, hoặc gạch dọc đè xuống dưới), còn ô đã phủ từ trước bắt buộc bỏ qua $\Rightarrow$ mọi cấu hình lát gạch hợp lệ tương ứng 1-1 với một dãy chuyển tiếp duy nhất.
- **Điều kiện biên:** Lưới có số ô $N \cdot M$ lẻ thì đáp án luôn bằng $0$ (mỗi domino phủ đúng 2 ô). Kết quả cuối cùng bắt buộc lấy ở `mask = 0` sau cột $M$.

| Cách cài đặt | Thời gian | Không gian | Khi nào dùng |
| :--- | :---: | :---: | :--- |
| Sinh chuyển tiếp `mask -> next_mask` | $O(M \cdot 3^N)$ (thực tế nhẹ hơn nhiều) | $O(2^N)$ | $N \le 10 \dots 12$, code cực kỳ dễ đọc |
| Chuyển từng ô (Broken Profile thuần) | $O(N \cdot M \cdot 2^N)$ | $O(2^N)$ | $N$ tới $15 \dots 18$, giới hạn chặt |

---

## Code minh họa

### Đếm số cách lát gạch $1 \times 2$ và $2 \times 1$ trên lưới $N \times M$ (CSES - Counting Tilings)

=== "C++"

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;

    const long long MOD = 1e9 + 7;
    int n, m;

    // Sinh tất cả next_mask hợp lệ khi điền kín phần còn lại của một cột từ `mask`
    void generateTransitions(int row, int mask, int nextMask,
                             long long ways, vector<long long>& nextDp) {
        if (row == n) {
            nextDp[nextMask] = (nextDp[nextMask] + ways) % MOD;
            return;
        }
        if (mask & (1 << row)) {
            // Ô (row) đã được lấp từ cột trước nhô sang -> bỏ qua tới row + 1
            generateTransitions(row + 1, mask, nextMask, ways, nextDp);
        } else {
            // Lựa chọn 1: Đặt gạch ngang 1x2 -> nhô sang cột tiếp theo ở vị trí `row`
            generateTransitions(row + 1, mask, nextMask | (1 << row), ways, nextDp);
            // Lựa chọn 2: Đặt gạch dọc 2x1 -> cần row + 1 < n và ô (row + 1) còn trống
            if (row + 1 < n && !(mask & (1 << (row + 1)))) {
                generateTransitions(row + 2, mask, nextMask, ways, nextDp);
            }
        }
    }

    int main() {
        ios_base::sync_with_stdio(false);
        cin.tie(nullptr);

        cin >> n >> m;
        // Lưu ý: luôn đặt chiều nhỏ làm n nếu lưới có thể xoay (khi bài toán đối xứng)
        vector<long long> dp(1 << n, 0);
        dp[0] = 1; // Trước cột đầu tiên không có gạch nào nhô từ trái sang

        for (int col = 0; col < m; col++) {
            vector<long long> nextDp(1 << n, 0);
            for (int mask = 0; mask < (1 << n); mask++) {
                if (dp[mask] == 0) continue;
                generateTransitions(0, mask, 0, dp[mask], nextDp);
            }
            dp.swap(nextDp);
        }

        // Sau cột cuối cùng, không được còn gạch nhô ra ngoài biên phải (mask = 0)
        cout << dp[0] << "\n";
        return 0;
    }
    ```

=== "Python"

    ```python
    import sys
    input = sys.stdin.readline

    MOD = 10**9 + 7

    def solve():
        n, m = map(int, input().split())
        if (n * m) % 2 == 1:
            print(0)
            return

        # Cài đặt theo từng ô (Broken Profile O(N * M * 2^N)) - nhanh trên Python
        dp = [0] * (1 << n)
        dp[0] = 1

        for _ in range(m):
            for row in range(n):
                ndp = [0] * (1 << n)
                bit = 1 << row
                for mask in range(1 << n):
                    ways = dp[mask]
                    if ways == 0:
                        continue
                    if mask & bit:
                        # Ô đã có gạch nhô từ trước -> xóa bit để mở đường cho phần mới
                        ndp[mask ^ bit] = (ndp[mask ^ bit] + ways) % MOD
                    else:
                        # Đặt gạch ngang 1x2 -> bật bit tại row (nhô sang phải)
                        ndp[mask | bit] = (ndp[mask | bit] + ways) % MOD
                        # Đặt gạch dọc 2x1 -> cần ô (row+1) đang ở trạng thái trống
                        # Lưu ý trong vòng từng ô: chỉ khi bit (row+1) == 0 mới nối dọc được!
                        if row + 1 < n and not (mask & (1 << (row + 1))):
                            nmask = mask | (1 << (row + 1))
                            ndp[nmask] = (ndp[nmask] + ways) % MOD
                dp = ndp

        print(dp[0])

    if __name__ == "__main__":
        solve()
    ```

---

## 4. Lỗi thường gặp (SAI / ĐÚNG)

- **Lấy nhầm kết quả sau cột cuối:** Tổng mọi `dp[mask]` ở cột cuối là **sai** vì các trạng thái `mask != 0` tương ứng với gạch nhô tràn ra ngoài mép bảng. Đáp án đúng **luôn là `dp[0]`**.
- **Nhầm thứ tự xét hàng trong bản từng ô:** Với vòng lặp từng ô $(0 \to N-1)$, khi đặt gạch dọc tại hàng `row`, bạn **bật bit `row + 1`** (và KHÔNG bật bit `row`) để đánh dấu ô `row + 1` đã bị chiếm trước khi con trỏ vòng lặp bước xuống `row + 1`!
- **Quên hoán đổi chiều nhỏ nếu cho phép:** Nếu đề cho $N = 1000, M = 10$, chỉ cần đổi vai trò $N \leftrightarrow M$ trước khi DP để giữ trạng thái $2^{\min(N, M)}$ luôn nhỏ!

---

## 5. Bài tập luyện tập

### Bài tập trên FPTOJ

| Mã bài | Tên bài tập | Độ khó | Yêu cầu |
| :--- | :--- | :---: | :--- |
| `bp-domino-tiling` | [Lát gạch Domino (Broken Profile)](https://fptoj.com/problem/bp-domino-tiling) | ⭐⭐⭐ | Đếm số cách lát kín bảng $N \times M$ ($N \le 10, M \le 1000$) bằng domino $1 \times 2, 2 \times 1$, mod $10^9 + 7$. |
| `bp-broken-grid` | [Lát gạch trên bảng có ô hỏng](https://fptoj.com/problem/bp-broken-grid) | ⭐⭐⭐⭐ | Đếm số cách lát kín các ô trống (`.`) trên bảng $N \times M$ ($N \le 10, M \le 100$) có ô hỏng (`#`), mod $10^9 + 7$. |
| `bp-l-tiling` | [Lát gạch chữ L (Tromino)](https://fptoj.com/problem/bp-l-tiling) | ⭐⭐⭐⭐⭐ | Đếm số cách lát kín bảng $N \times M$ ($N \le 8, M \le 100$) bằng gạch chữ L (3 ô, xoay 4 hướng), mod $10^9 + 7$. |

### Bài tập tham khảo thêm

| Bài toán | Nền tảng | Độ khó | Yêu cầu |
| :--- | :--- | :---: | :--- |
| [CSES - Counting Tilings](https://cses.fi/problemset/task/2181) | CSES | ⭐⭐⭐⭐ | Đếm số cách lát domino $1 \times 2, 2 \times 1$ trên lưới $N \times M$ |
| [SPOJ - M3TILE](https://www.spoj.com/problems/M3TILE/) | SPOJ | ⭐⭐⭐ | Lát gạch bảng $3 \times N$ |
| [Codeforces 70E / AtCoder ABC290 Ex](https://atcoder.jp/) | CF / AtCoder | ⭐⭐⭐⭐ | Các biến thể DP Bitmask trên biên / cây |

---

**Bài trước:** [← Bài 96: Tối ưu Quy Hoạch Động 1 Chiều (1D/1D DP Optimization)](dp-1d1d.md) | **Bài tiếp theo:** [Bài 98: Aho-Corasick →](aho-corasick.md)
