---
title: "Unknown errors"
icon: "🛟"
branch: "applications"
requires: ["async-await", "unknown"]
summary: "Narrow a caught value before reading its message."
---

JavaScript can throw any value, including a string or `null`. Under strict checking, a catch variable is `unknown`:

```typescript
function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
try {
  throw new Error("Connection unavailable");
} catch (error) {
  console.log(errorMessage(error));
}
```

`instanceof Error` proves the familiar error shape for ordinary errors in the same runtime realm. Integrations spanning different realms or custom error payloads may need a different validated contract.

## Expected versus unexpected failure

A `Result` union can make expected failures explicit, such as validation rejecting a missing field. Exceptions still suit failures that interrupt the current operation and should be handled farther out.

When wrapping an error, add useful context and preserve the cause when supported, rather than replacing the original message with a generic failure. Do not assert every caught value as `Error`: that hides the very uncertainty the catch boundary is meant to handle.

```exercise
goal: "Recognize Error objects before reading message."
lang: typescript
code: |
  function message(error: unknown): string {
    if (typeof error === "string") return error.message;
    return "Unknown failure";
  }
  console.log(message(new Error("offline")));
checks:
  - match: "error\\s+instanceof\\s+Error"
    message: "Use instanceof Error to justify reading error.message."
hint: "Use instanceof Error to justify reading error.message."
```

```quiz
question: "Why is a catch variable unknown under strict checking?"
options:
  - "Because only strings can be thrown."
  - "Because JavaScript can throw values that are not Error objects."
  - "Because the function must be async."
answer: 1
explain: "The runtime permits arbitrary thrown values, so property access needs narrowing."
```
