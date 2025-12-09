---
id: 29b8b9d1-1063-4b23-926b-69b8333531ed
blueprint: get-started
title: 'Amplitude Quickstart'
landing: true
landing_blurb: 'Follow this guide to get data from your site into Amplitude in ~10 minutes.'
exclude_from_sitemap: false
updated_by: ac74a6d2-0226-45a6-aaa4-c33675b8ca76
updated_at: 1763678212
---
As an early-stage startup, you need answers fast. Which features drive retention? Where do users drop off? What's working and what's not? Traditional analytics implementations can take weeks or months. Amplitude's modern approach gets you from zero to insights in minutes, not months.

## Speed run your installation: Browser SDK and Autocapture

Quickly get data flowing into Amplitude with Browser SDK and [Autocapture](/docs/data/autocapture).

### Install Amplitude

Need an API key? Create a [free Amplitude account](https://app.amplitude.com/signup) to get started.

When you create your Amplitude account, Amplitude provides two ways to install:

- A prompt which you can pass to your agentic AI tool of choice.
- A pre-configured snippet, which you can add inside the `<head>` tag of every page you want to track.

{{partial:admonition type="tip" heading="Get your data flowing!"}}
{{partial:partials/quickstart}}
{{/partial:admonition}}

### Use autocapture

With `autocapture: true`, Amplitude automatically tracks:
- **Sessions** – How users engage over time
- **Page views** – Which pages matter most
- **Clicks & interactions** – What users engage with
- **Form interactions** – Where users get stuck
- **File downloads** – Content engagement
- **Marketing attribution** – Where users come from


### Add Session Replay

The snippet above includes [Session Replay](/docs/session-replay/session-replay-plugin) at 100% sampling (`sampleRate: 1`). This lets you watch exactly what users experience and helps you debug issues and understand user behavior. Lower the sample rate in production to control volume and cost.

## Benefits of this approach

- **Time to insight**: Think minutes, not months. Start analyzing user behavior the same day.
- **No engineering bottleneck**: Non-technical team members can define events using Visual Labeling.
- **Flexible foundation**: Add custom precision tracking later as needs emerge.
- **Complete picture**: Autocapture + Session Replay shows what users do and why.
- **Cost-effective**: Only pay for what you use; scale as you grow.
