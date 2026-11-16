---
title: Install a Nuxt module
icon: "🧩"
branch: production
requires: [setup]
summary: Modules extend Nuxt itself; add them with npx nuxt module add, which installs and registers them.
---
**A shopping trip.** You need icons, fonts and a content system. Before writing them yourself, check the shelf: [nuxt.com/modules](https://nuxt.com/modules) lists hundreds of [[module|modules]], packages that plug into Nuxt itself.

**How is a module different from an ordinary npm package?** A package like `date-fns` gives you functions to import. A module changes *how Nuxt builds your app*. It can register components, add auto-imports, create server routes, or edit the config. That's why `@nuxt/image` could give you `<NuxtImg>` with no import.

**Buying one:**

```repl shell
> npx nuxt module add icon
```

One command did two things. It installed the npm package, and it registered it:

```typescript title=nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxt/icon'],
});
```

That `modules` array is the important bit. Install a package with plain `npm install` and forget this line, and nothing happens: Nuxt never loads it.

**Using it:** each module documents what it adds. For `@nuxt/icon`, it's a component:

```vue
<template>
  <Icon name="lucide:check-circle" />
</template>
```

**Configuring it:** modules usually read options from a key named after them:

```typescript title=nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxt/icon', '@nuxt/fonts'],
  icon: { size: '20px' },
});
```

**Popular official ones** to know about: `@nuxt/image` (image optimization), `@nuxt/fonts` (self-hosted web fonts), `@nuxt/icon` (icons), `@nuxt/content` (Markdown-driven pages), `@nuxt/test-utils` (testing), and `@nuxt/eslint`.

```tip
Check a module's compatibility badge before installing it. Older ones were written for Nuxt 2 or 3 and may not support Nuxt 4.
```

```compare typescript
// Next.js has no module system; libraries are wired
// up by hand in next.config and layout files.
```

```compare python
# Django: pip install, then add the app to
# INSTALLED_APPS. The same two steps.
```

```exercise
goal: "`@nuxt/fonts` is installed but does nothing. Register it in the config."
lang: typescript
code: |-
  export default defineNuxtConfig({
    modules: ['@nuxt/image'],
  });
checks:
  - match: "modules:\\s*\\[\\s*'@nuxt/image',\\s*'@nuxt/fonts'\\s*,?\\s*\\]"
    message: "Add '@nuxt/fonts' to the modules array, after '@nuxt/image'."
solution: |-
  export default defineNuxtConfig({
    modules: ['@nuxt/image', '@nuxt/fonts'],
  });
```

```quiz
question: "What does `npx nuxt module add image` do that `npm install @nuxt/image` doesn't?"
options:
  - It downloads a faster build of the package.
  - It also adds the module to the modules array in nuxt.config.ts.
  - Nothing; they're identical.
answer: 1
explain: A module only loads when it's registered in nuxt.config.ts, and module add does both steps.
```
