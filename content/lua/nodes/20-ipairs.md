---
title: Ordered iteration
icon: "🚶"
branch: tables
requires: [lists, numeric-for]
summary: for i, v in ipairs(list) walks a sequence in order, and stops at the first nil.
---
You can loop over a list with a numeric `for` and `#`, but Lua has a friendlier way, the **generic for** with `ipairs`:

```lua title=menu.lua
local menu = { "Pancakes", "Waffles", "Porridge" }

for i, dish in ipairs(menu) do
  print(i .. ". " .. dish)
end
```

```repl shell
> lua menu.lua
1. Pancakes
2. Waffles
3. Porridge
```

`ipairs` ("index pairs") gives you the index and the value on each round, in order, from 1 upwards. Don't need the index? Name it `_`, which by convention means "unused":

```lua
for _, dish in ipairs(menu) do
  print(dish)
end
```

**Where does it stop?** At the first `nil`. Given `{ "a", "b", nil, "d" }`, `ipairs` visits only "a" and "b". That's one more reason to keep lists [free of holes](node:length).

**`ipairs` or a numeric for?**

| Use | When |
| --- | --- |
| `for _, v in ipairs(t)` | you want every item, in order. The most readable choice. |
| `for i = 1, #t` | you need to step backwards, skip items, or jump in steps |
| `for i = #t, 1, -1` | you're removing items while looping (going backwards keeps the indexes valid) |

One thing to avoid with any loop: **adding or removing items in the list you're looping over with ipairs.** The loop may skip or repeat items. Build a new list instead, or loop backwards as in the last table row.

The `for ... in` form works with any **iterator**: a function that hands out the next value each time it's called. `ipairs` is one, `pairs` is [another](node:pairs), `string.gmatch` is a [third](node:gmatch), and you can [write your own](node:generators).

```compare python
for i, dish in enumerate(menu, start=1):
    print(f"{i}. {dish}")
```

```compare javascript
menu.forEach((dish, i) => console.log(`${i + 1}. ${dish}`));
```

```compare rust
for (i, dish) in menu.iter().enumerate() {
    println!("{}. {}", i + 1, dish);
}
```

```exercise
goal: "Rewrite the loop with `ipairs`, and use `_` for the index, since it's not needed."
code: |-
  for i = 1, #names do
    print("Hi " .. names[i])
  end
checks:
  - match: 'for\s+_\s*,\s*(\w+)\s+in\s+ipairs\(\s*names\s*\)\s+do'
    message: "Write for _, name in ipairs(names) do"
  - notMatch: 'names\[i\]'
    message: Use the loop's value variable instead of names[i].
solution: |-
  for _, name in ipairs(names) do
    print("Hi " .. name)
  end
```

```quiz
question: "How many items does `ipairs({ 10, 20, nil, 40 })` visit?"
options:
  - "2"
  - "3"
  - "4"
answer: 0
explain: ipairs stops at the first nil, so it visits 10 and 20.
```
