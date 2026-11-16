---
title: Define functions
icon: 📦
branch: functions
requires:
  - types
summary: A function declares parameter and result types.
---

A function declares parameter and result types. A single-expression body can return that expression without writing return.

```swift
func square(_ value: Int) -> Int {
  value * value
}
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
goal: Repair the starting example using what you learned about define functions.
lang: swift
code: |-
  func square(_ value: Int) -> Int {
    value + value
  }
  print(square(6))
checks:
  - match: value\s+\*\s+value
    message: Use value * value for this step.
  - notMatch: value\s+\+\s+value
    message: Replace value + value in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about define functions is correct?
options:
  - Return types are written before func.
  - A function declares parameter and result types. A single-expression body can return that
    expression without writing return.
  - Every Swift function must return Void.
answer: 1
explain: A function declares parameter and result types. A single-expression body can return that
  expression without writing return.
```
