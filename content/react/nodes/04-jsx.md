---
title: "JSX rules"
icon: "🏷️"
branch: "rendering"
requires: ["components"]
summary: "Close tags, group siblings, and use JavaScript attribute names."
---
JSX looks like HTML, and it mostly is. But it's turned into JavaScript, which brings a few rules HTML doesn't have. Here's a snippet pasted straight from an HTML page. It has **four** problems. Can you spot them before reading on?

```html
<h1 class="title">Sign up</h1>
<label for="email">Email</label>
<input id="email" type="email">
<p onclick="alert('hi')">Help</p>
```

## The fixes

**1. One root element.** A component returns one value, so siblings need a parent. If you don't want an extra `<div>` in the page, use an empty [[fragment]], `<>...</>`:

```jsx
return (
  <>
    <h1>Sign up</h1>
    <label htmlFor="email">Email</label>
  </>
);
```

**2. Some attributes are renamed.** `class` and `for` are reserved words in JavaScript, so JSX uses `className` and `htmlFor`.

**3. Every tag must close.** `<input>` becomes `<input />`, and `<br>` becomes `<br />`.

**4. Attributes are camelCase, and events take functions.** `onclick` becomes `onClick`, and you pass it a function rather than a string of code. [Event handlers](node:events) covers that in depth.

The fixed version:

```jsx
export default function SignUp() {
  return (
    <>
      <h1 className="title">Sign up</h1>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" />
      <p onClick={() => alert("hi")}>Help</p>
    </>
  );
}
```

## Why the brackets around the return?

When JSX spans several lines, wrap it in `( )`. Without them, JavaScript would see a bare `return` on its own line and return `undefined`.

## What JSX really is

The build tool turns each tag into a function call. `<h1 className="title">Hi</h1>` becomes roughly:

```javascript
jsx("h1", { className: "title", children: "Hi" });
```

That's why attribute names follow JavaScript (`className`), and why the rules feel more like JavaScript than HTML.

```tip
`aria-*` and `data-*` attributes keep their dashes: `aria-label="Close"` and `data-id="7"` work as you'd expect.
```

```exercise
goal: "`class` is a JavaScript keyword, so JSX uses a different attribute name. Fix it."
lang: jsx
code: |
  export default function Title() {
    return <h1 class="title">Lessons</h1>;
  }
checks:
  - match: 'className="title"'
    message: "Change class to className."
hint: It's the DOM property name.
solution: |
  export default function Title() {
    return <h1 className="title">Lessons</h1>;
  }
```

```quiz
question: "How do you return two sibling elements without adding a wrapper `<div>` to the page?"
options:
  - "Return them as an array of strings."
  - "Wrap them in a fragment: `<>...</>`"
  - "Return two separate values."
answer: 1
explain: A fragment groups elements in JSX without adding anything to the page.
```
