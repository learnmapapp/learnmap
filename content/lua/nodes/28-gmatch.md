---
title: Iterate matches
icon: "🎣"
branch: text
requires: [patterns, ipairs]
summary: string.gmatch loops over every match of a pattern, captures included.
---
`string.match` finds the first match. To catch them all, use `string.gmatch` ("global match") in a `for` loop:

```lua title=hashtags.lua
local post = "Sunset run 🏃 #running #sunset #nofilter"

for tag in post:gmatch("#(%w+)") do
  print(tag)
end
```

```repl shell
> lua hashtags.lua
running
sunset
nofilter
```

Each round, the loop variable holds the capture, here the word after `#`. Without parentheses in the pattern, you get the full match instead.

**More than one capture** gives more than one loop variable. That makes parsing simple `key=value` text really pleasant:

```lua
local config = "width=800, height=600, title=Demo"
local settings = {}

for key, value in config:gmatch("(%w+)=(%w+)") do
  settings[key] = value
end

print(settings.height)   -- 600 (the string "600")
```

Captured values are always strings. Wrap them in `tonumber` when you need numbers.

**Splitting a string.** Lua has no `split` function, and `gmatch` is the usual replacement. Instead of describing the separator, describe the *pieces*:

```lua
local words = {}
for word in ("the quick  brown fox"):gmatch("%S+") do
  words[#words + 1] = word
end
-- { "the", "quick", "brown", "fox" }: double spaces don't matter
```

`%S+` means "one or more non-space characters". For comma-separated values, `[^,]+` means "one or more characters that aren't commas". Note that this approach skips empty fields: `"a,,b"` gives only two items.

`gmatch` returns an iterator, just like `ipairs`. It hands out the next match each time the loop asks, so it doesn't build a list of all matches up front.

```compare python
for tag in re.findall(r"#(\w+)", post):
    print(tag)
```

```compare javascript
for (const [, tag] of post.matchAll(/#(\w+)/g)) {
  console.log(tag);
}
```

```compare rust
for word in text.split_whitespace() {
    println!("{word}");
}
```

```exercise
goal: "Collect every number in `line` into the `numbers` list, using gmatch with `%d+` and `tonumber`."
code: |-
  local numbers = {}
  -- line = "3 apples, 12 pears and 7 plums"
checks:
  - match: 'for\s+(\w+)\s+in\s+line:gmatch\(\s*"%d\+"\s*\)\s+do'
    message: 'Loop with for n in line:gmatch("%d+") do'
  - match: 'numbers\[#numbers\s*\+\s*1\]\s*=\s*tonumber\(\s*\w+\s*\)'
    message: Append with numbers[#numbers + 1] = tonumber(n)
solution: |-
  local numbers = {}
  for n in line:gmatch("%d+") do
    numbers[#numbers + 1] = tonumber(n)
  end
```

```quiz
question: "What does each round of `for k, v in s:gmatch(\"(%a+)=(%d+)\")` give you?"
options:
  - "k is the match position and v the text."
  - "k and v are the two captures, as strings."
  - "k and v are the captures, with v converted to a number."
answer: 1
explain: Each capture becomes a loop variable, and captures are always strings.
```
