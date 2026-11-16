---
title: UTF-8 byte strings
icon: 🧩
branch: data
requires:
  - slices
summary: Strings commonly use []const u8.
---

Strings commonly use []const `u8`. Compare their contents with `std.mem.eql`; a byte length is not necessarily a count of Unicode characters.

```zig
const std = @import("std");

pub fn main() !void {
    const text: []const u8 = "hello";
    std.debug.assert(text.len == 5);
    std.debug.assert(std.mem.eql(u8, text, "hello"));
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about utf-8 byte strings.
lang: zig
code: |-
  const std = @import("std");

  pub fn main() !void {
      const text: []const u8 = "hello";
      std.debug.assert(text.len == 5);
      std.debug.assert(std.mem.eql(u8, text, "bye"));
  }
checks:
  - match: text,\s+"hello"
    message: Use text, "hello" for this step.
  - notMatch: text,\s+"bye"
    message: Replace text, "bye" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: How should you compare the contents of two byte-string slices?
options:
  - "`std.mem.eql(u8, left, right)`"
  - "`left == right`"
  - "`left.len == right.len` alone."
answer: 0
explain: Equal lengths do not establish equal contents; `std.mem.eql` compares elements.
```
