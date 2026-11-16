---
title: Template strings
icon: "🧾"
branch: basics
requires: [strings]
summary: "t\"...\" puts values and expressions straight into text, like Python's f-strings."
---
Here's the same message built two ways:

```mojo
# Before: lots of + and String()
var line = name + " scored " + String(points) + " (" + String(points * 10) + "%)"

# After: a template string
var line = String(t"{name} scored {points} ({points * 10}%)")
```

A **t-string** starts with `t` before the quote. Anything inside `{...}` is evaluated when the program runs, and its value is written into the text. It doesn't have to be a variable; any expression works, and you don't need `String(...)` around numbers.

```mojo title=report.mojo
def main():
    var name = "Ada"
    var done = 7
    var total = 10
    print(t"{name} finished {done} of {total} lessons")
    print(t"That's {done * 100 // total}% done")
    print(t"Use {{braces}} for literal braces")
```

```repl shell
> mojo run report.mojo
Ada finished 7 of 10 lessons
That's 70% done
Use {braces} for literal braces
```

**Two things to know:**

1. **`print` accepts a t-string directly.** Everywhere else, wrap it in `String(...)` to get a regular string you can store, join, or return: `var msg = String(t"Hi {name}")`.
2. **Literal braces** are doubled: `{{` and `}}`, as in the last line above.

If you come from Python: it's `t`, not `f`. The braces hold any expression, so `{round(price, 2)}` is a simple way to control decimals.

Template strings can be **raw** too: `rt"C:\temp\{name}"` keeps backslashes as they are, while still filling in `{name}`. Handy for Windows paths and regular expressions.

```compare python
print(f"{name} finished {done} of {total} lessons")
```

```compare javascript
console.log(`${name} finished ${done} of ${total} lessons`);
```

```compare rust
println!("{name} finished {done} of {total} lessons");
```

```exercise
goal: "Replace the string concatenation with a t-string inside the print."
code: |-
  def main():
      var city = "Lisbon"
      var temp = 24
      print(city + ": " + String(temp) + " degrees")
checks:
  - match: 'print\(\s*t"\{city\}: \{temp\} degrees"\s*\)'
    message: 'Write print(t"{city}: {temp} degrees")'
solution: |-
  def main():
      var city = "Lisbon"
      var temp = 24
      print(t"{city}: {temp} degrees")
```

```quiz
question: "How do you store a t-string in a `String` variable?"
options:
  - "`var s: String = t\"...\"` works as is."
  - "Wrap it: `var s = String(t\"...\")`"
  - You can't, t-strings only work in print.
answer: 1
explain: print takes t-strings directly. Elsewhere, convert with String(...).
```
