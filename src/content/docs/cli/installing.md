---
title: Installing lp
description: Getting the command-line client and signing it in.
---

`lp` is Launchpad's command-line client. Its main job is to push what is on
your disk to an app, without committing or pushing to a git host first.

## Install

Download the binary for your platform from the public download repository and
put it on your `PATH`. There is one binary, no runtime, and nothing to install
alongside it.

## Sign in

```bash
lp login https://launchpad.your-company.com
```

That opens a browser, you approve the device, and `lp` stores a personal key.

Credentials go in `credentials.toml` under your config directory —
`~/.config/launchpad/` on Linux and macOS, `%AppData%\launchpad\` on Windows —
mode `0600` inside a `0700` directory, holding **nothing but credentials**.
Settings live in `config.toml` beside it, so the file you edit and the file with
a secret in it never become one file.

## The credential is never a flag

There is no `--token` on `lp`. A secret on a command line lands in your shell
history and in the process table, where anything on the machine can read it.

The ways to supply one:

| | |
|---|---|
| `lp login` | Stores it. The normal path. |
| `LAUNCHPAD_TOKEN` | For CI. Must be paired with `LAUNCHPAD_URL`. |
| `LAUNCHPAD_TOKEN_FILE` | A mounted secret. The path is not sensitive; the variable is. |
| `--token-stdin` | Piped in. |

:::caution
**A credential and an address are one statement.** `LAUNCHPAD_TOKEN` is used
only when the install came from `LAUNCHPAD_URL` too. Every other combination is
refused, naming both halves — including your stored default. `--install
staging` on a machine holding a production token is exactly the accident this
rule exists to catch.

Setting both `LAUNCHPAD_TOKEN` and `LAUNCHPAD_TOKEN_FILE` is a refusal, not a
precedence rule.
:::

## Several installs

```toml
# config.toml
default = "https://launchpad.corp"
```

`--install` picks another one by URL or alias. It names an install, not a
credential — it does not on its own make a token from elsewhere usable.

## Expiry

`lp` stores what the install said when it minted the key. Within fourteen days
of expiry you get one dimmed line on stderr, once per invocation, never on
stdout so it cannot corrupt piped output.

Nothing on your machine decides a credential has expired. The install answers,
and `lp` reports exit 3.
