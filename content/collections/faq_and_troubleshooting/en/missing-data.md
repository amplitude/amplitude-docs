---
id: e6607f82-0240-4525-bbe7-e3058c73abb3
blueprint: faq_and_troubleshooting
title: 'Missing data'
source: 'https://amplitude.zendesk.com/hc/en-us/articles/360044886071'
---
#### This article will help you:

* Troubleshoot for missing events, event properties, or user properties

Sometimes you want to use an event or property for an analysis but can't find it. Even if the data was successfully sent to Amplitude, there could be several reasons why it is not showing up. This article will discuss a few of these scenarios, including how best to troubleshoot for each one.

## The instrumentation limit has been met

If your project's [instrumentation limit](https://help.amplitude.com/hc/en-us/articles/115002923888-Limits#h_8d90ca72-bf91-4161-88b2-01b5448b0859) has been met, data for any event types and event or user properties that exceed the limit **cannot be queried** from Amplitude. You'll only be able to access it by exporting raw data via a CSV file or Amplitude's [Export API](https://www.docs.developers.amplitude.com/analytics/apis/export-api/). 

You can try to get back under the limit by [deleting unneeded event types in Amplitude Data](/docs/data/remove-invalid-data). Once you are under the limit, it will take approximately 24 hours for the new event types, event properties, and user properties to appear in Amplitude.

## Data has been hidden, blocked, or deleted

The expected data may have been hidden, blocked, or deleted. Make sure you understand the [differences between those actions](/docs/data/remove-invalid-data) from your `main` branch to ensure the data is ingested properly moving forward.

{{partial:admonition type='note'}}
 Hidden or blocked events and properties will count towards your project's instrumentation [limit](https://help.amplitude.com/hc/en-us/articles/115002923888#h_8d90ca72-bf91-4161-88b2-01b5448b0859), whereas deleted events and properties will not. 
{{/partial:admonition}}

The data may also be named in a way you do not expect, or have a [display name](/docs/data/display-names-in-amplitude-data) you're not familiar with. If you need to adjust the name, learn about making retroactive changes to your data in this [help center article](/docs/data/transformations).

### Hidden events

Sometimes an event may be visible in an event stream but not in a chart. This could be because of a filters, like a drop filter mentioned previously, or because the event was previously hidden from view via Amplitude Data, as seen in this image. 

![Screenshot 2023-08-31 at 16.20.04.png](/docs/output/img/faq/screenshot-2023-08-31-at-16-20-04-png.png)

{{partial:admonition type='note'}}
 Events and properties can also be [hidden](https://help.amplitude.com/hc/en-us/articles/360059279291-FAQ-The-difference-between-hiding-blocking-and-deleting-an-event-or-property) from drop-downs, Pathfinder results, and Personas charts.
{{/partial:admonition}}

## Schema doesn't include unplanned data

The missing data might be considered **unplanned**. This means the data conflicts with your current schema settings, and Amplitude doesn't know what to do with it. Double-check that your project's tracking plan is set up to receive [unplanned events or properties](/docs/data/configure-schema). If it is not, Amplitude will not store the event or its properties.

## Data ingestion or access is delayed

If you can see the event or property data for some users and not others, the ingestion of your data may be delayed. For example, if you are using a [Mobile SDK](https://www.docs.developers.amplitude.com/data/sdks/sdk-maintenance-and-support/) to send data to Amplitude, there is no way to guarantee that the events appear as soon as they are logged - a user may not have been connected to the internet or the SDK's [event upload threshold](event%20threshold) may not have been met.

{{partial:admonition type='note'}}
 By default, Amplitude's Mobile SDKs have an event upload threshold of 30 seconds or 30 events. Until an event threshold has been met, the event data will not be sent. 
{{/partial:admonition}}

### Modified user properties

New or modified user properties sent via the [Identity API](/docs/data/user-properties-and-events).
