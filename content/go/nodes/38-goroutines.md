---
title: Goroutines
icon: "🏃"
kind: hub
branch: concurrency
requires: [closures]
summary: Run functions at the same time with the go keyword.
---
A [[goroutine]] is a function running **at the same time** as the rest of your program. Starting one takes a single keyword, `go`:

```go title=main.go
package main

import (
    "fmt"
    "time"
)

func say(word string) {
    for range 3 {
        fmt.Println(word)
        time.Sleep(100 * time.Millisecond)
    }
}

func main() {
    go say("ping") // runs in the background
    say("pong")    // runs here
}
```

```repl shell
> go run .
pong
ping
ping
pong
pong
ping
```

The order changes from run to run, because both functions really do run concurrently.

Goroutines are **cheap**: they start with a few kilobytes of memory, and Go's runtime spreads them over your CPU cores. Running thousands, or even a million, is normal.

## Anonymous goroutines

Often you start a closure directly. Note the `()` at the end, which calls it:

```go
go func() {
    fmt.Println("working in the background")
}()
```

## main doesn't wait

When `main` returns, the program ends, and any goroutines still running are stopped mid-way:

```go
func main() {
    go fmt.Println("hello?")
} // probably prints nothing
```

`time.Sleep` "fixes" that in examples, but it's guesswork. Real programs wait properly with a [WaitGroup](node:waitgroups) or communicate through [channels](node:channels).

```compare python
threading.Thread(target=say, args=("ping",)).start()
```

```compare javascript
// one thread; use async functions or Worker threads
```

```compare java
Thread.startVirtualThread(() -> say("ping"));
```

```compare kotlin
launch { say("ping") }   // a coroutine
```

```compare rust
std::thread::spawn(|| say("ping"));
```

```exercise
goal: "Run `download(url)` in a new goroutine instead of waiting for it."
code: |
  for _, url := range urls {
      download(url)
  }
checks:
  - match: '^\s*go\s+download\(\s*url\s*\)'
    message: "Put go in front of the call: go download(url)."
solution: |
  for _, url := range urls {
      go download(url)
  }
```

```quiz
question: What happens to running goroutines when main returns?
options:
  - main waits for them to finish.
  - They're stopped, because the program exits.
  - They keep running in the background.
answer: 1
explain: The program ends when main returns. Use a WaitGroup or channels to wait.
```
