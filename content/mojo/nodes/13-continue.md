---
title: Skip an iteration
icon: "⏭️"
branch: flow
requires: [for]
summary: continue skips the rest of this round and moves on to the next one.
---
**Before:** every special case adds another level of indentation.

```mojo
for day in range(1, 15):
    if day % 7 != 6 and day % 7 != 0:
        if day != 3:
            print(t"Day {day}: standup at 9:30")
```

**After:** handle the exceptions first, and skip them with `continue`.

```mojo title=standups.mojo
def main():
    for day in range(1, 15):
        if day % 7 == 6 or day % 7 == 0:
            continue    # weekend
        if day == 3:
            continue    # public holiday
        print(t"Day {day}: standup at 9:30")
```

Both versions print the same nine standups. `continue` jumps straight to the next round of the loop, skipping whatever is left of the body. The loop itself keeps going; that's the difference with [`break`](node:break), which leaves the loop entirely.

| | Rest of this round | Following rounds |
| --- | --- | --- |
| `continue` | skipped | still run |
| `break` | skipped | skipped |

This style is often called a **guard clause**: "filter out what you don't want, then deal with the normal case at the normal indentation". It keeps the main logic, the part a reader cares about most, at the left margin.

**Careful with `while`.** In a `for` loop, the next value comes automatically. In a `while` loop, you update the counter yourself, and `continue` can jump over that update:

```mojo
var i = 0
while i < 10:
    if i % 2 == 0:
        continue   # i never changes: loops forever!
    print(i)
    i += 1
```

Move the `i += 1` to the top of the body, or use a `for` loop.

```compare python
for day in range(1, 15):
    if day % 7 in (6, 0):
        continue
```

```compare javascript
for (let day = 1; day < 15; day++) {
  if (day % 7 === 6 || day % 7 === 0) continue;
}
```

```compare rust
for day in 1..15 {
    if day % 7 == 6 || day % 7 == 0 { continue; }
}
```

```exercise
goal: "Print only the odd numbers. Add a guard that skips even numbers with `continue`."
code: |-
  def main():
      for n in range(10):
          print(n)
checks:
  - match: 'if\s+n\s*%\s*2\s*==\s*0\s*:\s*\n\s+continue'
    message: 'Add: if n % 2 == 0: continue, before the print.'
solution: |-
  def main():
      for n in range(10):
          if n % 2 == 0:
              continue
          print(n)
```

```quiz
question: "What does continue do in a for loop?"
options:
  - Ends the loop.
  - Skips the rest of this round and starts the next one.
  - Runs the current round again.
answer: 1
explain: The loop carries on with its next value; only the remainder of the current round is skipped.
```
