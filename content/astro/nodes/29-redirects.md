---
title: Redirects
icon: "↪️"
branch: routing
requires: [routes]
summary: Send old URLs to new ones, from the config or from a page's code.
---
**Scenario:** you renamed `/blog` to `/articles`. Other sites, search engines and old bookmarks still link to the old URLs. Without redirects they all end at your [404 page](node:not-found).

**Tool 1: the `redirects` config.** A map from old paths to new ones, in `astro.config.mjs`:

```javascript title=astro.config.mjs
import { defineConfig } from "astro/config";

export default defineConfig({
  redirects: {
    "/about-us": "/about",
    "/blog/[...slug]": "/articles/[...slug]",
    "/old-shop": { status: 302, destination: "https://shop.example.com" },
  },
});
```

Line by line:

- **A simple rename:** `/about-us` now leads to `/about`.
- **A whole section at once.** Parameters in brackets carry over, so `/blog/first-light` goes to `/articles/first-light`. Both sides must use the same parameters.
- **A temporary redirect**, to another site. Use the object form to choose the status code. The default is 301, "moved permanently".

**How it's delivered depends on how the site runs:**

| Setup | What the visitor's browser gets |
| --- | --- |
| static build, no adapter | a small HTML page with a `<meta http-equiv="refresh">` tag that forwards immediately |
| static build with a host [[adapter]] | a rule in the host's own redirect config, with a real status code |
| server rendering | a real HTTP redirect response |

A meta refresh works for people, but a real 301 is better for search engines. Status codes only apply in the last two rows.

**A real page wins.** If `src/pages/about-us.astro` exists, the redirect for `/about-us` never fires.

**Tool 2: `Astro.redirect()` in code.** For decisions that depend on the request, like sending visitors who aren't logged in to the login page, redirect from a page rendered on demand:

```astro title=src/pages/account.astro
---
export const prerender = false;
const session = Astro.cookies.get("session");
if (!session) {
  return Astro.redirect("/login");
}
---
<h1>Your account</h1>
```

`return` stops the rest of the page from rendering. This needs [server rendering](node:server-rendering), because a static page can't see who's visiting.

```compare javascript
// Express: res.redirect(301, "/about");
```

```compare typescript
// Next.js: redirects() in next.config.js, or redirect("/login") in a
// server component.
```

```compare python
# Flask: return redirect("/about", code=301)
```

```exercise
goal: "Add a redirect from `/docs` to `/guides` to the `redirects` map."
lang: javascript
code: |-
  import { defineConfig } from "astro/config";

  export default defineConfig({
    redirects: {
    },
  });
checks:
  - match: '["'']/docs["'']\s*:\s*["'']/guides["'']'
    message: 'Add "/docs": "/guides" inside redirects.'
solution: |-
  import { defineConfig } from "astro/config";

  export default defineConfig({
    redirects: {
      "/docs": "/guides",
    },
  });
```

```quiz
question: "On a static site with no adapter, how does a configured redirect work?"
options:
  - The server sends a 301 response.
  - Astro writes an HTML page with a meta refresh tag that forwards the browser.
  - Redirects don't work on static sites.
answer: 1
explain: Without a server or adapter, a meta refresh page is the only option, so there's no real status code.
```
