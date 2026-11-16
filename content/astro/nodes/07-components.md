---
title: Your first component
icon: "🧱"
branch: basics
requires: [frontmatter]
summary: Split a page into .astro components, import them, and use them like HTML tags.
---
**Before:** one long page that will only get longer.

```astro title=src/pages/index.astro
<header>
  <a href="/">🚀 Star Notes</a>
  <nav><a href="/blog">Blog</a> <a href="/about">About</a></nav>
</header>
<main>
  <h1>Welcome</h1>
</main>
```

Every other page needs that header too. Copy and paste works until you want to change a link.

**After:** the header moves into its own file.

```astro title=src/components/Header.astro
<header>
  <a href="/">🚀 Star Notes</a>
  <nav><a href="/blog">Blog</a> <a href="/about">About</a></nav>
</header>
```

```astro title=src/pages/index.astro
---
import Header from "../components/Header.astro";
---
<Header />
<main>
  <h1>Welcome</h1>
</main>
```

The page renders exactly the same HTML as before. The difference is that `<Header />` now lives in one place, and every page that imports it gets updates for free.

**What changed, step by step:**

1. Any `.astro` file is a [[component]]. `Header.astro` has no frontmatter because it doesn't need any.
2. The page imports it in its frontmatter, with a path relative to the page. The file extension is required.
3. It's used like an HTML tag. Component names start with a **capital letter**; that's how Astro tells `<Header>` (yours) from `<header>` (the HTML element).
4. Self-closing `<Header />` is fine when you have nothing to put inside.

**Where do components live?** By convention in `src/components/`. Unlike `src/pages/`, that folder has no special meaning: a component in it never becomes a page on its own.

**A page is a component too.** It's simply one Astro places at a URL. Components can import other components, as deep as you like.

**Nothing extra is shipped.** After the build, `<Header />` is gone and only its HTML remains. Splitting a page into fifty components costs the visitor nothing.

```compare javascript
// Like a function that returns an HTML string, called from every page:
import { header } from "./header.js";
```

```compare typescript
// React: import Header from "./Header"; then <Header />. Same idea, no
// runtime.
```

```compare python
# Jinja: {% include "header.html" %}
```

```exercise
goal: "Import the `Footer` component from `../components/Footer.astro` and use it at the end of the page."
code: |-
  ---
  ---
  <main>Hello</main>
checks:
  - match: 'import\s+Footer\s+from\s+["'']\.\./components/Footer\.astro["'']'
    message: Import Footer from "../components/Footer.astro".
  - match: '</main>\s*\n?\s*<Footer\s*/>'
    message: 'Add <Footer /> after </main>.'
solution: |-
  ---
  import Footer from "../components/Footer.astro";
  ---
  <main>Hello</main>
  <Footer />
```

```quiz
question: "Why does `<footer />` (lowercase) not render your Footer component?"
options:
  - Astro components are case-insensitive, so it should work.
  - Lowercase tags are treated as plain HTML elements; components must start with a capital letter.
  - You need to write <footer.astro />.
answer: 1
explain: The capital letter tells Astro the tag is a component, not an HTML element.
```
