---
title: Wrapping errors
icon: "🎀"
branch: errors
requires: [errors]
summary: Add context with %w, and inspect with errors.Is.
---
When you pass an error up, add a little context so the final message explains **where** it happened. Use `fmt.Errorf` with the `%w` verb:

```go title=main.go
package main

import (
    "errors"
    "fmt"
    "io/fs"
    "os"
)

func readConfig(path string) ([]byte, error) {
    data, err := os.ReadFile(path)
    if err != nil {
        return nil, fmt.Errorf("read config: %w", err)
    }
    return data, nil
}

func main() {
    _, err := readConfig("missing.toml")
    fmt.Println(err)
    // read config: open missing.toml: no such file or directory

    if errors.Is(err, fs.ErrNotExist) {
        fmt.Println("using defaults")
    }
}
```

`%w` **wraps** the original error: the new error remembers the old one inside it. The message reads like a little story, from the outside in.

## errors.Is

Some errors are fixed values you can compare with, called **sentinel errors**, like `fs.ErrNotExist` or `io.EOF`. Because the error may be wrapped several layers deep, don't use `==`. Use `errors.Is`, which looks through the whole chain:

```go
err == fs.ErrNotExist          // false: it's wrapped
errors.Is(err, fs.ErrNotExist) // true
```

You can define your own sentinels:

```go
var ErrNotFound = errors.New("not found")
```

## %w versus %v

`%v` puts the old message into the new one but **doesn't** keep the original error. `errors.Is` can't see through it. Use `%w` unless you deliberately want to hide the cause.

```compare python
raise ConfigError("read config") from e
```

```compare java
throw new ConfigException("read config", e);
```

```compare kotlin
throw ConfigException("read config", e)
```

```compare rust
fs::read(path).context("read config")?; // with anyhow
```

```exercise
goal: "Wrap the error with `%w` and the context `save user`."
code: |
  if err != nil {
      return err
  }
checks:
  - match: 'return\s+fmt\.Errorf\(\s*"save user: %w"\s*,\s*err\s*\)'
    message: "Return fmt.Errorf(\"save user: %w\", err)."
solution: |
  if err != nil {
      return fmt.Errorf("save user: %w", err)
  }
```

```quiz
question: Why use errors.Is instead of == to check for io.EOF?
options:
  - errors.Is also finds the error when it's wrapped inside others.
  - == doesn't work on interfaces.
  - errors.Is is faster.
answer: 0
explain: errors.Is unwraps the chain, so it still matches after fmt.Errorf with %w added context.
```
