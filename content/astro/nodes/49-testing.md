---
title: Test and check
icon: "✅"
branch: tools
requires: [schemas]
summary: Catch problems before your visitors do, with astro check, unit tests and the build itself.
---
**A pre-flight checklist.** Pilots run through the same list before every takeoff. Here's one for an Astro site, from fastest to slowest.

**☐ 1. Type-check the templates.**

```repl shell
> npx astro check
src/pages/blog/[id].astro:14:22
  error ts(2339): Property 'titel' does not exist.
Result (38 files): 1 error, 0 warnings
```

`astro check` runs TypeScript over your `.astro` files too, including props, [collection](node:schemas) data and `Astro.params`. It catches typos and missing props. (The first run offers to install `@astrojs/check`.)

**☐ 2. Unit-test your logic.** Keep logic, like sorting, filtering and formatting, in plain `.ts` files, and test it with Vitest, which runs on the same Vite setup as Astro:

```typescript title=src/lib/posts.ts
type Post = { data: { draft: boolean } };

export function published<T extends Post>(posts: T[]): T[] {
  return posts.filter((post) => !post.data.draft);
}
```

```typescript title=src/lib/posts.test.ts
import { describe, expect, it } from "vitest";
import { published } from "./posts";

describe("published", () => {
  it("leaves out drafts", () => {
    const posts = [{ data: { draft: true } }, { data: { draft: false } }];
    expect(published(posts)).toHaveLength(1);
  });
});
```

```repl shell
> npx vitest run
 ✓ src/lib/posts.test.ts (1 test)
```

To make Vitest understand Astro's virtual modules, create `vitest.config.ts` with `getViteConfig` from `astro/config`.

**☐ 3. Build it.** `npm run build` is a test in itself. It renders every page, runs every [schema](node:schemas) and every `getStaticPaths`. A broken entry stops the build.

**☐ 4. Click through the result.** `npm run preview` serves the built site. Check a few pages, the 404 page and the feed.

**☐ 5. (Optional) Test in a real browser.** For islands and forms, Playwright can open pages and click buttons. Point it at `npm run preview`.

**Automate the list.** Put steps 1 to 3 in CI, so every push is checked:

```json title=package.json
{
  "scripts": {
    "check": "astro check && vitest run && astro build"
  }
}
```

```compare javascript
// Same tools as any Vite project: vitest for units, playwright for
// browsers.
```

```compare typescript
// astro check is to .astro files what tsc --noEmit is to .ts files.
```

```compare python
# pytest for logic, plus building the site in CI to catch broken
# templates.
```

```exercise
goal: "Complete the test: assert that `slugify(\"Hello World\")` equals `\"hello-world\"` with `expect(...).toBe(...)`."
lang: typescript
code: |-
  import { expect, it } from "vitest";
  import { slugify } from "./slugify";

  it("lowercases and joins words with dashes", () => {
  });
checks:
  - match: 'expect\(\s*slugify\(\s*"Hello World"\s*\)\s*\)\.toBe\(\s*"hello-world"\s*\)'
    message: 'Write expect(slugify("Hello World")).toBe("hello-world");'
solution: |-
  import { expect, it } from "vitest";
  import { slugify } from "./slugify";

  it("lowercases and joins words with dashes", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });
```

```quiz
question: "Which command reports a misspelled prop in an .astro file without building the site?"
options:
  - "npm run dev"
  - "npx astro check"
  - "npx vitest run"
answer: 1
explain: astro check type-checks .astro files as well as .ts files.
```
