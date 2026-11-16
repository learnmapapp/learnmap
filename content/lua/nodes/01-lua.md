---
title: Meet Lua
icon: "🌙"
branch: core
requires: []
summary: What Lua is for, how to run a script, and the interactive prompt.
kind: hub
---
Lua (Portuguese for "moon") was created in Brazil in 1993, as a small language to **embed** in other programs. That's still its superpower. You might write Lua without ever running a "Lua program": you write it to configure Neovim, script a game in Roblox or LÖVE, extend Redis or nginx, or add mods to a game written in C++.

It's also a perfectly nice language on its own, and the quickest way to learn it is with the standalone interpreter. Install Lua 5.4 (`brew install lua`, `apt install lua5.4`, or from [lua.org](https://www.lua.org/download.html)), then create a file called `hello.lua`:

```lua title=hello.lua
-- Two dashes start a comment.
local name = "Lua"
print("Hello, " .. name .. "!")
```

Run it from a terminal in the same folder:

```repl shell
> lua hello.lua
Hello, Lua!
```

(Some Linux distributions call the command `lua5.4`. If `lua` isn't found, try that.)

A few things already stand out:

- **No semicolons and no braces.** Lines end where they end, and blocks are closed with the word `end`, as you'll see soon.
- `..` (two dots) **joins strings**. `+` is only for numbers.
- `local` declares a variable. It matters more than you'd think, and it's [the next lesson](node:locals).

For quick experiments, run `lua` on its own to get an interactive prompt. Type a line, press Enter, and it runs right away. Each line you type is a **[[chunk]]**, a unit of code that Lua compiles and runs in one go. A file is a chunk too.

```repl shell
> lua
Lua 5.4.7  Copyright (C) 1994-2024 Lua.org, PUC-Rio
> 2 ^ 10
1024.0
> os.exit()
```

The map ahead covers the whole language, which is small enough that 50 lessons get you through nearly all of it. Pick a goal, or just follow the paths.

```exercise
goal: "Change the greeting so the script prints `Hello, Moon!` instead."
code: |-
  local name = "Lua"
  print("Hello, " .. name .. "!")
checks:
  - match: 'local\s+name\s*=\s*"Moon"'
    message: Change the value of name to "Moon".
  - match: 'print\("Hello, "\s*\.\.\s*name\s*\.\.\s*"!"\)'
    message: Keep the print line as it was.
solution: |-
  local name = "Moon"
  print("Hello, " .. name .. "!")
```

```quiz
question: Which operator joins two strings in Lua?
options:
  - "`+`"
  - "`..`"
  - "`&`"
answer: 1
explain: Two dots concatenate strings. Lua keeps + strictly for arithmetic.
```
