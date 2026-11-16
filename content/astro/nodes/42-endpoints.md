---
title: Endpoints
icon: "🔌"
branch: server
requires: [routes]
summary: A .ts or .js file in src/pages returns any kind of response, such as JSON, text or images.
---
**A recipe card: a JSON API in one file.**

*Serves:* `/api/notes.json`. *Prep time:* two minutes.

```typescript title=src/pages/api/notes.json.ts
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async () => {
  const notes = await getCollection("blog");
  const summary = notes.map((note) => ({
    id: note.id,
    title: note.data.title,
  }));

  return new Response(JSON.stringify(summary), {
    headers: { "Content-Type": "application/json" },
  });
};
```

**Method:**

1. Create a `.ts` (or `.js`) file in `src/pages/`. The URL follows the same rules as pages, so `api/notes.json.ts` serves `/api/notes.json`.
2. Export a function named after the HTTP method: `GET`, `POST`, `DELETE`, and so on.
3. Return a standard `Response` object, the same class used by `fetch`. You choose the body and headers.

**Two ways to serve it:**

- **Built ahead of time** (the default): the build calls `GET` once and saves the output as a file, `dist/api/notes.json`. Great for search indexes, feeds and data files.
- **On demand:** add `export const prerender = false;` and it runs per request. Needed for anything that handles input, like `POST`.

```typescript title=src/pages/api/echo.ts
import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  return Response.json({ received: body });
};
```

`Response.json(...)` is a shortcut that serializes and sets the header for you.

**The context argument** is a goody bag: `request`, `params` (for [dynamic routes](node:static-paths)), `url`, `cookies`, `site`, `redirect` and more. Destructure what you need.

**Dynamic endpoints** work like dynamic pages. Combined with `getStaticPaths`, `src/pages/api/notes/[id].json.ts` builds one JSON file per note.

```compare javascript
// Express: app.get("/api/notes.json", (req, res) =>
// res.json(summary));
```

```compare typescript
// Next.js: export async function GET() in app/api/notes/route.ts.
// Almost identical.
```

```compare python
# Flask: @app.get("/api/notes.json") returning jsonify(summary)
```

```exercise
goal: "Return the status as JSON: `return Response.json({ status: \"ok\" });`"
lang: typescript
code: |-
  import type { APIRoute } from "astro";

  export const GET: APIRoute = () => {
  };
checks:
  - match: 'return\s+Response\.json\(\s*\{\s*status:\s*"ok"\s*\}\s*\)'
    message: 'Write return Response.json({ status: "ok" });'
solution: |-
  import type { APIRoute } from "astro";

  export const GET: APIRoute = () => {
    return Response.json({ status: "ok" });
  };
```

```quiz
question: "Which file serves `/api/stats.json`?"
options:
  - "src/pages/api/stats.astro"
  - "src/pages/api/stats.json.ts"
  - "src/api/stats.ts"
answer: 1
explain: Endpoints live in src/pages; the .ts extension is dropped from the URL.
```
