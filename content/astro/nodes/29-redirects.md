---
title: Configured redirects
icon: 🚦
branch: routing
requires:
  - routes
summary: Configure a redirect when moving a public URL.
---

In your Astro project, save this as `astro.config.mjs`. Configure a redirect when moving a public URL. Static and adapter deployments may implement redirects differently, so verify the generated hosting behavior.

```javascript
import { defineConfig } from "astro/config";
export default defineConfig({
  redirects: { "/journal": "/notes/" },
});
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about configured redirects.
lang: javascript
code: |-
  import { defineConfig } from "astro/config";
  export default defineConfig({
    redirects: { "/journal": "/missing/" },
  });
checks:
  - match: '"/journal":\s+"/notes/"'
    message: 'Use "/journal": "/notes/" for this step.'
  - notMatch: '"/journal":\s+"/missing/"'
    message: 'Replace "/journal": "/missing/" in the starting code.'
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about configured redirects is correct?
options:
  - Redirect configuration automatically creates destination content.
  - Every host implements redirects with identical status behavior.
  - Configure a redirect when moving a public URL. Static and adapter deployments may implement
    redirects differently, so verify the generated hosting behavior.
answer: 2
explain: Configure a redirect when moving a public URL. Static and adapter deployments may implement
  redirects differently, so verify the generated hosting behavior.
```
