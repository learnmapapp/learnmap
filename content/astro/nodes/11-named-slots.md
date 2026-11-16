---
title: Named slots
icon: "🏷️"
branch: basics
requires: [slots]
summary: Give a component several slots, and choose which one each piece of content goes into.
---
**FAQ**

**Q: My component needs content in two places. One `<slot />` isn't enough.**

Give the extra slots names. Here's a card with a header area, a body and an optional footer:

```astro title=src/components/Card.astro
<article class="card">
  <header><slot name="title" /></header>
  <slot />
  <footer><slot name="actions" /></footer>
</article>
```

**Q: How do I fill a named slot?**

Add a `slot="..."` attribute to the element you pass:

```astro title=src/pages/index.astro
<Card>
  <h2 slot="title">Weekly digest</h2>
  <p>Five new articles this week.</p>
  <a slot="actions" href="/digest">Read it</a>
</Card>
```

The `<h2>` goes to the title slot, the link to the actions slot, and everything without a `slot` attribute (the paragraph) goes to the unnamed, *default* slot. The order in which you write them doesn't matter.

**Q: What if I want to put several elements into one named slot?**

Wrap them in a `<Fragment>`, which renders only its children:

```astro
<Fragment slot="actions">
  <a href="/digest">Read it</a>
  <a href="/archive">Archive</a>
</Fragment>
```

**Q: The footer renders even when there are no actions. Can I avoid an empty `<footer>`?**

Yes, check with `Astro.slots.has`:

```astro
{Astro.slots.has("actions") && (
  <footer><slot name="actions" /></footer>
)}
```

**Q: Can a named slot have a fallback?**

Same as the default slot: put content inside it. `<slot name="title"><h2>Untitled</h2></slot>`.

**Q: What happens if I misspell a slot name?**

The content is silently dropped, because no slot asked for it. If something disappears, compare the `slot="..."` and `name="..."` spellings first.

```compare javascript
// Web components: <slot name="title"> and <h2 slot="title"> use the
// same syntax.
```

```compare typescript
// React has no named slots; you'd pass JSX as props: <Card
// title={<h2>…</h2>} />
```

```compare python
# Jinja: several {% block name %} sections in a base template.
```

```exercise
goal: "Send the button to the component's `actions` slot by adding a `slot` attribute."
code: |-
  <Dialog>
    <p>Delete this note?</p>
    <button>Delete</button>
  </Dialog>
checks:
  - match: '<button\s+slot="actions">Delete</button>'
    message: 'Write <button slot="actions">Delete</button>'
  - notMatch: '<p\s+slot='
    message: The paragraph should stay in the default slot.
solution: |-
  <Dialog>
    <p>Delete this note?</p>
    <button slot="actions">Delete</button>
  </Dialog>
```

```quiz
question: "A child element has no `slot` attribute. Where does it go?"
options:
  - Into the first named slot.
  - Into the default, unnamed `<slot />`.
  - Nowhere; every child needs a slot attribute.
answer: 1
explain: Children without a slot attribute fill the default slot.
```
