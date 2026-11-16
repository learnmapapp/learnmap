---
title: "Logging"
icon: "📜"
branch: "quality"
requires: ["modules", "exceptions", "formatting"]
summary: "Report events at useful levels without scattering print calls."
---

`logging` separates event reporting from where messages are displayed. A module creates a named logger; an application's entry point chooses the configuration:

```python
import logging

logger = logging.getLogger(__name__)

def process(count):
    logger.info("Processing %s records", count)
    return count * 2

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
    process(3)
```

Levels include `DEBUG`, `INFO`, `WARNING`, `ERROR`, and `CRITICAL`. The default threshold is normally `WARNING`, so an `info` message may be invisible until the application configures it.

## Add useful context

Pass variable values as logger arguments rather than eagerly building the message with an f-string. Logging can defer the string interpolation until needed, although argument expressions are still evaluated normally.

Inside an exception handler, `logger.exception("Could not read configuration")` records the current exception traceback. Logging an error does not handle it by itself; decide whether to recover, return a failure, or re-raise.

Log enough context to diagnose a problem, while omitting passwords, tokens, and personal data. Libraries should avoid configuring global logging for their callers.

```exercise
goal: Enable INFO messages in this application configuration.
lang: python
code: |
  import logging

  logging.basicConfig(level=logging.WARNING)
  logger = logging.getLogger(__name__)
  logger.info("Processing %s records", 3)
checks:
  - match: basicConfig\(\s*level\s*=\s*logging\.INFO\s*\)
    message: Set the configured level to logging.INFO.
hint: Set the configured level to `logging.INFO`.
```

```quiz
question: Which call includes the current exception traceback inside an except handler?
options:
  - "`logger.info`"
  - "`logger.exception`"
  - "`logger.getLogger`"
answer: 1
explain: "`logger.exception` emits an error-level message with the active exception information."
```
