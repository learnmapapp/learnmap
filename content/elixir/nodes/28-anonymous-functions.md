---
title: Anonymous functions
icon: "🎭"
branch: functional
requires: [modules]
summary: "fn ... end, and calling with a dot."
---
An [[anonymous function]] is a function without a name, a value you can pass around:

```repl
> add = fn a, b -> a + b end
#Function<...>
> add.(2, 3)
5
```

Note the **dot** in `add.(2, 3)`. It tells Elixir "call the function stored in this variable", as opposed to a named function `add(2, 3)`.

You'll mostly hand them to other functions:

```elixir
Enum.map([1, 2, 3], fn x -> x * 10 end)
# [10, 20, 30]

Enum.filter(users, fn user -> user.admin end)
```

Anonymous functions are **closures**: they remember variables from where they were created.

```elixir
bonus = 5
add_bonus = fn score -> score + bonus end
add_bonus.(10) # 15
```

They can have several clauses, just like named functions:

```elixir
handle = fn
  {:ok, value} -> "Got #{value}"
  {:error, reason} -> "Oops: #{reason}"
end
```

```compare javascript
const add = (a, b) => a + b;
add(2, 3);
```

```compare python
add = lambda a, b: a + b
add(2, 3)
```

```compare java
BinaryOperator<Integer> add = (a, b) -> a + b;
add.apply(2, 3);
```

```compare kotlin
val add = { a: Int, b: Int -> a + b }
add(2, 3)
```

```compare go
add := func(a, b int) int { return a + b }
add(2, 3)
```

```exercise
goal: Call the anonymous function correctly.
code: |
  double = fn x -> x * 2 end
  double(21)
checks:
  - match: 'double\.\(\s*21\s*\)'
    message: Anonymous functions need a dot when called, like double.(21)
output: "42"
```
