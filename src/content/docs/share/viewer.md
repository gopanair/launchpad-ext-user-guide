---
title: What your app learns about a viewer
description: The role header, asking who someone is, and what your app must never assume.
---

Every request Launchpad forwards to your app tells your app **what the caller
may do**. It does not, by default, tell your app **who they are**.

## The role

Each forwarded request carries a role — one of a small fixed set of words —
saying what this caller is allowed to do with this app.

Two rules matter more than the list:

- **The value is signed.** Your app should verify it rather than trust the
  header text. Absent, unverifiable and expired all mean the same thing: refuse.
- **A role is not an identity.** Two people with the same role are
  indistinguishable to your app. The role tells you nothing about who is there,
  and there is no way to tell from it whether a human is involved at all.

Your app enforces its own rules. Launchpad does not enforce anything on your
behalf inside your app, and your app must not enforce anything on Launchpad's
behalf either.

## Asking who someone is

Where an administrator has switched it on, your app can ask Launchpad who the
current viewer is. Two things about it:

- It is **off unless switched on**, per app. A "no" and a "not allowed" never
  collapse into the same answer.
- It is not available to a [static app](../../build/static/) or a rendered
  notebook — those have no process to hold a token.

## Never assume

- **Never trust a header your app did not verify.** Anything can be sent to your
  app by anything that can reach it.
- **Never use the role as a user id.** It is a permission word, not a person.
- **Never assume a viewer exists.** Scheduled tasks, health checks and probes
  reach your app with nobody behind them, and "nobody in particular" is a valid
  caller.
