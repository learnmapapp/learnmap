---
title: Pagination
icon: "📑"
branch: routing
requires: [static-paths]
summary: Split a long list across numbered pages with paginate, and link to the previous and next pages.
---
**Q&A with Nova.**

**"My blog index lists 140 posts on one page. How do I split it up?"**

Use the `paginate` function that Astro passes into `getStaticPaths`. It chops an array into pages and generates a route for each:

```astro title=src/pages/blog/[page].astro
---
import { getCollection } from "astro:content";

export async function getStaticPaths({ paginate }) {
  const posts = await getCollection("blog");
  posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  return paginate(posts, { pageSize: 10 });
}

const { page } = Astro.props;
---
<h1>Blog, page {page.currentPage} of {page.lastPage}</h1>
<ul>
  {page.data.map((post) => <li>{post.data.title}</li>)}
</ul>
<nav>
  {page.url.prev && <a href={page.url.prev}>Newer</a>}
  {page.url.next && <a href={page.url.next}>Older</a>}
</nav>
```

**"Which URLs does that create?"**

With 140 posts and ten per page: `/blog/1` through `/blog/14`.

**"What's in `page`?"**

| Property | Value on page 2 |
| --- | --- |
| `page.data` | posts 11 to 20 |
| `page.currentPage` | `2` |
| `page.lastPage` | `14` |
| `page.total` | `140` |
| `page.url.prev` | `/blog/1` |
| `page.url.next` | `/blog/3` |

On the first page `url.prev` is `undefined`, and so is `url.next` on the last page. That's why the template checks them before rendering links.

**"I'd rather have `/blog` for the first page, not `/blog/1`."**

Name the file with a rest parameter: `src/pages/blog/[...page].astro`. Then page one is `/blog`, and the rest are `/blog/2`, `/blog/3` and so on.

**"Do I have to sort before paginating?"**

Yes. `paginate` keeps the array's order, and `getCollection` doesn't promise one.

**"Can I paginate per tag?"**

Yes: call `paginate` once per tag, filtering the posts and passing `params: { tag }` in its options. Then flatten the results with `.flatMap`. That's a nice exercise for later.

```compare javascript
const pages = [];
for (let i = 0; i < posts.length; i += 10) pages.push(posts.slice(i, i + 10));
```

```compare typescript
// Server frameworks paginate per request (?page=2).
// Astro builds each page ahead of time.
```

```compare python
# Django: Paginator(posts, 10).page(2)
```

```exercise
goal: "Return paginated paths with 20 posts per page: call `paginate(posts, { pageSize: 20 })`."
code: |-
  ---
  import { getCollection } from "astro:content";

  export async function getStaticPaths({ paginate }) {
    const posts = await getCollection("blog");
    return [];
  }
  ---
checks:
  - match: 'return\s+paginate\(\s*posts\s*,\s*\{\s*pageSize:\s*20\s*\}\s*\)'
    message: 'Write return paginate(posts, { pageSize: 20 });'
solution: |-
  ---
  import { getCollection } from "astro:content";

  export async function getStaticPaths({ paginate }) {
    const posts = await getCollection("blog");
    return paginate(posts, { pageSize: 20 });
  }
  ---
```

```quiz
question: "With 45 posts and `pageSize: 10`, what is `page.lastPage`?"
options:
  - "4"
  - "5"
  - "45"
answer: 1
explain: Four full pages plus one page with the last five posts.
```
