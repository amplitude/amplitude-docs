---
id: 4ae538ba-8ca1-4a0f-b93a-f89ce4b42db0
blueprint: data
title: 'Revert an overridden property'
source: 'https://help.amplitude.com/hc/en-us/articles/10831709352987-Revert-an-overridden-property'
this_article_will_help_you:
  - 'Understand when to revert an overridden property'
  - 'Learn how to revert an overridden property'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717620952
---
Reverting an [overridden property](/docs/data/override-property) to its original version is a quick way to retroactively clean up your tracking plan and maintain consistency across your event properties. Doing so tells Amplitude Data to update the property to match the latest state of the **original** version listed in the event properties table. Once reverted, any changes to the property will **also** apply to any events or property groups that use the **original** version of that property.

## Revert an overridden property

To revert an overridden property on a **specific event**, follow these steps:

1. Navigate to *Events* table and click an event’s name.
2. In the event details fly-out, navigate to *Details > Properties* and click the event property you want to revert.
3. In the event property details panel that opens, click *Manage Override*.
4. From the dropdown menu that opens, select *Revert To Original.*

**![manage_override.png](/docs/output/img/data/manage-override-png.png)**

{{partial:admonition type="note" heading=""}}
Event rows that include “via property group…” are in the list because those events use a property group that includes this event property. Reverting the property on any one of those events will revert the property on all of them.
{{/partial:admonition}}

To revert an event property on a **property group**, follow these steps:

1. From within *Properties*, open the *Event Properties* tab to open the event properties table.
2. Click *Property Groups* to switch to the property groups table. Then click a property group name.
3. In the property group details panel, navigate to *Details > Properties* and click the property you want to revert.
4. In the event property details panel, click *Manage Override*.
5. From the dropdown menu that opens, select *Revert To Original.*

{{partial:admonition type="note" heading=""}}
If you would like to see how the details will change once you revert before beginning the process, click *Compare To Original.* The original values will appear under any overridden values. Turn off this view by clicking *Manage Override > Hide Comparison.*
{{/partial:admonition}}

To review and revert any overrides for a **specific property**, follow these steps:

1. From within *Properties*, open the *Event Properties* tab to open the event properties table, and then click a property name.
2. In the event property details panel, open the *Used By* tab. Any events or property groups labeled as overridden are using an overridden version of that event property.
3. Hover over the overridden event or property group row you're interested in and click on the three-dot icon on the right.
4. From the drop-down, select *Revert To Original.*

You can **bulk revert** all overrides from the *Used By* tab. Click *Manage*, and a modal will appear that allows you to review and bulk revert your overrides.