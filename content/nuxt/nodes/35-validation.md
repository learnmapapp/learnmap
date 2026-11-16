---
title: Validate request input
icon: "🛡️"
branch: server
requires: [http-methods]
summary: Check request bodies against a Zod schema with readValidatedBody, and reject bad input with a 400.
---
**Find the holes.** Here's the create endpoint from the last lesson, slightly extended. Read it with an attacker's eyes:

```typescript title=server/api/tasks/index.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return db.tasks.insert({
    title: body.title.trim(),
    priority: body.priority,
  });
});
```

How many ways can a client break it? Here are four requests:

| Body sent | What happens |
| --- | --- |
| `{}` | `body.title.trim()` crashes: *500 Internal Server Error* |
| `{ "title": 42 }` | `42.trim` isn't a function: another 500 |
| `{ "title": "x", "priority": "urgent!!!" }` | Saved, with a priority your UI can't handle |
| `{ "title": "aaaa…" }` (5 MB) | Saved, filling up your database |

The client did something wrong in each case, but the server either crashed or accepted it. The right answer is **400 Bad Request**, with a reason.

**The fix: describe valid input once, with a schema.** Zod is a popular library for this (`npm install zod`):

```typescript title=server/api/tasks/index.post.ts
import { z } from 'zod';

const NewTask = z.object({
  title: z.string().trim().min(1).max(200),
  priority: z.enum(['low', 'high']).default('low'),
});

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, NewTask.parse);
  return db.tasks.insert(body);
});
```

`readValidatedBody` reads the body and passes it to `NewTask.parse`. If parsing throws, Nuxt answers **400** with the validation errors, and your handler stops there. If it succeeds, `body` is clean **and typed**: `title` is a trimmed string, and `priority` is `'low' | 'high'`.

Run the four requests again: all four now get a 400 explaining what's wrong. The handler code never sees bad data.

**The same works for the query string:** `getValidatedQuery(event, schema.parse)`.

```tip
Validate in the API even if the form validates too. The form helps honest users; the API protects you from everyone else, including `curl`.
```

```compare python
# FastAPI: declare a Pydantic model as the parameter
# type, and bad input gets a 422 automatically.
```

```compare typescript
// Express: app.post(..., (req) => schema.parse(req.body)),
// plus your own error handler to turn it into a 400.
```

```exercise
goal: "Validate the signup body: read it with `readValidatedBody(event, Signup.parse)`."
lang: typescript
code: |-
  import { z } from 'zod';

  const Signup = z.object({ email: z.string().email() });

  export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    return { ok: true, email: body.email };
  });
checks:
  - match: 'await readValidatedBody\(event,\s*Signup\.parse\)'
    message: Replace readBody with readValidatedBody(event, Signup.parse).
  - notMatch: 'readBody\('
    message: Don't read the body without validation.
solution: |-
  import { z } from 'zod';

  const Signup = z.object({ email: z.string().email() });

  export default defineEventHandler(async (event) => {
    const body = await readValidatedBody(event, Signup.parse);
    return { ok: true, email: body.email };
  });
```

```quiz
question: "A request fails the schema passed to `readValidatedBody`. What does the client get?"
options:
  - A 500 error with a stack trace.
  - A 400 error, and the handler code after it doesn't run.
  - A 200 with the invalid fields removed.
answer: 1
explain: A failed parse becomes a 400 Bad Request before your handler continues.
```
