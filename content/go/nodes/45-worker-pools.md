---
title: Worker pools
icon: "🏭"
branch: concurrency
requires: [waitgroups, buffered-channels]
summary: A fixed number of goroutines sharing a queue of jobs.
---
Starting one goroutine per job is fine for a hundred jobs. For a million web requests, you want to limit how many run at once. A **worker pool** does that: a few workers take jobs from one channel and send results to another.

```go title=main.go
package main

import (
    "fmt"
    "sync"
    "time"
)

func worker(id int, jobs <-chan int, results chan<- string) {
    for n := range jobs {
        time.Sleep(100 * time.Millisecond) // pretend to work
        results <- fmt.Sprintf("worker %d squared %d = %d", id, n, n*n)
    }
}

func main() {
    jobs := make(chan int, 100)
    results := make(chan string, 100)

    var wg sync.WaitGroup
    for id := 1; id <= 3; id++ {
        wg.Go(func() { worker(id, jobs, results) })
    }

    for n := 1; n <= 9; n++ {
        jobs <- n
    }
    close(jobs) // workers stop once the queue is empty

    go func() {
        wg.Wait()
        close(results) // all workers done: no more results
    }()

    for r := range results {
        fmt.Println(r)
    }
}
```

Nine jobs, three workers, about 300 ms in total instead of 900.

Step by step:

1. **Start the workers.** Each ranges over `jobs` until it's closed.
2. **Send the jobs**, then `close(jobs)` so the workers know when to stop.
3. **Close `results`** once every worker has finished. A separate goroutine waits for that, so `main` can read results at the same time.
4. **Read results** until the channel is closed.

## A simpler limit

If you just need "at most N at once" without separate result handling, a buffered channel works as a counter of free slots:

```go
limit := make(chan struct{}, 5)
for _, url := range urls {
    wg.Go(func() {
        limit <- struct{}{}        // take a slot
        defer func() { <-limit }() // give it back
        fetch(url)
    })
}
wg.Wait()
```

```compare python
with ThreadPoolExecutor(max_workers=3) as pool:
    results = pool.map(square, range(1, 10))
```

```compare java
var pool = Executors.newFixedThreadPool(3);
```

```compare kotlin
val limited = Dispatchers.IO.limitedParallelism(3)
```

```compare rust
let pool = rayon::ThreadPoolBuilder::new().num_threads(3).build()?;
```

```exercise
goal: "The workers never stop because `jobs` stays open. Close it after sending all jobs."
code: |
  for _, j := range work {
      jobs <- j
  }
  wg.Wait()
checks:
  - match: 'close\(\s*jobs\s*\)\s*\n\s*wg\.Wait\(\)'
    message: Call close(jobs) after the loop and before wg.Wait().
solution: |
  for _, j := range work {
      jobs <- j
  }
  close(jobs)
  wg.Wait()
```

```quiz
question: In the pool, why does a separate goroutine call wg.Wait() and then close(results)?
options:
  - So main can read results while the workers are still running.
  - Because close must always run in a goroutine.
  - To make the workers faster.
answer: 0
explain: If main waited first, workers could block on a full results channel. Waiting in the background avoids that.
```
