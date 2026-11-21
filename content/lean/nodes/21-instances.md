---
title: Instances and deriving
icon: "🪄"
branch: data
requires: [type-classes]
summary: Implement type classes by hand, or let Lean write them.
---
An [[instance]] is the implementation of a type class for one type. Let's make a `Money` type that prints nicely and can be added with `+`:

```lean title=Money.lean
structure Money where
  cents : Nat

instance : ToString Money where
  toString m := s!"€{m.cents / 100}.{m.cents % 100}"

instance : Add Money where
  add a b := ⟨a.cents + b.cents⟩

def coffee : Money := ⟨350⟩
def cake : Money := ⟨475⟩

#eval toString (coffee + cake)  -- "€8.25"
```

Now `+` works on `Money`, because `+` is just `Add.add`, and Lean finds the instance.

Number literals are a type class too, `OfNat`. With an instance, `(5 : Money)` would work.

## Deriving

Writing instances like `Repr` or `BEq` by hand is boring: they follow the shape of the type. `deriving` asks Lean to write them for you:

```lean
inductive Suit where
  | hearts | diamonds | clubs | spades
deriving Repr, BEq, Ord, Hashable, DecidableEq

structure Card where
  rank : Nat
  suit : Suit
deriving Repr, BEq

#eval Suit.hearts == Suit.spades           -- false
#eval Card.mk 10 .hearts                   -- { rank := 10, suit := Suit.hearts }
#eval (Card.mk 10 .hearts) == ⟨10, .hearts⟩ -- true
```

Common ones to derive:

- `Repr` so `#eval` can print values.
- `BEq` for `==`.
- `DecidableEq`, like `BEq`, but also lets you use `=` in `if` and in [decide](node:decide) proofs.
- `Hashable` to use values as `HashMap` keys.
- `Ord` for `compare`, `<` and sorting.

```compare rust
#[derive(Debug, Clone, PartialEq, Eq, Hash)]
struct Card { rank: u8, suit: Suit }
```

```compare kotlin
data class Card(val rank: Int, val suit: Suit) // equals, hashCode, toString for free
```

```compare python
@dataclass(frozen=True, order=True)   # __eq__, __hash__, __lt__ for free
class Card: ...
```

```compare typescript
// no deriving; write equals and toString by hand
```

```exercise
goal: "Let `#eval` print `Weekday` values and compare them with `==`: add `deriving Repr, BEq`."
code: |
  inductive Weekday where
    | mon | tue | wed | thu | fri
checks:
  - match: 'deriving\s+(Repr\s*,\s*BEq|BEq\s*,\s*Repr)'
    message: "Add deriving Repr, BEq on the line after the constructors."
solution: |
  inductive Weekday where
    | mon | tue | wed | thu | fri
  deriving Repr, BEq
```

```quiz
question: "What does `deriving BEq` give a type?"
options:
  - "A generated == that compares values field by field."
  - "The ability to be printed by #eval."
  - "A default value."
answer: 0
explain: "BEq is the class behind ==. Deriving it generates the comparison from the type's shape."
```
