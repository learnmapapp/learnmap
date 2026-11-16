---
title: Spread attributes
icon: "🎯"
branch: basics
requires: [props]
summary: Pass a whole object as props, and forward extra attributes to the underlying element.
---
**Two problems, one operator.**

**Problem 1: passing many fields one by one.** You have a post object and a `PostCard` component that wants its title, date and author:

```astro
<PostCard title={post.title} date={post.date} author={post.author} />
```

**Solution:** spread the object. Every property becomes a prop:

```astro
<PostCard {...post} />
```

That's the same as writing each one out. It works best when the object's fields have the same names as the component's props. (Any extra fields are passed too, so spreading a huge object into a component sends it everything.)

**Problem 2: a wrapper that hides useful attributes.** Here's a simple `Button` component:

```astro title=src/components/Button.astro
---
const { label } = Astro.props;
---
<button class="btn">{label}</button>
```

Someone writes `<Button label="Save" type="submit" disabled />`, and `type` and `disabled` vanish: the component never put them on the `<button>`.

**Solution:** collect the rest with `...rest`, and spread it onto the element:

```astro title=src/components/Button.astro
---
import type { HTMLAttributes } from "astro/types";

interface Props extends HTMLAttributes<"button"> {
  label: string;
}

const { label, ...rest } = Astro.props;
---
<button class="btn" {...rest}>{label}</button>
```

Now `type`, `disabled`, `aria-label`, `id` and any other button attribute arrive on the real element. `HTMLAttributes<"button">` tells TypeScript which ones are allowed, so typos are still caught.

**Watch the order.** Later attributes win. In `<button class="btn" {...rest}>`, a `class` in `rest` would replace `"btn"`. To merge classes instead, use [class:list](node:class-list).

```compare javascript
const props = { ...defaults, ...overrides };   // the same spread syntax
```

```compare typescript
// React: function Button({ label, ...rest }) { return <button
// {...rest}>{label}</button>; }
```

```compare python
# **kwargs: def button(label, **rest): ...
```

```exercise
goal: "Forward the remaining props: destructure `...rest` next to `href`, and spread `{...rest}` onto the `<a>` element."
code: |-
  ---
  const { href } = Astro.props;
  ---
  <a href={href}><slot /></a>
checks:
  - match: 'const\s*\{\s*href\s*,\s*\.\.\.rest\s*\}\s*=\s*Astro\.props'
    message: 'Write const { href, ...rest } = Astro.props;'
  - match: '<a\s+href=\{href\}\s+\{\.\.\.rest\}>'
    message: 'Add {...rest} to the <a> tag, after href.'
solution: |-
  ---
  const { href, ...rest } = Astro.props;
  ---
  <a href={href} {...rest}><slot /></a>
```

```quiz
question: "`const data = { title: \"Hi\", draft: true }`. What does `<Note {...data} />` pass?"
options:
  - One prop called data.
  - Two props, title and draft.
  - Only the props declared in Note's Props interface.
answer: 1
explain: Spreading turns every property of the object into a separate prop.
```
