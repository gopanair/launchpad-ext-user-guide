---
title: Status and sleeping
description: Running, sleeping, stopped and crashed — what each one means and who caused it.
---

| Status | What it means |
|---|---|
| **Running** | The workload is up and serving. |
| **Sleeping** | Nobody has used it for a while, so Launchpad stopped the process to free the machine. The next request wakes it. |
| **Stopped** | Somebody stopped it on purpose. It stays stopped until somebody starts it. |
| **Crashed** | It started and then exited, repeatedly. |

## Sleeping is not stopped

This is the distinction worth internalising. A **sleeping** app is still
deployed, still published, and still answers its URL — the first request after
a nap just takes longer while the process comes back. Nothing is wrong.

A **stopped** app does not answer at all, and only a person can change that.

## Waking

You do not wake an app. Visiting it does. If your app is slow on its first
request and fast afterwards, that is what you are seeing, and the fix — if you
want one — is to make your app start faster, not to keep it awake artificially.

Note that a scheduled task hitting your app counts as a request. If you have
one running every five minutes, your app will effectively never sleep.

## Crashed

The **Logs** tab has the reason. Common causes:

- The app did not bind to the port Launchpad gave it in `PORT`, or bound to a
  fixed port of its own.
- It bound to `localhost` in an install that needs `0.0.0.0`, or the reverse.
- A missing environment variable, discovered at startup.
- The process ran to completion and exited. A workload has to keep running; a
  script that finishes is a crash as far as the supervisor is concerned. If you
  want something that runs and exits, that is a [job](../../automation/jobs/).

## Quiet apps

Separately from sleeping, Launchpad tracks how long it has been since anybody
showed any sign of wanting an app — no visits, no deploys, no edits. That is
reported to you as a fact about your app, not a verdict. Nothing is deleted or
stopped automatically because an app went quiet.
