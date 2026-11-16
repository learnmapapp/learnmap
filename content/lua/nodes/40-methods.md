---
title: Colon methods
icon: "📞"
branch: design
requires: [records, functions]
summary: obj:method() is shorthand for obj.method(obj), and that's all there is to self.
---
Lua has two ways to call a function stored in a table: with a dot and with a colon. This one-character difference trips up nearly everyone at first, so let's take it slowly.

```lua title=account.lua
local account = { owner = "Kim", balance = 100 }

function account.deposit(self, amount)
  self.balance = self.balance + amount
end

account.deposit(account, 50)   -- pass the table explicitly
account:deposit(50)            -- the colon passes it for you
print(account.balance)         -- 200
```

**The colon call `t:f(x)` means `t.f(t, x)`.** That's it. No magic, no hidden binding. The colon just inserts the table as the first argument.

There's a matching shorthand for *defining* methods. `function t:f(x)` means `function t.f(self, x)`: the colon adds a hidden first parameter called `self`.

```lua
function account:withdraw(amount)
  self.balance = self.balance - amount
end
```

So the convention is simple: **define with a colon, call with a colon.**

**The error message to recognize.** Mix them up, defining with a colon and calling with a dot, and `self` gets the wrong value:

```lua
account.withdraw(30)   -- oops, a dot
```

```repl shell
> lua account.lua
error: lua: account.lua:12: attempt to index a number value (local 'self')
```

The dot call passes `30` as the first argument, so inside `withdraw`, `self` is the number 30 and `amount` is `nil`. Whenever an error mentions `self` being a number, a string or `nil`, look for a dot that should be a colon.

You've already used colon calls on strings: `name:upper()` is `string.upper(name)`. That works because strings share a metatable whose `__index` is the `string` table.

Together with [`__index`](node:index), colon methods let many tables share one set of functions. That's the next lesson, [prototype objects](node:objects).

```compare python
account.deposit(50)   # Python passes self automatically
Account.deposit(account, 50)   # same thing, written out
```

```compare javascript
account.deposit(50);   // `this` is set from the dot
```

```compare rust
account.deposit(50);          // method call syntax
Account::deposit(&mut account, 50);  // the same call, written out
```

```exercise
goal: "This crashes with \"attempt to index a nil value (local 'self')\". Fix the call."
code: |-
  local timer = { seconds = 0 }

  function timer:tick()
    self.seconds = self.seconds + 1
  end

  timer.tick()
checks:
  - match: '^timer:tick\(\)'
    message: Call it with a colon, timer:tick()
solution: |-
  local timer = { seconds = 0 }

  function timer:tick()
    self.seconds = self.seconds + 1
  end

  timer:tick()
```

```quiz
question: "What is `obj:greet(\"hi\")` short for?"
options:
  - "`obj.greet(\"hi\")`"
  - "`obj.greet(obj, \"hi\")`"
  - "`greet(obj, \"hi\")`"
answer: 1
explain: The colon passes the table before the other arguments.
```
