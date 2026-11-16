---
title: A server API route
icon: 🧩
branch: server
requires:
  - setup
summary: A file under server/api creates an API endpoint at the project root.
---

In your Nuxt 4 project, save this as `server/api/course.get.ts`. A file under `server/api` creates an API endpoint at the project root. Nitro serializes this returned object into JSON.

A useful term here is [[Nitro]]: The server engine used by Nuxt to build and run server routes.

```typescript
export default defineEventHandler(() => {
  return { title: "Nuxt course" };
});
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about a server api route.
lang: typescript
code: |-
  export default defineEventHandler(() => {
    return { title: "Unknown" };
  });
checks:
  - match: title:\s+"Nuxt\s+course"
    message: 'Use title: "Nuxt course" for this step.'
  - notMatch: title:\s+"Unknown"
    message: 'Replace title: "Unknown" in the starting code.'
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which URL is handled by `server/api/course.get.ts`?
options:
  - GET `/api/course`.
  - POST `/app/course`.
  - GET `/server/api/course.get.ts`.
answer: 0
explain: The file path and suffix define the route and HTTP method.
```
