---
title: "JSX rules"
icon: "🏷️"
branch: "rendering"
requires: ["components"]
summary: "Close tags, group siblings, and use JavaScript attribute names."
---

JSX resembles HTML but is transformed into JavaScript. Close every tag and return one root description:

```jsx
export default function Profile() {
  return (
    <>
      <h1 className="title">Ada</h1>
      <p>Learning React<br />one lesson at a time.</p>
    </>
  );
}
```

The empty wrapper is a [[fragment]]. It groups siblings without adding an extra DOM element. Use `className` instead of HTML's `class`, and `htmlFor` to associate a label with an input.

## Attributes are expressions too

Quoted attributes hold strings, while braces hold JavaScript expressions. `disabled={false}` supplies a boolean; `disabled="false"` is a string and does not mean the same thing.

Comments inside JSX use `{/* comment */}`. Parentheses around multiline returned JSX keep it connected to the `return` statement and avoid JavaScript's automatic semicolon insertion surprises.

JSX is a description, not a template language with its own loops. The next lessons use ordinary JavaScript expressions to make that description depend on data.

```exercise
goal: "Use the React attribute for a CSS class."
lang: jsx
code: |
  export default function Title() {
    return <h1 class="title">Lessons</h1>;
  }
checks:
  - match: "className=\"title\""
    message: "Change class to className."
hint: "Change class to className."
```

```quiz
question: "What does a fragment add to the browser DOM?"
options:
  - "A div wrapper."
  - "A fragment HTML tag."
  - "No extra element of its own."
answer: 2
explain: "Fragments group returned children without adding a wrapper element."
```
