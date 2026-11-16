---
title: Enforce access on the server
icon: 🧪
branch: server
requires:
  - server-routes
  - cookies
summary: This minimal server-to-server token example checks access at the endpoint.
---

In your Nuxt 4 project, save this as `server/api/private.get.ts`. This minimal server-to-server token example checks access at the endpoint. Keep apiSecret private; a browser user session needs a proper session system and resource-level authorization.

```typescript
export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event);
  const token = getHeader(event, "authorization");
  if (!config.apiSecret || token !== `Bearer ${config.apiSecret}`) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }
  return { status: "authorized" };
});
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about enforce access on the server.
lang: typescript
code: |-
  export default defineEventHandler((event) => {
    const config = useRuntimeConfig(event);
    const token = getHeader(event, "authorization");
    if (!config.apiSecret || token !== `Bearer ${config.apiSecret}`) {
      throw createError({ statusCode: 200, statusMessage: "Unauthorized" });
    }
    return { status: "authorized" };
  });
checks:
  - match: statusCode:\s+401
    message: "Use statusCode: 401 for this step."
  - notMatch: statusCode:\s+200
    message: "Replace statusCode: 200 in the starting code."
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Where must the private endpoint reject an invalid token?
options:
  - Only in a browser route guard.
  - Inside the server's request handling.
  - Only in a navigation link's visibility condition.
answer: 1
explain: Clients can bypass UI checks and send requests directly to the endpoint.
```
