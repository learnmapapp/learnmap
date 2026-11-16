---
title: Environment access
icon: "🌐"
branch: runtime
requires: [truth]
summary: Read environment variables with os.getenv, and meet _G and _ENV, where globals live.
---
"Environment" means two different things in Lua. Both are short topics, so this lesson covers both.

## 1. The operating system's environment

Environment variables are the usual way to configure a program without changing its code: API endpoints, debug switches, paths. `os.getenv` reads one, and returns `nil` when it isn't set. That fits perfectly with the [`or` idiom](node:defaults):

```lua title=server.lua
local port = tonumber(os.getenv("PORT")) or 8080
local verbose = os.getenv("DEBUG") == "1"

print(("Listening on %d (debug: %s)"):format(port, tostring(verbose)))
```

```repl shell
> lua server.lua
Listening on 8080 (debug: false)
> PORT=3000 DEBUG=1 lua server.lua
Listening on 3000 (debug: true)
```

Environment values are always strings, so convert them: `tonumber` for numbers, and a comparison for flags. When `PORT` isn't set, `tonumber(nil)` gives `nil`, and the `or 8080` kicks in. The same happens for nonsense like `PORT=abc`.

Lua can only *read* environment variables. There's no built-in way to set them.

## 2. Lua's own environment: where globals live

Every global variable is really a field in a table. That table is available as **`_G`**:

```lua
score = 10            -- a global
print(_G.score)       -- 10
print(_G.print == print)   -- true: built-ins are globals too
```

You can use `_G` to check whether a global exists without causing problems, like `if _G.jit then` to detect LuaJIT.

And **`_ENV`**? Technically, a global name like `score` means `_ENV.score`, and `_ENV` normally *is* `_G`. Changing `_ENV` inside a block changes where its global names are looked up. That's how sandboxes work: running a config file with an `_ENV` that only contains safe functions.

```lua
local sandbox = { print = print }
local chunk = load("print('hi from the sandbox'); os.exit()", "config", "t", sandbox)
print(pcall(chunk))
-- hi from the sandbox
-- false  [string "config"]:1: attempt to index a nil value (global 'os')
```

You won't need `_ENV` often, but now you'll recognize it in plugin hosts and config loaders.

```compare python
import os
port = int(os.environ.get("PORT", 8080))
```

```compare javascript
const port = Number(process.env.PORT ?? 8080);
```

```compare rust
let port: u16 = std::env::var("PORT").ok().and_then(|p| p.parse().ok()).unwrap_or(8080);
```

```exercise
goal: "Read the log level from the `LOG_LEVEL` environment variable, and fall back to \"info\" when it isn't set."
code: |-
  local level = "info"
checks:
  - match: 'local\s+level\s*=\s*os\.getenv\(\s*"LOG_LEVEL"\s*\)\s+or\s+"info"'
    message: 'Write local level = os.getenv("LOG_LEVEL") or "info"'
solution: |-
  local level = os.getenv("LOG_LEVEL") or "info"
```

```quiz
question: "What does `os.getenv(\"NOT_SET\")` return for a variable that doesn't exist?"
options:
  - "An empty string"
  - "nil"
  - "It raises an error."
answer: 1
explain: A missing variable gives nil, which works well with or for defaults.
```
