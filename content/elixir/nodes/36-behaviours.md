---
title: Behaviours
icon: "📜"
branch: functional
requires: [module-attributes]
summary: A contract of functions a module promises to implement.
---
Protocols pick an implementation by **data type**. A [[behaviour]] is different: it's a list of functions a **module** promises to provide. Think plugin interface.

Define one with `@callback`:

```elixir
defmodule Notifier do
  @callback send(to :: String.t(), message :: String.t()) :: :ok | {:error, term}
end
```

Implement it:

```elixir
defmodule EmailNotifier do
  @behaviour Notifier

  @impl Notifier
  def send(to, message), do: Mailer.deliver(to, message)
end

defmodule SlackNotifier do
  @behaviour Notifier

  @impl Notifier
  def send(to, message), do: Slack.post(to, message)
end
```

Forget a callback and the compiler warns you. `@impl` marks which functions are callbacks, so typos get caught too.

Now code can take the module as a value and call it:

```elixir
def alert(notifier, user), do: notifier.send(user.contact, "Server down!")

alert(SlackNotifier, user)
```

This is how OTP works: [GenServer](node:genserver) is a behaviour. You write the callbacks (`init`, `handle_call`…), and OTP runs the loop.

```compare java
interface Notifier { void send(String to, String message); }
class EmailNotifier implements Notifier { @Override public void send(...) {} }
```

```compare kotlin
interface Notifier { fun send(to: String, message: String) }
object EmailNotifier : Notifier { override fun send(...) {} }
```

```compare go
type Notifier interface { Send(to, msg string) error }
```

```compare python
class Notifier(ABC):
    @abstractmethod
    def send(self, to, message): ...
```

```compare javascript
// No interfaces at runtime; TypeScript has `implements`.
```

```compare rust
trait Notifier { fn send(&self, to: &str, msg: &str); }
```

```exercise
goal: Declare that this module implements the Notifier behaviour.
code: |
  defmodule SmsNotifier do
    def send(to, message), do: Sms.text(to, message)
  end
checks:
  - match: '@behaviour\s+Notifier'
    message: 'Add  @behaviour Notifier  at the top of the module.'
  - match: '@impl\s+(true|Notifier)\s*\n\s*def\s+send'
    message: Mark the callback with @impl Notifier.
output: ":ok"
```
