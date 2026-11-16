---
title: Generic procedures
icon: "🧩"
branch: design
requires: [procedures]
summary: Type parameters in square brackets let one proc work for many types, checked at compile time.
---
**Refactoring story.** You start with this:

```nim
proc lastInt(xs: seq[int]): int = xs[^1]
proc lastString(xs: seq[string]): string = xs[^1]
proc lastFloat(xs: seq[float]): float = xs[^1]
```

Three identical bodies. Only the type changes. Let's turn them into one.

**Step 1: name the varying type.** Put a type parameter in square brackets after the name, then use it like any type:

```nim title=generic.nim
proc last[T](xs: seq[T]): T = xs[^1]

echo last(@[1, 2, 3])          # 3
echo last(@["a", "b"])         # b
echo @[1.5, 2.5].last          # 2.5
```

`T` is a stand-in. At each call, Nim looks at the argument (a `seq[int]`, say), works out that `T` is `int`, and compiles a version of `last` for ints. You rarely need to write the type yourself; when you do, it's `last[int](...)`.

**Step 2: generalize the container too.** Use [openArray](node:openarrays), and arrays work as well:

```nim
proc last[T](xs: openArray[T]): T = xs[^1]
echo last([7, 8, 9])           # 9
```

**Step 3: ask for what you need.** This one is subtle:

```nim
proc largest[T](xs: openArray[T]): T =
  result = xs[0]
  for x in xs:
    if x > result:
      result = x

echo largest([3, 9, 4])           # 9
echo largest(["pear", "apple"])   # pear
```

It needs `>` to exist for `T`. Ints and strings have it, so both calls compile. Call it with a type that has no `>`, and the compiler stops with an error pointing at the comparison. All of this is checked at compile time; a [[generic]] costs nothing when the program runs.

You can also restrict `T` up front, which gives friendlier errors: `proc total[T: int | float](xs: openArray[T]): T` accepts only ints and floats.

**Generic types work the same way.** You've used them since lesson one: `seq[T]`, `Table[K, V]`, `Option[T]`. Your own:

```nim
type Pair[T] = object
  left, right: T

let p = Pair[int](left: 1, right: 2)
```

```compare python
from typing import TypeVar
T = TypeVar("T")
def last(xs: list[T]) -> T:   # checked by type checkers only
    return xs[-1]
```

```compare javascript
// TypeScript: function last<T>(xs: T[]): T { return xs[xs.length - 1]; }
```

```compare rust
fn last<T: Clone>(xs: &[T]) -> T { xs[xs.len() - 1].clone() }
```

```exercise
goal: "Turn `firstInt` into a generic `first[T]` that takes an `openArray[T]` and returns `T`, so both calls compile."
code: |-
  proc firstInt(xs: openArray[int]): int = xs[0]

  echo first([1, 2])
  echo first(["x", "y"])
checks:
  - match: 'proc\s+first\s*\[\s*T\s*\]\s*\(\s*xs\s*:\s*openArray\[\s*T\s*\]\s*\)\s*:\s*T'
    message: 'Write proc first[T](xs: openArray[T]): T'
solution: |-
  proc first[T](xs: openArray[T]): T = xs[0]

  echo first([1, 2])
  echo first(["x", "y"])
```

```quiz
question: "When does Nim check that `>` exists for the T in `largest[T]`?"
options:
  - At compile time, for each type the proc is called with.
  - At runtime, the first time the comparison runs.
  - Never; it's the caller's responsibility.
answer: 0
explain: Generics are instantiated per type while compiling, so missing operations are compile errors.
```
