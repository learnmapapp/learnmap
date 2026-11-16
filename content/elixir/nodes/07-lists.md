---
title: Lists
icon: "🔗"
branch: functional
requires: [pattern-matching]
summary: Linked lists, head and tail, and the List module.
---
Lists are written with square brackets, and are linked lists under the hood:

```repl
> list = [1, 2, 3]
[1, 2, 3]
> [0 | list]
[0, 1, 2, 3]
> list ++ [4]
[1, 2, 3, 4]
```

Adding at the front with `|` is instant; `++` has to walk the whole list.

Elixir has no `for (i = 0; …)` loops. Instead, you take the **head** and **recurse** on the **tail**:

```elixir
defmodule MyList do
  def sum([]), do: 0
  def sum([head | tail]), do: head + sum(tail)
end
```

```repl
> MyList.sum([1, 2, 3])
6
```

Two clauses: the empty list, and "one element plus the rest". That shape covers almost every list function.

```compare python
def total(xs): return 0 if not xs else xs[0] + total(xs[1:])
```

```compare javascript
const sum = ([head, ...tail]) =>
  head === undefined ? 0 : head + sum(tail);
```

```compare java
int sum(List<Integer> xs) {
    if (xs.isEmpty()) return 0;
    return xs.getFirst() + sum(xs.subList(1, xs.size()));
}
```

```compare kotlin
fun sum(xs: List<Int>): Int =
    if (xs.isEmpty()) 0 else xs.first() + sum(xs.drop(1))
```

```compare go
// Go would use a for loop; it has no list pattern matching.
```

```exercise
goal: Write `count/1`, which counts the elements of a list.
code: |
  defmodule MyList do
    def count([]), do: 0
  end
checks:
  - match: 'def\s+count\s*\(\s*\[\s*_\w*\s*\|\s*\w+\s*\]\s*\)'
    message: 'Add a second clause matching [_ | tail].'
  - match: '1\s*\+\s*count\s*\(\s*\w+\s*\)|count\s*\(\s*\w+\s*\)\s*\+\s*1'
    message: The count is 1 plus the count of the tail.
output: MyList.count([:a, :b, :c]) == 3
```

## Useful list functions

Lists come with a toolbox in `List`, and of course `Enum`:

```repl
> List.first([1, 2, 3])
1
> List.last([1, 2, 3])
3
> List.flatten([1, [2, [3]]])
[1, 2, 3]
> Enum.reverse([1, 2, 3])
[3, 2, 1]
> length([1, 2, 3])
3
```

Because lists are linked, some things are cheap and some are not:

| Fast | Slow (walks the list) |
| --- | --- |
| add to the front `[x \| list]` | append `list ++ [x]` |
| head and tail | `length/1`, `Enum.at/2` |

A common trick: build a list backwards by prepending, then call `Enum.reverse/1` once at the end.

For more on writing your own list functions, see [Recursion](node:recursion).

```quiz
question: Which is the fastest way to add an element to a list?
options:
  - "`list ++ [x]`"
  - "`[x | list]`"
  - "`List.insert_at(list, -1, x)`"
answer: 1
explain: Prepending just makes a new node pointing at the old list. Appending has to copy the whole thing.
```
