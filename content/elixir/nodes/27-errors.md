---
title: Errors and raise
icon: "💥"
branch: control
requires: [case]
summary: Tuples for expected failures, raise for real surprises.
---
Elixir has two ways to fail.

**Expected failures** return tuples. A missing file is normal, so `File.read/1` returns `{:error, :enoent}` and you handle it with `case` or `with`.

**Bugs and surprises** raise an exception. Many functions come in pairs; the `!` version raises instead of returning a tuple:

```repl
> File.read("nope.txt")
{:error, :enoent}
> File.read!("nope.txt")
error: ** (File.Error) could not read file "nope.txt": no such file or directory
```

Use the `!` version when failure means something is badly wrong and there's no sensible way to continue.

You *can* catch exceptions:

```elixir
try do
  String.to_integer("abc")
rescue
  ArgumentError -> 0
end
```

But you'll rarely see `try` in Elixir code. The culture is **let it crash**: a process that hits a surprise dies, and a [[supervisor]] restarts it in a clean state. More on that in [Supervisors](node:supervisors).

Raise your own:

```elixir
raise "something went wrong"
raise ArgumentError, message: "age must be positive"
```

Define your own exception type with `defexception [:message]` inside a module.

```compare python
try:
    int("abc")
except ValueError:
    n = 0
```

```compare javascript
try { JSON.parse("{"); } catch (e) { /* ... */ }
```

```compare java
try { Integer.parseInt("abc"); } catch (NumberFormatException e) { }
```

```compare kotlin
val n = "abc".toIntOrNull() ?: 0
```

```compare rust
let n: i32 = "abc".parse().unwrap_or(0);
```

```compare go
n, err := strconv.Atoi("abc")
```

```quiz
question: Your app can't start without its config file. Which call fits best?
options:
  - "File.read(path) and ignore errors"
  - "File.read!(path)"
  - "try ... rescue around File.read(path)"
answer: 1
explain: There's no way to continue without the file, so crash loudly with the ! version.
```
