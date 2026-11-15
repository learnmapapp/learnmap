---
title: "Submitting forms"
icon: "📨"
branch: "forms"
requires: ["controlled-inputs"]
summary: "Use a form event so keyboard and pointer submission share one path."
---

A form's `onSubmit` handles its submission, including pressing Enter in an appropriate field:

```jsx
import { useState } from "react";

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(query.trim());
  }
  return <form onSubmit={handleSubmit}>
    <label>Search <input name="query" value={query} onChange={event => setQuery(event.target.value)} /></label>
    <button type="submit">Search</button>
    <p>{submitted}</p>
  </form>;
}
```

`preventDefault` stops the ordinary browser navigation for this client-handled form. A button inside a form defaults to submit; give auxiliary buttons `type="button"`.

## Read values deliberately

`new FormData(event.currentTarget)` reads named successful controls, which can avoid controlling every field. FormData entries may be strings or files, so validate before using them as application data.

Keep submission behavior in one place instead of attaching unrelated logic only to a button's click. [Form Actions](node:form-actions) later introduces React 19's action-oriented alternative.

```exercise
goal: "Prevent navigation when handling this form on the client."
lang: jsx
code: |
  import { useState } from "react";
  export default function Form() {
    const [saved, setSaved] = useState(false);
    function submit(event) { event.stopPropagation(); setSaved(true); }
    return <form onSubmit={submit}><button type="submit">Save</button><p>{saved ? "Saved" : "Ready"}</p></form>;
  }
checks:
  - match: "event\\.preventDefault\\(\\);"
    message: "Use preventDefault to stop default form navigation."
hint: "Use preventDefault to stop default form navigation."
```

```quiz
question: "Why attach submission logic to the form rather than only to a button click?"
options:
  - "It handles keyboard submission through the same path."
  - "It makes every field required."
  - "It prevents all network calls."
answer: 0
explain: "Forms provide semantic submission behavior for keyboard and pointer users."
```
