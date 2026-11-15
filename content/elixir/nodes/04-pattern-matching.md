---
title: Pattern matching
icon: "🧩"
kind: hub
branch: functional
requires: [basic-types]
summary: "= doesn't assign. It matches."
---
In Elixir, `=` is the [[match operator]]. It makes the left side match the right side, binding variables along the way:

```repl
> x = 1
1
> 1 = x
1
> 2 = x
error: ** (MatchError) no match of right hand side value: 1
```

That gets powerful with bigger shapes. This is [[pattern matching]]: grab the pieces you want in one step:

```repl
> {:ok, content} = {:ok, "Hello!"}
{:ok, "Hello!"}
> content
"Hello!"
> [first | rest] = [1, 2, 3]
[1, 2, 3]
> rest
[2, 3]
```

`case` tries several patterns, top to bottom:

```elixir
case File.read("hello.txt") do
  {:ok, content} -> "Got #{String.length(content)} bytes"
  {:error, reason} -> "Failed: #{reason}"
end
```

```compare python
match result:
    case ("ok", content): ...
    case ("error", reason): ...
```

```compare javascript
const [first, ...rest] = [1, 2, 3];  // destructuring, but no failing match
```

```compare kotlin
val (status, content) = Pair("ok", "Hello!")
```

```compare java
if (result instanceof Ok(var content)) { /* ... */ }
```

```compare go
// Go has no destructuring or pattern matching.
```

```exercise
goal: Pull the name out of the tuple into a variable called `name`.
code: |
  {:user, "Ada", 36}
checks:
  - match: '\{\s*:user\s*,\s*name\s*,\s*(_\w*|age)\s*\}\s*=\s*\{\s*:user\s*,\s*"Ada"\s*,\s*36\s*\}'
    message: Write the same shape on the left of =, with name where "Ada" is. Use _ for the parts you don't need.
output: '"Ada"'
hint: '{:user, name, _} = {:user, "Ada", 36}'
```

## The pin and the underscore

Two small tools make patterns more precise.

**`_` matches anything** and throws it away. Use it for the parts you don't need:

```elixir
{_, second, _} = {1, 2, 3}
second # 2
```

You can also name it, like `_reason`, to document what's being ignored.

**`^` pins a variable**: instead of rebinding it, the pattern compares against its current value.

```repl
> x = 1
1
> ^x = 1
1
> ^x = 2
error: ** (MatchError) no match of right hand side value: 2
```

Patterns show up everywhere, not just with `=`: in function heads, [case](node:case), `with`, `for` and `receive`. Getting comfortable with them is the single best investment in Elixir.

```quiz
question: "After  x = 5,  what does  {^x, y} = {5, 6}  do?"
options:
  - Rebinds x to 5 and y to 6.
  - Checks the first element equals 5, and binds y to 6.
  - Raises a MatchError.
answer: 1
explain: The pin compares against the current value of x instead of rebinding it.
```
