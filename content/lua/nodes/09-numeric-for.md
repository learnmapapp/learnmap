---
title: Numeric for loops
icon: "🔢"
branch: flow
requires: [while]
summary: for i = start, stop, step, where both ends are included.
---
Here's how to draw a little staircase:

```lua title=stairs.lua
for step = 1, 4 do
  print(("#"):rep(step))
end
```

```repl shell
> lua stairs.lua
#
##
###
####
```

The numeric `for` has the shape `for variable = start, stop, step do ... end`. Three things to know:

**1. Both ends are included.** `for i = 1, 4` gives 1, 2, 3, 4. That fits nicely with Lua [tables](node:lists), which count from 1. Coming from `range(0, n)` in Python or `i < n` in C, this is the most common off-by-one.

**2. The step is optional** and defaults to 1. Give a negative step to count down:

```lua
for i = 10, 0, -2 do io.write(i, " ") end   -- 10 8 6 4 2 0
for i = 0, 1, 0.25 do io.write(i, " ") end  -- floats work too
```

If the range is empty, like `for i = 5, 1` without a negative step, the body simply never runs.

**3. The loop variable is a fresh local**, visible only inside the loop. After the loop it's gone, and changing it inside the body doesn't affect how many rounds there are. If you need to know where you stopped, copy the value into a variable declared before the loop.

The `start`, `stop` and `step` expressions are evaluated **once**, before the loop starts. So `for i = 1, #list` doesn't re-check the length on every round.

To go through the items of a table rather than numbers, there's the *generic* for with [ipairs](node:ipairs) and [pairs](node:pairs).

```compare python
for step in range(1, 5):   # Python stops before 5
    print("#" * step)
```

```compare javascript
for (let step = 1; step <= 4; step++) {
  console.log("#".repeat(step));
}
```

```compare rust
for step in 1..=4 {   // ..= is inclusive, like Lua
    println!("{}", "#".repeat(step));
}
```

```exercise
goal: "Print the odd numbers from 1 to 9 by adding a step to the loop, instead of skipping with an if."
code: |-
  for n = 1, 9 do
    if n % 2 == 1 then
      print(n)
    end
  end
checks:
  - match: 'for\s+n\s*=\s*1\s*,\s*9\s*,\s*2\s+do'
    message: Write for n = 1, 9, 2 do
  - notMatch: '\bif\b'
    message: With the step, the if isn't needed.
solution: |-
  for n = 1, 9, 2 do
    print(n)
  end
```

```quiz
question: "How many times does `for i = 1, 3 do ... end` run its body?"
options:
  - "2"
  - "3"
  - "4"
answer: 1
explain: Both ends are included, so i is 1, 2 and 3.
```
