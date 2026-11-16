---
title: Custom iterators
icon: "🎠"
branch: design
requires: [for, procedures]
summary: Write your own iterators with yield, and loop over them with for.
---
**Ever wondered what `for i in 1..5` actually calls?** `1..5` uses an [[iterator]] from the standard library. And you can write your own, with the same tools.

An iterator looks like a proc, but instead of returning once, it **yields** values one at a time. Each `yield` hands a value to the `for` loop, which runs its body, and then the iterator continues where it left off:

```nim title=evens.nim
iterator evens(upTo: int): int =
  var n = 0
  while n <= upTo:
    yield n
    n += 2

for e in evens(8):
  echo e        # 0 2 4 6 8
```

Follow one round: the loop asks for a value; `evens` runs until `yield 0`; the loop body prints `0`; `evens` resumes after the `yield`, adds 2, loops, yields `2`; and so on. When the iterator's body ends, so does the loop.

**Why not just return a seq?** Because nothing gets built. `evens(1_000_000_000)` uses no memory for a list, and if the loop `break`s after three values, the iterator only ever computed three. Nim compiles a simple iterator *into* the `for` loop, so it's as fast as writing the loop out by hand.

**Real uses:**

```nim
# walk a file line by line (std has this one: lines)
for line in lines("todo.txt"):
  echo line

# your own data structure
type Playlist = object
  songs: seq[string]

iterator items(p: Playlist): string =
  for s in p.songs:
    yield s

let mix = Playlist(songs: @["Intro", "Waves"])
for song in mix:      # works because of the iterator named items
  echo song
```

That last trick is worth remembering: a `for` loop over a value calls the iterator named `items`. Define `items` (and `pairs`, for `for i, x in ...`) and your type works in `for` loops like a built-in.

**Limits of the simple kind:** an iterator can only be used in a `for` loop. You can't store one in a variable or call it like a proc. If you need a list afterwards, collect it: `import std/sequtils` and `toSeq(evens(8))`.

```compare python
def evens(up_to):
    n = 0
    while n <= up_to:
        yield n
        n += 2
```

```compare javascript
function* evens(upTo) {
  for (let n = 0; n <= upTo; n += 2) yield n;
}
```

```compare rust
// Implement the Iterator trait, or build one: (0..=up_to).step_by(2)
```

```exercise
goal: "Write `iterator countdown(n: int): int` that yields n, n-1, ... down to 1. The loop body is given; add the yield."
code: |-
  iterator countdown(n: int): int =
    var i = n
    while i >= 1:
      i -= 1

  for x in countdown(3):
    echo x
checks:
  - match: 'while\s+i\s*>=\s*1\s*:\s*\n\s+yield\s+i\s*\n\s+i\s*-=\s*1'
    message: Add yield i as the first line inside the while, before i -= 1.
solution: |-
  iterator countdown(n: int): int =
    var i = n
    while i >= 1:
      yield i
      i -= 1

  for x in countdown(3):
    echo x
```

```quiz
question: "What makes `for x in myThing` work for your own type?"
options:
  - Implementing a len proc.
  - Defining an iterator called items for that type.
  - Converting it to a seq first.
answer: 1
explain: A for loop with one variable calls items; with two variables, it calls pairs.
```
