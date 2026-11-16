---
title: Read a file
icon: 🧩
branch: runtime
requires:
  - errors
summary: io.open can fail, so check its first result before reading.
---

`io.open` can fail, so check its first result before reading. The r mode reads an existing file; w would truncate a file when opened.

```lua
local file, message = io.open("tasks.txt", "r")
if file then
  local text = file:read("a")
  file:close()
  print(text)
else
  print(message)
end
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about read a file.
lang: lua
code: |-
  local file, message = io.open("tasks.txt", "w")
  if file then
    local text = file:read("a")
    file:close()
    print(text)
  else
    print(message)
  end
checks:
  - match: io\.open\("tasks\.txt",\s+"r"\)
    message: Use io.open("tasks.txt", "r") for this step.
  - notMatch: io\.open\("tasks\.txt",\s+"w"\)
    message: Replace io.open("tasks.txt", "w") in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What should you check before reading from `io.open(path, "r")`?
options:
  - Whether it returned a file handle.
  - Whether the pathname ends in `.txt`.
  - Whether the file is already empty.
answer: 0
explain: Opening can fail and return `nil` plus an error message.
```
