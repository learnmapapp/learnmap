---
title: Strings
icon: "🔤"
branch: basics
requires: [iex]
summary: "Double quotes, #{} interpolation, <> and the String module."
---
Strings use double quotes and are UTF-8. Put values inside with `#{}`:

```repl
> name = "Drop"
"Drop"
> "Hello, #{name}!"
"Hello, Drop!"
> "1 + 1 = #{1 + 1}"
"1 + 1 = 2"
```

Join strings with `<>` (not `+`):

```repl
> "Eli" <> "xir"
"Elixir"
```

Everything else lives in the `String` module. The string always comes first, so it pipes nicely:

```repl
> String.upcase("drop")
"DROP"
> String.length("héllo")
5
> String.split("a,b,c", ",")
["a", "b", "c"]
> String.replace("cat", "c", "b")
"bat"
> String.contains?("elixir", "lix")
true
> String.trim("  hi  ")
"hi"
```

Function names ending in `?` return a boolean. That's a naming convention you'll see everywhere.

Multi-line text goes in triple quotes, a "heredoc":

```elixir
poem = """
Roses are red,
processes are cheap.
"""
```

```tip
Single quotes are **not** strings in Elixir. `'abc'` is a charlist, a list of character codes, mostly used to talk to Erlang libraries. Stick to double quotes.
```

```compare python
f"Hello, {name}!"
"Eli" + "xir"
```

```compare javascript
`Hello, ${name}!`;
"Eli" + "xir";
```

```compare java
"Hello, %s!".formatted(name);
"Eli" + "xir";
```

```compare kotlin
"Hello, $name!"
"Eli" + "xir"
```

```compare go
fmt.Sprintf("Hello, %s!", name)
"Eli" + "xir"
```

```exercise
goal: Build the greeting with interpolation instead of <>.
code: |
  "Hi " <> name <> ", welcome!"
checks:
  - match: '"Hi #\{\s*name\s*\}, welcome!"'
    message: 'Write it as one string: "Hi #{name}, welcome!"'
output: '"Hi Drop, welcome!"'
```
