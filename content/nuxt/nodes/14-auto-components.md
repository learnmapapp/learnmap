---
title: Auto-imported components
icon: "🪄"
branch: components
requires: [props]
summary: Nuxt registers everything in app/components, naming components after their folder path.
---
**Where did the imports go?** In plain Vue, every component starts with a block like this:

```typescript
import TaskCard from '@/components/TaskCard.vue';
import BaseButton from '@/components/base/Button.vue';
import UserAvatar from '@/components/user/Avatar.vue';
```

In Nuxt, you delete that block. Every `.vue` file in `app/components/` is [[auto-import|auto-imported]], so you can use it in any template straight away.

**The naming puzzle.** Nuxt builds the name from the **folder path plus the file name**. Can you work out the tag before reading the answer?

| File | Tag |
| --- | --- |
| `app/components/TaskCard.vue` | `<TaskCard />` |
| `app/components/base/Button.vue` | `<BaseButton />` |
| `app/components/user/Avatar.vue` | `<UserAvatar />` |
| `app/components/user/UserMenu.vue` | `<UserMenu />` |
| `app/components/form/input/Text.vue` | `<FormInputText />` |

The fourth one is the tricky row. Nuxt doesn't repeat a word: `user/UserMenu.vue` becomes `UserMenu`, not `UserUserMenu`.

So a folder works like a namespace. Here's a template that uses them:

```vue
<template>
  <header>
    <UserAvatar :src="user.avatar" />
    <BaseButton @click="logout">Log out</BaseButton>
  </header>
</template>
```

**Does auto-importing everything make the app bigger?** No. Nuxt scans your templates during the build and only bundles the components you actually use.

**What else is auto-imported?** Vue functions (`ref`, `computed`, `watch`), Nuxt composables (`useFetch`, `useRoute`), and everything exported from `app/composables/` and `app/utils/`. Hover over a name in your editor to see where it comes from.

```tip
If a component doesn't resolve, check the file location first. Then restart the dev server: very rarely, the generated type list falls behind.
```

```compare typescript
// Next.js and React: every component is an explicit
// import at the top of the file.
```

```compare python
# Django templates: {% include "user/avatar.html" %}
# refers to templates by path, too.
```

```exercise
goal: "The file is `app/components/task/Badge.vue`. Use it with the tag name Nuxt gives it."
lang: vue
code: |-
  <template>
    <li>
      Ship it <Badge label="urgent" />
    </li>
  </template>
checks:
  - match: '<TaskBadge\s+label="urgent"\s*/>'
    message: Folder task + file Badge gives the tag <TaskBadge>.
solution: |-
  <template>
    <li>
      Ship it <TaskBadge label="urgent" />
    </li>
  </template>
```

```quiz
question: "Which tag does `app/components/admin/AdminTable.vue` get?"
options:
  - "`<AdminAdminTable />`"
  - "`<AdminTable />`"
  - "`<Table />`"
answer: 1
explain: Nuxt drops the repeated folder prefix, so admin/AdminTable becomes AdminTable.
```
