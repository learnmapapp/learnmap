---
title: Doctests
icon: "📝"
branch: tooling
requires: [exunit, module-attributes]
summary: Examples in your docs that are run as tests.
---
Remember the `iex>` examples in `@doc`? ExUnit can run them, so your documentation can never go stale.

```elixir title=lib/temperature.ex
defmodule Temperature do
  @doc """
  Converts Celsius to Fahrenheit.

  ## Examples

      iex> Temperature.to_f(0)
      32.0

      iex> Temperature.to_f(100)
      212.0
  """
  def to_f(c), do: c * 9 / 5 + 32
end
```

Switch them on in a test file:

```elixir title=test/temperature_test.exs
defmodule TemperatureTest do
  use ExUnit.Case, async: true
  doctest Temperature
end
```

Each `iex>` line is run, and the result must equal the next line. Change `to_f` and break the math, and `mix test` tells you which docs are now wrong.

The rules:

- Indent examples by four spaces (it's markdown code).
- `iex>` starts an expression; `...>` continues it on the next line.
- A blank line separates examples.

```tip
Doctests are best for small, pure functions. Anything with setup, processes or randomness belongs in regular tests.
```

```compare python
def to_f(c):
    """
    >>> to_f(0)
    32.0
    """
```

```compare rust
/// ```
/// assert_eq!(to_f(0.0), 32.0);
/// ```
```

```compare go
func ExampleToF() { fmt.Println(ToF(0)) // Output: 32 }
```

```compare java
// No built-in doctests; examples in Javadoc aren't run.
```

```compare kotlin
// KDoc @sample points to a function, but it isn't asserted.
```

```compare javascript
// No built-in doctests; libraries like doctest-js exist.
```

```exercise
goal: Turn on doctests for the Temperature module.
code: |
  defmodule TemperatureTest do
    use ExUnit.Case, async: true
  end
checks:
  - match: 'doctest\s+Temperature'
    message: 'Add  doctest Temperature  inside the test module.'
output: "2 doctests, 0 failures"
```
