---
title: Route middleware
icon: "🚧"
branch: routing
requires: [pages]
summary: Run a check before a page opens, and redirect with navigateTo when it fails.
---
**The bouncer at the door.** Some pages, such as account settings, should only open for signed-in users. You *could* check at the top of every such page, but then each page loads, notices, and redirects. [[route middleware|Route middleware]] checks **before** the page loads, so it never appears for the wrong person.

**Hire a bouncer:**

```typescript title=app/middleware/auth.ts
export default defineNuxtRouteMiddleware((to) => {
  const user = useState<{ name: string } | null>('user');

  if (!user.value) {
    return navigateTo(`/login?next=${to.fullPath}`);
  }
});
```

The function gets `to` (where the user is going) and `from` (where they came from). What it returns decides what happens:

| Return | Result |
| --- | --- |
| nothing | The navigation goes ahead |
| `navigateTo('/login')` | Redirect somewhere else |
| `abortNavigation()` | Stop, and stay where you are |

**Post the bouncer at a door.** A page opts in by name, the file name without `.ts`:

```vue title=app/pages/settings.vue
<script setup lang="ts">
definePageMeta({ middleware: 'auth' });
</script>
```

**Or at every door.** Add `.global` to the file name, `app/middleware/analytics.global.ts`, and it runs on every navigation. Useful for logging; be careful with redirects, or the login page may end up redirecting to itself.

**It runs on the server too.** When someone opens `/settings` directly, the middleware runs during [[server-side rendering|server rendering]] and redirects before any HTML is sent. When they click a link inside the app, it runs in the browser.

```warn
Route middleware guards **pages**, not data. A determined user can still call your API directly, so the API has to check for itself. That's the topic of [server authorization](node:authorization).
```

```compare typescript
// Next.js: a middleware.ts file with matchers.
// vue-router: router.beforeEach((to) => ...).
```

```compare python
# Django: the @login_required decorator on a view.
```

```exercise
goal: "Redirect visitors who aren't admins to `/`: return `navigateTo('/')` when `isAdmin` is false."
lang: typescript
code: |-
  export default defineNuxtRouteMiddleware(() => {
    const isAdmin = useState('isAdmin', () => false);
    if (!isAdmin.value) {
    }
  });
checks:
  - match: 'return navigateTo\(''/''\)'
    message: Inside the if, return navigateTo('/').
solution: |-
  export default defineNuxtRouteMiddleware(() => {
    const isAdmin = useState('isAdmin', () => false);
    if (!isAdmin.value) {
      return navigateTo('/');
    }
  });
```

```quiz
question: "A middleware calls `navigateTo('/login')` but forgets `return`. What happens?"
options:
  - The redirect happens as normal.
  - The redirect may be ignored, and the original page can still load.
  - Nuxt throws an error.
answer: 1
explain: Middleware decides by its return value. Always return navigateTo(...).
```
