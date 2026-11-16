---
title: "Object state"
icon: "🗂️"
branch: "interaction"
requires: ["updater-functions"]
summary: "Replace changed objects instead of mutating a previous snapshot."
---
State can hold an object. But there's one rule that's easy to break: **never change a state object; replace it**.

## The broken version

```jsx
const [player, setPlayer] = useState({ name: "Ada", score: 0 });

function addPoint() {
  player.score += 1;       // changes the existing object
  setPlayer(player);       // passes the SAME object back
}
```

Click, and nothing happens on screen. React compares the new state with the old one using `Object.is`. It's the **same object**, so React concludes nothing changed and skips the render. Even when something else causes a render later, you've changed the snapshot that the previous render was using, which leads to confusing bugs.

## The working version

Build a new object with the spread syntax, `...`:

```jsx
function addPoint() {
  setPlayer(previous => ({ ...previous, score: previous.score + 1 }));
}
```

Read it as: "a new object, with everything from `previous`, except `score`, which is this". The order matters: properties written later win.

(The parentheses around `{ ... }` are needed when an arrow function returns an object literal. Without them, the braces would be read as a function body.)

## Forgetting the spread

```jsx
setPlayer({ score: 1 });       // name is gone!
```

Unlike class components in old React, the setter **replaces** the whole value; it doesn't merge. Always spread the old object in.

## Nested objects

Each level you change needs its own copy:

```jsx
const [player, setPlayer] = useState({
  name: "Ada",
  settings: { theme: "dark", sound: true },
});

setPlayer(previous => ({
  ...previous,
  settings: { ...previous.settings, sound: false },
}));
```

If that gets painful, it's a hint your state is too deeply nested. [State structure](node:state-structure) has ideas, and libraries like Immer let you write "mutating" code that produces copies.

```compare javascript
// The same spread pattern works anywhere in JavaScript:
const updated = { ...player, score: player.score + 1 };
```

```exercise
goal: "The updater returns `{ score }` only, so `name` disappears. Spread `previous` first to keep it."
lang: jsx
code: |
  import { useState } from "react";
  export default function Profile() {
    const [profile, setProfile] = useState({ name: "Ada", score: 0 });
    return (
      <button onClick={() => setProfile(previous => ({ score: previous.score + 1 }))}>
        {profile.name}: {profile.score}
      </button>
    );
  }
checks:
  - match: '\{\s+\.\.\.previous,\s+score:\s+previous\.score\s+\+\s+1\s+\}'
    message: "Spread previous before replacing score."
hint: "Start the object with ...previous, then a comma."
solution: |
  import { useState } from "react";
  export default function Profile() {
    const [profile, setProfile] = useState({ name: "Ada", score: 0 });
    return (
      <button onClick={() => setProfile(previous => ({ ...previous, score: previous.score + 1 }))}>
        {profile.name}: {profile.score}
      </button>
    );
  }
```

```quiz
question: "Why doesn't `player.score++; setPlayer(player)` re-render?"
options:
  - setPlayer only accepts new objects created with new.
  - React sees the same object as before and assumes nothing changed.
  - The score must be a string.
answer: 1
explain: React compares by identity. A changed-but-same object looks unchanged.
```
