---
title: A custom 404 page
icon: "🧭"
branch: routing
requires: [routes]
summary: Replace the host's default "not found" page with your own src/pages/404.astro.
---
**A field trip to nowhere.** Visit `/this-does-not-exist` on a fresh Astro site, and you get a bare, generic error page, either Astro's in the dev server or your host's after deploying. A visitor who mistyped a link sees no navigation and no way back.

**The fix is one file:**

```astro title=src/pages/404.astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
---
<BaseLayout title="Page not found">
  <h1>Lost in space 🛰️</h1>
  <p>We couldn't find that page. It may have moved, or the link has a typo.</p>
  <ul>
    <li><a href="/">Go to the home page</a></li>
    <li><a href="/blog">Browse the blog</a></li>
  </ul>
</BaseLayout>
```

**What happens:**

- `npm run build` writes it to `dist/404.html`.
- Most static hosts, such as Netlify, Cloudflare Pages, Vercel and GitHub Pages, automatically serve `404.html` for any URL without a file, with the correct 404 status code.
- In the dev server you can visit `/404` directly to look at it.

**Tips for a helpful 404:**

- **Use your layout**, so the header and navigation are still there.
- **Offer a way forward:** the home page, the blog, a search box, or your most popular pages.
- **Keep it static.** It should load even when other things are broken, so avoid depending on heavy islands or slow data.
- **Don't redirect** to the home page automatically. That's confusing, and search engines treat it as a "soft 404". The status code should stay 404.

**Server-rendered sites.** When pages are rendered on demand ([server rendering](node:server-rendering)), the same file is used whenever no route matches. You can also send visitors there from your own code by returning a 404 response, for example when a database lookup finds nothing.

**A 500 page too.** `src/pages/500.astro` works the same way for server errors in on-demand rendering.

```compare javascript
// Express: app.use((req, res) =>
// res.status(404).sendFile("404.html"));
```

```compare typescript
// Next.js: app/not-found.tsx plays the same role.
```

```compare python
# Flask: @app.errorhandler(404)
```

```exercise
goal: "Give the 404 page a way back: add a link to the home page, `<a href=\"/\">Home</a>`, after the paragraph."
code: |-
  <h1>Page not found</h1>
  <p>Sorry, that page doesn't exist.</p>
checks:
  - match: '</p>\s*\n\s*<a href="/">Home</a>'
    message: 'Add <a href="/">Home</a> after the paragraph.'
solution: |-
  <h1>Page not found</h1>
  <p>Sorry, that page doesn't exist.</p>
  <a href="/">Home</a>
```

```quiz
question: "What file name gives a static Astro site its custom not-found page?"
options:
  - "src/pages/notfound.astro"
  - "src/pages/404.astro"
  - "public/error.html"
answer: 1
explain: It's built as dist/404.html, which hosts serve for missing URLs.
```
