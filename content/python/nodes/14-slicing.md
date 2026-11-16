---
title: "Slicing"
icon: "✂️"
branch: "collections"
requires: ["lists"]
summary: "Select a range with start:stop:step; the stop stays excluded."
---
A slice cuts a piece out of a list or a string. The syntax is `[start:stop]`, and it's easiest to understand with the positions drawn **between** the items, like the marks on a ruler:

```text
    | P | y | t | h | o | n |
    0   1   2   3   4   5   6
   -6  -5  -4  -3  -2  -1
```

`word[1:4]` means "cut at mark 1 and at mark 4", and gives you what's between them: `"yth"`. That's why the stop is excluded: you're cutting, not picking.

```repl
> word = "Python"
> word[1:4]
'yth'
> word[:2]
'Py'
> word[2:]
'thon'
> word[-3:]
'hon'
```

Leave out the start to begin at the front, and leave out the stop to go to the end. A neat side effect: `word[:n] + word[n:]` is always the whole string again.

## A slice cookbook

```python
scores = [70, 85, 90, 60, 95, 80]

scores[:3]      # first three:     [70, 85, 90]
scores[-2:]     # last two:        [95, 80]
scores[1:-1]    # drop both ends:  [85, 90, 60, 95]
scores[::2]     # every second:    [70, 90, 95]
scores[::-1]    # reversed copy:   [80, 95, 60, 90, 85, 70]
scores[:]       # a full copy
```

The optional third number is the **step**. A negative step walks backwards, which is why `[::-1]` is the classic way to reverse a string.

## Slices are forgiving

Indexing past the end is an error, but slicing past the end isn't. You get as much as there is:

```repl
> scores[10]
error: IndexError: list index out of range
> scores[4:100]
[95, 80]
```

Slicing a list always gives you a **new** list, so changing the slice doesn't touch the original. [Mutability](node:mutability) shows why that matters.

```compare javascript
scores.slice(0, 3);   // same idea, as a method
scores.slice(-2);
```

```compare go
scores[:3]   // Go slices share memory with the original array
```

```exercise
goal: "`first_three` only has two numbers. Fix the slice so it takes the first three."
lang: python
code: |
  numbers = [10, 20, 30, 40, 50]
  first_three = numbers[:2]
  print(first_three)
checks:
  - match: 'numbers\[\s*:\s*3\s*\]'
    message: "Use numbers[:3]; the stop index is excluded."
hint: Cut at mark 0 and mark 3.
solution: |
  numbers = [10, 20, 30, 40, 50]
  first_three = numbers[:3]
  print(first_three)
```

```quiz
question: "What does `\"abcdef\"[1:-1]` give?"
options:
  - "`'bcde'`"
  - "`'bcdef'`"
  - "`'abcde'`"
answer: 0
explain: It cuts after the first character and before the last one, dropping both ends.
```
