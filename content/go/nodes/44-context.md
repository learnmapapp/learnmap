---
title: Context
icon: "🛑"
branch: concurrency
requires: [select]
summary: Cancel work and set deadlines across goroutines.
---
When a user closes the page, or a request takes too long, you want all the work for it to stop. The `context` package carries that "please stop" signal.

A `context.Context` has a `Done()` channel that closes when the work should be abandoned. You check it with `select`:

```go title=main.go
package main

import (
    "context"
    "fmt"
    "time"
)

func slowTask(ctx context.Context) error {
    select {
    case <-time.After(3 * time.Second):
        fmt.Println("task finished")
        return nil
    case <-ctx.Done():
        return ctx.Err()
    }
}

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), time.Second)
    defer cancel()

    err := slowTask(ctx)
    fmt.Println("result:", err)
}
```

```repl shell
> go run .
result: context deadline exceeded
```

## Making contexts

| Function | Done closes when |
| --- | --- |
| `context.Background()` | never; the root of everything |
| `context.WithCancel(parent)` | you call `cancel()` |
| `context.WithTimeout(parent, d)` | `d` has passed, or you cancel |
| `context.WithDeadline(parent, t)` | time `t` arrives, or you cancel |

Contexts form a tree: cancelling a parent cancels all its children.

Always `defer cancel()` right after creating one, to free its resources.

## The conventions

- A context is the **first** parameter, named `ctx`: `func Fetch(ctx context.Context, url string)`.
- Pass it down to everything that might block. Libraries for HTTP and databases take one.
- Don't store it in a struct; pass it along explicitly.

In an HTTP server, every request already has one: `r.Context()`, cancelled when the client disconnects.

```compare javascript
const ctrl = new AbortController();
fetch(url, { signal: ctrl.signal });
```

```compare java
future.cancel(true);
```

```compare kotlin
withTimeout(1000) { slowTask() }
```

```compare python
async with asyncio.timeout(1): await slow_task()
```

```compare rust
tokio::time::timeout(Duration::from_secs(1), slow_task()).await
```

```exercise
goal: "Give the fetch at most 5 seconds: create `ctx` with `context.WithTimeout` and `defer cancel()`."
code: |
  ctx := context.Background()
  data, err := fetch(ctx, url)
checks:
  - match: 'ctx\s*,\s*cancel\s*:=\s*context\.WithTimeout\(\s*context\.Background\(\)\s*,\s*5\s*\*\s*time\.Second\s*\)'
    message: "Write ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)."
  - match: 'defer\s+cancel\(\)'
    message: Add defer cancel().
solution: |
  ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
  defer cancel()
  data, err := fetch(ctx, url)
```

```quiz
question: Where does ctx go in a function's parameters, by convention?
options:
  - First.
  - Last.
  - Contexts are stored in a struct field instead.
answer: 0
explain: Go code passes ctx context.Context as the first argument to anything that can block.
```
