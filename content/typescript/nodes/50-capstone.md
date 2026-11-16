---
title: "A typed API client"
icon: "🚢"
branch: "applications"
requires: ["json-validation", "typed-errors", "modules", "testing-types"]
summary: "Combine runtime decoding with an honest asynchronous result."
---
Time to put the map together. We'll build a small, typed client for a to-do API, in four short files. Each one uses ideas from different branches, linked as we go.

## 1. The domain types

```typescript title=src/types.ts
export type Todo = {
  readonly id: number;
  title: string;
  done: boolean;
};

export type NewTodo = Omit<Todo, "id">;
export type TodoPatch = Partial<NewTodo>;

export type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };
```

[Utility types](node:utility-types) derive the variations from `Todo`, so there's one source of truth. `Result` is a [discriminated union](node:discriminated-unions) for failures we expect.

## 2. The border guard

Everything from the network is [unknown](node:unknown) until [validated](node:json-validation):

```typescript title=src/decode.ts
import type { Todo } from "./types.js";

function isTodo(data: unknown): data is Todo {
  return (
    typeof data === "object" && data !== null &&
    "id" in data && typeof data.id === "number" &&
    "title" in data && typeof data.title === "string" &&
    "done" in data && typeof data.done === "boolean"
  );
}

export function decodeTodos(data: unknown): Todo[] {
  if (!Array.isArray(data) || !data.every(isTodo)) {
    throw new Error("Unexpected response shape");
  }
  return data;
}
```

`isTodo` is a [type guard](node:type-guards), so `data.every(isTodo)` narrows the whole array.

## 3. One generic request function

```typescript title=src/client.ts
import type { Result } from "./types.js";

export async function request<T>(
  path: string,
  decode: (data: unknown) => T,
  init?: RequestInit,
): Promise<Result<T>> {
  try {
    const res = await fetch(`https://api.example.com${path}`, init);
    if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };
    const body: unknown = await res.json();
    return { ok: true, value: decode(body) };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed";
    return { ok: false, error: message };
  }
}
```

[Generics](node:generics) connect the decoder's return type to the result. `body: unknown` deliberately refuses the `any` from `res.json()`. And the `catch` handles [errors of any type](node:typed-errors).

## 4. Using it

```typescript title=src/main.ts
import { request } from "./client.js";
import { decodeTodos } from "./decode.js";

const result = await request("/todos", decodeTodos);

if (result.ok) {
  const open = result.value.filter(todo => !todo.done);
  console.log(`${open.length} things left to do`);
} else {
  console.error(`Could not load todos: ${result.error}`);
}
```

No annotations in sight, and yet `todo` is a fully typed `Todo`. That's [inference](node:inference) doing the work you set up in the other files.

## Where to go next

Turn on `noUncheckedIndexedAccess`, swap the hand-written guard for Zod, and add an `updateTodo(id, patch: TodoPatch)`. If you followed the whole map, you know every piece you need. Congratulations! 🦉

```compare python
# The same design in Python: dataclasses, a Pydantic model at the
# border, and a Result-style return value.
```

```compare rust
// reqwest + serde does decoding and typing in one step:
// let todos: Vec<Todo> = client.get(url).send().await?.json().await?;
```

```exercise
goal: "`any` at the boundary would let unchecked data through. Make `read` return `Promise<unknown>`, so the data must be decoded."
lang: typescript
code: |
  async function readValue(read: () => Promise<any>): Promise<unknown> {
    return await read();
  }
  readValue(async () => ({ name: "Ada", score: 42 })).then(value => console.log(value));
checks:
  - match: 'read:\s*\(\)\s*=>\s*Promise<unknown>'
    message: Use Promise<unknown> for the read function's result.
hint: Only the type inside the first Promise<...> changes.
solution: |
  async function readValue(read: () => Promise<unknown>): Promise<unknown> {
    return await read();
  }
  readValue(async () => ({ name: "Ada", score: 42 })).then(value => console.log(value));
```

```quiz
question: "In `request`, why is the body declared as `const body: unknown = await res.json()`?"
options:
  - "It makes the request faster."
  - "res.json() returns any; unknown forces the data through the decoder before use."
  - "TypeScript requires it for await."
answer: 1
explain: Annotating as unknown stops any from leaking into the rest of the program.
```
