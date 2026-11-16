---
title: Quoted strings
icon: "🧵"
branch: basics
requires: [locals]
summary: Three ways to write strings, joining them with .., and calling methods on them.
---
Lua gives you three ways to write a string. Pick whichever needs the least escaping:

```lua title=quotes.lua
local single = 'She said "hi"'
local double = "It's fine"
local long = [[
Long strings use double square brackets.
They can span lines, and "quotes" or 'apostrophes'
need no escaping. Even \n stays as-is.
]]
```

In `'...'` and `"..."` the usual escapes work: `\n` for a newline, `\t` for a tab, `\\` for a backslash. Inside a long string, between double square brackets, nothing is escaped. If your text itself contains two closing brackets, add equals signs: `[==[ ... ]==]`.

**Joining strings** uses the [[concatenation]] operator, two dots:

```lua
local first, last = "Ada", "Lovelace"
local full = first .. " " .. last
print(full)          -- Ada Lovelace
print(#full)         -- 12: # gives the length in bytes
print("Level " .. 3) -- numbers convert automatically
```

`..` will not convert `nil` or a boolean, though: `"Score: " .. nil` is an error. Use `tostring(value)` for those.

**Methods with a colon.** The `string` library has the usual tools, and you can call them straight on a string with `:`:

```lua
local shout = ("hello"):upper()     -- HELLO
local name = "  Grace  "
print(name:len())                   -- 9
print(("ha"):rep(3))                -- hahaha
print(("Lua"):lower())              -- lua
```

`name:upper()` is shorthand for `string.upper(name)`. The colon passes the string as the first argument. (Literals need parentheses around them, as in `("hello"):upper()`, which is why you usually see this on variables.) The colon gets [its own lesson](node:methods) later.

Strings are **immutable**: `upper()` returns a new string and leaves the original alone.

```compare python
full = first + " " + last
shout = "hello".upper()
```

```compare javascript
const full = first + " " + last;
const shout = "hello".toUpperCase();
```

```compare rust
let full = format!("{first} {last}");
```

```exercise
goal: "This fails, because Lua's `+` only does arithmetic. Join the strings with `..` instead."
code: |-
  local city = "Lisbon"
  local message = "Welcome to " + city
checks:
  - match: 'local\s+message\s*=\s*"Welcome to "\s*\.\.\s*city'
    message: 'Write "Welcome to " .. city'
  - notMatch: '\+'
    message: Remove the +.
solution: |-
  local city = "Lisbon"
  local message = "Welcome to " .. city
```

```quiz
question: "What does `#\"moon\"` return?"
options:
  - "`4`"
  - "`\"moon\"`"
  - "`nil`"
answer: 0
explain: "# is the length operator. For strings it counts bytes."
```
