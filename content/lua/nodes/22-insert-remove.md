---
title: Grow a sequence
icon: "➕"
branch: tables
requires: [length]
summary: table.insert and table.remove, which turn a table into a stack or a queue.
---
Think of a stack of plates: you add to the top and take from the top. In Lua, that's two functions from the `table` library:

```lua title=plates.lua
local plates = {}

table.insert(plates, "blue")     -- add to the end
table.insert(plates, "red")
table.insert(plates, "green")

print(table.remove(plates))      -- green: removes and returns the last one
print(#plates)                   -- 2
```

Both functions take an optional **position**, which turns them into "insert here" and "remove from here":

```lua
local queue = { "Ana", "Ben" }
table.insert(queue, 1, "VIP")    -- at the front: VIP, Ana, Ben
local next = table.remove(queue, 1)   -- takes VIP, the rest shifts up
```

Watch the argument order: with three arguments, the **position comes second** and the value third. `table.insert(queue, "VIP", 1)` is a common slip, and Lua will complain that the position must be a number.

A cheat sheet:

| You want | Write |
| --- | --- |
| push onto the end | `table.insert(t, v)` or `t[#t + 1] = v` |
| pop from the end | `table.remove(t)` |
| add at the front | `table.insert(t, 1, v)` |
| take from the front | `table.remove(t, 1)` |
| remove at index `i` | `table.remove(t, i)` |

Both ways of appending are fine. `t[#t + 1] = v` is slightly faster and very common; `table.insert` reads more clearly. Pick one and be consistent.

**A note on speed.** Inserting or removing anywhere but at the end shifts every element after it. That's no problem for lists of a few thousand items. For a real high-traffic queue, people keep two indexes (`first` and `last`) instead of shifting.

**Removing while looping?** Go backwards, so the shifting only affects items you've already checked:

```lua
for i = #plates, 1, -1 do
  if plates[i] == "chipped" then
    table.remove(plates, i)
  end
end
```

```compare python
plates.append("blue")
plates.pop()
queue.insert(0, "VIP")
queue.pop(0)
```

```compare javascript
plates.push("blue");
plates.pop();
queue.unshift("VIP");
queue.shift();
```

```compare rust
plates.push("blue");
plates.pop();
queue.insert(0, "VIP");
queue.remove(0);
```

```exercise
goal: "The arguments are in the wrong order. Insert \"start\" at the front of `steps`."
code: |-
  table.insert(steps, "start", 1)
checks:
  - match: 'table\.insert\(\s*steps\s*,\s*1\s*,\s*"start"\s*\)'
    message: "The position comes before the value: table.insert(steps, 1, \"start\")"
solution: |-
  table.insert(steps, 1, "start")
```

```quiz
question: "What does `table.remove(t)` do without a position?"
options:
  - Removes the first element.
  - Removes and returns the last element.
  - Empties the table.
answer: 1
explain: Without a position, table.remove works on the end of the list, like a stack's pop.
```
