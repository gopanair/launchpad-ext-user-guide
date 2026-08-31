---
title: Deploying with lp
description: The commands you will use daily, and the exit codes that matter in CI.
---

```bash
lp deploy
```

From inside your project. Sends what is on your disk right now. What gets sent,
and how the app is chosen, is on [From your machine](../../deploy/from-your-machine/).

## The commands

| Command | What it does |
|---|---|
| `lp apps` | List the apps you can reach |
| `lp create` | Create an app, naming the slug before claiming it |
| `lp link` | Write the `[app]` table, validating the slug first |
| `lp deploy` | Push the working tree |
| `lp redeploy` | Rebuild from the repository the app names |
| `lp status` | Is it up, what is it serving, since when |
| `lp logs` | Run log; `--follow` to stream, `--deploy <id>` for a build log |
| `lp events` | The failure feed |
| `lp restart` · `lp start` · `lp stop` | Lifecycle |
| `lp rollback` | Back to a previous release |
| `lp job` | `list` · `run` · `runs` · `logs` · `cancel` |
| `lp task` | `run` a scheduled task now |
| `lp store` | `ls` · `put` · `get` · `rm` |
| `lp sdk vendor` | Vendor the install's own app SDK into your project |

`--json` on the commands that have it, for anything you are parsing.

Flags come before positionals.

## Exit codes are a contract

```
0  it worked
1  the platform did the thing and it failed
2  usage or configuration
3  not authenticated, or refused
4  could not reach the install
```

Worth internalising for CI: **1 and 3 are different failures.** A build that ran
and failed is 1. A credential the install rejected is 3. An install you could
not reach at all is 4.

`lp job run` and `lp task run` wait by default, and **the run's outcome is the
exit code** — so a failing nightly job fails your pipeline without you parsing
anything. A task that was *skipped* is exit 1: a firing that did not happen is
not a success.

## Unattended mode

`lp` detects a non-interactive terminal rather than remembering a flag you set
once. It will not prompt, and anything that needed a confirmation is refused
with exit 2 instead of hanging.

That is why `lp rollback` in a pipeline needs `--yes`.

## The install's address is the install's answer

`lp` asks the install where its apps are served, once per invocation, rather than
deriving a URL from the one you typed. So a split-origin install, a custom
hostname and a reverse proxy all work without configuration on your side.
