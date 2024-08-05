---
id: d15d30d7-05f6-498f-bf9c-9a7432322077
blueprint: data
title: 'Protect your schema from unexpected data'
source: 'https://help.amplitude.com/hc/en-us/articles/360055495852-Configure-the-Schema-settings-to-handle-unexpected-data'
this_article_will_help_you:
  - 'Eliminate Schema errors caused by unexpected data'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1722895369
---
Sometimes, Amplitude might receive data from your app that it doesn't know what to do with. This is usually the result of a **schema violation,** and it means the data Amplitude has just received isn't accounted for in your schema. If you see a schema violation, you've probably neglected to plan for that particular data type or value when you first set up your schema.

You can tell Amplitude how to handle these situations by configuring your schema settings. You can configure for three different types of schema violations. Find your schema settings by clicking into Amplitude Data and navigating to *Settings* > *Schema Settings.*

### Feature availability

See [the pricing page](https://amplitude.com/pricing) to find out if this feature is available for your Amplitude plan.

## Unplanned event types

Sometimes, Amplitude may receive an event that isn't part of your schema, or that you didn't plan earlier. This is an **unplanned event type**. You can configure Amplitude to respond in these ways: 

* **Mark As Unexpected****. Amplitude collects the event, triggers a warning, and sends a notification to the subscribers designated. The event's category in drop-downs is "Unexpected" until you approve it.
* **Reject****. Amplitude rejects the event and sends a notification to the subscribers designated. Amplitude doesn't store the event or its properties.  
  
![Screenshot 2023-08-07 at 6.31.28 PM.png](/docs/output/img/data/screenshot-2023-08-07-at-6-31-28-pm-png.png)

## Unplanned event/user properties

When Amplitude encounters an event or user property that isn't part of your schema, or that you didn't plan earlier, it considers the property to be an **unplanned event/user property**. You can configure Amplitude to respond to these in the following ways: 

* **Mark As Unexpected.** Amplitude collects the property, triggers a warning, and sends a notification to the subscribers designated.
* **Reject.** Amplitude rejects the property and sends a notification to the subscribers designated. Amplitude stores the event, but not the properties.

## Unplanned event/user property values

When Amplitude receives an event property value that isn't part of your schema, or that you didn't plan earlier, it considers the value an **unplanned property value**. For example, an event property value arrives as a string, but your schema expected a number. You can configure Amplitude to respond to an unplanned property value in the following ways:

* **Mark As Unexpected.** Amplitude collects the property, triggers a warning, and sends a notification to the subscribers designated.
* **Reject.** Amplitude rejects the property, triggers a warning, and sends a notification to the subscribers designated. Amplitude stores the event, but not the properties.

If Amplitude is rejecting your event data and you want to begin collecting it, add the events or properties to your Schema by planning a new event or planning a new property.

## View validation errors

Once you've initialized your schema and defined your expected events and event properties, your Schema can be used to validate live data coming into Amplitude. If you've configured your schema to trigger a warning for unexpected events or properties, Amplitude logs an error in the validation errors panel. 

View validation errors by clicking into Amplitude Data and navigating to *Settings* > *Schema Settings* > *Validation Errors*. Any errors triggered in the last 24 hours appear on this page, regardless of whether the event or property have since been approved or rejected. If no errors are visible in the validation page, there haven't been any violations in the past 24 hours. This **doesn't** mean that all violations are now fixed; it only means Amplitude hasn't encountered them in that time.

You can set up email alerts for validation errors by clicking *Subscribe**.*

## Manage subscribers

You can designate specific users to receive email notifications of any Schema violations. Do this by clicking *Manage Subscribers* at the top right of your Schema options.

![Screenshot 2023-08-07 at 6.33.26 PM.png](/docs/output/img/data/screenshot-2023-08-07-at-6-33-26-pm-png.png)