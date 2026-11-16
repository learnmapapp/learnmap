---
title: "Generators"
icon: "🌱"
branch: "functions"
requires: ["iterators", "comprehensions"]
summary: "Yield values on demand without constructing a whole list."
---
A [[generator]] is a function that can pause. Instead of `return`, it uses `yield` to hand out a value, then waits until someone asks for the next one.

Watch it happen. The `print` calls show when the code actually runs:

```python
def countdown(n):
    print("starting")
    while n > 0:
        yield n
        n -= 1
    print("done")

c = countdown(3)    # nothing printed yet!
```

```repl
> next(c)
starting
3
> next(c)
2
> next(c)
1
> next(c)
done
error: StopIteration
```

Calling `countdown(3)` runs **none** of the body. It returns a generator, which is an [iterator](node:iterators). Each `next` runs the code up to the next `yield` and pauses there, keeping all its local variables.

Since it's an iterator, a `for` loop does all the `next` calls for you:

```python
for n in countdown(3):
    print(n)
```

## Why it's useful: pipelines

Generators let you chain processing steps without ever building a big list in memory. Here's a little log-processing pipeline:

```python
def read_lines(path):
    with open(path) as f:
        for line in f:
            yield line.rstrip("\n")

def errors(lines):
    for line in lines:
        if "ERROR" in line:
            yield line

for line in errors(read_lines("app.log")):
    print(line)
```

Each line flows through both steps one at a time, so the file could be gigabytes.

## Generator expressions

For simple cases there's a shorthand: a [comprehension](node:comprehensions) with round brackets instead of square ones:

```python
total = sum(n * n for n in range(1_000_000))
```

The square-bracket version would build a million-item list first. The generator version just feeds `sum` one number at a time.

```tip
A generator can also be infinite. `while True: yield ...` is fine, as long as whoever consumes it stops at some point, for example with `break`.
```

```compare javascript
function* countdown(n) {
  while (n > 0) yield n--;
}
```

```compare kotlin
val countdown = sequence {
    var n = 3
    while (n > 0) yield(n--)
}
```

```exercise
goal: "`return` ends the function after the first number. Make `countdown` produce all three values."
lang: python
code: |
  def countdown(start):
      while start > 0:
          return start
          start -= 1

  print(list(countdown(3)))
checks:
  - match: '^\s+yield\s+start\s*$'
    message: "Replace return start with yield start."
hint: yield pauses the function instead of ending it.
solution: |
  def countdown(start):
      while start > 0:
          yield start
          start -= 1

  print(list(countdown(3)))
```

```quiz
question: "A generator function contains `print(\"hi\")` before its first `yield`. When is `hi` printed?"
options:
  - When the function is called.
  - When the first value is requested, for example with next.
  - Never; generators skip prints.
answer: 1
explain: Calling a generator function only creates the generator. The body starts running on the first next().
```
