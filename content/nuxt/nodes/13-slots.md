---
title: Slot composition
icon: 🧪
branch: components
requires:
  - props
summary: Slots let a parent provide markup inside a reusable child.
---

In your Nuxt 4 project, save this as `app/components/Panel.vue`. Slots let a parent provide markup inside a reusable child. Supply a named heading with <template #heading> and ordinary children for the default slot.

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
question: Which statement about slot composition is correct?
options:
  - Slots can only be rendered once in an application.
  - "Slots let a parent provide markup inside a reusable child. Supply a named heading with
    <template #heading> and ordinary children for the default slot."
  - Every slot must contain a string prop.
answer: 1
explain: "Slots let a parent provide markup inside a reusable child. Supply a named heading with
  <template #heading> and ordinary children for the default slot."
```
