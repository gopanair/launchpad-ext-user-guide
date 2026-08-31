---
title: Dependencies and policy
description: What your install reads about your packages, and what it can do about it.
---

The **Dependencies** tab lists what your app installs — npm, PyPI, Go modules,
CRAN — and what your install's policy makes of it.

Whether there is a policy at all is your administrator's decision. On an install
without one, the tab is an inventory and nothing more.

## What it reads

**Names and versions, not your code.** It is a manifest check. It will not find
a bug you wrote, a secret you committed, or a vulnerability in code that has no
package name.

Do not treat a clean tab as a security review of your app.

## What it can do

A policy can refuse a **deploy** — on severity, on whether a fix has been
published, and separately on malware, which is not a severity and gets its own
switch.

Three things it deliberately cannot do:

- **It never stops a serving app.** Policy gates deploys. An advisory published
  today does not take down what is already running.
- **A restart is not a deploy.** The verdict that applies to a restart is the one
  made about *that release*, not today's feed.
- **A stale feed never blocks.** If the advisory data cannot be refreshed,
  deploys continue.

## When your deploy is refused

The build log names the package, the version and the finding, and the refusal
appears on your app's page rather than only in the log.

Your options, in order:

1. **Upgrade the package.** Usually this is the whole answer.
2. **Ask for a waiver.** Waivers are time-bounded — there is no permanent
   one — and your administrator grants them.
3. **Argue that the finding does not apply.** Worth doing when the vulnerable
   code path is one you do not use. The conversation is with a person, not with
   the tool.

## The vocabulary

Three words that look similar and are not:

| | Means |
|---|---|
| **Not recorded** | No inventory was taken for this release. |
| **Not enumerable** | The inventory cannot be taken — an R app with no `renv.lock`, for instance. Never "no dependencies". |
| **Not scanned** | The inventory exists and was matched, but the ecosystem is not covered. A finding can still appear; its *absence* is not a verdict. |

R sits on that middle rung: matched against CRAN, and still reported as not
covered. That is deliberate honesty rather than a gap in the tab.

## Re-checking

You can ask for one app to be re-checked against the current feed. That does not
redeploy anything and does not change what is running; it updates what the tab
says.
