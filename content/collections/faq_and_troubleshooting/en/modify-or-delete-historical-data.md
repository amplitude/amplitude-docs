---
id: e0591f89-03c2-4e61-9827-4841e5d65c68
blueprint: faq_and_troubleshooting
title: 'Modify or delete historical data'
source: 'https://amplitude.zendesk.com/hc/en-us/articles/360052385792'
---
Generally speaking, the Amplitude architecture is based on pre-aggregated sets by the hour, day, week and month for users and events. While this allows the platform to scale well, one tradeoff is immutable data.

This article covers some frequently asked questions about how to modify or delete historical data.

How do I modify events that have already been ingested by Amplitude?
It is not possible to modify events that have already been ingested. However, there is a potential workaround:

1. Export all project data using the [Export API](https://developers.amplitude.com/docs/export-api)
2. Clean the data (i.e make the required changes to the data)
3. Upload the cleaned data into a **new project** using the [Batch API](https://developers.amplitude.com/docs/batch-event-upload-api)

I updated user properties using the Identify API. Why are there still “none” values in my charts?
Using the Identify API only updates user property values for future events. Data that Amplitude has already ingested cannot be changed. The user will have to fire another event in order for Amplitude to apply the updated property value. More details on how user properties are updated can be found [here](/docs/data/user-properties-and-events). 

I accidentally sent an event for a user. How do I delete this specific event for this specific user?
You cannot. Ingested data is **immutable**. However, you can try the following process for similar results:

1. [Delete or block](/docs/data/remove-invalid-data) the event:
	* This will prevent the event from coming into Amplitude for all users
	* The event will still appear in the users event stream, but will not be available for querying
2. If that doesn't work, try the workaround described in the first FAQ above.

Read more about cleaning up your data in this help center [section](https://help.amplitude.com/hc/en-us/sections/16805649563163-Clean-up-your-data). 

How do I backfill historical data into Amplitude?
Please see this [Self Data Backfill Guide](https://developers.amplitude.com/docs/self-data-backfill-guide) in our Developers Center. 
