---
title: Implicit result
icon: "📥"
branch: functions
requires: [procedures]
summary: Every proc with a return type has a ready-made result variable.
---
**Before:** here's a proc written the way you might in another language:

```nim
proc total(prices: seq[float]): float =
  var sum = 0.0
  for p in prices:
    sum += p
  return sum
```

**After:** the same proc, written the Nim way:

```nim title=total.nim
proc total(prices: seq[float]): float =
  for p in prices:
    result += p

echo total(@[2.5, 4.0, 1.5])   # 8.0
```

Where did `sum` go? Every proc that has a return type gets a free variable called [[result]]. It already exists when the body starts, holding the type's default value: `0.0` here, `""` for strings, an empty list for a `seq`. Whatever `result` holds when the proc ends is what it returns.

**Why it's nice:** procs that *build* something, like a sum, a list or a report string, don't need a declare-then-return dance:

```nim
proc initials(names: seq[string]): string =
  for n in names:
    result.add(n[0])

echo initials(@["Grace", "Ada", "Linus"])   # GAL
```

**How it combines with `return`:**

| You write | What's returned |
| --- | --- |
| nothing special, body ends | the current `result` |
| `return` on its own | the current `result`, right away |
| `return x` | `x` (as if you'd set `result = x` first) |
| a final expression (no `result` used) | that expression |

**A trap to avoid:** don't mix a final expression with `result` assignments. Pick one style per proc. If you set `result` and then the last line is a bare value, the compiler will complain, and it's confusing to read anyway.

**Which style to use?** Last expression for short one-liners like `n * 2`. `result` for anything that accumulates or that has several steps.

```compare python
def total(prices):
    total = 0.0          # Python needs the explicit accumulator
    for p in prices:
        total += p
    return total
```

```compare javascript
function total(prices) {
  let sum = 0;
  for (const p of prices) sum += p;
  return sum;
}
```

```compare rust
fn total(prices: &[f64]) -> f64 {
    prices.iter().sum()
}
```

```exercise
goal: "Simplify this proc: remove `count` and the `return`, and add to `result` instead."
code: |-
  proc countLong(words: seq[string]): int =
    var count = 0
    for w in words:
      if w.len > 5:
        count += 1
    return count
checks:
  - match: 'result\s*\+=\s*1'
    message: Write result += 1 inside the if.
  - notMatch: 'count\s*[+=]'
    message: Remove the count variable.
  - notMatch: 'return'
    message: No return is needed; result is returned automatically.
solution: |-
  proc countLong(words: seq[string]): int =
    for w in words:
      if w.len > 5:
        result += 1
```

```quiz
question: "What does `proc f(): string = discard` return?"
options:
  - "nil"
  - "An empty string, the default value of result."
  - It doesn't compile.
answer: 1
explain: result starts with the type's default value, which is "" for a string.
```
