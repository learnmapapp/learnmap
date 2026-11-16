---
title: "Unknown errors"
icon: "🛟"
branch: "applications"
requires: ["async-await", "unknown"]
summary: "Narrow a caught value before reading its message."
---
**The case of the missing message.** A support ticket reads: "The error popup just says *undefined*." The code looks innocent:

```typescript
try {
  await saveDraft(draft);
} catch (error) {
  showPopup(error.message);
}
```

**Clue 1:** in JavaScript, you can `throw` anything. Not just `Error` objects:

```typescript
throw new Error("Disk full");    // has .message
throw "Disk full";               // a plain string: no .message
throw { code: 507 };             // an object: no .message
```

Some library deep inside `saveDraft` throws a string. `"Disk full".message` is `undefined`. Case closed.

**Clue 2:** TypeScript knew. In [strict mode](node:tsconfig), the `catch` variable is [unknown](node:unknown), precisely because anything can arrive:

```typescript
} catch (error) {
  showPopup(error.message);
  //        ~~~~~ 'error' is of type 'unknown'.
}
```

Someone silenced it with `catch (error: any)`. That's the real culprit.

## The fix: narrow, then read

```typescript
function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Something went wrong";
}

try {
  await saveDraft(draft);
} catch (error) {
  showPopup(errorMessage(error));
}
```

`instanceof Error` also matches subclasses like `TypeError`, and your own.

## Your own error classes

Subclass `Error` to add details that callers can check for:

```typescript
class HttpError extends Error {
  constructor(readonly status: number, message: string) {
    super(message);
    this.name = "HttpError";
  }
}

try {
  await saveDraft(draft);
} catch (error) {
  if (error instanceof HttpError && error.status === 401) {
    redirectToLogin();
  }
}
```

## Or: don't throw

For failures that are **expected** (validation, "not found"), many teams return them as values instead, using a [discriminated union](node:discriminated-unions). Then the possible errors are in the type, where the checker can see them:

```typescript
type Result<T> = { ok: true; value: T } | { ok: false; error: string };
```

```compare java
catch (IOException e) { e.getMessage(); }   // typed by the catch
```

```compare rust
// No exceptions: Result<T, E> puts the error in the type.
```

```exercise
goal: "The check looks for a string, then reads `.message`, which strings don't have. Check for an `Error` instead."
lang: typescript
code: |
  function message(error: unknown): string {
    if (typeof error === "string") return error.message;
    return "Unknown failure";
  }
  console.log(message(new Error("offline")));
checks:
  - match: 'error\s+instanceof\s+Error'
    message: "Use instanceof Error before reading error.message."
hint: Replace the typeof check with an instanceof check.
solution: |
  function message(error: unknown): string {
    if (error instanceof Error) return error.message;
    return "Unknown failure";
  }
  console.log(message(new Error("offline")));
```

```quiz
question: "Why is the `catch` variable `unknown` in strict mode?"
options:
  - Because errors are always strings.
  - Because JavaScript code can throw any value, not only Error objects.
  - Because TypeScript can't type exceptions at all.
answer: 1
explain: "throw \"oops\" and throw 42 are both legal, so the type has to allow anything."
```
