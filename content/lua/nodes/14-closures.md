---
title: Captured state
icon: "🎒"
branch: functions
requires: [scope]
summary: Inner functions remember the locals around them, which gives you private state for free.
---
Let's build a ticket dispenser, the kind at a deli counter. Each pull gives the next number:

```lua title=deli.lua
local function makeDispenser(start)
  local next = start
  return function()
    local ticket = next
    next = next + 1
    return ticket
  end
end

local cheese = makeDispenser(1)
local fish = makeDispenser(100)

print(cheese(), cheese(), cheese())   -- 1  2  3
print(fish(), cheese())               -- 100  4
```

Look at what happened: `makeDispenser` returned long ago, yet the inner function still reads and changes `next`. A function that remembers the locals around it is called a **[[closure]]**, and each closure gets **its own** copy. That's why the cheese and fish counters are independent.

There's something else neat here. Nobody can touch `next` from outside. There's no `cheese.next = 0` to reset the counter. The variable is completely private, which in Lua is the simplest way to hide state.

Closures show up everywhere in Lua:

- **Callbacks** that need some context: `button.onClick = function() count = count + 1 end`.
- **Factories** like `makeDispenser`, which produce functions configured for one job.
- **Iterators**, which remember their position between calls. You'll [write your own](node:generators) later.

One subtle thing that's handled *well*: every round of a `for` loop gets a fresh loop variable, so closures created in a loop capture different values.

```lua
local actions = {}
for i = 1, 3 do
  actions[i] = function() return i end
end
print(actions[1](), actions[3]())   -- 1  3
```

(Older JavaScript with `var` famously got this one wrong.)

```compare javascript
function makeDispenser(start) {
  let next = start;
  return () => next++;
}
```

```compare python
def make_dispenser(start):
    n = start
    def pull():
        nonlocal n   # Python needs this to change n
        n += 1
        return n - 1
    return pull
```

```compare rust
fn make_dispenser(start: u32) -> impl FnMut() -> u32 {
    let mut next = start;
    move || { next += 1; next - 1 }
}
```

```exercise
goal: "Finish `makeCounter`: return a function that adds 1 to `count` and returns the new value."
code: |-
  local function makeCounter()
    local count = 0
  end
checks:
  - match: 'return\s+function\s*\(\s*\)'
    message: Return an anonymous function, return function() ... end
  - match: 'count\s*=\s*count\s*\+\s*1'
    message: Inside it, add one with count = count + 1
  - match: 'return\s+count\b'
    message: Then return count.
solution: |-
  local function makeCounter()
    local count = 0
    return function()
      count = count + 1
      return count
    end
  end
```

```quiz
question: "You create `a = makeCounter()` and `b = makeCounter()`, then call `a()` twice and `b()` once. What does the next `b()` return?"
options:
  - "2"
  - "4"
  - "3"
answer: 0
explain: Each call to makeCounter creates a fresh count, so b has its own counter, which is at 1 before this call.
```
