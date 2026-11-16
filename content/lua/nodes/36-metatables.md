---
title: Attach behavior
icon: "🧬"
branch: design
requires: [records]
summary: A metatable is a table of hooks that changes how another table behaves.
---
Plain tables can't do much on their own. Try to print one, compare two, or add them together:

```lua
local a = { x = 1, y = 2 }
print(a)          -- table: 0x5581c2a3e2b0
print(a + a)      -- attempt to perform arithmetic on a table value
```

A **[[metatable]]** changes that. It's an ordinary table that you attach to another table with `setmetatable`. When Lua hits an operation it doesn't know how to do, it looks in the metatable for a matching **[[metamethod]]**: a field with a special name starting with two underscores.

```lua title=point.lua
local mt = {
  __tostring = function(p)
    return "(" .. p.x .. ", " .. p.y .. ")"
  end,
}

local p = setmetatable({ x = 3, y = 4 }, mt)
print(p)   -- (3, 4)
```

`print` calls `tostring`, which checks the metatable for `__tostring`, which formats the point. `setmetatable` returns the table, so you can create and attach in one line, as above.

Here's what each popular metamethod hooks into:

| Metamethod | Triggered by |
| --- | --- |
| `__tostring` | `tostring(t)` and `print(t)` |
| `__index` | reading a missing key ([lesson](node:index)) |
| `__newindex` | writing a new key ([lesson](node:newindex)) |
| `__add`, `__sub`, `__mul`, ... | `+`, `-`, `*`, ... ([lesson](node:operators)) |
| `__eq`, `__lt`, `__le` | `==`, `<`, `<=` |
| `__len` | `#t` |
| `__call` | calling the table like a function: `t()` |
| `__close` | leaving a `<close>` scope ([lesson](node:close)) |

The idea is that one metatable is shared by many tables. Give every point the same `mt`, and every point prints nicely. That's the seed of [classes and objects](node:objects).

`getmetatable(t)` returns a table's metatable, or `nil`. Strings already have one: it's how `("hi"):upper()` finds `string.upper`.

```compare python
class Point:
    def __str__(self):   # Python's "dunder" methods are the same idea
        return f"({self.x}, {self.y})"
```

```compare javascript
const p = { x: 3, y: 4, toString() { return `(${this.x}, ${this.y})`; } };
```

```exercise
goal: "Make `money` print as \"€12.50\" by attaching a metatable with `__tostring`."
code: |-
  local money = { amount = 12.5 }
checks:
  - match: 'setmetatable\(\s*'
    message: Attach a metatable with setmetatable.
  - match: '__tostring\s*=\s*function\(\s*(\w+)\s*\)'
    message: Add a __tostring = function(m) field to the metatable.
  - match: '%.2f'
    message: 'Format the amount with string.format("€%.2f", m.amount)'
solution: |-
  local money = setmetatable({ amount = 12.5 }, {
    __tostring = function(m)
      return string.format("€%.2f", m.amount)
    end,
  })
```

```quiz
question: "When does Lua look at a table's metatable?"
options:
  - On every operation on the table.
  - When it meets an operation the table can't handle by itself, like + on a table.
  - Only when you call getmetatable.
answer: 1
explain: Metamethods are fallbacks. For example, __index is only consulted for keys that are missing.
```
