---
title: Groups
description: Sharing an app with a team rather than a person.
---

A group is a set of people on this install. An app can be owned by a group
instead of by you, which is how a team shares one app without one person being
a single point of failure.

## What a group is

- A **local** list, managed on the install. It is not a group from your
  directory or your identity provider, even if the names match.
- A set of **humans**. A group is never an actor: nothing runs *as* a group, and
  a group does not hold API keys.
- Managed by administrators, or by whoever they delegated it to.

## Owning an app

An app is owned by a person **or** a group — never both, never neither.
Transferring ownership to a group means every member can deploy it, change its
settings, and stop it.

Transferring away from yourself is not reversible by you alone. If you are not
in the group you gave it to, you have given it away.

## What groups do not do

They do not appear inside your app. If your app needs to know which team
somebody is on, it has to get that from somewhere else — Launchpad tells your
app what a viewer may *do*, not which groups they are in. See
[What your app learns about a viewer](../viewer/).
