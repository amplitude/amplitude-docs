---
title: "Override a property"
source: "https://help.amplitude.com/hc/en-us/articles/10831335547035-Override-a-property"
id: 1259587d-dfcf-4713-a57a-35b9f5660744
---

#### This article will help you:

* Understand the benefits of overriding a property
* Teach you how to override a property

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

**NOTE:** Any changes to a property that is overridden on a property group will apply to all events that use that property group.

You can always [revert an overridden property](/data/override-property) when you no longer need the override.
