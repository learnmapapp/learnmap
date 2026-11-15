---
title: "The satisfies operator"
icon: "✔️"
branch: "generics"
requires: ["const-assertions", "interfaces", "utility-types"]
summary: "Check a contract while retaining useful inferred detail."
---

`satisfies` checks an expression against a type while retaining its useful inferred shape:

```typescript
type Color = string | [number, number, number];
const palette = {
  primary: "#3178c6",
  accent: [97, 218, 251],
} satisfies Record<"primary" | "accent", Color>;
console.log(palette.primary.toUpperCase());
console.log(palette.accent[0].toFixed(0));
```

A broad annotation on `palette` would expose union-valued properties and require narrowing before string-specific operations. `satisfies` checks compatibility while preserving this expression's more specific information.

## It is still type checking

Unlike an unchecked assertion, `satisfies` reports incompatibility. It does not parse external data or freeze the object. Contextual typing can influence inference, so inspect the resulting type instead of assuming the operator never affects it.

For a static settings object, `as const satisfies Settings` can preserve literal readonly information and verify the intended shape together. Use the two features for their separate jobs: retaining precise inference and checking compatibility.

```exercise
goal: "Check the palette contract instead of asserting it."
lang: typescript
code: |
  type Color = string | [number, number, number];
  const palette = { primary: "#3178c6" } as Record<"primary", Color>;
  console.log(palette.primary.toUpperCase());
checks:
  - match: "satisfies\\s+Record<\"primary\",\\s+Color>"
    message: "Replace as with satisfies to check the contract."
hint: "Replace as with satisfies to check the contract."
```

```quiz
question: "How does satisfies differ from an unchecked assertion?"
options:
  - "It checks compatibility with the target contract."
  - "It creates a runtime validator."
  - "It always widens every property."
answer: 0
explain: "satisfies verifies compatibility; an assertion can bypass part of that checking."
```
