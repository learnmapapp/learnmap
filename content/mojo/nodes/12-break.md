---
title: Stop a loop
icon: "🛑"
branch: flow
requires: [for]
summary: break leaves a loop early, as soon as you've found what you need.
---
Imagine checking ID cards at a door, looking for one person. Once you've found them, you stop checking. There's no point going through the rest of the queue. That's `break`:

```mojo title=search.mojo
def main():
    var found_at = -1

    for i in range(1, 100):
        if i * i > 1000:
            found_at = i
            break

    print(t"First square over 1000: {found_at} squared")
```

```repl shell
> mojo run search.mojo
First square over 1000: 32 squared
```

`break` immediately jumps out of the loop and continues after it. The remaining 67 numbers are never checked.

**Where it shines:**

- **Searching**: stop at the first match.
- **Loops whose exit is in the middle**: `while True:` plus a `break` when some condition happens. Handy when you can only decide to stop halfway through the body:

```mojo
var attempts = 0
while True:
    attempts += 1
    var roll = (attempts * 7) % 6 + 1   # stand-in for a dice roll
    if roll == 6:
        break
    print("Rolled", roll, "- again!")
print("Got a 6 after", attempts, "rolls")
```

**Only the innermost loop.** In nested loops, `break` leaves just the loop it's in. The outer loop carries on with its next round. To leave both, set a flag variable and check it in the outer loop, or move the loops into a function and use [`return`](node:returns).

```compare python
for i in range(1, 100):
    if i * i > 1000:
        break
```

```compare javascript
for (let i = 1; i < 100; i++) {
  if (i * i > 1000) break;
}
```

```compare rust
for i in 1..100 {
    if i * i > 1000 { break; }
}
```

```exercise
goal: "Stop the loop at the first negative reading: add a `break` inside the `if`."
code: |-
  def main():
      for reading in range(5, -5, -2):
          if reading < 0:
              print("Sensor fault!")
          print(reading)
checks:
  - match: 'print\("Sensor fault!"\)\s*\n\s+break'
    message: Put break right after the warning, inside the if.
solution: |-
  def main():
      for reading in range(5, -5, -2):
          if reading < 0:
              print("Sensor fault!")
              break
          print(reading)
```

```quiz
question: In two nested for loops, what does a break in the inner loop do?
options:
  - It stops both loops.
  - It stops the inner loop; the outer loop continues.
  - It restarts the inner loop.
answer: 1
explain: break only leaves the innermost loop it appears in.
```
