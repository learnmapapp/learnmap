---
title: Variable arguments
icon: "🪗"
branch: functions
requires: [returns]
summary: "Accept any number of arguments with ..., and count them safely, nils included."
---
`print` accepts any number of arguments. So does `math.max`. You can write functions like that too, with three dots, `...`:

```lua title=log.lua
local function log(level, ...)
  local parts = { ... }
  print("[" .. level .. "] " .. table.concat(parts, " "))
end

log("info", "server", "started", "on", "port", 8080)
-- [info] server started on port 8080
```

`...` stands for "all the remaining arguments". It's not a table, but an expression list, so you can:

- wrap it in a table: `{ ... }`
- pass it straight on to another function: `print(...)`
- unpack it into locals: `local first, second = ...`

**Counting arguments is the tricky bit.** `#{ ... }` looks like it counts the arguments, but `nil`s break it: with `f(1, nil, 3)`, the result could be 1 or 3. Two safe ways:

```lua
local function count(...)
  return select("#", ...)        -- counts nils too
end

local function packed(...)
  local args = table.pack(...)   -- a table with an extra field n
  for i = 1, args.n do
    print(i, args[i])
  end
end

print(count(1, nil, 3))   -- 3
```

`select("#", ...)` gives the exact count. `select(i, ...)` gives every argument from position `i` onwards. And `table.pack(...)` gives you a table plus `n`, the real count, which is the clearest choice when you need to loop.

The reverse of `table.pack` is `table.unpack(t)`, which spreads a list into separate values: `math.max(table.unpack(scores))`.

A wrapper that passes everything through to another function, unchanged, is a classic use:

```lua
local function timed(fn, ...)
  local start = os.clock()
  local result = fn(...)
  print(("took %.3fs"):format(os.clock() - start))
  return result
end
```

```compare python
def log(level, *parts):
    print(f"[{level}]", *parts)
```

```compare javascript
function log(level, ...parts) {
  console.log(`[${level}]`, ...parts);
}
```

```compare rust
// Rust has no variadic functions; you'd pass a slice, or use a macro like println!
```

```exercise
goal: "Make `sum` accept any number of arguments. Replace `a, b` with `...` and loop over `table.pack(...)`."
code: |-
  local function sum(a, b)
    return a + b
  end
checks:
  - match: 'local\s+function\s+sum\(\s*\.\.\.\s*\)'
    message: "The parameter list should be just ..."
  - match: 'table\.pack\(\s*\.\.\.\s*\)'
    message: Collect the arguments with table.pack(...)
  - match: 'for\s+i\s*=\s*1\s*,\s*\w+\.n\s+do'
    message: Loop from 1 to the packed table's n.
solution: |-
  local function sum(...)
    local args = table.pack(...)
    local total = 0
    for i = 1, args.n do
      total = total + args[i]
    end
    return total
  end
```

```quiz
question: "What does `select(\"#\", \"a\", nil, \"c\")` return?"
options:
  - "1"
  - "2"
  - "3"
answer: 2
explain: select("#", ...) counts every argument, including nils.
```
