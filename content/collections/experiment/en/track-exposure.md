---
id: 665e15c4-7194-4898-9cca-b58251cc79a2
blueprint: experiment
title: 'Exposure tracking in Amplitude Experiment'
landing: false
source: /experiment/general/exposure-tracking
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1724885595
this_article_will_help_you:
  - 'Learn how Amplitude Experiment tracks user exposures'
---
When running an experiment, tracking which users were [exposed](/docs/feature-experiment/under-the-hood/event-tracking#exposure-events) to your feature flag's variable experience is essential. Without it, you can't count on reliable results.

{{partial:admonition type='note'}}
Exposure tracking is optional for feature flags that don't require analysis.
{{/partial:admonition}}

### Analytics REST API

In this example, the [Analytics REST API v2.0](/docs/apis/analytics/http-v2) sends an [exposure event](/docs/feature-experiment/under-the-hood/event-tracking#exposure-events)  to Amplitude with `curl`.

{{partial:partials/experiment/interactive-exposure-table}}

When the request succeeds, a user appears in the Exposures chart in Amplitude Experiment.

The flag is now active in your deployment, and your experiment has evaluated a user and shown them the variant.

### SDKs

As with fetching variants, you can simplify exposure tracking using a client-side [Experiment SDK](/docs/sdks/experiment-sdks) in your app. Client-side Amplitude Experiment SDKs can [automatically track exposures](/docs/feature-experiment/under-the-hood/event-tracking#automatic-exposure-tracking) through your installed analytics SDK whenever it accesses a variant from the variant store.