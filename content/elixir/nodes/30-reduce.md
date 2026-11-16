---
title: Reduce
icon: "🧮"
branch: functional
requires: [enum, anonymous-functions]
summary: Fold a collection into one value.
---
`Enum.reduce/3` walks a collection and carries an **accumulator** along. It's the swiss army knife of `Enum`: map, filter, sum and count can all be written with it.

```elixir
Enum.reduce([1, 2, 3, 4], 0, fn x, acc -> x + acc end)
# 10
```

Step by step: `acc` starts at `0`, then becomes `1`, `3`, `6`, `10`.

The accumulator can be anything. Here it's a map, counting words:

```elixir
words
|> Enum.reduce(%{}, fn word, counts ->
  Map.update(counts, word, 1, &(&1 + 1))
end)
# %{"cat" => 2, "dog" => 1}
```

(That one is common enough to have its own function: `Enum.frequencies/1`.)

Before reaching for `reduce`, check for a dedicated function. They're clearer:

| Instead of reduce for… | Use |
| --- | --- |
| a total | `Enum.sum/1` |
| a count | `Enum.count/2` |
| the biggest | `Enum.max_by/2` |
| grouping | `Enum.group_by/2` |
| a map | `Map.new/2` or `Enum.into/2` |

```compare javascript
[1, 2, 3, 4].reduce((acc, x) => acc + x, 0);
```

```compare python
functools.reduce(lambda acc, x: acc + x, [1, 2, 3, 4], 0)
```

```compare java
Stream.of(1, 2, 3, 4).reduce(0, Integer::sum);
```

```compare kotlin
listOf(1, 2, 3, 4).fold(0) { acc, x -> acc + x }
```

```compare go
acc := 0
for _, x := range xs { acc += x }
```

```exercise
goal: Use `Enum.reduce` to multiply all numbers together (start at 1).
code: |
  Enum.reduce([2, 3, 4], 0, fn x, acc -> x + acc end)
checks:
  - match: Enum\.reduce\(\s*\[2,\s*3,\s*4\]\s*,\s*1\s*,
    message: The starting value for a product is 1.
  - match: fn\s+(\w+)\s*,\s*(\w+)\s*->\s*(\1\s*\*\s*\2|\2\s*\*\s*\1)\s+end
    message: Multiply x by acc.
output: "24"
```
