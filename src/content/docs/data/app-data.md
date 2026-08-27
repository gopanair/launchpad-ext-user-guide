---
title: App data
description: The one small JSON document every app gets.
---

Every app has one JSON document it can read and write. That is the entire
feature, and the limits are the point of it.

| | |
|---|---|
| **Size** | 256 KiB |
| **Shape** | One document. No keys, no collections, no listing, no queries. |
| **Contents** | Yours. Launchpad stores it as text and never reads it. |

## What it is for

Small state that belongs to the app rather than to a person: a saved filter, a
last-run timestamp, a feature flag your app set itself, a bit of configuration
somebody edited in the UI.

## What it is not for

A database. There are no queries, so anything you want to *search* does not
belong here. Anything per-user does not belong here either — it is one document
for the whole app.

If you need a real database, your administrator provides one and you get its
connection string as an environment variable.

## Three states, and they stay distinct

- **Never written** — the app has never stored anything.
- **Cleared** — there was something and it was removed.
- **`{}`** — an empty object, which the app deliberately wrote.

These are three different answers, not one. Code that treats "never written" and
"empty" as the same thing is code that will do the wrong thing the first time
somebody clears it.

## Versions

Every read gives you a version. You can use it as a precondition on a write, so
two concurrent writers do not silently overwrite each other. That is opt-in —
write without one and the last write wins.
