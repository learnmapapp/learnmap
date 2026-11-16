---
title: Dynamic routes
icon: "🧬"
branch: routing
requires: [routes, lists]
summary: One [param] file plus getStaticPaths generates as many pages as you need.
---
**A rubber stamp.** You have one page design and twenty products. Making twenty files would be silly. Instead you make one template with a blank to fill in, and tell Astro all the values to stamp out.

**The blank: square brackets in the file name.**

```text
src/pages/products/[id].astro
```

**The list of values: `getStaticPaths`.** A static site is built ahead of time, so Astro must know every URL in advance. You export a function that returns them:

```astro title=src/pages/products/[id].astro
---
export function getStaticPaths() {
  return [
    { params: { id: "kettle" } },
    { params: { id: "teapot" } },
    { params: { id: "mug" } },
  ];
}

const { id } = Astro.params;
---
<h1>Product: {id}</h1>
```

The build produces `/products/kettle`, `/products/teapot` and `/products/mug`. `Astro.params` tells each page which value it got. The key, `id`, must match the name between the brackets.

**Passing data along with `props`.** Usually you have more than an id. Each path can also carry props, so the page doesn't have to look things up again:

```astro title=src/pages/products/[id].astro
---
const products = [
  { id: "kettle", name: "Copper kettle", price: 49 },
  { id: "teapot", name: "Blue teapot", price: 32 },
];

export function getStaticPaths() {
  return products.map((product) => ({
    params: { id: product.id },
    props: { product },
  }));
}

const { product } = Astro.props;
---
<h1>{product.name}</h1>
<p>€{product.price}</p>
```

Wait, is `products` visible inside `getStaticPaths`? Careful: **`getStaticPaths` runs in its own scope**, before the rest of the frontmatter. It can use imports, but not variables declared elsewhere in the frontmatter. Move `products` into the function, or into an imported file:

```javascript
import { products } from "../../data/products";
```

**Rest parameters.** `[...path].astro` matches several segments at once, like `/docs/guides/install`. Then `params.path` is `"guides/install"`.

**What about a URL that's not in the list?** It's simply not built, so it shows the [404 page](node:not-found).

```compare javascript
// Express: app.get("/products/:id", ...) runs per request.
// Astro builds every page up front.
```

```compare typescript
// Next.js: generateStaticParams() does the same job as
// getStaticPaths().
```

```compare python
# Flask: @app.route("/products/<id>"), plus Frozen-Flask to list the
# URLs to freeze.
```

```exercise
goal: "Generate a page per city: make `getStaticPaths` map each name in `cities` to `{ params: { city: name } }`."
code: |-
  ---
  export function getStaticPaths() {
    const cities = ["oslo", "lima", "kyoto"];
    return [];
  }
  const { city } = Astro.params;
  ---
  <h1>{city}</h1>
checks:
  - match: 'return\s+cities\.map\(\s*\(?\s*name\s*\)?\s*=>\s*\(\s*\{\s*params:\s*\{\s*city:\s*name\s*\}\s*,?\s*\}\s*\)\s*\)'
    message: 'Write return cities.map((name) => ({ params: { city: name } }));'
solution: |-
  ---
  export function getStaticPaths() {
    const cities = ["oslo", "lima", "kyoto"];
    return cities.map((name) => ({ params: { city: name } }));
  }
  const { city } = Astro.params;
  ---
  <h1>{city}</h1>
```

```quiz
question: "The file is `src/pages/team/[member].astro`. Which key must each path's params use?"
options:
  - "id"
  - "member"
  - "slug"
answer: 1
explain: The parameter name comes from the brackets in the file name.
```
