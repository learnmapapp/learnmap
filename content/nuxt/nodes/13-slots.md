---
title: Slot composition
icon: 🧪
branch: components
requires:
  - props
summary: Slots let a parent provide markup inside a reusable child.
---

In your Nuxt 4 project, save this as `app/components/Panel.vue`. Slots let a parent provide markup inside a reusable child. Supply a named heading with `<template #heading>` and ordinary children for the default slot.

A useful term here is [[slot]]: A child component placeholder filled with markup supplied by its parent.

```vue
<template>
  <section><header><slot name="heading">Notes</slot></header><slot /></section>
</template>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about slot composition.
lang: vue
code: |-
  <template>
    <section><header><slot name="title">Notes</slot></header><slot /></section>
  </template>
checks:
  - match: name="heading"
    message: Use name="heading" for this step.
  - notMatch: name="title"
    message: Replace name="title" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: How does a parent supply a named `heading` slot?
options:
  - Set a route query key called `heading`.
  - "Use `<template #heading>...</template>`."
  - Create a global variable called `heading`.
answer: 1
explain: Named slots pass markup into the child's corresponding content region.
```
