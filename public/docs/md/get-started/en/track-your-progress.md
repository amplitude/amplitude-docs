---
id: 772dbd47-bee0-4b64-9672-7d09d16cd433
blueprint: get-started
title: 'Track progress as you instrument Amplitude'
source: 'https://help.amplitude.com/hc/en-us/articles/19354328238363-Track-progress-as-you-instrument-Amplitude'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1716572542
this_article_will_help_you:
  - 'Learn how to QA your instrumentation and keep track of event limits'
  - 'Understand how Amplitude handles duplicative events'
landing: false
exclude_from_sitemap: false
---
As you implement Amplitude for the first time, take care to QA your data during each step the process. This helps ensure that you're tracking the events, users, and actions that provide valuable insights for your product or service.

## QA your instrumentation

To verify your instrumentation works the way you'd intended, navigate over to Amplitude's [User Activity tab](/docs/sdks/sdk-debugging). Fire some events using your test device, go to your project in Amplitude, and then watch as the device ID or user ID appears on the near-realtime feed. Clicking on that ID takes you to that user's event stream, which should include the events you've decided to track. If you're not seeing the events you expect to see, it means something's wrong with your instrumentation.

## Know your event limits

If you go over your limit for the month, Amplitude still ingests your data as usual. However, that excess data is inaccessible to you, unless you upgrade to a new tier or wait until the following month.

## Understand how Amplitude handles duplicate events

Amplitude de-duplicates your data so it doesn't log unique events multiple times. Amplitude checks the event ID, client event time, and device ID for every event. If the event isn't in the database, Amplitude writes it; otherwise, Amplitude drops the event.

If you're using the Amplitude HTTP API, add an [insert\_id field](/docs/apis/analytics/http-v2). Amplitude ignores subsequent events sent with the same event ID/client event time/device ID or insert\_id within the past seven days.