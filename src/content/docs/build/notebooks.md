---
title: Notebooks
description: Publishing a Jupyter or Quarto notebook as a page anyone can read.
---

A repository holding one `.ipynb` or `.qmd` at its root is a notebook app.

## It is executed once, at build time

This is the thing to understand. Your notebook runs **during the deploy**, with
your app's own environment variables, and what gets served is the document that
fell out. Visitors do not execute anything. Nobody gets a kernel.

That means:

- The numbers on the page are the numbers from deploy time. To refresh them,
  deploy again — or put a [scheduled task](../../automation/scheduled-tasks/) on
  it.
- A notebook that takes ten minutes to run makes a ten-minute deploy.
- A notebook that fails fails the *deploy*, with the error in the build log.

## Your environment variables are in the output

Your notebook runs with your app's environment, and whatever it prints goes into
a published document. If you print a connection string, the connection string is
on the page. The build tells you which variable names were available so this is
not a surprise.

## The renderer is provided

You do not add `jupyter`, `nbconvert` or `quarto` to `requirements.txt`.
Launchpad installs the renderer. Add the libraries your notebook *imports*.

## Quarto

A `.qmd` is Python or R depending on its **engine**, decided at detection time
in this order:

1. `[notebook] engine = "knitr"` in `launchpad.toml`
2. `engine:` or `knitr:` in the document's YAML header
3. A fenced ```` ```{r} ```` chunk
4. Otherwise, Python

## Interactive notebooks are a different thing

If you want a viewer to change an input and see the result, you do not want a
notebook — you want a server. Use [marimo, Streamlit or Shiny](../frameworks/).
