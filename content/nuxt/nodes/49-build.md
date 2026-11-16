---
title: Build and run production
icon: "🚀"
branch: production
requires: [setup]
summary: nuxt build creates a self-contained .output folder; run it with Node, or generate a static site instead.
---
**Moving day.** Your app has lived in `npm run dev`, a development server built for fast feedback. It's not meant for real visitors: it compiles on demand, keeps debugging tools around, and skips optimizations. Time to pack up.

**Packing: the build.**

```repl shell
> npm run build
> node .output/server/index.mjs
Listening on http://[::]:3000
```

`npm run build` runs `nuxt build`, which compiles, bundles and minifies everything into **`.output/`**:

```text
.output/
  public/          static files: JS, CSS, images
  server/
    index.mjs      the server entry point
    chunks/        your pages and API routes, compiled
```

**The box is self-contained.** `.output` includes the dependencies it needs. On the server you deploy to, you don't need `node_modules` or your source code: copy `.output`, then run `node .output/server/index.mjs`. Set the port with the `PORT` environment variable, and remember your [runtime config](node:runtime-config) variables, like `NUXT_API_SECRET`.

**Trying it locally first:** `npm run preview` runs the build on your machine, so you can click around before deploying. Bugs that only appear in production builds show up here, not in dev.

**Moving somewhere without Node?** Nuxt's server engine has **presets** for many hosts: Vercel, Netlify, Cloudflare, Deno, AWS Lambda and more. Most are detected automatically when you build on that platform; otherwise set one:

```repl shell
> NITRO_PRESET=cloudflare_pages npm run build
```

**No server at all?** If every page can be [prerendered](node:prerender), `nuxt generate` produces a static site in `.output/public` that any file host can serve. Your API routes don't exist at runtime in that case, so it only fits sites without a live backend.

**Moving-day checklist:**

| Check | Why |
| --- | --- |
| `npm run build` passes with no type errors | The build doesn't type-check by default; run `npx nuxt typecheck` too |
| `npm run preview` looks right | Production bugs show up here |
| Environment variables set on the host | Runtime config reads them at startup |
| `.env` not deployed | It's for development only |

```compare typescript
// Next.js: next build, then next start,
// or output: 'standalone' for a self-contained folder.
```

```compare python
# Django: collectstatic, then gunicorn instead of
# runserver in production.
```

```exercise
goal: "Add a `start` script that runs the built server with Node."
lang: text
code: |-
  "scripts": {
    "build": "nuxt build",
    "start": ""
  }
checks:
  - match: '"start":\s*"node \.output/server/index\.mjs"'
    message: 'Set "start" to "node .output/server/index.mjs".'
solution: |-
  "scripts": {
    "build": "nuxt build",
    "start": "node .output/server/index.mjs"
  }
```

```quiz
question: "What do you need to copy to a Node server to run a built Nuxt app?"
options:
  - The whole project, including node_modules.
  - Just the .output folder.
  - The app/ and server/ folders.
answer: 1
explain: The build output is self-contained, with its own dependencies included.
```
