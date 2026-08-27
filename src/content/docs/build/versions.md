---
title: Language versions
description: Pinning Python, Node, Go or R, and what a pin may and may not say.
---

Launchpad picks a default version for your language. To ask for a different
one, declare it — in `launchpad.toml` for Python, Node and R, and in `go.mod`
for Go.

```toml
# launchpad.toml
[runtime]
python = ">=3.12"
node   = ">=22"
r      = ">=4.4"
```

Go is the exception: its declaration is the `go` line in `go.mod`, because Go
already has one and teaching a second would mean two places to disagree.

## What a pin may say

**Comparators only** — `>=3.12`, `<3.13`, and combinations. Not `^3.12` and not
`~3.12`: those are semver assumptions, and Python is not semver.

**Never a patch version.** `3.12` is a pin. `3.12.4` is refused, not quietly
truncated to `3.12`. Patch releases are security fixes, and an app that pins
away from them is an app that stops getting them.

## What happens when it cannot be met

The version is **refused, not approximated**. If your install has 3.11 and 3.12
and you ask for `>=3.13`, the deploy fails and names what is available. You
never get silently downgraded onto an interpreter you did not ask for.

The decision is made **before** the build, because that is where the interpreter
gets baked in.

## Which versions exist

Your administrator decides which versions this install offers — they are
discovered on the machine, not compiled into Launchpad. The New app page and
the build log both tell you what was available.

Every build records which version it actually resolved, pinned or not. That is
on the deploy, so "which Python is this app on" is always answerable.
