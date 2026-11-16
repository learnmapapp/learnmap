---
title: Environment variables
icon: "🔐"
branch: server
requires: [setup]
summary: Keep API keys and settings out of your code with .env files and the typed astro:env module.
---
**FAQ about configuration and secrets.**

**Q: Where do I put my API key?**

In a `.env` file in the project root, never in your code:

```text title=.env
WEATHER_API_KEY=your-key-here
PUBLIC_SITE_NAME=Star Notes
```

Add `.env` to `.gitignore` so it never ends up in Git. On your host, set the same variables in its dashboard.

**Q: How do I read them?**

The simple way is `import.meta.env.WEATHER_API_KEY`. The safer way is `astro:env`: declare each variable in the config, with its type and where it may be used:

```javascript title=astro.config.mjs
import { defineConfig, envField } from "astro/config";

export default defineConfig({
  env: {
    schema: {
      WEATHER_API_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
      PUBLIC_SITE_NAME: envField.string({
        context: "client",
        access: "public",
        default: "Star Notes",
      }),
    },
  },
});
```

Then import them by name:

```astro title=src/pages/weather.astro
---
import { WEATHER_API_KEY } from "astro:env/server";
import { PUBLIC_SITE_NAME } from "astro:env/client";
---
<h1>{PUBLIC_SITE_NAME} weather</h1>
```

**Q: What do `context` and `access` mean?**

- `context: "server"` variables can only be imported from `astro:env/server`, so they're usable in frontmatter, endpoints and middleware, never in browser scripts.
- `context: "client"` variables can be used anywhere, including `<script>` tags and islands. They end up in the JavaScript sent to visitors, so they must be `access: "public"`.
- `access: "secret"` values are never written into the build output.

**Q: What if a variable is missing?**

With a schema, Astro checks it at startup and tells you which one is missing or has the wrong type. No more `undefined` showing up in production.

**Q: Why the `PUBLIC_` prefix?**

It's the convention for `import.meta.env`: only variables starting with `PUBLIC_` are exposed to browser code. With `astro:env` the schema decides, but keeping the prefix makes it obvious at a glance.

**Q: Are there built-in variables?**

Yes: `import.meta.env.DEV` and `PROD` (booleans), `MODE`, `SITE` (your configured `site`) and `BASE_URL`.

```compare javascript
// Node: process.env.WEATHER_API_KEY, usually loaded with dotenv.
```

```compare typescript
// Next.js: NEXT_PUBLIC_ prefix for browser-visible variables. Same
// idea, different prefix.
```

```compare python
# os.environ["WEATHER_API_KEY"], often loaded with python-dotenv.
```

```exercise
goal: "Declare `DATABASE_URL` as a secret server-side string: `envField.string({ context: \"server\", access: \"secret\" })`."
lang: javascript
code: |-
  import { defineConfig, envField } from "astro/config";

  export default defineConfig({
    env: {
      schema: {
      },
    },
  });
checks:
  - match: 'DATABASE_URL:\s*envField\.string\(\s*\{\s*context:\s*"server"\s*,\s*access:\s*"secret"\s*\}\s*\)'
    message: 'Add DATABASE_URL: envField.string({ context: "server", access: "secret" }),'
solution: |-
  import { defineConfig, envField } from "astro/config";

  export default defineConfig({
    env: {
      schema: {
        DATABASE_URL: envField.string({ context: "server", access: "secret" }),
      },
    },
  });
```

```quiz
question: "Can a `<script>` tag in a component import `WEATHER_API_KEY` from `astro:env/server`?"
options:
  - Yes, if the key is in .env.
  - No; server variables can't be imported into code that runs in the browser.
  - Only in the dev server.
answer: 1
explain: "That's the point of context \"server\": the secret can never be bundled into browser code."
```
