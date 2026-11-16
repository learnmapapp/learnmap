---
title: Spread attributes
icon: 🧩
branch: basics
requires:
  - props
summary: Spread syntax forwards object properties into element attributes.
---

In your Astro project, save this as `src/pages/index.astro`. Spread syntax forwards object properties into element attributes. Keep security-sensitive attributes under explicit control when data is untrusted.

```astro
---
const attributes = { href: "/about/", title: "About this site" };
---
<a {...attributes}>About</a>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about spread attributes.
lang: astro
code: |-
  ---
  const attributes = { href: "/missing/", title: "About this site" };
  ---
  <a {...attributes}>About</a>
checks:
  - match: href:\s+"/about/"
    message: 'Use href: "/about/" for this step.'
  - notMatch: href:\s+"/missing/"
    message: 'Replace href: "/missing/" in the starting code.'
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does `<a {...attributes}>` do?
options:
  - Uses the object's entries as element attributes.
  - Renders the object as visible text.
  - Registers every entry as a click listener.
answer: 0
explain: Spread syntax forwards the supplied attributes into the element.
```
