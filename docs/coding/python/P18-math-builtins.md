# P18: math & Các hàm built-in

> **Tác giả:** Hà Trí Kiên<br>
> **Chủ đề:** math module, các hàm built-in quan trọng cho thi đấu

---

## 1. Tổng quan

Module `math` và các hàm built-in cung cấp nhiều công cụ **toán học** và **tiện ích** quan trọng cho thi đấu.

---

## 2. Module math

### 2.1. Các hằng số

```python
import math

print(math.pi)       # 3.141592653589793
print(math.e)        # 2.718281828459045
print(math.inf)      # inf (vô cực)
print(math.nan)      # nan (không phải số)
```

### 2.2. Giai thừa và tổ hợp

```python
import math

# Giai thừa
print(math.factorial(5))    # 120
print(math.factorial(0))    # 1

# Tổ hợp C(n, k) = n! / (k! * (n-k)!)
print(math.comb(10, 3))     # 120
print(math.comb(10, 0))     # 1
print(math.comb(10, 10))    # 1

# Hoán vị P(n, k) = n! / (n-k)!
print(math.perm(10, 3))     # 720
```

### 2.3. GCD và LCM

```python
import math

# Ước chung lớn nhất
print(math.gcd(12, 8))      # 4
print(math.gcd(0, 5))       # 5

# Bội chung nhỏ nhất (Python 3.9+)
print(math.lcm(4, 6))       # 12
print(math.lcm(12, 8))      # 24
```

### 2.4. Căn bậc hai và lũy thừa

```python
import math

# Căn bậc hai
print(math.sqrt(16))         # 4.0
print(math.sqrt(2))          # 1.4142135623730951

# Căn bậc 2 nguyên (Python 3.8+)
print(math.isqrt(16))        # 4
print(math.isqrt(17))        # 4 (làm tròn xuống)

# Lũy thừa
print(math.pow(2, 10))       # 1024.0 (trả về float)
print(2 ** 10)               # 1024 (trả về int)
print(pow(2, 10, 1000))      # 24 (2^10 % 1000)
```

### 2.5. Logarit

```python
import math

# Logarit tự nhiên (ln)
print(math.log(100))         # 4.605170185988092

# Logarit cơ số 10
print(math.log10(100))       # 2.0

# Logarit cơ số 2
print(math.log2(8))          # 3.0

# Logarit cơ số tùy ý
print(math.log(8, 2))        # 3.0
```

### 2.6. Làm tròn

```python
import math

# Làm tròn lên
print(math.ceil(3.2))        # 4
print(math.ceil(-3.2))       # -3

# Làm tròn xuống
print(math.floor(3.8))       # 3
print(math.floor(-3.8))      # -4

# Cắt phần thập phân
print(math.trunc(3.8))       # 3
print(math.trunc(-3.8))      # -3
```

### 2.7. Giá trị tuyệt đối

```python
import math

print(math.fabs(-5))         # 5.0 (trả về float)
print(abs(-5))               # 5 (trả về int)
```

### 2.8. Tổng tích lũy

```python
import math

# math.fsum: tổng chính xác cho số thực
print(math.fsum([0.1, 0.2, 0.3]))  # 0.6 (chính xác)
print(sum([0.1, 0.2, 0.3]))         # 0.6000000000000001 (có lỗi)
```

---

## 3. Các hàm built-in quan trọng

### 3.1. min, max

```python
arr = [3, 1, 4, 1, 5, 9, 2, 6]

# min, max cơ bản
print(min(arr))              # 1
print(max(arr))              # 9

# min, max nhiều giá trị
print(min(3, 1, 4))         # 1
print(max(3, 1, 4))         # 4

# min, max với key
words = ["banana", "apple", "cherry"]
print(min(words, key=len))   # "apple"
print(max(words, key=len))   # "cherry"

# min, max của tuple
print(min(3, 1, 4))         # 1
print(max(3, 1, 4))         # 4
```

### 3.2. sum

```python
arr = [1, 2, 3, 4, 5]

# sum cơ bản
print(sum(arr))              # 15

# sum với start
print(sum(arr, 10))          # 25 (10 + 15)

# sum generator (tiết kiệm bộ nhớ)
print(sum(i ** 2 for i in range(10)))  # 285
```

### 3.3. abs

```python
print(abs(-5))               # 5
print(abs(3.14))             # 3.14
print(abs(-3.14))            # 3.14
```

### 3.4. pow

```python
print(pow(2, 10))            # 1024
print(pow(2, 10, 1000))      # 24 (2^10 % 1000)
```

### 3.5. divmod

```python
# divmod(a, b) = (a // b, a % b)
print(divmod(17, 5))         # (3, 2)
print(divmod(10, 3))         # (3, 1)
```

### 3.6. round

```python
print(round(3.14159, 2))     # 3.14
print(round(3.5))            # 4 (banker's rounding)
print(round(2.5))            # 2 (banker's rounding!)
```

!!! warning "Banker's rounding"
    Python dùng **banker's rounding** (làm tròn đến số chẵn gần nhất):
    - `round(2.5)` → 2 (không phải 3!)
    - `round(3.5)` → 4

### 3.7. chr, ord

```python
# chr: mã ASCII → ký tự
print(chr(65))               # 'A'
print(chr(97))               # 'a'
print(chr(48))               # '0'

# ord: ký tự → mã ASCII
print(ord('A'))              # 65
print(ord('a'))              # 97
print(ord('0'))              # 48
```

### 3.8. hex, oct, bin

```python
n = 255

# Hệ thập lục phân (hex)
print(hex(n))                # '0xff'
print(f"{n:#x}")             # '0xff'
print(f"{n:x}")              # 'ff'

# Hệ bát phân (oct)
print(oct(n))                # '0o377'
print(f"{n:#o}")             # '0o377'
print(f"{n:o}")              # '377'

# Hệ nhị phân (bin)
print(bin(n))                # '0b11111111'
print(f"{n:#b}")             # '0b11111111'
print(f"{n:b}")              # '11111111'
```

### 3.9. int với base

```python
# Chuyển từ hệ khác sang thập phân
print(int('0xff', 16))       # 255
print(int('0b1010', 2))      # 10
print(int('0o17', 8))        # 15
print(int('ff', 16))         # 255
print(int('1010', 2))        # 10
```

### 3.10. isinstance

```python
x = 42
print(isinstance(x, int))           # True
print(isinstance(x, float))         # False
print(isinstance(x, (int, float)))  # True

s = "Hello"
print(isinstance(s, str))           # True
```

---

## 4. Pattern thường gặp trong thi đấu

### 4.1. Tính GCD nhiều số

```python
import math
from functools import reduce

arr = [12, 18, 24]
result = reduce(math.gcd, arr)
print(result)  # 6
```

### 4.2. Tính LCM nhiều số

```python
import math
from functools import reduce

def lcm(a, b):
    return a * b // math.gcd(a, b)

arr = [4, 6, 8]
result = reduce(lcm, arr)
print(result)  # 24
```

### 4.3. Kiểm tra số nguyên tố

```python
import math

def is_prime(n):
    if n < 2:
        return False
    for i in range(2, math.isqrt(n) + 1):
        if n % i == 0:
            return False
    return True
```

### 4.4. Phân tích thừa số nguyên tố

```python
import math

def prime_factors(n):
    factors = []
    d = 2
    while d * d <= n:
        while n % d == 0:
            factors.append(d)
            n //= d
        d += 1
    if n > 1:
        factors.append(n)
    return factors
```

### 4.5. Lũy thừa nhanh modulo

```python
def power_mod(base, exp, mod):
    result = 1
    base %= mod
    while exp > 0:
        if exp % 2 == 1:
            result = result * base % mod
        exp //= 2
        base = base * base % mod
    return result

# Hoặc dùng pow()
print(pow(2, 10, 1000))  # 24
```

---

## 5. So sánh với C++

| Python | C++ | Ghi chú |
|--------|-----|---------|
| `math.gcd` | `__gcd` hoặc `gcd` (C++17) | Cùng chức năng |
| `math.lcm` | `lcm` (C++17) | |
| `math.sqrt` | `sqrt` | |
| `math.isqrt` | `(int)sqrt` | |
| `math.factorial` | Không có | Phải tự cài |
| `math.comb` | Không có | Phải tự cài |
| `math.log2` | `log2` | |
| `math.ceil`, `math.floor` | `ceil`, `floor` | |
| `abs` | `abs` | |
| `min`, `max` | `min`, `max` | |
| `pow(a, b, m)` | Tự cài | Python hỗ trợ sẵn |

---

## 6. Lưu ý / Cạm bẫy hay gặp

### Bẫy 1: pow trả về float

```python
print(pow(2, 10))      # 1024 (int)
print(math.pow(2, 10)) # 1024.0 (float!)
```

### Bẫy 2: round với banker's rounding

```python
print(round(2.5))  # 2 (không phải 3!)
print(round(3.5))  # 4
```

### Bẫy 3: math.sqrt trả về float

```python
print(math.sqrt(16))   # 4.0 (float)
print(math.isqrt(16))  # 4 (int)
```

### Bẫy 4: Chia cho 0 trong math.log

```python
# math.log(0)  # ValueError!
```

---

## 7. Bài tập thực hành

### Bài 1: GCD và LCM
Đọc 2 số a, b. Tính GCD và LCM.

```python
import math

a, b = map(int, input().split())
```

???? tip "Lời giải"
    ```python
    import math
    
    a, b = map(int, input().split())
    print(f"GCD: {math.gcd(a, b)}")
    print(f"LCM: {a * b // math.gcd(a, b)}")
    ```

### Bài 2: Kiểm tra số nguyên tố
Đọc số n. Kiểm tra n có phải số nguyên tố không.

```python
import math

n = int(input())
```

???? tip "Lời giải"
    ```python
    import math
    
    n = int(input())
    if n < 2:
        print("Khong phai SNT")
    else:
        is_prime = True
        for i in range(2, math.isqrt(n) + 1):
            if n % i == 0:
                is_prime = False
                break
        if is_prime:
            print("SNT")
        else:
            print("Khong phai SNT")
    ```

### Bài 3: Lũy thừa modulo
Đọc a, b, m. Tính (a^b) % m.

```python
a, b, m = map(int, input().split())
```

???? tip "Lời giải"
    ```python
    a, b, m = map(int, input().split())
    print(pow(a, b, m))
    ```

---

## 8. Bài tập luyện tập

| Bài | Nền tảng | Độ khó | Chủ đề |
|-----|----------|--------|--------|
| [CSES - Exponentiation](https://cses.fi/problemset/task/1095) | CSES | ⭐⭐ | Lũy thừa modulo |
| [CSES - Counting Divisors](https://cses.fi/problemset/task/1713) | CSES | ⭐⭐ | Ước số |

---

## Bài viết liên quan

- [← P17: bisect](P17-bisect.md)
- [P19: Kỹ thuật thi đấu Python →](P19-ky-thuat-thi-dau.md)

---

**Bài trước:** [P17: bisect](P17-bisect.md)<br>
**Bài tiếp theo:** [P19: Kỹ thuật thi đấu Python →](P19-ky-thuat-thi-dau.md)
