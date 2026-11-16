---
title: "Form Actions"
icon: "📬"
branch: "forms"
requires: ["forms", "validation", "transitions"]
summary: "Use React 19 action state for form results and pending feedback."
---
React 19 added a new way to handle forms. To see why, let's follow one newsletter sign-up form through three generations.

## Generation 1: by hand

```jsx
function Signup() {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setPending(true);
    const result = await subscribe(email);
    setMessage(result.message);
    setPending(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <button disabled={pending}>Subscribe</button>
      <p>{message}</p>
    </form>
  );
}
```

Three pieces of state, `preventDefault`, and manual pending bookkeeping (which stays `true` forever if `subscribe` throws). This is what you learned in [Submitting forms](node:forms), and it works everywhere.

## Generation 2: a function as `action`

In React 19, a form's `action` prop can be a **function**. React calls it with the form's `FormData`, prevents the page reload for you, and resets the form's fields afterwards:

```jsx
<form action={async formData => {
  await subscribe(formData.get("email"));
}}>
  <input name="email" type="email" />
  <button>Subscribe</button>
</form>
```

No state for the input, no `preventDefault`. But how do we show the result, and a pending state?

## Generation 3: `useActionState`

```jsx
import { useActionState } from "react";

async function subscribeAction(previousState, formData) {
  const result = await subscribe(formData.get("email"));
  return { message: result.message };
}

export default function Signup() {
  const [state, formAction, isPending] = useActionState(
    subscribeAction,
    { message: "" },
  );

  return (
    <form action={formAction}>
      <input name="email" type="email" />
      <button disabled={isPending}>
        {isPending ? "Subscribing…" : "Subscribe"}
      </button>
      <p role="status">{state.message}</p>
    </form>
  );
}
```

`useActionState(action, initialState)` wraps your action and returns three things:

- **`state`**: whatever your action returned last time (or the initial state),
- **`formAction`**: the wrapped version, to pass to `<form action>`. Pass this one, not your original function, or the state won't update,
- **`isPending`**: true while the action runs. It's a [transition](node:transitions) underneath.

Your action receives the previous state as its first argument, which is useful for things like counting attempts.

## Bonus: `useFormStatus`

A submit button deep inside a form can find out whether the form is submitting, without props:

```jsx
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>Save</button>;
}
```

## Which generation should I use?

Generation 1 is still fine, especially when the UI must react while typing. Generations 2 and 3 shine for "fill in, submit, show the result" forms, and work with server functions in frameworks like Next.js.

```compare javascript
// Plain HTML forms also have an action: a URL to post to. React's
// version lets it be a function instead.
```

```exercise
goal: "The form uses `submit` directly, so `state` never updates. Pass the wrapped `formAction` from `useActionState`."
lang: jsx
code: |
  import { useActionState } from "react";
  async function submit(previous, data) { return { message: String(data.get("name") ?? "") }; }
  export default function Form() {
    const [state, formAction, pending] = useActionState(submit, { message: "" });
    return <form action={submit}><label>Name <input name="name" /></label><button disabled={pending}>Save</button><p>{state.message}</p></form>;
  }
checks:
  - match: 'action=\{formAction\}'
    message: Use formAction, the function returned by useActionState.
hint: It's the second item useActionState returns.
solution: |
  import { useActionState } from "react";
  async function submit(previous, data) { return { message: String(data.get("name") ?? "") }; }
  export default function Form() {
    const [state, formAction, pending] = useActionState(submit, { message: "" });
    return <form action={formAction}><label>Name <input name="name" /></label><button disabled={pending}>Save</button><p>{state.message}</p></form>;
  }
```

```quiz
question: "What is the first argument React passes to an action used with `useActionState`?"
options:
  - The FormData.
  - The previous state.
  - The submit event.
answer: 1
explain: "The signature is (previousState, formData)."
```
