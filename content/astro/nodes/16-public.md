---
title: The public folder
icon: "📂"
branch: styles
requires: [setup]
summary: Files in public/ are copied to the site untouched, at the same path. When that's what you want, and when it isn't.
---
**A tour of what goes where.** Picture a finished site and the files behind it:

- `public/favicon.svg` is served at `/favicon.svg`
- `public/robots.txt` is served at `/robots.txt`
- `public/fonts/Inter.woff2` is served at `/fonts/Inter.woff2`
- `public/downloads/menu.pdf` is served at `/downloads/menu.pdf`

The pattern: **drop `public/` from the path, and that's the URL.** During `npm run build`, everything in `public/` is copied into `dist/` byte for byte. Astro doesn't look inside, rename, compress or bundle it.

You refer to these files with an absolute path starting at the site root:

```astro title=src/layouts/BaseLayout.astro
<head>
  <link rel="icon" href="/favicon.svg" />
  <link rel="preload" href="/fonts/Inter.woff2" as="font" crossorigin />
</head>
<a href="/downloads/menu.pdf">Download the menu</a>
```

**Good tenants for `public/`:**

- files that must live at an exact, well-known URL: `favicon.ico`, `robots.txt`, `.well-known/...`;
- downloads you link to: PDFs, zip files;
- fonts and third-party scripts you don't want processed.

**Better off in `src/`:**

- **Images shown on pages.** Put them in `src/assets/` and use the [Image component](node:images): Astro resizes them, converts them to modern formats and prevents layout shift. From `public/` they're served at full size.
- **CSS and JavaScript you write.** Import them from components so they're bundled, minified and given cache-friendly file names.

**A small gotcha.** Files in `public/` keep their names, so browsers may cache an old `logo.png` after you replace it. Files processed from `src/` get a content hash in their name (`logo.3f9a1c.webp`), so a new version is a new URL.

**Not a page folder.** `public/about.html` would be served as a static file, but it gets no layout, components or anything else from Astro. Pages belong in `src/pages/`.

```compare javascript
// Vite and Create React App use the same public/ convention.
```

```compare typescript
// Next.js: public/ works identically, files served from the root.
```

```compare python
# Django/Flask: a static/ folder, but served under /static/ instead of
# the root.
```

```exercise
goal: "The logo lives at `public/images/logo.svg`. Fix the `src` so it uses the URL the file is served at."
code: |-
  <img src="public/images/logo.svg" alt="Star Notes" />
checks:
  - match: 'src="/images/logo\.svg"'
    message: 'Drop public/ and start at the root: src="/images/logo.svg"'
solution: |-
  <img src="/images/logo.svg" alt="Star Notes" />
```

```quiz
question: "You put `photo.jpg` (4 MB) in `public/` and show it with `<img src=\"/photo.jpg\">`. What reaches the visitor?"
options:
  - A resized, compressed WebP.
  - The original 4 MB file.
  - Nothing; images must be in src/.
answer: 1
explain: public/ is copied untouched. Use src/assets/ and the Image component for optimization.
```
