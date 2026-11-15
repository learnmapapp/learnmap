---
title: Protocols
icon: "🔌"
branch: data
requires: [structs]
summary: One function, a different implementation per data type.
---
A [[protocol]] lets a function work on many types, with a separate implementation for each. It's Elixir's way of doing polymorphism.

You've used one already: string interpolation calls the `String.Chars` protocol.

```repl
> "#{:atom} #{42}"
"atom 42"
> "#{%User{name: "Drop"}}"
error: ** (Protocol.UndefinedError) protocol String.Chars not implemented for %User{...}
```

Teach it your struct with `defimpl`:

```elixir
defimpl String.Chars, for: User do
  def to_string(user), do: "@" <> user.name
end
```

```repl
> "Hello #{%User{name: "Drop"}}"
"Hello @Drop"
```

Defining your own protocol:

```elixir
defprotocol Area do
  def area(shape)
end

defimpl Area, for: Square do
  def area(%{side: s}), do: s * s
end

defimpl Area, for: Circle do
  def area(%{r: r}), do: 3.14159 * r * r
end
```

Now `Area.area/1` works on both, and anyone can add an implementation for their own struct later, without touching your code.

Useful built-in protocols: `Enumerable` (makes `Enum` work), `Inspect` (how it prints in IEx), `Jason.Encoder` (JSON, from the Jason library).

```compare java
interface Area { double area(); }
record Square(double side) implements Area { ... }
```

```compare kotlin
interface Area { fun area(): Double }
```

```compare rust
trait Area { fn area(&self) -> f64; }
impl Area for Square { ... }
```

```compare python
@functools.singledispatch
def area(shape): ...
@area.register
def _(s: Square): ...
```

```compare javascript
class Square { area() { return this.side ** 2; } }
```

```compare go
type Area interface { Area() float64 }
```

```exercise
goal: Implement String.Chars for Point so it prints as "(x, y)".
code: |
  defimpl String.Chars, for: Point do
  end
checks:
  - match: 'def\s+to_string\('
    message: 'The protocol needs a  def to_string(point)  function.'
  - match: '"\(#\{[^}]*x\}\s*,\s*#\{[^}]*y\}\)"'
    message: 'Return a string like "(#{p.x}, #{p.y})"'
output: '"(1, 2)"'
```
