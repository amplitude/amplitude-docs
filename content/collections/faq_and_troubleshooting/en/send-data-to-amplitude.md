---
id: b600bde7-fbd8-4d19-b96a-2751dc3b3777
blueprint: faq_and_troubleshooting
title: 'Send data to Amplitude'
source: 'https://amplitude.zendesk.com/hc/en-us/articles/18748906568731'
---
This article covers some frequently asked questions about [sending data to Amplitude](https://help.amplitude.com/hc/en-us/articles/115002923888-Limits-How-much-data-can-you-send-to-Amplitude-).

How are events calculated towards the monthly event volume limit?
Any events sent and processed through Amplitude’s ingestion system are counted toward the monthly limit. Event volume is calculated on a calendar month basis. On the first of every month, event volume is reset to zero. Any computed events in Amplitude (e.g. computed revenue events) do not count as separate events.

I exceeded my 2000 event type per project instrumentation limit. Are the events that are sent after the 2000th event type still counted towards the monthly event volume limit?
Yes. Events that exceed the event type limit of 2000 events per project still count towards the monthly event limit. Although these events are not queryable within Amplitude itself, they are still ingested and can be viewed with Export API.

How can we reduce our monthly event volume limit?
Blocking or deleting events will reduce the monthly event volume. These events will not be ingested, so they will not count towards the monthly quota. 

Events can be unblocked or undeleted at any time, but note that any data that was not collected during the time the event was blocked or deleted will not be retrievable, since they were not ingested. 

What is the difference between blocking an event and deleting an event?
This answer can be found in this [FAQ article](https://help.amplitude.com/hc/en-us/articles/360059279291-FAQ-What-s-the-difference-between-hiding-blocking-and-deleting-an-event-or-property-).

Will I need to do anything after blocking or deleting an event?
When blocking or deleting an event type, you should update your instrumentation to stop sending those events to Amplitude. Not sending unwanted events in the first place is the best solution for removing event types from your taxonomy.

Do events from blocked user IDs or device IDs on the backend affect my event volume?
No. If you request Amplitude to block and filter certain user IDs or device IDs from your project, those events will not count towards event volume limits. 

Do hidden and backfilled events count towards the monthly event volume limit?
Yes. Hidden events are hidden in the UI, but they are still ingested by Amplitude. Backfilled events count as well because they are being ingested by Amplitude.

Do Inactive events count towards the monthly event volume limit?
Yes. Inactive events count towards the monthly limit. Only blocked or deleted events will not count towards your monthly limit.

How can we reduce event properties or user properties to avoid surpassing per-project limits?
Event properties and user properties can be deleted to avoid surpassing per-project limits. Deleted properties will not be ingested, so they will not count towards the monthly quota. 

You can [delete](/docs/data/remove-invalid-data) unneeded event and user properties through the table of the property with Amplitude Data. Once you are under the limit, it will take approximately 24 hours for the modified event properties and user properties to appear in Amplitude.
