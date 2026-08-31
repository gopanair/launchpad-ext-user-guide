---
title: When an app is locked
description: What a lock is, why you cannot lift it, and what to do.
---

An administrator can **lock** an app. When they do, it stops, and it stays
stopped.

## A lock is not a status

Your app can be stopped because you stopped it — you can start it again. A lock
is different: you cannot lift it, and starting the app is refused with the
administrator's own words explaining why.

- The owner may leave `stopped`.
- The owner may never leave a lock.

**Locking stops the workload. Unlocking does not start one** — somebody still
has to press start.

## What a lock blocks

Deploying, starting, changing visibility, running jobs, and everything else that
would bring the app back or change what it serves. Visitors to the app's URL get
the administrator's message too.

The refusal always carries the reason the administrator typed. **Read it** — it
is a message written to you, not a generic error string.

## What to do

Reply to the administrator who locked it. Launchpad deliberately gives you no
way around a lock — not a flag, not an API call, not a redeploy under a new name
that inherits the old one's state.

## Retirement

An app that is finished with is locked rather than moved to some third state. So
"this app was retired" and "this app was locked for cause" look the same to you,
and the administrator's message is what tells them apart.

If the message does not tell you which it is, ask. That is a copy problem, not
your misreading.
