---
title: "Transitions"
icon: "🚥"
branch: "performance"
requires: ["state", "controlled-inputs", "suspense"]
summary: "Mark non-urgent UI work while keeping immediate input updates urgent."
---
## Two kinds of update

Some updates must feel instant: typing a letter, pressing a button. If they lag even a little, the app feels broken. Others can take a moment: showing the results of a slow filter, or switching to a heavy tab. Users expect those to take a beat.

By default, React treats every update as urgent. A [[transition]] marks an update as **the kind that can wait**.

## The problem it solves

Tabs, where the "Posts" tab renders thousands of items slowly:

```jsx
<button onClick={() => setTab("posts")}>Posts</button>
<button onClick={() => setTab("about")}>About</button>
```

Click Posts, and the page freezes while it renders. Change your mind and click About during the freeze? Nothing happens until Posts is done.

## The fix

```jsx
import { useState, useTransition } from "react";

export default function Tabs() {
  const [tab, setTab] = useState("about");
  const [isPending, startTransition] = useTransition();

  function selectTab(next) {
    startTransition(() => setTab(next));
  }

  return (
    <>
      <button onClick={() => selectTab("posts")}>Posts</button>
      <button onClick={() => selectTab("about")}>About</button>
      <div style={{ opacity: isPending ? 0.6 : 1 }}>
        {tab === "posts" ? <Posts /> : <About />}
      </div>
    </>
  );
}
```

What changes:

- **The page stays responsive.** React renders the Posts tab in the background, and can be interrupted. Click About midway, and React drops the unfinished Posts render.
- **The old tab stays visible** until the new one is ready, instead of a blank or a loading spinner.
- **`isPending`** is true while the transition is running, so you can dim the content or show a small indicator.

## The one rule

**Don't put a text input's own update in a transition.** The input must show what was typed immediately, or typing feels broken. Keep that update urgent, and use a transition (or a [deferred value](node:deferred-values)) for the slow part that depends on it.

```jsx
function handleChange(event) {
  const text = event.target.value;
  setQuery(text);                                      // urgent
  startTransition(() => setResults(search(text)));     // can wait
}
```

## Async transitions

In React 19, the function passed to `startTransition` can be `async`. `isPending` stays true until it finishes, which is handy for "Save" buttons. [Form actions](node:form-actions) build on that.

```compare javascript
// Without React, you'd split the work yourself, for example with
// requestIdleCallback or by rendering in chunks.
```

```exercise
goal: "The tab switch is slow and blocks the page. Wrap `setTab(\"details\")` in `startTransition`."
lang: jsx
code: |
  import { useState, useTransition } from "react";
  export default function Tabs() {
    const [tab, setTab] = useState("overview");
    const [isPending, startTransition] = useTransition();
    return <button aria-busy={isPending} onClick={() => setTab("details")}>{tab}</button>;
  }
checks:
  - match: 'onClick=\{\(\)\s+=>\s+startTransition\(\(\)\s+=>\s+setTab\("details"\)\)\}'
    message: "Wrap the tab update in startTransition."
hint: "startTransition takes a function: startTransition(() => ...)"
solution: |
  import { useState, useTransition } from "react";
  export default function Tabs() {
    const [tab, setTab] = useState("overview");
    const [isPending, startTransition] = useTransition();
    return <button aria-busy={isPending} onClick={() => startTransition(() => setTab("details"))}>{tab}</button>;
  }
```

```quiz
question: "Which update should NOT be marked as a transition?"
options:
  - Switching to a slow tab.
  - Updating an input's value as the user types.
  - Rendering a large filtered list.
answer: 1
explain: The input itself must update immediately. Defer the slow work that depends on it.
```
