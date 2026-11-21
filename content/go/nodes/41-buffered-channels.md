---
title: Buffered channels
icon: "🪣"
branch: concurrency
requires: [channels]
summary: Channels with room for a few values, and one-way channel types.
---
Give `make` a second argument and the channel gets a **buffer**: room for that many values before a send has to wait.

```go title=main.go
package main

import "fmt"

func main() {
    queue := make(chan string, 2)

    queue <- "first"  // doesn't wait: buffer has room
    queue <- "second" // doesn't wait: buffer is now full

    fmt.Println(len(queue), cap(queue)) // 2 2
    fmt.Println(<-queue) // first
    fmt.Println(<-queue) // second
}
```

A third send would wait until someone received. With no other goroutine around, that's a deadlock.

Buffers are useful when the sender and receiver work at different speeds, or to limit how much work is waiting at once. They're **not** a fix for a deadlock: if the logic is wrong, a buffer only delays the problem.

## One-way channel types

In a function signature, you can say a channel is only for sending or only for receiving. The compiler then stops you from using it the wrong way:

```go
func produce(out chan<- int) { // send-only
    for i := range 3 {
        out <- i
    }
    close(out)
}

func consume(in <-chan int) { // receive-only
    for n := range in {
        fmt.Println(n)
    }
}

ch := make(chan int, 3)
go produce(ch)
consume(ch)
```

A normal `chan int` converts to either direction automatically when you pass it.

```tip
Read the arrow position: chan<- has the arrow going into chan (send), <-chan has it coming out (receive).
```

```compare python
q = queue.Queue(maxsize=2)
```

```compare java
BlockingQueue<String> q = new ArrayBlockingQueue<>(2);
```

```compare kotlin
val ch = Channel<String>(capacity = 2)
```

```compare rust
let (tx, rx) = mpsc::sync_channel(2);
```

```exercise
goal: "Give `jobs` a buffer of 10, so the first 10 sends don't wait."
code: |
  jobs := make(chan Job)
checks:
  - match: 'jobs\s*:=\s*make\(\s*chan\s+Job\s*,\s*10\s*\)'
    message: "Write make(chan Job, 10)."
solution: |
  jobs := make(chan Job, 10)
```

```quiz
question: "What does the type `<-chan int` mean in a parameter?"
options:
  - The function can only send on it.
  - The function can only receive from it.
  - It's a channel of channels.
answer: 1
explain: The arrow comes out of chan, so values only flow out to the function.
```
