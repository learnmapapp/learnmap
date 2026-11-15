---
title: "Typed props"
icon: "🔷"
branch: "quality"
requires: ["props", "children", "testing"]
summary: "Describe component inputs and callbacks in TSX."
---

A `.tsx` file combines TypeScript syntax with JSX. Define a props contract and annotate the destructured parameter:

```tsx
import type { ReactNode } from "react";

type CardProps = {
  title: string;
  children?: ReactNode;
  onSelect?: (title: string) => void;
};
function Card({ title, children, onSelect }: CardProps) {
  return <section><h2>{title}</h2>{children}
    <button onClick={() => onSelect?.(title)}>Select</button></section>;
}
export default function App() {
  return <Card title="State"><p>Remember a value.</p></Card>;
}
```

`ReactNode` describes renderable children. Use a more specific type when an API truly requires one element rather than any renderable content.

## Types support the component API

Type callbacks by the meaningful value they communicate. A child that reports a selected id can accept `(id: string) => void`, avoiding unnecessary coupling to its internal DOM event.

TypeScript catches invalid checked callers, but it does not validate network data before those values become props. Use the same runtime boundary discipline as ordinary TypeScript. The separate [TypeScript course](#/typescript) develops those contracts in depth.

```exercise
goal: "Type the title prop as text rather than a number."
lang: tsx
code: |
  type Props = { title: number };
  function Heading({ title }: Props) { return <h1>{title}</h1>; }
  export default function App() { return <Heading title="Lessons" />; }
checks:
  - match: "title:\\s+string"
    message: "Use string for a textual title."
hint: "Use string for a textual title."
```

```quiz
question: "Which extension supports TypeScript annotations together with JSX?"
options:
  - ".ts for every case"
  - ".tsx"
  - ".css"
answer: 1
explain: "TSX allows both TypeScript and JSX syntax in the same source file."
```
