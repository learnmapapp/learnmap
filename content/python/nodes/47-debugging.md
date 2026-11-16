---
title: "Debugging"
icon: "🐞"
branch: "quality"
requires: ["unittest"]
summary: "Read tracebacks, reproduce a failure, and inspect state with breakpoint."
---
**Bug report:** "The average of my scores is wrong. Sometimes it crashes."

```python title=stats.py
def average(values):
    if not values:
        return 0
    return sum(values) / len(values)

scores = load_scores("week1.csv")
print(f"Average: {average(scores):.1f}")
```

Let's investigate like a detective, with three tools.

## Tool 1: read the clues (tracebacks)

When it crashes, start at the **last line** of the [traceback](node:exceptions), then go up to the first line that's in your own code. That tells you what failed and where.

## Tool 2: quick print statements

The f-string `=` trick prints both the expression and its value. It's perfect for a quick look:

```python
scores = load_scores("week1.csv")
print(f"{scores=}")
```

```text
scores=['90', '85', '77']
```

Clue found: the scores are **strings**, straight from the CSV. And when the file is empty, `average` quietly returns `0`, which looks like a real average.

## Tool 3: stop the program and look around

Put `breakpoint()` on any line. When Python reaches it, it pauses and opens `pdb`, the built-in debugger, right in your terminal:

```python
def average(values):
    breakpoint()
    return sum(values) / len(values)
```

At the `(Pdb)` prompt, you can type any expression to inspect it, plus a few commands:

| Command | Does |
| --- | --- |
| `p values` | print a value |
| `n` | run the next line |
| `s` | step into a function call |
| `c` | continue until the next breakpoint |
| `q` | quit |

Your editor's debugger (VS Code, PyCharm) does the same with clickable breakpoints, and that's often more comfortable.

## The fix

Two fixes: convert to numbers when loading, and stop hiding the empty case. A `0` that means "no data" is a bug waiting to happen; an explicit error points straight at the problem:

```python
def average(values):
    if not values:
        raise ValueError("values must not be empty")
    return sum(values) / len(values)
```

Then write a [unit test](node:unittest) that reproduces the bug, so it can't come back.

```compare javascript
debugger;   // pauses here when DevTools is open
```

```compare java
// Set a breakpoint in the IDE and run in debug mode; there's no
// common in-code equivalent.
```

```exercise
goal: "Returning 0 for an empty list hides the problem. Raise `ValueError(\"values must not be empty\")` instead."
lang: python
code: |
  def average(values):
      if not values:
          return 0
      return sum(values) / len(values)

  print(average([2, 4, 6]))
checks:
  - match: '^\s+raise\s+ValueError\(\s*["'']values must not be empty["'']\s*\)'
    message: Raise ValueError("values must not be empty") for the empty input.
hint: Replace the return 0 line.
solution: |
  def average(values):
      if not values:
          raise ValueError("values must not be empty")
      return sum(values) / len(values)

  print(average([2, 4, 6]))
```

```quiz
question: "What does `breakpoint()` do when Python reaches it?"
options:
  - It ends the program with a stack trace.
  - It pauses and opens the pdb debugger at that line.
  - It prints all local variables and continues.
answer: 1
explain: You can then inspect values, step through lines, and continue with c.
```
