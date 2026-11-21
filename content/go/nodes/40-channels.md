---
title: Channels
icon: "📨"
branch: concurrency
requires: [goroutines]
summary: Send values between goroutines safely.
---
A [[channel]] is a pipe that goroutines use to send each other values. You make one with `make(chan T)`, send with `ch <- v`, and receive with `<-ch`:

```go title=main.go
package main

import "fmt"

func square(n int, results chan int) {
    results <- n * n // send
}

func main() {
    results := make(chan int)

    go square(3, results)
    go square(4, results)

    a := <-results // receive
    b := <-results
    fmt.Println(a + b) // 25
}
```

The arrow shows which way the data flows.

## Channels synchronise

On a plain channel, a send **waits** until someone receives, and a receive waits until someone sends. That waiting is what makes them safe: the hand-over happens at a moment both sides agree on. No locks needed.

Go's motto: *don't communicate by sharing memory; share memory by communicating.*

## Closing and ranging

The sender can `close` a channel to say "no more values". A `for ... range` over a channel then reads until it's closed:

```go
func countTo(n int, out chan int) {
    for i := 1; i <= n; i++ {
        out <- i
    }
    close(out)
}

nums := make(chan int)
go countTo(3, nums)
for n := range nums {
    fmt.Println(n) // 1, 2, 3
}
```

Only the **sender** should close a channel. Sending on a closed channel panics.

## Deadlocks

If every goroutine is waiting and none can continue, Go notices and stops:

```repl shell
> go run .
fatal error: all goroutines are asleep - deadlock!
```

That's what happens if you receive from a channel nobody will ever send on.

```compare python
q = queue.Queue(); q.put(9); q.get()
```

```compare java
BlockingQueue<Integer> q = new SynchronousQueue<>();
```

```compare kotlin
val ch = Channel<Int>(); ch.send(9); ch.receive()
```

```compare rust
let (tx, rx) = mpsc::channel(); tx.send(9)?; rx.recv()?;
```

```exercise
goal: "Send the greeting into `ch` instead of printing it, using the `<-` operator."
code: |
  go func() {
      fmt.Println("hello")
  }()
  fmt.Println(<-ch)
checks:
  - match: 'ch\s*<-\s*"hello"'
    message: "Write ch <- \"hello\" inside the goroutine."
solution: |
  go func() {
      ch <- "hello"
  }()
  fmt.Println(<-ch)
```

```quiz
question: On an unbuffered channel, what does a send do if nobody is receiving yet?
options:
  - Drops the value.
  - Waits until a receiver is ready.
  - Panics.
answer: 1
explain: Unbuffered channels hand values over directly, so the sender waits for a receiver.
```
