---
title: Typespecs
icon: "🔍"
branch: tooling
requires: [module-attributes]
summary: "@spec and @type, checked by Dialyzer and the compiler."
---
Elixir is dynamically typed, but you can describe your functions' types with `@spec`:

```elixir
@spec area(number(), number()) :: number()
def area(w, h), do: w * h

@spec find_user(integer()) :: {:ok, User.t()} | {:error, :not_found}
def find_user(id), do: ...
```

Define your own types with `@type`:

```elixir
defmodule User do
  @type role :: :admin | :member | :guest
  @type t :: %__MODULE__{name: String.t(), role: role()}

  defstruct [:name, role: :guest]
end
```

The convention is that a struct's module defines its type as `t`, so others write `User.t()`.

Specs are documentation first: they show up in `h` and on hexdocs. Tools use them too:

- **Dialyzer** (via the `dialyxir` package, `mix dialyzer`) finds calls that can never succeed.
- **The compiler** itself is gaining a gradual type system, and already warns about many type mistakes without any specs.

Common built-in types: `integer()`, `float()`, `number()`, `boolean()`, `atom()`, `String.t()`, `list(t)`, `map()`, `keyword()`, `pid()`, `term()` (anything).

```compare python
def area(w: float, h: float) -> float: ...
```

```compare javascript
// TypeScript: function area(w: number, h: number): number
```

```compare java
double area(double w, double h) { return w * h; }
```

```compare kotlin
fun area(w: Double, h: Double): Double = w * h
```

```compare go
func area(w, h float64) float64 { return w * h }
```

```compare rust
fn area(w: f64, h: f64) -> f64 { w * h }
```

```exercise
goal: Add a spec saying greet takes a String.t() and returns a String.t().
code: |
  def greet(name), do: "Hi " <> name
checks:
  - match: '@spec\s+greet\(\s*String\.t\(\)\s*\)\s*::\s*String\.t\(\)'
    message: 'Above the def:  @spec greet(String.t()) :: String.t()'
output: '"Hi Drop"'
```
