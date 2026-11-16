---
title: "Classes"
icon: "🏗️"
branch: "objects"
requires: ["function-arguments", "scope"]
summary: "Bundle state and behavior in instances with explicit self."
---
A [[class]] is a blueprint for making objects that bundle data with the functions that work on it. Let's build one up in layers, using a bank account.

**Layer 1: an empty class.**

```python
class Account:
    pass

acct = Account()      # call the class to make an instance
```

`pass` means "nothing here yet". `acct` is an [[instance]] of `Account`. It doesn't do much so far.

**Layer 2: starting data, with `__init__`.** This special method runs when an instance is created. Its job is to set up the attributes:

```python
class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

acct = Account("Ada", 100)
print(acct.owner, acct.balance)   # Ada 100
```

**Layer 3: behaviour, with methods.** A method is a function defined inside the class:

```python
class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        return self.balance
```

## So what is `self`?

`self` is the instance the method was called on. When you write `acct.deposit(50)`, Python calls `Account.deposit(acct, 50)` behind the scenes. That's why every method lists `self` first, even though you never pass it yourself.

Inside a method, you **must** say `self.balance`. A bare `balance` would be a plain local variable that disappears when the method returns. Forgetting `self.` is the most common class bug, and it usually shows up as an `UnboundLocalError` or `NameError`.

**Layer 4: a nice printout.** By default, printing an instance shows something like `<__main__.Account object at 0x10c2...>`. Define `__repr__` to make it readable:

```python
    def __repr__(self):
        return f"Account({self.owner!r}, {self.balance})"
```

Methods with double underscores on both sides, such as `__init__` and `__repr__`, are hooks that Python calls for you. They're nicknamed "dunder" methods.

```compare java
class Account {
    private String owner; private int balance;
    Account(String owner, int balance) { this.owner = owner; ... }
}
```

```compare kotlin
class Account(val owner: String, var balance: Int = 0) {
    fun deposit(amount: Int) { balance += amount }
}
```

```exercise
goal: "`increment` changes a local `value` that doesn't exist. Update the instance's value instead."
lang: python
code: |
  class Counter:
      def __init__(self):
          self.value = 0

      def increment(self):
          value += 1

  counter = Counter()
  counter.increment()
  print(counter.value)
checks:
  - match: '^\s+self\.value\s*\+=\s*1\s*$'
    message: "Use self.value += 1 inside increment."
hint: Attributes are always reached through self.
solution: |
  class Counter:
      def __init__(self):
          self.value = 0

      def increment(self):
          self.value += 1

  counter = Counter()
  counter.increment()
  print(counter.value)
```

```quiz
question: "When you call `acct.deposit(50)`, what does `self` refer to inside `deposit`?"
options:
  - The Account class.
  - The acct instance.
  - The number 50.
answer: 1
explain: Python passes the instance before the dot as the first argument, which is self.
```
