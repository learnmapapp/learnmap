---
title: Protected calls
icon: "🛡️"
branch: runtime
requires: [assertions, returns]
summary: error raises, pcall catches. Lua's try/catch is a function call.
---
Lua has no `try`/`catch` keywords. Instead, it has a function: **`pcall`**, a [[protected call]]. You hand it a function, and it runs that function in a safety net.

```lua title=parse.lua
local function parseAge(text)
  local n = tonumber(text)
  if not n then
    error("not a number: " .. text)
  end
  return n
end

local ok, result = pcall(parseAge, "forty")
print(ok, result)
-- false  parse.lua:4: not a number: forty

ok, result = pcall(parseAge, "40")
print(ok, result)
-- true  40
```

The pieces:

- **`error(message)`** raises an error. Without protection, the program stops and prints it.
- **`pcall(f, args...)`** calls `f(args...)`. It returns `true` followed by `f`'s results if all went well, or `false` and the error if something was raised. The error never escapes.

Here's the try/catch translation:

| JavaScript | Lua |
| --- | --- |
| `throw new Error("bad")` | `error("bad")` |
| `try { risky(x) }` | `local ok, err = pcall(risky, x)` |
| `catch (e) { ... }` | `if not ok then ... end` |
| `try { ... }` with several lines | `pcall(function() ... end)` |

**Where did `parse.lua:4:` come from?** `error` adds the position where it was called. A second argument, the *level*, controls this. `error(msg, 2)` blames the caller of your function, which is usually what you want for argument checks. `error(msg, 0)` adds no position at all.

**Errors can be any value**, not just strings. A table can carry details:

```lua
local ok, err = pcall(function()
  error({ code = 404, message = "not found" })
end)
print(err.code)   -- 404
```

Tables don't get a position added, so you control exactly what's in them.

**Two error styles in Lua.** Functions in the standard library like `io.open` don't raise errors for expected problems. They return `nil, message`. Raising with `error` is for bugs and truly exceptional situations. When you write your own functions, follow the same split.

```compare python
try:
    age = parse_age("forty")
except ValueError as e:
    print(e)
```

```compare javascript
try {
  parseAge("forty");
} catch (e) {
  console.log(e.message);
}
```

```compare rust
match parse_age("forty") {   // Rust uses Result, like Lua's nil, message style
    Ok(n) => println!("{n}"),
    Err(e) => println!("{e}"),
}
```

```exercise
goal: "`loadConfig` might raise an error. Call it with `pcall`, and print the error when it fails."
code: |-
  local config = loadConfig("app.conf")
checks:
  - match: 'local\s+ok\s*,\s*(\w+)\s*=\s*pcall\(\s*loadConfig\s*,\s*"app\.conf"\s*\)'
    message: 'Write local ok, result = pcall(loadConfig, "app.conf")'
  - match: 'if\s+not\s+ok\s+then'
    message: Check with if not ok then
solution: |-
  local ok, result = pcall(loadConfig, "app.conf")
  if not ok then
    print("Could not load config: " .. tostring(result))
  end
```

```quiz
question: "What does `pcall(error, \"boom\")` return?"
options:
  - "It raises \"boom\"."
  - "false, \"boom\""
  - "true, \"boom\""
answer: 1
explain: pcall catches the error and returns false followed by the error value.
```
