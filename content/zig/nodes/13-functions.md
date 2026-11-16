---
title: Functions
icon: "🧩"
branch: flow
requires: [integers]
summary: Parameter types, return types, and why parameters can't be changed.
---
Here's a function, taken apart:

```zig
pub fn clamp(value: i32, low: i32, high: i32) i32 {
    if (value < low) return low;
    if (value > high) return high;
    return value;
}
```

Reading left to right:

- `pub` makes it visible to other files. Leave it out for helpers.
- `fn clamp` is the name. Functions use `camelCase`.
- `(value: i32, low: i32, high: i32)` lists the parameters, each with a name and a type.
- `i32` after the parentheses is the return type. There's no arrow.

Every parameter needs a type, and so does the return value. A function that returns nothing returns `void`.

**Parameters are constants.** You can't assign to them inside the function. If you need a working copy, make one:

```zig
fn countDown(start: u32) void {
    var n = start; // start itself can't change
    while (n > 0) : (n -= 1) {}
}
```

That rule frees Zig to pass small values by copy and big ones by reference, whichever is faster, without you having to care.

**Order doesn't matter.** Functions can call functions defined further down the file. There are no forward declarations and no header files.

**Return values must be used.** Calling a function and ignoring a non-`void` result is a compile error. If you really don't need it, discard it explicitly:

```zig
_ = clamp(15, 0, 10);
```

```compare python
def clamp(value: int, low: int, high: int) -> int:
    return max(low, min(value, high))
```

```compare rust
fn clamp(value: i32, low: i32, high: i32) -> i32 {
    value.max(low).min(high)
}
```

```exercise
goal: Write `isEven`, which takes a `u32` and returns `true` when it's even.
code: |-
  fn isEven(n) {
  }
checks:
  - match: 'fn\s+isEven\s*\(\s*n\s*:\s*u32\s*\)\s*bool'
    message: "Give the parameter and the return value a type: fn isEven(n: u32) bool"
  - match: 'return\s+n\s*%\s*2\s*==\s*0'
    message: A number is even when n % 2 == 0.
solution: |-
  fn isEven(n: u32) bool {
      return n % 2 == 0;
  }
hint: The return type goes after the closing parenthesis, without an arrow.
```

```quiz
question: "Inside `fn grow(size: u32) u32`, what happens if you write `size += 1;`?"
options:
  - It changes the caller's variable too.
  - It's a compile error, because parameters are constant.
  - It works, but only changes a local copy.
answer: 1
explain: Parameters can't be assigned. Copy the value into a var first if you need to change it.
```
