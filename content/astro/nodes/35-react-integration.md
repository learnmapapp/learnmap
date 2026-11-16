---
title: Add React support
icon: 🛠️
branch: islands
requires:
  - setup
summary: Run this inside your practice Astro project to install and configure React support.
---

In your Astro project, save this as `terminal command`. Run this inside your practice Astro project to install and configure React support. Create a `Counter.jsx` component before using the next island examples.

```shell
npx astro add react
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

Create `src/components/Counter.jsx` before the hydration lessons:

```jsx
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

This component owns the browser state. The Astro parent decides when its JavaScript loads.

```exercise
goal: Repair the starting example using what you learned about add react support.
lang: shell
code: npx astro add vue
checks:
  - match: npx\s+astro\s+add\s+react
    message: Use npx astro add react for this step.
  - notMatch: npx\s+astro\s+add\s+vue
    message: Replace npx astro add vue in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does adding React integration enable?
options:
  - Automatic hydration of every Astro component.
  - Replacement of Astro's file-based router.
  - Rendering React components and hydrating selected ones.
answer: 2
explain: The integration supplies a renderer; client directives still choose hydration behavior.
```
