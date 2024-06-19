---
id: 1c4b9202-0063-4acf-9b99-66b73435630b
blueprint: data
title: 'Amplitude Wordpress Plugin'
landing: false
source: /guides/wordpress-plugin-guide/
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718826570
---
The [Amplitude Wordpress Plugin](https://wordpress.org/plugins/amplitude/) enables you to instrument your Wordpress site with an advanced version of Autocapture.

{{partial:admonition type="beta" heading="This feature is in open beta"}}
This feature is in open beta and under active development.
{{/partial:admonition}}

Amplitude's Wordpress plugin installs a version of the [Browser SDK](/data/sdks/typescript-browser/), and adds the script before the `</head>` tag on each of your site's pages. This enables an [advanced](https://github.com/amplitude/Amplitude-TypeScript/tree/v1.x/packages/plugin-default-event-tracking-advanced-browser) version of Autocapture that tracks the following events and associated properties:

- Page viewed
- Form started
- Form submitted
- File downloaded
- Start session
- End session
- Element clicked (new in advanced DET)
- Element changed (new in advanced DET)

If you enable Session Replay in the plugin's settings, the plugin also initializes and adds the [Session Replay Browser SDK Plugin](/docs/session-replay/session-replay-plugin).

## Install the plugin

Follow these instructions to install the Amplitude Wordpress plugin.

1. Log in to Wordpress and open your site's dashboard.
2. Click **Plugins** from the sidebar.
3. Click **Add New Plugin**.
4. Search for `Amplitude`.
5. Click **Install Now** on the Amplitude plugin.
6. When installation is complete, click **Activate Plugin**.

## Configure the plugin

With the Amplitude Wordpress plugin settings page open:

1. Enter your Amplitude Project's [API key](/docs/apis/authentication).
2. (Optional) Enable Session Replay and set the [Sample Rate](/docs/session-replay/session-replay-plugin#sampling-rate) with the slider.
3. Click **Save**.

After you enable the plugin, confirm in Amplitude that your project receives data from the plugin.

## Session Replay

If you enable Session Replay in the plugin, you may not see replays appear in Amplitude. This can happen for a few reasons:

- Users must complete their interaction with the site, which happens when they close the browser or leave the site. Wait at least five minutes after a session ends to attempt to view the replay in Amplitude. You may need to refresh the Amplitude page you're on.
- The sample rate you select determines the percentage of sessions that Session Replay captures. If you set the sample rate below `1`, Amplitude may not capture the specific session in question.
- You don't have Session Replay enabled on your account.

## Autocapture

The Wordpress plugin installs a version of the Browser SDK that enables a version of Autocapture that tracks to extra events:

- `[Amplitude] Element Clicked`
- `[Amplitude] Element Changed`

These are high-volume events with a high degree of cardinality with the property values. However, Amplitude limits the "noise" to these two events and a specific set of properties, limiting the impact on your taxonomy.

This approach differs from auto track or auto capture because it targets two specific interactions, and targets a small set of elements to limit the impact of any noise in your data.

### Impact on event volume

Autocapture impacts event volume because it adds new tracking, resulting in more captured events. The amount of this increase depends on your organization. If you start with few precisely tracked events, Amplitude expects that you would see a large increase in event volume. If your organization has an extensive tracking plan, with many precisely tracked events, the impact is lower.

For help or support with this plugin, contact [plugins@amplitude.com](mailto:plugins@amplitude.com).