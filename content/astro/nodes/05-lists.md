---
title: Render a list
icon: 🚦
branch: basics
requires:
  - expressions
summary: Use map to render repeated markup from data.
---

In your Astro project, save this as `src/pages/index.astro`. Use map to render repeated markup from data. Astro generates HTML for the result without requiring a client-side list renderer.

```astro
---
const topics = ["Astro", "TypeScript", "React"];
---
<ul>{topics.map(topic => <li>{topic}</li>)}</ul>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```compare javascript
const topics = ["Astro", "Nuxt"];
const list = document.createElement("ul");
for (const topic of topics) {
  const item = document.createElement("li");
  item.textContent = topic;
  list.append(item);
}
document.body.append(list);
```

```compare typescript
const topics: { id: string; title: string }[] = [
  { id: "astro", title: "Astro" },
  { id: "nuxt", title: "Nuxt" },
];
const titles = topics.map(topic => topic.title);
```

```compare python
topics = ["Astro", "Nuxt"]
for topic in topics:
    print(topic)
# This prints text; it does not create browser DOM elements.
```

```exercise
goal: Repair the starting example using what you learned about render a list.
lang: astro
code: |-
  ---
  const topics = ["Astro", "TypeScript", "React"];
  ---
  <ul>{topics.map(topic => <p>{topic}</p>)}</ul>
checks:
  - match: <li>\{topic\}</li>
    message: Use <li>{topic}</li> for this step.
  - notMatch: <p>\{topic\}</p>
    message: Replace <p>{topic}</p> in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about render a list is correct?
options:
  - Rendering a list requires hydration.
  - Astro templates cannot use arrays.
  - Use map to render repeated markup from data. Astro generates HTML for the result without
    requiring a client-side list renderer.
answer: 2
explain: Use map to render repeated markup from data. Astro generates HTML for the result without
  requiring a client-side list renderer.
```
