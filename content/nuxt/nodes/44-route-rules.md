---
title: Per-route rendering rules
icon: "📐"
branch: production
requires: [server-routes]
summary: routeRules pick a rendering strategy per URL pattern, such as prerendered, cached, or client-only.
---
**A menu of rendering modes.** So far, every page has been rendered on the server for each request. That's a good default, but not the best choice for every page. Here's the menu:

| Mode | When HTML is made | Good for |
| --- | --- | --- |
| Server rendering (default) | On every request | Personal, always-fresh pages |
| `prerender: true` | Once, at build time | Pages that rarely change, like the homepage or docs |
| `swr: 600` | On request, then cached for 10 minutes | Busy pages that can be a little stale |
| `isr: 3600` | Like swr, cached by your host's CDN | The same, on Vercel or Netlify |
| `ssr: false` | Never; the browser renders | Logged-in dashboards nobody needs to index |

**Ordering from the menu** happens in one place, by URL pattern:

```typescript title=nuxt.config.ts
export default defineNuxtConfig({
  routeRules: {
    '/': { prerender: true },
    '/docs/**': { prerender: true },
    '/blog/**': { swr: 600 },
    '/app/**': { ssr: false },
    '/api/**': { cors: true },
    '/old-pricing': { redirect: '/pricing' },
  },
});
```

`**` matches everything below a path, so `/docs/**` covers `/docs/install` and `/docs/guides/deploy`.

**Reading the order back:**

- The homepage and docs are built into HTML files once, then served instantly.
- A blog post is rendered on the first request. For the next 10 minutes, visitors get the cached copy; after that, the next visit triggers a fresh render in the background.
- Everything under `/app` is sent as an empty shell that the browser fills in, like a classic single-page app.
- API routes get CORS headers, and the old pricing URL redirects.

**The nice part:** your pages don't change at all. The same `.vue` files work in every mode. You can move a page from server rendering to prerendered with one line of config.

```warn
A cached or prerendered page is the same for every visitor. Don't put per-user content (like "Hi Ada") into pages with `prerender` or `swr`, or one user's page gets served to everyone.
```

```compare typescript
// Next.js sets this per page instead:
// export const revalidate = 600, or dynamic = 'force-static'.
```

```compare python
# Django: @cache_page(600) on a view for the swr-like
# behavior; static generation needs a separate tool.
```

```exercise
goal: "Prerender the `/about` page, and cache `/products/**` for 300 seconds with `swr`."
lang: typescript
code: |-
  export default defineNuxtConfig({
    routeRules: {
    },
  });
checks:
  - match: "'/about':\\s*\\{\\s*prerender:\\s*true\\s*\\}"
    message: "Add '/about': { prerender: true }."
  - match: "'/products/\\*\\*':\\s*\\{\\s*swr:\\s*300\\s*\\}"
    message: "Add '/products/**': { swr: 300 }."
solution: |-
  export default defineNuxtConfig({
    routeRules: {
      '/about': { prerender: true },
      '/products/**': { swr: 300 },
    },
  });
```

```quiz
question: "Which rule fits an account settings area that shows the logged-in user's data?"
options:
  - "prerender: true"
  - "swr: 600"
  - "ssr: false (or the default server rendering)"
answer: 2
explain: Per-user pages must never be shared from a cache. Render them per request, or in the browser.
```
