---
title: Bib files
icon: "📚"
branch: references
requires: [cross-references]
summary: The .bib format, entry types, fields, citation keys and names.
---
References aren't typed into your document. They live in a [[bib file]]: a plain-text database ending in `.bib`. You keep all your references there, and LaTeX prints only the ones you cite, sorted and formatted in the style you choose.

```bibtex title=refs.bib
@book{knuth1984,
  author    = {Donald E. Knuth},
  title     = {The {TeX}book},
  publisher = {Addison-Wesley},
  year      = {1984},
}

@article{lamport1986,
  author  = {Leslie Lamport},
  title   = {Document Preparation with {LaTeX}},
  journal = {TUGboat},
  volume  = {7},
  number  = {1},
  pages   = {1--5},
  year    = {1986},
}
```

## Anatomy of an entry

- `@book` is the **entry type**. It decides which fields are expected and how the entry is formatted.
- `knuth1984` is the [[citation key]]. It's the name you use in `\cite{knuth1984}`. It can be anything without spaces or commas; `authoryear` keys like this are a common convention.
- Then come **fields** as `name = {value}`, separated by commas. The order doesn't matter.

## Common entry types

| Type | For | Typical fields |
| --- | --- | --- |
| `@article` | journal papers | author, title, journal, year, volume, pages |
| `@book` | books | author or editor, title, publisher, year |
| `@inproceedings` | conference papers | author, title, booktitle, year |
| `@incollection` | a chapter in an edited book | author, title, booktitle, editor |
| `@phdthesis`, `@mastersthesis` | theses | author, title, school, year |
| `@techreport` | reports | author, title, institution, year |
| `@online` (biblatex) / `@misc` | websites, software | author, title, url, urldate |

## Names

Separate several authors with **and**, never with commas:

```bibtex
@inproceedings{turing1950,
  author    = {Alan M. Turing and Hopper, Grace and {The LaTeX Project}},
  title     = {An Imaginary Paper},
  booktitle = {Proceedings of Things That Never Happened},
  year      = {1950},
  doi       = {10.1000/xyz123},
}
```

- `Grace Hopper` and `Hopper, Grace` both work. Use the comma form for names like `van der Berg, Anna` or `King, Jr., Martin Luther`.
- Wrap an organisation in an extra pair of braces, so it isn't split into a first and last name.

## Protecting capitals

Many styles change titles to sentence case. Braces protect words that must keep their capitals: `{TeX}`, `{DNA}`, `{Fourier}`.

## Where entries come from

You rarely type entries yourself. Google Scholar, publisher pages, doi2bib.org and arXiv all offer a "BibTeX" export. Reference managers like **Zotero** (with the Better BibTeX plugin), JabRef and Mendeley keep a `.bib` file up to date for you. Exported entries are often messy, so check the author names and capitals.

```tip
Accented letters can be typed directly (Gödel) with biber. With old BibTeX, write {\"o} instead.
```

```compare javascript
// A bib entry is a lot like a JSON record with a type and an id:
// { "type": "book", "id": "knuth1984", "author": "Donald E. Knuth", "year": 1984 }
```

```exercise
lang: bibtex
goal: "Complete the entry: give it the citation key `hopper1952`, and add the year `1952`. Separate the two authors with `and`."
code: |
  @article{,
    author  = {Grace Hopper, John Mauchly},
    title   = {The Education of a Computer},
    journal = {Proceedings of the ACM},
  }
checks:
  - match: '@article\{hopper1952,'
    message: "Put the key after the brace: @article{hopper1952,"
  - match: 'author\s*=\s*\{Grace Hopper and John Mauchly\}'
    message: Separate the authors with and, not a comma.
  - match: 'year\s*=\s*\{?1952\}?'
    message: "Add year = {1952}."
solution: |
  @article{hopper1952,
    author  = {Grace Hopper and John Mauchly},
    title   = {The Education of a Computer},
    journal = {Proceedings of the ACM},
    year    = {1952},
  }
```

```quiz
question: "How do you list three authors in a bib entry?"
options:
  - "author = {A. One and B. Two and C. Three}"
  - "author = {A. One, B. Two, C. Three}"
  - "author1, author2 and author3 fields"
answer: 0
explain: "Authors are always separated by the word and. A comma separates a last name from a first name."
```
