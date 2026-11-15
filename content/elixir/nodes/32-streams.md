---
title: Streams
icon: "🏞️"
branch: functional
requires: [enum, pipe]
summary: Lazy pipelines that only do work when asked.
---
Every `Enum` function walks the whole collection and builds a new list straight away. A pipeline of five `Enum` calls makes five lists.

A [[stream]] is **lazy**: it describes the work, and does it one element at a time, only when you ask for results:

```elixir
1..1_000_000
|> Stream.map(&(&1 * 3))
|> Stream.filter(&(rem(&1, 2) == 0))
|> Enum.take(3)
# [6, 12, 18]
```

Only six numbers were ever looked at. The `Stream` part builds a recipe; the final `Enum` call runs it.

Streams can even be **infinite**:

```elixir
Stream.iterate(1, &(&1 * 2)) |> Enum.take(5)
# [1, 2, 4, 8, 16]

Stream.cycle([:red, :green]) |> Enum.take(3)
# [:red, :green, :red]
```

They're perfect for big files, read line by line without loading everything into memory:

```elixir
File.stream!("huge.log")
|> Stream.filter(&String.contains?(&1, "ERROR"))
|> Enum.count()
```

For small lists, plain `Enum` is simpler and often faster. Use streams for large, infinite or slow sources.

```compare python
itertools.islice((x * 3 for x in itertools.count(1)), 3)  # generators
```

```compare javascript
// Iterator helpers: naturals().map(x => x * 3).take(3)
```

```compare java
Stream.iterate(1, x -> x + 1).map(x -> x * 3).limit(3).toList();
```

```compare kotlin
generateSequence(1) { it + 1 }.map { it * 3 }.take(3).toList()
```

```compare rust
(1..).map(|x| x * 3).take(3).collect::<Vec<_>>();
```

```compare go
// Channels or iter.Seq for lazy sequences.
```

```exercise
goal: Make the first step lazy so it doesn't triple a million numbers.
code: |
  1..1_000_000
  |> Enum.map(&(&1 * 3))
  |> Enum.take(5)
checks:
  - match: '\|>\s*Stream\.map\('
    message: Swap Enum.map for Stream.map.
  - match: '\|>\s*Enum\.take\(\s*5\s*\)'
    message: Keep Enum.take(5) at the end to run the stream.
output: "[3, 6, 9, 12, 15]"
```
