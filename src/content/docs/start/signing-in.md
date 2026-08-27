---
title: Signing in
description: How you get an account on a Launchpad install, and what to do when you cannot.
---

How you sign in is your administrator's decision, not a setting you control.
An install can offer any of these, and usually offers one:

- **Your organization's single sign-on** (OIDC) — the button says whatever your
  administrator named it.
- **GitHub**.
- **A username and password** held by Launchpad itself.

If the sign-in page offers a button you do not recognize, that is the one your
organization uses. Ask internally rather than trying to create an account —
there is no self-service sign-up.

## You do not get an account by deploying

Someone has to give you one, or your sign-in provider has to be configured to
let your directory account through. Deploying an app is something you do
*after* you can sign in, never before.

## Sessions

A session has two clocks: how long you can be idle before it ends, and how long
it can live in total no matter how active you are. Your administrator sets
both, so "I was signed out overnight" and "I was signed out mid-afternoon" are
both normal and both configurable — by them, not by you.

Signing in again is the whole fix. If it happens constantly, that is worth
raising with your administrator.

## When you cannot get in

Launchpad has no "forgot password" email unless your administrator turned mail
on and you sign in with a Launchpad password rather than SSO. Everything else —
a disabled account, an expired directory account, a provider that was switched
off — is theirs to fix.
