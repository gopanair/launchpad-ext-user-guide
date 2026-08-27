---
title: What Launchpad is
description: Where your organization's own software lives, and what Launchpad does with a repository you give it.
---

Launchpad is where your organization's own software lives — web apps, APIs,
dashboards, reports and scheduled work, built in-house.

You give it a repository. It clones the code, works out what language and
framework it is, installs the dependencies, builds it, starts it, and serves it
at a URL. You do not write a Dockerfile, pick a base image, or configure a web
server.

## What you get

- **A URL** of the form `/apps/your-app`, on the address your administrator set
  up for this install.
- **Build logs and run logs**, kept per app, so a failed deploy tells you what
  happened.
- **Control over who can see it** — private to you, anyone signed in, or public.
- **Environment variables**, stored encrypted, that your app reads at startup.
- **Scheduled work**, if your app publishes a path for it.

## What Launchpad is not

It is not a general container platform. It runs the languages and frameworks
listed under [Supported frameworks](../../build/frameworks/), and a repository
it cannot recognize is refused with a reason rather than deployed and left to
crash.

It is not a place to store data. An app gets a small
[JSON document](../../data/app-data/) of its own, and — where an administrator
has set one up — [file storage](../../data/app-storage/). Anything more is a
database your administrator provides.

## The two halves of a Launchpad install

| | Who it is for |
|---|---|
| **The platform** | Everyone. The pages you sign in to, the app list, your app's page. |
| **Your apps** | Whoever you share them with. Served on a different address from the platform, on purpose, so an app's JavaScript cannot read the platform as you. |

That separation is why an app's links have to keep the `/apps/your-app` prefix.
It comes up when you build one — see [Supported frameworks](../../build/frameworks/).
