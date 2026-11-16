---
title: "Iterators"
icon: "➡️"
branch: "functions"
requires: ["enumerate-zip", "functions"]
summary: "Separate reusable iterables from one-way streams of values."
---
What does a `for` loop actually do? Let's take one apart by hand, at the prompt:

```repl
> letters = ["a", "b"]
> it = iter(letters)
> next(it)
'a'
> next(it)
'b'
> next(it)
error: StopIteration
```

That's the whole protocol:

1. `iter(thing)` asks a collection for an [[iterator]], an object that remembers where you are.
2. `next(iterator)` gives the next item.
3. When there's nothing left, `next` raises `StopIteration`.

So `for letter in letters:` is really "get an iterator, call `next` until `StopIteration`, then stop quietly". Every iterable (lists, strings, dicts, files, ranges) plays along.

## The one-way street

An iterator is used up as you go, and it never rewinds. That leads to this classic head-scratcher:

```python
squares = map(lambda n: n * n, [1, 2, 3])
print(list(squares))   # [1, 4, 9]
print(list(squares))   # []
```

`map`, `filter`, `zip`, `enumerate` and open files all give you iterators. The first `list()` drained it, so the second one finds nothing. If you need the values twice, store them in a list first.

## Why bother?

Iterators are **lazy**: they make one value at a time, on request. Iterating a 10 GB log file line by line only keeps one line in memory:

```python
with open("huge.log") as log:
    for line in log:          # read one line at a time
        if "ERROR" in line:
            print(line, end="")
```

And `next` with a default is a neat way to get "the first match, or something else":

```python
first_error = next((line for line in lines if "ERROR" in line), None)
```

[Generators](node:generators) show how to write your own lazy sequences.

```compare javascript
const it = letters[Symbol.iterator]();
it.next();   // { value: 'a', done: false }
```

```compare java
Iterator<String> it = letters.iterator();
while (it.hasNext()) System.out.println(it.next());
```

```exercise
goal: "`next` on an empty iterator raises `StopIteration`. Give it the fallback `\"done\"` instead."
lang: python
code: |
  stream = iter([])
  print(next(stream))
checks:
  - match: 'next\(\s*stream\s*,\s*["'']done["'']\s*\)'
    message: Use next(stream, "done").
hint: next takes an optional second argument, returned when the iterator is empty.
solution: |
  stream = iter([])
  print(next(stream, "done"))
```

```quiz
question: "`evens = filter(lambda n: n % 2 == 0, range(5))`. You call `sum(evens)` twice. What are the two results?"
options:
  - "6 and 6"
  - "6 and 0"
  - "4 and 4"
answer: 1
explain: filter returns an iterator. The first sum uses up 0, 2 and 4; the second finds nothing left and returns 0.
```
