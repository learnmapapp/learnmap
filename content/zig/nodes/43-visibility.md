---
title: Public declarations
icon: "🚪"
branch: tools
requires: [imports, structs]
summary: pub decides what other files can see. Everything else stays private.
---
Think of a restaurant. Diners see the menu; the kitchen stays behind the swinging door. In Zig, `pub` is the menu. Anything without it is kitchen: usable within its own file, invisible from outside.

```zig title=bank.zig
const std = @import("std");

pub const Account = struct {
    balance: u64 = 0,

    pub fn deposit(self: *Account, amount: u64) void {
        self.balance += applyBonus(amount);
    }
};

// No pub: a private helper. Other files can't call it.
fn applyBonus(amount: u64) u64 {
    return if (amount >= 1000) amount + 10 else amount;
}
```

```zig title=main.zig
const bank = @import("bank.zig");

pub fn main() void {
    var acct = bank.Account{};
    acct.deposit(1500); // fine
    // _ = bank.applyBonus(5); // error: 'applyBonus' is not marked 'pub'
}
```

`pub` works on functions, constants, types, and on methods inside structs. A private method can only be called from the same file.

Struct **fields** are different: they're always visible. There's no `private` keyword for fields. Above, `main` could set `acct.balance = 1_000_000` directly, and Zig wouldn't stop it. The convention is to document which fields callers shouldn't touch. Some people prefix them with an underscore as a hint.

The "every file is a struct" idea from [the last lesson](node:imports) explains it all. Top-level declarations are the file-struct's declarations, and `pub` controls which are visible to outsiders.

And `pub fn main` needs its `pub` too: that's how Zig's startup code finds your entry point.

```compare python
def _apply_bonus(amount):   # underscore: private by convention only
    ...
```

```compare rust
pub struct Account { balance: u64 }  // in Rust, fields can be private too
fn apply_bonus(amount: u64) -> u64 { amount }
```

```exercise
goal: Other files should be able to call `slugify`, but `isAllowed` is an internal helper. Fix the visibility of both.
code: |-
  pub fn isAllowed(c: u8) bool {
      return std.ascii.isAlphanumeric(c);
  }

  fn slugify(out: []u8, title: []const u8) []u8 {
      // ...
  }
checks:
  - match: '^pub\s+fn\s+slugify'
    message: slugify should be public.
  - match: '^fn\s+isAllowed'
    message: isAllowed should be private (remove pub).
solution: |-
  fn isAllowed(c: u8) bool {
      return std.ascii.isAlphanumeric(c);
  }

  pub fn slugify(out: []u8, title: []const u8) []u8 {
      // ...
  }
```

```quiz
question: Can another file read `acct.balance` if `balance` is a field of a pub struct?
options:
  - No, fields are private by default.
  - Yes, struct fields are always visible.
  - Only if balance is marked pub.
answer: 1
explain: pub applies to declarations. Fields are always accessible, so privacy is by convention.
```
