---
title: Define functions
icon: "🛠️"
branch: functions
requires: [numbers]
summary: local function, parameters, return, and functions as ordinary values.
---
Here's a function that converts Celsius to Fahrenheit:

```lua title=convert.lua
local function toFahrenheit(celsius)
  return celsius * 9 / 5 + 32
end

print(toFahrenheit(100))   -- 212.0
print(toFahrenheit(-40))   -- -40.0
```

The shape: `function name(parameters) ... end`. No types, no braces, and `return` hands back a value. A function without a `return` gives back nothing, which shows up as `nil` if you use the result.

Notice `local function`. Just like variables, functions are **global unless you say `local`**. Make it a habit.

**Functions are values.** That line is really a shorter way to write this:

```lua
local toFahrenheit = function(celsius)
  return celsius * 9 / 5 + 32
end
```

A function is just a value stored in a variable, like a number or a string. You can put functions in tables, pass them to other functions, and return them. That's how [sorting](node:sorting), [closures](node:closures) and [modules](node:modules) work.

**Arguments are forgiving.** Lua doesn't check how many arguments you pass:

```lua
local function greet(name, greeting)
  print(greeting, name)
end

greet("Ada")                     -- nil  Ada: the missing one is nil
greet("Ada", "Hi", "ignored")    -- Hi  Ada: extras are dropped
```

That flexibility is what makes [default arguments](node:defaults) and [variable arguments](node:varargs) possible. It also means a typo'd call won't complain, so keep function signatures short and clear.

**A small gotcha:** a `local function` can only be called by code written *after* it. Lua reads the file from top to bottom, and the name doesn't exist yet above its definition.

**Calling with one string or table argument** lets you drop the parentheses: `print "hi"` or `setup { debug = true }`. You'll see this in Neovim configs a lot.

```compare python
def to_fahrenheit(celsius):
    return celsius * 9 / 5 + 32
```

```compare javascript
function toFahrenheit(celsius) {
  return celsius * 9 / 5 + 32;
}
```

```compare rust
fn to_fahrenheit(celsius: f64) -> f64 {
    celsius * 9.0 / 5.0 + 32.0
}
```

```exercise
goal: "Write a local function `area(width, height)` that returns the area of a rectangle."
code: |-
  -- write area here
checks:
  - match: 'local\s+function\s+area\(\s*width\s*,\s*height\s*\)'
    message: "Start with local function area(width, height)"
  - match: 'return\s+width\s*\*\s*height'
    message: Return width * height.
  - match: '\bend\b'
    message: Close the function with end.
solution: |-
  local function area(width, height)
    return width * height
  end
```

```quiz
question: "`local function f(a, b) return b end` — what does `f(1)` return?"
options:
  - "An error: missing argument"
  - "`nil`"
  - "`1`"
answer: 1
explain: Missing arguments are simply nil.
```
