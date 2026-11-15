---
title: Nix
icon: "❄️"
kind: hub
branch: core
summary: What Nix is, and why people fall in love with it.
---
Most of the time we set up computers by doing things: install this, edit that file, enable a service. It works, right up until you need a second machine and can't remember what you did to the first one.

Nix flips that around. You write down **what you want**, and Nix figures out how to get there:

```nix title=configuration.nix
{
  programs.git.enable = true;
  networking.hostName = "workstation";
  services.openssh.enable = true;
}
```

That's what [[declarative]] means. The file *is* the setup. Copy it to a new machine and you get the same result back.

And because Nix builds everything from precise recipes, the result is [[reproducible]]: same inputs, same output, on your laptop, on CI, or on a colleague's machine a year from now.

```tip
Nix is three things with one name: a **language** (what you write), a **package manager** (what builds it) and, if you like, an **operating system** (NixOS). This map covers all three, starting with the language.
```

```quiz
question: What does it mean that Nix is *declarative*?
options:
  - You type commands one after another, and Nix records them.
  - You describe the end result, and Nix works out how to get there.
  - Nix only works on servers.
answer: 1
explain: You describe the *what*, Nix takes care of the *how*.
```

## How to read this map

The map has five branches around this starting point:

- **The language**: the small functional language every Nix file is written in.
- **Everyday Nix**: trying packages, installing tools, rolling back and cleaning up.
- **Building**: the store, derivations, dev shells and packaging your own software.
- **Flakes**: pinned inputs and standard outputs for whole projects.
- **Systems**: NixOS and Home Manager, your whole machine as code.

You don't need all of it. Want a dev shell for one project? That's a short route. Want to run NixOS on a server? Pick that goal, and the map lights up the way there.

```quiz
question: Two machines use the same Nix config and the same pinned inputs. What do they get?
options:
  - Roughly the same setup, depending on what was installed before.
  - Exactly the same packages and configuration.
  - Whatever the latest versions are today.
answer: 1
explain: Same inputs, same outputs. That's what reproducible means.
```
