---
title: Typed SEO metadata
icon: "📰"
branch: production
requires: [head]
summary: useSeoMeta sets description, Open Graph and Twitter tags with typed, flat keys.
---
**A link preview post-mortem.** You share your new app in a team chat. The preview shows: no image, the title *Tasks*, and the description *"Loading…"*, scraped from the first text on the page. Not the launch you hoped for.

**What went wrong?** Chat apps and social sites build previews from `<meta>` tags in your HTML. You had none, so they guessed. The tags they look for:

| Tag | Used for |
| --- | --- |
| `description` | Search result snippets |
| `og:title`, `og:description` | Preview title and text (Open Graph) |
| `og:image` | Preview image, ideally 1200×630 |
| `twitter:card` | Preview size on X/Twitter |

**The fix:** `useSeoMeta` sets them all, with one flat, typed key each:

```vue title=app/pages/index.vue
<script setup lang="ts">
useSeoMeta({
  title: 'Tasks: a tiny to-do app',
  description: 'Plan your day in under a minute.',
  ogTitle: 'Tasks: a tiny to-do app',
  ogDescription: 'Plan your day in under a minute.',
  ogImage: 'https://tasks.example.com/og.png',
  twitterCard: 'summary_large_image',
});
</script>
```

Why not `useHead` with a `meta` array? You could, but it's easy to mix up `name=` and `property=` (Open Graph uses `property`). `useSeoMeta` knows which is which, and TypeScript catches typos like `ogImg`.

**Post-mortem lessons:**

1. **Use absolute URLs for `ogImage`.** A chat app fetching `/og.png` has no idea which site that's relative to.
2. **Make data-driven tags reactive**, like titles: `ogTitle: () => post.value?.title`.
3. **Server rendering matters here.** Preview bots don't run JavaScript. Nuxt renders these tags on the server, so the bots see them.
4. **Previews are cached.** After fixing tags, most platforms have a debugger page that refreshes their copy.

```compare typescript
// Next.js: metadata.openGraph = { title, images: [...] }
```

```compare python
# Django: <meta property="og:title"> written by hand
# in each template.
```

```exercise
goal: "Add a description and an Open Graph image (`https://example.com/og.png`) with `useSeoMeta`."
lang: typescript
code: |-
  useSeoMeta({
    title: 'Pricing',
  });
checks:
  - match: "description:\\s*'[^']+'"
    message: "Add description: '...' with some text."
  - match: "ogImage:\\s*'https://example\\.com/og\\.png'"
    message: "Add ogImage: 'https://example.com/og.png'."
solution: |-
  useSeoMeta({
    title: 'Pricing',
    description: 'Simple plans for every team.',
    ogImage: 'https://example.com/og.png',
  });
```

```quiz
question: "Why should `ogImage` be an absolute URL?"
options:
  - Relative URLs are slower.
  - The site fetching the preview doesn't know which domain a relative path belongs to.
  - Nuxt rejects relative paths.
answer: 1
explain: Preview bots read the tag out of context, so the URL must include the domain.
```
