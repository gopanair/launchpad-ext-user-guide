---
title: Static sites
description: Serving a folder of HTML, and using it to host a built front end.
---

A repository that is HTML, CSS, images and JavaScript deploys with no
configuration. Nothing is installed and nothing is compiled — the folder *is*
the site.

## Two ways to get one

**A plain folder of files.** Commit it and deploy. Detection picks it up as long
as the tree has none of `package.json`, `requirements.txt`, `pyproject.toml`,
`Pipfile` or `go.mod`.

**A built front end.** Vite, Astro, Create React App, Hugo — anything that
compiles to a folder. Commit the build output and declare where it is:

```toml
# launchpad.toml
[static]
root = "dist"
```

That declaration **overrides the disqualifiers**, so a repository with a
`package.json` is served as static rather than refused. It is opt-in on
purpose: without it, a Vite repository would deploy successfully and serve a
blank page forever.

:::caution
Launchpad does not run your build. It never runs `npm install` or `npm run
build` for a static app. `dist/` has to be committed, and it has to not be in
your `.gitignore`.
:::

## The keys

```toml
[static]
root     = "dist"          # document root, relative to the repo
entry    = "report.html"   # what /apps/your-slug/ serves
fallback = true            # for client-side routing
```

- **`entry`** defaults to `index.html`, else the only `.html` file in the root.
  Several candidates and no declaration fails the deploy, naming them.
- **`fallback`** serves the entry document for any unmatched path that has no
  file extension and accepts HTML. Single-page apps need it. Nothing else does
  — on by default, it would turn every missing image into an HTML page.
- A **`404.html`** in the root is used for unmatched paths.

## Things to know

- **Relative URLs work; root-absolute ones do not.** `href="styles.css"` and
  `./img/x.png` resolve. `href="/styles.css"` asks the platform and gets a 404.
  The build log names the first few offenders.
- If your generator has a base-path setting, set it to `/apps/your-slug`.
- **Never served, at any depth:** anything starting with a dot, `launchpad.toml`
  and `ecosystem.config.json`. They return 404, not 403.
- **Directory listings are off.** A subdirectory with an `index.html` is served
  at its own path.
- **Jobs are refused** on a static app — there is no runtime for a command to
  mean anything in. Scheduled tasks are fine.
- Dependencies report *no dependencies* rather than zero findings.
