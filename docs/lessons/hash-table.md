# Bài 16: Hash Table (Bảng Băm)

> **Tác giả:** FPTOJ Team<br>
> **Nội dung tham khảo từ:** VNOI Wiki - Bảng băm

---

## Bản chất vấn đề

Bài toán cơ bản: Cho một tập hợp $N$ phần tử, xây dựng cấu trúc dữ liệu hỗ trợ ba thao tác — **chèn**, **tìm kiếm**, **xóa** — với tốc độ nhanh nhất có thể.

Một cách tiếp cận trực tiếp là sử dụng mảng hoặc danh sách liên kết, duyệt tuần tự để tìm phần tử. Độ phức tạp mỗi thao tác là $O(N)$. Khi $N$ lớn và số lượng truy vấn nhiều, cách này trở nên quá chậm.

Ví dụ, với 100.000 từ trong từ điển và 100.000 truy vấn, duyệt tuần tự tốn $O(N^2) = O(10^{10})$ phép tính — không khả thi.

**Câu hỏi cốt lõi:** Làm sao truy cập trực tiếp đến phần tử mong muốn mà không cần duyệt qua tất cả?

Giải pháp là **Hash Table** — một cấu trúc dữ liệu cho phép trung bình $O(1)$ cho mỗi thao tác chèn, tìm kiếm, xóa. Ý tưởng chính là sử dụng một **hàm băm** $h(key)$ để chuyển đổi key thành chỉ số trong mảng, từ đó truy cập trực tiếp đến vị trí lưu trữ.

---

## Tư duy cốt lõi

### Hàm băm (Hash Function)

Hàm băm $h$ nhận vào một key (số nguyên, xâu, hoặc bất kỳ kiểu dữ liệu nào) và trả về một chỉ số trong mảng $table[0..M-1]$:

$$h: key \rightarrow [0, M-1]$$

Một hàm băm tốt cần thỏa mãn ba tính chất:

- **Nhanh:** Tính được trong $O(1)$ hoặc $O(|key|)$
- **Phân phối đều:** Các key khác nhau nên rơi vào các vị trí khác nhau, tránh tập trung vào một vài ô
- **Xác định:** Cùng key luôn cho cùng giá trị hash

=== "C++"

    ```cpp
    int simpleHash(string s, int tableSize) {
        int h = 0; // h: giá trị băm đang xây dở
        for (char c : s)
            h = (h * 31 + c) % tableSize; // bước lăn: nhân 31 (số nguyên tố, rải đều) rồi cộng mã ký tự
        return h; // bước trả: chỉ số ô [0, M-1]
    }
    ```

=== "Python"

    ```python
    def simple_hash(s, table_size):
        h = 0  # h: giá trị băm đang xây dở
        for c in s:
            h = (h * 31 + ord(c)) % table_size  # bước lăn: nhân 31 rồi cộng mã ký tự
        return h  # bước trả: chỉ số ô [0, M-1]
    ```

Hệ số 31 là một số nguyên tố nhỏ, giúp phân phối đều. Giá trị `tableSize` nên chọn là số nguyên tố để giảm xung đột.

### Xử lý xung đột (Collision)

Hàm băm ánh xạ không gian key vô hạn vào mảng kích thước hữu hạn $M$, nên **xung đột là không thể tránh khỏi** — hai key khác nhau có thể cùng hash về một vị trí.

Có hai phương pháp chính để xử lý xung đột.

**Phương pháp 1: Chaining (Danh sách liên kết)**

Mỗi ô trong bảng băm là một danh sách liên kết. Khi nhiều key cùng hash về một ô, chúng được lưu trong cùng danh sách đó.

```mermaid
graph LR
    subgraph "Bảng băm (M = 5)"
        A0["[0]"] --> N0["∅"]
        A1["[1]"] --> B1["cat: 3"] --> B2["dog: 5"] --> N1["∅"]
        A2["[2]"] --> C1["bird: 2"] --> N2["∅"]
        A3["[3]"] --> N3["∅"]
        A4["[4]"] --> D1["fish: 1"] --> N4["∅"]
    end
```

Trong ví dụ trên, `"cat"` và `"dog"` cùng có hash bằng 1, nên chúng nằm trong cùng một danh sách tại ô `[1]`.

#### Trace từng bước insert / search / delete (chaining, `M = 5`)

Giả sử `h("cat") = 1`, `h("dog") = 1` (xung đột!), `h("bird") = 2`, `h("fish") = 4`.

| Bước | Thao tác | Tính `h(key)` | Danh sách tại ô đó trước → sau | Kết quả |
|:---:|---|---|---|---|
| 1 | `insert("cat", 3)` | `1` | `[1]: [] → [cat:3]` | chèn vào đầu chain |
| 2 | `insert("dog", 5)` | `1` | `[1]: [cat:3] → [cat:3, dog:5]` | xung đột → nối vào chain |
| 3 | `insert("bird", 2)` | `2` | `[2]: [] → [bird:2]` | ô trống, chèn mới |
| 4 | `search("dog")` | `1` | duyệt `[cat:3, dog:5]`: `cat` ≠ `dog`, `dog` = `dog` | tìm thấy → trả `5` |
| 5 | `search("fish")` | `4` | duyệt `[ ]`: rỗng | không thấy → `-1` / không tồn tại |
| 6 | `insert("fish", 1)` | `4` | `[4]: [] → [fish:1]` | chèn mới |
| 7 | `erase("cat")` | `1` | `[1]: [cat:3, dog:5] → [dog:5]` | xóa node `cat`, chain còn `dog` |
| 8 | `search("cat")` | `1` | duyệt `[dog:5]`: không có `cat` | không thấy → đã xóa thành công |

**Phương pháp 2: Open Addressing (Địa chỉ mở)**

Khi xung đột, ta tìm một ô trống khác trong bảng theo một quy tắc xác định:

| Chiến lược | Quy tắc tìm ô | Bước nhảy |
|---|---|---|
| Linear Probing | Thử $h(k)+1, h(k)+2, h(k)+3, \ldots$ | $1, 2, 3, \ldots$ |
| Quadratic Probing | Thử $h(k)+1^2, h(k)+2^2, h(k)+3^2, \ldots$ | $1, 4, 9, \ldots$ |
| Double Hashing | Dùng hàm băm thứ 2 $h_2(k)$ làm bước nhảy | $h_2(k), 2h_2(k), \ldots$ |

### So sánh hai phương pháp

| Tiêu chí | Chaining | Open Addressing |
|---|---|---|
| Dễ cài đặt | Dễ hơn | Khó hơn |
| Bộ nhớ | Nhiều hơn (con trỏ) | Ít hơn |
| Khi load factor cao | Vẫn hoạt động tốt | Rất chậm |
| Cache performance | Kém hơn (nhảy theo con trỏ) | Tốt hơn (truy cập tuần tự) |

### Load Factor và Rehashing

**Load factor** $\alpha$ là tỷ lệ giữa số phần tử và kích thước bảng:

$$\alpha = \frac{N}{M}$$

Khi $\alpha$ vượt quá ngưỡng (thường là 0.75), hiệu suất giảm do xung đột tăng. Lúc này cần **rehashing**: tạo bảng mới lớn gấp đôi, rồi đưa tất cả phần tử sang.

```matplotlib
import numpy as np

alpha = np.linspace(0.01, 0.95, 100)

chaining = 1 + alpha
open_addr = 1.0 / (1.0 - alpha)

fig, ax = plt.subplots(figsize=(10, 5))

ax.plot(alpha, chaining, label='Chaining: 1 + α', linewidth=2.5, color='#3498db')
ax.plot(alpha, open_addr, label='Open Addressing: 1/(1-α)', linewidth=2.5, color='#e74c3c')

ax.axvline(x=0.75, color='gray', linestyle='--', alpha=0.7, label='Ngưỡng khuyến nghị α = 0.75')
ax.axvspan(0.75, 0.95, alpha=0.08, color='red')

ax.annotate('α = 0.75\nOpen Addressing ≈ 4 probes',
            xy=(0.75, 4.0), xytext=(0.5, 6),
            fontsize=11, color='#e74c3c', fontweight='bold',
            arrowprops=dict(arrowstyle='->', color='#e74c3c', lw=1.5))

ax.set_xlabel('Load Factor α = N/M', fontsize=12)
ax.set_ylabel('Số lần trung bình (avg probes)', fontsize=12)
ax.set_title('Hiệu suất Hash Table theo Load Factor', fontsize=14, fontweight='bold')
ax.set_xlim(0, 0.95)
ax.set_ylim(0, 12)
ax.legend(fontsize=11, loc='upper left')
ax.grid(True, alpha=0.3)

plt.tight_layout()
```

### Thư viện chuẩn

=== "C++"

    ```cpp
    #include <unordered_map>
    #include <unordered_set>
    using namespace std;

    int main() {
        unordered_map<string, int> wordCount;

        wordCount["hello"] = 5;       // Chèn / cập nhật
        wordCount["world"] = 3;

        if (wordCount.find("hello") != wordCount.end())  // Tìm kiếm
            cout << "Tim thay: " << wordCount["hello"] << endl;

        wordCount.erase("hello");     // Xóa

        for (auto& [key, value] : wordCount)
            cout << key << ": " << value << endl;

        unordered_set<int> s;
        s.insert(5);
        s.insert(10);
        s.insert(5);       // Trùng lặp, không thêm

        if (s.count(5))
            cout << "5 co trong tap hop\n";

        cout << "So phan tu: " << s.size() << endl;  // 2
    }
    ```

=== "Python"

    ```python
    word_count = {}
    word_count["hello"] = 5      # Chèn / cập nhật
    word_count["world"] = 3

    if "hello" in word_count:    # Tìm kiếm
        print(f"Tim thay: {word_count['hello']}")

    del word_count["hello"]      # Xóa

    s = set()
    s.add(5)
    s.add(10)
    s.add(5)       # Trùng lặp, không thêm

    if 5 in s:
        print("5 co trong tap hop")

    print(len(s))    # 2
    ```

### Ứng dụng trong thi đấu

Hash table là công cụ cực kỳ phổ biến trong lập trình thi đấu. Bảng sau tổng hợp các mẫu bài toán thường gặp:

| Bài toán | Cấu trúc dùng | Ví dụ |
|---|---|---|
| Đếm tần suất xuất hiện | `unordered_map<value, count>` | Đếm số lần xuất hiện của mỗi phần tử |
| Kiểm tra trùng lặp | `unordered_set` | Mảng có phần tử giống nhau không? |
| Nhóm phần tử theo key | `unordered_map<key, vector>` | Group Anagrams |
| Two Sum | `unordered_map<value, index>` | Tìm 2 số có tổng bằng $X$ |
| Đếm ký tự trong xâu | `unordered_map<char, int>` | Kiểm tra xâu đối xứng |

**Ví dụ: Đếm tần suất**

=== "C++"

    ```cpp
    vector<int> a = {1, 2, 3, 2, 1, 1, 3, 2, 1};
    unordered_map<int, int> freq;
    for (int x : a)
        freq[x]++;

    for (auto& [val, count] : freq)
        cout << val << " xuat hien " << count << " lan\n";
    ```

=== "Python"

    ```python
    from collections import Counter
    a = [1, 2, 3, 2, 1, 1, 3, 2, 1]
    freq = Counter(a)
    print(freq)  # Counter({1: 4, 2: 3, 3: 2})
    ```

**Ví dụ: Two Sum — Tìm 2 số có tổng bằng $X$**

Ý tưởng: Duyệt mảng, với mỗi phần tử $a[i]$, kiểm tra $X - a[i]$ đã xuất hiện chưa bằng hash table.

=== "C++"

    ```cpp
    vector<int> twoSum(vector<int>& a, int target) {
        unordered_map<int, int> pos; // pos[giá trị] = chỉ số đã gặp (tra ngược O(1))
        for (int i = 0; i < a.size(); i++) {
            int complement = target - a[i]; // bước tính: số còn thiếu để đủ target
            if (pos.count(complement)) // bước tra: số thiếu đã gặp trước đó chưa?
                return {pos[complement], i}; // bước trả: cặp chỉ số tìm được
            pos[a[i]] = i; // bước lưu: ghi nhớ số hiện tại cho vòng sau
        }
        return {};
    }
    ```

=== "Python"

    ```python
    def two_sum(a, target):
        pos = {}  # pos[giá trị] = chỉ số đã gặp
        for i, x in enumerate(a):
            complement = target - x  # bước tính: số còn thiếu
            if complement in pos:  # bước tra: số thiếu đã gặp chưa?
                return [pos[complement], i]  # bước trả
            pos[x] = i  # bước lưu cho vòng sau
        return []
    ```

**Ví dụ: Group Anagrams — Nhóm từ đảo chữ**

Ý tưởng: Sắp xếp ký tự mỗi từ, từ đã sắp xếp chính là key. Các từ cùng key là đảo chữ của nhau.

=== "C++"

    ```cpp
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> groups;
        for (string& s : strs) {
            string sorted_s = s;
            sort(sorted_s.begin(), sorted_s.end());
            groups[sorted_s].push_back(s);
        }
        vector<vector<string>> result;
        for (auto& [key, group] : groups)
            result.push_back(group);
        return result;
    }
    ```

=== "Python"

    ```python
    def group_anagrams(strs):
        groups = {}
        for s in strs:
            key = ''.join(sorted(s))
            if key not in groups:
                groups[key] = []
            groups[key].append(s)
        return list(groups.values())
    ```

**Ví dụ: Kiểm tra phần tử trùng lặp**

=== "C++"

    ```cpp
    bool hasDuplicate(vector<int>& a) {
        unordered_set<int> seen;
        for (int x : a) {
            if (seen.count(x)) return true;
            seen.insert(x);
        }
        return false;
    }
    ```

=== "Python"

    ```python
    def has_duplicate(a):
        seen = set()
        for x in a:
            if x in seen:
                return True
            seen.add(x)
        return False
    ```

### Cài đặt thủ công (Chaining)

Để hiểu sâu nguyên lý, dưới đây là cài đặt hash table đơn giản với phương pháp chaining.

=== "C++"

    ```cpp
    struct HashTable {
        static const int SIZE = 10007; // kích thước bảng (số nguyên tố → ít xung đột)
        vector<pair<string,int>> table[SIZE]; // mỗi ô là 1 chain (danh sách cặp key-value)

        int hash(string key) {
            int h = 0; // giá trị băm đang xây
            for (char c : key)
                h = (h * 31 + c) % SIZE; // bước lăn theo từng ký tự
            return h; // chỉ số ô
        }

        void insert(string key, int value) {
            int idx = hash(key); // bước 1: tìm ô
            for (auto& [k, v] : table[idx]) {
                if (k == key) { // bước 2: key đã có → cập nhật giá trị cũ
                    v = value;
                    return;
                }
            }
            table[idx].push_back({key, value}); // bước 3: key mới → nối vào cuối chain
        }

        int get(string key) {
            int idx = hash(key); // bước 1: tìm ô
            for (auto& [k, v] : table[idx]) // bước 2: duyệt chain
                if (k == key) return v; // bước 3: thấy thì trả giá trị
            return -1; // bước 4: duyệt hết không thấy → không tồn tại
        }

        void erase(string key) {
            int idx = hash(key); // bước 1: tìm ô
            auto& chain = table[idx];
            for (auto it = chain.begin(); it != chain.end(); it++) {
                if (it->first == key) { // bước 2: thấy key trong chain
                    chain.erase(it); // bước 3: xóa node rồi dừng
                    return;
                }
            }
        }
    };
    ```

=== "Python"

    ```python
    class HashTable:
        SIZE = 10007

        def __init__(self):
            self.table = [[] for _ in range(self.SIZE)]

        def _hash(self, key):
            h = 0
            for c in key:
                h = (h * 31 + ord(c)) % self.SIZE
            return h

        def insert(self, key, value):
            idx = self._hash(key)
            for i, (k, v) in enumerate(self.table[idx]):
                if k == key:
                    self.table[idx][i] = (key, value)
                    return
            self.table[idx].append((key, value))

        def get(self, key):
            idx = self._hash(key)
            for k, v in self.table[idx]:
                if k == key:
                    return v
            return -1

        def erase(self, key):
            idx = self._hash(key)
            self.table[idx] = [(k, v) for k, v in self.table[idx] if k != key]
    ```

---

## Phân tích tính đúng đắn

### Tại sao hash table hoạt động đúng?

Tính đúng đắn của hash table dựa trên hai tiền đề:

**Tiền đề 1: Hàm băm xác định.** Với cùng một key, hàm băm luôn trả về cùng một chỉ số. Điều này đảm bảo khi ta chèn một phần tử với key $k$ vào vị trí $h(k)$, sau đó tìm kiếm lại với key $k$, ta luôn quay về đúng vị trí đó.

**Tiền đề 2: Xung đột được giải quyết triệt để.** Dù nhiều key có thể hash về cùng một vị trí, phương pháp chaining hoặc open addressing đảm bảo tất cả các key đều được lưu trữ và có thể tìm thấy.

### Chứng minh tính đúng đắn của Chaining

Giả sử ta chèn $N$ key vào bảng kích thước $M$ với chaining.

- **Chèn key $k$:** Tính $idx = h(k)$, duyệt danh sách tại $table[idx]$. Nếu $k$ đã tồn tại, cập nhật giá trị. Nếu chưa, thêm vào cuối danh sách. Thao tác này đúng vì mọi key có hash bằng $idx$ đều nằm trong danh sách tại $table[idx]$.

- **Tìm kiếm key $k$:** Tính $idx = h(k)$, duyệt danh sách tại $table[idx]$. Nếu tìm thấy $k$, trả về giá trị. Nếu duyệt hết mà không thấy, key không tồn tại. Điều này đúng vì nếu $k$ đã được chèn, nó phải nằm trong danh sách tại $h(k)$.

- **Xóa key $k$:** Tương tự tìm kiếm, nhưng thay vì trả về, ta xóa node khỏi danh sách.

### Chứng minh tính đúng đắn của Open Addressing

Với linear probing, giả sử ta chèn key $k$ vào vị trí $h(k)$ hoặc vị trí trống đầu tiên sau $h(k)$.

Khi tìm kiếm key $k$, ta bắt đầu từ $h(k)$ và duyệt tuyến tính cho đến khi:

1. Tìm thấy $k$ — trả về giá trị
2. Gặp ô trống — $k$ không tồn tại
3. Duyệt hết bảng — $k$ không tồn tại

Điểm mấu chốt: Nếu $k$ đã được chèn, ta chắc chắn tìm thấy nó vì ta đi theo đúng chuỗi probing mà nó đã đi qua khi chèn. Nếu gặp ô trống trước khi tìm thấy $k$, điều đó có nghĩa $k$ chưa bao giờ được chèn (vì nếu nó được chèn, nó sẽ nằm tại hoặc trước vị trí trống đó).

### Anti-Hash Attack

Một điểm yếu của hash table là kẻ tấn công có thể cố tình tạo ra nhiều key có cùng hash, đẩy bảng vào worst case $O(N)$ cho mỗi thao tác. Đây gọi là **anti-hash attack**.

Cách phòng chống:

- Sử dụng hàm băm ngẫu nhiên hóa (randomized hash)
- Dùng hai hàm băm độc lập (double hashing)
- Trong thi đấu, hiếm khi bị anti-hash attack vì dữ liệu đầu vào không được tạo bởi người dùng

---

## Đánh giá độ phức tạp

### Trường hợp trung bình (Average Case)

Giả sử hàm băm phân phối đều và load factor $\alpha = N/M$.

| Thao tác | Chaining | Open Addressing |
|---|---|---|
| Chèn | $O(1)$ | $O(1)$ |
| Tìm kiếm | $O(1 + \alpha)$ | $\displaystyle O\!\left(\frac{1}{1-\alpha}\right)$ |
| Xóa | $O(1 + \alpha)$ | $\displaystyle O\!\left(\frac{1}{1-\alpha}\right)$ |

Khi $\alpha$ nhỏ (ví dụ $\alpha \leq 0.75$), tất cả các thao tác đều gần $O(1)$.

### Trường hợp tệ nhất (Worst Case)

Khi tất cả $N$ key đều hash về cùng một vị trí:

| Thao tác | Chaining | Open Addressing |
|---|---|---|
| Chèn | $O(N)$ | $O(N)$ |
| Tìm kiếm | $O(N)$ | $O(N)$ |
| Xóa | $O(N)$ | $O(N)$ |

Worst case xảy ra khi hàm băm kém hoặc bị anti-hash attack. Trong thực tế, với hàm băm tốt và load factor được kiểm soát, worst case rất hiếm.

### So sánh với các cấu trúc khác

| Cấu trúc | Tìm kiếm trung bình | Tìm kiếm tệ nhất | Có thứ tự |
|---|---|---|---|
| Hash Table | $O(1)$ | $O(N)$ | Không |
| Cây đỏ-đen (`map`) | $O(\log N)$ | $O(\log N)$ | Có |
| Mảng + Binary Search | $O(\log N)$ | $O(\log N)$ | Có |
| Danh sách liên kết | $O(N)$ | $O(N)$ | Không |

Lựa chọn cấu trúc phụ thuộc vào yêu cầu:

- Cần tìm kiếm nhanh nhất, không cần thứ tự — Hash Table
- Cần duy trì thứ tự — Cây đỏ-đen
- Dữ liệu tĩnh (không chèn/xóa) — Mảng + Binary Search

### Tóm tắt

- **Trung bình:** $O(1)$ cho mọi thao tác — đây là ưu điểm lớn nhất của hash table
- **Worst case:** $O(N)$ — xảy ra khi tất cả key cùng hash hoặc bị anti-hash attack
- **Bộ nhớ:** $O(N)$ — cần thêm không gian cho bảng băm và các cấu trúc xử lý xung đột
- **Load factor $\alpha < 0.75$:** Ngưỡng khuyến nghị để đảm bảo hiệu suất tốt

---

## Cạm bẫy thường gặp

### Lỗi 1: Bị hack `unordered_map` (anti-hash) → TLE

Test xấu có thể ép mọi key cùng hash → mỗi thao tác thành $O(N)$.

```cpp
// SAI: unordered_map mặc định dễ bị hack trên Codeforces/FPTOJ test adversarial
unordered_map<int, int> mp;

// ĐÚNG: dùng custom hash ngẫu nhiên (splitmix64) — chuẩn thi đấu
struct custom_hash {
    static uint64_t splitmix64(uint64_t x) {
        x += 0x9e3779b97f4a7c15;
        x = (x ^ (x >> 30)) * 0xbf58476d1ce4e5b9;
        x = (x ^ (x >> 27)) * 0x94d049bb133111eb;
        return x ^ (x >> 31);
    }
    size_t operator()(uint64_t x) const {
        static const uint64_t FIXED_RANDOM = chrono::steady_clock::now().time_since_epoch().count();
        return splitmix64(x + FIXED_RANDOM); // bước trộn seed ngẫu nhiên → hacker không đoán được
    }
};
unordered_map<int, int, custom_hash> mp; // an toàn trước anti-hash
```

### Lỗi 2: Quên custom hash cho `pair` / struct

```cpp
// SAI: unordered_map không có sẵn hash cho pair → CE!
unordered_map<pair<int,int>, int> mp;

// ĐÚNG: tự định nghĩa hash cho pair
struct pair_hash {
    size_t operator()(const pair<int,int>& p) const {
        return (uint64_t)p.first * 1000000007ULL + p.second; // bước trộn 2 thành phần
    }
};
unordered_map<pair<int,int>, int, pair_hash> mp;
```

### Lỗi 3: `find` rồi `operator[]` tạo key rác

```cpp
// SAI: find thấy hay không cũng gọi mp[key] → nếu key chưa có, operator[] TỰ TẠO key với value 0!
// → map phình to, đếm tần suất sai, vòng lặp duyệt key rác
if (mp.find(key) != mp.end()) cout << mp[key];

// ĐÚNG: dùng iterator đã tìm được, hoặc chỉ dùng 1 trong 2 cách
auto it = mp.find(key); // bước tìm 1 lần
if (it != mp.end()) cout << it->second; // bước dùng: đọc qua iterator, không tạo key mới
// hoặc gọn: if (mp.count(key)) cout << mp[key]; — nhưng vẫn 2 lần băm, kém hơn iterator
```

---

## Bài tập luyện tập

| Bài | FPTOJ | Độ khó | Chủ đề |
|-----|-------|--------|--------|
| `strb-anagram` | [Hoán vị xâu](https://fptoj.com/problem/strb-anagram) | ⭐⭐ | Đếm tần suất Map |
| `strh-hash` | [Tính hash cơ bản](https://fptoj.com/problem/strh-hash) | ⭐ | Hash xâu |
| `strh-dist` | [Đếm xâu con phân biệt](https://fptoj.com/problem/strh-dist) | ⭐⭐ | Hash + Set |
| `strh-find` | [Tìm xâu con bằng Hash](https://fptoj.com/problem/strh-find) | ⭐⭐ | Rabin-Karp |
| `strh-palind` | [Palindrome với Hash](https://fptoj.com/problem/strh-palind) | ⭐⭐⭐ | Hash + truy vấn |
| `trie-insert-search` | [Tập Từ Vựng Cây Tiền Tố](https://fptoj.com/problem/trie-insert-search) | ⭐ | Trie |

## Bài viết liên quan

- [Bài 14: Hash xâu & Z-algorithm](hash-xau-z-algorithm.md)
- [Bài 17: Trie](trie.md)

## Tài liệu tham khảo

- [VNOI Wiki - Bảng băm](https://wiki.vnoi.info/algo/data-structures/hash-table)
- [CP-Algorithms - Hash Table](https://cp-algorithms.com/string/string-hashing.html)
- [GeeksforGeeks - Hashing Data Structure](https://www.geeksforgeeks.org/dsa/hashing-data-structure/)
- [Codeforces - Hash Tables](https://codeforces.com/blog/entry/60445)

**Bài tiếp theo:** [Trie](trie.md)
