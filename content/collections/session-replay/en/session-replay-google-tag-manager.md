---
id: d225a8c4-c504-4cbe-b4f3-8709ab43fdc1
blueprint: session-replay
title: 'Implement Session Replay with Google Tag Manager'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1730489526
source: 'https://www.docs.developers.amplitude.com/session-replay/tag-managers/google-tag-manager/'
instrumentation_guide: true
platform: browser
parent: 467a0fe0-6ad9-4375-96a2-eea5b04a7bcf
public: true
description: 'Choose this option if you use Google Tag Manager to instrument Amplitude on your site.'
---
Instrumenting Amplitude Session Replay with Google Tag Manager requires a different procedure than with the standard [Browser SDK Plugin](/docs/session-replay/session-replay-plugin). 

{{partial:admonition type="note"}}
This article pertains to **client-sided** GTM instrumentations **only**. It doesn't address server-sided GTM instrumentation.
{{/partial:admonition}}

To instrument Session Replay with Google Tag Manager:

1. Add the [Google Tag Manager Web Template for Amplitude Analytics Browser SDK](/docs/data/source-catalog/google-tag-manager) if it's not yet enabled.
2. In Google Tag Manager, in the *Initialization* section, select **Enable Session Replay Plugin**.
3. In Amplitude, navigate to *Organization Settings > Session Replay Settings*. Update any masking, sampling, or other settings.

## Troubleshooting

Multiple instantiation of the Amplitude SDKs. This is a common problem seen with GTM and other code injection frameworks. Ensure that the initialization logic is only run once on your app. This could happen if:

- There is more than 1 “Init Tag” or another custom tag that’s running Amplitude. 
- You have another Code Injection Framework (for example, SquareSpace or Bubble) that also runs Amplitude. 

This template uses the Amplitude Browser SDK Plugin. For help troubleshooting, see [Troubleshooting | Session Replay Plugin](/docs/session-replay/session-replay-plugin#troubleshooting)