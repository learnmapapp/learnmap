---
title: Iterate matches
icon: 💬
branch: text
requires:
  - patterns
  - ipairs
summary: string.gmatch returns an iterator yielding successive matches.
---

string.gmatch returns an iterator yielding successive matches. Captures change which pieces the iterator yields.

```lua
for word in string.gmatch("red blue green", "%a+") do
  print(word)
end
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about iterate matches.
lang: lua
code: |-
  for word in string.gmatch("red blue green", "%d+") do
    print(word)
  end
checks:
  - match: '"%a\+"'
    message: Use "%a+" for this step.
  - notMatch: '"%d\+"'
    message: Replace "%d+" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about iterate matches is correct?
options:
  - gmatch modifies the source string.
  - string.gmatch returns an iterator yielding successive matches. Captures change which pieces the
    iterator yields.
  - gmatch returns only the first match.
answer: 1
explain: string.gmatch returns an iterator yielding successive matches. Captures change which pieces
  the iterator yields.
```
