---
title: "Async and await"
icon: "🕰️"
branch: "applications"
requires: ["promises"]
summary: "Write asynchronous control flow while keeping its Promise contract."
---
`async`/`await` is promise code that reads top to bottom. The types don't change; they just get easier to follow. Here's the same function, translated step by step.

**With `.then`:**

```typescript
function loadName(id: string): Promise<string> {
  return fetchUser(id).then(user => user.name.toUpperCase());
}
```

**With `await`:**

```typescript
async function loadName(id: string): Promise<string> {
  const user = await fetchUser(id);   // User, not Promise<User>
  return user.name.toUpperCase();     // a string...
}                                     // ...wrapped in a Promise
```

Two rules make the types click:

1. **`await` unwraps.** `fetchUser` returns `Promise<User>`; `await fetchUser(...)` is a `User`.
2. **`async` wraps.** You `return` a string, but the function's type is `Promise<string>`, because the caller gets it later. An `async` function's return type must always be a `Promise<...>`.

## The forgotten `await`

The classic bug. It's caught by the checker, which is one of the nicer things TypeScript does for async code:

```typescript
async function greet(id: string) {
  const user = fetchUser(id);         // oops: Promise<User>
  return `Hi ${user.name}`;
  //            ~~~~ Property 'name' does not exist on
  //                 type 'Promise<User>'.
}
```

The hover type of `user` gives it away: `Promise<User>`.

A sneakier version: an `if` on a promise is always truthy. `if (isAdmin(user))`, where `isAdmin` is async, is **always** true. TypeScript flags this as "This condition will always return true since this 'Promise' is always defined".

## Sequential or parallel?

```typescript
const user = await fetchUser(id);       // waits...
const posts = await fetchPosts(id);     // ...then waits again

const [u, p] = await Promise.all([fetchUser(id), fetchPosts(id)]);
```

If the two calls don't depend on each other, the second form runs them at the same time.

```compare python
async def load_name(id: str) -> str:   # Python writes str, not
    user = await fetch_user(id)          # Coroutine[..., str]
    return user.name.upper()
```

```compare kotlin
suspend fun loadName(id: String): String  // no wrapper type at all
```

```exercise
goal: "`score` is a promise, so `score + 1` doesn't make sense. Await it first."
lang: typescript
code: |
  async function nextScore(): Promise<number> {
    const score = Promise.resolve(41);
    return score + 1;
  }
  nextScore().then(value => console.log(value));
checks:
  - match: 'const\s+score\s*=\s*await\s+Promise\.resolve\(41\);'
    message: "Add await, so score is a number rather than a promise."
hint: await goes in front of the promise.
solution: |
  async function nextScore(): Promise<number> {
    const score = await Promise.resolve(41);
    return score + 1;
  }
  nextScore().then(value => console.log(value));
```

```quiz
question: "An `async` function contains `return 5;`. What's its return type?"
options:
  - "`number`"
  - "`Promise<number>`"
  - "`Promise<void>`"
answer: 1
explain: async functions always return a promise, wrapping whatever you return.
```
