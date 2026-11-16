---
title: "Conditionals"
icon: "🚦"
branch: "basics"
requires: ["booleans"]
summary: "Indentation groups code; if, elif, and else choose a branch."
---
Let's build a tiny ticket machine. It starts with one rule:

```python
age = 16
if age < 18:
    print("Youth ticket: 5 euros")
```

The line ending in a **colon** opens a block; the **indented** lines below it are the block. There are no braces. When the indentation stops, so does the block.

Now the machine needs a price for everyone else. Add an `else`:

```python
age = 30
if age < 18:
    print("Youth ticket: 5 euros")
else:
    print("Regular ticket: 9 euros")
print("Enjoy the film!")   # not indented: always runs
```

Then seniors get a discount too. Python spells "else if" as `elif`:

```python
age = 70
if age < 18:
    price = 5
elif age >= 65:
    price = 6
else:
    price = 9
print(f"That's {price} euros")
```

Python checks the conditions top to bottom and runs **only the first one that matches**. So order matters: if you put a broader test like `age >= 18` first, the senior branch can never run.

(The `f"..."` is an f-string; it fills `{price}` in. [Formatting](node:formatting) has the details.)

## A one-liner for simple choices

When you're just picking between two values, there's a compact form:

```python
label = "youth" if age < 18 else "adult"
```

Read it out loud: "label is youth if age is under 18, else adult". Use it for values; use a full `if` when each branch does real work.

```warn
Use four spaces per level and never mix in tabs. Most editors do this for you once they know it's a Python file. A block that's indented inconsistently gives an `IndentationError` before anything runs.
```

```compare javascript
if (age < 18) { price = 5; }
else if (age >= 65) { price = 6; }
else { price = 9; }
```

```compare kotlin
val price = when {          // Kotlin's when is an expression
    age < 18 -> 5
    age >= 65 -> 6
    else -> 9
}
```

```exercise
goal: "The youth discount is printed for the wrong people. Make it apply when age is **under** 18."
lang: python
code: |
  age = 16
  if age > 18:
      print("discount")
  else:
      print("full price")
checks:
  - match: '^if\s+age\s*<\s*18\s*:'
    message: "Use age < 18 in the if condition."
hint: The comparison points the wrong way.
solution: |
  age = 16
  if age < 18:
      print("discount")
  else:
      print("full price")
```

```quiz
question: "With `x = 15`, a chain checks `if x > 10:` (prints big), then `elif x > 5:` (prints medium). What gets printed?"
options:
  - Both, big and then medium.
  - Only big.
  - Only medium.
answer: 1
explain: Both conditions are true, but only the first matching branch runs. The elif is skipped.
```
