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
question: Which statement about typed function signatures is correct?
options:
  - All parameter types are inferred from later calls.
  - A result type is placed before def.
  - Ordinary function parameters need types, and -> declares a result. Keep numeric work in small
    functions that can be tested separately.
answer: 2
explain: Ordinary function parameters need types, and -> declares a result. Keep numeric work in
  small functions that can be tested separately.
```
