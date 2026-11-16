---
title: Method-specific handlers
icon: "🚦"
branch: server
requires: [server-routes]
summary: Add .get, .post or .delete to a file name to handle one HTTP method, and read bodies with readBody.
---
**One file per verb.** The handler from the last lesson answers *every* method: GET, POST, DELETE, all of them. Usually you want different code for each. Nuxt reads the method from the file name:

```text
server/api/tasks/
  index.get.ts         GET    /api/tasks
  index.post.ts        POST   /api/tasks
  [id].get.ts          GET    /api/tasks/42
  [id].patch.ts        PATCH  /api/tasks/42
  [id].delete.ts       DELETE /api/tasks/42
```

A request with a method that has no file, such as `PUT /api/tasks`, gets **405 Method Not Allowed**.

**Reading the request.** Different parts of a request need different helpers:

| You want | Use |
| --- | --- |
| A URL segment like `[id]` | `getRouterParam(event, 'id')` |
| The query string `?page=2` | `getQuery(event)` |
| A JSON or form body | `await readBody(event)` |
| A header | `getHeader(event, 'authorization')` |

**The create endpoint:**

```typescript title=server/api/tasks/index.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const task = await db.tasks.insert({ title: body.title });
  setResponseStatus(event, 201);
  return task;
});
```

Note the `async`: reading the body waits for the request data to arrive. `setResponseStatus(event, 201)` sends *201 Created* instead of the default 200.

**The delete endpoint:**

```typescript title=server/api/tasks/[id].delete.ts
export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'));
  await db.tasks.remove(id);
  setResponseStatus(event, 204);
  return null;
});
```

(`db` stands in for whatever database client you use.)

```warn
`readBody` returns whatever the client sent, unchecked. `body.title` might be missing, a number, or a 5 MB string. Never trust it directly; the [next lesson](node:validation) fixes that.
```

```compare javascript
// Express: app.post('/api/tasks', ...) and
// app.delete('/api/tasks/:id', ...).
```

```compare python
# FastAPI: @app.post('/api/tasks') and
# @app.delete('/api/tasks/{id}').
```

```exercise
goal: "Write the body of `index.post.ts`: read the body with `readBody` and return it."
lang: typescript
code: |-
  export default defineEventHandler((event) => {
    return {};
  });
checks:
  - match: 'defineEventHandler\(async \(event\)'
    message: Make the handler async, because reading the body takes time.
  - match: 'const body = await readBody\(event\)'
    message: "Read it with const body = await readBody(event);"
  - match: 'return body'
    message: Return the body.
solution: |-
  export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    return body;
  });
```

```quiz
question: "Only `server/api/notes.get.ts` exists. A client sends `DELETE /api/notes`. What's the response?"
options:
  - The GET handler runs anyway.
  - 405 Method Not Allowed.
  - 404 Not Found.
answer: 1
explain: The route exists but has no handler for DELETE, so Nitro answers 405.
```
