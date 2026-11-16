---
title: Read and update elements
icon: "🔎"
branch: data
requires: [lists]
summary: Use list[i] to read and replace items, from 0 up to len - 1.
---
**Bug hunt.** A leaderboard, and a crash waiting to happen:

```mojo
var top: List[String] = ["Mia", "Theo", "Sam"]
print("Gold:", top[1])
print("Bronze:", top[3])
```

Two bugs. Did you spot them?

1. **`top[1]` is Theo, not Mia.** Indexes start at 0. The first item is `top[0]`.
2. **`top[3]` doesn't exist.** Three items have indexes 0, 1 and 2. The last valid index is always `len(top) - 1`.

The corrected version:

```mojo title=podium.mojo
def main():
    var top: List[String] = ["Mia", "Theo", "Sam"]
    print("Gold:", top[0])
    print("Bronze:", top[len(top) - 1])

    top[1] = "Noor"          # replace an item
    print("Silver:", top[1])  # Silver: Noor
```

**Reading and writing look the same.** `top[1]` on the right of `=` reads; on the left, it replaces. Replacing doesn't change the length. To add or remove items, use [append](node:append) or [pop](node:pop).

**What happens with a bad index?** The program stops with an error like *index 3 is out of bounds, valid range is 0 to 2*. That's a crash at runtime, not a compile error, because the compiler can't know how long a list will be.

**Safe patterns:**

- Check first: `if i < len(top): print(top[i])`.
- Loop with `for name in top`, which can't go out of bounds at all; see [iteration](node:iteration).
- Use `range(len(top))` when you need the index, which stops at the last valid one.

**Changing items while reading them** works with an index:

```mojo
var prices: List[Float64] = [10.0, 25.0, 4.0]
for i in range(len(prices)):
    prices[i] *= 0.9   # 10% off everything
```

```compare python
top[0], top[-1]   # -1 is the last item in Python
top[3]            # IndexError
```

```compare javascript
top[3];           // undefined, no error
```

```compare rust
top[3];           // panics: index out of bounds
```

```exercise
goal: "The second sensor reported a wrong value. Replace item 1 of `readings` with 20.5."
code: |-
  def main():
      var readings: List[Float64] = [19.8, 99.9, 20.1]
      print(readings[1])
checks:
  - match: 'readings\[\s*1\s*\]\s*=\s*20\.5'
    message: Write readings[1] = 20.5 before the print.
solution: |-
  def main():
      var readings: List[Float64] = [19.8, 99.9, 20.1]
      readings[1] = 20.5
      print(readings[1])
```

```quiz
question: "A list has 5 items. What is the index of the last one?"
options:
  - "5"
  - "4"
  - "-1 only"
answer: 1
explain: Indexes run from 0 to len - 1, so 0 to 4.
```
