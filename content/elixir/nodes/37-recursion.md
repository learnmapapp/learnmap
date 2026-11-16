---
title: Recursion
icon: "🐚"
branch: functional
requires: [lists, function-clauses]
summary: Loops without loops, using head and tail.
---
Elixir has no `while` loop. When `Enum` doesn't fit, you **recurse**: a function calls itself on a smaller problem.

Lists split into a head and a tail, which is made for this:

```elixir
defmodule MyList do
  def sum([]), do: 0
  def sum([head | tail]), do: head + sum(tail)
end
```

Two clauses: the **base case** (empty list) and the **recursive case** (first element plus the sum of the rest).

```text
sum([1, 2, 3])
= 1 + sum([2, 3])
= 1 + 2 + sum([3])
= 1 + 2 + 3 + sum([])
= 6
```

For very long lists, pass an accumulator so the recursive call is the **last** thing the function does. The BEAM then reuses the stack frame, so it never overflows (tail-call optimisation):

```elixir
def sum(list), do: sum(list, 0)
defp sum([], acc), do: acc
defp sum([h | t], acc), do: sum(t, acc + h)
```

A process's main loop is exactly this: a function that waits for a message, handles it, and calls itself with the new state. You'll see that in [Send and receive](node:send-receive).

```compare python
def total(xs):
    return 0 if not xs else xs[0] + total(xs[1:])
```

```compare javascript
const sum = ([h, ...t]) => (h === undefined ? 0 : h + sum(t));
```

```compare java
int sum(List<Integer> xs) {
  return xs.isEmpty() ? 0 : xs.get(0) + sum(xs.subList(1, xs.size()));
}
```

```compare kotlin
tailrec fun sum(xs: List<Int>, acc: Int = 0): Int =
  if (xs.isEmpty()) acc else sum(xs.drop(1), acc + xs[0])
```

```compare go
func sum(xs []int) int {
    if len(xs) == 0 {
        return 0
    }
    return xs[0] + sum(xs[1:])
}
```

```exercise
goal: Add the base case so `len([])` returns 0.
code: |
  def len([_ | tail]), do: 1 + len(tail)
checks:
  - match: def\s+len\(\s*\[\s*\]\s*\)\s*,\s*do:\s*0
    message: "Add  def len([]), do: 0"
output: "3"
```
