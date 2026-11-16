---
title: Server rendering
icon: "🖧"
branch: server
requires: [setup, endpoints]
summary: Add an adapter to render pages on demand, and choose per page between prerendered and live.
---
**A decision guide.** Every Astro page is rendered in one of two ways:

- **Prerendered:** rendered once at build time into an HTML file. This is the default, and what every lesson so far has used.
- **On demand:** rendered by a server for every request, so it can read cookies, form posts, query strings and live data.

**Ask these questions about each page:**

1. *Is it the same for every visitor until you next deploy?* Prerender it. (Blog posts, docs, landing pages.)
2. *Does it depend on who's asking or what they sent?* Render on demand. (Account pages, search results, form handlers.)
3. *Is it mostly static with one personalized corner?* Prerender it and use a [server island](node:server-islands) for the corner.

**Step 1: install an adapter.** On-demand rendering needs a server, and an [[adapter]] connects Astro to one. Pick the one for your host:

```repl shell
> npx astro add node
```

Others include `netlify`, `vercel` and `cloudflare`. The command updates the config:

```javascript title=astro.config.mjs
import { defineConfig } from "astro/config";
import node from "@astrojs/node";

export default defineConfig({
  adapter: node({ mode: "standalone" }),
});
```

**Step 2: opt pages in.** With an adapter installed, pages are still prerendered by default. Mark the dynamic ones:

```astro title=src/pages/search.astro
---
export const prerender = false;

const query = Astro.url.searchParams.get("q") ?? "";
const results = query ? await searchNotes(query) : [];
---
<h1>Results for "{query}"</h1>
<ul>{results.map((r) => <li>{r.title}</li>)}</ul>
```

`/search?q=jupiter` now runs this code on the server for each request.

**The other way round.** If most of your site is dynamic, set `output: "server"` in the config. Then every page renders on demand, and you mark the static ones with `export const prerender = true`.

**What you can use only on demand:** request headers, `Astro.cookies` (reading *and* setting), form posts via `Astro.request`, `Astro.redirect()` for dynamic decisions, and [middleware](node:middleware) that sees each request.

**Running it.** `npm run build` now produces a server as well as static files. With the Node adapter, `node ./dist/server/entry.mjs` starts it.

```compare javascript
// Express renders every request; Astro lets you pick per page.
```

```compare typescript
// Next.js: static by default too, dynamic when a page uses cookies()
// or headers().
```

```compare python
# Django and Flask render on every request; static generation needs an
# add-on.
```

```exercise
goal: "This page reads the query string, so it must render on demand. Add `export const prerender = false;` to the frontmatter."
code: |-
  ---
  const name = Astro.url.searchParams.get("name") ?? "stranger";
  ---
  <h1>Hello, {name}!</h1>
checks:
  - match: 'export\s+const\s+prerender\s*=\s*false'
    message: Add export const prerender = false;
solution: |-
  ---
  export const prerender = false;
  const name = Astro.url.searchParams.get("name") ?? "stranger";
  ---
  <h1>Hello, {name}!</h1>
```

```quiz
question: "You install the Node adapter but change nothing else. How are your existing pages rendered?"
options:
  - All on demand now.
  - Still prerendered at build time; only pages with prerender = false render on demand.
  - The build fails until every page chooses.
answer: 1
explain: The default output is static. The adapter makes on-demand pages possible; you opt each one in.
```
