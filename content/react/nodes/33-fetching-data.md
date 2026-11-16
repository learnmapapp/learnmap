---
title: "Fetching data"
icon: "🌐"
branch: "effects"
requires: ["effect-cleanup", "derived-state"]
summary: "Handle loading, failure, and outdated requests explicitly."
---

An effect can synchronize a displayed record with a changing identifier. This example assumes an API returning a JSON object with a `name` field:

```jsx
import { useEffect, useState } from "react";

export default function Learner({ id = "ada" }) {
  const [result, setResult] = useState({ status: "loading" });
  useEffect(() => {
    let ignore = false;
    setResult({ status: "loading" });
    async function load() {
      try {
        const response = await fetch(`/api/learners/${encodeURIComponent(id)}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (!data || typeof data.name !== "string") throw new Error("Invalid response");
        if (!ignore) setResult({ status: "ready", name: data.name });
      } catch (error) {
        if (!ignore) setResult({ status: "failed", message: String(error) });
      }
    }
    load();
    return () => { ignore = true; };
  }, [id]);
  if (result.status === "loading") return <p>Loading</p>;
  if (result.status === "failed") return <p role="alert">{result.message}</p>;
  return <h1>{result.name}</h1>;
}
```

Cleanup prevents an old request from overwriting a newer selection. It does not cancel the network operation; an `AbortController` can additionally cancel supported fetch work.

## Know what fetch promises

An HTTP error status does not automatically reject fetch, so check `response.ok`. Parsing JSON does not validate the application's schema.

For larger applications, framework loaders or a data cache can handle request deduplication, caching, and server rendering more effectively than independent component effects. This local example teaches lifecycle management, not a complete data layer.

```exercise
goal: Treat an unsuccessful HTTP status as a failure.
lang: javascript
code: |
  export async function loadName(url) {
    const response = await fetch(url);
    if (response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return data;
  }
checks:
  - match: if\s+\(!response\.ok\)
    message: Reject when response.ok is false.
hint: Reject when response.ok is `false`.
```

```quiz
question: "Why guard writes from an older request after the id changes?"
options:
  - "Its response might arrive later and overwrite current data."
  - "Fetch responses are always sorted."
  - "React automatically cancels every request."
answer: 0
explain: "Network responses can arrive out of order; cleanup must prevent outdated work from winning."
```
