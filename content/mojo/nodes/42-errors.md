---
title: Raise an error
icon: "🚨"
branch: tools
requires: [functions]
summary: raise Error(...) reports a problem, and a function that can fail says raises.
---
**Mojo's error handling in one sentence:** a function that can fail must say so in its signature, with the word [[raises]].

```mojo title=age.mojo
def parse_age(text: String) raises -> Int:
    var age = atol(text)
    if age < 0 or age > 150:
        raise Error(t"not a realistic age: {age}")
    return age

def main() raises:
    print(parse_age("42"))     # 42
    print(parse_age("-3"))     # stops here
```

```repl shell
> mojo run age.mojo
42
Unhandled exception caught during execution: not a realistic age: -3
```

**How it works:**

- **`raise Error("message")`** stops the function immediately and sends the error back to whoever called it. `Error` is Mojo's general error type; the message is what you'll see.
- **`raises`** goes between the parameters and the `->`. It's a promise to callers: "calling this can fail".
- Errors travel **up the call stack**: `parse_age` raises, `main` doesn't handle it, so the program stops with the message. To catch it instead, see [handling errors](node:handling).

**The compiler enforces it.** Remove `raises` from `parse_age`, and you get the error *cannot raise error in this context*. And a function without `raises` can't call one with `raises`, unless it handles the error itself. So errors can't sneak through code that claims to be safe.

**Compared to Python**, where any function can raise anything at any time, this is like a label on a medicine bottle. Read the signature, and you know which calls might fail. `atol` raises (the text might not be a number), so `parse_age` has to say `raises` too, even before our own check.

**When should you raise?** When a function can't do what its name promises, and the caller is better placed to decide what to do: show a message, retry, use a default. Don't raise for situations that are normal, like "this list is empty": return a value that says so, or let the caller check first.

```compare python
def parse_age(text: str) -> int:
    age = int(text)
    if age < 0 or age > 150:
        raise ValueError(f"not a realistic age: {age}")
    return age
```

```compare rust
fn parse_age(text: &str) -> Result<i64, String> {
    let age: i64 = text.parse().map_err(|_| "not a number")?;
    if age < 0 || age > 150 { return Err(format!("not a realistic age: {age}")); }
    Ok(age)
}
```

```exercise
goal: "`withdraw` should refuse to go below zero. Mark it `raises`, and raise an `Error(\"insufficient funds\")` when `amount > balance`."
code: |-
  def withdraw(balance: Int, amount: Int) -> Int:
      return balance - amount
checks:
  - match: 'def\s+withdraw\(\s*balance\s*:\s*Int\s*,\s*amount\s*:\s*Int\s*\)\s+raises\s*->\s*Int'
    message: 'Add raises: def withdraw(balance: Int, amount: Int) raises -> Int:'
  - match: 'if\s+amount\s*>\s*balance\s*:\s*\n\s+raise\s+Error\("insufficient funds"\)'
    message: 'Add: if amount > balance: raise Error("insufficient funds")'
solution: |-
  def withdraw(balance: Int, amount: Int) raises -> Int:
      if amount > balance:
          raise Error("insufficient funds")
      return balance - amount
```

```quiz
question: "Where does `raises` go in a function signature?"
options:
  - "Before def: `raises def f() -> Int:`"
  - "After the parameters, before the arrow: `def f() raises -> Int:`"
  - "After the return type: `def f() -> Int raises:`"
answer: 1
explain: raises sits between the parameter list and the -> return type.
```
