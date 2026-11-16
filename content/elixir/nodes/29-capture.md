---
title: The capture operator
icon: "🪝"
branch: functional
requires: [anonymous-functions]
summary: "&String.upcase/1 and &(&1 + 1): short function values."
---
Writing `fn x -> String.upcase(x) end` gets old. The capture operator `&` is a shortcut.

**Capture a named function** with its name and [[arity]]:

```elixir
Enum.map(["a", "b"], &String.upcase/1)
# ["A", "B"]
```

**Make a tiny function** with `&( )`, using `&1`, `&2`… for the arguments:

```elixir
Enum.map([1, 2, 3], &(&1 * 10))
# [10, 20, 30]

Enum.reduce([1, 2, 3], 0, &(&1 + &2))
# 6
```

`&(&1 * 10)` is exactly `fn x -> x * 10 end`.

It also works for building data:

```elixir
Enum.map(names, &{:user, &1})
# [{:user, "ann"}, {:user, "bo"}]
```

```tip
Keep captures short. Once you need `&1` more than once, or nest them, a regular `fn` is easier to read.
```

```compare javascript
names.map((s) => s.toUpperCase());
```

```compare python
list(map(str.upper, names))
```

```compare java
names.stream().map(String::toUpperCase).toList();
```

```compare kotlin
names.map(String::uppercase)
names.map { it * 10 }
```

```compare go
// No shorthand; write func(s string) string { ... }
```

```exercise
goal: Replace the fn with a capture of `String.trim`/1.
code: |
  Enum.map(lines, fn line -> String.trim(line) end)
checks:
  - match: Enum\.map\(\s*lines\s*,\s*&String\.trim/1\s*\)
    message: Use  &String.trim/1
output: '["a", "b"]'
```
