---
title: Read a file
icon: "📂"
branch: runtime
requires: [errors]
summary: io.open, read, lines, and the nil-plus-message way of reporting problems.
---
**FAQ: working with files in Lua.**

**How do I read a whole file?**

```lua title=read.lua
local file, err = io.open("notes.txt", "r")
if not file then
  print("Could not open: " .. err)
  return
end

local text = file:read("a")   -- "a" means all
file:close()
print(#text .. " bytes")
```

`io.open` returns a file handle. All file operations are [methods](node:methods), so they use a colon: `file:read`, `file:close`.

**What happens if the file doesn't exist?**

`io.open` doesn't raise an error. It returns `nil` and a message, like *notes.txt: No such file or directory*. That's why the code checks `if not file`. If a missing file means the program can't continue anyway, the short form is `local file = assert(io.open("notes.txt"))`.

**How do I go through a file line by line?**

```lua
for line in io.lines("notes.txt") do
  print(line)
end
```

`io.lines` opens the file, gives you one line per round (without the newline), and closes the file when the loop ends. It raises an error if the file can't be opened. With an open handle, `file:lines()` does the same.

**What can I pass to `read`?**

| Format | Reads |
| --- | --- |
| `"a"` | the rest of the file |
| `"l"` | the next line, without the newline (the default) |
| `"L"` | the next line, with the newline |
| `"n"` | a number |
| `5` (a number) | up to that many bytes |

At the end of the file, `read` returns `nil` (except `"a"`, which returns an empty string).

**What about writing?**

Open with `"w"` (replace the file) or `"a"` (append to it), then write:

```lua
local out = assert(io.open("log.txt", "a"))
out:write("started at ", os.date(), "\n")
out:close()
```

`write` takes any number of strings and numbers, with no spaces or newlines added.

**Do I have to close files?**

Yes, especially when writing: data may sit in a buffer until the file is closed. Lua eventually closes forgotten files when they're garbage collected, but "eventually" isn't a plan. The [next lesson](node:close) shows how to make closing automatic.

```compare python
with open("notes.txt") as f:
    text = f.read()
```

```compare javascript
import { readFileSync } from "node:fs";
const text = readFileSync("notes.txt", "utf8");
```

```compare rust
let text = std::fs::read_to_string("notes.txt")?;
```

```exercise
goal: "Count the lines in `data.csv` with `io.lines` instead of reading the whole file and splitting it."
code: |-
  local count = 0
  local f = io.open("data.csv")
  local text = f:read("a")
  for _ in text:gmatch("[^\n]+") do
    count = count + 1
  end
checks:
  - match: 'for\s+\w+\s+in\s+io\.lines\(\s*"data\.csv"\s*\)\s+do'
    message: 'Loop with for line in io.lines("data.csv") do'
  - notMatch: ':read\('
    message: You don't need read anymore.
solution: |-
  local count = 0
  for _ in io.lines("data.csv") do
    count = count + 1
  end
```

```quiz
question: "What does `io.open(\"missing.txt\")` do when the file doesn't exist?"
options:
  - Raises an error.
  - Returns nil and an error message.
  - Creates an empty file.
answer: 1
explain: io.open reports problems with nil plus a message, so you decide how to handle it.
```
