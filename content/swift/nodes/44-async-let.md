---
title: Concurrent child work
icon: "🏃"
branch: concurrency
requires: [async]
summary: Start several async calls at once with async let, and collect the results later.
---
**Time this code.** Each fetch takes one second. How long does the screen take to load?

```swift
func loadDashboard() async throws -> Dashboard {
    let user = try await fetchUser()
    let orders = try await fetchOrders()
    let news = try await fetchNews()
    return Dashboard(user: user, orders: orders, news: news)
}
```

Three seconds. Each `await` waits for its fetch to finish before the next one even starts, and yet the three don't depend on each other at all.

**`async let`** starts the work immediately and lets it run in the background. You `await` only when you need the result:

```swift title=dashboard.swift
func loadDashboard() async throws -> Dashboard {
    async let user = fetchUser()
    async let orders = fetchOrders()
    async let news = fetchNews()

    return try await Dashboard(user: user, orders: orders, news: news)
}
```

Now all three run **at the same time**, and the whole thing takes about one second. Notice that there's no `try await` on the `async let` lines: those just *start* the work. The `try await` moves to where the values are actually used.

How it behaves:

- Each `async let` creates a **child task**. Child tasks can't outlive the function that started them. If the function returns or throws, any child still running is cancelled and awaited first. Nothing leaks.
- **If one fails, the rest are cancelled.** When `fetchOrders()` throws, the `try await` throws that error, and `fetchUser` and `fetchNews` are told to stop.
- You can await them separately, too: `let u = try await user`.

`async let` is perfect when you know **in advance** how many things to run, like these three. When the number depends on the data (download every image in a list), you need a [task group](node:task-groups).

```compare javascript
const [user, orders, news] = await Promise.all([fetchUser(), fetchOrders(), fetchNews()]);
```

```compare python
user, orders, news = await asyncio.gather(fetch_user(), fetch_orders(), fetch_news())
```

```compare kotlin
coroutineScope {
    val user = async { fetchUser() }
    val orders = async { fetchOrders() }
    Dashboard(user.await(), orders.await())
}
```

```exercise
goal: "The weather and the forecast don't depend on each other. Start both with `async let`, then await them together."
code: |-
  let now = try await fetchWeather()
  let later = try await fetchForecast()
  show(try await (now, later))
checks:
  - match: 'async\s+let\s+now\s*=\s*fetchWeather\(\)'
    message: "Start the first one with async let now = fetchWeather()"
  - match: 'async\s+let\s+later\s*=\s*fetchForecast\(\)'
    message: "Start the second one with async let later = fetchForecast()"
solution: |-
  async let now = fetchWeather()
  async let later = fetchForecast()
  show(try await (now, later))
```

```quiz
question: "Three independent calls of 2 seconds each run with `async let`. Roughly how long does it take?"
options:
  - About 2 seconds
  - About 6 seconds
  - It depends on the order they are written in.
answer: 0
explain: async let starts all three at once, so the total is roughly the slowest one.
```
