---
title: Map iteration
icon: "🗺️"
branch: tables
requires: [records, numeric-for]
summary: pairs visits every key in a table, in no particular order.
---
`ipairs` only walks the list part of a table. To see **every** key, including named fields, use **`pairs`**:

```lua title=stock.lua
local stock = { apples = 12, pears = 0, plums = 7 }

for fruit, count in pairs(stock) do
  print(fruit, count)
end
```

```repl shell
> lua stock.lua
plums	7
apples	12
pears	0
```

Notice the order. It's **not** the order you wrote, and it's not alphabetical either. `pairs` makes no promise about order at all, and it can differ between runs or Lua versions. If your output needs a stable order, collect the keys and [sort](node:sorting) them first:

```lua
local fruits = {}
for fruit in pairs(stock) do
  fruits[#fruits + 1] = fruit
end
table.sort(fruits)

for _, fruit in ipairs(fruits) do
  print(fruit, stock[fruit])
end
```

(`for fruit in pairs(stock)` takes only the key. The value is still available, but we didn't ask for it.)

**Other things `pairs` is good for:**

- Counting the entries of a record, since `#` only works for sequences:

```lua
local n = 0
for _ in pairs(stock) do n = n + 1 end
```

- Checking whether a table is empty: `next(t) == nil` is true for `{}`. `next` is the function `pairs` uses behind the scenes.

**Changing while looping.** You may update or remove (set to `nil`) fields that already exist during a `pairs` loop. Adding *new* keys during the loop isn't allowed, and leads to unpredictable results.

```compare python
for fruit, count in stock.items():   # Python keeps insertion order
    print(fruit, count)
```

```compare javascript
for (const [fruit, count] of Object.entries(stock)) {
  console.log(fruit, count);
}
```

```compare rust
for (fruit, count) in &stock {   // HashMap: no guaranteed order either
    println!("{fruit} {count}");
}
```

```exercise
goal: "Print every setting and its value. `ipairs` skips named keys entirely, so switch to `pairs`."
code: |-
  local settings = { theme = "dark", font = "mono", size = 14 }
  for key, value in ipairs(settings) do
    print(key, value)
  end
checks:
  - match: 'for\s+key\s*,\s*value\s+in\s+pairs\(\s*settings\s*\)'
    message: Use pairs(settings).
solution: |-
  local settings = { theme = "dark", font = "mono", size = 14 }
  for key, value in pairs(settings) do
    print(key, value)
  end
```

```quiz
question: In what order does `pairs` visit the keys of a table?
options:
  - Alphabetical order.
  - The order they were added.
  - No guaranteed order.
answer: 2
explain: pairs follows the table's internal layout. Sort the keys yourself when order matters.
```
