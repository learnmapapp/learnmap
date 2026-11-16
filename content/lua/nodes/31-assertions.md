---
title: Validate assumptions
icon: "🛂"
branch: runtime
requires: [functions]
summary: assert stops the program with a clear message when something you counted on isn't true.
---
**A story in two versions.** A function that charges a customer:

```lua
local function charge(amount)
  balance = balance - amount
end

charge("12")       -- works?! "12" is converted to a number
charge(nil)        -- attempt to perform arithmetic on a nil value (local 'amount')
charge(-50)        -- runs fine, and quietly *adds* money
```

The last two are the scary ones: the error happens deep inside, or worse, not at all. Now the guarded version:

```lua title=charge.lua
local function charge(amount)
  assert(type(amount) == "number", "amount must be a number")
  assert(amount > 0, "amount must be positive")
  balance = balance - amount
end

charge(-50)
```

```repl shell
> lua charge.lua
error: lua: charge.lua:3: amount must be positive
stack traceback:
  ...
```

**`assert(value, message)`** does nothing if `value` is truthy. If it's `false` or `nil`, it raises an error with your message. The program stops right at the line where the assumption broke, with a sentence that says what went wrong.

`assert` returns all its arguments when it succeeds, which gives a compact idiom for functions that return `nil, error`:

```lua
local f = assert(io.open("config.txt"))
```

If the file can't be opened, `io.open` returns `nil` and a message such as *config.txt: No such file or directory*. `assert` uses that second value as its error message. If it succeeds, `f` is the file.

**When to assert:**

- At the top of functions, to check arguments that would otherwise cause confusing errors later.
- For "this can't happen" situations, so if it *does* happen, you find out immediately.
- In [tests](node:testing), where it's the simplest possible check.

**When not to:** for things that can reasonably go wrong at runtime, like user input or a missing file the user picked. Those deserve a friendly message, not a crash. [Protected calls](node:errors) show how to recover.

```compare python
assert amount > 0, "amount must be positive"
```

```compare javascript
console.assert(amount > 0, "amount must be positive"); // only logs!
```

```compare rust
assert!(amount > 0, "amount must be positive");
```

```exercise
goal: "Guard `setVolume` so it fails with the message \"volume must be between 0 and 10\" when `level` is out of range."
code: |-
  local function setVolume(level)
    volume = level
  end
checks:
  - match: 'assert\(\s*level\s*>=\s*0\s+and\s+level\s*<=\s*10\s*,\s*"volume must be between 0 and 10"\s*\)'
    message: 'Add assert(level >= 0 and level <= 10, "volume must be between 0 and 10")'
solution: |-
  local function setVolume(level)
    assert(level >= 0 and level <= 10, "volume must be between 0 and 10")
    volume = level
  end
```

```quiz
question: "What does `assert(42, \"oops\")` do?"
options:
  - Raises the error "oops".
  - Returns 42 and "oops", and the program continues.
  - Prints "oops" as a warning.
answer: 1
explain: 42 is truthy, so assert passes and returns its arguments.
```
