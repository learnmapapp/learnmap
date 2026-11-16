---
title: Multiple returns
icon: "🎯"
branch: functions
requires: [functions]
summary: Return several values at once, and the rules for where they get cut to one.
---
A Lua function can return more than one value. No tuple or array needed, just commas:

```lua title=minmax.lua
local function minMax(list)
  local lo, hi = list[1], list[1]
  for i = 2, #list do
    lo = math.min(lo, list[i])
    hi = math.max(hi, list[i])
  end
  return lo, hi
end

local lowest, highest = minMax({ 7, 2, 9, 4 })
print(lowest, highest)   -- 2  9
```

The standard library uses this a lot. `string.find` returns where a match starts *and* where it ends. [`pcall`](node:errors) returns whether a call succeeded *and* its result. The common pattern for errors is to return `nil` plus a message:

```lua
local file, err = io.open("missing.txt")
if not file then print(err) end   -- missing.txt: No such file or directory
```

**Mismatched counts are fine.** Extra values are dropped, missing ones become `nil`:

```lua
local a = minMax({ 3, 1 })          -- a = 1, the second value is dropped
local x, y, z = minMax({ 3, 1 })    -- z = nil
```

**Now the tricky rule.** Multiple results are only kept when the call is **the last thing in a list**. Anywhere else, they get cut to one. Test yourself before reading the comments:

```lua
print(minMax({ 5, 8 }))            -- 5  8
print(minMax({ 5, 8 }), "done")    -- 5  done
print("range:", minMax({ 5, 8 }))  -- range:  5  8
print((minMax({ 5, 8 })))          -- 5
```

The second line cuts to one value because the call isn't last. The fourth adds an extra pair of parentheses, which is Lua's way of saying "just the first value, please".

The same rule applies in table constructors: `{ minMax(list) }` gets both values, but `{ minMax(list), 0 }` gets only the first.

```compare python
def min_max(xs):
    return min(xs), max(xs)   # really returns one tuple

lo, hi = min_max([7, 2, 9])
```

```compare javascript
function minMax(xs) {
  return [Math.min(...xs), Math.max(...xs)];  // an array
}
const [lo, hi] = minMax([7, 2, 9]);
```

```compare rust
fn min_max(xs: &[i32]) -> (i32, i32) { /* a tuple */ }
```

```exercise
goal: "`divide` should return both the quotient and the remainder. Return the two values with a comma."
code: |-
  local function divide(a, b)
    return { a // b, a % b }
  end

  local q, r = divide(17, 5)
checks:
  - match: 'return\s+a\s*//\s*b\s*,\s*a\s*%\s*b'
    message: Write return a // b, a % b without the braces.
  - notMatch: 'return\s*\{'
    message: Return two values, not a table.
solution: |-
  local function divide(a, b)
    return a // b, a % b
  end

  local q, r = divide(17, 5)
```

```quiz
question: "`f` returns `1, 2`. What does `print(f(), 10)` print?"
options:
  - "1  2  10"
  - "1  10"
  - "2  10"
answer: 1
explain: A call that isn't the last item in a list is cut to its first value.
```
