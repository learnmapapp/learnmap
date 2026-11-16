---
title: A server API route
icon: "🛰️"
branch: server
requires: [setup]
summary: A file in server/api is an endpoint; whatever its handler returns becomes the response.
---
**Your first API in three lines.** Create this file:

```typescript title=server/api/hello.ts
export default defineEventHandler(() => {
  return { message: 'Hello from the server' };
});
```

And call it:

```repl shell
> curl http://localhost:3000/api/hello
{"message":"Hello from the server"}
```

That's a working endpoint. No server to set up, no routes to register, and it runs on the same port as your pages.

**What just happened?** Nuxt has a server engine called [[nitro|Nitro]] built in. Every file in `server/api/` becomes a route under `/api/`:

| File | Endpoint |
| --- | --- |
| `server/api/hello.ts` | `/api/hello` |
| `server/api/tasks/index.ts` | `/api/tasks` |
| `server/api/tasks/[id].ts` | `/api/tasks/42` |

The file exports an [[event handler]]: a function that receives the request (Nuxt calls it the `event`) and returns the response. Return an object or array, and it's sent as JSON. Return a string, and it's sent as text.

**A slightly more real example:**

```typescript title=server/api/tasks/[id].ts
const tasks = [
  { id: 1, title: 'Buy milk' },
  { id: 2, title: 'Call Sam' },
];

export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, 'id'));
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    throw createError({
      statusCode: 404,
      statusMessage: 'No such task',
    });
  }
  return task;
});
```

`getRouterParam` reads `[id]` from the URL, like `route.params` does in pages. `createError` sends a proper error status.

**The payoff for the frontend:** `useFetch('/api/tasks/1')` in a page is **typed automatically**. Nuxt knows what this handler returns, so `data` has `id` and `title` with no type written by hand.

```warn
Code in `server/` only ever runs on the server. That's the place for database queries and secret keys, and it means `window` and other browser APIs don't exist there.
```

```compare javascript
// Express: app.get('/api/hello', (req, res) =>
//   res.json({ message: 'Hello' }));
```

```compare python
# FastAPI: @app.get('/api/hello') on a function
# that returns a dict.
```

```exercise
goal: "Make `server/api/time.ts` return an object with `now` set to `new Date().toISOString()`."
lang: typescript
code: |-
  export default defineEventHandler(() => {
  });
checks:
  - match: 'return \{\s*now:\s*new Date\(\)\.toISOString\(\)\s*,?\s*\}'
    message: "Return { now: new Date().toISOString() }."
solution: |-
  export default defineEventHandler(() => {
    return { now: new Date().toISOString() };
  });
```

```quiz
question: "Which URL does `server/api/users/[id].ts` respond to?"
options:
  - /users/7
  - /api/users/7
  - /server/api/users/7
answer: 1
explain: Files in server/api are served under /api, with brackets matching a URL segment.
```
