---
title: Captured functions
icon: "🫙"
branch: design
requires: [procedures, bindings]
summary: Procs are values; anonymous procs and closures capture variables from where they're made.
---
**Procs are values.** You can store a proc in a variable or pass it to another proc, just like an int:

```nim
proc shout(s: string): string = s & "!"

let fn = shout                      # no parentheses: the proc itself
echo fn("hey")                      # hey!
```

**Anonymous procs** have no name and are written inline, right where they're used. The most common use is handing a rule to a library proc:

```nim title=filter.nim
import std/sequtils

let prices = @[4, 18, 7, 25, 12]
let cheap = prices.filter(proc (p: int): bool = p < 10)
echo cheap                          # @[4, 7]
```

That's a mouthful, so `std/sugar` offers an arrow shorthand. These two lines are the same:

```nim
import std/sugar
let cheap = prices.filter(proc (p: int): bool = p < 10)
let cheap2 = prices.filter(p => p < 10)
```

The arrow form works when Nim can infer the types from where the proc is passed.

**Closures: procs that remember.** An anonymous proc can use variables from the place where it was created, even after that place is gone:

```nim
proc makeCounter(): proc (): int =
  var count = 0
  result = proc (): int =
    count += 1
    count

let next = makeCounter()
echo next()     # 1
echo next()     # 2
echo next()     # 3
```

`makeCounter` has finished running before the first `next()`, yet `count` lives on. The inner proc *captured* it. Each call to `makeCounter` makes a fresh, separate `count`. That's a closure: a proc plus the variables it captured.

**The type of a proc** is written like its signature, without the name: `proc (p: int): bool`. So `makeCounter` returns a `proc (): int`. You'll need this when a parameter or field holds a proc.

```nim
proc applyTwice(f: proc (x: int): int, x: int): int = f(f(x))
echo applyTwice(x => x * 3, 2)      # 18
```

```compare python
def make_counter():
    count = 0
    def nxt():
        nonlocal count
        count += 1
        return count
    return nxt
```

```compare javascript
function makeCounter() {
  let count = 0;
  return () => ++count;
}
```

```compare rust
fn make_counter() -> impl FnMut() -> i32 {
    let mut count = 0;
    move || { count += 1; count }
}
```

```exercise
goal: "Use `filter` with an arrow proc to keep only the words longer than 3 characters: `w => w.len > 3`."
code: |-
  import std/[sequtils, sugar]

  let words = @["a", "tree", "is", "green"]
  let long = words
  echo long
checks:
  - match: 'words\.filter\(\s*w\s*=>\s*w\.len\s*>\s*3\s*\)|filter\(\s*words\s*,\s*w\s*=>\s*w\.len\s*>\s*3\s*\)'
    message: Write words.filter(w => w.len > 3)
solution: |-
  import std/[sequtils, sugar]

  let words = @["a", "tree", "is", "green"]
  let long = words.filter(w => w.len > 3)
  echo long
```

```quiz
question: "Two counters are made with `let a = makeCounter()` and `let b = makeCounter()`. After `a()` and `a()`, what does `b()` return?"
options:
  - "1"
  - "3"
  - "2"
answer: 0
explain: Each call to makeCounter creates its own count, so b starts from zero.
```
