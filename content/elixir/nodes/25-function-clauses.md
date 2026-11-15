---
title: Multi-clause functions
icon: "🧩"
branch: control
requires: [modules, guards]
summary: One function, several heads, picked by pattern matching.
---
A function can have several **clauses**. Elixir picks the first one whose pattern (and guard) matches the arguments:

```elixir
defmodule Shape do
  def area({:square, side}), do: side * side
  def area({:rect, w, h}), do: w * h
  def area({:circle, r}), do: 3.14159 * r * r
end
```

```repl
> Shape.area({:rect, 2, 5})
10
> Shape.area({:triangle, 3})
error: ** (FunctionClauseError) no function clause matching in Shape.area/1
```

Instead of one function with a big `if`/`switch` inside, you write one small clause per case. Each clause reads like a rule.

The order matters: specific clauses first, general ones last.

```elixir
def greet("admin"), do: "Hello, boss"
def greet(name), do: "Hello, #{name}"
```

All clauses of a function must sit next to each other, with the same name and [[arity]]. `greet/1` and `greet/2` are two different functions.

Combine patterns and guards for very readable logic:

```elixir
def fizzbuzz(n) when rem(n, 15) == 0, do: "FizzBuzz"
def fizzbuzz(n) when rem(n, 3) == 0, do: "Fizz"
def fizzbuzz(n) when rem(n, 5) == 0, do: "Buzz"
def fizzbuzz(n), do: n
```

```compare python
@functools.singledispatch
def area(shape): ...
```

```compare javascript
function area(shape) {
  switch (shape.kind) { case "square": return shape.side ** 2; }
}
```

```compare java
double area(Shape s) {
  return switch (s) {
    case Square q -> q.side() * q.side();
    case Rect r -> r.w() * r.h();
  };
}
```

```compare kotlin
fun area(s: Shape) = when (s) {
  is Square -> s.side * s.side
  is Rect -> s.w * s.h
}
```

```compare go
switch s := shape.(type) {
case Square: return s.Side * s.Side
}
```

```exercise
goal: Add a clause for {:triangle, base, height}.
code: |
  def area({:square, side}), do: side * side
  def area({:rect, w, h}), do: w * h
checks:
  - match: 'def\s+area\(\s*\{\s*:triangle\s*,\s*(\w+)\s*,\s*(\w+)\s*\}\s*\)\s*,\s*do:'
    message: 'Add  def area({:triangle, b, h}), do: ...'
  - match: 'def\s+area\(\s*\{\s*:triangle\s*,\s*(\w+)\s*,\s*(\w+)\s*\}\s*\)\s*,\s*do:\s*(\1\s*\*\s*\2\s*/\s*2|\1\s*\*\s*\2\s*\*\s*0\.5|0\.5\s*\*\s*\1\s*\*\s*\2)'
    message: The area is base * height / 2.
output: "6.0"
```
