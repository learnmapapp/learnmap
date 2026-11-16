---
title: Comprehensions
icon: "🌀"
branch: functional
requires: [enum]
summary: "for x <- list, filters and into:."
---
`for` in Elixir isn't a loop; it's a **comprehension** that builds a new collection:

```repl
> for x <- [1, 2, 3], do: x * x
[1, 4, 9]
```

Add filters after the generator:

```repl
> for x <- 1..10, rem(x, 2) == 0, do: x
[2, 4, 6, 8, 10]
```

Several generators give every combination:

```repl
> for suit <- [:hearts, :spades], rank <- [:ace, :king],
...>   do: {rank, suit}
[{:ace, :hearts}, {:king, :hearts}, {:ace, :spades},
 {:king, :spades}]
```

Generators pattern match, and **skip** elements that don't match. Great for picking out results:

```elixir
for {:ok, value} <- results, do: value
```

Collect into something other than a list with `into:`:

```repl
> for {k, v} <- %{a: 1, b: 2}, into: %{}, do: {k, v * 100}
%{a: 100, b: 200}
```

```compare python
[x * x for x in [1, 2, 3]]
[x for x in range(1, 11) if x % 2 == 0]
```

```compare javascript
[1, 2, 3].map((x) => x * x);
```

```compare java
IntStream.rangeClosed(1, 10).filter(x -> x % 2 == 0).boxed().toList();
```

```compare kotlin
(1..10).filter { it % 2 == 0 }
```

```compare go
for _, x := range xs { out = append(out, x*x) }
```

```exercise
goal: Keep only the words longer than 3 characters, upcased.
code: |
  for w <- words, do: String.upcase(w)
checks:
  - match: 'for\s+w\s*<-\s*words\s*,\s*String\.length\(\s*w\s*\)\s*>\s*3\s*,\s*do:'
    message: 'Add a filter after the generator:  String.length(w) > 3'
output: '["ELIXIR", "ROCKS"]'
```
