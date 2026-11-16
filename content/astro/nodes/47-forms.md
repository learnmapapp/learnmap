---
title: Handle an HTML form
icon: 🛠️
branch: server
requires:
  - server-rendering
summary: Validate submitted data on the server even when HTML has required fields.
---

In your Astro project, save this as `src/pages/index.astro`. Validate submitted data on the server even when HTML has required fields. This demonstration acknowledges input without persisting it; real mutations need appropriate authorization and storage.

```astro
---
export const prerender = false;
let message = "";
if (Astro.request.method === "POST") {
  const data = await Astro.request.formData();
  const title = data.get("title");
  message = typeof title === "string" && title.trim() ? "Accepted" : "Title required";
}
---
<form method="post"><label>Title <input name="title" required /></label><button>Submit</button></form>
<p role="status">{message}</p>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about handle an html form.
lang: astro
code: >-
  ---

  export const prerender = false;

  let message = "";

  if (Astro.request.method === "POST") {
    const data = await Astro.request.formData();
    const title = data.get("title");
    message = typeof title === "string" && title.trim() ? "Accepted" : "Title required";
  }

  ---

  <form method="get"><label>Title <input name="title" required
  /></label><button>Submit</button></form>

  <p role="status">{message}</p>
checks:
  - match: method="post"
    message: Use method="post" for this step.
  - notMatch: method="get"
    message: Replace method="get" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about handle an html form is correct?
options:
  - Client-side required fields make server validation unnecessary.
  - FormData.get always returns a string.
  - Validate submitted data on the server even when HTML has required fields. This demonstration
    acknowledges input without persisting it; real mutations need appropriate authorization and
    storage.
answer: 2
explain: Validate submitted data on the server even when HTML has required fields. This
  demonstration acknowledges input without persisting it; real mutations need appropriate
  authorization and storage.
```
