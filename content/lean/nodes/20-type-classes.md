---
title: Type classes
icon: "🏫"
branch: data
requires: [polymorphism]
summary: Interfaces that types can implement, like ToString and Add.
---
A polymorphic function with `{α : Type}` can't do much with an `α`: it doesn't know if `α` can be added, printed or compared. A [[type class]] describes an ability that some types have.

```lean title=Classes.lean
class Describe (α : Type) where
  describe : α → String

structure Dog where
  name : String

instance : Describe Dog where
  describe d := s!"{d.name} the dog"

instance : Describe Nat where
  describe n := s!"the number {n}"

#eval Describe.describe (Dog.mk "Rex")  -- "Rex the dog"
#eval Describe.describe 7               -- "the number 7"
```

- `class` declares the ability and its functions.
- `instance` provides it for one type. More on that in [Instances](node:instances).

## Requiring a class

To write a function for "any type that can be described", put the class in **square brackets**:

```lean
def shout [Describe α] (x : α) : String :=
  (Describe.describe x).toUpper

#eval shout (Dog.mk "Rex")  -- "REX THE DOG"
```

`[Describe α]` means "this works for any `α` that has a `Describe` instance". Lean finds the right instance automatically, which is called **instance resolution**.

## Classes you already use

Much of Lean's standard library is type classes:

| Class | Gives you |
| --- | --- |
| `ToString α` | `toString x` and `s!"{x}"` |
| `Repr α` | how `#eval` prints values |
| `BEq α` | `a == b` |
| `Ord α` | `compare a b` |
| `Add α`, `Mul α` | `a + b`, `a * b` |
| `Inhabited α` | a default value, used by `!` functions |

So `a + b` isn't built in: it's `Add.add a b`, and works for any type with an `Add` instance.

```compare typescript
interface Describe { describe(): string }
```

```compare kotlin
interface Describe { fun describe(): String }
```

```compare rust
trait Describe { fn describe(&self) -> String; }
impl Describe for Dog { fn describe(&self) -> String { format!("{} the dog", self.name) } }
```

```compare python
class Describe(Protocol):
    def describe(self) -> str: ...
```

```exercise
goal: "`showAll` uses `toString`, so it needs a `ToString` instance. Add `[ToString α]` before `(xs : List α)`."
code: |
  def showAll (xs : List α) : String :=
    ", ".intercalate (xs.map toString)
checks:
  - match: 'def\s+showAll\s*\[\s*ToString\s+α\s*\]\s*\(\s*xs\s*:\s*List\s+α\s*\)'
    message: "Write def showAll [ToString α] (xs : List α)"
solution: |
  def showAll [ToString α] (xs : List α) : String :=
    ", ".intercalate (xs.map toString)
```

```quiz
question: "What does `[Add α]` in a function signature mean?"
options:
  - "α must be a list."
  - "The function works for any α that has an Add instance."
  - "The function adds α to a list."
answer: 1
explain: "Square brackets ask Lean to find an instance of the class for α."
```
