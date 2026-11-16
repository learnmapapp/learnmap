---
title: Async procedures
icon: "⏳"
branch: tools
requires: [procedures, modules]
summary: The async pragma, Future, await and waitFor, for doing many slow things at once.
---
**The coffee shop story.** One barista, three orders. A *synchronous* barista makes the first coffee, stands watching the machine for 30 seconds, then starts the second. An *asynchronous* barista starts the first coffee, and while the machine runs, takes the next order. Same single barista, much shorter queue.

Async code works the same way: while one task waits for something slow (a network reply, a timer, a file), the program works on another. It's still one thread.

```nim title=coffee.nim
import std/asyncdispatch

proc brew(order: string, seconds: int): Future[string] {.async.} =
  echo "start ", order
  await sleepAsync(seconds * 1000)    # wait without blocking
  return order & " ready"

proc main() {.async.} =
  let a = brew("espresso", 2)
  let b = brew("latte", 3)
  let c = brew("tea", 1)
  echo await c
  echo await a
  echo await b

waitFor main()
```

```repl shell
> nim r coffee.nim
start espresso
start latte
start tea
tea ready
espresso ready
latte ready
```

The whole thing takes about 3 seconds, not 6, because the three waits overlap.

**The vocabulary:**

| Piece | Meaning |
| --- | --- |
| `{.async.}` | this proc can pause at `await` and let others run |
| `Future[string]` | "a string, later". The return type of an async proc that produces a string |
| `await f` | pause this proc until `f` is done, then use its value |
| `waitFor f` | run the event loop until `f` is done. Used once, at the top, outside any async proc |
| `sleepAsync(ms)` | an async pause; plain `sleep` would freeze everything |

Calling `brew(...)` *starts* the work and immediately gives back a `Future`. That's why `a`, `b` and `c` all start before anything is awaited.

**The golden rule: never block inside async code.** A normal `sleep`, a slow loop or a synchronous file read stops *every* task, like a barista who stares at one machine. Use the async versions: `sleepAsync`, `std/asynchttpserver`, `std/httpclient`'s `AsyncHttpClient`, `std/asyncfile`.

**When to use it:** many things waiting at once: web servers, crawlers, chat bots. For heavy calculations, async doesn't help (there's nothing to wait for); look at threads instead.

**A note on libraries:** `std/asyncdispatch` ships with Nim. Some larger projects use the `chronos` package instead, which has the same `async`/`await` style.

```compare python
import asyncio
async def brew(order, seconds):
    await asyncio.sleep(seconds)
    return order + " ready"
```

```compare javascript
async function brew(order, seconds) {
  await new Promise((r) => setTimeout(r, seconds * 1000));
  return `${order} ready`;
}
```

```compare rust
async fn brew(order: &str, seconds: u64) -> String {
    tokio::time::sleep(Duration::from_secs(seconds)).await;
    format!("{order} ready")
}
```

```exercise
goal: "This async proc freezes the whole program while it waits. Replace the blocking `sleep(500)` with `await sleepAsync(500)`."
code: |-
  import std/[asyncdispatch, os]

  proc ping(): Future[string] {.async.} =
    sleep(500)
    return "pong"

  echo waitFor ping()
checks:
  - match: 'await\s+sleepAsync\(\s*500\s*\)'
    message: Write await sleepAsync(500)
  - notMatch: '^\s+sleep\('
    message: Remove the blocking sleep call.
solution: |-
  import std/[asyncdispatch, os]

  proc ping(): Future[string] {.async.} =
    await sleepAsync(500)
    return "pong"

  echo waitFor ping()
```

```quiz
question: "Inside an async proc, what's wrong with calling plain `sleep(1000)`?"
options:
  - Nothing; it pauses only that proc.
  - It blocks the single thread, so every other async task stops too.
  - It doesn't compile inside async procs.
answer: 1
explain: Async tasks share one thread. Use sleepAsync, which lets other tasks run while waiting.
```
