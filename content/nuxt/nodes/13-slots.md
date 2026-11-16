---
title: Slot composition
icon: "🕳️"
branch: components
requires: [props]
summary: Slots let the parent pass markup into a component; named slots fill several spots.
---
**Fill in the blanks.** Props pass *values* into a component. Sometimes you want to pass *markup* instead: a whole paragraph, a button, another component. That's what a [[slot]] is for. The component leaves a blank, and the parent fills it.

**The component, with a blank:**

```vue title=app/components/AppCard.vue
<template>
  <section class="card">
    <slot />
  </section>
</template>
```

**The parent, filling it:**

```vue
<template>
  <AppCard>
    <h2>Today</h2>
    <p>3 tasks left. <a href="/tasks">See all</a></p>
  </AppCard>
</template>
```

Everything between `<AppCard>` and `</AppCard>` lands where `<slot />` is. The card handles the frame and styling; the parent decides the content.

**Several blanks: named slots.** Give each `<slot>` a name, and the parent fills them by name with `<template #name>`:

```vue title=app/components/AppCard.vue
<template>
  <section class="card">
    <header><slot name="title" /></header>
    <slot />
    <footer>
      <slot name="actions"><button>Close</button></slot>
    </footer>
  </section>
</template>
```

```vue
<template>
  <AppCard>
    <template #title>Today</template>
    <p>3 tasks left.</p>
    <template #actions><button>Add task</button></template>
  </AppCard>
</template>
```

Three things to notice:

- Content that isn't in a `<template #...>` goes to the unnamed **default** slot.
- The *Close* button inside `<slot name="actions">` is **fallback** content. It shows only when the parent leaves that slot empty.
- `#title` is short for `v-slot:title`.

```compare typescript
// React: the default slot is props.children, and named
// slots are props like title={<h2>...</h2>}.
```

```compare python
# Jinja: {% block title %}{% endblock %} in a base
# template, filled by templates that extend it.
```

```exercise
goal: "Give the dialog a named `footer` slot, with `<button>OK</button>` as fallback content."
lang: vue
code: |-
  <template>
    <dialog open>
      <slot />
      <footer></footer>
    </dialog>
  </template>
checks:
  - match: '<slot name="footer">\s*<button>OK</button>\s*</slot>'
    message: Inside the footer, add <slot name="footer"><button>OK</button></slot>.
solution: |-
  <template>
    <dialog open>
      <slot />
      <footer>
        <slot name="footer"><button>OK</button></slot>
      </footer>
    </dialog>
  </template>
```

```quiz
question: "A parent uses `<AppCard><p>Hi</p></AppCard>`, but AppCard has no `<slot />`. What happens to the paragraph?"
options:
  - It's rendered after the card.
  - It isn't rendered anywhere.
  - Vue throws an error.
answer: 1
explain: Without a slot outlet, the passed content has nowhere to go and is silently dropped.
```
