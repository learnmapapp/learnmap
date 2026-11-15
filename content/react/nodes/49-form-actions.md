---
title: "Form Actions"
icon: "📬"
branch: "forms"
requires: ["forms", "validation", "transitions"]
summary: "Use React 19 action state for form results and pending feedback."
---

React 19 can pass a function to a form's `action`. With `useActionState`, the function receives previous action state followed by the submitted FormData:

```jsx
import { useActionState } from "react";

async function submitName(previous, formData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { message: "Enter a name." };
  await new Promise(resolve => setTimeout(resolve, 20));
  return { message: `Welcome, ${name}` };
}
export default function WelcomeForm() {
  const [state, formAction, pending] = useActionState(submitName, { message: "" });
  return <form action={formAction}>
    <label>Name <input name="name" /></label>
    <button type="submit" disabled={pending}>{pending ? "Saving" : "Continue"}</button>
    <p aria-live="polite">{state.message}</p>
  </form>;
}
```

The delay simulates work; it does not save anything to a server. This client Action is not automatically a Server Function. Real persistence needs a real trusted service and server-side validation.

## Respect the action context

Passing `formAction` to the form arranges the action context. Manually dispatching an async action needs an appropriate transition context for pending behavior. `useFormStatus`, from `react-dom`, can expose submission status to a descendant inside its parent form.

Successful function Actions can reset uncontrolled fields. Return an appropriate message and preserve input deliberately when the workflow requires it, especially after validation failure.

```exercise
goal: "Connect the returned action function to the form."
lang: jsx
code: |
  import { useActionState } from "react";
  async function submit(previous, data) { return { message: String(data.get("name") ?? "") }; }
  export default function Form() {
    const [state, formAction, pending] = useActionState(submit, { message: "" });
    return <form action={submit}><label>Name <input name="name" /></label><button disabled={pending}>Save</button><p>{state.message}</p></form>;
  }
checks:
  - match: "action=\\{formAction\\}"
    message: "Use formAction, the function returned by useActionState."
hint: "Use formAction, the function returned by useActionState."
```

```quiz
question: "What are the first two arguments of a useActionState function used with a form?"
options:
  - "The click event and the DOM node."
  - "Previous action state and submitted FormData."
  - "Only the new field string."
answer: 1
explain: "useActionState prepends the previous action state before the submitted payload."
```
