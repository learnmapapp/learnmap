---
title: Enumerated states
icon: "🔢"
branch: data
requires: [objects, case]
summary: An enum lists the possible values of a type, and case makes you handle each one.
---
**A word you already know:** an order in a webshop is *pending*, *paid*, *shipped* or *delivered*. Never "shipd", never 7. An enum makes that list a type:

```nim title=orders.nim
type
  OrderStatus = enum
    pending, paid, shipped, delivered

proc label(s: OrderStatus): string =
  case s
  of pending: "Waiting for payment"
  of paid: "Packing your order"
  of shipped: "On its way"
  of delivered: "Enjoy!"

var status = pending
echo label(status)        # Waiting for payment
status = shipped
echo status               # shipped
```

**Why not use strings?** `status = "shiped"` would compile happily, and you'd find the typo in production. With an [[enum]], a misspelled value is a compile error.

**Why not use ints?** `status = 2` tells a reader nothing. Enum values have names, and `echo` prints them.

**The killer feature: `case` checks you covered everything.** Notice there's no `else` in `label`. Now imagine someone adds a `returned` status next year:

```nim
type
  OrderStatus = enum
    pending, paid, shipped, delivered, returned
```

Every `case` on `OrderStatus` without an `else` now fails to compile with *not all cases are covered*, pointing at each one that needs a decision. Leaving out `else` on purpose is how you get that safety net.

**Handy extras:**

| Code | Result |
| --- | --- |
| `ord(paid)` | `1`, the position |
| `succ(paid)` | `shipped`, the next value |
| `low(OrderStatus)` / `high(OrderStatus)` | `pending` / `delivered` |
| `for s in OrderStatus: echo s` | every value, in order |
| `parseEnum[OrderStatus]("paid")` | `paid` (from `std/strutils`) |

**Custom text.** `shipped = "On its way"` in the declaration changes what `$` and `echo` show for that value.

**Enums inside objects** describe state: `Order(id: 7, status: paid)`. When different states need *different fields*, look at [variant objects](node:variants).

```compare python
from enum import Enum
class OrderStatus(Enum):
    PENDING = 1
    PAID = 2
```

```compare javascript
// No built-in enum; a union of strings in TypeScript is the closest:
// type OrderStatus = "pending" | "paid" | "shipped" | "delivered";
```

```compare rust
enum OrderStatus { Pending, Paid, Shipped, Delivered }
```

```exercise
goal: "Add `orange` to the enum, between `red` and `green`, then give it an `of` branch that returns `\"slow down\"`."
code: |-
  type
    Light = enum
      red, green

  func advice(l: Light): string =
    case l
    of red: "stop"
    of green: "go"
checks:
  - match: 'red\s*,\s*orange\s*,\s*green'
    message: 'The enum should read: red, orange, green'
  - match: 'of\s+orange\s*:\s*"slow down"'
    message: 'Add of orange: "slow down"'
solution: |-
  type
    Light = enum
      red, orange, green

  func advice(l: Light): string =
    case l
    of red: "stop"
    of orange: "slow down"
    of green: "go"
```

```quiz
question: "You add a value to an enum. Which case statements does the compiler flag?"
options:
  - All of them.
  - Those on that enum that have no else branch.
  - None; new values are ignored until handled.
answer: 1
explain: A case without else must cover every value, so the new one makes it incomplete.
```
