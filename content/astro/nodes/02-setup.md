---
title: Create a project
icon: "🛠️"
branch: basics
requires: [astro]
summary: Create a project with npm create astro, find your way around its folders, and run the dev server.
---
**Step 1: create it.** You need Node.js installed. In a terminal:

```repl shell
> npm create astro@latest my-site
```

The wizard asks a few questions: pick the minimal ("empty") template for this course, say yes to installing dependencies, and yes to Git if you like. It creates a `my-site` folder.

**Step 2: look around.** The important parts:

```text
my-site/
  astro.config.mjs     settings and integrations
  package.json         scripts and dependencies
  public/              files copied as they are (favicon, robots.txt)
  src/
    pages/             every file here is a page of the site
      index.astro      the home page, at /
```

You'll add `src/components/` and `src/layouts/` yourself as the site grows. Only `src/pages/` has a special meaning; the other folder names are conventions.

**Step 3: run it.**

```repl shell
> cd my-site
> npm run dev
  astro  ready in 312 ms
  Local    http://localhost:4321/
```

Open `http://localhost:4321` in the browser. Now edit `src/pages/index.astro` and save: the page updates instantly. This dev server is where you'll spend most of your time.

**Step 4: build for real.** When you're ready to publish:

```repl shell
> npm run build
> npm run preview
```

`build` renders every page to HTML files in `dist/`. That folder is the whole website: upload it to any static host. `preview` serves `dist/` locally so you can check the result first.

**The three scripts, side by side:**

| Command | What it does | When |
| --- | --- | --- |
| `npm run dev` | a live-reloading development server | while you work |
| `npm run build` | writes the finished site to `dist/` | before publishing |
| `npm run preview` | serves `dist/` locally | to check a build |

**Adding features** later is often one command: `npx astro add react`, `npx astro add sitemap`. It installs the package and updates `astro.config.mjs` for you.

```compare javascript
// Vite: npm create vite@latest, then npm run dev / build / preview.
// Astro is built on Vite.
```

```compare python
# Like a static site generator: pelican-quickstart, then pelican
# content.
```

```exercise
goal: "Complete the commands: go into the project folder, then start the development server."
lang: shell
code: |-
  npm create astro@latest my-site
  cd
  npm run
checks:
  - match: '^cd\s+my-site\s*$'
    message: Write cd my-site
  - match: '^npm\s+run\s+dev\s*$'
    message: Write npm run dev
solution: |-
  npm create astro@latest my-site
  cd my-site
  npm run dev
```

```quiz
question: "Which folder holds the finished website after `npm run build`?"
options:
  - "src/pages/"
  - "public/"
  - "dist/"
answer: 2
explain: Build output goes to dist/. You upload that folder to a static host.
```
