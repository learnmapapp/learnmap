---
title: An RSS feed
icon: "📡"
branch: routing
requires: [query]
summary: Publish an RSS feed of your posts with an endpoint and the @astrojs/rss helper.
---
**Why bother with RSS in 2026?** Feed readers, podcast apps, newsletter tools and plenty of developers still follow sites through RSS. It's a single XML file listing your latest posts, and with Astro it takes one small file to produce.

**Step 1: install the helper.**

```repl shell
> npm install @astrojs/rss
```

**Step 2: make sure `site` is set** in `astro.config.mjs`, as in the [metadata lesson](node:seo). Feed links have to be absolute URLs.

**Step 3: create an endpoint.** The file name ends in `.xml.js` (or `.xml.ts`), so it's served at `/rss.xml`. Instead of HTML, it exports a `GET` function that returns the feed:

```javascript title=src/pages/rss.xml.js
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection("blog", ({ data }) => !data.draft);

  return rss({
    title: "Star Notes",
    description: "Notes about the night sky.",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.summary,
      link: `/blog/${post.id}/`,
    })),
  });
}
```

What's happening:

- `GET(context)` makes this an [endpoint](node:endpoints). The `context` object carries `site` from your config.
- `items` is one object per post. `link` can be relative; the helper joins it with `site`.
- `pubDate` must be a `Date`, which the [schema](node:schemas) already guarantees.

**Step 4: tell browsers and readers where the feed is.** Add this to your layout's `<head>`:

```astro
<link
  rel="alternate"
  type="application/rss+xml"
  title="Star Notes"
  href="/rss.xml"
/>
```

**Step 5: check it.** Run `npm run build` and open `dist/rss.xml`, or visit `/rss.xml` in the dev server. You should see an `<item>` per post.

```compare javascript
// By hand: build the XML string yourself, escaping titles and
// formatting dates as RFC 822.
```

```compare typescript
// Next.js: a route handler in app/rss.xml/route.ts that returns the
// XML.
```

```compare python
# Django: django.contrib.syndication's Feed class.
```

```exercise
goal: "Each feed item needs a link. Add `link: `/blog/${post.id}/`` to the object returned by the map."
lang: javascript
code: |-
  items: posts.map((post) => ({
    title: post.data.title,
    pubDate: post.data.date,
  })),
checks:
  - match: 'link:\s*`/blog/\$\{\s*post\.id\s*\}/?`'
    message: 'Add link: `/blog/${post.id}/`,'
solution: |-
  items: posts.map((post) => ({
    title: post.data.title,
    pubDate: post.data.date,
    link: `/blog/${post.id}/`,
  })),
```

```quiz
question: "Which file name serves a feed at `/feed.xml`?"
options:
  - "src/pages/feed.astro"
  - "src/pages/feed.xml.js"
  - "public/feed.js"
answer: 1
explain: An endpoint's URL is its file name minus the final .js or .ts.
```
