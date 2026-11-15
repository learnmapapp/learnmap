---
title: "Async with asyncio"
icon: "⏳"
branch: "concurrency"
requires: ["generators", "context-managers", "modules"]
summary: "Await cooperative operations and run independent waits concurrently."
---

An `async def` function creates a [[coroutine]] when called. Calling it alone does not run its body. Use `await` inside another coroutine, and `asyncio.run` at a normal script entry point:

```python
import asyncio

async def greet(name):
    await asyncio.sleep(0.01)
    return f"Hello, {name}"

async def main():
    async with asyncio.TaskGroup() as group:
        ada = group.create_task(greet("Ada"))
        grace = group.create_task(greet("Grace"))
    print(ada.result())
    print(grace.result())

asyncio.run(main())
```

`TaskGroup`, available in Python 3.11+, waits for its tasks before the block exits. If a task fails with an ordinary exception, the group cancels remaining tasks and reports failures together.

## Cooperative concurrency

The [[event loop]] switches work when a coroutine suspends at an operation that yields control. `asyncio.sleep` allows other tasks to proceed; blocking `time.sleep` inside a coroutine blocks the loop. CPU-heavy code does not become parallel just because its function is marked async.

Awaiting two coroutines one after another is sequential. Scheduling both as tasks allows independent waits to overlap. Use async-aware APIs for I/O and keep synchronous blocking work out of the event loop. See the [official task documentation](https://docs.python.org/3.11/library/asyncio-task.html) for cancellation and timeout details.

```compare javascript
async function main() {
  const results = await Promise.all([greet("Ada"), greet("Grace")]);
  console.log(results);
} // Promise.all has different failure/cancellation behavior from TaskGroup
```

```exercise
goal: "Await the sleep so the coroutine actually waits cooperatively."
lang: python
code: |
  import asyncio

  async def main():
      asyncio.sleep(0.01)
      print("ready")

  asyncio.run(main())
checks:
  - match: "^\\s+await\\s+asyncio\\.sleep\\(\\s*0\\.01\\s*\\)"
    message: "Add await before asyncio.sleep(0.01)."
hint: "Add await before asyncio.sleep(0.01)."
```

```quiz
question: "Does calling an async def function alone run its body?"
options:
  - "Yes, immediately in another thread."
  - "No, it creates a coroutine that must be awaited or scheduled."
  - "Only if it returns a string."
answer: 1
explain: "A coroutine object must be driven by awaiting it or scheduling it on an event loop."
```
