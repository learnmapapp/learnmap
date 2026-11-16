---
title: "Children"
icon: "🎁"
branch: "rendering"
requires: ["props"]
summary: "Build wrappers that accept nested content instead of knowing every use case."
---
**Version 1** of a reusable card component. It takes the content as props:

```jsx
function Card({ title, text }) {
  return (
    <section className="card">
      <h2>{title}</h2>
      <p>{text}</p>
    </section>
  );
}
```

Then the requests arrive. "Can the card contain a list?" "An image and a button?" "Two paragraphs?" You add `image`, `buttonLabel`, `items`... and the component turns into a monster of special cases.

**Version 2** gets out of the way. Whatever you put **between** the tags arrives as a prop called `children`:

```jsx
function Card({ title, children }) {
  return (
    <section className="card">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
```

```jsx
<Card title="Today">
  <p>Three lessons to go.</p>
  <button>Continue</button>
</Card>

<Card title="Photo of the day">
  <img src="/cat.jpg" alt="A cat on a keyboard" />
</Card>
```

The card handles the frame (the border, padding and heading) and doesn't care what's inside. That's [[composition]]: building bigger things by nesting pieces, instead of configuring one piece with endless options.

## Where you'll use this

Layouts, modals, panels, tooltips, page sections: anything that's "a box around something". If you're about to add a fifth prop that's really just "more content", reach for `children`.

## Several slots

`children` is one slot. When you need more, pass elements through ordinary props:

```jsx
<Layout sidebar={<Nav />} header={<Logo />}>
  <Article />
</Layout>
```

JSX elements are just values, so any prop can hold them.

```compare javascript
// Without React, you'd pass a DOM node and append it:
card.append(contentNode);
```

```exercise
goal: "`Panel` receives `children`, but renders an empty section. Render them inside it."
lang: jsx
code: |
  function Panel({ children }) { return <section />; }
  export default function App() { return <Panel><p>Ready</p></Panel>; }
checks:
  - match: '<section>\{children\}</section>'
    message: "Render children inside the section."
hint: The section needs an opening and a closing tag, with children in braces between them.
solution: |
  function Panel({ children }) { return <section>{children}</section>; }
  export default function App() { return <Panel><p>Ready</p></Panel>; }
```

```quiz
question: "In `<Card><p>Hi</p></Card>`, how does Card get the paragraph?"
options:
  - "As props.children"
  - "As props.content"
  - "It can't; only text can go between the tags."
answer: 0
explain: Content between the tags is passed as the children prop.
```
