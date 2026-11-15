---
title: Keyword lists
icon: "🔑"
branch: data
requires: [lists]
summary: Lists of {atom, value} pairs, used for options.
---
A [[keyword list]] is a list of two-element tuples whose first element is an atom. It has a special short syntax:

```repl
> [{:size, 10}, {:color, "red"}]
[size: 10, color: "red"]
> [size: 10, color: "red"] == [{:size, 10}, {:color, "red"}]
true
```

Unlike a map, a keyword list keeps its **order** and may repeat keys. That makes it the standard way to pass options to a function:

```elixir
String.split("a, b,,c", ",", trim: true)
Enum.sort(users, desc: true)
```

When the last argument is a keyword list, the brackets are optional. You've already seen this everywhere, in `if`:

```elixir
if hungry, do: "eat", else: "nap"
# is really
if(hungry, [do: "eat", else: "nap"])
```

Read options with the `Keyword` module:

```repl
> opts = [retries: 3, verbose: true]
[retries: 3, verbose: true]
> Keyword.get(opts, :retries)
3
> Keyword.get(opts, :timeout, 5000)
5000
> opts[:verbose]
true
```

| Use | When |
| --- | --- |
| keyword list | options to a function; order matters; small |
| map | data; lookups by key; any size |

```compare python
def split(text, sep, *, trim=False): ...  # keyword arguments
```

```compare javascript
split(text, ",", { trim: true }); // an options object
```

```compare kotlin
fun split(text: String, sep: String, trim: Boolean = false) // named args
```

```compare java
// No named args; builders or option objects instead.
```

```compare go
// Functional options: NewServer(WithPort(8080), WithTLS())
```

```exercise
goal: Read the :timeout option, falling back to 5000 when it isn't set.
code: |
  timeout = opts[:timeout]
checks:
  - match: 'Keyword\.get\(\s*opts\s*,\s*:timeout\s*,\s*5000\s*\)'
    message: Use Keyword.get(opts, :timeout, 5000)
output: "5000"
```
