---
title: Sequence tables
icon: "📋"
branch: tables
requires: [locals]
summary: Lua's lists are tables with keys 1, 2, 3 ... and yes, they start at 1.
---
Lua has exactly one data structure: the **[[table]]**. Arrays, dictionaries, records, objects and modules are all tables. This lesson covers the list-shaped kind.

```lua title=planets.lua
local planets = { "Mercury", "Venus", "Earth", "Mars" }

print(planets[1])    -- Mercury
print(planets[4])    -- Mars
print(#planets)      -- 4
print(planets[5])    -- nil: no error, just nothing there
```

Let's address the elephant in the room: **indexes start at 1**. `planets[1]` is the first element, and `planets[#planets]` is the last. It feels odd for about a day, and then it's fine. All of Lua's built-in functions follow this convention, so go with it rather than trying to start at 0.

A few habits that come with it:

| Task | Lua |
| --- | --- |
| Number of items | `#planets` |
| Last item | `planets[#planets]` |
| Append | `planets[#planets + 1] = "Jupiter"` (or `table.insert`) |
| Loop over every index | `for i = 1, #planets do ... end` |
| Empty list | `local list = {}` |

Reading past the end gives `nil`, not an error. That's convenient, but it also means typos like `planets[0]` fail quietly. Keep an eye out for `nil` in your output.

Tables are **references**, like objects in JavaScript or lists in Python. Assigning one doesn't copy it:

```lua
local mine = planets
mine[1] = "Vulcan"
print(planets[1])   -- Vulcan: same table
```

You can put anything in a table, including mixed types and other tables: `{ 1, "two", { 3 } }`. And trailing commas are allowed, which keeps diffs tidy when you add items one per line.

The next lessons cover [records](node:records), [looping with ipairs](node:ipairs) and [adding and removing items](node:insert-remove).

```compare python
planets = ["Mercury", "Venus", "Earth", "Mars"]
planets[0]   # Mercury: Python starts at 0
```

```compare javascript
const planets = ["Mercury", "Venus", "Earth", "Mars"];
planets[0];  // Mercury
```

```compare rust
let planets = vec!["Mercury", "Venus", "Earth", "Mars"];
planets[0];  // panics if out of bounds
```

```exercise
goal: "This was ported from JavaScript and prints the wrong planets. Fix the indexes so it prints the first and the last planet."
code: |-
  local first = planets[0]
  local last = planets[#planets - 1]
checks:
  - match: 'local\s+first\s*=\s*planets\[1\]'
    message: The first element is planets[1].
  - match: 'local\s+last\s*=\s*planets\[#planets\]'
    message: The last element is planets[#planets].
solution: |-
  local first = planets[1]
  local last = planets[#planets]
```

```quiz
question: "`local t = { \"a\", \"b\" }` — what is `t[0]`?"
options:
  - "\"a\""
  - "`nil`"
  - An index error.
answer: 1
explain: Lua lists start at 1. Index 0 simply has no value.
```
