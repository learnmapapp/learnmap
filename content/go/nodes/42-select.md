---
title: Select
icon: "🎛️"
branch: concurrency
requires: [channels]
summary: Wait on several channels at once, with timeouts.
---
`select` is like a `switch` for channels. It waits until **one** of its cases can go ahead, then runs that one:

```go title=main.go
package main

import (
    "fmt"
    "time"
)

func main() {
    fast := make(chan string)
    slow := make(chan string)

    go func() {
        time.Sleep(50 * time.Millisecond)
        fast <- "fast"
    }()
    go func() {
        time.Sleep(200 * time.Millisecond)
        slow <- "slow"
    }()

    for range 2 {
        select {
        case msg := <-fast:
            fmt.Println("got", msg)
        case msg := <-slow:
            fmt.Println("got", msg)
        }
    }
}
```

```repl shell
> go run .
got fast
got slow
```

If several cases are ready at the same time, `select` picks one at random.

## Timeouts

`time.After(d)` returns a channel that receives a value after `d`. Put it in a `select` to give up on slow work:

```go
select {
case res := <-results:
    fmt.Println(res)
case <-time.After(time.Second):
    fmt.Println("timed out")
}
```

## Don't wait at all

A `default` case runs when nothing else is ready, so the `select` never blocks:

```go
select {
case msg := <-inbox:
    fmt.Println(msg)
default:
    fmt.Println("no mail")
}
```

```compare python
done, _ = await asyncio.wait(tasks, return_when=FIRST_COMPLETED)
```

```compare javascript
await Promise.race([fetchData(), timeout(1000)]);
```

```compare kotlin
select { a.onReceive { it }; b.onReceive { it } }
```

```compare rust
tokio::select! { v = a.recv() => {}, v = b.recv() => {} }
```

```exercise
goal: "Add a timeout: a second case `<-time.After(2 * time.Second)` that returns `ErrTimeout`."
code: |
  select {
  case r := <-reply:
      return r, nil
  }
checks:
  - match: 'case\s+<-\s*time\.After\(\s*2\s*\*\s*time\.Second\s*\)\s*:'
    message: "Add case <-time.After(2 * time.Second):"
  - match: 'ErrTimeout'
    message: Return ErrTimeout in the timeout case.
solution: |
  select {
  case r := <-reply:
      return r, nil
  case <-time.After(2 * time.Second):
      return "", ErrTimeout
  }
```

```quiz
question: What does a default case in a select do?
options:
  - Runs when no other case is ready, so select doesn't wait.
  - Runs after all other cases.
  - Handles closed channels.
answer: 0
explain: With default, select becomes non-blocking.
```
