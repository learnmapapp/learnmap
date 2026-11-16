---
title: Suspend and resume
icon: "🏓"
branch: runtime
requires: [coroutines]
summary: Values travel both ways through resume and yield, like a game of ping-pong.
---
`resume` and `yield` don't just pause and continue. They also **pass values** to each other. Think of a ping-pong rally: each side sends the ball, and whatever one side hits arrives as the other side's return value.

Let's build a running-average calculator, which receives numbers and sends back the average so far:

```lua title=average.lua
local averager = coroutine.create(function(first)
  local sum, count = first, 1
  while true do
    local nextNumber = coroutine.yield(sum / count)
    sum = sum + nextNumber
    count = count + 1
  end
end)

print(coroutine.resume(averager, 10))   -- true  10.0
print(coroutine.resume(averager, 20))   -- true  15.0
print(coroutine.resume(averager, 60))   -- true  30.0
```

Follow the ball:

1. The **first** `resume(averager, 10)` starts the function, so `10` arrives as the parameter `first`.
2. The coroutine runs to `yield(sum / count)` and sends `10.0` back. The first `resume` returns `true, 10.0`.
3. The **next** `resume(averager, 20)` continues the paused `yield`, which now *returns* `20`. That's how `nextNumber` gets its value.
4. Around the loop again, it yields `15.0`, and so on.

So:

| Call | Sends | Receives |
| --- | --- | --- |
| first `resume(co, ...)` | arguments to the function | values from the first `yield`, or the function's `return` |
| later `resume(co, ...)` | the return values of the paused `yield` | values from the next `yield` |
| `yield(...)` | values back to `resume` | the arguments of the next `resume` |

`resume` always puts a Boolean first: `true` if all went well, or `false` plus an error message if the coroutine raised an error. Like [`pcall`](node:errors), errors inside a coroutine don't escape on their own.

**`coroutine.wrap`** is a friendlier version. It returns a plain function: calling it resumes the coroutine, there's no Boolean in the results, and errors are raised normally:

```lua
local average = coroutine.wrap(function(first) --[[ same body ]] end)
print(average(10))   -- 10.0
print(average(20))   -- 15.0
```

Use `create`/`resume` when you need the status or want to catch errors, and `wrap` for everything else.

```compare python
def averager():
    total, count = 0, 0
    avg = None
    while True:
        n = yield avg       # gen.send(n) is Lua's resume(co, n)
        total, count = total + n, count + 1
        avg = total / count
```

```compare javascript
// gen.next(value) is Lua's resume(co, value)
const value = yield average;
```

```exercise
goal: "Make the echo coroutine send back each message in upper case: yield `msg:upper()`, and store what the next resume sends in `msg`."
code: |-
  local echo = coroutine.wrap(function(msg)
    while true do
      coroutine.yield()
    end
  end)
checks:
  - match: 'msg\s*=\s*coroutine\.yield\(\s*msg:upper\(\)\s*\)'
    message: Write msg = coroutine.yield(msg:upper())
solution: |-
  local echo = coroutine.wrap(function(msg)
    while true do
      msg = coroutine.yield(msg:upper())
    end
  end)
```

```quiz
question: "Inside a coroutine, `local x = coroutine.yield(1)`. The caller then runs `coroutine.resume(co, \"hi\")`. What's `x`?"
options:
  - "1"
  - "\"hi\""
  - "true"
answer: 1
explain: The arguments to the next resume become the return values of the paused yield.
```
