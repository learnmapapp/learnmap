---
title: Hydrate when idle
icon: "😴"
branch: islands
requires: [hydration]
summary: client:idle waits until the browser has finished the important work before loading an island.
---
**A timeline.** What the browser does in the first second, with `client:load` versus `client:idle`:

**With `client:load` on a chat widget:**

1. Downloads and parses the HTML. The page is readable.
2. Immediately downloads React and the chat widget.
3. Parses and runs that JavaScript, competing with images, fonts and the visitor's first scroll.
4. The widget is live.

**With `client:idle`:**

1. Downloads and parses the HTML. The page is readable.
2. Finishes loading the page and its images.
3. When the main thread has nothing to do, downloads and hydrates the chat widget.
4. The widget is live, a moment later, but it never got in the way.

```astro title=src/layouts/BaseLayout.astro
---
import ChatWidget from "../components/ChatWidget.jsx";
---
<slot />
<ChatWidget client:idle />
```

Under the hood Astro uses the browser's `requestIdleCallback`, which waits until the browser isn't busy.

**Which islands deserve `client:idle`?** Ask: *is it visible right away, and will someone use it within the first second?*

- **No, it can wait:** a chat widget, a newsletter form low on the page, a cookie banner, a "like" button. Use `client:idle`.
- **Yes, it's needed now:** the main navigation menu, a search box people click immediately. Use `client:load`.
- **It's far down the page:** use [client:visible](node:visible) instead, which may never load it at all.

**A ceiling on the wait.** On a busy page the browser might stay busy for a while. `timeout` sets a maximum wait in milliseconds:

```astro
<ChatWidget client:idle={{ timeout: 500 }} />
```

**What the visitor sees meanwhile:** the server-rendered HTML of the component. That's why it's worth making that first render look right, such as a chat bubble button, even before it works.

```compare javascript
requestIdleCallback(() => import("./chat.js").then((m) => m.start()));
```

```compare typescript
// Next.js: dynamic import with ssr: true and a manual idle trigger; no
// built-in equivalent.
```

```compare python
# No server-side equivalent: it's about when the browser loads code.
```

```exercise
goal: "The feedback form sits at the end of an article and isn't urgent. Change its directive from `client:load` to `client:idle`."
code: |-
  ---
  import Feedback from "../components/Feedback.jsx";
  ---
  <Feedback client:load />
checks:
  - match: '<Feedback\s+client:idle\s*/>'
    message: 'Write <Feedback client:idle />'
solution: |-
  ---
  import Feedback from "../components/Feedback.jsx";
  ---
  <Feedback client:idle />
```

```quiz
question: "What does a visitor see in place of a `client:idle` island before it hydrates?"
options:
  - An empty gap.
  - The component's server-rendered HTML, which isn't interactive yet.
  - A loading spinner Astro adds.
answer: 1
explain: The island is rendered to HTML at build time; hydration just makes it interactive.
```
