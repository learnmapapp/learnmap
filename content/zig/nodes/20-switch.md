---
title: Exhaustive switch
icon: "🎰"
branch: flow
requires: [enums]
summary: switch must handle every possible value, and returns a value too.
---
Let's build the brain of a vending machine.

```zig title=vending.zig
const std = @import("std");

const Coin = enum { nickel, dime, quarter, button };

fn cents(coin: Coin) u32 {
    return switch (coin) {
        .nickel => 5,
        .dime => 10,
        .quarter => 25,
        .button => 0, // someone tried a button. Nice try.
    };
}

fn label(stock: u8) []const u8 {
    return switch (stock) {
        0 => "sold out",
        1...3 => "almost gone",
        else => "plenty",
    };
}

pub fn main() void {
    std.debug.print("{d}¢, {s}\n", .{ cents(.quarter), label(2) });
}
```

Things to notice:

- Every `switch` must be **exhaustive**: every possible value has to be covered. For `Coin` there are only four values, so listing them all is enough. A `u8` has 256, so `label` needs an `else`.
- `1...3` is an **inclusive** range, with three dots. (Slices and `for` ranges use two dots and exclude the end. Yes, it takes a while to remember.)
- Several values can share a branch: `.nickel, .dime => "small change"`.
- `switch` is an expression, like `if`: each branch produces a value.
- There's no fall-through and no `break`. Only one branch ever runs.

```tip
Avoid `else` when switching on your own enums. Without it, adding a new value makes every switch that forgets about it a compile error. With it, the new value quietly takes the `else` branch.
```

```compare javascript
switch (coin) {
  case "nickel": return 5;
  case "dime": return 10;
  // forgot "quarter"? JavaScript won't tell you.
}
```

```compare rust
match coin {
    Coin::Nickel => 5,
    Coin::Dime => 10,
    Coin::Quarter => 25,
    Coin::Button => 0,
}
```

```exercise
goal: The machine now accepts a `.dollar` coin, but `cents` doesn't compile any more. Handle the new coin (100 cents).
code: |-
  const Coin = enum { nickel, dime, quarter, dollar };

  fn cents(coin: Coin) u32 {
      return switch (coin) {
          .nickel => 5,
          .dime => 10,
          .quarter => 25,
      };
  }
checks:
  - match: '\.dollar\s*=>\s*100'
    message: Add a branch for .dollar.
  - notMatch: 'else\s*=>'
    message: Handle .dollar by name instead of with else, so future coins are caught too.
solution: |-
  const Coin = enum { nickel, dime, quarter, dollar };

  fn cents(coin: Coin) u32 {
      return switch (coin) {
          .nickel => 5,
          .dime => 10,
          .quarter => 25,
          .dollar => 100,
      };
  }
```

```quiz
question: Which values does the branch `1...3 =>` match?
options:
  - 1 and 2
  - 1, 2 and 3
  - Only 1 and 3
answer: 1
explain: Switch ranges use three dots and include both ends.
```
