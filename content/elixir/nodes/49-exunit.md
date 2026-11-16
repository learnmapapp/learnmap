---
title: ExUnit
icon: "✅"
branch: tooling
requires: [mix]
summary: Tests with assert, describe and setup.
---
Tests live in `test/`, in files ending with `_test.exs`:

```elixir title=test/greeter_test.exs
defmodule GreeterTest do
  use ExUnit.Case, async: true

  test "greets by name" do
    assert Greeter.hello("Drop") == "Hello, Drop!"
  end

  test "rejects empty names" do
    assert {:error, :empty} = Greeter.hello("")
  end
end
```

```repl shell
> mix test
..
Finished in 0.02 seconds
2 tests, 0 failures
```

There's basically one assertion: `assert`. It's a macro that looks at the expression, so failures show both sides without you choosing `assertEquals` or friends. With `=` it does a pattern match, which is perfect for `{:ok, _}` results.

Others you'll use: `refute`, `assert_raise`, and `assert_receive` for messages from processes.

Group tests and share setup:

```elixir
describe "withdraw/2" do
  setup do
    {:ok, account: Account.new(100)}
  end

  test "lowers the balance", %{account: account} do
    assert {:ok, %{balance: 70}} = Account.withdraw(account, 30)
  end
end
```

`async: true` runs this module's tests in parallel with other async modules. Elixir's isolated processes make that safe by default.

Run one file or one line with `mix test test/greeter_test.exs:12`.

```compare java
@Test void greetsByName() { assertEquals("Hello, Drop!", Greeter.hello("Drop")); }
```

```compare kotlin
@Test fun `greets by name`() { assertEquals("Hello, Drop!", hello("Drop")) }
```

```compare python
def test_greets_by_name():
    assert hello("Drop") == "Hello, Drop!"
```

```compare javascript
test("greets by name", () => expect(hello("Drop")).toBe("Hello, Drop!"));
```

```compare rust
#[test] fn greets_by_name() { assert_eq!(hello("Drop"), "Hello, Drop!"); }
```

```compare go
func TestHello(t *testing.T) { if Hello("Drop") != "Hello, Drop!" { t.Fail() } }
```

```exercise
goal: Write the assertion that `add(2, 3)` equals 5.
code: |
  test "adds numbers" do
  end
checks:
  - match: assert\s+(Math\.)?add\(\s*2\s*,\s*3\s*\)\s*==\s*5
    message: "Inside the test:  assert add(2, 3) == 5"
output: 1 test, 0 failures
```
