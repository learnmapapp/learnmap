---
title: Default arguments
icon: 💬
branch: functions
requires:
  - truth
  - functions
summary: Missing arguments arrive as nil.
---

Missing arguments arrive as `nil`. The or idiom supplies a default for both `nil` and `false`, so use an explicit `nil` check when `false` is meaningful.

```lua
local function greet(name)
  name = name or "friend"
  return "Hello, " .. name
end
print(greet())
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about default arguments.
lang: lua
code: |-
  local function greet(name)
    name = name or "stranger"
    return "Hello, " .. name
  end
  print(greet())
checks:
  - match: name\s+or\s+"friend"
    message: Use name or "friend" for this step.
  - notMatch: name\s+or\s+"stranger"
    message: Replace name or "stranger" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: With `name = name or "friend"`, what happens when `name` is `false`?
options:
  - It becomes the string `"false"`.
  - It becomes `"friend"`.
  - It stays `false`.
answer: 1
explain: The `or` fallback applies to both `false` and `nil`.
```
