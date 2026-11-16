---
title: Render a list
icon: "📋"
branch: basics
requires: [expressions]
summary: Turn an array into markup with map, and handle the empty case.
---
**Recipe: a menu from an array.**

*Ingredients:* an array of data in the frontmatter, and `.map()`.

```astro title=src/pages/menu.astro
---
const dishes = [
  { name: "Tomato soup", price: 6, vegan: true },
  { name: "Lasagne", price: 14, vegan: false },
  { name: "Apple pie", price: 5, vegan: true },
];
---
<h1>Menu</h1>
<ul>
  {dishes.map((dish) => (
    <li>
      {dish.name}: €{dish.price}
    </li>
  ))}
</ul>
```

**Method:**

1. Open braces inside the `<ul>`, because you're about to write an expression.
2. Call `dishes.map(...)`. For every dish, return a piece of markup: `<li>...</li>`.
3. Wrap the returned markup in parentheses when it spans several lines.

Astro turns the resulting array into three `<li>` elements. No special loop syntax to learn: it's the JavaScript you know.

**Variations:**

*Only some items:* filter first, then map.

```astro
{dishes.filter((d) => d.vegan).map((d) => <li>{d.name}</li>)}
```

*With a position number:* `map` passes the index as a second argument.

```astro
{dishes.map((d, i) => <li>{i + 1}. {d.name}</li>)}
```

*An empty list:* show a message instead of an empty `<ul>`. A [conditional](node:conditionals) handles it:

```astro
{dishes.length === 0 ? <p>Nothing on the menu today.</p> : <ul>...</ul>}
```

**Serving suggestion:** keep the frontmatter for preparing data (sorting, filtering, formatting prices) and the template for showing it. A long chain inside the braces is harder to read than a well-named variable:

```astro
---
const veganDishes = dishes.filter((d) => d.vegan);
---
<ul>{veganDishes.map((d) => <li>{d.name}</li>)}</ul>
```

**No `key` needed.** If you know React, you might expect a warning about keys. Astro renders once to HTML, with nothing to update later, so it doesn't need them.

```compare javascript
const html = dishes.map((d) => `<li>${d.name}</li>`).join("");
```

```compare typescript
// React: {dishes.map((d) => <li key={d.name}>{d.name}</li>)}
```

```compare python
# Jinja: {% for d in dishes %}<li>{{ d.name }}</li>{% endfor %}
```

```exercise
goal: "Render each tag as an `<li>`: inside the `<ul>`, map `tags` to `<li>{tag}</li>`."
code: |-
  ---
  const tags = ["astro", "html", "css"];
  ---
  <ul>
  </ul>
checks:
  - match: '\{\s*tags\.map\(\s*\(?\s*tag\s*\)?\s*=>\s*\(?\s*<li>\{\s*tag\s*\}</li>\s*\)?\s*\)\s*\}'
    message: 'Write {tags.map((tag) => <li>{tag}</li>)} inside the ul.'
solution: |-
  ---
  const tags = ["astro", "html", "css"];
  ---
  <ul>
    {tags.map((tag) => <li>{tag}</li>)}
  </ul>
```

```quiz
question: "How do you show only the first three posts from a `posts` array?"
options:
  - "{posts.map((p) => <li>{p.title}</li>).limit(3)}"
  - "{posts.slice(0, 3).map((p) => <li>{p.title}</li>)}"
  - "Astro has a special <for limit=3> tag."
answer: 1
explain: It's plain JavaScript; slice the array first, then map it to markup.
```
