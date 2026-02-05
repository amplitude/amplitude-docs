---
id: 29b8b9d1-1063-4b23-926b-69b8333531ed
blueprint: get-started
title: 'Amplitude Quickstart'
landing: true
landing_blurb: 'Follow this guide to get data from your site into Amplitude in just a few minutes.'
exclude_from_sitemap: false
updated_by: ac74a6d2-0226-45a6-aaa4-c33675b8ca76
updated_at: 1765489396
academy_course:
  - caa26d9a-e585-492c-afa1-f6571125252f
  - 7c3d4e5f-6a7b-4c5d-0e1f-3a4b5c6d7e8f
---
{{partial:admonition type="tip" heading="To learn more, take an Amplitude Academy course!"}}
[Getting Started with Amplitude Analytics](https://academy.amplitude.com/path/getting-started-with-amplitude-analytics-learning-path) · [Build your first analysis](https://academy.amplitude.com/build-your-first-analysis)
{{/partial:admonition}}

Get started with the full Amplitude platform in minutes. Which features drive retention? Where do users drop off? What's working and what's not? Traditional analytics implementations can take weeks or months. Amplitude's modern approach gets you from zero to insights in minutes, not months.

Use this kit to get Autocapture, Session Replay, Web Experiment, and Guides & Surveys.

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

### Use Autocapture

With `autocapture: true`, Amplitude automatically tracks:
- **Sessions** – How users engage over time.
- **Page views** – Which pages matter most.
- **Clicks & interactions** – What users engage with.
- **Form interactions** – Where users get stuck.
- **File downloads** – Content engagement.
- **Marketing attribution** – Where users come from.

## Take the next step

After your data starts flowing into Amplitude, expand  your implementation with Session Replay, Web Experiment, and Guides & Surveys.

### Add Session Replay

The snippet above includes [Session Replay](/docs/session-replay/session-replay-plugin) at 100% sampling (`sampleRate: 1`). This lets you watch exactly what users experience and helps you debug issues and understand user behavior. Lower the sample rate in production to control volume and cost.

### Launch a Web Experiment

Web Experiment lets you run A/B tests on your website using the same data you already send through the Unified Browser SDK. Target users, roll out changes gradually, and compare variants based on real product metrics like activation or retention in Amplitude. Web Experiment handles experiment assignment, exposure, and basic statistical analysis so you don't need to build that logic yourself.

Test different versions or features of your site using Amplitude's no-code [Visual Editor](/docs/web-experiment/set-up-a-web-experiment#the-visual-editor).

### Create a guide or survey

[Guides & Surveys](/docs/guides-and-surveys) let you deliver in-product messages and collect feedback on your website using the same Unified Browser SDK instrumentation you already set up. You can target users based on their behavior or properties, show walkthroughs or prompts, and trigger surveys at key moments in the journey. Amplitude captures responses and interactions, so you can see how they relate to core metrics like activation, conversion, or retention. This is a natural next step after events are flowing and you want to both influence and understand user behavior directly in the product.

## Benefits of this approach

- **Time to insight**: Think minutes, not months. Start analyzing user behavior the same day.
- **No engineering bottleneck**: Non-technical team members can define events using Visual Labeling.
- **Flexible foundation**: Add custom precision tracking later as needs emerge.
- **Complete picture**: Autocapture + Session Replay shows what users do and why.
- **Cost-effective**: Only pay for what you use; scale as you grow.