---
title: Fixed arrays
icon: "🧱"
branch: data
requires: [types, for]
summary: array[N, T] has a size fixed at compile time, and checks every index.
---
**Think of an egg carton.** It has exactly 12 slots, always. You can put different eggs in, but you can't add a 13th slot. That's a Nim `array`:

```nim title=week.nim
var steps: array[7, int]       # 7 ints, all starting at 0
steps[0] = 8200
steps[6] = 12050

let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
for i, day in days:
  echo day, ": ", steps[i]
echo steps.len    # 7
```

The type `array[7, int]` says both how many and of what. The size is part of the type: an `array[7, int]` and an `array[5, int]` are different types. The size must be known when compiling, so it's a literal or a [const](node:constants).

**Every index is checked.** Reach past the end and the program stops with a clear error instead of reading random memory:

```nim
echo steps[7]   # Error: index 7 not in 0 .. 6
```

With a literal index, the compiler catches it before the program even runs.

**The fun part: any index range you like.** The size can be a range, and the index can even be an [enum](node:enums):

```nim
var temps: array[1..12, float]    # months 1 to 12, no off-by-one juggling
temps[1] = 3.5                    # January

type Color = enum red, green, blue
const hex: array[Color, string] = ["#f00", "#0f0", "#00f"]
echo hex[green]                   # #0f0
```

**Arrays are values.** Assigning an array to another variable copies all the slots. Change the copy and the original stays the same.

**When to use them:** when the count is fixed by nature: days of the week, an RGB color, a chess board, a lookup table. When the count depends on the data, use a [sequence](node:sequences), which can grow.

```compare python
steps = [0] * 7   # a list; Python has no fixed-size array type
```

```compare javascript
const steps = new Array(7).fill(0);   // can still grow later
```

```compare rust
let mut steps = [0; 7];   // [i32; 7], fixed size like Nim
```

```exercise
goal: "A tic-tac-toe row has exactly 3 cells. Declare `row` as an `array[3, char]`."
code: |-
  var row: seq[char]
  row[0] = 'X'
  echo row
checks:
  - match: 'var\s+row\s*:\s*array\[\s*3\s*,\s*char\s*\]'
    message: 'Write var row: array[3, char]'
solution: |-
  var row: array[3, char]
  row[0] = 'X'
  echo row
```

```quiz
question: "What are the valid indexes of `array[1..4, int]`?"
options:
  - 0, 1, 2, 3
  - 1, 2, 3, 4
  - 0 to 4
answer: 1
explain: The index range is part of the type, and 1..4 includes both ends.
```
