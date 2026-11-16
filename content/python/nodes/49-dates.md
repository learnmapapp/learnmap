---
title: "Dates and times"
icon: "📅"
branch: "files"
requires: ["modules", "formatting"]
summary: "Distinguish dates, durations, and timezone-aware timestamps."
---

The `datetime` module provides distinct types for calendar dates, timestamps, and durations:

```python
from datetime import date, datetime, timedelta, timezone

day = date.fromisoformat("2026-01-15")
print(day + timedelta(days=7))  # 2026-01-22
now = datetime.now(timezone.utc)
print(now.isoformat())
```

A `date` has no time of day. A `timedelta` represents a duration. A timezone-aware `datetime` includes an offset context; a naive one does not identify a unique instant on its own.

## Make timezone assumptions explicit

Use aware UTC timestamps for recorded instants, then convert for display. `timestamp.astimezone(...)` converts an aware timestamp to another zone. `replace(tzinfo=...)` attaches or changes metadata without performing that conversion, so it is not an equivalent operation.

The standard library's `zoneinfo.ZoneInfo` supports named zones such as `Australia/Sydney` when timezone data is available. Calendar operations around daylight-saving transitions need care: a local day does not always correspond to exactly 24 elapsed hours.

Prefer ISO 8601 text for interchange when a human-readable format is needed. For elapsed-time measurement in a running process, use `time.perf_counter()` rather than a wall clock that can be adjusted.

```exercise
goal: Create an aware UTC timestamp rather than a naive local one.
lang: python
code: |
  from datetime import datetime, timezone

  now = datetime.now()
  print(now.isoformat())
checks:
  - match: datetime\.now\(\s*timezone\.utc\s*\)
    message: Pass timezone.utc to datetime.now.
hint: Pass `timezone.utc` to `datetime.now`.
```

```quiz
question: Which call creates a timezone-aware UTC timestamp?
options:
  - "`datetime.now()`"
  - "`datetime.now(timezone.utc)`"
  - "`date.today()`"
answer: 1
explain: Supplying `timezone.utc` gives the datetime an explicit UTC timezone.
```
