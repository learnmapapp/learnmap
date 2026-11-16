---
title: Meet Astro
icon: "🚀"
branch: core
requires: []
summary: What Astro is, what an .astro file looks like, and why it ships so little JavaScript.
kind: hub
---
Astro is a framework for building websites, especially content-heavy ones: blogs, docs, marketing sites, portfolios. You write components, much like in React or Vue. The difference is what reaches the browser: Astro renders your components to **plain HTML** on the server or at build time, and by default sends **no JavaScript at all**. The pages load fast because there's nothing to download and run first.

When a part of the page does need to be interactive, like a search box or an image carousel, you opt in for just that part. Astro calls those parts *islands*; you'll meet them later in the course.

**Here's a complete page.** In an Astro project (the [next lesson](node:setup) shows how to create one), every file in `src/pages/` becomes a page of the site:

```astro title=src/pages/index.astro
---
const name = "Astro";
const today = new Date().toDateString();
---
<html lang="en">
  <head>
    <title>My first page</title>
  </head>
  <body>
    <h1>Hello, {name}!</h1>
    <p>Built on {today}.</p>
  </body>
</html>
```

Visit the site's home page and you see "Hello, Astro!" and a date. Two parts to notice:

1. **Between the `---` lines** is JavaScript (or TypeScript) that runs while the page is being built. It never reaches the browser.
2. **Below it** is HTML, with `{curly braces}` to insert values from the code above.

That's the whole format. Open the browser's dev tools on that page, and you'll find just the HTML: no framework, no bundle.

**Three things that make Astro different:**

- **HTML first.** Components produce HTML. JavaScript in the browser is the exception, added per component.
- **Bring your own UI framework.** React, Vue, Svelte, Solid and others work inside Astro, for the parts that need them.
- **Content built in.** Markdown pages, validated collections of blog posts, image optimization and RSS are all part of the toolkit.

**How this course works.** Each lesson has a short explanation, an exercise you solve in the browser (the page checks your code as you type), and a quick question. The map shows how lessons build on each other; start with the foundations, or pick a goal and follow its route.

```compare javascript
// A plain HTML page with a script that builds the text in the browser:
document.querySelector("h1").textContent = `Hello, ${name}!`;
// Astro does this work before the page is sent, so the browser gets
// finished HTML.
```

```compare python
# Like a Jinja or Django template rendered on the server:
# <h1>Hello, {{ name }}!</h1>
```

```exercise
goal: "The page should greet `Astro`. Use the `name` variable in the heading instead of the hard-coded `world`."
code: |-
  ---
  const name = "Astro";
  ---
  <h1>Hello, world!</h1>
checks:
  - match: '<h1>Hello, \{\s*name\s*\}!</h1>'
    message: 'Write <h1>Hello, {name}!</h1>'
solution: |-
  ---
  const name = "Astro";
  ---
  <h1>Hello, {name}!</h1>
```

```quiz
question: "Where does the code between the `---` lines of an .astro file run?"
options:
  - In the visitor's browser, after the page loads.
  - On the server or at build time, before the HTML is sent.
  - In both places.
answer: 1
explain: Frontmatter code produces the HTML; none of it is sent to the browser.
```
