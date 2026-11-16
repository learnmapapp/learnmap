---
title: "Accessible controls"
icon: "♿"
branch: "experience"
requires: ["validation", "dom-refs"]
summary: "Use semantics, connected labels, visible focus, and understandable feedback."
---
**Try this:** put your mouse away and use any web app with only the keyboard. Tab moves forward, Shift+Tab back, Enter and Space activate. You'll probably find a button you can't reach, or lose track of where you are. Here's how to make sure your React components pass that test, as a set of before/after pairs.

## Use real buttons

```jsx
// ❌ can't be reached with Tab, Enter does nothing, screen readers
// announce it as plain text
<div className="button" onClick={save}>Save</div>

// ✅ all of that, for free
<button type="button" onClick={save}>Save</button>
```

A `<div>` with a click handler needs `role`, `tabIndex` and a key handler to get close to what `<button>` already does. Use links (`<a href>`) for navigation and buttons for actions.

## Label every input

```jsx
// ❌ a placeholder disappears when you type, and isn't a reliable label
<input placeholder="Email" />

// ✅
<label htmlFor="email">Email</label>
<input id="email" type="email" />
```

For an icon-only button, give it a name: `<button aria-label="Close">✕</button>`.

## Keep focus visible

```css
/* ❌ */
button:focus { outline: none; }

/* ✅ restyle it if you like, but keep it */
button:focus-visible { outline: 3px solid teal; outline-offset: 2px; }
```

## Move focus when the context changes

When a dialog opens, focus should move into it, and go back to the opening button when it closes. That's a job for a [DOM ref](node:dom-refs).

## Announce changes

```jsx
// A message that appears after saving, read out by screen readers:
<p role="status">{saved && "Saved!"}</p>
```

Keep the element on the page and change its text; some screen readers miss regions that are added and filled at the same time.

## Don't rely on colour alone

"Fields in red are invalid" fails for colour-blind users. Add text or an icon.

## A three-minute check

1. Tab through the page. Can you reach and use everything? Can you see where you are?
2. Zoom to 200%. Does it still work?
3. Run the accessibility checker in your browser's developer tools.

```compare javascript
// The same rules apply to any HTML; React doesn't change them.
// It just makes reusable components easy, so fix it once.
```

```exercise
goal: "A clickable `div` can't be reached with the keyboard. Use a real `button`, with `type=\"button\"`."
lang: jsx
code: |
  export default function ContinueButton() {
    return <div onClick={() => console.log("continue")}>Continue</div>;
  }
checks:
  - match: '<button\s+type="button"'
    message: "Use a button with native keyboard behaviour."
hint: "Swap div for button in both tags, and add type=\"button\"."
solution: |
  export default function ContinueButton() {
    return <button type="button" onClick={() => console.log("continue")}>Continue</button>;
  }
```

```quiz
question: "What's wrong with using only a placeholder as an input's label?"
options:
  - Placeholders can't contain spaces.
  - It disappears once you type, and assistive technology may not treat it as a label.
  - React doesn't support placeholders.
answer: 1
explain: Use a visible label element connected with htmlFor.
```
