---
title: "Data in JSX"
icon: "💬"
branch: "rendering"
requires: ["jsx"]
summary: "Insert values with braces and derive text from ordinary JavaScript."
---
Curly braces are JSX's escape hatch back into JavaScript. Anything inside `{ }` is evaluated, and the result is shown:

```jsx
export default function Receipt() {
  const items = ["Tea", "Cake"];
  const total = 6.5;
  const customer = { name: "Ada", vip: true };

  return (
    <div>
      <h2>Thanks, {customer.name}!</h2>
      <p>{items.length} items: {items.join(", ")}</p>
      <p>Total: €{total.toFixed(2)}</p>
      <p>{customer.vip ? "Free delivery 🎉" : "Delivery: €3"}</p>
    </div>
  );
}
```

Variables, property reads, method calls, arithmetic, ternaries: any JavaScript **expression** works. An expression is anything that produces a value.

## What doesn't work in braces

**Statements.** `if`, `for` and `const` don't produce a value, so they can't go inside `{ }`. Do that work **above** the `return`, in plain JavaScript, and put the result in the braces. (Or use a ternary, as above.)

**Plain objects.** React doesn't know how to show `{customer}`. It crashes with "Objects are not valid as a React child". Pick out the part you want, like `{customer.name}`.

## What braces show

| Value | Shows |
| --- | --- |
| strings and numbers | the text |
| arrays | each item, one after another |
| `true`, `false`, `null`, `undefined` | nothing at all |
| JSX elements | the element |
| plain objects | a crash |

That "nothing at all" row is useful, and you'll lean on it in [conditional UI](node:conditional-rendering).

## Braces in attributes

Use braces instead of quotes to pass a computed value to an attribute:

```jsx
<img src={customer.avatarUrl} alt={`Photo of ${customer.name}`} />
```

Quotes mean a fixed string; braces mean "evaluate this". Don't combine them: `src="{url}"` is the literal text `{url}`.

```tip
Text in braces is automatically escaped. If `customer.name` contains `<script>`, it's shown as text, not run. React protects you from that whole class of injection bugs.
```

```compare javascript
// Template literals do the same job in plain JavaScript:
const html = `<h2>Thanks, ${customer.name}!</h2>`;
```

```exercise
goal: "React can't display a whole object. Show the learner's `name` instead."
lang: jsx
code: |
  export default function Greeting() {
    const learner = { name: "Ada" };
    return <h1>{learner}</h1>;
  }
checks:
  - match: '\{learner\.name\}'
    message: "Read learner.name inside the braces."
hint: Read one property with a dot.
solution: |
  export default function Greeting() {
    const learner = { name: "Ada" };
    return <h1>{learner.name}</h1>;
  }
```

```quiz
question: "What does `<p>{false}</p>` show?"
options:
  - The text "false".
  - An empty paragraph.
  - It throws an error.
answer: 1
explain: true, false, null and undefined render nothing.
```
