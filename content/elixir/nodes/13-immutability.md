---
title: Immutable data
icon: "🧊"
branch: basics
requires: [basic-types]
summary: Nothing changes in place; you get new values instead.
---
In Elixir, data is [[immutable]]. No function can change a value. Functions return **new** values:

```repl
> list = [1, 2, 3]
[1, 2, 3]
> List.delete(list, 2)
[1, 3]
> list
[1, 2, 3]
```

The original list is untouched. To "keep" the change, bind the result:

```elixir
list = List.delete(list, 2)
```

Wait, isn't that changing `list`? No: it **rebinds** the name to a new value. The old value still exists for anyone else holding it. Names can move; values can't.

Why bother?

- **No surprises**: pass a map to a function, and you know it comes back unchanged.
- **Safe concurrency**: processes can't step on each other's data.
- **Cheap copies**: new versions share most of their structure with the old one, so "copying" a big map to change one key is fast.

Inside a function, rebinding is fine. But note that a block can't rebind a variable for the code outside it:

```elixir
count = 0
if true do
  count = count + 1
end
count # still 0, and the compiler warns you
```

Instead, use the value the `if` returns: `count = if true, do: count + 1, else: count`.

```compare javascript
const next = [...list, 4]; // new array, the old one stays
```

```compare python
new = list + [4]  # a new list; list.append(4) would mutate
```

```compare java
List<Integer> next =
    Stream.concat(list.stream(), Stream.of(4)).toList();
```

```compare kotlin
val next = list + 4 // read-only lists return new ones
```

```compare go
next := append(slices.Clone(list), 4)
```

```quiz
question: "After  `m = %{a: 1};`  `Map.put(m, :b, 2)`;  what is m?"
options:
  - "`%{a: 1, b: 2}`"
  - "`%{a: 1}`"
  - An error
answer: 1
explain: "`Map.put` returns a new map. The result was thrown away, so m is unchanged."
```
