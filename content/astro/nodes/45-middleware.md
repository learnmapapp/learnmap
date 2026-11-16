---
title: Middleware
icon: "🚪"
branch: server
requires: [server-rendering]
summary: Run code before and after every request, to share data with pages, guard routes or add headers.
---
**An analogy: the hotel reception.** Every guest passes the front desk on the way in and on the way out. The desk can check a booking, hand over a key card, or turn someone away. [[Middleware]] is the reception for your site: one function that every request passes through.

**The front desk lives in `src/middleware.ts`:**

```typescript title=src/middleware.ts
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  // On the way in: before the page renders.
  const started = Date.now();
  const session = context.cookies.get("session")?.value;
  context.locals.user = await findUser(session);

  // Send the guest on to the page.
  const response = await next();

  // On the way out: after the page has rendered.
  const duration = Date.now() - started;
  response.headers.set("Server-Timing", `render;dur=${duration}`);
  return response;
});
```

**Reading the code:**

- `onRequest` is the export Astro looks for.
- `context` holds the request, URL, cookies and more, much like an [endpoint's](node:endpoints).
- `next()` renders the page (or calls the endpoint) and gives back the `Response`.
- Code before `next()` runs on the way in; code after it on the way out.

**The key card: `context.locals`.** Whatever middleware puts in `locals` is available to the page as `Astro.locals`:

```astro title=src/pages/account.astro
---
export const prerender = false;
const { user } = Astro.locals;
---
<h1>Welcome, {user?.name ?? "guest"}</h1>
```

**Turning someone away.** Return a response instead of calling `next()`:

```typescript
if (context.url.pathname.startsWith("/admin") && !context.locals.user) {
  return context.redirect("/login");
}
```

**Important timing detail.** For prerendered pages, middleware runs **once at build time**, not per visitor: there's no request to inspect then. Cookie checks and redirects only make sense for pages rendered on demand.

**Several desks in a row?** Use `sequence(auth, logging)` from `astro:middleware` to chain functions.

```compare javascript
// Express: app.use((req, res, next) => { ...; next(); });
```

```compare typescript
// Next.js: middleware.ts with a NextResponse. Similar role.
```

```compare python
# Django middleware: a class with __call__(request) that calls
# get_response(request).
```

```exercise
goal: "Let the request continue: call `next()`, store the result as `response`, and return it."
lang: typescript
code: |-
  import { defineMiddleware } from "astro:middleware";

  export const onRequest = defineMiddleware(async (context, next) => {
    context.locals.requestedAt = new Date();
  });
checks:
  - match: 'const\s+response\s*=\s*await\s+next\(\)'
    message: Add const response = await next();
  - match: 'return\s+response'
    message: Return the response.
solution: |-
  import { defineMiddleware } from "astro:middleware";

  export const onRequest = defineMiddleware(async (context, next) => {
    context.locals.requestedAt = new Date();
    const response = await next();
    return response;
  });
```

```quiz
question: "How does a page read a value that middleware stored in `context.locals.user`?"
options:
  - "Astro.props.user"
  - "Astro.locals.user"
  - "import { user } from \"astro:middleware\""
answer: 1
explain: context.locals in middleware is the same object as Astro.locals in the page.
```
