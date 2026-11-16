---
title: Public and private configuration
icon: 🔧
branch: server
requires:
  - setup
summary: Use .env for local configuration.
---

In your Astro project, save this as `src/pages/index.astro`. Use .env for local configuration. PUBLIC_ values are safe to expose to client code; keep credentials in server-only configuration and never print secrets into markup.

```astro
---
const label = import.meta.env.PUBLIC_SITE_LABEL ?? "Study club";
---
<p>{label}</p>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about public and private configuration.
lang: astro
code: |-
  ---
  const label = import.meta.env.PUBLIC_SITE_LABEL ?? "Untitled";
  ---
  <p>{label}</p>
checks:
  - match: PUBLIC_SITE_LABEL\s+\?\?\s+"Study\s+club"
    message: Use PUBLIC_SITE_LABEL ?? "Study club" for this step.
  - notMatch: PUBLIC_SITE_LABEL\s+\?\?\s+"Untitled"
    message: Replace PUBLIC_SITE_LABEL ?? "Untitled" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about public and private configuration is correct?
options:
  - A PUBLIC_ prefix encrypts a secret.
  - Values rendered into HTML remain private from visitors.
  - Use .env for local configuration. PUBLIC_ values are safe to expose to client code; keep
    credentials in server-only configuration and never print secrets into markup.
answer: 2
explain: Use .env for local configuration. PUBLIC_ values are safe to expose to client code; keep
  credentials in server-only configuration and never print secrets into markup.
```
