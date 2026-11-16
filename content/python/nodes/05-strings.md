---
title: "Strings"
icon: "💬"
branch: "basics"
requires: ["variables"]
summary: "Unicode text, escapes, indexing, and immutable values."
---
A string is a piece of text. Single and double quotes mean exactly the same thing, so pick whichever saves you an escape:

```python
drink = "flat white"
order = 'She said "make it a large".'
note = "It's ready"
```

## Every character has two addresses

Think of a string as a row of numbered cups. You can count from the front, starting at **0**, or from the back, starting at **-1**:

```text
  c    a    f    é
  0    1    2    3     from the front
 -4   -3   -2   -1     from the back
```

```repl
> word = "café"
> word[0]
'c'
> word[-1]
'é'
> len(word)
4
> word[10]
error: IndexError: string index out of range
```

Negative positions are handy: `word[-1]` is always the last character, whatever the length.

## You can't change a string

Strings are [[immutable]]. Trying to change one character fails:

```repl
> word[0] = "C"
error: TypeError: 'str' object does not support item assignment
```

Instead, you build a new string: `"C" + word[1:]`. (That `[1:]` means "from position 1 to the end"; [Slicing](node:slicing) covers it.) Joining with `+` and repeating with `*` both create new strings:

```repl
> "Py" + "thon"
'Python'
> "ha" * 3
'hahaha'
```

## Special characters

A backslash starts an escape: `\n` is a newline and `\t` is a tab. For text over several lines, use triple quotes:

```python
menu = """Coffee  2.50
Tea     2.00
Cake    3.75"""
```

And Python strings are Unicode, so `"café"`, `"東京"` and emoji just work.

```compare java
"café".charAt(0)  // Java has no negative indexes
```

```compare javascript
"café".at(-1)     // JS added negative positions via .at()
```

```exercise
goal: "Print the last character of `name`, using a negative index."
lang: python
code: |
  name = "Python"
  print(name[0])
checks:
  - match: 'name\[\s*-1\s*\]'
    message: "Use name[-1] for the last character."
hint: Counting from the back starts at -1.
solution: |
  name = "Python"
  print(name[-1])
```

```quiz
question: "What does `\"Python\"[-2]` return?"
options:
  - "`'n'`"
  - "`'o'`"
  - "`'y'`"
answer: 1
explain: -1 is the last character (n), so -2 is the one before it (o).
```
