---
title: Unwrap with orelse
icon: "🛟"
branch: flow
requires: [optionals]
summary: Four ways to deal with a missing value, from safest to boldest.
---
An `if` with a capture is the most general way to unwrap an [optional](node:optionals), but often you just want the value and a plan B. That's `orelse`. Here are your options, ordered from safest to boldest.

**1. Use a default.**

```zig
const port = config.port orelse 8080;
```

**2. Leave the function.** `orelse` takes any expression, including `return`:

```zig
fn greet(name: ?[]const u8) void {
    const n = name orelse return; // nothing to greet
    std.debug.print("hi {s}\n", .{n});
}
```

**3. Turn it into an error.** You'll learn about [errors](node:error-unions) soon, but it already reads naturally:

```zig
const user = findUser(id) orelse return error.UserNotFound;
```

**4. Insist it's there.** `.?` unwraps, and panics if the value is `null`:

```zig
const first = list.first().?; // "I'm sure this isn't empty"
```

`.?` is shorthand for `orelse unreachable`. In a debug build, being wrong is a crash with a clear message. In a release build, it's undefined behaviour. So keep it for cases where `null` really would be a bug in your program, not just unusual input.

```compare python
port = config.port if config.port is not None else 8080
```

```compare javascript
const port = config.port ?? 8080;
```

```compare rust
let port = config.port.unwrap_or(8080);
```

```exercise
goal: Reading the volume crashes when no saved setting exists. Fall back to 50 instead.
code: |-
  fn startVolume(saved: ?u8) u8 {
      return saved.?;
  }
checks:
  - notMatch: '\.\?'
    message: .? panics on null. Use orelse with a default instead.
  - match: 'return\s+saved\s+orelse\s+50'
    message: Return saved orelse 50.
solution: |-
  fn startVolume(saved: ?u8) u8 {
      return saved orelse 50;
  }
```

```quiz
question: When is `.?` a reasonable choice?
options:
  - Whenever you want shorter code than orelse.
  - When null would mean a bug in your own program.
  - When the value comes from user input.
answer: 1
explain: .? is an assertion. Use it only when null "can't happen"; handle input that might be missing.
```
