---
title: Sequence boundaries
icon: "📏"
branch: tables
requires: [lists]
summary: "What # really measures, why holes break it, and how to keep your lists safe."
---
**Predict the output:**

```lua title=holes.lua
local guests = { "Ana", "Ben", "Cy", "Dee" }
guests[2] = nil   -- Ben cancelled
print(#guests)
```

Did you say 3? The real answer is **"4 or 1, depending"**. Lua's manual allows either. Let's see why.

`#` doesn't count elements. It finds a **border**: an index `n` where `t[n]` isn't `nil` but `t[n + 1]` is. For a proper **[[sequence]]**, a table with values at 1, 2, ..., n and no gaps, there's exactly one border, so `#` is reliable. Put a hole in the middle, and there are several borders (1 and 4 here), and `#` may return any of them.

So the rule is simple: **don't make holes in lists.** To delete from the middle, shift the rest down with `table.remove`:

```lua
local guests = { "Ana", "Ben", "Cy", "Dee" }
table.remove(guests, 2)   -- Cy and Dee move up
print(#guests)            -- 3, reliably
```

Other ways holes sneak in, and what to do instead:

| Accident | Better |
| --- | --- |
| `list[i] = nil` in the middle | `table.remove(list, i)` |
| `{ a, b, c }` where `b` might be `nil` | `table.pack(a, b, c)` and use `.n` |
| Skipping an index: `list[#list + 2] = x` | `list[#list + 1] = x` |
| Using `nil` to mean "empty slot" | a placeholder like `false` |

That last one deserves a word: `false` is a real value, so `{ "Ana", false, "Cy" }` is a valid sequence of length 3.

`#` is fast, by the way. On a list built in the normal way it doesn't walk through the table, so using it in a loop condition is fine.

```compare python
guests = ["Ana", "Ben", "Cy"]
del guests[1]     # shifts automatically, like table.remove
```

```compare javascript
const guests = ["Ana", "Ben", "Cy"];
delete guests[1];  // JS leaves a hole too, and length stays 3
```

```exercise
goal: "Removing an item this way leaves a hole. Use `table.remove` instead, so the list stays a proper sequence."
code: |-
  local queue = { "a", "b", "c" }
  queue[1] = nil
checks:
  - match: 'table\.remove\(\s*queue\s*,\s*1\s*\)'
    message: "Write table.remove(queue, 1)"
  - notMatch: 'queue\[1\]\s*=\s*nil'
    message: Don't assign nil to a list slot.
solution: |-
  local queue = { "a", "b", "c" }
  table.remove(queue, 1)
```

```quiz
question: "Which of these is a proper sequence, where `#` is reliable?"
options:
  - "`{ 1, nil, 3 }`"
  - "`{ \"x\", false, \"z\" }`"
  - "`{ [1] = \"a\", [3] = \"c\" }`"
answer: 1
explain: false is a real value, so there's no gap. The other two have a hole at index 2.
```
