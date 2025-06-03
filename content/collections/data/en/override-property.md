---
id: 1259587d-dfcf-4713-a57a-35b9f5660744
blueprint: data
title: 'Override a property definition'
source: 'https://help.amplitude.com/hc/en-us/articles/10831335547035-Override-a-property'
this_article_will_help_you:
  - 'Understand the benefits of overriding a property'
  - 'Teach you how to override a property'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1722895748
ai_summary: 'You can override property details in Amplitude to customize a property for a specific event or property group without affecting the original version. This allows changes to apply only to the event or group you specify. To override a property for an event, go to the event details and select the property to override. For a property group, access the property group details and choose the property to override. Any changes made will only affect the selected event or group. Remember, you can revert an overridden property when needed.'
---
Overriding property details is helpful when you want to customize the property for a specific event or property group, without updating the **original** version or creating an entirely new event property. 

Each property in the properties table represents the original version, which can be shared across multiple events and property groups. Amplitude Data will apply changes to the details of any property to **all events and property groups** that share the original details. When you override a property on an event or property group, any changes to that property will apply **only** to that event or property group.

## Override a property

To override a property on a specific event, follow these steps:

1. Navigate to the *Events* table and click on an event’s name.
2. In the event details panel that opens, navigate to *Details > Properties.* Then click the property you want to override.
3. In the event property details panel that opens, click *Override*. You will see a message confirming that any changes to the property will apply only to that event.

To override a property on a property group, follow these steps:

1. From within *Properties*, open the *Event Properties* tab to view the event properties table.
2. Click *Property Groups* to switch to the property groups table view. Then click a property group name.
3. In the property details panel that opens, navigate to *Details > Properties*, and click the property you want to override.
4. In the event property details panel that opens, click *Override*.

{{partial:admonition type="note" heading=""}}
Any changes to a property that is overridden on a property group will apply to all events that use that property group.
{{/partial:admonition}}

You can always [revert an overridden property](/docs/data/override-property) when you no longer need the override.