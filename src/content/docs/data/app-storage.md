---
title: App storage
description: Files, folders and the grants that decide what your app can reach.
---

App storage is for files: uploads, reports, exports, anything that is a blob
rather than a row.

:::note
This is an optional capability. If your administrator has not configured
storage, there is no storage tab on your app — not a disabled one. Ask them
before designing around it.
:::

## How it fits together

Two different things have to be true before your app can read a file:

- **A mapping** attaches a storage resource to your app. That is an
  administrator's action.
- **A grant** gives a *person* access to a folder. That is about people, not
  apps.

Neither implies the other. Your app having a mapping does not mean you can
browse the files, and you being granted a folder does not mean your app can
read it.

## Folders and levels

A grant narrows by **folder**, and a folder is what gets mounted. An access
level is which mount your app gets, not a permission it asks for — so an app
mounted read-only cannot write, and there is no flag to change that at runtime.

There is no administrator bypass. An administrator who has not granted
themselves a folder cannot see inside it either.

## In shared mode

If your install runs apps in shared mode without storage configured, storage is
refused rather than faked. The operator mounts the filesystem; Launchpad does
not mount anything itself.

## Uploads from a browser

A browser uploading straight to the store needs CORS configured on the bucket.
If it is missing, the upload fails in the browser — and Launchpad will not
report that as a failed upload, because it never saw it. That one is worth
knowing before you spend an afternoon on it.

## Renaming

A resource's **slug is its identity** and cannot be renamed — only its label
can. A path is a name plus a trailing slash, and goes through the same
validation everywhere.
