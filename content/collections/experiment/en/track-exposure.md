---
id: 665e15c4-7194-4898-9cca-b58251cc79a2
blueprint: experiment
title: 'Track Exposure'
landing: false
source: /experiment/general/exposure-tracking
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1719009549
---
[Exposure tracking](/docs/experiment/under-the-hood/event-tracking#exposure-events) is essential to tracking if and when a user has actually viewed the variable experience from your feature flag. Exposure tracking may be considered optional for feature flags which don't require analysis; however, it's essential when running experiment. Accurate exposure tracking is crucial for reliable results.

### Analytics REST API

To keep things simple, this example is going to `curl` an [exposure event](/docs/experiment/under-the-hood/event-tracking#exposure-events) to Amplitude using the [Analytics REST API v2.0](/docs/apis/analytics/http-v2).

<!--table to go here-->

If the request succeeded, you should see a user in the Exposures chart in Experiment.

Your flag is now active within your deployment and a user has been evaluated and exposed to a variant.

### SDKs

As with fetching variants, exposure tracking can be simplified by using a client-side [Experiment SDK](/docs/sdks/experiment-sdks) in your app. Client-side Experiment SDKs come equipped with the ability to [automatically track exposures](/docs/experiment/under-the-hood/event-tracking#automatic-exposure-tracking) through your installed analytics SDK whenever a variant is accessed from the variant store.
