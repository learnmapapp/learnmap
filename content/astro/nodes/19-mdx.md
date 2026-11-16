---
title: MDX components
icon: 📋
branch: content
requires:
  - markdown
summary: Install @astrojs/mdx before enabling it.
---

In your Astro project, save this as `astro.config.mjs`. Install `@astrojs/mdx` before enabling it. Configuration files are plain JavaScript; MDX allows component imports inside .mdx content.

```javascript
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
export default defineConfig({ integrations: [mdx()] });
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about mdx components.
lang: javascript
code: |-
  import { defineConfig } from "astro/config";
  import mdx from "@astrojs/mdx";
  export default defineConfig({ integrations: [] });
checks:
  - match: integrations:\s+\[mdx\(\)\]
    message: "Use integrations: [mdx()] for this step."
  - notMatch: integrations:\s+\[\]
    message: "Replace integrations: [] in the starting code."
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which integration enables MDX component imports in `.mdx` content?
options:
  - "`@astrojs/rss`"
  - "`@astrojs/mdx`"
  - "`@astrojs/sitemap`"
answer: 1
explain: Enable the MDX integration before using its extended content syntax.
```
