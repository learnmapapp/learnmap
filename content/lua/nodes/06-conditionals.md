---
title: Choose a branch
icon: "🔀"
branch: flow
requires: [truth, numbers]
summary: if, elseif, else, and end. Watch out for the space in "else if".
---
Lua's `if` reads almost like English. The condition is followed by `then`, and the whole statement is closed by `end`:

```lua title=thermostat.lua
local temp = 17

if temp < 16 then
  print("Heating on 🔥")
elseif temp > 24 then
  print("Cooling on ❄️")
else
  print("Just right 👌")
end
```

```repl shell
> lua thermostat.lua
Just right 👌
```

Branches are checked from top to bottom, and only the first one whose condition is truthy runs.

**The classic slip: `else if` vs `elseif`.** Written as two words, `else if` opens a *new*, nested `if`, which needs its own `end`. Forget it and Lua complains at the very bottom of the file:

```repl shell
> lua thermostat.lua
error: lua: thermostat.lua:10: 'end' expected (to close 'if' at line 3) near <eof>
```

If you see *'end' expected* pointing at the end of the file, look for an `else if` or a missing `end` somewhere above. Lua's one-word `elseif` keeps everything flat with a single `end`.

Two other things to keep in mind:

- **No parentheses needed** around the condition. `if (temp < 16) then` also works, but it's unusual style.
- **Lua has no `switch`.** A chain of `elseif`s does the job, and for mapping values to results, a [table](node:records) lookup is often even neater:

```lua
local sounds = { cat = "meow", dog = "woof", cow = "moo" }
print(sounds[animal] or "...")
```

```compare python
if temp < 16:
    print("Heating on")
elif temp > 24:
    print("Cooling on")
else:
    print("Just right")
```

```compare javascript
if (temp < 16) {
  console.log("Heating on");
} else if (temp > 24) {   // two words in JS, one in Lua!
  console.log("Cooling on");
}
```

```exercise
goal: "This code has the `else if` slip and won't compile. Turn it into a single `elseif`."
code: |-
  if score >= 90 then
    grade = "A"
  else if score >= 80 then
    grade = "B"
  else
    grade = "C"
  end
checks:
  - match: '^\s*elseif\s+score\s*>=\s*80\s+then'
    message: Write elseif as one word.
  - notMatch: 'else\s+if'
    message: There should be no "else if" left.
solution: |-
  if score >= 90 then
    grade = "A"
  elseif score >= 80 then
    grade = "B"
  else
    grade = "C"
  end
```

```quiz
question: "How many `end`s does an `if ... elseif ... elseif ... else` chain need?"
options:
  - One
  - One per branch
  - None
answer: 0
explain: elseif continues the same if statement, so a single end closes the whole chain.
```
