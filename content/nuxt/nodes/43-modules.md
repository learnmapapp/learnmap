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
question: What does `npx nuxt module add @nuxt/image` normally do?
options:
  - Creates an API endpoint for every image automatically.
  - Installs the module and updates project configuration.
  - Removes all existing image files.
answer: 1
explain: Review the package's compatibility and options after adding it.
```
