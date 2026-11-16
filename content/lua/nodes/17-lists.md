---
title: Sequence tables
icon: 🚦
branch: tables
requires:
  - locals
summary: List-style table constructors use consecutive integer keys starting at 1.
---

List-style table constructors use consecutive integer keys starting at 1. Reading an absent key yields nil.

A useful term here is [[table]]: Lua’s associative data structure, used for sequences, records, maps, and objects.

```lua
local colors = {"red", "blue"}
print(colors[1])
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```compare python
values = [2, 4, 6]
print(values[0], len(values))
```

```compare javascript
const values = [2, 4, 6];
console.log(values[0], values.length);
```

```compare rust
fn main() {
    let values = vec![2, 4, 6];
    println!("{} {}", values[0], values.len());
}
```

```exercise
goal: Repair the starting example using what you learned about sequence tables.
lang: lua
code: |-
  local colors = {"red", "blue"}
  print(colors[0])
checks:
  - match: colors\[1\]
    message: Use colors[1] for this step.
  - notMatch: colors\[0\]
    message: Replace colors[0] in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about sequence tables is correct?
options:
  - List constructors start at key zero.
  - An absent key throws an indexing error.
  - List-style table constructors use consecutive integer keys starting at 1. Reading an absent key
    yields nil.
answer: 2
explain: List-style table constructors use consecutive integer keys starting at 1. Reading an absent
  key yields nil.
```
