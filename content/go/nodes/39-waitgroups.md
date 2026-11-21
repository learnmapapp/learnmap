---
title: WaitGroups
icon: "⏱️"
branch: concurrency
requires: [goroutines]
summary: Wait until a group of goroutines has finished.
---
A `sync.WaitGroup` counts running goroutines and lets you wait until all of them are done.

Go 1.25 added `wg.Go`, which starts a goroutine and does the counting for you:

```go title=main.go
package main

import (
    "fmt"
    "sync"
    "time"
)

func main() {
    var wg sync.WaitGroup

    for i := range 3 {
        wg.Go(func() {
            time.Sleep(time.Duration(i) * 100 * time.Millisecond)
            fmt.Println("worker", i, "done")
        })
    }

    wg.Wait() // blocks until all three have finished
    fmt.Println("all done")
}
```

```repl shell
> go run .
worker 0 done
worker 1 done
worker 2 done
all done
```

## The classic form

On older Go versions, and in lots of existing code, you'll see the three-step version:

```go
for i := range 3 {
    wg.Add(1)          // one more to wait for
    go func() {
        defer wg.Done() // one fewer, even if the work fails
        work(i)
    }()
}
wg.Wait()
```

- `Add(1)` before starting the goroutine, not inside it, or `Wait` might run before the count goes up.
- `defer wg.Done()` as the first line of the goroutine.

```tip
Since Go 1.22, each loop iteration gets its own i, so capturing it in a closure is safe. In older code you'll see i := i to make a copy.
```

```warn
Don't copy a WaitGroup. Pass it to functions as *sync.WaitGroup.
```

```compare python
for t in threads: t.join()
```

```compare javascript
await Promise.all(tasks);
```

```compare java
executor.invokeAll(tasks);
```

```compare kotlin
coroutineScope { repeat(3) { launch { work(it) } } } // waits for children
```

```compare rust
thread::scope(|s| { for i in 0..3 { s.spawn(move || work(i)); } });
```

```exercise
goal: "The program exits before the workers finish. Call `wg.Wait()` before printing."
code: |
  var wg sync.WaitGroup
  for _, job := range jobs {
      wg.Go(func() { run(job) })
  }
  fmt.Println("finished")
checks:
  - match: 'wg\.Wait\(\)\s*\n\s*fmt\.Println\("finished"\)'
    message: Call wg.Wait() right before the final Println.
solution: |
  var wg sync.WaitGroup
  for _, job := range jobs {
      wg.Go(func() { run(job) })
  }
  wg.Wait()
  fmt.Println("finished")
```

```quiz
question: In the classic form, where should wg.Add(1) go?
options:
  - Before starting the goroutine.
  - As the first line inside the goroutine.
  - After wg.Wait().
answer: 0
explain: Adding before go guarantees the counter is up before Wait could possibly run.
```
