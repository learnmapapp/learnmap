---
title: Named arguments
icon: "🏷️"
branch: functions
requires: [defaults]
summary: Name arguments at the call site so a reader can tell what each value means.
---
Quick, what does this call do?

```mojo
resize(image, 800, 600, True, False)
```

You can't tell without opening `resize`. Is 800 the width or the height? What does `True` switch on? Now the same call with **named arguments**:

```mojo
resize(image, width=800, height=600, keep_ratio=True, upscale=False)
```

Same function, same values, but now the call explains itself. Any parameter can be passed by name: write the parameter name, `=`, and the value.

```mojo title=alarm.mojo
def set_alarm(hour: Int, minute: Int = 0, snooze: Bool = True):
    print(t"Alarm at {hour}:{minute}, snooze {snooze}")

def main():
    set_alarm(7)                          # 7:0, snooze True
    set_alarm(7, minute=30)               # 7:30, snooze True
    set_alarm(6, snooze=False)            # 6:0, snooze False
    set_alarm(minute=15, hour=8)          # order doesn't matter
```

**The rules:**

1. Positional arguments come first, named ones after: `set_alarm(7, snooze=False)` is fine, `set_alarm(snooze=False, 7)` isn't.
2. Each parameter gets a value once. `set_alarm(7, hour=8)` gives `hour` two values, which is an error.
3. With names, you can skip over defaults in the middle, like `snooze=False` above, which leaves `minute` at 0.

**When to use them:** for booleans (always: `True` alone says nothing), for several parameters of the same type next to each other, and for optional settings. You don't need them for the obvious cases: `max(a, b)` doesn't get clearer as `max(x=a, y=b)`.

**Forcing names.** A function can demand names for some parameters: everything after a lone `*` must be passed by name.

```mojo
def connect(host: String, *, timeout: Int = 30, retries: Int = 3):
    pass

connect("example.com", timeout=10)   # fine
connect("example.com", 10)           # error: timeout must be named
```

Library authors use this for flags and options, so that call sites stay readable.

```compare python
set_alarm(7, snooze=False)   # same syntax
def connect(host, *, timeout=30): ...
```

```compare javascript
// JS has no named arguments; an options object fills the gap.
setAlarm(7, { snooze: false });
```

```compare rust
// Rust has no named arguments either; a struct or builder is typical.
```

```exercise
goal: "Make this call readable by naming the two Bool arguments: `bold` and `underline`."
code: |-
  def style(text: String, bold: Bool = False, underline: Bool = False):
      print(text, bold, underline)

  def main():
      style("Warning", True, False)
checks:
  - match: 'style\("Warning",\s*bold\s*=\s*True,\s*underline\s*=\s*False\)'
    message: 'Write style("Warning", bold=True, underline=False)'
solution: |-
  def style(text: String, bold: Bool = False, underline: Bool = False):
      print(text, bold, underline)

  def main():
      style("Warning", bold=True, underline=False)
```

```quiz
question: "With `def f(a: Int, *, b: Int = 0)`, which call is valid?"
options:
  - "`f(1, 2)`"
  - "`f(1, b=2)`"
  - "`f(b=2, 1)`"
answer: 1
explain: b comes after *, so it must be named, and named arguments go after positional ones.
```
