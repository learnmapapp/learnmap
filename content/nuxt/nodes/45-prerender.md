---
title: Prerender known routes
icon: "🏭"
branch: production
requires: [pages, route-rules]
summary: Prerendering turns pages into HTML files at build time; the crawler follows links to find them.
---
**Reading a build log.** You've marked the site as prerendered and run the build. Here's a simplified version of what Nuxt prints. Let's read it line by line:

```repl shell
> npx nuxt generate
  Prerendering routes with the crawler
    /
    /about
    /tasks/1
    /tasks/2
    /200.html
    /404.html
  You can now deploy .output/public to any static hosting!
```

**"With the crawler".** Nuxt starts from `/`, renders it, then **follows every `<NuxtLink>`** in the HTML to find more pages. That's how it found `/about`. And because the homepage links to tasks 1 and 2, those were found too.

**"/200.html" and "/404.html".** Fallback pages for static hosts: the 404 page, and an app shell the host can serve for routes it doesn't have a file for.

**".output/public".** The finished site: plain HTML, CSS and JavaScript. Upload the folder to any static host, such as GitHub Pages, Netlify or Cloudflare Pages, with no Node server required.

**What the log *doesn't* show.** Task 3 exists, but no page links to it. The crawler never found it, so there's no file, and visitors get a 404. When pages aren't reachable through links, list them yourself:

```typescript title=nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/tasks/3', '/sitemap.xml'],
    },
  },
});
```

**`nuxt generate` or `routeRules`?** `nuxt generate` prerenders the *whole* site for static hosting. `routeRules` with `prerender: true` (from the [previous lesson](node:route-rules)) prerenders *some* pages while the rest stay server-rendered on a Node host. Same mechanism, different scope.

**One more thing:** data fetched by `useFetch` during prerendering is frozen into the files. To show newer data, build again, or use `swr` for that route.

```compare typescript
// Next.js: output: 'export' plus generateStaticParams
// to list dynamic pages.
```

```compare python
# Pelican or MkDocs: the whole site is static,
# generated from content files.
```

```exercise
goal: "Nothing links to `/terms` and `/privacy`. Add both to the prerender `routes`."
lang: typescript
code: |-
  export default defineNuxtConfig({
    nitro: {
      prerender: {
        crawlLinks: true,
      },
    },
  });
checks:
  - match: "routes:\\s*\\[\\s*'/terms',\\s*'/privacy'\\s*,?\\s*\\]"
    message: "Add routes: ['/terms', '/privacy'] next to crawlLinks."
solution: |-
  export default defineNuxtConfig({
    nitro: {
      prerender: {
        crawlLinks: true,
        routes: ['/terms', '/privacy'],
      },
    },
  });
```

```quiz
question: "A page is only reachable through a search box, never through a link. What happens in `nuxt generate`?"
options:
  - The crawler finds it through the search box.
  - It isn't prerendered unless you list it in nitro.prerender.routes.
  - The build fails.
answer: 1
explain: The crawler only follows links in rendered HTML, so unlinked pages must be listed.
```
