---
title: "Strings"
icon: "💬"
branch: "basics"
requires: ["variables"]
summary: "Unicode text, escapes, indexing, and immutable values."
---

A `str` holds Unicode text. Single and double quotes mean the same thing; choose whichever needs fewer escapes:

```python
name = "Python"
message = 'It is readable'
print(name[0])     # P
print(name[-1])    # n
print(len(name))   # 6
print("hello\nworld")
```

Indexes start at zero. Negative indexes count from the end. Accessing an index that does not exist raises `IndexError`.

Strings are [[immutable]]: `name[0] = "J"` fails. Build a new string instead. `"Py" + "thon"` concatenates text, and `"ha" * 3` repeats it.

## Text is not bytes

Python strings contain text, not raw file bytes. Accented characters work normally: `"café"` is a string. `len()` counts Unicode code points, which need not match the number of visible symbols for every language or emoji.

Use `\n` for a newline and `\t` for a tab. Triple-quoted strings can span lines; raw strings such as `r"C:\tools"` preserve most backslashes, which is handy for patterns and Windows paths.

```exercise
goal: "Print the final character using a negative index."
lang: python
code: |
  name = "Python"
  print(name[0])
checks:
  - match: "name\\[\\s*-1\\s*\\]"
    message: "Use name[-1] for the last character."
hint: "Use name[-1] for the last character."
```

```quiz
question: "What does \"Python\"[-1] return?"
options:
  - "P"
  - "n"
  - "An error because negative indexes are forbidden."
answer: 1
explain: "Negative indexes count backward from the end, so -1 selects the last character."
```
