---
id: 33d28828-0060-41cf-aad6-ae19df201c6c
blueprint: experiment
title: 'Local vs. remote evaluation'
landing: false
exclude_from_sitemap: false
updated_by: 3f7c2386-b7da-4443-a04f-7c225af40254
updated_at: 1740528000
---
When your application calls `variant()`, Experiment needs to determine which variant to return. It does this through evaluation — the process of running targeting rules against a user. You choose where that evaluation runs: locally in your SDK, or remotely on Amplitude's servers.

| | Remote evaluation | Local evaluation |
| --- | --- | --- |
| Where it runs | Amplitude's servers | Your SDK (in-process) |
| Latency | Network round-trip on `fetch()`, then instant from cache | Sub-millisecond (~0.025ms on Node.js) |
| Network call per user | Yes (`fetch()` per session or identity change) | No (flag configs cached in memory) |
| Amplitude ID resolution | ✅ | ❌ |
| User property enrichment from Analytics | ✅ | ❌ |
| [Cohort targeting](/docs/feature-experiment/cohort-targeting) | ✅ | ✅ (server-side SDKs only) |
| [Sticky bucketing](/docs/feature-experiment/implementation#sticky-bucketing) | ✅ | ❌ |
| IP geolocation | ✅ | ❌ |
| Client-side support | ✅ | ✅ (see warning below) |
| Server-side support | ✅ | ✅ |

## Remote evaluation

Remote evaluation is the default for client-side SDKs (browser, iOS, Android, React Native, Flutter). When you call `fetch()`, the SDK sends the user object to Amplitude's evaluation servers, which enrich the user with Analytics data and return the evaluated variants.

**How it works:**

1. Your app calls `fetch()` once on startup (or when the user's identity changes).
2. The SDK sends the user's ID and properties to Amplitude's servers.
3. Amplitude enriches the user with Analytics user properties, cohort membership, and geolocation.
4. The server evaluates all flags for the user and returns the variants.
5. The SDK caches the variants locally. Subsequent `variant()` calls return instantly from cache.

```typescript
// Client-side: fetch once, then read from cache
const experiment = Experiment.initializeWithAmplitudeAnalytics('DEPLOYMENT_KEY');
await experiment.fetch();                         // Network call: ~100–300ms

const variant = experiment.variant('flag-key');   // Instant: reads from local cache
```

Remote evaluation is best for:

- Browser and mobile applications where you need Amplitude user property targeting.
- Apps where you want to target behavioral cohorts from Analytics.
- Use cases where geolocation targeting matters.
- Situations where rich user data from Amplitude Analytics should drive flag targeting.

For detailed remote evaluation behavior — including Amplitude ID resolution, user enrichment, and cohort sync timing — see [Remote evaluation](/docs/feature-experiment/remote-evaluation).

## Local evaluation

Local evaluation runs the evaluation logic inside your SDK process. On startup, the SDK downloads all flag configurations and stores them in memory. Every `variant()` call evaluates the user locally — no network request required per user.

**How it works:**

1. On startup, the SDK downloads all flag configurations from Amplitude.
2. Every minute, the SDK polls for configuration updates in the background.
3. On each `variant()` call, the SDK evaluates the user locally against the cached configs.
4. No network call per user — evaluation time is under 1ms.

```typescript
// Server-side: initialize once, evaluate per request
import { Experiment } from '@amplitude/experiment-node-js';

const experiment = Experiment.initialize('DEPLOYMENT_KEY');
await experiment.start();                              // Downloads flag configs

// Per request — no network call
const user = { user_id: request.user.id };
const variant = experiment.localEvaluation.variant('flag-key', user); // ~0.025ms
```

**Performance benchmarks** (single flag evaluation, 10,000 iterations with randomized inputs):

| SDK | Average | Median | Cold start |
| --- | --- | --- | --- |
| [Node.js](/docs/sdks/experiment-sdks/experiment-node-js) | 0.025ms | 0.018ms | 3ms |
| [Go](/docs/sdks/experiment-sdks/experiment-go) | 0.098ms | 0.071ms | 0.7ms |
| [JVM](/docs/sdks/experiment-sdks/experiment-jvm) | 0.007ms | 0.005ms | 6ms |

Local evaluation is best for:

- High-throughput server applications where every millisecond counts.
- APIs that evaluate flags on every request.
- Edge and CDN environments (the Node.js SDK supports edge workers).
- Applications where you manage user properties explicitly rather than relying on Analytics enrichment.

### Cohort targeting with local evaluation

Server-side SDKs support cohort targeting in local evaluation mode. Only `user_id` can be targeted by local evaluation cohorts.

| SDK | Cohort targeting | Minimum version |
| --- | :---: | --- |
| [Node.js](/docs/sdks/experiment-sdks/experiment-node-js) | ✅ | `1.10.0+` |
| [Ruby](/docs/sdks/experiment-sdks/experiment-ruby) | ✅ | `1.5.0+` |
| [JVM](/docs/sdks/experiment-sdks/experiment-jvm) | ✅ | `1.4.0+` |
| [Go](/docs/sdks/experiment-sdks/experiment-go) | ✅ | `1.6.0+` |
| [Python](/docs/sdks/experiment-sdks/experiment-python) | ✅ | `1.4.0+` |
| [PHP](/docs/sdks/experiment-sdks/experiment-php) | ❌ | N/A |

### Client-side local evaluation

{{partial:admonition type='warning' heading="Data visibility risk"}}
When you use local evaluation on the client side, all flag configurations — including targeting rules — download to the client. If you target specific users by email or other identifiers, those values are visible in the client's memory and network responses. Use server-side local evaluation if your targeting rules contain sensitive data.
{{/partial:admonition}}

### Exposure tracking in local evaluation

Local evaluation tracks assignment differently than remote evaluation.

- **Client-side SDKs** automatically track an [exposure event](/docs/feature-experiment/track-exposure) when you access a variant.
- **Server-side SDKs** track an [assignment event](/docs/feature-experiment/track-exposure) when a user is evaluated, if you configure the SDK to do so. Exposure tracking isn't automatic and you need to track it separately if needed.

For server-side local evaluation experiments, use the assignment event as the exposure event in your experiment analysis.

{{partial:admonition type='tip' heading="Edge evaluation"}}
The local evaluation Node.js SDK supports edge workers and functions that use JavaScript and a distributed store. Contact your Amplitude representative or email [experiment@amplitude.com](mailto:experiment@amplitude.com) to learn more.
{{/partial:admonition}}

## Which should I use?

| Situation | Recommendation |
| --- | --- |
| Browser or mobile app | Remote evaluation (default) |
| Server-side API with high throughput | Local evaluation |
| Need Amplitude cohort targeting | Remote evaluation |
| Need sub-millisecond latency | Local evaluation |
| Edge worker or CDN function | Local evaluation (Node.js SDK) |
| Need geolocation targeting | Remote evaluation |
| Managing user properties explicitly | Local evaluation |

{{partial:admonition type='tip' heading="You can use both"}}
Nothing stops you from using both evaluation modes in the same application. For example, use remote evaluation on the client side to leverage Amplitude user data, and local evaluation on your server for high-throughput API endpoints.
{{/partial:admonition}}
