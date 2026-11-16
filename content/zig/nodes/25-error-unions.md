---
title: Error unions
icon: "📦"
branch: errors
requires: [error-sets, functions]
summary: "!T: a return value that holds either a result or an error."
---
Remember `pub fn main() !void` from the very first lesson? Time to explain that `!`.

A return type like `ParseError!u8` is an **[[error union]]**: the function hands back *either* a `u8` *or* one of the errors in `ParseError`. Think of a parcel that contains either the gift you ordered, or a note saying why it couldn't be delivered. You can't get at the gift without checking which one you got.

```zig title=age.zig
const std = @import("std");

const AgeError = error{ Negative, Unrealistic };

fn checkAge(age: i32) AgeError!u8 {
    if (age < 0) return error.Negative;
    if (age > 150) return error.Unrealistic;
    return @intCast(age);
}

pub fn main() void {
    const result = checkAge(200);
    if (result) |age| {
        std.debug.print("age {d}\n", .{age});
    } else |err| {
        std.debug.print("rejected: {s}\n", .{@errorName(err)});
    }
}
```

```repl shell
> zig run age.zig
rejected: Unrealistic
```

The `if`/`else` with two captures is the long way of unwrapping one: `|age|` for success, `|err|` for failure. (`@intCast` converts the `i32` into a `u8`; [Checked conversions](node:casts) covers it.)

**The short form `!u8`** leaves out the error set, and Zig works it out from the function body. That's what `main() !void` does: "main returns nothing, or whatever error happens inside."

Two things you **can't** do: ignore the result, or use it as if it were a number.

```zig
checkAge(30); // error: error union is ignored
const next = checkAge(30) + 1; // error: can't add to an error union
```

```compare python
def check_age(age):
    if age < 0:
        raise ValueError("negative")   # invisible in the signature
    return age
```

```compare rust
fn check_age(age: i32) -> Result<u8, AgeError> {
    if age < 0 { return Err(AgeError::Negative); }
    Ok(age as u8)
}
```

```exercise
goal: "`withdraw` should fail with `error.InsufficientFunds` when the amount is larger than the balance. Make the return type an error union, and return the error."
code: |-
  fn withdraw(balance: u32, amount: u32) u32 {
      if (amount > balance) return 0;
      return balance - amount;
  }
checks:
  - match: '\)\s*!u32'
    message: Use !u32 as the return type, so the function can fail.
  - match: 'return\s+error\.InsufficientFunds'
    message: Return error.InsufficientFunds instead of 0.
solution: |-
  fn withdraw(balance: u32, amount: u32) !u32 {
      if (amount > balance) return error.InsufficientFunds;
      return balance - amount;
  }
```

```quiz
question: "What does `fn load() !Config` return?"
options:
  - A Config that is never an error.
  - Either a Config or an error, from a set Zig infers.
  - An optional Config.
answer: 1
explain: A bare ! means an error union with an inferred error set.
```
