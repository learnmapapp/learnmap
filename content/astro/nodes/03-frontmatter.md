---
title: Component frontmatter
icon: "📜"
branch: basics
requires: [setup]
summary: The code fence at the top of an .astro file, what it can do, and when it runs.
---
**Q: What's that block between the `---` lines?**

It's called the component's [[frontmatter]]: a piece of JavaScript or TypeScript that runs before the HTML below it is produced. Anything you declare there can be used in the template:

```astro title=src/pages/about.astro
---
import { readFile } from "node:fs/promises";

const title = "About this site";
const started = new Date(2024, 0, 15);
const years = new Date().getFullYear() - started.getFullYear();
const motto = (await readFile("motto.txt", "utf8")).trim();
---
<h1>{title}</h1>
<p>Running for {years} years. Motto: {motto}</p>
```

**Q: When does it run?**

For a normal static site: once, during `npm run build`. The result is frozen into the HTML file. (In the dev server it runs on every page load, so you see changes immediately.) With [server rendering](node:server-rendering) turned on, it can also run on every request.

**Q: Can it use `await`?**

Yes, at the top level, as above. That's how you read files, query a CMS or [fetch an API](node:fetch) before rendering.

**Q: Can it use Node APIs and secrets?**

Yes. It runs on your machine or server, never in the browser. You can read files, use environment variables and API keys, and none of it leaks to visitors. Only the resulting HTML is sent.

**Q: Then how do I respond to a click?**

Not here. Frontmatter is finished before the page reaches the browser, so `const count = 0` can't change when someone clicks. For browser behavior you add a [script](node:scripts) or an interactive [island](node:hydration).

**Q: What else goes in the frontmatter?**

- `import` statements, for components, data files and libraries.
- Reading the component's inputs, `Astro.props` ([props](node:props)).
- Typing those inputs with a TypeScript `interface Props`.

**Q: Is the fence required?**

No. A file with only HTML is a valid Astro component. Add the fence when you need code.

```compare javascript
// Like a Node script that builds an HTML string, run once at build
// time:
const html = `<h1>${title}</h1>`;
```

```compare typescript
// Frontmatter is TypeScript-ready: type annotations just work.
const years: number = new Date().getFullYear() - 2024;
```

```compare python
# Like the view function that prepares a template's context:
def about(): return render("about.html", title="About this site")
```

```exercise
goal: "Move the hard-coded price into the frontmatter: declare `const price = 12;` between the fences, and use `{price}` in the paragraph."
code: |-
  ---
  ---
  <p>Tickets cost 12 euros.</p>
checks:
  - match: '---\s*\n\s*const\s+price\s*=\s*12\s*;?\s*\n\s*---'
    message: Declare const price = 12; between the --- lines.
  - match: '<p>Tickets cost \{\s*price\s*\} euros\.</p>'
    message: 'Use {price} in the paragraph.'
solution: |-
  ---
  const price = 12;
  ---
  <p>Tickets cost {price} euros.</p>
```

```quiz
question: "You put an API key in a frontmatter variable and use it to fetch data. Can visitors see the key?"
options:
  - Yes, all page code is sent to the browser.
  - No; frontmatter runs on the server or at build time, and only the HTML output is sent.
  - Only in the dev server.
answer: 1
explain: Only what you put in the HTML reaches the browser. Just don't print the key in the template!
```
