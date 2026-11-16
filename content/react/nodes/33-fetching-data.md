---
title: "Fetching data"
icon: "🌐"
branch: "effects"
requires: ["effect-cleanup", "derived-state"]
summary: "Handle loading, failure, and outdated requests explicitly."
---
Fetching data in an effect looks simple. It has three traps, though. Let's build a user profile loader in three versions, each fixing one more.

## Version 1: the obvious one

```jsx
function Profile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(response => response.json())
      .then(data => setUser(data));
  }, [userId]);

  return <h1>{user?.name}</h1>;
}
```

**Trap 1:** if the server answers with a 404 or 500, `fetch` doesn't fail. It only rejects when the network is down. `response.json()` then tries to parse an error page, or you show `undefined`.

**Trap 2:** there's no loading or error state. The user sees a blank heading and has no idea why.

## Version 2: checks the status, and shows progress

```jsx
const [status, setStatus] = useState("loading");

useEffect(() => {
  setStatus("loading");
  fetch(`/api/users/${userId}`)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then(data => { setUser(data); setStatus("done"); })
    .catch(() => setStatus("error"));
}, [userId]);
```

**Trap 3, the race:** the user clicks Ada, then quickly Grace. Two requests are in flight. If Ada's answer arrives **last**, the screen shows Ada's profile under Grace's name.

## Version 3: ignores stale answers

```jsx
useEffect(() => {
  let ignore = false;
  setStatus("loading");

  fetch(`/api/users/${userId}`)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then(data => {
      if (!ignore) { setUser(data); setStatus("done"); }
    })
    .catch(() => {
      if (!ignore) setStatus("error");
    });

  return () => { ignore = true; };
}, [userId]);
```

When `userId` changes, the [cleanup](node:effect-cleanup) marks the old request as outdated. Its answer still arrives, but it's ignored.

## So... is this how everyone fetches?

Not in larger apps. Version 3 still has no caching, no retry, and it refetches every time the component appears. Libraries such as TanStack Query and SWR, and frameworks such as Next.js and React Router, handle all of that. But they all solve exactly these three traps, and now you know what they are.

```compare javascript
// The status check applies to fetch anywhere, React or not:
const response = await fetch(url);
if (!response.ok) throw new Error(`HTTP ${response.status}`);
```

```exercise
goal: "This throws on **successful** responses. Flip the condition, so it throws when the status isn't OK."
lang: javascript
code: |
  export async function loadName(url) {
    const response = await fetch(url);
    if (response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return data;
  }
checks:
  - match: 'if\s+\(!response\.ok\)'
    message: Throw when response.ok is false.
hint: Add a ! before response.ok.
solution: |
  export async function loadName(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return data;
  }
```

```quiz
question: "A request for user 1 is still pending when `userId` changes to 2. What does the `ignore` flag do?"
options:
  - It cancels the network request.
  - It makes the old response skip its setState calls when it arrives.
  - It makes React wait for both requests.
answer: 1
explain: The request finishes, but its result is thrown away. AbortController can cancel the request itself.
```
