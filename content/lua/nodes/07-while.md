---
title: While loops
icon: "🔄"
branch: flow
requires: [conditionals]
summary: Keep looping while a condition holds, with while ... do ... end.
---
A savings goal: put away €50 a month, earning 1% a month on what's there. How many months until there's €1,000?

You don't know the number of rounds in advance, which makes it a job for **`while`**:

```lua title=savings.lua
local balance, months = 0, 0

while balance < 1000 do
  balance = balance * 1.01 + 50
  months = months + 1
end

print(("After %d months: €%.2f"):format(months, balance))
```

```repl shell
> lua savings.lua
After 19 months: €1040.54
```

The shape is `while condition do ... end`. The condition is checked before every round, so if it's false from the start, the body never runs.

(`string.format` with `%d` and `%.2f` makes the number look nice. There's a [whole lesson](node:format) on it.)

**No `+=` in Lua.** You may have noticed `months = months + 1`. Lua has no `+=`, `-=` or `++`. It's a little more typing, and you get used to it surprisingly fast.

**Watch the loop variable.** A `while` loop only ends if something in the body moves it towards the exit. Forget to update it, and it spins forever. Press Ctrl+C in the terminal to stop a runaway script.

When you know the number of rounds up front, a [numeric for](node:numeric-for) is shorter and can't loop forever by accident.

```compare python
while balance < 1000:
    balance = balance * 1.01 + 50
    months += 1
```

```compare javascript
while (balance < 1000) {
  balance = balance * 1.01 + 50;
  months++;
}
```

```compare rust
while balance < 1000.0 {
    balance = balance * 1.01 + 50.0;
    months += 1;
}
```

```exercise
goal: "This countdown never stops, and `-=` doesn't exist in Lua. Decrease `n` by one on each round."
code: |-
  local n = 3
  while n > 0 do
    print(n)
    n -= 1
  end
checks:
  - match: 'n\s*=\s*n\s*-\s*1'
    message: Write n = n - 1
  - notMatch: '-='
    message: Lua has no -= operator.
solution: |-
  local n = 3
  while n > 0 do
    print(n)
    n = n - 1
  end
```

```quiz
question: Which keyword comes after the condition in a while loop?
options:
  - "`then`"
  - "`do`"
  - "`:`"
answer: 1
explain: "It's while condition do ... end. then belongs to if."
```
