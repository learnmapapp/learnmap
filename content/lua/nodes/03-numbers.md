---
title: Numbers and division
icon: "🔢"
branch: basics
requires: [locals]
summary: Integers and floats, the two kinds of division, and a few gotchas.
---
Lua 5.4 has two kinds of numbers under one type, `number`: **integers** like `42` and **floats** like `3.14`. Mostly they just work together, but division is where you'll notice the difference.

Here's a quick table to keep handy:

| Expression | Result | Why |
| --- | --- | --- |
| `7 + 2` | `9` | integer + integer = integer |
| `7 / 2` | `3.5` | `/` **always** gives a float |
| `8 / 2` | `4.0` | ... even when it divides evenly |
| `7 // 2` | `3` | `//` is floor division |
| `-7 // 2` | `-4` | floor means "round down", not "towards zero" |
| `7 % 2` | `1` | remainder |
| `2 ^ 3` | `8.0` | `^` is power, and always gives a float |
| `7 + 0.5` | `7.5` | mixing gives a float |

So if you want a whole number out of a division, use `//`, not `/`.

```lua title=pizza.lua
local slices, people = 17, 5

print("Each person gets " .. slices // people .. " slices")
print("Left over: " .. slices % people)
print("Exactly: " .. slices / people)
```

```repl shell
> lua pizza.lua
Each person gets 3 slices
Left over: 2
Exactly: 3.4
```

Notice that numbers concatenate with `..` and get turned into text automatically.

A few more things worth knowing:

- `math.floor(3.7)` is `3`, `math.max(4, 9, 2)` is `9`, and `math.pi`, `math.sqrt` and `math.random` are what you'd expect.
- `tonumber("42")` turns text into a number, and gives `nil` when it can't: `tonumber("forty-two")`.
- `math.type(3)` is `"integer"`, `math.type(3.0)` is `"float"`. They're still equal: `3 == 3.0` is `true`.
- Integers are 64-bit and **wrap around** on overflow: `math.maxinteger + 1` becomes `math.mininteger`, with no error.

```compare python
7 / 2    # 3.5
7 // 2   # 3, same idea as Lua
```

```compare javascript
Math.floor(7 / 2)   // 3; JS has no integer division operator
```

```compare rust
7 / 2    // 3 for integers; Rust picks by type
```

```exercise
goal: "Each team should get a whole number of players. Change the division so `perTeam` is an integer."
code: |-
  local players, teams = 22, 4
  local perTeam = players / teams
checks:
  - match: 'local\s+perTeam\s*=\s*players\s*//\s*teams'
    message: Use // for floor division.
solution: |-
  local players, teams = 22, 4
  local perTeam = players // teams
```

```quiz
question: "What does `10 / 2` evaluate to in Lua 5.4?"
options:
  - "`5`"
  - "`5.0`"
  - "`\"5\"`"
answer: 1
explain: "/ always produces a float. Use // when you want an integer."
```
