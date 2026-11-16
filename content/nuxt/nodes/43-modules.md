---
title: Install a Nuxt module
icon: 📋
branch: production
requires:
  - setup
summary: The module CLI installs a package and updates configuration.
---

In your Nuxt 4 project, save this as `terminal command`. The module CLI installs a package and updates configuration. Review module options, compatibility, and resulting changes before adopting additional integrations.

```shell
npx nuxt module add @nuxt/image
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about install a nuxt module.
lang: shell
code: npx nuxt module remove @nuxt/image
checks:
  - match: npx\s+nuxt\s+module\s+add\s+@nuxt/image
    message: Use npx nuxt module add @nuxt/image for this step.
  - notMatch: npx\s+nuxt\s+module\s+remove\s+@nuxt/image
    message: Replace npx nuxt module remove @nuxt/image in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about install a nuxt module is correct?
options:
  - Every npm package is automatically a Nuxt module.
  - The module CLI installs a package and updates configuration. Review module options,
    compatibility, and resulting changes before adopting additional integrations.
  - Installing a module removes the need to read its configuration.
answer: 1
explain: The module CLI installs a package and updates configuration. Review module options,
  compatibility, and resulting changes before adopting additional integrations.
```
