---
title: Logs
description: Where your app's output goes, and what Launchpad does and does not keep.
---

Anything your app writes to standard output or standard error is captured and
shown on the **Logs** tab, live.

## Two different logs

- **Build logs** belong to a deploy. They are on the **Deploys** tab, one per
  deploy, and they are where a failed build explains itself.
- **Run logs** belong to the running process. They are on the **Logs** tab and
  they reset when the workload is replaced.

A deploy that fails never produces run logs, because nothing started. Look at
the build log instead.

## What to print

Print to stdout and stderr. Do not write log files inside your app's directory
expecting to read them later — a deploy replaces the tree.

Structured or plain both work. ANSI colour is rendered rather than shown as
escape codes.

## What is not kept forever

Logs are bounded. Your install has a retention setting, and old lines go. If
you need something kept — an audit trail, a report, a metric — write it
somewhere that is meant to keep things, not to the log.
