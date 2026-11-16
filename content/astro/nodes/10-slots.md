---
title: Slots
icon: "🕳️"
branch: basics
requires: [components]
summary: Let a component wrap content you pass between its tags, with a fallback for when nothing is passed.
---
**Props pass values. Slots pass markup.**

A picture frame doesn't care what painting goes in it. A `Box` component is the same: it draws the border, and whoever uses it supplies the contents.

```astro title=src/components/Box.astro
<div class="box">
  <slot />
</div>
```

```astro title=src/pages/index.astro
---
import Box from "../components/Box.astro";
---
<Box>
  <h2>Opening hours</h2>
  <p>Monday to Friday, 9 to 5.</p>
</Box>
```

Result:

```html
<div class="box">
  <h2>Opening hours</h2>
  <p>Monday to Friday, 9 to 5.</p>
</div>
```

Whatever sits between `<Box>` and `</Box>` (text, HTML, other components) is called the *children*, and it's inserted where the component wrote `<slot />`. That's the [[slot]].

**Why not a prop?** You could pass `body="<p>…</p>"` as a string, but then it would be escaped, you'd lose editor highlighting, and you couldn't nest components. Slots are made for markup.

**An empty frame.** Put fallback content inside the slot tag. It shows only when the parent passes no children:

```astro
<div class="box">
  <slot>
    <p>Nothing here yet.</p>
  </slot>
</div>
```

`<Box />` now shows "Nothing here yet."; `<Box><p>Hi</p></Box>` shows "Hi".

**Checking whether children exist.** `Astro.slots.has("default")` returns `true` when content was passed. Handy for skipping a wrapper element entirely:

```astro
{Astro.slots.has("default") && <footer><slot /></footer>}
```

**Combine with props freely:** `<Box title="Hours">...</Box>` passes a prop *and* children.

```compare javascript
// Web components: <slot></slot> inside a shadow root works the same
// way.
```

```compare typescript
// React: function Box({ children }) { return <div
// className="box">{children}</div>; }
```

```compare python
# Jinja: {% block content %}{% endblock %}, or a {% call %} block for
# macros.
```

```exercise
goal: "The callout always shows the same text. Replace the hard-coded paragraph with a `<slot />` so it shows whatever the parent passes."
code: |-
  <aside class="callout">
    <p>Callout text</p>
  </aside>
checks:
  - match: '<aside class="callout">\s*<slot\s*/>\s*</aside>'
    message: 'Replace the paragraph with <slot />.'
solution: |-
  <aside class="callout">
    <slot />
  </aside>
```

```quiz
question: "When is the content inside `<slot>…</slot>` shown?"
options:
  - Always, before the children.
  - Only when the parent passes no children.
  - Only in the dev server.
answer: 1
explain: It's fallback content; any children passed by the parent replace it.
```
