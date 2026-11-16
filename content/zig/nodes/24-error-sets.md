---
title: Error sets
icon: "🧾"
branch: errors
requires: [enums]
summary: Errors in Zig are values with names, collected into sets.
---
Zig has no exceptions. A function that can fail **returns** an error, as an ordinary value. This lesson is about what those values are; the [next one](node:error-unions) shows how to return them.

An **[[error set]]** lists the errors something can produce, much like an enum:

```zig
const LoginError = error{
    UnknownUser,
    WrongPassword,
    AccountLocked,
};
```

You refer to a single error as `error.WrongPassword`. Error names are global: `error.WrongPassword` in one file is the same value as `error.WrongPassword` in another, so different sets can share names.

Some questions that usually come up next:

**Can an error carry extra information, like a message?**
No. An error is just a name, which keeps it cheap: it's a small integer under the hood. When you need details, return them another way, such as through an out parameter or a [tagged union](node:unions).

**Can I combine sets?**
Yes, with `||`:

```zig
const NetworkError = error{ Timeout, Offline };
const AppError = LoginError || NetworkError;
```

**Can I print one?**
`@errorName(err)` gives you the name as a string, and `{}` in a format string prints it directly.

**Do I always have to write the set out?**
No. Zig can usually infer it, as you'll see shortly. Writing it out is still useful at API boundaries, as documentation of exactly what can go wrong.

```compare python
class LoginError(Exception): pass
class UnknownUser(LoginError): pass
class WrongPassword(LoginError): pass
```

```compare rust
enum LoginError {
    UnknownUser,
    WrongPassword,
    AccountLocked,
}
```

```exercise
goal: Declare an error set `UploadError` with three errors, `FileTooLarge`, `UnsupportedFormat` and `QuotaExceeded`.
code: |-
  const UploadError = enum {
      FileTooLarge,
      UnsupportedFormat,
      QuotaExceeded,
  };
checks:
  - match: 'const\s+UploadError\s*=\s*error\s*\{'
    message: Error sets use error { ... }, not enum { ... }.
  - match: 'FileTooLarge,\s*UnsupportedFormat,\s*QuotaExceeded'
    message: Keep all three error names.
solution: |-
  const UploadError = error{
      FileTooLarge,
      UnsupportedFormat,
      QuotaExceeded,
  };
```

```quiz
question: How do you attach a human-readable message to a Zig error?
options:
  - "`error.NotFound(\"no such user\")`"
  - You can't; errors are just names. Pass details separately.
  - Use @errorName to set it.
answer: 1
explain: Zig errors carry no payload. They're cheap names, and extra details travel by other means.
```
