---
title: The app page
description: What each tab is for, and which ones you will not see.
---

Everything about one app lives on its page. Which tabs you get depends on what
you may do with the app and what this install has configured — a tab for a
capability your install does not have is **absent**, not greyed out.

| Tab | What it answers | Who sees it |
|---|---|---|
| **Overview** | Is it running, what is its URL, what did the last deploy do, what needs attention. | Anyone who can open the app |
| **Logs** | What the process is printing, and any deploy's build log. | Editors |
| **Deployments** | Every deploy, the release that is serving, rollback, retention. | Editors |
| **Usage** | Who has opened it, how often, what it is consuming. | Editors |
| **Dependencies** | What it installs, and what policy thinks of it. | Editors |
| **Automation** | Scheduled tasks, jobs, render schedules. | Editors |
| **Integrations** | What this app may send outward, and where. | Editors |
| **Access** | Visibility, who it is shared with, who is asking. | Owner, and whoever may share |
| **Settings** | Name, slug, source, variables, runtime, tags, deletion. | Editors |

## Overview

The page you land on. It carries the app's address, its current status, what the
last deploy did, and any banner that needs your attention — an unapplied
variable change, a blocked deploy, a source that is no longer allowed, a lock.

**A platform decision about your app appears on your app.** You do not have to
go and find out from somewhere else that a deploy was refused.

## The URL

Your app is at `/apps/your-slug` on this install's apps address. That address may
be a different port or a different hostname from the platform you are reading
this on; both are normal, and your administrator chose which.

Copy it from the app page rather than typing it. If the app is private, that URL
works for you and for nobody else.

## The header

The app's status is a pill in the header, and it reports whatever a start or
stop from anywhere on the page did — the Settings button, the banner on
Overview, the CLI, a schedule. There is one answer about whether your app is up.

## Deleting an app

On **Settings**, and it is type-to-confirm because it is not reversible.
Deleting an app removes its releases, stops and removes its workload, and
detaches its storage.

**Detaching storage does not delete the data.** Objects and files in a store
survive the app that was mapped to them.
