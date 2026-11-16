---
title: Page metadata
icon: "🔖"
branch: routing
requires: [layouts]
summary: Give every page a title, description, canonical URL and social preview through layout props.
---
**Checklist: what every page's `<head>` needs.** Here's what each tag is for, and where it shows up.

- **`<title>`** appears in the browser tab and as the headline in search results.
- **`<meta name="description">`** is often used as the snippet under the search result.
- **`<link rel="canonical">`** names the one true URL, so `/about` and `/about/` don't count as duplicates.
- **Open Graph tags (`og:title`, `og:description`, `og:image`)** build the preview card when someone shares the link in chat or social media.
- **`<html lang="en">`** tells screen readers and translators the language.

**Where it goes: the layout.** Add props for the parts that change per page, with sensible defaults:

```astro title=src/layouts/BaseLayout.astro
---
interface Props {
  title: string;
  description?: string;
  image?: string;
}

const {
  title,
  description = "Notes about the night sky.",
  image = "/og-default.png",
} = Astro.props;

const canonical = new URL(Astro.url.pathname, Astro.site);
const imageUrl = new URL(image, Astro.site);
---
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title} · Star Notes</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={imageUrl} />
  </head>
  <body><slot /></body>
</html>
```

**Every page fills in what it knows:**

```astro
<BaseLayout title={post.data.title} description={post.data.summary}>
```

**Where `Astro.site` comes from.** Canonical and Open Graph URLs must be absolute, including the domain. Set it once in the config:

```javascript title=astro.config.mjs
export default defineConfig({ site: "https://starnotes.example" });
```

`new URL(path, Astro.site)` then builds `https://starnotes.example/blog/first-light`. The [sitemap](node:sitemap) and [RSS feed](node:rss) need `site` too.

**Checking your work:** view the page source in the browser and read the `<head>`, or paste a URL into a social media preview tool after deploying.

```compare javascript
// document.title = "..." at runtime is too late for crawlers that
// don't run JavaScript.
```

```compare typescript
// Next.js: export const metadata = { title, description, openGraph: {
// ... } }
```

```compare python
# Jinja: {% block title %}{% endblock %} and {% block description %} in
# base.html.
```

```exercise
goal: "Add a meta description to the head, using the `description` prop: `<meta name=\"description\" content={description} />`."
code: |-
  ---
  const { title, description } = Astro.props;
  ---
  <head>
    <title>{title}</title>
  </head>
checks:
  - match: '<meta\s+name="description"\s+content=\{\s*description\s*\}\s*/?>'
    message: 'Add <meta name="description" content={description} />'
solution: |-
  ---
  const { title, description } = Astro.props;
  ---
  <head>
    <title>{title}</title>
    <meta name="description" content={description} />
  </head>
```

```quiz
question: "Why must the `og:image` URL include the full domain?"
options:
  - Search engines reject relative URLs in any tag.
  - The preview is built by another service, outside your site, so a relative path means nothing there.
  - It's an Astro requirement.
answer: 1
explain: Chat apps and social sites fetch the image themselves, so they need an absolute URL.
```
