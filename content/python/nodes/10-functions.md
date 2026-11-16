---
title: "Functions"
icon: "🔧"
branch: "basics"
requires: ["loops"]
summary: "Use def, parameters, and return to name reusable work."
---
You've copy-pasted the same tip calculation three times. Time for a function:

```python
def tip(bill, percent):
    """Return the tip for a bill."""
    return bill * percent / 100

print(tip(40, 15))   # 6.0
print(tip(80, 20))   # 16.0
```

The pieces:

- `def` starts a function, then its name, then the parameters in brackets, then a colon.
- The indented body is the function. Like `if`, the block ends where the indentation ends.
- `return` hands a value back to whoever called it, and leaves the function right there.
- The string on the first line is a *docstring*. It's optional, but editors show it when you hover the function, so it's a nice habit.

No types are required. You can add [type hints](node:type-hints) later.

## Print is not return

This one bites everybody who's used the interactive prompt a lot. Spot the bug:

```python
def double(n):
    print(n * 2)

result = double(21)   # shows 42...
print(result + 1)     # ...then crashes
```

The function **shows** 42 on screen, but it doesn't **give** anything back. A function without a `return` returns `None`, so `result + 1` fails with a `TypeError`. `print` is for humans; `return` is for code.

## Default values

Parameters can have defaults, which makes them optional:

```python
def tip(bill, percent=15):
    return bill * percent / 100

tip(40)               # 6.0, uses the default
tip(40, percent=20)   # 8.0, named for clarity
```

Passing an argument by name, as in `percent=20`, works for any parameter, and it makes calls with several numbers much easier to read. [Function arguments](node:function-arguments) covers the rest of the options.

```compare javascript
function tip(bill, percent = 15) {
  return bill * percent / 100;
}
```

```compare go
func tip(bill, percent float64) float64 {
	return bill * percent / 100
}
```

```exercise
goal: "`double` shows its result but gives back `None`. Make it **return** the doubled number."
lang: python
code: |
  def double(number):
      print(number * 2)

  print(double(21))
checks:
  - match: '^\s+return\s+number\s*\*\s*2\s*$'
    message: Replace print(number * 2) with return number * 2.
hint: Swap print(...) for return.
solution: |
  def double(number):
      return number * 2

  print(double(21))
```

```quiz
question: "A function has no `return` statement. What does calling it give back?"
options:
  - "`0`"
  - "`None`"
  - An error.
answer: 1
explain: Every Python function returns something. Without a return, that something is None.
```
