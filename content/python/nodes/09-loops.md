---
title: "Loops"
icon: "🔁"
branch: "basics"
requires: ["conditionals", "lists"]
summary: "Walk over values with for, or repeat a condition with while."
---
Python's `for` is closer to a "for each" in other languages. There's no counter to set up; you just walk through a collection:

```python
for planet in ["Mercury", "Venus", "Earth"]:
    print("Hello,", planet)
```

It works on anything you can step through: lists, strings (one character at a time), files (one line at a time), and more. Python calls these [[iterable]].

## Counting with range

When you do want numbers, `range` makes them for you. Here's a countdown and its quirk:

```python
for n in range(3, 0, -1):   # start, stop, step
    print(n)
print("Liftoff!")
```

That prints 3, 2, 1. **The stop value is never included.** `range(5)` gives 0 to 4, and `range(1, 4)` gives 1, 2, 3. It feels odd at first, but it means `range(len(items))` gives exactly the valid positions.

## while: repeat until done

Use `while` when you don't know in advance how many rounds you need:

```python
balance = 100
years = 0
while balance < 200:
    balance *= 1.07
    years += 1
print(f"Doubled after {years} years")
```

## Leaving early

- `break` exits the loop immediately.
- `continue` skips to the next round.

```python
for word in ["ok", "fine", "STOP", "never printed"]:
    if word == "STOP":
        break
    print(word)
```

```warn
Don't add or remove items from a list while a `for` loop is walking over it; items get skipped. Loop over a copy (`for x in items[:]`), or build a new list instead.
```

```compare javascript
for (const planet of planets) { console.log(planet); }
for (let i = 3; i > 0; i--) { console.log(i); }
```

```compare go
for i := 3; i > 0; i-- { fmt.Println(i) }
for _, p := range planets { fmt.Println(p) }
```

```exercise
goal: "This should print 1, 2 and 3, but it stops at 2. Fix the stop value."
lang: python
code: |
  for number in range(1, 3):
      print(number)
checks:
  - match: 'range\(\s*1\s*,\s*4\s*\)'
    message: The stop is excluded, so use range(1, 4).
hint: range never includes its stop value.
solution: |
  for number in range(1, 4):
      print(number)
```

```quiz
question: How many times does the body of `for i in range(10):` run?
options:
  - "9"
  - "10"
  - "11"
answer: 1
explain: range(10) produces 0 through 9, which is ten numbers.
```
