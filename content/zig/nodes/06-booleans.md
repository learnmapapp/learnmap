---
title: Boolean logic
icon: "🔀"
branch: basics
requires: [bindings]
summary: true, false, and the words and, or, not.
---
Zig's booleans are `true` and `false`, of type `bool`. The logic operators are spelled out as words, which makes conditions read almost like English:

```zig title=door.zig
const std = @import("std");

pub fn main() void {
    const has_key = true;
    const door_locked = true;
    const alarm_on = false;

    const can_enter = has_key and !alarm_on;
    const must_knock = door_locked and !has_key;
    std.debug.print("enter: {}, knock: {}\n", .{ can_enter, must_knock });
}
```

```repl shell
> zig run door.zig
enter: true, knock: false
```

So it's `and` and `or`, but `!` for "not". If you're coming from C or JavaScript, `&&` and `||` are a compile error here. Both `and` and `or` **short-circuit**: if the left side already decides the answer, the right side never runs.

Zig also refuses to treat numbers as booleans. There's no "truthy" or "falsy":

```zig
const lives: u8 = 3;
if (lives) {} // error: expected type 'bool', found 'u8'
if (lives > 0) {} // fine
```

```compare python
can_enter = has_key and not alarm_on
```

```compare javascript
const canEnter = hasKey && !alarmOn;
```

```compare rust
let can_enter = has_key && !alarm_on;
```

```exercise
goal: This was written by someone fresh from JavaScript. Make it valid Zig.
code: |-
  fn canVote(age: u8, registered: bool) bool {
      return age >= 18 && registered;
  }
checks:
  - notMatch: '&&'
    message: Zig spells logical "and" as a word.
  - match: 'age\s*>=\s*18\s+and\s+registered'
    message: Combine both conditions with and.
solution: |-
  fn canVote(age: u8, registered: bool) bool {
      return age >= 18 and registered;
  }
```

```quiz
question: Which of these is a valid condition in Zig, assuming `count` is a `u32`?
options:
  - "`if (count)`"
  - "`if (count != 0 or count == 0)`"
  - "`if (count && true)`"
answer: 1
explain: Conditions must be bool, and logic uses the words and/or. The second option is silly, but it's valid Zig.
```
