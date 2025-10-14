---
id: 7ade889d-c09c-48ee-8910-c4592bcc09b0
blueprint: web_experiment
title: 'Web Experiment performance'
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1729195974
---
Web Experiment is built to minimize impact on page performance.

{{partial:admonition type='note'}}
See [Amplitude's pricing page](https://amplitude.com/pricing) to find out if this feature is available on your Amplitude plan.
{{/partial:admonition}}

## Script size

The Web Experiment script is dynamic, and includes all your experiment configurations to avoid making multiple synchronous downloads. This means that the script size starts with a base size, and scales with each experiment.

|               | Uncompressed | Compressed |
| ------------- | ------------ | ---------- |
| Base script   | 79KB         | 20KB       |
| Per-flag size | ~1KB         | ~100B      |

To avoid constantly increasing script sizes, deactivate or archive experiments when they're complete. 

{{partial:admonition type="note" heading="Custom code impact on flag size"}}
Custom code increases the size of a flag's code as a result of the size of the custom code itself.
{{/partial:admonition}}

## Caching

Web Experiment uses two layers of caching: CDN and Browser. This helps to provide more reliable script delivery to your site.

### CDN cache

Amplitude caches the Web Experiment script on a CDN. When a user requests the script, their browser loads it from the CDN if another user loaded it in the same geographic area. The CDN cache has a max age of one minute, and serves stale content while the script reloads for up to one hour. The script serves a stale response if the origin returns an error for the maximum amount of time possible.

The cache control response header that configures CDN caching is:

`max-age=60,stale-while-revalidate=3600,stale-if-error=31536000`

### Browser cache

The browser cache serves the Web Experiment script without making a network request for 60 seconds, or the maximum amount of time if the server returns an error. This caching layer serves the script from memory (0ms latency) if a user loads multiple pages on your site, or reloads the same page within a one minute window.

The cache control response header that configures browser caching is:

`max-age=60,stale-while-revalidate=3600`

## Evaluation

Web Experiment evaluation runs locally with information available synchronously in the browser. As a result, evaluation is CPU bound and usually takes less than 1ms to evaluate and apply variant actions.

## Ad blockers

Amplitude can't identify users who have ad blocking software enabled. As a result, those users don't log assignment events or impressions, and don't experience the experiment.