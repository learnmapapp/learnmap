---
title: Group fixed results
icon: "🎁"
branch: data
requires: [functions]
summary: A tuple packs a fixed number of values, each with its own type, into one.
---
**Before:** a function that needs to return two things, and a workaround.

```mojo
def min_value(values: List[Int]) -> Int: ...
def max_value(values: List[Int]) -> Int: ...
# two functions, two loops over the same data
```

**After:** one function returns both, as a **tuple**.

```mojo title=range.mojo
def min_max(values: List[Int]) -> Tuple[Int, Int]:
    var low = values[0]
    var high = values[0]
    for v in values:
        if v < low:
            low = v
        if v > high:
            high = v
    return (low, high)

def main():
    var temps: List[Int] = [14, 9, 21, 17]
    var low, high = min_max(temps)
    print(t"Between {low} and {high} degrees")   # Between 9 and 21 degrees
```

**Three things happened there:**

1. **`Tuple[Int, Int]`** is the return type: exactly two values, both `Int`.
2. **`(low, high)`** builds the tuple, with parentheses and commas.
3. **`var low, high = ...`** unpacks it into two variables in one line.

**Mixed types are fine.** Unlike a [list](node:lists), each position in a tuple has its own type:

```mojo
var entry = Tuple[String, Int, Bool]("Ada", 36, True)
print(entry[0])   # Ada
print(entry[1])   # 36
```

Index with a literal number, like `entry[0]`. The compiler needs to know the position to know the type you get back.

**Tuple, list or struct?**

| Use | When |
| --- | --- |
| tuple | a few values that belong together briefly, like a function result |
| [list](node:lists) | any number of values of the same type |
| [struct](node:structs) | values that deserve names, or that travel through your program |

If you find yourself writing `entry[2]` and having to remember what position 2 meant, it's time for a struct with a field called `is_admin`.

```compare python
def min_max(values): return min(values), max(values)
low, high = min_max(temps)
```

```compare javascript
// JS returns an array and destructures it:
const [low, high] = minMax(temps);
```

```compare rust
fn min_max(values: &[i32]) -> (i32, i32) { (low, high) }
let (low, high) = min_max(&temps);
```

```exercise
goal: "Return both the quotient and the remainder: give `divide` the return type `Tuple[Int, Int]` and return `(a // b, a % b)`."
code: |-
  def divide(a: Int, b: Int):
      return
checks:
  - match: 'def\s+divide\(\s*a\s*:\s*Int\s*,\s*b\s*:\s*Int\s*\)\s*->\s*Tuple\[\s*Int\s*,\s*Int\s*\]\s*:'
    message: 'The signature should end in -> Tuple[Int, Int]:'
  - match: 'return\s+\(\s*a\s*//\s*b\s*,\s*a\s*%\s*b\s*\)'
    message: Return (a // b, a % b).
solution: |-
  def divide(a: Int, b: Int) -> Tuple[Int, Int]:
      return (a // b, a % b)
```

```quiz
question: "When should you choose a struct over a tuple?"
options:
  - When the values are all the same type.
  - When the values deserve names or get passed around a lot.
  - Never, tuples are always faster.
answer: 1
explain: Named fields make code easier to read than remembering what entry[2] meant.
```
