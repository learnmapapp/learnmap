---
title: SSR-safe shared state
icon: 💬
branch: data
requires:
  - refs
summary: useState provides keyed shared state scoped correctly for server requests and hydration.
---

In your Nuxt 4 project, save this as `app/composables/useLessonCount.ts`. useState provides keyed shared state scoped correctly for server requests and hydration. Store serializable values; avoid module-level mutable refs for per-user SSR data.

A useful term here is [[useState]]: Nuxt’s keyed, serializable, SSR-aware shared state composable.

```typescript
export function useLessonCount() {
  return useState<number>("lesson-count", () => 0);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about ssr-safe shared state.
lang: typescript
code: |-
  export function useLessonCount() {
    return useState<number>("lesson-count", () => 1);
  }
checks:
  - match: \(\)\s+=>\s+0
    message: Use () => 0 for this step.
  - notMatch: \(\)\s+=>\s+1
    message: Replace () => 1 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about ssr-safe shared state is correct?
options:
  - useState can safely serialize any function or class instance.
  - useState provides keyed shared state scoped correctly for server requests and hydration. Store
    serializable values; avoid module-level mutable refs for per-user SSR data.
  - A module-level ref is automatically isolated between users.
answer: 1
explain: useState provides keyed shared state scoped correctly for server requests and hydration.
  Store serializable values; avoid module-level mutable refs for per-user SSR data.
```
