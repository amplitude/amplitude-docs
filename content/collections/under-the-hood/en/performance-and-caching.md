---
id: 3250ee8b-a6dd-46d0-b46a-1ed5c9f7a4f9
blueprint: under-the-hood
title: 'Performance and caching'
landing: false
source: 'https://www.docs.developers.amplitude.com/experiment/general/performance-and-caching/'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1716917482
---
Amplitude Experiment [evaluation](/docs/feature-experiment/implementation) supports two modes, [local](/docs/feature-experiment/local-evaluation) and [remote](/docs/feature-experiment/remote-evaluation), each with different performance metrics and tradeoffs.

## Performance

Evaluation performance depends on the type of evaluation you use, and from where the request originates.

Amplitude hosts data centers in the US and EU, in `us-west-2` and `eu-central-1` respectively. Requests geographically distant from the data center hosting your organization's Amplitude data have higher latency than requests made closer to the origin.

### Remote evaluation

[Remote evaluation](/docs/feature-experiment/remote-evaluation) uses [Fastly](https://fastly.com) to [cache](#cdn-caching) evaluation results for a user. Cache hits serve variants from the edge, greatly improving performance.

The following results are synthetic remote evaluation test requests to Amplitude's US data center collected over the last 6 months. Latency includes DNS resolution, TLS connection as well as the remote evaluation request response round trip.

{{partial:tabs tabs="Global, North America, South America, Europe, Asia"}}
{{partial:tab name="Global"}}
| Cache | Average |
| --- | --- |
| HIT | 35.9ms |
| MISS | 194.21ms |

{{/partial:tab}}
{{partial:tab name="North America"}}
| Cache | Average |
| --- | --- |
| HIT | 48.21ms |
| MISS | 100.56ms |

{{/partial:tab}}
{{partial:tab name="South America"}}
| Cache | Average |
| --- | --- |
| HIT | 18.18ms |
| MISS | 262.62ms |

{{/partial:tab}}
{{partial:tab name="Europe"}}
| Cache | Average |
| --- | --- |
| HIT | 31.96ms |
| MISS | 214.3ms |

{{/partial:tab}}
{{partial:tab name="Asia"}}
| Cache | Average |
| --- | --- |
| HIT | 28.84ms |
| MISS | 239.09ms |

{{/partial:tab}}
{{/partial:tabs}}

### Local evaluation

[Local evaluation](/docs/feature-experiment/local-evaluation) pre-fetches flag configurations which are then used to evaluate all users, saving a network request and speeding up evaluation compared to remote evaluation.

The following results are for **a single flag evaluation**, collected over 10 executions of 10,000 iterations of evaluation with randomized user inputs evaluated for 1 flag configuration, selected at random out of 3 possible flag configurations.

| SDK | Average | Median | Cold Start |
| --- | --- | --- | --- |
| [Node.js](/docs/sdks/experiment-sdks/experiment-node-js) | 0.025ms | 0.018ms | 3ms |
| [Go](/docs/sdks/experiment-sdks/experiment-go) | 0.098ms | 0.071ms | 0.7ms |
| [JVM](/docs/sdks/experiment-sdks/experiment-jvm) | 0.007ms | 0.005ms | 6ms |

## CDN caching

{{partial:admonition type="note" heading="Content delivery network"}}
- A CDN (Content Delivery Network) refers to a geographically distributed group of servers that work together to provide fast delivery of Internet content.
- The CDN caches variant responses for [remote evaluation](/docs/feature-experiment/remote-evaluation) and flag configurations for [local evaluation](/docs/feature-experiment/local-evaluation).
{{/partial:admonition}}

After Experiment computes and retrieves a response for a request, it caches that request for reuse to make future requests faster. Experiment uses a CDN to cache the experiments and feature flags for a user for low latency access on subsequent requests.

### Cache time-to-live (TTL)

Experiment caches request to the server on the CDM for 60 minutes. It's a TTL (time-to-live) cache and expires after 60 minutes independent of when the key is accessed or not in the 60 minutes. In other words, the 60 minutes cache time starts from the first-page load.

### Cache key

The CDN caches the exact request received, including user information. In short, any change in user info always misses the CDN cache (unless that exact same request was cached before).

### Cache invalidation

To make sure you don't get stale results when your underlying flags have changed, Experiment invalidates (deletes) cached results for an entire deployment whenever a flag or experiment associated with that deployment is updated. In other words, as the SDKs retrieve results for all experiments and feature flags for a given deployment for a user, Experiment invalidates all results for a given deployment every time there's a change in even a single flag associated with a deployment. Experiment also invalidates all requests cached for a deployment every time the deployment is added to a flag or removed from a flag.

### Dynamic targeting cache considerations

Amplitude Experiment allows you to target feature-flags and experiments based on dynamic properties (user properties and behavioral cohorts) synced from Amplitude Analytics. Because these properties aren't included in the fetch request, you may be receiving cached experiment results for up to an hour (the TTL) until the cache misses and the user is re-evaluated with the most recent dynamic properties.

#### Amplitude user properties

Amplitude Experiment's remote evaluation servers allow for targeting based on user properties previously identified with the user. Since the CDN caches responses based only on user properties passed explicitly in the request, the caller may still receive stale results for up to 1 hour, even if the user properties in Amplitude Analytics are updated and would cause the user to be evaluated into a different variant.

#### Behavioral cohorts

You may want to use behavioral cohorts defined in Amplitude Analytics in your flag and experiment targeting. Since experiment cohorts are computed hourly, and the CDN cache TTL is also hourly, a user may be delayed from being targeted to a variant for up-to 2 hours in the worst case.

{{partial:admonition type="tip" heading=""}}
Amplitude Experiment recommends only using dynamic cohort targeting for flags and experiments where the inclusion in a variant of a flag isn't time-sensitive.
{{/partial:admonition}}