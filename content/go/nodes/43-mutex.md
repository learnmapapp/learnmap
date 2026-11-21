---
title: Mutex
icon: "🔒"
branch: concurrency
requires: [goroutines, pointers]
summary: Protect shared data with Lock and Unlock.
---
Channels are great for passing data along. When several goroutines need to update the **same** variable, a mutex is often simpler.

First, the bug. `count++` reads, adds and writes, and two goroutines can interleave those steps:

```go
count := 0
var wg sync.WaitGroup
for range 1000 {
    wg.Go(func() { count++ })
}
wg.Wait()
fmt.Println(count) // often less than 1000!
```

This is a **data race**. Go has a detector for it:

```repl shell
> go run -race .
WARNING: DATA RACE
Read at 0x00c000012028 by goroutine 8:
```

## sync.Mutex

A mutex ("mutual exclusion") lets only one goroutine at a time into a section of code:

```go title=main.go
package main

import (
    "fmt"
    "sync"
)

type Counter struct {
    mu sync.Mutex
    n  map[string]int
}

func (c *Counter) Add(key string) {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.n[key]++
}

func main() {
    c := Counter{n: map[string]int{}}
    var wg sync.WaitGroup
    for range 1000 {
        wg.Go(func() { c.Add("visits") })
    }
    wg.Wait()
    fmt.Println(c.n["visits"]) // 1000, every time
}
```

The pattern: `Lock`, then immediately `defer Unlock`, then touch the data. Keep the mutex next to the fields it protects, and give the type [pointer receivers](node:pointer-receivers) so the mutex is never copied.

## Other tools

- `sync.RWMutex` allows many readers at once, but one writer.
- `sync/atomic` has `atomic.Int64` and friends for simple counters.
- `sync.Once` runs set-up code exactly once.

```tip
Run your tests with go test -race regularly. It finds races you'd never spot by reading.
```

```compare python
with lock:
    counts[key] += 1
```

```compare java
synchronized (this) { counts.merge(key, 1, Integer::sum); }
```

```compare kotlin
mutex.withLock { counts[key] = (counts[key] ?: 0) + 1 }
```

```compare rust
*counts.lock().unwrap().entry(key).or_insert(0) += 1;
```

```exercise
goal: "Protect the slice: lock `s.mu` at the start of `Push` and `defer` the unlock."
code: |
  func (s *Stack) Push(v int) {
      s.items = append(s.items, v)
  }
checks:
  - match: 's\.mu\.Lock\(\)\s*\n\s*defer\s+s\.mu\.Unlock\(\)'
    message: Add s.mu.Lock() followed by defer s.mu.Unlock().
solution: |
  func (s *Stack) Push(v int) {
      s.mu.Lock()
      defer s.mu.Unlock()
      s.items = append(s.items, v)
  }
```

```quiz
question: Which command helps you find data races?
options:
  - "`go vet`"
  - "`go run -race .`"
  - "`go fmt`"
answer: 1
explain: The race detector, enabled with -race, reports unsynchronised access while the program runs.
```
