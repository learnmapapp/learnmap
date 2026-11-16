---
title: Assertion tests
icon: "🧪"
branch: runtime
requires: [assertions, modules]
summary: A tiny test runner in fifteen lines, and when to move to busted.
---
Lua's standard library has no test framework, and for small projects you don't need one. `assert`, `pcall` and a table of functions add up to a perfectly usable test runner. Let's build one.

The code under test, a module:

```lua title=slug.lua
local M = {}

function M.slugify(title)
  return (title:lower():gsub("%s+", "-"):gsub("[^%w-]", ""))
end

return M
```

The tests. Each one is a function in a table, and the runner calls each with `pcall`, so one failure doesn't stop the rest:

```lua title=slug_test.lua
local slug = require("slug")
local tests = {}

tests["lowercases and joins words"] = function()
  assert(slug.slugify("Hello World") == "hello-world")
end

tests["removes punctuation"] = function()
  local got = slug.slugify("Lua: fast & small!")
  assert(got == "lua-fast--small", "got " .. got)
end

local failed = 0
for name, test in pairs(tests) do
  local ok, err = pcall(test)
  print((ok and "✅ " or "❌ ") .. name)
  if not ok then
    print("   " .. tostring(err))
    failed = failed + 1
  end
end
os.exit(failed == 0 and 0 or 1)
```

```repl shell
> lua slug_test.lua
✅ lowercases and joins words
✅ removes punctuation
```

A few deliberate choices in there:

- **The message in the second `assert`** shows what came out. A bare `assert(a == b)` only says *assertion failed!*, which leaves you guessing.
- **`os.exit` with 1 on failure** makes the script usable in CI: a non-zero exit code fails the build.
- **`pairs` runs the tests in random-ish order**, which is actually useful: tests that secretly depend on each other show up quickly.

Did you notice "fast & small" became `fast--small`, with two dashes? The test documents that behavior. If you decide it's a bug, change the test first, see it fail, then fix `slugify`.

**When to switch to a framework.** Once you want nicer assertions (`assert.are.same` for deep table comparison), setup and teardown, or mocking, install **busted**, the most popular Lua test framework:

```lua title=spec/slug_spec.lua
describe("slugify", function()
  it("lowercases and joins words", function()
    assert.are.equal("hello-world", require("slug").slugify("Hello World"))
  end)
end)
```

Run `busted` in the project folder, and it finds every `*_spec.lua` file in `spec/`.

```compare python
def test_slugify():
    assert slugify("Hello World") == "hello-world"
```

```compare javascript
test("slugify", () => {
  expect(slugify("Hello World")).toBe("hello-world");
});
```

```compare rust
#[test]
fn slugify_works() {
    assert_eq!(slugify("Hello World"), "hello-world");
}
```

```exercise
goal: "Add a test named \"keeps edge dashes\" that checks `slug.slugify(\" hi \")` returns \"-hi-\", with a helpful message."
code: |-
  local tests = {}
checks:
  - match: 'tests\["keeps edge dashes"\]\s*=\s*function\(\s*\)'
    message: 'Add tests["keeps edge dashes"] = function() ... end'
  - match: 'assert\(\s*(\w+)\s*==\s*"-hi-"\s*,'
    message: Assert that the result equals "-hi-", and pass a message as the second argument.
solution: |-
  local tests = {}

  tests["keeps edge dashes"] = function()
    local got = slug.slugify(" hi ")
    assert(got == "-hi-", "got " .. got)
  end
```

```quiz
question: "Why does the runner call each test through pcall?"
options:
  - To make the tests run faster.
  - So a failing test doesn't stop the other tests from running.
  - Because assert only works inside pcall.
answer: 1
explain: Without pcall, the first failing assert would end the whole script.
```
