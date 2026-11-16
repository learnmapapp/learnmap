---
title: Typed procedures
icon: "⚙️"
branch: functions
requires: [types]
summary: proc declares a function with typed parameters, and any proc can be called with a dot.
---
Nim calls its functions **procedures**, declared with `proc`. Let's take one apart:

```nim title=shipping.nim
proc shippingCost(weightKg: float, express: bool): float =
  let base = 4.0 + weightKg * 1.5
  if express:
    base * 2
  else:
    base

echo shippingCost(2.0, false)   # 7.0
echo shippingCost(2.0, true)    # 14.0
```

Piece by piece, along the first line:

- `proc` starts the declaration, followed by the name, `shippingCost`.
- `(weightKg: float, express: bool)` lists the parameters, each written as `name: type`.
- `: float` after the parentheses is the return type.
- `=` ends the signature; the indented body follows.

- **Parameter types are required.** Nim infers types inside a body, but never in a signature.
- **The last expression is the return value.** The `if` above is an expression, so its value is returned. You can also write `return base` explicitly, or use [result](node:result).
- **No return type means no return value.** `proc greet(name: string) =` just does something.
- Parameters sharing a type can be grouped: `proc area(w, h: float): float = w * h`.

**Uniform function call syntax.** This is the Nim feature that surprises everyone at first. These three calls are identical:

```nim
echo shippingCost(2.0, false)
echo 2.0.shippingCost(false)
echo len("hello"), "hello".len, "hello".len()
```

Writing `x.f(y)` simply means `f(x, y)`. There are no special "methods" attached to a type; any [[procedure]] can be called with a dot on its first argument. That's why you can write `name.toUpperAscii()` even though `toUpperAscii` is an ordinary proc from `std/strutils`. Choose whichever reads better.

**Unused results are an error.** Calling `shippingCost(2.0, false)` on its own line doesn't compile, because throwing a result away is often a bug. Write `discard shippingCost(2.0, false)` when you really mean it.

**Order matters.** A proc must be declared above the code that calls it.

```compare python
def shipping_cost(weight_kg: float, express: bool) -> float:
    base = 4.0 + weight_kg * 1.5
    return base * 2 if express else base
```

```compare javascript
function shippingCost(weightKg, express) {
  const base = 4 + weightKg * 1.5;
  return express ? base * 2 : base;
}
```

```compare rust
fn shipping_cost(weight_kg: f64, express: bool) -> f64 {
    let base = 4.0 + weight_kg * 1.5;
    if express { base * 2.0 } else { base }
}
```

```exercise
goal: "Write `proc isEven(n: int): bool` that returns `n mod 2 == 0`."
code: |-
  proc isEven

  echo isEven(4)
checks:
  - match: 'proc\s+isEven\s*\(\s*n\s*:\s*int\s*\)\s*:\s*bool\s*='
    message: 'The signature should be proc isEven(n: int): bool ='
  - match: 'n\s+mod\s+2\s*==\s*0'
    message: The body should be n mod 2 == 0
solution: |-
  proc isEven(n: int): bool =
    n mod 2 == 0

  echo isEven(4)
```

```quiz
question: "Given `proc double(n: int): int = n * 2`, what is `5.double`?"
options:
  - A compile error, because int has no double method.
  - "10"
  - "The proc itself, not called yet."
answer: 1
explain: 5.double means double(5). Any proc can be called with a dot on its first argument.
```
