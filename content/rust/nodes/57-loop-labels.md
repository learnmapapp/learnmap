---
title: Loop labels and values
icon: "🏷️"
branch: basics
requires: [loops]
summary: Break out of nested loops, and return a value from loop.
---
Two small loop features save a lot of awkward code.

## Returning a value from `loop`

`loop` runs forever until you `break`. You can hand a value back with that `break`, which makes `loop` an expression:

```rust title=src/main.rs
fn main() {
    let mut n = 1;
    let first_big_square = loop {
        if n * n > 50 {
            break n * n;
        }
        n += 1;
    };
    println!("{first_big_square}"); // 64
}
```

## Labels for nested loops

A plain `break` only leaves the innermost loop. To leave an outer one, give it a **label**, a name starting with a quote, like `'outer`:

```rust
let grid = [[1, 2, 3], [4, 99, 6], [7, 8, 9]];

'search: for row in grid {
    for cell in row {
        if cell == 99 {
            println!("found it");
            break 'search;
        }
    }
}
```

Without the label, the program would carry on with the next row after finding 99. `continue 'search` also works: it skips to the next round of the outer loop.

```compare python
# Python has no labels; you'd use a flag or a function with return
```

```compare javascript
search: for (const row of grid) {
  for (const cell of row) if (cell === 99) break search;
}
```

```compare java
search:
for (int[] row : grid) for (int cell : row) if (cell == 99) break search;
```

```compare go
search:
for _, row := range grid { for _, c := range row { if c == 99 { break search } } }
```

```exercise
goal: "Label the outer loop `'rows` and make the `break` leave it."
code: |
  for row in grid {
      for cell in row {
          if cell == 0 {
              break;
          }
      }
  }
checks:
  - match: "'rows\\s*:\\s*for\\s+row"
    message: "Put 'rows: in front of the outer for."
  - match: "break\\s+'rows\\s*;"
    message: "Write break 'rows; to leave the outer loop."
solution: |
  'rows: for row in grid {
      for cell in row {
          if cell == 0 {
              break 'rows;
          }
      }
  }
```

```quiz
question: "What does `let x = loop { break 5; };` set `x` to?"
options:
  - "`()`"
  - "`5`"
  - Nothing, it doesn't compile.
answer: 1
explain: break can carry a value out of a loop, and that becomes the value of the loop expression.
```
