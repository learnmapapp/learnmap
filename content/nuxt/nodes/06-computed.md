---
title: Derived state
icon: "🧮"
branch: basics
requires: [refs]
summary: computed() calculates a value from other reactive values and keeps it up to date.
---
**Think of a spreadsheet.** Cell C1 holds `=A1*B1`. You never update C1 yourself: change A1, and C1 follows. Vue's [[computed]] works the same way.

```vue
<script setup lang="ts">
const price = ref(12);
const quantity = ref(3);

const total = computed(() => price.value * quantity.value);
</script>

<template>
  <input v-model.number="quantity" type="number" />
  <p>Total: €{{ total }}</p>
</template>
```

Type a new quantity, and the total updates. `computed` runs your function, notes which refs it read (`price` and `quantity`), and runs it again only when one of them changes.

**Like a spreadsheet formula, it's read-only.** You read it with `total.value` in script and `{{ total }}` in the template, but you don't assign to it. To change the total, change its inputs.

**Why not just a function?** You could write `function total() { return ... }` and call `{{ total() }}`. That works, but it runs on every re-render. A computed value is **cached**: it remembers its result until an input changes. That matters for expensive work, such as filtering a long list:

```typescript
const search = ref('');
const visibleTasks = computed(() =>
  tasks.value.filter((t) => t.title.includes(search.value)),
);
```

**Keep computeds pure.** A formula that also sends an email would be a strange spreadsheet. Avoid side effects such as fetching, logging or changing other refs inside `computed`. If you need to *react* to a change, use `watch` instead.

```compare python
# A @property computes on access, like a function.
# @cached_property caches, but never refreshes.
```

```compare typescript
// React: useMemo(() => price * qty, [price, qty]).
// Vue tracks the dependencies for you.
```

```exercise
goal: "Add a `fullName` computed that joins `first` and `last` with a space."
lang: vue
code: |-
  <script setup lang="ts">
  const first = ref('Ada');
  const last = ref('Lovelace');
  </script>

  <template>
    <p>{{ fullName }}</p>
  </template>
checks:
  - match: 'const fullName = computed\(\s*\(\)\s*=>'
    message: "Declare const fullName = computed(() => ...)."
  - match: 'first\.value'
    message: Read first.value inside the computed.
  - match: 'last\.value'
    message: Read last.value inside the computed.
solution: |-
  <script setup lang="ts">
  const first = ref('Ada');
  const last = ref('Lovelace');
  const fullName = computed(() => `${first.value} ${last.value}`);
  </script>

  <template>
    <p>{{ fullName }}</p>
  </template>
```

```quiz
question: "A component shows `{{ total }}` five times. How often does the computed's function run on a render?"
options:
  - Five times, once per use.
  - At most once. The result is cached until an input changes.
  - Never. Computed values only run in script.
answer: 1
explain: A computed value is cached, and it recalculates only when a ref it read changes.
```
