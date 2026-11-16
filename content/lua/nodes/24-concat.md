---
title: Join a sequence
icon: "🧵"
branch: text
requires: [lists, strings]
summary: Build strings in a table and join them once with table.concat.
---
Here are two ways to build a CSV line. Both give the same result:

```lua
-- Before: glue as you go
local line = ""
for i, cell in ipairs(cells) do
  if i > 1 then line = line .. "," end
  line = line .. cell
end
```

```lua
-- After: collect, then join
local line = table.concat(cells, ",")
```

`table.concat(list, separator)` joins the items of a list into one string, with the separator *between* them, so no leftover comma at the end. And there's no need for the "is this the first item?" check.

It's also about speed. Lua strings are immutable, so every `..` creates a brand new string and copies both sides into it. Gluing a thousand pieces together in a loop copies the growing string a thousand times. Collecting the pieces in a table and joining once is the standard Lua idiom for building larger text:

```lua title=report.lua
local out = {}
for _, item in ipairs({ "milk", "eggs", "bread" }) do
  out[#out + 1] = "- " .. item
end
print(table.concat(out, "\n"))
```

```repl shell
> lua report.lua
- milk
- eggs
- bread
```

Details worth knowing:

- The separator is optional and defaults to the empty string: `table.concat({ "a", "b" })` is `"ab"`.
- Numbers are fine, they're converted automatically: `table.concat({ 1, 2, 3 }, "+")` is `"1+2+3"`.
- Booleans, `nil` and tables are not. `{ "a", true }` fails with *invalid value (at index 2) in table for 'concat'*. Wrap them in `tostring` first.
- You can join a range: `table.concat(t, ", ", 2, 4)` joins items 2 to 4.

```compare python
line = ",".join(cells)   # str.join, called on the separator
```

```compare javascript
const line = cells.join(",");
```

```compare rust
let line = cells.join(",");
```

```exercise
goal: "Replace the loop with a single `table.concat` that joins `tags` with \", \"."
code: |-
  local text = ""
  for i, tag in ipairs(tags) do
    if i > 1 then text = text .. ", " end
    text = text .. tag
  end
checks:
  - match: 'local\s+text\s*=\s*table\.concat\(\s*tags\s*,\s*", "\s*\)'
    message: 'Write local text = table.concat(tags, ", ")'
  - notMatch: '\bfor\b'
    message: The loop isn't needed anymore.
solution: |-
  local text = table.concat(tags, ", ")
```

```quiz
question: "What does `table.concat({ \"x\", \"y\", \"z\" }, \"-\")` return?"
options:
  - "\"x-y-z-\""
  - "\"x-y-z\""
  - "\"-x-y-z\""
answer: 1
explain: The separator only goes between items.
```
