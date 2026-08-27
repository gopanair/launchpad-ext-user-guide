---
title: Scheduled tasks
description: Having Launchpad call a path in your app on a schedule.
---

A scheduled task is **an HTTP request to a path your app publishes**, made on a
schedule. It runs no command. It starts no process of its own.

```
Every day at 02:00  →  POST /internal/refresh  →  your running app
```

Your app does the work in the handler and returns. That is the whole mechanism.

## Setting one up

On the app's **Automation** tab: the path, the method, and the schedule as a
cron expression. The path is relative to your app, so `/internal/refresh`, not
the full URL.

## What you have to know

- **Your app has to be running.** The request wakes a sleeping app the way any
  other request does. A stopped or locked app does not answer, and the run is
  recorded as skipped.
- **There is a ceiling on how long it may take**, and a memory envelope, both
  smaller than a job's. A scheduled task is meant for a request, not for an
  hour of batch work. If you need that, use a [job](../jobs/).
- **Protect the path.** It is a path in your app, reachable like any other. Give
  it a check of its own — a shared secret in a header from an environment
  variable is the usual approach.
- **A skipped run is recorded. A refused one is not.** If your app returns an
  error, that is a run that happened and failed, and you will see it. If
  Launchpad never made the request, you will see that too, with the reason.

## This is not the job system

They look similar and they are not the same thing:

| | Scheduled task | Job |
|---|---|---|
| What runs | An HTTP request to your app | A command, in a fresh process |
| Your app must be | Running | Not necessarily |
| Good for | A refresh, a cache warm, a nightly poke | Batch work, reports, migrations |
| Limits | Tight | Generous |
