---
title: "Object state"
icon: "🗂️"
branch: "interaction"
requires: ["updater-functions"]
summary: "Replace changed objects instead of mutating a previous snapshot."
---

Treat objects stored in state as read-only snapshots. Create a new object when a field changes:

```jsx
import { useState } from "react";

export default function Profile() {
  const [profile, setProfile] = useState({ name: "Ada", score: 0 });
  function award() {
    setProfile(previous => ({ ...previous, score: previous.score + 1 }));
  }
  return <button onClick={award}>{profile.name}: {profile.score}</button>;
}
```

Object spread copies the outer properties, and the later `score` replaces that copied value. Unlike a merging class-state API, the `useState` setter replaces the stored value; copy fields that should remain.

## Nested changes need nested copies

Spread is shallow. To change `profile.address.city`, create a new profile and a new address while preserving unrelated nested fields. Directly mutating the existing nested object also changes a previous snapshot.

Simplify state structure when copying becomes difficult. A flatter representation or a reducer can make updates clearer. A library can help with immutable updates, but the underlying contract stays the same: do not mutate objects from prior renders.

```exercise
goal: "Keep the name while updating score immutably."
lang: jsx
code: |
  import { useState } from "react";
  export default function Profile() {
    const [profile, setProfile] = useState({ name: "Ada", score: 0 });
    return <button onClick={() => setProfile(previous => ({ score: previous.score + 1 }))}>{profile.name}: {profile.score}</button>;
  }
checks:
  - match: "\\{\\s+\\.\\.\\.previous,\\s+score:\\s+previous\\.score\\s+\\+\\s+1\\s+\\}"
    message: "Spread previous before replacing score."
hint: "Spread previous before replacing score."
```

```quiz
question: "Does setProfile({ score: 1 }) automatically preserve a name field?"
options:
  - "Yes, useState merges object fields."
  - "No, it replaces the stored object."
  - "Only for nested fields."
answer: 1
explain: "The useState setter replaces its value; copy the properties that should remain."
```
