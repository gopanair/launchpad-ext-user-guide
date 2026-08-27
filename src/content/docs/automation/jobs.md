---
title: Jobs
description: Running a command from your app's own code, on a schedule or on demand.
---

A job runs a command in a fresh process built from your app's release. It is
your app's code, running a different entry point of itself.

Declare jobs in [`launchpad.toml`](../../build/launchpad-toml/):

```toml
[jobs.nightly-report]
command  = "python jobs/report.py"
schedule = "0 2 * * *"
timeout  = 900
memory   = 1024
retries  = 2
```

## What a job can and cannot be

- **It is your app.** A job starts a different entry point of the same app,
  never another app, and never an arbitrary command from outside the
  repository.
- **It does not need your app running.** It is a separate process.
- **Static apps cannot have jobs.** A `launchpad.toml` declaring one on a static
  app fails the deploy: there is no runtime for a command to mean anything in.
  Notebooks *can* — a notebook release has an interpreter.

## Parameters

```toml
[jobs.report.params.region]
type     = "string"
required = true
help     = "Which region to report on"
```

Parameters are **never interpolated into the command**. Your process is given
them as values and reads them as input. There is no way to turn a parameter
into part of a command line, which is what makes it safe to let somebody else
supply one.

## Retries

Opt-in, unattended-only, and never silent. A scheduled job can retry; a run
somebody started by hand does not, because they are watching. Every retry is
visible as a retry rather than folded into one result.

## Letting viewers run a job

```toml
viewer_runnable = true
```

Somebody who can view the app can start that job. They still cannot see its
command, edit it, or run any other one — and a job run started this way is
attributed to them.

## From your app's own code

Your app can start one of its own jobs. Two rules:

- It can only start **its own** jobs.
- It never asserts who a viewer is. It relays what Launchpad already signed. An
  app cannot claim a run was started by somebody it was not.
