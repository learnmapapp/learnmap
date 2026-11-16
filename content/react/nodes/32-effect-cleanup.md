---
title: "Effect cleanup"
icon: "🧹"
branch: "effects"
requires: ["effect-dependencies", "updater-functions"]
summary: "Undo subscriptions and timers before replacement or removal."
---
Some effects start something that keeps going: a timer, a connection, an event listener. Those need a way to **stop**. You provide it by returning a function from the effect, the [[cleanup]]:

```jsx
useEffect(() => {
  function handleResize() {
    setWidth(window.innerWidth);
  }
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);
```

## A timeline

Here's a chat room component with `roomId` as a dependency. Watch what happens as the user moves around:

```jsx
useEffect(() => {
  const connection = connect(roomId);
  return () => connection.close();
}, [roomId]);
```

| Moment | React runs | Open connections |
| --- | --- | --- |
| Component appears with "general" | effect: connect to general | general |
| `roomId` changes to "random" | cleanup: close general | none |
| | effect: connect to random | random |
| Something else re-renders | nothing (`roomId` unchanged) | random |
| Component is removed | cleanup: close random | none |

The cleanup always runs **before the next effect** and **when the component is removed**. At any moment, there's exactly one connection, for the right room.

## Without cleanup

Leave out the `return`, and each room switch adds a connection: general, then general **and** random, then three... They keep receiving messages, and calling `setState` on a component that might not exist anymore.

## The development double-run

In development, React mounts each component, immediately unmounts it, then mounts it again. The timeline starts "connect, close, connect". If your effect cleans up properly, nobody notices. If it doesn't, you'll see two connections or doubled log lines, and that's your hint.

## Matching pairs

| Start | Cleanup |
| --- | --- |
| `setInterval` / `setTimeout` | `clearInterval` / `clearTimeout` |
| `addEventListener` | `removeEventListener` |
| `connect()` / `subscribe()` | `close()` / `unsubscribe()` |
| `new IntersectionObserver` | `observer.disconnect()` |
| `fetch` | ignore or abort the result ([next](node:fetching-data)) |

```compare javascript
// The same pairing exists without React; React just tells you when.
const id = setInterval(tick, 1000);
clearInterval(id);
```

```exercise
goal: "The cleanup logs the id but leaves the timer running. Make it stop the interval."
lang: jsx
code: |
  import { useEffect, useState } from "react";
  export default function Timer() {
    const [seconds, setSeconds] = useState(0);
    useEffect(() => {
      const id = setInterval(() => setSeconds(previous => previous + 1), 1000);
      return () => console.log(id);
    }, []);
    return <p>{seconds}</p>;
  }
checks:
  - match: 'return\s+\(\)\s+=>\s+clearInterval\(id\);'
    message: Return a cleanup that calls clearInterval(id).
hint: setInterval's partner is clearInterval.
solution: |
  import { useEffect, useState } from "react";
  export default function Timer() {
    const [seconds, setSeconds] = useState(0);
    useEffect(() => {
      const id = setInterval(() => setSeconds(previous => previous + 1), 1000);
      return () => clearInterval(id);
    }, []);
    return <p>{seconds}</p>;
  }
```

```quiz
question: "An effect depends on `[userId]`. `userId` changes from 1 to 2. In which order do things run?"
options:
  - The new effect for 2, then the cleanup for 1.
  - The cleanup for 1, then the new effect for 2.
  - Only the new effect; cleanup runs only when the component is removed.
answer: 1
explain: The old effect is cleaned up before the new one starts.
```
