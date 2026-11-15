---
title: Modules and functions
icon: "📦"
branch: functional
requires: [pattern-matching]
summary: defmodule, def, and functions with several heads.
---
Functions live in modules:

```elixir
defmodule Greeter do
  def hello(name) do
    "Hello, #{name}!"
  end
end
```

```repl
> Greeter.hello("Drop")
"Hello, Drop!"
```

`#{ }` puts a value inside a string. The function returns its last expression, no `return` needed.

Here's where pattern matching comes back: a function can have **several clauses**, and Elixir picks the first one that matches:

```elixir
defmodule Greeter do
  def hello(:pirate), do: "Ahoy!"
  def hello(name), do: "Hello, #{name}!"
end
```

You'll see functions written as `hello/1`. The `/1` is the [[arity]], the number of arguments. `hello/1` and `hello/2` are different functions.

```compare python
class Greeter:
    @staticmethod
    def hello(name): return f"Hello, {name}!"
```

```compare javascript
export const hello = (name) => `Hello, ${name}!`;
```

```compare java
class Greeter {
    static String hello(String name) { return "Hello, " + name + "!"; }
}
```

```compare kotlin
object Greeter {
    fun hello(name: String) = "Hello, $name!"
}
```

```compare go
func Hello(name string) string { return "Hello, " + name + "!" }
```

```exercise
goal: Add a clause so that `Greeter.hello(:robot)` returns `"Beep boop."`.
code: |
  defmodule Greeter do
    def hello(name), do: "Hello, #{name}!"
  end
checks:
  - match: 'def\s+hello\s*\(\s*:robot\s*\)\s*,\s*do:\s*"Beep boop\."'
    message: 'Add  def hello(:robot), do: "Beep boop."'
  - match: 'hello\s*\(\s*:robot\s*\)[\s\S]*hello\s*\(\s*name\s*\)'
    message: Order matters! Put the :robot clause above the general one.
output: '"Beep boop."'
```

## Calling other modules

Module names are just atoms, written in CamelCase. Nest them with dots to group code:

```elixir
defmodule Shop.Cart do
  def total(items), do: ...
end
```

To avoid typing long names, `alias` gives a shortcut:

```elixir
defmodule Shop.Checkout do
  alias Shop.Cart

  def pay(items), do: Cart.total(items)
end
```

`import` brings a module's functions in so you can call them without a prefix (use sparingly), and `require` is needed before using another module's macros.

Short functions go on one line with `, do:`; longer ones use `do ... end`. They mean the same thing.

```quiz
question: "What does  alias Shop.Cart  let you write?"
options:
  - "Cart.total(items)"
  - "total(items)"
  - "Shop.total(items)"
answer: 0
explain: alias shortens the name to its last part. import would let you drop the prefix entirely.
```
