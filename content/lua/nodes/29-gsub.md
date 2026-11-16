---
title: Replace matches
icon: "🪄"
branch: text
requires: [patterns, returns]
summary: string.gsub replaces with a string, a table or a function, and returns a count too.
---
`string.gsub` ("global substitute") replaces every match of a pattern. The replacement can be three different things, and each is useful.

**1. A string.** `%1`, `%2` refer to the captures:

```lua
print(("2026-03-14"):gsub("(%d+)-(%d+)-(%d+)", "%3/%2/%1"))
-- 14/03/2026  1
```

Wait, what's that `1` at the end? `gsub` returns **two values**: the new string and the number of replacements. `print` shows both. Usually you only want the string, which is why you'll often see an extra pair of parentheses, which keeps just the first [return value](node:returns):

```lua
local clean = (name:gsub("%s+", " "))
```

Assigning to a single local, `local clean = name:gsub(...)`, also keeps only the string, so that works without the parentheses.

**2. A table.** Each match is looked up as a key. Perfect for templates:

```lua title=template.lua
local values = { name = "Mia", item = "rubber duck" }
local msg = ("Hi $name, your $item has shipped!"):gsub("%$(%w+)", values)
print(msg)   -- Hi Mia, your rubber duck has shipped!
```

**3. A function.** It's called with the captures, and its return value is the replacement:

```lua
local loud = ("make it loud"):gsub("%a+", function(word)
  return word:upper() .. "!"
end)
print(loud)   -- MAKE! IT! LOUD!
```

In cases 2 and 3, if the lookup or function returns `nil` or `false`, the original text is kept. That makes "only replace the ones I know about" easy.

An optional fourth argument limits the number of replacements: `s:gsub("a", "b", 1)` replaces only the first one.

Since `%` is special in the replacement string too, write `%%` to insert a literal percent sign.

```compare python
re.sub(r"(\d+)-(\d+)-(\d+)", r"\3/\2/\1", date)
re.sub(r"\w+", lambda m: m.group().upper(), text)
```

```compare javascript
date.replace(/(\d+)-(\d+)-(\d+)/g, "$3/$2/$1");
text.replace(/\w+/g, (word) => word.toUpperCase());
```

```exercise
goal: "Mask every digit in `card` with `*`, and keep only the string, not the count, by wrapping the call in parentheses."
code: |-
  print(card)
checks:
  - match: 'card:gsub\(\s*"%d"\s*,\s*"\*"\s*\)'
    message: 'Use card:gsub("%d", "*")'
  - match: 'print\(\s*\(\s*card:gsub'
    message: "Wrap the call in extra parentheses: print((card:gsub(...)))"
solution: |-
  print((card:gsub("%d", "*")))
```

```quiz
question: "What does `(\"a-b-c\"):gsub(\"-\", \"+\")` return?"
options:
  - "\"a+b+c\""
  - "\"a+b+c\", 2"
  - "\"a+b-c\", 1"
answer: 1
explain: gsub replaces every match and also returns how many replacements it made.
```
