---
title: Create a Nuxt project
icon: "🛠️"
branch: basics
requires: [nuxt]
summary: Create a project with npm create nuxt, find your way around its folders, and run it.
---
Let's get a real project running. You need **Node.js 20 or newer**; check with `node --version`.

**Step 1. Create the project.**

```repl shell
> npm create nuxt@latest my-app
```

The installer asks a few questions: which package manager to use, whether to start a git repository, and whether to add any official modules. The defaults are fine; you can skip the modules for now.

**Step 2. Start the dev server.**

```repl shell
> cd my-app
> npm run dev
  Nuxt 4.x with Nitro
  Local:    http://localhost:3000/
```

Open http://localhost:3000. Leave the server running: when you save a file, the browser updates by itself.

**Step 3. Look around.** A fresh project is small:

```text
my-app/
  app/
    app.vue          the root component
  public/            files served as-is (favicon, robots.txt)
  server/            your API, added later
  nuxt.config.ts     project settings
  package.json
```

Nuxt 4 keeps your Vue code in `app/`. When you add `app/pages/`, `app/components/` or `app/layouts/`, Nuxt notices the folder and starts using it. Server code goes in `server/`, outside `app/`, because it never runs in the browser.

**Step 4. Meet the config file.** `nuxt.config.ts` is where you switch features on:

```typescript title=nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
});
```

`defineNuxtConfig` isn't imported: Nuxt provides it. `compatibilityDate` pins the behavior of the server engine, so an upgrade doesn't quietly change it. `devtools` adds a floating panel to the page in dev mode, with routes, components and state. It's worth a look.

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with live reload |
| `npm run build` | Production build into `.output/` |
| `npm run preview` | Runs that build locally |

```exercise
goal: "Switch on the Nuxt DevTools: add `devtools: { enabled: true }` to the config."
lang: typescript
code: |-
  export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
  });
checks:
  - match: 'devtools:\s*\{\s*enabled:\s*true\s*\}'
    message: "Add devtools: { enabled: true }, inside defineNuxtConfig."
solution: |-
  export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
  });
```

```quiz
question: "You create `app/components/Card.vue` while the dev server is running. What do you need to do before using it?"
options:
  - Register it in nuxt.config.ts.
  - Nothing. Nuxt picks up new files in its folders automatically.
  - Restart the dev server.
answer: 1
explain: Nuxt watches its folders. New components, pages and composables are picked up while it runs.
```
