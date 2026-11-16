---
title: Conditional loops
icon: "🌀"
branch: flow
requires: [if, bindings]
summary: while loops for when you don't know the number of rounds in advance.
---
**A small story.** Your savings account holds 1000 and grows 5% a year. How many years until it doubles? You can't write `for year in 1..?`, because finding the `?` is the whole question. That's what `while` is for:

```nim title=savings.nim
var balance = 1000.0
var years = 0

while balance < 2000.0:
  balance *= 1.05
  years += 1

echo years, " years"   # 15 years
```

A `while` loop checks its condition *before* each round, and stops as soon as it's `false`. If it's false from the start, the body never runs.

**Three things to get right**, or your loop never ends:

1. The variables in the condition must be `var`, since they need to change.
2. Something inside the loop must change them.
3. That change must eventually make the condition false.

Forget step 2 and the program runs forever. (Press Ctrl+C to stop it.)

**`while true` with `break`** is the usual way to write "repeat until": do the work first, then decide whether to stop:

```nim
import std/strutils

while true:
  stdout.write("Guess a number: ")
  let guess = parseInt(readLine(stdin))
  if guess == 7:
    echo "Correct!"
    break
  echo "Try again."
```

Nim has no `do ... while` loop; this pattern replaces it.

**`for` or `while`?** If you can name the range or collection up front, use [for](node:for): it can't loop forever and doesn't need a counter. Reach for `while` when the stopping point depends on what happens inside the loop.

```compare python
while balance < 2000:
    balance *= 1.05
    years += 1
```

```compare javascript
while (balance < 2000) {
  balance *= 1.05;
  years++;
}
```

```compare rust
while balance < 2000.0 {
    balance *= 1.05;
    years += 1;
}
```

```exercise
goal: "This loop never ends, because `n` never changes. Halve `n` with `n = n div 2` inside the loop."
code: |-
  var n = 100
  var steps = 0
  while n > 1:
    steps += 1
  echo steps
checks:
  - match: 'while\s+n\s*>\s*1\s*:[\s\S]*n\s*=\s*n\s+div\s+2'
    message: Add n = n div 2 inside the loop.
solution: |-
  var n = 100
  var steps = 0
  while n > 1:
    steps += 1
    n = n div 2
  echo steps
```

```quiz
question: "When does a `while` loop check its condition?"
options:
  - Before every round, including the first.
  - After every round, so the body always runs once.
  - Only once, before the first round.
answer: 0
explain: If the condition is false at the start, the body doesn't run at all.
```
