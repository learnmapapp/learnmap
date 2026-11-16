---
title: Template expressions
icon: 💬
branch: basics
requires:
  - frontmatter
summary: Curly braces insert JavaScript expression results into markup.
---

In your Astro project, save this as `src/pages/index.astro`. Curly braces insert JavaScript expression results into markup. Text values are escaped; rendering arbitrary HTML requires a separate deliberate operation.

```astro
---
const completed = 3;
---
<p>{completed * 2} practice points</p>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about template expressions.
lang: astro
code: |-
  ---
  const completed = 3;
  ---
  <p>{completed + 2} practice points</p>
checks:
  - match: completed\s+\*\s+2
    message: Use completed * 2 for this step.
  - notMatch: completed\s+\+\s+2
    message: Replace completed + 2 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about template expressions is correct?
options:
  - Expressions can only contain string literals.
  - Curly braces insert JavaScript expression results into markup. Text values are escaped;
    rendering arbitrary HTML requires a separate deliberate operation.
  - Every expression is inserted as trusted raw HTML.
answer: 1
explain: Curly braces insert JavaScript expression results into markup. Text values are escaped;
  rendering arbitrary HTML requires a separate deliberate operation.
```
