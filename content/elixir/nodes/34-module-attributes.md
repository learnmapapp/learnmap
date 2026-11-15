---
title: Module attributes
icon: "🏷️"
branch: functional
requires: [modules]
summary: "@constants, @moduledoc and @doc."
---
Attributes start with `@` and live inside a module. They have three jobs.

**Constants**, evaluated at compile time:

```elixir
defmodule Shop do
  @tax_rate 0.21
  @currencies [:eur, :usd]

  def with_tax(price), do: price * (1 + @tax_rate)
end
```

**Documentation**, which shows up in IEx with `h` and in generated docs:

```elixir
defmodule Shop do
  @moduledoc "Prices, taxes and other money things."

  @doc """
  Adds tax to a price.

      iex> Shop.with_tax(100)
      121.0
  """
  def with_tax(price), do: price * 1.21
end
```

```repl
> h Shop.with_tax
Adds tax to a price.
```

That `iex>` example isn't just decoration: it can be run as a test. See [Doctests](node:doctests).

**Annotations** for the compiler and tools, like `@spec` for types, `@impl` for callbacks and `@deprecated`.

```tip
Attributes are read when the module compiles. Changing `@tax_rate` means recompiling; it's not a runtime setting. For that, use application config.
```

```compare java
private static final double TAX_RATE = 0.21;
/** Adds tax to a price. */
```

```compare kotlin
private const val TAX_RATE = 0.21
/** Adds tax to a price. */
```

```compare python
TAX_RATE = 0.21
def with_tax(price):
    """Adds tax to a price."""
```

```compare javascript
const TAX_RATE = 0.21;
/** Adds tax to a price. */
```

```compare go
const taxRate = 0.21
// WithTax adds tax to a price.
```

```exercise
goal: Move the magic number 3 into a @max_retries attribute and use it.
code: |
  defmodule Client do
    def retries, do: 3
  end
checks:
  - match: '@max_retries\s+3'
    message: 'Define  @max_retries 3  in the module.'
  - match: 'def\s+retries,\s*do:\s*@max_retries'
    message: Return @max_retries from the function.
output: "3"
```
