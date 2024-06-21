---
id: 8451a491-2ca6-4101-90a0-26a494f6fb96
blueprint: faq_and_troubleshooting
title: Transformations
source: 'https://amplitude.zendesk.com/hc/en-us/articles/14884124333467'
---
This article covers some frequently asked questions about [transformations](/docs/data/transformations).


{{partial:collapse name="I merged event A and event B together to create event C. What happens to saved charts that were querying on event A?"}}
Any saved chart querying on event A will continue to do so after the merge. However, the event in the chart does **not** automatically change to event C. For any charts created after the merge, neither events A or B will populate in the chart dropdown; only event C will do this.
{{/partial:collapse}}


{{partial:collapse name="I merged event A and event B together to create event C. How do I bulk update the existing saved charts to now use event C?"}}
There is no way to bulk update charts in Amplitude. However, you might try adding all charts with the old events (in this example, events A and B) to a dashboard and using Find & Replace to swap out those events for event C. Then click *Save onto Charts > Update existing charts*.
{{/partial:collapse}}


{{partial:collapse name="I merged event property A and event property B together to create event property C. What happens to saved charts that were querying on event property A and event property B?"}}
Those charts saved **before** the merge will be automatically updated to query on event property C upon refresh. For example, if you have a saved chart that queries on event property A, it will instead query on event property C after a refresh, without the need for any direct action on your part. For charts created **after** the merge, you’ll be able to query on only the merged event property C. Event properties A and B will no longer populate in the chart dropdown.
{{/partial:collapse}}


{{partial:collapse name="I want to unmerge event C. What happens to the charts that use this merged event?"}}
That depends on how you created event C in the first place.

* If you merged **event A and event B** into **event C**: Upon refresh, the chart’s user/event totals count will drop to zero.
* If you merged **event A and event C** into **event C**: Upon refresh, the chart will query on the source event C.
{{/partial:collapse}}


{{partial:collapse name="Can I create a new transformation from an existing transformation?"}}
Amplitude does not currently support transformations on transformations. If this is a feature you would benefit from, please submit a feature request.

Event C is a merged event composed of source events A and B. Can I see event A and event B separately, and then event C starting at the date the transformation was made?
Transformations are retroactive, so this is unfortunately not possible.
{{/partial:collapse}}


{{partial:collapse name="Which value takes priority in a property merge?"}}
Let's use an example here: For one instance of event A, you send the event property `event prop` = `true`; for another instance of event A, you send event property `event_property` = `false`. B of these event properties are then merged into `EVENT
 PROPERTY`.

In this situation, when you query on event A and group by `EVENT PROPERTY`, this user will populate twice. You will see one data point for the `true` value and one for `false`.
{{/partial:collapse}}
