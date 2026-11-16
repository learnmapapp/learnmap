---
title: Unique values
icon: "🫧"
branch: data
requires: [lists]
summary: A Set keeps each value at most once, and answers "is it in there?" fast.
---
**Puzzle.** A festival scans wristbands at the gate. Some people leave and come back, so the same code is scanned more than once. How many *different* visitors were there?

```mojo title=gate.mojo
from std.collections import Set

def main():
    var scans: List[String] = ["A17", "B02", "A17", "C33", "B02", "A17"]
    var visitors = Set[String]()
    for code in scans:
        visitors.add(code)
    print(len(scans), "scans,", len(visitors), "visitors")
```

```repl shell
> mojo run gate.mojo
6 scans, 3 visitors
```

Adding a value that's already in a set does nothing. That's the whole idea: a set holds each value **at most once**.

**Sets are fast at one question:** "is this in there?" `"C33" in visitors` takes about the same time whether the set has ten codes or ten million. Asking the same of a list means checking each item, one by one. If your program often asks "have I seen this before?", use a set.

**Combining sets** with operators, as in maths:

```mojo
var friday = Set[String]("A17", "B02", "C33")
var saturday = Set[String]("B02", "D48")

var either = friday | saturday   # A17, B02, C33, D48: came on any day
var both = friday & saturday     # B02: came on both days
var only_friday = friday - saturday   # A17, C33
```

| Operator | Name | Keeps values in... |
| --- | --- | --- |
| `a \| b` | union | either set |
| `a & b` | intersection | both sets |
| `a - b` | difference | `a` but not `b` |

**What sets don't do:** keep an order, or allow indexing. There's no `visitors[0]`, since there is no "first" visitor in a set. Loop with `for code in visitors` to see them all, in no particular order.

**Removing:** `visitors.remove("A17")` raises an error if the value isn't there; `visitors.discard("A17")` quietly does nothing in that case.

```compare python
visitors = set(scans)
either = friday | saturday
```

```compare javascript
const visitors = new Set(scans);
```

```compare rust
let visitors: HashSet<&str> = scans.iter().copied().collect();
```

```exercise
goal: "Only count each tag once: use a `Set[String]` for `seen` instead of a list."
code: |-
  from std.collections import Set

  def main():
      var seen: List[String] = []
      for tag in ["mojo", "fast", "mojo"]:
          seen.append(tag)
      print(len(seen))
checks:
  - match: 'var\s+seen\s*=\s*Set\[\s*String\s*\]\(\s*\)'
    message: Write var seen = Set[String]()
  - match: 'seen\.add\(\s*tag\s*\)'
    message: Sets use add, not append.
solution: |-
  from std.collections import Set

  def main():
      var seen = Set[String]()
      for tag in ["mojo", "fast", "mojo"]:
          seen.add(tag)
      print(len(seen))
```

```quiz
question: "A set has \"x\" in it. What happens with `s.add(\"x\")`?"
options:
  - The set now holds \"x\" twice.
  - Nothing; the set is unchanged.
  - It raises an error.
answer: 1
explain: Each value appears in a set at most once, so adding a duplicate has no effect.
```
