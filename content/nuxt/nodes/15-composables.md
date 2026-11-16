---
title: Reusable composables
icon: 🔢
branch: components
requires:
  - refs
  - computed
summary: A composable packages reusable reactive logic.
---

In your Nuxt 4 project, save this as `app/composables/useCounter.ts`. A composable packages reusable reactive logic. Each useCounter invocation here creates independent state; shared request-safe state is a separate design choice.

A useful term here is [[composable]]: A function encapsulating reusable reactive behavior, conventionally named useSomething.

```typescript
export function useCounter() {
  const count = ref(0);
  const doubled = computed(() => count.value * 2);
  const increment = () => { count.value += 1; };
  return { count, doubled, increment };
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about reusable composables.
lang: typescript
code: |-
  export function useCounter() {
    const count = ref(0);
    const doubled = computed(() => count.value * 2);
    const increment = () => { count.value -= 1; };
    return { count, doubled, increment };
  }
checks:
  - match: count\.value\s+\+=\s+1
    message: Use count.value += 1 for this step.
  - notMatch: count\.value\s+\-=\s+1
    message: Replace count.value -= 1 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about reusable composables is correct?
options:
  - A composable packages reusable reactive logic. Each useCounter invocation here creates
    independent state; shared request-safe state is a separate design choice.
  - Every composable invocation automatically shares one global count.
  - Composables can only return template strings.
answer: 0
explain: A composable packages reusable reactive logic. Each useCounter invocation here creates
  independent state; shared request-safe state is a separate design choice.
```
