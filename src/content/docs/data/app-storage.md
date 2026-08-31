---
title: App storage
description: Files, folders and the two different things that have to be true.
---

App storage is for files: uploads, reports, exports, anything that is a blob
rather than a row.

:::note
This is an optional capability. If your administrator has not configured
storage, there is no storage on your app — not a disabled tab. Ask before
designing around it.
:::

## Two kinds of resource

| | What it is |
|---|---|
| **Volume** | A durable filesystem your app reads and writes as ordinary paths. |
| **Store** | An object store, addressed by key, with a browser in the SPA. |

Which ones exist, and what they are backed by, is your administrator's decision.

## Two things that both have to be true

- **A mapping** attaches a resource to your app, at a level. That is an
  administrator's action.
- **A grant** gives a *person* access to a folder. That is about people.

**Neither implies the other.** Your app having a mapping does not let you browse
the files, and you being granted a folder does not let your app read it.

That surprises people once. It is the same distinction as "the service account
can read the bucket" versus "I can read the bucket".

## Reading it from your app

```python
from launchpad import mounts, store

for m in mounts():
    print(m.name, m.path, m.level)   # a volume, as a filesystem path

store("reports").put("2026-08/summary.csv", data)
```

An app's mounts are given to it at start. Nothing is fetched or configured by
your code.

## Levels are mounts, not permissions

An access level is **which mount your app got**, not a permission it asks for.
An app mounted read-only cannot write, and there is no flag to change that at
runtime. The URL is never more generous than the mount.

On some backings a level cannot be expressed as a mount at all — and it is
**refused at attach rather than approximated**. If a level you expected is not
offered, that is why.

## Folders

A grant narrows only by **folder**, and a folder is what gets mounted.

There is no administrator bypass: a folder nobody granted you is not a row you
can see, and being an administrator does not change that.

## Naming

A resource's **slug is its identity** and cannot be renamed — only its label can.
A path is a name plus a trailing slash, and goes through the same validation
everywhere, so `../` gets you nothing.

## Two things that surprise people

**A browser upload needs CORS on the bucket.** Without it the upload fails in the
browser, and Launchpad never sees it — so it is not reported as a failed upload.
That one is worth knowing before you spend an afternoon on it.

**Deleting an app does not delete the data.** It detaches storage; the objects
survive.

## In shared mode

If your install runs apps as processes and has no storage roots configured,
storage is **refused rather than faked**. The operator mounts the filesystem;
Launchpad mounts nothing itself.
