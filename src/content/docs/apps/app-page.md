---
title: The app page
description: What each tab on your app's page is for.
---

Everything about one app lives on its page. The tabs, and what each is for:

| Tab | What it answers |
|---|---|
| **Overview** | Is it running, what is its URL, when was it last deployed, and what did the last deploy do. |
| **Deploys** | Every deploy, with its build log. This is where a failure explains itself. |
| **Logs** | What the running process is printing right now. See [Logs](../logs/). |
| **Settings** | Name, slug, visibility, owner, environment variables. See [Settings and variables](../settings/). |
| **Dependencies** | What your app depends on and what your install's policy thinks of it. |
| **Automation** | Scheduled tasks and jobs. See [Scheduled tasks](../../automation/scheduled-tasks/). |

Some tabs only appear when the install has the thing they are about. If your
administrator has not configured file storage, there is no storage tab — not a
disabled one.

## The URL

Your app is at `/apps/your-slug` on this install's apps address. That address
may be a different port or a different hostname from the platform you are
reading this on; both are normal, and your administrator chose which.

Copy it from the app page rather than typing it. If the app is private, the URL
works for you and nobody else.
