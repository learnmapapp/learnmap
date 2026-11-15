---
title: "Loops"
icon: "🔁"
branch: "basics"
requires: ["conditionals", "lists"]
summary: "Walk over values with for, or repeat a condition with while."
---

A `for` loop reads values from an [[iterable]], such as a list, string, or range:

```python
for name in ["Ada", "Grace"]:
    print(f"Hello, {name}")

for number in range(1, 4):
    print(number)  # 1, then 2, then 3
```

The stop value of `range` is excluded. `range(3)` yields `0`, `1`, `2`; `range(0, 6, 2)` yields `0`, `2`, `4`. A range does not construct a list containing every number.

A `while` loop repeats while its condition is truthy:

```python
remaining = 3
while remaining > 0:
    print(remaining)
    remaining -= 1
```

Make sure something can change the condition, or the loop may run forever. `break` exits the nearest loop; `continue` skips to its next iteration.

## Iterate over values

Prefer `for item in items` over indexing through `range(len(items))` when you only need values. [Enumerate and zip](node:enumerate-zip) add indexes or pair related collections without manual bookkeeping. Avoid adding or removing list items while traversing that same list; build a new list instead.

```compare javascript
for (const name of ["Ada", "Grace"]) {
  console.log(name);
}
```

```compare go
for _, name := range []string{"Ada", "Grace"} {
    fmt.Println(name)
}
```

```exercise
goal: "Print 1, 2, and 3 by fixing the stop value."
lang: python
code: |
  for number in range(1, 3):
      print(number)
checks:
  - match: "range\\(\\s*1\\s*,\\s*4\\s*\\)"
    message: "The stop is excluded, so use range(1, 4)."
hint: "The stop is excluded, so use range(1, 4)."
```

```quiz
question: "Which values come from range(1, 4)?"
options:
  - "1, 2, 3, 4"
  - "0, 1, 2, 3"
  - "1, 2, 3"
answer: 2
explain: "range includes the start and excludes the stop."
```
