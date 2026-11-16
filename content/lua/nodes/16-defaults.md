---
title: Default arguments
icon: "🎚️"
branch: functions
requires: [truth, functions]
summary: "Lua has no default parameter syntax, so here are the idioms, and the false trap."
---
Lua has no `function greet(name = "friend")`. Instead, it relies on two things you already know: missing arguments are `nil`, and `or` returns its right side when the left is falsy. Together, they make defaults a one-liner:

```lua title=greet.lua
local function greet(name, greeting)
  name = name or "friend"
  greeting = greeting or "Hello"
  return greeting .. ", " .. name .. "!"
end

print(greet())                -- Hello, friend!
print(greet("Sam"))           -- Hello, Sam!
print(greet("Sam", "Ahoy"))   -- Ahoy, Sam!
```

`name = name or "friend"` reads as "keep name if it has a value, otherwise use friend". Put these lines at the very top of the function, so readers immediately see the defaults.

**Spot the bug.** Here's a function with a Boolean option:

```lua
local function connect(host, secure)
  secure = secure or true
  print(host, secure)
end

connect("example.com", false)   -- example.com  true  😬
```

The caller explicitly asked for `false`, but `false or true` is `true`. The `or` idiom can't tell "not given" apart from "given as false". For Boolean parameters, compare with `nil` explicitly:

```lua
if secure == nil then secure = true end
```

**Many options? Pass a table.** When a function has more than two or three optional settings, Lua code usually takes a single table of options. It doubles as named arguments, and the call reads nicely without parentheses:

```lua
local function window(opts)
  local width = opts.width or 800
  local height = opts.height or 600
  local title = opts.title or "Untitled"
  print(title, width .. "x" .. height)
end

window { title = "Editor", width = 1024 }   -- Editor  1024x600
```

That's exactly the style you see in Neovim plugin setup calls: `require("plugin").setup { ... }`.

```compare python
def greet(name="friend", greeting="Hello"):
    return f"{greeting}, {name}!"
```

```compare javascript
function greet(name = "friend", greeting = "Hello") {
  return `${greeting}, ${name}!`;
}
```

```exercise
goal: "Give `retries` a default of 3, using the `or` idiom on the first line of the function."
code: |-
  local function download(url, retries)
    for attempt = 1, retries do
      print("Attempt " .. attempt)
    end
  end
checks:
  - match: 'retries\s*=\s*retries\s+or\s+3'
    message: Add retries = retries or 3 at the top.
solution: |-
  local function download(url, retries)
    retries = retries or 3
    for attempt = 1, retries do
      print("Attempt " .. attempt)
    end
  end
```

```quiz
question: "With `verbose = verbose or true`, what happens when the caller passes `false`?"
options:
  - verbose stays false.
  - verbose becomes true.
  - It's an error.
answer: 1
explain: false is falsy, so or picks true. Check verbose == nil instead for Boolean options.
```
