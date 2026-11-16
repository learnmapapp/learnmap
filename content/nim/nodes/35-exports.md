---
title: Public interfaces
icon: "🚪"
branch: design
requires: [modules]
summary: A * after a name exports it; everything else stays private to its module.
---
**Bug hunt.** Two files. The program doesn't compile. Spot the problem before reading on:

```nim title=bank.nim
type
  Account* = object
    owner*: string
    balance: int

proc newAccount*(owner: string): Account =
  Account(owner: owner, balance: 0)

proc deposit*(a: var Account, amount: int) =
  if amount <= 0:
    raise newException(ValueError, "deposit must be positive")
  a.balance += amount

proc balance*(a: Account): int = a.balance

proc audit(a: Account) = echo "audited ", a.owner
```

```nim title=main.nim
import bank

var acc = newAccount("Ada")
acc.deposit(50)
echo acc.balance        # 50
acc.balance = 1_000_000
audit(acc)
```

**The answer:** two lines in `main.nim` fail, and both for the same reason. A name is only visible outside its module when it's marked with `*`:

- `acc.balance = 1_000_000`: the *field* `balance` has no `*`, so `main.nim` can't touch it. (`acc.balance` on the line before works, because it calls the exported *proc* `balance*`.)
- `audit(acc)`: the proc `audit` has no `*`, so it doesn't exist as far as `main.nim` is concerned.

**That's the design, not an accident.** `bank.nim` decides what its public interface is:

- `Account*` and `owner*`: anyone can see an account and its owner.
- `balance` (the field): private. The only way to change it is `deposit*`, which checks the amount. Nobody can set a balance to a million directly.
- `balance*` (the proc): a read-only getter for the private field.
- `audit`: an internal helper. It can be renamed or removed without breaking any other file.

**The rule, in one line:** `*` after a name makes it public; no `*` means private to the file. It applies to types, fields, procs, constants and variables alike. There's no `public`/`private` keyword, and no `export` list to keep in sync.

**Re-exporting.** A module can pass on names it imports with `export`: `import std/tables; export tables` lets anyone who imports your module use `Table` too.

```compare python
class Account:
    def __init__(self):
        self._balance = 0   # private by convention only
```

```compare javascript
export class Account {
  #balance = 0;   // truly private field
}
```

```compare rust
pub struct Account {
    pub owner: String,
    balance: i64,   // private by default
}
```

```exercise
goal: "Other modules need to call `greet` and see the `Greeter` type. Export both with `*`."
code: |-
  type
    Greeter = object
      name: string

  proc greet(g: Greeter): string = "Hi, " & g.name
checks:
  - match: 'Greeter\*\s*=\s*object'
    message: Write Greeter* = object
  - match: 'proc\s+greet\*\s*\('
    message: Write proc greet*(...)
solution: |-
  type
    Greeter* = object
      name: string

  proc greet*(g: Greeter): string = "Hi, " & g.name
```

```quiz
question: "In module `shop`, `type Item* = object` has fields `name*: string` and `cost: int`. What can another module do?"
options:
  - Read and set both fields.
  - Use the Item type and its name field, but not cost.
  - Nothing, because the fields need export statements.
answer: 1
explain: Only names marked with * are visible outside the module, fields included.
```
