---
title: Markdown pages
icon: "📝"
branch: content
requires: [layouts]
summary: A Markdown file in src/pages becomes a page, with frontmatter for its data and a layout for its frame.
---
**A story in three files.** Mia wants to write a blog post. She doesn't want to write HTML for every paragraph, so she writes Markdown.

**Chapter 1: the post.** She saves it in `src/pages/`, where every file becomes a page, `.md` files included:

```markdown title=src/pages/posts/first-light.md
---
title: First light
date: 2026-03-02
layout: ../../layouts/PostLayout.astro
---
Last night I pointed the new telescope at **Jupiter**.

## What I saw

- Four moons in a row
- A faint stripe across the planet
```

It's served at `/posts/first-light`. The YAML block at the top is the post's frontmatter: data about the post, rather than the post itself. (Same name as the code fence in .astro files, different language.)

**Chapter 2: the frame.** On its own, Markdown becomes bare HTML: no `<head>`, no styles, no header. The `layout` line in the frontmatter fixes that by pointing at an Astro component, relative to the Markdown file:

```astro title=src/layouts/PostLayout.astro
---
const { frontmatter } = Astro.props;
---
<html lang="en">
  <head><title>{frontmatter.title}</title></head>
  <body>
    <article>
      <h1>{frontmatter.title}</h1>
      <p>Posted on {frontmatter.date}</p>
      <slot />
    </article>
  </body>
</html>
```

The layout receives the frontmatter as a prop called `frontmatter`, and the rendered Markdown arrives through the default [slot](node:slots).

**Chapter 3: the result.** A full page, with the title in the browser tab, a date line, and Mia's post as proper HTML: `<strong>Jupiter</strong>`, an `<h2>` and a list. Headings even get an `id` automatically (`<h2 id="what-i-saw">`), so links like `#what-i-saw` just work.

**The sequel.** A handful of posts in `src/pages/` is fine. Once you have dozens and want to sort, filter and validate them, [content collections](node:collections) are the better home. And if a post needs a component in the middle, look at [MDX](node:mdx).

```compare javascript
// Without Astro: run marked or remark over the file and paste the HTML
// into a template.
```

```compare typescript
// Next.js needs a plugin such as @next/mdx; Astro renders .md out of
// the box.
```

```compare python
# Like Pelican or MkDocs: Markdown files with metadata, rendered
# through a theme.
```

```exercise
goal: "This post renders without the site's frame. Add a `layout` line to its frontmatter pointing at `../layouts/PostLayout.astro`."
lang: markdown
code: |-
  ---
  title: Hello Markdown
  ---
  This is my first post.
checks:
  - match: '^layout:\s*["'']?\.\./layouts/PostLayout\.astro["'']?\s*$'
    message: 'Add layout: ../layouts/PostLayout.astro to the frontmatter.'
  - match: '^---\s*\n[\s\S]*layout:[\s\S]*\n---'
    message: The layout line belongs between the --- lines.
solution: |-
  ---
  title: Hello Markdown
  layout: ../layouts/PostLayout.astro
  ---
  This is my first post.
```

```quiz
question: "How does a Markdown page's layout read the post title?"
options:
  - "Astro.props.title"
  - "Astro.props.frontmatter.title"
  - "It can't; layouts only get the HTML."
answer: 1
explain: Markdown layouts receive the file's YAML frontmatter as the frontmatter prop.
```
