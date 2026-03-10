---
id: 33d28828-0060-41cf-aad6-ae19df201c6c
blueprint: experiment
title: 'Local evaluation'
landing: false
sourxe: 'https://www.docs.developers.amplitude.com/experiment/general/evaluation/local-evaluation/'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1716333767
---
Local evaluation runs [evaluation logic](/docs/feature-experiment/implementation) in the SDK, saving you the overhead of making a network request for each user evaluation. The [sub-millisecond evaluation](/docs/feature-experiment/under-the-hood/performance-and-caching) is engineered for latency-minded systems that need to be performant at scale.

## Targeting capabilities

Local evaluation runs outside of Amplitude, which means it doesn't support the advanced targeting and identity resolution powered by Amplitude Analytics. However, local evaluation supports consistent bucketing with target segments, which is often enough.

For a comparison of targeting capabilities, go to [Remote evaluation](/docs/feature-experiment/remote-evaluation#targeting-capabilities).

{{partial:admonition type="warning" heading="Client-side local evaluation"}}
When you use client-side local evaluation, all data used in targeting is included in the flag configuration loaded on the client side. For example, if you target a specific user by their email, that email is visible to all clients, regardless of user.
{{/partial:admonition}}

### Cohort targeting

Server-side SDKs can target cohorts if configured to do so. Only user IDs are targetable by local evaluation cohorts.

| SDK | Cohort targeting | Version |
| --- | :---: | --- |
| [Node.js](/docs/sdks/experiment-sdks/experiment-node-js) |  ✅ | `1.10.0+`  |
| [Ruby](/docs/sdks/experiment-sdks/experiment-ruby) |  ✅ | `1.5.0+` |
| [JVM](/docs/sdks/experiment-sdks/experiment-jvm) |  ✅ | `1.4.0+` |
| [Go](/docs/sdks/experiment-sdks/experiment-go) |  ✅ | `1.6.0+` |
| [Python](/docs/sdks/experiment-sdks/experiment-python) |  ✅ | `1.4.0+` |
| [PHP](/docs/sdks/experiment-sdks/experiment-php) | ❌  | N/A |

## Implementation

Local evaluation is [evaluation](/docs/feature-experiment/implementation). It's a function that takes a [user](/docs/feature-experiment/data-model#users) and a [flag](/docs/feature-experiment/data-model#flags-and-experiments) as input and outputs a [variant](/docs/feature-experiment/data-model#variants).

![Local evaluation flow from the SDK loading flag configurations to per-user variant evaluation](statamic://asset::help_center_conversions::experiment/local-evaluation.drawio.svg)

The SDK loads flag configuration updates from the server on startup and stores them in memory for access before each evaluation. After startup, the SDK begins polling for flag configuration updates from the server.

{{partial:admonition type="tip" heading="Edge evaluation"}}
The local evaluation Node.js SDK can run in edge worker/functions which support JavaScript and a distributed store. Contact your representative or email [experiment@amplitude.com](mailto:experiment@amplitude.com) to learn more.
{{/partial:admonition}}

### Exposure and assignment tracking

Local evaluation tracks assignment differently than [remote evaluation](/docs/feature-experiment/remote-evaluation), which automatically tracks exposure events. With local evaluation:

- **Client-side SDKs** automatically track an [exposure event](/docs/feature-experiment/under-the-hood/event-tracking#exposure-events) when a variant is accessed from a client-side [Experiment SDK](/docs/sdks/experiment-sdks).
- **Server-side SDKs** track an [assignment event](/docs/feature-experiment/under-the-hood/event-tracking#automatic-assignment-tracking) when a user is evaluated, if the SDK is configured to do so. Exposure tracking isn't automatic and must be tracked separately, if needed.

For server-side local evaluation experiments, use the assignment event as the exposure event in your experiment analysis.

### Performance

The following results are for a single flag evaluation, collected over 10 executions of 10,000 iterations with randomized user inputs evaluated for one flag configuration, selected at random from three possible flag configurations.

| SDK | Average | Median | Cold start |
| --- | --- | --- | --- |
| [Node.js](/docs/sdks/experiment-sdks/experiment-node-js) | 0.025ms | 0.018ms | 3ms |
| [Go](/docs/sdks/experiment-sdks/experiment-go) | 0.098ms | 0.071ms | 0.7ms |
| [JVM](/docs/sdks/experiment-sdks/experiment-jvm) | 0.007ms | 0.005ms | 6ms |
