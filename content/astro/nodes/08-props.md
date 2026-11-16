---
title: Pass props
icon: "🎁"
branch: basics
requires: [components]
summary: Give components inputs with attributes, read them with Astro.props, and type them with an interface.
---
**An analogy: components are function calls.** Attributes are the arguments, and `Astro.props` is the parameter list.

```astro title=src/components/Card.astro
---
interface Props {
  title: string;
  minutes?: number;
}

const { title, minutes = 5 } = Astro.props;
---
<article class="card">
  <h2>{title}</h2>
  <p>{minutes} minute read</p>
</article>
```

```astro title=src/pages/index.astro
---
import Card from "../components/Card.astro";
---
<Card title="Getting started" minutes={3} />
<Card title="Deploying" />
```

The first card says "3 minute read"; the second falls back to the default, 5.

**Reading the analogy line by line:**

| Function | Astro component |
| --- | --- |
| `function card(title, minutes = 5)` | `const { title, minutes = 5 } = Astro.props;` |
| parameter types | `interface Props { ... }` |
| `card("Deploying")` | `<Card title="Deploying" />` |
| return value | the HTML below the frontmatter |

**Strings vs other values.** `title="Deploying"` passes a string. Anything else (numbers, booleans, arrays, objects, variables) goes in braces: `minutes={3}`, `tags={["astro"]}`, `post={post}`. Writing `minutes="3"` would give you the string `"3"`.

**Why bother with `interface Props`?** Astro reads it for type checking. Forget a required prop or misspell one, and your editor underlines it, and `npx astro check` reports it. The `?` marks a prop as optional.

**Props flow one way:** from parent to child. A component can't change its parent's variables, and it shouldn't reassign its own props either. If it needs a modified value, it computes a new variable from the prop.

**Boolean shorthand:** an attribute with no value is `true`. `<Card title="New" featured />` is the same as `featured={true}`.

```compare javascript
function card({ title, minutes = 5 }) {
  return `<article><h2>${title}</h2><p>${minutes} minute read</p></article>`;
}
```

```compare typescript
// React: function Card({ title, minutes = 5 }: Props) { ... }
```

```compare python
# Jinja macro: {% macro card(title, minutes=5) %}...{% endmacro %}
```

```exercise
goal: "Read the `name` prop: destructure it from `Astro.props`, so the greeting works."
code: |-
  ---
  interface Props {
    name: string;
  }
  ---
  <p>Hello, {name}!</p>
checks:
  - match: 'const\s*\{\s*name\s*\}\s*=\s*Astro\.props'
    message: 'Write const { name } = Astro.props;'
solution: |-
  ---
  interface Props {
    name: string;
  }
  const { name } = Astro.props;
  ---
  <p>Hello, {name}!</p>
```

```quiz
question: "`<Rating stars=\"4\" />`. What is the type of `stars` inside the component?"
options:
  - number
  - string
  - It depends on the Props interface.
answer: 1
explain: Quoted attributes are always strings. Write stars={4} to pass a number; the interface only checks, it doesn't convert.
```
