---
title: "Effect dependencies"
icon: "🔗"
branch: "effects"
requires: ["effects", "props"]
summary: "List the reactive values the synchronization actually reads."
---
**A bug report.** "In the chat app, I switched from the #general room to #random. The header says #random, but I'm still getting #general messages."

Here's the code:

```jsx
function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = connect(roomId);
    return () => connection.close();
  }, []);

  return <h1>#{roomId}</h1>;
}
```

The empty array means "connect once, when the component first appears". When `roomId` changes, the header re-renders, but the effect doesn't run again. The connection still points at the first room.

**The fix:**

```jsx
useEffect(() => {
  const connection = connect(roomId);
  return () => connection.close();
}, [roomId]);
```

Now a new `roomId` closes the old connection and opens a new one.

## The rule

> Every reactive value the effect reads must be in the array.

"Reactive" means props, state, and anything calculated from them inside the component. They can change between renders. Things that can't change don't need listing: imports, constants outside the component, and setter functions from `useState`.

## You don't choose the dependencies

It's tempting to think of the array as "when should this run?", and leave out values to make it run less. That's what caused the bug above. Think of it the other way round: the array is a **description** of what the code reads. To change the array, change the code.

## Let the linter help

The `react-hooks/exhaustive-deps` rule of `eslint-plugin-react-hooks` checks this for you, and the Vite React template includes it. If it complains, it's almost always right. Don't silence it with `// eslint-disable`.

## When an effect runs too often

Usual causes and remedies:

- **An object or function created during rendering** is new on every render, so it "changes" every time. Move it inside the effect, or outside the component.
- **The effect sets state from the previous value.** Use an [updater function](node:updater-functions): `setCount(c => c + 1)` doesn't need `count` as a dependency.
- **It shouldn't be an effect at all.** See [escape hatches](node:escape-hatches).

```compare javascript
// Without React you'd remember to reconnect yourself, in the
// room-switching code:
connection.close();
connection = connect(newRoomId);
```

```exercise
goal: "The title shows the first room forever. Make the effect re-run when `roomId` changes."
lang: jsx
code: |
  import { useEffect } from "react";
  export default function Room({ roomId = "lobby" }) {
    useEffect(() => { document.title = `Room ${roomId}`; }, []);
    return <h1>{roomId}</h1>;
  }
checks:
  - match: '\},\s+\[roomId\]\);'
    message: "Include roomId in the dependency array."
hint: The effect reads one prop.
solution: |
  import { useEffect } from "react";
  export default function Room({ roomId = "lobby" }) {
    useEffect(() => { document.title = `Room ${roomId}`; }, [roomId]);
    return <h1>{roomId}</h1>;
  }
```

```quiz
question: "Which of these does NOT need to be in a dependency array?"
options:
  - A prop the effect reads.
  - A state setter like setCount.
  - A value calculated from state during rendering.
answer: 1
explain: React guarantees setters never change between renders.
```
