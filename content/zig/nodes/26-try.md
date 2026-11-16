---
title: Propagate with try
icon: "🪃"
branch: errors
requires: [error-unions]
summary: try unwraps a success, or passes the error straight back to your caller.
---
Most of the time, a function can't do anything useful about an error from something it calls. It just wants to hand the error to *its* caller. Written out in full, that gets repetitive fast:

```zig
fn loadSettings(path: []const u8) !Settings {
    const file = openFile(path) catch |err| return err;
    const text = readAll(file) catch |err| return err;
    const settings = parse(text) catch |err| return err;
    return settings;
}
```

`try x` means exactly `x catch |err| return err`. So the same function becomes:

```zig title=settings.zig
fn loadSettings(path: []const u8) !Settings {
    const file = try openFile(path);
    const text = try readAll(file);
    return try parse(text);
}
```

Read `try` as "this might fail; if it does, so do I". Unlike exceptions, every place that can fail is visible: just scan for `try`. And you can only use `try` inside a function whose return type has a `!`, because the error has to go somewhere.

That's also why `main` is usually declared `!void`. If an error reaches the top of `main`, Zig prints it with a stack trace and exits:

```repl shell
> zig run settings.zig
error: FileNotFound
/home/you/settings.zig:4:18: in loadSettings
    const file = try openFile(path);
                 ^
```

```compare python
# Exceptions propagate on their own, so you can't see
# from this code which lines might fail:
def load_settings(path):
    text = open(path).read()
    return parse(text)
```

```compare rust
fn load_settings(path: &str) -> Result<Settings, Error> {
    let text = std::fs::read_to_string(path)?;
    parse(&text)
}
```

```exercise
goal: Replace all three catch-and-return-err constructions with try.
code: |-
  fn signUp(name: []const u8) !User {
      const clean = validate(name) catch |err| return err;
      const id = reserveId() catch |err| return err;
      return createUser(id, clean) catch |err| return err;
  }
checks:
  - notMatch: 'catch'
    message: Every catch |err| return err can become a try.
  - match: 'const\s+clean\s*=\s*try\s+validate\(name\)'
    message: Use try validate(name).
  - match: 'const\s+id\s*=\s*try\s+reserveId\(\)'
    message: Use try reserveId().
  - match: 'return\s+try\s+createUser\(id,\s*clean\)'
    message: Use try for createUser too.
solution: |-
  fn signUp(name: []const u8) !User {
      const clean = try validate(name);
      const id = try reserveId();
      return try createUser(id, clean);
  }
```

```quiz
question: "Why does `fn add(a: u8, b: u8) u8 { return try std.math.add(u8, a, b); }` fail to compile?"
options:
  - std.math.add can't fail.
  - add's return type has no !, so there's nowhere for the error to go.
  - try only works inside main.
answer: 1
explain: try returns the error from the current function, so that function must return an error union.
```
