---
title: File-based routing
icon: "🗺️"
branch: routing
requires: [setup]
summary: The folder structure of src/pages is the URL structure of the site.
---
**A puzzle.** Here are some files in `src/pages/`. Which URL does each one serve? Cover the answers and guess.

1. `index.astro`
2. `about.astro`
3. `blog/index.astro`
4. `blog/archive.astro`
5. `contact.md`
6. `api/time.ts`
7. `_drafts/idea.astro`
8. `blog/[slug].astro`

**Answers:**

1. `/` — an `index` file is the folder's own URL.
2. `/about`
3. `/blog`
4. `/blog/archive` — folders become path segments.
5. `/contact` — Markdown and MDX files are pages too.
6. `/api/time` — a TypeScript file is an [endpoint](node:endpoints) that returns data instead of a page.
7. Nothing! Files and folders starting with `_` are ignored, which is handy for parking work in progress or helpers next to your pages.
8. Many URLs, like `/blog/first-light`. Square brackets make a [[dynamic route]]; the [next lesson](node:static-paths) explains it.

**The rules in one sentence:** strip `src/pages`, strip the extension, treat `index` as the folder itself, and skip anything starting with `_`.

**Linking between pages** uses plain `<a>` tags with the URL, no special component needed:

```astro title=src/pages/index.astro
<nav>
  <a href="/">Home</a>
  <a href="/blog">Blog</a>
  <a href="/about">About</a>
</nav>
```

**Which URL am I on?** `Astro.url` is a standard `URL` object for the current page, handy for highlighting the active link:

```astro
---
const path = Astro.url.pathname;
---
<a
  href="/blog"
  aria-current={path.startsWith("/blog") ? "page" : undefined}
>
  Blog
</a>
```

**Trailing slashes.** By default both `/about` and `/about/` work in the dev server. If you care about one canonical form, set `trailingSlash: "never"` or `"always"` in `astro.config.mjs`.

```compare javascript
// Express: app.get("/about", ...) for each route. Astro derives routes
// from files.
```

```compare typescript
// Next.js app router: app/about/page.tsx. Same idea, one file per page
// in Astro.
```

```compare python
# Flask: @app.route("/about"). In Astro the file's location is the
# route.
```

```exercise
goal: "This page should be served at `/docs/install`. Write the file path, relative to the project root, on the single line."
lang: shell
code: |-
  src/pages/install.astro
checks:
  - match: '^src/pages/docs/install\.astro\s*$'
    message: 'It needs to be inside a docs folder: src/pages/docs/install.astro'
solution: |-
  src/pages/docs/install.astro
```

```quiz
question: "Which file serves the URL `/projects`?"
options:
  - "src/pages/_projects.astro"
  - "src/pages/projects/index.astro"
  - "src/components/projects.astro"
answer: 1
explain: An index file is served at its folder's URL. Underscore files and components never become pages.
```
