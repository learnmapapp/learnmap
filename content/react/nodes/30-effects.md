---
title: "Effects"
icon: "🔌"
branch: "effects"
requires: ["state", "events"]
summary: "Synchronize with an external system after React commits."
---
So far, your components have done two kinds of work:

1. **Rendering**: turning props and state into JSX. This must be pure: no side effects.
2. **Event handlers**: reacting to something the user did, like a click.

But some code fits neither. A chat room should connect to the server when it's **on screen**, whether or not anyone clicked anything. The browser tab's title should **match** the page you're on. A video should play while `isPlaying` is true.

That third kind of code is an [[effect]]: it keeps something **outside React** in sync with your component.

## Your first effect

```jsx
import { useEffect, useState } from "react";

export default function Inbox() {
  const [unread, setUnread] = useState(3);

  useEffect(() => {
    document.title = `(${unread}) Inbox`;
  }, [unread]);

  return <button onClick={() => setUnread(0)}>Mark all read</button>;
}
```

`useEffect` takes two things:

- **A function**: the work to do. React runs it **after** the screen has updated.
- **A dependency array**: the values it uses. React runs the effect again only when one of them has changed.

So: on the first render the title becomes "(3) Inbox". Click, `unread` becomes 0, the component re-renders, React sees `unread` changed and runs the effect again: "(0) Inbox".

## Three dependency options

```jsx
// After the first render, and whenever a or b change:
useEffect(() => { /* ... */ }, [a, b]);

// After the first render only:
useEffect(() => { /* ... */ }, []);

// After every render (rarely what you want):
useEffect(() => { /* ... */ });
```

## What counts as "outside React"?

The document title, timers, network connections, browser APIs like `localStorage`, third-party widgets such as a map or chart library. If it isn't React state or JSX, and it needs to match your component, it's effect territory.

## What isn't an effect

New React developers tend to put everything in effects. Two common mistakes:

- **Calculating values.** If it can be computed from state, [just compute it](node:derived-state).
- **Responding to a click.** If the user did something, use the [event handler](node:events). An effect would also run at other times, like when the page first loads.

[Choosing an escape hatch](node:escape-hatches) has a full decision guide.

```tip
In development, React runs each effect, cleans it up, and runs it again when a component first appears. That's deliberate: it exposes effects that don't [clean up](node:effect-cleanup) properly. It doesn't happen in production.
```

```compare javascript
// Without React you'd update the title wherever unread changes,
// and hope you didn't miss a spot:
unread = 0;
document.title = `(${unread}) Inbox`;
```

```exercise
goal: "The effect reads `title` but runs only once, so later titles are ignored. Add `title` to the dependency array."
lang: jsx
code: |
  import { useEffect } from "react";
  export default function Page({ title = "React lab" }) {
    useEffect(() => { document.title = title; }, []);
    return <h1>{title}</h1>;
  }
checks:
  - match: '\},\s+\[title\]\);'
    message: "Include title in the effect dependency list."
hint: Put the value the effect reads inside the brackets.
solution: |
  import { useEffect } from "react";
  export default function Page({ title = "React lab" }) {
    useEffect(() => { document.title = title; }, [title]);
    return <h1>{title}</h1>;
  }
```

```quiz
question: "When does React run an effect's function?"
options:
  - During rendering, before the JSX is returned.
  - After the screen has been updated.
  - Only when the user interacts with the component.
answer: 1
explain: Effects run after the commit, so rendering stays pure.
```
