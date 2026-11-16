---
title: Slice bytes
icon: "✂️"
branch: text
requires: [strings]
summary: string.sub with 1-based, inclusive and negative indexes.
---
Lua's `string.sub(s, i, j)` cuts out the piece from position `i` up to *and including* `j`. Positions start at 1, just like tables. Negative positions count from the end, where -1 is the last character.

The string `"lighthouse"` with both numberings:

| Character | l | i | g | h | t | h | o | u | s | e |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Position | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
| From the end | -10 | -9 | -8 | -7 | -6 | -5 | -4 | -3 | -2 | -1 |

Try to work these out using the table before reading the comments:

```lua title=slices.lua
local word = "lighthouse"

print(word:sub(1, 5))    -- light
print(word:sub(6))       -- house: no end means "to the end"
print(word:sub(-5))      -- house: the last five
print(word:sub(2, -2))   -- ighthous: drop the first and last
print(word:sub(4, 4))    -- h: a single character
```

Out-of-range positions don't cause errors. They're quietly clamped, and an impossible range gives an empty string: `word:sub(8, 3)` is `""`. That's handy for safe "first three letters" code, and sneaky when a calculation is off by one.

To read a single character, there's no `word[4]`. Indexing a string with a number gives `nil`. Use `word:sub(4, 4)`. To get the numeric code of a character, use `word:byte(4)`, which returns 104 for "h".

**Bytes, not letters.** Positions count *bytes*. For plain ASCII, one character is one byte, so you'll never notice. But in UTF-8, letters like "é" or "ü" and every emoji take several bytes:

```lua
print(("café"):sub(1, 4))   -- caf followed by half an é
print(#"café")              -- 5
```

For text that may contain non-ASCII characters, the [utf8 library](node:utf8) can help.

```compare python
word[0:5]    # light: 0-based, end excluded
word[-5:]    # house
```

```compare javascript
word.slice(0, 5);   // light: 0-based, end excluded
word.slice(-5);     // house
```

```compare rust
&word[0..5]   // byte ranges too, but panics on a broken UTF-8 character
```

```exercise
goal: "Get the file extension, the last three characters of `filename` like \"txt\", with a negative start."
code: |-
  local ext = filename:sub(0, 3)
checks:
  - match: 'filename:sub\(\s*-3\s*\)'
    message: Use filename:sub(-3)
solution: |-
  local ext = filename:sub(-3)
```

```quiz
question: "What does `(\"banana\"):sub(2, 4)` return?"
options:
  - "\"an\""
  - "\"ana\""
  - "\"nan\""
answer: 1
explain: Positions 2, 3 and 4 inclusive are a, n, a.
```
