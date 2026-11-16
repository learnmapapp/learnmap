---
title: "Typed modules"
icon: "🧱"
branch: "tooling"
requires: ["type-aliases", "functions"]
summary: "Export reusable contracts and distinguish type-only imports."
---

ES modules give files explicit exports and imports. Put a contract and implementation in one module:

```typescript title=learner.ts
export type Learner = { name: string; score: number };
export function describe(learner: Learner): string {
  return `${learner.name}: ${learner.score}`;
}
```

A consumer can import the value and type separately:

```typescript title=main.ts
import { describe } from "./learner.js";
import type { Learner } from "./learner.js";
const learner: Learner = { name: "Ada", score: 42 };
console.log(describe(learner));
```

The `.js` specifier here describes the emitted module path; TypeScript can resolve it to the source `.ts` file. Exact extension rules depend on the host and module-resolution configuration.

## Type-only means erased

`import type` makes it explicit that a dependency is needed only for checking. It cannot be used to call a constructor or access a runtime constant. Exporting a type does not export a runtime object.

Keep imports compatible with the actual bundler or runtime. A `paths` alias in the checker alone does not necessarily rewrite emitted imports or teach the runtime where to find a module.

```exercise
goal: "Mark the imported interface as type-only."
lang: typescript
code: |
  import { Learner } from "./learner.js";
  export const learner: Learner = { name: "Ada", score: 42 };
checks:
  - match: "import\\s+type\\s+\\{\\s+Learner\\s+\\}"
    message: "Use import type for the erased contract."
hint: "Use import type for the erased contract."
```

```quiz
question: Can `import type { Learner }` create a Learner object at runtime?
options:
  - Yes.
  - No; it brings in a static contract only.
  - Only in production.
answer: 1
explain: Type-only imports are erased and cannot be used as runtime values.
```
