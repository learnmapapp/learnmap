---
title: zig fmt
icon: "💅"
branch: tools
requires: [zig]
summary: One official code style, applied by one command, steered by a trailing comma.
---
Tabs or spaces? Where does the brace go? Zig settles every one of those debates with a single command:

```repl shell
> zig fmt src/
src/main.zig
src/parser.zig
```

It rewrites files in place, and prints the names of the ones it changed. Like Go's `gofmt`, there are no options to argue about: everyone's Zig looks the same. Most editors run it on save once the Zig extension is installed.

There's one knob you *do* control, and it's a sneaky one: the **trailing comma**. Look at what `zig fmt` does with these two nearly identical lines:

```zig title=before.zig
const a = Point{ .x = 1, .y = 2 };
const b = Point{ .x = 1, .y = 2, };
```

```zig title=after.zig
const a = Point{ .x = 1, .y = 2 };
const b = Point{
    .x = 1,
    .y = 2,
};
```

No trailing comma: keep it on one line. A trailing comma: one item per line. The same goes for function arguments, array literals, enum values and parameter lists. So when a call gets too long to read, you don't reformat it by hand. You add a comma after the last argument, save, and let `zig fmt` lay it out.

Two more tricks:

- **`zig fmt --check .`** changes nothing, but exits with an error if any file needs formatting. Perfect for CI.
- **`// zig fmt: off`** and **`// zig fmt: on`** protect a hand-aligned block, such as a lookup table you've lined up in columns.

```tip
`zig fmt` also upgrades some old syntax when the language changes, so formatting after a Zig upgrade can save you a few manual fixes.
```

```exercise
goal: This call is hard to read on one line. Add a trailing comma, so `zig fmt` puts each argument on its own line.
code: |-
  const window = try createWindow(.{ .title = "Zig paint", .width = 1280, .height = 720, .resizable = true });
checks:
  - match: '\.resizable\s*=\s*true\s*,\s*\}'
    message: Put a comma after the last field, right before the closing }.
solution: |-
  const window = try createWindow(.{
      .title = "Zig paint",
      .width = 1280,
      .height = 720,
      .resizable = true,
  });
```

```quiz
question: In a CI pipeline, which command fails the build when code isn't formatted?
options:
  - "`zig fmt .`"
  - "`zig fmt --check .`"
  - "`zig build fmt`"
answer: 1
explain: --check only reports. Plain zig fmt would rewrite the files and succeed.
```
