---
title: "Portals"
icon: "🌀"
branch: "experience"
requires: ["dom-refs", "context"]
summary: "Place DOM elsewhere while retaining React ancestry."
---
**The bug.** You build a nice modal dialog inside a product card. It looks fine in isolation. In the real page, it's cut off at the card's edges, and the header draws on top of it.

```jsx
function ProductCard({ product }) {
  const [open, setOpen] = useState(false);
  return (
    // .card has overflow: hidden and z-index: 1 in the CSS
    <div className="card">
      <button onClick={() => setOpen(true)}>Details</button>
      {open && (
        <Modal onClose={() => setOpen(false)}>{product.details}</Modal>
      )}
    </div>
  );
}
```

**The cause.** CSS. The modal's HTML lives inside the card, so it inherits the card's `overflow: hidden` clipping and is trapped in its stacking context. No `z-index: 9999` will get it out.

**The fix.** A [[portal]] renders a component's HTML somewhere else in the page, typically straight into `<body>`:

```jsx
import { createPortal } from "react-dom";

function Modal({ children, onClose }) {
  return createPortal(
    <div className="backdrop">
      <div role="dialog" aria-modal="true" className="modal">
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body,
  );
}
```

`createPortal(jsx, domNode)` takes what to render, and **where** in the real DOM to put it. Nothing else in `ProductCard` changes.

## The surprising part: React still sees it inside the card

The DOM and React disagree about where the modal is, on purpose:

| | Where the modal is |
| --- | --- |
| The browser's DOM | a direct child of `<body>` |
| React's component tree | inside `ProductCard` |

So, from React's point of view, nothing moved:

- It still receives props and reads [context](node:context) from `ProductCard`'s ancestors.
- Events bubble through **React** parents: a click in the modal reaches an `onClick` on the card.

That last one can surprise you. If the card itself is clickable, call `event.stopPropagation()` in the modal, or move the card's handler.

## Good uses

Modals, tooltips, dropdown menus, toasts: anything that must float above everything else.

```tip
For modals, the native `<dialog>` element with `showModal()` puts content in a top layer above everything, and handles Escape and focus for you. It's worth trying before building your own.
```

```compare javascript
// Without React, you'd append the element to the body yourself:
document.body.append(modalElement);
```

```exercise
goal: "`null` isn't a place in the page. Render the notice into `document.body`."
lang: jsx
code: |
  import { createPortal } from "react-dom";
  export default function Notice({ open = false }) {
    return open ? createPortal(<aside>Notice</aside>, null) : null;
  }
checks:
  - match: 'createPortal\(<aside>Notice</aside>,\s+document\.body\)'
    message: "Pass an existing DOM node such as document.body."
hint: The second argument is the DOM node to render into.
solution: |
  import { createPortal } from "react-dom";
  export default function Notice({ open = false }) {
    return open ? createPortal(<aside>Notice</aside>, document.body) : null;
  }
```

```quiz
question: "A button inside a portal is clicked. Its React parent has an `onClick`. Does that handler run?"
options:
  - No, the portal's HTML isn't inside the parent.
  - Yes, events bubble through the React tree, not the DOM tree.
  - Only if the portal targets the parent's DOM node.
answer: 1
explain: For React, a portal's children are still children of the component that rendered them.
```
