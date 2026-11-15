---
title: Supervisors
icon: "🛟"
branch: otp
requires: [genserver, links]
summary: Processes that restart other processes.
---
A [[supervisor]] starts child processes, watches them, and restarts them when they crash. This is the "let it crash" philosophy made practical: you don't write defensive code for every surprise; you make sure a clean restart is always possible.

```elixir
children = [
  {Counter, 0},
  {Cache, []},
  {Task.Supervisor, name: MyApp.TaskSup}
]

Supervisor.start_link(children, strategy: :one_for_one)
```

Each child is a module with a `child_spec/1`, which `use GenServer` gives you for free. `{Counter, 0}` means "call `Counter.start_link(0)`".

**Strategies** decide what happens when one child dies:

| Strategy | Restarts |
| --- | --- |
| `:one_for_one` | just the crashed child |
| `:one_for_all` | all children |
| `:rest_for_one` | the crashed child and those started after it |

If a child keeps crashing (by default more than 3 times in 5 seconds), the supervisor gives up and crashes too, so **its** supervisor can try a bigger restart.

Supervisors can supervise supervisors. That gives you a **supervision tree**: small failures get fixed close to where they happen, and only real disasters climb up the tree.

```compare java
// Closest: Kubernetes restarting a pod, but per object and in microseconds.
```

```compare kotlin
// SupervisorJob stops one child's failure from cancelling its siblings, but doesn't restart.
```

```compare go
// No built-in restarts; you'd write a loop that recovers and respawns.
```

```compare python
# Closest: systemd or supervisord restarting a whole process.
```

```compare javascript
// Closest: pm2 or a cluster master restarting crashed workers.
```

```compare rust
// No built-in; crates like `bastion` copy the OTP model.
```

```exercise
goal: Restart only the crashed child.
code: |
  Supervisor.start_link(children, strategy: :one_for_all)
checks:
  - match: 'strategy:\s*:one_for_one'
    message: The strategy that restarts just one child is :one_for_one.
output: "{:ok, #PID<0.200.0>}"
```
