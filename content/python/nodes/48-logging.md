---
title: "Logging"
icon: "📜"
branch: "quality"
requires: ["modules", "exceptions", "formatting"]
summary: "Report events at useful levels without scattering print calls."
---
`print` is great while you're writing code. In a program that runs for real, especially unattended, you'll want **logging** instead. Here's why, in four upgrades.

**Upgrade 1: severity levels.** Every log message has a level, so you can tell noise from emergencies:

```python
import logging

logger = logging.getLogger(__name__)

logger.debug("Parsed header: %s", header)     # for developers
logger.info("Imported %d rows", count)        # normal progress
logger.warning("Row %d has no email", row_no) # odd but handled
logger.error("Could not reach the database")  # something failed
```

`getLogger(__name__)` names the logger after the module, so each message shows where it came from.

**Upgrade 2: one switch for how much you see.** Configure logging once, at program start-up, and choose the minimum level to show:

```python
logging.basicConfig(level=logging.INFO)
```

Now `info` and above appear, and `debug` is hidden. Switch to `logging.DEBUG` when investigating, without touching the rest of the code. By default, without configuration, only `WARNING` and above are shown. That's why a lone `logger.info(...)` seems to do nothing.

**Upgrade 3: timestamps and context, for free.**

```python
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
)
```

```text
2025-03-14 09:21:07,512 INFO importer: Imported 120 rows
```

Add `filename="app.log"` to write to a file instead of the terminal.

**Upgrade 4: tracebacks in the log.** Inside an `except` block, `logger.exception(...)` logs at error level **and** includes the full traceback:

```python
try:
    import_file(path)
except OSError:
    logger.exception("Import of %s failed", path)
```

## Why `%s` instead of an f-string?

Notice `logger.info("Imported %d rows", count)` passes the values separately. The message is only formatted if it's actually going to be shown, so hidden debug messages cost almost nothing. Log aggregation tools can also group messages by their template.

```compare java
static final Logger log = LoggerFactory.getLogger(Importer.class);
log.info("Imported {} rows", count);   // SLF4J: same idea
```

```compare go
slog.Info("imported rows", "count", count)   // log/slog
```

```exercise
goal: "The `info` message never appears, because the configured level is `WARNING`. Lower it to `INFO`."
lang: python
code: |
  import logging

  logging.basicConfig(level=logging.WARNING)
  logger = logging.getLogger(__name__)
  logger.info("Processing %s records", 3)
checks:
  - match: 'basicConfig\(\s*level\s*=\s*logging\.INFO\s*\)'
    message: Set the configured level to logging.INFO.
hint: Only messages at the configured level or above are shown.
solution: |
  import logging

  logging.basicConfig(level=logging.INFO)
  logger = logging.getLogger(__name__)
  logger.info("Processing %s records", 3)
```

```quiz
question: "Logging is configured with `level=logging.WARNING`. Which of these calls produce output?"
options:
  - "Only logger.warning(...)"
  - "logger.warning(...) and logger.error(...)"
  - "All of them, including info and debug"
answer: 1
explain: The level is a minimum. WARNING and everything more severe (ERROR, CRITICAL) gets through.
```
