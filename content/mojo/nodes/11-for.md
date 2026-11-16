---
title: Ranges and iteration
icon: "🔂"
branch: flow
requires: [while]
summary: for loops over range(), and why the stop value is never included.
---
**Puzzle.** What does this print?

```mojo
for i in range(1, 4):
    print(i)
```

If you said 1, 2, 3, 4, you're in good company, and one number off. It prints **1, 2, 3**. A range includes its start but stops *before* its stop value.

That feels odd at first, but it makes the common case clean: `range(5)` gives exactly 5 numbers, `0, 1, 2, 3, 4`, which are exactly the valid indexes of a 5-item list.

**The three forms of `range`:**

| Code | Numbers | Think of it as |
| --- | --- | --- |
| `range(5)` | 0, 1, 2, 3, 4 | "five times" |
| `range(2, 6)` | 2, 3, 4, 5 | "from 2, up to 6" |
| `range(10, 0, -3)` | 10, 7, 4, 1 | "from 10 down, in steps of 3" |

**A worked example**, a times table:

```mojo title=table.mojo
def main():
    var n = 7
    for i in range(1, 6):
        print(t"{i} x {n} = {i * n}")
```

```repl shell
> mojo run table.mojo
1 x 7 = 7
2 x 7 = 14
3 x 7 = 21
4 x 7 = 28
5 x 7 = 35
```

The loop variable `i` is created by the `for` itself; you don't declare it with `var`. Each round it gets the next number from the range.

`for` doesn't only work with ranges. It loops over anything *iterable*: the characters in a string, the items in a [list](node:iteration), the keys of a dictionary. You'll meet those as they come up.

**`for` versus `while`**: `for i in range(n)` is the same as a `while` loop with a counter, but you can't forget to increment the counter, so it can't loop forever by accident.

```compare python
for i in range(1, 6):   # same range rules
    print(f"{i} x {n} = {i * n}")
```

```compare javascript
for (let i = 1; i < 6; i++) {
  console.log(`${i} x ${n} = ${i * n}`);
}
```

```compare rust
for i in 1..6 {   // also excludes 6
    println!("{i} x {n} = {}", i * n);
}
```

```exercise
goal: "Print the numbers 1 to 10, including 10. Fix the range."
code: |-
  def main():
      for i in range(1, 10):
          print(i)
checks:
  - match: 'range\(\s*1\s*,\s*11\s*\)'
    message: The stop value isn't included, so use 11.
solution: |-
  def main():
      for i in range(1, 11):
          print(i)
```

```quiz
question: "How many numbers does `range(3, 8)` produce?"
options:
  - "5"
  - "6"
  - "8"
answer: 0
explain: 3, 4, 5, 6 and 7. The stop value 8 is excluded, so it's 8 - 3 = 5 numbers.
```
