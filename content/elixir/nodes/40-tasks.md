---
title: Tasks
icon: "⏱️"
branch: beam
requires: [processes]
summary: Run work in the background and await the result.
---
Spawning a process and waiting for its answer is so common that there's a module for it: `Task`.

```elixir
task = Task.async(fn -> expensive_report() end)
# ... do other work meanwhile ...
result = Task.await(task)
```

`Task.await/2` waits up to 5 seconds by default, then crashes. Pass a timeout to change that.

Run many things at once:

```elixir
urls
|> Enum.map(fn url -> Task.async(fn -> HTTP.get(url) end) end)
|> Enum.map(&Task.await/1)
```

Or better, with a limit on how many run at the same time:

```elixir
urls
|> Task.async_stream(&HTTP.get/1, max_concurrency: 10)
|> Enum.map(fn {:ok, response} -> response end)
```

`async_stream` is lazy, keeps the order, and never has more than 10 requests in flight.

Fire-and-forget work, where you don't need the result, goes under a supervisor with `Task.Supervisor.start_child/2`, so a crash doesn't take your caller down.

```compare javascript
const results = await Promise.all(urls.map((u) => fetch(u)));
```

```compare python
results = await asyncio.gather(*(fetch(u) for u in urls))
```

```compare java
var futures = urls.stream()
    .map(u -> CompletableFuture.supplyAsync(() -> get(u)))
    .toList();
```

```compare kotlin
val results = urls.map { async { get(it) } }.awaitAll()
```

```compare go
var wg sync.WaitGroup
for _, u := range urls {
    wg.Add(1)
    go func() { defer wg.Done(); get(u) }()
}
wg.Wait()
```

```compare rust
let handles: Vec<_> =
    urls.iter().map(|u| tokio::spawn(get(u))).collect();
```

```exercise
goal: Run the work with `Task.async` and wait for it with `Task.await`.
code: |
  report = build_report()
checks:
  - match: Task\.async\(\s*(fn\s*->\s*build_report\(\)\s*end|&build_report/0)\s*\)
    message: Start with  task = Task.async(fn -> build_report() end)
  - match: Task\.await\(
    message: Then get the result with Task.await(task).
output: "%Report{...}"
```
