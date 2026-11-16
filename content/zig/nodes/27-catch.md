---
title: Recover with catch
icon: "🥅"
branch: errors
requires: [try]
summary: Handle an error on the spot, with a fallback, a switch, or a log line.
---
`try` passes the problem on. `catch` deals with it here and now. Three styles, for three moods:

**"Whatever, use a default."**

```zig
const port = std.fmt.parseInt(u16, input, 10) catch 8080;
```

**"It depends on what went wrong."** Capture the error and switch on it:

```zig title=download.zig
const bytes = download(url) catch |err| switch (err) {
    error.Timeout => try downloadFromMirror(url),
    error.NotFound => return error.MissingPackage,
    else => return err,
};
```

**"Note it, then carry on."** A block after `catch` can do anything, as long as it ends up producing a value (or leaving the function):

```zig
const avatar = loadAvatar(user) catch |err| blk: {
    std.log.warn("no avatar for {s}: {}", .{ user.name, err });
    break :blk default_avatar;
};
```

That last one combines `catch` with a [labeled block](node:blocks), so the block can give back a fallback value.

The value after `catch` must have the same type as a success would. `catch 8080` works because 8080 fits in a `u16`. Writing `catch "oops"` would be a type error.

```warn
Avoid `catch unreachable` unless an error truly can't happen. Like `.?` for optionals, it crashes in debug builds and is undefined behaviour in release builds. `catch {}` won't help either: it only compiles when the success type is `void`, and it silently drops the error.
```

```compare python
try:
    port = int(text)
except ValueError:
    port = 8080
```

```compare javascript
let port;
try { port = parsePort(text); } catch { port = 8080; }
```

```compare rust
let port = text.parse::<u16>().unwrap_or(8080);
```

```exercise
goal: An unreadable save file shouldn't stop the game. If `loadHighScore` fails, start from 0 instead of passing the error on.
code: |-
  fn startScore() !u32 {
      return try loadHighScore();
  }
checks:
  - notMatch: 'try'
    message: Don't pass the error on; handle it with catch.
  - match: 'loadHighScore\(\)\s+catch\s+0'
    message: Use loadHighScore() catch 0.
solution: |-
  fn startScore() u32 {
      return loadHighScore() catch 0;
  }
hint: Once the error is handled, the function can't fail any more, so the ! in the return type can go too.
```

```quiz
question: "`const n = parse(s) catch |err| switch (err) { ... };` What must every branch of the switch do?"
options:
  - Return an error.
  - Produce a value of n's type, or leave the function.
  - Print the error.
answer: 1
explain: The switch decides what n becomes, so each branch gives a value or exits (with return, or try).
```
