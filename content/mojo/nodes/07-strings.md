---
title: String values
icon: "🔤"
branch: basics
requires: [variables]
summary: Build, combine and inspect text with String.
---
**A recipe for a name tag.**

```mojo title=badge.mojo
def main():
    var first = "Grace"
    var last = "Hopper"
    var full = first + " " + last

    print(full)                  # Grace Hopper
    print(full.upper())          # GRACE HOPPER
    print(len(full))             # 12
    print("Hop" in full)         # True
    print(full.startswith("Gr")) # True
```

**Ingredients:**

- **Quotes:** single or double, both work. Triple quotes (`"""..."""`) span several lines.
- **`+`** joins strings. Unlike Python, the type of every part is checked when compiling, so `"Age: " + 30` is a compile error. Convert first: `"Age: " + String(30)`.
- **`len(s)`** gives the length in **bytes** (UTF-8). For plain English text, that's the number of characters; for "café" it's 5.
- **Methods** you know from Python: `upper()`, `lower()`, `strip()`, `startswith()`, `endswith()`, `find()`, `replace()`, `split()`.
- **`in`** checks whether one string contains another.

**Mutating is fine.** Mojo strings aren't immutable like Python's. A `String` variable can be appended to in place:

```mojo
var log = "start"
log += " → loaded"
log += " → ready"
print(log)   # start → loaded → ready
```

**Copies are independent.** Assigning a string to a new variable makes a copy. Changing one doesn't affect the other:

```mojo
var original = "draft"
var edited = original
edited += " v2"
print(original, "/", edited)   # draft / draft v2
```

Strings are copied automatically because they're cheap to copy and you'd expect that behavior. Bigger values, like lists, make you ask for a copy explicitly; you'll see why in [copies](node:copies).

For putting values *inside* a string, there's something nicer than `+`: [template strings](node:formatting).

```compare python
full = first + " " + last
"Age: " + 30   # TypeError at runtime, not at compile time
```

```compare javascript
const full = first + " " + last;
"Age: " + 30;  // "Age: 30", JS converts silently
```

```compare rust
let full = format!("{} {}", first, last);
```

```exercise
goal: "This won't compile because `count` is an Int. Convert it with `String(...)` before joining."
code: |-
  def main():
      var count = 3
      var label = "Items: " + count
      print(label)
checks:
  - match: '"Items: "\s*\+\s*String\(\s*count\s*\)'
    message: 'Write "Items: " + String(count)'
solution: |-
  def main():
      var count = 3
      var label = "Items: " + String(count)
      print(label)
```

```quiz
question: "`var a = \"hi\"`, `var b = a`, `b += \"!\"`. What's `a` now?"
options:
  - "\"hi\""
  - "\"hi!\""
  - It's a compile error.
answer: 0
explain: Assigning a String copies it, so b changes independently of a.
```
