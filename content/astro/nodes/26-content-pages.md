---
title: A page per post
icon: "🏗️"
branch: routing
requires: [render-content, static-paths]
summary: Combine getCollection, getStaticPaths and render to give every entry in a collection its own URL.
---
**Assembly instructions.** You have all the parts from earlier lessons. Let's put them together into `/blog/<post-id>` pages.

**Parts list:**

- a `blog` [collection](node:collections) with a [schema](node:schemas);
- `getCollection`, to [fetch the entries](node:query);
- `getStaticPaths`, for [one page per value](node:static-paths);
- `render`, to [turn Markdown into HTML](node:render-content).

**Step 1. Create the file.** The URL will be `/blog/<id>`, so the file is:

```text
src/pages/blog/[id].astro
```

**Step 2. One path per entry.** Inside `getStaticPaths`, load the collection and map each post to a path. Pass the whole entry as a prop, so the page doesn't need to look it up again:

```javascript
export async function getStaticPaths() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return posts.map((post) => ({
    params: { id: post.id },
    props: { post },
  }));
}
```

Note the `async`: loading the collection is asynchronous.

**Step 3. Render the entry.** Below `getStaticPaths`, take the prop and render it:

```javascript
const { post } = Astro.props;
const { Content } = await render(post);
```

**Step 4. Lay out the page.** The complete file:

```astro title=src/pages/blog/[id].astro
---
import { getCollection, render } from "astro:content";
import BaseLayout from "../../layouts/BaseLayout.astro";

export async function getStaticPaths() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return posts.map((post) => ({
    params: { id: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);
---
<BaseLayout title={post.data.title}>
  <article>
    <h1>{post.data.title}</h1>
    <time datetime={post.data.date.toISOString()}>
      {post.data.date.toLocaleDateString("en-GB")}
    </time>
    <Content />
  </article>
</BaseLayout>
```

**Step 5. Check it.** Run `npm run build`: the output lists one page per published post, such as `/blog/first-light/index.html`. Drafts are filtered out in step 2, so no page is built for them.

**Troubleshooting:** if links from your blog index give 404s, compare the URL with the file name. `href={`/blog/${post.id}`}` must match `src/pages/blog/[id].astro`.

```compare javascript
// The manual version: readdir, parse each file, render, write
// dist/blog/<id>/index.html.
```

```compare typescript
// Next.js: app/blog/[id]/page.tsx with generateStaticParams. Same
// shape.
```

```compare python
# Pelican: an article.html template rendered once per article.
```

```exercise
goal: "Complete the mapping: each path needs `params: { id: post.id }` and `props: { post }`."
code: |-
  ---
  import { getCollection } from "astro:content";

  export async function getStaticPaths() {
    const posts = await getCollection("blog");
    return posts.map((post) => ({
    }));
  }
  ---
checks:
  - match: 'params:\s*\{\s*id:\s*post\.id\s*\}'
    message: 'Add params: { id: post.id },'
  - match: 'props:\s*\{\s*post\s*\}'
    message: 'Add props: { post },'
solution: |-
  ---
  import { getCollection } from "astro:content";

  export async function getStaticPaths() {
    const posts = await getCollection("blog");
    return posts.map((post) => ({
      params: { id: post.id },
      props: { post },
    }));
  }
  ---
```

```quiz
question: "Why pass the post as a prop instead of only the id?"
options:
  - Because params can't be strings.
  - So the page already has the entry and doesn't need to fetch it again by id.
  - Props are required by getStaticPaths.
answer: 1
explain: The entry is already loaded inside getStaticPaths; handing it over avoids a second lookup.
```
