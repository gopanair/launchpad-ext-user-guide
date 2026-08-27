---
title: launchpad.toml
description: The optional manifest, and every table it can carry.
---

`launchpad.toml` at the root of your repository is optional. Without one,
Launchpad detects what it can and uses defaults. With one, you can say things
detection cannot work out for itself.

Every key is optional.

```toml
[runtime]
python = ">=3.12"
node   = ">=22"
go     = ">=1.23"   # normally omitted — Go's declaration is go.mod
r      = ">=4.4"

[static]
root     = "dist"
entry    = "index.html"
fallback = false

[notebook]
engine = "knitr"

[jobs.nightly-report]
command  = "python jobs/report.py"
schedule = "0 2 * * *"
timeout  = 900
memory   = 1024
retries  = 2
enabled  = true

[jobs.nightly-report.params.region]
type     = "string"
required = true
help     = "Which region to report on"
```

## `[runtime]`

Language version pins. Comparators only, never a patch version. See
[Language versions](../versions/).

## `[static]`

Where your built site is, what to serve at the root, and whether unmatched
paths fall back to it. Declaring this table also **overrides** the rule that a
`package.json` disqualifies a repository from static hosting. See
[Static sites](../static/).

## `[notebook]`

`engine = "knitr"` forces a `.qmd` to be treated as R. Only needed when the
document's own header does not say.

## `[jobs.<name>]`

One table per job. See [Jobs](../../automation/jobs/) for what a job is.

| Key | Meaning |
|---|---|
| `command` | What to run. Required. |
| `schedule` | Cron expression, for a job that runs unattended. |
| `timeout` | Seconds before the run is killed. |
| `memory` | Megabytes. |
| `cpu` | CPU allowance. |
| `retries` | Retries on failure. Opt-in, unattended-only, and never silent. |
| `enabled` | `false` to define a job without arming it. |
| `viewer_runnable` | `true` to let a viewer of the app start it. |

`[jobs.<name>.params.<param>]` declares a parameter, with `type`, `required`,
`default` and `help`.

:::caution
Parameters are never interpolated into the command. They are passed to your
process as values; you read them the way you read any other input. A parameter
cannot become part of the command line, which is why a job cannot be turned
into a shell injection by whoever runs it.
:::

## What is not in here

Environment variables. Those are set on the app's Settings tab, not committed
to the repository — that is the whole point of them. Nothing in
`launchpad.toml` grants your app a permission, a credential, or access to
anything.
