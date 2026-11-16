---
title: "Typed promises"
icon: "⏳"
branch: "applications"
requires: ["generics", "unions"]
summary: "Describe a future result while handling failures separately."
---
A [[promise]] is a value that arrives later: like a receipt with an order number at a burger counter. You get the receipt now and the burger later. **Or** someone comes back to say they're out of buns.

TypeScript tracks **what's in the bag**: `Promise<T>` is a promise that will deliver a `T`.

```typescript
function fetchUser(id: string): Promise<User> {
  return fetch(`/api/users/${id}`).then(res => res.json());
}
```

## Following the type through `.then`

Each `.then` returns a new promise, typed by what its callback returns:

```typescript
fetchUser("1")                       // Promise<User>
  .then(user => user.name)           // Promise<string>
  .then(name => name.length)         // Promise<number>
  .then(length => console.log(length));
```

Returning a promise from `.then` doesn't nest them: the next step gets the value inside, not a `Promise<Promise<...>>`.

## Creating promises

```typescript
const ready = Promise.resolve(42);           // Promise<number>

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

`void` means "resolves with no useful value". Waiting is the point.

## Several at once

`Promise.all` waits for all of them, and gives back a correctly typed tuple:

```typescript
const [user, posts] = await Promise.all([
  fetchUser("1"),                    // Promise<User>
  fetchPosts("1"),                   // Promise<Post[]>
]);
// user: User, posts: Post[]
```

## The hole in the bag

One thing TypeScript **doesn't** track is the failure. There's no `Promise<User, NetworkError>`. A rejection can carry anything, so it arrives as `any` in `.catch` (or `unknown`, see [typed errors](node:typed-errors)).

Also, `res.json()` returns `Promise<any>`. That `fetchUser` above **claims** it returns a `User`, but nothing checks the server's answer. [Validating JSON](node:json-validation) closes that gap.

```compare java
CompletableFuture<User> user = fetchUser("1");
```

```compare rust
async fn fetch_user(id: &str) -> Result<User, Error>  // error typed
```

```exercise
goal: "The function promises a number, but resolves the text `\"42\"`. Resolve the number instead."
lang: typescript
code: |
  function loadScore(): Promise<number> {
    return Promise.resolve("42");
  }
  loadScore().then(score => console.log(score));
checks:
  - match: 'Promise\.resolve\(42\)'
    message: "Resolve the number 42."
hint: Remove the quotes.
solution: |
  function loadScore(): Promise<number> {
    return Promise.resolve(42);
  }
  loadScore().then(score => console.log(score));
```

```quiz
question: "What's the type of `Promise.resolve(\"hi\").then(s => s.length)`?"
options:
  - "`Promise<string>`"
  - "`Promise<number>`"
  - "`number`"
answer: 1
explain: then returns a new promise of whatever the callback returns, and length is a number.
```
