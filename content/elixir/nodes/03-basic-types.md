---
title: Atoms and tuples
icon: "⚛️"
branch: basics
requires: [iex]
summary: The two types you'll see in every Elixir file.
---
An [[atom]] is a constant whose value is its own name. It starts with a colon:

```repl
> :ok
:ok
> :ok == :ok
true
> is_atom(:error)
true
```

`true`, `false` and `nil` are atoms too, just without the colon.

A [[tuple]] groups a fixed number of values in curly braces. Together with atoms they form Elixir's most common pattern: return a status *and* a value.

```repl
> File.read("hello.txt")
{:ok, "Hello!\n"}
> File.read("missing.txt")
{:error, :enoent}
```

```compare python
# Like returning a (status, value) tuple; atoms are similar to an Enum member.
("ok", "Hello!\n")
```

```compare javascript
// Like returning { status: "ok", value: ... }
```

```compare java
// Atoms are like enum constants; {:ok, value} plays the role of Optional or a Result type.
```

```compare kotlin
// {:ok, value} / {:error, reason} is Elixir's Result<T>.
Result.success("Hello!\n")
```

```compare go
// Like Go's (value, err) pair, but tagged with an atom.
data, err := os.ReadFile("hello.txt")
```

```exercise
goal: Write a tuple meaning "error, not found", using the atoms `:error` and `:not_found`.
code: |
  {"error", "not found"}
checks:
  - match: '\{\s*:error\s*,\s*:not_found\s*\}'
    message: Use atoms (with a colon) instead of strings.
output: "{:error, :not_found}"
```

## Tagged tuples

The most common shape in Elixir is the **tagged tuple**: an atom that says what happened, plus the data.

```elixir
{:ok, user}
{:error, :not_found}
{:error, "email is taken"}
```

Almost every function that can fail returns one of these. Because they're plain data, you take them apart with [[pattern matching]]:

```elixir
{:ok, contents} = File.read("hello.txt")
```

Tuples are for small, fixed groups of values. Reading an element by position is fast (`elem(tuple, 0)`), but adding elements means copying, so don't use them as growable lists.

```quiz
question: Which return value convention represents a recoverable failure?
options:
  - The integer `0` for every failure.
  - An `{:error, reason}` tuple.
  - An `{:ok, reason}` tuple.
answer: 1
explain: Tagged result tuples let callers distinguish success and failure with pattern matching.
```
