---
title: Optimized images
icon: 🚦
branch: styles
requires:
  - public
  - frontmatter
summary: Add a real cover.jpg under src/assets before running this page.
---

In your Astro project, save this as `src/pages/index.astro`. Add a real `cover.jpg` under src/assets before running this page. Image can use imported metadata to generate optimized image output.

```astro
---
import { Image } from "astro:assets";
import cover from "../assets/cover.jpg";
---
<Image src={cover} alt="Notebook beside a laptop" width={640} />
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about optimized images.
lang: astro
code: |-
  ---
  import { Image } from "astro:assets";
  import cover from "../assets/cover.jpg";
  ---
  <Image src={cover} alt="image" width={640} />
checks:
  - match: alt="Notebook\s+beside\s+a\s+laptop"
    message: Use alt="Notebook beside a laptop" for this step.
  - notMatch: alt="image"
    message: Replace alt="image" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does importing a local image for `Image` allow Astro to use?
options:
  - A guarantee that the alt text describes its contents.
  - Automatic creation of a missing source image.
  - Image metadata and build-time optimization.
answer: 2
explain: A real imported image supplies metadata; authors still provide useful alternative text.
```
