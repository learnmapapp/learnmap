---
title: "Validating JSON"
icon: "🛂"
branch: "applications"
requires: ["unknown", "discriminated-unions"]
summary: "Decode untrusted data into a trustworthy application contract."
---
This is the most important idea in the whole map, so here it is up front: **types don't exist at runtime.** TypeScript checks your code. It can't check the data that arrives while the program runs.

That's a problem at the edges, where data comes in:

```typescript
type User = { id: string; name: string };

const user: User = await res.json();   // compiles fine
user.name.toUpperCase();               // crashes if name is missing
```

`res.json()` returns `any`, and `any` can be assigned to `User` without a check. The annotation **looks** like a safety check, but it's just a hope.

## The pattern: `unknown` in, validated type out

Treat everything from outside as [unknown](node:unknown), and convert it to a real type in one place:

```typescript
function parseUser(data: unknown): User {
  if (typeof data !== "object" || data === null) {
    throw new Error("Expected an object");
  }
  if (!("id" in data) || typeof data.id !== "string") {
    throw new Error("Expected id to be a string");
  }
  if (!("name" in data) || typeof data.name !== "string") {
    throw new Error("Expected name to be a string");
  }
  return { id: data.id, name: data.name };
}

const user = parseUser(await res.json());   // checked for real
```

Bad data now fails at the door with a clear message, instead of deep in your UI.

## Use a library for real projects

Hand-written checks get long. Validation libraries let you describe the shape once, and give you **both** the runtime check and the type:

```typescript
import { z } from "zod";

const User = z.object({ id: z.string(), name: z.string() });
type User = z.infer<typeof User>;    // the type, for free

const user = User.parse(await res.json());
```

Zod is the most popular; Valibot and ArkType work the same way.

## Where the edges are

`fetch` responses, `JSON.parse`, `localStorage`, URL parameters, form data, `process.env`, messages from other windows and workers, and files. Validate there; inside your program, trust the types.

```compare python
user = User.model_validate(data)   # Pydantic: the same idea
```

```compare go
// json.Unmarshal checks field types, but missing fields become "".
```

```exercise
goal: "The check is inverted: it rejects strings and lets everything else through. Reject values that are **not** strings."
lang: typescript
code: |
  function decodeName(value: unknown): string {
    if (typeof value === "string") throw new Error("Expected name");
    return value;
  }
  console.log(decodeName("Ada"));
checks:
  - match: 'typeof\s+value\s*!==\s*"string"'
    message: "Throw when typeof value is not \"string\"."
hint: Swap === for !==.
solution: |
  function decodeName(value: unknown): string {
    if (typeof value !== "string") throw new Error("Expected name");
    return value;
  }
  console.log(decodeName("Ada"));
```

```quiz
question: "`const u: User = JSON.parse(text)` compiles. What has been checked?"
options:
  - That text contains a valid User.
  - Nothing about the data; JSON.parse returns any, which is accepted unchecked.
  - Only the property names.
answer: 1
explain: The annotation isn't a runtime check. You need to validate the parsed value.
```
