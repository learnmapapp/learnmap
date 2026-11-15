---
title: MapSet
icon: "🫧"
branch: data
requires: [enum]
summary: Unique values, fast membership checks.
---
A `MapSet` holds unique values, in no particular order:

```repl
> tags = MapSet.new(["elixir", "beam", "elixir"])
MapSet.new(["beam", "elixir"])
> MapSet.member?(tags, "beam")
true
> MapSet.put(tags, "otp")
MapSet.new(["beam", "elixir", "otp"])
```

Checking membership is fast even for huge sets, unlike `Enum.member?` on a list, which walks every element.

Set math:

```repl
> a = MapSet.new([1, 2, 3])
> b = MapSet.new([2, 3, 4])
> MapSet.union(a, b)
MapSet.new([1, 2, 3, 4])
> MapSet.intersection(a, b)
MapSet.new([2, 3])
> MapSet.difference(a, b)
MapSet.new([1])
```

MapSets are enumerable, so every `Enum` function works on them, and you can pipe straight into one with `Enum.into/2` or `MapSet.new/1`.

Just want to remove duplicates from a list and keep the order? That's `Enum.uniq/1`:

```repl
> Enum.uniq([3, 1, 3, 2, 1])
[3, 1, 2]
```

```compare python
tags = {"elixir", "beam"}
"beam" in tags
```

```compare javascript
const tags = new Set(["elixir", "beam"]);
tags.has("beam");
```

```compare java
Set<String> tags = Set.of("elixir", "beam");
tags.contains("beam");
```

```compare kotlin
val tags = setOf("elixir", "beam")
"beam" in tags
```

```compare go
tags := map[string]bool{"elixir": true, "beam": true}
```

```exercise
goal: Find the users who are in both groups.
code: |
  admins = MapSet.new(["ann", "bo"])
  editors = MapSet.new(["bo", "cy"])
  both = MapSet.union(admins, editors)
checks:
  - match: 'MapSet\.intersection\(\s*admins\s*,\s*editors\s*\)'
    message: Union gives everyone. You want MapSet.intersection.
output: 'MapSet.new(["bo"])'
```
