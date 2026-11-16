---
title: Lazy component imports
icon: "💤"
branch: components
requires: [auto-components]
summary: Prefix a component with Lazy to load its code later, and add hydrate-on-* to delay its hydration.
---
**A loading timeline.** A blog post page has an article, a comments section near the bottom, and a big emoji picker that only opens when you click *React*. Here's what loading it looks like, first as written, then with two small changes.

**Version 1: everything up front.**

```vue
<template>
  <article>...</article>
  <CommentSection :post-id="post.id" />
  <EmojiPicker v-if="pickerOpen" />
</template>
```

```text
0 ms     HTML arrives, article visible
0-900    download JS: page + comments + picker
900 ms   hydrate everything, page interactive
```

The visitor came to read. They downloaded and ran the code for a picker they may never open and for comments far below the fold, before the page could respond to clicks.

**Version 2: add `Lazy`.**

```vue
<template>
  <article>...</article>
  <CommentSection :post-id="post.id" />
  <LazyEmojiPicker v-if="pickerOpen" />
</template>
```

Prefix any auto-imported component name with `Lazy`, and Nuxt puts its code in a separate file that's only downloaded when the component first renders. Since the picker is behind `v-if`, that's when the user opens it.

```text
0 ms     HTML arrives
0-500    download JS: page + comments
500 ms   interactive
later    click "React": picker code downloads
```

**Version 3: delay hydration too.** The comments *are* server-rendered and visible, so their HTML is already there. They just don't need to be interactive until someone scrolls to them:

```vue
<template>
  <article>...</article>
  <LazyCommentSection :post-id="post.id" hydrate-on-visible />
  <LazyEmojiPicker v-if="pickerOpen" />
</template>
```

```text
0 ms     HTML arrives (comments included)
0-300    download JS: page only
300 ms   interactive
scroll   comments visible: their JS downloads and hydrates
```

**Other hydration triggers:** `hydrate-on-idle` (when the browser has nothing else to do), `hydrate-on-interaction` (on the first click or focus), `hydrate-on-media-query="(max-width: 768px)"`, `:hydrate-after="2000"` (milliseconds), and `hydrate-never` (static HTML forever).

```tip
Don't make everything lazy. Each lazy component is an extra request. Use it for heavy components that are hidden at first, below the fold, or rarely used.
```

```compare typescript
// React: const Picker = lazy(() => import('./Picker'))
// plus <Suspense>. Nuxt's Lazy prefix does both.
```

```compare javascript
// By hand: const { Picker } = await import('./picker.js')
// when the button is first clicked.
```

```exercise
goal: "Load the help drawer's code only when it opens: use the `Lazy` version of `HelpDrawer`."
lang: vue
code: |-
  <template>
    <button @click="open = true">Help</button>
    <HelpDrawer v-if="open" />
  </template>
checks:
  - match: '<LazyHelpDrawer v-if="open" />'
    message: Rename the tag to <LazyHelpDrawer v-if="open" />.
solution: |-
  <template>
    <button @click="open = true">Help</button>
    <LazyHelpDrawer v-if="open" />
  </template>
```

```quiz
question: "A server-rendered footer never needs JavaScript. Which attribute fits?"
options:
  - hydrate-on-visible
  - hydrate-never
  - hydrate-on-idle
answer: 1
explain: hydrate-never keeps the server-rendered HTML and never loads the component's code.
```
