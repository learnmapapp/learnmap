---
title: "Data in JSX"
icon: "💬"
branch: "rendering"
requires: ["jsx"]
summary: "Insert values with braces and derive text from ordinary JavaScript."
---

Braces switch from JSX markup to a JavaScript expression:

```jsx
export default function Summary() {
  const learner = { name: "Ada", completed: 3 };
  return (
    <p title={`${learner.completed} completed`}>
      {learner.name} finished {learner.completed + 1} steps.
    </p>
  );
}
```

Expressions can read variables, call pure helpers, or compute values. A statement such as `if` does not fit directly inside braces; calculate a value first or use a conditional expression.

## Render values, not whole records

Strings and numbers can be displayed as children. An ordinary object such as `{ name: "Ada" }` cannot be rendered directly; select its fields or map it into components.

React escapes ordinary text content rather than interpreting it as raw HTML. `dangerouslySetInnerHTML` is a separate escape hatch requiring a trustworthy HTML sanitization boundary; normal text interpolation does not need it.

Keep expressions readable. If markup contains a long transformation, give the intermediate value or helper a clear name before the return statement.

```exercise
goal: "Render the learner name, not the entire object."
lang: jsx
code: |
  export default function Greeting() {
    const learner = { name: "Ada" };
    return <h1>{learner}</h1>;
  }
checks:
  - match: "\\{learner\\.name\\}"
    message: "Read learner.name inside the braces."
hint: "Read learner.name inside the braces."
```

```quiz
question: "How should an ordinary record be displayed in JSX?"
options:
  - "Render the whole object directly."
  - "Select its fields or map it into UI."
  - "Convert it into a component by naming the variable in capitals."
answer: 1
explain: "Plain objects are not valid children; render useful field values or components."
```
