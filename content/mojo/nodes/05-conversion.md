---
title: Explicit numeric conversions
icon: "🔄"
branch: basics
requires: [floats]
summary: Convert between numbers and text yourself, by calling the target type.
---
Mojo never converts between number types behind your back. That sounds strict, but it saves you from a whole class of bugs. Here's the problem in action:

```mojo
def main():
    var runs: Int = 3
    var seconds: Float64 = 4.25
    print(seconds * runs)   # error: Float64 and Int don't mix
```

Python would happily produce `12.75`. Mojo asks you to pick: do you want a float or an integer result?

The rule is easy to remember: **call the type you want, like a function.**

| From | To | Write | Result |
| --- | --- | --- | --- |
| `Int` | `Float64` | `Float64(3)` | `3.0` |
| `Float64` | `Int` | `Int(3.9)` | `3` (cut off toward zero) |
| `Int` | `UInt8` | `UInt8(300)` | `44` (wraps!) |
| anything printable | `String` | `String(42)` | `"42"` |
| `String` | `Int` | `atol("42")` | `42`, or an error |
| `String` | `Float64` | `Float64("2.5")` | `2.5`, or an error |

So the fix above is `print(seconds * Float64(runs))`.

**Watch the direction.** Converting to a *wider* type, like `Int` to `Float64`, is safe for ordinary values. Converting to a *narrower* type can lose information without any warning: `Int(-2.7)` is `-2` (not rounded, just cut off), and `UInt8(300)` wraps to 44. If you want rounding, use `round` first: `Int(round(2.7))` is 3.

**Text to numbers can fail.** `atol("12")` works, `atol("twelve")` can't. Those functions *raise an error*, which means the function calling them needs `raises` in its signature:

```mojo title=parse.mojo
def main() raises:
    var answer = atol("42")
    print(answer + 1)   # 43
```

Without `raises` on `main`, the compiler would refuse to build this, because nothing handles the possible error. You'll learn the full story in [errors](node:errors); for now, adding `raises` to `main` is enough.

```compare python
seconds * runs   # Python converts int to float automatically
int("42")        # raises ValueError on bad input
```

```compare rust
seconds * runs as f64;    // explicit, like Mojo
"42".parse::<i64>()?;     // returns a Result
```

```exercise
goal: "Fix the type error: convert `count` to a `Float64` before dividing, so the average keeps its decimals."
code: |-
  def main():
      var total: Float64 = 17.0
      var count: Int = 4
      print(total / count)
checks:
  - match: 'total\s*/\s*Float64\(\s*count\s*\)'
    message: Divide by Float64(count).
solution: |-
  def main():
      var total: Float64 = 17.0
      var count: Int = 4
      print(total / Float64(count))
```

```quiz
question: "What is `Int(-3.8)`?"
options:
  - "-4"
  - "-3"
  - "4"
answer: 1
explain: Converting a float to an Int cuts off the fraction, toward zero. It doesn't round.
```
