---
title: Deploying with lp
description: Pushing the working tree, and what gets sent.
---

```bash
lp deploy
```

From inside your project. It sends what is on your disk **right now** —
uncommitted changes included, nothing pushed to a git host.

## Which app

```toml
# launchpad.toml
[app]
slug = "phase-test"

# a checkout that targets two installs says so, and neither is wrong
[app.installs."https://staging.launchpad.corp"]
slug = "phase-test-stg"
```

Or `--app <slug>` on the command line. `lp link` sets it up for you.

## What gets sent

**`.gitignore` decides** — every one in the tree, with `!` negations honoured,
plus `.git/info/exclude`. `.launchpadignore` is additional, never a
replacement.

`lp` does **not** shell out to git, so this works in a plain folder that is not
a repository at all.

Always dropped: `.git/`, `.hg/`, `.svn/`, `node_modules/`, `venv/`, `.venv/`,
`__pycache__/`, `*.pyc`, `.DS_Store`.

Dropped **only when the tree root has a `package.json`**: `dist/`, `build/`,
`out/`, `.next/`, `.nuxt/`, `.svelte-kit/`. That is the right bet for a Node
project and the wrong one for a static site — so a `[static] root` pointing
inside one of those wins, and your `dist/` ships.

:::note
`lp deploy` does not convert your app. Deploying from your machine to an app
that was created from a git repository does not detach it from that repository
or change how it updates.
:::

## Other commands

| Command | What it does |
|---|---|
| `lp status` | Is it up, what is it serving, when was it deployed |
| `lp logs --follow` | The run log; `--deploy <id>` prints a build log instead |
| `lp redeploy` | Rebuild the current source |
| `lp rollback` | Back to a previous release |
| `lp job run <name>` | Run a job, waiting by default |
| `lp task run <name>` | Fire a scheduled task now |
| `lp store ls\|put\|get\|rm` | Files in a store you hold a grant on |
| `lp sdk vendor` | Vendor the install's own app SDK into your project |

## Exit codes are a contract

```
0  it worked
1  the platform did the thing and it failed
2  usage or configuration
3  not authenticated, or refused
4  could not reach the install
```

Worth internalising for CI: **1 and 3 are different failures.** A build that
ran and failed is 1. A credential the install rejected is 3. An install you
could not reach at all is 4.

`lp job run` and `lp task run` wait by default, and **the run's outcome is the
exit code** — so a failing nightly job fails your pipeline without you parsing
anything. A task that was *skipped* is exit 1: a firing that did not happen is
not a success.

## Unattended mode

`lp` detects a non-interactive terminal rather than remembering a flag you set
once. It will not prompt, and anything that needed a confirmation is refused
with exit 2 instead of hanging.
