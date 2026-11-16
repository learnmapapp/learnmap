---
title: Render an entry
icon: "📖"
branch: content
requires: [query]
summary: Turn an entry's Markdown body into HTML with render, and use its headings for a table of contents.
---
**Predict the output.** This page fetches one post and shows its data. What does the visitor see?

```astro
---
import { getEntry } from "astro:content";
const post = await getEntry("blog", "first-light");
---
<h1>{post.data.title}</h1>
<div>{post.body}</div>
```

The title is fine. The body shows up as **raw Markdown**: literal `**Jupiter**` and `## What I saw`, all run together. `post.body` is the source text, not HTML.

**The fix: `render`.** It compiles the entry and hands back a `Content` component:

```astro title=src/pages/first-light.astro
---
import { getEntry, render } from "astro:content";

const post = await getEntry("blog", "first-light");
if (!post) throw new Error("Post not found");

const { Content, headings } = await render(post);
---
<article>
  <h1>{post.data.title}</h1>
  <Content />
</article>
```

Now there's proper HTML with bold text, headings and lists.

**Why is it a component?** It can contain components itself (MDX entries), and you place it wherever you like in your markup. Like any component, its name starts with a capital letter.

**The bonus: `headings`.** `render` also returns every heading in the entry, each with a `depth`, `slug` and `text`. That's a table of contents in one map:

```astro
<nav>
  <ul>
    {headings.filter((h) => h.depth === 2).map((h) => (
      <li><a href={`#${h.slug}`}>{h.text}</a></li>
    ))}
  </ul>
</nav>
```

Each `slug` matches the `id` on the rendered heading, so the links jump to the right place.

**Styling the result.** The HTML inside `<Content />` comes from Markdown, not from your template, so [scoped styles](node:scoped-css) don't reach it. Use `article :global(h2)`, or a global prose stylesheet, as in [global styles](node:global-css).

```compare javascript
// Like marked(post.body), but with Astro's Markdown pipeline,
// components and caching.
```

```compare typescript
// Next.js + MDX: const { default: Post } = await
// import(`./posts/${slug}.mdx`)
```

```compare python
# Jinja: {{ markdown(post.body) | safe }}
```

```exercise
goal: "Render the body: import `render`, call it to get `Content`, and replace the raw `{post.body}` with `<Content />`."
code: |-
  ---
  import { getEntry } from "astro:content";
  const post = await getEntry("blog", "dark-skies");
  ---
  <article>{post.body}</article>
checks:
  - match: 'import\s*\{\s*getEntry\s*,\s*render\s*\}\s*from\s*"astro:content"'
    message: 'Import render too: import { getEntry, render } from "astro:content";'
  - match: 'const\s*\{\s*Content\s*\}\s*=\s*await\s+render\(\s*post\s*\)'
    message: 'Add const { Content } = await render(post);'
  - match: '<article>\s*<Content\s*/>\s*</article>'
    message: 'Put <Content /> inside the article.'
solution: |-
  ---
  import { getEntry, render } from "astro:content";
  const post = await getEntry("blog", "dark-skies");
  const { Content } = await render(post);
  ---
  <article><Content /></article>
```

```quiz
question: "What is `post.body`?"
options:
  - The rendered HTML.
  - The raw Markdown source of the entry.
  - A component.
answer: 1
explain: body is the source text. render(post) gives you the Content component with the HTML.
```
