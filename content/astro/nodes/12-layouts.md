---
title: Layouts
icon: "🏛️"
branch: basics
requires: [props, slots]
summary: Build a layout component that wraps every page with the same html, head and header.
---
**A design walkthrough.** Three pages, and every one repeats `<html>`, `<head>`, the title, the stylesheet and the header. Let's design a component to remove the duplication.

**Decision 1: what changes per page?** The title and the main content. Everything else is shared.

**Decision 2: how does each varying part get in?** The title is a short string, so it's a [prop](node:props). The content is markup, so it's a [slot](node:slots).

**Decision 3: where does it live?** By convention `src/layouts/`. Like `src/components/`, that folder has no special meaning; a [[layout]] is an ordinary component.

The result:

```astro title=src/layouts/BaseLayout.astro
---
import Header from "../components/Header.astro";

interface Props {
  title: string;
}

const { title } = Astro.props;
---
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title} · Star Notes</title>
  </head>
  <body>
    <Header />
    <main>
      <slot />
    </main>
  </body>
</html>
```

And a page using it:

```astro title=src/pages/about.astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
---
<BaseLayout title="About">
  <h1>About us</h1>
  <p>We write about the night sky.</p>
</BaseLayout>
```

The page now only contains what's unique to it. Change the header or add a font to `<head>`, and every page picks it up.

**Decision 4: what else might vary?** Grow the layout as needs appear:

- an optional `description` prop for the meta description (see [SEO](node:seo));
- a named slot, `<slot name="head" />`, inside `<head>` for page-specific scripts or styles;
- a `BlogLayout` that itself uses `BaseLayout` and adds an author box. Layouts nest like any component.

**Markdown pages can use layouts too**; you'll see how in the [Markdown lesson](node:markdown).

```compare javascript
// Like a function wrapping every page's content: layout({ title, body
// })
```

```compare typescript
// Next.js: app/layout.tsx with {children}. Same role, explicit import
// in Astro.
```

```compare python
# Jinja: {% extends "base.html" %} with {% block content %}.
```

```exercise
goal: "Wrap the page in the layout: replace the `<div>` with `<BaseLayout title=\"Contact\">` and its closing tag."
code: |-
  ---
  import BaseLayout from "../layouts/BaseLayout.astro";
  ---
  <div>
    <h1>Contact</h1>
  </div>
checks:
  - match: '<BaseLayout\s+title="Contact">\s*<h1>Contact</h1>\s*</BaseLayout>'
    message: 'Wrap the heading in <BaseLayout title="Contact">...</BaseLayout>.'
solution: |-
  ---
  import BaseLayout from "../layouts/BaseLayout.astro";
  ---
  <BaseLayout title="Contact">
    <h1>Contact</h1>
  </BaseLayout>
```

```quiz
question: "In the BaseLayout above, where does the page's `<h1>` end up?"
options:
  - "In <head>, next to the title."
  - "Inside <main>, where the layout has <slot />."
  - "Before <html>."
answer: 1
explain: The page's children replace the layout's slot, which sits inside main.
```
