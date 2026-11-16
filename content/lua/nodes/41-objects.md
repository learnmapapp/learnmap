---
title: Prototype objects
icon: "🐣"
branch: design
requires: [methods, index]
summary: Classes without a class keyword, built from __index and colon methods.
---
Lua has no `class` keyword. Instead, you combine two things you already know: [`__index`](node:index) to share methods, and [colon methods](node:methods) to get `self`. Here's the full pattern, then a line-by-line walkthrough.

```lua title=pet.lua
local Pet = {}
Pet.__index = Pet

function Pet.new(name, sound)
  local self = setmetatable({}, Pet)
  self.name = name
  self.sound = sound
  return self
end

function Pet:speak()
  return self.name .. " says " .. self.sound
end

local rex = Pet.new("Rex", "woof")
local tom = Pet.new("Tom", "meow")
print(rex:speak())   -- Rex says woof
print(tom:speak())   -- Tom says meow
```

**Walkthrough:**

1. `local Pet = {}` is the "class": a table that will hold the shared methods.
2. `Pet.__index = Pet` is the line that confuses everyone. `Pet` will be the *metatable* of every pet, and this line says "when a pet is missing a key, look in `Pet`". So `Pet` is both the metatable and the place the methods live.
3. `Pet.new` is the constructor. `setmetatable({}, Pet)` creates a fresh table linked to `Pet`, and then fills in its own fields. `new` is just a convention, not a keyword.
4. `function Pet:speak()` stores `speak` in `Pet`, *not* in each pet.

Now trace `rex:speak()`: it's `rex.speak(rex)`. `rex` has no `speak` field, so Lua checks its metatable's `__index`, which is `Pet`, and finds `Pet.speak`. It's called with `rex` as `self`. 🎉

**Inheritance** is the same trick, one level deeper. A `Dog` whose missing keys fall back to `Pet`:

```lua
local Dog = setmetatable({}, { __index = Pet })
Dog.__index = Dog

function Dog.new(name)
  local self = Pet.new(name, "woof")
  return setmetatable(self, Dog)
end

function Dog:fetch()
  return self.name .. " fetches the ball"
end

local fido = Dog.new("Fido")
print(fido:speak(), fido:fetch())
```

The lookup for `fido:speak()` goes: `fido` → `Dog` → `Pet`. Found.

There are many small libraries (like `middleclass` and `classic`) that wrap this pattern in friendlier syntax, but they all come down to these few lines.

```compare python
class Pet:
    def __init__(self, name, sound):
        self.name, self.sound = name, sound
    def speak(self):
        return f"{self.name} says {self.sound}"
```

```compare javascript
class Pet {
  constructor(name, sound) { this.name = name; this.sound = sound; }
  speak() { return `${this.name} says ${this.sound}`; }
}
// under the hood, JS classes are prototypes too!
```

```compare rust
struct Pet { name: String, sound: String }
impl Pet {
    fn speak(&self) -> String { format!("{} says {}", self.name, self.sound) }
}
```

```exercise
goal: "Every `Counter` errors with \"attempt to call a nil value (method 'increment')\". Add the missing line that links instances to the methods."
code: |-
  local Counter = {}

  function Counter.new()
    return setmetatable({ count = 0 }, Counter)
  end

  function Counter:increment()
    self.count = self.count + 1
  end
checks:
  - match: '^Counter\.__index\s*=\s*Counter'
    message: Add Counter.__index = Counter
solution: |-
  local Counter = {}
  Counter.__index = Counter

  function Counter.new()
    return setmetatable({ count = 0 }, Counter)
  end

  function Counter:increment()
    self.count = self.count + 1
  end
```

```quiz
question: "In the Pet example, where is the `speak` function stored?"
options:
  - In every pet table.
  - Only in Pet, and pets find it through __index.
  - In the global table.
answer: 1
explain: Methods live once in the class table. Instances only hold their own data.
```
