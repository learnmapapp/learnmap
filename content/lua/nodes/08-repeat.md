---
title: Repeat until
icon: "🎰"
branch: flow
requires: [while]
summary: A loop that runs at least once, and the scoping trick that makes it nicer than do-while.
---
`repeat ... until` is Lua's "do it, then check" loop. The body always runs at least once, and the loop stops when the condition becomes **true**. That's the reverse of `while`, which keeps going while its condition is true.

The textbook example is asking for input until it's valid:

```lua title=ask.lua
local age
repeat
  io.write("How old are you? ")
  age = tonumber(io.read())
until age and age > 0

print("In ten years you'll be " .. age + 10)
```

```repl shell
> lua ask.lua
How old are you? twelve
How old are you? -3
How old are you? 12
In ten years you'll be 22
```

`io.write` prints without a newline, and `io.read()` reads one line typed by the user.

**A nice detail other languages don't have:** locals declared *inside* the body are still visible in the `until` condition. So the variable can stay inside the loop:

```lua
repeat
  local roll = math.random(6)
  print("Rolled " .. roll)
until roll == 6   -- roll is still in scope here
```

In C or JavaScript, a variable declared inside a `do { } while` body is gone by the time the condition is checked, which forces you to declare it outside.

Quick comparison:

| | `while c do ... end` | `repeat ... until c` |
| --- | --- | --- |
| Checks | before each round | after each round |
| Runs at least once | no | yes |
| Stops when `c` is | false | true |

```compare javascript
let roll;
do {
  roll = Math.ceil(Math.random() * 6);
} while (roll !== 6);   // note: "while not done"
```

```compare python
# No do-while in Python; the usual pattern is:
while True:
    roll = random.randint(1, 6)
    if roll == 6:
        break
```

```exercise
goal: "Rewrite the loop with `repeat ... until`, so `line` can be a local inside the body and the loop stops on \"quit\"."
code: |-
  local line = ""
  while line ~= "quit" do
    line = io.read()
  end
checks:
  - match: '^\s*repeat\s*$'
    message: Start with repeat.
  - match: 'local\s+line\s*=\s*io\.read\(\)'
    message: Declare local line = io.read() inside the body.
  - match: 'until\s+line\s*==\s*"quit"'
    message: End with until line == "quit"
solution: |-
  repeat
    local line = io.read()
  until line == "quit"
```

```quiz
question: "When does `repeat ... until done` stop?"
options:
  - When done becomes true.
  - When done becomes false.
  - After exactly one round.
answer: 0
explain: until keeps looping until its condition is true, the opposite of while.
```
