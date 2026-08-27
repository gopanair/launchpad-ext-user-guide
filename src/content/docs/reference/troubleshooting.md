---
title: Troubleshooting
description: The failures people actually hit, and where the answer is.
---

## The deploy failed

**Read the build log** on the Deploys tab. It is the reason; the app page's
status is only the summary.

| Message | What it means |
|---|---|
| Unsupported framework | Nothing recognisable. See [Supported frameworks](../../build/frameworks/). |
| No entry point | A Python project with none of `app.py`, `main.py`, `streamlit_app.py`, `server.py`, `wsgi.py`. |
| Version not available | You pinned a version this install does not have. It is refused, never approximated. |
| A dependency finding | Your install's policy stopped it. Talk to your administrator. |
| Reserved slug | Names starting with `_` belong to Launchpad's own apps. |

## It deployed but the page is blank or unstyled

Links. Your app is at `/apps/your-slug`, and `/styles.css` asks the platform.

- Use relative URLs, or prefix with `BASE_PATH`.
- Redirect to `/dashboard`, **not** `/apps/your-slug/dashboard` — the proxy
  re-adds the prefix to a `Location` header, so a prefixed redirect gets it
  twice.
- Static site generator? Set its base path option to `/apps/your-slug`.

## It crashes on start

The Logs tab has it. Usually:

- Not binding to `PORT`.
- Binding to a hard-coded port.
- A missing environment variable — remember your app gets *only* what you set,
  never your shell's environment.
- The process ran to completion and exited. That is a crash to the supervisor.
  You want a [job](../../automation/jobs/).

## The first request is slow, then it is fine

It was [sleeping](../../apps/status/). Normal. Nothing is broken.

## I cannot start it, and it says an administrator locked it

You cannot lift a [lock](../../apps/locked/). The refusal carries the
administrator's own words — reply to them.

## My environment variable change did nothing

It takes effect on the next start. Restart the app.

## Public is not available

Your install may have anonymous access off, or require approval to publish. See
[Who can see your app](../../share/visibility/).

## A browser upload to storage fails silently

Almost always missing CORS on the bucket. Launchpad never saw the request, so
it cannot report it as a failed upload. Your administrator configures this.
