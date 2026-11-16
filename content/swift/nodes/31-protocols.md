---
title: Protocol contracts
icon: "📜"
branch: types
requires: [structs]
summary: Describe what a type can do, let unrelated types promise it, and write code against the promise.
---
An office has employees, freelancers and robots 🤖. They have nothing in common, except that each one can produce a weekly status report. How do you write one function that works for all three?

With a **[[protocol]]**: a list of requirements that any type can promise to fulfil.

```swift title=status.swift
protocol Reporting {
    var name: String { get }
    func weeklyReport() -> String
}

struct Employee: Reporting {
    let name: String
    var tasksDone: Int
    func weeklyReport() -> String { "\(name) finished \(tasksDone) tasks." }
}

struct Robot: Reporting {
    let serial: Int
    var name: String { "Unit \(serial)" }
    func weeklyReport() -> String { "\(name): ALL SYSTEMS NOMINAL." }
}

let team: [any Reporting] = [Employee(name: "Kim", tasksDone: 7), Robot(serial: 42)]
for member in team {
    print(member.weeklyReport())
}
```

```repl shell
> swift status.swift
Kim finished 7 tasks.
Unit 42: ALL SYSTEMS NOMINAL.
```

Line by line:

- `protocol Reporting` lists **requirements**. `{ get }` means "readable": a stored `let` (like Employee's) or a computed property (like Robot's) both satisfy it.
- `struct Employee: Reporting` **conforms** to the protocol. Miss a requirement and the compiler tells you exactly which one.
- `[any Reporting]` is an array that can hold **any** type that conforms. The `any` keyword marks that the concrete type varies from element to element.

If you know interfaces from Java, Kotlin or TypeScript, that's the core idea. Swift adds a lot on top, though. Structs and enums can conform, not just classes. Protocols can provide default code (see [extensions](node:extensions)). And they power [generics](node:generics).

**The protocols you'll meet constantly** come from the standard library, and many can be adopted with a single word, because Swift writes the code for you:

| Protocol | Gives you | Free for structs? |
| --- | --- | --- |
| `Equatable` | `==` and `!=` | yes, if all properties are Equatable |
| `Hashable` | use in a `Set` or as a dictionary key | yes, likewise |
| `Comparable` | `<`, and with it `sorted()` and `max()` | no, you write `<` |
| `Codable` | conversion to and from JSON | yes ([lesson](node:codable)) |
| `CustomStringConvertible` | a custom text for `print` | no, you write `description` |

```compare kotlin
interface Reporting {
    val name: String
    fun weeklyReport(): String
}
```

```compare typescript
interface Reporting {
  readonly name: string;
  weeklyReport(): string;
}
```

```compare rust
trait Reporting {
    fn name(&self) -> String;
    fn weekly_report(&self) -> String;
}
```

```exercise
goal: "Make `Card` printable in a nice way: conform to `CustomStringConvertible` and add a `description` property returning \"\\(rank) of \\(suit)\"."
code: |-
  struct Card {
      let rank: String
      let suit: String
  }
checks:
  - match: 'struct\s+Card\s*:\s*CustomStringConvertible'
    message: "Add the conformance: struct Card: CustomStringConvertible"
  - match: 'var\s+description\s*:\s*String\s*\{\s*(return\s+)?"\\\(rank\) of \\\(suit\)"\s*\}'
    message: 'Add var description: String { "\(rank) of \(suit)" }'
solution: |-
  struct Card: CustomStringConvertible {
      let rank: String
      let suit: String
      var description: String { "\(rank) of \(suit)" }
  }
```

```quiz
question: "A protocol requires `var name: String { get }`. Which of these satisfies it?"
options:
  - Only a stored let property.
  - Only a computed property.
  - A stored property or a computed one; either can be read.
answer: 2
explain: "{ get } only asks that the property can be read, so a let, a var or a computed property all qualify."
```
