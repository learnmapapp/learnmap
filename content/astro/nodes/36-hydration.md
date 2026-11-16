---
title: Islands and hydration
icon: "🏝️"
branch: islands
requires: [react-integration]
summary: Make a framework component interactive with client:load, and understand what that costs.
---
**An analogy: an archipelago.** Picture your page as a calm sea of static HTML. Here and there sits an island: a component that's alive, with its own JavaScript. The sea costs the visitor nothing to run; each island costs exactly what its own code weighs. That's Astro's *islands architecture*.

**Making an island.** Add a [[client directive]] to a framework component:

```astro title=src/pages/index.astro
---
import Header from "../components/Header.astro";
import Counter from "../components/Counter.jsx";
---
<Header />
<p>Lots of static text…</p>
<Counter start={5} client:load />
<p>More static text…</p>
```

**What happens, in order:**

1. **At build time**, React renders the counter to HTML, just like before. The page shows "Clicked 5 times" before any JavaScript runs.
2. **In the browser**, Astro loads React and the counter's code, as soon as the page loads (that's what `load` means).
3. React **hydrates** the button: it attaches event handlers and state to the HTML that's already there. Now clicks work.

That third step is [[hydration]]: turning server-made HTML into a live component.

**What does not happen:** the header and the paragraphs are never hydrated. No JavaScript is sent for them at all. In a typical React app, the whole page is hydrated. Here, only the island is.

**Islands are independent.** Two counters with `client:load` each get their own state. They share the React library download, but not their data. To share state between islands, use a small store library or browser events.

**The props are copied.** Astro serializes the island's props into the HTML so the browser can hydrate with the same values. That's why props must be plain data, and why you shouldn't pass anything secret to an island.

**`client:load` is the eager option.** Use it for things that must work immediately and are visible straight away, such as a search box in the header. The next lessons show lazier directives that load later:

- [client:idle](node:idle), when the browser has nothing else to do;
- [client:visible](node:visible), when the island scrolls into view;
- [client:only](node:client-only), to skip the server render.

```compare javascript
// Partial hydration by hand: render HTML on the server, then call
// hydrateRoot on one element.
```

```compare typescript
// Next.js: "use client" marks a component for hydration. Similar idea,
// different defaults.
```

```compare python
# Like a Django page with a few sprinkled React widgets, minus the
# manual setup.
```

```exercise
goal: "The search box doesn't respond to typing. Add `client:load` so it's hydrated as soon as the page loads."
code: |-
  ---
  import Search from "../components/Search.jsx";
  ---
  <Search placeholder="Search notes" />
checks:
  - match: '<Search\s+placeholder="Search notes"\s+client:load\s*/>'
    message: 'Add client:load: <Search placeholder="Search notes" client:load />'
solution: |-
  ---
  import Search from "../components/Search.jsx";
  ---
  <Search placeholder="Search notes" client:load />
```

```quiz
question: "A page has one `client:load` island and twenty static Astro components. Which ones send JavaScript to the browser?"
options:
  - All twenty-one.
  - Only the island.
  - None until the user clicks.
answer: 1
explain: Static components become plain HTML. Only islands ship code.
```
