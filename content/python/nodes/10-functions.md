---
title: "Functions"
icon: "🔧"
branch: "basics"
requires: ["loops"]
summary: "Use def, parameters, and return to name reusable work."
---

A function gives a name to a reusable operation. Define it with `def`, indent its body, and call it with parentheses:

```python
def double(number):
    return number * 2

answer = double(21)
print(answer)  # 42
```

Parameters receive the arguments passed by the caller. `return` sends a value back and ends that call immediately. A function with no explicit return value returns `None`.

## Returning is different from printing

`print` displays a value but does not hand that value to your caller. Return results from calculation functions so you can reuse and test them; print at the edge of your program.

```python
def describe_score(score):
    if score < 0:
        return "invalid"
    return f"Score: {score}"
```

An early return can keep later code from becoming deeply indented. Local names inside a function are separate from names in other calls.

Function and parameter names conventionally use `snake_case`. Python executes a `def` statement to create the function, so it must run before the function is called. You can put a short docstring as the first statement to explain its purpose.

```compare rust
fn double(number: i32) -> i32 {
    number * 2
}
```

```compare javascript
function double(number) {
  return number * 2;
}
```

```exercise
goal: "Return the doubled number instead of only printing it."
lang: python
code: |
  def double(number):
      print(number * 2)

  print(double(21))
checks:
  - match: "^\\s+return\\s+number\\s*\\*\\s*2\\s*$"
    message: "Replace print(number * 2) with return number * 2."
hint: "Replace print(number * 2) with return number * 2."
```

```quiz
question: "What happens when a function reaches its end without return?"
options:
  - "It returns the last expression automatically."
  - "It returns None."
  - "It always raises an error."
answer: 1
explain: "Unlike Rust blocks, Python functions do not implicitly return the final expression."
```
