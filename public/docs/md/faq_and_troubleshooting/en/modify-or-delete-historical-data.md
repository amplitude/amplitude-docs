---
id: e0591f89-03c2-4e61-9827-4841e5d65c68
blueprint: faq_and_troubleshooting
title: 'Modify or delete historical data'
source: 'https://amplitude.zendesk.com/hc/en-us/articles/360052385792'
category: governance
---
Generally speaking, the Amplitude architecture is based on pre-aggregated sets by the hour, day, week and month for users and events. While this allows the platform to scale well, one tradeoff is immutable data.

This article covers some frequently asked questions about how to modify or delete historical data.


{{partial:collapse name="How do I modify events that have already been ingested by Amplitude?"}}
If your account is on a the Growth or Enterprise plan, see [Self-service data deletion in Amplitude](/docs/admin/account-management/self-service-data-deletion-in-amplitude).

For other account types, direct modification isn't possible, but as a workaround, you can:

1. Export all project data using the [Export API](/docs/apis/analytics/export)
2. Clean the data (for example, make the required changes to the data)
3. Upload the cleaned data into a **new project** using the [Batch API](/docs/apis/analytics/batch-event-upload)
{{/partial:collapse}}


{{partial:collapse name="I updated user properties using the Identify API. Why are there still 'none' values in my charts?"}}
Using the Identify API only updates user property values for future events. You can't change data that Amplitude has already ingested. You need to fire another event for Amplitude to apply the updated property value. More details on how user properties are updated can be found [here](/docs/data/user-properties-and-events). 

{{/partial:collapse}}


{{partial:collapse name="I accidentally sent an event for a user. How do I delete this specific event for this specific user?"}}
You can't. Ingested data is **immutable**. However, you can try the following process for similar results:

1. [Delete or block](/docs/data/remove-invalid-data) the event:
	* This will prevent the event from coming into Amplitude for all users
	* The event will still appear in the users event stream, but will not be available for querying
2. If that doesn't work, try the workaround described in the first FAQ above.
{{/partial:collapse}}

{{partial:collapse name="How do I backfill historical data into Amplitude?"}}
See this [Data Backfill Guide](/docs/data/data-backfill).
{{/partial:collapse}}
