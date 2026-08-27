---
title: Supported frameworks
description: What Launchpad detects, how it detects it, and what each one expects from your code.
---

Launchpad works out what your repository is by looking at it. You do not
declare a framework.

## JavaScript and TypeScript

| Framework | Detected by | Started as |
|---|---|---|
| **Next.js** | `next.config.*`, or `next` in `package.json` | `next start` |
| **Node (generic)** | any `package.json` with a `start` script | `npm run start` |

A `build` script runs first if you have one. Your app is told its mount point
in `BASE_PATH`, and the proxy strips the prefix before forwarding — so your
server is mounted at the root, but any URL your HTML hands to the browser has
to carry `BASE_PATH`.

:::caution
A Vite or Create React App repository with no `start` script is **not**
supported as-is. Either add a server and a `start` script, or commit the built
output and declare it a [static site](../static/).
:::

## Python

| Framework | Detected by |
|---|---|
| **Flask** | `flask` in `requirements.txt` |
| **FastAPI** | `fastapi` in `requirements.txt`, served with `uvicorn` |
| **Streamlit** | `streamlit` in `requirements.txt` |
| **marimo** | a root `.py` that imports `marimo` and constructs `marimo.App` |
| **Generic Python** | `requirements.txt` and none of the above |

Generic Python needs one of `app.py`, `main.py`, `streamlit_app.py`,
`server.py` or `wsgi.py` at the root. A project with none of them is refused by
name — there is nothing to start.

marimo is triggered by the *code*, not by `marimo` in `requirements.txt`. A
Flask app that happens to import marimo stays a Flask app.

## Go

Detected by `go.mod` plus a `main` package — at the module root, else the first
`cmd/*` directory. Built with `go build` into a single binary.

Your contract: serve HTTP on the port in `PORT`, bound to `127.0.0.1`, and
honour `BASE_PATH` when you emit absolute URLs.

Server-rendered UIs and embedded SPAs with committed assets work. A front end
that needs an npm build during the deploy does not — commit the built assets.

## R

| Framework | Detected by |
|---|---|
| **Shiny** | `app.R`, or `ui.R` and `server.R` together, or an `.Rmd` with `runtime: shiny` |
| **plumber** | `plumber.R`, or a root `.R` carrying `#* @get` / `#* @post` |
| **R Markdown** | an `.Rmd` at the root — rendered once at build time |
| **Quarto (knitr)** | a `.qmd` whose engine is knitr |

**There is no generic R framework, on purpose.** `Rscript app.R` runs to the end
and exits, and a workload that exits is a crash loop. An R repository matching
none of the four is refused, with the four named.

**Commit `renv.lock`.** Without one, nothing is installed. The deploy succeeds,
says so in the build log, and the app fails at its first `library()` call.

## Documents and folders

| Framework | Detected by |
|---|---|
| **Notebook** | one `.ipynb` or `.qmd` at the root — see [Notebooks](../notebooks/) |
| **Static** | HTML, CSS, images and JavaScript, and nothing else — see [Static sites](../static/) |

Static is detected **last**, and only if the tree has none of `package.json`,
`requirements.txt`, `pyproject.toml`, `Pipfile` or `go.mod`. That list is
deliberate: a Vite repository detected as static would deploy successfully and
serve a blank page forever.

## The rule underneath all of them

Your app is served at `/apps/your-slug`. Three things follow:

- **Links and form actions must carry the prefix.** Use `BASE_PATH`, or use
  relative URLs.
- **Redirects must not.** The proxy re-adds the prefix to a `Location` header.
  Redirect to `/dashboard`, not `/apps/your-slug/dashboard`.
- **Bind to the port in `PORT`.** Never a port of your own choosing.
