---
title: Guards
icon: "💂"
branch: control
requires: [case, modules]
summary: Extra conditions on a pattern with when.
---
A pattern checks the **shape** of a value. A [[guard]] adds a condition on top, with `when`:

```elixir
case age do
  n when n < 0 -> :invalid
  n when n < 18 -> :minor
  _ -> :adult
end
```

Guards work on function heads too:

```elixir
def describe(x) when is_integer(x), do: "an integer"
def describe(x) when is_binary(x), do: "a string"
def describe(x) when is_list(x) and length(x) > 0,
  do: "a non-empty list"
```

Only a limited set of things is allowed in a guard: comparisons, `and`/`or`/`not`, arithmetic, type checks like `is_atom/1`, `is_map/1`, `is_nil/1`, and a few others like `length/1`, `map_size/1` and `x in [1, 2, 3]`. No calls to your own functions; that keeps guards fast and side-effect free.

If a guard raises an error, it just counts as "doesn't match". So `when hd(list) == 1` safely skips an empty list.

You can name a guard to reuse it:

```elixir
defguard is_even(n) when is_integer(n) and rem(n, 2) == 0
```

```compare python
match age:
    case n if n < 18: ...
```

```compare javascript
// No guards; use if inside the function.
```

```compare java
switch (obj) {
  case Integer n when n < 18 -> "minor";
  default -> "adult";
}
```

```compare kotlin
when {
  age < 18 -> "minor"
  else -> "adult"
}
```

```compare go
// No guards; use if inside the function.
```

```exercise
goal: Only accept positive numbers in this clause by adding a guard.
code: |
  def sqrt_safe(x), do: :math.sqrt(x)
checks:
  - match: 'def\s+sqrt_safe\(\s*x\s*\)\s+when\s+x\s*(>\s*0|>=\s*0)'
    message: 'Add  when x > 0  after the arguments.'
output: "2.0"
```
