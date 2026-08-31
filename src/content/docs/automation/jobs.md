---
title: Jobs
description: Running a command from your app's own code, on a schedule or on demand.
---

A job runs a command in a **fresh process built from your app's release, with
its own memory limit** — never inside your app's process. It is your app's code,
running a different entry point of itself.

Jobs are an optional capability. If your install has not configured them, there
are no jobs — and the refusal says so rather than failing oddly.

## Declaring one

In [`launchpad.toml`](../../build/launchpad-toml/):

```toml
[jobs.nightly-report]
command  = "python jobs/report.py"
schedule = "0 2 * * *"
timeout  = 900
memory   = 1024
retries  = 2
```

Or in the UI, on the Automation tab. Both are first-class; the manifest is the
better door because it travels with the code and is reviewed with it.

## What a job can and cannot be

- **It is your app.** A job starts a different entry point of the same app —
  never another app, and never an arbitrary command from outside the repository.
- **It does not need your app running.** It is a separate process.
- **Static apps cannot have jobs.** A `launchpad.toml` declaring one on a static
  app fails the deploy: there is no runtime for a command to mean anything in.
  Documents *can* — a rendered notebook's release has an interpreter.

## Parameters

```toml
[jobs.report.params.region]
type     = "string"
required = true
help     = "Which region to report on"
```

Parameters are **never interpolated into the command**. Your process is given
them as values and reads them as input. There is no way to turn a parameter into
part of a command line, which is what makes it safe to let somebody else supply
one.

```bash
lp job run report --param region=emea
```

## Concurrency and queueing

Your install caps how many of one app's runs may be in flight. Over that, a run
is refused with a queue-full error the SDK names — so your code can back off
rather than guess.

## Retries

**Opt-in, unattended-only, and never silent.** A scheduled job can retry; a run
somebody started by hand does not, because they are watching. Every retry is
visible as a retry rather than folded into one result.

Your administrator sets a ceiling on how many an app may ask for.

## Letting viewers run a job

```toml
viewer_runnable = true
```

Off by default. With it on, somebody who can view the app can start that job.
They still cannot see its command, edit it, or run any other one — and the run
is attributed to them.

## Reading a run

List runs, read one, read its log, read its output, cancel it — from the
Automation tab, from `lp job runs`, `lp job logs`, `lp job cancel`, or from your
own code.

```bash
lp job run nightly-report
```

Waits by default, and **the run's outcome is the exit code**, so a failing
nightly job fails your pipeline without you parsing anything.

Run output is capped, and runs and their logs are pruned on a retention your
administrator sets.
