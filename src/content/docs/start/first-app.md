---
title: Deploy your first app
description: From a repository URL to a running app, and what happens in between.
---

There are two ways to get code onto Launchpad. Start with the first.

## From a git repository

1. Go to **New app**.
2. Paste the repository URL.
3. Give the app a **name**. Launchpad turns it into a **slug** — lowercase
   letters, digits and hyphens — and that slug is the app's address:
   `/apps/your-slug`. You can rename later, but the URL changes with it.
4. Deploy.

If the repository is private, your administrator has to have connected the git
host first. You are never asked for a token; if the host is not connected, the
clone fails and says so.

## From your machine

`lp deploy` pushes what is on your disk right now, without committing or
pushing anywhere first. It is the faster loop while you are still working
things out. See [Installing lp](../../cli/installing/).

## What happens after you press deploy

A deploy runs in three phases, and the page shows you which one you are in.

| Phase | What happens |
|---|---|
| **Upload** | The code arrives — cloned from git, or unpacked from what `lp` sent. Dependency directories like `node_modules` and `.venv` are stripped, because the build reinstalls them. |
| **Scan** | Your dependencies are checked against your install's policy. Depending on how strict that policy is, a finding can warn you or stop the deploy. |
| **Deploy** | Dependencies are installed, the app is built, and the workload is started. |

The build log is live. If something fails, the log is where the reason is —
not a generic error on the app page.

## It failed on "unsupported framework"

Launchpad decided your repository is not one of the shapes it can run. The
message names what it looked for. The two common cases:

- **A front-end build with no server.** A Vite or Create React App repository
  has a `package.json` but no `start` script, so there is nothing to run.
  Either add a server and a `start` script, or commit the built output and
  declare it as a [static site](../../build/static/).
- **A Python project with no obvious entry point.** Launchpad looks for
  `app.py`, `main.py`, `streamlit_app.py`, `server.py` or `wsgi.py`. Name your
  entry point one of those.

## It deployed but the page is broken

Almost always links. Your app is served under `/apps/your-slug`, and a link
written as `/styles.css` asks the *platform* for that file, not your app. See
[Supported frameworks](../../build/frameworks/) for what each framework is told
about its mount point.
