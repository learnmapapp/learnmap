---
title: if, unless and cond
icon: "🚦"
branch: control
requires: [booleans]
summary: Simple branches, and cond for chains of conditions.
---
`if` works as you'd expect, and returns a value:

```elixir
label = if score >= 50, do: "pass", else: "fail"

if admin? do
  "Welcome back, boss"
else
  "Welcome"
end
```

Without an `else`, a false `if` returns `nil`. There's also `unless`, which is `if not`.

For a chain of conditions, use `cond`. It runs the first branch whose condition is truthy:

```elixir
cond do
  temp < 0 -> "freezing"
  temp < 15 -> "chilly"
  temp < 25 -> "nice"
  true -> "hot"
end
```

The final `true ->` is the "else" branch. Without it, and with no match, `cond` raises an error.

When should you use which?

- **`if`**: one condition.
- **`cond`**: several conditions that aren't about the shape of a value.
- **`case`**: matching a value against patterns.

Elixir has no `else if`. Reach for `cond` instead.

```compare python
if temp < 0: label = "freezing"
elif temp < 15: label = "chilly"
else: label = "hot"
```

```compare javascript
const label = temp < 0 ? "freezing" : temp < 15 ? "chilly" : "hot";
```

```compare java
String label = temp < 0 ? "freezing" : temp < 15 ? "chilly" : "hot";
```

```compare kotlin
val label = when {
  temp < 0 -> "freezing"
  temp < 15 -> "chilly"
  else -> "hot"
}
```

```compare go
switch {
case temp < 0: label = "freezing"
default: label = "hot"
}
```

```exercise
goal: Give the cond a fallback branch that returns "hot".
code: |
  cond do
    temp < 0 -> "freezing"
    temp < 15 -> "chilly"
  end
checks:
  - match: 'true\s*->\s*"hot"'
    message: 'Add  true -> "hot"  as the last branch.'
output: '"hot"'
```
