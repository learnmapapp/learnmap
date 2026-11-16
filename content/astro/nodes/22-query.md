---
title: Query a collection
icon: "🔎"
branch: content
requires: [schemas, lists]
summary: Fetch entries with getCollection and getEntry, then filter and sort them like any array.
---
**A cookbook of common queries.** Every recipe uses the `blog` collection from the [previous lesson](node:schemas).

**Recipe 1: everything.**

```astro
---
import { getCollection } from "astro:content";
const posts = await getCollection("blog");
---
```

The result is an array of entries, in no guaranteed order.

**Recipe 2: hide drafts.** Pass a filter function as the second argument. It receives each entry, and you return `true` to keep it:

```javascript
const posts = await getCollection("blog", ({ data }) => !data.draft);
```

**Recipe 3: drafts only while developing.** `import.meta.env.PROD` is `true` in a production build:

```javascript
const posts = await getCollection(
  "blog",
  ({ data }) => !import.meta.env.PROD || !data.draft,
);
```

**Recipe 4: newest first.** The result is a normal array, so sort it. Thanks to the schema, `date` is a `Date`:

```javascript
posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
```

**Recipe 5: the latest three.** Sort, then `posts.slice(0, 3)`.

**Recipe 6: one specific entry.** When you know the id:

```javascript
import { getEntry } from "astro:content";
const about = await getEntry("blog", "first-light");
```

It returns `undefined` when there's no such entry, so check before using it.

**Recipe 7: all tags, without duplicates.**

```javascript
const tags = [...new Set(posts.flatMap((post) => post.data.tags))];
```

**Serve on a page:**

```astro title=src/pages/blog/index.astro
---
import { getCollection } from "astro:content";
const posts = (await getCollection("blog", ({ data }) => !data.draft))
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---
<ul>
  {posts.map((post) => (
    <li><a href={`/blog/${post.id}`}>{post.data.title}</a></li>
  ))}
</ul>
```

Those links don't lead anywhere yet; [content pages](node:content-pages) create them.

```compare javascript
// After loading, it's all ordinary array methods: filter, sort, slice,
// map.
```

```compare typescript
// Prisma-style: findMany({ where: { draft: false }, orderBy: { date:
// "desc" } })
```

```compare python
# Django ORM: Post.objects.filter(draft=False).order_by("-date")[:3]
```

```exercise
goal: "Only load published posts: add a filter function to `getCollection` that keeps entries where `data.draft` is false."
code: |-
  ---
  import { getCollection } from "astro:content";
  const posts = await getCollection("blog");
  ---
checks:
  - match: 'getCollection\(\s*"blog"\s*,\s*\(\s*\{\s*data\s*\}\s*\)\s*=>\s*!\s*data\.draft\s*\)'
    message: 'Write getCollection("blog", ({ data }) => !data.draft)'
solution: |-
  ---
  import { getCollection } from "astro:content";
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  ---
```

```quiz
question: "What does `getEntry(\"blog\", \"no-such-post\")` return?"
options:
  - It throws an error.
  - undefined
  - An empty entry.
answer: 1
explain: getEntry returns undefined for unknown ids, so handle that case.
```
