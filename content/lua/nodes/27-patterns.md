---
title: Find a pattern
icon: "🔍"
branch: text
requires: [substrings]
summary: Lua patterns, a small cousin of regular expressions, with % instead of backslash.
---
Lua doesn't ship a full regular-expression engine. It has **[[pattern|patterns]]**: smaller, simpler, and good enough for most everyday text work. If you know regex, the big difference is that **`%` is the escape character** instead of `\`.

```lua title=order.lua
local text = "Order #4521 shipped on 2026-03-14"

print(text:match("%d+"))                 -- 4521: the first run of digits
print(text:match("(%d+)-(%d+)-(%d+)"))   -- 2026  03  14: three captures
print(text:find("shipped"))              -- 13  19: start and end position
```

- `string.match(s, pattern)` returns what matched, or `nil`. With parentheses in the pattern (**captures**), it returns each captured piece instead, as [multiple values](node:returns).
- `string.find(s, pattern)` returns where the match starts and ends, plus any captures.

**The phrasebook**, regex on the left, Lua on the right:

| Regex | Lua | Matches |
| --- | --- | --- |
| `\d` | `%d` | a digit |
| `\w` | `%w` | a letter or digit (no underscore!) |
| `\s` | `%s` | whitespace |
| `[a-zA-Z]` | `%a` | a letter |
| `\D`, `\S` | `%D`, `%S` | the opposite (upper case negates) |
| `\.` | `%.` | a literal dot |
| `.*?` | `.-` | as few characters as possible |
| `^`, `$` | `^`, `$` | start and end of the string |
| `[^,]+` | `[^,]+` | sets work the same |

The quantifiers `+`, `*` and `?` work as you'd expect, plus `-`, the lazy version of `*`. Compare:

```lua
local html = "<b>bold</b>"
print(html:match("<(.*)>"))   -- b>bold</b: grabs as much as it can
print(html:match("<(.-)>"))   -- b: stops as early as it can
```

**What's missing compared to regex:** alternation (`cat|dog`), quantifiers on groups (`(ab)+`), and counted repeats like `{3}`. Write `%d%d%d` instead of `\d{3}`, or check a couple of patterns in a row instead of using `|`.

**Searching for plain text?** Characters like `.`, `%`, `(` and `-` are special in patterns. `string.find` has a "plain" mode that turns all of that off:

```lua
print(("1+1=2"):find("1+1", 1, true))   -- 1  3
```

```compare python
import re
re.search(r"(\d+)-(\d+)-(\d+)", text).groups()
```

```compare javascript
text.match(/(\d+)-(\d+)-(\d+)/).slice(1);
```

```exercise
goal: "This pattern was copied from a regex and doesn't work in Lua. Translate it, so it captures the version number from \"v1.42\" as \"1.42\"."
code: |-
  local version = tag:match("v(\d+\.\d+)")
checks:
  - match: 'tag:match\("v\(%d\+%\.%d\+\)"\)'
    message: 'Use %d for digits and %. for a literal dot: "v(%d+%.%d+)"'
  - notMatch: '\\'
    message: Lua patterns don't use backslashes.
solution: |-
  local version = tag:match("v(%d+%.%d+)")
```

```quiz
question: "In a Lua pattern, how do you match a literal dot?"
options:
  - "`\\.`"
  - "`%.`"
  - "`[.]` is the only way"
answer: 1
explain: "% escapes special characters in Lua patterns. ([.] works too, but %. is the usual way.)"
```
