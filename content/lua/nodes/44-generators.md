---
title: Coroutine generators
icon: "🏭"
branch: runtime
requires: [yield, ipairs]
summary: Turn a coroutine into an iterator, and use it in a for loop like ipairs.
---
**A puzzle.** You want to loop over every file in a nested folder tree, with a plain `for` loop:

```lua
for path in walk(tree) do
  print(path)
end
```

Walking a tree is naturally recursive. But a `for` loop's iterator is called once per item, and has to remember where it was between calls. Keeping a recursive walk's position in variables by hand is painful.

A coroutine makes it easy: write the recursive walk normally, and `yield` each path as you find it. `coroutine.wrap` turns the whole thing into an iterator function:

```lua title=walk.lua
local tree = {
  name = "project",
  children = {
    { name = "README.md" },
    { name = "src", children = {
      { name = "main.lua" },
      { name = "util.lua" },
    } },
  },
}

local function walk(node)
  return coroutine.wrap(function()
    local function visit(n, prefix)
      local path = prefix .. n.name
      coroutine.yield(path)
      for _, child in ipairs(n.children or {}) do
        visit(child, path .. "/")
      end
    end
    visit(node, "")
  end)
end

for path in walk(tree) do
  print(path)
end
```

```repl shell
> lua walk.lua
project
project/README.md
project/src
project/src/main.lua
project/src/util.lua
```

Why this works: the generic `for` calls the iterator function until it returns `nil`. Each call resumes the coroutine, which runs until the next `yield` and hands over one path. When the walk finishes, the coroutine ends without yielding anything, which counts as `nil`, and the loop stops.

Notice the `yield` happens deep inside the recursive `visit`. That's fine: the whole call stack of the coroutine is paused, not just one function.

**The general recipe** for any generator:

```lua
local function generator(...)
  return coroutine.wrap(function()
    -- any code you like, calling coroutine.yield(value) for each item
  end)
end
```

Some other good uses: reading a large file record by record, producing an endless sequence (Fibonacci numbers, IDs) that the caller stops with `break`, or paging through an API.

```compare python
def walk(node, prefix=""):
    path = prefix + node["name"]
    yield path
    for child in node.get("children", []):
        yield from walk(child, path + "/")
```

```compare javascript
function* walk(node, prefix = "") {
  const path = prefix + node.name;
  yield path;
  for (const child of node.children ?? []) yield* walk(child, path + "/");
}
```

```exercise
goal: "Turn `evens` into a generator: wrap the loop in `coroutine.wrap`, and yield each even number instead of printing it."
code: |-
  local function evens(limit)
    for n = 2, limit, 2 do
      print(n)
    end
  end
checks:
  - match: 'return\s+coroutine\.wrap\(\s*function\s*\(\s*\)'
    message: Return coroutine.wrap(function() ... end)
  - match: 'coroutine\.yield\(\s*n\s*\)'
    message: Yield each number with coroutine.yield(n)
  - notMatch: 'print\('
    message: The generator shouldn't print. The caller decides what to do.
solution: |-
  local function evens(limit)
    return coroutine.wrap(function()
      for n = 2, limit, 2 do
        coroutine.yield(n)
      end
    end)
  end
```

```quiz
question: "How does a `for x in gen()` loop know a wrapped coroutine is finished?"
options:
  - The coroutine calls break.
  - The iterator returns nil when the coroutine ends.
  - You have to check coroutine.status yourself.
answer: 1
explain: The generic for stops as soon as the iterator's first return value is nil.
```
