---
title: Who can see your app
description: Private, signed-in and public, and why a setting sometimes will not stick.
---

Every app has one of three visibilities.

| Visibility | Who can open it |
|---|---|
| **Private** | You, and anyone you or your group have shared it with. |
| **Authenticated** | Anyone who can sign in to this install. |
| **Public** | Anyone with the URL, signed in or not. |

New apps are private. You change this on the Settings tab.

## Public may not be available

Your administrator can turn off anonymous access for the whole install. When
they have, choosing **public** gives you **authenticated** instead — not
private, and not a silent failure. The app is still as widely shared as this
install allows.

If anonymous access is switched back on later, apps that were public go back to
being public. Nothing is lost by the switch.

## Publishing may need approval

Some installs require an administrator to approve making an app public. You
request it, and it stays as it is until they act. An app that is *already*
public keeps serving throughout — the gate is on the change, not on the state.

## Reachability

If your install is reachable from outside, Launchpad checks that a public app
actually answers from out there before treating it as published. An app that
does not answer stays where it was, and you are told once.

This is a check on *addresses*, not on your code. A failure here is usually
DNS, a firewall, or a proxy — worth showing to your administrator rather than
debugging in your app.

## What your app must still do

Visibility controls who reaches your app. It does not authorize anything
*inside* it. If your app has an admin screen, your app has to protect it — see
[What your app learns about a viewer](../viewer/).
