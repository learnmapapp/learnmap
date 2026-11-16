---
title: "Controlled inputs"
icon: "⌨️"
branch: "forms"
requires: ["state", "events"]
summary: "Keep an input value and the state that owns it synchronized."
---
Here's a live tweet box: a character counter, a warning colour near the limit, and a disabled button when it's empty. Every one of those features needs to know what's typed, **while** it's being typed.

```jsx
import { useState } from "react";

export default function TweetBox() {
  const [text, setText] = useState("");
  const left = 280 - text.length;

  return (
    <div>
      <textarea
        value={text}
        onChange={event => setText(event.target.value)}
      />
      <p className={left < 20 ? "warning" : ""}>{left} left</p>
      <button disabled={text.trim() === ""}>Post</button>
    </div>
  );
}
```

That's a [[controlled input]]: the textarea shows exactly what's in state, and every keystroke goes through state.

## The loop

1. You type "H".
2. `onChange` fires. `event.target.value` is `"H"`.
3. `setText("H")` stores it and triggers a render.
4. The textarea renders with `value="H"`.

It sounds roundabout, but it puts the text in your hands: you can transform it (`setText(value.toUpperCase())`), reject it (ignore input past 280 characters), or clear it after posting (`setText("")`).

## Gotcha 1: `value` without `onChange`

```jsx
<input value={text} />
```

You can't type in it. React keeps setting it back to `text`, which never changes. (React warns about this in the console.)

## Gotcha 2: checkboxes use `checked`

```jsx
const [agree, setAgree] = useState(false);

<input
  type="checkbox"
  checked={agree}
  onChange={event => setAgree(event.target.checked)}
/>
```

For a checkbox, `event.target.value` is the string `"on"`, whether it's ticked or not. You want `checked`, which is `true` or `false`.

## Gotcha 3: numbers arrive as strings

`event.target.value` is always a string, even in `<input type="number">`. Convert it when you need a number: `Number(event.target.value)`.

## Do I always need this?

No. If you only need the values when a form is submitted, you can read them then, with no state at all. [Submitting forms](node:forms) and [Form actions](node:form-actions) show how. Control an input when the UI must react while typing.

```compare javascript
// Without React: read the field when you need it.
const text = textarea.value;
```

```exercise
goal: "For a checkbox, `event.target.value` is always `\"on\"`. Read `event.target.checked` instead."
lang: jsx
code: |
  import { useState } from "react";
  export default function Toggle() {
    const [enabled, setEnabled] = useState(false);
    return (
      <label>
        <input type="checkbox" checked={enabled} onChange={event => setEnabled(event.target.value)} />
        Enabled
      </label>
    );
  }
checks:
  - match: 'setEnabled\(event\.target\.checked\)'
    message: Read event.target.checked for a checkbox.
hint: Swap value for checked.
solution: |
  import { useState } from "react";
  export default function Toggle() {
    const [enabled, setEnabled] = useState(false);
    return (
      <label>
        <input type="checkbox" checked={enabled} onChange={event => setEnabled(event.target.checked)} />
        Enabled
      </label>
    );
  }
```

```quiz
question: "An input has `value={name}` but no `onChange`. What happens when you type?"
options:
  - The text changes and state updates automatically.
  - Nothing appears to change; the input stays stuck at name.
  - React throws an error and stops rendering.
answer: 1
explain: The input always shows name, and nothing ever updates it.
```
