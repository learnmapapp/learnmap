---
title: Tests
icon: "✅"
branch: tooling
requires: [functions, cargo]
summary: "#[test], assert_eq! and cargo test, built right in."
---
Testing needs no extra library. Mark a function with `#[test]` and run `cargo test`:

```rust title=src/lib.rs
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn adds_two_numbers() {
        assert_eq!(add(2, 2), 4);
    }

    #[test]
    fn handles_negatives() {
        assert!(add(-1, -1) < 0);
    }
}
```

```repl shell
> cargo test
running 2 tests
test tests::adds_two_numbers ... ok
test tests::handles_negatives ... ok
test result: ok. 2 passed; 0 failed
```

`#[cfg(test)]` means the module is only compiled when testing, so it doesn't bloat your program. Tests sit right next to the code, and can even test private functions.

The assertions:

| Macro | Checks |
| --- | --- |
| `assert!(cond)` | cond is `true` |
| `assert_eq!(a, b)` | a == b, and prints both when not |
| `assert_ne!(a, b)` | a != b |

Expect a panic with `#[should_panic]`, or return a `Result` so you can use `?` inside a test.

**Doc tests** are code examples in documentation comments. `cargo test` runs them too, so your docs can't go stale:

```rust
/// Adds two numbers.
///
/// ```
/// assert_eq!(mylib::add(1, 2), 3);
/// ```
pub fn add(a: i32, b: i32) -> i32 { a + b }
```

Integration tests go in a `tests/` folder and use your crate from the outside, like a user would.

```compare java
@Test void addsTwoNumbers() { assertEquals(4, add(2, 2)); }
```

```compare kotlin
@Test fun addsTwoNumbers() { assertEquals(4, add(2, 2)) }
```

```compare python
def test_adds_two_numbers():
    assert add(2, 2) == 4
```

```compare javascript
test("adds two numbers", () => { expect(add(2, 2)).toBe(4); });
```

```compare go
func TestAdd(t *testing.T) { if add(2, 2) != 4 { t.Fatal("wrong") } }
```

```exercise
goal: Turn this into a test that checks `double(21)` equals 42.
code: |
  fn doubles() {
  }
checks:
  - match: "#\\[test\\]\\s*fn\\s+doubles"
    message: "Put #[test] on the line above fn doubles."
  - match: assert_eq!\(\s*double\(\s*21\s*\)\s*,\s*42\s*\)|assert_eq!\(\s*42\s*,\s*double\(\s*21\s*\)\s*\)
    message: Inside, write assert_eq!(double(21), 42);
output: test doubles ... ok
```
