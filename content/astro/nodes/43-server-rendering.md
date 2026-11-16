---
title: Configure a server adapter
icon: 📋
branch: server
requires:
  - setup
  - endpoints
summary: Install @astrojs/node for this Node example.
---

In your Astro project, save this as `astro.config.mjs`. Install `@astrojs/node` for this Node example. Choose an adapter matching the host and run the built server according to that adapter’s instructions.

```javascript
import { defineConfig } from "astro/config";
import node from "@astrojs/node";
export default defineConfig({ output: "server", adapter: node({ mode: "standalone" }) });
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about configure a server adapter.
lang: javascript
code: |-
  import { defineConfig } from "astro/config";
  import node from "@astrojs/node";
  export default defineConfig({ output: "static", adapter: node({ mode: "standalone" }) });
checks:
  - match: output:\s+"server"
    message: 'Use output: "server" for this step.'
  - notMatch: output:\s+"static"
    message: 'Replace output: "static" in the starting code.'
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which deployment matches the example Node standalone adapter?
options:
  - A browser tab opened directly on the source configuration.
  - A host that can run the built Node server.
  - A host that accepts only static files and has no server runtime.
answer: 1
explain: Choose an adapter compatible with the actual deployment runtime.
```
