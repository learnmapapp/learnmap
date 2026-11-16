---
title: Nuxt Image module
icon: "📷"
branch: production
requires: [assets]
summary: NuxtImg resizes images and converts them to modern formats, so phones don't download desktop-sized photos.
---
**Before.** A hero photo, straight from the camera roll:

```vue
<template>
  <img src="/hero.jpg" alt="A desk with a notebook" />
</template>
```

Lighthouse says: *Properly size images. Potential savings of 2.4 MB.* The file is 4000 pixels wide and 2.8 MB. A phone showing it at 400 pixels wide downloads all of it anyway.

**After.** With the `@nuxt/image` module installed (`npx nuxt module add image`):

```vue
<template>
  <NuxtImg
    src="/hero.jpg"
    width="1200"
    sizes="100vw sm:50vw"
    format="webp"
    loading="lazy"
    alt="A desk with a notebook"
  />
</template>
```

What changed, attribute by attribute:

- **`width="1200"`** resizes the source; the original file stays untouched.
- **`sizes`** describes how wide the image is *on screen*: full width on small screens, half from the `sm` breakpoint up. NuxtImg generates several widths and a `srcset`, and the browser downloads the smallest one that looks sharp.
- **`format="webp"`** converts to a format that's usually much smaller than JPEG.
- **`loading="lazy"`** delays the download until the image is near the viewport. (Leave it off for the main image at the top of the page; that one should load immediately.)
- **`alt`** is the same as always: describe the image, or use `alt=""` for decoration.

The result: the phone downloads a ~40 KB WebP instead of a 2.8 MB JPEG.

**Where do the resized images come from?** By default, a built-in provider resizes them on your server, or during the build for prerendered pages. Hosts such as Vercel, Netlify and Cloudinary have their own image services, and you can switch providers in the config without changing your templates.

**Want several formats?** `<NuxtPicture format="avif,webp">` renders a `<picture>` with fallbacks for browsers that don't support the newest format.

```compare typescript
// Next.js: <Image src="/hero.jpg" width={1200}
//   height={800} sizes="100vw" alt="..." />
```

```compare javascript
// By hand: export several sizes, then write srcset
// and sizes attributes yourself.
```

```exercise
goal: "Swap the plain `<img>` for `<NuxtImg>`, and request a 600-pixel-wide WebP."
lang: vue
code: |-
  <template>
    <img src="/team.jpg" alt="The team at the offsite" />
  </template>
checks:
  - match: '<NuxtImg'
    message: Use the NuxtImg component.
  - match: 'width="600"'
    message: Add width="600".
  - match: 'format="webp"'
    message: Add format="webp".
  - match: 'alt="The team at the offsite"'
    message: Keep the alt text.
solution: |-
  <template>
    <NuxtImg
      src="/team.jpg"
      width="600"
      format="webp"
      alt="The team at the offsite"
    />
  </template>
```

```quiz
question: "Should the large hero image at the very top of a page use `loading=\"lazy\"`?"
options:
  - Yes, lazy loading always helps.
  - No. It's visible immediately, so lazy loading would only delay it.
  - Only on mobile.
answer: 1
explain: Lazy loading helps below-the-fold images. Above the fold, it slows down the most important image.
```
