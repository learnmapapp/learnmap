---
title: Keyed tables
icon: "🗂️"
branch: data
requires: [strings]
summary: Table maps keys to values; look up safely, count with CountTable, keep order with OrderedTable.
---
**Common jobs and how to do them with `std/tables`.** Nim's dictionary type is called `Table`.

**Create one and look things up:**

```nim title=prices.nim
import std/tables

var prices = {"apple": 0.5, "bread": 2.25}.toTable
prices["milk"] = 1.1            # add or overwrite
echo prices["bread"]            # 2.25
echo prices.len                 # 3
```

`{"key": value, ...}` on its own is a list of pairs; `.toTable` turns it into a `Table[string, float]`. To start empty: `var prices = initTable[string, float]()`, or just `var prices: Table[string, float]`.

**Look up a key that might be missing:**

```nim
echo prices["cake"]                     # KeyError: key not found: cake
echo prices.getOrDefault("cake")        # 0.0
echo prices.getOrDefault("cake", 9.99)  # 9.99
if "cake" in prices:                    # check first
  echo prices["cake"]
```

Plain `[]` raises a `KeyError` for a missing key, rather than returning a hidden "nothing". Pick the lookup that says what you mean.

**Walk through all entries:**

```nim
for item, price in prices:
  echo item, ": ", price
```

The order is *not* the insertion order. If order matters, use `OrderedTable` (`.toOrderedTable`); it has the same procs.

**Update a value in place:**

```nim
prices["apple"] += 0.1                  # works when the key exists
prices.mgetOrPut("tea", 0.0) += 1.5     # create with 0.0 if missing, then add
prices.del("milk")                      # remove a key
```

**Count things:** that's so common it has its own type:

```nim
var votes = initCountTable[string]()
for color in ["red", "blue", "red", "green", "red"]:
  votes.inc(color)
echo votes["red"]       # 3
echo votes["pink"]      # 0
echo votes.largest      # (key: "red", val: 3)
```

A missing key in a `CountTable` simply counts as `0`.

```compare python
prices = {"apple": 0.5, "bread": 2.25}
prices.get("cake", 9.99)
from collections import Counter
```

```compare javascript
const prices = new Map([["apple", 0.5], ["bread", 2.25]]);
prices.get("cake") ?? 9.99;
```

```compare rust
use std::collections::HashMap;
let mut prices = HashMap::from([("apple", 0.5), ("bread", 2.25)]);
prices.get("cake").copied().unwrap_or(9.99);
```

```exercise
goal: "This crashes with a KeyError for `\"pear\"`. Use `getOrDefault` so a missing fruit counts as 0."
code: |-
  import std/tables
  let stock = {"apple": 12, "kiwi": 4}.toTable
  echo stock["pear"]
checks:
  - match: 'stock\.getOrDefault\(\s*"pear"\s*\)|getOrDefault\(\s*stock\s*,\s*"pear"\s*\)'
    message: Write stock.getOrDefault("pear")
solution: |-
  import std/tables
  let stock = {"apple": 12, "kiwi": 4}.toTable
  echo stock.getOrDefault("pear")
```

```quiz
question: "What happens with `t[\"x\"]` when the table `t` has no key `\"x\"`?"
options:
  - It returns the default value for the type.
  - It raises a KeyError.
  - It adds "x" with a default value.
answer: 1
explain: Use getOrDefault, or check with in first, when a key might be missing.
```
