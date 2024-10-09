---
id: 33d28828-0060-41cf-aad6-ae19df201c6c
blueprint: experiment
title: 'Local evaluation'
landing: false
sourxe: 'https://www.docs.developers.amplitude.com/experiment/general/evaluation/local-evaluation/'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1728408112
experiment_type:
  - feature
---
Local evaluation runs [evaluation logic](/docs/experiment/implementation) in the SDK, saving you the overhead incurred by making a network request per user evaluation. The [sub-millisecond evaluation](/docs/experiment/under-the-hood/performance-and-caching) is perfect for latency-minded systems which need to be performant at scale.

## Targeting capabilities

Local evaluation happens outside of Amplitude, which means advanced targeting and identity resolution powered by Amplitude Analytics isn't supported. That said, local evaluation allows you to perform consistent bucketing with target segments, which is often enough.

{{partial:admonition type="warning" heading="Client-side local evaluation"}}
When using client-side local evaluation it is important to note that all data used in targeting is included in the flag configuration loaded on the client-side. For example, if you are targeting a specific user by their email, that email has effectively been leaked to all clients, regardless of user.
{{/partial:admonition}}

| <div class='big-column'>Feature</div> | Remote Evaluation | Local Evaluation |
| --- | --- | --- |
| [Consistent bucketing](/docs/experiment/implementation#consistent-bucketing) | ✅ | ✅ |
| [Individual inclusions](/docs/experiment/implementation#individual-inclusions) | ✅ | ✅ |
| [Targeting segments](/docs/experiment/implementation#targeting-segments) | ✅ | ✅ |
| [Amplitude ID resolution](/docs/experiment/remote-evaluation#amplitude-id-resolution) | ✅ | ❌ |
| [User enrichment](/docs/experiment/remote-evaluation#user-enrichment) | ✅ | ❌ |
| [Sticky bucketing](/docs/experiment/implementation#sticky-bucketing) | ✅ | ❌ |

### Cohort targeting

Server-side SDKs can target cohorts if configured to do so. **Only User IDs can be targeted by local evaluation cohorts.**

| SDK | Cohort Targeting | Version |
| --- | :---: | --- |
| [Node.js](/docs/sdks/experiment-sdks/experiment-node-js) |  ✅ | `1.10.0+`  |
| [Ruby](/docs/sdks/experiment-sdks/experiment-ruby) |  ✅ | `1.5.0+` |
| [JVM](/docs/sdks/experiment-sdks/experiment-jvm) |  ✅ | `1.4.0+` |
| [Go](/docs/sdks/experiment-sdks/experiment-go) |  ✅ | `1.6.0+` |
| [Python](/docs/sdks/experiment-sdks/experiment-python) |  ✅ | `1.4.0+` |
| [PHP](/docs/sdks/experiment-sdks/experiment-php) | ❌  | N/A |

## Implementation

Local evaluation is just [evaluation](/docs/experiment/implementation)--a function which takes a [user](/docs/experiment/data-model#users) and a [flag](/docs/experiment/data-model#flags-and-experiments) as input, and outputs a [variant](/docs/experiment/data-model#variants).

![](statamic://asset::help_center_conversions::experiment/local-evaluation.drawio.png)

The SDK loads flag configuration updates from the server on startup and stores them in memory for access prior to each evaluation. After startup, the SDK begins polling for flag configuration updates from the server.

{{partial:admonition type="tip" heading="Edge evaluation"}}
The local evaluation Node.js SDK can be run in edge worker/functions which support JavaScript and a distributed store. Contact your representative or email [experiment@amplitude.com](mailto:experiment@amplitude.com) to learn more.
{{/partial:admonition}}

### Exposure and assignment tracking

Local evaluation SDKs track evaluations differently on the client-side vs on the server-side.

- Client-side SDKs track an [**exposure event**](/docs/experiment/under-the-hood/event-tracking#exposure-events) when the user is evaluated due to a variant being accessed from the SDK.
- Server-side SDKs track an **assignment event** (if configured to do so) when a user is evaluated.

Server-side local evaluation experiments often set the Assignment event as a heuristic for Exposure.

### Performance

The following results are for **a single flag evaluation**, and were collected over 10 executions of 10,000 iterations of evaluation with randomized user inputs evaluated for 1 flag configuration, selected at random out of 3 possible flag configurations.

| SDK | Average | Median | Cold Start |
| --- | --- | --- | --- |
| [Node.js](/docs/sdks/experiment-sdks/experiment-node-js) | 0.025ms | 0.018ms | 3ms |
| [Go](/docs/sdks/experiment-sdks/experiment-go) | 0.098ms | 0.071ms | 0.7ms |
| [JVM](/docs/sdks/experiment-sdks/experiment-jvm) | 0.007ms | 0.005ms | 6ms |