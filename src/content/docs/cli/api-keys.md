---
title: API keys
description: The three kinds of key, and which one you want.
---

There are three key classes. They are never blurred, and which one you want
depends on **who the key belongs to**.

| Prefix | What it is | Belongs to |
|---|---|---|
| `lpu_` | A **personal key** — an identity. It acts as you. | You |
| `lp_` | An **app key** — a grant on exactly one app. | An app |
| `lpd_` | A **deploy key** — for CI. | Nobody |

## Personal keys — `lpu_`

This is what `lp login` gives you. It is *you*: anything you can do, it can do,
across every app you can reach.

Treat it like your password. If a script needs to touch one app, give it an app
key instead.

## App keys — `lp_`

Scoped to one app. Useful for a script or an integration that only ever needs
that app.

An app key can carry a stored role, but only one of two, and only within what
the app's own gate already allows — it can narrow what the key may do, never
widen it.

## Deploy keys — `lpd_`

For CI. A deploy key belongs to no person, so it does not stop working when
somebody leaves. What it can do is a **strict subset** of what a personal key
can do.

## What no key can do

**No key manages credentials or authorization.** A key cannot mint another key,
change a permission, add a provider, or alter who can see what. That is refused
for every key class, and it fails closed — a route that forgot to say so is not
reachable by a key at all.

## Turning one off

Off means **absent**, and off means **now**. A disabled key stops working on the
next request; there is no cache to wait out and no grace period.
