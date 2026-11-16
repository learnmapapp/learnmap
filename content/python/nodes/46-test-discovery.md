---
title: "Test discovery"
icon: "🔎"
branch: "quality"
requires: ["unittest", "packages", "dependencies"]
summary: "Organize a project and run all matching test modules together."
---
Running one test file at a time gets old fast. **Test discovery** finds and runs every test in the project with a single command. Here's the layout it expects:

```text
project/
  studytools/
    __init__.py
    cards.py
  tests/
    __init__.py
    test_cards.py
    test_helpers.py
```

Then, from the `project/` folder:

```shell
$ python3 -m unittest discover -s tests -v
```

That command, piece by piece:

| Piece | Meaning |
| --- | --- |
| `python3 -m unittest` | run the unittest module |
| `discover` | search for tests instead of naming them |
| `-s tests` | **s**tart searching in the `tests` folder |
| `-p "test_*.py"` | the file name **p**attern; this is the default |
| `-v` | **v**erbose: print each test's name |

Running just `python3 -m unittest` from the project folder also does discovery, starting in the current folder.

## Why discovery finds nothing (a checklist)

`Ran 0 tests` is a rite of passage. Check these in order:

1. **File names** must match the pattern: `test_cards.py`, not `cards_test.py` or `tests_cards.py`.
2. **Method names** must start with `test`.
3. **The test folder** should have an `__init__.py` (it can be empty). Without it, a plain `python3 -m unittest` from the project folder won't look inside.
4. **Where you run it**: from the folder that contains both `studytools/` and `tests/`, so that `import studytools` works from inside the tests.

## Running a subset

When one test is failing, you don't need the whole suite. Name it by its dotted path:

```shell
$ python3 -m unittest tests.test_cards
$ python3 -m unittest tests.test_cards.ShuffleTests.test_keeps_cards
```

And `-k shuffle` runs only tests whose names contain "shuffle".

```tip
If you switch to pytest later, discovery is just `pytest`. It finds `test_*.py` files and `test` functions with similar rules, and runs your unittest classes too.
```

```compare javascript
// Jest and Vitest discover *.test.js files the same way:
// npx vitest
```

```compare go
// go test ./... runs every *_test.go file in every package.
```

```exercise
goal: "The tests live in `tests/`, not `src/`. Point discovery at the right folder."
lang: shell
code: |
  python3 -m unittest discover -s src -p "test_*.py" -v
checks:
  - match: '^python3\s+-m\s+unittest\s+discover\s+-s\s+tests\s+-p\s+["'']test_\*\.py["'']\s+-v\s*$'
    message: Set the discovery start directory with -s tests.
hint: -s sets where the search starts.
solution: |
  python3 -m unittest discover -s tests -p "test_*.py" -v
```

```quiz
question: "Discovery runs 0 tests. Your file is `tests/cards_test.py`. What's the likely cause?"
options:
  - The default pattern is test_*.py, so cards_test.py isn't picked up.
  - Test files must be in the project root.
  - unittest needs pytest installed to discover files.
answer: 0
explain: Rename it to test_cards.py, or pass -p "*_test.py".
```
