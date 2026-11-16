---
title: "Typed DOM access"
icon: "🌐"
branch: "applications"
requires: ["nullability", "type-guards"]
summary: "Handle missing nodes and narrow to the element you need."
---

DOM queries may return `null`, and a general element may not support the properties you need:

```typescript
const element = document.querySelector("#save");
if (element instanceof HTMLButtonElement) {
  element.disabled = true;
  element.textContent = "Saving";
}
```

`instanceof` verifies the actual runtime element. A generic query such as `querySelector<HTMLButtonElement>` can guide the static type but does not check that the selector really matched a button.

## Events need their own narrowing

```typescript
document.addEventListener("click", event => {
  if (event.target instanceof HTMLButtonElement) {
    console.log(event.target.textContent);
  }
});
```

An event target can be absent or be a different event target type. Narrow it instead of asserting that every click came from the desired element.

Use `null` checks when absence is expected, or report a clear initialization error when the page contract requires an element. Keep direct DOM work at an appropriate integration boundary if another library owns the same UI subtree.

```exercise
goal: "Verify that the query found a button before disabling it."
lang: typescript
code: |
  const element = document.querySelector("#save");
  if (element) {
    element.disabled = true;
  }
checks:
  - match: "if\\s+\\(element\\s+instanceof\\s+HTMLButtonElement\\)\\s+\\{"
    message: "Narrow with instanceof HTMLButtonElement."
hint: "Narrow with instanceof HTMLButtonElement."
```

```quiz
question: Does `querySelector<HTMLButtonElement>(selector)` verify the matched tag?
options:
  - Yes.
  - No; use a runtime check when the actual element type is uncertain.
  - Only for id selectors.
answer: 1
explain: The generic argument describes the result to the checker without validating the DOM match.
```
