---
title: Optimized images
icon: "🖼️"
branch: styles
requires: [public, frontmatter]
summary: Import images from src/ and render them with Image, which resizes, converts and sizes them for you.
---
**Before and after.**

*Before*, a plain tag pointing at a big photo:

```astro
<img src="/hero.jpg" alt="The night sky over a lake" />
```

The visitor downloads the full 3000-pixel JPEG, even on a phone. The browser doesn't know the size in advance, so text jumps down when it finally loads.

*After*, with Astro's `<Image />` component:

```astro title=src/pages/index.astro
---
import { Image } from "astro:assets";
import hero from "../assets/hero.jpg";
---
<Image src={hero} alt="The night sky over a lake" width={800} />
```

Built output, roughly:

```html
<img src="/_astro/hero.Bd8xK2.webp" width="800" height="533"
     loading="lazy" decoding="async" alt="The night sky over a lake" />
```

**What changed:**

- **Imported, not linked.** The image lives in `src/assets/` and is imported like a module. The import gives Astro the file and its dimensions.
- **Resized and converted** to an 800-pixel-wide WebP. Much smaller.
- **Width and height filled in**, so the browser reserves space and nothing jumps.
- **Lazy loading** by default: off-screen images wait until they're needed.
- **`alt` is required.** Leave it out and you get an error. (For purely decorative images, use `alt=""`.)

**Images from elsewhere:**

- **From `public/`:** pass the path as a string, `src="/hero.jpg"`. Astro can't read the file's size, so give `width` and `height` yourself.
- **From another website:** pass the full URL plus `width` and `height`. To let Astro optimize it, allow the domain in `astro.config.mjs`:

```javascript title=astro.config.mjs
import { defineConfig } from "astro/config";

export default defineConfig({
  image: { domains: ["images.unsplash.com"] },
});
```

**Several formats?** `<Picture />`, from the same module, outputs a `<picture>` element with AVIF and WebP sources and a fallback:

```astro
<Picture
  src={hero}
  formats={["avif", "webp"]}
  alt="The night sky over a lake"
/>
```

**Wondering about the hero image at the top of the page?** It's visible straight away, so don't lazy-load it: add `loading="eager"`.

```compare javascript
// Without a framework you'd run sharp or squoosh in a build script by
// hand.
```

```compare typescript
// Next.js: import Image from "next/image"; very similar idea and
// props.
```

```compare python
# Django: a thumbnail library such as sorl-thumbnail or
# easy-thumbnails.
```

```exercise
goal: "Use the optimized component: import `Image` from `astro:assets` and replace the `<img>` tag with `<Image src={avatar} alt=\"Nova\" />`."
code: |-
  ---
  import avatar from "../assets/avatar.png";
  ---
  <img src={avatar.src} alt="Nova" />
checks:
  - match: 'import\s*\{\s*Image\s*\}\s*from\s*["'']astro:assets["'']'
    message: 'Add import { Image } from "astro:assets";'
  - match: '<Image\s+src=\{avatar\}\s+alt="Nova"\s*/>'
    message: 'Write <Image src={avatar} alt="Nova" />'
  - notMatch: '<img'
    message: Remove the old <img> tag.
solution: |-
  ---
  import { Image } from "astro:assets";
  import avatar from "../assets/avatar.png";
  ---
  <Image src={avatar} alt="Nova" />
```

```quiz
question: "Why does `<Image />` need `width` and `height` for an image in `public/`, but not for an imported one?"
options:
  - Images in public/ can't be optimized at all.
  - Importing lets Astro read the file's dimensions at build time; a URL string gives it no file to inspect.
  - It's a bug in Astro.
answer: 1
explain: An import is processed at build time, so Astro knows the size. A plain path is just a string.
```
