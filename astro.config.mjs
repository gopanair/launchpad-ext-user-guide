// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

/**
 * The Launchpad user guide.
 *
 * Built to a folder of HTML and committed as `dist/`, because that folder *is*
 * the deliverable: Launchpad never runs `npm install` or `astro build` for an
 * app, and `launchpad.toml`'s `[static] root = "dist"` is what tells the
 * detector to serve this repo rather than refuse it for having a package.json.
 *
 * `base` is not optional. A static app is served under `/apps/{slug}/`, and a
 * root-absolute URL without that prefix asks the *platform* for the file and
 * gets a 404. The slug is reserved (`_` belongs to apps Launchpad installs
 * itself), so it cannot be taken by an ordinary app and this value cannot go
 * stale behind a rename.
 */
export default defineConfig({
  base: "/apps/_user-guide",
  trailingSlash: "always",
  // No `site`: this repo is deployed to every customer's own hostname, so there
  // is no canonical origin to bake in. Anything needing one — a sitemap, an
  // absolute og:url — would be wrong on every install but ours.
  integrations: [
    starlight({
      title: "Launchpad",
      logo: { src: "./src/assets/logo.svg", alt: "Launchpad" },
      tagline: "User guide",
      description:
        "How to deploy, run and share an app on Launchpad.",
      // Light only, like the platform. Starlight ships a theme toggle; the
      // override below is an empty component, which is the documented way to
      // remove one rather than hiding it with CSS a user can defeat.
      components: {
        ThemeSelect: "./src/components/empty.astro",
        SocialIcons: "./src/components/empty.astro",
      },
      customCss: [
        "@fontsource-variable/geist",
        "@fontsource-variable/geist-mono",
        "./src/styles/launchpad.css",
      ],
      pagination: true,
      lastUpdated: false,
      // Pagefind is Starlight's default and it is why this stack was chosen:
      // the index is built into `dist/` as static files, so search works on an
      // install with no route off the network and behind Launchpad's own auth.
      // A hosted index (Algolia) would do neither.
      pagefind: true,
      sidebar: [
        {
          label: "Start here",
          items: [
            { label: "What Launchpad is", slug: "start/what-launchpad-is" },
            { label: "Signing in", slug: "start/signing-in" },
            { label: "Deploy your first app", slug: "start/first-app" },
          ],
        },
        {
          label: "Your apps",
          items: [
            { label: "The app page", slug: "apps/app-page" },
            { label: "Settings and variables", slug: "apps/settings" },
            { label: "Logs", slug: "apps/logs" },
            { label: "Status and sleeping", slug: "apps/status" },
            { label: "When an app is locked", slug: "apps/locked" },
          ],
        },
        {
          label: "Building an app",
          items: [
            { label: "Supported frameworks", slug: "build/frameworks" },
            { label: "Language versions", slug: "build/versions" },
            { label: "Static sites", slug: "build/static" },
            { label: "Notebooks", slug: "build/notebooks" },
            { label: "launchpad.toml", slug: "build/launchpad-toml" },
          ],
        },
        {
          label: "Sharing",
          items: [
            { label: "Who can see your app", slug: "share/visibility" },
            { label: "Groups", slug: "share/groups" },
            { label: "What your app learns about a viewer", slug: "share/viewer" },
          ],
        },
        {
          label: "Automation",
          items: [
            { label: "Scheduled tasks", slug: "automation/scheduled-tasks" },
            { label: "Jobs", slug: "automation/jobs" },
          ],
        },
        {
          label: "Data and storage",
          items: [
            { label: "App data", slug: "data/app-data" },
            { label: "App storage", slug: "data/app-storage" },
          ],
        },
        {
          label: "The command line",
          items: [
            { label: "Installing lp", slug: "cli/installing" },
            { label: "Deploying with lp", slug: "cli/deploying" },
            { label: "API keys", slug: "cli/api-keys" },
          ],
        },
        {
          label: "Reference",
          items: [
            { label: "Troubleshooting", slug: "reference/troubleshooting" },
            { label: "Limits", slug: "reference/limits" },
          ],
        },
      ],
    }),
  ],
});
