---
title: Error context
icon: "🧭"
branch: runtime
requires: [errors]
summary: xpcall with debug.traceback keeps the trail that pcall throws away.
---
**A mystery.** A game catches errors in its main loop with `pcall`, so one bug doesn't crash the whole game. Then this shows up in the log:

```repl shell
> lua game.lua
Error: game.lua:41: attempt to index a nil value (field 'weapon')
```

Line 41 is a helper that's called from twelve places. Which caller passed a player without a weapon? By the time `pcall` returns, the **call stack is gone**: the functions that led to the error have already finished.

The fix is `xpcall`, which takes a **message handler**. The handler runs *at the moment of the error*, while the stack still exists. Lua's `debug.traceback` is the perfect handler:

```lua title=game.lua
local ok, err = xpcall(update, debug.traceback, dt)
if not ok then
  print("Error: " .. err)
end
```

```repl shell
> lua game.lua
Error: game.lua:41: attempt to index a nil value (field 'weapon')
stack traceback:
	game.lua:41: in function 'damageOf'
	game.lua:58: in function 'attack'
	game.lua:73: in function 'updateEnemies'
	game.lua:90: in function 'update'
	[C]: in function 'xpcall'
	game.lua:102: in main chunk
```

Read a traceback from the top down: the error happened in `damageOf`, which was called by `attack`, which was called by `updateEnemies`, and so on. Now you know where to look: line 58 in `attack`.

The `xpcall` shape: `xpcall(f, handler, args...)`. Compared to `pcall`, the handler sits between the function and its arguments.

**Custom handlers.** The handler gets the error and returns what `xpcall` should hand back. A handler can log the error, add context, or both:

```lua
local function report(err)
  local trace = debug.traceback(err, 2)
  logFile:write(os.date(), " ", trace, "\n")
  return err
end

xpcall(update, report, dt)
```

The second argument to `debug.traceback` is the level to start from. `2` skips the handler itself, so the trace starts at the code that failed.

When an error isn't caught at all, the standalone `lua` program prints a traceback for you. So `xpcall` matters most when you catch errors to keep running, like in game loops, servers and plugin hosts.

```compare python
import traceback
try:
    update(dt)
except Exception:
    traceback.print_exc()
```

```compare javascript
try {
  update(dt);
} catch (e) {
  console.error(e.stack);
}
```

```exercise
goal: "Swap `pcall` for `xpcall` with `debug.traceback` as the handler, so errors from `render` keep their stack trace."
code: |-
  local ok, err = pcall(render, frame)
checks:
  - match: 'xpcall\(\s*render\s*,\s*debug\.traceback\s*,\s*frame\s*\)'
    message: Write xpcall(render, debug.traceback, frame)
solution: |-
  local ok, err = xpcall(render, debug.traceback, frame)
```

```quiz
question: Why can't you get a full traceback after pcall returns?
options:
  - pcall deletes the error message.
  - The functions that led to the error have already finished, so the stack is gone.
  - Tracebacks only exist in debug builds of Lua.
answer: 1
explain: xpcall's handler runs while the failing stack still exists, which is why it can produce the trace.
```
