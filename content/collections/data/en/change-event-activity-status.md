---
id: 4116b5ac-6eb0-4b39-8b13-470a135f2143
blueprint: data
title: "Set an event's activity status"
source: 'https://help.amplitude.com/hc/en-us/articles/17050354126619-Change-an-event-s-activity-status'
this_article_will_help_you:
  - 'Understand what constitutes an active or inactive event'
  - "Learn how to set an event's status"
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1725397693
---
You can specify whether Amplitude should consider an event to be **active** or **inactive**. A good way to think about the difference is that an active event is one the user actively engaged with, like clicking the Add to Cart button. An **inactive** event is one that happened to the user, without any specific action on their part. Some good examples of this would be events like `Push Notification Sent` or `Message Received`.

Setting an event as inactive removes that event from any dashboard metrics counting active users and active events. Users who only trigger inactive events **aren't counted** as active users for that day, though they **do** count towards Amplitude’s new user definitions.

{{partial:admonition type="note" heading=""}}
When you change an event's activity status from active to inactive, Amplitude applies that change **immediately and retroactively**, so you should expect to see changes in your historical data. Inactive events still count against your event volume.
{{/partial:admonition}}

To change the activity status, follow these steps:

1. Click the checkbox next to the event name. You can select more than one event if you want to change the status of multiple events at once.
2. Click the *Edit Activity* drop-down menu.
3. Select the new event status.

![status.png](/docs/output/img/data/event-activity-status.png)

{{partial:admonition type="note" heading=""}}
This only applies to **active** events and event properties that are **included in your tracking plan**. It also **doesn't** apply to custom events.
{{/partial:admonition}}

You can also update the Activity status from the *Activity* column in the *Events* table, or the *Details* flyout of a specific event. From the *Events* table, change the status from the *Activity* column's drop-down menu. Click on an event's name to access the *Details* flyout, and change the *Activity* status from the drop-down menu.