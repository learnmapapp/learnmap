---
title: Hydrate when visible
icon: "👀"
branch: islands
requires: [hydration]
summary: client:visible loads an island only when it scrolls into view, so unseen islands cost nothing.
---
**A thought experiment.** Your article has an interactive comments section at the very end. Analytics say 70% of readers never scroll that far. With `client:load`, all of them download the comments' JavaScript anyway.

**`client:visible`** waits until the component actually enters the viewport:

```astro title=src/pages/blog/[id].astro
---
import Comments from "../../components/Comments.jsx";
---
<article>…a long post…</article>
<Comments postId={post.id} client:visible />
```

The 70% who stop reading early download nothing. The 30% who reach the end get the comments just as they arrive.

**How it knows.** Astro uses an `IntersectionObserver`, a browser API that reports when an element becomes visible. No scroll listeners, no polling.

**Starting a little early.** Loading takes a moment, and a visitor scrolling fast may see the inactive version briefly. `rootMargin` starts loading before the island is on screen:

```astro
<Comments postId={post.id} client:visible={{ rootMargin: "300px" }} />
```

Now hydration begins when the island is within 300 pixels of the viewport.

**Good candidates:**

- comment sections, related-post carousels, newsletter forms at the bottom;
- interactive charts and maps further down the page;
- anything in a long page that most visitors never reach.

**Not a good fit:** islands at the top of the page. They're visible immediately, so `client:visible` behaves almost like `client:load`, with a little extra delay. Use `client:load` there.

**A related directive:** `client:media="(max-width: 600px)"` hydrates only when a CSS media query matches, such as a mobile menu that's hidden on desktop.

**Directive overview:**

| Directive | Hydrates | Typical use |
| --- | --- | --- |
| `client:load` | right away | visible, needed now |
| `client:idle` | when the browser is free | visible, can wait a moment |
| `client:visible` | when scrolled into view | far down the page |
| `client:media` | when a media query matches | mobile- or desktop-only UI |

```compare javascript
new IntersectionObserver(([e], obs) => {
  if (e.isIntersecting) { obs.disconnect(); import("./comments.js"); }
}).observe(el);
```

```compare typescript
// React: a lazy() component triggered by an IntersectionObserver hook,
// set up by hand.
```

```compare python
# No server-side equivalent: it's about when the browser loads code.
```

```exercise
goal: "The map is far down the page. Hydrate it only when it scrolls into view, starting 200px early: use `client:visible={{ rootMargin: \"200px\" }}`."
code: |-
  ---
  import Map from "../components/Map.jsx";
  ---
  <Map city="Lisbon" client:load />
checks:
  - match: '<Map\s+city="Lisbon"\s+client:visible=\{\{\s*rootMargin:\s*"200px"\s*\}\}\s*/>'
    message: 'Write client:visible={{ rootMargin: "200px" }} instead of client:load.'
solution: |-
  ---
  import Map from "../components/Map.jsx";
  ---
  <Map city="Lisbon" client:visible={{ rootMargin: "200px" }} />
```

```quiz
question: "A visitor never scrolls down to a `client:visible` island. How much of its JavaScript do they download?"
options:
  - All of it, but it runs later.
  - None.
  - Only React.
answer: 1
explain: The island's code is only requested when it comes into view.
```
