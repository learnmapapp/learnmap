---
title: A sitemap
icon: "🧾"
branch: routing
requires: [routes]
summary: Generate a sitemap with the @astrojs/sitemap integration so search engines find every page.
---
**Before:** a search engine discovers your pages by following links. Pages that nothing links to, or that are buried deep, may never be found.

**After:** you hand it a list. A sitemap is an XML file listing every URL on your site, and Astro writes it for you.

**Setup, one command:**

```repl shell
> npx astro add sitemap
```

It installs `@astrojs/sitemap` and adds it to the config. Together with the `site` you need anyway, the config looks like this:

```javascript title=astro.config.mjs
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://starnotes.example",
  integrations: [sitemap()],
});
```

**What you get after `npm run build`:**

- `dist/sitemap-index.xml`, the entry point, which lists one or more sitemap files;
- `dist/sitemap-0.xml`, with the actual URLs, such as `https://starnotes.example/blog/first-light/`.

Every statically built page is included: plain pages, Markdown pages, and every page your `getStaticPaths` functions generate.

**Without `site`, there's no sitemap**, only a warning in the build log. The sitemap needs full URLs.

**Leave pages out** with the `filter` option. It's called with each full URL; return `false` to skip it:

```javascript
sitemap({
  filter: (page) => !page.includes("/admin/") && !page.endsWith("/thanks/"),
});
```

**Tell crawlers where it is.** Add a line to `public/robots.txt`:

```text title=public/robots.txt
User-agent: *
Allow: /
Sitemap: https://starnotes.example/sitemap-index.xml
```

You can also submit the sitemap URL directly in tools like Google Search Console.

**Limits worth knowing.** Pages rendered on demand ([server rendering](node:server-rendering)) aren't known at build time, so they're not listed automatically. You can add them with the `customPages` option.

```compare javascript
// By hand: list your routes, write <url><loc>...</loc></url> for each.
// Easy to forget one.
```

```compare typescript
// Next.js: app/sitemap.ts returning an array of URLs.
```

```compare python
# Django: django.contrib.sitemaps.
```

```exercise
goal: "Register the sitemap integration: add `sitemap()` to the `integrations` array."
lang: javascript
code: |-
  import { defineConfig } from "astro/config";
  import sitemap from "@astrojs/sitemap";

  export default defineConfig({
    site: "https://starnotes.example",
    integrations: [],
  });
checks:
  - match: 'integrations:\s*\[\s*sitemap\(\)\s*\]'
    message: 'Write integrations: [sitemap()]'
solution: |-
  import { defineConfig } from "astro/config";
  import sitemap from "@astrojs/sitemap";

  export default defineConfig({
    site: "https://starnotes.example",
    integrations: [sitemap()],
  });
```

```quiz
question: "You add the sitemap integration but no sitemap appears in `dist/`. What's the most likely cause?"
options:
  - The site has too few pages.
  - The site option is missing from astro.config.mjs.
  - Sitemaps only work with server rendering.
answer: 1
explain: The integration needs site to build absolute URLs, and skips generation without it.
```
