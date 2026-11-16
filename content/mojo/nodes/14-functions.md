---
title: Typed function signatures
icon: 🏷️
branch: functions
requires:
  - integers
summary: Ordinary function parameters need types, and -> declares a result.
---

Ordinary function parameters need types, and -> declares a result. Keep numeric work in small functions that can be tested separately.

```mojo
def square(value: Int) -> Int:
    return value * value

def main() raises:
    print(square(6))
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```compare python
def square(value: int) -> int:
    return value * value

print(square(6))
```

```compare javascript
function square(value) { return value * value; }
console.log(square(6));
```

```compare rust
fn square(value: i32) -> i32 { value * value }
fn main() { println!("{}", square(6)); }
```

```exercise
goal: Repair the starting example using what you learned about typed function signatures.
lang: mojo
code: |-
  def square(value: Int) -> Int:
      return value + value

  def main() raises:
      print(square(6))
checks:
  - match: return\s+value\s+\*\s+value
    message: Use return value * value for this step.
  - notMatch: return\s+value\s+\+\s+value
    message: Replace return value + value in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: "In `def square(value: Int) -> Int`, what does `-> Int` specify?"
options:
  - A mutable input parameter.
  - An ownership transfer at the call site.
  - The result type.
answer: 2
explain: The arrow introduces the function's declared return type.
```
