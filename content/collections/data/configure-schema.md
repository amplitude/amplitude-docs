---
id: d15d30d7-05f6-498f-bf9c-9a7432322077
blueprint: data
title: 'Configure the Schema settings to handle unexpected data'
source: 'https://help.amplitude.com/hc/en-us/articles/360055495852-Configure-the-Schema-settings-to-handle-unexpected-data'
this_article_will_help_you:
  - 'Eliminate Schema errors caused by unexpected data'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717623490
---
Sometimes, Amplitude might receive data from your app that it doesn't know what to do with. This is usually the result of a **Schema violation,** and it means the data Amplitude has just received is not accounted for in your Schema. If you see a Schema violation, you have probably neglected to plan for that particular data type or value when you first set up your Schema.

You can tell Amplitude how to handle these situations by configuring your Schema settings. Currently, you can configure for three different types of Schema violations. Find your Schema settings by clicking into Amplitude Data and navigating to *Settings* > *Schema Settings.*

### Feature availability

This feature is available to users on **Growth** and **Enterprise plans** only.

## Unplanned event types

Sometimes, Amplitude may receive an event that is not part of your Schema, or that you did not previously plan. This is an **unplanned event type**. You can configure Amplitude to respond in these ways: 

* **Mark As Unexpected****. Amplitude will collect the event, trigger a warning, and send a notification to the subscribers designated. The event will be categorized as "Unexpected" in drop-downs until you approve it.
* **Reject****. Amplitude will reject the event and send a notification to the subscribers designated. Amplitude will not store the event or its properties.  
  
![Screenshot 2023-08-07 at 6.31.28 PM.png](/docs/output/img/data/screenshot-2023-08-07-at-6-31-28-pm-png.png)

## Unplanned event/user properties

When Amplitude encounters an event or user property that is not part of your Schema, or that you did not previously plan, it considers the property to be an **unplanned event/user property**. You can configure Amplitude to respond to these in the following ways: 

* **Mark As Unexpected.** Amplitude will collect the property, trigger a warning, and send a notification to the subscribers designated.
* **Reject.** Amplitude will reject the property and send a notification to the subscribers designated. Amplitude will store the event, but not the properties.

## Unplanned event/user property values

When Amplitude receives an event property value that is not part of your Schema, or that you did not previously plan, it considers the value an **unplanned property value**. For example, an event property value is sent as a string, but your Schema expected a number. You can configure Amplitude to respond to an unplanned property value in the following ways:

* **Mark As Unexpected.** Amplitude will collect the property, trigger a warning, and send a notification to the subscribers designated.
* **Reject.** Amplitude will reject the property, trigger a warning, and send a notification to the subscribers designated. Amplitude will store the event, but not the properties.

If Amplitude is rejecting your event data and you want to begin collecting it, add the events or properties to your Schema by [planning a new event or planning a new property](https://help.amplitude.com/hc/en-us/articles/5078731378203).

## View validation errors

Once you have initialized your Schema and defined your expected events and event properties, your Schema can be used to validate live data coming into Amplitude. If your Schema is configured to trigger a warning for unexpected events or properties, Amplitude will log an error in the validation errors panel. 

View validation errors by clicking into Amplitude Data and navigating to *Settings* > *Schema Settings* > *Validation Errors*. Any errors triggered in the last 24 hours will be displayed on this page, regardless of if the event or property have since been approved or rejected. If no errors are visible in the validation page, there have not been any violations in the past 24 hours. This does **not** mean that any violations have been fixed; it only means Amplitude has not encountered them in that time.

You can set up email alerts for validation errors by clicking *Subscribe**.*

## Manage subscribers

You can designate specific users to receive email notifications of any Schema violations. Do this by clicking *Manage Subscribers* at the top right of your Schema options.

![Screenshot 2023-08-07 at 6.33.26 PM.png](/output/img/data/screenshot-2023-08-07-at-6-33-26-pm-png.png)
