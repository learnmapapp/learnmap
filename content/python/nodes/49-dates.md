---
title: "Dates and times"
icon: "📅"
branch: "files"
requires: ["modules", "formatting"]
summary: "Distinguish dates, durations, and timezone-aware timestamps."
---
**Puzzle:** a server in Amsterdam logs `2025-03-30 02:30`. What happened at that moment?

Nothing, because that time never existed. On that night the clocks in the Netherlands jumped from 02:00 straight to 03:00. Dates and times are full of traps like this, and the `datetime` module gives you the tools to handle them.

## The cast

```python
from datetime import date, datetime, timedelta, timezone

date(2025, 3, 14)                 # a calendar day
datetime(2025, 3, 14, 9, 30)      # a day plus a time
timedelta(days=7, hours=2)        # a duration
```

Arithmetic works the way you'd hope:

```repl
> date(2025, 3, 14) + timedelta(days=30)
datetime.date(2025, 4, 13)
> date(2025, 12, 25) - date(2025, 3, 14)
datetime.timedelta(days=286)
```

## Naive or aware?

This is the most important idea in the lesson. A `datetime` is either:

- **naive**: no time zone attached. `datetime.now()` gives one. It's "9:30", but 9:30 where?
- **aware**: it carries a time zone, so it refers to one exact moment worldwide.

```python
from zoneinfo import ZoneInfo

utc_now = datetime.now(timezone.utc)
amsterdam = ZoneInfo("Europe/Amsterdam")
meeting = datetime(2025, 3, 14, 9, 30, tzinfo=amsterdam)
print(meeting.astimezone(ZoneInfo("America/New_York")))
```

The rule that keeps you out of trouble: **store and compute in UTC with aware datetimes, and convert to a local zone only to show it to a person.** Python refuses to compare naive and aware datetimes, which catches many mix-ups early.

## Text in, text out

For machines, use ISO 8601. It sorts correctly as text and includes the offset:

```repl
> datetime(2025, 3, 14, 9, 30, tzinfo=timezone.utc).isoformat()
'2025-03-14T09:30:00+00:00'
> datetime.fromisoformat("2025-03-14T09:30:00+00:00")
datetime.datetime(2025, 3, 14, 9, 30, tzinfo=datetime.timezone.utc)
```

For humans, `strftime` formats and `strptime` parses, using codes like `%d` (day), `%m` (month), `%Y` (year) and `%H:%M` (hours and minutes):

```python
meeting.strftime("%d %B %Y, %H:%M")      # '14 March 2025, 09:30'
```

```compare javascript
new Date().toISOString();   // always UTC
// The newer Temporal API adds proper time zone support.
```

```compare java
ZonedDateTime.now(ZoneOffset.UTC);   // java.time: same concepts
```

```exercise
goal: "Log timestamps should be unambiguous. Make `now` an aware UTC datetime."
lang: python
code: |
  from datetime import datetime, timezone

  now = datetime.now()
  print(now.isoformat())
checks:
  - match: 'datetime\.now\(\s*timezone\.utc\s*\)'
    message: Pass timezone.utc to datetime.now.
hint: datetime.now accepts a time zone.
solution: |
  from datetime import datetime, timezone

  now = datetime.now(timezone.utc)
  print(now.isoformat())
```

```quiz
question: "What's the problem with storing `datetime.now()` values from servers in different countries?"
options:
  - They're too precise.
  - They're naive local times, so the same reading can mean different moments.
  - datetime.now() only works on one server at a time.
answer: 1
explain: Without a time zone, 09:30 in Tokyo and 09:30 in London look identical. Store aware UTC times instead.
```
