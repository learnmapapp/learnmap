---
title: "Submitting forms"
icon: "📨"
branch: "forms"
requires: ["controlled-inputs"]
summary: "Use a form event so keyboard and pointer submission share one path."
---
A search box. The first attempt uses a click handler on the button:

```jsx
<div>
  <input value={query} onChange={e => setQuery(e.target.value)} />
  <button onClick={search}>Search</button>
</div>
```

It works, until someone presses Enter in the box. Nothing happens. People expect Enter to work, so you add an `onKeyDown` handler... and you're re-inventing what HTML already does.

## Use a real form

```jsx
export default function SearchBox({ onSearch }) {
  const [query, setQuery] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onSearch(query);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="q">Search</label>
      <input
        id="q"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}
```

`onSubmit` fires for **every** way of submitting: clicking the button, pressing Enter in a field, and assistive technology. One path, one handler.

## Why `preventDefault`?

A browser's default reaction to a form submission is to **navigate**: it sends the data to the URL in `action` and loads a new page. Your React app would be reloaded and lose its state. `event.preventDefault()` says "I'll handle this myself".

Don't confuse it with `event.stopPropagation()`, which stops the event from reaching parent elements' handlers. It doesn't prevent the navigation.

## Reading values without state

If you don't need the values while typing, skip the state and read the form when it's submitted:

```jsx
function handleSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  onSearch(data.get("q"));
}

<input id="q" name="q" />
```

`FormData` collects every field with a `name` attribute. Less code, and fewer renders.

```tip
Buttons inside a form default to `type="submit"`. Give other buttons in the form, such as "Cancel", `type="button"`, or they'll submit it too.
```

```compare javascript
form.addEventListener("submit", event => {
  event.preventDefault();
  search(new FormData(form).get("q"));
});
```

```exercise
goal: "`stopPropagation` doesn't stop the browser from navigating away. Use the method that does."
lang: jsx
code: |
  import { useState } from "react";
  export default function Form() {
    const [saved, setSaved] = useState(false);
    function submit(event) { event.stopPropagation(); setSaved(true); }
    return (
      <form onSubmit={submit}>
        <button type="submit">Save</button>
        <p>{saved ? "Saved" : "Ready"}</p>
      </form>
    );
  }
checks:
  - match: 'event\.preventDefault\(\);'
    message: "Use preventDefault to stop the form navigating."
hint: It prevents the browser's default behaviour.
solution: |
  import { useState } from "react";
  export default function Form() {
    const [saved, setSaved] = useState(false);
    function submit(event) { event.preventDefault(); setSaved(true); }
    return (
      <form onSubmit={submit}>
        <button type="submit">Save</button>
        <p>{saved ? "Saved" : "Ready"}</p>
      </form>
    );
  }
```

```quiz
question: "Why use `onSubmit` on the form instead of `onClick` on the button?"
options:
  - onClick doesn't work on buttons inside forms.
  - onSubmit also handles pressing Enter and other ways of submitting.
  - onSubmit is faster.
answer: 1
explain: Every submission method goes through the form's submit event.
```
