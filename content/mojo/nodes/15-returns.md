---
title: Return paths
icon: "↩️"
branch: functions
requires: [functions]
summary: return hands back a value and ends the function, on every path.
---
**Bug hunt.** This function compiles in Python but not in Mojo. Can you see why?

```mojo
def grade(score: Int) -> String:
    if score >= 90:
        return "A"
    elif score >= 75:
        return "B"
    elif score >= 50:
        return "C"
```

A score of 30 matches none of the branches, so the function would reach the end without returning anything. Python would quietly return `None`. Mojo promised a `String` in the signature, so the compiler stops with an error: a return is expected at the end of the function.

The fix is to cover the remaining case:

```mojo
    else:
        return "F"
```

**`return` ends the function immediately.** Nothing after it runs. You can use that to handle special cases first, an approach called *early return*:

```mojo title=shipping.mojo
def shipping_cost(weight_kg: Float64, country: String) -> Float64:
    if weight_kg <= 0.0:
        return 0.0
    if country == "NL":
        return 4.95
    return 4.95 + weight_kg * 2.0

def main():
    print(shipping_cost(2.0, "NL"))   # 4.95
    print(shipping_cost(2.0, "DE"))   # 8.95
```

Each special case gets its own `return`, and the general case is the last line, at the normal indentation.

**Functions without a result** can still use a bare `return` to stop early:

```mojo
def warn(level: Int):
    if level < 3:
        return
    print("Warning level", level)
```

**Returning several values?** Return a [tuple](node:tuples), or a [struct](node:structs) when the values deserve names.

```compare python
def grade(score):
    if score >= 90:
        return "A"
    # falls off the end: returns None
```

```compare rust
fn grade(score: i32) -> &'static str {
    if score >= 90 { "A" } else { "F" }  // must cover every path too
}
```

```exercise
goal: "The compiler says this function is missing a return. Add an `else` branch that returns `\"odd\"`."
code: |-
  def parity(n: Int) -> String:
      if n % 2 == 0:
          return "even"
checks:
  - match: 'else\s*:\s*\n\s+return\s+"odd"'
    message: 'Add: else: return "odd"'
solution: |-
  def parity(n: Int) -> String:
      if n % 2 == 0:
          return "even"
      else:
          return "odd"
```

```quiz
question: "What happens to code written after a `return` statement in the same block?"
options:
  - It runs after the value is returned.
  - It never runs.
  - It runs only if the return value is unused.
answer: 1
explain: return ends the function on the spot.
```
