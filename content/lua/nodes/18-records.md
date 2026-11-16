---
title: Record tables
icon: "🗂️"
branch: tables
requires: [lists, strings]
summary: The same table, now with named fields, dot access, and nil meaning "gone".
---
Tables with string keys work as records and dictionaries. Here's a character in a role-playing game:

```lua title=hero.lua
local hero = {
  name = "Lyra",
  class = "ranger",
  hp = 42,
  inventory = { "bow", "rope", "apple" },
}

print(hero.name)                -- Lyra
hero.hp = hero.hp - 10          -- change a field
hero.level = 3                  -- add a new one, any time
print(hero.inventory[2])        -- rope
```

`hero.name` is shorthand for `hero["name"]`. Use the dot when the key is a fixed name, and brackets when the key is in a variable, or isn't a valid identifier:

```lua
local stat = "hp"
print(hero[stat])          -- 32
local scores = { ["high score"] = 900, [10] = "ten" }
```

In the constructor, `name = "Lyra"` is shorthand for `["name"] = "Lyra"`. Any value except `nil` can be a key: strings, numbers, booleans, even other tables.

**Removing a field: assign `nil`.**

```lua
hero.level = nil   -- the key is gone
```

In Lua, "a field that's `nil`" and "a field that doesn't exist" are the same thing. That's why [[nil]] can't be stored in a table, and why you check for a field simply with `if hero.shield then`.

A table can be a list *and* a record at the same time, like this:

```lua
local playlist = { "Intro", "Theme", name = "Road trip", shuffle = true }
print(#playlist, playlist.name)   -- 2  Road trip
```

`#` only counts the list part. It's legal and occasionally handy (function arguments packed with `table.pack` look like this, with their `n` field), but for your own data, keeping lists and records separate makes code easier to follow.

```compare python
hero = {"name": "Lyra", "hp": 42}
hero["hp"] -= 10
del hero["hp"]   # Lua: hero.hp = nil
```

```compare javascript
const hero = { name: "Lyra", hp: 42 };
hero.hp -= 10;
delete hero.hp;  // Lua: hero.hp = nil
```

```exercise
goal: "Build a `book` record with a `title` of \"Dune\" and `pages` set to 412, then remove the `draft` field."
code: |-
  local book = {}
  book.draft = true
checks:
  - match: 'title\s*=\s*"Dune"'
    message: 'Add title = "Dune"'
  - match: 'pages\s*=\s*412'
    message: Add pages = 412
  - match: 'book\.draft\s*=\s*nil'
    message: Remove draft with book.draft = nil
solution: |-
  local book = { title = "Dune", pages = 412 }
  book.draft = true
  book.draft = nil
```

```quiz
question: "How do you remove the key `color` from table `t`?"
options:
  - "`t.color = nil`"
  - "`delete t.color`"
  - "`t:remove(\"color\")`"
answer: 0
explain: Assigning nil removes the key. A nil field and a missing field are the same thing in Lua.
```
