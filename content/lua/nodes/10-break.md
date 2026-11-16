---
title: Exit a loop
icon: "🚪"
branch: flow
requires: [numeric-for]
summary: break to leave a loop early, and goto continue, since Lua has no continue.
---
**A treasure hunt.** You're searching a list of boxes for the first one that holds a key:

```lua title=hunt.lua
local boxes = { "socks", "sand", "key", "shell", "key" }
local found

for i = 1, #boxes do
  if boxes[i] == "key" then
    found = i
    break
  end
end

print(found and ("Key in box " .. found) or "No key")   -- Key in box 3
```

**`break`** leaves the innermost loop immediately. Box 5 is never even opened. It works in `while`, `repeat` and both kinds of `for`.

(`#boxes` is the number of items, and `boxes[i]` reads one item. [Tables](node:lists) come up soon; for now they're just lists.)

**And `continue`?** Lua doesn't have one. When you want to skip to the next round, you have two options.

Option 1: flip the condition, so the rest of the body only runs when it should:

```lua
for i = 1, #boxes do
  if boxes[i] ~= "sand" then
    print("Opening " .. boxes[i])
  end
end
```

Option 2: for longer bodies, where nesting gets deep, Lua 5.4 has **`goto`** with a label. The community convention is a label called `continue` at the end of the loop body:

```lua
for i = 1, #boxes do
  if boxes[i] == "sand" then goto continue end
  print("Opening " .. boxes[i])
  -- more work here...
  ::continue::
end
```

Labels are written `::name::`. `goto` can only jump within the same function, and not into a block, so it can't create true spaghetti. Use it for this pattern and you'll be in good company.

```compare python
for box in boxes:
    if box == "sand":
        continue
    print("Opening", box)
```

```compare javascript
for (const box of boxes) {
  if (box === "key") break;
}
```

```exercise
goal: "Stop the loop as soon as a negative number shows up, using `break`."
code: |-
  local total = 0
  for i = 1, #readings do
    if readings[i] < 0 then
      print("Bad reading")
    end
    total = total + readings[i]
  end
checks:
  - match: 'print\("Bad reading"\)\s*\n\s*break\s*\n\s*end'
    message: Add break right after the print, inside the if.
solution: |-
  local total = 0
  for i = 1, #readings do
    if readings[i] < 0 then
      print("Bad reading")
      break
    end
    total = total + readings[i]
  end
```

```quiz
question: "How do you skip to the next round of a Lua loop?"
options:
  - "`continue`"
  - "`next`"
  - "Use an if around the rest of the body, or `goto continue` with a `::continue::` label"
answer: 2
explain: Lua has no continue keyword. Restructuring with if, or goto to a label at the end of the body, does the job.
```
