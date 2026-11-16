---
title: Test content helpers
icon: 🧪
branch: tools
requires:
  - schemas
summary: Install Vitest and run npx vitest run.
---

In your Astro project, save this as `tests/published.test.ts`. Install Vitest and run `npx vitest run`. Test plain data helpers directly; also run `npm run build` and check generated pages and links.

```typescript
import { describe, expect, it } from "vitest";
const published = (notes: { draft: boolean }[]) => notes.filter(note => !note.draft);
describe("published notes", () => {
  it("excludes drafts", () => {
    expect(published([{ draft: true }, { draft: false }])).toHaveLength(1);
  });
});
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about test content helpers.
lang: typescript
code: |-
  import { describe, expect, it } from "vitest";
  const published = (notes: { draft: boolean }[]) => notes.filter(note => !note.draft);
  describe("published notes", () => {
    it("excludes drafts", () => {
      expect(published([{ draft: true }, { draft: false }])).toHaveLength(2);
    });
  });
checks:
  - match: toHaveLength\(1\)
    message: Use toHaveLength(1) for this step.
  - notMatch: toHaveLength\(2\)
    message: Replace toHaveLength(2) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does the draft-filter unit test actually verify?
options:
  - That the hosting adapter handles all requests correctly.
  - That the helper excludes draft entries.
  - That every deployed route and link works.
answer: 1
explain: A focused unit test checks its behavior; a build and page checks cover other boundaries.
```
