---
title: Public and bundled assets
icon: "🗄️"
branch: production
requires: [setup]
summary: public/ serves files untouched at fixed URLs; app/assets/ files go through the build and get hashed names.
---
**Two drawers for files.** Nuxt has two places for images, fonts and other static files, and they behave quite differently.

**Drawer 1: `public/`, served as-is.** A file at `public/logo.png` is available at `/logo.png`, forever, unchanged. Use the URL directly:

```vue
<template>
  <img src="/logo.png" alt="Tasks logo" />
</template>
```

Notice there's no `public` in the URL. The folder's contents sit at the root of your site.

**Drawer 2: `app/assets/`, processed by the build.** Files here are handled by Vite, the build tool inside Nuxt. You refer to them by their *source* path with `~/assets/...`:

```vue
<template>
  <img src="~/assets/illustrations/empty.svg" alt="" />
</template>
```

At build time, Vite copies the file under a new name with a content hash, like `/_nuxt/empty.C3xL9a.svg`, and rewrites your `src` to match.

**Why would you want a changed name?** Caching. The hashed file can be cached by browsers *forever*, because if you edit the file, its hash and name change, and browsers fetch the new one. A file in `public/` keeps its name, so browsers must keep checking whether it changed.

**Which drawer?**

| File | Drawer | Why |
| --- | --- | --- |
| `favicon.ico`, `robots.txt` | `public/` | Must be at a fixed, well-known URL |
| Open Graph image | `public/` | Other sites link to its URL |
| Images used in components | `app/assets/` | Hashed, cache-friendly, missing files fail the build |
| CSS and fonts imported by CSS | `app/assets/` | Bundled and optimized |

That last point is a nice bonus: a typo in `~/assets/...` **breaks the build**, so you notice. A typo in a `public/` URL is only noticed when someone sees a broken image.

```warn
Don't write `/public/logo.png` or `/assets/logo.png` as a URL. The first one doesn't exist (public files are at the root), and the second skips the build step that `~/assets/` triggers.
```

```compare javascript
// Vite and Create React App have the same split:
// public/ for fixed files, imports for bundled ones.
```

```compare python
# Django: STATIC files collected by collectstatic,
# with ManifestStaticFilesStorage adding hashes.
```

```exercise
goal: "The favicon lives at `public/favicon.png`. Fix the broken link's `href`."
lang: vue
code: |-
  <script setup lang="ts">
  useHead({
    link: [{ rel: 'icon', href: '/public/favicon.png' }],
  });
  </script>
checks:
  - match: "href:\\s*'/favicon\\.png'"
    message: Files in public/ are served from the root, so the URL is /favicon.png.
solution: |-
  <script setup lang="ts">
  useHead({
    link: [{ rel: 'icon', href: '/favicon.png' }],
  });
  </script>
```

```quiz
question: "You replace `app/assets/hero.jpg` with a new photo and deploy. Do returning visitors see the old cached one?"
options:
  - Yes, until their cache expires.
  - No. The new file gets a new hashed name, so browsers fetch it fresh.
  - Only if they hard-refresh.
answer: 1
explain: The hash in the file name changes with the content, which busts the cache.
```
