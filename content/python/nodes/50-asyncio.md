---
title: "Async with asyncio"
icon: "⏳"
branch: "concurrency"
requires: ["generators", "context-managers", "modules"]
summary: "Await cooperative operations and run independent waits concurrently."
---
**The waiter analogy.** A restaurant waiter doesn't stand by the kitchen while your food cooks. They take an order, hand it to the kitchen, and serve other tables until a dish is ready. One waiter, many tables, because most of the time is spent **waiting**.

`asyncio` lets one Python program work like that waiter. It's for code that spends its time waiting on networks, disks or timers, and that needs to juggle many of those waits at once.

## The vocabulary, mapped to the restaurant

- `async def` defines a **[[coroutine]]**: a task that can pause while it waits. (A table's order.)
- `await` marks a pause point: "I'm waiting; serve someone else meanwhile."
- The **[[event loop]]** is the waiter, switching between coroutines whenever one is waiting.
- `asyncio.run(main())` hires the waiter and starts the shift.

```python
import asyncio

async def cook(dish, seconds):
    print(f"Started {dish}")
    await asyncio.sleep(seconds)        # waiting, not blocking
    print(f"{dish} is ready")
    return dish

async def main():
    dishes = await asyncio.gather(
        cook("pasta", 3),
        cook("salad", 1),
        cook("soup", 2),
    )
    print("Serving:", dishes)

asyncio.run(main())
```

`gather` runs all three at once. The salad finishes first, the whole thing takes about **3** seconds instead of 6, and `dishes` comes back in the order you asked: `['pasta', 'salad', 'soup']`.

## Two classic mistakes

**Forgetting `await`.** Calling a coroutine function doesn't run it. It just creates a coroutine object:

```python
async def main():
    asyncio.sleep(1)      # does nothing!
    print("ready")
```

Python warns `RuntimeWarning: coroutine 'sleep' was never awaited`. Add the `await`.

**Blocking the waiter.** `time.sleep(5)` or a slow regular function inside a coroutine freezes the **whole** event loop. Every other task waits too. Inside async code, use async libraries (such as `asyncio.sleep` or an async HTTP client), or hand blocking work off with `await asyncio.to_thread(slow_function)`.

```tip
Async helps when you're waiting on many things. It doesn't make number crunching faster: one waiter still only has two hands. For CPU-heavy work, look at `multiprocessing` instead.
```

```compare javascript
const dishes = await Promise.all([cook("pasta", 3), cook("salad", 1)]);
```

```compare kotlin
val dishes = coroutineScope {
    listOf(
        async { cook("pasta", 3) },
        async { cook("salad", 1) },
    ).awaitAll()
}
```

```exercise
goal: "The sleep is created but never awaited, so nothing waits. Fix it."
lang: python
code: |
  import asyncio

  async def main():
      asyncio.sleep(0.01)
      print("ready")

  asyncio.run(main())
checks:
  - match: '^\s+await\s+asyncio\.sleep\(\s*0\.01\s*\)'
    message: Add await before asyncio.sleep(0.01).
hint: Coroutines only run when awaited.
solution: |
  import asyncio

  async def main():
      await asyncio.sleep(0.01)
      print("ready")

  asyncio.run(main())
```

```quiz
question: "Three coroutines each `await asyncio.sleep(2)`, run together with `gather`. Roughly how long does it take?"
options:
  - About 2 seconds.
  - About 6 seconds.
  - About 0 seconds.
answer: 0
explain: The waits overlap. The event loop switches between them while they sleep, so the total is about the longest one.
```
