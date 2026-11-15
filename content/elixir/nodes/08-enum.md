---
title: Enum
icon: "🧺"
branch: functional
requires: [lists, pipe]
summary: map, filter, reduce and friends.
---
You'll rarely write recursion by hand, because the `Enum` module already has it all:

```repl
> Enum.map([1, 2, 3], fn x -> x * 2 end)
[2, 4, 6]
> Enum.filter([1, 2, 3, 4], fn x -> rem(x, 2) == 0 end)
[2, 4]
> Enum.sum([1, 2, 3])
6
```

`fn x -> … end` is an anonymous function. There's a shorter capture syntax too, where `&1` is the first argument:

```elixir
Enum.map([1, 2, 3], &(&1 * 2))
```

And because the list comes first, `Enum` pipes beautifully:

```elixir
1..10
|> Enum.filter(&(rem(&1, 2) == 0))
|> Enum.map(&(&1 * &1))
|> Enum.sum()
# 220
```

```compare python
sum(x * x for x in range(1, 11) if x % 2 == 0)
```

```compare javascript
[...Array(10).keys()].map(i => i + 1).filter(x => x % 2 === 0).map(x => x * x).reduce((a, b) => a + b, 0)
```

```compare java
IntStream.rangeClosed(1, 10).filter(x -> x % 2 == 0).map(x -> x * x).sum()
```

```compare kotlin
(1..10).filter { it % 2 == 0 }.map { it * it }.sum()
```

```compare go
total := 0
for x := 1; x <= 10; x++ { if x%2 == 0 { total += x * x } }
```

```exercise
goal: Keep only the words longer than 3 letters.
code: |
  ["elixir", "is", "fun", "and", "fast"]
  |> Enum.map(&String.upcase/1)
checks:
  - match: 'Enum\.filter\('
    message: You need Enum.filter, not Enum.map.
  - match: 'String\.length\(\s*(&1|\w+)\s*\)\s*>\s*3'
    message: The condition is String.length(word) > 3.
output: '["elixir", "fast"]'
```

## More Enum favourites

`Enum` has over 70 functions. These cover most days:

```repl
> Enum.sort_by(users, & &1.age)
[%{name: "Bo", age: 9}, %{name: "Ann", age: 30}]
> Enum.group_by(~w(apple avocado banana), &String.first/1)
%{"a" => ["apple", "avocado"], "b" => ["banana"]}
> Enum.find([3, 8, 12], &(&1 > 5))
8
> Enum.any?([1, 2, 3], &(&1 > 2))
true
> Enum.chunk_every([1, 2, 3, 4, 5], 2)
[[1, 2], [3, 4], [5]]
> Enum.zip([:a, :b], [1, 2])
[a: 1, b: 2]
> Enum.frequencies(~w(cat dog cat))
%{"cat" => 2, "dog" => 1}
```

`Enum` works on anything enumerable: lists, maps, ranges, MapSets and streams. On a map, each element is a `{key, value}` tuple.

```quiz
question: "What does  Enum.find([3, 8, 12], &(&1 > 5))  return?"
options:
  - "[8, 12]"
  - "8"
  - "true"
answer: 1
explain: find returns the first element that matches. filter would return all of them.
```
