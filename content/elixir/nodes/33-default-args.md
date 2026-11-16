---
title: Default arguments
icon: "🎚️"
branch: functional
requires: [modules]
summary: "\\\\ for defaults, and private functions with defp."
---
Give an argument a default value with `\\`:

```elixir
defmodule Greeter do
  def hello(name, greeting \\ "Hello") do
    "#{greeting}, #{name}!"
  end
end
```

```repl
> Greeter.hello("Drop")
"Hello, Drop!"
> Greeter.hello("Drop", "Howdy")
"Howdy, Drop!"
```

Behind the scenes this defines **two** functions: `hello/1` and `hello/2`.

If a function with defaults also has several clauses, declare the defaults once in a bodiless head:

```elixir
def join(a, b, sep \\ " ")
def join(a, nil, _sep), do: a
def join(a, b, sep), do: a <> sep <> b
```

### Private functions

`defp` defines a function that only the module itself can call. Use it for helpers:

```elixir
defmodule Price do
  def total(items), do: items |> Enum.map(&line/1) |> Enum.sum()

  defp line(%{price: p, qty: q}), do: p * q
end
```

`Price.line(...)` from outside fails with `UndefinedFunctionError`. Keep your module's public surface small.

```compare python
def hello(name, greeting="Hello"): ...
def _helper(): ...  # private by convention
```

```compare javascript
function hello(name, greeting = "Hello") {}
```

```compare java
// No default args: overload hello(name) to call hello(name, "Hello").
private int line(Item i) { ... }
```

```compare kotlin
fun hello(name: String, greeting: String = "Hello") =
    "$greeting, $name!"
private fun line(i: Item) = i.price * i.qty
```

```compare go
// No default args; lowercase names are package-private.
```

```exercise
goal: Give the separator a default of ", ".
code: |
  def join_all(list, sep) do
    Enum.join(list, sep)
  end
checks:
  - match: 'def\s+join_all\(\s*list\s*,\s*sep\s*\\\\\s*", "\s*\)'
    message: 'Write  sep \\ ", "  in the argument list.'
output: '"a, b, c"'
```
