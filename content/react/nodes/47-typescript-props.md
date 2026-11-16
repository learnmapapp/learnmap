---
title: "Typed props"
icon: "🔷"
branch: "quality"
requires: ["props", "children", "testing"]
summary: "Describe component inputs and callbacks in TSX."
---
If you know TypeScript, React components are just functions, and props are just their parameter. Here's a tour of the patterns you'll type most, using `.tsx` files (the [[tsx]] extension enables JSX in TypeScript). A Vite project created with the `react-ts` template is set up for this.

## Stop 1: a props type

```tsx
type Props = {
  label: string;
  variant?: "primary" | "secondary";   // optional, and only these two
  disabled?: boolean;
};

function Button({ label, variant = "primary", disabled }: Props) {
  return (
    <button className={variant} disabled={disabled}>
      {label}
    </button>
  );
}
```

Now `<Button lable="Save" />` is a red squiggle, and so is `variant="danger"`. Your editor autocompletes props as you type them.

## Stop 2: callbacks

Type what the parent receives:

```tsx
type SearchProps = {
  onSearch: (query: string) => void;
};
```

The parent can pass `onSearch={query => setQuery(query)}`, and `query` is inferred as `string` there, with no annotation.

## Stop 3: children

```tsx
import type { ReactNode } from "react";

type CardProps = {
  title: string;
  children: ReactNode;
};
```

`ReactNode` is anything React can render: JSX, strings, numbers, `null`, arrays of those.

## Stop 4: events

When the handler is written inline, TypeScript infers the event type. When it's a separate function, you name it:

```tsx
import type { ChangeEvent } from "react";

function handleChange(event: ChangeEvent<HTMLInputElement>) {
  setName(event.target.value);
}
```

Tip: hover over `onChange` in your editor to see which type it expects, then copy it.

## Stop 5: passing through HTML attributes

A wrapper around `<button>` that should accept anything a button accepts:

```tsx
import type { ComponentProps } from "react";

type FancyButtonProps = ComponentProps<"button"> & { icon: string };

function FancyButton({ icon, children, ...rest }: FancyButtonProps) {
  return <button {...rest}>{icon} {children}</button>;
}
```

## `type` or `interface`?

Either works for props. Pick one and be consistent. (The TypeScript course on this site covers the language itself in depth.)

```compare typescript
// The same type as a plain TypeScript function parameter:
function button(props: { label: string; disabled?: boolean }) {}
```

```exercise
goal: "`title` is declared as a number, but it holds text. Fix the type so the error goes away."
lang: tsx
code: |
  type Props = { title: number };
  function Heading({ title }: Props) { return <h1>{title}</h1>; }
  export default function App() { return <Heading title="Lessons" />; }
checks:
  - match: 'title:\s+string'
    message: "Use string for a textual title."
hint: Text in TypeScript is string.
solution: |
  type Props = { title: string };
  function Heading({ title }: Props) { return <h1>{title}</h1>; }
  export default function App() { return <Heading title="Lessons" />; }
```

```quiz
question: "Which type accepts any content a component can render as `children`?"
options:
  - "`string`"
  - "`JSX.Element`"
  - "`ReactNode`"
answer: 2
explain: JSX.Element only accepts a single element; ReactNode also allows text, numbers, null and arrays.
```
