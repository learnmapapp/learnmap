---
title: Application plugins
icon: "🔌"
branch: components
requires: [setup]
summary: Files in app/plugins run once at startup, to configure libraries or provide app-wide helpers.
---
**Startup checklist.** Some things should happen exactly once, when the app boots, before any page renders:

- [ ] register a Vue library (a charting or date-picker plugin)
- [ ] set up error reporting
- [ ] provide a helper every component can use

Components are the wrong place for this, because they come and go. Composables run each time they're called. Nuxt's answer is the [[plugin]]: a file in `app/plugins/` that runs **once per app start**. That's once per request on the server, and once in the browser.

**Ticking off item 3: an app-wide helper.**

```typescript title=app/plugins/money.ts
export default defineNuxtPlugin(() => {
  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'EUR',
  });

  return {
    provide: {
      money: (cents: number) => formatter.format(cents / 100),
    },
  };
});
```

Everything under `provide` becomes available across the app with a `$` in front: `$money`. The [next lesson](node:injections) shows how to use it.

**Ticking off item 1: a Vue library.** The plugin receives `nuxtApp`, and `nuxtApp.vueApp` is the regular Vue app, the one you'd call `app.use()` on in plain Vue:

```typescript title=app/plugins/charts.client.ts
import Charts from 'some-chart-library';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Charts);
});
```

**Notice the `.client` in that file name.** Chart libraries draw on a canvas and need `window`, so this plugin should only run in the browser. The suffixes:

| File name | Runs |
| --- | --- |
| `money.ts` | Server and browser |
| `charts.client.ts` | Browser only |
| `logging.server.ts` | Server only |

**Order.** Plugins run in alphabetical file order. When one depends on another, prefix them: `01.auth.ts`, `02.api.ts`.

```compare typescript
// Plain Vue: createApp(App).use(Charts) in main.ts.
// Nuxt has no main.ts; plugins replace it.
```

```compare python
# Flask: init_app(app) calls for extensions,
# made once at startup.
```

```exercise
goal: "Provide a `shout` helper that upper-cases a string, available as `$shout`."
lang: typescript
code: |-
  export default defineNuxtPlugin(() => {
    return {};
  });
checks:
  - match: 'provide:\s*\{'
    message: "Return an object with a provide key: return { provide: { ... } }."
  - match: 'shout:\s*\(\s*text:\s*string\s*\)\s*=>\s*text\.toUpperCase\(\)'
    message: "Inside provide, add shout: (text: string) => text.toUpperCase()."
solution: |-
  export default defineNuxtPlugin(() => {
    return {
      provide: {
        shout: (text: string) => text.toUpperCase(),
      },
    };
  });
```

```quiz
question: "A plugin uses `localStorage`. The server crashes on startup. What's the cleanest fix?"
options:
  - Wrap every line in try/catch.
  - Rename the file to end in .client.ts, so it only runs in the browser.
  - Move it to app/composables.
answer: 1
explain: The .client suffix keeps a plugin out of server rendering, where localStorage doesn't exist.
```
