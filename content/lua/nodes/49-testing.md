---
title: Assertion tests
icon: 🧪
branch: runtime
requires:
  - assertions
  - modules
summary: A small test script can use assert and exit with an error on failure.
---

A small test script can use assert and exit with an error on failure. Include empty inputs and representative normal inputs.

```lua
local function total(values)
  local result = 0
  for _, value in ipairs(values) do result = result + value end
  return result
end
assert(total({}) == 0)
assert(total({2, 3}) == 5)
print("tests passed")
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about assertion tests.
lang: lua
code: |-
  local function total(values)
    local result = 0
    for _, value in ipairs(values) do result = result + value end
    return result
  end
  assert(total({}) == 0)
  assert(total({2, 3}) == 6)
  print("tests passed")
checks:
  - match: total\(\{2,\s+3\}\)\s+==\s+5
    message: Use total({2, 3}) == 5 for this step.
  - notMatch: total\(\{2,\s+3\}\)\s+==\s+6
    message: Replace total({2, 3}) == 6 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What happens when an assertion in a plain Lua test script fails?
options:
  - It changes the expected value to match the actual result.
  - It raises an error, causing an uncaught failure to stop the script.
  - It prints a warning and automatically skips the failure.
answer: 1
explain: An uncaught assertion error makes the test run fail.
```
