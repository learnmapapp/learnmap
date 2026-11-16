---
title: Typed procedures
icon: 🛠️
branch: functions
requires:
  - types
summary: A proc declares typed parameters and an optional result type.
---

A proc declares typed parameters and an optional result type. Small procedures isolate behavior that can be tested independently.

```nim
proc square(n: int): int =
  return n * n
echo square(6)
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
goal: Repair the starting example using what you learned about typed procedures.
lang: nim
code: |-
  proc square(n: int): int =
    return n + n
  echo square(6)
checks:
  - match: return\s+n\s+\*\s+n
    message: Use return n * n for this step.
  - notMatch: return\s+n\s+\+\s+n
    message: Replace return n + n in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: "In `proc square(n: int): int`, what does the final `int` describe?"
options:
  - The number of parameters.
  - The procedure's visibility.
  - The result type.
answer: 2
explain: The type after the parameter list is the returned value's type.
```
