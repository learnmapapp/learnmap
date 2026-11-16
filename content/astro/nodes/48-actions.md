---
title: Actions
icon: "⚡"
branch: server
requires: [server-rendering, schemas]
summary: Define validated server functions once with defineAction, and call them from scripts or forms.
---
**Refactor time.** Here's an endpoint that adds a comment, and the browser code that calls it:

```typescript title=src/pages/api/comment.ts
import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const valid = typeof body.postId === "string" && typeof body.text === "string";
  if (!valid || body.text.length < 2) {
    return new Response("Invalid input", { status: 400 });
  }
  const comment = await saveComment(body.postId, body.text);
  return Response.json(comment);
};
```

```typescript
const res = await fetch("/api/comment", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ postId, text }),
});
if (!res.ok) showError(await res.text());
const comment = await res.json(); // any type
```

Manual validation, a hand-written URL, JSON plumbing on both sides, and an untyped result. **Actions** replace all of it.

**After: one action.** Actions live in `src/actions/index.ts`, exported as `server`:

```typescript title=src/actions/index.ts
import { defineAction } from "astro:actions";
import { z } from "astro/zod";

export const server = {
  addComment: defineAction({
    input: z.object({
      postId: z.string(),
      text: z.string().min(2),
    }),
    handler: async ({ postId, text }) => {
      return await saveComment(postId, text);
    },
  }),
};
```

**Calling it from the browser:**

```typescript
import { actions } from "astro:actions";

const { data, error } = await actions.addComment({ postId, text });
if (error) showError(error.message);
else showComment(data);
```

**What the refactor bought us:**

- **Validation from a Zod schema**, the same kind you wrote for [collections](node:schemas). Bad input never reaches the handler.
- **No URLs or fetch code.** `actions.addComment(...)` is a typed function call; Astro creates the endpoint.
- **Typed results.** `data` has the handler's return type, and your editor knows it.
- **Errors as values.** `{ data, error }` instead of try/catch around status codes.

**From an HTML form, without JavaScript.** Add `accept: "form"` to the action, and point a form at it:

```astro
---
import { actions } from "astro:actions";
---
<form method="POST" action={actions.addComment}>
  <input type="hidden" name="postId" value={post.id} />
  <textarea name="text"></textarea>
  <button>Post comment</button>
</form>
```

The schema parses the form fields for you. The page's frontmatter can read the outcome with `Astro.getActionResult(actions.addComment)`.

Actions run on the server, so the project needs an [[adapter]] and [server rendering](node:server-rendering).

```compare javascript
// The "before" code above: fetch + JSON + manual checks.
```

```compare typescript
// Next.js server actions and tRPC procedures solve the same problem.
```

```compare python
# Django forms: a Form class validates, then the view handles
# cleaned_data.
```

```exercise
goal: "Validate the input: give the action an `input` schema of `z.object({ email: z.string().email() })`."
lang: typescript
code: |-
  import { defineAction } from "astro:actions";
  import { z } from "astro/zod";

  export const server = {
    subscribe: defineAction({
      handler: async ({ email }) => {
        return { subscribed: email };
      },
    }),
  };
checks:
  - match: 'input:\s*z\.object\(\s*\{\s*email:\s*z\.string\(\)\.email\(\)\s*,?\s*\}\s*\)'
    message: 'Add input: z.object({ email: z.string().email() }), before handler.'
solution: |-
  import { defineAction } from "astro:actions";
  import { z } from "astro/zod";

  export const server = {
    subscribe: defineAction({
      input: z.object({ email: z.string().email() }),
      handler: async ({ email }) => {
        return { subscribed: email };
      },
    }),
  };
```

```quiz
question: "A browser calls `actions.addComment({ postId: \"x\", text: \"!\" })`. With `text: z.string().min(2)`, what happens?"
options:
  - The handler runs and saves the comment.
  - Validation fails, the handler doesn't run, and the call returns an error.
  - The browser throws before sending anything.
answer: 1
explain: Input is validated on the server against the schema; the result has error set.
```
