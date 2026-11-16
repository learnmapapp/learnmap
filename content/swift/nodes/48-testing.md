---
title: Swift Testing
icon: "🧪"
branch: tools
requires: [functions, errors]
summary: "@Test functions, #expect checks, and failure messages that show you the actual values."
---
Swift has a modern test framework, **Swift Testing**. It ships with the Swift 6 toolchain and Xcode 16, and a test is just a function with an attribute:

```swift title=Tests/ShopTests/PriceTests.swift
import Testing
@testable import Shop

@Test func discountIsApplied() {
    let price = applyDiscount(to: 50, percent: 10)
    #expect(price == 45)
}
```

Run it with `swift test`, and when it fails, you get both sides of the comparison, not just "false":

```repl shell
> swift test
✘ Test discountIsApplied() recorded an issue at PriceTests.swift:6:5:
  Expectation failed: (price → 40.0) == 45
```

The building blocks:

- **`@Test`** marks a test function. Add a name for the test report: `@Test("Discount is applied")`.
- **`#expect(condition)`** checks something and keeps going when it fails, so you see every failure at once.
- **`#require(...)`** is the strict one. It **stops** the test on failure, and it unwraps optionals, which keeps the rest of the test simple:

```swift
@Test func firstOrderHasItems() throws {
    let order = try #require(orders.first)   // stops here if there are no orders
    #expect(!order.items.isEmpty)
}
```

- **Expected errors:** `#expect(throws: WithdrawalError.self) { try withdraw(500, from: 10, frozen: false) }`.
- **`@testable import Shop`** lets the tests see the module's `internal` code, not just its `public` API.

**One test, many inputs.** Instead of copy-pasting a test five times, give it **arguments**. Each one runs and is reported separately:

```swift
@Test(arguments: ["racecar", "Level", "Never odd or even"])
func recognisesPalindromes(_ text: String) {
    #expect(text.isPalindrome)
}
```

Related tests can be grouped in a struct, optionally marked `@Suite("Prices")`. Each test gets a **fresh instance** of that struct, so setup goes in its `init`, and tests can't leak state into each other.

You might also see **XCTest** (`class FooTests: XCTestCase`, `XCTAssertEqual`) in existing projects. It still works, and both can live in the same package. New tests are best written with Swift Testing.

```compare python
def test_discount_is_applied():
    assert apply_discount(50, 10) == 45
```

```compare kotlin
@Test fun discountIsApplied() {
    assertEquals(45.0, applyDiscount(50.0, 10.0))
}
```

```compare rust
#[test]
fn discount_is_applied() { assert_eq!(apply_discount(50.0, 10.0), 45.0); }
```

```exercise
goal: "Turn this function into a test: mark it with `@Test`, and replace the `if`/print with an `#expect`."
code: |-
  import Testing

  func doublesTheValue() {
      if double(4) != 8 {
          print("double is broken")
      }
  }
checks:
  - match: '@Test\s+func\s+doublesTheValue\(\)'
    message: Put @Test in front of the func.
  - match: '#expect\(\s*double\(4\)\s*==\s*8\s*\)'
    message: "Write #expect(double(4) == 8)"
  - notMatch: 'print\('
    message: The print isn't needed any more.
solution: |-
  import Testing

  @Test func doublesTheValue() {
      #expect(double(4) == 8)
  }
```

```quiz
question: "What's the difference between `#expect` and `#require`?"
options:
  - "#expect is for numbers, #require is for strings."
  - "#expect records a failure and continues; #require stops the test."
  - There's no difference.
answer: 1
explain: "#require throws on failure, ending the test. It's handy for unwrapping a value that later checks depend on."
```
