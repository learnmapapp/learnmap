---
title: "Generators"
icon: "🌱"
branch: "functions"
requires: ["iterators", "comprehensions"]
summary: "Yield values on demand without constructing a whole list."
---

A function containing `yield` creates a [[generator]]. Calling it returns an iterator; its body starts running when values are requested:

```python
def countdown(start):
    while start > 0:
        yield start
        start -= 1

print(list(countdown(3)))  # [3, 2, 1]
```

Each `yield` pauses the function and preserves its local state. The next request resumes immediately afterward. Reaching the end, or a bare `return`, finishes the generator.

## Expressions can be lazy too

```python
numbers = [1, 2, 3, 4]
squares = (n * n for n in numbers if n % 2 == 0)
print(sum(squares))  # 20
```

Parentheses here create a generator expression. A list comprehension would compute and store all the results first. A generator is useful for a pipeline or a large input, but converting it to a list still materializes every result.

Generators are one-shot iterators. Create a new generator to repeat the work. Code inside the body, including errors and side effects, generally runs during iteration, which can be later than the call that created it.

```compare javascript
function* countdown(start) {
  while (start > 0) yield start--;
}
```

```exercise
goal: "Yield each number so countdown can produce all three values."
lang: python
code: |
  def countdown(start):
      while start > 0:
          return start
          start -= 1

  print(list(countdown(3)))
checks:
  - match: "^\\s+yield\\s+start\\s*$"
    message: "Replace return start with yield start."
hint: "Replace return start with yield start."
```

```quiz
question: "When does the body of a generator function begin executing?"
options:
  - "As soon as its module is imported."
  - "When the function is called."
  - "When the generator is advanced."
answer: 2
explain: "Calling the function creates a generator; advancing it starts or resumes the body."
```
