---
title: Integer widths
icon: "🔢"
branch: basics
requires: [variables]
summary: Int for everyday counting, and sized types like UInt8 when every bit counts.
---
**Predict the output:**

```mojo title=odometer.mojo
def main():
    var level: UInt8 = 250
    level += 10
    print(level)
```

```repl shell
> mojo run odometer.mojo
4
```

Not 260? A `UInt8` is an unsigned 8-bit integer: it can only hold 0 to 255. Like a car's odometer rolling over from 99999 to 00000, it **wraps around**: 250 + 10 = 260, minus 256, is 4. Python integers grow as large as needed, so you never see this there. In Mojo, integers have a fixed size, chosen by you.

The menu:

| Type | Bits | Range |
| --- | --- | --- |
| `Int` | 64 on most machines | about ±9.2 quintillion |
| `Int8` / `UInt8` | 8 | -128 to 127 / 0 to 255 |
| `Int16` / `UInt16` | 16 | about ±32 thousand / 0 to 65,535 |
| `Int32` / `UInt32` | 32 | about ±2.1 billion / 0 to 4.2 billion |
| `Int64` / `UInt64` | 64 | huge |

**Which should you use?** `Int` for almost everything: counters, indexes, lengths and sizes. It's what `len()` returns and what lists expect. Reach for a sized type when the size *matters*: pixel values (`UInt8`), binary file formats, or millions of numbers where smaller types save memory and let [SIMD](node:simd) process more of them at once.

**Mixing types needs a conversion.** Mojo won't quietly combine a `UInt8` and an `Int`, because it would have to guess which size you want. Convert explicitly by calling the type like a function:

```mojo
var small: UInt8 = 200
var big: Int = 1000
var total = Int(small) + big   # 1200
```

The next lessons cover [floats](node:floats) and [conversions](node:conversion) in more detail.

Integer literals can have underscores for readability: `1_000_000`. Hex and binary work too: `0xFF`, `0b1010`.

```compare python
level = 250
level += 10   # 260: Python ints never overflow
```

```compare rust
let mut level: u8 = 250;
level = level.wrapping_add(10);  // 4 (plain + panics in debug builds)
```

```exercise
goal: "`brightness` must stay between 0 and 255, and should use one byte. Give it the type `UInt8`."
code: |-
  def main():
      var brightness: Int = 128
checks:
  - match: 'var\s+brightness\s*:\s*UInt8\s*=\s*128'
    message: 'Write var brightness: UInt8 = 128'
solution: |-
  def main():
      var brightness: UInt8 = 128
```

```quiz
question: "What's the largest value a `UInt8` can hold?"
options:
  - "127"
  - "255"
  - "256"
answer: 1
explain: 8 bits give 256 different values, from 0 to 255.
```
