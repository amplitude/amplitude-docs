---
id: 4d2e02c1-9bf7-48ec-ab17-641fe208de23
blueprint: page
title: 'Site components'
package: '@amplitude/session-replay-browser'
author: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1757629320
---
{{partial:admonition type="note" heading="code block"}}
```ts
import { Experiment } from '@amplitude/experiment-js-client';

// (1) Initialize the experiment client with Amplitude Analytics.
const experiment = Experiment.initializeWithAmplitudeAnalytics(
    'DEPLOYMENT_KEY'
);

// (2) Fetch variants and await the promise result.
await experiment.fetch();

// (3) Lookup a flag's variant.
const variant = experiment.variant('FLAG_KEY');
if (variant.value === 'on') {
    // Flag is on
} else {
    // Flag is off
}
```
{{/partial:admonition}}


{{partial:admonition type="note" heading="inline code"}}
version `0.8.0` is the version
{{/partial:admonition}}