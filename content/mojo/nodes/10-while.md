---
title: While loops
icon: "🔁"
branch: flow
requires: [if]
summary: Repeat a block for as long as a condition stays true.
---
A `while` loop is for when you don't know in advance how many rounds you'll need. Here's a classic: how many years until savings double at 7% interest?

```mojo title=double.mojo
def main():
    var balance: Float64 = 1000.0
    var years = 0

    while balance < 2000.0:
        balance *= 1.07
        years += 1

    print(t"Doubled after {years} years")
```

```repl shell
> mojo run double.mojo
Doubled after 11 years
```

**How Mojo runs it, step by step:**

1. Check the condition. `1000.0 < 2000.0` is true, so run the body.
2. Run the body: the balance grows and `years` goes up by one.
3. Go back to step 1. When the condition is false, skip past the loop.

After 10 years the balance is about 1967, still under 2000. After 11 it's about 2105, the condition fails, and the program continues with the `print`.

**Three things that commonly go wrong:**

| Symptom | Cause |
| --- | --- |
| The loop never ends | nothing in the body moves the condition toward false |
| The loop never runs | the condition was false from the start |
| Off by one | `<` where you meant `<=`, or the other way around |

The first one is the sneaky one. If you forget `balance *= 1.07`, the program runs forever. Press Ctrl+C in the terminal to stop it.

**Counting?** If you know how many times to repeat, a [`for` loop over a range](node:for) is shorter and can't get stuck. Use `while` when the stopping point depends on what happens inside the loop.

Mojo has no `do ... while`. When the body must run at least once, use `while True:` with a [`break`](node:break) inside.

```compare python
while balance < 2000.0:
    balance *= 1.07
    years += 1
```

```compare javascript
while (balance < 2000) {
  balance *= 1.07;
  years++;
}
```

```compare rust
while balance < 2000.0 {
    balance *= 1.07;
    years += 1;
}
```

```exercise
goal: "This countdown never ends. Make `n` go down by one each time through the loop."
code: |-
  def main():
      var n = 3
      while n > 0:
          print(n)
      print("Liftoff!")
checks:
  - match: 'while\s+n\s*>\s*0\s*:\s*\n(\s+.*\n)*?\s+n\s*-=\s*1'
    message: Add n -= 1 inside the loop body.
solution: |-
  def main():
      var n = 3
      while n > 0:
          print(n)
          n -= 1
      print("Liftoff!")
```

```quiz
question: "`var i = 10` then `while i < 5: i += 1`. How many times does the body run?"
options:
  - Zero.
  - Once.
  - Five times.
answer: 0
explain: The condition is checked before the first run. 10 < 5 is false, so the body never runs.
```
