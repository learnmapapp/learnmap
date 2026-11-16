---
title: Sets of values
icon: "🎒"
branch: data
requires: [enums]
summary: Built-in bit sets for enums and small types, and HashSet for everything else.
---
**Pack a backpack.** Each item is in or out; packing it twice changes nothing, and order doesn't matter. That's a set.

```nim title=backpack.nim
type
  Gear = enum
    tent, stove, map, rope, torch

var packed: set[Gear] = {tent, map}
packed.incl(torch)          # add one
packed.excl(map)            # remove one
echo packed                 # {tent, torch}
echo stove in packed        # false

let needed = {tent, stove, torch}
echo needed - packed        # {stove}: still to pack
echo needed * packed        # {tent, torch}: packed and needed
echo packed + {rope}        # {tent, rope, torch}
echo card(packed)           # 2
```

**The operators**, which read like set math from school:

| Code | Meaning |
| --- | --- |
| `a + b` | union: in either |
| `a * b` | intersection: in both |
| `a - b` | difference: in `a`, not in `b` |
| `x in a` | membership |
| `a <= b` | `a` is a subset of `b` |
| `card(a)` | number of elements |

**Why these are so fast.** A built-in `set[Gear]` is stored as bits: one bit per possible enum value. `{tent, map}` is just a small number, and `in` is a single bit test. That's also its limit: the element type must be small, like an enum, `char`, `bool` or a small int range such as `set[0..63]`. A `set[int]` or a `set[string]` doesn't compile.

**A classic use: flags.** Instead of six `bool` fields, one set:

```nim
type Permission = enum read, write, execute
let mode: set[Permission] = {read, write}
if write in mode:
  echo "can edit"
```

And `char` sets make character checks tidy: `if c in {'a'..'z', '_'}:`.

**Bigger values? Use `HashSet`** from `std/sets`, which works for strings, ints and anything hashable:

```nim
import std/sets

var visited = toHashSet(["home"])
visited.incl("about")
echo "home" in visited      # true
echo visited.len            # 2
```

```compare python
packed = {"tent", "map"}
packed.add("torch")
needed - packed
```

```compare javascript
const packed = new Set(["tent", "map"]);
packed.add("torch");
// difference: [...needed].filter(x => !packed.has(x))
```

```compare rust
use std::collections::HashSet;
let mut packed: HashSet<&str> = ["tent", "map"].into();
packed.insert("torch");
```

```exercise
goal: "Use set difference to find what's still missing: set `missing` to `needed - have`."
code: |-
  type Fruit = enum apple, banana, cherry
  let needed = {apple, banana, cherry}
  let have = {banana}
  let missing = needed
  echo missing
checks:
  - match: 'let\s+missing\s*=\s*needed\s*-\s*have'
    message: Write let missing = needed - have
solution: |-
  type Fruit = enum apple, banana, cherry
  let needed = {apple, banana, cherry}
  let have = {banana}
  let missing = needed - have
  echo missing
```

```quiz
question: "Why doesn't `var s: set[string]` compile?"
options:
  - Sets can only hold enums.
  - A built-in set needs a small element type, because it's stored as one bit per possible value.
  - Strings must be imported first.
answer: 1
explain: There are infinitely many strings. Use HashSet from std/sets instead.
```
