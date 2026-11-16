---
title: Create a coroutine
icon: "🧶"
branch: runtime
requires: [functions, returns]
summary: A coroutine is a function you can pause halfway and continue later.
---
**An analogy.** A normal function is a phone call: once you dial, you stay on the line until it's done. A **[[coroutine]]** is a text conversation: it can say something, go quiet, and pick up exactly where it left off when you reply. Its local variables, its position in a loop, everything is kept while it waits.

Here's a tiny one:

```lua title=steps.lua
local co = coroutine.create(function()
  print("step 1")
  coroutine.yield()
  print("step 2")
  coroutine.yield()
  print("step 3")
end)

coroutine.resume(co)   -- step 1
print("...the main program does other things...")
coroutine.resume(co)   -- step 2
coroutine.resume(co)   -- step 3
```

```repl shell
> lua steps.lua
step 1
...the main program does other things...
step 2
step 3
```

The three verbs:

- **`coroutine.create(f)`** wraps a function in a coroutine. Nothing runs yet.
- **`coroutine.resume(co)`** runs it until it hits a `yield` or finishes.
- **`coroutine.yield()`**, called *inside* the coroutine, pauses it and hands control back to whoever resumed it.

Every coroutine has a **status**, which you can check with `coroutine.status(co)`:

| Status | Meaning |
| --- | --- |
| `suspended` | created but not started, or paused at a yield |
| `running` | it's the one running right now |
| `normal` | it resumed another coroutine and is waiting for it |
| `dead` | finished, or stopped with an error |

Resuming a dead coroutine doesn't crash, it just returns `false` and *cannot resume dead coroutine*.

**What coroutines are not:** threads. Only one piece of code runs at any moment, and a coroutine runs until it decides to yield. So there are no locks and no race conditions. This is cooperative multitasking, which is why game engines love it for scripting things like cutscenes ("walk here, wait 2 seconds, say this line") as straight-line code.

[Passing values in and out](node:yield) is next.

```compare python
def steps():        # a Python generator works the same way
    print("step 1")
    yield
    print("step 2")
```

```compare javascript
function* steps() {   // generator functions are JS's coroutines
  console.log("step 1");
  yield;
  console.log("step 2");
}
```

```exercise
goal: "The loop body should run in three separate pieces. Add a `coroutine.yield()` after each print."
code: |-
  local co = coroutine.create(function()
    for i = 1, 3 do
      print("tick " .. i)
    end
  end)
checks:
  - match: 'print\("tick " \.\. i\)\s*\n\s*coroutine\.yield\(\)'
    message: Call coroutine.yield() right after the print.
solution: |-
  local co = coroutine.create(function()
    for i = 1, 3 do
      print("tick " .. i)
      coroutine.yield()
    end
  end)
```

```quiz
question: "What does `coroutine.create(f)` do?"
options:
  - It runs f in a new thread.
  - It wraps f in a coroutine without running it.
  - It runs f until its first yield.
answer: 1
explain: Nothing runs until the first coroutine.resume.
```
