---
title: Meet Lua
icon: 🌙
branch: core
requires: []
summary: Lua executes a script from top to bottom.
kind: hub
---

Lua executes a script from top to bottom. Save this example as `hello.lua` and run `lua hello.lua`.

A useful term here is [[chunk]]: A sequence of Lua statements compiled and executed as a unit.

```lua
print("Hello, Lua!")
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

This course targets **Lua 5.4**. Check your local tool version before following examples. See the [official reference](https://www.lua.org/manual/5.4/) when an API differs. The lesson files are examples to run in a separate learning project, not commands to execute inside this site's source tree.

```exercise
goal: Make the script print `Hello, Lua!`.
lang: lua
code: print("Goodbye")
checks:
  - match: '"Hello,\s+Lua!"'
    message: Use "Hello, Lua!" for this step.
  - notMatch: '"Goodbye"'
    message: Replace "Goodbye" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: How do you run the saved Lua script `hello.lua` from a terminal?
options:
  - "`lua build hello.lua`"
  - "`lua hello.lua`"
  - "`lua require hello.lua`"
answer: 1
explain: The standalone Lua interpreter executes the file passed as its argument.
```
