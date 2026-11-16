---
title: "Preserving state"
icon: "🪪"
branch: "architecture"
requires: ["state-structure", "keys"]
summary: "Identity in the rendered tree determines whether state survives."
---
**A mystery.** A chat app. You type "Hey Ada, about tomorr..." to Ada, then click on Grace in the contact list. The message box still says "Hey Ada, about tomorr...". Now Grace is about to get Ada's message.

```jsx
export default function Messenger() {
  const [to, setTo] = useState("Ada");
  return (
    <>
      <ContactList selected={to} onSelect={setTo} />
      <Chat contact={to} />
    </>
  );
}

function Chat({ contact }) {
  const [draft, setDraft] = useState("");
  return (
    <textarea
      placeholder={`Message ${contact}`}
      value={draft}
      onChange={e => setDraft(e.target.value)}
    />
  );
}
```

## The clue: state belongs to a position

React doesn't store state inside your component function. It stores it with the component's **position in the tree**: "the `Chat` inside `Messenger`, after `ContactList`". When you switch contacts, it's still a `Chat` in the same position, so React keeps its state. Only the `contact` prop changed.

Usually that's exactly what you want. Here, it isn't.

## The solution: a key

```jsx
<Chat key={to} contact={to} />
```

You've seen [keys](node:keys) in lists. They work anywhere: a key is part of a component's identity. Changing the key tells React "this is a **different** `Chat`". React throws away the old one, with its state, and creates a fresh one with an empty draft.

Mystery solved, with one attribute.

## Related rules

- **Same type in the same position: state is kept**, even if props change.
- **A different type in that position: state is reset.** Switching between `<Chat />` and `<Profile />` destroys the old one.
- **Removing a component destroys its state.** `{showChat && <Chat />}` loses the draft when hidden. If you need it to survive, [lift it up](node:lifting-state) to a parent that stays.

```tip
Want every contact to keep their own unfinished draft? Lift the drafts up into the parent as an object keyed by contact: `{ Ada: "Hey...", Grace: "" }`.
```

```compare javascript
// Without React, you'd clear it by hand when switching:
draftBox.value = "";
```

```exercise
goal: "Switching recipients keeps the old draft. Give `Draft` a key based on the recipient, so each one starts fresh."
lang: jsx
code: |
  import { useState } from "react";
  function Draft() {
    const [text, setText] = useState("");
    return <input aria-label="Draft" value={text} onChange={event => setText(event.target.value)} />;
  }
  export default function Editor({ recipient = "Ada" }) { return <Draft />; }
checks:
  - match: '<Draft\s+key=\{recipient\}\s+/>'
    message: "Give Draft the key recipient."
hint: "Write key={recipient} on the Draft element."
solution: |
  import { useState } from "react";
  function Draft() {
    const [text, setText] = useState("");
    return <input aria-label="Draft" value={text} onChange={event => setText(event.target.value)} />;
  }
  export default function Editor({ recipient = "Ada" }) { return <Draft key={recipient} />; }
```

```quiz
question: "A `<Timer />` stays at the same position, but its `label` prop changes. What happens to its state?"
options:
  - It resets to the initial value.
  - It's kept; only the props changed.
  - React throws an error.
answer: 1
explain: Same component type, same position, same state. Change the key to reset it.
```
