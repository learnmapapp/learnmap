---
title: Define functions
icon: 🛠️
branch: functions
requires:
  - numbers
summary: Functions receive arguments and return results.
---

Functions receive arguments and return results. Use a local function declaration to keep the function name scoped.

```lua
local function square(n)
  return n * n
end
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
lang: lua
code: |-
  local function square(n)
    return n + n
  end
  print(square(6))
checks:
  - match: return\s+n\s+\*\s+n
    message: Use return n * n for this step.
  - notMatch: return\s+n\s+\+\s+n
    message: Replace return n + n in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about define functions is correct?
options:
  - Functions cannot be assigned to variables.
  - Function arguments require static type annotations.
  - Functions receive arguments and return results. Use a local function declaration to keep the
    function name scoped.
answer: 2
explain: Functions receive arguments and return results. Use a local function declaration to keep
  the function name scoped.
```
