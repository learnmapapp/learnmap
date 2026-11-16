---
title: Flexible array arguments
icon: "🪣"
branch: data
requires: [procedures, arrays, sequences]
summary: An openArray parameter accepts arrays, sequences and slices, so one proc serves them all.
---
**The problem.** You've written a helper for a sequence:

```nim
proc average(xs: seq[float]): float = ...

let week: array[7, float] = [1.0, 2, 3, 4, 5, 6, 7]
echo average(week)   # Error: type mismatch: got array[0..6, float]
```

An array isn't a seq, and each array size is its own type. Writing one version per size would be absurd.

**The fix: `openArray[T]`.** As a parameter type, it means "any contiguous run of `T`s, whatever container they're in":

```nim title=average.nim
proc average(xs: openArray[float]): float =
  if xs.len == 0:
    return 0.0
  for x in xs:
    result += x
  result / float(xs.len)

let week = [1.0, 2, 3, 4, 5, 6, 7]   # array
let recent = @[2.5, 3.5]              # seq

echo average(week)                    # 4.0
echo average(recent)                  # 3.0
echo average(week.toOpenArray(0, 2))  # 2.0, just the first three
```

Inside the proc, an [[openarray]] works like a read-only sequence: `len`, indexing from 0, `for` loops, `in`. You can't `add` to it, because the caller's array couldn't grow.

**Why not return `openArray`?** You can't store one in a variable or return it. It's a *view* of someone else's data, so it only exists while the call runs. That restriction is what makes it cheap: nothing is copied.

**The rule of thumb:** when a proc reads a list of things, take `openArray[T]`. Ask for `seq[T]` only when you need to keep it, or `var seq[T]` when you need to add to the caller's list.

Bonus: `varargs[T]` is a cousin that also lets callers pass separate arguments, like `total(1, 2, 3)`. `echo` uses it.

```compare python
def average(xs):   # duck typing: any iterable works
    return sum(xs) / len(xs) if xs else 0.0
```

```compare javascript
function average(xs) {   // anything with length and indexes works
  return xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0;
}
```

```compare rust
fn average(xs: &[f64]) -> f64 {   // a slice: the same idea as openArray
    if xs.is_empty() { 0.0 } else { xs.iter().sum::<f64>() / xs.len() as f64 }
}
```

```exercise
goal: "`longest` should work for arrays and sequences alike. Change the parameter type to `openArray[string]`."
code: |-
  proc longest(words: seq[string]): string =
    for w in words:
      if w.len > result.len:
        result = w

  echo longest(["fig", "banana", "kiwi"])
checks:
  - match: 'words\s*:\s*openArray\[\s*string\s*\]'
    message: 'Write words: openArray[string]'
solution: |-
  proc longest(words: openArray[string]): string =
    for w in words:
      if w.len > result.len:
        result = w

  echo longest(["fig", "banana", "kiwi"])
```

```quiz
question: "Which of these can a `proc f(xs: openArray[int])` NOT do?"
options:
  - Loop over xs.
  - Read xs.len.
  - Call xs.add(4).
answer: 2
explain: An openArray might be the caller's fixed-size array, so it can't grow.
```
