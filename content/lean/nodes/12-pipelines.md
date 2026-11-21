---
title: Pipelines
icon: "🚰"
branch: basics
requires: [currying]
summary: Chain steps with |>, <| and dot notation.
---
Nested calls are read inside out, which gets hard to follow:

```lean
#eval List.sum (List.map (· * 2) (List.filter (· > 2) [1, 2, 3, 4]))  -- 14
```

The **pipeline** operator `|>` passes a value into the next function. `x |> f` means `f x`, so you can read from left to right:

```lean title=Pipes.lean
#eval [1, 2, 3, 4]
  |> List.filter (· > 2)
  |> List.map (· * 2)
  |> List.sum
-- 14
```

## Dot notation chains

Even more common is chaining with dot notation, since each result knows its own type:

```lean
#eval [1, 2, 3, 4].filter (· > 2) |>.map (· * 2) |>.sum   -- 14

#eval "  Hello World  ".trimAscii.toString.toLower.splitOn " "  -- ["hello", "world"]
```

`|>.map f` means "take the result so far and call `.map f` on it". It lets you continue a dot chain after an argument.

## The other direction

`<|` goes the other way: `f <| x` means `f x`. It's mainly used to avoid brackets around a long last argument:

```lean
#eval toString <| 6 * 7      -- "42"
#eval String.length <| "a" ++ "bc"  -- 3
```

Without it you'd write `String.length ("a" ++ "bc")`.

```tip
Use whichever reads best. Short chains read well with dots; longer data processing often reads best as a |> pipeline, one step per line.
```

```compare python
sum(x * 2 for x in nums if x > 2)
```

```compare typescript
nums.filter((x) => x > 2).map((x) => x * 2).reduce((a, b) => a + b, 0);
```

```compare kotlin
nums.filter { it > 2 }.map { it * 2 }.sum()
```

```compare rust
nums.iter().filter(|&&x| x > 2).map(|x| x * 2).sum::<u32>()
```

```exercise
goal: "Rewrite the nested call as a pipeline with `|>`: start from `words`, then `List.map String.length`, then `List.sum`."
code: |
  def totalLength (words : List String) : Nat :=
    List.sum (List.map String.length words)
checks:
  - match: 'words\s*\|>\s*List\.map\s+String\.length\s*\|>\s*List\.sum'
    message: "Write words |> List.map String.length |> List.sum"
solution: |
  def totalLength (words : List String) : Nat :=
    words |> List.map String.length |> List.sum
```

```quiz
question: "What does `x |> f |> g` mean?"
options:
  - "`g (f x)`"
  - "`f (g x)`"
  - "`f x g`"
answer: 0
explain: "x goes into f first, and the result goes into g."
```
