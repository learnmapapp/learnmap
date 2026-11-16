---
title: Validate assumptions
icon: 📋
branch: runtime
requires:
  - functions
summary: assert returns its arguments when the first is truthy and raises an error otherwise.
---

assert returns its arguments when the first is truthy and raises an error otherwise. Validate public function inputs near the boundary.

```lua
local function double(n)
  assert(type(n) == "number", "number required")
  return n * 2
end
print(double(4))
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about validate assumptions.
lang: lua
code: |-
  local function double(n)
    assert(type(n) == "string", "number required")
    return n * 2
  end
  print(double(4))
checks:
  - match: type\(n\)\s+==\s+"number"
    message: Use type(n) == "number" for this step.
  - notMatch: type\(n\)\s+==\s+"string"
    message: Replace type(n) == "string" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about validate assumptions is correct?
options:
  - assert accepts only Boolean first arguments.
  - assert returns its arguments when the first is truthy and raises an error otherwise. Validate
    public function inputs near the boundary.
  - assert silently returns false on failure.
answer: 1
explain: assert returns its arguments when the first is truthy and raises an error otherwise.
  Validate public function inputs near the boundary.
```
