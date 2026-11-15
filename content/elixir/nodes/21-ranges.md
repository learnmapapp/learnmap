---
title: Ranges
icon: "📏"
branch: data
requires: [enum]
summary: 1..10, steps, and lazy sequences of numbers.
---
A range is written `first..last`, and includes both ends:

```repl
> Enum.to_list(1..5)
[1, 2, 3, 4, 5]
> Enum.sum(1..100)
5050
> 3 in 1..5
true
```

Ranges don't store every number, just the start, end and step, so `1..1_000_000_000` costs nothing until you walk through it.

Add a step with `//`:

```repl
> Enum.to_list(0..10//2)
[0, 2, 4, 6, 8, 10]
> Enum.to_list(5..1//-1)
[5, 4, 3, 2, 1]
```

They're perfect for repeating something a number of times:

```elixir
for i <- 1..3 do
  IO.puts("round #{i}")
end

Enum.each(1..3, fn _ -> IO.puts("hip hip hooray") end)
```

And for slicing: `Enum.slice(list, 1..3)` or `String.slice("elixir", 0..2)` gives `"eli"`.

```compare python
list(range(1, 6))   # end excluded
sum(range(1, 101))
```

```compare javascript
Array.from({ length: 5 }, (_, i) => i + 1);
```

```compare java
IntStream.rangeClosed(1, 5).sum();
```

```compare kotlin
(1..5).toList()
(0..10 step 2).toList()
```

```compare go
for i := 1; i <= 5; i++ { }
```

```exercise
goal: Sum the odd numbers from 1 to 99 with a stepped range.
code: |
  Enum.sum(1..99)
checks:
  - match: 'Enum\.sum\(\s*1\s*\.\.\s*99\s*//\s*2\s*\)'
    message: Add a step of 2 with //, like 1..99//2
output: "2500"
```
