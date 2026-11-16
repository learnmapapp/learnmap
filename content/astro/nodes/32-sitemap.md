---
title: A sitemap integration
icon: 🔧
branch: routing
requires:
  - routes
summary: Install @astrojs/sitemap and replace example.com with the deployed origin.
---

In your Astro project, save this as `astro.config.mjs`. Install @astrojs/sitemap and replace example.com with the deployed origin. Build and inspect generated sitemap URLs before publishing.

```javascript
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
export default defineConfig({
  site: "https://example.com", integrations: [sitemap()],
});
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about a sitemap integration.
lang: javascript
code: |-
  import { defineConfig } from "astro/config";
  import sitemap from "@astrojs/sitemap";
  export default defineConfig({
    site: "https://example.com", integrations: [],
  });
checks:
  - match: integrations:\s+\[sitemap\(\)\]
    message: "Use integrations: [sitemap()] for this step."
  - notMatch: integrations:\s+\[\]
    message: "Replace integrations: [] in the starting code."
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about a sitemap integration is correct?
options:
  - A sitemap makes private content access-controlled.
  - The example.com origin is automatically replaced by every host.
  - Install @astrojs/sitemap and replace example.com with the deployed origin. Build and inspect
    generated sitemap URLs before publishing.
answer: 2
explain: Install @astrojs/sitemap and replace example.com with the deployed origin. Build and
  inspect generated sitemap URLs before publishing.
```
