---
title: Application plugins
icon: 🔁
branch: components
requires:
  - setup
summary: Nuxt plugins run during app creation and can provide shared capabilities.
---

In your Nuxt 4 project, save this as `app/plugins/shout.ts`. Nuxt plugins run during app creation and can provide shared capabilities. Use a .client suffix for integrations that require browser globals.

```typescript
export default defineNuxtPlugin(() => {
  return { provide: { shout: (text: string) => text.toUpperCase() } };
});
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about application plugins.
lang: typescript
code: |-
  export default defineNuxtPlugin(() => {
    return { provide: { shout: (text: string) => text.toLowerCase() } };
  });
checks:
  - match: text\.toUpperCase\(\)
    message: Use text.toUpperCase() for this step.
  - notMatch: text\.toLowerCase\(\)
    message: Replace text.toLowerCase() in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about application plugins is correct?
options:
  - Nuxt plugins run during app creation and can provide shared capabilities. Use a .client suffix
    for integrations that require browser globals.
  - All plugins run exclusively in the browser.
  - A plugin should store every user’s private data in one module global.
answer: 0
explain: Nuxt plugins run during app creation and can provide shared capabilities. Use a .client
  suffix for integrations that require browser globals.
```
