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
[Exposure tracking](/docs/experiment/under-the-hood/event-tracking#exposure-events) is essential to tracking if a user saw the variable experience from your feature flag. Consider exposure tracking optional for feature flags which don't require analysis; however, it's essential when running experiment. Accurate exposure tracking is crucial for reliable results.

### Analytics REST API

To keep things simple, this example is going to `curl` an [exposure event](/docs/experiment/under-the-hood/event-tracking#exposure-events) to Amplitude using the [Analytics REST API v2.0](/docs/apis/analytics/http-v2).

{{partial:partials/experiment/interactive-exposure-table}}

If the request succeeded, you should see a user in the Exposures chart in Experiment.

The flag is now active in your deployment and a user was evaluated and shown variant.

### SDKs

As with fetching variants, you can simplify exposure tracking using a client-side [Experiment SDK](/docs/sdks/experiment-sdks) in your app. Client-side Experiment SDKs can [automatically track exposures](/docs/experiment/under-the-hood/event-tracking#automatic-exposure-tracking) through your installed analytics SDK whenever it accesses a variant from the variant store.
