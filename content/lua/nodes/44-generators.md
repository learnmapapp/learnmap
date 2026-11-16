---
title: Coroutine generators
icon: 🔧
branch: runtime
requires:
  - yield
  - ipairs
summary: coroutine.wrap exposes a coroutine as a callable iterator.
---

coroutine.wrap exposes a coroutine as a callable iterator. A generator used in generic for must eventually finish or return nil.

```lua
local numbers = coroutine.wrap(function()
  for n = 1, 3 do coroutine.yield(n * n) end
end)
for value in numbers do print(value) end
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about coroutine generators.
lang: lua
code: |-
  local numbers = coroutine.wrap(function()
    for n = 1, 3 do coroutine.yield(n + n) end
  end)
  for value in numbers do print(value) end
checks:
  - match: coroutine\.yield\(n\s+\*\s+n\)
    message: Use coroutine.yield(n * n) for this step.
  - notMatch: coroutine\.yield\(n\s+\+\s+n\)
    message: Replace coroutine.yield(n + n) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about coroutine generators is correct?
options:
  - wrap returns a coroutine thread requiring resume.
  - Generic for ends only when an iterator returns false.
  - coroutine.wrap exposes a coroutine as a callable iterator. A generator used in generic for must
    eventually finish or return nil.
answer: 2
explain: coroutine.wrap exposes a coroutine as a callable iterator. A generator used in generic for
  must eventually finish or return nil.
```
