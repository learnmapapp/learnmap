---
title: Record tables
icon: 🔁
branch: tables
requires:
  - lists
  - strings
summary: Record fields are string keys.
---

Record fields are string keys. user.name and user["name"] access the same entry; bracket syntax also accepts computed keys.

```lua
local user = {name = "Ada", active = true}
print(user.name, user["active"])
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about record tables.
lang: lua
code: |-
  local user = {name = "Ada", active = true}
  print(user.name, user["enabled"])
checks:
  - match: user\["active"\]
    message: Use user["active"] for this step.
  - notMatch: user\["enabled"\]
    message: Replace user["enabled"] in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which access is equivalent to `user.name`?
options:
  - '`user["name"]`'
  - "`user[name]` regardless of `name`'s value."
  - "`user[1]`"
answer: 0
explain: Dot syntax uses a literal string key; bracket syntax can also use computed keys.
```
