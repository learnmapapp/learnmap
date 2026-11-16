---
title: Conditional classes
icon: "🎚️"
branch: styles
requires: [conditionals, scoped-css]
summary: Build a class attribute from strings, arrays and true/false conditions with class:list.
---
**Translate this.** Here's how a navigation link might add classes in plain JavaScript. Let's turn it into Astro.

```javascript
let cls = "nav-link";
if (isActive) cls += " active";
if (isExternal) cls += " external";
link.className = cls;
```

**Attempt 1: a template literal.**

```astro
<a class={`nav-link ${isActive ? "active" : ""} ${isExternal ? "external" : ""}`}>
```

It works, but it's noisy and leaves stray spaces.

**Attempt 2: `class:list`.** Astro's directive takes an array and does the bookkeeping:

```astro title=src/components/NavLink.astro
---
const { href, label } = Astro.props;
const isActive = Astro.url.pathname === href;
const isExternal = href.startsWith("http");
---
<a
  href={href}
  class:list={["nav-link", { active: isActive, external: isExternal }]}
>
  {label}
</a>

<style>
  .active { font-weight: bold; }
  .external::after { content: " ↗"; }
</style>
```

**The rules of `class:list`:**

- **Strings** are added as they are: `"nav-link"`.
- **Objects** add each key whose value is truthy: `{ active: isActive }`.
- **Arrays** can be nested, and are flattened.
- `false`, `null` and `undefined` are skipped, and duplicates are removed.

So for the home link on the home page, the result is `class="nav-link active"`.

**Accepting classes from outside.** A component often wants to merge its own classes with one passed by the parent. Since `class` is a reserved word in JavaScript, rename it while destructuring:

```astro
---
const { class: className, ...rest } = Astro.props;
---
<button class:list={["btn", className]} {...rest}><slot /></button>
```

Now `<Button class="wide">` renders `class="btn wide"`, and the component's scoped styles still apply.

```compare javascript
// The popular clsx library has the same rules:
clsx("nav-link", { active: isActive });
```

```compare typescript
// Vue: :class="['nav-link', { active: isActive }]"
```

```compare python
# Jinja: class="nav-link{{ ' active' if is_active }}"
```

```exercise
goal: "Replace the template literal with `class:list`, using a string `\"tab\"` and an object `{ selected }`."
code: |-
  ---
  const { selected } = Astro.props;
  ---
  <button class={`tab ${selected ? "selected" : ""}`}><slot /></button>
checks:
  - match: 'class:list=\{\s*\[\s*"tab"\s*,\s*\{\s*selected(\s*:\s*selected)?\s*\}\s*\]\s*\}'
    message: 'Write class:list={["tab", { selected }]}'
  - notMatch: 'class=\{`'
    message: Remove the old template literal.
solution: |-
  ---
  const { selected } = Astro.props;
  ---
  <button class:list={["tab", { selected }]}><slot /></button>
```

```quiz
question: "What does `class:list={[\"card\", { featured: false, wide: true }]}` produce?"
options:
  - "class=\"card featured wide\""
  - "class=\"card wide\""
  - "class=\"card\""
answer: 1
explain: Object keys are included only when their value is truthy.
```
