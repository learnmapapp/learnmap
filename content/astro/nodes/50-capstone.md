---
title: "Capstone: Star Notes"
icon: "🏁"
branch: tools
requires: [content-pages, layouts, seo, sitemap, testing]
summary: Build a complete, validated blog from scratch, using everything from the course.
---
**The project brief.**

> Build *Star Notes*, a small astronomy blog. Posts are Markdown files. It needs a home page with the latest posts, a page per post with a table of contents, good metadata for sharing, a sitemap, and it must fail loudly when a post is broken. No JavaScript in the browser unless something is interactive.

Here's the build log, one milestone at a time. Each links back to the lesson where you learned the part.

**Milestone 1: the skeleton.** `npm create astro@latest star-notes` with the empty template, then `npx astro add sitemap`. Set `site` in the config. ([setup](node:setup), [sitemap](node:sitemap))

**Milestone 2: the content model.**

```typescript title=src/content.config.ts
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    summary: z.string().max(160),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
```

The `max(160)` keeps summaries short enough for a meta description. ([collections](node:collections), [schemas](node:schemas))

**Milestone 3: a shared helper.** One place decides which posts are public, and in what order:

```typescript title=src/lib/posts.ts
import { getCollection } from "astro:content";

export async function publishedPosts() {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
```

The home page, the post pages and an RSS feed all call it, so they never disagree. ([query](node:query))

**Milestone 4: the layout,** with `title` and `description` props, the canonical link and Open Graph tags. ([layouts](node:layouts), [metadata](node:seo))

**Milestone 5: the post pages.**

```astro title=src/pages/posts/[id].astro
---
import { render } from "astro:content";
import BaseLayout from "../../layouts/BaseLayout.astro";
import { publishedPosts } from "../../lib/posts";

export async function getStaticPaths() {
  const posts = await publishedPosts();
  return posts.map((post) => ({
    params: { id: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content, headings } = await render(post);
---
<BaseLayout title={post.data.title} description={post.data.summary}>
  <article>
    <h1>{post.data.title}</h1>
    <nav>
      {headings
        .filter((h) => h.depth === 2)
        .map((h) => <a href={`#${h.slug}`}>{h.text}</a>)}
    </nav>
    <Content />
  </article>
</BaseLayout>
```

([content pages](node:content-pages), [render](node:render-content))

**Milestone 6: the home page** maps `(await publishedPosts()).slice(0, 5)` to links. Plus a friendly [404 page](node:not-found).

**Milestone 7: pre-flight.** A unit test for anything in `src/lib/` that doesn't need Astro, then `astro check && astro build`. Add a post with a missing `summary` and watch the build refuse it. ([testing](node:testing))

**Result:** a fast site that ships zero JavaScript, can't publish a broken post, and is ready for search engines. Ideas for extending it: [pagination](node:pagination), an [RSS feed](node:rss), or a comments [island](node:visible).

```compare javascript
// The same features by hand: a Markdown parser, a router, a validator
// and a sitemap script.
```

```compare typescript
// A Next.js version would need similar pieces, plus a decision about
// static export.
```

```compare python
# Pelican or MkDocs give you the blog; Astro adds typed content and
# components.
```

```exercise
goal: "Final review: the post page uses the right helper, but its layout misses a description. Pass `description={post.data.summary}` to `BaseLayout`."
code: |-
  ---
  const { post } = Astro.props;
  const { Content } = await render(post);
  ---
  <BaseLayout title={post.data.title}>
    <Content />
  </BaseLayout>
checks:
  - match: '<BaseLayout\s+title=\{post\.data\.title\}\s+description=\{post\.data\.summary\}\s*>'
    message: 'Write <BaseLayout title={post.data.title} description={post.data.summary}>'
solution: |-
  ---
  const { post } = Astro.props;
  const { Content } = await render(post);
  ---
  <BaseLayout title={post.data.title} description={post.data.summary}>
    <Content />
  </BaseLayout>
```

```quiz
question: "Why put the draft filter and sorting in one `publishedPosts()` helper?"
options:
  - Astro only allows one getCollection call per project.
  - So every page that lists posts uses the same rules, and a draft can't leak through one forgotten filter.
  - It makes the build output smaller.
answer: 1
explain: One source of truth for "what's published" keeps the home page, post pages and feed consistent.
```
