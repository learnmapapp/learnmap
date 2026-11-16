---
title: Route middleware
icon: 🧩
branch: routing
requires:
  - pages
summary: A .global route middleware runs on navigation.
---

In your Nuxt 4 project, save this as `app/middleware/legacy.global.ts`. A .global route middleware runs on navigation. Return navigation results and avoid redirecting a destination back to itself. This does not replace API authorization.

```typescript
export default defineNuxtRouteMiddleware((to) => {
  if (to.path === "/old") return navigateTo("/about", { redirectCode: 301 });
});
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about route middleware.
lang: typescript
code: |-
  export default defineNuxtRouteMiddleware((to) => {
    if (to.path === "/older") return navigateTo("/about", { redirectCode: 301 });
  });
checks:
  - match: to\.path\s+===\s+"/old"
    message: Use to.path === "/old" for this step.
  - notMatch: to\.path\s+===\s+"/older"
    message: Replace to.path === "/older" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What should route middleware return when redirecting?
options:
  - The result of `navigateTo(...)`.
  - The literal string `"redirected"` only.
  - An unrelated component's markup.
answer: 0
explain: Returning the navigation result lets the router handle the redirect correctly.
```
