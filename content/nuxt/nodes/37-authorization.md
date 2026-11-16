---
title: Enforce access on the server
icon: "🔒"
branch: server
requires: [server-routes, cookies]
summary: Hiding a button isn't security. Check who's asking inside every server route that needs it.
---
**A threat model in four moves.** Your task app has an admin page with a *Delete all tasks* button. You've protected it carefully:

1. The button only renders `v-if="user.isAdmin"`.
2. The page has [route middleware](node:route-middleware) that redirects non-admins.

Now play the attacker.

**Move 1.** Open DevTools on any page and watch the Network tab. When an admin clicks the button, the browser calls `DELETE /api/tasks`. Any user can find that out, from the JavaScript bundle if nothing else.

**Move 2.** Type in a terminal:

```repl shell
> curl -X DELETE http://localhost:3000/api/tasks
{"deleted":128}
```

**Move 3.** There is no move 3. Every task is gone. The button and the middleware never ran, because curl doesn't run your Vue app.

**Move 4: the defence.** The API itself has to check:

```typescript title=server/utils/requireAdmin.ts
import type { H3Event } from 'h3';

export async function requireAdmin(event: H3Event) {
  const session = getCookie(event, 'session');
  const user = session ? await findUserBySession(session) : null;
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Log in first',
    });
  }
  if (!user.isAdmin) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Admins only',
    });
  }
  return user;
}
```

```typescript title=server/api/tasks/index.delete.ts
export default defineEventHandler(async (event) => {
  await requireAdmin(event);
  return { deleted: await db.tasks.removeAll() };
});
```

Files in `server/utils/` are auto-imported in server code, so every route can call `requireAdmin(event)` on its first line. (`findUserBySession` and `db` stand in for your own code.)

**401 or 403?** **401** means "I don't know who you are": log in. **403** means "I know who you are, and the answer is no".

**So what are the button and the middleware for?** User experience. They keep honest users away from things that would fail anyway. Security lives on the server; the UI just makes it pleasant.

```compare python
# Django REST framework: permission_classes = [IsAdminUser]
# on the view, checked on every request.
```

```compare typescript
// Next.js: check the session at the top of every
// route handler and server action.
```

```exercise
goal: "Protect the export endpoint: call `await requireAdmin(event)` before doing any work."
lang: typescript
code: |-
  export default defineEventHandler(async (event) => {
    return await db.tasks.exportAll();
  });
checks:
  - match: 'await requireAdmin\(event\);?\s*\n\s*return'
    message: Call await requireAdmin(event); on the line before the return.
solution: |-
  export default defineEventHandler(async (event) => {
    await requireAdmin(event);
    return await db.tasks.exportAll();
  });
```

```quiz
question: "A logged-in user without admin rights calls an admin-only endpoint. Which status fits?"
options:
  - "401 Unauthorized: they need to log in."
  - "403 Forbidden: they're known, but not allowed."
  - "404 Not Found"
answer: 1
explain: 401 is for unknown callers; 403 is for known callers without permission.
```
