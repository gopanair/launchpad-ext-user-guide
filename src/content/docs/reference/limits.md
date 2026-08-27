---
title: Limits
description: The numbers that are fixed, and the ones your administrator sets.
---

## Fixed

| | |
|---|---|
| App data document | 256 KiB, one document per app |
| Slug characters | lowercase letters, digits and hyphens |
| Reserved slugs | anything starting with `_` |
| Version pins | comparators only, never a patch version |

## Set by your administrator

These vary per install. The app page and the build log tell you the ones that
apply to you.

- Build memory, CPU and timeout
- Job memory, CPU, timeout and retry ceiling
- Scheduled task timeout and memory envelope — tighter than a job's
- Log retention
- Upload size
- How long a session lasts, idle and total
- Whether apps may be public at all
- Which language versions exist
- How strict the dependency policy is

## Things that are absent rather than limited

If your install has not configured a capability, it is not there — no disabled
buttons, no tabs that explain themselves.

- File storage
- Jobs
- The artifact store
- Isolated execution

Ask your administrator before designing around any of them.
