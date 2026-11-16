---
title: Custom sorting
icon: "🏆"
branch: tables
requires: [functions, lists]
summary: table.sort sorts in place, and takes a "comes before" function for anything fancy.
---
**A leaderboard.** Players are records, and you want the highest score first. With equal scores, sort by name.

Step 1, the default. `table.sort` sorts a list **in place**, smallest first, using `<`:

```lua
local scores = { 42, 7, 99, 15 }
table.sort(scores)
print(table.concat(scores, ", "))   -- 7, 15, 42, 99
```

It works for numbers and for strings (alphabetical, by byte). It returns nothing: the original table is reordered.

Step 2, reverse it. Pass a **comparison function** that answers one question: *should `a` come before `b`?*

```lua
table.sort(scores, function(a, b) return a > b end)   -- 99, 42, 15, 7
```

Step 3, sort records. `<` doesn't work on tables, so the comparison picks the field:

```lua title=leaderboard.lua
local players = {
  { name = "Zed", score = 80 },
  { name = "Amy", score = 95 },
  { name = "Bo",  score = 80 },
}

table.sort(players, function(a, b)
  if a.score ~= b.score then
    return a.score > b.score    -- higher score first
  end
  return a.name < b.name        -- tie: alphabetical
end)

for rank, p in ipairs(players) do
  print(rank, p.name, p.score)
end
```

```repl shell
> lua leaderboard.lua
1	Amy	95
2	Bo	80
3	Zed	80
```

**Two rules for the comparison function:**

1. Return `true` only when `a` must come *strictly* before `b`. Using `>=` or `<=` can make Lua fail with *invalid order function for sorting*.
2. Don't mix types. Sorting `{ 3, "10" }` fails with *attempt to compare number with string*.

`table.sort` isn't stable: items that compare as equal may change order. That's why the tie-breaker on `name` matters if you want a predictable result.

```compare python
players.sort(key=lambda p: (-p["score"], p["name"]))
```

```compare javascript
players.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
```

```compare rust
players.sort_by(|a, b| b.score.cmp(&a.score).then(a.name.cmp(&b.name)));
```

```exercise
goal: "Sort `words` from shortest to longest, using a comparison function on `#a` and `#b`."
code: |-
  table.sort(words)
checks:
  - match: 'table\.sort\(\s*words\s*,\s*function\s*\(\s*a\s*,\s*b\s*\)'
    message: "Pass a function(a, b) as the second argument."
  - match: 'return\s+#a\s*<\s*#b'
    message: Return #a < #b
solution: |-
  table.sort(words, function(a, b)
    return #a < #b
  end)
```

```quiz
question: What should a table.sort comparison function return?
options:
  - "-1, 0 or 1, like in other languages."
  - true when a should come before b.
  - The smaller of the two values.
answer: 1
explain: Lua's comparison returns a Boolean "a comes before b", not a number.
```
