---
title: Runtime configuration
icon: "⚙️"
branch: server
requires: [setup]
summary: runtimeConfig holds settings that can change per environment; only the public part reaches the browser.
---
**Sorting game.** Your app needs some settings. For each one, decide: may the browser see it, or must it stay on the server?

1. The base URL of your public API
2. A Stripe **secret** key
3. The site's display name
4. The database password

Answer: 1 and 3 are **public**; 2 and 4 are **server-only**. Now put them in `nuxt.config.ts`:

```typescript title=nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    stripeSecret: '',
    databasePassword: '',
    public: {
      apiBase: '/api',
      siteName: 'Tasks',
    },
  },
});
```

**The rule: anything under `public` is sent to the browser; everything else stays on the server.** The empty strings are placeholders. Never put real secrets in this file: it goes into git.

**Real values come from environment variables** when the app *runs*, not when it's built. Nuxt maps them by name:

```text title=.env
NUXT_STRIPE_SECRET=sk_test_your-key-here
NUXT_DATABASE_PASSWORD=your-password-here
NUXT_PUBLIC_API_BASE=https://api.example.com
```

The pattern is `NUXT_`, then the key in UPPER_SNAKE_CASE, with `PUBLIC_` for public keys. In development, Nuxt reads `.env` for you. In production, set real environment variables on your host. That's why it's called *runtime* config: one build can run in staging and production with different settings.

**Reading it:**

```typescript title=server/api/checkout.post.ts
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  // config.stripeSecret and config.public.apiBase are here
});
```

```vue
<script setup lang="ts">
const config = useRuntimeConfig();
// Only config.public.* has values in the browser.
</script>
```

```warn
Add `.env` to `.gitignore`. Fresh Nuxt projects already do; check yours.
```

```compare javascript
// process.env.STRIPE_SECRET works in Node, but nothing
// stops it ending up in a browser bundle by accident.
```

```compare python
# Django: settings.py with os.environ['DB_PASSWORD'],
# and secrets kept out of templates.
```

```exercise
goal: "Fix the leak: `apiSecret` is under `public`. Move it up, so it's server-only."
lang: typescript
code: |-
  export default defineNuxtConfig({
    runtimeConfig: {
      public: {
        apiBase: '/api',
        apiSecret: '',
      },
    },
  });
checks:
  - match: 'runtimeConfig:\s*\{\s*apiSecret:'
    message: Put apiSecret directly inside runtimeConfig, before public.
  - match: 'public:\s*\{\s*apiBase:\s*''/api'',?\s*\}'
    message: Leave only apiBase inside public.
solution: |-
  export default defineNuxtConfig({
    runtimeConfig: {
      apiSecret: '',
      public: {
        apiBase: '/api',
      },
    },
  });
```

```quiz
question: "Which environment variable overrides `runtimeConfig.public.siteName`?"
options:
  - SITE_NAME
  - NUXT_PUBLIC_SITE_NAME
  - PUBLIC_SITENAME
answer: 1
explain: The prefix is NUXT_, then PUBLIC_ for public keys, then the key in UPPER_SNAKE_CASE.
```
