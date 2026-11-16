---
title: Elixir
icon: "💧"
kind: hub
branch: core
summary: Functional, friendly, and made for things that must keep running.
---
Elixir is a functional language that runs on the [[beam|BEAM]], the same virtual machine as Erlang. That VM was built for telephone switches in the eighties, and its job was simple: **never go down**.

So Elixir gives you:

- **`Readable` syntax**, with a strong Ruby influence.
- **[[immutable|Immutable]] data**. Nothing changes under your feet.
- **Lightweight processes**. Run hundreds of thousands of them, each isolated, each able to crash and be restarted without taking the rest down.

You'll find it behind Phoenix (a web framework), LiveView (interactive web UIs without writing JavaScript), and plenty of chat and messaging systems.

```elixir
"Hello, world!" |> String.upcase() |> IO.puts()
```

That `|>` is the pipe. You'll love it. More on that soon.

```quiz
question: What is the BEAM?
options:
  - A web framework for Elixir.
  - The virtual machine Elixir runs on, built for concurrency and uptime.
  - Elixir's package manager.
answer: 1
explain: The BEAM is Erlang's VM. The web framework is Phoenix, and the package manager is Hex (used through mix).
```

## What a day with Elixir looks like

You'll spend most of your time in three places:

- **IEx**, the interactive shell, to try things out.
- **Mix**, the build tool, to create projects, run tests and fetch packages.
- **Your editor**, writing small modules full of small functions.

Elixir code is mostly **data in, data out**. A function takes some values and returns new ones; nothing is changed in place. When you need state that lives on, like a counter or a chat room, you put it in a [[process]].

The map below is grouped into branches: the basics, working with data, control flow, functional tools, processes, OTP (the toolkit for robust systems), and the tooling around it. Pick a goal, or wander.

```quiz
question: Where does long-lived state, like a chat room's users, live in Elixir?
options:
  - In a global mutable variable.
  - In a process that holds it and handles messages.
  - In a class instance.
answer: 1
explain: Data is immutable, so state lives inside a process, which loops with a new value after each message.
```
