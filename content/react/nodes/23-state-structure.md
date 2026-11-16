---
title: "State structure"
icon: "🧭"
branch: "architecture"
requires: ["derived-state", "array-state"]
summary: "Store identifiers and intentional states instead of redundant copies."
---

Prefer a small representation that cannot easily contradict itself:

```jsx
import { useState } from "react";

export default function Selection() {
  const lessons = [{ id: "jsx", title: "JSX" }, { id: "state", title: "State" }];
  const [selectedId, setSelectedId] = useState("jsx");
  const selected = lessons.find(lesson => lesson.id === selectedId);
  return <><select aria-label="Lesson" value={selectedId} onChange={event => setSelectedId(event.target.value)}>
    {lessons.map(lesson => <option key={lesson.id} value={lesson.id}>{lesson.title}</option>)}
  </select><p>{selected?.title ?? "No selection"}</p></>;
}
```

Store the selected id, then find the current record. Copying the entire selected record into separate state can leave it stale after the collection updates.

## Remove impossible combinations

Instead of independent `isLoading`, `isSuccess`, and `isError` booleans, consider one status such as `"idle"`, `"loading"`, `"success"`, or `"error"`. That makes conflicting combinations harder to represent.

Group fields that always change together, and separate values with different lifecycles. State design is about ownership and valid transitions, not minimizing the raw number of `useState` calls.

```exercise
goal: "Find the selected record by its stable identifier."
lang: jsx
code: |
  export default function Selection() {
    const lessons = [{ id: "jsx", title: "JSX" }];
    const selectedId = "jsx";
    const selected = lessons.find(lesson => lesson.title === selectedId);
    return <p>{selected?.title}</p>;
  }
checks:
  - match: "lesson\\.id\\s+===\\s+selectedId"
    message: "Compare the id field with selectedId."
hint: "Compare the id field with selectedId."
```

```quiz
question: "Why store selectedId rather than a copied selected record?"
options:
  - "It lets the selected record be derived from current data."
  - "It prevents the collection from changing."
  - "It makes all ids globally unique automatically."
answer: 0
explain: "An identifier avoids an independently stale copy of the same record."
```
