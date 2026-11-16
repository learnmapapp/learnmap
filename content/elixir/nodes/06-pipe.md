---
title: The pipe
icon: "🚰"
branch: functional
requires: [modules]
summary: "|> turns nested calls into a readable list of steps."
---
Nested calls read inside-out:

```elixir
String.split(String.upcase(String.trim("  hello drop  ")))
```

The [[pipe operator]] `|>` passes the value on its left as the **first argument** of the call on its right. Same code, read top to bottom:

```elixir
"  hello drop  "
|> String.trim()
|> String.upcase()
|> String.split()
```

```repl
> "  hello drop  " |> String.trim() |> String.upcase()
...>   |> String.split()
["HELLO", "DROP"]
```

This is why Elixir functions take "the thing you're working on" as their first argument.

```compare javascript
"  hello drop  ".trim().toUpperCase().split(" ")
```

```compare python
"  hello drop  ".strip().upper().split()
```

```compare java
"  hello drop  ".strip().toUpperCase().split(" ")
```

```compare kotlin
"  hello drop  ".trim().uppercase().split(" ")
```

```compare go
strings.Fields(strings.ToUpper(strings.TrimSpace("  hello drop  ")))
```

```exercise
goal: Rewrite the nested call as a pipeline.
code: |
  String.reverse(String.downcase("DROP"))
checks:
  - match: '"DROP"\s*\|>\s*String\.downcase\(\)\s*\|>\s*String\.reverse\(\)'
    message: Start with "DROP", then pipe into String.downcase(), then String.reverse().
output: '"pord"'
```

## Pipes and the first argument

The pipe always fills in the **first** argument. That's why Elixir's standard library is consistent about it: the data being worked on always comes first.

```elixir
"  Hello World  "
|> String.trim()
|> String.downcase()
|> String.split(" ")
|> Enum.map(&String.capitalize/1)
|> Enum.join("-")
# "Hello-World"
```

Need to peek in the middle of a pipeline? `IO.inspect/2` prints a value and returns it unchanged:

```elixir
data
|> parse()
|> IO.inspect(label: "parsed")
|> save()
```

`then/2` lets you pipe into a function where the value isn't the first argument: `|> then(&Map.put(acc, :data, &1))`.

```quiz
question: What does  `|> IO.inspect()`  return in the middle of a pipeline?
options:
  - :ok
  - The same value it received, after printing it.
  - "`nil`"
answer: 1
explain: "`IO.inspect` returns its argument, so you can drop it anywhere in a pipeline for debugging."
```
