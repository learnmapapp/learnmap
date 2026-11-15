---
title: case
icon: "🔀"
branch: control
requires: [pattern-matching]
summary: Match one value against several patterns.
---
`case` takes a value and tries each pattern from top to bottom. The first one that matches wins:

```elixir
case File.read("hello.txt") do
  {:ok, text} -> "Got #{String.length(text)} characters"
  {:error, :enoent} -> "No such file"
  {:error, reason} -> "Failed: #{reason}"
end
```

This is the everyday way to handle `{:ok, value}` and `{:error, reason}` results.

Use `_` as a catch-all at the end:

```elixir
case status do
  200 -> :ok
  404 -> :not_found
  _ -> :other
end
```

If nothing matches, you get a `CaseClauseError`. That's on purpose: Elixir prefers a loud crash over silently doing the wrong thing.

Patterns can bind variables, and the **pin operator** `^` compares against an existing variable instead of rebinding it:

```elixir
expected = 42
case answer do
  ^expected -> "Correct!"
  other -> "Nope, #{other}"
end
```

Like everything in Elixir, `case` is an expression: it returns a value you can bind.

```compare python
match result:
    case ("ok", text): ...
    case ("error", reason): ...
    case _: ...
```

```compare javascript
switch (status) {
  case 200: return "ok";
  default: return "other";
}
```

```compare java
return switch (status) {
  case 200 -> "ok";
  default -> "other";
};
```

```compare kotlin
when (status) {
  200 -> "ok"
  else -> "other"
}
```

```compare go
switch status {
case 200: return "ok"
default: return "other"
}
```

```exercise
goal: Add a catch-all clause that returns :unknown.
code: |
  case color do
    :red -> "stop"
    :green -> "go"
  end
checks:
  - match: '_\s*->\s*:unknown'
    message: 'Add a last clause:  _ -> :unknown'
output: ":unknown"
```
