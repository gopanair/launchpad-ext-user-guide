---
title: Settings and variables
description: Renaming an app, changing who owns it, and giving it configuration.
---

## Environment variables

This is how you configure an app without putting anything in the repository.

Set them on the **Settings** tab. They are stored encrypted, handed to your app
when it starts, and nothing else on the install can read them. Your app reads
them the ordinary way — `process.env.DATABASE_URL`, `os.environ["API_KEY"]`,
`Sys.getenv("TOKEN")`.

**A change takes effect on the next start, not immediately.** Editing a
variable does not restart a running app. Restart it yourself when you want the
new value picked up.

:::caution
Your app is only ever given the variables you set, plus the ones Launchpad
supplies (`PORT`, `BASE_PATH` and a few others). It never inherits the
platform's own environment — so a variable that works on your laptop because it
was already in your shell will not be there.
:::

## Renaming

Changing the name changes the slug, and the slug is the URL. Anything pointing
at the old address stops working. Launchpad does not keep a redirect.

A slug starting with `_` is refused: that namespace belongs to apps Launchpad
installs itself, like the guide you are reading.

## Ownership

An app is owned by a person or by a group — never both, never neither. Moving
it to a group is how you stop being the only one who can change it. Group
membership is managed on the install, not by your directory.
