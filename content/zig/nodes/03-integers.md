---
title: Integer types
icon: "🔢"
branch: basics
requires: [bindings]
summary: Pick integers by sign and size, from u8 to i64 and beyond.
---
Zig integer types say two things in their name: whether they can be negative, and how many bits they use.

| Type | Range | Typical use |
| --- | --- | --- |
| `u8` | 0 to 255 | bytes, characters |
| `i32` | about ±2 billion | general numbers |
| `u64` | 0 to about 1.8 × 10¹⁹ | sizes, counters |
| `usize` | pointer-sized | indexes and lengths |

`u` means unsigned (never negative), `i` means signed. Unusual sizes work too: `u3` holds 0 to 7, `i7` holds -64 to 63.

```zig title=integers.zig
const std = @import("std");

pub fn main() void {
    const level: u8 = 200;
    const temperature: i16 = -12;
    const big = 1_000_000; // underscores are only for readability
    std.debug.print("{d} {d} {d}\n", .{ level, temperature, big });
}
```

Zig won't silently mix types. You can always use a smaller type where a bigger one is expected, because that's safe. Going the other way needs an explicit cast (more on that in [Checked conversions](node:casts)).

```zig
const small: u8 = 42;
const wide: u32 = small; // fine: every u8 fits in a u32
```

The type also lets the compiler catch mistakes early. If a constant doesn't fit, you find out before the program ever runs:

```repl shell
> zig run integers.zig
error: type 'u8' cannot represent integer value '300'
```

```compare python
level = 200        # Python ints have no size limit
```

```compare rust
let level: u8 = 200;
let temperature: i16 = -12;
```

```exercise
goal: Store a temperature of -40. Pick a type that can hold it.
code: |-
  const temperature: u8 = -40;
checks:
  - notMatch: ':\s*u\d+'
    message: Unsigned types (u...) can't be negative.
  - match: 'const\s+temperature\s*:\s*i(8|16|32|64)\s*=\s*-40'
    message: Use a signed type such as i8 or i16.
solution: |-
  const temperature: i16 = -40;
hint: Signed types start with an i.
```

```quiz
question: Which type can hold the value 255 but not 256?
options:
  - "`i8`"
  - "`u8`"
  - "`u16`"
answer: 1
explain: A u8 has 8 bits, so it holds 0 to 255. An i8 stops at 127; a u16 goes up to 65535.
```
