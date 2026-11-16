---
title: Optional values
icon: "❓"
branch: data
requires: [procedures]
summary: Option[T] makes "maybe there's no value" part of the type, with some, none and isSome.
---
**Three bad ways to say "not found":**

```nim
proc findUser(id: int): string = ""       # is "" a missing user, or a user with no name?
proc indexOf(xs: seq[int], x: int): int = -1   # fine until someone forgets to check for -1
proc price(item: string): float = 0.0     # free, or unknown?
```

Each one uses an ordinary value to mean "nothing", and hopes the caller remembers. **One good way:** say it in the type, with `Option` from `std/options`:

```nim title=lookup.nim
import std/options

proc findIndex(xs: openArray[string], target: string): Option[int] =
  for i, x in xs:
    if x == target:
      return some(i)
  none(int)

let names = ["Ada", "Grace", "Linus"]

let hit = names.findIndex("Grace")
if hit.isSome:
  echo "found at ", hit.get     # found at 1

let miss = names.findIndex("Bjarne")
echo miss.isNone                # true
echo miss.get(-1)               # -1: get with a fallback
echo miss                       # none(int)
```

An [[option]] is a box that either holds a value (`some(1)`) or is empty (`none(int)`). The return type `Option[int]` tells every caller, before they read a line of the body, that the answer might be missing.

**Getting the value out:**

| Code | When it's `some(x)` | When it's `none` |
| --- | --- | --- |
| `o.isSome` / `o.isNone` | `true` / `false` | `false` / `true` |
| `o.get` | `x` | raises `UnpackDefect` |
| `o.get(fallback)` | `x` | `fallback` |
| `o.map(f)` | `some(f(x))` | `none` |

Always check `isSome` before a bare `get`, or use the fallback version.

**When to use Option, and when not:**

- *A lookup that can miss?* Option.
- *An optional object field*, like a middle name? `Option[string]`.
- *Something that went wrong*, with a reason to report? Raise an [exception](node:exceptions) instead; an empty Option can't say *why*.

```compare python
def find_index(xs, target) -> int | None:
    return xs.index(target) if target in xs else None
```

```compare javascript
// No Option type; undefined plays the role, unchecked.
const i = names.indexOf("Grace");   // -1 when missing
```

```compare rust
fn find_index(xs: &[&str], target: &str) -> Option<usize> {
    xs.iter().position(|x| *x == target)
}
```

```exercise
goal: "Replace the magic `-1` with an Option: return `some(n)` for even numbers and `none(int)` otherwise, and change the return type to `Option[int]`."
code: |-
  import std/options

  proc firstEven(xs: openArray[int]): int =
    for n in xs:
      if n mod 2 == 0:
        return n
    -1
checks:
  - match: '\)\s*:\s*Option\[\s*int\s*\]\s*='
    message: 'The return type should be Option[int].'
  - match: 'return\s+some\(\s*n\s*\)'
    message: Write return some(n)
  - match: 'none\(\s*int\s*\)'
    message: End with none(int) instead of -1.
solution: |-
  import std/options

  proc firstEven(xs: openArray[int]): Option[int] =
    for n in xs:
      if n mod 2 == 0:
        return some(n)
    none(int)
```

```quiz
question: "`let o = none(string)`. What does `o.get(\"anon\")` return?"
options:
  - "\"\""
  - "\"anon\""
  - It raises an exception.
answer: 1
explain: get with an argument returns that fallback when the Option is empty.
```
